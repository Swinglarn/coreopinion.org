const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');
const { nationalityMap, modeToLang, PROFILES } = require('./utils');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// From address uses your verified coreopinion.org domain.
// Override via env if you want a different sender/display name.
const FROM_ADDRESS = process.env.RESEND_FROM || 'CoreOpinion <results@coreopinion.org>';

// Maps an overall framing-bias score to one of the six cognitive profiles.
// Mirrors the thresholds used in og.js and result-page.js so the email,
// the result page, and the OG card always agree.
function profileKeyForBias(overallBias) {
  if (overallBias <= 10) return 'axiom';
  if (overallBias <= 25) return 'analyst';
  if (overallBias <= 45) return 'pragmatist';
  if (overallBias <= 65) return 'empath';
  if (overallBias <= 85) return 'weathervane';
  return 'mirror';
}

// Resolves the top party + match % for country modes, reusing the same
// country-config lookup as the result page. Returns null for 'general'.
function resolvePartyMatch(result, biasBreakdown, lang) {
  if (!result.mode || result.mode === 'general') return null;
  try {
    const countryConfigPath = path.join(process.cwd(), 'src/countries', `${result.mode}.json`);
    if (!fs.existsSync(countryConfigPath)) return null;
    const config = JSON.parse(fs.readFileSync(countryConfigPath, 'utf8'));
    const partyMeta = config.partyMeta || {};
    const topPartyEntry = Object.entries(biasBreakdown)
      .filter(([k]) => !k.startsWith('__'))
      .sort((a, b) => b[1] - a[1])[0];
    if (!topPartyEntry || !partyMeta[topPartyEntry[0]]) return null;
    const rawName = partyMeta[topPartyEntry[0]].name;
    const partyName = typeof rawName === 'object'
      ? (rawName[lang] || rawName.en || Object.values(rawName)[0])
      : rawName;
    return { partyName, matchPct: Math.round(topPartyEntry[1]) };
  } catch (err) {
    console.error('Error resolving party match for email:', err);
    return null;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Builds the full HTML email body. Pure function of the result row + host,
// so it's easy to test in isolation.
function buildEmailHtml(result, host) {
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const eScore = result.econ_score !== null ? parseFloat(result.econ_score) : 0;
  const gScore = result.gov_score !== null ? parseFloat(result.gov_score) : 0;

  const biasBreakdown = result.bias_breakdown || {};
  const overallBias = biasBreakdown.__overall_bias !== undefined ? biasBreakdown.__overall_bias : 0;

  const lang = modeToLang[result.mode] || 'en';
  const tObj = PROFILES[lang] || PROFILES.en;
  const pKey = profileKeyForBias(overallBias);
  const profile = tObj[pKey] || PROFILES.en[pKey];

  const partyMatch = resolvePartyMatch(result, biasBreakdown, lang);
  const countryName = result.mode && result.mode !== 'general'
    ? (nationalityMap[result.mode] || result.mode.toUpperCase())
    : null;

  const resultUrl = `${baseUrl}/result/${result.id}`;
  const ogImageUrl = `${baseUrl}/api/og?id=${result.id}`;

  // Economic / governance descriptors for human-readable compass position
  const econLabel = eScore < -0.15 ? 'Left-leaning' : eScore > 0.15 ? 'Right-leaning' : 'Centrist';
  const govLabel = gScore < -0.15 ? 'Libertarian' : gScore > 0.15 ? 'Authoritarian' : 'Moderate';

  const partyBlock = partyMatch ? `
        <tr>
          <td style="padding: 10px 0; border-top: 1px solid #ECECEC;">
            <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">Closest party (${escapeHtml(countryName)})</div>
            <div style="font-size: 20px; font-weight: 600; color: #0A0C0F; margin-top: 4px;">${escapeHtml(partyMatch.partyName)} &middot; ${partyMatch.matchPct}% match</div>
          </td>
        </tr>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your CoreOpinion Result</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F5F7; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #ECECEC;">

          <tr>
            <td style="background-color: #0A0C0F; padding: 28px 32px;">
              <div style="font-size: 22px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.5px;">CoreOpinion</div>
              <div style="font-size: 14px; color: #9AA0A8; margin-top: 4px;">Your cognitive & political diagnostic</div>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 32px 8px;">
              <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">Cognitive profile</div>
              <div style="font-size: 30px; font-weight: 700; color: #0A0C0F; margin-top: 6px; letter-spacing: -1px;">${escapeHtml(profile.icon)} ${escapeHtml(profile.name)}</div>
              <div style="font-size: 15px; color: #4A4F58; line-height: 1.6; margin-top: 10px;">${escapeHtml(profile.desc)}</div>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 32px 8px;">
              <a href="${resultUrl}" style="display: block; text-decoration: none;">
                <img src="${ogImageUrl}" alt="Your CoreOpinion result card" width="100%" style="display: block; width: 100%; border-radius: 8px; border: 1px solid #ECECEC;">
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 8px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 10px 0;">
                    <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">Framing bias</div>
                    <div style="font-size: 20px; font-weight: 600; color: #0A0C0F; margin-top: 4px;">${overallBias}%</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-top: 1px solid #ECECEC;">
                    <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">Compass position</div>
                    <div style="font-size: 18px; font-weight: 600; color: #0A0C0F; margin-top: 4px;">${econLabel} &middot; ${govLabel}</div>
                    <div style="font-size: 13px; color: #7A7F88; margin-top: 2px;">Econ ${eScore.toFixed(2)} &middot; Gov ${gScore.toFixed(2)}</div>
                  </td>
                </tr>
                ${partyBlock}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px 32px;">
              <a href="${resultUrl}" style="display: inline-block; background-color: #1E4D8C; color: #FFFFFF; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px;">View your full result &rarr;</a>
              <div style="font-size: 13px; color: #9AA0A8; margin-top: 16px; line-height: 1.6;">This link is permanent &mdash; bookmark it to revisit or compare with friends.</div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #FAFAFB; padding: 20px 32px; border-top: 1px solid #ECECEC;">
              <div style="font-size: 12px; color: #9AA0A8; line-height: 1.6;">You received this because you completed a test at <a href="${baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. We don't send marketing email.</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildSubject(result) {
  const biasBreakdown = result.bias_breakdown || {};
  const overallBias = biasBreakdown.__overall_bias !== undefined ? biasBreakdown.__overall_bias : 0;
  const lang = modeToLang[result.mode] || 'en';
  const tObj = PROFILES[lang] || PROFILES.en;
  const pKey = profileKeyForBias(overallBias);
  const profile = tObj[pKey] || PROFILES.en[pKey];
  return `Your CoreOpinion result: ${profile.name}`;
}

// Sends the result email. Designed to be awaited but to NEVER throw —
// a failure here must not break the save flow. Returns {sent, error}.
async function sendResultEmail(result, host) {
  if (!result || !result.email) {
    return { sent: false, error: 'no_email' };
  }
  if (!resend) {
    console.warn('RESEND_API_KEY missing — skipping result email.');
    return { sent: false, error: 'no_api_key' };
  }
  try {
    const html = buildEmailHtml(result, host);
    const subject = buildSubject(result);
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: result.email,
      subject,
      html
    });
    if (error) {
      console.error('Resend send error:', error);
      return { sent: false, error: error.message || 'resend_error' };
    }
    return { sent: true, id: data && data.id };
  } catch (err) {
    console.error('Unexpected error sending result email:', err);
    return { sent: false, error: err.message };
  }
}

module.exports = { sendResultEmail, buildEmailHtml, buildSubject };
