# Format « copie basique » — carrousels TikTok (maths)

Format réutilisable pour **tous les niveaux sauf la 3e** (la 3e utilise la
copie d'examen brevet, qui n'est pas dans ce dossier et qu'on ne modifie pas).

## 1. La feuille (le fond)

- **Vertical 1080 × 1920 px** (ratio 9:16, format TikTok).
- **Vrais grands carreaux Seyès** :
  - gros carreau = **56 px**, fines sous-lignes horizontales = **14 px** ;
  - **colonnes (verticales) sur toute la hauteur** ;
  - **lignes horizontales au centre seulement** → **blanc en haut (~120 px) et en bas (~130 px)**, comme une vraie feuille ;
  - **marge rouge** verticale (à 3 carreaux du bord) ;
  - **trous de classeur** dans la marge gauche.
- Police manuscrite **Caveat**.
- Couleurs : **bleu `#2342a8`** (écriture élève), **rouge `#d11f1f`** (prof / faux), **vert `#1b8a3a`** (exact / correct).

## 2. Safe zone TikTok (très important)

Zones réservées par l'interface TikTok, à laisser libres de contenu :

| Zone | Réservé |
|------|---------|
| Haut (bandeau) | 160 px |
| Bas (légende / son / nav / points) | 480 px |
| Droite (boutons like/partage) | 130 px |

- Tout le **contenu utile** reste dans le cadre central.
- Repères affichables/masquables + **bouton 📸 Mode capture** pour nettoyer l'écran avant la capture.

## 3. Structure des slides

- **Page 1 — Hook** : en-tête humoristique (Nom / Prénom / Classe, empilés), **espace commentaire** + **note /20**, gros **hook rouge** + flèche. Pas de correction sur cette page.
  - **Nom + Prénom = jeu de mots** (toujours), clin d'œil humoristique, idéalement lié au chapitre. Banque de jeux de mots prête à piocher : voir [`jeux-de-mots.md`](./jeux-de-mots.md).
- **Pages suivantes — Contenu** : **titre rouge souligné**, rédaction/étapes sur les lignes, encadré « à retenir », **figure optionnelle** (bouton afficher/masquer), **n° de page** + flèche.

## 4. Règles de rédaction maths (faire les choses bien)

- Nommer le triangle **et** l'angle droit (« ABC rectangle en B »).
- Citer le théorème (« d'après le théorème de Pythagore »).
- Écrire l'**hypoténuse au carré seule à gauche** : `AC² = AB² + BC²`.
- **Garder les valeurs exactes** (ex. `√50`) et **ne pas arrondir** trop tôt
  (montrer pourquoi : `7,07²` → 99,9698 ≠ 100, alors que `(√50)²` = 50 → 100).

## 5. Fichiers

| Fichier | Rôle |
|---------|------|
| `copie-basique.html` | Trame vierge (boutons niveau 6e/5e/4e/3e) |
| `copie-hook-pythagore.html` | Exemple de page 1 (hook) |
| `copie-page2.html` | Modèle générique de slide de contenu |
| `copie-exemple-arrondis.html` | Exemple rédigé : carré aire 50 → AC (arrondi vs exact) |
| `copie-theoreme-pythagore.html` | Slide cours : rédaction du théorème |
| `../scripts/preview-*.cjs` | Générateurs d'aperçu PNG (Node + sharp) |

## 6. Réutiliser pour une autre classe / un autre chapitre

1. Dupliquer un fichier (`copie-page2.html` pour du contenu).
2. Ouvrir dans le navigateur, **cliquer dans les champs et taper** (Classe, titre, texte, note, commentaire, n° de page).
3. **📸 Mode capture** pour masquer la barre + les repères.
4. Capture d'écran de la feuille (1080 × 1920) → import dans l'éditeur vidéo.

Le **fond (feuille Seyès + colonnes + trous + safe zone) est identique** d'un
slide à l'autre : on ne change que le contenu.
