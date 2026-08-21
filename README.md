# Owais Ahmad — Portfolio Website

A single-page portfolio site built with plain HTML, CSS, and JavaScript (no frameworks, no build step required).

## Project Structure

```
portfolio_project/
├── index.html        # All page content and structure
├── css/
│   └── style.css      # All styling
├── js/
│   └── script.js       # Nav scroll behavior, scrollspy, reveal animations, mobile menu
├── images/
│   └── owais.jpg      # Profile photo
└── README.md
```

## How to Run

Just open `index.html` directly in any browser — no server or build tools needed.

To edit locally with live-reload, you can also serve it with any static server, e.g.:

```
npx serve .
```
or
```
python3 -m http.server
```
then visit `http://localhost:8000`.

## How to Edit

- **Content/text**: edit `index.html` directly — each section is clearly marked with an HTML comment (`<!-- ABOUT -->`, `<!-- EDUCATION -->`, etc.)
- **Colors/fonts/spacing**: edit the CSS variables at the top of `css/style.css` under `:root { ... }`
- **Photo**: replace `images/owais.jpg` with a new image of the same filename, or update the `src` paths in `index.html`
- **Links** (GitHub, LinkedIn, certifications, etc.): search `index.html` for the relevant `href="..."` and update

## Deploying

You can host this for free on:
- **GitHub Pages** — push this folder to a repo and enable Pages in repo settings
- **Netlify / Vercel** — drag-and-drop the folder onto their dashboard, or connect the repo
