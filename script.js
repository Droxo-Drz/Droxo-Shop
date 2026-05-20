// === إعدادات الاتصال بـ Supabase (طريقة الـ API المباشرة والآمنة) ===
const SUPABASE_URL = "https://btxmvkdlxcbnqvlcuxzb.supabase.co"; 
const SUPABASE_KEY = "sb_publishable_oKG9Cc_JAtKGbVnq-ep07g_LpLdLCiw";

const CONFIG = {
    storeName: 'DROXO',
    whatsappNumber: '213796569674',
    telegramUsername: 'Droxo_Dz', 
    defaultMessage: 'Hello DROXO, I want to order'
};

const SERVICES = [
        {
        
        id: 'freefire',
        name: 'Free Fire',
        icon: '<img src="./Photo/freefire1.png" alt="Free Fire" class="icon-freefire">', 
        

        detailIcon: './Photo/freefire1.png',
        category: 'gaming',
        description: 'Garena Free Fire Diamonds & Bundles',
        prices: [
            { package: '100 Diamonds', price: 300, currency: 'DA' },
            { package: '210 Diamonds', price: 550, currency: 'DA' },
            { package: '310 Diamonds', price: 750, currency: 'DA' },
            { package: '530 Diamonds', price: 1300, currency: 'DA' },
            { package: '1060 Diamonds', price: 2200, currency: 'DA' },
            { package: '2180 Diamonds', price: 4400, currency: 'DA' },
            { package: '5600 Diamonds', price: 11000, currency: 'DA' },
            { package: '11500 Diamonds', price: 21500, currency: 'DA' },
        ]
    },
        
    {
        id: 'pubgm',
        name: 'PUBG Mobile',
        icon: '<img src="Photo/pubg.webp" class="icon-pubg-mobile" alt="PUBG Mobile">',
         detailIcon: './Photo/pubg.webp', 
        category: 'gaming',
        description: 'PUBG Mobile UC - Unknown Cash',
        prices: [
            { package: '60 UC', price: 300, currency: 'DA' },
            { package: '325 UC', price: 1200, currency: 'DA' },
            { package: '660 UC', price: 2400, currency: 'DA' },
            { package: '1800 UC', price: 5700, currency: 'DA' },
            { package: '3850 UC', price: 23000, currency: 'DA' },
            { package: '16200 UC', price: 45500, currency: 'DA' },
            { package: '24300 UC', price: 90000, currency: 'DA' },
            { package: '40500 UC', price: 114000, currency: 'DA' }
        ]
    },
    {
        id: 'efootball',
        name: 'eFootball',
        icon: '<img src="./Photo/efootball.webp" class="icon-efootball" alt="eFootball">',
        detailIcon: './Photo/efootball.webp', 
        category: 'gaming',
        description: 'eFootball Coins & Points',
        prices: [
            { package: '137 eFootball Coins', price: 350, currency: 'DA' },
            { package: '315 eFootball Coins', price: 780, currency: 'DA' },
            { package: '578 eFootball Coins', price: 1300, currency: 'DA' },
            { package: '788 eFootball Coins', price: 1750, currency: 'DA' },       
            { package: '1092 eFootball Coins', price: 2300, currency: 'DA' },
            { package: '2237 eFootball Coins', price: 4900, currency: 'DA' },
            { package: '3413 eFootball Coins', price: 7300, currency: 'DA' },
            { package: '5985 eFootball Coins', price: 11800, currency: 'DA' },
            { package: '13440 eFootball Coins', price: 24500, currency: 'DA' },
            { package: '32200 eFootball Coins', price: 58000, currency: 'DA' }
        ]
    },
    {
        id: 'steam',
        name: 'Steam',
        icon: '<img src="./Photo/steam-Logo.webp" class="icon-steam" alt="Steam">',
         detailIcon: './Photo/steam-Logo.webp',
        category: 'gaming',
        description: 'Steam Wallet Gift Cards',
        prices: [
            { package: '5 USD', price: 1500, currency: 'DA' },
            { package: '10 USD', price: 3200, currency: 'DA' },
            { package: '20 USD', price: 7300, currency: 'DA' },
            { package: '50 USD', price: 14000, currency: 'DA' },
            { package: '100 USD', price: 29000, currency: 'DA' }
        ]
    },
   {
        id: 'epicgames',
        name: 'Epic Games',
        icon: '<img src="./Photo/epicgames.webp" class="epicgames-icon" alt="Steam">',
        detailIcon: './Photo/epicgames.webp',
        category: 'gaming',
        description: 'Epic Games Store V-Bucks & Credits',
        prices: [
            { package: '1000 V-Bucks', price: 6700, currency: 'DA' },
            { package: '2800 V-Bucks', price: 12000, currency: 'DA' },
            { package: '5000 V-Bucks', price: 22000, currency: 'DA' },
            { package: '13500 V-Bucks', price: 45300, currency: 'DA' }
        ]
    },
    {
        id: 'xbox',
        name: 'Xbox',
        icon: '<img src="./Photo/xbox-logo.webp" class="icon-xbox" alt="Xbox">',
        detailIcon: './Photo/xbox-logo.webp',
        category: 'gaming',
        description: 'Xbox Gift Cards & Game Pass',
        prices: [
            { package: '5 USD Gift Card', price: 1700, currency: 'DA' },
            { package: '10 USD Gift Card', price: 3000, currency: 'DA' },
            { package: '25 USD Gift Card', price: 7200, currency: 'DA' },
            { package: '50 USD Gift Card', price: 14000, currency: 'DA' },
            { package: '100 USD Gift Card', price: 28000, currency: 'DA' },
            { package: 'Game Pass Ultimate 1 Month', price: 8500, currency: 'DA' },
            { package: 'Game Pass Ultimate 1 Month For PC', price: 4000, currency: 'DA' },
            { package: 'Game Pass Ultimate 3 Month For Console', price: 6300, currency: 'DA' },
            { package: 'Game Pass 3 Months essential', price: 6400, currency: 'DA' },
            { package: 'Game Pass Ultimate 12 Month For PC', price: 24500, currency: 'DA' }
        ]
    },
    {
        id: 'playstation',
        name: 'PlayStation',
        icon: '<img src="./Photo/playstation-3.png" class="icon-playstation" alt="PlayStation">',
        detailIcon: './Photo/playstation-3.png',
        category: 'gaming',
        description: 'PSN Gift Cards & PlayStation Plus',
        prices: [
            { package: '10 USD Gift Card', price: 3500, currency: 'DA' },
            { package: '25 USD Gift Card', price: 7500, currency: 'DA' },
            { package: '50 USD Gift Card', price: 14500, currency: 'DA' },
            { package: 'PS Plus 1 Month', price: 0, currency: 'DA' },
            { package: 'PS Plus 3 Months', price: 0, currency: 'DA' },
            { package: 'PS Plus 12 Months', price: 18000, currency: 'DA' }
        ]
    },
    
    {
        id: 'netflix',
        name: 'Netflix',
        icon: '<img src="./Photo/netflix-logo.png" class="icon-netflix" alt="Netflix">',
        detailIcon: './Photo/netflix-logo.png',
        category: 'streaming',
        description: 'Netflix Subscription Algeria',
        prices: [
            { package: '15 USD', price: 4800, currency: 'DA' },
            { package: '20 USD', price: 6000, currency: 'DA' },
            { package: '25 USD', price: 7200, currency: 'DA' },
            { package: '30 USD', price: 8600, currency: 'DA' }
        ]
    },
    {
        id: 'shahid',
        name: 'Shahid VIP',
        icon: '<img src="./Photo/shahid.png" class="icon-shahid-vip" alt="Shahid VIP">',
        detailIcon: './Photo/shahid.png',
        category: 'streaming',
        description: 'Shahid VIP Subscription',
        prices: [
            { package: 'Shahid VIP 1 Month', price: 0, currency: 'DA' },
            { package: 'Shahid VIP 3 Months', price: 3500, currency: 'DA' },
            { package: 'Shahid VIP 6 Months', price: 0, currency: 'DA' },
            { package: 'Shahid VIP 12 Months', price: 9500, currency: 'DA' }
        ]
    },
    {
        id: 'spotify',
        name: 'Spotify',
        icon: '<img src="./Photo/spotify.jpg" class="icon-spotify" alt="Spotify">',
        detailIcon: './Photo/spotify.jpg',
        category: 'streaming',
        description: 'Spotify Premium Subscription',
        prices: [
            { package: '10 USD', price: 0, currency: 'DA' },
            { package: '30 USD', price: 0, currency: 'DA' },
            { package: '12 USD', price: 0, currency: 'DA' },
            { package: 'Premium', price: 0, currency: 'DA' }
        ]
    },
    
    {
        id: 'googleplay',
        name: 'Google Play',
        icon: '<img src="./Photo/google-play.jpg" class="icon-google-play" alt="Google Play">',
        detailIcon: './Photo/google-play.jpg',
        category: 'digital',
        description: 'Google Play Gift Cards',
        prices: [
            { package: '5 USD', price: 1600, currency: 'DA' },
            { package: '10 USD', price: 3200, currency: 'DA' },
            { package: '25 USD', price: 7500, currency: 'DA' },
            { package: '50 USD', price: 14500, currency: 'DA' },
            { package: '100 USD', price: 31000, currency: 'DA' }
        ]
    },
    {
        id: 'snapchat',
        name: 'Snapchat Plus',
        icon: '<img src="./Photo/snapchat.jpg" class="icon-snapchat-plus" alt="Snapchat Plus">',
        detailIcon: './Photo/snapchat.jpg',
        category: 'digital',
        description: 'Snapchat Plus Subscription',
        prices: [
            { package: 'Snapchat Plus 1 Month', price: 0, currency: 'DA' },
            { package: 'Snapchat Plus 6 Months', price: 0, currency: 'DA' },
            { package: 'Snapchat Plus 12 Months', price: 0, currency: 'DA' }
        ]
    },
    {
        id: 'discord',
        name: 'Discord Nitro',
        icon: '<img src="./Photo/discord-logo.png" class="icon-discord-nitro" alt="Discord Nitro">',
        detailIcon: './Photo/discord-logo.png',
        category: 'digital',
        description: 'Discord Nitro & Nitro Classic',
        prices: [
            { package: 'Nitro - 1 Month', price: 3200, currency: 'DA' },
            { package: 'Nitro Basic - 1 Month', price: 1900, currency: 'DA' },
            { package: 'Nitro Classic - 12 Months', price: 26000, currency: 'DA' }
        ]
    },
    {
        id: 'windows',
        name: 'Windows Activation',
        icon: '<img src="./Photo/windows-logo.png" class="icon-windows-activation" alt="Windows Activation">',
        detailIcon: './Photo/windows-logo.png',
        category: 'digital',
        description: 'Windows Activation Codes',
        prices: [
            { package: 'Windows 11 Pro', price: 2900, currency: 'DA' },
            { package: 'Windows 11 Home', price: 3100, currency: 'DA' }
        ]
    },
    
    
    {
        id: 'binance',
        name: 'Binance USDT',
        icon: '<img src="./Photo/logo-binance.png" class="icon-binance-usdt" alt="Binance USDT">',
        detailIcon: './Photo/logo-binance.png',
        category: 'crypto',
        description: 'Binance USDT Cryptocurrency',
        prices: [
            { package: '10 USDT', price: 3200, currency: 'DA' },
            { package: '25 USDT', price: 6000, currency: 'DA' },
            { package: '50 USDT', price: 13500, currency: 'DA' }
        ]
    }
];

