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

## Applications & CV uploads — free via Google Form

Applications are handled by a **Google Form**, which is **100% free, unlimited, and stores every CV
in your Google Drive** automatically (with all responses in a spreadsheet). No server, no cost.

The site keeps its premium feel: the **"Open the Application"** button (and the Apply buttons) open your
Google Form in a new tab.

### Setup (one-time, ~5 minutes)

1. Go to [forms.google.com](https://forms.google.com) and create a new form, e.g. *"ETH Finance & Econ
   Club — Board Application."*
2. Add your questions — name, email, programme at ETH Zürich, why finance / IB & PE, etc.
3. Add a **File upload** question for the CV (Google Forms → *+* → **File upload**). This requires the
   form owner to have a Google account with Drive; uploaded CVs save straight to your Drive.
4. Click **Send → 🔗 (link)** and copy the link.
5. Open `main.js`, find `GOOGLE_FORM_URL` near the top of the applications section, and paste your link:

   ```js
   const GOOGLE_FORM_URL = "https://forms.gle/your-link-here";
   ```

6. Commit & redeploy. Done — applications and CVs now flow into Google Drive for free.

Until you set `GOOGLE_FORM_URL`, the Apply button shows a friendly reminder instead of a dead link.

> Responses & CVs live in **Google Drive** (and the linked Google Sheet). Review them there, or connect
> a sheet for a simple applicant tracker.

## Customising

- **Colours** — CSS custom properties at the top of `styles.css` (`--gold`, `--navy`, …).
- **Contact email** — update the `mailto:` links in `index.html`.
