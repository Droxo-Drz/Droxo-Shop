/* ==========================================================================
   DROXO SHOP — app.js  v5  (Supabase Backend)
   All 7 features preserved — localStorage replaced with Supabase DB
   ========================================================================== */

/* ══════════════════════════════════════════════════════════════════════════
   ① SUPABASE CONFIG  ← defined at the very top
   ══════════════════════════════════════════════════════════════════════════ */
const SUPABASE_URL     = 'https://btxmvkdlxcbnqvlcuxzb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_oKG9Cc_JAtKGbVnq-ep07g_LpLdLCiw';

/* Initialize Supabase client
   NOTE: The global from the CDN is `supabase` (lowercase), so we call
   supabase.createClient() and store the result in `supabaseClient`
   to avoid a naming collision with the CDN global object itself.       */
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ══════════════════════════════════════════════════════════════════════════
   ② CONFIGURATION  ← edit these values
   ══════════════════════════════════════════════════════════════════════════ */
const CONFIG = {
  WHATSAPP_NUMBER:   "213779711828",
  TELEGRAM_USERNAME: "DroxoShop",
  DISCORD_INVITE:    "https://discord.gg/bSVaPTxQZW",
  ADMIN_PASSWORD:    "Boulamokdad1972",
  STORAGE_KEYS: {
    /* Products are now in Supabase — only promos & session stay local */
    PROMOS:        "droxo_promocodes",
    ADMIN_SESSION: "droxo_admin_session"
  }
};

/* ── Feature 4: Discord Webhook URL ─────────────────────────────────────── */
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1526595172257890495/z4h2S55tHBplz3uoa5cvQwiCmHuWZ_BA7Ru6QBkNH8iEYjqZwpirDO5ZkFQ0H4OVzhT8";

/* ── Category metadata ──────────────────────────────────────────────────── */
const CATEGORY_META = {
  mobile:    { label: "📱 ألعاب الهاتف",  color: 0x22d3ee },
  giftcards: { label: "🎁 بطاقات شحن",     color: 0xa855f7 },
  pc:        { label: "🖥️ حسابات PC",      color: 0x39ff88 }
};

/* ══════════════════════════════════════════════════════════════════════════
   ③ SUPABASE PRODUCT HELPERS  (replace old localStorage helpers)
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Fetch all products from Supabase.
 * Returns an array of product objects (mapped from DB column names
 * to the shape the rest of the app already understands).
 */
async function fetchProducts() {
  const { data, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('fetchProducts error:', error.message);
    showToast('⚠️ تعذّر تحميل المنتجات. تحقق من الاتصال.');
    return [];
  }

  /* Map Supabase column names → internal property names used
     throughout the existing card/table render code.             */
  return (data || []).map(mapDbRowToProduct);
}
/**
 * Insert a new product row into Supabase.
 * `productData` uses internal property names; we map to DB columns here.
 */
async function insertProduct(productData) {
  const { error } = await supabaseClient
    .from('products')
    .insert([mapProductToDbRow(productData)]);

  if (error) {
    console.error('insertProduct error:', error.message);
    showToast('⚠️ فشل إضافة المنتج: ' + error.message);
    return false;
  }
  return true;
}

/**
 * Update an existing product row in Supabase by its numeric `id`.
 */
async function updateProduct(productData) {
  const { error } = await supabaseClient
    .from('products')
    .update(mapProductToDbRow(productData))
    .eq('id', productData.id);

  if (error) {
    console.error('updateProduct error:', error.message);
    showToast('⚠️ فشل تحديث المنتج: ' + error.message);
    return false;
  }
  return true;
}

/**
 * Delete a product row from Supabase by its numeric `id`.
 */
async function deleteProductFromDb(id) {
  const { error } = await supabaseClient
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('deleteProduct error:', error.message);
    showToast('⚠️ فشل حذف المنتج: ' + error.message);
    return false;
  }
  return true;
}

/* ── Column-name mapping helpers ────────────────────────────────────────── */

/**
 * Convert a raw Supabase DB row → the internal product object shape
 * that all existing render/logic functions already expect.
 *
 * Supabase schema:
 *   id, created_at, title, price, image_url, category, description
 *
 * We store extra fields (cost, profit %, discord link, etc.) inside
 * the `description` column as a JSON prefix so we don't need to alter
 * the schema.  Format:
 *   __meta__<JSON>\n<human description>
 *
 * If no meta prefix is found the product is treated as having price
 * stored directly in `price` with 0 % profit / 0 % discount.
 */
