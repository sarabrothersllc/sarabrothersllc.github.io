// =============================
// App: Global state and handles
// Holds config, route list, and cached DOM refs
// =============================
const App = {
  config: null,
  routes: ['home', 'home2', 'products', 'contact', 'testimonials'],
  el: {
    main: null,
    navMenu: null,
    footerLinksList: null,
    footerSocial: null,
    businessInfo: null,
    footerBadges: null,
  },
  hasLoaded: false,
};

// =============================
// Routing helper: push/trigger hash route changes
// =============================
function navigateToHash(href) {
  if (!href || !href.startsWith('#/')) return;
  try {
    if (location.hash === href) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      if (typeof route === 'function') route();
    } else {
      location.hash = href;
      try { window.dispatchEvent(new HashChangeEvent('hashchange')); } catch (_) {}
      if (typeof route === 'function') route();
      setTimeout(() => {
        try { window.dispatchEvent(new HashChangeEvent('hashchange')); } catch (_) {}
        if (typeof route === 'function') route();
      }, 0);
    }
  } catch (_) {}
}
// Menu removed: no delegated navigation handlers

// DOM helper: create element with optional class and innerHTML
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
// Utility helpers
function boolYN(val) { return String(val || 'N').toUpperCase() === 'Y'; }
function hashToRoute(hash) { return (hash.replace('#/', '') || 'home').toLowerCase(); }
function isPageEnabled(page) {
  const map = App.config?.site?.pages || {};
  const val = map[page];
  if (val === undefined) return true;
  return boolYN(val);
}
function firstEnabledPage() {
  const map = App.config?.site?.pages || {};
  return App.routes.find(r => map[r] === undefined || boolYN(map[r]));
}
// =============================
// Theming: apply CSS variables from config
// =============================
function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.primary) root.style.setProperty('--primary', theme.primary);
  if (theme.secondary) root.style.setProperty('--secondary', theme.secondary);
  const bg = theme.background, txt = theme.text;
  if (bg) root.style.setProperty('--bg', bg);
  if (txt) root.style.setProperty('--text', txt);
  if (theme.surface) root.style.setProperty('--surface', theme.surface);
  if (theme.muted) root.style.setProperty('--muted', theme.muted);
}

// Apply style variables from config.site.styles to CSS variables
function applyStyles(styles) {
  if (!styles) return;
  const root = document.documentElement;
  const hdr = styles.header || {};
  if (hdr.logoWidth) root.style.setProperty('--logo-width', hdr.logoWidth);
  if (hdr.logoHeight) root.style.setProperty('--logo-height', hdr.logoHeight);
  if (hdr.socialIconBg) root.style.setProperty('--social-icon-bg', hdr.socialIconBg);
  // Home-specific styles
  const home = styles.home || {};
  if (home.heroHeight) root.style.setProperty('--home_hero_height', home.heroHeight);
  if (home.heroWidth) root.style.setProperty('--home_hero_width', home.heroWidth);
  const overlayOn = String(home.heroOverlayEnabled || 'Y').toUpperCase() === 'Y';
  if (overlayOn) {
    if (home.heroOverlayColor) root.style.setProperty('--hero-overlay-color', home.heroOverlayColor);
    if (home.heroOverlayOpacity != null) root.style.setProperty('--hero-overlay-opacity', String(home.heroOverlayOpacity));
    if (home.heroOverlayBlur) root.style.setProperty('--hero-overlay-blur', home.heroOverlayBlur);
    if (home.heroOverlayBlendMode) root.style.setProperty('--hero-overlay-blend', home.heroOverlayBlendMode);
  } else {
    // Force overlay off globally
    root.style.setProperty('--hero-overlay-opacity', '0');
    root.style.setProperty('--hero-overlay-blur', 'none');
    root.style.setProperty('--hero-overlay-blend', 'normal');
  }
}

function setBodyOffset() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const h = header.offsetHeight || 0;
  document.body.style.paddingTop = h + 'px';
}

// Toggle a class on header to show the mobile contact strip when viewport is narrow
function updateMobileContactStrip() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const isMobile = window.innerWidth <= 980;
  // Condition can be extended (e.g., when breadcrumbs are hidden or menu collapsed)
  if (isMobile) header.classList.add('show-mobile-contact');
  else header.classList.remove('show-mobile-contact');
}

function normalizeMediaPath(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('/videos/')) return url.replace('/videos/', '/video/');
  return url;
}

// Convert a config size value to a valid CSS size string.
// Accepts numbers (e.g., 40), numeric strings ("40"), or strings with units ("40px", "2rem").
function toCssSize(v) {
  if (v == null) return null;
  if (typeof v === 'number') return v + 'px';
  const s = String(v).trim();
  if (!s) return null;
  if (/^\d+$/.test(s)) return s + 'px';
  return s; // assume caller passed proper CSS units
}

// Force a size value into pixel units. Used for heights which must be in pixels.
function toCssPx(v) {
  if (v == null) return null;
  if (typeof v === 'number' && isFinite(v)) return v + 'px';
  const s = String(v).trim();
  if (!s) return null;
  const n = parseFloat(s);
  if (!isFinite(n)) return null;
  return n + 'px';
}

