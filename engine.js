/* ============================================================
   COREOPINION.ORG - UNIFIED JAVASCRIPT STATE & SCORING ENGINE
   ============================================================ */

// GLOBAL QUIZ PLAYER STATE
let qi = 0;
let picked = -1;
let answers = [];
let qs = [];
let mode = 'short';
let lastScore = null;

// ============================================================
// ENGINE TRANSLATIONS & DICTIONARY
// ============================================================
const ENGINE_TRANSLATIONS = {
  en: {
    of: 'of',
    alignment: 'alignment',
    platformInsight: 'Platform Insight',
    inspect: 'Inspect 🔍',
    disagreeWith: 'Where you disagree with <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Your answer',
    partyPosition: '{Party} position',
    faceoffHeader: 'Cognitive Framing Face-off',
    comparisonLabel: 'Pair Comparison',
    shiftDetected: 'Framing Shift Detected',
    consistentStance: 'Consistent Stance',
    framePro: 'Support / Autonomy-framed',
    frameCon: 'Critical / Consequence-framed',
    frameNeutral: 'Neutral Framing',
    yourChoice: 'Your choice',
    skippedText: 'Skipped',
    noPairsText: 'No framing contrasts completed for this topic yet.',
    noPairsGeneralText: 'No completed question pairs for this topic to compare. Take the Medium or Long test to unlock detailed pair analysis.',
    gapClose: 'Your result is close — only {gap} points separates you from {nextPartyName}. You may genuinely straddle both traditions.',
    gapModerate: 'You align meaningfully with {nextPartyName} too, scoring {nextPct}%.',
    gapClear: 'Your alignment with {topPartyName} is clear, with {gap} points separating you from the next closest party.',
    profiles: {
      axiom: { name: 'The Axiom', icon: '🔷', desc: 'Unmovable. Your principles hold regardless of framing, context, or emotional appeal.' },
      analyst: { name: 'The Analyst', icon: '🔬', desc: 'Highly consistent with minor contextual flexibility. You distinguish policy mechanics from rhetoric.' },
      pragmatist: { name: 'The Pragmatist', icon: '⚖️', desc: 'You hold core positions but adjust at the margins based on real-world situations.' },
      empath: { name: 'The Empath', icon: '🌊', desc: 'You respond strongly to human stories and emotional context. Your positions shift with the narrative.' },
      weathervane: { name: 'The Weathervane', icon: '🌪️', desc: "Framing significantly reshapes your stance. You may hold different positions on the same issue depending on how it's presented." },
      mirror: { name: 'The Mirror', icon: '🪞', desc: 'Your answers reflect whatever frame is presented. You may not have stable underlying positions on many issues.' }
    },
    verdicts: [
      [0, 0, 'No detectable bias', 'Your answers were completely consistent regardless of how questions were framed. That level of logical consistency is rare.'],
      [1, 15, 'Very low bias', 'Your answers were highly consistent. The framing of a question had almost no influence on your position.'],
      [16, 35, 'Low bias', 'Minor framing effects. Your positions are mostly stable but shifted slightly depending on how a question was worded.'],
      [36, 60, 'Moderate bias', 'You showed noticeable framing sensitivity on several topics. Your views shifted depending on whether the question pushed you toward or against a position.'],
      [61, 80, 'High bias', 'Framing had a significant influence on many of your answers. The same policy question, worded differently, often produced different responses.'],
      [81, 100, 'Very high bias', 'Your answers were strongly shaped by how questions were framed rather than by consistent underlying values.']
    ],
    insightInconsistent: '💡 <strong>Cognitive Analysis:</strong> The emotional wording or situational details in these questions successfully shifted your perspective. By swapping between an autonomous support frame and a systemic consequence frame, your choice was altered. This suggests that your beliefs in this area are contextually dependent rather than absolute, responding strongly to whatever specific narrative lens is highlighted.',
    insightConsistent: '✅ <strong>Cognitive Analysis:</strong> Your values held firm. Whether presented with positive support framing or critical framing, you maintained identical ideological positions. This demonstrates high internal logical consistency and resistance to rhetorical framing.',
    shortTestCaveat: '<strong>Note:</strong> You took the Short Test. With fewer question pairs completed, this framing bias analysis is less reliable than on the Medium or Long tests.'
  },
  de: {
    of: 'von',
    alignment: 'Übereinstimmung',
    platformInsight: 'Parteiplattform-Einblick',
    inspect: 'Ansehen 🔍',
    disagreeWith: 'Hier weichst du von der <span id="disagree-party-name">{Party}</span> ab',
    yourAnswer: 'Deine Antwort',
    partyPosition: 'Position der {Party}',
    faceoffHeader: 'Framing-Vergleich',
    comparisonLabel: 'Paarweiser Vergleich',
    shiftDetected: 'Formulierungs-Effekt',
    consistentStance: 'Konsistente Haltung',
    framePro: 'Positiv / Gewinne-fokussiert',
    frameCon: 'Kritisch / Verlust-fokussiert',
    frameNeutral: 'Neutrale Formulierung',
    yourChoice: 'Deine Antwort',
    skippedText: 'Übersprungen',
    noPairsText: 'Für dieses Thema wurden noch keine Framing-Vergleiche durchgeführt.',
    noPairsGeneralText: 'Keine abgeschlossenen Fragenpaare für dieses Thema zum Vergleichen. Mache den mittleren oder langen Test, um die detaillierte Paaranalyse freizuschalten.',
    gapClose: 'Dein Ergebnis ist knapp — nur {gap} Punkte trennen dich von der {nextPartyName}. Du stehst möglicherweise zwischen beiden Traditionen.',
    gapModerate: 'Du weist auch eine deutliche Übereinstimmung mit der {nextPartyName} auf ({nextPct}%).',
    gapClear: 'Deine Übereinstimmung mit der {topPartyName} ist eindeutig, mit {gap} Punkten Vorsprung vor der nächsten Partei.',
    profiles: {
      axiom: { name: 'Das Axiom', icon: '🔷', desc: 'Unerschütterlich. Deine Prinzipien gelten unabhängig von Formulierung, Kontext oder emotionalem Appell.' },
      analyst: { name: 'Der Analyst', icon: '🔬', desc: 'Sehr konsistent mit geringer kontextueller Flexibilität. Du unterscheidest politische Mechanismen von Rhetorik.' },
      pragmatist: { name: 'Der Pragmatiker', icon: '⚖️', desc: 'Du vertrittst feste Kernpositionen, passt sie aber in konkreten Situationen an den Rändern an.' },
      empath: { name: 'Der Empath', icon: '🌊', desc: 'Du reagierst stark auf menschliche Geschichten und emotionalen Kontext. Deine Positionen verschieben sich mit dem Narrativ.' },
      weathervane: { name: 'Die Wetterfahne', icon: '🌪️', desc: 'Die Formulierung prägt deine Haltung erheblich. Du vertrittst je nach Darstellung unterschiedliche Positionen zum selben Thema.' },
      mirror: { name: 'Der Spiegel', icon: '🪞', desc: 'Deine Antworten spiegeln den vorgegebenen Rahmen wider. Du hast bei vielen Themen keine stabilen Grundpositionen.' }
    },
    verdicts: [
      [0, 0, 'Keine spürbare Verzerrung', 'Deine Antworten waren völlig konsistent, unabhängig davon, wie die Fragen formuliert waren. Ein so hohes Maß an logischer Konsistenz ist selten.'],
      [1, 15, 'Sehr geringe Verzerrung', 'Deine Antworten waren hochgradig konsistent. Die Formulierung einer Frage hatte fast keinen Einfluss auf deine Position.'],
      [16, 35, 'Geringe Verzerrung', 'Geringe Formulierungseffekte. Deine Positionen sind meist stabil, verschoben sich jedoch leicht je nach Wortlaut der Frage.'],
      [36, 60, 'Mäßige Verzerrung', 'Du hast bei mehreren Themen eine spürbare Empfindlichkeit gegenüber der Formulierung gezeigt. Deine Ansichten verschoben sich je nachdem, ob die Frage dich in eine bestimmte Richtung drängte.'],
      [61, 80, 'Hohe Verzerrung', 'Die Formulierung hatte einen erheblichen Einfluss auf viele deiner Antworten. Dieselbe politische Frage erzeugte anders formuliert oft unterschiedliche Reaktionen.'],
      [81, 100, 'Sehr hohe Verzerrung', 'Deine Antworten wurden stark davon geprägt, wie Fragen formuliert waren, und weniger von konsistenten Grundwerten.']
    ],
    insightInconsistent: '💡 <strong>Kognitive Analyse:</strong> Die Formulierung oder Kontextdetails dieser Fragen haben deine Perspektive verschoben. Deine Wahl änderte sich je nachdem, ob ein positiver Aspekt oder negative Konsequenzen im Fokus standen. Dies deutet darauf hin, dass deine Überzeugungen in diesem Bereich kontextabhängig sind.',
    insightConsistent: '✅ <strong>Kognitive Analyse:</strong> Deine Werte blieben fest. Ob positive Formulierung oder kritische Betrachtung, du hast identische Positionen beibehalten. Dies beweist hohe logische Konsistenz und Unempfindlichkeit gegenüber sprachlichen Framing-Effekten.',
    shortTestCaveat: '<strong>Hinweis:</strong> Sie haben den Kurztest gewählt. Da weniger Fragenpaare beantwortet wurden, ist diese Analyse des Formulierungseffekts weniger zuverlässig als beim mittleren oder langen Test.'
  },
  fr: {
    of: 'sur',
    alignment: "d'alignement",
    platformInsight: 'Aperçu du programme',
    inspect: 'Inspecter 🔍',
    disagreeWith: 'Où vous différez de <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Votre choix',
    partyPosition: 'Position de {Party}',
    faceoffHeader: "Comparatif d'effets de cadrage",
    comparisonLabel: 'Comparaison de paires',
    shiftDetected: 'Sensibilité au cadrage',
    consistentStance: 'Position cohérente',
    framePro: 'Cadrage positif (Autonomie)',
    frameCon: 'Cadrage négatif (Conséquences)',
    frameNeutral: 'Cadrage neutre',
    yourChoice: 'Votre choix',
    skippedText: 'Ignoré',
    noPairsText: 'Aucune comparaison de cadrage effectuée pour ce sujet.',
    noPairsGeneralText: 'Aucune paire de questions complétée pour ce sujet. Passez le test moyen ou long pour débloquer l\'analyse détaillée des paires.',
    gapClose: 'Votre résultat est serré — seulement {gap} points vous séparent de {nextPartyName}. Vous chevauchez probablement les deux sensibilités.',
    gapModerate: 'Vous vous alignez également de manière significative avec {nextPartyName}, avec un score de {nextPct}%.',
    gapClear: "Votre alignement avec {topPartyName} est clair, avec {gap} points d'écart avec le parti suivant.",
    profiles: {
      axiom: { name: "L'Axiome", icon: '🔷', desc: "Inébranlable. Vos principes tiennent indépendamment de la formulation, du contexte ou de l'appel émotionnel." },
      analyst: { name: "L'Analyste", icon: '🔬', desc: "Très cohérent avec une flexibilité contextuelle mineure. Vous distinguez les mécanismes politiques de la rhétorique." },
      pragmatist: { name: 'Le Pragmatique', icon: '⚖️', desc: 'Vous maintenez des positions fondamentales mais les ajustez aux marges en fonction des situations réelles.' },
      empath: { name: "L'Empathe", icon: '🌊', desc: 'Vous réagissez fortement aux récits humains et au contexte émotionnel. Vos positions varient avec le récit.' },
      weathervane: { name: 'La Girouette', icon: '🌪️', desc: "La formulation façonne considérablement votre position. Vous pouvez avoir des avis différents sur un même sujet selon sa présentation." },
      mirror: { name: 'Le Miroir', icon: '🪞', desc: "Vos réponses reflètent le cadrage présenté. Vous n'avez pas de position stable sur de nombreux sujets." }
    },
    verdicts: [
      [0, 0, 'Aucun biais détectable', 'Vos réponses étaient totalement cohérentes, quelle que soit la formulation des questions. Un tel niveau de cohérence logique est rare.'],
      [1, 15, 'Biais très faible', 'Vos réponses étaient très cohérentes. La formulation d\'une question n\'a eu presque aucune influence sur votre position.'],
      [16, 35, 'Biais faible', 'Effets mineurs de formulation. Vos positions sont généralement stables mais ont légèrement varié selon le choix des mots.'],
      [36, 60, 'Biais modéré', 'Vous avez montré une sensibilité notable à la formulation sur plusieurs sujets. Vos opinions ont changé selon que la question vous poussait ou non dans une direction.'],
      [61, 80, 'Biais élevé', 'La formulation a eu une influence significative sur beaucoup de vos réponses. La même question de politique publique a produit des réponses différentes selon sa formulation.'],
      [81, 100, 'Biais très élevé', 'Vos réponses ont été fortement façonnées par la manière dont les questions étaient présentées plutôt que par des valeurs sous-jacentes cohérentes.']
    ],
    insightInconsistent: '💡 <strong>Analyse cognitive:</strong> Les mots ou les détails de situations dans ces questions ont réussi à décaler votre point de vue. Votre choix a changé selon le cadrage. Cela suggère que vos convictions dans ce domaine dépendent fortement du contexte.',
    insightConsistent: '✅ <strong>Analyse cognitive:</strong> Vos valeurs sont restées fermes. Quel que soit le cadrage, vous avez maintenu des positions idéologiques identiques. Cela démontre une cohérence interne élevée.',
    shortTestCaveat: '<strong>Note :</strong> Vous avez passé le test court. Avec moins de paires de questions complétées, cette analyse du biais de cadrage est moins fiable que sur les tests moyen ou long.'
  },
  es: {
    of: 'de',
    alignment: 'alineación',
    platformInsight: 'Información de plataforma',
    inspect: 'Inspeccionar 🔍',
    disagreeWith: 'Donde difieres de <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Tu respuesta',
    partyPosition: 'Posición de {Party}',
    faceoffHeader: 'Contraste de encuadre cognitivo',
    comparisonLabel: 'Comparación de pares',
    shiftDetected: 'Cambio de encuadre detectado',
    consistentStance: 'Postura consistente',
    framePro: 'Encuadre positivo (Autonomía)',
    frameCon: 'Encuadre crítico (Consecuencias)',
    frameNeutral: 'Encuadre neutro',
    yourChoice: 'Tu elección',
    skippedText: 'Omitida',
    noPairsText: 'Aún no se han completado contrastes de encuadre para este tema.',
    noPairsGeneralText: 'No hay pares de preguntas completados para comparar en este tema. Realiza el test medio o largo para desbloquear el análisis de pares detallado.',
    gapClose: 'Tu resultado es estrecho: solo {gap} puntos te separan de {nextPartyName}. Podrías estar entre ambas tradiciones.',
    gapModerate: 'También te alineas significativamente con {nextPartyName} ({nextPct}%).',
    gapClear: 'Tu alineación con {topPartyName} es clara, con {gap} puntos de ventaja sobre el siguiente partido.',
    profiles: {
      axiom: { name: 'El Axioma', icon: '🔷', desc: 'Inamovible. Tus principios se mantienen firmes sin importar el encuadre, el contexto o el llamado emocional.' },
      analyst: { name: 'El Analista', icon: '🔬', desc: 'Altamente consistente con una leve flexibilidad contextual. Distingues los mecanismos de política de la retórica.' },
      pragmatist: { name: 'El Pragmático', icon: '⚖️', desc: 'Mantienes posiciones fundamentales pero las ajustas en los márgenes basándote en situaciones reales.' },
      empath: { name: 'El Empático', icon: '🌊', desc: 'Respondes fuertemente a las historias humanas y al contexto emocional. Tus posiciones cambian con la narrativa.' },
      weathervane: { name: 'La Veleta', icon: '🌪️', desc: 'El encuadre redefine significativamente tu postura. Puedes tener posiciones diferentes sobre el mismo tema según cómo se presente.' },
      mirror: { name: 'El Espejo', icon: '🪞', desc: 'Tus respuestas reflejan cualquier encuadre que se presente. Podrías no tener posiciones subyacentes estables en muchos temas.' }
    },
    verdicts: [
      [0, 0, 'Sin sesgo detectable', 'Tus respuestas fueron completamente consistentes sin importar el encuadre de las preguntas. Ese nivel de consistencia lógica es raro.'],
      [1, 15, 'Sesgo muy bajo', 'Tus respuestas fueron altamente consistentes. El encuadre de las preguntas casi no influyó en tu posición.'],
      [16, 35, 'Sesgo bajo', 'Efectos de encuadre menores. Tus posiciones son mayormente estables, pero cambiaron ligeramente según la redacción.'],
      [36, 60, 'Sesgo moderado', 'Mostraste una sensibilidad notable al encuadre en varios temas. Tus puntos de vista variaron según si la pregunta te orientaba en una dirección.'],
      [61, 80, 'Sesgo alto', 'El encuadre influyó significativamente en muchas de tus respuestas. La misma pregunta de política, redactada de otra forma, a menudo produjo respuestas distintas.'],
      [81, 100, 'Sesgo muy alto', 'Tus respuestas estuvieron fuertemente influenciadas por el encuadre de las preguntas más que por valores subyacentes consistentes.']
    ],
    insightInconsistent: '💡 <strong>Análisis cognitivo:</strong> Las palabras o los detalles de las situaciones en estas preguntas lograron cambiar tu perspectiva. Tu elección varió según el encuadre. Esto sugiere que tus convicciones en esta área dependen en gran medida del contexto.',
    insightConsistent: '✅ <strong>Análisis cognitivo:</strong> Tus valores se mantuvieron firmes. Sin importar el tipo de encuadre, mantuviste posiciones ideológicas idénticas. Esto demuestra una alta consistencia lógica interna.',
    shortTestCaveat: '<strong>Nota:</strong> Realizaste la prueba corta. Con menos parejas de preguntas completadas, este análisis del sesgo de encuadre es menos confiable que en las pruebas de tamaño medio o largo.'
  },
  it: {
    of: 'di',
    alignment: 'allineamento',
    platformInsight: 'Approfondimento politico',
    inspect: 'Ispeziona 🔍',
    disagreeWith: 'Dove dissenti da <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'La tua risposta',
    partyPosition: 'Posizione di {Party}',
    faceoffHeader: 'Confronto di incorniciamento cognitivo',
    comparisonLabel: 'Confronto di coppie',
    shiftDetected: 'Cambiamento di incorniciamento rilevato',
    consistentStance: 'Posizione coerente',
    framePro: 'Incorniciamento positivo (Autonomia)',
    frameCon: 'Incorniciamento critico (Conseguenze)',
    frameNeutral: 'Incorniciamento neutro',
    yourChoice: 'La tua scelta',
    skippedText: 'Saltata',
    noPairsText: 'Non sono ancora stati completati confronti di incorniciamento per questo argomento.',
    noPairsGeneralText: 'Nessuna coppia di domande completata per questo argomento. Esegui il test medio o lungo per sbloccare l\'analisi dettagliata delle coppie.',
    gapClose: 'Il tuo risultato è ravvicinato: solo {gap} punti ti separano da {nextPartyName}. Potresti trovarti tra le due tradizioni.',
    gapModerate: 'Ti allinei in modo significativo anche con {nextPartyName} ({nextPct}%).',
    gapClear: 'Il tuo allineamento con {topPartyName} è chiaro, con {gap} punti di distacco dal partito successivo.',
    profiles: {
      axiom: { name: "L'Assioma", icon: '🔷', desc: "Inamovibile. I tuoi principi rimangono saldi indipendentemente dall'incorniciamento, dal contesto o dal richiamo emotivo." },
      analyst: { name: "L'Analista", icon: '🔬', desc: 'Altamente coerente con una lieve flessibilità contestuale. Distingui i meccanismi politici dalla retorica.' },
      pragmatist: { name: 'Il Pragmatico', icon: '⚖️', desc: 'Mantieni posizioni fondamentali ma le adatti ai margini in base alle situazioni reali.' },
      empath: { name: "L'Empatico", icon: '🌊', desc: 'Rispondi fortemente alle storie umane e al contesto emotivo. Le tue posizioni cambiano con la narrazione.' },
      weathervane: { name: 'La Banderuola', icon: '🌪️', desc: "L'incorniciamento rimodella significativamente la tua posizione. Puoi assumere posizioni diverse sullo stesso tema a seconda di come viene presentato." },
      mirror: { name: 'Lo Specchio', icon: '🪞', desc: 'Le tue risposte riflettono qualsiasi incorniciamento venga presentato. Potresti non avere posizioni di fondo stabili su molti argomenti.' }
    },
    verdicts: [
      [0, 0, 'Nessun bias rilevabile', 'Le tue risposte sono state completamente coerenti, indipendentemente dall\'incorniciamento delle domande. Questo livello di coerenza logica è raro.'],
      [1, 15, 'Bias molto basso', 'Le tue risposte sono state altamente coerenti. L\'incorniciamento della domanda non ha quasi influenzato la tua posizione.'],
      [16, 35, 'Bias basso', 'Effetti di incorniciamento minori. Le tue posizioni sono perlopiù stabili, ma sono cambiate leggermente in base alla formulazione.'],
      [36, 60, 'Bias moderato', 'Hai mostrato una sensibilità all\'incorniciamento notevole su diversi argomenti. I tuoi punti di vista sono variati a seconda che la domanda ti spingesse o meno in una direzione.'],
      [61, 80, 'Bias elevato', 'L\'incorniciamento ha influenzato in modo significativo molte delle tue risposte. La stessa domanda politica, formulata diversamente, ha spesso prodotto risposte diverse.'],
      [81, 100, 'Bias molto elevato', 'Le tue risposte sono state fortemente modellate dall\'incorniciamento delle domande piuttosto che da valori sottostanti coerenti.']
    ],
    insightInconsistent: '💡 <strong>Analisi cognitiva:</strong> Le parole o i dettagli delle situazioni in queste domande sono riusciti a spostare la tua prospettiva. La tua scelta è cambiata in base all\'incorniciamento. Questo suggerisce che le tue convinzioni in quest\'area dipendono molto dal contesto.',
    insightConsistent: '✅ <strong>Analisi cognitiva:</strong> I tuoi valori si sono mantenuti saldi. Indipendentemente dal tipo di incorniciamento, hai mantenuto posizioni ideologiche identiche. Ciò dimostra un\'elevata coerenza logica interna.',
    shortTestCaveat: '<strong>Nota:</strong> Hai fatto il test breve. Con meno coppie di domande completate, questa analisi del bias di incorniciamento è meno affidabile rispetto ai test medio o lungo.'
  },
  nl: {
    of: 'van',
    alignment: 'overeenkomst',
    platformInsight: 'Partijstandpunt Inzicht',
    inspect: 'Inspecteren 🔍',
    disagreeWith: 'Waar je afwijkt van <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Jouw antwoord',
    partyPosition: 'Standpunt {Party}',
    faceoffHeader: 'Beïnvloedingsanalyse',
    comparisonLabel: 'Paarvergelijking',
    shiftDetected: 'Formuleringseffect',
    consistentStance: 'Consistente houding',
    framePro: 'Positief geformuleerd',
    frameCon: 'Kritisch geformuleerd',
    frameNeutral: 'Neutrale formulering',
    yourChoice: 'Jouw keuze',
    skippedText: 'Overgeslagen',
    noPairsText: 'Nog geen formuleringseffecten getest voor dit onderwerp.',
    noPairsGeneralText: 'Geen voltooide vragenparen voor dit onderwerp om te vergelijken. Doe de gemiddelde of lange test om gedetailleerde paaranalyses te ontgrendelen.',
    gapClose: 'Je resultaat ligt dicht bij elkaar — slechts {gap} punten scheiden je van {nextPartyName}. Je staat mogelijk tussen beide tradities in.',
    gapModerate: 'Je hebt ook een duidelijke overeenkomst met {nextPartyName} ({nextPct}%).',
    gapClear: 'Je overeenkomst met {topPartyName} is duidelijk, met {gap} punten voorsprong op de volgende partij.',
    profiles: {
      axiom: { name: 'Het Axioma', icon: '🔷', desc: 'Onwrikbaar. Jouw principes houden stand ongeacht de formulering, context of emotionele oproep.' },
      analyst: { name: 'De Analist', icon: '🔬', desc: 'Zeer consistent met minimale contextuele flexibiliteit. Je onderscheidt beleidsmechanismen van retoriek.' },
      pragmatist: { name: 'De Pragmaticus', icon: '⚖️', desc: "Je houdt vast aan kernstandpunten, maar past deze in concrete situaties aan de marges aan." },
      empath: { name: 'De Empaat', icon: '🌊', desc: 'Je reageert sterk op menselijke verhalen en emotionele context. Je standpunten verschuiven met het narratief mee.' },
      weathervane: { name: 'De Windvaan', icon: '🌪️', desc: 'Formulering vormt je standpunt in sterke mate. Je kunt per presentatie verschillende standpunten over hetzelfde onderwerp innemen.' },
      mirror: { name: 'De Spiegel', icon: '🪞', desc: 'Je antwoorden weerspiegelen het gepresenteerde kader. Je hebt op veel gebieden geen stabiele onderliggende standpunten.' }
    },
    verdicts: [
      [0, 0, 'Geen aantoonbare beïnvloeding', 'Je antwoorden waren volledig consistent, ongeacht hoe de vragen geformuleerd waren. Die mate van logische consistentie is zeldzaam.'],
      [1, 15, 'Zeer lage beïnvloeding', 'Je antwoorden waren zeer consistent. De formulering van de vraag had bijna geen invloed op je standpunt.'],
      [16, 35, 'Lage beïnvloeding', 'Geringe formuleringseffecten. Je standpunten zijn meestal stabiel, maar verschoven licht afhankelijk van de verwoording.'],
      [36, 60, 'Matige beïnvloeding', 'Je toonde merkbare gevoeligheid voor de formulering bij verschillende onderwerpen. Je meningen verschoven afhankelijk van of de vraag sturend was.'],
      [61, 80, 'Hoge beïnvloeding', 'De formulering had een aanzienlijke invloed op veel van je antwoorden. Dezelfde beleidsvraag leidde anders verwoord vaak tot andere antwoorden.'],
      [81, 100, 'Zeer hoge beïnvloeding', 'Je antwoorden werden sterk bepaald door de manier waarop vragen gesteld werden, in plaats van door consistente onderliggende waarden.']
    ],
    insightInconsistent: '💡 <strong>Cognitieve analyse:</strong> De bewoording of situatie-details in deze vragen hebben je perspectief verschoven. Je keuze veranderde afhankelijk van de formulering. Dit suggereert dat je overtuigingen op dit gebied contextgevoelig zijn.',
    insightConsistent: '✅ <strong>Cognitieve analyse:</strong> Je waarden bleven standvastig. Ongeacht het type formulering behield je identieke posities. Dit getuigt van een hoge interne logische consistentie.',
    shortTestCaveat: '<strong>Let op:</strong> Je hebt de korte test gedaan. Met minder beantwoorde vragenparen is deze beïnvloedingsbias-analyse minder betrouwbaar dan bij de gemiddelde of lange test.'
  },
  sv: {
    of: 'av',
    alignment: 'matchning',
    platformInsight: 'Partiprofil Insikt',
    inspect: 'Inspektera 🔍',
    disagreeWith: 'Där du inte håller med <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Ditt svar',
    partyPosition: '{Party} ståndpunkt',
    faceoffHeader: 'Formuleringsjämförelse',
    comparisonLabel: 'Parjämförelse',
    shiftDetected: 'Formuleringseffekt',
    consistentStance: 'Konsekvent ståndpunkt',
    framePro: 'Positivt formulerad',
    frameCon: 'Kritiskt formulerad',
    frameNeutral: 'Neutral formulering',
    yourChoice: 'Ditt val',
    skippedText: 'Överhoppad',
    noPairsText: 'Inga parjämförelser gjorda för detta ämne än.',
    noPairsGeneralText: 'Inga slutförda frågepar för detta ämne att jämföra. Gör det medellånga eller långa testet för att låsa upp detaljerad paranalys.',
    gapClose: 'Ditt resultat är jämnt — endast {gap} poäng skiljer dig från {nextPartyName}. Du står möjligen mellan båda traditionerna.',
    gapModerate: 'Du har också en tydlig överensstämmelse med {nextPartyName} ({nextPct}%).',
    gapClear: 'Din överensstämmelse med {topPartyName} är tydlig, med {gap} poängs marginal till nästa parti.',
    profiles: {
      axiom: { name: 'Axiomet', icon: '🔷', desc: 'Orubblig. Dina principer håller oavsett formulering, sammanhang eller emotionella argument.' },
      analyst: { name: 'Analytikern', icon: '🔬', desc: 'Mycket konsekvent med mindre kontextuell flexibilitet. Du skiljer på sakpolitik och retorik.' },
      pragmatist: { name: 'Pragmatikern', icon: '⚖️', desc: 'Du har fasta ståndpunkter i grunden men anpassar dem i marginalen utifrån verkliga situationer.' },
      empath: { name: 'Empaten', icon: '🌊', desc: 'Du reagerar starkt på mänskliga berättelser och känslomässiga sammanhang. Dina åsikter skiftar med narrativet.' },
      weathervane: { name: 'Vindflöjeln', icon: '🌪️', desc: 'Formuleringen formar dina ståndpunkter avsevärt. Du kan tycka olika i samma fråga beroende på hur den presenteras.' },
      mirror: { name: 'Spegeln', icon: '🪞', desc: 'Dina svar speglar den vinkling som presenteras. Du saknar stabila underliggande åsikter i många frågor.' }
    },
    verdicts: [
      [0, 0, 'Ingen märkbar partiskhet', 'Dina svar var helt konsekventa oavsett hur frågorna var formulerade. Den nivån av logisk konsekvens är sällsyn.'],
      [1, 15, 'Mycket låg partiskhet', 'Dina svar var mycket konsekventa. Formuleringen av en fråga hade nästan ingen inverkan på din ställning.'],
      [16, 35, 'Låg partiskhet', 'Mindre formuleringseffekter. Dina ställningstaganden är mestadels stabila men skiftade något beroende på hur en fråga var utformad.'],
      [36, 60, 'Måttlig partiskhet', 'Du visade märkbar känslighet för formuleringar på flera ämnen. Dina åsikter skiftade beroende på om frågan tryckte dig för eller emot en ståndpunkt.'],
      [61, 80, 'Hög partiskhet', 'Formuleringen hade en betydande inverkan på many av dina svar. Samma politiska fråga, formulerad annorlunda, gav ofta olika svar.'],
      [81, 100, 'Mycket hög partiskhet', 'Dina svar var starkt präglade av hur frågorna var utformade snarare än av konsekventa underliggande värderingar.']
    ],
    insightInconsistent: '💡 <strong>Kognitiv analys:</strong> Formuleringen eller situationsdetaljerna i dessa frågor lyckades förskjuta ditt perspektiv. Ditt val ändrades beroende på vinklingen. Detta tyder på att dina åsikter här är kontextberoende.',
    insightConsistent: '✅ <strong>Kognitiv analys:</strong> Dina värderingar stod fast. Oavsett om vinklingen var positiv eller kritisk behöll du identiska ståndpunkter. Detta visar på hög logisk konsekvens.',
    shortTestCaveat: '<strong>Obs:</strong> Du gjorde det korta testet. Med färre besvarade frågepar är denna formuleringsbias-analys mindre tillförlitlig än i det medellånga eller långa testet.'
  },
  da: {
    of: 'af',
    alignment: 'overensstemmelse',
    platformInsight: 'Partiprofil Indblik',
    inspect: 'Inspicér 🔍',
    disagreeWith: 'Hvor du er uenig med <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Dit svar',
    partyPosition: '{Party}s holdning',
    faceoffHeader: 'Formuleringssammenligning',
    comparisonLabel: 'Par-sammenligning',
    shiftDetected: 'Formuleringseffekt registreret',
    consistentStance: 'Konsekvent holdning',
    framePro: 'Positivt formuleret',
    frameCon: 'Kritisk formuleret',
    frameNeutral: 'Neutral formulering',
    yourChoice: 'Dit valg',
    skippedText: 'Overloppet',
    noPairsText: 'Ingen par-sammenligninger udført for dette emne endnu.',
    noPairsGeneralText: 'Ingen gennemførte spørgsmålspar for dette emne at sammenligne. Tag den mellemste eller lange test for at låse op for detaljeret paranalyse.',
    gapClose: 'Dit resultat er tæt — kun {gap} point adskiller dig fra {nextPartyName}. Du står muligvis mellem begge traditioner.',
    gapModerate: 'Du har også en tydelig overensstemmelse med {nextPartyName} ({nextPct}%).',
    gapClear: 'Din overensstemmelse med {topPartyName} er tydelig, med en margen på {gap} point til næste parti.',
    profiles: {
      axiom: { name: 'Aksiomet', icon: '🔷', desc: 'Urokkelig. Dine principper holder uanset formulering, kontekst eller følelsesmæssig appel.' },
      analyst: { name: 'Analytikeren', icon: '🔬', desc: 'Meget konsekvent med mindre kontekstuel fleksibilitet. Du skelner mellem politiske mekanismer og retorik.' },
      pragmatist: { name: 'Pragmatikeren', icon: '⚖️', desc: 'Du har faste kerneholdninger, men tilpasser dem i marginen baseret på reelle situationer.' },
      empath: { name: 'Empaten', icon: '🌊', desc: 'Du reagerer stærkt på menneskelige historier og følelsesmæssig kontekst. Dine holdninger skifter med narrativet.' },
      weathervane: { name: 'Vejrhanen', icon: '🌪️', desc: 'Formuleringen former dine holdninger betydeligt. Du kan have forskellige holdninger til samme emne afhængigt af, hvordan det præsenteres.' },
      mirror: { name: 'Spejlet', icon: '🪞', desc: 'Dine svar afspejler den formulering, der præsenteres. Du har muligvis ikke stabile underliggende holdninger til mange emner.' }
    },
    verdicts: [
      [0, 0, 'Ingen påviselig partiskhed', 'Dine svar var helt konsekvente, uanset hvordan spørgsmålene var formuleret. Den grad af logisk konsekvens er sjælden.'],
      [1, 15, 'Meget lav partiskhed', 'Dine svar var meget konsekvente. Formuleringen af et spørgsmål havde næsten ingen indflydelse på din holdning.'],
      [16, 35, 'Lav partiskhed', 'Mindre formuleringseffekter. Dine holdninger er for det meste stabile, men ændrede sig lidt afhængigt af ordlyden.'],
      [36, 60, 'Moderat partiskhed', 'Du viste tydelig følsomhed over for formuleringen på flere emner. Dine synspunkter ændrede sig afhængigt af, om spørgsmålet pressede dig i en bestemt retning.'],
      [61, 80, 'Høj partiskhed', 'Formuleringen havde en væsentlig indflydelse på mange af dine svar. Det samme politiske spørgsmål, formuleret anderledes, gav ofte forskellige svar.'],
      [81, 100, 'Meget høj partiskhed', 'Dine svar var stærkt præget af, hvordan spørgsmålene var formuleret, snarere end af konsekvente underliggende værdier.']
    ],
    insightInconsistent: '💡 <strong>Kognitiv analyse:</strong> Formuleringen eller situationsdetaljerne i disse spørgsmål formåede at forskyde dit perspektiv. Dit valg ændrede sig afhængigt af vinklingen. Dette tyder på, at dine holdninger her er kontekstafhængige.',
    insightConsistent: '✅ <strong>Kognitiv analyse:</strong> Dine værdier stod fast. Uanset om vinklingen var positiv eller kritisk, beholdt du identiske holdninger. Dette viser høj logisk konsekvens.',
    shortTestCaveat: '<strong>Bemærk:</strong> Du tog den korte test. Med færre besvarede spørgsmålspar er denne formuleringsbias-analyse mindre pålidelig end i den mellemlange eller lange test.'
  },
  no: {
    of: 'av',
    alignment: 'samsvar',
    platformInsight: 'Partiprofil Innsikt',
    inspect: 'Inspiser 🔍',
    disagreeWith: 'Der du er uenig med <span id="disagree-party-name">{Party}</span>',
    yourAnswer: 'Ditt svar',
    partyPosition: '{Party}s standpunkt',
    faceoffHeader: 'Formuleringssammenligning',
    comparisonLabel: 'Par-sammenligning',
    shiftDetected: 'Formuleringseffekt registrert',
    consistentStance: 'Konsekvent standpunkt',
    framePro: 'Positivt formulert',
    frameCon: 'Kritisk formulert',
    frameNeutral: 'Nøytral formulering',
    yourChoice: 'Ditt valg',
    skippedText: 'Hoppet over',
    noPairsText: 'Ingen par-sammenligninger utført for dette emnet ennå.',
    noPairsGeneralText: 'Ingen fullførte spørsmålspar for dette emnet å sammenligne. Ta den middels eller lange testen for å låse opp detaljert paranalyse.',
    gapClose: 'Resultatet ditt er jevnt — bare {gap} poeng skiller deg fra {nextPartyName}. Du står muligens mellom begge tradisjonene.',
    gapModerate: 'Du har også et tydelig samsvar med {nextPartyName} ({nextPct}%).',
    gapClear: 'Samsvaret ditt med {topPartyName} er tydelig, med en margin på {gap} poeng til neste parti.',
    profiles: {
      axiom: { name: 'Aksiomet', icon: '🔷', desc: 'Urokkelig. Dine prinsipper holder uanset formulering, kontekst eller følelsesmessig appell.' },
      analyst: { name: 'Analytikeren', icon: '🔬', desc: 'Svært konsekvent med mindre kontekstuell fleksibilitet. Du skiller mellom politiske mekanismer og retorikk.' },
      pragmatist: { name: 'Pragmatikeren', icon: '⚖️', desc: 'Du har faste kjerneholdninger, men justerer dem i marginen basert på reelle situasjoner.' },
      empath: { name: 'Empaten', icon: '🌊', desc: 'Du reagerer sterkt på menneskelige historier og følelsesmessig kontekst. Dine holdninger skifter med narrativet.' },
      weathervane: { name: 'Værhanen', icon: '🌪️', desc: 'Formuleringen former dine holdninger betydelig. Du kan ha ulike holdninger til samme sak avhengig av hvordan den presenteres.' },
      mirror: { name: 'Speilet', icon: '🪞', desc: 'Dine svar gjenspeiler den formuleringen som presenteres. Du har muligens ikke stabile underliggende holdninger til mange saker.' }
    },
    verdicts: [
      [0, 0, 'Ingen merkbar partiskhet', 'Svarene dine var helt konsekvente, uansett hvordan spørsmålene var formulert. En slik grad av logisk konsekvens er sjelden.'],
      [1, 15, 'Svært lav partiskhet', 'Svarene dine var svært konsekvente. Formuleringen av et spørsmål hadde nesten ingen innflytelse på din standpunkt.'],
      [16, 35, 'Lav partiskhet', 'Mindre formuleringseffekter. Standpunktene dine er stort sett stabile, men endret seg litt avhengig av ordlyden.'],
      [36, 60, 'Moderat partiskhet', 'Du viste tydelig følsomhet for formuleringen på flere emner. Synspunktene dine endret seg avhengig av om spørsmålet presset deg i en bestemt retning.'],
      [61, 80, 'Høy partiskhet', 'Formuleringen hadde en betydelig innvirkning på mange av svarene dine. Det samme politiske spørsmålet, formulert annerledes, ga ofte ulike svar.'],
      [81, 100, 'Svært høy partiskhet', 'Svarene dine var sterkt preget av hvordan spørsmålene var formulert, snarere enn av konsekvente underliggende verdier.']
    ],
    insightInconsistent: '💡 <strong>Kognitiv analyse:</strong> Formuleringen eller situasjonsdetaljene i disse spørsmålene formådde å forskyve ditt perspektiv. Valget ditt endret seg avhengig av vinklingen. Dette tyder på at holdningene dine her er kontekstavhengige.',
    insightConsistent: '✅ <strong>Kognitiv analyse:</strong> Verdiene dine stod fast. Uanset om vinklingen var positiv eller kritisk, beholdt du identiske holdninger. Dette viser høy logisk konsekvens.',
    shortTestCaveat: '<strong>Merk:</strong> Du tok den korte testen. Med færre besvarte spørsmålspar er denne formuleringsbias-analysen mindre pålitelig enn i den mellomlange eller lange testen.'
  },
  fi: {
    of: '/',
    alignment: 'sopivuus',
    platformInsight: 'Puolueohjelman näkökulma',
    inspect: 'Tarkastele 🔍',
    disagreeWith: 'Missä olet eri mieltä puolueen <span id="disagree-party-name">{Party}</span> kanssa',
    yourAnswer: 'Vastauksesi',
    partyPosition: 'Puolueen {Party} kanta',
    faceoffHeader: 'Kognitiivinen kehystysvertailu',
    comparisonLabel: 'Parinvertailu',
    shiftDetected: 'Kehystysvaikutus havaittu',
    consistentStance: 'Johdonmukainen kanta',
    framePro: 'Positiivisesti kehystetty',
    frameCon: 'Kriittisesti kehystetty',
    frameNeutral: 'Neutraali kehystys',
    yourChoice: 'Valintasi',
    skippedText: 'Ohitettu',
    noPairsText: 'Tälle aiheelle ei ole vielä tehty kehystysvertailuja.',
    noPairsGeneralText: 'Ei valmiita kysymyspareja vertailtavaksi tälle aiheelle. Tee keskipitkä tai pitkä testi avataksesi yksityiskohtaisen parianalyysin.',
    gapClose: 'Tuloksesi on täpärä — vain {gap} pistettä erottaa sinut puolueesta {nextPartyName}. Saatat olla näiden kahden välillä.',
    gapModerate: 'Sovit myös merkittävästi yhteen puolueen {nextPartyName} kanssa ({nextPct}%).',
    gapClear: 'Yhteensopivuutesi puolueen {topPartyName} kanssa on selvä, {gap} pisteen erolla seuraavaan puolueeseen.',
    profiles: {
      axiom: { name: 'Aksiooma', icon: '🔷', desc: 'Horjumaton. Periaatteesi pitävät riippumatta kehystyksestä, kontekstista tai tunnevalituksista.' },
      analyst: { name: 'Analyytikko', icon: '🔬', desc: 'Erittäin johdonmukainen vähäisellä kontekstuaalisella joustavuudella. Erotat politiikan mekaniikan retoriikasta.' },
      pragmatist: { name: 'Pragmaatikko', icon: '⚖️', desc: 'Pidät kiinni ydinkannoistasi, mutta sopeudat niitä marginaaleissa todellisten tilanteiden perusteella.' },
      empath: { name: 'Empaatikko', icon: '🌊', desc: 'Reagoit voimakkaasti inhimillisiin tarinoihin ja emotionaaliseen kontekstiin. Kantasi muuttuvat narratiivin mukaan.' },
      weathervane: { name: 'Tuuliviiri', icon: '🌪️', desc: 'Kehystys muovaa kantaasi merkittävästi. Saatat olla eri mieltä samasta asiasta riippuen siitä, miten se esitetään.' },
      mirror: { name: 'Peili', icon: '🪞', desc: 'Vastaukset heijastavat sitä kehystystä, joka esitetään. Sinulla ei ehkä ole vakaita taustakantoja monissa asioissa.' }
    },
    verdicts: [
      [0, 0, 'Ei havaittavaa vinoumaa', 'Vastauksesi olivat täysin johdonmukaisia riippumatta kysymysten kehystyksestä. Tällainen looginen johdonmukaisuus on harvinaista.'],
      [1, 15, 'Erittäin vähäinen vinouma', 'Vastauksesi olivat erittäin johdonmukaisia. Kysymyksen kehystyksellä ei ollut juuri lainkaan vaikutusta kantaasi.'],
      [16, 35, 'Vähäinen vinouma', 'Pieniä kehystysvaikutuksia. Kantasi ovat enimmäkseen vakaat, mutta muuttuivat hieman sanamuodon mukaan.'],
      [36, 60, 'Kohtalainen vinouma', 'Osoitit huomattavaa kehystysherkkyyttä useissa aiheissa. Mielipiteesi muuttuivat riippuen siitä, ohjasiko kysymys sinua johonkin suuntaan.'],
      [61, 80, 'Voimakas vinouma', 'Kehystys vaikutti merkittävästi moniin vastauksiisi. Sama politiikkakysymys toisin muotoiltuna johti usein eri vastaukseen.'],
      [81, 100, 'Erittäin voimakas vinouma', 'Kysymysten kehystys muovasi vastauksiasi voimakkaasti pikemmin kuin johdonmukaiset taustalla olevat arvot.']
    ],
    insightInconsistent: '💡 <strong>Kognitiivinen analyysi:</strong> Kysymysten sanamuodot tai tilanteiden yksityiskohdat onnistuivat muuttamaan näkökulmaasi. Valintasi muuttui kehystyksen mukaan. Tämä viittaa siihen, että kantasi tässä aiheessa ovat tilannesidonnaisia.',
    insightConsistent: '✅ <strong>Kognitiivinen analyysi:</strong> Arvosi pysyivät vahvoina. Riippumatta kehystyksestä säilytit identtiset ideologiset kannat. Tämä osoittaa korkeaa sisäistä loogista johdonmukaisuutta.',
    shortTestCaveat: '<strong>Huomautus:</strong> Teit lyhyen testin. Koska kysymyspareja on vastattu vähemmän, tämä kehystysvinouma-analyysi on vähemmän luotettava kuin keskitason tai pitkässä testissä.'
  }
};

