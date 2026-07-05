const { supabase, nationalityMap, modeToLang, PROFILES, escapeHtml, safeJsonForScript } = require('./utils');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send('Missing result ID');
  }

  try {
    // 1. Fetch from Supabase
    const { data: result, error } = await supabase
      .from('coreopinion_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !result) {
      console.error("Supabase fetch error for result page:", error);
      return res.status(404).send('Result not found');
    }

    // 2. Read compiled template
    let templateName = 'result.html';
    if (result.mode && result.mode !== 'general') {
      const countryFile = `${result.mode}.html`;
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

    // 3. Determine dynamic social metadata details
    const eScore = result.econ_score !== null ? parseFloat(result.econ_score) : 0;
    const gScore = result.gov_score !== null ? parseFloat(result.gov_score) : 0;
    
    let biasBreakdown = result.bias_breakdown || {};
    let overallBias = 0;
    if (biasBreakdown.__overall_bias !== undefined) {
      overallBias = biasBreakdown.__overall_bias;
    }

    let profileKey = 'analyst';
    if (overallBias <= 10) profileKey = 'axiom';
    else if (overallBias <= 25) profileKey = 'analyst';
    else if (overallBias <= 45) profileKey = 'pragmatist';
    else if (overallBias <= 65) profileKey = 'empath';
    else if (overallBias <= 85) profileKey = 'weathervane';
    else profileKey = 'mirror';

    const lang = result.mode && modeToLang[result.mode] ? modeToLang[result.mode] : 'en';
    const profile = (PROFILES[lang] && PROFILES[lang][profileKey]) ? PROFILES[lang][profileKey] : PROFILES['en'][profileKey];
    const profileName = `${profile.name} ${profile.icon}`;

    let title = `CoreOpinion Political Compass Result`;
    let description = `Cognitive Profile: ${profileName} | Framing Bias: ${overallBias}% | Compass Position: Econ ${eScore.toFixed(1)}, Gov ${gScore.toFixed(1)}`;

    if (result.mode && result.mode !== 'general') {
      try {
        const countryConfigPath = path.join(process.cwd(), 'src/countries', `${result.mode}.json`);
        if (fs.existsSync(countryConfigPath)) {
          const config = JSON.parse(fs.readFileSync(countryConfigPath, 'utf8'));
          const partyMeta = config.partyMeta || {};
          const topPartyEntry = Object.entries(biasBreakdown)
            .filter(([k]) => k !== '__overall_bias' && k !== '__stances' && k !== '__gender' && k !== '__nationality')
            .sort((a, b) => b[1] - a[1])[0];
          if (topPartyEntry && partyMeta[topPartyEntry[0]]) {
            const pMeta = partyMeta[topPartyEntry[0]];
            const rawName = pMeta.name;
            const partyName = typeof rawName === 'object' ? (rawName.en || Object.values(rawName)[0]) : rawName;
            const countryName = nationalityMap[result.mode] || result.mode.toUpperCase();
            title = `${countryName}: ${Math.round(topPartyEntry[1])}% ${partyName} Alignment`;
            description = `Cognitive Profile: ${profileName} | Framing Bias: ${overallBias}% | Explore my detailed alignment heatmap and compass coordinates!`;
          }
        }
      } catch (err) {
        console.error("Error reading country config in result-page function:", err);
      }
    }

    // Determine host (Vercel assigns host header)
    const host = req.headers.host || 'coreopinion.org';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const ogImageUrl = `${protocol}://${host}/api/og?id=${id}`;
    const canonicalUrl = `${protocol}://${host}/result/${id}`;

    // 4. Substitute metadata tags in HTML.
    // title/description embed DB-derived values; escape them so a poisoned
    // row can't break out of the content="" attribute.
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

    // 5. Sanitize payload for client-side security
    const clientPayload = { ...result };
    delete clientPayload.email; // Omit email for privacy

    // 6. Inject payload — safeJsonForScript neutralizes </script> and raw
    // line terminators so an attacker-controlled row can't inject script.
    const injectionScript = `<script>window.viewResultPayload = ${safeJsonForScript(clientPayload)};</script>\n</head>`;
    html = html.replace('</head>', injectionScript);

    // 7. Serve HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err) {
    console.error("Error in result-page serving:", err);
    return res.status(500).send(`Server Error: ${err.message}`);
  }
};
