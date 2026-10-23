# Nexus — ETH Interdisciplinary Finance & Technology Initiative

A student-led, nonprofit initiative at **ETH Zurich** bridging finance, technology, and the
quantitative sciences through interdisciplinary education, independent research, and industry access.

> **Note:** "Nexus" is a working placeholder name — rename it throughout the site once the club's
> official name is decided.

## What this is

A single-page website presenting the initiative's mission:

- **The Problem** — the gap between education and evolving skill demands, and fragmented talent access.
- **Our Goal** — cultivating professionals fluent in both finance and technology.
- **Strategic Objectives** — academic collaboration, reciprocal education, applied research, industry & talent.
- **Long-Term Vision** — from a student club to an independent institution.
- **Founders** — Siran Jeyavijayaratnam & Ansh Saini.

## Tech

Plain static site — no build step. `index.html`, `styles.css`, `main.js`.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to GitHub (done).
2. Repo **Settings → Pages → Source: `main` branch, `/root`**.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

## Customising

- **Club name & logo** — search for `Nexus` / `N` in `index.html` and the `.brand__mark` in `styles.css`.
- **Contact** — update the `mailto:` link in the Join section of `index.html`.
- **Colours** — tweak the CSS custom properties at the top of `styles.css` (`--brand`, `--accent`, …).
