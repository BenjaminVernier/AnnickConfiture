# Maison Joséphine — boutique (maquette)

A **mockup e-commerce site** for a fictional French artisanal jam & jelly brand,
**« Maison Joséphine »**. Aesthetic inspired by premium Parisian confiture houses;
the brand, products, prices and reviews are **invented for demonstration** — no real
company, no real transactions.

- **Static site** — vanilla HTML/CSS/JS, no build step, no backend.
- **Hosted free** on GitHub Pages (`/docs`), served at the repo's Pages URL.
- **Interactive mock**: browse the collection, add to a cart (persisted in `localStorage`),
  adjust quantities, "checkout" (shows a demo confirmation — nothing is charged or sent).

```
docs/
├─ index.html   ← page structure (hero, collection, savoir-faire, histoire, avis, footer, cart)
├─ styles.css   ← all styling (cream / plum / gold palette, Cormorant Garamond + Jost)
└─ app.js       ← product data, the hand-drawn SVG jars, and the cart logic
```

## Run locally
```bash
cd docs && python3 -m http.server 8788
```
Then open http://localhost:8788.

## Customize
- **Products**: edit the `PRODUCTS` array in [`docs/app.js`](docs/app.js) (name, fruit, price, colour, description). The jar illustration is drawn from each product's `color`.
- **Copy & sections**: all text is in [`docs/index.html`](docs/index.html).
- **Palette & type**: CSS variables at the top of [`docs/styles.css`](docs/styles.css).

> Demonstration only. “Maison Joséphine” is a fictional brand; the site processes no real orders or payments.
