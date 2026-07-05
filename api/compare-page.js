const { supabase, nationalityMap, escapeHtml, safeJsonForScript } = require('./utils');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  const { a, b } = req.query;
  if (!a || !b) {
    return res.status(400).send('Missing comparison IDs');
  }

  try {
    // 1. Fetch both results from Supabase
    const [fetchA, fetchB] = await Promise.all([
      supabase.from('coreopinion_results').select('*').eq('id', a).single(),
      supabase.from('coreopinion_results').select('*').eq('id', b).single()
    ]);

    if (fetchA.error || !fetchA.data || fetchB.error || !fetchB.data) {
      console.error("Supabase fetch error for comparison:", fetchA.error, fetchB.error);
      return res.status(404).send('One or both results not found');
    }

    const payloadA = fetchA.data;
    const payloadB = fetchB.data;

    // 2. Read compiled template
    let templateName = 'compare.html';
    if (payloadA.mode && payloadA.mode === payloadB.mode && payloadA.mode !== 'general') {
      const countryFile = `${payloadA.mode}.html`;
      if (fs.existsSync(path.join(process.cwd(), countryFile))) {
        templateName = countryFile;
      }
    }
    const templatePath = path.join(process.cwd(), templateName);
    if (!fs.existsSync(templatePath)) {
      console.error(`${templateName} not found on disk!`);
      return res.status(500).send('Server Error: Template missing');
    }
    let html = fs.readFileSync(templatePath, 'utf8');

    // 3. Dynamic metadata
    const countryA = nationalityMap[payloadA.mode] || payloadA.mode.toUpperCase();
    const countryB = nationalityMap[payloadB.mode] || payloadB.mode.toUpperCase();
    
    let title = `Political Comparison | CoreOpinion`;
    if (payloadA.mode === payloadB.mode) {
      title = `${countryA} Political Comparison | CoreOpinion`;
    } else {
      title = `${countryA} vs ${countryB} Comparison | CoreOpinion`;
    }

    const biasA = payloadA.bias_breakdown ? (payloadA.bias_breakdown.__overall_bias || 0) : 0;
    const biasB = payloadB.bias_breakdown ? (payloadB.bias_breakdown.__overall_bias || 0) : 0;
    const description = `Compare political compass positions and cognitive framing bias. User A: ${biasA}% bias vs User B: ${biasB}% bias. Take the test at coreopinion.org`;

    const host = req.headers.host || 'coreopinion.org';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const canonicalUrl = `${protocol}://${host}/compare/${a}/${b}`;
    const ogImageUrl = `${protocol}://${host}/api/og?id=${a}`; // Use first user's OG card

    // Substitute metadata tags in HTML. Escape DB-derived title/description
    // so a poisoned row can't break out of the content="" attribute.
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);
    html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${safeTitle}">`);
    html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${safeDescription}">`);
    html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImageUrl}">`);
    html = html.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${safeTitle}">`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${safeDescription}">`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ogImageUrl}">`);

    // 4. Sanitize payloads
    const cleanA = { ...payloadA };
    const cleanB = { ...payloadB };
    delete cleanA.email;
    delete cleanB.email;

    // 5. Inject payload — safeJsonForScript neutralizes </script> and raw
    // line terminators so an attacker-controlled row can't inject script.
    const injectionScript = `<script>window.comparePayload = { a: ${safeJsonForScript(cleanA)}, b: ${safeJsonForScript(cleanB)} };</script>\n</head>`;
    html = html.replace('</head>', injectionScript);

    // 6. Serve HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    console.error("Error in compare-page handler:", err);
    return res.status(500).send(`Server Error: ${err.message}`);
  }
};
