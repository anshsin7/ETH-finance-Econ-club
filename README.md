# ETH Finance & Econ Club — Website

A premium, single-page site for the **ETH Finance & Econ Club** — an upcoming student-led, nonprofit
initiative at **ETH Zürich** uniting finance, economics, and technology.

## Sections

- **Hero** — "The meeting point of capital & intellect," positioned as launching soon.
- **The Thesis** — the gaps the club exists to close.
- **Four Pillars** — academic collaboration, reciprocal education, applied research, industry & talent (all upcoming).
- **Upcoming Collaborations** — Banks, Venture Capital, Private Equity, Investment Banking, Consulting.
- **The Long View** — a four-phase roadmap from student club to independent institution.
- **The Founders** — Ansh Saini & Siran Jeyavijayaratnam (photo slots ready).
- **Now Recruiting** — a sign-up form, currently for **founding board members**.

## Tech

Plain static site — no build step. Just `index.html`, `styles.css`, `main.js`.
Typography: Cormorant Garamond (display) + Inter (text). Palette: obsidian + champagne gold.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Or simply open `index.html` in a browser.

## Deploy with GitHub Pages

1. Repo **Settings → Pages → Source: `main` branch / `root`**.
2. Live at `https://anshsin7.github.io/ETH-finance-Econ-club/`.

## Adding founder photos

See [`assets/README.md`](assets/README.md). Short version: drop images in `assets/` and swap the
initials `<span>` for an `<img src="assets/your-photo.jpg">` inside each `.member__photo`.

## Wiring up the sign-up form (IMPORTANT)

**Out of the box the form does NOT email you anything** — it only saves a copy in the visitor's own
browser (`localStorage`) as a testing fallback. To actually receive applications, connect it to a
backend. The quickest option is **Formspree** (free tier, ~2 minutes):

1. Create a free account at [formspree.io](https://formspree.io).
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find the sign-up `<form>` and replace `FORM_ID` in its `action`:

   ```html
   <form ... action="https://formspree.io/f/abcdwxyz" method="POST" ...>
   ```

4. Deploy. Every submission now arrives in your email (and the Formspree dashboard).

`main.js` already handles the rest: it POSTs via `fetch`, shows the "Thank you" state on success, and
re-enables the button on failure. Prefer a Google Form instead? Just link the "Apply" buttons to it.

## Customising

- **Colours** — CSS custom properties at the top of `styles.css` (`--gold`, `--navy`, …).
- **Contact email** — update the `mailto:` links in `index.html`.
