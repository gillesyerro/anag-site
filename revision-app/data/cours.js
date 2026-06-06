/* ============================================================================
   CONTENU DES COURS DE MATHS — c'est LE fichier à modifier pour tes révisions.
   ----------------------------------------------------------------------------
   Chaque cours suit ce modèle :

   {
     id: "identifiant-unique",       // sans espaces ni accents
     matiere: "Mathématiques",       // garde "Mathématiques" (ou un thème)
     niveau: "4e",                   // classe (6e, 5e, 4e, 3e)
     titre: "Théorème de Pythagore", // titre du chapitre
     emoji: "📐",                    // une icône (facultatif)
     couleur: "#4f46e5",             // couleur de la carte (code hexadécimal)
     questions: [
       {
         q: "La question posée ?",
         choix: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
         correct: 1,                 // index de la bonne réponse (0 = A, 1 = B…)
         explication: "Pourquoi c'est ça."   // affiché après avoir répondu
       },
       // … autant de questions que tu veux
     ]
   }

   👉 Pour ajouter un chapitre : copie un bloc { … } et change le contenu.
   👉 Pour ajouter une question : copie un bloc { q, choix, correct, explication }.
   ----------------------------------------------------------------------------
   Le filtre du haut de l'app trie par "niveau" (la classe) grâce à FILTRE_PAR
   plus bas. Tu peux donc filtrer par 6e / 5e / 4e / 3e.
   ============================================================================ */

