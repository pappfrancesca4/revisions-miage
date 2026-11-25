# Révisions MIAGE

App de révision hors ligne (PWA) : https://pappfrancesca4.github.io/revisions-miage/

- Matières : Outils probabilistes, Angular/MEAN, Communication for Business (+ matières ajoutées par packs)
- Cours expliqués simplement + fiches détaillées, QCM du prof expliqués, cartes « Citez… »
- Comptes élèves (Supabase) : progression synchronisée, examens à venir, espace admin
- Fonctionne en mode avion une fois installée (Safari → Partager → Sur l'écran d'accueil)

## Structure
- Fichiers servis à la racine : `index.html`, `sw.js`, `manifest.webmanifest`, `vendor/`
- Sources : `src/` ; `python3 build.py` régénère `dist/pwa/`
- Base de données : `supabase/setup.sql` (à exécuter une fois dans Supabase)
- Clés Supabase : `src/config.js` (clé publique « anon » uniquement)
- Ajouter du contenu : voir `PACK_FORMAT.md`
