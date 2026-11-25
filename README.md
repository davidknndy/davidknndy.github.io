# davidknndy.github.io

Personal engineering portfolio and interactive project workbench for **David Kennedy** (`davidknndy`), showcasing 13 mobile, web, automation, and support-engineering tools.

## Structure

- `index.html` — Semantic static entry page
- `css/styles.css` — Ink Dark design system on a 4px spacing grid
- `js/i18n.js` — Bilingual (`EN` / `PT`) copy dictionary
- `js/data.js` — Sanitized project metadata and synthetic demo datasets
- `js/demos.js` — Client-side interactive simulators for all 13 projects
- `js/app.js` — Workbench navigation, filtering, keyboard controls, and URL hash state
- `.nojekyll` — Direct static hosting on GitHub Pages

## Design & Security

- Zero build step required; opens directly or via GitHub Pages.
- All internal work tools use sanitized synthetic payloads with zero API keys, corporate URLs, or proprietary datasets.
- Built following the `unslop` craft framework (CC BY 4.0 credit to [@heydamir](https://x.com/heydamir)).
