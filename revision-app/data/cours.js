/* ============================================================================
   CONTENU DES COURS — c'est LE fichier à modifier pour tes révisions.
   ----------------------------------------------------------------------------
   Chaque cours suit ce modèle :

   {
     id: "identifiant-unique",       // sans espaces ni accents
     matiere: "Mathématiques",       // nom de la matière
     niveau: "4e",                   // classe (6e, 5e, 4e, 3e…)
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

   👉 Pour ajouter un cours : copie un bloc { … } et change le contenu.
   👉 Pour ajouter une question : copie un bloc { q, choix, correct, explication }.
   ============================================================================ */

const COURS = [
  {
    id: "maths-pythagore",
    matiere: "Mathématiques",
    niveau: "4e",
    titre: "Théorème de Pythagore",
    emoji: "📐",
    couleur: "#4f46e5",
    questions: [
      {
        q: "Le théorème de Pythagore s'applique uniquement dans quel type de triangle ?",
        choix: ["Triangle équilatéral", "Triangle rectangle", "Triangle isocèle", "N'importe quel triangle"],
        correct: 1,
        explication: "Pythagore ne fonctionne que dans un triangle RECTANGLE (qui a un angle droit)."
      },
      {
        q: "Dans un triangle rectangle, comment s'appelle le côté le plus long ?",
        choix: ["La base", "Un côté de l'angle droit", "L'hypoténuse", "La médiane"],
        correct: 2,
        explication: "L'hypoténuse est le côté opposé à l'angle droit, c'est toujours le plus long."
      },
      {
        q: "Un triangle ABC est rectangle en A. Quelle égalité est correcte ?",
        choix: ["AB² = AC² + BC²", "BC² = AB² + AC²", "AC² = AB² + BC²", "BC = AB + AC"],
        correct: 1,
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
        choix: ["À calculer une aire", "À prouver qu'un triangle est rectangle", "À mesurer un angle", "À tracer un cercle"],
        correct: 1,
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
    id: "francais-conjugaison",
    matiere: "Français",
    niveau: "5e",
    titre: "Les temps de l'indicatif",
    emoji: "✍️",
    couleur: "#db2777",
    questions: [
      {
        q: "« Je mangeais » est conjugué à quel temps ?",
        choix: ["Présent", "Imparfait", "Passé simple", "Futur"],
        correct: 1,
        explication: "La terminaison -ais est caractéristique de l'imparfait."
      },
      {
        q: "Quel temps utilise-t-on surtout pour une action courte et soudaine dans un récit ?",
        choix: ["L'imparfait", "Le présent", "Le passé simple", "Le conditionnel"],
        correct: 2,
        explication: "Le passé simple exprime une action brève de premier plan dans un récit."
      },
      {
        q: "Conjugue « finir » au futur, 3e personne du singulier :",
        choix: ["il finit", "il finissait", "il finira", "il finirait"],
        correct: 2,
        explication: "Au futur : il finira (radical de l'infinitif + terminaison -a)."
      },
      {
        q: "Dans « Quand il arriva, elle dormait », quel verbe est à l'imparfait ?",
        choix: ["arriva", "dormait", "les deux", "aucun"],
        correct: 1,
        explication: "« dormait » est à l'imparfait (action d'arrière-plan) ; « arriva » au passé simple."
      },
      {
        q: "« Nous aurons terminé » est conjugué au :",
        choix: ["Futur simple", "Futur antérieur", "Plus-que-parfait", "Passé composé"],
        correct: 1,
        explication: "Auxiliaire au futur (aurons) + participe passé = futur antérieur."
      },
      {
        q: "Quelle phrase est au présent de l'indicatif ?",
        choix: ["Il chantera demain", "Il chantait souvent", "Il chante maintenant", "Il a chanté hier"],
        correct: 2,
        explication: "« Il chante maintenant » exprime une action en cours : présent."
      }
    ]
  },

  {
    id: "histoire-revolution",
    matiere: "Histoire",
    niveau: "4e",
    titre: "La Révolution française",
    emoji: "🏛️",
    couleur: "#dc2626",
    questions: [
      {
        q: "En quelle année débute la Révolution française ?",
        choix: ["1715", "1789", "1804", "1848"],
        correct: 1,
        explication: "La Révolution commence en 1789 (prise de la Bastille le 14 juillet)."
      },
      {
        q: "Quel événement du 14 juillet 1789 est devenu un symbole ?",
        choix: ["Le sacre de Napoléon", "La prise de la Bastille", "La fête de la Fédération", "La nuit du 4 août"],
        correct: 1,
        explication: "La prise de la Bastille, prison royale, symbolise la fin de l'absolutisme."
      },
      {
        q: "Quel texte fondamental est adopté en août 1789 ?",
        choix: ["La Constitution de 1791", "Le Code civil", "La Déclaration des droits de l'homme et du citoyen", "L'Édit de Nantes"],
        correct: 2,
        explication: "La Déclaration des droits de l'homme et du citoyen proclame liberté et égalité."
      },
      {
        q: "Sous l'Ancien Régime, la société était divisée en trois :",
        choix: ["Riches, pauvres, esclaves", "Clergé, noblesse, tiers état", "Roi, ministres, paysans", "Nord, centre, sud"],
        correct: 1,
        explication: "Les trois ordres étaient le clergé, la noblesse et le tiers état."
      },
      {
        q: "En 1792, quel régime politique est proclamé en France ?",
        choix: ["L'Empire", "La République", "La Monarchie absolue", "Le Consulat"],
        correct: 1,
        explication: "La Ire République est proclamée le 22 septembre 1792."
      },
      {
        q: "Quelle est la devise issue de la Révolution, encore utilisée aujourd'hui ?",
        choix: ["Travail, Famille, Patrie", "Liberté, Égalité, Fraternité", "Honneur et Patrie", "Un pour tous, tous pour un"],
        correct: 1,
        explication: "« Liberté, Égalité, Fraternité » est la devise de la République française."
      }
    ]
  },

  {
    id: "svt-digestion",
    matiere: "SVT",
    niveau: "5e",
    titre: "La digestion",
    emoji: "🫀",
    couleur: "#16a34a",
    questions: [
      {
        q: "Où commence la digestion des aliments ?",
        choix: ["Dans l'estomac", "Dans la bouche", "Dans l'intestin", "Dans le foie"],
        correct: 1,
        explication: "La digestion commence dans la bouche (mastication + salive)."
      },
      {
        q: "Comment s'appelle la transformation des gros aliments en petites molécules ?",
        choix: ["La respiration", "La digestion", "La circulation", "L'excrétion"],
        correct: 1,
        explication: "La digestion transforme les aliments en nutriments assimilables."
      },
      {
        q: "Quelles substances réalisent la digestion chimique ?",
        choix: ["Les enzymes", "Les vitamines", "Les muscles", "Les nerfs"],
        correct: 0,
        explication: "Les enzymes digestives découpent les aliments en nutriments."
      },
      {
        q: "Où la majorité des nutriments passent-ils dans le sang ?",
        choix: ["L'estomac", "Le gros intestin", "L'intestin grêle", "L'œsophage"],
        correct: 2,
        explication: "L'absorption se fait surtout dans l'intestin grêle, à travers ses villosités."
      },
      {
        q: "Comment appelle-t-on le passage des nutriments vers le sang ?",
        choix: ["La digestion", "L'absorption intestinale", "La mastication", "La respiration"],
        correct: 1,
        explication: "L'absorption intestinale fait passer les nutriments dans le sang."
      },
      {
        q: "Quel organe N'EST PAS un organe du tube digestif traversé par les aliments ?",
        choix: ["L'estomac", "Le foie", "L'œsophage", "L'intestin grêle"],
        correct: 1,
        explication: "Le foie est une glande annexe : les aliments ne le traversent pas."
      }
    ]
  },

  {
    id: "physique-matiere",
    matiere: "Physique-Chimie",
    niveau: "5e",
    titre: "Les états de la matière",
    emoji: "🧪",
    couleur: "#0891b2",
    questions: [
      {
        q: "Quels sont les trois états physiques de la matière ?",
        choix: ["Chaud, froid, tiède", "Solide, liquide, gaz", "Dur, mou, dense", "Petit, moyen, grand"],
        correct: 1,
        explication: "Les trois états sont solide, liquide et gazeux."
      },
      {
        q: "Comment s'appelle le passage de l'état liquide à l'état gazeux ?",
        choix: ["La solidification", "La fusion", "La vaporisation", "La condensation"],
        correct: 2,
        explication: "Liquide → gaz : c'est la vaporisation (ébullition ou évaporation)."
      },
      {
        q: "Le passage de l'eau liquide à la glace s'appelle :",
        choix: ["La fusion", "La solidification", "La vaporisation", "La sublimation"],
        correct: 1,
        explication: "Liquide → solide : c'est la solidification."
      },
      {
        q: "À quelle température l'eau pure bout-elle (au niveau de la mer) ?",
        choix: ["0 °C", "37 °C", "100 °C", "212 °C"],
        correct: 2,
        explication: "L'eau pure bout à 100 °C sous la pression atmosphérique normale."
      },
      {
        q: "Lors d'un changement d'état, la masse de la substance :",
        choix: ["Augmente", "Diminue", "Se conserve (reste la même)", "Devient nulle"],
        correct: 2,
        explication: "La masse se conserve lors d'un changement d'état."
      },
      {
        q: "Dans quel état la matière a-t-elle une forme propre ?",
        choix: ["Solide", "Liquide", "Gazeux", "Aucun"],
        correct: 0,
        explication: "Le solide a une forme propre ; liquides et gaz prennent la forme du récipient."
      }
    ]
  },

  {
    id: "anglais-present-simple",
    matiere: "Anglais",
    niveau: "6e",
    titre: "Present simple",
    emoji: "🇬🇧",
    couleur: "#2563eb",
    questions: [
      {
        q: "Complète : « She ___ to school every day. »",
        choix: ["go", "goes", "going", "gone"],
        correct: 1,
        explication: "À la 3e personne du singulier (she/he/it), on ajoute -s/-es : she goes."
      },
      {
        q: "Quelle est la forme négative correcte ?",
        choix: ["I not like fish", "I don't like fish", "I doesn't like fish", "I am not like fish"],
        correct: 1,
        explication: "À la négation on utilise don't (I/you/we/they) : I don't like fish."
      },
      {
        q: "Comment pose-t-on la question « Est-ce qu'il joue au foot ? »",
        choix: ["Does he play football?", "Do he play football?", "He plays football?", "Is he play football?"],
        correct: 0,
        explication: "Avec he/she/it on utilise l'auxiliaire « does » : Does he play football?"
      },
      {
        q: "Le present simple sert surtout à exprimer :",
        choix: ["Une action en train de se faire", "Une habitude ou une vérité générale", "Le passé", "Le futur lointain"],
        correct: 1,
        explication: "Le present simple décrit des habitudes ou des vérités générales."
      },
      {
        q: "Quel mot est un marqueur de temps typique du present simple ?",
        choix: ["now", "usually", "yesterday", "tomorrow"],
        correct: 1,
        explication: "« usually » (d'habitude) accompagne souvent le present simple."
      },
      {
        q: "Choisis la phrase correcte :",
        choix: ["He watch TV", "He watches TV", "He watch's TV", "He watching TV"],
        correct: 1,
        explication: "Verbe en -ch → on ajoute -es à la 3e personne : he watches."
      }
    ]
  }
];

// Rend la liste accessible à l'application.
if (typeof window !== "undefined") window.COURS = COURS;