const elements = {
    servicesGrid: document.getElementById('servicesGrid'),
    servicesView: document.getElementById('servicesView'),
    priceView: document.getElementById('priceView'),
    categoryTabs: document.querySelectorAll('.tab-btn'),
    backBtn: document.getElementById('backBtn'),
    serviceIcon: document.getElementById('serviceIcon'),
    serviceName: document.getElementById('serviceName'),
    priceTableBody: document.getElementById('priceTableBody'),
    whatsappBtn: document.getElementById('whatsappBtn'),
    telegramBtn: document.getElementById('telegramBtn')
};


const state = {
    currentCategory: 'all',
    currentService: null
};


function initializeApp() {
    renderServices('all');
    setupEventListeners();
    console.log('🚀 DROXO Store v5.0 - Fixed Layout & Contacts');
    console.log('📱 WhatsApp: ' + CONFIG.whatsappNumber);
    console.log('✈️ Telegram: ' + CONFIG.telegramUsername);
}


function setupEventListeners() {

    elements.categoryTabs.forEach(tab => {
        tab.addEventListener('click', handleCategoryChange);
    });
    

    elements.backBtn.addEventListener('click', showServicesView);
    

    elements.whatsappBtn.addEventListener('click', () => openWhatsApp());
    elements.telegramBtn.addEventListener('click', () => openTelegram());
}