function formatDate(date = new Date()) {
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

// =============================
// Admin Layout Integration (localStorage-driven)
// =============================
function getAdminLayoutAll() {
  try { return JSON.parse(localStorage.getItem('admin.__layout') || '{}'); } catch (_) { return {}; }
}
function getAdminLayoutForPage(page) {
  const all = getAdminLayoutAll();
  const key = (page || 'home').toLowerCase();
  const arr = Array.isArray(all[key]) ? all[key] : null;
  return arr && arr.length ? arr : null;
}

// Small helpers to create sections from current config
function makeHeroSection(c) {
  const heroSrc = (c.hero && c.hero.image) ? c.hero.image
                : (c.banner && c.banner.image) ? c.banner.image
                : 'assets/images/header-banner.jpg';
  const heroAlt = (c.hero && c.hero.alt) ? c.hero.alt
                : (c.banner && c.banner.alt) ? c.banner.alt
                : 'Homepage banner';
  if (!heroSrc) return null;
  const hero = el('section', 'home-hero');
  // Set overlay variables on section to ensure immediate effect
  try {
    const hs = App.config?.site?.styles?.home || {};
    const overlayOn = String(hs.heroOverlayEnabled || 'Y').toUpperCase() === 'Y';
    if (overlayOn) {
      const c = hs.heroOverlayColor || '#000000';
      const o = hs.heroOverlayOpacity != null ? Math.max(0, Math.min(1, Number(hs.heroOverlayOpacity))) : 0;
      hero.style.setProperty('--hero-overlay-color', c);
      hero.style.setProperty('--hero-overlay-opacity', String(o));
      if (hs.heroOverlayBlur) hero.style.setProperty('--hero-overlay-blur', hs.heroOverlayBlur);
      if (hs.heroOverlayBlendMode) hero.style.setProperty('--hero-overlay-blend', hs.heroOverlayBlendMode);
    } else {
      hero.style.setProperty('--hero-overlay-opacity', '0');
      hero.style.setProperty('--hero-overlay-blur', 'none');
      hero.style.setProperty('--hero-overlay-blend', 'normal');
    }
  } catch (_) {}
  const heroImg = el('img');
  heroImg.src = normalizeMediaPath(heroSrc);
  heroImg.alt = heroAlt;
  const heroH = App.config?.site?.styles?.home?.heroHeight;
  const cssHeroH = toCssPx(heroH);
  if (cssHeroH) heroImg.style.height = cssHeroH;
  // Apply hero scaling/fit/aspect options
  try {
    const homeStyles = App.config?.site?.styles?.home || {};
    const scale = String(homeStyles.heroScale || 'Y').toUpperCase() === 'Y';
    const maintain = String(homeStyles.heroMaintainAspect || 'Y').toUpperCase() === 'Y';
    const fitRaw = String(homeStyles.heroFit || 'cover').toLowerCase();
    const fitMap = { fit: 'contain', cover: 'cover', contain: 'contain', stretch: 'fill', fill: 'fill', none: 'none', 'scale-down': 'scale-down', scaledown: 'scale-down' };
    let fit = fitMap[fitRaw] || 'cover';
    if (!scale) fit = 'none';
    if (scale && !maintain) fit = 'fill';
    heroImg.style.objectFit = fit;
    heroImg.style.objectPosition = 'left top';
  } catch (_) {}
  hero.appendChild(heroImg);
  // Add centered hero text overlays (above overlay)
  try {
    const hs = App.config?.site?.styles?.home || {};
    const text1 = hs.heroText1 || {};
    const text2 = hs.heroText2 || {};
    if (text1.text || text2.text) {
      const textWrap = el('div', 'hero-text');
      const inner = el('div', 'hero-text-inner');
      const makeLine = (cfg) => {
        if (!cfg || !cfg.text) return null;
        const line = el('div');
        line.textContent = cfg.text;
        if (cfg.fontSize) line.style.fontSize = cfg.fontSize;
        if (cfg.color) line.style.color = cfg.color;
        if (String(cfg.bold).toUpperCase() === 'Y') line.style.fontWeight = '700';
        if (String(cfg.italic).toUpperCase() === 'Y') line.style.fontStyle = 'italic';
        return line;
      };
      const l1 = makeLine(text1);
      const l2 = makeLine(text2);
      if (l1) inner.appendChild(l1);
      if (l2) inner.appendChild(l2);
      textWrap.appendChild(inner);
      hero.appendChild(textWrap);
    }
  } catch (_) {}
  // Overlay tint
  try {
    const homeStyles = App.config?.site?.styles?.home || {};
    const overlayColor = homeStyles.heroOverlayColor || '#000000';
    const overlayOpacity = Number(homeStyles.heroOverlayOpacity);
    if (overlayColor && !Number.isNaN(overlayOpacity) && overlayOpacity > 0) {
      const ov = el('div', 'hero-overlay');
      ov.style.backgroundColor = overlayColor;
      ov.style.opacity = String(Math.max(0, Math.min(1, overlayOpacity)));
      hero.appendChild(ov);
    }
  } catch (_) {}
  return hero;
}
function makeBrandSection(c) {
  if (!boolYN(c.brandSection?.visible)) return null;
  const s = el('section', 'home-brand');
  const titleRaw = c.brandSection.title || App.config?.site?.title || 'SARA Brothers';
  const firstLine = String(titleRaw).split(/<br\s*\/?/i)[0] || titleRaw;
  s.appendChild(el('h1', 'brand-title', firstLine));
  if (c.brandSection.text) s.appendChild(el('p', '', c.brandSection.text));
  if (c.brandSection.cta?.visible === 'Y' && c.brandSection.cta?.text) {
    const btn = el('button', 'btn btn-primary'); btn.textContent = c.brandSection.cta.text; s.appendChild(btn);
  }
  return s;
}
function makeBulletedListSection(c) {
  if (!boolYN(c.bulletedList?.visible)) return null;
  const s = el('section', 'home-bullets');
  if (Array.isArray(c.bulletedList.items)) {
    const ul = el('ul'); c.bulletedList.items.forEach(it => ul.appendChild(el('li', '', it))); s.appendChild(ul);
  }
  return s;
}
function makeImageTextBlocksSection(c) {
  if (!boolYN(c.imageTextBlocks?.visible)) return null;
  const s = el('section', 'home-alt-blocks');
  (c.imageTextBlocks.items || []).slice(0, 10).forEach((blk) => {
    const pos = String((blk.align || blk.position || 'left')).toLowerCase();
    const isRight = pos.includes('right'); const isTop = pos.includes('top');
    const row = el('div', `alt-row ${isRight ? 'image-right' : 'image-left'} ${isTop ? 'top-align' : ''}`);
    const img = el('img'); img.src = blk.image || ''; img.alt = blk.title || '';
    const w = toCssSize(blk.width);
    const h = toCssPx(blk.height);
    if (w) img.style.width = w;
    if (h) img.style.height = h;
    const txt = el('div', 'alt-text');
    txt.appendChild(el('h3', '', blk.title || ''));
    if (blk.text) txt.appendChild(el('p', '', blk.text));
    row.appendChild(img); row.appendChild(txt); s.appendChild(row);
  });
  return s;
}
function makeCarouselSection(c) {
  if (!boolYN(c.carousel?.visible)) return null;
  const s = el('section', 'home-carousel');
  const track = el('div', 'carousel-track');
  const carouselItems = (c.carousel.items || []).slice(0, 15);
  const mediaH = c.carousel.mediaHeight;
  const mediaW = c.carousel.mediaWidth;
  const cssMediaH = toCssPx(mediaH);
  const cssMediaW = toCssSize(mediaW);
  carouselItems.forEach(item => {
    const card = el('div', 'carousel-card');
    if (item.type === 'video') {
      const video = el('video'); if (item.poster) video.poster = normalizeMediaPath(item.poster);
      if (item.autoplay) { video.autoplay = true; video.muted = !!item.muted; video.loop = true; }
      video.controls = true; video.src = normalizeMediaPath(item.video || item.src || '');
      if (cssMediaH) video.style.height = cssMediaH;
      if (cssMediaW) video.style.width = cssMediaW;
      card.appendChild(video);
    } else {
      const img = el('img'); img.src = normalizeMediaPath(item.image || item.src || ''); img.alt = item.text || '';
      if (cssMediaH) img.style.height = cssMediaH;
      if (cssMediaW) img.style.width = cssMediaW;
      card.appendChild(img);
    }
    if (item.text) card.appendChild(el('div', 'carousel-text', item.text));
    if (item.link) { const a = el('a', 'carousel-link', 'Learn more'); a.href = item.link; card.appendChild(a); }
    track.appendChild(card);
  });
  s.appendChild(track);
  return s;
}

function renderByLayout(page) {
  const layout = getAdminLayoutForPage(page);
  if (!layout) return false;
  const frag = document.createDocumentFragment();
  // Home mappings first; extend as needed for other pages
  if (page === 'home') {
    const c = App.config?.home || {};
    layout.forEach(b => {
      const t = (b.type || '').toLowerCase();
      const key = (b.data && b.data.key) || '';
      let sec = null;
      if (t === 'header') { /* header already built */ }
      else if (t === 'image' && (key === 'hero' || key === 'brand')) { sec = makeHeroSection(c) || makeBrandSection(c); }
      else if (t === 'image' && key === 'imageTextBlocks') { sec = makeImageTextBlocksSection(c); }
      else if (t === 'image' && key === 'carousel') { sec = makeCarouselSection(c); }
      else if (t === 'text') { sec = makeBulletedListSection(c); }
      else if (t === 'footer') { /* footer is handled separately */ }
      if (sec) frag.appendChild(sec);
    });
  }
  if (frag.childNodes.length) {
    App.el.main.innerHTML = ''; App.el.main.appendChild(frag); return true;
  }
  return false;
}

// =============================
// App init: load config, build UI, bind events
// =============================
async function init() {
  App.el.main = document.getElementById('main-content');
  App.el.navMenu = document.querySelector('.nav-menu');
  App.el.footerLinksList = document.getElementById('footer-links-list');
  App.el.footerSocial = document.getElementById('footer-social');
  App.el.businessInfo = document.getElementById('business-info');
  App.el.footerBadges = document.getElementById('footer-badges-bottom');

  try {

    const res = await fetch('config.json', { cache: 'no-store' });
    App.config = await res.json();
  } catch (e) {
    console.error('Failed to load config.json', e);
    if (App.el.main) App.el.main.innerHTML = '<p class="error">Failed to load configuration.</p>';
    return;
  }

  applyTheme(App.config.site?.theme);
  applyStyles(App.config.site?.styles);
  buildHeader();
  buildMenu();
  buildFooter();

  setBodyOffset();
  updateMobileContactStrip();
  window.addEventListener('resize', setBodyOffset);
  window.addEventListener('resize', updateMobileContactStrip);

  window.addEventListener('hashchange', route);
  route();
  App.hasLoaded = true;
}

// =============================
// Header: Build primary navigation (desktop + mobile)
// =============================
function buildMenu() {
  const cfg = App.config?.header || {};
  const items = Array.isArray(cfg.menu) && cfg.menu.length
    ? cfg.menu.filter(m => boolYN(m.visible) && (!m.hash || isPageEnabled(hashToRoute(m.hash))))
    : [
        { text: 'Home', hash: '#/home' },
        { text: 'Home 2', hash: '#/home2' },
        { text: 'Products', hash: '#/products' },
        { text: 'Contact', hash: '#/contact' },
        { text: 'Testimonials', hash: '#/testimonials' },
      ];
  if (App.el.navMenu) {
    App.el.navMenu.innerHTML = '';
    items.forEach(it => {
      const li = el('li');
      const a = el('a');
      a.href = it.hash || '#';
      a.textContent = it.text || '';
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href') || '';
        if (href.includes('#/')) { e.preventDefault(); navigateToHash(href.slice(href.indexOf('#/'))); closeMobileMenu(); }
      });
      li.appendChild(a);
      App.el.navMenu.appendChild(li);
    });
  }
  const btn = document.querySelector('.mobile-menu-toggle');
  const nav = document.getElementById('primary-navigation');
  function openMobileMenu() { if (!btn || !nav) return; btn.setAttribute('aria-expanded','true'); nav.classList.add('open'); document.body.classList.add('menu-open'); }
  function closeMobileMenu() { if (!btn || !nav) return; btn.setAttribute('aria-expanded','false'); nav.classList.remove('open'); document.body.classList.remove('menu-open'); }
  if (btn && nav) {
    btn.addEventListener('click', (e) => { e.preventDefault(); const exp = btn.getAttribute('aria-expanded') === 'true'; exp ? closeMobileMenu() : openMobileMenu(); });
    window.addEventListener('hashchange', closeMobileMenu);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });
  }
  // expose close for click handler
  function closeMobileMenu(){ if (!btn || !nav) return; btn.setAttribute('aria-expanded','false'); nav.classList.remove('open'); document.body.classList.remove('menu-open'); }
}

