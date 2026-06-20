# SARA Brothers Static Redesign

This folder is a static GitHub Pages-ready site for SARA Brothers thermal shipping labels.

## Files

- `index.html` - page structure
- `styles.css` - modern responsive styling
- `app.js` - product selector, gallery, mobile nav, and small interactions
- `products.json` - editable product details, media paths, video paths, social links, credentials, Amazon links, compatibility, and feature copy
- `announcements.json` - editable announcement text shown at the top of the home page
- `admin.html`, `admin.css`, `admin.js` - local-only editor for updating `products.json`; do not upload these files to the live GitHub Pages site
- `assets/images` - local brand, homepage, product, carousel, and credential badge images
- `assets/video` - local video files and poster images
- `assets/icons` - marketplace and social media icons


## Hosting

Upload these files to the root of a GitHub Pages repository, or place the whole folder in a repo and set GitHub Pages to serve from it. No server, build step, or backend is required.

## Changing Media

Most media can be changed in `products.json`:

- Hero copy: `content.hero`
- Announcements: edit `announcements.json`; leave `announcements` as `[]` for no announcement band, or add up to 6 lines
- Product card image: each product's `image`
- Product gallery images: each product's `thumbs`
- Story images: `story.image`, `story.valuesImage`, `story.whatWeDoImage`, and `story.whoWeServeImage`
- Credential badges: `credentials`
- Videos: `videos[].src` and `videos[].poster`
- Social icons and destination links: `social`
- Contact email, cards, and form endpoint: `contact`

Use relative paths from this folder, for example `assets/images/products/MyImage.jpg` or `assets/video/MyVideo.mp4`.

## Local Admin Editor

Open `admin.html` locally while testing the site. It lets you edit JSON-controlled content, image paths, social links, and item order, then download a replacement `products.json`.

Important: keep `admin.html`, `admin.css`, and `admin.js` local only. Do not upload them to GitHub Pages.

## Contact Form

The form is static-site friendly and uses the same EmailJS pattern as the current website:

- EmailJS settings live under `contact.emailjs`.
- The submit provider is controlled by `contact.submit.emailProvider`.
- If EmailJS is unavailable and `contact.formEndpoint` is blank, it opens the visitor's email app and pre-fills the message.
- If you later want a Formspree, Google Apps Script, Netlify Forms, Basin, or other form endpoint, paste it into `contact.formEndpoint` and change the provider as needed.
- Change the recipient fallback email at `contact.email`.

Current placeholder email: `info@sarabrothers.com`.