function handleCategoryChange(event) {
    const category = event.target.dataset.category;
    
    if (state.currentCategory === category) return;
    
    state.currentCategory = category;
    updateActiveTab(category);
    renderServices(category);
    
    console.log(`📂 Filtered category: ${category}`);
}

function updateActiveTab(activeCategory) {
    elements.categoryTabs.forEach(tab => {
        if (tab.dataset.category === activeCategory) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

function filterServices(category) {
    if (category === 'all') {
        return SERVICES;
    }
    return SERVICES.filter(service => service.category === category);
}


function renderServices(category) {
    const services = filterServices(category);
    const fragment = document.createDocumentFragment();
    

    const sortedServices = [...services].sort((a, b) => a.name.localeCompare(b.name));
    
    elements.servicesGrid.innerHTML = '';
    
    sortedServices.forEach((service, index) => {
        const card = createServiceCard(service, index);
        fragment.appendChild(card);
    });
    
    elements.servicesGrid.appendChild(fragment);
    

    triggerAnimation(elements.servicesGrid);
}

function createServiceCard(service, index) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.dataset.serviceId = service.id;
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="icon-wrapper">
            <span class="service-icon">${service.icon}</span>
        </div>
        <h3 class="service-name">${service.name}</h3>
        <p class="service-hint">${service.description}</p>
    `;
    
    card.addEventListener('click', () => showPriceView(service));

    
    return card;
}



function showPriceView(service) {
    state.currentService = service;
    updatePriceView(service);
    renderPriceTable(service.prices);
    switchView('price');

    window.currentOpenedGameName = service.name;

    // 🔥 الكود الجديد لتحديث قائمة الباقات داخل الفورم 🔥
    const packageSelect = document.getElementById('orderPackage');
    if (packageSelect) {
        // تفريغ القائمة القديمة
        packageSelect.innerHTML = '<option value="">-- اختر الباقة --</option>';
        
        // إدخال باقات اللعبة الحالية أوتوماتيكياً
        service.prices.forEach(p => {
            const option = document.createElement('option');
            option.value = `${p.package} (${p.price} ${p.currency})`;
            option.textContent = `${p.package} ⬅️ ${p.price} ${p.currency}`;
            packageSelect.appendChild(option);
        });
    }

    if (window.location.hash !== `#${service.id}`) {
        history.pushState({ view: 'price', serviceId: service.id }, '', `#${service.id}`);
    }
}

function updatePriceView(service) {
  
    elements.serviceIcon.innerHTML = `<img src="${service.detailIcon}" class="inner-icon-custom" alt="${service.name}">`;    
    elements.serviceName.textContent = service.name;


    const imgElement = elements.serviceIcon.querySelector('.inner-icon-custom');
    if (imgElement) {
        switch (service.id) {
            case 'freefire':
                imgElement.style.marginTop = '12px'; 
                break;
            case 'pubgm':
                imgElement.style.marginTop = '8px'; 
                break;
            case 'efootball':
                imgElement.style.marginTop = '8px'; 
                break;
            case 'steam':
                imgElement.style.marginTop = '10px'; 
                break;
            case 'epicgames':
                imgElement.style.marginTop = '10px'; 
                break;
            case 'xbox':
                imgElement.style.marginTop = '10px'; 
                break;
            case 'playstation':
                imgElement.style.marginTop = '12px';
                break;
            case 'netflix':
                imgElement.style.marginTop = '8px';  
                break;
            case 'shahid':
                imgElement.style.marginTop = '8px';  
                break;
            case 'spotify':
                imgElement.style.marginTop = '8px'; 
                break;
            case 'googleplay':
                imgElement.style.marginTop = '10px';
                break;
            case 'snapchat':
                imgElement.style.marginTop = '6px'; 
                break;
            case 'discord':
                imgElement.style.marginTop = '8px';  
                break;
            case 'windows':
                imgElement.style.marginTop = '10px'; 
                break;
            case 'binance':
                imgElement.style.marginTop = '0px';
                break;
            default:
                imgElement.style.marginTop = '0px';  
                break;
        }
    }
}
function renderPriceTable(prices) {
    const fragment = document.createDocumentFragment();
    
    prices.forEach((price, index) => {
        const row = document.createElement('tr');
        row.style.animationDelay = `${index * 0.05}s`;
        row.innerHTML = `
            <td>${price.package}</td>
            <td>${price.price.toLocaleString()}</td>
            <td>${price.currency}</td>
        `;
        fragment.appendChild(row);
    });
    
    elements.priceTableBody.innerHTML = '';
    elements.priceTableBody.appendChild(fragment);
}

function showServicesView() {
    state.currentService = null;
    switchView('services');
    
    // تنظيف الرابط كي نرجعو للرئيسية
    if (window.location.hash) {
        history.replaceState({ view: 'services' }, '', window.location.pathname);
    }
}

function switchView(viewName) {
    const feedbacksSection = document.querySelector('.feedbacks-section');
    
    if (viewName === 'price') {
        elements.servicesView.classList.add('hidden');
        elements.priceView.classList.remove('hidden');
        
        // إخفاء قسم الآراء داخل صفحة الأسعار
        if (feedbacksSection) feedbacksSection.style.display = 'none';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        elements.priceView.classList.add('hidden');
        elements.servicesView.classList.remove('hidden');
        
        // إعادة إظهار قسم الآراء في الصفحة الرئيسية
        if (feedbacksSection) feedbacksSection.style.display = 'block';
    }
}

function openWhatsApp() {
    if (!state.currentService) {
        console.error('❌ No service selected for WhatsApp');
        showNotification('Please select a service first', 'error');
        return;
    }
    
    const serviceName = state.currentService.name;
    const message = `${CONFIG.defaultMessage} ${serviceName}. Please provide me with pricing and payment details.`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    

    console.log(`📱 Opening WhatsApp for: ${serviceName} (Number: ${CONFIG.whatsappNumber})`);
    
    window.open(url, '_blank');
    showNotification(`Opening WhatsApp for ${serviceName}...`, 'success');
}

function openTelegram() {
    if (!state.currentService) {
        console.error('❌ No service selected for Telegram');
        showNotification('Please select a service first', 'error');
        return;
    }
    
    const serviceName = state.currentService.name;
    const message = `${CONFIG.defaultMessage} ${serviceName}. Please provide me with pricing and payment details.`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://t.me/${CONFIG.telegramUsername}?text=${encodedMessage}`;
    

    console.log(`✈️ Opening Telegram for: ${serviceName} (Username: ${CONFIG.telegramUsername})`);
    
    window.open(url, '_blank');
    showNotification(`Opening Telegram for ${serviceName}...`, 'success');
}


function triggerAnimation(element) {
    element.classList.remove('fade-in');
    void element.offsetWidth;
    element.classList.add('fade-in');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00d4ff' : '#9d4edd'};
        color: white;
        border-radius: 12px;
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

window.addEventListener('error', (event) => {
    console.error('❌ DROXO Store Error:', {
        message: event.error?.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
});


function trackPageView(pageName) {
    console.log(`📊 Page View: ${pageName}`);
}


// سيستم تبديل الوضع الليلي والنهاري وحفظ الخيار
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // 1. التحقق إذا كان الزبون مخير الـ Light Mode من قبل
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // تطبيق الثيم المحفوظ عند دخول الموقع
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️'; // يرجع شمس
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '🌙'; // يرجع قمر
    }

    // 2. السمع للكليك فوق الزر
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // التحويل للوضع المضيء
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light'); // حفظ الخيار
            console.log('💡 Light Mode Activated');
        } else {
            // العودة للوضع المظلم
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark'); // حفظ الخيار
            console.log('🌙 Dark Mode Activated');
        }
    });
});

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('👁️ DROXO Store is visible');
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SERVICES, CONFIG, initializeApp };
}

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {

        loadingScreen.classList.add('fade-out');
        

        setTimeout(() => {
            loadingScreen.remove();
        }, 500); 
    }
});

