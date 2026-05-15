// ============================================================================
// DROXO Digital Services Store - JavaScript
// Fixed Version with Correct Layout & Updated Contact Details
// ============================================================================

// Configuration Settings - Updated Contact Details
const CONFIG = {
    storeName: 'DROXO',
    whatsappNumber: '213796569674', // Updated number
    telegramUsername: 'Droxo_Dz', // Updated username
    defaultMessage: 'Hello DROXO, I want to order'
};

// Complete Services Database - 15 Services including eFootball
const SERVICES = [
    // Gaming Services
        {
        
        id: 'freefire',
        name: 'Free Fire',
        icon: '<img src="./Photo/freefire1.png" alt="Free Fire" class="icon-freefire">', // تأكد برك بلي هادي راهي تمشي برا
        
        // ⬇️ التعديل الصحيح والمطلوب هنا ⬇️
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
         detailIcon: './Photo/pubg.webp', // تأكد برك بلي هادي راهي تمشي برا
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
        detailIcon: './Photo/efootball.webp', // تأكد برك بلي هادي راهي تمشي برا
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
            { package: '5 USD', price: 1400, currency: 'DA' },
            { package: '10 USD', price: 2750, currency: 'DA' },
            { package: '20 USD', price: 5400, currency: 'DA' },
            { package: '50 USD', price: 13200, currency: 'DA' },
            { package: '100 USD', price: 30000, currency: 'DA' }
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
            { package: '10 USD Gift Card', price: 2900, currency: 'DA' },
            { package: '25 USD Gift Card', price: 7200, currency: 'DA' },
            { package: '50 USD Gift Card', price: 14000, currency: 'DA' },
            { package: '100 USD Gift Card', price: 23000, currency: 'DA' },
            { package: 'Game Pass Ultimate 1 Month', price: 4000, currency: 'DA' },
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
    
    // Streaming Services
    {
        id: 'netflix',
        name: 'Netflix',
        icon: '<img src="./Photo/netflix-logo.png" class="icon-netflix" alt="Netflix">',
        detailIcon: './Photo/netflix-logo.png',
        category: 'streaming',
        description: 'Netflix Subscription Algeria',
        prices: [
            { package: '15 USD', price: 4800, currency: 'DA' },
            { package: '20 USD', price: 5400, currency: 'DA' },
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
            { package: 'Shahid VIP 3 Months', price: 0, currency: 'DA' },
            { package: 'Shahid VIP 6 Months', price: 0, currency: 'DA' },
            { package: 'Shahid VIP 12 Months', price: 0, currency: 'DA' }
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
            { package: '10 USD', price: 00, currency: 'DA' },
            { package: '30 USD', price: 00, currency: 'DA' },
            { package: '12 USD', price: 00, currency: 'DA' },
            { package: 'Premium', price: 00, currency: 'DA' }
        ]
    },
    
    // Digital Products
    {
        id: 'googleplay',
        name: 'Google Play',
        icon: '<img src="./Photo/google-play.jpg" class="icon-google-play" alt="Google Play">',
        detailIcon: './Photo/google-play.jpg',
        category: 'digital',
        description: 'Google Play Gift Cards',
        prices: [
            { package: '5 USD', price: 1750, currency: 'DA' },
            { package: '10 USD', price: 3200, currency: 'DA' },
            { package: '25 USD', price: 7000, currency: 'DA' },
            { package: '50 USD', price: 15000, currency: 'DA' }
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
            { package: 'Nitro - 1 Month', price: 2700, currency: 'DA' },
            { package: 'Nitro - 3 Months', price: 7400, currency: 'DA' },
            { package: 'Nitro Basic - 1 Month', price: 1000, currency: 'DA' },
            { package: 'Nitro Classic - 12 Months', price: 23000, currency: 'DA' }
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
    
    // Crypto Services
    {
        id: 'binance',
        name: 'Binance USDT',
        icon: '<img src="./Photo/logo-binance.png" class="icon-binance-usdt" alt="Binance USDT">',
        detailIcon: './Photo/logo-binance.png',
        category: 'crypto',
        description: 'Binance USDT Cryptocurrency',
        prices: [
            { package: '10 USDT', price: 1850, currency: 'DA' },
            { package: '25 USDT', price: 7200, currency: 'DA' },
            { package: '50 USDT', price: 15000, currency: 'DA' }
        ]
    }
];

// DOM Elements Cache
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

// Application State
const state = {
    currentCategory: 'all',
    currentService: null
};

// ============================================================================
// Initialization
// ============================================================================

function initializeApp() {
    renderServices('all');
    setupEventListeners();
    console.log('🚀 DROXO Store v5.0 - Fixed Layout & Contacts');
    console.log('📱 WhatsApp: ' + CONFIG.whatsappNumber);
    console.log('✈️ Telegram: ' + CONFIG.telegramUsername);
}

// ============================================================================
// Event Listeners Setup
// ============================================================================

function setupEventListeners() {
    // Category tabs
    elements.categoryTabs.forEach(tab => {
        tab.addEventListener('click', handleCategoryChange);
    });
    
    // Back button
    elements.backBtn.addEventListener('click', showServicesView);
    
    // Order buttons
    elements.whatsappBtn.addEventListener('click', () => openWhatsApp());
    elements.telegramBtn.addEventListener('click', () => openTelegram());
}

// ============================================================================
// Category Filtering
// ============================================================================

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
    
    // Sort services alphabetically for better UX
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
  
    console.log(`📊 Viewing prices for: ${service.name}`);
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
    
    console.log('📊 Returned to home page with payment section');
}

function switchView(viewName) {
    if (viewName === 'price') {
        elements.servicesView.classList.add('hidden');
        elements.priceView.classList.remove('hidden');

        window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
    } else {
        elements.priceView.classList.add('hidden');
        elements.servicesView.classList.remove('hidden');
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
    
    // Track order attempt
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
    
    // Track order attempt
    console.log(`✈️ Opening Telegram for: ${serviceName} (Username: ${CONFIG.telegramUsername})`);
    
    window.open(url, '_blank');
    showNotification(`Opening Telegram for ${serviceName}...`, 'success');
}

// ============================================================================
// Utility Functions
// ============================================================================

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

// ============================================================================
// Error Handling & Analytics
// ============================================================================

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

// Track page views for analytics
function trackPageView(pageName) {
    console.log(`📊 Page View: ${pageName}`);
    // Add your analytics tracking here (Google Analytics, etc.)
}

// ============================================================================
// Initialize on DOM Load
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    trackPageView('Home');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('👁️ DROXO Store is visible');
    }
});

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SERVICES, CONFIG, initializeApp };
}
// إخفاء شاشة التحميل بمجرد ما تتشحن الصفحة كامل بالصور تاعها
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // نزيدو الكلاس لي يدير الأنميشن تع الاختفاء بالسلاسة
        loadingScreen.classList.add('fade-out');
        
        // نحوه تماماً من الـ DOM بعد ما تخلص الأنميشن باش ما يثقلش الصفحة
        setTimeout(() => {
            loadingScreen.remove();
        }, 500); // 500 ملي ثانية هي نفس مدة الـ transition في الـ CSS
    }
});