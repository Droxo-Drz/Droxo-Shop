/* ==========================================================================
   DROXO SHOP — APPLICATION LOGIC  (v2 — with Discord support)
   ========================================================================== */

/* ==========================================================================
   1. CONFIGURATION
   ========================================================================== */
const CONFIG = {
  WHATSAPP_NUMBER: "213779711828",      // ← Your real WhatsApp number
  TELEGRAM_USERNAME: "DroxoShop",       // ← Your real Telegram username
  DISCORD_INVITE: "https://discord.gg/bSVaPTxQZW", // ← Global fallback Discord link
  ADMIN_PASSWORD: "Boulamokdad1972",
  STORAGE_KEYS: {
    PRODUCTS: "droxo_products",
    PROMOS: "droxo_promocodes",
    ADMIN_SESSION: "droxo_admin_session"
  }
};

/* ==========================================================================
   2. STORAGE HELPERS
   ========================================================================== */
function getProducts() {
  const data = localStorage.getItem(CONFIG.STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
  localStorage.setItem(CONFIG.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function getPromoCodes() {
  const data = localStorage.getItem(CONFIG.STORAGE_KEYS.PROMOS);
  return data ? JSON.parse(data) : [];
}

function savePromoCodes(promos) {
  localStorage.setItem(CONFIG.STORAGE_KEYS.PROMOS, JSON.stringify(promos));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

/* ==========================================================================
   3. PRICING ENGINE
   ========================================================================== */
function calculateBasePrice(cost, profitPercent) {
  return (parseFloat(cost) || 0) * (1 + (parseFloat(profitPercent) || 0) / 100);
}

function calculateFinalPrice(cost, profitPercent, discountPercent) {
  const base = calculateBasePrice(cost, profitPercent);
  const disc = parseFloat(discountPercent) || 0;
  return disc > 0 ? base * (1 - disc / 100) : base;
}

function formatPrice(value) {
  const rounded = Math.round(value * 100) / 100;
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2);
}

/* ==========================================================================
   4. ROUTER
   ========================================================================== */
const homeView    = document.getElementById("home-view");
const adminView   = document.getElementById("admin-view");
const searchWrapper = document.getElementById("searchWrapper");

function router() {
  const hash = window.location.hash.replace("#", "") || "home";
  if (hash === "admin") {
    if (!isAdminAuthenticated()) {
      window.location.hash = "home";
      openPasswordModal();
      return;
    }
    showAdminView();
  } else {
    showHomeView();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showAdminView() {
  homeView.style.display = "none";
  adminView.style.display = "block";
  searchWrapper.style.visibility = "hidden";
  renderAdminProductTable();
  renderAdminPromoList();
}

function showHomeView() {
  homeView.style.display = "block";
  adminView.style.display = "none";
  searchWrapper.style.visibility = "visible";
  renderProductsGrid();
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

/* ==========================================================================
   ADMIN AUTH
   ========================================================================== */
const passwordModalOverlay = document.getElementById("passwordModalOverlay");
const passwordForm         = document.getElementById("passwordForm");
const adminPasswordInput   = document.getElementById("adminPasswordInput");
const passwordCancelBtn    = document.getElementById("passwordCancelBtn");

function isAdminAuthenticated() {
  return sessionStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION) === "true";
}

function openPasswordModal() {
  passwordModalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
  setTimeout(() => adminPasswordInput.focus(), 100);
}

function closePasswordModal() {
  passwordModalOverlay.classList.remove("show");
  document.body.style.overflow = "";
  passwordForm.reset();
}

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (adminPasswordInput.value === CONFIG.ADMIN_PASSWORD) {
    sessionStorage.setItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION, "true");
    closePasswordModal();
    window.location.hash = "admin";
  } else {
    alert("Access Denied / عذراً، كلمة المرور خاطئة");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }
});

passwordCancelBtn.addEventListener("click", () => {
  closePasswordModal();
  if (window.location.hash.replace("#", "") !== "home") window.location.hash = "home";
});

passwordModalOverlay.addEventListener("click", (e) => {
  if (e.target === passwordModalOverlay) passwordCancelBtn.click();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && passwordModalOverlay.classList.contains("show")) {
    passwordCancelBtn.click();
  }
});

document.getElementById("adminDot").addEventListener("click", () => {
  isAdminAuthenticated() ? (window.location.hash = "admin") : openPasswordModal();
});

document.getElementById("logoHome").addEventListener("click", () => {
  window.location.hash = "home";
});

/* ==========================================================================
   5. STORE FRONT — RENDER PRODUCTS
   ========================================================================== */
const appliedPromosPerCard = {};
const productsGrid = document.getElementById("productsGrid");
const emptyState   = document.getElementById("emptyState");
const searchInput  = document.getElementById("searchInput");

function renderProductsGrid(filterText = "") {
  const products = getProducts();
  const term = filterText.trim().toLowerCase();
  const filtered = term ? products.filter(p => p.title.toLowerCase().includes(term)) : products;

  productsGrid.innerHTML = "";

  if (products.length === 0) {
    emptyState.style.display = "block";
    emptyState.querySelector("h3").textContent = "No Products Available Yet";
    emptyState.querySelector("p").textContent = "Please check back later. Our team is preparing amazing offers for you!";
    return;
  }

  if (filtered.length === 0) {
    emptyState.style.display = "block";
    emptyState.querySelector("h3").textContent = "No Matching Products";
    emptyState.querySelector("p").textContent = "Try a different search term.";
    return;
  }

  emptyState.style.display = "none";
  filtered.forEach(product => productsGrid.appendChild(buildProductCard(product)));
}

/**
 * Resolves the correct order link for a given platform and product.
 * Discord is always available (product-specific link or global fallback).
 */
function resolveOrderLink(platform, product, message) {
  const encoded = encodeURIComponent(message);

  switch (platform) {
    case "whatsapp": {
      const num = (product.whatsappNumber && product.whatsappNumber.trim())
        ? product.whatsappNumber.trim()
        : CONFIG.WHATSAPP_NUMBER;
      return `https://wa.me/${num}?text=${encoded}`;
    }
    case "telegram": {
      const user = (product.telegramUsername && product.telegramUsername.trim())
        ? product.telegramUsername.trim()
        : CONFIG.TELEGRAM_USERNAME;
      return `https://t.me/${user}?text=${encoded}`;
    }
    case "discord": {
      // Always use product-level discord link; fallback to global CONFIG
      const link = (product.discordLink && product.discordLink.trim())
        ? product.discordLink.trim()
        : CONFIG.DISCORD_INVITE;
      return link; // Discord invites don't support pre-filled text
    }
    default:
      return "#";
  }
}

/** Builds a single product card DOM element */
function buildProductCard(product) {
  const basePrice  = calculateBasePrice(product.cost, product.profitPercent);
  const finalPrice = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
  const hasDiscount = parseFloat(product.discountPercent) > 0;
  const isAvail = product.available;

  const card = document.createElement("div");
  card.className = "product-card" + (isAvail ? "" : " unavailable");
  card.dataset.id = product.id;

  // Badges
  let badgesHtml = "";
  if (product.topSeller)  badgesHtml += `<span class="badge badge-hot">🔥 HOT / الأكثر مبيعاً</span>`;
  if (hasDiscount)        badgesHtml += `<span class="badge badge-sale">💥 SALE / تخفيض</span>`;
  if (!isAvail)           badgesHtml += `<span class="badge badge-outofstock">Out of Stock / غير متوفر</span>`;

  const dis = isAvail ? "" : "disabled";

  card.innerHTML = `
    <div class="product-image-wrap">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}"
           onerror="this.src='https://via.placeholder.com/400x250/1e1e1e/888?text=No+Image'">
      ${badgesHtml}
    </div>

    <div class="product-body">
      <div class="product-title">${escapeHtml(product.title)}</div>

      <!-- Learn More button (Arabic RTL) -->
      <button type="button" class="btn btn-learn-more" data-learn-more>
        📄 معرفة المزيد حول المنتج
      </button>

      <div class="price-row">
        ${hasDiscount ? `<span class="price-original">${formatPrice(basePrice)} DA</span>` : ""}
        <span class="price-final" data-final-price="${finalPrice}">${formatPrice(finalPrice)} DA</span>
        <span class="applied-promo-tag" data-promo-tag></span>
      </div>

      <div class="promo-apply-row">
        <input type="text" placeholder="Promo code" data-promo-input maxlength="20" ${dis}>
        <button class="btn btn-apply btn-sm" data-apply-promo ${dis}>Apply</button>
      </div>
      <div class="promo-msg" data-promo-msg></div>

      <!-- THREE order buttons (always rendered; Discord always active) -->
      <div class="order-buttons">
        <button class="btn btn-whatsapp" data-order="whatsapp" ${dis} title="اطلب عبر الواتساب">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          واتساب
        </button>
        <button class="btn btn-telegram" data-order="telegram" ${dis} title="اطلب عبر التيليغرام">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
          تيليغرام
        </button>
        <button class="btn btn-discord" data-order="discord" title="اطلب عبر الديسكورد">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.134 18.12a19.919 19.919 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
          ديسكورد
        </button>
      </div>
    </div>
  `;

  return card;
}

/* Note: Discord button is intentionally NOT disabled even when product is
   unavailable, so users can still reach the server to ask questions. */

function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* Search */
searchInput.addEventListener("input", (e) => renderProductsGrid(e.target.value));

/* ==========================================================================
   EVENT DELEGATION — product card clicks
   ========================================================================== */
productsGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;
  const productId = card.dataset.id;

  // Promo apply
  if (e.target.closest("[data-apply-promo]")) {
    handleApplyPromo(card, productId);
    return;
  }

  // Order buttons (WhatsApp / Telegram / Discord)
  const orderBtn = e.target.closest("[data-order]");
  if (orderBtn) {
    // Discord is never disabled for ordering even if product unavailable
    const platform = orderBtn.dataset.order;
    if (platform !== "discord" && orderBtn.disabled) return;
    handleOrder(card, productId, platform);
    return;
  }

  // Learn More → open modal
  if (e.target.closest("[data-learn-more]")) {
    const products = getProducts();
    const product  = products.find(p => p.id === productId);
    if (product) {
      const priceEl    = card.querySelector(".price-final");
      const finalPrice = parseFloat(priceEl.dataset.finalPrice);
      openProductDetailsModal(product, finalPrice);
    }
  }
});

