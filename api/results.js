const { supabase } = require('./utils');
const { sendResultEmail } = require('./send-result-email');

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const payload = req.body;

      // Map frontend keys to database columns
      const dbPayload = {
        mode: payload.mode || 'general',
        econ_score: payload.econ_score !== undefined ? payload.econ_score : (payload.e_score !== undefined ? payload.e_score : null),
        gov_score: payload.gov_score !== undefined ? payload.gov_score : (payload.g_score !== undefined ? payload.g_score : null),
        age: payload.age || null,
        country: payload.country || payload.nationality || null,
        political_id: payload.political_id || null,
        archetype: payload.archetype || null,
        email: payload.email || null,
        gender: payload.gender || null,
        nationality: payload.nationality || null,
        bias_breakdown: payload.bias_breakdown || null
      };

      const { data, error } = await supabase
        .from('coreopinion_results')
        .insert(dbPayload)
        .select('*')
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: error.message });
      }

      // Fire the result email if the user provided an address.
      // sendResultEmail never throws and a failure must not affect the save,
      // so we await it only to log the outcome, then return success regardless.
      if (data && data.email) {
        const host = req.headers.host || 'coreopinion.org';
        const emailResult = await sendResultEmail(data, host);
        if (!emailResult.sent) {
          console.warn(`Result saved (id=${data.id}) but email not sent:`, emailResult.error);
        }
      }

      return res.status(200).json(data);
    }

    if (req.method === 'GET') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Missing id parameter' });
      }

      const { data, error } = await supabase
        .from('coreopinion_results')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Supabase fetch error:", error);
        return res.status(404).json({ error: 'Result not found' });
      }

      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error("Unexpected error inside handler:", err);
    return res.status(500).json({ error: err.message });
  }
};