// النسخة الحالية للتطبيق اللي راك مستعملها درك للتجربة
const currentVersion = "1.1"; 

// إضافة وقت عشوائي في آخر الرابط باش نخدعو الكاش والـ Service Worker
const versionUrl = "https://droxo-drz.github.io/Droxo-Shop/version.json?t=" + new Date().getTime();

fetch(versionUrl, { cache: "no-store" }) // إجبار المتصفح يجيب الملف الجديد ديراكت
  .then(response => response.json())
  .then(data => {
    console.log("النسخة أونلاين:", data.version, "النسخة الحالية:", currentVersion);
    
    if (data.version !== currentVersion) {
      let userChoice = confirm(`تحديث جديد واجد لمتجر Droxo (نسخة ${data.version})! حاب تحمله درك؟`);
      if (userChoice) {
          window.location.href = data.url;
      }
    }
  })
  .catch(err => console.log("خطأ في التحقق من التحديثات:", err));
  // 1. السمع لزر الرجوع تاع التيليفون أو المتصفح
window.addEventListener('popstate', (event) => {
    const currentHash = window.location.hash.replace('#', '');
    
    if (!currentHash) {
        // إذا الرابط فارغ، رجعو للرئيسية
        state.currentService = null;
        switchView('services');
    } else {
        // إذا رجع ولقى Hash تاع خدمة وحدة أخرى، يفتحها ديراكت
        const targetService = SERVICES.find(s => s.id === currentHash);
        if (targetService) {
            showPriceView(targetService);
        } else {
            showServicesView();
        }
    }
});

