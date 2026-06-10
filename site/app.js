/* ============================================
   MICROBIOME LIVING LAB — App Logic
   ============================================ */

// --- DATA ---
const CATEGORIES = [
  { id: 'air', name: 'Air', icon: '🌬️', iconClass: 'cat-card__icon--air', desc: 'Purify the air you breathe with microbiome-friendly solutions.' },
  { id: 'home', name: 'Home', icon: '🏠', iconClass: 'cat-card__icon--home', desc: 'Clean smarter — protect the good bacteria in your home.' },
  { id: 'oral', name: 'Oral', icon: '🦷', iconClass: 'cat-card__icon--oral', desc: 'Restore oral microbiome balance for lasting freshness.' },
  { id: 'gut', name: 'Gut', icon: '🧬', iconClass: 'cat-card__icon--gut', desc: 'Strengthen your gut ecosystem from the inside out.' }
];

const PRODUCTS = [
  {
    id: 1, name: 'Stainless Steel Tongue Scraper', category: 'oral',
    pain: 'Bad breath (Hôi miệng dai dẳng)',
    normalFail: 'Your toothbrush is not cleaning the smelly part of your mouth. Mouthwash is not enough if the tongue biofilm stays.',
    whyThisWorks: 'The mouth has a microbiome, and the tongue is prime real estate. Show the hidden white layer causing smell.',
    link: 'https://shopee.vn/search?keyword=cao%20luoi%20inox',
    featured: true
  },
  {
    id: 2, name: 'Mattress Vacuum with UV', category: 'home',
    pain: 'Dust cleaning and allergy (Bạn thức dậy và hắt hơi vì giường chứa đầy bụi)',
    normalFail: 'A clean-looking mattress can still be dirty and full of allergen reservoirs.',
    whyThisWorks: 'Your sleep space has a microbial and allergen environment. Look what comes out of the mattress.',
    link: 'https://shopee.vn/search?keyword=may%20hut%20bui%20nem%20uv',
    featured: true
  },
  {
    id: 3, name: 'Portable Water Flosser', category: 'oral',
    pain: 'Food stuck between teeth becomes smell later (Thức ăn kẹt gây mùi)',
    normalFail: 'Brushing hard does not clean between teeth where biofilm hides.',
    whyThisWorks: 'Oral biofilm disruption. Floss smell test demonstrates the hidden buildup.',
    link: 'https://shopee.vn/search?keyword=may%20tam%20nuoc%20cam%20tay',
    featured: true
  },
  {
    id: 4, name: 'Saline Nasal Rinse Bottle', category: 'air',
    pain: 'Night allergies may come from what stays in your nose (Nghẹt mũi dị ứng)',
    normalFail: 'Allergy spray is not the only first step. Nasal environment needs cleaning too.',
    whyThisWorks: 'The nose has its own environment; rinse irritants and pollen out gently before sleep.',
    link: 'https://shopee.vn/search?keyword=binh%20rua%20mui'
  },
  {
    id: 5, name: 'Oral Probiotic Lozenges (K12/M18)', category: 'oral',
    pain: 'Bad breath keeps coming back after brushing (Hôi miệng dai dẳng)',
    normalFail: 'Killing all bacteria blindly can make the problem come back faster.',
    whyThisWorks: 'Add good oral bacteria to balance the microbiome instead of only attacking bad ones.',
    link: 'https://shopee.vn/search?keyword=oral%20probiotic%20k12',
    featured: true
  },
  {
    id: 6, name: 'Enzyme Odor Cleaner Spray', category: 'home',
    pain: 'Shoe, toilet, and pet smells keep returning',
    normalFail: 'Fragrance only covers odor; it does not remove the source.',
    whyThisWorks: 'Enzymes help break down the odor source instead of just perfuming it.',
    link: 'https://shopee.vn/search?keyword=xit%20khu%20mui%20enzyme'
  },
  {
    id: 7, name: 'Tonsil Stone Removal Kit', category: 'oral',
    pain: 'Bad breath from the throat is real (Hôi miệng từ cổ họng)',
    normalFail: 'Not all bad breath comes from the stomach. Hidden mouth-throat niches can hold odor-causing bacteria.',
    whyThisWorks: 'Directly removes tonsil niche bacteria that cause severe odor.',
    link: 'https://shopee.vn/search?keyword=dung%20cu%20lay%20soi%20amidan'
  },
  {
    id: 8, name: 'Mini HEPA Air Purifier', category: 'air',
    pain: 'Dust in the room keeps triggering sneezing',
    normalFail: 'Scented candles do not clean the air. Particle reduction is necessary.',
    whyThisWorks: 'Indoor air shapes what your nose and throat deal with daily. White tissue filter test proves its efficacy.',
    link: 'https://shopee.vn/search?keyword=may%20loc%20khong%20khi%20hepa%20mini'
  },
  {
    id: 9, name: 'Dust Mite Bedding Spray', category: 'home',
    pain: 'Your pillow may be triggering itchy nose and sneezing',
    normalFail: 'Washing sheets is not the same as treating the mattress.',
    whyThisWorks: 'Bedding is an ecosystem of dust, moisture, and allergens. Controls dust mite allergens directly.',
    link: 'https://shopee.vn/search?keyword=xit%20diet%20ve%20bui%20nem'
  },
  {
    id: 10, name: 'Xylitol Gum or Lozenges', category: 'oral',
    pain: 'Coffee breath and dry mouth make odor worse',
    normalFail: 'Mint flavor does not equal fresh breath. It just masks it temporarily.',
    whyThisWorks: 'Saliva and pH help shape the oral microbiome. Chew this after coffee to neutralize acids.',
    link: 'https://shopee.vn/search?keyword=xylitol%20gum'
  }
];

