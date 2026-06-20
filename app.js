const state = {
  products: [],
  selected: null,
  features: [],
  lastFocusedProductCard: null
};

const fallbackData = {
  "brand": {
    "name": "SARA Brothers",
    "tagline": "Quality You Can Trust",
    "site": "https://www.sarabrothers.com/",
    "logo": "assets/images/sara_logo_transparent.png",
    "hero": ""
  },
  "content": {
    "hero": {
      "eyebrow": "Direct thermal labels",
      "headline": "Commercial Grade Quality\n4x6 Direct Thermal Shipping Labels\nfor smoother fulfillment.",
      "lede": "SARA Brothers fanfold labels are built for ecommerce sellers, warehouse teams, and daily shipping workflows that need clean scans, strong adhesion, and no printer drama."
    }
  },
  "social": [
    {
      "name": "Instagram",
      "icon": "assets/icons/instagram.svg",
      "url": "https://www.instagram.com/sarabrothers21/"
    },
    {
      "name": "TikTok",
      "icon": "assets/icons/tiktok.svg",
      "url": "https://www.tiktok.com/@sarabrothers21"
    },
    {
      "name": "LinkedIn",
      "icon": "assets/icons/linkedln.svg",
      "url": "https://www.linkedin.com/in/sarabrothers/"
    }
  ],
  "contact": {
    "email": "info@sarabrothers.com",
    "phone": "",
    "location": "United States",
    "formEndpoint": "",
    "successMessage": "We have received your message and shall get back to you in 1-2 business day.",
    "submit": {
      "text": "Send",
      "emailProvider": "emailjs"
    },
    "emailjs": {
      "publicKey": "VOkQZ-STSbUeEDE3V",
      "serviceId": "service_d5e74gf",
      "templateId": "template_fe17vp1"
    },
    "cards": [
      {
        "label": "Email",
        "value": "info@sarabrothers.com",
        "href": "mailto:info@sarabrothers.com"
      },
      {
        "label": "Amazon support",
        "value": "Message us through your Amazon order",
        "href": "https://www.amazon.com/gp/product/B0GCBD5TK2?th=1"
      },
      {
        "label": "Business location",
        "value": "Serving ecommerce sellers across the United States",
        "href": ""
      }
    ]
  },
  "products": [
    {
      "id": "500",
      "name": "4x6 Direct Thermal Shipping Labels",
      "shortName": "500 Labels",
      "pack": "1 Fanfold Stack",
      "count": "500 labels",
      "price": "$15.99",
      "unit": "$0.03 / label",
      "asin": "B0GCBD5TK2",
      "amazon": "https://www.amazon.com/gp/product/B0GCBD5TK2?th=1",
      "image": "assets/images/products/Main1PK.png",
      "thumbs": [
        "assets/images/products/Main1PK.png",
        "assets/images/products/prod_img_01.png",
        "assets/images/products/prod_img_02.png",
        "assets/images/products/prod_img_03.png",
        "assets/images/products/prod_img_04.png",
        "assets/images/products/prod_img_05.png",
        "assets/images/products/prod_img_06.png",
        "assets/images/products/prod_img_07.png",
        "assets/images/products/prod_img_08.png"
      ],
      "bestFor": "New shops, home offices, and lower-volume shipping desks."
    },
    {
      "id": "2000",
      "name": "4x6 Direct Thermal Shipping Labels",
      "shortName": "2000 Labels",
      "pack": "4 Fanfold Stacks",
      "count": "2000 labels",
      "price": "$49.99",
      "unit": "$0.02 / label",
      "asin": "B0FJBL41PF",
      "amazon": "https://www.amazon.com/gp/product/B0FJBL41PF?th=1",
      "image": "assets/images/products/Main4PK.png",
      "thumbs": [
        "assets/images/products/Main4PK.png",
        "assets/images/products/prod_img_01.png",
        "assets/images/products/prod_img_02.png",
        "assets/images/products/prod_img_03.png",
        "assets/images/products/prod_img_04.png",
        "assets/images/products/prod_img_05.png",
        "assets/images/products/prod_img_06.png",
        "assets/images/products/prod_img_07.png",
        "assets/images/products/prod_img_08.png"
      ],
      "bestFor": "Growing FBA, ecommerce, and warehouse teams."
    },
    {
      "id": "3000",
      "name": "Commercial Grade 4x6 Direct Thermal Shipping Labels",
      "shortName": "3000 Labels",
      "pack": "6 Fanfold Stacks",
      "count": "3000 labels",
      "price": "View on Amazon",
      "unit": "Bulk FBA pack",
      "asin": "B0FJC8L9K1",
      "amazon": "https://www.amazon.com/gp/product/B0FJC8L9K1?th=1",
      "image": "assets/images/products/Main6PK.png",
      "thumbs": [
        "assets/images/products/Main6PK.png",
        "assets/images/products/prod_img_01.png",
        "assets/images/products/prod_img_02.png",
        "assets/images/products/prod_img_03.png",
        "assets/images/products/prod_img_04.png",
        "assets/images/products/prod_img_05.png",
        "assets/images/products/prod_img_06.png",
        "assets/images/products/prod_img_07.png",
        "assets/images/products/prod_img_08.png"
      ],
      "bestFor": "High-volume operations that need fewer reorders."
    }
  ],
  "story": {
    "image": "assets/images/our-story/Home-OurStory.jpg",
    "headline": "SARA Brothers Promise",
    "body": "SARA Brothers exists for sellers and teams who need shipping supplies they can trust every day. Our focus is simple: practical product quality, consistent fulfillment, clear prints, strong adhesion, and materials selected for safer, more responsible business use.",
    "cards": [
      {
        "title": "What We Do",
        "image": "assets/images/our-story/what-we-do.jpg",
        "text": "Through our unwavering commitment to excellence, we manufacture & supply <strong>premium, commercial-grade</strong> 4x6 direct thermal labels engineered for uninterrupted, jam-free printing. Our dedication to serving high-volume operations drives us to deliver consistent quality and <strong>reliable performance</strong>, ensuring your daily shipping workflows run smoothly without a hitch."
      },
      {
        "title": "Who We Serve",
        "image": "assets/images/our-story/who-we-serve.jpg",
        "text": "From home-based sellers to retail, grocery, warehouse, and delivery operations, our labels support teams that ship daily."
      },
      {
        "title": "Our Story",
        "image": "assets/images/our-story/our-story.png",
        "text": "Proudly <strong>women-owned</strong> and <strong>locally rooted in the USA</strong>, we are driven by a heartfelt dedication to serving the hard-working businesses and logistics teams that keep our country moving. <strong>Your growth is our passion</strong>, and we back your daily journey with an unwavering commitment to the premium quality your brand deserves."
      },
      {
        "title": "Core Values",
        "image": "assets/images/our-story/our-values.jpeg",
        "text": "✓ <strong>PRECISION:</strong> Commercial-grade quality, sharp barcodes every time<br>✓ <strong>RESILIENCE:</strong> Engineered to keep your business moving<br>✓ <strong>INTEGRITY:</strong> BPA-free, Environment friendly materials<br>✓ <strong>PARTNERSHIP:</strong> We're sellers too. Your business continuity is our mission."
      }

    ]
  },
  "credentials": [
    {
      "name": "FSC",
      "icon": "assets/images/badges/FSC.svg",
      "text": "Sustainable sourcing"
    },
    {
      "name": "RoHS",
      "icon": "assets/images/badges/RoHS.svg",
      "text": "Safe and non-toxic"
    },
    {
      "name": "PFAS-Free",
      "icon": "assets/images/badges/PFAS.svg",
      "text": "No harmful chemicals"
    },
    {
      "name": "Prop 65",
      "icon": "assets/images/badges/Prop65.svg",
      "text": "California compliant"
    },
    {
      "name": "REACH",
      "icon": "assets/images/badges/REACH.svg",
      "text": "EU chemical compliance"
    },
    {
      "name": "BPA Free",
      "icon": "assets/images/badges/BPA_Free.svg",
      "text": "BPA-free paper"
    }
  ],
  "videos": [
    {
      "title": "Jam-Free Smooth Prints",
      "src": "assets/video/JamFree-SmoothPrints-W-Poster.mp4",
      "poster": "assets/video/JamFree-SmoothPrints-W-Poster.jpg",
      "caption": "See how SARA Brothers labels support uninterrupted thermal printing."
    },
    {
      "title": "1 Pack Unboxing",
      "src": "assets/video/SARA-1PK-Unboxing-FINAL.mp4",
      "poster": "assets/video/Main1PK.png",
      "caption": "A quick look at the 500-label pack and packaging."
    },
    {
      "title": "Product Unboxing",
      "src": "assets/video/Unboxing.mp4",
      "poster": "assets/video/Unboxing_Poster.jpg",
      "caption": "Product handling, label stack, and ready-to-use format."
    }
  ],
  "features": [
    "Waterproof, smudge-proof, oil-resistant, and alcohol-resistant top-coated paper",
    "Permanent adhesive for corrugated boxes, poly mailers, bubble mailers, and envelopes",
    "Jam-free fanfold feeding with clean perforations between labels",
    "BPA-free material for dependable daily business use",
    "No ink, toner, or ribbon required"
  ],
  "printers": [
    "Rollo",
    "Zebra",
    "Munbyn",
    "Polono",
    "Arkscan",
    "LabelRange",
    "Most Direct Thermal Printers"
  ],
  "carriers": [
    "USPS",
    "UPS",
    "FedEx",
    "DHL",
    "Amazon FBA",
    "eBay",
    "Shopify",
    "Walmart",
    "More.."
  ],
  "announcements": [
    "Authenticity Check: Sold Exclusively on Amazon.com",
    "Heavy discounts for limited time - Only on amazon.com",
    "Rolls coming up shortly!"
  ]
};

