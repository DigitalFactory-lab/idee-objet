# De l’idée à l’objet — Digital Factory

Copie indépendante de l’atelier Impression3D. Identité : Poppins, #2f3a48, #5b60a8, #8c4292.

Page 04 : choix libre d’un objet obligatoirement pratique ; trois exemples illustratifs, questions de conception et fiche de choix. Aucun modèle imposé.

Le reste du parcours reprend la base existante et pourra être adapté lors des prochaines étapes. Les repères de durée du guide sont ceux de cette base.

Site statique : publier la branche main à la racine avec GitHub Pages. Les choix sont conservés uniquement dans la session du navigateur.

Les trois nouveaux visuels ont été générés à partir des références fournies : photographie produit cohérente, fond clair, détails d’impression visibles et couleurs DF.

## Partie 2 · Découpe laser & impression UV

`partie2.html` + `partie2.js` (même charte, même mécanique de navigation, chrono et guide animateur ; état séparé en session). L’écran d’accueil de `index.html` propose le choix Partie 1 / Partie 2.

7 écrans sur 2 h : usages métiers (cas réels Trotec), deux machines (jeu « Laquelle ? »), laser pas à pas (calques du fichier, simulateur puissance/vitesse), UV pas à pas (résolution, support, couche de blanc, séchage), matières, exercice final, bilan.

Exercice final : renseigner `APP_URL` en haut de `partie2.js` quand l’appli de création sera publiée. Tant qu’il est vide, l’écran affiche « Lien de l’appli à venir ».

### Outils de l’exercice final (écran 06 de la partie 2)

- `studio-carte.html` : Studio carte de visite plexi 85 × 45 mm (6 modèles : Minimaliste, Bandeau graphique, QR essentiel, Typographie XXL, Modules arrondis, Botanique ; 4 palettes par modèle ; QR encadré) ; exports découpe laser (SVG), gabarit UV et PDF couleur UV 600 dpi sur une page 89 × 49 mm (fond perdu 2 mm).
- `qr-code.html` : générateur de QR code (vCard ou URL), PNG transparent à importer dans le Studio.
- Charte commune : `assets/outils.css`. Bibliothèque QR intégrée localement (`assets/vendor/qrcode*.js`, qrcode-generator 1.4.4, licence MIT) pour fonctionner hors ligne.