window.getCognitiveProfile = function(biasScore, lang) {
  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
  const p = tObj.profiles;
  if (biasScore <= 10) return p.axiom;
  if (biasScore <= 25) return p.analyst;
  if (biasScore <= 45) return p.pragmatist;
  if (biasScore <= 65) return p.empath;
  if (biasScore <= 85) return p.weathervane;
  return p.mirror;
};

window.toggleTheme = function() {
  const isDark = document.documentElement.classList.toggle('dark-mode');
  if (isDark) {
    document.documentElement.classList.remove('light-mode');
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.add('light-mode');
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', 'light');
  }
};

window.shareSocial = function(platform) {
  const lang = window.currentLang || 'en';
  if (!lastScore) return;

  const pairAnswers = answers.filter(a => a.pair);
  const pairs = {};
  pairAnswers.forEach(a => {
    if (!pairs[a.pair]) pairs[a.pair] = [];
    pairs[a.pair].push(a);
  });
  
  let shiftCount = 0;
  let pairCount = 0;
  Object.values(pairs).forEach(arr => {
    if (arr.length >= 2) {
      pairCount++;
      const pos = arr.filter(x => {
        let val = x.n !== undefined ? x.n : (x.e !== 0 ? x.e : (x.g !== 0 ? -x.g : 0));
        return val > 0;
      }).length;
      const neg = arr.filter(x => {
        let val = x.n !== undefined ? x.n : (x.e !== 0 ? x.e : (x.g !== 0 ? -x.g : 0));
        return val < 0;
      }).length;
      if (Math.max(pos, neg) / (pos + neg) < 1.0) shiftCount++;
    }
  });
  
  const biasScore = pairCount > 0 ? Math.round((shiftCount / pairCount) * 100) : 0;
  const profile = window.getCognitiveProfile(biasScore, lang);
  
  const hasParties = lastScore.partyScores && Object.keys(lastScore.partyScores).length > 0;
  let label = '';
  if (hasParties) {
    const ranked = Object.entries(lastScore.partyScores).sort((a, b) => b[1] - a[1]);
    const topPartyKey = ranked[0][0];
    const topPct = ranked[0][1];
    const m = PARTY_META[topPartyKey];
    const partyName = m ? ((typeof m.name === 'object') ? m.name[lang] : m.name) : 'Independent';
    label = `${topPct}% ${partyName}`;
  } else if (typeof window.archetype === 'function') {
    const arch = window.archetype(lastScore.eScore, lastScore.gScore);
    label = arch.name;
  }

  const shareUrl = window.savedResultId 
    ? `${window.location.protocol}//${window.location.host}/result/${window.savedResultId}`
    : window.location.href;
  
  let text = '';
  if (lang === 'de') {
    text = hasParties
      ? `Ich habe den CoreOpinion Politischen Kompass-Test gemacht! Meine Übereinstimmung: ${label}. Kognitiver Stil: ${profile.icon} ${profile.name} (${biasScore}% Framing-Verzerrung). Test machen:`
      : `Ich habe den CoreOpinion Politischen Kompass-Test gemacht! Mein Archetyp: ${label}. Kognitiver Stil: ${profile.icon} ${profile.name} (${biasScore}% Framing-Verzerrung). Test machen:`;
  } else if (lang === 'fr') {
    text = hasParties
      ? `J'ai fait le test de boussole politique CoreOpinion ! Mon alignement : ${label}. Style cognitif : ${profile.icon} ${profile.name} (${biasScore}% de biais de cadrage). Faites le test :`
      : `J'ai fait le test de boussole politique CoreOpinion ! Mon archétype : ${label}. Style cognitif : ${profile.icon} ${profile.name} (${biasScore}% de biais de cadrage). Faites le test :`;
  } else if (lang === 'nl') {
    text = hasParties
      ? `Ik heb de CoreOpinion politieke kompas-test gedaan! Mijn match: ${label}. Cognitieve stijl: ${profile.icon} ${profile.name} (${biasScore}% beïnvloedingsbias). Doe de test:`
      : `Ik heb de CoreOpinion politieke kompas-test gedaan! Mijn archetype: ${label}. Cognitieve stijl: ${profile.icon} ${profile.name} (${biasScore}% beïnvloedingsbias). Doe de test:`;
  } else if (lang === 'sv') {
    text = hasParties
      ? `Jag gjorde CoreOpinions politiska kompass-test! Matchning: ${label}. Kognitiv stil: ${profile.icon} ${profile.name} (${biasScore}% formuleringsbias). Gör testet du med:`
      : `Jag gjorde CoreOpinions politiska kompass-test! Min arketyp: ${label}. Kognitiv stil: ${profile.icon} ${profile.name} (${biasScore}% formuleringsbias). Gör testet du med:`;
  } else if (lang === 'da') {
    text = hasParties
      ? `Jeg tog CoreOpinions politiske kompas-test! Overensstemmelse: ${label}. Kognitiv stil: ${profile.icon} ${profile.name} (${biasScore}% formuleringsbias). Tag testen:`
      : `Jeg tog CoreOpinions politiske kompas-test! Min arketype: ${label}. Kognitiv stil: ${profile.icon} ${profile.name} (${biasScore}% formuleringsbias). Tag testen:`;
  } else if (lang === 'no') {
    text = hasParties
      ? `Jeg tok CoreOpinions politiske kompass-test! Samsvar: ${label}. Kognitiv stil: ${profile.icon} ${profile.name} (${biasScore}% formuleringsbias). Ta testen:`
      : `Jeg tok CoreOpinions politiske kompass-test! Min arketype: ${label}. Kognitiv stil: ${profile.icon} ${profile.name} (${biasScore}% formuleringsbias). Ta testen:`;
  } else if (lang === 'fi') {
    text = hasParties
      ? `Tein CoreOpinion-arvokoneen! Sopivuuteni: ${label}. Kognitiivinen tyyli: ${profile.icon} ${profile.name} (${biasScore}% kehystysvinouma). Tee testi:`
      : `Tein CoreOpinion-arvokoneen! Arkkityyppini: ${label}. Kognitiivinen tyyli: ${profile.icon} ${profile.name} (${biasScore}% kehystysvinouma). Tee testi:`;
  } else if (lang === 'es') {
    text = hasParties
      ? `¡Hice el test de brújula política CoreOpinion! Mi alineación: ${label}. Estilo cognitivo: ${profile.icon} ${profile.name} (${biasScore}% de sesgo de encuadre). Haz el test:`
      : `¡Hice el test de brújula política CoreOpinion! Mi arquetipo: ${label}. Estilo cognitivo: ${profile.icon} ${profile.name} (${biasScore}% de sesgo de encuadre). Haz el test:`;
  } else if (lang === 'it') {
    text = hasParties
      ? `Ho fatto il test della bussola politica CoreOpinion! Il mio allineamento: ${label}. Stile cognitivo: ${profile.icon} ${profile.name} (${biasScore}% di bias di incorniciamento). Fai il test:`
      : `Ho fatto il test della bussola politica CoreOpinion! Il mio archetipo: ${label}. Stile cognitivo: ${profile.icon} ${profile.name} (${biasScore}% di bias di incorniciamento). Fai il test:`;
  } else {
    text = hasParties
      ? `I took the CoreOpinion political compass test! My match: ${label}. Cognitive style: ${profile.icon} ${profile.name} (${biasScore}% framing bias). Take the test:`
      : `I took the CoreOpinion political compass test! My archetype: ${label}. Cognitive style: ${profile.icon} ${profile.name} (${biasScore}% framing bias). Take the test:`;
  }
  
  let url = '';
  switch(platform) {
    case 'x':
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      break;
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`;
      break;
    case 'whatsapp':
      url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
      break;
    case 'linkedin':
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      break;
  }
  
  if (url) window.open(url, '_blank', 'width=600,height=400');
};

// ============================================================
// 1. NAVIGATION & ROUTING
// ============================================================
window.goTo = function(id, pushState = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
  window.scrollTo(0, 0);
  
  if (pushState) {
    const stateName = id.replace('page-', '');
    const hash = stateName === 'landing' ? '' : `#${stateName}`;
    history.pushState({ pageId: id }, '', window.location.pathname + hash);
  }
  
  // Clean up dynamic panels
  if (id === 'page-landing' || id === 'page-mode') {
    const faceoff = document.getElementById('bias-faceoff');
    if (faceoff) faceoff.style.display = 'none';
  }
  
  if (id === 'page-ideologies' && typeof window.selectIdeology === 'function') {
    window.selectIdeology('centrism');
  }
};