const STARTER_KITS = [
  {
    id: 'allergy',
    name: 'Allergy Starter Kit',
    icon: '🤧',
    iconClass: 'kit-card__icon--allergy',
    desc: 'Stop chasing symptoms. Rebalance the microbial ecosystem in your air and sinuses.',
    products: ['Mini HEPA Air Purifier', 'Saline Nasal Rinse Bottle', 'Mattress Vacuum with UV']
  },
  {
    id: 'breath',
    name: 'Fresh Breath Kit',
    icon: '😮\u200d💨',
    iconClass: 'kit-card__icon--breath',
    desc: 'Fix bad breath at the source — your oral microbiome, not just the surface.',
    products: ['Stainless Steel Tongue Scraper', 'Oral Probiotic Lozenges', 'Portable Water Flosser']
  },
  {
    id: 'home',
    name: 'Clean Home Kit',
    icon: '🏡',
    iconClass: 'kit-card__icon--home',
    desc: 'Clean smarter. Protect the bacteria that protect you.',
    products: ['Enzyme Odor Cleaner Spray', 'Dust Mite Bedding Spray', 'Mattress Vacuum with UV']
  }
];

const ARTICLES = {
  educational: [
    { id: 1, title: 'The Tongue is Prime Real Estate for Bacteria', excerpt: 'Your mouth has a microbiome. Here is why keeping the tongue clean is more important than just brushing your teeth.', readTime: '4 min', category: 'oral' },
    { id: 2, title: 'Your Sleep Space Ecosystem', excerpt: 'You wake up sneezing because your bed is holding dust. Learn how the microbial and allergen environment in your mattress affects your health.', readTime: '5 min', category: 'home' },
    { id: 3, title: 'The Nose Has Its Own Environment', excerpt: 'Allergy spray is not the only first step. Learn how rinsing irritants out gently balances your nasal microbiome.', readTime: '4 min', category: 'air' }
  ],
  myths: [
    { id: 4, title: 'Myth: Mouthwash Fixes Bad Breath', excerpt: 'Mouthwash is not enough if the tongue biofilm stays. In fact, killing all bacteria blindly can make the problem come back worse.', readTime: '3 min', category: 'oral' },
    { id: 5, title: 'Myth: A Clean-Looking Mattress is Clean', excerpt: 'Washing sheets is not the same as treating the mattress. Discover why a clean-looking bed can still be a reservoir for allergens.', readTime: '4 min', category: 'home' },
    { id: 6, title: 'Myth: Fragrance Removes Odor', excerpt: 'Fragrance covers odor; it does not remove the source. Why enzymes that break down odor molecules are superior to air fresheners.', readTime: '3 min', category: 'home' }
  ],
  guides: [
    { id: 7, title: 'Stop Killing Bacteria Blindly', excerpt: 'How to add good oral bacteria (like K12 or M18) instead of only attacking bad ones to fight chronic bad breath.', readTime: '5 min', category: 'oral' },
    { id: 8, title: 'Hidden Mouth-Throat Niches', excerpt: 'Not all bad breath comes from the stomach. How to safely identify and clean tonsil stones that hold odor-causing bacteria.', readTime: '4 min', category: 'oral' },
    { id: 9, title: 'Building an Allergy-Free Bedroom', excerpt: 'From HEPA filters to dust mite sprays, a step-by-step guide to shaping what your nose and throat deal with daily.', readTime: '6 min', category: 'air' }
  ]
};