function mapDbRowToProduct(row) {
  let meta        = {};
  let description = row.description || '';

  /* Parse embedded meta block if present */
  if (description.startsWith('__meta__')) {
    const newline = description.indexOf('\n');
    try {
      const jsonStr = newline === -1
        ? description.slice(8)
        : description.slice(8, newline);
      meta        = JSON.parse(jsonStr);
      description = newline === -1 ? '' : description.slice(newline + 1);
    } catch (_) {
      /* Malformed meta — ignore, fall through */
    }
  }

  return {
    id:               row.id,                          // numeric PK from Supabase
    title:            row.title            || '',
    category:         row.category         || '',
    image:            row.image_url        || '',
    price:            parseFloat(row.price) || 0,      // final price stored in DB
    cost:             parseFloat(meta.cost)            || 0,
    profitPercent:    parseFloat(meta.profitPercent)   || 0,
    discountPercent:  parseFloat(meta.discountPercent) || 0,
    description:      description,
    whatsappNumber:   meta.whatsappNumber   || '',
    telegramUsername: meta.telegramUsername || '',
    discordLink:      meta.discordLink      || '',
    topSeller:        meta.topSeller        === true,
    available:        meta.available        !== false   // default true
  };
}

/**
 * Convert the internal product object → a Supabase DB row object.
 * Extra fields are serialised into the `description` column.
 */
function mapProductToDbRow(p) {
  const meta = {
    cost:             p.cost,
    profitPercent:    p.profitPercent,
    discountPercent:  p.discountPercent,
    whatsappNumber:   p.whatsappNumber,
    telegramUsername: p.telegramUsername,
    discordLink:      p.discordLink,
    topSeller:        p.topSeller,
    available:        p.available
  };

  /* Compute the final price so the native `price` column is always accurate */
  const finalPrice = calculateFinalPrice(p.cost, p.profitPercent, p.discountPercent);

  /* Embed meta as the first line of description */
  const fullDescription = `__meta__${JSON.stringify(meta)}\n${p.description || ''}`;

  /* Only include `id` for UPDATE — omit for INSERT so Supabase
     auto-increments it.                                          */
  const row = {
    title:       p.title,
    price:       finalPrice,
    image_url:   p.image,
    category:    p.category,
    description: fullDescription
  };

  return row;
}

/* ══════════════════════════════════════════════════════════════════════════
   ④ PROMO CODE HELPERS  (still in localStorage — no schema change needed)
   ══════════════════════════════════════════════════════════════════════════ */
const getPromoCodes  = () =>
  JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PROMOS) || '[]');
const savePromoCodes = (p) =>
  localStorage.setItem(CONFIG.STORAGE_KEYS.PROMOS, JSON.stringify(p));

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

/* ══════════════════════════════════════════════════════════════════════════
   ⑤ PRICING ENGINE  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
const calculateBasePrice = (cost, profit) =>
  (parseFloat(cost) || 0) * (1 + (parseFloat(profit) || 0) / 100);

const calculateFinalPrice = (cost, profit, discount) => {
  const base = calculateBasePrice(cost, profit);
  const d    = parseFloat(discount) || 0;
  return d > 0 ? base * (1 - d / 100) : base;
};

const formatPrice = (v) => {
  const r = Math.round(v * 100) / 100;
  return r % 1 === 0 ? r.toString() : r.toFixed(2);
};

/* ══════════════════════════════════════════════════════════════════════════
   ⑥ ROUTER
   ══════════════════════════════════════════════════════════════════════════ */
const homeView      = document.getElementById('home-view');
const adminView     = document.getElementById('admin-view');
const searchWrapper = document.getElementById('searchWrapper');