// Listen for back/forward browser navigation
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.pageId) {
    window.goTo(event.state.pageId, false);
  } else {
    const hash = window.location.hash;
    if (hash) {
      const pageId = `page-${hash.replace('#', '')}`;
      if (document.getElementById(pageId)) {
        window.goTo(pageId, false);
        return;
      }
    }
    window.goTo('page-landing', false);
  }
});

// Handle initial deep-linking on page load
window.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash;
  if (hash) {
    const pageId = `page-${hash.replace('#', '')}`;
    if (document.getElementById(pageId)) {
      window.goTo(pageId, false);
      history.replaceState({ pageId: pageId }, '', window.location.href);
      return;
    }
  }
  history.replaceState({ pageId: 'page-landing' }, '', window.location.pathname);
});

// ============================================================
// 2. SHUFFLER & QUESTION SCHEDULING (MINIMUM GAP ALGORITHM)
// ============================================================
window.buildOrder = function(bank, totalCount) {
  // Strength weight for priority sorting
  function strength(q) {
    return Math.max(...q.opts.flatMap(o => {
      const vals = [];
      Object.keys(o).forEach(k => {
        if (k !== 't' && typeof o[k] === 'number') {
          vals.push(Math.abs(o[k]));
        }
      });
      return vals;
    }));
  }

  // Initial random-priority sort
  const sorted = [...bank].sort((a, b) => strength(b) - strength(a) + (Math.random() - 0.5) * 0.5);
  
  // Cut down to target count if specified
  let pool = sorted;
  if (totalCount && totalCount < bank.length) {
    // For shorter tests, prioritize questions with strong axis weights
    const strong = sorted.filter(q => strength(q) >= 1.5);
    const others = sorted.filter(q => strength(q) < 1.5);
    pool = [...strong, ...others].slice(0, totalCount);
  }

  // Minimum separation filter to prevent same-pair questions from appearing consecutively
  const MIN_GAP = Math.max(4, Math.floor(pool.length * 0.25));
  for (let pass = 0; pass < 60; pass++) {
    let moved = false;
    for (let i = 0; i < pool.length; i++) {
      for (let j = i + 1; j < pool.length; j++) {
        if (pool[i].pair && pool[i].pair === pool[j].pair && (j - i) < MIN_GAP) {
          // Find another element to swap with
          for (let k = Math.min(i + MIN_GAP, pool.length - 1); k < pool.length; k++) {
            if (k === j) continue;
            let ok = true;
            for (let m = 0; m < pool.length; m++) {
              if (m === k || m === j) continue;
              if (pool[m].pair && pool[m].pair === pool[k].pair && Math.abs(m - j) < MIN_GAP) {
                ok = false;
                break;
              }
            }
            if (ok) {
              [pool[j], pool[k]] = [pool[k], pool[j]];
              moved = true;
              break;
            }
          }
          if (moved) break;
        }
      }
      if (moved) break;
    }
    if (!moved) break;
  }
  return pool;
};