const COURS = [
  /* ============================== 6e ============================== */
  {
    id: "fractions-6e",
    matiere: "Mathématiques",
    niveau: "6e",
    titre: "Les fractions",
    emoji: "🍕",
    couleur: "#4f46e5",
    questions: [
      {
        q: "Quelle fraction représente la moitié d'un objet ?",
        choix: ["1/2", "1/3", "2/3", "1/4"],
        correct: 0,
        explication: "La moitié, c'est une part sur deux : 1/2."
      },
      {
        q: "Simplifie la fraction 6/8.",
        choix: ["3/4", "2/4", "6/8", "4/6"],
        correct: 0,
        explication: "On divise le numérateur et le dénominateur par 2 : 6/8 = 3/4."
      },
      {
        q: "Combien font 3/5 + 1/5 ?",
        choix: ["4/5", "4/10", "3/25", "2/5"],
        correct: 0,
        explication: "Même dénominateur : on additionne les numérateurs, 3 + 1 = 4, soit 4/5."
      },
      {
        q: "Quelle fraction est égale à 1 (un entier) ?",
        choix: ["8/8", "3/4", "5/2", "1/3"],
        correct: 0,
        explication: "Quand le numérateur égale le dénominateur, la fraction vaut 1 : 8/8 = 1."
      },
      {
        q: "Quelle fraction est la plus grande : 1/2 ou 1/3 ?",
        choix: ["1/2", "1/3", "Elles sont égales", "On ne peut pas savoir"],
        correct: 0,
        explication: "Plus le dénominateur est grand, plus les parts sont petites : 1/2 > 1/3."
      },
      {
        q: "Écris 7/10 sous forme décimale.",
        choix: ["0,7", "7", "0,07", "1,7"],
        correct: 0,
        explication: "7/10 signifie 7 dixièmes, soit 0,7."
      }
    ]
  },

  /* ============================== 5e ============================== */
  {
    id: "relatifs-5e",
    matiere: "Mathématiques",
    niveau: "5e",
    titre: "Les nombres relatifs",
    emoji: "➖",
    couleur: "#0891b2",
    questions: [
      {
        q: "Combien font (−3) + (−5) ?",
        choix: ["−8", "8", "−2", "2"],
        correct: 0,
        explication: "Mêmes signes : on additionne (3 + 5 = 8) et on garde le signe −, soit −8."
      },
      {
        q: "Combien font (+7) + (−4) ?",
        choix: ["+3", "−3", "+11", "−11"],
        correct: 0,
        explication: "Signes différents : on soustrait (7 − 4 = 3) et on garde le signe du plus grand : +3."
      },
      {
        q: "Combien font (−9) + (+2) ?",
        choix: ["−7", "+7", "−11", "+11"],
        correct: 0,
        explication: "9 − 2 = 7, et le plus grand en distance est −9, donc le résultat est −7."
      },
      {
        q: "Quel est l'opposé de −6 ?",
        choix: ["6", "−6", "0", "1/6"],
        correct: 0,
        explication: "L'opposé d'un nombre a le signe contraire : l'opposé de −6 est +6."
      },
      {
        q: "Combien font (−4) − (−7) ?",
        choix: ["+3", "−3", "−11", "+11"],
        correct: 0,
        explication: "Soustraire un nombre, c'est ajouter son opposé : −4 + 7 = +3."
      },
      {
        q: "Quelle somme est égale à 0 ?",
        choix: ["(−5) + (+5)", "(−5) + (−5)", "(+5) + (+5)", "(−5) + (+2)"],
        correct: 0,
        explication: "Un nombre plus son opposé donne toujours 0 : (−5) + (+5) = 0."
      }
    ]
  },

  {
    id: "priorites-5e",
    matiere: "Mathématiques",
    niveau: "5e",
    titre: "Priorités opératoires",
    emoji: "🧮",
    couleur: "#db2777",
    questions: [
      {
        q: "Combien font 3 + 4 × 2 ?",
        choix: ["11", "14", "10", "24"],
        correct: 0,
        explication: "La multiplication est prioritaire : 4 × 2 = 8, puis 3 + 8 = 11."
      },
      {
        q: "Combien font (3 + 4) × 2 ?",
        choix: ["14", "11", "10", "24"],
        correct: 0,
        explication: "Les parenthèses d'abord : 3 + 4 = 7, puis 7 × 2 = 14."
      },
      {
        q: "Combien font 10 − 2 × 3 ?",
        choix: ["4", "24", "8", "6"],
        correct: 0,
        explication: "La multiplication d'abord : 2 × 3 = 6, puis 10 − 6 = 4."
      },
      {
        q: "Combien font 12 ÷ 4 + 2 ?",
        choix: ["5", "2", "8", "3"],
        correct: 0,
        explication: "La division d'abord : 12 ÷ 4 = 3, puis 3 + 2 = 5."
      },
      {
        q: "Combien font 2 × 5 − 3 × 2 ?",
        choix: ["4", "14", "10", "7"],
        correct: 0,
        explication: "Les deux multiplications d'abord : 10 − 6 = 4."
      },
      {
        q: "Dans 5 + 6 × 2, quelle opération fait-on en premier ?",
        choix: ["La multiplication", "L'addition", "De gauche à droite", "Peu importe"],
        correct: 0,
        explication: "Sans parenthèses, × et ÷ passent avant + et −."
      }
    ]
  },

  /* ============================== 4e ============================== */
  {
    id: "proportionnalite-4e",
    matiere: "Mathématiques",
    niveau: "4e",
    titre: "Proportionnalité & pourcentages",
    emoji: "📊",
    couleur: "#16a34a",
    questions: [
      {
        q: "Combien font 25 % de 80 ?",
        choix: ["20", "25", "40", "55"],
        correct: 0,
        explication: "25 % = 0,25, et 80 × 0,25 = 20 (c'est aussi le quart de 80)."
      },
      {
        q: "Un article à 50 € augmente de 10 %. Quel est le nouveau prix ?",
        choix: ["55 €", "60 €", "40 €", "51 €"],
        correct: 0,
        explication: "10 % de 50 = 5, donc 50 + 5 = 55 €."
      },
      {
        q: "Combien font 10 % de 200 ?",
        choix: ["20", "2", "10", "100"],
        correct: 0,
        explication: "10 %, c'est diviser par 10 : 200 ÷ 10 = 20."
      },
      {
        q: "Dans un tableau de proportionnalité, on passe de 4 à 12. Quel est le coefficient ?",
        choix: ["3", "8", "48", "2"],
        correct: 0,
        explication: "Le coefficient se trouve en divisant : 12 ÷ 4 = 3."
      },
      {
        q: "3 stylos coûtent 6 €. Combien coûtent 5 stylos (au même prix) ?",
        choix: ["10 €", "11 €", "9 €", "30 €"],
        correct: 0,
        explication: "1 stylo coûte 6 ÷ 3 = 2 €, donc 5 × 2 = 10 €."
      },
      {
        q: "Prendre 50 % d'un nombre, c'est en prendre… ?",
        choix: ["La moitié", "Le double", "Le quart", "Le nombre entier"],
        correct: 0,
        explication: "50 % = 1/2, donc c'est la moitié du nombre."
      }
    ]
  },

  {
    id: "pythagore-4e",
    matiere: "Mathématiques",
    niveau: "4e",
    titre: "Théorème de Pythagore",
    emoji: "📐",
    couleur: "#4338ca",
    questions: [
      {
        q: "Le théorème de Pythagore s'applique uniquement dans quel type de triangle ?",
        choix: ["Triangle rectangle", "Triangle équilatéral", "Triangle isocèle", "N'importe quel triangle"],
        correct: 0,
        explication: "Pythagore ne fonctionne que dans un triangle RECTANGLE (qui a un angle droit)."
      },
      {
        q: "Dans un triangle rectangle, comment s'appelle le côté le plus long ?",
        choix: ["L'hypoténuse", "La base", "Un côté de l'angle droit", "La médiane"],
        correct: 0,
        explication: "L'hypoténuse est le côté opposé à l'angle droit, toujours le plus long."
      },
      {
        q: "ABC est rectangle en A. Quelle égalité est correcte ?",
        choix: ["BC² = AB² + AC²", "AB² = AC² + BC²", "AC² = AB² + BC²", "BC = AB + AC"],
        correct: 0,
        explication: "L'angle droit est en A, donc l'hypoténuse est BC : BC² = AB² + AC²."
      },
      {
        q: "Les côtés de l'angle droit mesurent 3 cm et 4 cm. Combien mesure l'hypoténuse ?",
        choix: ["5 cm", "7 cm", "12 cm", "25 cm"],
        correct: 0,
        explication: "3² + 4² = 9 + 16 = 25, et √25 = 5 cm."
      },
      {
        q: "À quoi sert la réciproque du théorème de Pythagore ?",
        choix: ["À prouver qu'un triangle est rectangle", "À calculer une aire", "À mesurer un angle", "À tracer un cercle"],
        correct: 0,
        explication: "La réciproque permet de démontrer qu'un triangle EST rectangle."
      },
      {
        q: "Un triangle a des côtés de 6, 8 et 10 cm. Que peut-on dire ?",
        choix: ["Il est rectangle", "Il est équilatéral", "Il est impossible", "Il est isocèle"],
        correct: 0,
        explication: "6² + 8² = 36 + 64 = 100 = 10² : d'après la réciproque, il est rectangle."
      }
    ]
  },

  {
    id: "calcul-litteral-4e",
    matiere: "Mathématiques",
    niveau: "4e",
    titre: "Calcul littéral & développement",
    emoji: "✖️",
    couleur: "#7c3aed",
    questions: [
      {
        q: "Développe 3(x + 2).",
        choix: ["3x + 6", "3x + 2", "x + 6", "3x × 6"],
        correct: 0,
        explication: "On multiplie 3 par chaque terme : 3 × x + 3 × 2 = 3x + 6."
      },
      {
        q: "Réduis l'expression 2x + 5x.",
        choix: ["7x", "10x", "7", "2x5"],
        correct: 0,
        explication: "On additionne les termes en x : 2x + 5x = 7x."
      },
      {
        q: "Développe 2(x − 4).",
        choix: ["2x − 8", "2x − 4", "2x + 8", "x − 8"],
        correct: 0,
        explication: "2 × x − 2 × 4 = 2x − 8."
      },
      {
        q: "Combien vaut 3x + 2 pour x = 5 ?",
        choix: ["17", "15", "10", "25"],
        correct: 0,
        explication: "On remplace x par 5 : 3 × 5 + 2 = 15 + 2 = 17."
      },
      {
        q: "Réduis 4x + 3 − x + 2.",
        choix: ["3x + 5", "5x + 5", "3x + 1", "4x + 5"],
        correct: 0,
        explication: "Termes en x : 4x − x = 3x ; nombres : 3 + 2 = 5. Donc 3x + 5."
      },
      {
        q: "Développe x(x + 3).",
        choix: ["x² + 3x", "x + 3x", "x² + 3", "2x + 3"],
        correct: 0,
        explication: "x × x + x × 3 = x² + 3x."
      }
    ]
  },

  {
    id: "puissances-4e",
    matiere: "Mathématiques",
    niveau: "4e",
    titre: "Les puissances",
    emoji: "🔢",
    couleur: "#ea580c",
    questions: [
      {
        q: "Combien vaut 2³ ?",
        choix: ["8", "6", "9", "23"],
        correct: 0,
        explication: "2³ = 2 × 2 × 2 = 8."
      },
      {
        q: "Combien vaut 5² ?",
        choix: ["25", "10", "7", "52"],
        correct: 0,
        explication: "5² = 5 × 5 = 25."
      },
      {
        q: "Combien vaut 10⁴ ?",
        choix: ["10 000", "1 000", "40", "100"],
        correct: 0,
        explication: "10⁴ = 1 suivi de 4 zéros = 10 000."
      },
      {
        q: "Combien vaut 2⁰ ?",
        choix: ["1", "0", "2", "20"],
        correct: 0,
        explication: "Tout nombre non nul élevé à la puissance 0 vaut 1."
      },
      {
        q: "Combien vaut 3² × 3³ ?",
        choix: ["3⁵", "3⁶", "9⁵", "3"],
        correct: 0,
        explication: "Même base : on additionne les exposants, 2 + 3 = 5, donc 3⁵."
      },
      {
        q: "Combien vaut 10⁻² ?",
        choix: ["0,01", "−100", "−20", "0,1"],
        correct: 0,
        explication: "10⁻² = 1 / 10² = 1 / 100 = 0,01."
      }
    ]
  },

  {
    id: "equations-4e",
    matiere: "Mathématiques",
    niveau: "4e",
    titre: "Les équations",
    emoji: "⚖️",
    couleur: "#0d9488",
    questions: [
      {
        q: "Résous x + 5 = 12.",
        choix: ["x = 7", "x = 17", "x = 5", "x = 12"],
        correct: 0,
        explication: "On enlève 5 des deux côtés : x = 12 − 5 = 7."
      },
      {
        q: "Résous 3x = 15.",
        choix: ["x = 5", "x = 45", "x = 12", "x = 18"],
        correct: 0,
        explication: "On divise par 3 : x = 15 ÷ 3 = 5."
      },
      {
        q: "Résous 2x − 4 = 10.",
        choix: ["x = 7", "x = 3", "x = 5", "x = 14"],
        correct: 0,
        explication: "2x = 10 + 4 = 14, puis x = 14 ÷ 2 = 7."
      },
      {
        q: "Résous x/2 = 6.",
        choix: ["x = 12", "x = 3", "x = 6", "x = 8"],
        correct: 0,
        explication: "On multiplie par 2 : x = 6 × 2 = 12."
      },
      {
        q: "Pour résoudre x + 7 = 10, que fait-on en premier ?",
        choix: ["On soustrait 7 des deux côtés", "On ajoute 7", "On multiplie par 7", "On divise par 10"],
        correct: 0,
        explication: "On isole x en enlevant 7 des deux côtés : x = 10 − 7 = 3."
      },
      {
        q: "Résous 5x + 2 = 2x + 11.",
        choix: ["x = 3", "x = 9", "x = 13", "x = 1"],
        correct: 0,
        explication: "5x − 2x = 11 − 2 → 3x = 9 → x = 3."
      }
    ]
  },

  /* ============================== 3e ============================== */
  {
    id: "thales-3e",
    matiere: "Mathématiques",
    niveau: "3e",
    titre: "Théorème de Thalès",
    emoji: "📏",
    couleur: "#2563eb",
    questions: [
      {
        q: "Le théorème de Thalès met en jeu surtout… ?",
        choix: ["Des droites parallèles", "Un angle droit", "Un cercle", "Des triangles isocèles"],
        correct: 0,
        explication: "Thalès s'utilise dans une configuration avec des droites parallèles."
      },
      {
        q: "Le théorème de Thalès permet de calculer… ?",
        choix: ["Des longueurs", "Des aires", "Des angles", "Des volumes"],
        correct: 0,
        explication: "Grâce à une égalité de rapports, Thalès donne des longueurs manquantes."
      },
      {
        q: "À quoi sert la réciproque du théorème de Thalès ?",
        choix: ["À prouver que deux droites sont parallèles", "À calculer un angle", "À tracer un cercle", "À mesurer une aire"],
        correct: 0,
        explication: "La réciproque sert à démontrer que deux droites sont parallèles."
      },
      {
        q: "Dans le théorème de Thalès, on écrit une égalité de… ?",
        choix: ["Quotients (rapports)", "Sommes", "Produits", "Différences"],
        correct: 0,
        explication: "Thalès donne une égalité de trois quotients (rapports de longueurs)."
      },
      {
        q: "Si les rapports calculés ne sont pas égaux, les droites sont… ?",
        choix: ["Non parallèles", "Parallèles", "Perpendiculaires", "Confondues"],
        correct: 0,
        explication: "Rapports différents → d'après la réciproque, les droites ne sont pas parallèles."
      },
      {
        q: "Avec Thalès, si AM/AB = 2/3, alors AN/AC vaut… ?",
        choix: ["2/3", "3/2", "1", "2"],
        correct: 0,
        explication: "Tous les rapports de Thalès sont égaux, donc AN/AC = 2/3 aussi."
      }
    ]
  },

  {
    id: "trigonometrie-3e",
    matiere: "Mathématiques",
    niveau: "3e",
    titre: "Trigonométrie",
    emoji: "📐",
    couleur: "#be123c",
    questions: [
      {
        q: "Dans un triangle rectangle, cosinus = côté adjacent / … ?",
        choix: ["Hypoténuse", "Côté opposé", "Périmètre", "Angle"],
        correct: 0,
        explication: "cos = adjacent / hypoténuse (le « CAH » de SOH-CAH-TOA)."
      },
      {
        q: "Sinus = côté opposé / … ?",
        choix: ["Hypoténuse", "Côté adjacent", "Côté opposé", "2"],
        correct: 0,
        explication: "sin = opposé / hypoténuse (le « SOH » de SOH-CAH-TOA)."
      },
      {
        q: "Tangente = côté opposé / … ?",
        choix: ["Côté adjacent", "Hypoténuse", "Côté opposé", "2"],
        correct: 0,
        explication: "tan = opposé / adjacent (le « TOA » de SOH-CAH-TOA)."
      },
      {
        q: "Dans SOH-CAH-TOA, le bloc « CAH » correspond à… ?",
        choix: ["cos = Adjacent / Hypoténuse", "cos = Opposé / Hypoténuse", "sin = Adjacent / Hypoténuse", "tan = Adjacent / Hypoténuse"],
        correct: 0,
        explication: "C-A-H : Cosinus = Adjacent / Hypoténuse."
      },
      {
        q: "cos(60°) vaut environ… ?",
        choix: ["0,5", "1", "0", "2"],
        correct: 0,
        explication: "cos(60°) = 0,5 exactement."
      },
      {
        q: "La trigonométrie (sin, cos, tan) s'utilise dans un triangle… ?",
        choix: ["Rectangle", "Équilatéral", "Quelconque", "Isocèle"],
        correct: 0,
        explication: "Ces formules ne valent que dans un triangle rectangle."
      }
    ]
  },

  {
    id: "identites-3e",
    matiere: "Mathématiques",
    niveau: "3e",
    titre: "Identités remarquables & factorisation",
    emoji: "🟰",
    couleur: "#9333ea",
    questions: [
      {
        q: "(a + b)² = … ?",
        choix: ["a² + 2ab + b²", "a² + b²", "a² − 2ab + b²", "2a + 2b"],
        correct: 0,
        explication: "(a + b)² = a² + 2ab + b² (carré du premier + double produit + carré du second)."
      },
      {
        q: "(a − b)² = … ?",
        choix: ["a² − 2ab + b²", "a² − b²", "a² + 2ab + b²", "a² + b²"],
        correct: 0,
        explication: "(a − b)² = a² − 2ab + b²."
      },
      {
        q: "(a + b)(a − b) = … ?",
        choix: ["a² − b²", "a² + b²", "a² − 2ab + b²", "2a − 2b"],
        correct: 0,
        explication: "C'est l'identité (a + b)(a − b) = a² − b²."
      },
      {
        q: "Factorise x² − 9.",
        choix: ["(x − 3)(x + 3)", "(x − 9)(x + 1)", "(x − 3)²", "x(x − 9)"],
        correct: 0,
        explication: "x² − 9 = x² − 3² = (x − 3)(x + 3)."
      },
      {
        q: "Développe (x + 5)².",
        choix: ["x² + 10x + 25", "x² + 25", "x² + 5x + 25", "x² + 10x + 5"],
        correct: 0,
        explication: "(x + 5)² = x² + 2 × x × 5 + 5² = x² + 10x + 25."
      },
      {
        q: "Factorise 4x + 8.",
        choix: ["4(x + 2)", "4(x + 8)", "x(4 + 8)", "4x + 8"],
        correct: 0,
        explication: "On met 4 en facteur commun : 4x + 8 = 4(x + 2)."
      }
    ]
  },

  {
    id: "fonctions-3e",
    matiere: "Mathématiques",
    niveau: "3e",
    titre: "Fonctions linéaires & affines",
    emoji: "📈",
    couleur: "#c026d3",
    questions: [
      {
        q: "Une fonction linéaire a pour forme… ?",
        choix: ["f(x) = ax", "f(x) = ax + b", "f(x) = x²", "f(x) = b"],
        correct: 0,
        explication: "Une fonction linéaire s'écrit f(x) = ax (passe par l'origine)."
      },
      {
        q: "Une fonction affine a pour forme… ?",
        choix: ["f(x) = ax + b", "f(x) = ax", "f(x) = x²", "f(x) = a"],
        correct: 0,
        explication: "Une fonction affine s'écrit f(x) = ax + b."
      },
      {
        q: "La représentation graphique d'une fonction affine est… ?",
        choix: ["Une droite", "Une parabole", "Un cercle", "Une courbe quelconque"],
        correct: 0,
        explication: "Toute fonction affine est représentée par une droite."
      },
      {
        q: "Dans f(x) = 2x + 3, quel est le coefficient directeur ?",
        choix: ["2", "3", "5", "0"],
        correct: 0,
        explication: "Le coefficient directeur est le nombre devant x, donc 2."
      },
      {
        q: "Dans f(x) = 2x + 3, quelle est l'ordonnée à l'origine ?",
        choix: ["3", "2", "0", "5"],
        correct: 0,
        explication: "L'ordonnée à l'origine est le « + b », ici 3 (valeur en x = 0)."
      },
      {
        q: "Si f(x) = 4x, combien vaut f(3) ?",
        choix: ["12", "7", "43", "4"],
        correct: 0,
        explication: "On remplace x par 3 : f(3) = 4 × 3 = 12."
      }
    ]
  }
];

/* Critère utilisé par les boutons de filtre en haut de l'app.
   "niveau" → on filtre par classe (6e, 5e, 4e, 3e). Mets "matiere" pour
   filtrer par matière à la place. */
const FILTRE_PAR = "niveau";

// Rend les données accessibles à l'application.
if (typeof window !== "undefined") {
  window.COURS = COURS;
  window.FILTRE_PAR = FILTRE_PAR;
}
