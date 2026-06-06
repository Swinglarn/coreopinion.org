const { createClient } = require('@supabase/supabase-js');
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const SB_URL = process.env.SUPABASE_URL || 'https://rttomfnfyjjssdqfzkaj.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dG9tZm5meWpqc3NkcWZ6a2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODcwMjEsImV4cCI6MjA4ODU2MzAyMX0.0qBogK8xywL77IFYj4IywZIhHyKjbvbVmXYvG6wAZGw';

const supabase = createClient(SB_URL, SB_KEY);

const PROFILES = {
  "en": {
    "axiom": { "name": "The Axiom", "icon": "🔷", "desc": "Unmovable. Your principles hold regardless of framing, context, or emotional appeal." },
    "analyst": { "name": "The Analyst", "icon": "🔬", "desc": "Highly consistent with minor contextual flexibility. You distinguish policy mechanics from rhetoric." },
    "pragmatist": { "name": "The Pragmatist", "icon": "⚖️", "desc": "You hold core positions but adjust at the margins based on real-world scenarios." },
    "empath": { "name": "The Empath", "icon": "🌊", "desc": "You respond strongly to human stories and emotional context. Your positions shift with the narrative." },
    "weathervane": { "name": "The Weathervane", "icon": "🌪️", "desc": "Framing significantly reshapes your stance. You may hold different positions on the same issue depending on how it's presented." },
    "mirror": { "name": "The Mirror", "icon": "🪞", "desc": "Your answers reflect whatever frame is presented. You may not have stable underlying positions on many issues." }
  },
  "de": {
    "axiom": { "name": "Das Axiom", "icon": "🔷", "desc": "Unerschütterlich. Deine Prinzipien gelten unabhängig von Formulierung, Kontext oder emotionalem Appell." },
    "analyst": { "name": "Der Analyst", "icon": "🔬", "desc": "Sehr konsistent mit geringer kontextueller Flexibilität. Du unterscheidest politische Mechanismen von Rhetorik." },
    "pragmatist": { "name": "Der Pragmatiker", "icon": "⚖️", "desc": "Du vertrittst feste Kernpositionen, passt sie aber in konkreten Szenarien an den Rändern an." },
    "empath": { "name": "Der Empath", "icon": "🌊", "desc": "Du reagierst stark auf menschliche Geschichten und emotionalen Kontext. Deine Positionen verschieben sich mit dem Narrativ." },
    "weathervane": { "name": "Die Wetterfahne", "icon": "🌪️", "desc": "Die Formulierung prägt deine Haltung erheblich. Du vertrittst je nach Darstellung unterschiedliche Positionen zum selben Thema." },
    "mirror": { "name": "Der Spiegel", "icon": "🪞", "desc": "Deine Antworten spiegeln den vorgegebenen Rahmen wider. Du hast bei vielen Themen keine stabilen Grundpositionen." }
  },
  "fr": {
    "axiom": { "name": "L'Axiome", "icon": "🔷", "desc": "Inébranlable. Vos principes tiennent indépendamment de la formulation, du contexte ou de l'appel émotionnel." },
    "analyst": { "name": "L'Analyste", "icon": "🔬", "desc": "Très cohérent avec une flexibilité contextuelle mineure. Vous distinguez les mécanismes politiques de la rhétorique." },
    "pragmatist": { "name": "Le Pragmatique", "icon": "⚖️", "desc": "Vous maintenez des positions fondamentales mais les ajustez aux marges en fonction des scénarios réels." },
    "empath": { "name": "L'Empathe", "icon": "🌊", "desc": "Vous réagissez fortement aux récits humains et au contexte émotionnel. Vos positions varient avec le récit." },
    "weathervane": { "name": "La Girouette", "icon": "🌪️", "desc": "La formulation façonne considérablement votre position. Vous pouvez avoir des avis différents sur un même sujet selon sa présentation." },
    "mirror": { "name": "Le Miroir", "icon": "🪞", "desc": "Vos réponses reflètent le cadrage présenté. Vous n'avez pas de position stable sur de nombreux sujets." }
  },
  "es": {
    "axiom": { "name": "El Axioma", "icon": "🔷", "desc": "Inamovible. Tus principios se mantienen firmes sin importar el encuadre, el contexto o el llamado emocional." },
    "analyst": { "name": "El Analista", "icon": "🔬", "desc": "Altamente consistente con una leve flexibilidad contextual. Distingues los mecanismos de política de la retórica." },
    "pragmatist": { "name": "El Pragmático", "icon": "⚖️", "desc": "Mantienes posiciones fundamentales pero las ajustas en los márgenes basándote en escenarios reales." },
    "empath": { "name": "El Empático", "icon": "🌊", "desc": "Respondes fuertemente a las historias humanas y al contexto emocional. Tus posiciones cambian con la narrativa." },
    "weathervane": { "name": "La Veleta", "icon": "🌪️", "desc": "El encuadre redefine significativamente tu postura. Puedes tener posiciones diferentes sobre el mismo tema según cómo se presente." },
    "mirror": { "name": "El Espejo", "icon": "🪞", "desc": "Tus respuestas reflejan cualquier encuadre que se presente. Podrías no tener posiciones subyacentes estables en muchos temas." }
  },
  "it": {
    "axiom": { "name": "L'Assioma", "icon": "🔷", "desc": "Inamovibile. I tuoi principi rimangono saldi indipendentemente dall'incorniciamento, dal contesto o dal richiamo emotivo." },
    "analyst": { "name": "L'Analista", "icon": "🔬", "desc": "Altamente coerente con una lieve flessibilità contestuale. Distingui i meccanismi politici dalla retorica." },
    "pragmatist": { "name": "Il Pragmatico", "icon": "⚖️", "desc": "Mantieni posizioni fondamentali ma le adatti ai margini in base agli scenari reali." },
    "empath": { "name": "L'Empatico", "icon": "🌊", "desc": "Rispondi fortemente alle storie umane e al contesto emotivo. Le tue posizioni cambiano con la narrazione." },
    "weathervane": { "name": "La Banderuola", "icon": "🌪️", "desc": "L'incorniciamento rimodella significativamente la tua posizione. Puoi assumere posizioni diverse sullo stesso tema a seconda di come viene presentato." },
    "mirror": { "name": "Lo Specchio", "icon": "🪞", "desc": "Le tue risposte riflettono qualsiasi incorniciamento venga presentato. Potresti non avere posizioni di fondo stabili su molti argomenti." }
  },
  "nl": {
    "axiom": { "name": "Het Axioma", "icon": "🔷", "desc": "Onwrikbaar. Jouw principes houden stand ongeacht de formulering, context of emotionele oproep." },
    "analyst": { "name": "De Analist", "icon": "🔬", "desc": "Zeer consistent met minimale contextuele flexibiliteit. Je onderscheidt beleidsmechanismen van retoriek." },
    "pragmatist": { "name": "De Pragmaticus", "icon": "⚖️", "desc": "Je houdt vast aan kernstandpunten, maar past deze in concrete scenario's aan de marges aan." },
    "empath": { "name": "De Empaat", "icon": "🌊", "desc": "Je reageert sterk op menselijke verhalen en emotionele context. Je standpunten verschuiven met het narratief mee." },
    "weathervane": { "name": "De Windvaan", "icon": "🌪️", "desc": "Formulering vormt je standpunt in sterke mate. Je kunt per presentatie verschillende standpunten over hetzelfde onderwerp innemen." },
    "mirror": { "name": "De Spiegel", "icon": "🪞", "desc": "Je antwoorden weerspiegelen het gepresenteerde kader. Je hebt op veel gebieden geen stabiele onderliggende standpunten." }
  },
  "sv": {
    "axiom": { "name": "Axiomet", "icon": "🔷", "desc": "Orubblig. Dina principer håller oavsett formulering, sammanhang eller emotionella argument." },
    "analyst": { "name": "Analytikern", "icon": "🔬", "desc": "Mycket konsekvent med mindre kontextuell flexibilitet. Du skiljer på sakpolitik och retorik." },
    "pragmatist": { "name": "Pragmatikern", "icon": "⚖️", "desc": "Du har fasta ståndpunkter i grunden men anpassar dem i marginalen utifrån verkliga scenarier." },
    "empath": { "name": "Empaten", "icon": "🌊", "desc": "Du reagerar starkt på mänskliga berättelser och känslomässiga sammanhang. Dina åsikter skiftar med narrativet." },
    "weathervane": { "name": "Vindflöjeln", "icon": "🌪️", "desc": "Formuleringen formar dina ståndpunkter avsevärt. Du kan tycka olika i samma fråga beroende på hur den presenteras." },
    "mirror": { "name": "Spegeln", "icon": "🪞", "desc": "Dina svar speglar den vinkling som presenteras. Du saknar stabila underliggande åsikter i många frågor." }
  },
  "da": {
    "axiom": { "name": "Aksiomet", "icon": "🔷", "desc": "Urokkelig. Dine principper holder uanset formulering, kontekst of følelsesmæssig appel." },
    "analyst": { "name": "Analytikeren", "icon": "🔬", "desc": "Meget konsekvent med mindre kontekstuel fleksibilitet. Du skelner mellem politiske mekanismer og retorik." },
    "pragmatist": { "name": "Pragmatikeren", "icon": "⚖️", "desc": "Du har faste kerneholdninger, men tilpasser dem i marginen baseret på reelle scenarier." },
    "empath": { "name": "Empaten", "icon": "🌊", "desc": "Du reagerer stærkt på menneskelige historier og følelsesmæssig kontekst. Dine holdninger skifter med narrativet." },
    "weathervane": { "name": "Vejrhanen", "icon": "🌪️", "desc": "Formuleringen former dine holdninger betydeligt. Du kan have forskellige holdninger til samme emne afhængigt af, hvordan det præsenteres." },
    "mirror": { "name": "Spejlet", "icon": "🪞", "desc": "Dine svar afspejler den formulering, der præsenteres. Du har muligvis ikke stabile underliggende holdninger til mange emner." }
  },
  "no": {
    "axiom": { "name": "Aksiomet", "icon": "🔷", "desc": "Urokkelig. Dine prinsipper holder uanset formulering, kontekst eller følelsesmessig appell." },
    "analyst": { "name": "Analytikeren", "icon": "🔬", "desc": "Svært konsekvent med mindre kontekstuell fleksibilitet. Du skiller mellom politiske mekanismer og retorikk." },
    "pragmatist": { "name": "Pragmatikeren", "icon": "⚖️", "desc": "Du har faste kjerneholdninger, men justerer dem i marginen basert på reelle scenarier." },
    "empath": { "name": "Empaten", "icon": "🌊", "desc": "Du reagerer sterkt på menneskelige historier og følelsesmessig kontekst. Dine holdninger skifter med narrativet." },
    "weathervane": { "name": "Værhanen", "icon": "🌪️", "desc": "Formuleringen former dine holdninger betydelig. Du kan ha ulike holdninger til samme sak avhengig av hvordan den presenteres." },
    "mirror": { "name": "Speilet", "icon": "🪞", "desc": "Dine svar gjenspeiler den formuleringen som presenteres. Du har muligens ikke stabile underliggende holdninger til mange saker." }
  },
  "fi": {
    "axiom": { "name": "Aksiooma", "icon": "🔷", "desc": "Horjumaton. Periaatteesi pitävät riippumatta kehystyksestä, kontekstista tai tunnevalituksista." },
    "analyst": { "name": "Analyytikko", "icon": "🔬", "desc": "Erittäin johdonmukainen vähäisellä kontekstuaalisella joustavuudella. Erotat politiikan mekaniikan retoriikasta." },
    "pragmatist": { "name": "Pragmaatikko", "icon": "⚖️", "desc": "Pidät kiinni ydinkannoistasi, mutta sopeudat niitä marginaaleissa todellisten skenaarioiden perusteella." },
    "empath": { "name": "Empaatikko", "icon": "🌊", "desc": "Reagoit voimakkaasti inhimillisiin tarinoihin ja emotionaaliseen kontekstiin. Kantasi muuttuvat narratiivin mukaan." },
    "weathervane": { "name": "Tuuliviiri", "icon": "🌪️", "desc": "Kehystys muovaa kantaasi merkittävästi. Saatat olla eri mieltä samasta asiasta riippuen siitä, miten se esitetään." },
    "mirror": { "name": "Peili", "icon": "🪞", "desc": "Vastaukset heijastavat sitä kehystystä, joka esitetään. Sinulla ei ehkä ole vakaita taustakantoja monissa asioissa." }
  }
};

const modeToLang = {
  de: 'de',
  at: 'de',
  fr: 'fr',
  es: 'es',
  it: 'it',
  nl: 'nl',
  se: 'sv',
  dk: 'da',
  no: 'no',
  fi: 'fi'
};

const nationalityMap = {
  us: "United States",
  uk: "United Kingdom",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  de: "Germany",
  at: "Austria",
  fr: "France",
  es: "Spain",
  it: "Italy",
  se: "Sweden",
  ie: "Ireland",
  nl: "Netherlands",
  dk: "Denmark",
  no: "Norway",
  fi: "Finland"
};

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

    // Coordinates mapping
    const cx = 105 + (eScore * 96);
    const cy = 105 - (gScore * 96);

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
