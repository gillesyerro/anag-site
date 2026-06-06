# 📘 Révise — application iPhone de révision (quiz)

Petite application web **installable sur iPhone** (PWA) pour réviser les cours du
collège sous forme de **quiz à choix multiples** : on choisit un cours, on répond
aux questions, on a la correction immédiate et un score à la fin. Les meilleurs
scores sont enregistrés sur l'appareil.

C'est une app **autonome** (aucun lien avec le reste du site) : tout tient dans le
dossier `revision-app/`, sans serveur ni build.

---

## 📱 L'installer sur l'iPhone

1. Mets les fichiers en ligne (voir « Mettre en ligne » plus bas) ou ouvre-la via
   un lien `https://…`.
2. Ouvre l'adresse dans **Safari** sur l'iPhone.
3. Touche le bouton **Partager** (carré avec une flèche) → **« Sur l'écran d'accueil »**.
4. L'app apparaît comme une vraie application (plein écran, icône, hors-ligne).

> ℹ️ L'installation et le mode hors-ligne nécessitent une adresse en `https://`
> (ou `http://localhost` pour les tests). En ouvrant le fichier directement
> (`file://`), le quiz fonctionne mais pas l'installation.

---

## ✏️ Modifier / ajouter des cours

Tout le contenu est dans **un seul fichier** :

```
revision-app/data/cours.js
```

Chaque cours ressemble à ceci :

```js
{
  id: "maths-pythagore",            // identifiant unique (sans espaces/accents)
  matiere: "Mathématiques",
  niveau: "4e",
  titre: "Théorème de Pythagore",
  emoji: "📐",
  couleur: "#4f46e5",               // couleur de la carte
  questions: [
    {
      q: "La question ?",
      choix: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
      correct: 1,                   // index de la bonne réponse (0 = A, 1 = B…)
      explication: "Pourquoi c'est ça."
    }
    // … autant de questions que tu veux
  ]
}
```

- **Ajouter une question** : copie un bloc `{ q, choix, correct, explication }`.
- **Ajouter un cours** : copie un bloc `{ … }` complet et change l'`id`.
- Les questions sont **mélangées** à chaque partie.

Après modification, pense à incrémenter `CACHE_VERSION` dans
`service-worker.js` pour que la nouvelle version se charge sur les appareils
déjà installés.

---

## 🧪 Tester en local

Depuis le dossier `revision-app/` :

```bash
python3 -m http.server 8080
# puis ouvre http://localhost:8080 dans le navigateur
```

(ou n'importe quel serveur statique).

---

## 🌐 Mettre en ligne

C'est du **statique** : copie le dossier `revision-app/` sur n'importe quel
hébergement (Netlify, GitHub Pages, Vercel, un sous-dossier de ton site…).
L'app sera accessible à l'URL correspondante.

---

## 🛠️ Régénérer les icônes

Les icônes sont générées par un script Node (sans dépendance) :

```bash
node revision-app/icons/generate-icons.mjs
```

## 📂 Structure

```
revision-app/
├── index.html              # page unique de l'app
├── css/styles.css          # styles (optimisés iPhone)
├── js/app.js               # logique du quiz
├── data/cours.js           # ← LE contenu des cours (à éditer)
├── manifest.webmanifest    # configuration PWA
├── service-worker.js       # cache hors-ligne
└── icons/                  # icônes + générateur
```