// =============================
// Header: logo, social icons, and optional top banner
// =============================
function buildHeader() {
  const { header = {}, site = {} } = App.config || {};

  const logoImg = document.getElementById('site-logo');
  if (logoImg && header.logo) logoImg.src = header.logo;

  // Render contact rows (top for mobile, bottom for desktop) from config
  try {
    const contact = (App.config && App.config.contact) || {};
    const card = contact.card || {};
    const email = card.email || (Array.isArray(contact.emailRecipients) ? contact.emailRecipients[0] : '');
    const phone = card.phone || '';
    const emailVisible = String(card.emailVisible || 'N').toUpperCase() === 'Y';
    const phoneVisible = String(card.phoneVisible || 'N').toUpperCase() === 'Y';
    const makeHtml = () => {
      const parts = [];
      if (emailVisible && email) parts.push(`<span><i class="fas fa-envelope"></i> <a href="mailto:${email}">${email}</a></span>`);
      if (phoneVisible && phone) parts.push(`<span><i class="fas fa-phone"></i> <a href="tel:${phone.replace(/[^+\d]/g,'')}">${phone}</a></span>`);
      return parts.join(' ');
    };
    const topRow = document.querySelector('.header-contact-top');
    if (topRow) topRow.innerHTML = makeHtml();
    const bottomRow = document.querySelector('.header-contact-bottom');
    if (bottomRow) bottomRow.innerHTML = makeHtml();
  } catch (_) {}

  const topContainer = document.querySelector('.header-top .container');
  if (topContainer && header.banner) {
    let banner = topContainer.querySelector('.header-banner');
    if (!banner) { banner = document.createElement('img'); banner.className = 'header-banner'; topContainer.appendChild(banner); }
    banner.src = header.banner;
    banner.alt = site.title ? `${site.title} banner` : 'Banner';
  }
}

// =============================
// Footer: links, social icons, business info, badges
// =============================
function buildFooter() {
  const { footer = {}, header = {} } = App.config || {};

  if (App.el.footerLinksList) {
    App.el.footerLinksList.innerHTML = '';
    (footer.links || []).slice(0, 25).forEach(l => {
      const isVisible = boolYN(l.visible);
      const li = el('li');
      li.classList.add(isVisible ? 'visibility-visible' : 'visibility-hidden');
      li.setAttribute('data-visible', isVisible ? 'Y' : 'N');
      const a = el('a'); a.href = l.url || '#'; a.textContent = l.text || 'Link';
      li.appendChild(a);
      App.el.footerLinksList.appendChild(li);
    });
  }

  // Render social icons in footer (use header.socialMedia config)
  if (App.el.footerSocial && Array.isArray(header.socialMedia)) {
    App.el.footerSocial.innerHTML = '';
    const defaultSize = header.socialIconSize;
    header.socialMedia.slice(0, 10).forEach(s => {
      const isVisible = boolYN(s.visible);
      const a = el('a', 'footer-social-link');
      a.classList.add(isVisible ? 'visibility-visible' : 'visibility-hidden');
      a.setAttribute('data-visible', isVisible ? 'Y' : 'N');
      a.href = s.url || '#'; a.target = '_blank'; a.rel = 'noopener noreferrer';
      const img = el('img');
      if (s.icon) { img.src = s.icon; img.alt = s.name || 'social'; }
      const w = s.width != null ? s.width : defaultSize;
      const h = s.height != null ? s.height : defaultSize;
      const cssW = toCssSize(w);
      const cssH = toCssSize(h);
      if (cssW != null) img.style.width = cssW;
      if (cssH != null) img.style.height = cssH;
      const pad = App.config?.site?.styles?.header?.socialIconPadding;
      if (pad) img.style.padding = pad;
      a.appendChild(img);
      App.el.footerSocial.appendChild(a);
    });
  }

  if (App.el.businessInfo) {
    const bi = footer.businessInfo || {};
    const parts = [];
    if (bi.name) parts.push(`<strong>${bi.name}</strong>`);
    if (bi.address) parts.push(`<div>${bi.address}</div>`);
    if (bi.phone) parts.push(`<div>${bi.phone}</div>`);
    if (bi.email) parts.push(`<div>${bi.email}</div>`);
    App.el.businessInfo.innerHTML = parts.join('');
  }

  if (App.el.footerBadges) {
    App.el.footerBadges.innerHTML = '';
    const badgeDefault = footer.badgeSize; // e.g., '90px'
    (footer.badges || []).forEach(b => {
      const isVisible = boolYN(b.visible);
      const img = el('img');
      img.classList.add(isVisible ? 'visibility-visible' : 'visibility-hidden');
      img.setAttribute('data-visible', isVisible ? 'Y' : 'N');
      img.src = b.image; img.alt = b.alt || '';
      // Prefer per-item size; otherwise, fall back to footer.badgeSize
      const w = b.width != null ? b.width : badgeDefault;
      const h = b.height != null ? b.height : badgeDefault;
      const cssW = toCssSize(w);
      const cssH = toCssSize(h);
      if (cssW != null) img.style.width = cssW;
      if (cssH != null) img.style.height = cssH;
      App.el.footerBadges.appendChild(img);
    });
  }
}

// =============================
// Breadcrumbs: show Home / Current page
// =============================
function buildBreadcrumbs(page) {
  const show = boolYN(App.config?.header?.breadcrumbs);
  const wrap = document.querySelector('.breadcrumbs-wrap');
  const nav = document.getElementById('breadcrumbs');
  if (!wrap || !nav) return;
  wrap.style.display = show ? '' : 'none';
  if (!show) { nav.innerHTML = ''; return; }
  const parts = [];
  const aHome = el('a'); aHome.href = '#/home'; aHome.textContent = 'Home';
  parts.push(aHome);
  if (page && page !== 'home') {
    const sep = el('span', 'crumb-sep', 'â€º');
    parts.push(sep);
    const span = el('span', 'crumb-current', titleCase(page));
    parts.push(span);
  }
  nav.innerHTML = '';
  parts.forEach(p => nav.appendChild(p));
}
function titleCase(s) { return (s || '').replace(/(^|\b)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase()); }
// =============================
// Router: render page by current hash and update UI state
// =============================
function route() {
  const hash = location.hash || '#/home';
  const routeName = hashToRoute(hash);
  const page = isPageEnabled(routeName) ? routeName : firstEnabledPage() || 'home';
  // highlight active menu link
  document.querySelectorAll('.nav-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === `#/${page}`);
  });
  buildBreadcrumbs(page);

  // Prefer admin-provided layout if present
  if (!(renderByLayout(page))) {
    switch (page) {
      case 'home': renderHome(); break;
      case 'home2': renderHome2(); break;
      case 'products': renderProducts(); break;
      case 'contact': renderContact(); break;
      case 'testimonials': renderTestimonials(); break;
      default: renderHome();
    }
  }

  if (App.hasLoaded && App.el.main && typeof App.el.main.focus === 'function') {
    try { App.el.main.focus({ preventScroll: true }); } catch (_) { App.el.main.focus(); }
  }

  setBodyOffset();
  updateMobileContactStrip();
}