/* ==========================================================================
   PROMO CODE HANDLING (card-level)
   ========================================================================== */
function handleApplyPromo(card, productId) {
  const input = card.querySelector("[data-promo-input]");
  const msgEl = card.querySelector("[data-promo-msg]");
  const code  = input.value.trim().toUpperCase();

  if (!code) { showPromoMsg(msgEl, "Please enter a code.", false); return; }

  const match = getPromoCodes().find(p => p.code.toUpperCase() === code);
  if (!match) {
    showPromoMsg(msgEl, "Invalid promo code / كود غير صالح", false);
    delete appliedPromosPerCard[productId];
    updateCardPriceDisplay(card, productId);
    return;
  }

  appliedPromosPerCard[productId] = match;
  showPromoMsg(msgEl, `Promo "${match.code}" applied: -${match.discountValue}%`, true);
  updateCardPriceDisplay(card, productId);
}

function showPromoMsg(el, text, success) {
  el.textContent = text;
  el.className = "promo-msg " + (success ? "success" : "error");
}

function updateCardPriceDisplay(card, productId) {
  const product = getProducts().find(p => p.id === productId);
  if (!product) return;

  const base    = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
  const priceEl = card.querySelector(".price-final");
  const tagEl   = card.querySelector("[data-promo-tag]");
  const applied = appliedPromosPerCard[productId];
  let displayed = base;

  if (applied) {
    displayed = base * (1 - applied.discountValue / 100);
    tagEl.textContent = `Code: ${applied.code}`;
    tagEl.style.display = "inline-block";
  } else {
    tagEl.style.display = "none";
  }

  priceEl.textContent = `${formatPrice(displayed)} DA`;
  priceEl.dataset.finalPrice = displayed;
}

