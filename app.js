/* ==========================================================================
   DROXO SHOP - APPLICATION LOGIC
   Pure Vanilla JavaScript (No frameworks) - Client-side only
   Uses Local Storage as a simulated database for Products & Promo Codes
   ========================================================================== */

/* ==========================================================================
   1. CONFIGURATION
   -------------------------------------------------------------------------
   Change these values to your real WhatsApp number (with country code, no
   "+" or spaces) and your real Telegram username.
   ========================================================================== */
const CONFIG = {
  WHATSAPP_NUMBER: "213779711828",   // <-- Replace with your real WhatsApp number
  TELEGRAM_USERNAME: "DroxoShop",    // <-- Replace with your real Telegram username
  ADMIN_PASSWORD: "Boulamokdad1972",       // <-- Change this to your own secret admin password
  STORAGE_KEYS: {
    PRODUCTS: "droxo_products",
    PROMOS: "droxo_promocodes",
    ADMIN_SESSION: "droxo_admin_session" // sessionStorage key used to remember unlocked state
  }
};

/* ==========================================================================
   2. STORAGE HELPERS (Local Storage acting as a database)
   ========================================================================== */

/** Get all products from Local Storage (returns empty array if none exist) */
function getProducts() {
  const data = localStorage.getItem(CONFIG.STORAGE_KEYS.PRODUCTS);
  return data ? JSON.parse(data) : [];
}

/** Save the full products array back to Local Storage */
function saveProducts(products) {
  localStorage.setItem(CONFIG.STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

/** Get all promo codes from Local Storage */
function getPromoCodes() {
  const data = localStorage.getItem(CONFIG.STORAGE_KEYS.PROMOS);
  return data ? JSON.parse(data) : [];
}

/** Save the full promo codes array back to Local Storage */
function savePromoCodes(promos) {
  localStorage.setItem(CONFIG.STORAGE_KEYS.PROMOS, JSON.stringify(promos));
}

/** Generate a simple unique ID based on timestamp + random string */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

/* ==========================================================================
   3. PRICING ENGINE
   -------------------------------------------------------------------------
   Final Selling Price = Cost * (1 + Profit% / 100)
   If Discount% > 0, the discount is applied on top of that calculated price.
   ========================================================================== */

/** Calculates price after applying profit margin (before discount) */
function calculateBasePrice(cost, profitPercent) {
  const costNum = parseFloat(cost) || 0;
  const profitNum = parseFloat(profitPercent) || 0;
  return costNum * (1 + profitNum / 100);
}

/** Calculates the final price after profit + discount */
function calculateFinalPrice(cost, profitPercent, discountPercent) {
  const base = calculateBasePrice(cost, profitPercent);
  const discountNum = parseFloat(discountPercent) || 0;
  if (discountNum > 0) {
    return base * (1 - discountNum / 100);
  }
  return base;
}

/** Rounds a price nicely to 2 decimals max (removes trailing .00) */
function formatPrice(value) {
  const rounded = Math.round(value * 100) / 100;
  return rounded % 1 === 0 ? rounded.toString() : rounded.toFixed(2);
}

/* ==========================================================================
   4. ROUTER (SPA via URL Hash)
   ========================================================================== */

const homeView = document.getElementById("home-view");
const adminView = document.getElementById("admin-view");
const searchWrapper = document.getElementById("searchWrapper");

/** Reads the current hash and shows the corresponding view */
function router() {
  const hash = window.location.hash.replace("#", "") || "home";

  if (hash === "admin") {
    // ---- SECURITY GATE ----
    // Even if a user manually types "index.html#admin" in the URL bar,
    // the router intercepts it here. If the session isn't authenticated,
    // we immediately bounce back to #home and pop up the password modal.
    if (!isAdminAuthenticated()) {
      window.location.hash = "home"; // triggers hashchange -> router() runs again for "home"
      openPasswordModal();
      return;
    }
    showAdminView();
  } else {
    showHomeView();
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Displays the admin dashboard view (only called once authenticated) */
function showAdminView() {
  homeView.style.display = "none";
  adminView.style.display = "block";
  searchWrapper.style.visibility = "hidden";
  renderAdminProductTable();
  renderAdminPromoList();
}

/** Displays the public storefront view */
function showHomeView() {
  homeView.style.display = "block";
  adminView.style.display = "none";
  searchWrapper.style.visibility = "visible";
  renderProductsGrid();
}

// Listen for hash changes (back/forward navigation, manual link clicks)
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

/* ==========================================================================
   ADMIN PASSWORD PROTECTION LOGIC
   -------------------------------------------------------------------------
   - The admin dashboard is completely hidden from normal navigation.
   - Access is only offered via the tiny hidden dot "." in the footer text.
   - A stylish custom modal (not a native browser prompt) asks for the
     password. sessionStorage keeps the dashboard unlocked only for the
     current browser tab session (resets when the tab/browser is closed).
   ========================================================================== */

const passwordModalOverlay = document.getElementById("passwordModalOverlay");
const passwordForm = document.getElementById("passwordForm");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const passwordCancelBtn = document.getElementById("passwordCancelBtn");

/** Checks if the current browser tab session has already unlocked admin access */
function isAdminAuthenticated() {
  return sessionStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION) === "true";
}

/** Opens the password modal and focuses the input field */
function openPasswordModal() {
  passwordModalOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
  setTimeout(() => adminPasswordInput.focus(), 100);
}

/** Closes the password modal and clears the input */
function closePasswordModal() {
  passwordModalOverlay.classList.remove("show");
  document.body.style.overflow = "";
  passwordForm.reset();
}

/** Handles password form submission */
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entered = adminPasswordInput.value;

  if (entered === CONFIG.ADMIN_PASSWORD) {
    // Correct password: unlock this session and grant access to #admin
    sessionStorage.setItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION, "true");
    closePasswordModal();
    window.location.hash = "admin";
  } else {
    // Incorrect password: deny access, keep user on #home
    alert("Access Denied / عذراً، كلمة المرور خاطئة");
    adminPasswordInput.value = "";
    adminPasswordInput.focus();
  }
});

