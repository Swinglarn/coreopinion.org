const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');
const { nationalityMap, modeToLang, COUNTRY_NAMES, resolveLang, PROFILES } = require('./utils');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// From address uses your verified coreopinion.org domain.
// Override via env if you want a different sender/display name.
const FROM_ADDRESS = process.env.RESEND_FROM || 'CoreOpinion <results@coreopinion.org>';

const EMAIL_STRINGS = {
  en: {
    subject: "Your CoreOpinion result: {profile}",
    headerSubtitle: "Your cognitive & political diagnostic",
    cognitiveProfile: "Cognitive profile",
    imageAlt: "Your CoreOpinion result card",
    framingBias: "Framing bias",
    compassPosition: "Compass position",
    closestParty: "Closest party ({country})",
    matchText: "{pct}% match",
    econLabels: { left: "Left-leaning", right: "Right-leaning", centrist: "Centrist" },
    govLabels: { lib: "Libertarian", auth: "Authoritarian", moderate: "Moderate" },
    axisShort: { econ: "Econ", gov: "Gov" },
    viewFullResult: "View your full result →",
    permanentNote: "This link is permanent — bookmark it to revisit or compare with friends.",
    footerText: 'You received this because you completed a test at <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. We don\'t send marketing email.'
  },
  sv: {
    subject: "Ditt CoreOpinion-resultat: {profile}",
    headerSubtitle: "Din kognitiva och politiska diagnos",
    cognitiveProfile: "Kognitiv profil",
    imageAlt: "Ditt CoreOpinion-resultatkort",
    framingBias: "Formuleringsbias",
    compassPosition: "Position på kompassen",
    closestParty: "Närmaste parti ({country})",
    matchText: "{pct}% matchning",
    econLabels: { left: "Vänsterorienterad", right: "Högerorienterad", centrist: "Centrist" },
    govLabels: { lib: "Libertär", auth: "Auktoritär", moderate: "Moderat" },
    axisShort: { econ: "Ekonomi", gov: "Stat" },
    viewFullResult: "Se hela ditt resultat →",
    permanentNote: "Denna länk är permanent – spara den som bokmärke för att återkomma eller jämföra med vänner.",
    footerText: 'Du fick detta mejl eftersom du genomförde ett test på <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. Vi skickar aldrig marknadsföringsmejl.'
  },
  de: {
    subject: "Dein CoreOpinion-Ergebnis: {profile}",
    headerSubtitle: "Deine kognitive & politische Diagnose",
    cognitiveProfile: "Kognitives Profil",
    imageAlt: "Deine CoreOpinion-Ergebniskarte",
    framingBias: "Formulierungs-Bias",
    compassPosition: "Kompass-Position",
    closestParty: "Nächste Partei ({country})",
    matchText: "{pct}% Übereinstimmung",
    econLabels: { left: "Linksgerichtet", right: "Rechtsgerichtet", centrist: "Zentrist" },
    govLabels: { lib: "Libertär", auth: "Autoritär", moderate: "Moderat" },
    axisShort: { econ: "Wirtsch.", gov: "Staat" },
    viewFullResult: "Vollständiges Ergebnis ansehen →",
    permanentNote: "Dieser Link ist dauerhaft – speichere ihn als Lesezeichen, um ihn wieder aufzurufen oder mit Freunden zu vergleichen.",
    footerText: 'Du hast diese E-Mail erhalten, weil du einen Test auf <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a> ausgefüllt hast. Wir versenden keine Marketing-E-Mails.'
  },
  fr: {
    subject: "Votre résultat CoreOpinion : {profile}",
    headerSubtitle: "Votre diagnostic cognitif et politique",
    cognitiveProfile: "Profil cognitif",
    imageAlt: "Votre carte de résultat CoreOpinion",
    framingBias: "Biais de cadrage",
    compassPosition: "Position sur le compas",
    closestParty: "Parti le plus proche ({country})",
    matchText: "{pct}% de correspondance",
    econLabels: { left: "Orienté à gauche", right: "Orienté à droite", centrist: "Centriste" },
    govLabels: { lib: "Libertaire", auth: "Autoritaire", moderate: "Modéré" },
    axisShort: { econ: "Écon.", gov: "Gouv." },
    viewFullResult: "Voir votre résultat complet →",
    permanentNote: "Ce lien est permanent — enregistrez-le pour le consulter à nouveau ou le comparer avec des amis.",
    footerText: 'Vous avez reçu cet e-mail car vous avez passé un test sur <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. Nous n\'envoyons pas d\'e-mails marketing.'
  },
  es: {
    subject: "Tu resultado de CoreOpinion: {profile}",
    headerSubtitle: "Tu diagnóstico cognitivo y político",
    cognitiveProfile: "Perfil cognitivo",
    imageAlt: "Tu tarjeta de resultados de CoreOpinion",
    framingBias: "Sesgo de encuadre",
    compassPosition: "Posición en la brújula",
    closestParty: "Partido más cercano ({country})",
    matchText: "{pct}% de coincidencia",
    econLabels: { left: "De izquierda", right: "De derecha", centrist: "Centrista" },
    govLabels: { lib: "Libertario", auth: "Autoritario", moderate: "Moderado" },
    axisShort: { econ: "Econ.", gov: "Gob." },
    viewFullResult: "Ver tu resultado completo →",
    permanentNote: "Este enlace es permanente: guárdalo en marcadores para volver a visitarlo o compararlo con amigos.",
    footerText: 'Recibiste este correo porque completaste una prueba en <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. No enviamos correos de marketing.'
  },
  it: {
    subject: "Il tuo risultato CoreOpinion: {profile}",
    headerSubtitle: "La tua diagnosi cognitiva e politica",
    cognitiveProfile: "Profilo cognitivo",
    imageAlt: "La tua scheda dei risultati CoreOpinion",
    framingBias: "Bias di framing",
    compassPosition: "Posizione sulla bussola",
    closestParty: "Partito più vicino ({country})",
    matchText: "{pct}% di corrispondenza",
    econLabels: { left: "Di sinistra", right: "Di destra", centrist: "Centrista" },
    govLabels: { lib: "Libertario", auth: "Autoritario", moderate: "Moderato" },
    axisShort: { econ: "Econ.", gov: "Gov." },
    viewFullResult: "Visualizza il tuo risultato completo →",
    permanentNote: "Questo link è permanente: salvalo tra i preferiti per rivederlo o confrontarlo con gli amici.",
    footerText: 'Hai ricevuto questa email perché hai completato un test su <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. Non inviamo email di marketing.'
  },
  nl: {
    subject: "Jouw CoreOpinion-resultaat: {profile}",
    headerSubtitle: "Jouw cognitieve en politieke diagnose",
    cognitiveProfile: "Cognitief profiel",
    imageAlt: "Jouw CoreOpinion-resultaatkaart",
    framingBias: "Framing-bias",
    compassPosition: "Kompaspositie",
    closestParty: "Dichtstbijzijnde partij ({country})",
    matchText: "{pct}% overeenkomst",
    econLabels: { left: "Linksgeoriënteerd", right: "Rechtsgeoriënteerd", centrist: "Centrist" },
    govLabels: { lib: "Libertair", auth: "Autoritair", moderate: "Gematigd" },
    axisShort: { econ: "Econ.", gov: "Bestuur" },
    viewFullResult: "Bekijk je volledige resultaat →",
    permanentNote: "Deze link is permanent — bewaar hem als bladwijzer om later terug te kijken of te vergelijken met vrienden.",
    footerText: 'Je hebt deze e-mail ontvangen omdat je een test hebt gedaan op <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. We sturen geen marketing-e-mails.'
  },
  da: {
    subject: "Dit CoreOpinion-resultat: {profile}",
    headerSubtitle: "Din kognitive og politiske diagnose",
    cognitiveProfile: "Kognitiv profil",
    imageAlt: "Dit CoreOpinion-resultatkort",
    framingBias: "Framing-bias",
    compassPosition: "Kompasposition",
    closestParty: "Nærmeste parti ({country})",
    matchText: "{pct}% match",
    econLabels: { left: "Venstreorienteret", right: "Højreorienteret", centrist: "Centrist" },
    govLabels: { lib: "Libertær", auth: "Autoritær", moderate: "Moderat" },
    axisShort: { econ: "Økon.", gov: "Stat" },
    viewFullResult: "Se dit fulde resultat →",
    permanentNote: "Dette link er permanent – gem det som bogmærke for at gense eller sammenligne med venner.",
    footerText: 'Du modtog denne e-mail, fordi du gennemførte en test på <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. Vi sender ikke markedsføringsmails.'
  },
  no: {
    subject: "Ditt CoreOpinion-resultat: {profile}",
    headerSubtitle: "Din kognitive og politiske diagnose",
    cognitiveProfile: "Kognitiv profil",
    imageAlt: "Ditt CoreOpinion-resultatkort",
    framingBias: "Framing-bias",
    compassPosition: "Kompassposisjon",
    closestParty: "Nærmeste parti ({country})",
    matchText: "{pct}% match",
    econLabels: { left: "Venstreorientert", right: "Høyreorientert", centrist: "Sentrum" },
    govLabels: { lib: "Libertær", auth: "Autoritær", moderate: "Moderat" },
    axisShort: { econ: "Økon.", gov: "Stat" },
    viewFullResult: "Se hele resultatet ditt →",
    permanentNote: "Denne lenken er permanent – lagre den som bokmerke for å gå tilbake eller sammenligne med venner.",
    footerText: 'Du mottok denne e-posten fordi du fullførte en test på <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. Vi sender ikke markedsførings-e-poster.'
  },
  fi: {
    subject: "CoreOpinion-tuloksesi: {profile}",
    headerSubtitle: "Kognitiivinen ja poliittinen diagnoosisi",
    cognitiveProfile: "Kognitiivinen profiili",
    imageAlt: "CoreOpinion-tuloskorttisi",
    framingBias: "Kehystysharha",
    compassPosition: "Kompassiasema",
    closestParty: "Lähin puolue ({country})",
    matchText: "{pct}% vastaavuus",
    econLabels: { left: "Vasemmistolainen", right: "Oikeistolainen", centrist: "Keskustalainen" },
    govLabels: { lib: "Libertaarinen", auth: "Autoritaarinen", moderate: "Maltillinen" },
    axisShort: { econ: "Talous", gov: "Hallinto" },
    viewFullResult: "Katso koko tuloksesi →",
    permanentNote: "Tämä linkki on pysyvä – tallenna se kirjanmerkkeihin palataksesi siihen tai vertaillaksesi ystävien kanssa.",
    footerText: 'Sait tämän viestin, koska teit testin osoitteessa <a href="{baseUrl}" style="color: #1E4D8C; text-decoration: none;">coreopinion.org</a>. Emme lähetä markkinointisähköposteja.'
  }
};

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

  const lang = resolveLang(result);
  const tObj = PROFILES[lang] || PROFILES.en;
  const pKey = profileKeyForBias(overallBias);
  const profile = tObj[pKey] || PROFILES.en[pKey];

  const str = EMAIL_STRINGS[lang] || EMAIL_STRINGS.en;
  const partyMatch = resolvePartyMatch(result, biasBreakdown, lang);

  const countryNamesMap = COUNTRY_NAMES[lang] || COUNTRY_NAMES.en;
  const countryName = result.mode && result.mode !== 'general'
    ? (countryNamesMap[result.mode] || nationalityMap[result.mode] || result.mode.toUpperCase())
    : null;

  const resultUrl = `${baseUrl}/result/${result.id}`;
  const ogImageUrl = `${baseUrl}/api/og?id=${result.id}`;

  // Economic / governance descriptors for human-readable compass position
  const econLabel = eScore < -0.15 ? str.econLabels.left : eScore > 0.15 ? str.econLabels.right : str.econLabels.centrist;
  const govLabel = gScore < -0.15 ? str.govLabels.lib : gScore > 0.15 ? str.govLabels.auth : str.govLabels.moderate;

  const closestPartyTitle = str.closestParty.replace('{country}', escapeHtml(countryName || ''));
  const matchFormatted = str.matchText.replace('{pct}', partyMatch ? partyMatch.matchPct : 0);

  const partyBlock = partyMatch ? `
        <tr>
          <td style="padding: 10px 0; border-top: 1px solid #ECECEC;">
            <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">${closestPartyTitle}</div>
            <div style="font-size: 20px; font-weight: 600; color: #0A0C0F; margin-top: 4px;">${escapeHtml(partyMatch.partyName)} &middot; ${matchFormatted}</div>
          </td>
        </tr>` : '';

  const renderedFooter = str.footerText.replace('{baseUrl}', baseUrl);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(str.subject.replace('{profile}', profile.name))}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F5F7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F5F7; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #ECECEC;">

          <tr>
            <td style="background-color: #0A0C0F; padding: 28px 32px;">
              <div style="font-size: 22px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.5px;">CoreOpinion</div>
              <div style="font-size: 14px; color: #9AA0A8; margin-top: 4px;">${escapeHtml(str.headerSubtitle)}</div>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 32px 8px;">
              <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(str.cognitiveProfile)}</div>
              <div style="font-size: 30px; font-weight: 700; color: #0A0C0F; margin-top: 6px; letter-spacing: -1px;">${escapeHtml(profile.icon)} ${escapeHtml(profile.name)}</div>
              <div style="font-size: 15px; color: #4A4F58; line-height: 1.6; margin-top: 10px;">${escapeHtml(profile.desc)}</div>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 32px 8px;">
              <a href="${resultUrl}" style="display: block; text-decoration: none;">
                <img src="${ogImageUrl}" alt="${escapeHtml(str.imageAlt)}" width="100%" style="display: block; width: 100%; border-radius: 8px; border: 1px solid #ECECEC;">
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 8px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 10px 0;">
                    <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(str.framingBias)}</div>
                    <div style="font-size: 20px; font-weight: 600; color: #0A0C0F; margin-top: 4px;">${overallBias}%</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-top: 1px solid #ECECEC;">
                    <div style="font-size: 13px; color: #7A7F88; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(str.compassPosition)}</div>
                    <div style="font-size: 18px; font-weight: 600; color: #0A0C0F; margin-top: 4px;">${escapeHtml(econLabel)} &middot; ${escapeHtml(govLabel)}</div>
                    <div style="font-size: 13px; color: #7A7F88; margin-top: 2px;">${escapeHtml(str.axisShort.econ)} ${eScore.toFixed(2)} &middot; ${escapeHtml(str.axisShort.gov)} ${gScore.toFixed(2)}</div>
                  </td>
                </tr>
                ${partyBlock}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px 32px;">
              <a href="${resultUrl}" style="display: inline-block; background-color: #1E4D8C; color: #FFFFFF; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px;">${escapeHtml(str.viewFullResult)}</a>
              <div style="font-size: 13px; color: #9AA0A8; margin-top: 16px; line-height: 1.6;">${escapeHtml(str.permanentNote)}</div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #FAFAFB; padding: 20px 32px; border-top: 1px solid #ECECEC;">
              <div style="font-size: 12px; color: #9AA0A8; line-height: 1.6;">${renderedFooter}</div>
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
  const lang = resolveLang(result);
  const tObj = PROFILES[lang] || PROFILES.en;
  const pKey = profileKeyForBias(overallBias);
  const profile = tObj[pKey] || PROFILES.en[pKey];
  const str = EMAIL_STRINGS[lang] || EMAIL_STRINGS.en;
  return str.subject.replace('{profile}', `${profile.icon} ${profile.name}`);
}

// Sends the result email. Designed to be awaited but to NEVER throw  - 
// a failure here must not break the save flow. Returns {sent, error}.
async function sendResultEmail(result, host) {
  if (!result || !result.email) {
    return { sent: false, error: 'no_email' };
  }
  if (!resend) {
    console.warn('RESEND_API_KEY missing - skipping result email.');
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

module.exports = { sendResultEmail, buildEmailHtml, buildSubject, EMAIL_STRINGS };