const $ = (selector) => document.querySelector(selector);

function cacheBustedUrl(path) {
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${Date.now()}`;
}

async function fetchJson(path) {
  const response = await fetch(cacheBustedUrl(path), { cache: "no-store" });
  if (!response.ok) throw new Error(`${path} unavailable`);
  return response.json();
}

function fallbackImage(label = "SARA Brothers") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <rect width="900" height="900" fill="#f7f9f6"/>
      <rect x="210" y="210" width="480" height="360" rx="18" fill="#ffffff" stroke="#dfe7df" stroke-width="8"/>
      <path d="M265 318h370M265 382h370M265 446h250" stroke="#17201b" stroke-width="20" stroke-linecap="round"/>
      <rect x="288" y="520" width="280" height="46" fill="#17201b"/>
      <path d="M610 520v46M636 520v46" stroke="#ffffff" stroke-width="10"/>
      <text x="450" y="665" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="700" fill="#1f6b4b">${label}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function protectImages(root = document) {
  root.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.src = fallbackImage(image.alt || "SARA Brothers");
    }, { once: true });
  });
}

async function loadData() {
  try {
    const data = await fetchJson("products.json");
    return data;
  } catch (error) {
    console.warn(error);
    return fallbackData;
  }
}

function productCard(product, index) {
  const article = document.createElement("article");
  article.className = `product-card${index === 0 ? " is-active" : ""}`;
  article.tabIndex = 0;
  article.dataset.id = product.id;
  const images = getProductImages(product).slice(0, 5);
  article.innerHTML = `
    <div class="product-card-media product-detail-trigger" data-product-card-media aria-label="Swipe product images for ${product.shortName}">
      <img data-product-card-image src="${images[0] || product.image}" alt="SARA Brothers ${product.shortName} pack">
      ${images.length > 1 ? `
        <button class="product-card-nav product-card-prev" type="button" data-product-card-prev aria-label="Previous ${product.shortName} image">‹</button>
        <button class="product-card-nav product-card-next" type="button" data-product-card-next aria-label="Next ${product.shortName} image">›</button>
        <div class="product-card-dots" aria-label="${product.shortName} image navigation">
          ${images.map((_, imageIndex) => `<button type="button" class="${imageIndex === 0 ? "is-active" : ""}" data-product-card-dot aria-label="Show image ${imageIndex + 1}" aria-current="${imageIndex === 0 ? "true" : "false"}"></button>`).join("")}
        </div>
      ` : ""}
    </div>
    <div class="product-meta">
      <div>
        <strong>${product.shortName}</strong>
        <p>${product.pack}</p>
      </div>
      <div class="price">
        <strong>${product.price}</strong>
        <small>${product.unit}</small>
      </div>
    </div>
    <p>${product.bestFor}</p>
    <a class="button ghost" href="${product.amazon}" aria-label="Buy ${product.shortName} on Amazon">Buy on Amazon</a>
  `;

  article.addEventListener("click", (event) => {
    if (article.dataset.carouselSwiped === "true") {
      event.preventDefault();
      delete article.dataset.carouselSwiped;
      return;
    }
    if (event.target.closest("a, button")) return;
    openProductDetailModal(product.id, article);
  });

  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductDetailModal(product.id, article);
    }
  });

  setupProductCardCarousel(article, images);
  return article;
}

function selectProduct(id) {
  const product = state.products.find((item) => item.id === id) || state.products[0];
  if (!product) return null;

  state.selected = product;

  document.querySelectorAll(".product-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.id === product.id);
  });

  return product;
}

function getProductImages(product) {
  return [...new Set([product.image, ...(product.thumbs || [])].filter(Boolean))];
}

function attachSwipe(element, { onLeft, onRight, onTap } = {}) {
  if (!element) return;

  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let pointerId = null;
  let isTracking = false;

  const threshold = 42;
  const restraint = 72;
  const allowedTime = 700;

  element.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startTime = Date.now();
    isTracking = true;
    element.classList.add("is-touching");
    element.setPointerCapture?.(pointerId);
  });

  element.addEventListener("pointerup", (event) => {
    if (!isTracking || (pointerId !== null && event.pointerId !== pointerId)) return;

    const distanceX = event.clientX - startX;
    const distanceY = event.clientY - startY;
    const elapsed = Date.now() - startTime;
    const isHorizontalSwipe = elapsed <= allowedTime && Math.abs(distanceX) >= threshold && Math.abs(distanceY) <= restraint;

    element.classList.remove("is-touching");
    element.releasePointerCapture?.(pointerId);
    isTracking = false;
    pointerId = null;

    if (isHorizontalSwipe) {
      event.preventDefault();
      if (distanceX < 0) onLeft?.();
      if (distanceX > 0) onRight?.();
      return;
    }

    if (Math.abs(distanceX) < 8 && Math.abs(distanceY) < 8) onTap?.(event);
  });

  element.addEventListener("pointercancel", () => {
    if (!isTracking) return;
    element.classList.remove("is-touching");
    if (pointerId !== null) element.releasePointerCapture?.(pointerId);
    isTracking = false;
    pointerId = null;
  });
}

function setupProductCardCarousel(article, images) {
  const media = article.querySelector("[data-product-card-media]");
  const image = article.querySelector("[data-product-card-image]");
  const dots = Array.from(article.querySelectorAll("[data-product-card-dot]"));
  const prevButton = article.querySelector("[data-product-card-prev]");
  const nextButton = article.querySelector("[data-product-card-next]");
  if (!media || !image || images.length < 2) return;

  let currentIndex = 0;
  const normalizeIndex = (index) => (index + images.length) % images.length;

  const setImage = (index) => {
    currentIndex = normalizeIndex(index);
    image.classList.remove("is-changing");
    window.requestAnimationFrame(() => {
      image.src = images[currentIndex];
      image.classList.add("is-changing");
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === currentIndex);
      dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
    });
  };

  prevButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    setImage(currentIndex - 1);
  });

  nextButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    setImage(currentIndex + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      setImage(index);
    });
  });

  const markSwiped = () => {
    article.dataset.carouselSwiped = "true";
    window.setTimeout(() => {
      delete article.dataset.carouselSwiped;
    }, 250);
  };

  attachSwipe(media, {
    onLeft: () => {
      markSwiped();
      setImage(currentIndex + 1);
    },
    onRight: () => {
      markSwiped();
      setImage(currentIndex - 1);
    }
  });
}

function renderFeatureItems(features = []) {
  return features.map((feature) => `
    <div class="feature-item">
      <span class="feature-icon">✓</span>
      <p>${feature}</p>
    </div>
  `).join("");
}

function renderProductDetailModal(product) {
  const modalBody = $("#productDetailModalBody");
  if (!modalBody || !product) return;

  const images = getProductImages(product);
  modalBody.innerHTML = `
    <section class="modal-detail modal-detail-compact" aria-label="${product.shortName} product details">
      <header class="modal-detail-header">
        <div class="modal-title-row">
          <div>
            <p class="eyebrow">Product details</p>
            <h2 id="productDetailTitle">${product.shortName} (${product.pack})</h2>
          </div>
          <a class="button primary modal-buy-button" id="modalQualityBuy" href="${product.amazon}">Buy Selected Pack</a>
        </div>
        <p class="modal-detail-note">Shown with the actual SARA Brothers 4x6 sample label artwork used for the product.</p>
      </header>

      <div class="modal-media-viewer">
        <div class="modal-thumb-rail" id="modalGalleryStrip" aria-label="Product image gallery"></div>
        <div class="modal-main-image-wrap">
          <img id="modalGalleryImage" src="${images[0] || product.image}" alt="SARA Brothers ${product.shortName} media">
        </div>
      </div>

      <div class="modal-detail-footer">
        <div class="modal-feature-rows" id="modalFeatureList">${renderFeatureItems(state.features)}</div>
      </div>
    </section>
  `;

  const galleryImage = $("#modalGalleryImage");
  const galleryWrap = galleryImage?.closest(".modal-main-image-wrap");
  const galleryStrip = $("#modalGalleryStrip");
  if (!galleryImage || !galleryStrip) return;

  galleryStrip.innerHTML = "";
  const galleryImages = images.slice(0, 8);
  let galleryIndex = 0;

  const setGalleryImage = (index) => {
    if (!galleryImages.length) return;
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    galleryImage.src = galleryImages[galleryIndex];
    galleryStrip.querySelectorAll("button").forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === galleryIndex);
      item.setAttribute("aria-current", itemIndex === galleryIndex ? "true" : "false");
    });
  };

  galleryImages.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "is-active" : "";
    button.setAttribute("aria-label", `View product image ${index + 1}`);
    button.setAttribute("aria-current", index === 0 ? "true" : "false");
    button.innerHTML = `<img src="${src}" alt="">`;
    button.addEventListener("click", () => setGalleryImage(index));
    galleryStrip.appendChild(button);
  });

  attachSwipe(galleryWrap, {
    onLeft: () => setGalleryImage(galleryIndex + 1),
    onRight: () => setGalleryImage(galleryIndex - 1)
  });

  protectImages(modalBody);
}

function openProductDetailModal(productId, triggerElement) {
  const product = selectProduct(productId);
  const modal = $("#productDetailModal");
  const closeButton = $("#productDetailClose");
  if (!product || !modal) return;

  state.lastFocusedProductCard = triggerElement || document.querySelector(`.product-card[data-id="${product.id}"]`);
  renderProductDetailModal(product);

  modal.hidden = false;
  document.body.classList.add("modal-open");

  window.setTimeout(() => {
    const firstFocusable = closeButton || modal.querySelector("a, button");
    firstFocusable?.focus();
  }, 0);
}

function closeProductDetailModal() {
  const modal = $("#productDetailModal");
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    state.lastFocusedProductCard?.focus?.();
  }, 0);
}

function setupProductDetailModal() {
  const modal = $("#productDetailModal");
  const closeButton = $("#productDetailClose");
  if (!modal) return;

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeProductDetailModal();
  });

  closeButton?.addEventListener("click", closeProductDetailModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProductDetailModal();
  });
}



function renderList(selector, items) {
  const container = $(selector);
  if (!container) return;
  container.innerHTML = items.map((item) => `<span>${item}</span>`).join("");
}

function renderFeatures(features) {
  const featureList = $("#featureList");
  if (!featureList) return;
  featureList.innerHTML = renderFeatureItems(features);
}

function renderStory(story = {}) {
  const headline = $("#storyHeadline");
  const body = $("#storyBody");
  const image = $("#storyImage");
  const cards = $("#storyCards");
  if (!headline || !body || !image || !cards) return;

  headline.textContent = story.headline || headline.textContent;
  body.textContent = story.body || body.textContent;
  image.src = story.image || image.src;

  const cardImages = [
    story.image,
    story.whatWeDoImage,
    story.whoWeServeImage,
    story.valuesImage
  ];

  cards.innerHTML = (story.cards || []).map((card, index) => `
    <article class="story-card">
      <img src="${card.image || cardImages[index] || story.image}" alt="SARA Brothers ${card.title}">
      <h3>${card.title}</h3>
      <p>${card.text}</p>
    </article>
  `).join("");
}

function renderCredentials(credentials = []) {
  const grid = $("#credentialGrid");
  if (!grid) return;
  grid.innerHTML = credentials.map((credential) => `
    <article class="credential-card">
      <img src="${credential.icon}" alt="">
      <strong>${credential.name}</strong>
      <span>${credential.text}</span>
    </article>
  `).join("");
}

function renderVideos(videos = []) {
  const grid = $("#videoGrid");
  if (!grid) return;
  grid.innerHTML = videos.map((video) => `
    <article class="video-card">
      <video controls preload="metadata" poster="${video.poster}">
        <source src="${video.src}" type="video/mp4">
      </video>
      <div>
        <h3>${video.title}</h3>
        <p>${video.caption}</p>
      </div>
    </article>
  `).join("");
}

function renderSocial(social = []) {
  const band = $("#socialBand");
  const links = $("#socialLinks");
  const activeSocial = social.filter((item) => item?.name && item?.url && item?.icon);
  if (!band || !links) return;

  if (!activeSocial.length) {
    band.hidden = true;
    return;
  }

  band.hidden = false;
  links.innerHTML = activeSocial.map((item) => `
    <a href="${item.url}" aria-label="${item.name}" title="${item.name}" target="_blank" rel="noopener noreferrer">
      <img src="${item.icon}" alt="">
      <span class="social-label">${item.name}</span>
    </a>
  `).join("");
}

function renderAnnouncements(announcements = []) {
  const band = $("#announcementBand");
  const list = $("#announcementList");
  if (!band || !list) return;
  const activeAnnouncements = announcements
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim())
    .slice(0, 6);

  if (!activeAnnouncements.length) {
    band.hidden = true;
    list.innerHTML = "";
    return;
  }

  band.hidden = false;
  list.innerHTML = "";
  activeAnnouncements.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

function hasRenderedAnnouncements() {
  const band = $("#announcementBand");
  const list = $("#announcementList");
  return Boolean(band && list && !band.hidden && list.children.length);
}

function renderContent(content = {}) {
  const eyebrow = $("#heroEyebrow");
  const headline = $("#heroHeadline");
  const lede = $("#heroLede");
  if (content.hero?.eyebrow && eyebrow) eyebrow.textContent = content.hero.eyebrow;
  if (content.hero?.headline && headline) headline.textContent = content.hero.headline;
  if (content.hero?.lede && lede) lede.textContent = content.hero.lede;
}

function renderContact(contact = {}) {
  const cards = $("#contactCards");
  if (!cards) return;
  cards.innerHTML = (contact.cards || []).map((card) => {
    const content = `<strong>${card.label}</strong><span>${card.value}</span>`;
    if (!card.href) return `<div class="contact-card">${content}</div>`;
    return `<a class="contact-card" href="${card.href}">${content}</a>`;
  }).join("");
}

function setupContactForm(contact = {}) {
  const form = $("#contactForm");
  const note = $("#formNote");
  if (!form) return;
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton && contact.submit?.text) submitButton.textContent = contact.submit.text;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(`SARA Brothers Contact: ${data.topic || "Website Inquiry"}`);
    const body = encodeURIComponent([
      `First Name: ${data.firstName || ""}`,
      `Last Name: ${data.lastName || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Country: ${data.country || ""}`,
      `Company: ${data.company || ""}`,
      `Order or ASIN: ${data.order || ""}`,
      `Inquiry type: ${data.topic || ""}`,
      "",
      data.message || ""
    ].join("\n"));

    const provider = contact.submit?.emailProvider || "mailto";
    if (provider === "emailjs" && window.emailjs && contact.emailjs?.publicKey) {
      const previousText = submitButton?.textContent || "";
      try {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        window.emailjs.init(contact.emailjs.publicKey);
        await window.emailjs.send(contact.emailjs.serviceId, contact.emailjs.templateId, data);
        form.reset();
        if (note) {
          note.textContent = contact.successMessage || "Your message has been sent.";
          note.classList.remove("is-error");
          note.classList.add("is-success");
        }
        return;
      } catch (error) {
        console.error("EmailJS send failed", error);
        if (note) {
          note.textContent = "Failed to send message. Please try again later.";
          note.classList.remove("is-success");
          note.classList.add("is-error");
        }
        return;
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = previousText || contact.submit?.text || "Send";
      }
    }

    if (contact.formEndpoint) {
      try {
        const response = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error("Form endpoint rejected the message");
        form.reset();
        if (note) {
          note.textContent = contact.successMessage || "Thank you. Your message has been sent.";
          note.classList.remove("is-error");
          note.classList.add("is-success");
        }
        return;
      } catch (error) {
        console.warn(error);
        if (note) {
          note.textContent = "The form service did not respond, so your email app will open instead.";
          note.classList.add("is-error");
        }
      }
    }

    window.location.href = `mailto:${contact.email || "info@sarabrothers.com"}?subject=${subject}&body=${body}`;
  });
}

function setupNavigation() {
  const toggle = $("[data-nav-toggle]");
  const nav = $("[data-nav]");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    if (link.getAttribute("href") === "#top") {
      event.preventDefault();
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });

  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    if (link.closest("[data-nav]")) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 520, easing: "ease-out", fill: "forwards" }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".quality-carousel, .page-hero-card, .support-panel, .benefit-card, .wide-proof-card, .product-card, .story-card, .credential-card, .feature-item, .video-card, .review-card, .review-stats, .steps article, details, .contact-card, .contact-form").forEach((item) => {
    item.style.opacity = "0";
    observer.observe(item);
  });
}


function setupQualityCarousel() {
  const frame = $("#qualityCarouselFrame");
  const track = $("#qualityCarouselTrack");
  const dotsContainer = $("#qualityCarouselDots");
  const prevButton = document.querySelector("[data-quality-prev]");
  const nextButton = document.querySelector("[data-quality-next]");

  if (!frame || !track || !dotsContainer) return;

  const slides = Array.from(track.querySelectorAll(".quality-carousel-slide"));
  if (!slides.length) return;

  dotsContainer.innerHTML = slides.map((_, index) => `
    <button class="quality-carousel-dot${index === 0 ? " is-active" : ""}" type="button" data-quality-dot="${index}" aria-label="Show quality image ${index + 1}"></button>
  `).join("");

  let currentIndex = 0;

  const normalizeIndex = (index) => (index + slides.length) % slides.length;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const getSlideSpacing = () => {
    const width = frame.clientWidth || window.innerWidth;
    if (width <= 768) return Math.min(width * 0.26, 112);
    if (width <= 980) return clamp(width * 0.22, 84, 184);
    return clamp(width * 0.17, 132, 250);
  };

  const getRelativePosition = (index) => {
    let position = index - currentIndex;
    const midpoint = slides.length / 2;
    if (position > midpoint) position -= slides.length;
    if (position < -midpoint) position += slides.length;
    return Math.max(-4, Math.min(4, position));
  };

  const renderCarousel = () => {
    const frameWidth = frame.clientWidth || window.innerWidth;
    const spacing = getSlideSpacing();
    const yStep = frameWidth <= 980 ? 7 : 9;
    const rotateStep = frameWidth <= 768 ? -6 : frameWidth <= 980 ? -7 : -8;
    const scaleStep = frameWidth <= 768 ? 0.1 : frameWidth <= 980 ? 0.095 : 0.085;

    slides.forEach((slide, index) => {
      const position = getRelativePosition(index);
      const distance = Math.abs(position);
      slide.dataset.position = String(position);
      slide.classList.toggle("is-active", index === currentIndex);
      slide.classList.toggle("is-hidden", distance > 3);
      slide.style.setProperty("--carousel-offset", position);
      slide.style.setProperty("--carousel-distance", distance);
      slide.style.setProperty("--carousel-x", `${position * spacing}px`);
      slide.style.setProperty("--carousel-y", `${distance * yStep}px`);
      slide.style.setProperty("--carousel-z", `${(3 - distance) * 12}px`);
      slide.style.setProperty("--carousel-rotate", `${position * rotateStep}deg`);
      slide.style.setProperty("--carousel-scale", Math.max(0.6, 1 - distance * scaleStep));
      slide.style.setProperty("--carousel-opacity", Math.max(0, 1 - distance * 0.1));
      slide.style.zIndex = String(20 - distance);
    });

    dotsContainer.querySelectorAll(".quality-carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = normalizeIndex(index);
    renderCarousel();
  };

  prevButton?.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextButton?.addEventListener("click", () => goToSlide(currentIndex + 1));

  dotsContainer.addEventListener("click", (event) => {
    const dot = event.target.closest("[data-quality-dot]");
    if (!dot) return;
    goToSlide(Number(dot.dataset.qualityDot));
  });

  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => goToSlide(index));
  });

  attachSwipe(frame, {
    onLeft: () => goToSlide(currentIndex + 1),
    onRight: () => goToSlide(currentIndex - 1)
  });

  frame.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });

  window.addEventListener("resize", renderCarousel);
  renderCarousel();
}

function restoreHashScroll() {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  window.setTimeout(() => target.scrollIntoView({ block: "start" }), 120);
}

async function init() {
  const data = await loadData();
  state.products = data.products;
  state.features = data.features || [];

  if (data.brand?.logo) {
    document.querySelectorAll("[data-brand-logo]").forEach((logo) => {
      logo.src = data.brand.logo;
    });
  }
  renderContent(data.content);
  const productGrid = $("#productGrid");
  if (productGrid) productGrid.append(...state.products.map(productCard));
  if (!hasRenderedAnnouncements()) renderAnnouncements(data.announcements || fallbackData.announcements);
  renderStory(data.story);
  renderCredentials(data.credentials);
  renderVideos(data.videos);
  renderSocial(data.social);
  renderContact(data.contact);
  renderFeatures(state.features);
  renderList("#printerChips", data.printers);
  renderList("#carrierChips", data.carriers);
  if (productGrid) selectProduct(state.products[0]?.id);
  setupProductDetailModal();
  setupQualityCarousel();
  setupNavigation();
  setupContactForm(data.contact);
  setupReveal();
  protectImages();
  restoreHashScroll();
}

init();
