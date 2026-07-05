const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src/template.html');
const countriesDir = path.join(__dirname, 'src/countries');
const outputDir = __dirname;

if (!fs.existsSync(templatePath)) {
  console.error("Error: src/template.html not found.");
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// Language and metadata definitions for localized portals
const langMap = {
  de: { langCode: 'de', localLang: 'Deutsch', engCountry: 'Germany', localCountry: 'Deutschland', defaultSelect: 'Auswählen...' },
  at: { langCode: 'de', localLang: 'Deutsch', engCountry: 'Austria', localCountry: 'Österreich', defaultSelect: 'Auswählen...' },
  fr: { langCode: 'fr', localLang: 'Français', engCountry: 'France', localCountry: 'France', defaultSelect: 'Sélectionner...' },
  es: { langCode: 'es', localLang: 'Español', engCountry: 'Spain', localCountry: 'España', defaultSelect: 'Seleccionar...' },
  it: { langCode: 'it', localLang: 'Italiano', engCountry: 'Italy', localCountry: 'Italia', defaultSelect: 'Seleziona...' },
  nl: { langCode: 'nl', localLang: 'Nederlands', engCountry: 'Netherlands', localCountry: 'Nederland', defaultSelect: 'Selecteer...' },
  se: { langCode: 'sv', localLang: 'Svenska', engCountry: 'Sweden', localCountry: 'Sverige', defaultSelect: 'Välj...' },
  dk: { langCode: 'da', localLang: 'Dansk', engCountry: 'Denmark', localCountry: 'Danmark', defaultSelect: 'Vælg...' },
  no: { langCode: 'no', localLang: 'Norsk', engCountry: 'Norway', localCountry: 'Norge', defaultSelect: 'Velg...' },
  fi: { langCode: 'fi', localLang: 'Suomi', engCountry: 'Finland', localCountry: 'Suomi', defaultSelect: 'Valitse...' }
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

// Full country list as no-JS fallback; engine.js upgrades this select
// into a searchable picker at runtime using the same names.
const nationalitiesList = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo (Republic)", "Congo (DRC)", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
  "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
];

const englishHeroTexts = {
  de: {
    heroTitle: "Where do you stand in<br><em>German</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining Germany right now. Crime, immigration, welfare, debt brakes, and energy. See your alignment across all parties."
  },
  at: {
    heroTitle: "Where do you stand in<br><em>Austrian</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining Austria right now. Migration, economy, neutrality, and climate. See your alignment across all parties."
  },
  fr: {
    heroTitle: "Where do you stand in<br><em>French</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining France right now. Economy, security, environment, pensions, and EU. See your alignment across all parties."
  },
  es: {
    heroTitle: "Where do you stand in<br><em>Spanish</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining Spain right now. Unemployment, regional autonomy, housing, and social policy. See your alignment across all parties."
  },
  it: {
    heroTitle: "Where do you stand in<br><em>Italian</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining Italy right now. Economic growth, migration, justice, and EU relations. See your alignment across all parties."
  },
  nl: {
    heroTitle: "Where do you stand in<br><em>Dutch</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining Netherlands right now. Housing, climate policy, migration, and healthcare. See your alignment across all parties."
  },
  se: {
    heroTitle: "Where do you stand in<br><em>Swedish</em> politics?",
    heroSub: "47 policy-focused questions and statements on the issues defining Sweden right now. Crime, migration, welfare, NATO, housing, and more. See your alignment across all eight Riksdag parties."
  },
  dk: {
    heroTitle: "Where do you stand in<br><em>Danish</em> politics?",
    heroSub: "30 policy-focused questions and statements on the issues defining Denmark right now. Welfare, immigration, climate, and taxes. See your alignment across all parties."
  },
  no: {
    heroTitle: "Where do you stand in<br><em>Norwegian</em> politics?",
    heroSub: "30 policy-focused questions and statements on the issues defining Norway right now. Taxes, welfare, oil, and immigration. See your alignment across all parties."
  },
  fi: {
    heroTitle: "Where do you stand in<br><em>Finnish</em> politics?",
    heroSub: "30 policy-focused questions and statements on the issues defining Finland right now. Defense, taxes, welfare, and immigration. See your alignment across all parties."
  }
};const staticUiTranslations = {
  en: {
    startBtn: "Start the test",
    howItWorks: "How it works",
    skipBtn: "Skip",
    backBtn: "Back",
    nextBtn: "Next",
    demoTitle: "Almost there.",
    demoSub: "A few quick questions before your results. Everything is anonymous.",
    seeResultsBtn: "See my results",
    lblAge: "Age",
    lblGender: "Gender <span>(optional)</span>",
    lblNat: "Nationality <span>(optional)</span>",
    optSelect: "Select...",
    optPreferNot: "Prefer not to say",
    optInd: "Independent / Other",
    ageSelectOpts: ['Under 18', '18 to 24', '25 to 34', '35 to 44', '45 to 54', '55 to 64', '65 or older'],
    genderSelectOpts: ['Male', 'Female', 'Other', 'Prefer not to say'],
    lblConsent: "<strong>Research Consent:</strong> I allow CoreOpinion to save my anonymous answers and demographics for research, statistics, and public polling dashboards.",
    demoNote: "This is never linked to your answers. It helps us understand who takes the test.",
    calcTitle: "Mapping your answers",
    calcSub: "This will only take a moment.",
    rEyebrow: "Your {Country} political alignment",
    saveTitle: "Save your results",
    saveDesc: "Enter your email and we will send you a link to these results. Never shared.",
    sendBtn: "Send results",
    copyBtn: "Copy results link",
    retakeBtn: "Retake",
    genBtn: "General test",
    modeTitle: "Choose your test length",
    modeSub: "Select how deep you want to analyze your political alignment and cognitive framing bias.",
    modeBadgeShort: "Quick",
    modeTitleShort: "Short Test",
    modeDescShort: "Provides a fast estimation of your political coordinates and general alignment.",
    modeBadgeMedium: "Recommended",
    modeTitleMedium: "Medium Test",
    modeDescMedium: "Our standard length. Delivers a reliable political quadrant and detailed cognitive framing analysis.",
    modeBadgeLong: "Thorough",
    modeTitleLong: "Long Test",
    modeDescLong: "Deep ideological dive. Analyzes edge cases, complex policy tradeoffs, and full bias metrics.",
    modeBtnSelect: "Select",
    modeBackBtn: "Back to home",
    questionsText: "questions",
    natNames: {
      'United States': 'United States',
      'United Kingdom': 'United Kingdom',
      'Canada': 'Canada',
      'Australia': 'Australia',
      'New Zealand': 'New Zealand',
      'Germany': 'Germany',
      'Austria': 'Austria',
      'France': 'France',
      'Spain': 'Spain',
      'Italy': 'Italy',
      'Sweden': 'Sweden',
      'Ireland': 'Ireland',
      'Netherlands': 'Netherlands',
      'Other': 'Other'
    }
  },
  de: {
    startBtn: "Test starten",
    howItWorks: "Wie es funktioniert",
    skipBtn: "Überspringen",
    backBtn: "Zurück",
    nextBtn: "Weiter",
    demoTitle: "Fast geschafft.",
    demoSub: "Einige kurze Fragen vor deinen Ergebnissen. Alles ist vollkommen anonym.",
    seeResultsBtn: "Ergebnisse ansehen",
    lblAge: "Alter",
    lblGender: "Geschlecht <span>(optional)</span>",
    lblNat: "Nationalität <span>(optional)</span>",
    optSelect: "Auswählen...",
    optPreferNot: "Lieber nicht sagen",
    optInd: "Unabhängig / Sonstige",
    ageSelectOpts: ['Unter 18', '18 bis 24', '25 bis 34', '35 bis 44', '45 bis 54', '55 bis 64', '65 oder älter'],
    genderSelectOpts: ['Männlich', 'Weiblich', 'Sonstiges', 'Lieber nicht sagen'],
    lblConsent: "<strong>Einwilligung zur Forschung:</strong> Ich gestatte CoreOpinion, meine anonymen Antworten und demografischen Daten für Forschung, Statistiken und öffentliche Wahl-Dashboards zu speichern.",
    demoNote: "Dies wird niemals mit deinen Antworten verknüpft. Es hilft uns zu verstehen, wer an dem Test teilnimmt.",
    calcTitle: "Antworten werden ausgewertet",
    calcSub: "Dies wird nur einen Moment dauern.",
    rEyebrow: "Deine politische Übereinstimmung in {Country}",
    saveTitle: "Ergebnisse speichern",
    saveDesc: "Gib deine E-Mail ein und wir senden dir einen Link zu diesen Ergebnissen. Niemals weitergegeben.",
    sendBtn: "Ergebnisse senden",
    copyBtn: "Ergebnis-Link kopieren",
    retakeBtn: "Wiederholen",
    genBtn: "Allgemeiner Test",
    modeTitle: "Wähle deine Testlänge",
    modeSub: "Wähle, wie tiefgehend du deine politische Übereinstimmung und kognitive Framing-Verzerrung analysieren möchtest.",
    modeBadgeShort: "Schnell",
    modeTitleShort: "Kurzer Test",
    modeDescShort: "Bietet eine schnelle Einschätzung deiner politischen Koordinaten und der allgemeinen Ausrichtung.",
    modeBadgeMedium: "Empfohlen",
    modeTitleMedium: "Mittlerer Test",
    modeDescMedium: "Unsere Standardlänge. Liefert einen zuverlässigen politischen Quadranten und eine detaillierte Framing-Analyse.",
    modeBadgeLong: "Gründlich",
    modeTitleLong: "Langer Test",
    modeDescLong: "Tiefer ideologischer Einblick. Analysiert Grenzfälle, komplexe politische Abwägungen und vollständige Metriken.",
    modeBtnSelect: "Auswählen",
    modeBackBtn: "Zurück zur Startseite",
    questionsText: "Fragen",
    natNames: {
      'United States': "Vereinigte Staaten",
      'United Kingdom': "Vereinigtes Königreich",
      'Canada': "Kanada",
      'Australia': "Australien",
      'New Zealand': "Neuseeland",
      'Germany': "Deutschland",
      'Austria': "Österreich",
      'France': "Frankreich",
      'Spain': "Spanien",
      'Italy': "Italien",
      'Sweden': "Schweden",
      'Ireland': "Irland",
      'Netherlands': "Niederlande",
      'Other': "Sonstige"
    }
  },
  fr: {
    startBtn: "Démarrer le test",
    howItWorks: "Comment ça marche",
    skipBtn: "Passer",
    backBtn: "Retour",
    nextBtn: "Suivant",
    demoTitle: "Presque fini.",
    demoSub: "Quelques questions rapides avant vos résultats. Tout est anonyme.",
    seeResultsBtn: "Voir mes résultats",
    lblAge: "Âge",
    lblGender: "Genre <span>(facultatif)</span>",
    lblNat: "Nationalité <span>(facultatif)</span>",
    optSelect: "Sélectionner...",
    optPreferNot: "Préfère ne pas répondre",
    optInd: "Indépendant / Autre",
    ageSelectOpts: ['Moins de 18 ans', '18 à 24 ans', '25 à 34 ans', '35 à 44 ans', '45 à 54 ans', '55 à 64 ans', '65 ans ou plus'],
    genderSelectOpts: ['Homme', 'Femme', 'Autre', 'Préfère ne pas répondre'],
    lblConsent: "<strong>Consentement de recherche :</strong> J’autorise CoreOpinion à enregistrer mes réponses anonymes et mes données démographiques pour la recherche, les statistiques et les tableaux de bord de sondages publics.",
    demoNote: "Ceci n'est jamais lié à vos réponses. Cela nous aide à comprendre qui passe le test.",
    calcTitle: "Analyse de vos réponses",
    calcSub: "Cela ne prendra qu'un instant.",
    rEyebrow: "Votre alignement politique en {Country}",
    saveTitle: "Enregistrer vos résultats",
    saveDesc: "Saisissez votre e-mail et nous vous enverrons un lien vers vos résultats. Jamais partagé.",
    sendBtn: "Envoyer les résultats",
    copyBtn: "Copier le lien des résultats",
    retakeBtn: "Recommencer",
    genBtn: "Test général",
    modeTitle: "Choisissez la longueur du test",
    modeSub: "Sélectionnez le niveau de profondeur pour analyser votre alignement politique et votre biais de cadrage cognitif.",
    modeBadgeShort: "Rapide",
    modeTitleShort: "Test court",
    modeDescShort: "Fournit une estimation rapide de vos coordonnées politiques et de votre alignement général.",
    modeBadgeMedium: "Recommandé",
    modeTitleMedium: "Test moyen",
    modeDescMedium: "Notre longueur standard. Fournit un quadrant politique fiable et une analyse détaillée du cadrage.",
    modeBadgeLong: "Approfondi",
    modeTitleLong: "Test long",
    modeDescLong: "Plongée idéologique profonde. Analyse les cas limites, les compromis politiques complexes et les biais complets.",
    modeBtnSelect: "Sélectionner",
    modeBackBtn: "Retour à l'accueil",
    questionsText: "questions",
    natNames: {
      'United States': "États-Unis",
      'United Kingdom': "Royaume-Uni",
      'Canada': "Canada",
      'Australia': "Australie",
      'New Zealand': "Nouvelle-Zélande",
      'Germany': "Allemagne",
      'Austria': "Autriche",
      'France': "France",
      'Spain': "Espagne",
      'Italy': "Italie",
      'Sweden': "Suède",
      'Ireland': "Irlande",
      'Netherlands': "Pays-Bas",
      'Other': "Autre"
    }
  },
  es: {
    startBtn: "Iniciar el test",
    howItWorks: "Cómo funciona",
    skipBtn: "Saltar",
    backBtn: "Atrás",
    nextBtn: "Siguiente",
    demoTitle: "Casi hemos terminado.",
    demoSub: "Unas pocas preguntas rápidas antes de ver tus resultados. Todo es anónimo.",
    seeResultsBtn: "Ver mis resultados",
    lblAge: "Edad",
    lblGender: "Género <span>(opcional)</span>",
    lblNat: "Nacionalidad <span>(opcional)</span>",
    optSelect: "Seleccionar...",
    optPreferNot: "Prefiero no decirlo",
    optInd: "Independiente / Otro",
    ageSelectOpts: ['Menor de 18', '18 a 24', '25 a 34', '35 a 44', '45 a 54', '55 a 64', '65 o más'],
    genderSelectOpts: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decirlo'],
    lblConsent: "<strong>Consentimiento de investigación:</strong> Permito que CoreOpinion guarde mis respuestas anónimas y datos demográficos para investigación, estadísticas y paneles de opinión pública.",
    demoNote: "Esto nunca se vincula con tus respuestas. Nos ayuda a entender quién realiza el test.",
    calcTitle: "Evaluando tus respuestas",
    calcSub: "Esto solo tomará un momento.",
    rEyebrow: "Tu alineación política en {Country}",
    saveTitle: "Guardar tus resultados",
    saveDesc: "Introduce tu correo electrónico y te enviaremos un enlace a estos resultados. Nunca compartido.",
    sendBtn: "Enviar resultados",
    copyBtn: "Copiar enlace de resultados",
    retakeBtn: "Repetir",
    genBtn: "Test general",
    modeTitle: "Elige la duración del test",
    modeSub: "Selecciona qué tan profundo deseas analizar tu alineación política y tu sesgo de encuadre cognitivo.",
    modeBadgeShort: "Rápido",
    modeTitleShort: "Test corto",
    modeDescShort: "Proporciona una estimación rápida de tus coordenadas políticas y alineación general.",
    modeBadgeMedium: "Recomendado",
    modeTitleMedium: "Test medio",
    modeDescMedium: "Nuestra duración estándar. Ofrece un cuadrante político confiable y un análisis detallado del encuadre.",
    modeBadgeLong: "Completo",
    modeTitleLong: "Test largo",
    modeDescLong: "Inmersión ideológica profunda. Analiza casos límite, compensaciones de políticas complejas y métricas de sesgo.",
    modeBtnSelect: "Seleccionar",
    modeBackBtn: "Volver al inicio",
    questionsText: "preguntas",
    natNames: {
      'United States': "Estados Unidos",
      'United Kingdom': "Reino Unido",
      'Canada': "Canadá",
      'Australia': "Australia",
      'New Zealand': "Nueva Zelanda",
      'Germany': "Alemania",
      'Austria': "Austria",
      'France': "Francia",
      'Spain': "España",
      'Italy': "Italia",
      'Sweden': "Suecia",
      'Ireland': "Irlanda",
      'Netherlands': "Países Bajos",
      'Other': "Otro"
    }
  },
  it: {
    startBtn: "Inizia il test",
    howItWorks: "Come funziona",
    skipBtn: "Salta",
    backBtn: "Indietro",
    nextBtn: "Avanti",
    demoTitle: "Quasi fatto.",
    demoSub: "Qualche rapida domanda prima dei tuoi risultati. Tutto è anonimo.",
    seeResultsBtn: "Vedi i miei risultati",
    lblAge: "Età",
    lblGender: "Genere <span>(opzionale)</span>",
    lblNat: "Nazionalità <span>(opzionale)</span>",
    optSelect: "Seleziona...",
    optPreferNot: "Preferisco non rispondere",
    optInd: "Indipendente / Altro",
    ageSelectOpts: ['Meno di 18', '18 a 24', '25 a 34', '35 a 44', '45 a 54', '55 a 64', '65 o più'],
    genderSelectOpts: ['Maschio', 'Femmina', 'Altro', 'Preferisco non rispondere'],
    lblConsent: "<strong>Consenso alla ricerca:</strong> Autorizzo CoreOpinion a memorizzare le mie risposte anonime e i miei dati demografici per ricerca, statistiche e dashboard di sondaggio pubblico.",
    demoNote: "Questo non viene mai collegato alle tue risposte. Ci aiuta a capire chi effettua il test.",
    calcTitle: "Analisi delle risposte",
    calcSub: "Ci vorrà solo un momento.",
    rEyebrow: "Il tuo allineamento politico in {Country}",
    saveTitle: "Salva i tuoi risultati",
    saveDesc: "Inserisci la tua email e ti invieremo un link a questi risultati. Mai condivisa.",
    sendBtn: "Invia risultati",
    copyBtn: "Copia link dei risultati",
    retakeBtn: "Rifare",
    genBtn: "Test generale",
    modeTitle: "Scegli la durata del test",
    modeSub: "Seleziona quanto approfondire l'analisi del tuo allineamento politico e del tuo bias di incorniciamento cognitivo.",
    modeBadgeShort: "Rapido",
    modeTitleShort: "Test breve",
    modeDescShort: "Fornisce una stima rapida delle tue coordinate politiche e dell'allineamento generale.",
    modeBadgeMedium: "Consigliato",
    modeTitleMedium: "Test medio",
    modeDescMedium: "La nostra durata standard. Rileva un quadrante politico affidabile e un'analisi dettagliata del bias.",
    modeBadgeLong: "Approfondito",
    modeTitleLong: "Test lungo",
    modeDescLong: "Analisi ideologica profonda. Esamina casi limite, compromessi politici complessi e metriche complete del bias.",
    modeBtnSelect: "Seleziona",
    modeBackBtn: "Torna alla home",
    questionsText: "domande",
    natNames: {
      'United States': "Stati Uniti",
      'United Kingdom': "Regno Unito",
      'Canada': "Canada",
      'Australia': "Australia",
      'New Zealand': "Nuova Zelanda",
      'Germany': "Germania",
      'Austria': "Austria",
      'France': "Francia",
      'Spain': "Spagna",
      'Italy': "Italia",
      'Sweden': "Svezia",
      'Ireland': "Irland",
      'Netherlands': "Paesi Bassi",
      'Other': "Altro"
    }
  },
  nl: {
    startBtn: "Start de test",
    howItWorks: "Hoe het werkt",
    skipBtn: "Overslaan",
    backBtn: "Terug",
    nextBtn: "Volgende",
    demoTitle: "Bijna klaar.",
    demoSub: "Een paar snelle vragen voor je resultaten. Alles is anoniem.",
    seeResultsBtn: "Bekijk mijn resultaten",
    lblAge: "Leeftijd",
    lblGender: "Geslacht <span>(optioneel)</span>",
    lblNat: "Nationaliteit <span>(optioneel)</span>",
    optSelect: "Selecteer...",
    optPreferNot: "Liever niet zeggen",
    optInd: "Onafhankelijk / Anders",
    ageSelectOpts: ['Onder 18', '18 tot 24', '25 tot 34', '35 tot 44', '45 tot 54', '55 tot 64', '65 of ouder'],
    genderSelectOpts: ['Man', 'Vrouw', 'Anders', 'Liever niet zeggen'],
    lblConsent: "<strong>Toestemming voor onderzoek:</strong> Ik sta CoreOpinion toe mijn anonieme antwoorden en demografische gegevens op te slaan voor onderzoek, statistieken en openbare peilingen.",
    demoNote: "Dit wordt nooit gekoppeld aan je antwoorden. Het helpt ons te begrijpen wie de test invult.",
    calcTitle: "Je antwoorden in kaart brengen",
    calcSub: "Dit duurt een kort moment.",
    rEyebrow: "Jouw politieke partijvoorkeur in {Country}",
    saveTitle: "Sla je resultaten op",
    saveDesc: "Vul je e-mailadres in en we sturen je een link naar deze resultaten. Wordt nooit gedeeld.",
    sendBtn: "Resultaten verzenden",
    copyBtn: "Resultatenlink kopiëren",
    retakeBtn: "Opnieuw doen",
    genBtn: "Algemene test",
    modeTitle: "Kies de lengte van de test",
    modeSub: "Selecteer hoe diep je je politieke partijvoorkeur en cognitieve formuleringseffecten wilt analyseren.",
    modeBadgeShort: "Snel",
    modeTitleShort: "Korte test",
    modeDescShort: "Biedt een snelle schatting van je politieke coördinaten en algemene overeenkomst.",
    modeBadgeMedium: "Aanbevolen",
    modeTitleMedium: "Gemiddelde test",
    modeDescMedium: "Onze standaardlengte. Biedt een betrouwbaar politiek kwadrant en gedetailleerde formuleringseffectenanalyse.",
    modeBadgeLong: "Grondig",
    modeTitleLong: "Lange test",
    modeDescLong: "Diepe ideologische duik. Analyseert grensgevallen, complexe beleidsafwegingen en volledige beïnvloedingsscores.",
    modeBtnSelect: "Selecteer",
    modeBackBtn: "Terug naar startpagina",
    questionsText: "vragen",
    natNames: {
      'United States': "Verenigde Staten",
      'United Kingdom': "Verenigd Koninkrijk",
      'Canada': "Canada",
      'Australia': "Australië",
      'New Zealand': "Nieuw-Zeeland",
      'Germany': "Duitsland",
      'Austria': "Oostenrijk",
      'France': "Frankrijk",
      'Spain': "Spanje",
      'Italy': "Italië",
      'Sweden': "Zweden",
      'Ireland': "Ierland",
      'Netherlands': "Nederland",
      'Other': "Anders"
    }
  },
  sv: {
    startBtn: "Starta testet",
    howItWorks: "Hur det fungerar",
    skipBtn: "Hoppa över",
    backBtn: "Bakåt",
    nextBtn: "Nästa",
    demoTitle: "Nästan klar.",
    demoSub: "Några snabba frågor innan dina resultat. Allt är anonymt.",
    seeResultsBtn: "Se mina resultat",
    lblAge: "Ålder",
    lblGender: "Kön <span>(valfritt)</span>",
    lblNat: "Nationalitet <span>(valfritt)</span>",
    optSelect: "Välj...",
    optPreferNot: "Vill ej uppge",
    optInd: "Oberoende / Annat",
    ageSelectOpts: ['Under 18', '18 till 24', '25 till 34', '35 till 44', '45 till 54', '55 till 64', '65 eller äldre'],
    genderSelectOpts: ['Man', 'Kvinna', 'Annat', 'Vill ej uppge'],
    lblConsent: "<strong>Samtycke för forskning:</strong> Jag tillåter CoreOpinion att spara mina anonyma svar och demografiska uppgifter för forskning, statistik och offentliga opinionspaneler.",
    demoNote: "Detta kopplas aldrig till dina svar. Det hjälper oss att förstå vilka som gör testet.",
    calcTitle: "Kartlägger dina svar",
    calcSub: "Detta tar bara ett ögonblick.",
    rEyebrow: "Din politiska överensstämmelse i {Country}",
    saveTitle: "Spara dina resultat",
    saveDesc: "Ange din e-postadress så skickar vi en länk till dina resultat. Delas aldrig.",
    sendBtn: "Skicka resultat",
    copyBtn: "Kopiera resultatlänk",
    retakeBtn: "Gör om testet",
    genBtn: "Allmänt test",
    modeTitle: "Välj testlängd",
    modeSub: "Välj hur djupt du vill analysera din politiska överensstämmelse och kognitiva formuleringspartiskhet.",
    modeBadgeShort: "Snabb",
    modeTitleShort: "Kort test",
    modeDescShort: "Ger en snabb uppskattning av dina politiska koordinater och allmänna matchning.",
    modeBadgeMedium: "Rekommenderas",
    modeTitleMedium: "Medeltest",
    modeDescMedium: "Vår standardlängd. Ger en pålitlig politisk kvadrant och detaljerad analys av formuleringseffekter.",
    modeBadgeLong: "Grundlig",
    modeTitleLong: "Långt test",
    modeDescLong: "Djup ideologisk analys. Analyserar gränsfall, komplexa politiska avvägningar och fullständiga partiskhetsmått.",
    modeBtnSelect: "Välj",
    modeBackBtn: "Tillbaka till start",
    questionsText: "frågor",
    natNames: {
      'United States': "USA",
      'United Kingdom': "Storbritannien",
      'Canada': "Kanada",
      'Australia': "Australien",
      'New Zealand': "Nya Zeeland",
      'Germany': "Tyskland",
      'Austria': "Österrike",
      'France': "Frankrike",
      'Spain': "Spanien",
      'Italy': "Italien",
      'Sweden': "Sverige",
      'Ireland': "Irland",
      'Netherlands': "Nederländerna",
      'Other': "Annat"
    }
  },
  da: {
    startBtn: "Start testen",
    howItWorks: "Sådan fungerer det",
    skipBtn: "Spring over",
    backBtn: "Tilbage",
    nextBtn: "Næste",
    demoTitle: "Næsten færdig.",
    demoSub: "Et par hurtige spørgsmål før dine resultater. Alt er anonymt.",
    seeResultsBtn: "Se mine resultater",
    lblAge: "Alder",
    lblGender: "Køn <span>(valgfrit)</span>",
    lblNat: "Nationalitet <span>(valgfrit)</span>",
    optSelect: "Vælg...",
    optPreferNot: "Ønsker ikke at opgive",
    optInd: "Uafhængig / Andet",
    ageSelectOpts: ['Under 18', '18 til 24', '25 til 34', '35 til 44', '45 til 54', '55 til 64', '65 eller ældre'],
    genderSelectOpts: ['Mand', 'Kvinde', 'Andet', 'Ønsker ikke at opgive'],
    lblConsent: "<strong>Samtykke til forskning:</strong> Jeg tillader CoreOpinion at gemme mine anonyme svar og demografiske data til forskning, statistik og offentlige meningsmålinger.",
    demoNote: "Dette forbindes aldrig med dine svar. Det hjælper os med at forstå, hvem der tager testen.",
    calcTitle: "Kortlægger dine svar",
    calcSub: "Dette tager kun et øjeblik.",
    rEyebrow: "Din politiske overensstemmelse i {Country}",
    saveTitle: "Gem dine resultater",
    saveDesc: "Indtast din e-mailadresse, så sender vi dig et link til dine resultater. Deles aldrig.",
    sendBtn: "Send resultater",
    copyBtn: "Kopier resultatlink",
    retakeBtn: "Tag testen igen",
    genBtn: "Generel test",
    modeTitle: "Vælg testlængde",
    modeSub: "Vælg hvor dybt du vil analysere din politiske overensstemmelse og kognitive framing-bias.",
    modeBadgeShort: "Hurtig",
    modeTitleShort: "Kort test",
    modeDescShort: "Giver et hurtigt estimat af dine politiske koordinater og generelle overensstemmelse.",
    modeBadgeMedium: "Anbefalet",
    modeTitleMedium: "Mellemlang test",
    modeDescMedium: "Vores standardlengde. Giver en pålidelig politisk kvadrant og detaljeret kognitiv framing-analyse.",
    modeBadgeLong: "Grundig",
    modeTitleLong: "Lang test",
    modeDescLong: "Dyb ideologisk analyse. Analyserer grænsetilfælde, komplekse politiske kompromiser og fulde bias-målinger.",
    modeBtnSelect: "Vælg",
    modeBackBtn: "Tilbage til start",
    questionsText: "spørgsmål",
    natNames: {
      'United States': "USA",
      'United Kingdom': "Storbritannien",
      'Canada': "Canada",
      'Australia': "Australien",
      'New Zealand': "New Zealand",
      'Germany': "Tyskland",
      'Austria': "Østrig",
      'France': "Frankrig",
      'Spain': "Spanien",
      'Italy': "Italien",
      'Sweden': "Sverige",
      'Ireland': "Irland",
      'Netherlands': "Holland",
      'Denmark': "Danmark",
      'Norway': "Norge",
      'Finland': "Finland",
      'Other': "Andet"
    }
  },
  no: {
    startBtn: "Start testen",
    howItWorks: "Slik fungerer det",
    skipBtn: "Hopp over",
    backBtn: "Tilbake",
    nextBtn: "Neste",
    demoTitle: "Nesten ferdig.",
    demoSub: "Noen raske spørsmål før resultatene dine. Alt er anonymt.",
    seeResultsBtn: "Se mine resultater",
    lblAge: "Alder",
    lblGender: "Kjønn <span>(valgfritt)</span>",
    lblNat: "Nasjonalitet <span>(valgfritt)</span>",
    optSelect: "Velg...",
    optPreferNot: "Vil ikke oppgi",
    optInd: "Uavhengig / Annet",
    ageSelectOpts: ['Under 18', '18 til 24', '25 til 34', '35 til 44', '45 til 54', '55 til 64', '65 eller eldre'],
    genderSelectOpts: ['Mann', 'Kvinne', 'Annet', 'Vil ikke oppgi'],
    lblConsent: "<strong>Samtykke til forskning:</strong> Jeg tillater CoreOpinion å lagre mine anonyme svar og demografiske data for forskning, statistikk og offentlige meningsmålinger.",
    demoNote: "Dette kobles aldri til svarene dine. Det hjelper oss å forstå hvem som tar testen.",
    calcTitle: "Kartlegger svarene dine",
    calcSub: "Dette tar bare et øyeblik.",
    rEyebrow: "Din politiske samsvar i {Country}",
    saveTitle: "Lagre resultatene dine",
    saveDesc: "Skriv inn e-postadressen din, så sender vi deg en lenke til resultatene dine. Deles aldri.",
    sendBtn: "Send resultater",
    copyBtn: "Kopier resultatlenke",
    retakeBtn: "Ta testen på nytt",
    genBtn: "Generell test",
    modeTitle: "Velg testlengde",
    modeSub: "Velg hvor dypt du vil analysere ditt politiske samsvar og kognitive vinklingsbias.",
    modeBadgeShort: "Hurtig",
    modeTitleShort: "Kort test",
    modeDescShort: "Gir et raskt estimat av dine politiske koordinater og generelt samsvar.",
    modeBadgeMedium: "Anbefalt",
    modeTitleMedium: "Middels test",
    modeDescMedium: "Vår standardlengde. Gir en pålitelig politisk kvadrant og detaljert kognitiv vinklingsanalyse.",
    modeBadgeLong: "Grundig",
    modeTitleLong: "Lang test",
    modeDescLong: "Dyp ideologisk analyse. Analyserer grensetilfeller, komplekse politiske avveininger og fulle bias-målinger.",
    modeBtnSelect: "Velg",
    modeBackBtn: "Tilbake til start",
    questionsText: "spørsmål",
    natNames: {
      'United States': "USA",
      'United Kingdom': "Storbritannia",
      'Canada': "Canada",
      'Australia': "Australia",
      'New Zealand': "New Zealand",
      'Germany': "Tyskland",
      'Austria': "Østerrike",
      'France': "Frankrike",
      'Spain': "Spania",
      'Italy': "Italia",
      'Sweden': "Sverige",
      'Ireland': "Irland",
      'Netherlands': "Nederland",
      'Denmark': "Danmark",
      'Norway': "Norge",
      'Finland': "Finland",
      'Other': "Annet"
    }
  },
  fi: {
    startBtn: "Aloita testi",
    howItWorks: "Miten se toimii",
    skipBtn: "Ohita",
    backBtn: "Takaisin",
    nextBtn: "Seuraava",
    demoTitle: "Melkein valmis.",
    demoSub: "Muutamia nopeita kysymyksiä ennen tuloksiasi. Kaikki on anonyymiä.",
    seeResultsBtn: "Katso tulokseni",
    lblAge: "Ikä",
    lblGender: "Sukupuoli <span>(valinnainen)</span>",
    lblNat: "Kansalaisuus <span>(valinnainen)</span>",
    optSelect: "Valitse...",
    optPreferNot: "En halua sanoa",
    optInd: "Sitoutumaton / Muu",
    ageSelectOpts: ['Alle 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65 tai vanhempi'],
    genderSelectOpts: ['Mies', 'Nainen', 'Muu', 'En halua sanoa'],
    lblConsent: "<strong>Tutkimussuostumus:</strong> Annan CoreOpinionille luvan tallentaa anonyymit vastaukseni ja taustatietoni tutkimusta, tilastoja ja julkisia mielipidekyselyjä varten.",
    demoNote: "Tätä ei koskaan yhdistetä vastauksiisi. Se auttaa meitä ymmärtämään testin tekijöitä.",
    calcTitle: "Kartoitetaan vastauksiasi",
    calcSub: "Tämä vie vain hetken.",
    rEyebrow: "Poliittinen sopivuutesi maassa {Country}",
    saveTitle: "Tallenna tuloksesi",
    saveDesc: "Anna sähköpostiosoitteesi, niin lähetämme linkin tuloksiisi. Ei koskaan jaeta.",
    sendBtn: "Lähetä tulokset",
    copyBtn: "Kopioi tuloslinkki",
    retakeBtn: "Tee testi uudelleen",
    genBtn: "Yleinen testi",
    modeTitle: "Valitse testin pituus",
    modeSub: "Valitse, kuinka syvällisesti haluat analysoida poliittista sopivuuttasi ja kognitiivista kehystysvinoumaasi.",
    modeBadgeShort: "Nopea",
    modeTitleShort: "Lyhyt testi",
    modeDescShort: "Antaa nopean arvion poliittisista koordinaateistasi ja yleisestä sopivuudestasi.",
    modeBadgeMedium: "Suositeltu",
    modeTitleMedium: "Keskipitkä testi",
    modeDescMedium: "Standardipituutemme. Antaa luotettavan poliittisen nelikentän ja yksityiskohtaisen kognitiivisen kehystysanalyysin.",
    modeBadgeLong: "Perusteellinen",
    modeTitleLong: "Pitkä testi",
    modeDescLong: "Syvä ideologinen analyysi. Analysoi rajatapauksia, monimutkaisia poliittisia kompromisseja ja kattavat vinoumamittaukset.",
    modeBtnSelect: "Valitse",
    modeBackBtn: "Takaisin aloitukseen",
    questionsText: "kysymystä",
    natNames: {
      'United States': "Yhdysvallat",
      'United Kingdom': "Iso-Britannia",
      'Canada': "Kanada",
      'Australia': "Australia",
      'New Zealand': "Uusi-Seelanti",
      'Germany': "Saksa",
      'Austria': "Itävalta",
      'France': "Ranska",
      'Spain': "Espanja",
      'Italy': "Italia",
      'Sweden': "Ruotsi",
      'Ireland': "Irlanti",
      'Netherlands': "Alankomaat",
      'Denmark': "Tanska",
      'Norway': "Norja",
      'Finland': "Suomi",
      'Other': "Muu"
    }
  }
};

function getDisplayName(val, langCode) {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object') {
    return val[langCode] || val['en'] || Object.values(val)[0];
  }
  return '';
}

