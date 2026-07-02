# City Computer Store

A fictional, fully responsive multi-page website built as a front-end portfolio piece — a Calgary-based independent PC build & repair shop, designed around a terminal / spec-sheet visual language instead of a generic template.

**Live demo:** enable GitHub Pages on this repo (Settings → Pages → Deploy from branch `main`, folder `/root`) and it will be live at `https://<your-username>.github.io/<repo-name>/`.

## Pages

- `index.html` — Home (hero terminal animation, services, featured builds, testimonials)
- `products.html` — Builds & Repairs (filterable pricing catalogue)
- `about.html` — About (story, timeline, team)
- `contact.html` — Contact (form, hours, embedded map)

## Stack

Plain HTML5 / CSS3 / vanilla JavaScript — no build step, no dependencies. Fonts loaded from Google Fonts (Space Grotesk, Inter, JetBrains Mono). Map embed via OpenStreetMap (no API key required).

## Notes

- All business details (name, address, phone, staff) are fictional, created for demo purposes. The phone number uses the `555` exchange, which is reserved for fictional use in North America.
- The contact form validates client-side only; wire it up to a form backend (Formspree, Netlify Forms, etc.) for real submissions.

## Structure

```
city-computer-store/
├── index.html
├── products.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```