/** Cancel button closes the modal and keeps the user on the storefront */
passwordCancelBtn.addEventListener("click", () => {
  closePasswordModal();
  if (window.location.hash.replace("#", "") !== "home") {
    window.location.hash = "home";
  }
});

/** Allow closing the modal by clicking on the dark overlay background */
passwordModalOverlay.addEventListener("click", (e) => {
  if (e.target === passwordModalOverlay) {
    passwordCancelBtn.click();
  }
});

/** Allow closing the modal with the Escape key */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && passwordModalOverlay.classList.contains("show")) {
    passwordCancelBtn.click();
  }
});

/* --- Hidden Admin Access: clicking the tiny dot in the footer --- */
document.getElementById("adminDot").addEventListener("click", () => {
  if (isAdminAuthenticated()) {
    // Already unlocked this session: go straight to the dashboard
    window.location.hash = "admin";
  } else {
    // Not unlocked yet: ask for the password first
    openPasswordModal();
  }
});

/* Clicking logo always returns to home */
document.getElementById("logoHome").addEventListener("click", () => {
  window.location.hash = "home";
});

/* ==========================================================================
   5. STORE FRONT - RENDERING PRODUCTS
   ========================================================================== */

// Keeps track of promo codes applied per product card (session-only, not persisted)
const appliedPromosPerCard = {};

const productsGrid = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");

/** Renders the product grid, optionally filtered by a search term */
function renderProductsGrid(filterText = "") {
  const products = getProducts();
  const term = filterText.trim().toLowerCase();

  const filtered = term
    ? products.filter(p => p.title.toLowerCase().includes(term))
    : products;

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

  filtered.forEach(product => {
    productsGrid.appendChild(buildProductCard(product));
  });
}

/** Builds a single product card DOM element */
function buildProductCard(product) {
  const basePrice = calculateBasePrice(product.cost, product.profitPercent);
  const finalPrice = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
  const hasDiscount = parseFloat(product.discountPercent) > 0;

  const card = document.createElement("div");
  card.className = "product-card" + (product.available ? "" : " unavailable");
  card.dataset.id = product.id;

  // Badges
  let badgesHtml = "";
  if (product.topSeller) {
    badgesHtml += `<span class="badge badge-hot">🔥 HOT / الأكثر مبيعاً</span>`;
  }
  if (hasDiscount) {
    badgesHtml += `<span class="badge badge-sale">💥 SALE / تخفيض</span>`;
  }
  if (!product.available) {
    badgesHtml += `<span class="badge badge-outofstock">Out of Stock / غير متوفر</span>`;
  }

  card.innerHTML = `
    <div class="product-image-wrap">
      <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" onerror="this.src='https://via.placeholder.com/400x250/1e1e1e/888?text=No+Image'">
      ${badgesHtml}
    </div>
    <div class="product-body">
      <div class="product-title">${escapeHtml(product.title)}</div>

      <div class="price-row">
        ${hasDiscount ? `<span class="price-original">${formatPrice(basePrice)} DA</span>` : ""}
        <span class="price-final" data-final-price="${finalPrice}">${formatPrice(finalPrice)} DA</span>
        <span class="applied-promo-tag" data-promo-tag></span>
      </div>

      <div class="promo-apply-row">
        <input type="text" placeholder="Promo code" data-promo-input maxlength="20" ${product.available ? "" : "disabled"}>
        <button class="btn btn-apply btn-sm" data-apply-promo ${product.available ? "" : "disabled"}>Apply</button>
      </div>
      <div class="promo-msg" data-promo-msg></div>

      <div class="order-buttons">
        <button class="btn btn-whatsapp" data-order="whatsapp" ${product.available ? "" : "disabled"}>
          🟢 Order via WhatsApp
        </button>
        <button class="btn btn-telegram" data-order="telegram" ${product.available ? "" : "disabled"}>
          🔵 Order via Telegram
        </button>
      </div>
    </div>
  `;

  return card;
}

