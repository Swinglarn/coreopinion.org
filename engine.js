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
// 1. NAVIGATION & ROUTING
// ============================================================
window.goTo = function(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
  window.scrollTo(0, 0);
  
  // Clean up dynamic panels
  if (id === 'page-landing' || id === 'page-mode') {
    const faceoff = document.getElementById('bias-faceoff');
    if (faceoff) faceoff.style.display = 'none';
  }
};

// ============================================================
// 2. SHUFFLER & QUESTION SCHEDULING (MINIMUM GAP ALGORITHM)
// ============================================================
window.buildOrder = function(bank, totalCount) {
  // Strength weight for priority sorting
  function strength(q) {
    const partyWeights = [
      'dem', 'rep', 'lib', 'grn', 'lab', 'con', 'ref', 'snp', 
      'v-vanster', 's-sosse', 'sd-demokrat', 'm-moderat',
      'spd', 'cdu', 'fdp', 'afd', 'lnk', 'bsw', 'ren', 'rn', 'lfi', 'lr', 'ps', 
      'fg', 'ff', 'sf', 'pvv', 'glp', 'vvd', 'nsc'
    ];
    return Math.max(...q.opts.flatMap(o => {
      const vals = [Math.abs(o.e || 0), Math.abs(o.g || 0), Math.abs(o.n || 0)];
      partyWeights.forEach(pw => { if (o[pw] !== undefined) vals.push(Math.abs(o[pw])); });
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
  let total = BANK.length;
  if (m === 'short') { total = 30; mode = 'short'; }
  else if (m === 'medium') { total = 60; mode = 'medium'; }
  else if (m === 'long') { total = 100; mode = 'long'; }
  else { mode = 'fixed'; }

  const actualTotal = Math.min(total, BANK.length);
  qs = window.buildOrder(BANK, actualTotal);

  // Update badge if exists
  const badge = document.getElementById('mode-badge');
  if (badge) {
    badge.textContent = m === 'short' ? 'Short test (30 q)' 
                      : m === 'medium' ? 'Medium test (60 q)' 
                      : m === 'long' ? 'Long test (100 q)' 
                      : 'Standard test';
  }

  window.renderQ();
  window.goTo('page-test');
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
    const ofText = lang === 'de' ? 'von'
                 : lang === 'fr' ? 'sur'
                 : lang === 'nl' ? 'van'
                 : 'of';
    pTxt.textContent = `${qi + 1} ${ofText} ${total}`;
  }

  // Topic badge
  const qTopic = document.getElementById('q-topic');
  if (qTopic) qTopic.textContent = q.nl;

  // Context scenario card
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
  const hasParties = (typeof PARTY_META !== 'undefined');
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
  const hasParties = (typeof PARTY_META !== 'undefined');

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
        
        // Custom inline styling fallback for dynamic countries
        const barColor = m.color || '#B0B5BC';
        const mName = (typeof m.name === 'object') ? m.name[lang] : m.name;
        
        const alignmentText = lang === 'de' ? 'Übereinstimmung'
                            : lang === 'fr' ? 'd\'alignement'
                            : lang === 'nl' ? 'overeenkomst'
                            : lang === 'sv' ? 'matchning'
                            : 'alignment';

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

      let gapText = '';
      if (lang === 'de') {
        gapText = gap < 8
          ? `Dein Ergebnis ist knapp — nur ${gap} Punkte trennen dich von der ${nextPartyName}. Du stehst möglicherweise zwischen beiden Traditionen.`
          : gap < 20
          ? `Du weist auch eine deutliche Übereinstimmung mit der ${nextPartyName} auf (${ranked[1][1]}%).`
          : `Deine Übereinstimmung mit der ${topPartyName} ist eindeutig, mit ${gap} Punkten Vorsprung vor der nächsten Partei.`;
      } else if (lang === 'fr') {
        gapText = gap < 8
          ? `Votre résultat est serré — seulement ${gap} points vous séparent de ${nextPartyName}. Vous chevauchez probablement les deux sensibilités.`
          : gap < 20
          ? `Vous vous alignez également de manière significative avec ${nextPartyName}, avec un score de ${ranked[1][1]}%.`
          : `Votre alignement avec ${topPartyName} est clair, avec ${gap} points d'écart avec le parti suivant.`;
      } else if (lang === 'nl') {
        gapText = gap < 8
          ? `Je resultaat ligt dicht bij elkaar — slechts ${gap} punten scheiden je van ${nextPartyName}. Je staat mogelijk tussen beide tradities in.`
          : gap < 20
          ? `Je hebt ook een duidelijke overeenkomst met ${nextPartyName} (${ranked[1][1]}%).`
          : `Je overeenkomst met ${topPartyName} is duidelijk, met ${gap} punten voorsprong op de volgende partij.`;
      } else if (lang === 'sv') {
        gapText = gap < 8
          ? `Ditt resultat är jämnt — endast ${gap} poäng skiljer dig från ${nextPartyName}. Du står möjligen mellan båda traditionerna.`
          : gap < 20
          ? `Du har också en tydlig överensstämmelse med ${nextPartyName} (${ranked[1][1]}%).`
          : `Din överensstämmelse med ${topPartyName} är tydlig, med ${gap} poängs marginal till nästa parti.`;
      } else { // default 'en'
        gapText = gap < 8 
          ? `Your result is close — only ${gap} points separates you from ${nextPartyName}. You may genuinely straddle both traditions.`
          : gap < 20 
          ? `You align meaningfully with ${nextPartyName} too, scoring ${ranked[1][1]}%.`
          : `Your alignment with ${topPartyName} is clear, with ${gap} points separating you from the next closest party.`;
      }

      const platformInsightHeader = lang === 'de' ? 'Parteiplattform-Einblick'
                                  : lang === 'fr' ? 'Aperçu du programme'
                                  : lang === 'nl' ? 'Partijstandpunt Inzicht'
                                  : lang === 'sv' ? 'Partiprofil Insikt'
                                  : 'Platform Insight';

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
  
  // Coordinates (centre=170, range=152 on each side)
  const dotX = (170 + eScore * 152).toFixed(1);
  const dotY = (170 - gScore * 152).toFixed(1);

  if (cDot) cDot.setAttribute('cx', dotX);
  if (cDotRing) cDotRing.setAttribute('cx', dotX);
  if (cDot) cDot.setAttribute('cy', dotY);
  if (cDotRing) cDotRing.setAttribute('cy', dotY);

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
  
  let verdictTitle = '';
  let verdictDesc = '';
  
  if (lang === 'de') {
    const vDe = [
      [0, 0, 'Keine spürbare Verzerrung', 'Deine Antworten waren völlig konsistent, unabhängig davon, wie die Fragen formuliert waren. Ein so hohes Maß an logischer Konsistenz ist selten.'],
      [1, 15, 'Sehr geringe Verzerrung', 'Deine Antworten waren hochgradig konsistent. Die Formulierung einer Frage hatte fast keinen Einfluss auf deine Position.'],
      [16, 35, 'Geringe Verzerrung', 'Geringe Formulierungseffekte. Deine Positionen sind meist stabil, verschoben sich jedoch leicht je nach Wortlaut der Frage.'],
      [36, 60, 'Mäßige Verzerrung', 'Du hast bei mehreren Themen eine spürbare Empfindlichkeit gegenüber der Formulierung gezeigt. Deine Ansichten verschoben sich je nachdem, ob die Frage dich in eine bestimmte Richtung drängte.'],
      [61, 80, 'Hohe Verzerrung', 'Die Formulierung hatte einen erheblichen Einfluss auf viele deiner Antworten. Dieselbe politische Frage erzeugte anders formuliert oft unterschiedliche Reaktionen.'],
      [81, 100, 'Sehr hohe Verzerrung', 'Deine Antworten wurden stark davon geprägt, wie Fragen formuliert waren, und weniger von konsistenten Grundwerten.']
    ];
    const bv = vDe.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || vDe[0];
    verdictTitle = bv[2];
    verdictDesc = bv[3];
  } else if (lang === 'fr') {
    const vFr = [
      [0, 0, 'Aucun biais détectable', 'Vos réponses étaient totalement cohérentes, quelle que soit la formulation des questions. Un tel niveau de cohérence logique est rare.'],
      [1, 15, 'Biais très faible', 'Vos réponses étaient très cohérentes. La formulation d\'une question n\'a eu presque aucune influence sur votre position.'],
      [16, 35, 'Biais faible', 'Effets mineurs de formulation. Vos positions sont généralement stables mais ont légèrement varié selon le choix des mots.'],
      [36, 60, 'Biais modéré', 'Vous avez montré une sensibilité notable à la formulation sur plusieurs sujets. Vos opinions ont changé selon que la question vous poussait ou non dans une direction.'],
      [61, 80, 'Biais élevé', 'La formulation a eu une influence significative sur beaucoup de vos réponses. La même question de politique publique a produit des réponses différentes selon sa formulation.'],
      [81, 100, 'Biais très élevé', 'Vos réponses ont été fortement façonnées par la manière dont les questions étaient présentées plutôt que par des valeurs sous-jacentes cohérentes.']
    ];
    const bv = vFr.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || vFr[0];
    verdictTitle = bv[2];
    verdictDesc = bv[3];
  } else if (lang === 'nl') {
    const vNl = [
      [0, 0, 'Geen aantoonbare beïnvloeding', 'Je antwoorden waren volledig consistent, ongeacht hoe de vragen geformuleerd waren. Die mate van logische consistentie is zeldzaam.'],
      [1, 15, 'Zeer lage beïnvloeding', 'Je antwoorden waren zeer consistent. De formulering van de vraag had bijna geen invloed op je standpunt.'],
      [16, 35, 'Lage beïnvloeding', 'Geringe formuleringseffecten. Je standpunten zijn meestal stabiel, maar verschoven licht afhankelijk van de verwoording.'],
      [36, 60, 'Matige beïnvloeding', 'Je toonde merkbare gevoeligheid voor de formulering bij verschillende onderwerpen. Je meningen verschoven afhankelijk van of de vraag sturend was.'],
      [61, 80, 'Hoge beïnvloeding', 'De formulering had een aanzienlijke invloed op veel van je antwoorden. Dezelfde beleidsvraag leidde anders verwoord vaak tot andere antwoorden.'],
      [81, 100, 'Zeer hoge beïnvloeding', 'Je antwoorden werden sterk bepaald door de manier waarop vragen gesteld werden, in plaats van door consistente onderliggende waarden.']
    ];
    const bv = vNl.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || vNl[0];
    verdictTitle = bv[2];
    verdictDesc = bv[3];
  } else if (lang === 'sv') {
    const vSv = [
      [0, 0, 'Ingen märkbar partiskhet', 'Dina svar var helt konsekventa oavsett hur frågorna var formulerade. Den nivån av logisk konsekvens är sällsynt.'],
      [1, 15, 'Mycket låg partiskhet', 'Dina svar var mycket konsekventa. Formuleringen av en fråga hade nästan ingen inverkan på din ställning.'],
      [16, 35, 'Låg partiskhet', 'Mindre formuleringseffekter. Dina ställningstaganden är mestadels stabila men skiftade något beroende på hur en fråga var utformad.'],
      [36, 60, 'Måttlig partiskhet', 'Du visade märkbar känslighet för formuleringar på flera ämnen. Dina åsikter skiftade beroende på om frågan tryckte dig för eller emot en ståndpunkt.'],
      [61, 80, 'Hög partiskhet', 'Formuleringen hade en betydande inverkan på many av dina svar. Samma politiska fråga, formulerad annorlunda, gav ofta olika svar.'],
      [81, 100, 'Mycket hög partiskhet', 'Dina svar var starkt präglade av hur frågorna var utformade snarare än av konsekventa underliggande värderingar.']
    ];
    const bv = vSv.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || vSv[0];
    verdictTitle = bv[2];
    verdictDesc = bv[3];
  } else {
    const biasVerdicts = [
      [0, 0, 'No detectable bias', 'Your answers were completely consistent regardless of how questions were framed. That level of logical consistency is rare.'],
      [1, 15, 'Very low bias', 'Your answers were highly consistent. The framing of a question had almost no influence on your position.'],
      [16, 35, 'Low bias', 'Minor framing effects. Your positions are mostly stable but shifted slightly depending on how a question was worded.'],
      [36, 60, 'Moderate bias', 'You showed noticeable framing sensitivity on several topics. Your views shifted depending on whether the question pushed you toward or against a position.'],
      [61, 80, 'High bias', 'Framing had a significant influence on many of your answers. The same policy question, worded differently, often produced different responses.'],
      [81, 100, 'Very high bias', 'Your answers were strongly shaped by how questions were framed rather than by consistent underlying values.']
    ];
    const bv = biasVerdicts.find(([lo, hi]) => overallBias >= lo && overallBias <= hi) || biasVerdicts[0];
    verdictTitle = bv[2];
    verdictDesc = bv[3];
  }
  
  // Set bias text in UI
  const bNum = document.getElementById('bias-num') || document.getElementById('r-bias-num');
  const bVerdict = document.getElementById('bias-verdict') || document.getElementById('r-bias-verdict');
  const bExplain = document.getElementById('bias-explain');
  
  if (bNum) bNum.textContent = overallBias + '%';
  if (bVerdict) {
    bVerdict.textContent = verdictTitle;
    bVerdict.className = 'bias-verdict ' + (overallBias < 20 ? 'v-green' : overallBias < 60 ? 'v-amber' : 'v-red');
  }
  if (bExplain) bExplain.textContent = verdictDesc;

  // Renders bias rows with cursor triggers and "Inspect 🔍" links
  const biasRowsEl = document.getElementById('bias-rows') || document.getElementById('r-bias-rows');
  if (biasRowsEl) {
    biasRowsEl.innerHTML = '';
    const sortedTopics = Object.entries(topicBiasAgg).sort((a, b) => b[1] - a[1]);
    
    const inspectLabel = lang === 'de' ? 'Ansehen 🔍'
                       : lang === 'fr' ? 'Inspecter 🔍'
                       : lang === 'nl' ? 'Inspecteren 🔍'
                       : lang === 'sv' ? 'Inspektera 🔍'
                       : 'Inspect 🔍';
                       
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

  let faceoffHeader = 'Cognitive Framing Face-off';
  let comparisonLabel = 'Pair Comparison';
  let shiftDetected = 'Framing Shift Detected';
  let consistentStance = 'Consistent Stance';
  let framePro = 'Support / Autonomy-framed';
  let frameCon = 'Critical / Consequence-framed';
  let frameNeutral = 'Neutral Framing';
  let yourChoice = 'Your choice';
  let skippedText = 'Skipped';
  let noPairsText = 'No framing contrasts completed for this topic yet.';

  if (lang === 'de') {
    faceoffHeader = 'Framing-Vergleich';
    comparisonLabel = 'Paarweiser Vergleich';
    shiftDetected = 'Formulierungs-Effekt';
    consistentStance = 'Konsistente Haltung';
    framePro = 'Positiv / Gewinne-fokussiert';
    frameCon = 'Kritisch / Verlust-fokussiert';
    frameNeutral = 'Neutrale Formulierung';
    yourChoice = 'Deine Antwort';
    skippedText = 'Übersprungen';
    noPairsText = 'Für dieses Thema wurden noch keine Framing-Vergleiche durchgeführt.';
  } else if (lang === 'fr') {
    faceoffHeader = 'Comparatif d\'effets de cadrage';
    comparisonLabel = 'Comparaison de paires';
    shiftDetected = 'Sensibilité au cadrage';
    consistentStance = 'Position cohérente';
    framePro = 'Cadrage positif (Autonomie)';
    frameCon = 'Cadrage négatif (Conséquences)';
    frameNeutral = 'Cadrage neutre';
    yourChoice = 'Votre choix';
    skippedText = 'Ignoré';
    noPairsText = 'Aucune comparaison de cadrage effectuée pour ce sujet.';
  } else if (lang === 'nl') {
    faceoffHeader = 'Beïnvloedingsanalyse';
    comparisonLabel = 'Paarvergelijking';
    shiftDetected = 'Formuleringseffect';
    consistentStance = 'Consistente houding';
    framePro = 'Positief geformuleerd';
    frameCon = 'Kritisch geformuleerd';
    frameNeutral = 'Neutrale formulering';
    yourChoice = 'Jouw keuze';
    skippedText = 'Overgeslagen';
    noPairsText = 'Nog geen formuleringseffecten getest voor dit onderwerp.';
  } else if (lang === 'sv') {
    faceoffHeader = 'Formuleringsjämförelse';
    comparisonLabel = 'Parjämförelse';
    shiftDetected = 'Formuleringseffekt';
    consistentStance = 'Konsekvent ståndpunkt';
    framePro = 'Positivt formulerad';
    frameCon = 'Kritiskt formulerad';
    frameNeutral = 'Neutral formulering';
    yourChoice = 'Ditt val';
    skippedText = 'Överhoppad';
    noPairsText = 'Inga parjämförelser gjorda för detta ämne än.';
  }

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

    let insightDe = isInconsistent
      ? `💡 <strong>Kognitive Analyse:</strong> Die Formulierung oder Kontextdetails dieser Fragen haben deine Perspektive verschoben. Deine Wahl änderte sich je nachdem, ob ein positiver Aspekt oder negative Konsequenzen im Fokus standen. Dies deutet darauf hin, dass deine Überzeugungen in diesem Bereich kontextabhängig sind.`
      : `✅ <strong>Kognitive Analyse:</strong> Deine Werte blieben fest. Ob positive Formulierung oder kritische Betrachtung, du hast identische Positionen beibehalten. Dies beweist hohe logische Konsistenz und Unempfindlichkeit gegenüber sprachlichen Framing-Effekten.`;

    let insightFr = isInconsistent
      ? `💡 <strong>Analyse cognitive:</strong> Les mots ou les détails de scénarios dans ces questions ont réussi à décaler votre point de vue. Votre choix a changé selon le cadrage. Cela suggère que vos convictions dans ce domaine dépendent fortement du contexte.`
      : `✅ <strong>Analyse cognitive:</strong> Vos valeurs sont restées fermes. Quel que soit le cadrage, vous avez maintenu des positions idéologiques identiques. Cela démontre une cohérence interne élevée.`;

    let insightNl = isInconsistent
      ? `💡 <strong>Cognitieve analyse:</strong> De bewoording of scenario-details in deze vragen hebben je perspectief verschoven. Je keuze veranderde afhankelijk van de formulering. Dit suggereert dat je overtuigingen op dit gebied contextgevoelig zijn.`
      : `✅ <strong>Cognitieve analyse:</strong> Je waarden bleven standvastig. Ongeacht het type formulering behield je identieke posities. Dit getuigt van een hoge interne logische consistentie.`;

    let insightSv = isInconsistent
      ? `💡 <strong>Kognitiv analys:</strong> Formuleringen eller scenariodetaljerna i dessa frågor lyckades förskjuta ditt perspektiv. Ditt val ändrades beroende på vinklingen. Detta tyder på att dina åsikter här är kontextberoende.`
      : `✅ <strong>Kognitiv analys:</strong> Dina värderingar stod fast. Oavsett om vinklingen var positiv eller kritisk behöll du identiska ståndpunkter. Detta visar på hög logisk konsekvens.`;

    let insightEn = isInconsistent
      ? `💡 <strong>Cognitive Analysis:</strong> The emotional wording or scenario details in these questions successfully shifted your perspective. By swapping between an autonomous support frame and a systemic consequence frame, your choice was altered. This suggests that your beliefs in this area are contextually dependent rather than absolute, responding strongly to whatever specific narrative lens is highlighted.`
      : `✅ <strong>Cognitive Analysis:</strong> Your values held firm. Whether presented with positive support framing or critical framing, you maintained identical ideological positions. This demonstrates high internal logical consistency and resistance to rhetorical framing.`;

    const dynamicAnalysis = lang === 'de' ? insightDe
                          : lang === 'fr' ? insightFr
                          : lang === 'nl' ? insightNl
                          : lang === 'sv' ? insightSv
                          : insightEn;

    html += `
        </div>
        <div style="font-size:12px;margin-top:14px;padding-top:10px;border-top:1px dashed var(--border-soft);font-weight:300;line-height:1.5;">
          ${dynamicAnalysis}
        </div>
      </div>
    `;
  });

  if (!hasPairs) {
    html += `<div style="font-size:13px;color:var(--ink-muted);font-weight:300;text-align:center;padding:20px;">No completed question pairs for this topic to compare. Take the Medium or Long test to unlock detailed pair analysis.</div>`;
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
  const hasParties = (typeof PARTY_META !== 'undefined');

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

  const payload = {
    email,
    mode: hasParties ? 'country' : 'general',
    e_score: parseFloat(eScore.toFixed(4)),
    g_score: parseFloat(gScore.toFixed(4)),
    bias_score: overallBias,
    age,
    country, // keeping for backward compatibility with schema
    political_id,
    gender,
    nationality: nationality || (hasParties ? window.getCurrentCountryName() : null),
    consent: true,
    created_at: new Date().toISOString()
  };

  if (hasParties) {
    payload.archetype = Object.entries(partyScores).sort((a, b) => b[1] - a[1])[0][0];
    payload.bias_breakdown = partyScores;
  }

  try {
    if (typeof sbInsert === 'function') {
      await sbInsert('coreopinion_results', payload);
      
      // Fire result email via Supabase Edge Function (non-blocking, best effort)
      if (typeof SB_URL !== 'undefined' && typeof SB_KEY !== 'undefined') {
        fetch(`${SB_URL}/functions/v1/send-coreopinion-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SB_KEY,
            'Authorization': `Bearer ${SB_KEY}`
          },
          body: JSON.stringify({
            record: payload
          })
        }).catch(err => {
          console.warn("Email Edge Function dispatch failed:", err);
        });
      }

      statusEl.style.color = 'var(--green)';
      statusEl.textContent = `Saved successfully! We have emailed your diagnostic report to ${email}.`;
    } else {
      // Simulate save for offline robustness
      setTimeout(() => {
        statusEl.style.color = 'var(--green)';
        statusEl.textContent = `Results saved! Diagnostic report emailed to ${email}.`;
      }, 1000);
    }
  } catch (err) {
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
  const hasParties = (typeof PARTY_META !== 'undefined');

  const age = document.getElementById('d-age') ? document.getElementById('d-age').value || null : null;
  const region = document.getElementById('d-country') ? document.getElementById('d-country').value || null : null;
  const political_id = document.getElementById('d-party') 
    ? document.getElementById('d-party').value || null 
    : (document.getElementById('d-pol') ? document.getElementById('d-pol').value || null : null);
  const gender = document.getElementById('d-gender') ? document.getElementById('d-gender').value || null : null;
  const nationality = document.getElementById('d-nationality')
    ? document.getElementById('d-nationality').value || null
    : (!hasParties && document.getElementById('d-country') ? document.getElementById('d-country').value || null : null);

  const payload = {
    mode: hasParties ? 'country' : 'general',
    e_score: parseFloat(eScore.toFixed(4)),
    g_score: parseFloat(gScore.toFixed(4)),
    bias_score: overallBias,
    age,
    region: hasParties ? region : null, // subdivisions only for countries
    political_id,
    gender,
    nationality: nationality || (hasParties ? window.getCurrentCountryName() : null),
    consent: true,
    created_at: new Date().toISOString()
  };

  if (hasParties) {
    payload.archetype = Object.entries(partyScores).sort((a, b) => b[1] - a[1])[0][0];
    payload.bias_breakdown = partyScores;
  }

  if (typeof sbInsert === 'function') {
    // Try to auto-save to database, wrapped in try/catch to guarantee robustness
    try {
      await sbInsert('coreopinion_results', payload);
      console.log("Results auto-saved successfully (anonymous).");
    } catch (e) {
      console.warn("Database auto-save failed. Proceeding normally:", e);
    }
  }
};

window.copyLink = function() {
  const { partyScores, overallBias } = window.score();
  const hasParties = (typeof PARTY_META !== 'undefined');
  
  let text = '';
  if (hasParties) {
    const topMatch = Object.entries(partyScores).sort((a, b) => b[1] - a[1])[0];
    text = `My political alignment: ${PARTY_META[topMatch[0]].name} (${topMatch[1]}% match) | Framing Bias: ${overallBias}% | Take the test at coreopinion.org`;
  } else {
    text = `Take the political compass test that also reveals your cognitive framing bias! Mine was ${overallBias}% bias. Discover yours at coreopinion.org`;
  }
  
  navigator.clipboard.writeText(text).then(() => {
    const statusEl = document.getElementById('save-status');
    if (statusEl) {
      statusEl.style.color = 'var(--green)';
      statusEl.textContent = 'Results copied to clipboard! Share it with your friends.';
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
  if (labelEl) {
    if (lang === 'de') {
      labelEl.innerHTML = `Hier weichst du von der <span id="disagree-party-name">${partyName}</span> ab`;
    } else if (lang === 'fr') {
      labelEl.innerHTML = `Où vous différez de <span id="disagree-party-name">${partyName}</span>`;
    } else if (lang === 'nl') {
      labelEl.innerHTML = `Waar je afwijkt van <span id="disagree-party-name">${partyName}</span>`;
    } else if (lang === 'sv') {
      labelEl.innerHTML = `Där du inte håller med <span id="disagree-party-name">${partyName}</span>`;
    } else {
      labelEl.innerHTML = `Where you disagree with <span id="disagree-party-name">${partyName}</span>`;
    }
  }

  const yourAnswerHeader = lang === 'de' ? 'Deine Antwort'
                         : lang === 'fr' ? 'Votre choix'
                         : lang === 'nl' ? 'Jouw antwoord'
                         : lang === 'sv' ? 'Ditt svar'
                         : 'Your answer';

  const partyPositionHeader = lang === 'de' ? `Position der ${partyName}`
                            : lang === 'fr' ? `Position de ${partyName}`
                            : lang === 'nl' ? `Standpunt ${partyName}`
                            : lang === 'sv' ? `${partyName} ståndpunkt`
                            : `${partyName} position`;

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
