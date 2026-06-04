# LiteStyle

LiteStyle is a local, modular CSS component library with a small Express/Vite engine for editing and compiling design tokens. The dashboard writes theme choices into `sandbox-site/theme.json`, regenerates `sandbox-site/src/theme.css`, and previews the same reusable CSS classes used by the sandbox site.

## What Is Included

- `core-engine/server.js` - Express server, Vite middleware, config API, and theme compiler.
- `core-engine/dashboard.html` - visual token editor and live component preview.
- `sandbox-site/src/framework.css` - source CSS framework classes.
- `sandbox-site/theme.json` - editable theme token state.
- `sandbox-site/index.html` - component sandbox that consumes the generated theme.
- `setup.sh` - install-and-run helper for the local engine.

## Component Coverage

The framework includes token-driven classes for:

- App shells, navbars, sidebars, and navigation links
- Buttons: solid, soft, outline, ghost, glass, gradient, danger, sizes, and icon buttons
- Badges: solid, soft, outline, neon, success, warning, and danger
- Cards, interactive cards, stats, grids, rows, and stacks
- Form fields, selects, textareas, labels, and switches
- Progress bars, alerts, avatars, tabs, chips, keyboard tags, timelines, and tables

## Getting Started

Install dependencies from the engine folder:

```bash
cd core-engine
npm install
```

Run the local engine:

```bash
node server.js
```

Then open:

- Dashboard: `http://localhost:3000/dashboard`
- Sandbox: `http://localhost:3000/`

## Lazy Way

You can also run the helper from the repository root, should you run into any errors:

```bash
./setup.sh
```

## Theme Workflow

1. Open the dashboard.
2. Edit palette, button, badge, form, layout, navigation, and module tokens.
3. Save the theme.
4. The engine updates `sandbox-site/theme.json`.
5. The engine regenerates `sandbox-site/src/theme.css`.
6. The sandbox page uses `theme.css` plus `framework.css` to render the final UI.

`framework.css` is source code and should be committed. `theme.css` is generated output and is intentionally ignored by Git.

## Validation

Useful quick checks:

```bash
node --check core-engine/server.js
node -e "JSON.parse(require('fs').readFileSync('sandbox-site/theme.json','utf8')); console.log('theme json ok')"
git diff --check
```

## Implementation

Didn't include this part as I thought it would be self explanatory. Just drag the framework.css and theme.css to whatever website you have and start using it. I might use this for my upcoming portfolio for fun.