const DASHBOARD_DATA = {
  totalViews: 12480,
  productClicks: 843,
  orders: 37,
  revenue: 1284,
  bestCategory: 'Gut',
  performance: [
    { label: 'Gut', value: 42 },
    { label: 'Oral', value: 28 },
    { label: 'Home', value: 18 },
    { label: 'Air', value: 12 }
  ],
  nextTests: [
    { text: 'Test short-form video: Tongue scraper hidden white layer', status: 'pending' },
    { text: 'Test visual demo: Mattress vacuum with UV', status: 'pending' },
    { text: 'Test smell test: Portable water flosser', status: 'pending' },
    { text: 'Set up affiliate tracking for Saline nasal rinse', status: 'done' },
    { text: 'Write comparison: Oral probiotic vs Mouthwash', status: 'done' }
  ]
};

// --- ROUTER ---
function getRoute() {
  return window.location.hash.slice(1) || '/';
}

function navigate(path) {
  window.location.hash = path;
}

function initRouter() {
  window.addEventListener('hashchange', render);
  render();
}

// --- RENDER ENGINE ---
function render() {
  const route = getRoute();
  const app = document.getElementById('app');
  closeMobileMenu();
  updateActiveNav(route);
  window.scrollTo(0, 0);

  let html = '';
  switch (route) {
    case '/products': html = renderProducts(); break;
    case '/learn': html = renderContentHub(); break;
    case '/dashboard': html = renderDashboard(); break;
    default: html = renderLanding();
  }

  app.innerHTML = html;
  initScrollReveal();
  if (route === '/products') initFilters();
  if (route === '/dashboard') initDashboard();
}

// --- NAV ---
function updateActiveNav(route) {
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('data-route');
    link.classList.toggle('active', href === route || (route === '/' && href === '/'));
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
}

// --- LANDING PAGE ---
function renderLanding() {
  return `
    <div class="page" id="page-landing">
      ${renderHero()}
      ${renderProblem()}
      ${renderCategories()}
      ${renderFeatured()}
      ${renderCTABanner()}
    </div>
  `;
}