/* ==========================================================================
   ORDER MESSAGE BUILDER & LINK OPENER
   ========================================================================== */
function buildOrderMessage(product, finalPrice, appliedPromo) {
  let msg = `🛒 New Order from Droxo Shop\n`;
  msg += `----------------------------\n`;
  msg += `📦 Product: ${product.title}\n`;
  msg += `💰 Final Price: ${formatPrice(finalPrice)} DA\n`;
  if (appliedPromo) msg += `🏷️ Promo Code: ${appliedPromo.code} (-${appliedPromo.discountValue}%)\n`;
  msg += `----------------------------\n`;
  msg += `Please confirm my order. Thank you!`;
  return msg;
}

function openOrderLink(platform, product, finalPrice, appliedPromo) {
  const message = buildOrderMessage(product, finalPrice, appliedPromo);
  const url     = resolveOrderLink(platform, product, message);
  if (url && url !== "#") window.open(url, "_blank");
}

function handleOrder(card, productId, platform) {
  const product = getProducts().find(p => p.id === productId);
  if (!product) return;
  const finalPrice = parseFloat(card.querySelector(".price-final").dataset.finalPrice);
  const applied    = appliedPromosPerCard[productId];
  openOrderLink(platform, product, finalPrice, applied);
}

/* ==========================================================================
   PRODUCT DETAILS MODAL — "Learn More"
   ========================================================================== */