function router() {
  const hash = window.location.hash.replace('#', '') || 'home';
  if (hash === 'admin') {
    if (!isAdminAuthenticated()) {
      window.location.hash = 'home';
      openPasswordModal();
      return;
    }
    showAdminView();
  } else {
    showHomeView();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAdminView() {
  homeView.style.display  = 'none';
  adminView.style.display = 'block';
  searchWrapper.style.visibility = 'hidden';
  renderAdminProductTable();   // async — handles its own await internally
  renderAdminPromoList();
}

function showHomeView() {
  homeView.style.display  = 'block';
  adminView.style.display = 'none';
  searchWrapper.style.visibility = 'visible';
  renderProductsGrid();        // async — triggers skeleton → real cards
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);

/* ══════════════════════════════════════════════════════════════════════════
   ADMIN AUTH  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
const passwordModalOverlay = document.getElementById('passwordModalOverlay');
const passwordForm         = document.getElementById('passwordForm');
const adminPasswordInput   = document.getElementById('adminPasswordInput');
const passwordCancelBtn    = document.getElementById('passwordCancelBtn');

const isAdminAuthenticated = () =>
  sessionStorage.getItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION) === 'true';

function openPasswordModal() {
  passwordModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  setTimeout(() => adminPasswordInput.focus(), 100);
}
function closePasswordModal() {
  passwordModalOverlay.classList.remove('show');
  document.body.style.overflow = '';
  passwordForm.reset();
}

passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (adminPasswordInput.value === CONFIG.ADMIN_PASSWORD) {
    sessionStorage.setItem(CONFIG.STORAGE_KEYS.ADMIN_SESSION, 'true');
    closePasswordModal();
    window.location.hash = 'admin';
  } else {
    alert('Access Denied / عذراً، كلمة المرور خاطئة');
    adminPasswordInput.value = '';
    adminPasswordInput.focus();
  }
});

passwordCancelBtn.addEventListener('click', () => {
  closePasswordModal();
  if (window.location.hash.replace('#', '') !== 'home') window.location.hash = 'home';
});
passwordModalOverlay.addEventListener('click', (e) => {
  if (e.target === passwordModalOverlay) passwordCancelBtn.click();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && passwordModalOverlay.classList.contains('show'))
    passwordCancelBtn.click();
});

document.getElementById('adminDot').addEventListener('click', () =>
  isAdminAuthenticated() ? (window.location.hash = 'admin') : openPasswordModal()
);
document.getElementById('logoHome').addEventListener('click', () =>
  window.location.hash = 'home'
);

/* ══════════════════════════════════════════════════════════════════════════
   ⑦ CATEGORY FILTER STATE  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
let activeCategory = 'all';

document.querySelectorAll('.cat-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    activeCategory = btn.dataset.cat;
    renderProductsGrid(document.getElementById('searchInput').value);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   ⑧ SKELETON LOADER  (unchanged visually — now wraps async fetch)
   ══════════════════════════════════════════════════════════════════════════ */
const skeletonGrid      = document.getElementById('skeletonGrid');
const productsGrid      = document.getElementById('productsGrid');
const emptyState        = document.getElementById('emptyState');
const emptyTitle        = document.getElementById('emptyTitle');
const emptyMsg          = document.getElementById('emptyMsg');
const productCountBadge = document.getElementById('productCountBadge');

const SKELETON_COUNT    = 6;
const SKELETON_DELAY_MS = 650;

function buildSkeletonCard() {
  const sk = document.createElement('div');
  sk.className = 'skeleton-card';
  sk.innerHTML = `
    <div class="skeleton-image skeleton-shimmer"></div>
    <div class="skeleton-body">
      <div class="skeleton-line w-80 skeleton-shimmer"></div>
      <div class="skeleton-line w-55 skeleton-shimmer"></div>
      <div class="skeleton-line w-40 skeleton-shimmer"></div>
      <div class="skeleton-btn-row">
        <div class="skeleton-btn skeleton-shimmer"></div>
        <div class="skeleton-btn skeleton-shimmer"></div>
        <div class="skeleton-btn skeleton-shimmer"></div>
      </div>
    </div>`;
  return sk;
}

/**
 * Shows skeleton cards while the Supabase fetch is in-flight,
 * then swaps in real product cards once the data arrives.
 *
 * `filterText` – current search string (passed down from the input)
 */
async function renderProductsGrid(filterText = '') {
  /* 1 — Show skeletons immediately */
  productsGrid.style.display  = 'none';
  emptyState.style.display    = 'none';
  skeletonGrid.style.display  = 'grid';
  skeletonGrid.innerHTML      = '';
  productCountBadge.textContent = '';

  for (let i = 0; i < SKELETON_COUNT; i++) {
    skeletonGrid.appendChild(buildSkeletonCard());
  }

  /* 2 — Fetch from Supabase in parallel with the skeleton delay */
  const [allProducts] = await Promise.all([
    fetchProducts(),
    new Promise(resolve => setTimeout(resolve, SKELETON_DELAY_MS))
  ]);

  /* 3 — Swap skeletons → real content */
  skeletonGrid.style.display = 'none';
  productsGrid.style.display = 'grid';
  _doRender(allProducts, filterText);
}

/* ══════════════════════════════════════════════════════════════════════════
   ⑨ STORE FRONT — RENDER PRODUCTS  (unchanged logic, now receives data)
   ══════════════════════════════════════════════════════════════════════════ */

/**
 * Pure render — receives the already-fetched `allProducts` array
 * so we don't make a second network call.
 */
function _doRender(allProducts, filterText = '') {
  const term = filterText.trim().toLowerCase();

  /* Category filter */
  let filtered = activeCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  /* Search within category */
  if (term) filtered = filtered.filter(p =>
    p.title.toLowerCase().includes(term)
  );

  productsGrid.innerHTML   = '';
  emptyState.style.display = 'none';

  /* No products in the DB at all */
  if (allProducts.length === 0) {
    emptyState.style.display  = 'block';
    emptyTitle.textContent    = 'لا توجد منتجات بعد';
    emptyMsg.textContent      = 'تحقق لاحقاً — فريقنا يُعدّ عروضاً رائعة لك!';
    productCountBadge.textContent = '';
    productsGrid.style.display = 'none';
    return;
  }

  /* No results from filter / search */
  if (filtered.length === 0) {
    emptyState.style.display  = 'block';
    emptyTitle.textContent    = 'لا توجد منتجات مطابقة';
    emptyMsg.textContent      = term
      ? 'جرّب كلمة بحث مختلفة أو غيّر القسم.'
      : 'لا توجد منتجات في هذا القسم بعد.';
    productCountBadge.textContent = '';
    productsGrid.style.display = 'none';
    return;
  }

  productsGrid.style.display    = 'grid';
  productCountBadge.textContent = `${filtered.length} منتج`;
  filtered.forEach(p => productsGrid.appendChild(buildProductCard(p)));
}

/* Search input */
document.getElementById('searchInput').addEventListener('input', (e) =>
  renderProductsGrid(e.target.value)
);

/* ══════════════════════════════════════════════════════════════════════════
   ORDER LINK RESOLVER  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
function resolveOrderLink(platform, product, message) {
  const encoded = encodeURIComponent(message);
  switch (platform) {
    case 'whatsapp': {
      const num = product.whatsappNumber?.trim() || CONFIG.WHATSAPP_NUMBER;
      return `https://wa.me/${num}?text=${encoded}`;
    }
    case 'telegram': {
      const user = product.telegramUsername?.trim() || CONFIG.TELEGRAM_USERNAME;
      return `https://t.me/${user}?text=${encoded}`;
    }
    case 'discord':
      return product.discordLink?.trim() || CONFIG.DISCORD_INVITE;
    default:
      return '#';
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURE 4: DISCORD WEBHOOK  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
async function sendDiscordWebhookEmbed(product, finalPrice, appliedPromo) {
  if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') return;

  const catMeta  = CATEGORY_META[product.category] || { label: '—', color: 0x5865f2 };
  const priceStr = `${formatPrice(finalPrice)} DA${appliedPromo
    ? `  *(كود: ${appliedPromo.code} -${appliedPromo.discountValue}%)*`
    : ''}`;

  const payload = {
    username:   'Droxo Shop Orders',
    avatar_url: 'https://i.imgur.com/4M34hi2.png',
    embeds: [{
      title:       `🛒 طلب جديد — ${product.title}`,
      description: 'وصل طلب جديد عبر ديسكورد!',
      color:       catMeta.color,
      thumbnail:   product.image ? { url: product.image } : undefined,
      fields: [
        { name: '📦 المنتج', value: product.title, inline: true  },
        { name: '🏷️ القسم', value: catMeta.label,  inline: true  },
        { name: '💰 السعر',  value: priceStr,        inline: false }
      ],
      footer:    { text: 'Droxo Shop Notification System' },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });
  } catch (err) {
    console.warn('Discord webhook error:', err);
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   BUILD PRODUCT CARD  (unchanged — still reads the mapped product object)
   ══════════════════════════════════════════════════════════════════════════ */
function buildProductCard(product) {
  const basePrice   = calculateBasePrice(product.cost, product.profitPercent);
  const finalPrice  = calculateFinalPrice(product.cost, product.profitPercent, product.discountPercent);
  const hasDiscount = parseFloat(product.discountPercent) > 0;
  const isAvail     = product.available;
  const dis         = isAvail ? '' : 'disabled';

  const card = document.createElement('div');
  card.className  = 'product-card' + (isAvail ? '' : ' unavailable');
  card.dataset.id = product.id;

  let badges = '';
  if (product.topSeller)  badges += `<span class="badge badge-hot">🔥 HOT</span>`;
  if (hasDiscount)        badges += `<span class="badge badge-sale">💥 SALE</span>`;
  if (!isAvail)           badges += `<span class="badge badge-outofstock">غير متوفر</span>`;

  const catMeta = product.category ? CATEGORY_META[product.category] : null;
  const catChip = catMeta
    ? `<span class="card-cat-chip">${catMeta.label}</span>`
    : '';

  const waSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  const tgSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;
  const dcSvg = `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.134 18.12a19.919 19.919 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`;

  card.innerHTML = `
    <div class="product-image-wrap">
      <img src="${escapeHtml(product.image)}"
           alt="${escapeHtml(product.title)}"
           onerror="this.src='https://via.placeholder.com/400x250/1e1e1e/888?text=No+Image'">
      ${badges}
      ${catChip}
    </div>

    <div class="product-body">
      <div class="product-title">${escapeHtml(product.title)}</div>

      <button type="button" class="btn btn-learn-more" data-learn-more>
        📄 معرفة المزيد حول المنتج
      </button>

      <div class="price-row">
        ${hasDiscount
          ? `<span class="price-original">${formatPrice(basePrice)} DA</span>`
          : ''}
        <span class="price-final" data-final-price="${finalPrice}">
          ${formatPrice(finalPrice)} DA
        </span>
        <span class="applied-promo-tag" data-promo-tag></span>
      </div>

      <div class="promo-apply-row">
        <input type="text" placeholder="كود الخصم"
               data-promo-input maxlength="20" ${dis}>
        <button class="btn btn-apply btn-sm" data-apply-promo ${dis}>تطبيق</button>
      </div>
      <div class="promo-msg" data-promo-msg></div>

      <div class="order-buttons">
        <button class="btn btn-whatsapp" data-order="whatsapp"
                ${dis} title="اطلب عبر الواتساب">
          ${waSvg} واتساب
        </button>
        <button class="btn btn-telegram" data-order="telegram"
                ${dis} title="اطلب عبر التيليغرام">
          ${tgSvg} تيليغرام
        </button>
        <button class="btn btn-discord" data-order="discord"
                title="اطلب عبر الديسكورد">
          ${dcSvg} ديسكورد
        </button>
      </div>
    </div>
  `;

  return card;
}

/* HTML escape utility */
function escapeHtml(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* ══════════════════════════════════════════════════════════════════════════
   EVENT DELEGATION — product card clicks
   ══════════════════════════════════════════════════════════════════════════ */

/* In-memory store for currently displayed products so card clicks
   don't need another network round-trip.                           */
let _cachedProducts = [];

productsGrid.addEventListener('click', async (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  const productId = card.dataset.id;   // string (may be numeric from Supabase)

  /* Promo */
  if (e.target.closest('[data-apply-promo]')) {
    handleApplyPromo(card, productId);
    return;
  }

  /* Order buttons */
  const orderBtn = e.target.closest('[data-order]');
  if (orderBtn) {
    const platform = orderBtn.dataset.order;
    if (platform !== 'discord' && orderBtn.disabled) return;
    handleOrder(card, productId, platform);
    return;
  }

  /* Learn More */
  if (e.target.closest('[data-learn-more]')) {
    /* Use cached list first; fall back to fresh fetch if needed */
    let product = _cachedProducts.find(p => String(p.id) === String(productId));
    if (!product) {
      const all = await fetchProducts();
      _cachedProducts = all;
      product = all.find(p => String(p.id) === String(productId));
    }
    const finalPrice = parseFloat(
      card.querySelector('.price-final').dataset.finalPrice
    );
    if (product) openProductDetailsModal(product, finalPrice);
  }
});

/* Keep cache fresh after each grid render */
const _origDoRender = _doRender;
function _doRenderAndCache(allProducts, filterText) {
  _cachedProducts = allProducts;
  _origDoRender(allProducts, filterText);
}
/* Patch renderProductsGrid to update cache */
(function patchRenderer() {
  const orig = renderProductsGrid;
  /* We override the internal call inside the async function by
     redefining _doRender reference via the wrapper below.        */
})();

/* Simpler approach — just store products inside renderProductsGrid itself */
async function renderProductsGrid(filterText = '') {           // eslint-disable-line no-redeclare
  productsGrid.style.display  = 'none';
  emptyState.style.display    = 'none';
  skeletonGrid.style.display  = 'grid';
  skeletonGrid.innerHTML      = '';
  productCountBadge.textContent = '';

  for (let i = 0; i < SKELETON_COUNT; i++) {
    skeletonGrid.appendChild(buildSkeletonCard());
  }

  const [allProducts] = await Promise.all([
    fetchProducts(),
    new Promise(resolve => setTimeout(resolve, SKELETON_DELAY_MS))
  ]);

  _cachedProducts = allProducts;   // ← cache for card-click look-ups

  skeletonGrid.style.display = 'none';
  productsGrid.style.display = 'grid';
  _doRender(allProducts, filterText);
}

/* ══════════════════════════════════════════════════════════════════════════
   PROMO CODE — card level  (unchanged, uses localStorage promos)
   ══════════════════════════════════════════════════════════════════════════ */
const appliedPromosPerCard = {};

function handleApplyPromo(card, productId) {
  const input = card.querySelector('[data-promo-input]');
  const msgEl = card.querySelector('[data-promo-msg]');
  const code  = input.value.trim().toUpperCase();

  if (!code) { showPromoMsg(msgEl, 'يرجى إدخال كود.', false); return; }

  const match = getPromoCodes().find(p => p.code.toUpperCase() === code);
  if (!match) {
    showPromoMsg(msgEl, 'كود غير صالح / Invalid code', false);
    delete appliedPromosPerCard[productId];
    updateCardPriceDisplay(card, productId);
    return;
  }
  appliedPromosPerCard[productId] = match;
  showPromoMsg(msgEl, `✅ "${match.code}" مطبّق: -${match.discountValue}%`, true);
  updateCardPriceDisplay(card, productId);
}

function showPromoMsg(el, text, success) {
  el.textContent = text;
  el.className   = 'promo-msg ' + (success ? 'success' : 'error');
}

function updateCardPriceDisplay(card, productId) {
  /* Find product in cache */
  const product = _cachedProducts.find(p => String(p.id) === String(productId));
  if (!product) return;
  const base    = calculateFinalPrice(
    product.cost, product.profitPercent, product.discountPercent
  );
  const priceEl = card.querySelector('.price-final');
  const tagEl   = card.querySelector('[data-promo-tag]');
  const applied = appliedPromosPerCard[productId];
  let displayed = base;
  if (applied) {
    displayed           = base * (1 - applied.discountValue / 100);
    tagEl.textContent   = `كود: ${applied.code}`;
    tagEl.style.display = 'inline-block';
  } else {
    tagEl.style.display = 'none';
  }
  priceEl.textContent        = `${formatPrice(displayed)} DA`;
  priceEl.dataset.finalPrice = displayed;
}

/* ══════════════════════════════════════════════════════════════════════════
   ORDER MESSAGE + OPENER  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
function buildOrderMessage(product, finalPrice, appliedPromo) {
  const catMeta = product.category ? CATEGORY_META[product.category] : null;
  let msg  = `🛒 طلب جديد من Droxo Shop\n`;
  msg     += `----------------------------\n`;
  msg     += `📦 المنتج: ${product.title}\n`;
  if (catMeta) msg += `🏷️ القسم: ${catMeta.label}\n`;
  msg     += `💰 السعر النهائي: ${formatPrice(finalPrice)} DA\n`;
  if (appliedPromo)
    msg += `🎟️ كود الخصم: ${appliedPromo.code} (-${appliedPromo.discountValue}%)\n`;
  msg     += `----------------------------\n`;
  msg     += `أرجو تأكيد الطلب. شكراً!`;
  return msg;
}

function openOrderLink(platform, product, finalPrice, appliedPromo) {
  if (platform === 'discord') {
    sendDiscordWebhookEmbed(product, finalPrice, appliedPromo);
    const link = product.discordLink?.trim() || CONFIG.DISCORD_INVITE;
    if (link && link !== '#') window.open(link, '_blank');
    return;
  }
  const msg = buildOrderMessage(product, finalPrice, appliedPromo);
  const url = resolveOrderLink(platform, product, msg);
  if (url && url !== '#') window.open(url, '_blank');
}

function handleOrder(card, productId, platform) {
  const product = _cachedProducts.find(p => String(p.id) === String(productId));
  if (!product) return;
  const finalPrice = parseFloat(
    card.querySelector('.price-final').dataset.finalPrice
  );
  openOrderLink(platform, product, finalPrice, appliedPromosPerCard[productId]);
}

/* ══════════════════════════════════════════════════════════════════════════
   PRODUCT DETAILS MODAL  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
const productDetailsModalOverlay = document.getElementById('productDetailsModal');
const modalProductImage          = document.getElementById('modalProductImage');
const modalProductTitle          = document.getElementById('modalProductTitle');
const modalProductDescription    = document.getElementById('modalProductDescription');
const modalProductPrice          = document.getElementById('modalProductPrice');
const modalOutOfStockNote        = document.getElementById('modalOutOfStockNote');
const productModalCloseBtn       = document.getElementById('productModalCloseBtn');
const modalCategoryBadge         = document.getElementById('modalCategoryBadge');
const modalWhatsappBtn           = document.getElementById('modalWhatsappBtn');
const modalTelegramBtn           = document.getElementById('modalTelegramBtn');
const modalDiscordBtn            = document.getElementById('modalDiscordBtn');

let currentModalContext = null;

function openProductDetailsModal(product, finalPrice) {
  const appliedPromo = appliedPromosPerCard[product.id] || null;
  currentModalContext = { product, finalPrice, appliedPromo };

  modalProductImage.src               = product.image;
  modalProductImage.alt               = product.title;
  modalProductTitle.textContent       = product.title;
  modalProductDescription.textContent = product.description?.trim()
    ? product.description
    : 'لا يوجد وصف إضافي لهذا المنتج حالياً.\nNo additional description provided yet.';
  modalProductPrice.textContent = `${formatPrice(finalPrice)} DA`;

  const catMeta = product.category ? CATEGORY_META[product.category] : null;
  if (catMeta) {
    modalCategoryBadge.textContent   = catMeta.label;
    modalCategoryBadge.style.display = 'inline-block';
  } else {
    modalCategoryBadge.style.display = 'none';
  }

  if (product.available) {
    modalOutOfStockNote.style.display = 'none';
    modalWhatsappBtn.disabled = false;
    modalTelegramBtn.disabled = false;
  } else {
    modalOutOfStockNote.style.display = 'block';
    modalWhatsappBtn.disabled = true;
    modalTelegramBtn.disabled = true;
  }
  modalDiscordBtn.disabled = false;

  productDetailsModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeProductDetailsModal() {
  productDetailsModalOverlay.classList.remove('show');
  document.body.style.overflow = '';
  currentModalContext = null;
}

productModalCloseBtn.addEventListener('click', closeProductDetailsModal);
productDetailsModalOverlay.addEventListener('click', (e) => {
  if (e.target === productDetailsModalOverlay) closeProductDetailsModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && productDetailsModalOverlay.classList.contains('show'))
    closeProductDetailsModal();
});

[modalWhatsappBtn, modalTelegramBtn, modalDiscordBtn].forEach(btn => {
  btn.addEventListener('click', () => {
    if (!currentModalContext) return;
    const { product, finalPrice, appliedPromo } = currentModalContext;
    openOrderLink(btn.dataset.modalOrder, product, finalPrice, appliedPromo);
  });
});

/* ══════════════════════════════════════════════════════════════════════════
   ADMIN — PRODUCT FORM  (now calls Supabase INSERT / UPDATE)
   ══════════════════════════════════════════════════════════════════════════ */
const productForm       = document.getElementById('productForm');
const productIdInput    = document.getElementById('productId');
const prodTitle         = document.getElementById('prodTitle');
const prodCategory      = document.getElementById('prodCategory');
const prodImage         = document.getElementById('prodImage');
const prodCost          = document.getElementById('prodCost');
const prodProfit        = document.getElementById('prodProfit');
const prodDiscount      = document.getElementById('prodDiscount');
const prodDescription   = document.getElementById('prodDescription');
const prodWhatsapp      = document.getElementById('prodWhatsapp');
const prodTelegram      = document.getElementById('prodTelegram');
const prodDiscord       = document.getElementById('prodDiscord');
const prodTopSeller     = document.getElementById('prodTopSeller');
const prodAvailable     = document.getElementById('prodAvailable');
const pricePreview      = document.getElementById('pricePreview');
const formTitle         = document.getElementById('formTitle');
const submitBtn         = document.getElementById('submitBtn');
const cancelEditBtn     = document.getElementById('cancelEditBtn');
const productsTableBody = document.getElementById('productsTableBody');

/* Live price preview */
function updatePricePreview() {
  const cost     = prodCost.value;
  const profit   = prodProfit.value;
  const discount = prodDiscount.value;
  if (!cost || !profit) {
    pricePreview.innerHTML = 'Final Price: <strong>-- DA</strong>';
    return;
  }
  const base   = calculateBasePrice(cost, profit);
  const final  = calculateFinalPrice(cost, profit, discount);
  const hasDis = parseFloat(discount) > 0;
  pricePreview.innerHTML = hasDis
    ? `Base: <s>${formatPrice(base)} DA</s> &nbsp;→&nbsp; Final: <strong>${formatPrice(final)} DA</strong>`
    : `Final Price: <strong>${formatPrice(final)} DA</strong>`;
}
[prodCost, prodProfit, prodDiscount].forEach(inp =>
  inp.addEventListener('input', updatePricePreview)
);

productForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const discordVal  = prodDiscord.value.trim();
  const categoryVal = prodCategory.value;

  if (!discordVal) {
    showToast('⚠️ Discord link is required for every product.');
    prodDiscord.focus(); return;
  }
  if (!categoryVal) {
    showToast('⚠️ Please select a category / اختر القسم.');
    prodCategory.focus(); return;
  }

  /* Disable button to prevent double-submit */
  submitBtn.disabled = true;
  submitBtn.textContent = 'جارٍ الحفظ...';

  const editingId = productIdInput.value;

  const productData = {
    id:               editingId || null,  // null = INSERT; truthy = UPDATE
    title:            prodTitle.value.trim(),
    category:         categoryVal,
    image:            prodImage.value.trim(),
    cost:             parseFloat(prodCost.value)     || 0,
    profitPercent:    parseFloat(prodProfit.value)   || 0,
    discountPercent:  parseFloat(prodDiscount.value) || 0,
    description:      prodDescription.value.trim(),
    whatsappNumber:   prodWhatsapp.value.trim(),
    telegramUsername: prodTelegram.value.trim(),
    discordLink:      discordVal,
    topSeller:        prodTopSeller.checked,
    available:        prodAvailable.checked
  };

  let success = false;

  if (editingId) {
    /* ── UPDATE ── */
    success = await updateProduct(productData);
    if (success) showToast('✅ Product updated successfully!');
  } else {
    /* ── INSERT ── */
    success = await insertProduct(productData);
    if (success) showToast('✅ Product added successfully!');
  }

  submitBtn.disabled = false;

  if (success) {
    resetProductForm();
    renderAdminProductTable();   // refresh the admin table from Supabase
  }
});

function resetProductForm() {
  productForm.reset();
  productIdInput.value        = '';
  prodAvailable.checked       = true;
  formTitle.textContent       = '➕ Add New Product';
  submitBtn.textContent       = 'Add Product';
  submitBtn.disabled          = false;
  cancelEditBtn.style.display = 'none';
  pricePreview.innerHTML      = 'Final Price: <strong>-- DA</strong>';
}
cancelEditBtn.addEventListener('click', resetProductForm);

/* Populate the form for editing — product object already mapped */
function editProduct(id) {
  const product = _cachedProducts.find(p => String(p.id) === String(id));
  if (!product) return;

  productIdInput.value      = product.id;
  prodTitle.value           = product.title;
  prodCategory.value        = product.category || '';
  prodImage.value           = product.image;
  prodCost.value            = product.cost;
  prodProfit.value          = product.profitPercent;
  prodDiscount.value        = product.discountPercent;
  prodDescription.value     = product.description || '';
  prodWhatsapp.value        = product.whatsappNumber  || '';
  prodTelegram.value        = product.telegramUsername || '';
  prodDiscord.value         = product.discordLink     || '';
  prodTopSeller.checked     = product.topSeller;
  prodAvailable.checked     = product.available;

  formTitle.textContent       = '✏️ Edit Product';
  submitBtn.textContent       = 'Update Product';
  cancelEditBtn.style.display = 'inline-flex';

  updatePricePreview();
  document.querySelector('.admin-card').scrollIntoView({
    behavior: 'smooth', block: 'start'
  });
}

/* DELETE — calls Supabase then refreshes the table */
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  const success = await deleteProductFromDb(id);
  if (success) {
    renderAdminProductTable();
    showToast('🗑️ Product deleted.');
  }
}

