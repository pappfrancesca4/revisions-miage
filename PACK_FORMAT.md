# Format des packs de contenu (`revisions-pack-1`)

Un pack ajoute une matière (ou des chapitres à une matière existante) avec ses cours et ses questions.
Il s'importe dans l'app : **Compte → Espace admin → Contenu**. Exemple complet : `packs/exemple.json`.

```json
{
  "format": "revisions-pack-1",
  "title": "Nom affiché dans l'admin",
  "subject": { "id": "eco", "name": "Économie d'entreprise", "short": "Éco", "code": "SMUAGE05", "color": "#b45309" },
  "chapters": [
    { "id": "e1", "title": "Le marché", "sub": "Sous-titre court",
      "simple": "<p class=\"lead\">Explication simple (HTML)</p>",
      "html": "<h3>Fiche détaillée (HTML)</h3>" }
  ],
  "questions": [
    { "type": "qcm",  "chapter": "e1", "q": "…", "options": ["…", "…"], "answer": 0, "explanation": "…", "notes": ["pourquoi a", "pourquoi b"], "source": "QCM 1 · Q3" },
    { "type": "list", "chapter": "e1", "q": "Citez 3 …", "items": ["…", "…", "…", "…"], "need": 3, "tip": "astuce mémo" },
    { "type": "open", "chapter": "e1", "q": "Définissez …", "answer": "…", "tip": "…" }
  ]
}
```

- `subject.id` : `proba`, `ng` ou `comm` pour compléter une matière existante, ou un nouvel identifiant.
- `answer` (qcm) : index de la bonne option, à partir de 0. `notes` et `source` sont facultatifs (`source` = question du prof).
- HTML autorisé dans `simple` et `html` : `h3, p, ul, ol, li, b, i, code, pre, table`, et les blocs `div` de classe `def`, `formula`, `trap`, `ex`, `key`, `note-block`, `dict`, `tablewrap`. Les scripts sont retirés à l'import.
