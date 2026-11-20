# AnyServe website — V3 photography & favicon update

## Run locally
1. Extract the ZIP archive.
2. Open `index.html` in a modern browser.
3. The website is static HTML/CSS/JavaScript and does not require a build step.

## Deploy to GitHub Pages
1. Create or open the GitHub repository for the site.
2. Upload the contents of the `anyserve-v3` folder to the repository root (keep the `assets` folder).
3. In **Settings → Pages**, select **Deploy from a branch**, choose the publishing branch and `/ (root)`, then save.
4. Keep `.nojekyll` in the repository root.

## Favicon
The old blue-square/lettermark favicon has been replaced with a compact connected-node brand mark. The project includes SVG, ICO, 16×16 PNG, 32×32 PNG and Apple touch icon variants. All favicon references are relative, so they work on a GitHub Pages project path.

## Photography and licensing
The service-section photography uses real Unsplash photographs, not generated illustrations. Photo sources are linked below; each source page identifies the photographer and Unsplash License:
- Network switch / patch panel — Dimitri Karastelev: https://unsplash.com/photos/a-close-up-of-a-network-switch-box-pl6My-v7gnE
- Server room — Taylor Vick: https://unsplash.com/photos/server-room-with-network-cabinets-aWslrFhs1w4
- Computer workstation — Rainer Eli: https://unsplash.com/photos/a-man-working-on-a-computer-in-a-room-6Tqnz2sjqhI
- CCTV dome camera — Franck V.: https://unsplash.com/photos/a-security-camera-mounted-to-the-ceiling-of-a-building-ujSsIk5iZmA
- Business phone / office workspace — Berkeley Communications: https://unsplash.com/photos/man-using-ip-phone-inside-room-WEDDt-u3q3o
- Retail cash register — Erik Mclean: https://unsplash.com/photos/a-man-standing-at-a-cash-register-in-a-store-yJC4867EVtY
- Digital workspace — Kevin Bhagat: https://unsplash.com/photos/laptop-on-desk-edMu3cQKrho

**Asset hosting note:** The editing environment used for this update could not fetch binary image files from external photo hosts. The photographs therefore remain as direct, optimized Unsplash image URLs rather than being bundled locally. This keeps the deployed page lightweight and avoids storing third-party image copies, but an internet connection is required for those photographs to load. Existing AnyTill product screenshots remain stored locally in `assets/`. If fully offline/local image hosting is mandatory, download the listed Unsplash photos from their source pages and replace the corresponding image URLs in `index.html` with `assets/<filename>` paths.

## Project contents
- `index.html` — website, responsive styling and existing interactions
- `assets/favicon.*` — updated brand favicon variants
- `assets/anytill-*.jpg` — existing locally stored AnyTill product screenshots
- `.nojekyll` — GitHub Pages compatibility

## Preserved functionality
Existing navigation, responsive menu, AnyTill image gallery, enquiry form (email), service anchors, contact details have been retained. Pricing has been removed (V3.1). No testimonials, certifications or new service guarantees were added.