function renderHero() {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero__badge"><span class="hero__badge-dot"></span> Microbiome Living Lab</div>
        <h1 class="t-hero hero__title">Your home is not clean.<br>It's unbalanced.</h1>
        <p class="hero__sub">You scrub, spray, and sanitize — but allergies stay, bad breath returns, and your family keeps getting sick. The problem is not dirt. It is your microbiome.</p>
        <a class="btn btn--primary btn--lg" onclick="navigate('/products')">Explore Solutions</a>
      </div>
    </section>
  `;
}

function renderProblem() {
  const blocks = [
    {
      icon: '🤧', title: 'Allergies & Sinus',
      pain: 'Sneezing, congestion, sinus infections that never fully go away',
      solution: 'Your air purifier removes particles — but also wipes out the beneficial microbes that keep allergens in check. Rebalancing your air microbiome stops the cycle.'
    },
    {
      icon: '😮', title: 'Bad Breath & Oral',
      pain: 'Breath that comes back minutes after brushing or mouthwash',
      solution: 'Alcohol-based mouthwash destroys your oral microbiome. The bacteria that cause bad breath recolonize first. Oral probiotics restore the balance.'
    },
    {
      icon: '🏠', title: '"Clean" But Still Dirty',
      pain: 'You disinfect everything but your family still gets sick',
      solution: 'Chemical cleaners create empty surfaces. Harmful bacteria are the fastest to recolonize. Probiotic cleaning fills surfaces with protective bacteria instead.'
    }
  ];
  return `
    <section class="section problem reveal">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">The real problem</span>
          <h2 class="t-h1">You are not just fighting dirt.<br>You are living inside a microbial ecosystem.</h2>
        </div>
        <div class="problem__grid mt-32">
          ${blocks.map(b => `
            <div class="problem__block" onclick="navigate('/products')">
              <div class="problem__block-header">
                <div class="problem__icon">${b.icon}</div>
                <div class="t-h3">${b.title}</div>
              </div>
              <div class="problem__block-pain">${b.pain}</div>
              <div class="problem__block-solution">${b.solution}</div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-32">
          <a class="btn btn--primary btn--lg" onclick="navigate('/products')">Explore Solutions</a>
        </div>
      </div>
    </section>
  `;
}

function renderCategories() {
  return `
    <section class="section reveal">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Categories</span>
          <h2 class="t-h1">Four pillars of microbiome health</h2>
        </div>
        <div class="grid grid-4 mt-20">
          ${CATEGORIES.map(c => `
            <div class="cat-card" onclick="navigate('/products')">
              <div class="cat-card__icon ${c.iconClass}">${c.icon}</div>
              <div class="t-h3">${c.name}</div>
              <p class="t-small" style="color:var(--text-secondary);margin-top:6px;">${c.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderFeatured() {
  const featured = PRODUCTS.filter(p => p.featured);
  return `
    <section class="section reveal" style="background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Featured</span>
          <h2 class="t-h1">Products we recommend</h2>
          <p class="section-header__desc t-body">Science-backed, carefully vetted microbiome products for real health concerns.</p>
        </div>
        <div class="grid grid-3 mt-20">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
        <div class="text-center mt-32">
          <a class="btn btn--outline" onclick="navigate('/products')">View All Products →</a>
        </div>
      </div>
    </section>
  `;
}

function renderCTABanner() {
  return `
    <section class="section reveal">
      <div class="container">
        <div class="cta-banner">
          <h2 class="t-h1">Learn before you buy</h2>
          <p class="t-body">Explore our educational content hub — myth-busting articles, product guides, and science-backed insights to help you make informed decisions.</p>
          <a class="btn" onclick="navigate('/learn')">Visit Content Hub →</a>
        </div>
      </div>
    </section>
  `;
}

// --- PRODUCT CARD (conversion-focused) ---
function renderProductCard(p) {
  const cat = CATEGORIES.find(c => c.id === p.category);
  return `
    <div class="card">
      <div class="card__img">${cat ? cat.icon : '📦'}</div>
      <div class="card__body">
        <span class="badge badge--${p.category}">${cat ? cat.name : p.category}</span>
        <h3 class="t-h3">${p.name}</h3>
        <div class="card__pain">${p.pain}</div>
        <div class="card__fix">❌ Normal fix fails: ${p.normalFail}</div>
        <div class="card__science">✅ ${p.whyThisWorks}</div>
        <a class="btn btn--primary btn--full mt-12" href="${p.link || '#'}" target="_blank">View Product on Shopee →</a>
      </div>
    </div>
  `;
}

// --- PRODUCTS PAGE ---
function renderProducts() {
  const cats = ['All', ...CATEGORIES.map(c => c.name)];
  return `
    <div class="page" id="page-products">
      ${renderStarterKits()}
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-header__eyebrow">All Products</span>
            <h2 class="t-h1">Product Recommendations</h2>
            <p class="section-header__desc t-body">Every product vetted for scientific credibility. Matched to real health concerns.</p>
          </div>
          <div class="filters" id="product-filters">
            ${cats.map((c, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${c === 'All' ? 'all' : c.toLowerCase()}">${c}</button>`).join('')}
          </div>
          <div class="grid grid-3" id="product-grid">
            ${PRODUCTS.map(p => `<div class="product-item" data-category="${p.category}">${renderProductCard(p)}</div>`).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

// --- STARTER KITS ---
function renderStarterKits() {
  return `
    <section class="section" style="background:var(--surface);border-bottom:1px solid var(--border);">
      <div class="container">
        <div class="section-header section-header--center">
          <span class="section-header__eyebrow">Starter Kits</span>
          <h2 class="t-h1">Not sure where to start?</h2>
          <p class="section-header__desc t-body">Pick a kit based on your problem. Each kit combines products that work together.</p>
        </div>
        <div class="grid grid-3 mt-20">
          ${STARTER_KITS.map(kit => `
            <div class="kit-card">
              <div class="kit-card__icon ${kit.iconClass}">${kit.icon}</div>
              <div class="kit-card__title">${kit.name}</div>
              <div class="kit-card__desc">${kit.desc}</div>
              <div class="kit-card__products">
                ${kit.products.map(p => `
                  <div class="kit-card__product">
                    <span class="kit-card__product-icon"></span>
                    <span>${p}</span>
                  </div>
                `).join('')}
              </div>
              <a class="btn btn--primary btn--full" href="#" onclick="event.preventDefault()">View Kit →</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function initFilters() {
  const btns = document.querySelectorAll('#product-filters .filter-btn');
  const items = document.querySelectorAll('.product-item');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// --- CONTENT HUB ---
function renderContentHub() {
  return `
    <div class="page" id="page-learn">
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-header__eyebrow">Content Hub</span>
            <h1 class="t-h1">Learn Before You Buy</h1>
            <p class="section-header__desc t-body">Evidence-based articles, myth-busting insights, and practical guides to help you understand microbiome health.</p>
          </div>

          <div class="mt-32 reveal">
            <h2 class="t-h2 mb-12">📚 Educational Articles</h2>
            <div class="grid grid-3">${ARTICLES.educational.map(a => renderArticleCard(a)).join('')}</div>
          </div>

          <div class="mt-32 reveal">
            <h2 class="t-h2 mb-12">💡 Myth Busters</h2>
            <div class="grid grid-3">${ARTICLES.myths.map(a => renderArticleCard(a)).join('')}</div>
          </div>

          <div class="mt-32 reveal">
            <h2 class="t-h2 mb-12">🗺️ Product Guides</h2>
            <div class="grid grid-3">${ARTICLES.guides.map(a => renderArticleCard(a)).join('')}</div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderArticleCard(a) {
  const cat = CATEGORIES.find(c => c.id === a.category);
  const badgeClass = cat ? `badge--${cat.id}` : 'badge--learn';
  const badgeName = cat ? cat.name : 'Learn';
  return `
    <div class="card article-card">
      <div class="card__body">
        <span class="badge ${badgeClass}">${badgeName}</span>
        <h3 class="t-h3" style="margin-top:10px;">${a.title}</h3>
        <p class="t-body" style="color:var(--text-secondary);margin-top:6px;">${a.excerpt}</p>
        <div class="article-card__meta">
          <span>📖 ${a.readTime} read</span>
        </div>
      </div>
    </div>
  `;
}

// --- DASHBOARD ---
function renderDashboard() {
  const d = DASHBOARD_DATA;
  return `
    <div class="page" id="page-dashboard">
      <section class="section">
        <div class="container">
          <div class="section-header">
            <span class="section-header__eyebrow">Internal</span>
            <h1 class="t-h1">Founder Dashboard</h1>
            <p class="section-header__desc t-body">Performance overview for Microbiome Living Lab.</p>
          </div>

          <div class="stat-grid reveal">
            <div class="stat-card">
              <div class="stat-card__value">${d.totalViews.toLocaleString()}</div>
              <div class="stat-card__label">Total Views</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__value">${d.productClicks.toLocaleString()}</div>
              <div class="stat-card__label">Product Clicks</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__value">${d.orders}</div>
              <div class="stat-card__label">Orders</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__value">$${d.revenue.toLocaleString()}</div>
              <div class="stat-card__label">Revenue</div>
            </div>
          </div>

          <div class="card reveal" style="padding:24px;margin-bottom:24px;">
            <h3 class="t-h2 mb-12">Content Performance by Category</h3>
            <div class="bar-chart" id="bar-chart">
              ${d.performance.map(p => `
                <div class="bar-chart__row">
                  <span class="bar-chart__label">${p.label}</span>
                  <div class="bar-chart__track">
                    <div class="bar-chart__fill" data-width="${p.value}" style="width:0%">${p.value}%</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card reveal" style="padding:24px;margin-bottom:24px;">
            <h3 class="t-h2 mb-12">🏆 Best Category</h3>
            <div style="display:flex;align-items:center;gap:12px;">
              <div class="cat-card__icon cat-card__icon--gut" style="width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">🧬</div>
              <div>
                <div class="t-h3">${d.bestCategory}</div>
                <div class="t-small" style="color:var(--text-secondary);">Highest click-through rate and conversion</div>
              </div>
            </div>
          </div>

          <div class="card reveal" style="padding:24px;">
            <h3 class="t-h2 mb-12">🧪 Next Tests</h3>
            <div class="checklist">
              ${d.nextTests.map(t => `
                <div class="checklist__item">
                  <span class="checklist__dot checklist__dot--${t.status}"></span>
                  <span style="${t.status === 'done' ? 'text-decoration:line-through;color:var(--text-muted);' : ''}">${t.text}</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </section>
    </div>
  `;
}

function initDashboard() {
  setTimeout(() => {
    document.querySelectorAll('.bar-chart__fill').forEach(bar => {
      bar.style.width = bar.getAttribute('data-width') + '%';
    });
  }, 200);
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- SCROLL NAV SHADOW ---
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

// --- EXPOSE GLOBALS FOR INLINE HANDLERS ---
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;

// --- INIT ---
document.addEventListener('DOMContentLoaded', initRouter);