// ============================================================
// 3. QUIZ CONTROLLER & PLAYER RENDER
// ============================================================
window.startTest = function(m) {
  console.log("startTest initialized with mode:", m);
  try {
    qi = 0;
    picked = -1;
    answers = [];
    lastScore = null;
    
    // Reset Save Status
    const sStatus = document.getElementById('save-status');
    if (sStatus) sStatus.textContent = '';
    const sEmail = document.getElementById('save-email');
    if (sEmail) sEmail.value = '';

    // Determine actual target question count based on mode selection
    const totalQ = BANK.length;

    function getTestLength(modeName, totalQ) {
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

    let actualTotal = totalQ;
    if (m === 'short') { actualTotal = getTestLength('short', totalQ); mode = 'short'; }
    else if (m === 'medium') { actualTotal = getTestLength('medium', totalQ); mode = 'medium'; }
    else if (m === 'long') { actualTotal = getTestLength('long', totalQ); mode = 'long'; }
    else { mode = 'fixed'; }

    qs = window.buildOrder(BANK, actualTotal);

    // Update badge if exists
    const badge = document.getElementById('mode-badge');
    if (badge) {
      badge.textContent = m === 'short' ? `Short test (${actualTotal} q)` 
                        : m === 'medium' ? `Medium test (${actualTotal} q)` 
                        : m === 'long' ? `Long test (${actualTotal} q)` 
                        : 'Standard test';
    }

    console.log(`Setting up ${qs.length} questions.`);
    window.renderQ();
    window.goTo('page-test');
    console.log("startTest transition completed successfully.");
  } catch (err) {
    console.error("CRITICAL ERROR inside startTest:", err);
  }
};

window.renderQ = function() {
  if (qi >= qs.length) {
    window.goTo('page-demo');
    return;
  }

  const rawQ = qs[qi];
  const q = (typeof window.getQuestion === 'function') ? window.getQuestion(rawQ) : rawQ;
  const total = qs.length;

  // Render progress bar
  const pFill = document.getElementById('prog-fill');
  if (pFill) pFill.style.width = ((qi / total) * 100).toFixed(1) + '%';
  const pTxt = document.getElementById('prog-txt');
  if (pTxt) {
    const lang = window.currentLang || 'en';
    const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
    const ofText = tObj.of;
    pTxt.textContent = ofText === '/' ? `${qi + 1} / ${total}` : `${qi + 1} ${ofText} ${total}`;
  }

  // Topic badge
  const qTopic = document.getElementById('q-topic');
  if (qTopic) qTopic.textContent = q.nl;

  // Context situation card
  const scenWrap = document.getElementById('q-scen-wrap');
  const scenBody = document.getElementById('q-scen-body');
  if (q.ctx) {
    if (scenWrap) scenWrap.style.display = 'block';
    if (scenBody) scenBody.textContent = q.ctx;
  } else {
    if (scenWrap) scenWrap.style.display = 'none';
  }

  // Question statement
  const qText = document.getElementById('q-text');
  if (qText) qText.textContent = q.q;

  // Options list
  const container = document.getElementById('q-opts');
  if (container) {
    container.innerHTML = '';
    q.opts.forEach((o, i) => {
      const d = document.createElement('div');
      d.className = 'q-opt';
      d.textContent = o.t;
      d.onclick = () => window.pickOpt(i, d);
      container.appendChild(d);
    });
    
    // Auto-select previous choice if user clicked "Back"
    const prev = answers.find(a => a.id === q.id);
    if (prev) {
      picked = prev.pick;
      if (container.children[prev.pick]) {
        container.children[prev.pick].classList.add('picked');
      }
    } else {
      picked = -1;
    }
  }

  // Back button state
  const bb = document.getElementById('btn-back');
  if (bb) bb.disabled = (qi === 0);
};

window.pickOpt = function(i, el) {
  document.querySelectorAll('.q-opt').forEach(o => o.classList.remove('picked'));
  el.classList.add('picked');
  picked = i;
  
  // Instant soft trigger transition to next question for dynamic feel
  setTimeout(() => {
    window.nextQ();
  }, 320);
};

window.nextQ = function() {
  if (qi >= qs.length) return;
  const q = qs[qi];

  if (picked >= 0) {
    // Overwrite previous choice if existed
    answers = answers.filter(a => a.id !== q.id);
    // Push the option and include question's framing metadata (pair, nl, fr)
    answers.push({
      id: q.id,
      pair: q.pair,
      nl: q.nl,
      fr: q.fr,
      node: q.node,
      pick: picked,
      ...q.opts[picked]
    });
  }

  picked = -1;
  qi++;
  
  if (qi >= qs.length) {
    window.goTo('page-demo');
  } else {
    window.renderQ();
  }
};

window.prevQ = function() {
  if (qi <= 0) return;
  qi--;
  window.renderQ();
};

window.skipQ = function() {
  picked = -1;
  qi++;
  if (qi >= qs.length) {
    window.goTo('page-demo');
  } else {
    window.renderQ();
  }
};

// ============================================================
// 4. TRANSITION TO RESULTS CALCULATION
// ============================================================
window.goCalc = function() {
  window.goTo('page-calc');
  
  // Background anonymous auto-save to Supabase if consent is given
  const consentEl = document.getElementById('d-consent');
  if (consentEl && consentEl.checked) {
    window.autoSaveAnonymousResults().catch(err => {
      console.warn("Background auto-save failed:", err);
    });
  }

  setTimeout(() => {
    window.renderResults();
    
    // Determine page routing (reveal screen or direct dashboard)
    const revealPage = document.getElementById('page-reveal');
    if (revealPage) {
      window.goTo('page-reveal');
    } else {
      window.goTo('page-results');
    }
  }, 1800);
};

// ============================================================
// 5. SCORING & COGNITIVE BIAS MATHEMATICAL MODEL
// ============================================================
window.score = function() {
  if (lastScore) return lastScore;

  // ── A. POLITICAL AXES SCORING ──
  let eSum = 0, gSum = 0, eMaxTotal = 0, gMaxTotal = 0;
  
  // Setup country party alignment aggregates if configured
  const hasParties = (typeof PARTY_META !== 'undefined' && Object.keys(PARTY_META).length > 0);
  const partyTotals = {};
  const partyMaxes = {};
  
  if (hasParties) {
    Object.keys(PARTY_META).forEach(p => {
      partyTotals[p] = 0;
      partyMaxes[p] = 0;
    });
  }

  answers.forEach(a => {
    const q = qs.find(q => q.id === a.id);
    if (!q) return;

    eSum += (a.e || 0);
    gSum += (a.g || 0);
    
    // Normalise against max possible value on each axis to maintain scoring purity
    eMaxTotal += Math.max(...q.opts.map(o => Math.abs(o.e || 0)));
    gMaxTotal += Math.max(...q.opts.map(o => Math.abs(o.g || 0)));

    if (hasParties) {
      Object.keys(PARTY_META).forEach(p => {
        partyTotals[p] += (a[p] || 0);
        partyMaxes[p] += Math.max(...q.opts.map(o => Math.abs(o[p] || 0)));
      });
    }
  });

  const eScore = eMaxTotal > 0 ? Math.max(-1, Math.min(1, eSum / eMaxTotal)) : 0;
  const gScore = gMaxTotal > 0 ? Math.max(-1, Math.min(1, gSum / gMaxTotal)) : 0;

  const partyScores = {};
  if (hasParties) {
    Object.keys(PARTY_META).forEach(p => {
      // General alignment formula: mapped from [-1, 1] to [0%, 100%]
      const raw = partyMaxes[p] > 0 ? partyTotals[p] / partyMaxes[p] : 0;
      partyScores[p] = Math.round(((raw + 1) / 2) * 100);
    });
    
    // Pragmatic Independent Match (closeness to political center)
    if (PARTY_META.ind) {
      const dist = Math.sqrt(eScore * eScore + gScore * gScore);
      partyScores.ind = Math.round(Math.max(0, (1 - dist * 1.5)) * 100);
    }
  }

  // ── B. FRAMING BIAS ENGINE ──
  const pairMap = {};
  answers.forEach(a => {
    if (!a.pair) return;
    
    // Ideological direction signal (economic primary, governance secondary)
    let posVal = 0;
    if (a.n !== undefined) {
      posVal = a.n;
    } else {
      posVal = a.e !== 0 ? a.e : (a.g !== 0 ? -a.g : 0);
    }
    
    if (!pairMap[a.pair]) pairMap[a.pair] = { nl: a.nl, node: a.node || a.nl, positions: [] };
    if (posVal !== 0) pairMap[a.pair].positions.push(posVal);
  });

  const topicBias = {};
  Object.keys(pairMap).forEach(pk => {
    const { nl, node, positions } = pairMap[pk];
    if (positions.length < 2) return;
    
    const posCount = positions.filter(x => x > 0).length;
    const negCount = positions.filter(x => x < 0).length;
    const tot = posCount + negCount;
    if (tot < 2) return;

    const maj = Math.max(posCount, negCount);
    // Consistency calculation: 100% split = 100% bias score; perfectly consistent = 0% bias score
    const bScore = Math.min(100, Math.max(0, Math.round((1 - maj / tot) * 200)));
    
    // Group bias scores by high-level category name
    const category = node || nl;
    if (!topicBias[category]) topicBias[category] = [];
    topicBias[category].push(bScore);
  });

  const biasValues = Object.values(topicBias).map(arr => 
    Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
  );
  
  const overallBias = biasValues.length 
    ? Math.round(biasValues.reduce((a, b) => a + b, 0) / biasValues.length) 
    : 0;

  const topicBiasAgg = {};
  Object.keys(topicBias).forEach(k => {
    topicBiasAgg[k] = Math.round(topicBias[k].reduce((a, b) => a + b, 0) / topicBias[k].length);
  });

  lastScore = { eScore, gScore, partyScores, overallBias, topicBiasAgg };
  return lastScore;
};

// ============================================================
// 6. DASHBOARD & DATA DISPLAY RENDERER
// ============================================================
window.renderResults = function() {
  const { eScore, gScore, partyScores, overallBias, topicBiasAgg } = window.score();
  const hasParties = (typeof PARTY_META !== 'undefined' && Object.keys(PARTY_META).length > 0);

  let topPartyKey = '';
  let meta = null;
  let ranked = [];
  const lang = window.currentLang || 'en';

  // --- Render Party Matches if Country-specific ---
  if (hasParties) {
    ranked = Object.entries(partyScores).sort((a, b) => b[1] - a[1]);
    topPartyKey = ranked[0][0];
    meta = PARTY_META[topPartyKey];

    const topPartyName = (typeof meta.name === 'object') ? meta.name[lang] : meta.name;
    const topPartyDesc = (typeof meta.desc === 'object') ? meta.desc[lang] : meta.desc;

    const hTopParty = document.getElementById('r-top-party');
    if (hTopParty) hTopParty.textContent = topPartyName;
    const hTopDesc = document.getElementById('r-top-desc');
    if (hTopDesc) hTopDesc.textContent = topPartyDesc;

    // Build party alignment bars
    const pContainer = document.getElementById('party-results');
    if (pContainer) {
      pContainer.innerHTML = '';
      ranked.forEach(([party, pct], idx) => {
        const m = PARTY_META[party];
        const row = document.createElement('div');
        row.className = 'party-row' + (idx === 0 ? ' top-match' : '');
        row.style.cursor = 'pointer';
        row.onclick = () => window.showPartyDetail(party);
        
        // Custom inline styling fallback for dynamic countries
        const barColor = m.color || '#B0B5BC';
        const mName = (typeof m.name === 'object') ? m.name[lang] : m.name;
        
        const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
        const alignmentText = tObj.alignment;

        row.innerHTML = `
          <div class="party-row-rank">${idx + 1}</div>
          <div class="party-row-info">
            <div class="party-row-name">${mName}</div>
            <div class="party-row-sub">${pct}% ${alignmentText}</div>
          </div>
          <div class="party-row-bar-wrap">
            <div class="party-row-bar ${m.barClass || ''}" style="width:0%; background:${barColor}" data-w="${pct}%"></div>
          </div>
          <div class="party-row-pct">${pct}%</div>
        `;
        pContainer.appendChild(row);
      });
    }

    // Dynamic Margin Analysis between Top 1 & Top 2 Matches
    const rInsight = document.getElementById('r-insight');
    if (rInsight) {
      const gap = ranked[0][1] - ranked[1][1];
      const nextPartyName = (typeof PARTY_META[ranked[1][0]].name === 'object')
        ? PARTY_META[ranked[1][0]].name[lang]
        : PARTY_META[ranked[1][0]].name;

      const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
      let gapText = '';
      if (gap < 8) {
        gapText = tObj.gapClose.replace('{gap}', gap).replace('{nextPartyName}', nextPartyName);
      } else if (gap < 20) {
        gapText = tObj.gapModerate.replace('{nextPartyName}', nextPartyName).replace('{nextPct}', ranked[1][1]);
      } else {
        gapText = tObj.gapClear.replace('{topPartyName}', topPartyName).replace('{gap}', gap);
      }

      const platformInsightHeader = tObj.platformInsight;

      rInsight.innerHTML = `
        <p style="margin-bottom:14px; font-weight:500; color:var(--ink)">${topPartyName} ${platformInsightHeader}</p>
        <p style="margin-bottom:14px">${topPartyDesc}</p>
        <p style="font-weight:300; line-height:1.6; color:var(--ink-soft);">${gapText}</p>
      `;
    }
  }

  // --- Render Archetype if General Test ---
  if (!hasParties && typeof window.archetype === 'function') {
    const arch = window.archetype(eScore, gScore);
    const archNameEl = document.getElementById('rv-archetype') || document.getElementById('r-top-party');
    if (archNameEl) archNameEl.textContent = arch.name;
    const archAxesEl = document.getElementById('rv-axes') || document.getElementById('r-top-desc');
    if (archAxesEl) archAxesEl.textContent = arch.axes;

    const rInsight = document.getElementById('r-insight');
    if (rInsight) {
      rInsight.innerHTML = `
        <p style="margin-bottom:14px; font-size:18px; font-weight:400; font-family:'Cormorant Garamond',serif;">Your Archetype: <strong>${arch.name}</strong></p>
        <p style="margin-bottom:14px; line-height:1.75; font-weight:300;">${arch.ideology}</p>
        <p style="font-weight:300; color:var(--ink-muted); line-height:1.75;"><strong>Example Figures:</strong> ${arch.example}</p>
      `;
    }
  }

  // --- Render 2D SVG Compass Dot & Axis Sliders ---
  const cDot = document.getElementById('cdot');
  const cDotRing = document.getElementById('cdot-ring');
  const cDotGlow = document.getElementById('cdot-glow');
  const glowStart = document.getElementById('glow-start');
  
  // Coordinates (centre=170, range=152 on each side)
  const dotX = (170 + eScore * 152).toFixed(1);
  const dotY = (170 - gScore * 152).toFixed(1);

  if (cDot) cDot.setAttribute('cx', dotX);
  if (cDotRing) cDotRing.setAttribute('cx', dotX);
  if (cDotGlow) cDotGlow.setAttribute('cx', dotX);
  if (cDot) cDot.setAttribute('cy', dotY);
  if (cDotRing) cDotRing.setAttribute('cy', dotY);
  if (cDotGlow) cDotGlow.setAttribute('cy', dotY);

  if (glowStart) {
    let color = '#1E4D8C'; // default navy
    if (eScore <= 0 && gScore >= 0) color = '#4B8EF1'; // Auth-Left
    else if (eScore > 0 && gScore >= 0) color = '#F5A623'; // Auth-Right
    else if (eScore <= 0 && gScore < 0) color = '#3DBF82'; // Lib-Left
    else if (eScore > 0 && gScore < 0) color = '#E85D6B'; // Lib-Right
    glowStart.setAttribute('stop-color', color);
  }

  // Soft slide transition for results dashboard UI
  setTimeout(() => {
    const axEcon = document.getElementById('ax-econ');
    const axGov = document.getElementById('ax-gov');
    if (axEcon) axEcon.style.left = (((eScore + 1) / 2) * 100).toFixed(1) + '%';
    if (axGov) axGov.style.left = (((gScore + 1) / 2) * 100).toFixed(1) + '%';
    
    document.querySelectorAll('.party-row-bar[data-w]').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }, 200);

  // --- Render Framing Bias Panel ---
  
  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
  const bv = tObj.verdicts.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || tObj.verdicts[0];
  const verdictTitle = bv[2];
  const verdictDesc = bv[3];

  const profile = window.getCognitiveProfile(overallBias, lang);
  
  // Set bias text in UI
  const bNum = document.getElementById('bias-num') || document.getElementById('r-bias-num');
  const bVerdict = document.getElementById('bias-verdict') || document.getElementById('r-bias-verdict');
  const bExplain = document.getElementById('bias-explain');
  
  const bProfIcon = document.getElementById('bias-profile-icon');
  const bProfText = document.getElementById('bias-profile-text');
  
  if (bNum) bNum.textContent = overallBias + '%';
  if (bVerdict) {
    bVerdict.textContent = verdictTitle;
    bVerdict.className = 'bias-verdict ' + (overallBias < 20 ? 'v-green' : overallBias < 60 ? 'v-amber' : 'v-red');
  }
  if (bProfIcon) bProfIcon.textContent = profile.icon;
  if (bProfText) bProfText.textContent = profile.name;
  if (bExplain) {
    let explanationHtml = `<p style="margin-bottom:8px">${verdictDesc}</p><p style="font-weight:400;color:var(--ink-soft);font-size:11.5px;line-height:1.5;margin-top:6px;"><strong>${profile.icon} ${profile.name}:</strong> ${profile.desc}</p>`;
    if (mode === 'short') {
      const caveatText = tObj.shortTestCaveat || '<strong>Note:</strong> You took the Short Test. With fewer question pairs completed, this framing bias analysis is less reliable than on the Medium or Long tests.';
      explanationHtml += `<div style="margin-top:12px;padding:10px 12px;background:var(--parchment);border-left:3px solid var(--amber);border-radius:4px;font-size:11px;color:var(--ink-muted);line-height:1.4;">${caveatText}</div>`;
    }
    bExplain.innerHTML = explanationHtml;
  }

  // Renders bias rows with cursor triggers and "Inspect 🔍" links
  const biasRowsEl = document.getElementById('bias-rows') || document.getElementById('r-bias-rows');
  if (biasRowsEl) {
    biasRowsEl.innerHTML = '';
    const sortedTopics = Object.entries(topicBiasAgg).sort((a, b) => b[1] - a[1]);
    
    const inspectLabel = tObj.inspect;
                       
    sortedTopics.forEach(([topic, scoreVal]) => {
      const color = scoreVal < 20 ? '#2D9B5F' : scoreVal < 50 ? '#E8A020' : '#C0392B';
      const row = document.createElement('div');
      
      row.style.cssText = 'display:flex;align-items:center;gap:16px;cursor:pointer;padding:8px 12px;border-radius:6px;transition:all 0.2s;';
      row.innerHTML = `
        <div style="font-size:13px;color:var(--ink-soft);min-width:180px;font-weight:400">${topic}</div>
        <div style="flex:1;height:6px;background:var(--parchment-warm);border-radius:3px;overflow:hidden">
          <div style="height:100%;width:0%;background:${color};border-radius:3px;transition:width 1.1s cubic-bezier(0.22,1,0.36,1)" data-w="${scoreVal}%"></div>
        </div>
        <div style="font-size:13px;color:var(--ink-muted);min-width:36px;text-align:right;font-variant-numeric:tabular-nums;font-weight:400">${scoreVal}%</div>
        <div style="font-size:11px;color:var(--ink-faint);min-width:48px;text-align:right;font-weight:300;">${inspectLabel}</div>
      `;
      row.onmouseenter = () => { row.style.background = 'var(--parchment-warm)'; };
      row.onmouseleave = () => { row.style.background = 'transparent'; };
      row.onclick = () => window.showBiasFaceoff(topic);
      biasRowsEl.appendChild(row);
    });
    
    setTimeout(() => {
      document.querySelectorAll('#bias-rows [data-w], #r-bias-rows [data-w]').forEach(el => {
        el.style.width = el.dataset.w;
      });
    }, 250);
  }

  // --- Render Disagreements Section ---
  if (hasParties && typeof window.renderDisagreements === 'function') {
    const disagreeSec = document.getElementById('disagree-section');
    const dPartyName = document.getElementById('disagree-party-name');
    if (disagreeSec) {
      window.renderDisagreements(topPartyKey, meta.name, ranked[0][1]);
    }
    if (dPartyName) {
      dPartyName.textContent = meta.name;
    }
  }

  // --- Render Topic Stance Heatmap ---
  if (typeof window.calculateTopicStances === 'function' && typeof window.renderTopicHeatmap === 'function') {
    const stances = window.calculateTopicStances(answers);
    window.renderTopicHeatmap(stances);
  }
};

// ============================================================
// 7. CLICK-EXPANDABLE COGNITIVE FRAMING FACE-OFF ENGINE
// ============================================================
window.showBiasFaceoff = function(topic) {
  const container = document.getElementById('bias-faceoff');
  if (!container) return;
  
  // Filter questions that correspond to this specific node or category label
  const topicQs = BANK.filter(q => q.nl === topic || q.node === topic);
  const pairs = {};
  topicQs.forEach(q => {
    if (q.pair) {
      if (!pairs[q.pair]) pairs[q.pair] = [];
      pairs[q.pair].push(q);
    }
  });

  const lang = window.currentLang || 'en';

  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];

  const faceoffHeader = tObj.faceoffHeader;
  const comparisonLabel = tObj.comparisonLabel;
  const shiftDetected = tObj.shiftDetected;
  const consistentStance = tObj.consistentStance;
  const framePro = tObj.framePro;
  const frameCon = tObj.frameCon;
  const frameNeutral = tObj.frameNeutral;
  const yourChoice = tObj.yourChoice;
  const skippedText = tObj.skippedText;
  const noPairsText = tObj.noPairsText;

  let html = `<div style="font-size:14px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--ink);margin-bottom:16px;">🔍 ${faceoffHeader}: ${topic}</div>`;
  let hasPairs = false;

  Object.entries(pairs).forEach(([pairId, qsInPair]) => {
    // Match user answers to these specific pairs
    const pairAnswers = answers.filter(a => a.pair === pairId);
    if (pairAnswers.length < 2) return;

    hasPairs = true;
    
    // Check if user contradictions occur (opposing directions picked)
    const pos = pairAnswers.filter(x => {
      let val = 0;
      if (x.n !== undefined) val = x.n;
      else val = x.e !== 0 ? x.e : (x.g !== 0 ? -x.g : 0);
      return val > 0;
    }).length;
    
    const neg = pairAnswers.filter(x => {
      let val = 0;
      if (x.n !== undefined) val = x.n;
      else val = x.e !== 0 ? x.e : (x.g !== 0 ? -x.g : 0);
      return val < 0;
    }).length;

    const tot = pos + neg;
    if (tot < 2) return;
    const maj = Math.max(pos, neg);
    const isInconsistent = maj / tot < 1.0;

    html += `
      <div style="background:var(--parchment);border:1px solid ${isInconsistent ? 'var(--amber)' : 'var(--border-soft)'};border-left:4px solid ${isInconsistent ? 'var(--amber)' : 'var(--green)'};border-radius:6px;padding:20px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,0.02);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <span style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-muted);">${comparisonLabel}: ${pairId.toUpperCase()}</span>
          <span style="font-size:10px;font-weight:500;padding:4px 8px;border-radius:3px;${isInconsistent ? 'background:var(--amber-soft);color:var(--amber);' : 'background:var(--green-soft);color:var(--green);'}">
            ${isInconsistent ? shiftDetected : consistentStance}
          </span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
    `;

    qsInPair.forEach((rawQ, idx) => {
      const q = (typeof window.getQuestion === 'function') ? window.getQuestion(rawQ) : rawQ;
      const ans = pairAnswers.find(a => a.id === q.id);
      const isPro = q.fr === 'pro';
      const isCon = q.fr === 'con';
      
      const frameColor = isPro ? 'var(--navy)' : isCon ? 'var(--red)' : 'var(--ink-muted)';
      const frameText = isPro ? framePro : isCon ? frameCon : frameNeutral;
      const ansText = ans ? (q.opts[ans.pick] ? q.opts[ans.pick].t : ans.t) : skippedText;

      html += `
        <div style="display:flex;flex-direction:column;justify-content:space-between;background:var(--white);border:1px solid var(--border-soft);border-radius:6px;padding:16px;">
          <div>
            <div style="font-size:9px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:${frameColor};margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              <span style="width:6px;height:6px;border-radius:50%;background:${frameColor}"></span>
              Q${idx + 1}: ${frameText}
            </div>
            ${q.ctx ? `<div style="font-size:12px;color:var(--ink-muted);font-style:italic;margin-bottom:8px;line-height:1.45;background:var(--parchment);padding:8px 10px;border-radius:4px;">"${q.ctx}"</div>` : ''}
            <div style="font-size:14px;color:var(--ink);font-weight:400;margin-bottom:12px;line-height:1.4;">${q.q}</div>
          </div>
          <div style="background:var(--parchment-warm);border-top:1px solid var(--border-soft);padding:10px 12px;margin:-16px -16px -16px;margin-top:16px;border-radius:0 0 6px 6px;">
            <div style="font-size:8px;color:var(--ink-faint);text-transform:uppercase;margin-bottom:2px;font-weight:500;">${yourChoice}</div>
            <div style="font-size:12px;color:var(--ink-soft);font-weight:400;">${ansText}</div>
          </div>
        </div>
      `;
    });

    const dynamicAnalysis = isInconsistent ? tObj.insightInconsistent : tObj.insightConsistent;

    html += `
        </div>
        <div style="font-size:12px;margin-top:14px;padding-top:10px;border-top:1px dashed var(--border-soft);font-weight:300;line-height:1.5;">
          ${dynamicAnalysis}
        </div>
      </div>
    `;
  });

  if (!hasPairs) {
    html += `<div style="font-size:13px;color:var(--ink-muted);font-weight:300;text-align:center;padding:20px;">${tObj.noPairsGeneralText}</div>`;
  }

  container.innerHTML = html;
  container.style.display = 'block';
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ============================================================
// 8. SYNCHRONIZATION AND SHARE SERVICES
// ============================================================
window.saveResults = async function() {
  const emailInput = document.getElementById('save-email');
  const statusEl = document.getElementById('save-status');
  if (!emailInput || !statusEl) return;

  const email = emailInput.value.trim();
  if (!email || !email.includes('@')) {
    statusEl.style.color = 'var(--red)';
    statusEl.textContent = 'Please enter a valid email.';
    return;
  }

  statusEl.style.color = 'var(--ink-muted)';
  statusEl.textContent = 'Saving...';
  
  const { partyScores, eScore, gScore, overallBias } = window.score();
  const hasParties = (typeof PARTY_META !== 'undefined' && Object.keys(PARTY_META).length > 0);
  const stances = window.calculateTopicStances(answers);

  // Obtain demographics fields safely
  const age = document.getElementById('d-age') ? document.getElementById('d-age').value || null : null;
  const country = document.getElementById('d-country') ? document.getElementById('d-country').value || null : null;
  const political_id = document.getElementById('d-party') 
    ? document.getElementById('d-party').value || null 
    : (document.getElementById('d-pol') ? document.getElementById('d-pol').value || null : null);
  const gender = document.getElementById('d-gender') ? document.getElementById('d-gender').value || null : null;
  const nationality = document.getElementById('d-nationality')
    ? document.getElementById('d-nationality').value || null
    : (!hasParties && document.getElementById('d-country') ? document.getElementById('d-country').value || null : null);

  const biasBreakdown = hasParties ? { ...partyScores } : {};
  biasBreakdown.__overall_bias = overallBias;
  biasBreakdown.__stances = stances;
  if (gender) biasBreakdown.__gender = gender;
  if (nationality) biasBreakdown.__nationality = nationality;

  const payload = {
    email,
    mode: window.portalCode || 'general',
    e_score: parseFloat(eScore.toFixed(4)),
    g_score: parseFloat(gScore.toFixed(4)),
    age,
    country: hasParties ? country : (nationality || null),
    political_id,
    archetype: hasParties ? Object.entries(partyScores).sort((a, b) => b[1] - a[1])[0][0] : null,
    bias_breakdown: biasBreakdown,
    created_at: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API save failed');
    const data = await res.json();
    window.savedResultId = data.id;

    statusEl.style.color = 'var(--green)';
    statusEl.textContent = `Saved successfully! We have emailed your diagnostic report to ${email}.`;
  } catch (err) {
    console.error("Database save failed:", err);
    statusEl.style.color = 'var(--red)';
    statusEl.textContent = 'Something went wrong. Please try again.';
  }
};

window.getCurrentCountryName = function() {
  const badge = document.querySelector('.flag-badge');
  if (!badge) return null;
  // Strip flag emoji and non-ASCII icons to isolate the country name
  return badge.textContent.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
};

window.autoSaveAnonymousResults = async function() {
  const { partyScores, eScore, gScore, overallBias } = window.score();
  const hasParties = (typeof PARTY_META !== 'undefined' && Object.keys(PARTY_META).length > 0);
  const stances = window.calculateTopicStances(answers);

  const age = document.getElementById('d-age') ? document.getElementById('d-age').value || null : null;
  const country = document.getElementById('d-country') ? document.getElementById('d-country').value || null : null;
  const political_id = document.getElementById('d-party') 
    ? document.getElementById('d-party').value || null 
    : (document.getElementById('d-pol') ? document.getElementById('d-pol').value || null : null);
  const gender = document.getElementById('d-gender') ? document.getElementById('d-gender').value || null : null;
  const nationality = document.getElementById('d-nationality')
    ? document.getElementById('d-nationality').value || null
    : (!hasParties && document.getElementById('d-country') ? document.getElementById('d-country').value || null : null);

  const biasBreakdown = hasParties ? { ...partyScores } : {};
  biasBreakdown.__overall_bias = overallBias;
  biasBreakdown.__stances = stances;
  if (gender) biasBreakdown.__gender = gender;
  if (nationality) biasBreakdown.__nationality = nationality;

  const payload = {
    mode: window.portalCode || 'general',
    e_score: parseFloat(eScore.toFixed(4)),
    g_score: parseFloat(gScore.toFixed(4)),
    age,
    country: hasParties ? country : (nationality || null),
    political_id,
    archetype: hasParties ? Object.entries(partyScores).sort((a, b) => b[1] - a[1])[0][0] : null,
    bias_breakdown: biasBreakdown,
    created_at: new Date().toISOString()
  };

  try {
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API save failed');
    const data = await res.json();
    window.savedResultId = data.id;
    console.log("Results auto-saved successfully (anonymous). ID:", data.id);
  } catch (e) {
    console.warn("Database auto-save failed. Proceeding normally:", e);
  }
};

window.copyLink = function() {
  const { partyScores, overallBias } = window.score();
  const hasParties = (typeof PARTY_META !== 'undefined' && Object.keys(PARTY_META).length > 0);
  
  let shareUrl = window.savedResultId 
    ? `${window.location.protocol}//${window.location.host}/result/${window.savedResultId}`
    : window.location.href;
    
  let text = '';
  if (hasParties) {
    const topMatch = Object.entries(partyScores).sort((a, b) => b[1] - a[1])[0];
    text = `My political alignment: ${PARTY_META[topMatch[0]].name} (${topMatch[1]}% match) | Framing Bias: ${overallBias}% | View my full report: ${shareUrl}`;
  } else {
    text = `Take the political compass test that also reveals your cognitive framing bias! Mine was ${overallBias}% bias. Discover yours: ${shareUrl}`;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    const statusEl = document.getElementById('save-status');
    if (statusEl) {
      statusEl.style.color = 'var(--green)';
      statusEl.textContent = 'Results link copied to clipboard! Share it with your friends.';
    }
  });
};

