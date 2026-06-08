const { supabase, nationalityMap, modeToLang, PROFILES } = require('./utils');
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

module.exports = async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }

  try {
    // 1. Fetch from Supabase
    const { data: result, error } = await supabase
      .from('coreopinion_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !result) {
      console.error("Supabase fetch error for OG image:", error);
      return res.status(404).json({ error: 'Result not found' });
    }

    // 2. Extract values and defaults
    const eScore = result.econ_score !== null ? parseFloat(result.econ_score) : 0;
    const gScore = result.gov_score !== null ? parseFloat(result.gov_score) : 0;
    
    let biasBreakdown = result.bias_breakdown || {};
    let overallBias = 0;
    if (biasBreakdown.__overall_bias !== undefined) {
      overallBias = biasBreakdown.__overall_bias;
    }

    // Determine lang
    const lang = modeToLang[result.mode] || 'en';
    const tObj = PROFILES[lang] || PROFILES['en'];

    // Get cognitive profile key & details
    let profileKey = 'analyst';
    if (overallBias <= 10) profileKey = 'axiom';
    else if (overallBias <= 25) profileKey = 'analyst';
    else if (overallBias <= 45) profileKey = 'pragmatist';
    else if (overallBias <= 65) profileKey = 'empath';
    else if (overallBias <= 85) profileKey = 'weathervane';
    else profileKey = 'mirror';

    const profile = tObj[profileKey] || PROFILES['en'][profileKey];

    // Determine Top Party alignment (if country mode)
    let partyName = '';
    let matchPct = 0;
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
            partyName = typeof rawName === 'object' ? (rawName[lang] || rawName['en'] || Object.values(rawName)[0]) : rawName;
            matchPct = Math.round(topPartyEntry[1]);
          }
        }
      } catch (err) {
        console.error("Error reading country config in OG function:", err);
      }
    }

    // Coordinates mapping with boundary clamps to guarantee dot stays on-canvas
    const cx = Math.max(5, Math.min(205, 105 + (eScore * 96)));
    const cy = Math.max(5, Math.min(205, 105 - (gScore * 96)));

    // 3. Load SVG template
    const svgPath = path.join(process.cwd(), 'og-image.svg');
    let svgContent = fs.readFileSync(svgPath, 'utf8');

    // 4. Substitute values in SVG
    // Dot placement
    svgContent = svgContent.replace(
      /<circle cx="[^"]*" cy="[^"]*" r="11" fill="#1E4D8C"\/>/,
      `<circle cx="${cx}" cy="${cy}" r="11" fill="#1E4D8C"/>`
    );
    svgContent = svgContent.replace(
      /<circle cx="[^"]*" cy="[^"]*" r="18" fill="#1E4D8C" opacity="0.15"\/>/,
      `<circle cx="${cx}" cy="${cy}" r="18" fill="#1E4D8C" opacity="0.15"/>`
    );

    // Headline
    const profileText = `${profile.icon} ${profile.name}`;
    const headlineLine1 = lang === 'en' ? `Cognitive Profile: ${profileText}` : `Kognitiv profil: ${profileText}`;
    
    let headlineLine2 = '';
    if (partyName) {
      const countryName = nationalityMap[result.mode] || result.mode.toUpperCase();
      headlineLine2 = `${countryName}: ${matchPct}% ${partyName} | ${overallBias}% Bias`;
    } else {
      headlineLine2 = lang === 'en' ? `Framing Bias: ${overallBias}% | Compass: Econ ${eScore.toFixed(1)}, Gov ${gScore.toFixed(1)}` : `Framing bias: ${overallBias}% | Compass: Econ ${eScore.toFixed(1)}, Gov ${gScore.toFixed(1)}`;
    }

    const headlineReplacement = `<!-- Headline -->
  <text x="80" y="248" font-family="Georgia,'Times New Roman',serif" font-size="52"
        font-weight="700" fill="#0A0C0F" letter-spacing="-1.5">${headlineLine1}</text>
  <text x="80" y="325" font-family="Georgia,'Times New Roman',serif" font-size="52"
        font-weight="700" fill="#0A0C0F" letter-spacing="-1.5">${headlineLine2}</text>`;

    svgContent = svgContent.replace(/<!-- Headline -->[\s\S]*?<\/text>\s*<text[\s\S]*?<\/text>/, headlineReplacement);

    // Subline description
    const profileDesc = profile.desc;
    function splitText(text, maxLineLen = 65) {
      if (text.length <= maxLineLen) return `<tspan x="80" dy="0">${text}</tspan>`;
      let splitIdx = text.lastIndexOf(' ', maxLineLen);
      if (splitIdx === -1) splitIdx = maxLineLen;
      const line1 = text.substring(0, splitIdx);
      const line2 = text.substring(splitIdx + 1);
      return `<tspan x="80" dy="0">${line1}</tspan><tspan x="80" dy="26">${line2}</tspan>`;
    }

    const sublineReplacement = `<!-- Subline -->
  <text x="80" y="385" font-family="Outfit,sans-serif" font-size="18"
        font-weight="300" fill="#7A7F88">${splitText(profileDesc)}</text>`;

    svgContent = svgContent.replace(/<!-- Subline -->[\s\S]*?<\/text>/, sublineReplacement);

    // 5. Render SVG to PNG using resvg-js
    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: 1200
      }
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // 6. Return response
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
    return res.status(200).send(pngBuffer);
  } catch (err) {
    console.error("Unexpected error in OG card function:", err);
    return res.status(500).json({ error: err.message });
  }
};