// hreflang configuration for localized portals
const hreflangMap = {
  general: 'x-default',
  us: 'en-us',
  uk: 'en-gb',
  ca: 'en-ca',
  au: 'en-au',
  nz: 'en-nz',
  se: 'sv-se',
  dk: 'da-dk',
  no: 'no-no',
  fi: 'fi-fi',
  de: 'de-de',
  at: 'de-at',
  fr: 'fr-fr',
  es: 'es-es',
  it: 'it-it',
  ie: 'en-ie',
  nl: 'nl-nl'
};

let hreflangLinks = '';
Object.keys(hreflangMap).forEach(key => {
  const code = hreflangMap[key];
  const urlPath = key === 'general' ? '' : key;
  hreflangLinks += `<link rel="alternate" hreflang="${code}" href="https://coreopinion.org/${urlPath}" />\n`;
});

// Read all configurations
const configFiles = fs.readdirSync(countriesDir).filter(f => f.endsWith('.json'));

console.log(`Found ${configFiles.length} country configurations. Starting build...`);

configFiles.forEach(file => {
  const filePath = path.join(countriesDir, file);
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const isGeneral = config.code === 'general';
  const langConfig = langMap[config.code];
  
  const outputName = isGeneral ? 'index.html' : `${config.code}.html`;
  const outputPath = path.join(outputDir, outputName);
  
  let html = template;
  
  // 1. Basic Placeholders
  html = html.replace(/\{\{TITLE\}\}/g, config.title || '');
  html = html.replace(/\{\{DESCRIPTION\}\}/g, config.desc || '');
  html = html.replace(/\{\{KEYWORDS\}\}/g, config.keywords || '');
  html = html.replace(/\{\{CANONICAL\}\}/g, config.canonical || '');
  html = html.replace(/\{\{NAME\}\}/g, config.name || '');
  html = html.replace(/\{\{FLAG\}\}/g, config.flag || '');
  html = html.replace(/\{\{LABEL\}\}/g, config.localLabel || '');
  html = html.replace(/\{\{HERO_TITLE\}\}/g, config.heroTitle || '');
  html = html.replace(/\{\{HERO_SUB\}\}/g, config.heroSub || '');

  // Hreflang and Lang substitutions
  const lang = (langConfig && langConfig.langCode) ? langConfig.langCode : 'en';
  html = html.replace(/\{\{LANG\}\}/g, lang);
  html = html.replace(/\{\{HREFLANG_LINKS\}\}/g, hreflangLinks);

  // Dynamic JSON-LD Schema Graph
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://coreopinion.org/#website",
        "url": "https://coreopinion.org/",
        "name": "CoreOpinion",
        "publisher": {
          "@id": "https://coreopinion.org/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://coreopinion.org/#organization",
        "name": "CoreOpinion",
        "url": "https://coreopinion.org/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://coreopinion.org/og-image.svg"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "contact@coreopinion.org",
          "contactType": "customer support"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${config.canonical || 'https://coreopinion.org/'}#application`,
        "name": config.title || "Political Compass Test with Bias Score",
        "url": config.canonical || "https://coreopinion.org/",
        "operatingSystem": "All",
        "applicationCategory": "EducationalApplication",
        "description": config.desc || "Take the political compass test that reveals your framing bias.",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };
  const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  html = html.replace(/\{\{SCHEMA_MARKUP\}\}/g, schemaScript);

  // 1.5 Dynamic card question count replacement at build time
  const totalQ = config.bank ? config.bank.length : 0;
  function getTestLengthStatic(modeName, totalQ) {
    if (totalQ >= 80) {
      if (modeName === 'short') return 25;
      if (modeName === 'medium') return 50;
      return totalQ;
    } else if (totalQ >= 45) {
      if (modeName === 'short') return 15;
      if (modeName === 'medium') return 30;
      return totalQ;
    } else if (totalQ >= 35) {
      if (modeName === 'short') return 15;
      if (modeName === 'medium') return 25;
      return totalQ;
    } else if (totalQ >= 25) {
      if (modeName === 'short') return 12;
      if (modeName === 'medium') return 20;
      return totalQ;
    } else {
      const s = Math.max(5, Math.floor(totalQ * 0.4));
      if (modeName === 'short') return s;
      if (modeName === 'medium') return Math.max(s + 2, Math.floor(totalQ * 0.7));
      return totalQ;
    }
  }
  const sCount = getTestLengthStatic('short', totalQ);
  const mCount = getTestLengthStatic('medium', totalQ);
  const lCount = getTestLengthStatic('long', totalQ);

  html = html.replace(/<div class="mode-card-q" id="mode-q-short">25 questions<\/div>/g, `<div class="mode-card-q" id="mode-q-short">${sCount} questions</div>`);
  html = html.replace(/<div class="mode-card-q" id="mode-q-medium">50 questions<\/div>/g, `<div class="mode-card-q" id="mode-q-medium">${mCount} questions</div>`);
  html = html.replace(/<div class="mode-card-q" id="mode-q-long">100 questions<\/div>/g, `<div class="mode-card-q" id="mode-q-long">${lCount} questions</div>`);

  // 2. Party Strip replacement (Replace the whole div to support stats-strip vs party-strip)
  html = html.replace(/<div class="party-strip">[\s\S]*?<\/div>/, config.partyStripHtml || '');
  
  // 3. Translations & Questions Injection
  html = html.replace(/\{\{LOCAL_QUESTIONS\}\}/g, JSON.stringify(config.translations || {}, null, 2));
  html = html.replace(/\{\{BANK\}\}/g, JSON.stringify(config.bank || [], null, 2));
  html = html.replace(/\{\{PARTY_META\}\}/g, JSON.stringify(config.partyMeta || {}, null, 2));
  
  // 4. Language Toggler Setup
  if (langConfig) {
    // Generate Toggle Lang Button HTML
    const buttonHtml = `<button id="lang-toggle" onclick="toggleLang()" style="background:none;border:1px solid var(--border-soft);border-radius:4px;padding:6px 12px;font-size:12px;font-family:Outfit,sans-serif;cursor:pointer;color:var(--ink-muted);font-weight:400;transition:all 0.15s">English</button>`;
    html = html.replace(/\{\{TOGGLE_LANG_BUTTON\}\}/g, buttonHtml);
    
    // Generate Toggle Script
    const script = `window.portalCode = '${config.code}';
let currentLang = '${langConfig.langCode}';
const engCountryName = '${langConfig.engCountry}';
const localCountryName = '${langConfig.localCountry}';
const heroTitleEn = ${JSON.stringify(englishHeroTexts[config.code]?.heroTitle || '')};
const heroSubEn = ${JSON.stringify(englishHeroTexts[config.code]?.heroSub || '')};
const heroTitleLocal = ${JSON.stringify(config.heroTitle || '')};
const heroSubLocal = ${JSON.stringify(config.heroSub || '')};

const STATIC_TRANSLATIONS = {
  en: ${JSON.stringify(staticUiTranslations.en, null, 2)},
  ${langConfig.langCode}: ${JSON.stringify(staticUiTranslations[langConfig.langCode], null, 2)}
};

function toggleLang() {
  currentLang = currentLang === 'en' ? '${langConfig.langCode}' : 'en';
  document.getElementById('lang-toggle').textContent = currentLang === 'en' ? '${langConfig.localLang}' : 'English';
  document.getElementById('lang-label').textContent = currentLang === 'en' ? '${langConfig.engCountry}' : '${langConfig.localCountry}';
  
  window.currentLang = currentLang;
  applyLang();
  if (document.getElementById('page-test').classList.contains('active')) renderQ();
}

function t(en, local) { return currentLang === 'en' ? en : local; }

function getQuestion(q) {
  if (currentLang === 'en') return q;
  const localQ = LOCAL_QUESTIONS[q.id];
  if (!localQ) return q;
  return {
    ...q,
    q: localQ.q || q.q,
    ctx: localQ.ctx || q.ctx,
    opts: q.opts.map((o, i) => ({
      ...o,
      t: (localQ.opts && localQ.opts[i]) ? localQ.opts[i] : o.t
    }))
  };
}

function applyLang() {
  const isEn = currentLang === 'en';
  const strings = STATIC_TRANSLATIONS[currentLang];
  if (!strings) return;

  const modeTitle = document.querySelector('#page-mode .page-title');
  if (modeTitle) modeTitle.textContent = strings.modeTitle;

  const modeSub = document.querySelector('#page-mode .page-sub');
  if (modeSub) modeSub.textContent = strings.modeSub;

  const modeBackBtn = document.getElementById('mode-back-btn');
  if (modeBackBtn) modeBackBtn.textContent = strings.modeBackBtn;

  const badgeShort = document.getElementById('mode-badge-short');
  if (badgeShort) badgeShort.textContent = strings.modeBadgeShort;
  const badgeMedium = document.getElementById('mode-badge-medium');
  if (badgeMedium) badgeMedium.textContent = strings.modeBadgeMedium;
  const badgeLong = document.getElementById('mode-badge-long');
  if (badgeLong) badgeLong.textContent = strings.modeBadgeLong;

  const titleShort = document.getElementById('mode-title-short');
  if (titleShort) titleShort.textContent = strings.modeTitleShort;
  const titleMedium = document.getElementById('mode-title-medium');
  if (titleMedium) titleMedium.textContent = strings.modeTitleMedium;
  const titleLong = document.getElementById('mode-title-long');
  if (titleLong) titleLong.textContent = strings.modeTitleLong;

  const descShort = document.getElementById('mode-desc-short');
  if (descShort) descShort.textContent = strings.modeDescShort;
  const descMedium = document.getElementById('mode-desc-medium');
  if (descMedium) descMedium.textContent = strings.modeDescMedium;
  const descLong = document.getElementById('mode-desc-long');
  if (descLong) descLong.textContent = strings.modeDescLong;

  const btnShort = document.getElementById('mode-btn-short');
  if (btnShort) btnShort.textContent = strings.modeBtnSelect;
  const btnMedium = document.getElementById('mode-btn-medium');
  if (btnMedium) btnMedium.textContent = strings.modeBtnSelect;
  const btnLong = document.getElementById('mode-btn-long');
  if (btnLong) btnLong.textContent = strings.modeBtnSelect;
  const totalQ = typeof BANK !== 'undefined' ? BANK.length : 0;

  function getTestLength(modeName, totalQ) {
    if (totalQ >= 80) {
      if (modeName === 'short') return 25;
      if (modeName === 'medium') return 50;
      return Math.min(100, totalQ);
    } else if (totalQ >= 45) {
      if (modeName === 'short') return 15;
      if (modeName === 'medium') return 30;
      return totalQ;
    } else if (totalQ >= 35) {
      if (modeName === 'short') return 15;
      if (modeName === 'medium') return 25;
      return totalQ;
    } else if (totalQ >= 25) {
      if (modeName === 'short') return 12;
      if (modeName === 'medium') return 20;
      return totalQ;
    } else {
      const s = Math.max(5, Math.floor(totalQ * 0.4));
      if (modeName === 'short') return s;
      if (modeName === 'medium') return Math.max(s + 2, Math.floor(totalQ * 0.7));
      return totalQ;
    }
  }

  const qShort = document.getElementById('mode-q-short');
  if (qShort) qShort.textContent = getTestLength('short', totalQ) + ' ' + strings.questionsText;
  const qMedium = document.getElementById('mode-q-medium');
  if (qMedium) qMedium.textContent = getTestLength('medium', totalQ) + ' ' + strings.questionsText;
  const qLong = document.getElementById('mode-q-long');
  if (qLong) qLong.textContent = getTestLength('long', totalQ) + ' ' + strings.questionsText;

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) heroTitle.innerHTML = isEn ? heroTitleEn : heroTitleLocal;

  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) heroSub.textContent = isEn ? heroSubEn : heroSubLocal;

  const startBtn = document.querySelector('.hero-cta .btn-primary');
  if (startBtn) startBtn.textContent = strings.startBtn;

  const howItWorksBtn = document.querySelector('.hero-cta .btn-secondary');
  if (howItWorksBtn) howItWorksBtn.textContent = strings.howItWorks;

  const skipBtn = document.querySelector('.btn-skip');
  if (skipBtn) skipBtn.textContent = strings.skipBtn;

  const backBtn = document.getElementById('btn-back');
  if (backBtn) backBtn.textContent = strings.backBtn;

  const nextBtn = document.querySelector('.q-foot .btn-primary');
  if (nextBtn) nextBtn.textContent = strings.nextBtn;

  const demoTitle = document.querySelector('#page-demo .page-title');
  if (demoTitle) demoTitle.textContent = strings.demoTitle;

  const demoSub = document.querySelector('#page-demo .page-sub');
  if (demoSub) demoSub.textContent = strings.demoSub;

  const seeResultsBtn = document.querySelector('#page-demo .btn-primary');
  if (seeResultsBtn) seeResultsBtn.textContent = strings.seeResultsBtn;

  const lblAge = document.getElementById('d-age')?.previousElementSibling;
  if (lblAge) lblAge.textContent = strings.lblAge;

  const lblCountry = document.getElementById('d-country')?.previousElementSibling || document.getElementById('d-county')?.previousElementSibling;
  if (lblCountry) lblCountry.innerHTML = strings.lblCountry;

  const lblParty = document.getElementById('d-party')?.previousElementSibling;
  if (lblParty) lblParty.innerHTML = strings.lblParty;

  const lblGender = document.getElementById('d-gender')?.previousElementSibling;
  if (lblGender) lblGender.innerHTML = strings.lblGender;

  const lblNat = document.getElementById('d-nationality')?.previousElementSibling;
  if (lblNat) lblNat.innerHTML = strings.lblNat;

  const ageSelect = document.getElementById('d-age');
  if (ageSelect) {
    ageSelect.options[0].textContent = strings.optSelect;
    for (let i = 1; i < ageSelect.options.length; i++) {
      if (strings.ageSelectOpts[i - 1]) ageSelect.options[i].textContent = strings.ageSelectOpts[i - 1];
    }
  }

  const genderSelect = document.getElementById('d-gender');
  if (genderSelect) {
    genderSelect.options[0].textContent = strings.optSelect;
    for (let i = 1; i < genderSelect.options.length; i++) {
      if (strings.genderSelectOpts[i - 1]) genderSelect.options[i].textContent = strings.genderSelectOpts[i - 1];
    }
  }

  const partySelect = document.getElementById('d-party');
  if (partySelect) {
    partySelect.options[0].textContent = strings.optPreferNot;
    const lastOpt = partySelect.options[partySelect.options.length - 1];
    if (lastOpt) lastOpt.textContent = strings.optInd;
  }

  const countrySelect = document.getElementById('d-country') || document.getElementById('d-county');
  if (countrySelect) countrySelect.options[0].textContent = strings.optSelect;

  const natSelect = document.getElementById('d-nationality');
  if (natSelect) {
    natSelect.options[0].textContent = strings.optSelect;
    for (let i = 1; i < natSelect.options.length; i++) {
      const opt = natSelect.options[i];
      const enVal = opt.getAttribute('data-en') || opt.value || opt.textContent;
      if (!opt.getAttribute('data-en')) opt.setAttribute('data-en', enVal);
      if (strings.natNames[enVal]) opt.textContent = strings.natNames[enVal];
    }
  }

  const demoNote = document.querySelector('.demo-note');
  if (demoNote) demoNote.textContent = strings.demoNote;
  
  const lblConsent = document.querySelector('label[for="d-consent"]');
  if (lblConsent) {
    lblConsent.innerHTML = strings.lblConsent;
  }

  const calcTitle = document.querySelector('.calc-h');
  if (calcTitle) calcTitle.textContent = strings.calcTitle;

  const calcSub = document.querySelector('.calc-p');
  if (calcSub) calcSub.textContent = strings.calcSub;

  const rEyebrow = document.querySelector('.result-eyebrow');
  if (rEyebrow) {
    rEyebrow.textContent = strings.rEyebrow.replace('{Country}', isEn ? engCountryName : localCountryName);
  }

  const saveTitle = document.querySelector('.save-title');
  if (saveTitle) saveTitle.textContent = strings.saveTitle;

  const saveDesc = document.querySelector('.save-desc');
  if (saveDesc) saveDesc.textContent = strings.saveDesc;

  const sendBtn = document.querySelector('.save-row .btn-primary');
  if (sendBtn) sendBtn.textContent = strings.sendBtn;

  const copyBtn = document.querySelector('.share-row button:nth-child(1)');
  if (copyBtn) copyBtn.textContent = strings.copyBtn;

  const retakeBtn = document.querySelector('.share-row button:nth-child(2)');
  if (retakeBtn) retakeBtn.textContent = strings.retakeBtn;

  const genBtn = document.querySelector('.share-row a button');
  if (genBtn) genBtn.textContent = strings.genBtn;
}

window.getQuestion = getQuestion;
window.currentLang = currentLang;
applyLang();`;

    html = html.replace(/\{\{TOGGLE_LANG_SCRIPT\}\}/g, script);
  } else {
    // English-only/General
    html = html.replace(/\{\{TOGGLE_LANG_BUTTON\}\}/g, '');
    
    const fallbackScript = `window.portalCode = '${config.code}';
window.currentLang = 'en';
window.getQuestion = q => q;`;
    html = html.replace(/\{\{TOGGLE_LANG_SCRIPT\}\}/g, fallbackScript);
  }
  
  // 5. Select Dropdown Option lists
  const defaultLabel = langConfig ? langConfig.defaultSelect : 'Select...';
  
  // Region Select options
  let regionOptions = `<option value="">${defaultLabel}</option>`;
  if (config.regions && config.regions.length > 0) {
    config.regions.forEach(r => {
      regionOptions += `\n          <option>${r}</option>`;
    });
  }
  html = html.replace(/\{\{REGIONS_OPTIONS\}\}/g, regionOptions);
  
  // Party Select options
  let partyOptions = `<option value="">${defaultLabel}</option>`;
  if (config.parties && config.parties.length > 0) {
    const list = [...config.parties, 'ind'];
    list.forEach(pKey => {
      if (config.partyMeta[pKey]) {
        const name = getDisplayName(config.partyMeta[pKey].name, langConfig ? langConfig.langCode : 'en');
        partyOptions += `\n          <option>${name}</option>`;
      }
    });
  }
  html = html.replace(/\{\{PARTY_OPTIONS\}\}/g, partyOptions);
  
  // Nationality options with dynamic selection
  const selectedNat = isGeneral ? "" : (nationalityMap[config.code] || "");
  let nationalityOptions = `<option value="">${defaultLabel}</option>`;
  nationalitiesList.forEach(nat => {
    const isSelected = nat === selectedNat ? ' selected' : '';
    nationalityOptions += `\n          <option${isSelected}>${nat}</option>`;
  });
  html = html.replace(/\{\{NATIONALITY_OPTIONS\}\}/g, nationalityOptions);
  
  // Write output
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`Generated ${outputName} (size: ${html.length} bytes)`);
  if (isGeneral) {
    const resultPath = path.join(outputDir, 'result.html');
    fs.writeFileSync(resultPath, html, 'utf8');
    console.log(`Generated result.html (size: ${html.length} bytes)`);
    
    const comparePath = path.join(outputDir, 'compare.html');
    fs.writeFileSync(comparePath, html, 'utf8');
    console.log(`Generated compare.html (size: ${html.length} bytes)`);
  }
});