// ============================================================
// 9. PARTY DISAGREEMENTS CALCULATOR & RENDERER
// ============================================================
window.buildDisagreements = function(topParty) {
  const disagree = [];
  answers.forEach(a => {
    const rawQ = qs.find(q => q.id === a.id);
    if (!rawQ) return;
    const q = (typeof window.getQuestion === 'function') ? window.getQuestion(rawQ) : rawQ;
    
    // Find best option for topParty
    let bestScore = -Infinity, bestOpt = null;
    q.opts.forEach(o => {
      const ps = o[topParty] || 0;
      if (ps > bestScore) { bestScore = ps; bestOpt = o; }
    });
    const userScore = a[topParty] || 0;
    const gap = bestScore - userScore;
    if (gap >= 2 && bestOpt && bestOpt.t !== (q.opts[a.pick] ? q.opts[a.pick].t : a.t)) {
      disagree.push({
        topic: q.nl,
        question: q.q,
        userAnswer: q.opts[a.pick] ? q.opts[a.pick].t : a.t,
        partyAnswer: bestOpt.t,
        gap
      });
    }
  });
  return disagree.sort((a, b) => b.gap - a.gap).slice(0, 5);
};

window.renderDisagreements = function(topParty, partyName, topPct) {
  const el = document.getElementById('disagree-section');
  if (!el) return;
  if (topPct >= 100) { el.style.display = 'none'; return; }
  const items = window.buildDisagreements(topParty);
  if (!items.length) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  
  const lang = window.currentLang || 'en';
  
  const labelEl = el.querySelector('div[style*="letter-spacing:2px"]');
  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
  if (labelEl) {
    labelEl.innerHTML = tObj.disagreeWith.replace('{Party}', partyName);
  }

  const yourAnswerHeader = tObj.yourAnswer;
  const partyPositionHeader = tObj.partyPosition.replace('{Party}', partyName);

  const list = document.getElementById('disagree-list');
  list.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.style.cssText = 'border:1px solid var(--border-soft);border-radius:8px;padding:18px 22px;background:var(--white);margin-bottom:12px;';
    card.innerHTML = `
      <div style="font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:8px">${item.topic}</div>
      <div style="font-size:14px;color:var(--ink);font-weight:400;margin-bottom:14px;font-family:'Cormorant Garamond',serif;font-size:16px">${item.question}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div style="padding:12px 14px;background:var(--parchment-warm);border-radius:6px;border-left:3px solid #B0B5BC">
          <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink-faint);margin-bottom:6px">${yourAnswerHeader}</div>
          <div style="font-size:13px;color:var(--ink-soft);font-weight:300;line-height:1.5">${item.userAnswer}</div>
        </div>
        <div style="padding:12px 14px;background:var(--navy-soft);border-radius:6px;border-left:3px solid #2A5DB0">
          <div style="font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:#2A5DB0;margin-bottom:6px">${partyPositionHeader}</div>
          <div style="font-size:13px;color:var(--ink-soft);font-weight:300;line-height:1.5">${item.partyAnswer}</div>
        </div>
      </div>`;
    list.appendChild(card);
  });
};