const productDetailsModalOverlay = document.getElementById("productDetailsModal");
const modalProductImage          = document.getElementById("modalProductImage");
const modalProductTitle          = document.getElementById("modalProductTitle");
const modalProductDescription    = document.getElementById("modalProductDescription");
const modalProductPrice          = document.getElementById("modalProductPrice");
const modalOutOfStockNote        = document.getElementById("modalOutOfStockNote");
const productModalCloseBtn       = document.getElementById("productModalCloseBtn");
const modalOrderButtons          = document.getElementById("modalOrderButtons");

// Individual modal order buttons
const modalWhatsappBtn = document.getElementById("modalWhatsappBtn");
const modalTelegramBtn = document.getElementById("modalTelegramBtn");
const modalDiscordBtn  = document.getElementById("modalDiscordBtn");

let currentModalContext = null;

function openProductDetailsModal(product, finalPrice) {
  const appliedPromo = appliedPromosPerCard[product.id] || null;
  currentModalContext = { product, finalPrice, appliedPromo };

  modalProductImage.src       = product.image;
  modalProductImage.alt       = product.title;
  modalProductTitle.textContent = product.title;
  modalProductDescription.textContent = (product.description && product.description.trim())
    ? product.description
    : "لا يوجد وصف إضافي لهذا المنتج حالياً. / No additional description provided yet.";
  modalProductPrice.textContent = `${formatPrice(finalPrice)} DA`;

  if (product.available) {
    modalOutOfStockNote.style.display = "none";
    // Enable WhatsApp + Telegram; Discord always enabled
    modalWhatsappBtn.disabled = false;
    modalTelegramBtn.disabled = false;
    modalWhatsappBtn.style.display = "inline-flex";
    modalTelegramBtn.style.display = "inline-flex";
  } else {
    modalOutOfStockNote.style.display = "block";
    // Disable WhatsApp & Telegram for out-of-stock items, but keep Discord active
    modalWhatsappBtn.disabled = true;
    modalTelegramBtn.disabled = true;
    modalWhatsappBtn.style.display = "inline-flex";
    modalTelegramBtn.style.display = "inline-flex";
  }

  // Discord is always shown and always active
  modalDiscordBtn.disabled = false;
  modalDiscordBtn.style.display = "inline-flex";

  productDetailsModalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeProductDetailsModal() {
  productDetailsModalOverlay.classList.remove("show");
  document.body.style.overflow = "";
  currentModalContext = null;
}

productModalCloseBtn.addEventListener("click", closeProductDetailsModal);

productDetailsModalOverlay.addEventListener("click", (e) => {
  if (e.target === productDetailsModalOverlay) closeProductDetailsModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productDetailsModalOverlay.classList.contains("show")) {
    closeProductDetailsModal();
  }
});

/* Modal platform button clicks — delegate via the buttons container */
[modalWhatsappBtn, modalTelegramBtn, modalDiscordBtn].forEach(btn => {
  btn.addEventListener("click", () => {
    if (!currentModalContext) return;
    const { product, finalPrice, appliedPromo } = currentModalContext;
    const platform = btn.dataset.modalOrder;
    openOrderLink(platform, product, finalPrice, appliedPromo);
  });
});

