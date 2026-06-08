const { createClient } = require('@supabase/supabase-js');

const SB_URL = process.env.SUPABASE_URL || 'https://rttomfnfyjjssdqfzkaj.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!SB_KEY) {
  console.warn("Supabase API key is missing. Ensure SUPABASE_KEY or SUPABASE_SERVICE_ROLE_KEY is set in Vercel.");
}

const supabase = SB_KEY ? createClient(SB_URL, SB_KEY) : null;

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
    "pragmatist": { "name": "Pragmatikeren", "icon": "⚖️", "desc": "Du har faste kjerneholdninger, men justerer dem i marginen baserat på reelle scenarier." },
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

module.exports = {
  supabase,
  nationalityMap,
  modeToLang,
  PROFILES
};