window.buildAgreements = function(partyKey) {
  const agree = [];
  answers.forEach(a => {
    const rawQ = qs.find(q => q.id === a.id);
    if (!rawQ) return;
    const q = (typeof window.getQuestion === 'function') ? window.getQuestion(rawQ) : rawQ;
    
    let bestScore = -Infinity;
    q.opts.forEach(o => {
      const ps = o[partyKey] || 0;
      if (ps > bestScore) { bestScore = ps; }
    });
    const userScore = a[partyKey] || 0;
    
    if (userScore === bestScore && bestScore > 0) {
      agree.push({
        topic: q.nl,
        question: q.q,
        userAnswer: q.opts[a.pick] ? q.opts[a.pick].t : a.t
      });
    }
  });
  return agree;
};

window.buildAllDisagreements = function(partyKey) {
  const disagree = [];
  answers.forEach(a => {
    const rawQ = qs.find(q => q.id === a.id);
    if (!rawQ) return;
    const q = (typeof window.getQuestion === 'function') ? window.getQuestion(rawQ) : rawQ;
    
    let bestScore = -Infinity, bestOpt = null;
    q.opts.forEach(o => {
      const ps = o[partyKey] || 0;
      if (ps > bestScore) { bestScore = ps; bestOpt = o; }
    });
    const userScore = a[partyKey] || 0;
    const gap = bestScore - userScore;
    if (gap >= 2 && bestOpt && bestOpt.t !== (q.opts[a.pick] ? q.opts[a.pick].t : a.t)) {
      disagree.push({
        topic: q.nl,
        question: q.q,
        userAnswer: q.opts[a.pick] ? q.opts[a.pick].t : a.t,
        partyAnswer: bestOpt.t,
        gap
      });
    }
  });
  return disagree.sort((a, b) => b.gap - a.gap);
};

window.showPartyDetail = function(partyKey) {
  const m = PARTY_META[partyKey];
  if (!m) return;
  const lang = window.currentLang || 'en';
  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
  
  const mName = (typeof m.name === 'object') ? m.name[lang] : m.name;
  const barColor = m.color || '#B0B5BC';
  
  const { partyScores } = window.score();
  const pct = partyScores[partyKey] || 0;
  
  const elName = document.getElementById('party-modal-name');
  if (elName) elName.textContent = mName;
  const elColor = document.getElementById('party-modal-color');
  if (elColor) elColor.style.backgroundColor = barColor;
  const elMatch = document.getElementById('party-modal-match');
  if (elMatch) elMatch.textContent = `${pct}% ${tObj.alignment || 'Alignment'}`;
  
  const agreements = window.buildAgreements(partyKey);
  const disagreements = window.buildAllDisagreements(partyKey);
  
  const elAgree = document.getElementById('party-modal-agreements');
  if (elAgree) {
    elAgree.innerHTML = '';
    if (agreements.length === 0) {
      elAgree.innerHTML = `<div style="font-size:13px; color:var(--ink-muted); text-align:center; padding:20px; font-weight:300;">No direct policy agreements found.</div>`;
    } else {
      agreements.forEach(item => {
        const card = document.createElement('div');
        card.style.cssText = 'border:1px solid var(--border-soft); border-radius:8px; padding:14px 16px; background:var(--parchment-warm); border-left:3px solid var(--green);';
        card.innerHTML = `
          <div style="font-size:9px; font-weight:500; letter-spacing:1px; text-transform:uppercase; color:var(--ink-faint); margin-bottom:4px;">${item.topic}</div>
          <div style="font-size:13.5px; color:var(--ink); font-weight:400; margin-bottom:8px; line-height:1.4;">${item.question}</div>
          <div style="font-size:12px; color:var(--ink-soft); font-weight:300;">
            <strong>Your aligned choice:</strong> ${item.userAnswer}
          </div>
        `;
        elAgree.appendChild(card);
      });
    }
  }
  
  const elDisagree = document.getElementById('party-modal-disagreements');
  if (elDisagree) {
    elDisagree.innerHTML = '';
    if (disagreements.length === 0) {
      elDisagree.innerHTML = `<div style="font-size:13px; color:var(--ink-muted); text-align:center; padding:20px; font-weight:300;">No policy disagreements found! You are in perfect alignment.</div>`;
    } else {
      const yourAnswerHeader = tObj.yourAnswer || 'Your Answer';
      const partyPositionHeader = (tObj.partyPosition || '{Party}\'s Position').replace('{Party}', mName);
      disagreements.forEach(item => {
        const card = document.createElement('div');
        card.style.cssText = 'border:1px solid var(--border-soft); border-radius:8px; padding:14px 16px; background:var(--white); border-left:3px solid var(--red);';
        card.innerHTML = `
          <div style="font-size:9px; font-weight:500; letter-spacing:1px; text-transform:uppercase; color:var(--ink-faint); margin-bottom:4px;">${item.topic}</div>
          <div style="font-size:13.5px; color:var(--ink); font-weight:400; margin-bottom:12px; line-height:1.4;">${item.question}</div>
          <div style="display:grid; grid-template-columns:1fr; gap:8px;">
            <div style="padding:10px; background:var(--parchment-warm); border-radius:4px; border-left:2px solid #B0B5BC">
              <div style="font-size:8px; font-weight:500; letter-spacing:1px; text-transform:uppercase; color:var(--ink-faint); margin-bottom:2px;">${yourAnswerHeader}</div>
              <div style="font-size:12px; color:var(--ink-soft); font-weight:300; line-height:1.4;">${item.userAnswer}</div>
            </div>
            <div style="padding:10px; background:var(--navy-soft); border-radius:4px; border-left:2px solid ${barColor}">
              <div style="font-size:8px; font-weight:500; letter-spacing:1px; text-transform:uppercase; color:${barColor}; margin-bottom:2px;">${partyPositionHeader}</div>
              <div style="font-size:12px; color:var(--ink-soft); font-weight:300; line-height:1.4;">${item.partyAnswer}</div>
            </div>
          </div>
        `;
        elDisagree.appendChild(card);
      });
    }
  }
  
  window.switchPartyTab('agree');
  
  const modal = document.getElementById('party-modal');
  if (modal) modal.classList.add('active');
};

window.closePartyModal = function(event) {
  const modal = document.getElementById('party-modal');
  if (modal) modal.classList.remove('active');
};

window.switchPartyTab = function(tabName) {
  const btnAgree = document.getElementById('tab-agree');
  const btnDisagree = document.getElementById('tab-disagree');
  const paneAgree = document.getElementById('pane-agree');
  const paneDisagree = document.getElementById('pane-disagree');
  
  if (tabName === 'agree') {
    if (btnAgree) btnAgree.classList.add('active');
    if (btnDisagree) btnDisagree.classList.remove('active');
    if (paneAgree) { paneAgree.style.display = 'block'; paneAgree.classList.add('active'); }
    if (paneDisagree) { paneDisagree.style.display = 'none'; paneDisagree.classList.remove('active'); }
  } else {
    if (btnAgree) btnAgree.classList.remove('active');
    if (btnDisagree) btnDisagree.classList.add('active');
    if (paneAgree) { paneAgree.style.display = 'none'; paneAgree.classList.remove('active'); }
    if (paneDisagree) { paneDisagree.style.display = 'block'; paneDisagree.classList.add('active'); }
  }
};

// ============================================================
// 10. SAVED RESULTS VIEWER & TOPIC STANCE HEATMAP RENDERER
// ============================================================

window.calculateTopicStances = function(userAnswers) {
  const topics = {};
  
  userAnswers.forEach(a => {
    const q = qs.find(x => x.id === a.id);
    if (!q) return;
    
    const category = q.nl;
    if (!topics[category]) {
      topics[category] = {
        eSum: 0,
        eMax: 0,
        gSum: 0,
        gMax: 0,
        count: 0
      };
    }
    
    const chosenOpt = q.opts[a.pick] || a;
    const optE = chosenOpt.e || 0;
    const optG = chosenOpt.g || 0;
    
    topics[category].eSum += optE;
    topics[category].gSum += optG;
    
    topics[category].eMax += Math.max(...q.opts.map(o => Math.abs(o.e || 0)));
    topics[category].gMax += Math.max(...q.opts.map(o => Math.abs(o.g || 0)));
    topics[category].count++;
  });
  
  const stances = {};
  Object.keys(topics).forEach(cat => {
    const t = topics[cat];
    stances[cat] = {
      e: t.eMax > 0 ? t.eSum / t.eMax : null,
      g: t.gMax > 0 ? t.gSum / t.gMax : null
    };
  });
  
  return stances;
};