/* ==========================================================================
   6. ADMIN — PRODUCT MANAGEMENT
   ========================================================================== */
const productForm    = document.getElementById("productForm");
const productIdInput = document.getElementById("productId");
const prodTitle      = document.getElementById("prodTitle");
const prodImage      = document.getElementById("prodImage");
const prodCost       = document.getElementById("prodCost");
const prodProfit     = document.getElementById("prodProfit");
const prodDiscount   = document.getElementById("prodDiscount");
const prodDescription = document.getElementById("prodDescription");
const prodWhatsapp   = document.getElementById("prodWhatsapp");
const prodTelegram   = document.getElementById("prodTelegram");
const prodDiscord    = document.getElementById("prodDiscord");
const prodTopSeller  = document.getElementById("prodTopSeller");
const prodAvailable  = document.getElementById("prodAvailable");
const pricePreview   = document.getElementById("pricePreview");
const formTitle      = document.getElementById("formTitle");
const submitBtn      = document.getElementById("submitBtn");
const cancelEditBtn  = document.getElementById("cancelEditBtn");
const productsTableBody = document.getElementById("productsTableBody");

function updatePricePreview() {
  const cost    = prodCost.value;
  const profit  = prodProfit.value;
  const discount = prodDiscount.value;

  if (!cost || !profit) {
    pricePreview.innerHTML = "Final Price: <strong>-- DA</strong>";
    return;
  }

  const base  = calculateBasePrice(cost, profit);
  const final = calculateFinalPrice(cost, profit, discount);
  const hasDiscount = parseFloat(discount) > 0;

  pricePreview.innerHTML = hasDiscount
    ? `Base: <s>${formatPrice(base)} DA</s> &nbsp;→&nbsp; Final: <strong>${formatPrice(final)} DA</strong>`
    : `Final Price: <strong>${formatPrice(final)} DA</strong>`;
}

[prodCost, prodProfit, prodDiscount].forEach(inp => inp.addEventListener("input", updatePricePreview));

productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const products  = getProducts();
  const editingId = productIdInput.value;

  // Validate Discord link (required)
  const discordVal = prodDiscord.value.trim();
  if (!discordVal) {
    showToast("⚠️ Discord link is required for every product.");
    prodDiscord.focus();
    return;
  }

  const productData = {
    id:              editingId || generateId(),
    title:           prodTitle.value.trim(),
    image:           prodImage.value.trim(),
    cost:            parseFloat(prodCost.value) || 0,
    profitPercent:   parseFloat(prodProfit.value) || 0,
    discountPercent: parseFloat(prodDiscount.value) || 0,
    description:     prodDescription.value.trim(),
    whatsappNumber:  prodWhatsapp.value.trim(),   // optional override
    telegramUsername: prodTelegram.value.trim(),  // optional override
    discordLink:     discordVal,                  // required
    topSeller:       prodTopSeller.checked,
    available:       prodAvailable.checked
  };

  if (editingId) {
    const index = products.findIndex(p => p.id === editingId);
    if (index !== -1) products[index] = productData;
    showToast("✅ Product updated successfully!");
  } else {
    products.push(productData);
    showToast("✅ Product added successfully!");
  }

  saveProducts(products);
  resetProductForm();
  renderAdminProductTable();
});

function resetProductForm() {
  productForm.reset();
  productIdInput.value = "";
  prodAvailable.checked = true;
  formTitle.textContent = "➕ Add New Product";
  submitBtn.textContent = "Add Product";
  cancelEditBtn.style.display = "none";
  pricePreview.innerHTML = "Final Price: <strong>-- DA</strong>";
}

cancelEditBtn.addEventListener("click", resetProductForm);