// =============================
// Page: Home
// =============================
function renderHome() {
  const c = App.config?.home || {};
  const frag = document.createDocumentFragment();

  const heroSrc = (c.hero && c.hero.image) ? c.hero.image
                : (c.banner && c.banner.image) ? c.banner.image
                : 'assets/images/header-banner.jpg';
  const heroAlt = (c.hero && c.hero.alt) ? c.hero.alt
                : (c.banner && c.banner.alt) ? c.banner.alt
                : 'Homepage banner';
  if (heroSrc) {
    const hero = el('section', 'home-hero');
    // Set overlay variables on section to ensure immediate effect
    try {
      const hs = App.config?.site?.styles?.home || {};
      const overlayOn = String(hs.heroOverlayEnabled || 'Y').toUpperCase() === 'Y';
      if (overlayOn) {
        const c = hs.heroOverlayColor || '#000000';
        const o = hs.heroOverlayOpacity != null ? Math.max(0, Math.min(1, Number(hs.heroOverlayOpacity))) : 0;
        hero.style.setProperty('--hero-overlay-color', c);
        hero.style.setProperty('--hero-overlay-opacity', String(o));
        if (hs.heroOverlayBlur) hero.style.setProperty('--hero-overlay-blur', hs.heroOverlayBlur);
        if (hs.heroOverlayBlendMode) hero.style.setProperty('--hero-overlay-blend', hs.heroOverlayBlendMode);
      } else {
        hero.style.setProperty('--hero-overlay-opacity', '0');
        hero.style.setProperty('--hero-overlay-blur', 'none');
        hero.style.setProperty('--hero-overlay-blend', 'normal');
      }
    } catch (_) {}
    const heroImg = el('img');
    heroImg.src = normalizeMediaPath(heroSrc);
    heroImg.alt = heroAlt;
    // Apply pixel height from config.site.styles.home.heroHeight
    const heroH = App.config?.site?.styles?.home?.heroHeight;
    const cssHeroH = toCssPx(heroH);
    if (cssHeroH) heroImg.style.height = cssHeroH;
    // Add centered hero text overlays (above overlay)
    try {
      const hs = App.config?.site?.styles?.home || {};
      const text1 = hs.heroText1 || {};
      const text2 = hs.heroText2 || {};
      if (text1.text || text2.text) {
        const textWrap = el('div', 'hero-text');
        const inner = el('div', 'hero-text-inner');
        const makeLine = (cfg) => {
          if (!cfg || !cfg.text) return null;
          const line = el('div');
          line.textContent = cfg.text;
          if (cfg.fontSize) line.style.fontSize = cfg.fontSize;
          if (cfg.color) line.style.color = cfg.color;
          if (String(cfg.bold).toUpperCase() === 'Y') line.style.fontWeight = '700';
          if (String(cfg.italic).toUpperCase() === 'Y') line.style.fontStyle = 'italic';
          return line;
        };
        const l1 = makeLine(text1);
        const l2 = makeLine(text2);
        if (l1) inner.appendChild(l1);
        if (l2) inner.appendChild(l2);
        textWrap.appendChild(inner);
        hero.appendChild(textWrap);
      }
    } catch (_) {}
    // Apply hero scaling/fit/aspect options
    try {
      const homeStyles = App.config?.site?.styles?.home || {};
      const scale = String(homeStyles.heroScale || 'Y').toUpperCase() === 'Y';
      const maintain = String(homeStyles.heroMaintainAspect || 'Y').toUpperCase() === 'Y';
      const fitRaw = String(homeStyles.heroFit || 'cover').toLowerCase();
      const fitMap = { fit: 'contain', cover: 'cover', contain: 'contain', stretch: 'fill', fill: 'fill', none: 'none', 'scale-down': 'scale-down', scaledown: 'scale-down' };
      let fit = fitMap[fitRaw] || 'cover';
      if (!scale) fit = 'none';
      if (scale && !maintain) fit = 'fill';
      heroImg.style.objectFit = fit;
      heroImg.style.objectPosition = 'left top';
    } catch (_) {}
    hero.appendChild(heroImg);
    frag.appendChild(hero);
  } else if (c.hero && c.hero.visible === 'Y') {
    frag.appendChild(el('section', 'home-hero'));
  }

  if (boolYN(c.brandSection?.visible)) {
    const s = el('section', 'home-brand');
    const titleRaw = c.brandSection.title || App.config?.site?.title || 'SARA Brothers';
    const firstLine = String(titleRaw).split(/<br\s*\/?/i)[0] || titleRaw;
    s.appendChild(el('h1', 'brand-title', firstLine));
    if (c.brandSection.text) s.appendChild(el('p', '', c.brandSection.text));
    if (c.brandSection.cta?.visible === 'Y' && c.brandSection.cta?.text) {
      const btn = el('button', 'btn btn-primary');
      btn.textContent = c.brandSection.cta.text;
      s.appendChild(btn);
    }
    frag.appendChild(s);
  }

  if (boolYN(c.bulletedList?.visible)) {
    const s = el('section', 'home-bullets');
    if (Array.isArray(c.bulletedList.items)) {
      const ul = el('ul');
      c.bulletedList.items.forEach(it => ul.appendChild(el('li', '', it)));
      s.appendChild(ul);
    }
    frag.appendChild(s);
  }

  if (boolYN(c.imageTextBlocks?.visible)) {
    const s = el('section', 'home-alt-blocks');
    (c.imageTextBlocks.items || []).slice(0, 10).forEach((blk) => {
      const pos = String(blk.position || 'left').toLowerCase();
      const isRight = pos.includes('right');
      const isTop = pos.includes('top');
      const row = el('div', `alt-row ${isRight ? 'image-right' : 'image-left'} ${isTop ? 'top-align' : ''}`);
      const img = el('img'); img.src = blk.image || ''; img.alt = blk.title || '';
      const w = toCssSize(blk.width);
      const h = toCssPx(blk.height);
      if (w) img.style.width = w;
      if (h) img.style.height = h;
      const txt = el('div', 'alt-text');
      txt.appendChild(el('h3', '', blk.title || ''));
      if (blk.text) txt.appendChild(el('p', '', blk.text));
      row.appendChild(img); row.appendChild(txt); s.appendChild(row);
    });
    frag.appendChild(s);
  }

  if (boolYN(c.carousel?.visible)) {
    const s = el('section', 'home-carousel');
    const track = el('div', 'carousel-track');
    const carouselItems = (c.carousel.items || []).slice(0, 15);
    const mediaH = c.carousel.mediaHeight;
    const mediaW = c.carousel.mediaWidth;
    const cssMediaH = toCssPx(mediaH);
    const cssMediaW = toCssSize(mediaW);
    carouselItems.forEach(item => {
      const card = el('div', 'carousel-card');
      if (item.type === 'video') {
        const video = el('video');
        if (item.poster) video.poster = normalizeMediaPath(item.poster);
        if (item.autoplay) { video.autoplay = true; video.muted = !!item.muted; video.loop = true; }
        video.controls = true; video.src = normalizeMediaPath(item.video || item.src || '');
        if (cssMediaH) video.style.height = cssMediaH;
        if (cssMediaW) video.style.width = cssMediaW;
        card.appendChild(video);
      } else {
        const img = el('img'); img.src = normalizeMediaPath(item.image || item.src || ''); img.alt = item.text || '';
        if (cssMediaH) img.style.height = cssMediaH;
        if (cssMediaW) img.style.width = cssMediaW;
        card.appendChild(img);
      }
      if (item.text) card.appendChild(el('div', 'carousel-text', item.text));
      if (item.link) { const a = el('a', 'carousel-link', 'Learn more'); a.href = item.link; card.appendChild(a); }
      track.appendChild(card);
    });
    s.appendChild(track);

    const vids = Array.from(track.querySelectorAll('video'));
    if (vids.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(ent => {
          const v = ent.target;
          if (ent.isIntersecting && ent.intersectionRatio > 0.5) v.play().catch(()=>{});
          else v.pause();
        });
      }, { threshold: [0, 0.5, 1] });
      vids.forEach(v => io.observe(v));
    }
    frag.appendChild(s);
  }

  App.el.main.innerHTML = '';
  App.el.main.appendChild(frag);
}

// =============================
// Page: Home 2 (vertical selector + rich content)
// =============================
function renderHome2() {
  const cfg = App.config?.home2 || {};
  const items = Array.isArray(cfg.items) ? cfg.items.slice(0, 6) : [];
  const frag = document.createDocumentFragment();

  // Prepend same hero, brand section, and bulleted list as Home
  try {
    const homeC = App.config?.home || {};
    const hero = makeHeroSection(homeC);
    if (hero) frag.appendChild(hero);
    const brand = makeBrandSection(homeC);
    if (brand) frag.appendChild(brand);
    const bullets = makeBulletedListSection(homeC);
    if (bullets) frag.appendChild(bullets);
  } catch (_) {}

  const s = el('section', 'home2-page');
  s.appendChild(el('h2', '', cfg.title || 'Home 2'));

  // Vertical image list and content panel
  const list = el('div', 'home2-list');
  const content = el('div', 'home2-content');

  function applyTextStyles(elm, part) {
    if (!elm || !part) return;
    if (part.fontSize) elm.style.fontSize = part.fontSize;
    if (String(part.bold).toUpperCase() === 'Y') elm.style.fontWeight = '700';
    if (String(part.italic).toUpperCase() === 'Y') elm.style.fontStyle = 'italic';
    if (String(part.underline).toUpperCase() === 'Y') elm.style.textDecoration = (elm.style.textDecoration ? elm.style.textDecoration + ' ' : '') + 'underline';
  }

  function renderContent(idx) {
    const it = items[idx];
    content.innerHTML = '';
    if (!it || !it.content) return;
    const c = it.content;
    if (String(c.header?.visible || 'Y').toUpperCase() === 'Y' && c.header?.text) {
      const h = el('h3', 'home2-header', c.header.text);
      applyTextStyles(h, c.header);
      content.appendChild(h);
    }
    if (String(c.subHeader?.visible || 'Y').toUpperCase() === 'Y' && c.subHeader?.text) {
      const sh = el('div', 'home2-subheader', c.subHeader.text);
      applyTextStyles(sh, c.subHeader);
      content.appendChild(sh);
    }
    if (String(c.paragraph1?.visible || 'Y').toUpperCase() === 'Y' && c.paragraph1?.text) {
      const p1 = el('p', 'home2-p', c.paragraph1.text);
      applyTextStyles(p1, c.paragraph1);
      content.appendChild(p1);
    }
    if (String(c.bullets?.visible || 'Y').toUpperCase() === 'Y' && Array.isArray(c.bullets?.items)) {
      const ul = el('ul', 'home2-bullets');
      c.bullets.items.forEach(t => {
        const li = el('li', '', t);
        applyTextStyles(li, c.bullets);
        ul.appendChild(li);
      });
      content.appendChild(ul);
    }
    if (String(c.paragraph2?.visible || 'Y').toUpperCase() === 'Y' && c.paragraph2?.text) {
      const p2 = el('p', 'home2-p', c.paragraph2.text);
      applyTextStyles(p2, c.paragraph2);
      content.appendChild(p2);
    }
  }

  let selected = 0;
  items.forEach((it, idx) => {
    const btn = el('button', 'home2-item');
    btn.type = 'button';
    const img = el('img');
    img.src = normalizeMediaPath(it.image || '');
    img.alt = it.alt || it.title || `Item ${idx + 1}`;
    btn.appendChild(img);
    const label = el('div', 'home2-item-label', it.title || `Item ${idx + 1}`);
    if (String(it.bold).toUpperCase() === 'Y') label.style.fontWeight = '700';
    btn.appendChild(label);
    btn.addEventListener('click', () => {
      selected = idx;
      list.querySelectorAll('.home2-item').forEach((b, i) => b.classList.toggle('selected', i === selected));
      renderContent(selected);
    });
    list.appendChild(btn);
  });

  // Default selection
  if (list.firstChild) list.firstChild.classList.add('selected');
  renderContent(selected);

  s.appendChild(list);
  s.appendChild(content);
  frag.appendChild(s);
  App.el.main.innerHTML = '';
  App.el.main.appendChild(frag);
}