window.renderTopicHeatmap = function(stances) {
  const grid = document.getElementById('topic-heatmap-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const lang = window.currentLang || 'en';
  
  const labelTrans = {
    en: { left: 'Left', right: 'Right', lib: 'Libertarian', auth: 'Authoritarian' },
    de: { left: 'Links', right: 'Rechts', lib: 'Libertär', auth: 'Autoritär' },
    fr: { left: 'Gauche', right: 'Droite', lib: 'Libertaire', auth: 'Autoritaire' },
    es: { left: 'Izquierda', right: 'Derecha', lib: 'Libertario', auth: 'Autoritario' },
    it: { left: 'Sinistra', right: 'Destra', lib: 'Libertario', auth: 'Autoritario' },
    nl: { left: 'Links', right: 'Rechts', lib: 'Libertair', auth: 'Autoritair' },
    sv: { left: 'Vänster', right: 'Höger', lib: 'Libertär', auth: 'Auktoritär' },
    da: { left: 'Venstre', right: 'Højre', lib: 'Libertær', auth: 'Autoritær' },
    no: { left: 'Venstre', right: 'Høyre', lib: 'Libertær', auth: 'Autoritær' },
    fi: { left: 'Vasen', right: 'Oikea', lib: 'Libertaarinen', auth: 'Autoritaarinen' }
  };
  
  const trans = labelTrans[lang] || labelTrans['en'];
  const sortedTopics = Object.keys(stances).sort();
  
  if (sortedTopics.length === 0) {
    grid.innerHTML = '<div style="font-size:13px;color:var(--ink-muted);grid-column:1/-1;text-align:center;padding:20px;">No stance data available.</div>';
    return;
  }
  
  sortedTopics.forEach(topic => {
    const stance = stances[topic];
    if (stance.e === null && stance.g === null) return;
    
    const item = document.createElement('div');
    item.className = 'topic-heatmap-item';
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'topic-heatmap-name';
    nameDiv.textContent = topic;
    item.appendChild(nameDiv);
    
    if (stance.e !== null) {
      const axisDiv = document.createElement('div');
      axisDiv.className = 'topic-heatmap-axis';
      
      const labels = document.createElement('div');
      labels.className = 'topic-heatmap-labels';
      labels.innerHTML = `<span>${trans.left}</span><span>${trans.right}</span>`;
      axisDiv.appendChild(labels);
      
      const track = document.createElement('div');
      track.className = 'topic-heatmap-track';
      
      const pct = ((stance.e + 1) / 2) * 100;
      const marker = document.createElement('div');
      marker.className = 'topic-heatmap-marker';
      marker.style.left = `${pct.toFixed(1)}%`;
      
      track.appendChild(marker);
      axisDiv.appendChild(track);
      item.appendChild(axisDiv);
    }
    
    if (stance.g !== null) {
      const axisDiv = document.createElement('div');
      axisDiv.className = 'topic-heatmap-axis';
      
      const labels = document.createElement('div');
      labels.className = 'topic-heatmap-labels';
      labels.innerHTML = `<span>${trans.lib}</span><span>${trans.auth}</span>`;
      axisDiv.appendChild(labels);
      
      const track = document.createElement('div');
      track.className = 'topic-heatmap-track';
      
      const pct = ((stance.g + 1) / 2) * 100;
      const marker = document.createElement('div');
      marker.className = 'topic-heatmap-marker';
      marker.style.left = `${pct.toFixed(1)}%`;
      
      track.appendChild(marker);
      axisDiv.appendChild(track);
      item.appendChild(axisDiv);
    }
    
    grid.appendChild(item);
  });
};

window.archetype = function(e, g) {
  const absE = Math.abs(e);
  const absG = Math.abs(g);
  
  if (absE < 0.25 && absG < 0.25) {
    return {
      name: "Centrist",
      axes: "Social Liberal / Moderate Centrist",
      ideology: "You value pragmatic solutions over rigid ideology. You tend to favor a balanced economy with social safety nets and moderate government oversight.",
      example: "Emmanuel Macron, Joe Biden"
    };
  }
  
  if (e <= 0 && g >= 0) {
    return {
      name: "State Socialist",
      axes: "Authoritarian Left",
      ideology: "You support strong government intervention in the economy to reduce inequality and regulate industries, coupled with traditional social order or state authority.",
      example: "Clement Attlee, Left Nationalists"
    };
  } else if (e > 0 && g >= 0) {
    return {
      name: "Conservative",
      axes: "Authoritarian Right",
      ideology: "You support a market-driven economy with private enterprise and property rights, alongside strong state authority, national traditions, or social order.",
      example: "Margaret Thatcher, Ronald Reagan"
    };
  } else if (e <= 0 && g < 0) {
    return {
      name: "Social Democrat",
      axes: "Libertarian Left",
      ideology: "You advocate for a strong social safety net, progressive taxation, and economic regulations, while strongly supporting individual liberties, human rights, and social freedoms.",
      example: "Bernie Sanders, Olof Palme"
    };
  } else {
    return {
      name: "Libertarian",
      axes: "Libertarian Right",
      ideology: "You support free-market capitalism, minimal government intervention in the economy, and maximum individual liberty, including robust civil rights and personal freedom.",
      example: "Milton Friedman, Ron Paul"
    };
  }
};

window.renderSavedResults = function(payload) {
  const eScore = payload.econ_score !== null ? parseFloat(payload.econ_score) : 0;
  const gScore = payload.gov_score !== null ? parseFloat(payload.gov_score) : 0;
  
  let biasBreakdown = payload.bias_breakdown || {};
  let overallBias = 0;
  if (biasBreakdown.__overall_bias !== undefined) {
    overallBias = biasBreakdown.__overall_bias;
  }
  
  const hasParties = payload.mode && payload.mode !== 'general';
  window.savedResultId = payload.id;
  
  const lang = window.currentLang || 'en';
  
  // Hide saving panel parts
  const saveTitle = document.querySelector('.save-title');
  const saveDesc = document.querySelector('.save-desc');
  const saveRow = document.querySelector('.save-row');
  const saveStatus = document.getElementById('save-status');
  if (saveTitle) saveTitle.style.display = 'none';
  if (saveDesc) saveDesc.style.display = 'none';
  if (saveRow) saveRow.style.display = 'none';
  if (saveStatus) saveStatus.style.display = 'none';

  // Render Party Matches
  if (hasParties && typeof PARTY_META !== 'undefined') {
    const partyScores = {};
    Object.entries(biasBreakdown).forEach(([k, v]) => {
      if (!k.startsWith('__')) {
        partyScores[k] = v;
      }
    });

    const ranked = Object.entries(partyScores).sort((a, b) => b[1] - a[1]);
    const topPartyKey = ranked[0] ? ranked[0][0] : '';
    const meta = topPartyKey ? PARTY_META[topPartyKey] : null;

    if (meta) {
      const topPartyName = (typeof meta.name === 'object') ? meta.name[lang] : meta.name;
      const topPartyDesc = (typeof meta.desc === 'object') ? meta.desc[lang] : meta.desc;

      const hTopParty = document.getElementById('r-top-party');
      if (hTopParty) hTopParty.textContent = topPartyName;
      const hTopDesc = document.getElementById('r-top-desc');
      if (hTopDesc) hTopDesc.textContent = topPartyDesc;
    }

    const pContainer = document.getElementById('party-results');
    if (pContainer) {
      pContainer.innerHTML = '';
      ranked.forEach(([party, pct], idx) => {
        const m = PARTY_META[party];
        if (!m) return;
        const row = document.createElement('div');
        row.className = 'party-row' + (idx === 0 ? ' top-match' : '');
        
        const barColor = m.color || '#B0B5BC';
        const mName = (typeof m.name === 'object') ? m.name[lang] : m.name;
        
        const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
        const alignmentText = tObj.alignment;

        row.innerHTML = `
          <div class="party-row-rank">${idx + 1}</div>
          <div class="party-row-info">
            <div class="party-row-name">${mName}</div>
            <div class="party-row-sub">${pct}% ${alignmentText}</div>
          </div>
          <div class="party-row-bar-wrap">
            <div class="party-row-bar ${m.barClass || ''}" style="width:0%; background:${barColor}" data-w="${pct}%"></div>
          </div>
          <div class="party-row-pct">${pct}%</div>
        `;
        pContainer.appendChild(row);
      });
    }

    const rInsight = document.getElementById('r-insight');
    if (rInsight && ranked.length >= 2) {
      const gap = ranked[0][1] - ranked[1][1];
      const nextPartyName = PARTY_META[ranked[1][0]]
        ? ((typeof PARTY_META[ranked[1][0]].name === 'object')
          ? PARTY_META[ranked[1][0]].name[lang]
          : PARTY_META[ranked[1][0]].name)
        : '';

      const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
      let gapText = '';
      if (gap < 8) {
        gapText = tObj.gapClose.replace('{gap}', gap).replace('{nextPartyName}', nextPartyName);
      } else if (gap < 20) {
        gapText = tObj.gapModerate.replace('{nextPartyName}', nextPartyName).replace('{nextPct}', ranked[1][1]);
      } else {
        const topPartyName = (typeof PARTY_META[ranked[0][0]].name === 'object')
          ? PARTY_META[ranked[0][0]].name[lang]
          : PARTY_META[ranked[0][0]].name;
        gapText = tObj.gapClear.replace('{gap}', gap).replace('{topPartyName}', topPartyName);
      }
      rInsight.innerHTML = `<p style="font-weight:300;line-height:1.75;">${gapText}</p>`;
    }
  } else if (typeof window.archetype === 'function') {
    const arch = window.archetype(eScore, gScore);
    const archNameEl = document.getElementById('r-top-party');
    if (archNameEl) archNameEl.textContent = arch.name;
    const archAxesEl = document.getElementById('r-top-desc');
    if (archAxesEl) archAxesEl.textContent = arch.axes;

    const rInsight = document.getElementById('r-insight');
    if (rInsight) {
      rInsight.innerHTML = `
        <p style="margin-bottom:14px; font-size:18px; font-weight:400; font-family:'Cormorant Garamond',serif;">Your Archetype: <strong>${arch.name}</strong></p>
        <p style="margin-bottom:14px; line-height:1.75; font-weight:300;">${arch.ideology}</p>
        <p style="font-weight:300; color:var(--ink-muted); line-height:1.75;"><strong>Example Figures:</strong> ${arch.example}</p>
      `;
    }
    
    const partyResultsContainer = document.getElementById('party-results');
    if (partyResultsContainer) partyResultsContainer.innerHTML = '';
    const partyResultsLabel = partyResultsContainer ? partyResultsContainer.previousElementSibling : null;
    if (partyResultsLabel) partyResultsLabel.style.display = 'none';
  }

  // Render Compass Dot
  const cDot = document.getElementById('cdot');
  const cDotRing = document.getElementById('cdot-ring');
  const cDotGlow = document.getElementById('cdot-glow');
  const glowStart = document.getElementById('glow-start');
  
  const dotX = (170 + eScore * 152).toFixed(1);
  const dotY = (170 - gScore * 152).toFixed(1);

  if (cDot) cDot.setAttribute('cx', dotX);
  if (cDotRing) cDotRing.setAttribute('cx', dotX);
  if (cDotGlow) cDotGlow.setAttribute('cx', dotX);
  if (cDot) cDot.setAttribute('cy', dotY);
  if (cDotRing) cDotRing.setAttribute('cy', dotY);
  if (cDotGlow) cDotGlow.setAttribute('cy', dotY);

  if (glowStart) {
    let color = '#1E4D8C';
    if (eScore <= 0 && gScore >= 0) color = '#4B8EF1';
    else if (eScore > 0 && gScore >= 0) color = '#F5A623';
    else if (eScore <= 0 && gScore < 0) color = '#3DBF82';
    else if (eScore > 0 && gScore < 0) color = '#E85D6B';
    glowStart.setAttribute('stop-color', color);
  }

  setTimeout(() => {
    const axEcon = document.getElementById('ax-econ');
    const axGov = document.getElementById('ax-gov');
    if (axEcon) axEcon.style.left = (((eScore + 1) / 2) * 100).toFixed(1) + '%';
    if (axGov) axGov.style.left = (((gScore + 1) / 2) * 100).toFixed(1) + '%';
    
    document.querySelectorAll('.party-row-bar[data-w]').forEach(el => {
      el.style.width = el.dataset.w;
    });
  }, 200);

  // Render Framing Bias Panel
  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
  const bv = tObj.verdicts.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || tObj.verdicts[0];
  const verdictTitle = bv[2];
  const verdictDesc = bv[3];

  const profile = window.getCognitiveProfile(overallBias, lang);
  
  const bNum = document.getElementById('bias-num');
  if (bNum) bNum.textContent = `${overallBias}%`;
  const bText = document.getElementById('bias-profile-text');
  if (bText) bText.textContent = profile.name;
  const bIcon = document.getElementById('bias-profile-icon');
  if (bIcon) bIcon.textContent = profile.icon;
  const bVerdict = document.getElementById('bias-verdict');
  if (bVerdict) bVerdict.textContent = verdictTitle;
  const bExplain = document.getElementById('bias-explain');
  if (bExplain) {
    bExplain.innerHTML = `<p style="margin-bottom:8px">${verdictDesc}</p><p style="font-weight:400;color:var(--ink-soft);font-size:11.5px;line-height:1.5;margin-top:6px;"><strong>${profile.icon} ${profile.name}:</strong> ${profile.desc}</p>`;
  }

  const bRows = document.getElementById('bias-rows');
  if (bRows) bRows.innerHTML = '';
  const bFaceoff = document.getElementById('bias-faceoff');
  if (bFaceoff) bFaceoff.style.display = 'none';

  // Render Topic Stance Heatmap
  if (biasBreakdown.__stances) {
    window.renderTopicHeatmap(biasBreakdown.__stances);
  } else {
    const heatmapCard = document.getElementById('topic-heatmap-card');
    if (heatmapCard) heatmapCard.style.display = 'none';
  }

  window.goTo('page-results');
};

window.renderComparison = function(payload) {
  const a = payload.a;
  const b = payload.b;
  
  const eScoreA = a.econ_score !== null ? parseFloat(a.econ_score) : 0;
  const gScoreA = a.gov_score !== null ? parseFloat(a.gov_score) : 0;
  const eScoreB = b.econ_score !== null ? parseFloat(b.econ_score) : 0;
  const gScoreB = b.gov_score !== null ? parseFloat(b.gov_score) : 0;
  
  const biasBreakdownA = a.bias_breakdown || {};
  const biasBreakdownB = b.bias_breakdown || {};
  
  const overallBiasA = biasBreakdownA.__overall_bias !== undefined ? biasBreakdownA.__overall_bias : 0;
  const overallBiasB = biasBreakdownB.__overall_bias !== undefined ? biasBreakdownB.__overall_bias : 0;
  
  const hasParties = a.mode && a.mode !== 'general' && typeof PARTY_META !== 'undefined';
  const lang = window.currentLang || 'en';
  const tObj = ENGINE_TRANSLATIONS[lang] || ENGINE_TRANSLATIONS['en'];
  
  // 1. Set titles and labels
  const countryAName = a.country || 'User A';
  const countryBName = b.country || 'User B';
  
  const hHeadline = document.getElementById('comp-headline');
  if (hHeadline) hHeadline.textContent = `${countryAName} vs ${countryBName}`;
  
  const lblA = document.getElementById('comp-label-a');
  if (lblA) lblA.textContent = countryAName;
  const lblB = document.getElementById('comp-label-b');
  if (lblB) lblB.textContent = countryBName;
  
  const titleA = document.getElementById('comp-profile-title-a');
  if (titleA) titleA.textContent = countryAName;
  const titleB = document.getElementById('comp-profile-title-b');
  if (titleB) titleB.textContent = countryBName;

  // 2. Render profiles
  const profileA = window.getCognitiveProfile(overallBiasA, lang);
  const bvA = tObj.verdicts.find(([lo, hi]) => overallBiasA >= lo && overallBiasA <= hi) || tObj.verdicts[0];
  
  const iconA = document.getElementById('comp-profile-icon-a');
  if (iconA) iconA.textContent = profileA.icon;
  const nameA = document.getElementById('comp-profile-name-a');
  if (nameA) nameA.textContent = profileA.name;
  const biasAEl = document.getElementById('comp-bias-a');
  if (biasAEl) biasAEl.textContent = `${overallBiasA}% bias`;
  const descA = document.getElementById('comp-profile-desc-a');
  if (descA) descA.innerHTML = `<strong>${bvA[2]}:</strong> ${bvA[3]} <br><span style="color:var(--ink-muted);font-size:11px;">${profileA.desc}</span>`;

  const profileB = window.getCognitiveProfile(overallBiasB, lang);
  const bvB = tObj.verdicts.find(([lo, hi]) => overallBiasB >= lo && overallBiasB <= hi) || tObj.verdicts[0];
  
  const iconB = document.getElementById('comp-profile-icon-b');
  if (iconB) iconB.textContent = profileB.icon;
  const nameB = document.getElementById('comp-profile-name-b');
  if (nameB) nameB.textContent = profileB.name;
  const biasBEl = document.getElementById('comp-bias-b');
  if (biasBEl) biasBEl.textContent = `${overallBiasB}% bias`;
  const descB = document.getElementById('comp-profile-desc-b');
  if (descB) descB.innerHTML = `<strong>${bvB[2]}:</strong> ${bvB[3]} <br><span style="color:var(--ink-muted);font-size:11px;">${profileB.desc}</span>`;

  // 3. Compass Dots (centre=170, range=152)
  const cDotA = document.getElementById('cdot-a');
  const cDotARing = document.getElementById('cdot-a-ring');
  const cDotB = document.getElementById('cdot-b');
  const cDotBRing = document.getElementById('cdot-b-ring');

  const dotXA = (170 + eScoreA * 152).toFixed(1);
  const dotYA = (170 - gScoreA * 152).toFixed(1);
  const dotXB = (170 + eScoreB * 152).toFixed(1);
  const dotYB = (170 - gScoreB * 152).toFixed(1);

  if (cDotA) cDotA.setAttribute('cx', dotXA);
  if (cDotARing) cDotARing.setAttribute('cx', dotXA);
  if (cDotA) cDotA.setAttribute('cy', dotYA);
  if (cDotARing) cDotARing.setAttribute('cy', dotYA);

  if (cDotB) cDotB.setAttribute('cx', dotXB);
  if (cDotBRing) cDotBRing.setAttribute('cx', dotXB);
  if (cDotB) cDotB.setAttribute('cy', dotYB);
  if (cDotBRing) cDotBRing.setAttribute('cy', dotYB);

  // 4. Comparative Party Alignments (if applicable)
  const compPartyCard = document.getElementById('comp-party-card');
  if (hasParties) {
    const partyScoresA = {};
    const partyScoresB = {};
    Object.entries(biasBreakdownA).forEach(([k, v]) => { if (!k.startsWith('__')) partyScoresA[k] = v; });
    Object.entries(biasBreakdownB).forEach(([k, v]) => { if (!k.startsWith('__')) partyScoresB[k] = v; });

    // Find sorted unique keys of parties present
    const allPartyKeys = [...new Set([...Object.keys(partyScoresA), ...Object.keys(partyScoresB)])];
    
    // Sort parties by highest average match pct
    const rankedParties = allPartyKeys.sort((k1, k2) => {
      const avg1 = ((partyScoresA[k1] || 0) + (partyScoresB[k1] || 0)) / 2;
      const avg2 = ((partyScoresA[k2] || 0) + (partyScoresB[k2] || 0)) / 2;
      return avg2 - avg1;
    });

    const pContainer = document.getElementById('comp-party-results');
    if (pContainer) {
      pContainer.innerHTML = '';
      rankedParties.forEach((party, idx) => {
        const m = PARTY_META[party];
        if (!m) return;
        
        const pctA = partyScoresA[party] !== undefined ? partyScoresA[party] : 0;
        const pctB = partyScoresB[party] !== undefined ? partyScoresB[party] : 0;
        const mName = (typeof m.name === 'object') ? m.name[lang] : m.name;
        const barColor = m.color || '#B0B5BC';

        const row = document.createElement('div');
        row.className = 'party-row';
        row.innerHTML = `
          <div class="party-row-rank">${idx + 1}</div>
          <div class="party-row-info">
            <div class="party-row-name">${mName}</div>
            <div class="party-row-sub" style="font-size:10px;">${countryAName}: ${pctA}% | ${countryBName}: ${pctB}%</div>
          </div>
          <div class="party-row-bar-wrap" style="height: 18px; display: flex; flex-direction: column; gap: 4px; justify-content: center; background: none; border: none;">
            <div style="height: 6px; width: 0%; background: #2A5DB0; border-radius: 3px; transition: width 1s ease;" data-w-a="${pctA}%"></div>
            <div style="height: 6px; width: 0%; background: #B8923A; border-radius: 3px; transition: width 1s ease;" data-w-b="${pctB}%"></div>
          </div>
          <div class="party-row-pct" style="font-size:11px; white-space:nowrap; text-align:right;">
            <span style="color:#2A5DB0;">${pctA}%</span> / <span style="color:#B8923A;">${pctB}%</span>
          </div>
        `;
        pContainer.appendChild(row);
      });
      
      setTimeout(() => {
        pContainer.querySelectorAll('[data-w-a]').forEach(el => { el.style.width = el.getAttribute('data-w-a'); });
        pContainer.querySelectorAll('[data-w-b]').forEach(el => { el.style.width = el.getAttribute('data-w-b'); });
      }, 200);
    }
  } else {
    if (compPartyCard) compPartyCard.style.display = 'none';
  }

  // 5. Dual-marker issue Heatmap
  const stancesA = biasBreakdownA.__stances || {};
  const stancesB = biasBreakdownB.__stances || {};
  
  const allTopics = [...new Set([...Object.keys(stancesA), ...Object.keys(stancesB)])].sort();
  const heatmapGrid = document.getElementById('comp-heatmap-grid');
  
  const labelTrans = {
    en: { left: 'Left', right: 'Right', lib: 'Libertarian', auth: 'Authoritarian' },
    de: { left: 'Links', right: 'Rechts', lib: 'Libertär', auth: 'Autoritär' },
    fr: { left: 'Gauche', right: 'Droite', lib: 'Libertaire', auth: 'Autoritaire' },
    es: { left: 'Izquierda', right: 'Derecha', lib: 'Libertario', auth: 'Autoritario' },
    it: { left: 'Sinistra', right: 'Destra', lib: 'Libertario', auth: 'Autoritario' },
    nl: { left: 'Links', right: 'Rechts', lib: 'Libertair', auth: 'Autoritair' },
    sv: { left: 'Vänster', right: 'Höger', lib: 'Libertär', auth: 'Auktoritär' }
  };
  const trans = labelTrans[lang] || labelTrans['en'];
  
  let closestStanceTopic = '';
  let closestStanceGap = Infinity;
  let biggestGapTopic = '';
  let biggestGapValue = -Infinity;

  if (heatmapGrid) {
    heatmapGrid.innerHTML = '';
    allTopics.forEach(topic => {
      const stA = stancesA[topic] || { e: null, g: null };
      const stB = stancesB[topic] || { e: null, g: null };
      
      if (stA.e === null && stA.g === null && stB.e === null && stB.g === null) return;
      
      // Compute issues distance gaps for report
      let dist = 0, count = 0;
      if (stA.e !== null && stB.e !== null) { dist += Math.abs(stA.e - stB.e); count++; }
      if (stA.g !== null && stB.g !== null) { dist += Math.abs(stA.g - stB.g); count++; }
      if (count > 0) {
        const avgDist = dist / count;
        if (avgDist < closestStanceGap) { closestStanceGap = avgDist; closestStanceTopic = topic; }
        if (avgDist > biggestGapValue) { biggestGapValue = avgDist; biggestGapTopic = topic; }
      }

      const item = document.createElement('div');
      item.className = 'topic-heatmap-item';
      
      const nameDiv = document.createElement('div');
      nameDiv.className = 'topic-heatmap-name';
      nameDiv.textContent = topic;
      item.appendChild(nameDiv);
      
      // Economic Stance Comparison
      if (stA.e !== null || stB.e !== null) {
        const axisDiv = document.createElement('div');
        axisDiv.className = 'topic-heatmap-axis';
        
        const labels = document.createElement('div');
        labels.className = 'topic-heatmap-labels';
        labels.innerHTML = `<span>${trans.left}</span><span>${trans.right}</span>`;
        axisDiv.appendChild(labels);
        
        const track = document.createElement('div');
        track.className = 'topic-heatmap-track';
        
        if (stA.e !== null) {
          const pctA = ((stA.e + 1) / 2) * 100;
          const markerA = document.createElement('div');
          markerA.className = 'topic-heatmap-marker marker-a';
          markerA.style.left = `${pctA.toFixed(1)}%`;
          track.appendChild(markerA);
        }
        if (stB.e !== null) {
          const pctB = ((stB.e + 1) / 2) * 100;
          const markerB = document.createElement('div');
          markerB.className = 'topic-heatmap-marker marker-b';
          markerB.style.left = `${pctB.toFixed(1)}%`;
          track.appendChild(markerB);
        }
        axisDiv.appendChild(track);
        item.appendChild(axisDiv);
      }
      
      // Governance Stance Comparison
      if (stA.g !== null || stB.g !== null) {
        const axisDiv = document.createElement('div');
        axisDiv.className = 'topic-heatmap-axis';
        
        const labels = document.createElement('div');
        labels.className = 'topic-heatmap-labels';
        labels.innerHTML = `<span>${trans.lib}</span><span>${trans.auth}</span>`;
        axisDiv.appendChild(labels);
        
        const track = document.createElement('div');
        track.className = 'topic-heatmap-track';
        
        if (stA.g !== null) {
          const pctA = ((stA.g + 1) / 2) * 100;
          const markerA = document.createElement('div');
          markerA.className = 'topic-heatmap-marker marker-a';
          markerA.style.left = `${pctA.toFixed(1)}%`;
          track.appendChild(markerA);
        }
        if (stB.g !== null) {
          const pctB = ((stB.g + 1) / 2) * 100;
          const markerB = document.createElement('div');
          markerB.className = 'topic-heatmap-marker marker-b';
          markerB.style.left = `${pctB.toFixed(1)}%`;
          track.appendChild(markerB);
        }
        axisDiv.appendChild(track);
        item.appendChild(axisDiv);
      }
      
      heatmapGrid.appendChild(item);
    });
  }

  // 6. Generate comparative analytical report text
  const reportTextEl = document.getElementById('comp-report-text');
  if (reportTextEl) {
    const eDiff = Math.abs(eScoreA - eScoreB);
    const gDiff = Math.abs(gScoreA - gScoreB);
    const distance = Math.sqrt(eDiff * eDiff + gDiff * gDiff);
    
    let proximityDesc = '';
    if (distance < 0.25) proximityDesc = `You are highly aligned ideologically, plotting in almost the exact same area on the political compass.`;
    else if (distance < 0.6) proximityDesc = `You hold moderately aligned political views, sharing general consensus on most issues but differing on details.`;
    else if (distance < 1.1) proximityDesc = `You have meaningful ideological divergences, holding different core alignments on key political axes.`;
    else proximityDesc = `You have highly polarized views, plotting in completely opposite quadrants of the political compass.`;

    let biasCompareDesc = '';
    const biasGap = Math.abs(overallBiasA - overallBiasB);
    if (biasGap < 5) {
      biasCompareDesc = `You share a similar sensitivity to question framing effects (${overallBiasA}% vs ${overallBiasB}% bias), suggesting a comparable cognitive processing style.`;
    } else {
      const moreBiasedUser = overallBiasA > overallBiasB ? countryAName : countryBName;
      const lessBiasedUser = overallBiasA > overallBiasB ? countryBName : countryAName;
      const higherBias = Math.max(overallBiasA, overallBiasB);
      const lowerBias = Math.min(overallBiasA, overallBiasB);
      biasCompareDesc = `${moreBiasedUser} is more sensitive to narrative framing (${higherBias}% bias) than ${lessBiasedUser} (${lowerBias}% bias), meaning they are more easily swayed by rhetorical phrasing.`;
    }

    let stancesAnalysis = '';
    if (closestStanceTopic && closestStanceGap < 0.25) {
      stancesAnalysis += `<p>🤝 <strong>Greatest Agreement:</strong> You align closest on <strong>${closestStanceTopic}</strong>, showing near-identical stances.</p>`;
    }
    if (biggestGapTopic && biggestGapValue > 0.4) {
      stancesAnalysis += `<p>⚡ <strong>Greatest Divergence:</strong> You have the largest policy gap on <strong>${biggestGapTopic}</strong>, suggesting completely different prioritizations or values.</p>`;
    }

    reportTextEl.innerHTML = `
      <p>🎯 <strong>Compass Proximity:</strong> ${proximityDesc}</p>
      <p>🧠 <strong>Cognitive Styling:</strong> ${biasCompareDesc}</p>
      ${stancesAnalysis}
    `;
  }

  // 7. Route to compare page
  window.goTo('page-compare');
};

// Check for payload immediately on script load
if (window.comparePayload) {
  window.renderComparison(window.comparePayload);
} else if (window.viewResultPayload) {
  window.renderSavedResults(window.viewResultPayload);
}

// ============================================================
// 11. DYNAMIC IDEOLOGIES MATRIX EXPLORER
// ============================================================
window.IDEOLOGIES = {
  state_socialism: {
    name: "State Socialism",
    icon: "🚩",
    color: "#4B8EF1",
    quadrant: "Authoritarian Left",
    e: -0.8,
    g: 0.7,
    axiom: "The state must direct and plan the economy to eliminate class exploitation and ensure collective equality.",
    econ: "Centralized state planning, public ownership of all major industries and resources, and the elimination of capitalist market mechanics.",
    gov: "Vanguard party leadership, collective social discipline, high state involvement in public life, and prioritization of social security over individual liberties.",
    figures: "Vladimir Lenin, Leon Trotsky, Mao Zedong, Fidel Castro"
  },
  national_conservatism: {
    name: "National Conservatism",
    icon: "🦅",
    color: "#F5A623",
    quadrant: "Authoritarian Right",
    e: 0.3,
    g: 0.7,
    axiom: "The preservation of national sovereignty, traditional culture, and social order must be the primary focus of the state.",
    econ: "Market capitalism combined with strategic tariffs, economic nationalism, and state support for domestic industries.",
    gov: "Centralized state authority, strict border control, preservation of traditional family units, and law-and-order policing.",
    figures: "Alexander Hamilton, Charles de Gaulle, Viktor Orbán"
  },
  conservatism: {
    name: "Conservatism",
    icon: "🏛️",
    color: "#F5A623",
    quadrant: "Authoritarian Right",
    e: 0.5,
    g: 0.3,
    axiom: "Society should evolve gradually, guided by established moral traditions, private property, and institutional stability.",
    econ: "Free market capitalism, fiscal discipline, low taxes, deregulation, and minimal state interference in trade.",
    gov: "Strong rule of law, preservation of national heritage, defense of civil society organizations, and limited central government size.",
    figures: "Edmund Burke, Margaret Thatcher, Ronald Reagan, Thomas Sowell"
  },
  centrism: {
    name: "Centrism",
    icon: "⚖️",
    color: "#8E9AA8",
    quadrant: "Center / Mixed",
    e: 0.0,
    g: 0.0,
    axiom: "Political decisions should be based on pragmatism, compromise, and empirical evidence rather than rigid, dogmatic ideologies.",
    econ: "Mixed economy combining capitalist markets with sensible regulation, public investments, and social safety nets.",
    gov: "Commitment to constitutional democracy, institutional checks and balances, moderate social reform, and political stability.",
    figures: "Aristotle, Montesquieu, Tony Blair, Emmanuel Macron"
  },
  social_democracy: {
    name: "Social Democracy",
    icon: "🛡️",
    color: "#3DBF82",
    quadrant: "Libertarian Left",
    e: -0.4,
    g: -0.2,
    axiom: "Capitalism can be harnessed for the common good if regulated and combined with a robust, universal welfare state.",
    econ: "Regulated markets, strong collective bargaining/labor unions, progressive taxation, and state-funded universal healthcare and education.",
    gov: "Liberal representative democracy, civil rights protection, social inclusivity, and international cooperation.",
    figures: "Eduard Bernstein, Olof Palme, John Maynard Keynes, Franklin D. Roosevelt"
  },
  democratic_socialism: {
    name: "Democratic Socialism",
    icon: "🌹",
    color: "#3DBF82",
    quadrant: "Libertarian Left",
    e: -0.7,
    g: -0.3,
    axiom: "Genuine freedom and equality require the extension of democratic principles to both the state and the economy.",
    econ: "Social ownership of major industries, democratic workspace planning, worker cooperatives, and redistributive social security.",
    gov: "Multi-party representative democracy, strong decentralization, absolute protections for civil liberties, and grassroots popular control.",
    figures: "Karl Marx, Rosa Luxemburg, Clement Attlee, Bernie Sanders"
  },
  libertarian_socialism: {
    name: "Libertarian Socialism",
    icon: "🏴",
    color: "#3DBF82",
    quadrant: "Libertarian Left",
    e: -0.8,
    g: -0.8,
    axiom: "Both state coercion and capitalist hierarchy are illegitimate structures of domination that must be replaced by voluntary mutual aid.",
    econ: "Abolition of private property and wage labor in favor of decentralized commons, worker syndicates, and mutual aid networks.",
    gov: "Direct democracy, community consensus councils, complete decentralization, and absolute individual and bodily autonomy.",
    figures: "Mikhail Bakunin, Peter Kropotkin, Noam Chomsky, Emma Goldman"
  },
  libertarianism: {
    name: "Libertarianism",
    icon: "🐍",
    color: "#E85D6B",
    quadrant: "Libertarian Right",
    e: 0.6,
    g: -0.6,
    axiom: "Individual liberty, bodily autonomy, and private property rights are absolute; state coercion should be minimized or eliminated.",
    econ: "Pure laissez-faire capitalism, absolute contract enforcement, voluntary exchange, free trade, and zero income taxation.",
    gov: "Minarchism (a 'night-watchman state' restricted purely to courts, police, and national defense) or anarcho-capitalism.",
    figures: "John Locke, Adam Smith, Friedrich Hayek, Milton Friedman"
  }
};

window.selectIdeology = function(key) {
  const item = window.IDEOLOGIES[key];
  if (!item) return;

  // 1. Highlight active node in SVG compass
  document.querySelectorAll('#page-ideologies .ideology-node').forEach(node => {
    node.classList.remove('active');
  });
  const activeNode = document.getElementById(`node-${key.replace(/_/g, '-')}`);
  if (activeNode) activeNode.classList.add('active');

  // 2. Render details card
  const card = document.getElementById('ideology-card');
  if (card) {
    card.style.borderLeft = `4px solid ${item.color}`;
    
    card.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px; margin-bottom: 4px;">
        <span style="font-size:28px;">${item.icon}</span>
        <div>
          <h2 style="font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:600; color:var(--ink); margin:0;">${item.name}</h2>
          <span style="font-size:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:${item.color};">${item.quadrant} (Econ: ${item.e >= 0 ? '+' : ''}${item.e}, Gov: ${item.g >= 0 ? '+' : ''}${item.g})</span>
        </div>
      </div>
      
      <div style="font-size:13px; color:var(--ink-soft); line-height:1.5; font-weight:300; margin-bottom:8px;">
        <strong>Core Axiom:</strong> <em>"${item.axiom}"</em>
      </div>

      <div style="display:grid; grid-template-columns:1fr; gap:12px;">
        <div style="padding:12px; background:var(--parchment-warm); border-radius:6px; border-left:3px solid var(--border)">
          <div style="font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--ink-muted);margin-bottom:4px;">Economic Policy</div>
          <div style="font-size:12.5px; color:var(--ink-soft); font-weight:300; line-height:1.45;">${item.econ}</div>
        </div>
        
        <div style="padding:12px; background:var(--parchment-warm); border-radius:6px; border-left:3px solid var(--border)">
          <div style="font-size:10px;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:var(--ink-muted);margin-bottom:4px;">Governance & Freedom</div>
          <div style="font-size:12.5px; color:var(--ink-soft); font-weight:300; line-height:1.45;">${item.gov}</div>
        </div>
      </div>

      <div style="font-size:12px; color:var(--ink-muted); font-weight:300; border-top:1px dashed var(--border-soft); padding-top:10px;">
        <strong>Key Historical Thinkers:</strong> ${item.figures}
      </div>
    `;
  }
};


// ============================================================
// HERO VIDEO BACKGROUND SLIDESHOW LOOP
// ============================================================
(function() {
  const HERO_VIDEOS = ['handshake', 'arbitration', 'taipei', 'people', 'nyc', 'berlin', 'agriculture'];
  let currentIdx = 0;
  let activeVideoEl = null;

  function createVideoElement(name) {
    const video = document.createElement('video');
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('preload', 'auto');
    
    // Add sources (WebM is primary, MP4 is fallback)
    const webmSource = document.createElement('source');
    webmSource.src = `/videos/${name}.webm`;
    webmSource.type = 'video/webm';
    
    const mp4Source = document.createElement('source');
    mp4Source.src = `/videos/${name}.mp4`;
    mp4Source.type = 'video/mp4';
    
    video.appendChild(webmSource);
    video.appendChild(mp4Source);
    
    return video;
  }

  function startSlideshow() {
    if (window.innerWidth <= 768) {
      // Disable video backgrounds on mobile to save battery, data, and CPU
      return;
    }
    const container = document.getElementById('hero-video-slides');
    if (!container) return;

    // Create and play first video
    const firstVideoName = HERO_VIDEOS[currentIdx];
    activeVideoEl = createVideoElement(firstVideoName);
    container.appendChild(activeVideoEl);
    
    // Force play and fade in
    activeVideoEl.play().catch(e => console.log("Autoplay blocked/failed: ", e));
    setTimeout(() => {
      activeVideoEl.classList.add('active');
    }, 50);

    const slideDuration = 8000; // 8 seconds per video
    const fadeDuration = 1500;  // 1.5 seconds cross-fade (matches CSS)
    const preloadLeadTime = 2000; // Preload next video 2 seconds before transition

    function transitionToNext() {
      const nextIdx = (currentIdx + 1) % HERO_VIDEOS.length;
      const nextVideoName = HERO_VIDEOS[nextIdx];

      // Preload next video in background (opacity 0)
      const nextVideoEl = createVideoElement(nextVideoName);
      container.appendChild(nextVideoEl);
      nextVideoEl.play().catch(e => console.log("Autoplay failed: ", e));

      // After 2 seconds of preloading/buffering, execute the fade transition
      setTimeout(() => {
        nextVideoEl.classList.add('active');
        if (activeVideoEl) {
          activeVideoEl.classList.remove('active');
          const oldVideo = activeVideoEl;
          // Clean up old video after transition completes to save memory
          setTimeout(() => {
            oldVideo.pause();
            oldVideo.remove();
          }, fadeDuration);
        }
        activeVideoEl = nextVideoEl;
        currentIdx = nextIdx;

        // Schedule next transition
        scheduleNext();
      }, preloadLeadTime);
    }

    function scheduleNext() {
      setTimeout(transitionToNext, slideDuration - preloadLeadTime);
    }

    // Schedule the first transition
    scheduleNext();
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSlideshow);
  } else {
    startSlideshow();
  }
})();


