# TravelReco


TravelReco is a lightweight static site that highlights curated travel recommendations. The current iteration fulfills the final project checklist with clear navigation, dedicated content pages, an introduction section, recommendation highlights, and a contact form so visitors can engage with the team.

## Features

- **Home page**: Hero banner, introduction blurb, featured destinations grid, beach/temple/country recommendation sections with visuals and supporting text.
- **About Us page**: Mission summary, value cards, and a link to the public GitHub repository (https://github.com/Deeksh022/TravelReco).
- **Contact Us page**: Contact form, descriptive call-to-action, and alternate support email details.
- **Consistent navigation** across `index.html`, `destination.html`, `favorites.html`, `about.html`, and `contact.html`, including profile actions and sticky header styling.
- **Styled components** for recommendations, cards, and form inputs managed via `css/styles.css`.

## File overview

| File | Purpose |
| --- | --- |
| `index.html` | Landing experience with hero, intro, featured section, and recommendation blocks. |
| `about.html` | Introduced team story, commitment cards, and GitHub CTA. |
| `contact.html` | Contact form and support pairing with partner/contact emails. |
| `destination.html` / `favorites.html` | Catalog of destinations, filters, and favorites modal (pre-existing from earlier iterations). |
| `css/styles.css` | Global theme, nav/header, recommendations, form, and responsive tweaks. |
| `js/app.js` | Handles featured destinations, search/filter, favorites, and profile modal interactions. |

## Getting started

1. Clone the repository: `git clone https://github.com/Deeksh022/TravelReco.git`
2. Open `index.html` (or any page) in your browser for a static preview.
3. For a simple HTTP server: `npx http-server` (from the project root) and navigate to the provided localhost URL.


