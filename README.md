# SARA Brothers Website (SPA)

This project is a small, single-page app (SPA) that renders four pages from a JSON configuration and a lightweight JavaScript renderer. It also includes a tiny Express server for local development and for sending emails when the contact form is configured to use the internal provider.

## Project Structure

- `index.html` — Base HTML structure for the SPA
- `css/styles.css` — Styling for all pages and components
- `js/app.js` — Client-side SPA (routing, rendering, behavior)
- `config/config.json` — Site configuration (theme, pages, data for each page)
- `server/server.js` — Express server (static hosting + contact email API)
- `assets/` — Images, icons, and videos used throughout the site

## Pages and Code Organization

`js/app.js` is organized by feature and page:

- Global utilities and bootstrap
  - `applyTheme()` — Applies theme colors and variables from `site.theme`
  - `buildHeader()` — Renders header UI (logo, menu, social icons, optional banner)
  - `buildFooter()` — Renders footer links, social icons, business info, badges
  - Router helpers (`route()`, `hashToRoute()`, `isPageEnabled()`, etc.)

- Page renderers
  - `renderHome()` — Renders hero, brand text, bullet list, alternating blocks, and a media carousel
  - `renderProducts()` — Renders products with search and a responsive gallery per item
  - `renderContact()` — Renders a configurable contact form and a right-side business info card
  - `renderTestimonials()` — Renders a testimonial form and a list persisted in LocalStorage

Each page’s renderer only reads the subset of config required for that page. Cross-page helpers are kept minimal and documented with JSDoc-style comments.

## Configuration Reference (`config/config.json`)

Top-level keys:

- `site`
  - `title` — Brand name shown in the header and other places
  - `description` — Short description of the site (not directly rendered by default)
  - `theme` — Colors and surfaces for the UI
    - `primary`, `secondary` — Brand colors
    - `background`, `surface`, `text`, `muted` — Global theme tones
  - `pages` — Visibility flags per page: `Y` or `N` (e.g., `{ "home": "Y", "products": "Y", ... }`)

- `header`
  - `logo` — Path to the logo image
  - `breadcrumbs` — `Y`/`N` to enable breadcrumb navigation
  - `menu[]` — Navigation entries (`text`, `hash`, `visible`)
  - `socialMedia[]` — Social links with icon paths (`name`, `url`, `icon`, `visible`)
  - Optional: `banner` — Image path for a header banner

- `home`
  - `hero` — `{ image, alt }` for the hero image
  - `brandSection` — `{ visible, title, text, cta? }`
  - `bulletedList` — `{ visible, items[] }`
  - `imageTextBlocks` — `{ visible, items[] }` with alternating image/text blocks
  - `carouselIntro` — Optional title/text block above carousel
  - `carousel` — `{ visible, items[] }`, items may be `image` or `video`

- `products`
  - `thumbnail` — `{ width, height, visibleCount }` thumbnail sizing
  - `mainImage` — `{ width, height }`
  - `zoom` — `{ enabled: true|false }` (UI support for zoom is limited to the modal)
  - `items[]` — Product blocks
    - `title`, `subtitle`, `visible`
    - `gallery[]` — `{ type: 'image'|'video', src, poster?, autoplay?, muted? }`
    - `descriptionHtml`, `detailsHtml`, `bullets[]`
    - `buyButtons[]` — CTA buttons (`text`, `url`, `icon`, `visible`)

- `contact`
  - `emailRecipients[]` — Recipient list used for mailto fallback and as default when `card.email` is omitted
  - `successMessage` — Message shown after successful internal submission
  - `form` — Field schema (keys are field names)
    - Each field supports: `{ label, type?, required: 'Y'|'N', visible?: 'Y'|'N' }`
    - Special case: `country` renders a dropdown list (United States stays on top)
  - `card` — Optional right-side info card
    - `logo` — `{ image, alt }`
    - `name`, `nameVisible` — Business name and visibility flag
    - `title`, `titleVisible` — Line under the name (e.g., department or role)
    - `phone`, `phoneVisible` — Phone number
    - `email`, `emailVisible` — Contact email
    - `address`, `addressVisible` — Address text
    - `icons` — `{ phone, email, address }` icon paths
  - `submit` — `{ text, emailProvider }`
    - `emailProvider: 'internal'` uses the Express `/api/contact` endpoint
    - Otherwise, falls back to a `mailto:` link using the first configured recipient