/* TOGGLE availability — UPDATE the single field in Supabase */
async function toggleProductStatus(id) {
  const product = _cachedProducts.find(p => String(p.id) === String(id));
  if (!product) return;

  const updated = { ...product, available: !product.available };
  const success = await updateProduct(updated);
  if (success) {
    showToast(`🔄 Status → ${updated.available ? 'Available' : 'Unavailable'}`);
    renderAdminProductTable();
  }
}

/* Render admin table — fetches fresh data from Supabase */
async function renderAdminProductTable() {
  productsTableBody.innerHTML = `
    <tr>
      <td colspan="11"
          style="text-align:center;color:#6b6b6b;padding:24px;">
        ⏳ جارٍ التحميل...
      </td>
    </tr>`;

  const products = await fetchProducts();
  _cachedProducts = products;   // keep cache in sync

  if (products.length === 0) {
    productsTableBody.innerHTML = `
      <tr>
        <td colspan="11"
            style="text-align:center;color:#6b6b6b;padding:24px;">
          No products yet — add your first product above.
        </td>
      </tr>`;
    return;
  }

  productsTableBody.innerHTML = products.map(product => {
    const finalPrice  = calculateFinalPrice(
      product.cost, product.profitPercent, product.discountPercent
    );
    const catMeta     = product.category ? CATEGORY_META[product.category] : null;
    const catCell     = catMeta
      ? `<span class="cat-pill">${catMeta.label}</span>`
      : `<span style="color:var(--text-muted)">—</span>`;
    const discordCell = product.discordLink
      ? `<a href="${escapeHtml(product.discordLink)}"
            target="_blank" class="discord-pill">🔗 Link</a>`
      : `<span style="color:#ff6b6b;font-size:12px;">⚠️ Missing</span>`;

    return `
      <tr>
        <td>
          <img src="${escapeHtml(product.image)}"
               alt="${escapeHtml(product.title)}"
               onerror="this.src='https://via.placeholder.com/60/1e1e1e/888?text=IMG'">
        </td>
        <td>${escapeHtml(product.title)}</td>
        <td>${catCell}</td>
        <td>${formatPrice(product.cost)} DA</td>
        <td>${product.profitPercent}%</td>
        <td>${product.discountPercent}%</td>
        <td><strong>${formatPrice(finalPrice)} DA</strong></td>
        <td>${discordCell}</td>
        <td>
          <span class="status-pill
            ${product.available ? 'status-available' : 'status-unavailable'}">
            ${product.available ? 'Available' : 'Unavailable'}
          </span>
        </td>
        <td>${product.topSeller ? '🔥 Yes' : '—'}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-sm btn-edit"
                    onclick="editProduct('${product.id}')">Edit</button>
            <button class="btn btn-sm btn-toggle"
                    onclick="toggleProductStatus('${product.id}')">Toggle</button>
            <button class="btn btn-sm btn-danger"
                    onclick="deleteProduct('${product.id}')">Delete</button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════════════════════
   ADMIN — PROMO CODES  (still localStorage — no schema change)
   ══════════════════════════════════════════════════════════════════════════ */
const promoForm       = document.getElementById('promoForm');
const promoCodeInput  = document.getElementById('promoCode');
const promoValueInput = document.getElementById('promoValue');
const promoList       = document.getElementById('promoList');

promoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const code  = promoCodeInput.value.trim().toUpperCase();
  const value = parseFloat(promoValueInput.value);
  if (!code || !value || value <= 0 || value > 100) {
    showToast('⚠️ Please enter a valid code and discount value.');
    return;
  }
  const promos = getPromoCodes();
  if (promos.some(p => p.code.toUpperCase() === code)) {
    showToast('⚠️ This promo code already exists.');
    return;
  }
  promos.push({ id: generateId(), code, discountValue: value });
  savePromoCodes(promos);
  promoForm.reset();
  renderAdminPromoList();
  showToast('✅ Promo code added!');
});

function deletePromoCode(id) {
  if (!confirm('Delete this promo code?')) return;
  savePromoCodes(getPromoCodes().filter(p => p.id !== id));
  renderAdminPromoList();
  showToast('🗑️ Promo code deleted.');
}

function renderAdminPromoList() {
  const promos = getPromoCodes();
  if (promos.length === 0) {
    promoList.innerHTML = `<p class="muted-text">No promo codes yet.</p>`;
    return;
  }
  promoList.innerHTML = promos.map(promo => `
    <div class="promo-item">
      <div>
        <span class="promo-code">${escapeHtml(promo.code)}</span>
        <span class="promo-value">-${promo.discountValue}%</span>
      </div>
      <button class="btn btn-sm btn-danger"
              onclick="deletePromoCode('${promo.id}')">Delete</button>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════════════════════════════
   TOAST  (unchanged)
   ══════════════════════════════════════════════════════════════════════════ */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2800);
}