/** Basic HTML escaping to prevent broken markup from special characters */
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* --- Search bar: filters instantly as user types --- */
searchInput.addEventListener("input", (e) => {
  renderProductsGrid(e.target.value);
});

/* --- Event delegation for dynamically created product cards --- */
productsGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;
  const productId = card.dataset.id;

  // Apply promo code button
  if (e.target.closest("[data-apply-promo]")) {
    handleApplyPromo(card, productId);
  }

  // Order buttons
  const orderBtn = e.target.closest("[data-order]");
  if (orderBtn && !orderBtn.disabled) {
    const platform = orderBtn.dataset.order;
    handleOrder(card, productId, platform);
  }
});

/** Validates and applies a promo code to a specific product card */
function handleApplyPromo(card, productId) {
  const input = card.querySelector("[data-promo-input]");
  const msgEl = card.querySelector("[data-promo-msg]");
  const code = input.value.trim().toUpperCase();

  if (!code) {
    showPromoMsg(msgEl, "Please enter a code.", false);
    return;
  }

  const promos = getPromoCodes();
  const match = promos.find(p => p.code.toUpperCase() === code);

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

/** Recalculates and updates the displayed price after a promo is applied */
function updateCardPriceDisplay(card, productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const finalPriceBeforePromo = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
  const priceEl = card.querySelector(".price-final");
  const tagEl = card.querySelector("[data-promo-tag]");

  const applied = appliedPromosPerCard[productId];
  let displayedPrice = finalPriceBeforePromo;

  if (applied) {
    displayedPrice = finalPriceBeforePromo * (1 - applied.discountValue / 100);
    tagEl.textContent = `Code: ${applied.code}`;
    tagEl.style.display = "inline-block";
  } else {
    tagEl.style.display = "none";
  }

  priceEl.textContent = `${formatPrice(displayedPrice)} DA`;
  priceEl.dataset.finalPrice = displayedPrice;
}

/** Builds the order message and redirects to WhatsApp or Telegram */
function handleOrder(card, productId, platform) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const priceEl = card.querySelector(".price-final");
  const finalPrice = parseFloat(priceEl.dataset.finalPrice);
  const applied = appliedPromosPerCard[productId];

  let message = `🛒 New Order from Droxo Shop\n`;
  message += `----------------------------\n`;
  message += `📦 Product: ${product.title}\n`;
  message += `💰 Final Price: ${formatPrice(finalPrice)} DA\n`;
  if (applied) {
    message += `🏷️ Promo Code Used: ${applied.code} (-${applied.discountValue}%)\n`;
  }
  message += `----------------------------\n`;
  message += `Please confirm my order. Thank you!`;

  const encodedMsg = encodeURIComponent(message);

  let url = "";
  if (platform === "whatsapp") {
    url = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMsg}`;
  } else if (platform === "telegram") {
    url = `https://t.me/${CONFIG.TELEGRAM_USERNAME}?text=${encodedMsg}`;
  }

  window.open(url, "_blank");
}

/* ==========================================================================
   6. ADMIN DASHBOARD - PRODUCT MANAGEMENT
   ========================================================================== */

const productForm = document.getElementById("productForm");
const productIdInput = document.getElementById("productId");
const prodTitle = document.getElementById("prodTitle");
const prodImage = document.getElementById("prodImage");
const prodCost = document.getElementById("prodCost");
const prodProfit = document.getElementById("prodProfit");
const prodDiscount = document.getElementById("prodDiscount");
const prodTopSeller = document.getElementById("prodTopSeller");
const prodAvailable = document.getElementById("prodAvailable");
const pricePreview = document.getElementById("pricePreview");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const productsTableBody = document.getElementById("productsTableBody");