// 2. عند إقلاع الموقع: نخلّوه ذكي، إذا دخل واحد برابط مباشر يفتحلو الخدمة ديراكت!
document.addEventListener('DOMContentLoaded', () => {
    initializeApp(); // تشغيل التطبيق أولاً

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        const matchedService = SERVICES.find(s => s.id === initialHash);
        if (matchedService) {
            // فتح الخدمة ديراكت على حساب الرابط
            showPriceView(matchedService);
        } else {
            showServicesView();
        }
    }
});

// ==========================================
// كود إرسال وجلب الآراء (Feedbacks)
// ==========================================

// الاستماع لـ فورم إرسال الآراء وحفظها في Supabase
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // منع الصفحة من الانتعاش

        // جلب القيم من الخانات
        const name = document.getElementById('fbName').value;
        const city = document.getElementById('fbCity').value;
        const stars = document.getElementById('fbStars').value;
        const text = document.getElementById('fbText').value;

        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/feedbacks`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ name, city, stars, text })
            });

            if (!response.ok) throw new Error('Failed to send feedback');

            // إذا نجحت العملية:
            if (typeof loadFeedbacks === 'function') loadFeedbacks(); // عاود جلب القائمة باش يبان التعليق الجديد
            feedbackForm.reset(); // فرغ الخانات
            alert('شكراً لك! تم نشر رأيك أونلاين بنجاح ❤️');

        } catch (err) {
            console.error('Error saving feedback:', err);
            alert('صرى مشكل خفيف في الإرسال، عاود جرب تعيش!');
        }
    });
}


// ==========================================
// دالة نسخ النصوص المطورة (تخدم في الكمبيوتر والتليفون)
// ==========================================
function copyText(inputId, btnElement) {
    const input = document.getElementById(inputId);
    if (!input) return;

    // الطريقة الحديثة والمضمونة للنسخ المباشر
    navigator.clipboard.writeText(input.value).then(() => {
        
        // حفظ النص والأيقونة القدام تع الزر
        const btnTextEl = btnElement.querySelector('.btn-text');
        const iconEl = btnElement.querySelector('.icon');
        
        const originalText = btnTextEl ? btnTextEl.innerText : 'نسخ';
        const originalIcon = iconEl ? iconEl.innerText : '📋';

        // تغيير شكل الزر للون الأخضر والنيون فوراً تعبيراً عن النجاح
        btnElement.classList.add('copied');
        if (btnTextEl) btnTextEl.innerText = 'تم النسخ!';
        if (iconEl) iconEl.innerText = '✅';

        // إرجاع الزر لحالته الطبيعية بعد ثانيتين
        setTimeout(() => {
            btnElement.classList.remove('copied');
            if (btnTextEl) btnTextEl.innerText = originalText;
            if (iconEl) iconEl.innerText = originalIcon;
        }, 2000);

    }).catch(err => {
        // حل احتياطي (Fallback) في حال رفض المتصفح أو التيليفون القديم الطريقة الأولى
        try {
            input.select();
            input.setSelectionRange(0, 99999); // للهواتف
            document.execCommand('copy');
            
            const btnTextEl = btnElement.querySelector('.btn-text');
            const iconEl = btnElement.querySelector('.icon');
            
            btnElement.classList.add('copied');
            if (btnTextEl) btnTextEl.innerText = 'تم النسخ!';
            if (iconEl) iconEl.innerText = '✅';

            setTimeout(() => {
                btnElement.classList.remove('copied');
                if (btnTextEl) btnTextEl.innerText = 'نسخ';
                if (iconEl) iconEl.innerText = '📋';
            }, 2000);
        } catch (fallbackErr) {
            console.error('فشل النسخ تماماً: ', fallbackErr);
            alert('اضغط مطولاً على الرقم لنسخه يدوياً تعيش!');
        }
    });
}

// دالة نسخ النصوص بلمسة واحدة مع تأثير الأنيميشن


// ==========================================
// سيستم رفع الوصل وإرسال الطلبات لـ Supabase
// ==========================================

// تحديث اسم الصورة عند اختيارها
const receiptFileInput = document.getElementById('receiptFile');
if (receiptFileInput) {
    receiptFileInput.addEventListener('change', function() {
        const preview = document.getElementById('filePreview');
        if (this.files && this.files[0] && preview) {
            preview.innerText = `✅ تم اختيار: ${this.files[0].name}`;
            preview.classList.remove('hidden');
        }
    });
}

// الاستماع لـ فورم إرسال الطلب
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = orderForm.querySelector('.submit-order-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        submitBtn.disabled = true;
        if (btnText) btnText.innerText = 'جاري رفع الوصل وتأكيد الطلب... ⏳';

        const playerId = document.getElementById('orderPlayerId').value;
        const file = document.getElementById('receiptFile').files[0];
        
        // 🔥 جلب اسم اللعبة المفتوحة حالياً بكل ذكاء وبدون أخطاء 🔥
        let gameName = window.currentOpenedGameName || "غير معروف";

        try {
            if (!file) throw new Error('لم يتم اختيار ملف الوصل');

            // 1. رفع الصورة إلى Supabase Storage Bucket اسمه receipts
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
            
            const uploadResponse = await fetch(`${SUPABASE_URL}/storage/v1/object/receipts/${fileName}`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': file.type
                },
                body: file
            });

            if (!uploadResponse.ok) throw new Error('فشل رفع صورة الوصل');

            const receiptUrl = `${SUPABASE_URL}/storage/v1/object/public/receipts/${fileName}`;

            // 2. تسجيل الطلب كامل في جدول orders
            const orderResponse = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    game_name: gameName,
                    player_id: playerId,
                    amount_or_price: 'تم الدفع أونلاين',
                    payment_method: 'CCP/RedotPay',
                    receipt_url: receiptUrl
                })
            });

            if (!orderResponse.ok) throw new Error('فشل تسجيل بيانات الطلب');

            alert('تم إرسال طلبك بنجاح بطل! 🚀 وصورة الوصل تلحقتنا، راح نشحنولك حسابك في أقرب وقت ❤️');
            orderForm.reset();
            const preview = document.getElementById('filePreview');
            if (preview) preview.classList.add('hidden');

        } catch (err) {
            console.error(err);
            alert('صرى مشكل خفيف أثناء إرسال الطلب، عاود جرب تعيش!');
        } finally {
            submitBtn.disabled = false;
            if (btnText) btnText.innerText = 'تأكيد وشحن الطلب الآن 🔥';
        }
    });
}
// ==========================================
// سيستم تتبع الطلبات لايف من Supabase
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnTrack = document.getElementById('btnTrackOrder');
    const trackInput = document.getElementById('trackPlayerId');
    const trackerResult = document.getElementById('trackerResult');

    if (btnTrack && trackInput) {
        btnTrack.addEventListener('click', async () => {
            const playerId = trackInput.value.trim();
            if (!playerId) {
                alert(' تعيش اكتب الـ ID أولاً!');
                return;
            }

            // تغيير نص الزر أثناء البحث
            btnTrack.disabled = true;
            btnTrack.innerHTML = 'جاري البحث... ⏳';

            try {
                // جلب آخر طلب تم إرساله بهذا المعرف (مرتب بالتاريخ الأحدث أولاً)
                const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?player_id=eq.${playerId}&order=created_at.desc&limit=1`, {
                    method: 'GET',
                    headers: {
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    }
                });

                if (!response.ok) throw new Error('فشل الاتصال بالسيرفر');
                const data = await response.json();

                if (data && data.length > 0) {
                    const order = data[0];
                    
                    // ملء البيانات في الواجهة
                    document.getElementById('resGameName').innerText = order.game_name || 'غير معروف';
                    document.getElementById('resPlayerId').innerText = order.player_id;
                    
                    // تنسيق وتلوين شارة الحالة على حساب وضعيتها
                    const statusEl = document.getElementById('resStatus');
                    statusEl.innerText = order.status || 'قيد المراجعة';
                    
                    // تنظيف الكلاسات القديمة وتطبيق اللون الجديد
                    statusEl.className = 'status-badge'; 
                    if (order.status === 'قيد المراجعة') statusEl.classList.add('status-pending');
                    else if (order.status === 'جاري الشحن') statusEl.classList.add('status-processing');
                    else if (order.status === 'تم الشحن') statusEl.classList.add('status-completed');
                    else statusEl.classList.add('status-pending'); // افتراضي

                    // تنسيق الوقت والتاريخ بشكل مفهوم
                    const orderDate = new Date(order.created_at);
                    document.getElementById('resTime').innerText = orderDate.toLocaleString('fr-FR');

                    // إظهار النتيجة للزبون
                    trackerResult.classList.remove('hidden');
                } else {
                    alert('❌ مالقينا حتى طلب بهذا الـ ID! تأكد منه أو ابعث طلبك أولاً.');
                    trackerResult.classList.add('hidden');
                }

            } catch (err) {
                console.error(err);
                alert('صرى مشكل أثناء جلب البيانات، عاود جرب تعيش!');
            } finally {
                // إرجاع الزر لحالته الطبيعية
                btnTrack.disabled = false;
                btnTrack.innerHTML = 'بحث 🔍';
            }
        });
    }
});