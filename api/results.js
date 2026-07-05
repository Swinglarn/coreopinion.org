const { supabase, sanitizeResultPayload, PUBLIC_RESULT_COLUMNS } = require('./utils');
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
      // Coerce the untrusted body to safe types/shapes before it touches
      // the DB or, later, the server-rendered result pages.
      const dbPayload = sanitizeResultPayload(req.body);
      if (!dbPayload) {
        return res.status(400).json({ error: 'Invalid payload' });
      }

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

      // Result links are public — never expose the owner's email here.
      const { data, error } = await supabase
        .from('coreopinion_results')
        .select(PUBLIC_RESULT_COLUMNS)
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