/** Live price preview calculation as admin types values */
function updatePricePreview() {
  const cost = prodCost.value;
  const profit = prodProfit.value;
  const discount = prodDiscount.value;

  if (!cost || !profit) {
    pricePreview.innerHTML = "Final Price: <strong>-- DA</strong>";
    return;
  }

  const base = calculateBasePrice(cost, profit);
  const final = calculateFinalPrice(cost, profit, discount);
  const hasDiscount = parseFloat(discount) > 0;

  pricePreview.innerHTML = hasDiscount
    ? `Base Price: <s>${formatPrice(base)} DA</s> &nbsp; Final Price: <strong>${formatPrice(final)} DA</strong>`
    : `Final Price: <strong>${formatPrice(final)} DA</strong>`;
}

[prodCost, prodProfit, prodDiscount].forEach(input => {
  input.addEventListener("input", updatePricePreview);
});

/** Handles both adding a new product and updating an existing one */
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const products = getProducts();
  const editingId = productIdInput.value;

  const productData = {
    id: editingId || generateId(),
    title: prodTitle.value.trim(),
    image: prodImage.value.trim(),
    cost: parseFloat(prodCost.value) || 0,
    profitPercent: parseFloat(prodProfit.value) || 0,
    discountPercent: parseFloat(prodDiscount.value) || 0,
    topSeller: prodTopSeller.checked,
    available: prodAvailable.checked
  };

  if (editingId) {
    // Update existing product
    const index = products.findIndex(p => p.id === editingId);
    if (index !== -1) products[index] = productData;
    showToast("✅ Product updated successfully!");
  } else {
    // Add new product
    products.push(productData);
    showToast("✅ Product added successfully!");
  }

  saveProducts(products);
  resetProductForm();
  renderAdminProductTable();
});

/** Resets the product form back to "Add" mode */
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

/** Loads a product's data back into the form for editing */
function editProduct(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (!product) return;

  productIdInput.value = product.id;
  prodTitle.value = product.title;
  prodImage.value = product.image;
  prodCost.value = product.cost;
  prodProfit.value = product.profitPercent;
  prodDiscount.value = product.discountPercent;
  prodTopSeller.checked = product.topSeller;
  prodAvailable.checked = product.available;

  formTitle.textContent = "✏️ Edit Product";
  submitBtn.textContent = "Update Product";
  cancelEditBtn.style.display = "inline-flex";

  updatePricePreview();
  document.querySelector(".admin-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Deletes a product permanently after confirmation */
function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderAdminProductTable();
  showToast("🗑️ Product deleted.");
}

/** Toggles a product's availability status instantly */
function toggleProductStatus(id) {
  const products = getProducts();
  const product = products.find(p => p.id === id);
  if (!product) return;
  product.available = !product.available;
  saveProducts(products);
  renderAdminProductTable();
  showToast(`🔄 Status changed to ${product.available ? "Available" : "Unavailable"}.`);
}

/** Renders the admin product control table */
function renderAdminProductTable() {
  const products = getProducts();

  if (products.length === 0) {
    productsTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:#6b6b6b; padding:24px;">No products yet. Add your first product above.</td></tr>`;
    return;
  }

  productsTableBody.innerHTML = products.map(product => {
    const finalPrice = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
    return `
      <tr>
        <td><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" onerror="this.src='https://via.placeholder.com/60/1e1e1e/888?text=IMG'"></td>
        <td>${escapeHtml(product.title)}</td>
        <td>${formatPrice(product.cost)} DA</td>
        <td>${product.profitPercent}%</td>
        <td>${product.discountPercent}%</td>
        <td><strong>${formatPrice(finalPrice)} DA</strong></td>
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
   7. ADMIN DASHBOARD - PROMO CODES MANAGEMENT
   ========================================================================== */

const promoForm = document.getElementById("promoForm");
const promoCodeInput = document.getElementById("promoCode");
const promoValueInput = document.getElementById("promoValue");
const promoList = document.getElementById("promoList");

/** Adds a new global promo code */
promoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const code = promoCodeInput.value.trim().toUpperCase();
  const value = parseFloat(promoValueInput.value);

  if (!code || !value || value <= 0 || value > 100) {
    showToast("⚠️ Please enter a valid code and discount value.");
    return;
  }

  const promos = getPromoCodes();

  // Prevent duplicate codes
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

/** Deletes a promo code by id */
function deletePromoCode(id) {
  if (!confirm("Delete this promo code?")) return;
  let promos = getPromoCodes();
  promos = promos.filter(p => p.id !== id);
  savePromoCodes(promos);
  renderAdminPromoList();
  showToast("🗑️ Promo code deleted.");
}

/** Renders the list of promo codes inside the admin dashboard */
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
   8. TOAST NOTIFICATIONS
   ========================================================================== */

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* ==========================================================================
   9. INITIALIZATION
   ========================================================================== */

// The router() call on DOMContentLoaded (registered above) handles the
// initial render of whichever view matches the current URL hash.