- `testimonials`
  - `visible` — Flag
  - `storage` — For now, `local` only
  - `form` — Field schema similar to contact form
  - Notes: Testimonials are stored in `localStorage` under key `sb_testimonials` and do not persist on the server

- `footer`
  - `links[]` — Footer navigation links
  - `socialMedia[]` — Social links with icons
  - `badges[]` — Array of small certification or quality badges with sizes
  - Optional: `businessInfo` — `{ name, address, phone, email }` used as fallback by the Contact page when `contact.card` is not present

## Cross-File Dependencies

- `js/app.js` reads `config/config.json`. Update config to change content on each page.
- `server/server.js` sends contact email when `contact.submit.emailProvider === 'internal'`.
  - Requires environment variables (see below) to be defined for email to work.
- Images, icons, and videos referenced by config must exist in the `assets/` folder.

## Server and Email Configuration

When using the internal email provider, set the following environment variables (e.g., in a `.env` file at the project root):

```
SMTP_HOST=smtp.yourhost.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-user@yourhost.com
SMTP_PASS=your-smtp-password
MAIL_TO=recipient@yourdomain.com
MAIL_FROM=Your Brand <no-reply@yourdomain.com>
PORT=3000
```

Run the server:

```
node server/server.js
```

or, if you prefer `nodemon`:

```
npx nodemon server/server.js
```

## Development Notes

- Router uses `#/route` hash links; ensure header menu items link to `#/home`, `#/products`, `#/contact`, `#/testimonials`.
- Breadcrumbs are controlled via `header.breadcrumbs` flag.
- The Contact page validates: first OR last, email, and message. If internal email fails, a friendly error is shown.
- Product gallery supports both images and videos. A fullscreen modal viewer is available.

## Removed Redundancies

- Removed a redundant global `click` handler for hash navigation; `onDocNav` handles this robustly (including capture-phase fallbacks).
- Removed an unused helper `text()`.

If you need further reorganization (e.g., splitting each page into its own module), we can modularize `js/app.js` accordingly.



--------------------------------------------------------------------------------------------------------------------------------------------------------------

RUN THE SITE WITH AUTO-PUBLISH (Node server)
---------------------------------------------
1) Open PowerShell
2) cd to the project root folder (this folder with index.html)
3) Install and start the local server (first time only run install):
   npm install
   npm start

4) Open the public site:
   http://localhost:5500

5) Open the Admin page:
   http://localhost:5500/admin/index.html

6) In Admin, click "Export JSON" to re-arrange and publish layouts.
   - Changes are applied instantly and written to config.json automatically.

Stop server: press Ctrl + C in the terminal.

Install Node.js 18+.

Create a package.json and install dependencies:
Dependencies: express, nodemailer, dotenv

Run the Node server from the project root Windsurf-SARA/:
npm install
npm start


HERO VARIABLES VALUES 
--------------------------------------------------------------------------------------
heroWidth: string (e.g., "100%", "1200px")
heroScale: "Y" | "N"
heroFit: "fit" | "cover" | "contain" | "stretch" | "fill" | "none" | "scale-down"
heroMaintainAspect: "Y" | "N"


Color suggestions for tints
--------------------------------------------------------------------------------------
Use these in heroOverlayColor when you want colored glass. Pair with:
heroOverlayOpacity: 0.25–0.35
heroOverlayBlur: "12px"
heroOverlayBlendMode: "screen" (or "lighten")
[Blue] #2563eb (vivid) or #60a5fa (lighter)
[Green] #16a34a (rich) or #22c55e (brighter)
[Red] #dc2626 (rich) or #ef4444 (brighter)
[Maroon] #800000 classic or #7f1d1d deep maroon
[Chocolate] #3e2723 (matches your theme)

Black
heroOverlayColor": "#0b0b0e",
80% opacity black: #000000CC
50% opacity black: #00000080
----------------------------------
Blue glass: #e0f2ff
Green glass: #d1fae5
Red glass: #fee2e2
Maroon glass: #fde2e2 (soft maroon tint)
Chocolate glass: #f3e8e6 (very subtle warm tint)


Notes and tweaks
Brightness/gloss: Increase heroOverlayBlur (e.g., "28px") and adjust heroOverlayOpacity to fine-tune “crystal black” look. Prefer heroOverlayBlendMode: "soft-light" for a refined gloss, or "overlay" for stronger contrast.
Alignment and spacing: Adjust the vertical spacing between the two lines by editing .hero-text-inner { gap: 8px; } in 
styles.css
.
Height: Control hero height via site.styles.home.heroHeight (e.g., "400px").



