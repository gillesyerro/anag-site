/* ============================================================================
   Révise — logique de l'application (quiz / QCM)
   Aucune dépendance externe. Les scores sont stockés localement (localStorage).
   ============================================================================ */
(function () {
  "use strict";

  const COURS = window.COURS || [];
  const STORE_KEY = "revise.scores.v1";

  // --- petits utilitaires DOM -------------------------------------------
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const screens = {
    home: $("#screen-home"),
    quiz: $("#screen-quiz"),
    result: $("#screen-result"),
  };
  function show(name) {
    Object.values(screens).forEach((s) => s.classList.remove("is-active"));
    screens[name].classList.add("is-active");
    window.scrollTo(0, 0);
  }

  // --- persistance des meilleurs scores ---------------------------------
  function loadScores() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  }
  function bestScore(coursId) { return loadScores()[coursId] ?? null; }
  function saveBest(coursId, pct) {
    const scores = loadScores();
    if (scores[coursId] == null || pct > scores[coursId]) {
      scores[coursId] = pct;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(scores)); } catch {}
      return true; // nouveau record
    }
    return false;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ======================================================================
  //  ÉCRAN D'ACCUEIL
  // ======================================================================
  let activeFilter = "Tout";
  const FILTER_FIELD = window.FILTRE_PAR || "matiere";

  function filterValues() {
    return ["Tout", ...Array.from(new Set(COURS.map((c) => c[FILTER_FIELD])))];
  }

  function renderFilters() {
    const box = $("#filters");
    box.innerHTML = "";
    filterValues().forEach((m) => {
      const chip = el("button", "chip" + (m === activeFilter ? " is-active" : ""), m);
      chip.type = "button";
      chip.addEventListener("click", () => { activeFilter = m; renderFilters(); renderCours(); });
      box.appendChild(chip);
    });
  }

  function renderCours() {
    const list = $("#cours-list");
    list.innerHTML = "";
    const items = COURS.filter((c) => activeFilter === "Tout" || c[FILTER_FIELD] === activeFilter);

    if (!items.length) {
      list.appendChild(el("p", null, "Aucun cours ici."));
      return;
    }

    items.forEach((c) => {
      const card = el("button", "cours-card");
      card.type = "button";
      card.style.setProperty("--accent", c.couleur || "#4f46e5");

      const best = bestScore(c.id);
      const bestHtml = best != null
        ? `<span class="cours-card__best">★ ${best}%</span>`
        : "";

      card.innerHTML = `
        <span class="cours-card__emoji">${c.emoji || "📖"}</span>
        <span class="cours-card__body">
          <span class="cours-card__meta">${c.matiere} · ${c.niveau}</span>
          <span class="cours-card__title">${c.titre}</span>
          <span class="cours-card__sub">${c.questions.length} questions ${bestHtml}</span>
        </span>
        <span class="cours-card__chev">›</span>`;
      card.addEventListener("click", () => startQuiz(c));
      list.appendChild(card);
    });
  }

  // ======================================================================
  //  QUIZ
  // ======================================================================
  let game = null; // état de la partie en cours

  function startQuiz(cours) {
    game = {
      cours,
      questions: shuffle(cours.questions),
      index: 0,
      score: 0,
      answered: false,
    };
    show("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const { cours, questions, index } = game;
    const q = questions[index];
    game.answered = false;

    $("#quiz-matiere").textContent = `${cours.emoji || ""} ${cours.matiere} · ${cours.titre}`.trim();
    $("#quiz-question").textContent = q.q;
    $("#quiz-count").textContent = `${index + 1}/${questions.length}`;
    $("#progress-bar").style.width = `${(index / questions.length) * 100}%`;

    const feedback = $("#feedback");
    feedback.hidden = true;
    feedback.className = "feedback";

    const next = $("#next-btn");
    next.disabled = true;
    next.textContent = "Valider";

    const box = $("#choices");
    box.innerHTML = "";
    const letters = ["A", "B", "C", "D", "E", "F"];
    q.choix.forEach((txt, i) => {
      const btn = el("button", "choice");
      btn.type = "button";
      btn.innerHTML = `<span class="choice__letter">${letters[i]}</span><span>${txt}</span><span class="choice__mark"></span>`;
      btn.addEventListener("click", () => selectChoice(i, btn));
      box.appendChild(btn);
    });
  }

  function selectChoice(i, btn) {
    if (game.answered) return;
    game.answered = true;

    const q = game.questions[game.index];
    const choices = Array.from($("#choices").children);
    const correct = q.correct;
    const isRight = i === correct;
    if (isRight) game.score++;

    choices.forEach((c, ci) => {
      c.setAttribute("disabled", "");
      if (ci === correct) {
        c.classList.add("is-correct");
        c.querySelector(".choice__mark").textContent = "✓";
      } else if (ci === i) {
        c.classList.add("is-wrong");
        c.querySelector(".choice__mark").textContent = "✕";
      }
    });

    // retour haptique léger sur iPhone (si supporté)
    if (navigator.vibrate) navigator.vibrate(isRight ? 15 : [10, 40, 10]);

    const fb = $("#feedback");
    fb.hidden = false;
    fb.classList.add(isRight ? "good" : "bad");
    $("#feedback-title").textContent = isRight ? "Bonne réponse ✅" : "Pas tout à fait ❌";
    $("#feedback-text").textContent = q.explication || "";

    const next = $("#next-btn");
    next.disabled = false;
    next.textContent = game.index + 1 < game.questions.length ? "Question suivante" : "Voir mon score";
  }

  function nextQuestion() {
    if (!game.answered) return;
    if (game.index + 1 < game.questions.length) {
      game.index++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  // ======================================================================
  //  RÉSULTAT
  // ======================================================================
  function finishQuiz() {
    const { cours, questions, score } = game;
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const isRecord = saveBest(cours.id, pct);

    let emoji, title, msg;
    if (pct === 100) { emoji = "🏆"; title = "Parfait !"; msg = "Sans-faute, tu maîtrises ce chapitre."; }
    else if (pct >= 80) { emoji = "🎉"; title = "Excellent !"; msg = "Très bon résultat, continue comme ça."; }
    else if (pct >= 50) { emoji = "💪"; title = "Pas mal !"; msg = "Tu progresses, refais le quiz pour viser plus haut."; }
    else { emoji = "📚"; title = "À retravailler"; msg = "Relis le cours puis retente ta chance, tu vas y arriver."; }

    $("#result-emoji").textContent = emoji;
    $("#result-title").textContent = title;
    $("#result-score").textContent = score;
    $("#result-total").textContent = `/${total}`;
    $("#result-pct").textContent = `${pct} %`;
    $("#result-msg").textContent = msg;
    $("#result-best").textContent = isRecord ? "⭐ Nouveau record !" : `Meilleur score : ${bestScore(cours.id)} %`;

    show("result");
  }

  // ======================================================================
  //  ÉVÉNEMENTS GLOBAUX
  // ======================================================================
  $("#next-btn").addEventListener("click", nextQuestion);
  $("#quiz-quit").addEventListener("click", () => { goHome(); });
  $("#home-btn").addEventListener("click", goHome);
  $("#retry-btn").addEventListener("click", () => { if (game) startQuiz(game.cours); });
  $("#reset-scores").addEventListener("click", () => {
    if (confirm("Effacer tous tes scores enregistrés ?")) {
      try { localStorage.removeItem(STORE_KEY); } catch {}
      renderCours();
    }
  });

  function goHome() {
    renderFilters();
    renderCours();
    show("home");
  }

  // ======================================================================
  //  COMPTE À REBOURS BREVET (style ClicMaths)
  // ======================================================================
  function renderCountdown() {
    const box = $("#countdown");
    const iso = window.BREVET_DATE;
    if (!box || !iso) return; // masqué si pas de date
    const target = new Date(iso + "T08:00:00");
    if (isNaN(target)) return;

    const today = new Date();
    const d0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const d1 = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    const days = Math.round((d1 - d0) / 86400000);

    if (days < 0) return; // épreuve passée → on n'affiche rien

    const dateStr = target.toLocaleDateString("fr-FR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });
    $("#cd-date").textContent = dateStr;

    if (days === 0) {
      $("#cd-days").textContent = "Jour J";
      $("#cd-sub").textContent = "c'est aujourd'hui — bonne chance !";
    } else {
      $("#cd-days").textContent = "J−" + days;
      $("#cd-sub").textContent = "avant l'épreuve";
    }
    box.hidden = false;
  }

  // ======================================================================
  //  DÉMARRAGE
  // ======================================================================
  renderCountdown();
  renderFilters();
  renderCours();

  // Enregistrement du service worker (fonctionnement hors-ligne)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }
})();