function editProduct(id) {
  const product = getProducts().find(p => p.id === id);
  if (!product) return;

  productIdInput.value    = product.id;
  prodTitle.value         = product.title;
  prodImage.value         = product.image;
  prodCost.value          = product.cost;
  prodProfit.value        = product.profitPercent;
  prodDiscount.value      = product.discountPercent;
  prodDescription.value   = product.description || "";
  prodWhatsapp.value      = product.whatsappNumber || "";
  prodTelegram.value      = product.telegramUsername || "";
  prodDiscord.value       = product.discordLink || "";
  prodTopSeller.checked   = product.topSeller;
  prodAvailable.checked   = product.available;

  formTitle.textContent  = "✏️ Edit Product";
  submitBtn.textContent  = "Update Product";
  cancelEditBtn.style.display = "inline-flex";

  updatePricePreview();
  document.querySelector(".admin-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  saveProducts(getProducts().filter(p => p.id !== id));
  renderAdminProductTable();
  showToast("🗑️ Product deleted.");
}

function toggleProductStatus(id) {
  const products = getProducts();
  const product  = products.find(p => p.id === id);
  if (!product) return;
  product.available = !product.available;
  saveProducts(products);
  renderAdminProductTable();
  showToast(`🔄 Status → ${product.available ? "Available" : "Unavailable"}`);
}

function renderAdminProductTable() {
  const products = getProducts();

  if (products.length === 0) {
    productsTableBody.innerHTML = `<tr><td colspan="10" style="text-align:center;color:#6b6b6b;padding:24px;">No products yet.</td></tr>`;
    return;
  }

  productsTableBody.innerHTML = products.map(product => {
    const finalPrice = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
    const discordDisplay = product.discordLink
      ? `<a href="${escapeHtml(product.discordLink)}" target="_blank" class="discord-pill">🔗 Link</a>`
      : `<span style="color:#ff6b6b;font-size:12px;">⚠️ Missing</span>`;

    return `
      <tr>
        <td><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}"
            onerror="this.src='https://via.placeholder.com/60/1e1e1e/888?text=IMG'"></td>
        <td>${escapeHtml(product.title)}</td>
        <td>${formatPrice(product.cost)} DA</td>
        <td>${product.profitPercent}%</td>
        <td>${product.discountPercent}%</td>
        <td><strong>${formatPrice(finalPrice)} DA</strong></td>
        <td>${discordDisplay}</td>
        <td>
          <span class="status-pill ${product.available ? "status-available" : "status-unavailable"}">
            ${product.available ? "Available" : "Unavailable"}
          </span>
        </td>
        <td>${product.topSeller ? "🔥 Yes" : "—"}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-sm btn-edit" onclick="editProduct('${product.id}')">Edit</button>
            <button class="btn btn-sm btn-toggle" onclick="toggleProductStatus('${product.id}')">Toggle</button>
            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

/* ==========================================================================
   7. ADMIN — PROMO CODES
   ========================================================================== */
const promoForm       = document.getElementById("promoForm");
const promoCodeInput  = document.getElementById("promoCode");
const promoValueInput = document.getElementById("promoValue");
const promoList       = document.getElementById("promoList");

promoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const code  = promoCodeInput.value.trim().toUpperCase();
  const value = parseFloat(promoValueInput.value);

  if (!code || !value || value <= 0 || value > 100) {
    showToast("⚠️ Please enter a valid code and discount value.");
    return;
  }

  const promos = getPromoCodes();
  if (promos.some(p => p.code.toUpperCase() === code)) {
    showToast("⚠️ This promo code already exists.");
    return;
  }

  promos.push({ id: generateId(), code, discountValue: value });
  savePromoCodes(promos);
  promoForm.reset();
  renderAdminPromoList();
  showToast("✅ Promo code added!");
});

function deletePromoCode(id) {
  if (!confirm("Delete this promo code?")) return;
  savePromoCodes(getPromoCodes().filter(p => p.id !== id));
  renderAdminPromoList();
  showToast("🗑️ Promo code deleted.");
}

function renderAdminPromoList() {
  const promos = getPromoCodes();
  if (promos.length === 0) {
    promoList.innerHTML = `<p class="muted-text">No promo codes created yet.</p>`;
    return;
  }
  promoList.innerHTML = promos.map(promo => `
    <div class="promo-item">
      <div>
        <span class="promo-code">${escapeHtml(promo.code)}</span>
        <span class="promo-value">-${promo.discountValue}%</span>
      </div>
      <button class="btn btn-sm btn-danger" onclick="deletePromoCode('${promo.id}')">Delete</button>
    </div>
  `).join("");
}

/* ==========================================================================
   8. TOAST
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2800);
}
