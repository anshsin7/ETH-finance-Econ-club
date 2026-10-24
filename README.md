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

## The application form (free, with CV uploads)

The board-application form includes a **CV upload** (drag-and-drop or browse, PDF/DOC/DOCX, max 5 MB,
validated in the browser). The form POSTs everything — text fields **and** the CV file — to a small
Vercel serverless function at [`/api/apply`](api/apply.js).

This is **completely free** on Vercel's Hobby tier:

- the function invocation is free,
- the CV is stored in **Vercel Blob** (generous free allowance — plenty for a student club),
- and the text details can optionally be emailed to you via a free Formspree endpoint.

### Free setup (one-time, ~3 minutes)

1. **Add Vercel Blob** to your project: in the Vercel dashboard →
   **Storage → Create → Blob**. Vercel automatically adds the `BLOB_READ_WRITE_TOKEN`
   environment variable to the project.
2. **(Optional) email notifications:** add an environment variable
   `FORMSPREE_ENDPOINT = https://formspree.io/f/xaqbpoel` (your existing free Formspree form).
   Each application then also lands in your email, with a link to the stored CV.
3. **Redeploy.** That's it — applications and CVs are now received and stored at no cost.

Where the CVs live: Vercel dashboard → **Storage → your Blob store** (files under `cvs/`). Each
application's response also contains the direct CV URL.

> **Prefer zero code / zero setup?** A **Google Form** is also 100% free and stores CVs in Google Drive
> automatically — just link the "Apply" buttons to it. The trade-off is that it sends visitors to a
> Google-branded page instead of keeping them on your premium site.

### Local development

```bash
npm install
npm run dev     # runs `vercel dev` — requires the Vercel CLI (`npm i -g vercel`)
```

Plain static preview (form submit won't hit the function):

```bash
python3 -m http.server 8000
```

> Privacy note: the CV **file** is never kept in the browser; only the text fields are cached in
> `localStorage` as a testing fallback.

## Customising

- **Colours** — CSS custom properties at the top of `styles.css` (`--gold`, `--navy`, …).
- **Contact email** — update the `mailto:` links in `index.html`.