// =============================
// Component: Gallery Modal (Images / Videos tabs, zoom/pan, keyboard)
// =============================
function openGalleryModal(items, startIndex = 0, title = 'Gallery', rightContent = []) {
  const overlay = document.createElement('div');
  overlay.className = 'gallery-modal';
  overlay.innerHTML = `
    <div class="gm-backdrop"></div>
    <div class="gm-dialog" role="dialog" aria-label="${(title||'Gallery').replace(/"/g,'&quot;')}" aria-modal="true">
      <button class="gm-close" aria-label="Close">&times;</button>
      <div class="gm-tabs" role="tablist">
        <button class="gm-tab gm-tab-images" role="tab" aria-selected="true" data-tab="images">Images</button>
        <button class="gm-tab gm-tab-videos" role="tab" aria-selected="false" data-tab="videos">Videos</button>
      </div>
      <div class="gm-thumbs"></div>
      <div class="gm-counter" aria-live="polite"></div>
      <div class="gm-hint">Esc to close &bull; &larr; &rarr; to navigate &bull; Click image to advance</div>
      <div class="gm-body">
        <div class="gm-main">
          <button class="gm-nav gm-prev" aria-label="Previous">&lsaquo;</button>
          <div class="gm-stage"></div>
          <button class="gm-nav gm-next" aria-label="Next">&rsaquo;</button>
          <div class="gm-zoombar">
            <button class="gm-zoom gm-zoom-in" aria-label="Zoom in">+</button>
            <button class="gm-zoom gm-zoom-out" aria-label="Zoom out">&minus;</button>
            <button class="gm-fullscreen" aria-label="Fullscreen">&#x2922;</button>
          </div>
        </div>
        <aside class="gm-info">
          <h3 class="gm-title">${(title||'').replace(/</g,'&lt;')}</h3>
          <div class="gm-info-content">
            ${typeof rightContent === 'string' && rightContent.trim() ? `<div class="gm-rich">${rightContent}</div>`
              : (Array.isArray(rightContent) && rightContent.length ? `<ul class="gm-bullets">${rightContent.map(b=>`<li>${String(b).replace(/</g,'&lt;')}</li>`).join('')}</ul>` : '')}
            <div class="gm-notes" contenteditable="true" aria-label="Notes" data-placeholder="Type notes here..."></div>
          </div>
        </aside>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  const thumbsWrap = overlay.querySelector('.gm-thumbs');
  const mainWrap = overlay.querySelector('.gm-stage');
  const closeBtn = overlay.querySelector('.gm-close');
  const prevBtn = overlay.querySelector('.gm-prev');
  const nextBtn = overlay.querySelector('.gm-next');
  const counterEl = overlay.querySelector('.gm-counter');
  const zoomInBtn = overlay.querySelector('.gm-zoom-in');
  const zoomOutBtn = overlay.querySelector('.gm-zoom-out');
  const zoomBar = overlay.querySelector('.gm-zoombar');
  const fsBtn = overlay.querySelector('.gm-fullscreen');
  const tabs = overlay.querySelectorAll('.gm-tab');
  // Mobile: tap media to toggle fullscreen
  try {
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 980px)').matches;
    if (isMobile && mainWrap) {
      mainWrap.addEventListener('click', async (e) => {
        // Do not treat as next/prev on mobile; use as fullscreen toggle
        e.preventDefault(); e.stopPropagation();
        const doc = document;
        const el = overlay.querySelector('.gm-dialog') || mainWrap;
        try {
          if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement) {
            if (doc.exitFullscreen) await doc.exitFullscreen();
            else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
            else if (doc.msExitFullscreen) doc.msExitFullscreen();
          } else {
            if (el.requestFullscreen) await el.requestFullscreen();
            else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
            else if (el.msRequestFullscreen) el.msRequestFullscreen();
          }
        } catch (_) {}
      }, { passive: false });
    }
  } catch (_) {}
  let activeTab = 'images';
  const allImages = items.filter(it => it.type !== 'video');
  const allVideos = items.filter(it => it.type === 'video');
  function currentList() { return activeTab === 'videos' ? allVideos : allImages; }
  // Map overall startIndex to appropriate tab/index
  let overallIndex = Math.min(Math.max(0, startIndex|0), Math.max(0, items.length-1));
  let startItem = items[overallIndex];
  if (startItem && startItem.type === 'video') {
    activeTab = 'videos';
  }
  let currentIndex = 0;
  if (startItem) {
    if (startItem.type === 'video') {
      const idx = allVideos.indexOf(startItem);
      currentIndex = Math.max(0, idx);
    } else {
      const idx = allImages.indexOf(startItem);
      currentIndex = Math.max(0, idx);
    }
  }
  let zoomScale = 1;
  let panX = 0, panY = 0;
  let isPanning = false;
  let startX = 0, startY = 0;
  let didPanRecently = false;
  let lastMouseX = 0, lastMouseY = 0;
  const ZOOM_MIN = 1, ZOOM_MAX = 3, ZOOM_STEP = 0.25;

  function applyZoom() {
    const img = mainWrap.querySelector('img.gm-image');
    if (!img) return;
    img.style.transform = `translate(${panX}px, ${panY}px) scale(${zoomScale})`;
    img.style.transformOrigin = 'center center';
    img.style.willChange = 'transform';
    img.style.cursor = zoomScale > 1 ? 'grab' : 'default';
  }
  function renderThumbs() {
    const list = currentList();
    thumbsWrap.innerHTML = list.map((it, i) => {
      const isVideo = it.type === 'video';
      const thumbImg = isVideo ? (it.poster ? normalizeMediaPath(it.poster) : null) : normalizeMediaPath(it.src || it.image || '');
      const inner = thumbImg ? `<img src="${thumbImg}" alt="thumb ${i+1}" loading="lazy" decoding="async"/>` : '<span class="gm-thumb-video">&#9658;</span>';
      return `\n        <button class="gm-thumb${i===currentIndex?' active':''}" data-idx="${i}">\n          ${inner}\n        </button>\n      `;
    }).join('');
    thumbsWrap.querySelectorAll('.gm-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10) || 0;
        show(idx);
      });
    });
    thumbsWrap.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });
  }
  function show(idx) {
    const list = currentList();
    currentIndex = Math.min(Math.max(0, idx|0), Math.max(0, list.length-1));
    const it = list[currentIndex];
    if (!it) return;
    const isVideoCurrent = it.type === 'video';
    if (isVideoCurrent) {
      const src = normalizeMediaPath(it.src || '');
      const poster = it.poster ? normalizeMediaPath(it.poster) : '';
      const autoplay = !!it.autoplay;
      const muted = it.muted !== undefined ? !!it.muted : autoplay;
      mainWrap.innerHTML = `<video class="gm-video" controls ${autoplay ? 'autoplay' : ''} ${muted ? 'muted' : ''} preload="metadata" ${poster ? `poster="${poster}"` : ''} src="${src}"></video>`;
      const v = mainWrap.querySelector('video'); if (autoplay) { v.play().catch(()=>{}); }
      if (zoomBar) zoomBar.style.display = 'none';
    } else {
      const src = normalizeMediaPath(it.src || it.image || '');
      mainWrap.innerHTML = `<img class=\"gm-image\" src=\"${src}\" alt=\"${(title||'Image').replace(/"/g,'&quot;')}\" fetchpriority=\"high\" decoding=\"async\"/>`;
      if (zoomBar) zoomBar.style.display = '';
    }
    thumbsWrap.querySelectorAll('.gm-thumb').forEach((b,i)=>{ b.classList.toggle('active', i===currentIndex); });
    const total = list.length;
    const label = activeTab === 'videos' ? 'Video' : 'Image';
    if (counterEl) counterEl.textContent = `${label} ${currentIndex+1} of ${total}`;
  }
  function close() { document.body.style.overflow = ''; overlay.remove(); document.removeEventListener('keydown', onKey); }
  function onKey(e) { if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') { e.preventDefault(); show(currentIndex-1); } if (e.key === 'ArrowRight') { e.preventDefault(); show(currentIndex+1); } }
  overlay.querySelector('.gm-backdrop').addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  prevBtn.addEventListener('click', ()=> show(currentIndex-1));
  nextBtn.addEventListener('click', ()=> show(currentIndex+1));
  if (fsBtn) fsBtn.addEventListener('click', () => {
    const media = overlay.querySelector('.gm-video') || overlay.querySelector('.gm-image');
    const target = media || overlay.querySelector('.gm-dialog');
    if (!target) return;
    const req = target.requestFullscreen || target.webkitRequestFullscreen || target.msRequestFullscreen || target.mozRequestFullScreen;
    if (req) { try { req.call(target); } catch (_) {} }
  });
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      if (!tabName || tabName === activeTab) return;
      activeTab = tabName;
      tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
      currentIndex = 0;
      renderThumbs();
      show(0);
    });
  });
  // Initialize tabs aria-selected based on activeTab
  tabs.forEach(t => {
    const n = t.getAttribute('data-tab');
    t.setAttribute('aria-selected', n === activeTab ? 'true' : 'false');
  });
  if (zoomInBtn) zoomInBtn.addEventListener('click', (e)=>{ e.preventDefault(); zoomScale = Math.min(ZOOM_MAX, zoomScale + ZOOM_STEP); applyZoom(); });
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', (e)=>{ e.preventDefault(); zoomScale = Math.max(ZOOM_MIN, zoomScale - ZOOM_STEP); if (zoomScale === ZOOM_MIN) { panX = 0; panY = 0; } applyZoom(); });

  mainWrap.addEventListener('mousedown', (e) => {
    const img = mainWrap.querySelector('img.gm-image');
    if (!img || zoomScale <= 1) return;
    isPanning = true; startX = e.clientX - panX; startY = e.clientY - panY; img.style.cursor = 'grabbing'; e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return; const img = mainWrap.querySelector('img.gm-image'); if (!img) return;
    panX = e.clientX - startX; panY = e.clientY - startY;
    const dx = e.clientX - lastMouseX; const dy = e.clientY - lastMouseY; if (Math.hypot(dx, dy) > 3) didPanRecently = true; lastMouseX = e.clientX; lastMouseY = e.clientY;
    applyZoom();
  });
  window.addEventListener('mouseup', () => { if (!isPanning) return; isPanning = false; const img = mainWrap.querySelector('img.gm-image'); if (img) img.style.cursor = zoomScale > 1 ? 'grab' : 'default'; setTimeout(() => { didPanRecently = false; }, 50); });
  overlay.querySelector('.gm-stage').addEventListener('click', () => {
    const isVideoCurrent = !!overlay.querySelector('.gm-video');
    if (isVideoCurrent) return;
    if (zoomScale > 1 || didPanRecently) return;
    show(currentIndex+1);
  });

  let touchStartX = null;
  overlay.querySelector('.gm-stage').addEventListener('touchstart', (e) => { touchStartX = (e.touches && e.touches[0]?.clientX) || null; }, { passive: true });
  overlay.querySelector('.gm-stage').addEventListener('touchend', (e) => {
    if (touchStartX == null) return;
    const x = (e.changedTouches && e.changedTouches[0]?.clientX) || touchStartX;
    const delta = x - touchStartX; const threshold = 40;
    if (delta > threshold) show(currentIndex-1);
    if (delta < -threshold) show(currentIndex+1);
    touchStartX = null;
  });
  renderThumbs(); show(currentIndex);
  const dlg = overlay.querySelector('.gm-dialog'); dlg.setAttribute('tabindex', '-1'); dlg.focus();
}
// =============================
// Page: Products (search, gallery, bullets, buy buttons)
// =============================
function renderProducts() {
  const pc = App.config.products || {};
  const allItems = Array.isArray(pc.items) ? pc.items.slice() : [];
  const frag = document.createDocumentFragment();

  if (typeof pc.desktopThumbs === 'string') {
    const pos = pc.desktopThumbs.toLowerCase();
    if (pos === 'bottom') document.body.setAttribute('data-desktop-thumbs', 'bottom');
    else document.body.removeAttribute('data-desktop-thumbs');
  }

  const pageWrap = el('section', 'products-page');

  const searchWrap = el('div', 'product-search');
  const searchInput = document.createElement('input'); searchInput.type = 'search'; searchInput.placeholder = 'Search products...'; searchInput.setAttribute('aria-label', 'Search products');
  const searchBtn = el('button', 'btn', 'Search'); searchBtn.type = 'button';
  searchWrap.appendChild(searchInput); searchWrap.appendChild(searchBtn); pageWrap.appendChild(searchWrap);

  const listWrap = el('div', 'products-list'); pageWrap.appendChild(listWrap);

  function matches(p, q) {
    if (!q) return true;
    const t = (p.title || '').toLowerCase();
    const d = (p.descriptionHtml || '').replace(/<[^>]+>/g, '').toLowerCase();
    const b = (Array.isArray(p.bullets) ? p.bullets.join(' ') : '').toLowerCase();
    return t.includes(q) || d.includes(q) || b.includes(q);
  }

  function renderList(items) {
    listWrap.innerHTML = '';
    if (!items.length) { listWrap.appendChild(el('p', 'text-muted', 'No products match your search.')); return; }
    items.forEach((p) => {
      if (!boolYN(p.visible)) return;
      const block = el('section', 'product-block');
      const grid = el('div', 'product-grid');

      const titleWrap = document.createDocumentFragment();
      const titleEl = el('h2', 'product-title', p.title || 'Product');
      titleWrap.appendChild(titleEl);
      if (p.subtitle) titleWrap.appendChild(el('div', 'product-subtitle', p.subtitle));
      block.appendChild(titleWrap);

      const gallery = el('div', 'product-gallery');
      const thumbs = el('div', 'thumbs');
      const main = el('div', 'main-media');
      const mainMedia = el('img', 'main-image');
      const mainVideo = el('video', 'main-video'); mainVideo.controls = true; mainVideo.setAttribute('playsinline', ''); mainVideo.style.display = 'none';
      const enlargeBtn = el('button', 'media-enlarge', 'â¤¢'); enlargeBtn.type = 'button'; enlargeBtn.title = 'Fullscreen'; enlargeBtn.style.display = 'none';
      const setMain = (item) => {
        if (item.type === 'video') {
          mainMedia.style.display = 'none';
          mainVideo.src = normalizeMediaPath(item.src || '');
          mainVideo.poster = normalizeMediaPath(item.poster || '');
          mainVideo.style.display = '';
          enlargeBtn.style.display = '';
          if (item.autoplay) { mainVideo.autoplay = true; mainVideo.muted = !!item.muted; mainVideo.play().catch(()=>{}); }
        } else {
          mainVideo.style.display = 'none'; mainVideo.pause();
          mainMedia.src = normalizeMediaPath(item.src || '');
          mainMedia.alt = p.title || '';
          mainMedia.style.display = '';
          enlargeBtn.style.display = 'none';
        }
        currentMainIndex = Math.max(0, galleryItems.indexOf(item));
        currentMainType = item.type === 'video' ? 'video' : 'image';
      };
      const galleryItems = (p.gallery || []).slice();
      let currentMainIndex = -1;
      let currentMainType = 'image';
      function clearThumbs() { while (thumbs.firstChild) thumbs.removeChild(thumbs.firstChild); }
      function computeMobileMax() {
        const isMobile = window.matchMedia('(max-width: 980px)').matches; if (!isMobile) return null;
        // Try multiple fallbacks to get a reliable width on first render
        const rectW = thumbs.getBoundingClientRect().width || 0;
        const parentW = (thumbs.parentElement && thumbs.parentElement.getBoundingClientRect().width) || 0;
        const w = thumbs.clientWidth || rectW || parentW || window.innerWidth;
        return Math.max(1, Math.floor(w / 60));
      }
      function renderThumbsResponsive() {
        clearThumbs();
        if (galleryItems.length > 0 && galleryItems.length < 7) {
          thumbs.style.overflowX = 'auto';
          const imgs = galleryItems.filter(it => it.type !== 'video');
          const vids = galleryItems.filter(it => it.type === 'video');
          const videoItem = vids[0] || null;
          const extraVideos = Math.max(0, vids.length - (videoItem ? 1 : 0));
          // Render all images first
          imgs.forEach((item, idx) => {
            const t = el('button', 'thumb'); const img = el('img'); img.src = normalizeMediaPath(item.src || ''); img.width = pc.thumbnail?.width || 64; img.height = pc.thumbnail?.height || 64; img.loading = 'lazy'; img.decoding = 'async'; t.appendChild(img);
            t.addEventListener('click', () => setMain(item)); thumbs.appendChild(t); if (idx === 0 && !videoItem) setMain(item);
          });
          // Append video last
          if (videoItem) {
            const t = el('button', 'thumb'); t.classList.add('video');
            if (videoItem.poster) { const img = el('img'); img.src = normalizeMediaPath(videoItem.poster); img.alt = 'video'; img.width = pc.thumbnail?.width || 64; img.height = pc.thumbnail?.height || 64; img.loading = 'lazy'; img.decoding = 'async'; t.appendChild(img); } else { t.innerHTML = '<span class="thumb-video">â–¶</span>'; }
            if (extraVideos > 0) { t.setAttribute('data-more', `+${extraVideos}`); t.title = `+${extraVideos} more videos`; }
            t.addEventListener('click', () => setMain(videoItem)); thumbs.appendChild(t); if (!imgs.length) setMain(videoItem);
          }
          return;
        }
        thumbs.style.overflowX = '';
        const mobileMax = computeMobileMax();
        if (mobileMax) {
          const imgs = galleryItems.filter(it => it.type !== 'video');
          const vids = galleryItems.filter(it => it.type === 'video');
          const videoItem = vids[0] || null;
          // Mobile fixed layout overrides dynamic calc: 4 images, then +images, then video
          const shownImages = imgs.slice(0, 4);
          // Set main to first available item
          if (shownImages.length) setMain(shownImages[0]);
          else if (videoItem) setMain(videoItem);
          // Determine remaining separate counts
          const extraImages = Math.max(0, imgs.length - shownImages.length);
          const extraVideos = Math.max(0, vids.length - (videoItem ? 1 : 0));
          // Render images first
          shownImages.forEach((item, idx) => {
            const t = el('button', 'thumb');
            const img = el('img'); img.src = normalizeMediaPath(item.src || ''); img.width = pc.thumbnail?.width || 64; img.height = pc.thumbnail?.height || 64; img.loading = 'lazy'; img.decoding = 'async'; t.appendChild(img);
            t.addEventListener('click', () => setMain(item)); thumbs.appendChild(t); if (idx === 0 && !videoItem) setMain(item);
          });
          // If extra images, add +N (images) before video
          if (extraImages > 0) {
            const plusBtn = el('button', 'thumb plus'); plusBtn.title = `+${extraImages} more images`; plusBtn.setAttribute('data-more', `+${extraImages}`);
            plusBtn.addEventListener('click', (e) => { e.preventDefault(); openGalleryModal(galleryItems, 0, p.title || 'Gallery', (p.descriptionHtml && p.descriptionHtml.trim()) ? p.descriptionHtml : (p.bullets || [])); });
            thumbs.appendChild(plusBtn);
          }
          // Append video last if exists
          if (videoItem) {
            const t = el('button', 'thumb'); t.classList.add('video');
            if (videoItem.poster) { const img = el('img'); img.src = normalizeMediaPath(videoItem.poster); img.alt = 'video'; img.width = pc.thumbnail?.width || 64; img.height = pc.thumbnail?.height || 64; img.loading = 'lazy'; img.decoding = 'async'; t.appendChild(img); }
            else { t.innerHTML = '<span class=\"thumb-video\">â–¶</span>'; }
            if (extraVideos > 0) { t.setAttribute('data-more', `+${extraVideos}`); t.title = `+${extraVideos} more videos`; }
            t.addEventListener('click', () => setMain(videoItem)); thumbs.appendChild(t);
          }
          return;
        }
        const maxThumbs = 7;
        const imgs = galleryItems.filter(it => it.type !== 'video');
        const vids = galleryItems.filter(it => it.type === 'video');
        const videoItem = vids[0] || null;
        const slots = maxThumbs;
        const reservedForVideo = videoItem ? 1 : 0;
        const imagesToShow = Math.min(imgs.length, Math.max(0, slots - reservedForVideo));
        const shownImages = imgs.slice(0, imagesToShow);
        // main image
        if (shownImages.length) setMain(shownImages[0]); else if (videoItem) setMain(videoItem);
        // Render images first
        shownImages.forEach((item, idx) => { const t = el('button', 'thumb'); const img = el('img'); img.src = normalizeMediaPath(item.src || ''); img.width = pc.thumbnail?.width || 64; img.height = pc.thumbnail?.height || 64; img.loading = 'lazy'; img.decoding = 'async'; t.appendChild(img); t.addEventListener('click', () => setMain(item)); thumbs.appendChild(t); });
        const extraImages = Math.max(0, imgs.length - shownImages.length);
        const extraVideos = Math.max(0, vids.length - (videoItem ? 1 : 0));
        // If extra images, show +N before video
        if (extraImages > 0) { const plusBtn = el('button', 'thumb plus'); plusBtn.title = `+${extraImages} more images`; plusBtn.setAttribute('data-more', `+${extraImages}`); plusBtn.addEventListener('click', (e) => { e.preventDefault(); openGalleryModal(galleryItems, 0, p.title || 'Gallery', (p.descriptionHtml && p.descriptionHtml.trim()) ? p.descriptionHtml : (p.bullets || [])); }); thumbs.appendChild(plusBtn); }
        // Append video last
        if (videoItem) { const t = el('button', 'thumb'); t.classList.add('video'); if (videoItem.poster) { const img = el('img'); img.src = normalizeMediaPath(videoItem.poster); img.alt = 'video'; img.width = pc.thumbnail?.width || 64; img.height = pc.thumbnail?.height || 64; img.loading = 'lazy'; img.decoding = 'async'; t.appendChild(img); } else { t.innerHTML = '<span class="thumb-video">â–¶</span>'; } if (extraVideos > 0) { t.setAttribute('data-more', `+${extraVideos}`); t.title = `+${extraVideos} more videos`; } t.addEventListener('click', () => setMain(videoItem)); thumbs.appendChild(t); }
      }

      const headerLogo = App.config.header?.logo; const isMobile = window.matchMedia('(max-width: 980px)').matches; const thumbsAtBottomDesktop = document.body.getAttribute('data-desktop-thumbs') === 'bottom';
      if (headerLogo && !isMobile && !thumbsAtBottomDesktop) { const logoWrap = el('div', 'brand-logo'); const logoImg = el('img'); logoImg.src = headerLogo; logoImg.alt = App.config.site?.title || 'Brand'; logoWrap.appendChild(logoImg); thumbs.appendChild(logoWrap); }

      requestAnimationFrame(() => { renderThumbsResponsive(); window.addEventListener('resize', renderThumbsResponsive, { passive: true }); });
      main.addEventListener('click', (evt) => {
        if (evt.target && evt.target.closest && evt.target.closest('.media-enlarge')) return;
        if (!galleryItems.length) return;
        const startAt = Math.max(0, currentMainIndex || 0);
        openGalleryModal(galleryItems, startAt, p.title || 'Gallery', (p.descriptionHtml && p.descriptionHtml.trim()) ? p.descriptionHtml : (p.bullets || []));
      });
      enlargeBtn.addEventListener('click', async (e) => { e.stopPropagation(); try { if (mainVideo && mainVideo.src) { if (typeof mainVideo.webkitEnterFullscreen === 'function') { mainVideo.webkitEnterFullscreen(); return; } if (mainVideo.requestFullscreen) { await mainVideo.requestFullscreen(); try { await mainVideo.play(); } catch (_) {} return; } } } catch (_) {} const targetEl = main; try { if (targetEl.requestFullscreen) await targetEl.requestFullscreen(); else if (targetEl.webkitRequestFullscreen) targetEl.webkitRequestFullscreen(); else if (targetEl.msRequestFullscreen) targetEl.msRequestFullscreen(); } catch (_) {} });
      main.appendChild(mainMedia); main.appendChild(mainVideo); main.appendChild(enlargeBtn); gallery.appendChild(thumbs); gallery.appendChild(main);

      const right = el('div', 'product-info');
      if (Array.isArray(p.buyButtons)) { const wrap = el('div', 'buy-buttons'); p.buyButtons.slice(0, 4).forEach(btn => { if (!boolYN(btn.visible)) return; const a = el('a', 'btn btn-primary'); a.href = btn.url || '#'; a.target = '_blank'; a.rel = 'noopener'; if (btn.icon) { const img = el('img'); img.src = btn.icon; img.alt = btn.text || 'Buy'; img.className = 'btn-icon'; a.appendChild(img); a.appendChild(document.createTextNode(' ')); } a.appendChild(document.createTextNode(btn.text || 'Buy')); wrap.appendChild(a); }); right.appendChild(wrap); }
      if (p.descriptionHtml) { const desc = el('div', 'product-desc'); desc.innerHTML = p.descriptionHtml; right.appendChild(desc); }
      if (p.detailsHtml) { const details = el('div', 'product-details'); details.innerHTML = p.detailsHtml; right.appendChild(details); }

      grid.appendChild(gallery); grid.appendChild(right); block.appendChild(grid);
      if (p.bullets?.length) { const bullets = el('ul', 'product-bullets-wide'); p.bullets.slice(0, 20).forEach(b => bullets.appendChild(el('li', '', b))); block.appendChild(bullets); }
      listWrap.appendChild(block);
    });
  }

  function doSearch() { const q = (searchInput.value || '').trim().toLowerCase(); const filtered = allItems.filter(p => matches(p, q)); renderList(filtered); }
  searchInput.addEventListener('input', doSearch); searchBtn.addEventListener('click', doSearch);
  renderList(allItems);
  frag.appendChild(pageWrap); App.el.main.innerHTML = ''; App.el.main.appendChild(frag);
}

