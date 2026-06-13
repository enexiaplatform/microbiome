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
    pain: 'Persistent bad breath',
    normalFail: 'Your toothbrush is not cleaning the smelly part of your mouth. Mouthwash is not enough if the tongue biofilm stays.',
    whyThisWorks: 'The mouth has a microbiome, and the tongue is prime real estate. Show the hidden white layer causing smell.',
    link: 'https://www.amazon.com/s?k=stainless+steel+tongue+scraper',
    featured: true
  },
  {
    id: 2, name: 'Mattress Vacuum with UV', category: 'home',
    pain: 'Dust allergies and sneezing fits',
    normalFail: 'A clean-looking mattress can still be dirty and full of allergen reservoirs.',
    whyThisWorks: 'Your sleep space has a microbial and allergen environment. Look what comes out of the mattress.',
    link: 'https://www.amazon.com/s?k=mattress+vacuum+with+uv',
    featured: true
  },
  {
    id: 3, name: 'Portable Water Flosser', category: 'oral',
    pain: 'Food trapped between teeth causing delayed odor',
    normalFail: 'Brushing hard does not clean between teeth where biofilm hides.',
    whyThisWorks: 'Oral biofilm disruption. Floss smell test demonstrates the hidden buildup.',
    link: 'https://www.amazon.com/s?k=portable+water+flosser',
    featured: true
  },
  {
    id: 4, name: 'Saline Nasal Rinse Bottle', category: 'air',
    pain: 'Nighttime allergies and sinus congestion',
    normalFail: 'Allergy spray is not the only first step. Nasal environment needs cleaning too.',
    whyThisWorks: 'The nose has its own environment; rinse irritants and pollen out gently before sleep.',
    link: 'https://www.amazon.com/s?k=saline+nasal+rinse'
  },
  {
    id: 5, name: 'Oral Probiotic Lozenges', category: 'oral',
    pain: 'Bad breath keeps coming back after brushing',
    normalFail: 'Killing all bacteria blindly can make the problem come back faster.',
    whyThisWorks: 'Add good oral bacteria to balance the microbiome instead of only attacking bad ones.',
    link: 'https://www.amazon.com/s?k=oral+probiotic+k12',
    featured: true
  },
  {
    id: 6, name: 'Enzyme Odor Cleaner Spray', category: 'home',
    pain: 'Shoe, toilet, and pet smells keep returning',
    normalFail: 'Fragrance only covers odor; it does not remove the source.',
    whyThisWorks: 'Enzymes help break down the odor source instead of just perfuming it.',
    link: 'https://www.amazon.com/s?k=enzyme+odor+cleaner'
  },
  {
    id: 7, name: 'Tonsil Stone Removal Kit', category: 'oral',
    pain: 'Bad breath originating from the throat',
    normalFail: 'Not all bad breath comes from the stomach. Hidden mouth-throat niches can hold odor-causing bacteria.',
    whyThisWorks: 'Directly removes tonsil niche bacteria that cause severe odor.',
    link: 'https://www.amazon.com/s?k=tonsil+stone+removal+kit'
  },
  {
    id: 8, name: 'Mini HEPA Air Purifier', category: 'air',
    pain: 'Dust in the room keeps triggering sneezing',
    normalFail: 'Scented candles do not clean the air. Particle reduction is necessary.',
    whyThisWorks: 'Indoor air shapes what your nose and throat deal with daily. White tissue filter test proves its efficacy.',
    link: 'https://www.amazon.com/s?k=hepa+air+purifier+mini'
  },
  {
    id: 9, name: 'Dust Mite Bedding Spray', category: 'home',
    pain: 'Your pillow may be triggering itchy nose and sneezing',
    normalFail: 'Washing sheets is not the same as treating the mattress.',
    whyThisWorks: 'Bedding is an ecosystem of dust, moisture, and allergens. Controls dust mite allergens directly.',
    link: 'https://www.amazon.com/s?k=dust+mite+spray'
  },
  {
    id: 10, name: 'Xylitol Gum or Lozenges', category: 'oral',
    pain: 'Coffee breath and dry mouth make odor worse',
    normalFail: 'Mint flavor does not equal fresh breath. It just masks it temporarily.',
    whyThisWorks: 'Saliva and pH help shape the oral microbiome. Chew this after coffee to neutralize acids.',
    link: 'https://www.amazon.com/s?k=xylitol+gum'
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
  if (route.startsWith('/article/')) {
    html = renderArticle(route.split('/')[2]);
  } else {
    switch (route) {
      case '/products': html = renderProducts(); break;
      case '/learn': html = renderContentHub(); break;
      case '/dashboard': html = renderDashboard(); break;
      case '/disclosure': html = renderDisclosure(); break;
      case '/privacy': html = renderPrivacy(); break;
      default: html = renderLanding();
    }
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
        <a class="btn btn--primary btn--full mt-12" href="${p.link || '#'}" target="_blank" rel="sponsored noopener">Check Price on Amazon →</a>
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
    <div class="card article-card" onclick="navigate('/article/${a.id}')">
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

// --- ARTICLE AND LEGAL PAGES ---
const ARTICLE_CONTENT = {
  1: `
    <h2 class="t-h2" style="margin-top: 24px;">The Hidden White Layer</h2>
    <p class="t-body" style="margin-top: 12px;">Most people brush their teeth twice a day and use mouthwash, yet they still struggle with bad breath. The reason is simple: the tongue is prime real estate for bacteria.</p>
    <p class="t-body" style="margin-top: 12px;">If you stick out your tongue and see a white or yellow coating towards the back, that is a biofilm. It's composed of dead cells, food debris, and millions of anaerobic bacteria that produce volatile sulfur compounds (VSCs) — the exact gases responsible for chronic halitosis.</p>
    <h2 class="t-h2" style="margin-top: 24px;">Why Brushing Isn't Enough</h2>
    <p class="t-body" style="margin-top: 12px;">Toothbrush bristles are designed for hard enamel, not the soft, spongy tissue of the tongue. Brushing simply moves the biofilm around without effectively scraping it off.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=stainless+steel+tongue+scraper" target="_blank" rel="sponsored noopener">View Recommended Tongue Scrapers on Amazon →</a>
    </div>
  `,
  2: `
    <h2 class="t-h2" style="margin-top: 24px;">Invisible Ecosystems</h2>
    <p class="t-body" style="margin-top: 12px;">You wash your sheets weekly, but have you ever cleaned the mattress itself? Your bed is a thriving microbial ecosystem. Every night, we shed dead skin cells and sweat, creating the perfect warm, humid environment for dust mites and fungal spores.</p>
    <h2 class="t-h2" style="margin-top: 24px;">The Allergy Reservoir</h2>
    <p class="t-body" style="margin-top: 12px;">If you wake up sneezing, congested, or with itchy eyes, the problem is likely right under your pillow. A clean-looking mattress can hold millions of dust mites, and their droppings are a potent allergen.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=mattress+vacuum+with+uv" target="_blank" rel="sponsored noopener">Check Mattress Vacuums on Amazon →</a>
    </div>
  `,
  7: `
    <h2 class="t-h2" style="margin-top: 24px;">The Mouthwash Paradox</h2>
    <p class="t-body" style="margin-top: 12px;">Alcohol-based mouthwashes feel refreshing because they 'burn'. But they are non-selective: they kill both the bad bacteria and the good, protective bacteria in your mouth.</p>
    <p class="t-body" style="margin-top: 12px;">When you wipe out your oral microbiome, the fastest bacteria to recolonize are often the odor-causing pathogens. This creates a cycle where you need mouthwash more frequently, but the bad breath keeps returning faster and stronger.</p>
    <h2 class="t-h2" style="margin-top: 24px;">Bacterial Replacement Therapy</h2>
    <p class="t-body" style="margin-top: 12px;">Instead of nuking the mouth, modern dentistry is leaning towards oral probiotics like strains K12 and M18. These beneficial bacteria naturally crowd out the sulfur-producing strains.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=oral+probiotic+k12" target="_blank" rel="sponsored noopener">Find Oral Probiotics on Amazon →</a>
    </div>
  `,
  3: `
    <h2 class="t-h2" style="margin-top: 24px;">Your Nasal Microbiome</h2>
    <p class="t-body" style="margin-top: 12px;">Allergies aren't just an overreaction of the immune system; they're heavily influenced by what particles are trapped in your nasal passages. When pollen, dust, or pet dander sit in your nose overnight, they disrupt the local microbiome and cause continuous inflammation.</p>
    <h2 class="t-h2" style="margin-top: 24px;">The Gentle Rinse Approach</h2>
    <p class="t-body" style="margin-top: 12px;">Instead of reaching immediately for antihistamines or steroid sprays, consider physically removing the irritants. A gentle saline rinse washes out trapped particles and helps restore the natural moisture balance in your nasal cavity.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=saline+nasal+rinse" target="_blank" rel="sponsored noopener">View Saline Rinse Kits on Amazon →</a>
    </div>
  `,
  4: `
    <h2 class="t-h2" style="margin-top: 24px;">The Myth of Minty Freshness</h2>
    <p class="t-body" style="margin-top: 12px;">It's a common misconception that strong, minty mouthwash cures bad breath. In reality, most commercial mouthwashes contain alcohol or harsh antibacterial agents that dry out the mouth and indiscriminately kill all bacteria—good and bad.</p>
    <h2 class="t-h2" style="margin-top: 24px;">The Rebound Effect</h2>
    <p class="t-body" style="margin-top: 12px;">When you create a "clean slate" in your mouth by killing everything, odor-causing anaerobic bacteria are usually the first to grow back. Without good bacteria to keep them in check, they multiply rapidly, leading to breath that's worse than before.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=xylitol+gum" target="_blank" rel="sponsored noopener">Explore Better Alternatives on Amazon →</a>
    </div>
  `,
  5: `
    <h2 class="t-h2" style="margin-top: 24px;">Looks Can Be Deceiving</h2>
    <p class="t-body" style="margin-top: 12px;">You might change your bedsheets every week and think your bed is perfectly clean. However, the mattress underneath is a dense sponge that collects dead skin cells, sweat, and microscopic dust mites over years of use.</p>
    <h2 class="t-h2" style="margin-top: 24px;">The Invisible Allergen Trap</h2>
    <p class="t-body" style="margin-top: 12px;">These dust mites produce allergens that are a primary cause of morning congestion and asthma. Regular vacuuming with a standard machine isn't enough to extract them from deep within the mattress fibers.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=mattress+vacuum+with+uv" target="_blank" rel="sponsored noopener">See Specialized Mattress Vacuums →</a>
    </div>
  `,
  6: `
    <h2 class="t-h2" style="margin-top: 24px;">Masking vs. Eliminating</h2>
    <p class="t-body" style="margin-top: 12px;">When a room or pair of shoes smells bad, the instinct is to spray a heavily scented air freshener. But fragrance merely overlays the bad odor; it does nothing to remove the biological source of the smell.</p>
    <h2 class="t-h2" style="margin-top: 24px;">The Power of Enzymes</h2>
    <p class="t-body" style="margin-top: 12px;">To truly eliminate persistent odors, you need to break down the organic matter causing them. Enzyme-based cleaners use beneficial bacteria that literally "eat" the odor-causing compounds, leaving nothing behind to smell bad.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=enzyme+odor+cleaner" target="_blank" rel="sponsored noopener">Find Enzyme Cleaners on Amazon →</a>
    </div>
  `,
  8: `
    <h2 class="t-h2" style="margin-top: 24px;">Beyond the Teeth and Gums</h2>
    <p class="t-body" style="margin-top: 12px;">If you have excellent dental hygiene but still suffer from chronic bad breath, the source might be further back. The tonsils have deep crevices (crypts) where food particles, dead cells, and bacteria can accumulate and calcify into tonsil stones.</p>
    <h2 class="t-h2" style="margin-top: 24px;">Targeting the Source</h2>
    <p class="t-body" style="margin-top: 12px;">These stones emit a foul, sulfurous odor. Safe, targeted removal using proper tools—rather than harsh chemicals or vigorous scraping—can eliminate this hidden source of halitosis and restore confidence.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=tonsil+stone+removal+kit" target="_blank" rel="sponsored noopener">View Tonsil Care Kits on Amazon →</a>
    </div>
  `,
  9: `
    <h2 class="t-h2" style="margin-top: 24px;">The Bedroom Biome</h2>
    <p class="t-body" style="margin-top: 12px;">You spend a third of your life in your bedroom. The quality of the air and the state of your bedding profoundly impact your respiratory health. An allergy-free bedroom requires a multi-faceted approach to control dust, pollen, and pet dander.</p>
    <h2 class="t-h2" style="margin-top: 24px;">Layered Protection</h2>
    <p class="t-body" style="margin-top: 12px;">Start with a true HEPA air purifier to continuously filter airborne particles. Combine this with regular use of dust mite sprays on upholstery and specialized vacuums for your mattress to create a truly restorative sleep environment.</p>
    <div style="text-align:center; margin: 40px 0;">
      <a class="btn btn--primary btn--lg" href="https://www.amazon.com/s?k=hepa+air+purifier+mini" target="_blank" rel="sponsored noopener">Explore HEPA Purifiers on Amazon →</a>
    </div>
  `
};

function renderArticle(id) {
  let title = 'Article Not Found';
  let content = '<p>Sorry, this article is not available yet.</p>';
  let articleObj = null;

  for (const group of Object.values(ARTICLES)) {
    const found = group.find(a => a.id == id);
    if (found) {
      articleObj = found;
      title = found.title;
      break;
    }
  }

  if (ARTICLE_CONTENT[id]) {
    content = ARTICLE_CONTENT[id];
  }

  return `
    <div class="page" id="page-article">
      <div class="container" style="max-width: 800px; padding-top: 40px; padding-bottom: 80px;">
        <button class="btn btn--ghost" style="margin-bottom: 20px; padding: 0;" onclick="navigate('/learn')">← Back to Content Hub</button>
        <div class="article-content" style="background:var(--surface); border-radius:var(--radius); padding:40px; border:1px solid var(--border);">
          <div class="card__science" style="margin-bottom: 24px; padding: 12px; background: #fdf2e9; border-radius: 8px; font-weight: 600; color: #d35400;">
            Disclosure: This post contains affiliate links. If you buy through these links, we may earn a commission at no extra cost to you.
          </div>
          <h1 class="t-hero" style="margin-bottom: 16px;">${title}</h1>
          ${articleObj ? `<p class="t-body" style="color:var(--text-muted); margin-bottom:32px;">📖 ${articleObj.readTime} read</p>` : ''}
          ${content}
        </div>
      </div>
    </div>
  `;
}

function renderDisclosure() {
  return `
    <div class="page" id="page-disclosure">
      <div class="container" style="max-width: 800px; padding-top: 60px; padding-bottom: 80px;">
        <h1 class="t-hero">Affiliate Disclosure</h1>
        <div class="article-content mt-32" style="background:var(--surface); border-radius:var(--radius); padding:40px; border:1px solid var(--border);">
          <p class="t-body"><strong>Last Updated: 2026</strong></p>
          <p class="t-body mt-12">Microbiome Living Lab is a participant in the Amazon Services LLC Associates Program and other affiliate programs. These are affiliate advertising programs designed to provide a means for sites to earn advertising fees by advertising and linking to global marketplaces.</p>
          <p class="t-body mt-12">When you click on links to various merchants on this site and make a purchase, this can result in this site earning a commission. Affiliate programs and affiliations include, but are not limited to, the eBay Partner Network and Amazon.com.</p>
        </div>
      </div>
    </div>
  `;
}

function renderPrivacy() {
  return `
    <div class="page" id="page-privacy">
      <div class="container" style="max-width: 800px; padding-top: 60px; padding-bottom: 80px;">
        <h1 class="t-hero">Privacy Policy</h1>
        <div class="article-content mt-32" style="background:var(--surface); border-radius:var(--radius); padding:40px; border:1px solid var(--border);">
          <p class="t-body">At Microbiome Living Lab, we take your privacy seriously. We do not sell your personal information. We use third-party tracking cookies (like Google Analytics) to understand our global audience better. By using this site, you consent to our use of these non-invasive analytics.</p>
        </div>
      </div>
    </div>
  `;
}

// --- EXPOSE GLOBALS FOR INLINE HANDLERS ---
window.navigate = navigate;
window.toggleMobileMenu = toggleMobileMenu;

// --- INIT ---
document.addEventListener('DOMContentLoaded', initRouter);