// Build static content pages (About, Privacy, Methodology)
const contentDir = path.join(__dirname, 'src/content');
const contentTemplatePath = path.join(__dirname, 'src/content-template.html');

if (fs.existsSync(contentDir) && fs.existsSync(contentTemplatePath)) {
  const contentTemplate = fs.readFileSync(contentTemplatePath, 'utf8');
  const contentFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  
  console.log(`Found ${contentFiles.length} content files. Compiling static pages...`);
  
  contentFiles.forEach(file => {
    const filePath = path.join(contentDir, file);
    const contentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const outputName = file.replace('.json', '.html');
    const outputPath = path.join(outputDir, outputName);
    
    const contentName = file.replace('.json', '');
    const canonicalUrl = contentData.canonical || `https://coreopinion.org/${contentName}`;

    let html = contentTemplate;
    html = html.replace(/\{\{TITLE\}\}/g, contentData.title || '');
    html = html.replace(/\{\{DESCRIPTION\}\}/g, contentData.desc || '');
    html = html.replace(/\{\{CANONICAL\}\}/g, canonicalUrl);
    html = html.replace(/\{\{HEADER\}\}/g, contentData.header || '');
    html = html.replace(/\{\{SUBTITLE\}\}/g, contentData.subtitle || '');
    html = html.replace(/\{\{CONTENT\}\}/g, contentData.content || '');

    // Dynamic lang and schema graph
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://coreopinion.org/#website",
          "url": "https://coreopinion.org/",
          "name": "CoreOpinion",
          "publisher": {
            "@id": "https://coreopinion.org/#organization"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://coreopinion.org/#organization",
          "name": "CoreOpinion",
          "url": "https://coreopinion.org/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://coreopinion.org/og-image.svg"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "contact@coreopinion.org",
            "contactType": "customer support"
          }
        },
        {
          "@type": "WebPage",
          "@id": `https://coreopinion.org/${contentName}#webpage`,
          "url": `https://coreopinion.org/${contentName}`,
          "name": contentData.title || "",
          "description": contentData.desc || "",
          "isPartOf": {
            "@id": "https://coreopinion.org/#website"
          }
        }
      ]
    };
    const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
    html = html.replace(/\{\{LANG\}\}/g, 'en');
    html = html.replace(/\{\{SCHEMA_MARKUP\}\}/g, schemaScript);
    
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Generated content page: ${outputName} (size: ${html.length} bytes)`);
  });
}

console.log(`SSG compilation completed successfully. ${configFiles.length} HTML portals built.`);