// =============================
// Page: Testimonials (localStorage-backed list)
// =============================
function renderTestimonials() {
  const cfg = App.config.testimonials || {};
  const frag = document.createDocumentFragment();
  const s = el('section', 'testimonials-page');
  s.appendChild(el('h2', '', 'User Testimonials'));

  const form = el('form', 'testimonial-form');
  const fields = cfg.form || {};
  function addField(name, f) {
    const wrap = el('label', 'form-field');
    const req = boolYN(f.required);
    const lbl = `${f.label || name}${req ? ' ' : ''}${req ? '<span class="req">*</span>' : ''}`;
    wrap.innerHTML = `<span class="label">${lbl}</span>`;
    let input; if ((f.type || '').toLowerCase() === 'textarea') input = el('textarea', 'input'); else { input = el('input', 'input'); input.type = f.type || 'text'; }
    input.name = name; if (req) input.required = true; wrap.appendChild(input); form.appendChild(wrap);
  }
  Object.entries(fields).forEach(([name, f]) => addField(name, f));
  const actions = el('div', 'form-actions center'); const submit = el('button', 'btn btn-primary btn-lg'); submit.type = 'submit'; submit.textContent = 'Submit Testimonial'; actions.appendChild(submit); form.appendChild(actions);
  const list = el('div', 'testimonial-list');
  function loadTestimonials() { const items = JSON.parse(localStorage.getItem('sb_testimonials') || '[]'); list.innerHTML = ''; items.forEach(it => { const card = el('div', 'testimonial-card'); card.appendChild(el('div', 'testimonial-meta', `${it.name} â€¢ ${it.email} â€¢ ${it.date}`)); card.appendChild(el('p', 'testimonial-text', it.testimonial)); list.appendChild(card); }); }
  form.addEventListener('submit', (e) => { e.preventDefault(); const data = new FormData(form); const item = { date: formatDate() }; for (const [k, v] of data.entries()) item[k] = v; const items = JSON.parse(localStorage.getItem('sb_testimonials') || '[]'); items.unshift(item); localStorage.setItem('sb_testimonials', JSON.stringify(items)); form.reset(); loadTestimonials(); });
  s.appendChild(form); s.appendChild(list); frag.appendChild(s); App.el.main.innerHTML = ''; App.el.main.appendChild(frag); loadTestimonials();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


// =============================
// Page: Contact (form + info card)
// =============================
function renderContact() {
  const cfg = App.config.contact || {};
  const frag = document.createDocumentFragment();
  const s = el('section', 'contact-page');
  s.appendChild(el('h2', '', 'Contact Us'));

  const form = el('form', 'contact-form');
  form.noValidate = true;

  const row = el('div', 'form-row-2');
  const fieldsDef = cfg.form || {};
  if (fieldsDef.firstName) { const f = fieldsDef.firstName; const fld = el('label', 'form-field'); const lbl = el('span', 'label', f.label || 'First Name'); if (f.required === 'Y') lbl.innerHTML += '<span class="req">*</span>'; const inp = el('input', 'input'); inp.type = f.type || 'text'; inp.name = 'firstName'; if (f.required==='Y') inp.required = true; fld.appendChild(lbl); fld.appendChild(inp); row.appendChild(fld); }
  if (fieldsDef.lastName) { const f = fieldsDef.lastName; const fld = el('label', 'form-field'); const lbl = el('span', 'label', f.label || 'Last Name'); if (f.required === 'Y') lbl.innerHTML += '<span class="req">*</span>'; const inp = el('input', 'input'); inp.type = f.type || 'text'; inp.name = 'lastName'; if (f.required==='Y') inp.required = true; fld.appendChild(lbl); fld.appendChild(inp); row.appendChild(fld); }
  if (row.children.length) form.appendChild(row);

  Object.entries(fieldsDef).forEach(([name, field]) => {
    if (['middleName','firstName','lastName'].includes(name)) return;
    if (field.visible === 'N') return;
    const fieldDiv = el('label', 'form-field');
    const label = el('span', 'label', field.label || name);
    if (field.required === 'Y') label.innerHTML += '<span class="req">*</span>';
    fieldDiv.appendChild(label);
    if (name === 'country') {
      const select = document.createElement('select'); select.className = 'input'; select.name = 'country'; if (field.required === 'Y') select.required = true;
      const countries = ["United States","Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"]; const rest = countries.filter(c => c !== 'United States').sort((a,b)=> a.localeCompare(b)); const finalList = ['United States', ...rest]; finalList.forEach(c => { const opt = document.createElement('option'); opt.value = c; opt.textContent = c; select.appendChild(opt); }); fieldDiv.appendChild(select); form.appendChild(fieldDiv); return; }
    let input; if ((field.type || '').toLowerCase() === 'textarea') input = el('textarea', 'input'); else { input = el('input', 'input'); if (name.toLowerCase() === 'email') input.type = 'email'; else input.type = field.type || 'text'; } input.name = name; if (field.required === 'Y') input.required = true; fieldDiv.appendChild(input); form.appendChild(fieldDiv);
  });

  const card = cfg.card || null;
  const cardVisible = card ? String(card.visible || 'Y').toUpperCase() === 'Y' : true;
  if (cardVisible) s.classList.add('with-card'); else s.classList.add('no-card');

  const info = el('aside', 'contact-info-card');
  if (card && cardVisible) {
    const logo = el('img', 'biz-logo'); const logoSrc = (card.logo && card.logo.image) || App.config.header?.logo || 'assets/images/logo.png'; logo.src = logoSrc; logo.alt = (card.logo && card.logo.alt) || App.config.site?.title || 'Business Logo'; info.appendChild(logo);
    const show = (yn) => yn === undefined ? true : String(yn).toUpperCase() === 'Y';
    const addLine = (visible, icon, html) => { if (!visible || !html) return; const p = el('p', 'biz-line'); if (icon) { const ic = el('img', 'biz-icon'); ic.src = icon; ic.alt = ''; ic.width = 16; ic.height = 16; p.appendChild(ic); p.appendChild(document.createTextNode(' ')); } p.appendChild(el('span', '', html)); info.appendChild(p); };
    const nameText = card.name || App.config.site?.title || ''; addLine(show(card.nameVisible ?? 'Y'), null, nameText ? `<strong>${nameText}</strong>` : '');
    addLine(show(card.titleVisible), null, card.title || '');
    addLine(show(card.addressVisible), card.icons?.address, card.address || '');
    const emailText = card.email || (cfg.emailRecipients && cfg.emailRecipients[0]) || ''; addLine(show(card.emailVisible), card.icons?.email, emailText);
    const headerPhoneEl = document.querySelector('.header-contact a[href^="tel:"]'); const fallbackPhone = headerPhoneEl ? headerPhoneEl.textContent : ''; addLine(show(card.phoneVisible), card.icons?.phone, card.phone || fallbackPhone);
  } else if (cardVisible) {
    const logo = el('img', 'biz-logo'); const logoSrc = App.config.header?.logo || 'assets/images/logo.png'; logo.src = logoSrc; logo.alt = App.config.site?.title || 'Business Logo'; info.appendChild(logo);
    const bizName = App.config.site?.title || 'Business Name'; const bizInfo = App.config.footer?.businessInfo || App.config.site?.businessInfo || {}; const bizAddr = bizInfo.address || 'Address not set'; const bizEmail = (cfg.emailRecipients && cfg.emailRecipients[0]) || bizInfo.email || 'info@example.com'; const headerPhoneEl = document.querySelector('.header-contact a[href^="tel:"]'); const bizPhone = headerPhoneEl ? headerPhoneEl.textContent : (bizInfo.phone || '(555) 123-4567'); info.appendChild(el('p', 'biz-line', `<strong>${bizName}</strong>`)); info.appendChild(el('p', 'biz-line', bizAddr)); info.appendChild(el('p', 'biz-line', bizEmail)); info.appendChild(el('p', 'biz-line', bizPhone));
  }

  const actionsWrap = el('div', 'form-actions center'); const submitBtn = el('button', 'btn btn-primary btn-lg', cfg.submitText || 'Send Message'); submitBtn.type = 'submit'; actionsWrap.appendChild(submitBtn); form.appendChild(actionsWrap);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const first = (form.querySelector('[name="firstName"]')?.value || '').trim();
    const last = (form.querySelector('[name="lastName"]')?.value || '').trim();
    const email = (form.querySelector('[name="email"]')?.value || '').trim();
    const messageEl = form.querySelector('textarea[name="message"], textarea[name="msg"], textarea[name="messageText"]');
    const message = (messageEl?.value || '').trim();
    if (!form.checkValidity()) { form.reportValidity(); return; }


    const provider = (cfg.submit && cfg.submit.emailProvider) || 'mailto';

    if (provider === 'emailjs') {
    const submitBtn = form.querySelector('button[type="submit"], .btn.btn-primary');
    const prevText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

    // Collect all field values from the form dynamically
   const formData = {};
   new FormData(form).forEach((value, key) => formData[key] = value);

   try {
    // Send via EmailJS (make sure your template expects these fields)
    await emailjs.send("service_d5e74gf", "template_fe17vp1", formData);
    
    const msg = document.createElement('div');
    msg.className = 'form-success';
    msg.textContent = cfg.successMessage || 'Your message has been sent.';
    form.insertBefore(msg, form.firstChild);
    form.reset();
   } catch (err) {
    console.error('EmailJS send failed', err);
    const msg = document.createElement('div');
    msg.className = 'form-error-global';
    msg.setAttribute('role', 'alert');
    msg.textContent = 'Failed to send message. Please try again later.';
    form.insertBefore(msg, form.firstChild);
   } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = prevText; }
  }
  return;
}




  });

  s.appendChild(form);
  if (cardVisible) s.appendChild(info);
  frag.appendChild(s);
  App.el.main.innerHTML = '';
  App.el.main.appendChild(frag);
}

