// ============================================================
//  EnviroBiotics Affiliate Hub — Main Application
//  Client-side SPA with hash-based routing
// ============================================================

// --- ROUTER ---
function getRoute() { return window.location.hash.slice(1) || '/'; }
function navigate(path) { window.location.hash = path; }

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  if (menu) menu.classList.remove('open');
  if (btn) btn.classList.remove('open');
}
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
function updateActiveNav(route) {
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('data-route');
    link.classList.toggle('active', href === route || (route === '/' && href === '/'));
  });
}

function initRouter() {
  window.addEventListener('hashchange', render);
  render();
}

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
      case '/products':   html = renderProductsPage();   break;
      case '/learn':      html = renderLearnPage();       break;
      case '/dashboard':  html = renderDashboardPage();   break;
      case '/disclosure': html = renderDisclosurePage();  break;
      case '/privacy':    html = renderPrivacyPage();     break;
      default:            html = renderLandingPage();
    }
  }

  app.innerHTML = html;
  initScrollReveal();
  attachAffiliateListeners();
  if (route === '/')          initQuiz();
  if (route === '/products')  initFilters();
  if (route === '/dashboard') initDashboard();

  // Nav theme toggle
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) { btn.removeEventListener('click', toggleTheme); btn.addEventListener('click', toggleTheme); }
  // Hamburger
  const hb = document.getElementById('hamburger-btn');
  if (hb) { hb.removeEventListener('click', toggleMobileMenu); hb.addEventListener('click', toggleMobileMenu); }
}

// --- AFFILIATE LINK SYSTEM ---
function attachAffiliateListeners() {
  const merged = Object.assign({}, window.CUSTOM_AFFILIATE_LINKS || {}, appState.customLinks || {});
  document.querySelectorAll('[data-product-id]').forEach(link => {
    const pid = link.getAttribute('data-product-id');
    if (pid && merged[pid]) link.href = merged[pid];
    if (!link.dataset.listenerAttached) {
      link.dataset.listenerAttached = 'true';
      link.addEventListener('click', () => {
        const name = link.getAttribute('data-product') || pid || 'this product';
        showToast(`Redirecting to EnviroBiotics store for ${name}…`, '🛍️');
      });
    }
  });
}

// ============================================================
//  VIDEO SCRIPT TEMPLATES
// ============================================================
const SCRIPT_TEMPLATES = {
  'biologic-mini': {
    problem: {
      hook: 'Your bedroom air purifier is doing absolutely nothing about the allergens on your mattress.',
      visual: 'Show microscope footage of dust mites, then cut to BioLogic Mini misting on a nightstand.',
      vo: 'You have an air purifier in your bedroom. You vacuum regularly. You wash your sheets. But you\'re still waking up with a stuffy nose and itchy eyes. Here\'s why: 80% of the allergens in your bedroom aren\'t floating in the air — they\'re on your mattress, your pillows, your curtains. Your HEPA filter can\'t reach them. BioLogic Mini by EnviroBiotics does something completely different. It continuously mists billions of beneficial probiotics that settle on every surface, outcompeting dust mite allergens, mold spores, and bacteria — naturally, chemically-free. FDA GRAS certified. EPA Registered. MADE SAFE® verified. Link in bio to try it risk-free for 30 days.',
      tips: ['Film at night with warm lighting for bedroom ambiance', 'Show the mist coming out of the device', 'Use b-roll of someone sleeping peacefully after', 'Add text overlay: "Surface allergens: 80% of the problem"'],
      cta: 'Try it risk-free for 30 days — link in bio.',
    },
    myth: {
      hook: 'Myth: if the air smells clean, your bedroom is safe.',
      visual: 'Show a "clean" bedroom, then a microscope image of a pillow surface.',
      vo: 'I believed this for years. Turns out the surfaces in a "clean" bedroom can have more bacterial contamination than a public restroom. Not because you\'re dirty — because conventional cleaning only treats what you can see. Chemical sprays kill everything, then evaporate in hours. HEPA filters only catch airborne particles. Neither touches the invisible ecosystem living on your mattress, your bedframe, your walls. EnviroBiotics BioLogic Mini uses the same probiotic technology trusted in Grand Hyatt hotels and hospitals worldwide — continuously building a natural microbial shield on every surface. Science-backed. Certified safe. No chemicals needed.',
      tips: ['Open with a visually clean, aesthetic bedroom shot', 'Use "Myth vs. Reality" text overlays', 'Reference the hotel/hospital trust point with logos if possible'],
      cta: 'Link in bio — 30-day money-back guarantee.',
    },
    science: {
      hook: 'Here\'s the science that changed how I think about indoor air quality.',
      visual: 'Animated diagram of competitive exclusion on surfaces.',
      vo: 'The EPA says indoor air is 2 to 5 times more polluted than outdoor air. The reason? We\'ve sealed our homes and killed the natural microbiome that keeps harmful organisms in check. Nature has a solution called competitive exclusion — when beneficial bacteria colonize a surface, harmful pathogens can\'t establish themselves. That\'s exactly what Active Environmental Probiotics® from EnviroBiotics do. BioLogic Mini mists EPA-Registered Bacillus strains continuously — they travel through the air, settle on surfaces, and establish a living shield that maintains itself automatically. Certified by the FDA, EPA, and MADE SAFE®. Used in hospitals, schools, and luxury hotels worldwide.',
      tips: ['Use slow-motion mist footage', 'Show the 4 certification badges on screen', 'Reference "used in 20+ countries" for global credibility'],
      cta: 'See the full science at envirobiotics.com — link in bio.',
    },
  },
  'biotica-800': {
    problem: {
      hook: 'You spend 90% of your life indoors. Is your home\'s indoor ecosystem actually healthy?',
      visual: 'Wide shot of a living room, then zoom to surfaces with microscope b-roll.',
      vo: 'The average family home has more bacterial species than a typical forest — but unlike the forest, our homes favor the harmful ones. Mold spores, pet dander, dust mite waste, and airborne bacteria accumulate on every surface faster than we can clean them. And the products we use to fight them — bleach, sprays, antibacterials — actually make the problem worse by eliminating the beneficial bacteria that would naturally keep pathogens in check. Biotica 800 by EnviroBiotics covers up to 800 square feet continuously with Active Environmental Probiotics® — the same technology trusted in hospitals, schools, and Shangri-La Hotels. One device. No chemicals. 24/7 protection.',
      tips: ['Open with sweeping home footage for aspirational feel', 'Cut between pristine and microscope views for contrast', 'End with the device on a shelf, light mist visible'],
      cta: 'Try risk-free for 30 days — link in bio.',
    },
    myth: {
      hook: 'Chemical disinfectants are making your home less safe. Here\'s the data.',
      visual: 'Show chemical spray bottles, then cut to Biotica 800.',
      vo: 'Chemical disinfectants kill 99.9% of bacteria. Sounds great. But here\'s the problem: they also kill the beneficial bacteria that keep harmful ones from coming back. The result? A microbial vacuum that harmful, antibiotic-resistant strains are perfectly evolved to colonize. The WHO has identified antimicrobial resistance as one of the top 10 threats to global health — and our obsession with chemical cleaning is a major driver. Biotica 800 takes a completely different approach. Instead of destroying your home\'s microbiome, it rebuilds it — with beneficial probiotic strains that outcompete harmful organisms naturally and permanently. No resistance. No toxic residue. No VOCs.',
      tips: ['Show VOC safety data visually', 'Use "Old approach vs New approach" framing', 'Keep tone educational, not fear-based'],
      cta: '30-day risk-free trial — link in bio.',
    },
    science: {
      hook: 'The same probiotic system used in Grand Hyatt, Brooklyn Nets, and Shangri-La — now for your home.',
      visual: 'Show hotel and hospital environments, then home environment.',
      vo: 'EnviroBiotics has been protecting people in over 20 countries for years — hospitals, airports, schools, luxury hotels. The Biotica 800 brings that exact institutional-grade technology to your home. Active Environmental Probiotics® are collected from pristine natural environments, screened through hundreds of safety and efficacy tests, EPA Registered and FDA GRAS certified. They disperse continuously through your space, settling on every surface and object, creating a self-sustaining microbial ecosystem that keeps mold, allergens, and bacteria in check — permanently, naturally, without any effort from you.',
      tips: ['Lead with social proof (hospitals, Grand Hyatt)', 'Show the certification badges clearly', 'Emphasize "same technology, now for homes"'],
      cta: 'Link in bio. 30-day money-back guarantee.',
    },
  },
  'ebiotic-home': {
    problem: {
      hook: 'Your HVAC system is spreading mold spores to every room in your house right now.',
      visual: 'Show HVAC vent with dust, then home interior.',
      vo: 'Most homeowners never think about what\'s inside their HVAC ducts. Spoiler: it\'s a breeding ground for mold, dust mite allergens, bacteria, and fungal spores — being circulated to every room in your home every time your system runs. Standard HVAC filters catch large particles but miss the microbial contamination that triggers asthma, allergies, and chronic respiratory issues. E Biotic by EnviroBiotics integrates directly with your HVAC system to disperse Active Environmental Probiotics® through every duct and room simultaneously — building a natural microbial shield from basement to attic, 24 hours a day. No chemicals. No filter maintenance. Just balance.',
      tips: ['Open with a dramatic duct interior shot', 'Use a household map animation showing the HVAC distribution', 'Show the E Biotic device being installed professionally'],
      cta: 'Learn more at envirobiotics.com/hvac — link in bio.',
    },
    myth: {
      hook: 'Your HVAC filter is protecting you. That\'s what they want you to believe.',
      visual: 'Show a dirty HVAC filter, then a pristine-looking home.',
      vo: 'Standard HVAC filters — even MERV-13 — are designed to protect the equipment, not your health. They catch dust and lint, but microbial contaminants — mold spores, bacteria, dust mite allergens — are measured in microns and pass right through. Every time your system turns on, it distributes these contaminants to every room. E Biotic changes the equation entirely. It uses your existing HVAC infrastructure not to spread contaminants, but to spread beneficial environmental probiotics — turning your entire duct system into a whole-home probiotic delivery system. FDA GRAS. EPA Registered. MADE SAFE®.',
      tips: ['Show a filter before/after for visual impact', 'Use the "turning the problem into the solution" narrative', 'Keep it accessible — explain microns briefly'],
      cta: 'Whole-home protection starts at envirobiotics.com — link in bio.',
    },
    science: {
      hook: 'A 3-step system that balances your entire home\'s microbiome. Select. Disperse. Restore.',
      visual: 'Animated 3-step infographic of the EnviroBiotics process.',
      vo: 'EnviroBiotics technology works in three steps. Step one: select. Beneficial Bacillus strains are collected from nature, screened for safety and efficacy, and EPA Registered. Step two: disperse. E Biotic automatically releases precise amounts of probiotic solution through your HVAC system at set intervals — reaching every room, every surface, every hidden corner. Step three: restore. The probiotics establish themselves on surfaces, outcompeting mold, allergens, and harmful bacteria through competitive exclusion. The result: a self-sustaining indoor ecosystem that maintains itself continuously — without chemicals, without effort, without compromise.',
      tips: ['Use animated infographic for the 3 steps', 'Show before/after air quality data if available', 'End with a "what life looks like after" aspirational close'],
      cta: 'Book a consultation at envirobiotics.com — link in bio.',
    },
  },
  'refill-cartridges': {
    problem: {
      hook: 'Your EnviroBiotics device is only as good as its last refill.',
      visual: 'Show a device running out of cartridge, then a fresh one being installed.',
      vo: 'Environmental probiotics need fresh, active cultures to maintain their protective effect. After 30 to 60 days, the probiotic concentration in your cartridge drops below the threshold needed for competitive exclusion — meaning harmful microorganisms can start to re-establish themselves. That\'s why EnviroBiotics\' Subscribe & Save program is the most important part of your indoor microbiome strategy. Fresh cartridges every month, delivered automatically, at a discount — keeping your home\'s probiotic shield at full strength year-round. And as an affiliate, every subscriber earns you recurring monthly commission.',
      tips: ['Show a low-cartridge warning light or indicator', 'Emphasize the "set and forget" convenience of Subscribe & Save', 'Mention the affiliate recurring commission angle subtly'],
      cta: 'Subscribe & Save — link in bio.',
    },
    myth: {
      hook: 'Once you buy an air purifier, you\'re done. Right?',
      visual: 'Show other brand filter replacement costs vs EnviroBiotics cartridge.',
      vo: 'Most air purifier brands need filter replacements every 6–12 months — and those filters can cost $50 to $200 each. But HEPA filters just trap particles. They don\'t actually improve your indoor microbiome. EnviroBiotics refill cartridges are different. Each one contains billions of EPA-Registered beneficial Bacillus spores — living organisms that actively outcompete harmful bacteria, mold, and allergens. And at $29 per month on Subscribe & Save, they cost less than a daily coffee habit. The best part? They ship automatically, so you\'ll never have a gap in protection.',
      tips: ['Compare cost per month visually', 'Emphasize the "living organisms" vs "passive filter" distinction', 'Show the Subscribe & Save interface'],
      cta: 'Subscribe & Save from $29/month — link in bio.',
    },
    science: {
      hook: 'Why Bacillus spore technology keeps working long after chemical cleaners fail.',
      visual: 'Microscope footage of Bacillus spores activating on a surface.',
      vo: 'Bacillus spores are one of nature\'s most resilient survival mechanisms. In their dormant form, they can survive extreme temperatures, drought, and UV exposure. When released into your indoor environment by an EnviroBiotics cartridge, they activate on contact with moisture and nutrients — germinating into full-grown probiotic bacteria that immediately begin competing with harmful microorganisms for resources and attachment sites. Each cartridge delivers 10⁹ CFU per milliliter — that\'s one billion colony-forming units — ensuring continuous competitive exclusion across all treated surfaces. No refrigeration required. No special handling. Just consistent, science-backed protection.',
      tips: ['Use actual Bacillus microscope footage (available at envirobiotics.com/research)', 'Explain CFU in relatable terms ("billion protective bacteria per dose")', 'End with the Subscribe & Save value proposition'],
      cta: 'Subscribe for continuous protection — link in bio.',
    },
  },
};

// ============================================================
//  LANDING PAGE
// ============================================================
function renderLandingPage() {
  const certBadges = `
    <div class="cert-strip">
      <span class="cert-badge">✅ FDA GRAS</span>
      <span class="cert-badge">🛡️ EPA Registered</span>
      <span class="cert-badge">🌿 MADE SAFE®</span>
      <span class="cert-badge">🏆 ISO Certified</span>
    </div>
  `;

  const featuredProducts = PRODUCTS.slice(0, 3).map(p => `
    <article class="card reveal" onclick="navigate('/products')" style="cursor:pointer">
      <div class="card__img-wrap">
        <img src="${p.image}" alt="${p.name}" class="card__img" loading="lazy" onerror="this.style.display='none'">
        ${p.badge ? `<span class="badge badge--featured">${p.badge}</span>` : ''}
      </div>
      <div class="card__body">
        <span class="badge badge--${CATEGORIES.find(c=>c.id===p.category)?.color || 'green'}">${CATEGORIES.find(c=>c.id===p.category)?.icon || ''} ${CATEGORIES.find(c=>c.id===p.category)?.label || p.category}</span>
        <h3 class="t-h3">${p.name}</h3>
        <p class="card__tagline">${p.tagline}</p>
        <p class="card__text">${p.painPoint.substring(0, 100)}…</p>
        <div class="card__footer">
          <span class="card__price">${p.price}</span>
          <a href="${p.cartUrl}" target="_blank" rel="noopener" class="btn btn--primary btn--sm redirect-affiliate"
             data-product-id="${p.id}" data-product="${p.name}">Buy Now →</a>
        </div>
      </div>
    </article>
  `).join('');

  return `
  <section class="hero">
    <div class="hero__bg"></div>
    <div class="hero__content container reveal">
      <div class="hero__eyebrow">🌿 Environmental Probiotics — FDA GRAS · EPA Registered · MADE SAFE®</div>
      <h1 class="hero__title">Restore the Balance<br><em>of Your Indoor World.</em></h1>
      <p class="hero__subtitle">You spend 90% of your life indoors. EnviroBiotics probiotic air & surface purifiers outcompete mold, allergens, and harmful bacteria — naturally, continuously, without chemicals.</p>
      <div class="hero__actions">
        <a href="https://shop.envirobiotics.com/" target="_blank" rel="noopener" class="btn btn--primary btn--lg">Shop EnviroBiotics →</a>
        <a href="#/products" class="btn btn--outline btn--lg">See All Products</a>
      </div>
      ${certBadges}
    </div>
  </section>

  <section class="trust-bar">
    <div class="container">
      <p class="trust-bar__label">Trusted by leading institutions worldwide</p>
      <div class="trust-logos">
        <span class="trust-logo">🏨 Grand Hyatt</span>
        <span class="trust-logo">🏀 Brooklyn Nets</span>
        <span class="trust-logo">🌴 Shangri-La Hotels</span>
        <span class="trust-logo">✈️ Kempegowda Airport</span>
        <span class="trust-logo">🏥 Care Partners</span>
        <span class="trust-logo">🎓 IMG Academy</span>
      </div>
    </div>
  </section>

  <section class="section" id="quiz-section">
    <div class="container">
      <div class="section__header reveal">
        <h2 class="t-h2">Find Your<br><em>Ideal System</em></h2>
        <p class="t-body-lg">Answer 3 quick questions — we'll match you to the right EnviroBiotics product.</p>
      </div>
      <div id="quiz-container" class="quiz reveal"></div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section__header reveal">
        <h2 class="t-h2">Why EnviroBiotics<br><em>Works Differently</em></h2>
      </div>
      <div class="problem-grid">
        <div class="problem-card reveal">
          <div class="problem-card__icon">💨</div>
          <h3>Air Purifiers</h3>
          <p>Treat only the air they can pull in — leaving the surfaces where 80% of allergens live completely untouched.</p>
          <div class="problem-card__verdict bad">❌ Surface allergens remain</div>
        </div>
        <div class="problem-card reveal">
          <div class="problem-card__icon">🧴</div>
          <h3>Chemical Sprays</h3>
          <p>Kill all bacteria — good and bad — then evaporate in hours, leaving a microbial vacuum that harmful bacteria rush to fill.</p>
          <div class="problem-card__verdict bad">❌ Promotes resistance & regrowth</div>
        </div>
        <div class="problem-card problem-card--featured reveal">
          <div class="problem-card__icon">🌿</div>
          <h3>EnviroBiotics</h3>
          <p>Continuously mists beneficial probiotics that settle on every surface — outcompeting harmful microorganisms naturally, 24/7, automatically.</p>
          <div class="problem-card__verdict good">✅ Whole-ecosystem balance</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section__header reveal">
        <h2 class="t-h2">Featured<br><em>Products</em></h2>
        <p class="t-body-lg">Risk-free for 30 days. If it doesn't transform your indoor environment, return it for a full refund.</p>
      </div>
      <div class="card-grid">
        ${featuredProducts}
      </div>
      <div style="text-align:center;margin-top:2rem">
        <a href="#/products" class="btn btn--outline btn--lg">View All Products →</a>
      </div>
    </div>
  </section>

  <section class="section section--dark">
    <div class="container">
      <div class="cta-banner reveal">
        <div class="cta-banner__text">
          <h2>Ready to Transform<br>Your Indoor Ecosystem?</h2>
          <p>Join thousands of families, professionals, and wellness advocates who've made the switch to environmental probiotics.</p>
        </div>
        <div class="cta-banner__actions">
          <a href="https://shop.envirobiotics.com/" target="_blank" rel="noopener" class="btn btn--primary btn--lg">Shop Now — 30-Day Guarantee</a>
          <a href="#/learn" class="btn btn--outline-white btn--lg">Read the Science</a>
        </div>
      </div>
    </div>
  </section>
  `;
}

// ============================================================
//  QUIZ
// ============================================================
function initQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  const state = appState.quiz;
  if (state.complete) { renderQuizResult(container); return; }
  renderQuizStep(container, state.step);
}

function renderQuizStep(container, step) {
  const q = QUIZ_QUESTIONS[step];
  const total = QUIZ_QUESTIONS.length;
  container.innerHTML = `
    <div class="quiz__card">
      <div class="quiz__progress">
        <div class="quiz__progress-bar" style="width:${((step)/total)*100}%"></div>
      </div>
      <p class="quiz__step-label">Question ${step + 1} of ${total}</p>
      <h3 class="quiz__question">${q.question}</h3>
      <div class="quiz__options">
        ${q.options.map(opt => `
          <button class="quiz__option" onclick="selectQuizOption('${q.id}', '${opt.value}', ${step})">
            ${opt.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function selectQuizOption(questionId, value, step) {
  appState.quiz.answers[questionId] = value;
  if (step < QUIZ_QUESTIONS.length - 1) {
    appState.quiz.step = step + 1;
    const container = document.getElementById('quiz-container');
    renderQuizStep(container, appState.quiz.step);
  } else {
    appState.quiz.complete = true;
    const container = document.getElementById('quiz-container');
    renderQuizResult(container);
  }
}

function renderQuizResult(container) {
  const a = appState.quiz.answers;
  let recommended = 'biologic-mini';
  if (a.space === 'large' || a.space === 'medium') recommended = 'biotica-800';
  if (a.concern === 'mold' && (a.space === 'large' || a.space === 'medium')) recommended = 'ebiotic-home';
  if (a.approach === 'value') recommended = 'refill-cartridges';

  const prod = PRODUCTS.find(p => p.id === recommended) || PRODUCTS[0];
  const secondary = PRODUCTS.filter(p => p.id !== recommended).slice(0, 2);

  container.innerHTML = `
    <div class="quiz__result reveal">
      <div class="quiz__result-badge">🎯 Your Match</div>
      <h3 class="quiz__result-title">${prod.name}</h3>
      <p class="quiz__result-desc">${prod.mechanism}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;margin-top:1.5rem">
        <a href="${prod.shopUrl}" target="_blank" rel="noopener" class="btn btn--primary redirect-affiliate"
           data-product-id="${prod.id}" data-product="${prod.name}">Shop ${prod.name} →</a>
        <button class="btn btn--outline" onclick="resetQuiz()">Retake Quiz</button>
      </div>
      <div style="margin-top:2rem">
        <p style="text-align:center;color:var(--text-muted);font-size:0.9rem;margin-bottom:1rem">Also worth considering:</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
          ${secondary.map(p => `
            <a href="${p.shopUrl}" target="_blank" rel="noopener" class="btn btn--ghost redirect-affiliate"
               data-product-id="${p.id}" data-product="${p.name}">${p.name} — ${p.tagline}</a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function resetQuiz() {
  appState.quiz = { answers: {}, step: 0, complete: false };
  const container = document.getElementById('quiz-container');
  if (container) renderQuizStep(container, 0);
}

// ============================================================
//  PRODUCTS PAGE
// ============================================================
function renderProductsPage() {
  const catTabs = `
    <div class="filter-bar" id="filter-bar">
      <button class="filter-btn active" data-filter="all">All Products</button>
      ${CATEGORIES.map(c => `
        <button class="filter-btn" data-filter="${c.id}">${c.icon} ${c.label}</button>
      `).join('')}
    </div>
  `;

  const productCards = PRODUCTS.map(p => `
    <article class="card reveal" data-category="${p.category}">
      <div class="card__img-wrap">
        <img src="${p.image}" alt="${p.name}" class="card__img" loading="lazy" onerror="this.style.display='none'">
        ${p.badge ? `<span class="badge badge--featured">${p.badge}</span>` : ''}
        <span class="card__coverage">${p.coverage}</span>
      </div>
      <div class="card__body">
        <span class="badge badge--${CATEGORIES.find(c=>c.id===p.category)?.color || 'green'}">${CATEGORIES.find(c=>c.id===p.category)?.icon || ''} ${CATEGORIES.find(c=>c.id===p.category)?.label || p.category}</span>
        <h3 class="t-h3">${p.name}</h3>
        <p class="card__tagline">${p.tagline}</p>
        <div class="card__trust">
          ${'★'.repeat(Math.floor(p.trustScore))} <span>${p.trustScore}/5</span>
        </div>
        <p class="card__text">${p.painPoint.substring(0, 120)}…</p>
        <ul class="card__features">
          ${p.features.slice(0, 3).map(f => `<li>✓ ${f}</li>`).join('')}
        </ul>
        <div class="card__footer">
          <div>
            <span class="card__price">${p.price}</span>
            <span class="card__price-note">${p.priceNote}</span>
          </div>
          <div style="display:flex;gap:0.5rem">
            <button class="btn btn--ghost btn--sm" onclick="openProductModal('${p.id}')">Details</button>
            <a href="${p.cartUrl}" target="_blank" rel="noopener" class="btn btn--primary btn--sm redirect-affiliate"
               data-product-id="${p.id}" data-product="${p.name}">Buy →</a>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  const kitsSection = `
    <section class="section section--alt" id="kits-section">
      <div class="container">
        <div class="section__header">
          <h2 class="t-h2">Starter<br><em>Kit Bundles</em></h2>
          <p class="t-body-lg">Curated combinations for maximum protection and affiliate commission.</p>
        </div>
        <div class="kit-grid">
          ${STARTER_KITS.map(kit => {
            const prods = kit.products.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
            return `
              <div class="kit-card reveal">
                <div class="kit-card__icon">${kit.icon}</div>
                <div class="kit-card__badge">${kit.savings}</div>
                <h3 class="kit-card__name">${kit.name}</h3>
                <p class="kit-card__tagline">${kit.tagline}</p>
                <p class="kit-card__desc">${kit.description}</p>
                <div class="kit-card__products">
                  ${prods.map(p => `<span class="kit-tag">${p.name}</span>`).join('+')}
                </div>
                <a href="https://shop.envirobiotics.com/" target="_blank" rel="noopener" class="btn btn--primary" style="margin-top:1rem;width:100%">
                  Shop This Bundle →
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;

  return `
    <div class="page-header">
      <div class="container">
        <h1 class="page-header__title">EnviroBiotics<br><em>Product Line</em></h1>
        <p class="page-header__subtitle">Four certifications. Three product tiers. One mission: restore the balance of every indoor space.</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        ${catTabs}
        <div class="card-grid" id="product-grid">
          ${productCards}
        </div>
      </div>
    </section>
    ${kitsSection}
    <div id="product-modal" class="modal" role="dialog" aria-modal="true" aria-label="Product Details"></div>
  `;
}

function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#product-grid .card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

// ============================================================
//  PRODUCT MODAL
// ============================================================
function openProductModal(productId) {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;
  const scripts = SCRIPT_TEMPLATES[p.id] || {};
  const angles = ['problem', 'myth', 'science'];

  modal.innerHTML = `
    <div class="modal__overlay" onclick="closeProductModal()"></div>
    <div class="modal__box">
      <button class="modal__close" onclick="closeProductModal()" aria-label="Close">✕</button>
      <div class="modal__header">
        <h2>${p.name}</h2>
        <p>${p.tagline}</p>
      </div>
      <div class="modal__tabs" role="tablist">
        <button class="modal__tab active" onclick="switchModalTab(this,'overview')" role="tab">Overview</button>
        <button class="modal__tab" onclick="switchModalTab(this,'science')" role="tab">Science</button>
        <button class="modal__tab" onclick="switchModalTab(this,'scripts')" role="tab">Video Scripts</button>
      </div>

      <div class="modal__tab-content" id="tab-overview">
        <div class="modal__section">
          <h3>Pain Point Addressed</h3>
          <p>${p.painPoint}</p>
        </div>
        <div class="modal__section">
          <h3>Why Conventional Solutions Fail</h3>
          <p>${p.commonFail}</p>
        </div>
        <div class="modal__section">
          <h3>How ${p.name} Works</h3>
          <p>${p.mechanism}</p>
        </div>
        <div class="modal__section">
          <h3>Key Features</h3>
          <ul>${p.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
        </div>
        <div class="modal__section">
          <h3>Certifications</h3>
          <div class="cert-strip">${p.certifications.map(c => `<span class="cert-badge">${c}</span>`).join('')}</div>
        </div>
      </div>

      <div class="modal__tab-content hidden" id="tab-science">
        <div class="modal__section">
          <h3>Scientific Backing</h3>
          <p>${p.scienceBacking}</p>
        </div>
        <div class="modal__section">
          <h3>Content Angles</h3>
          <div class="angle-cards">
            ${Object.entries(p.contentAngles).map(([angle, text]) => `
              <div class="angle-card">
                <span class="angle-card__label">${angle.charAt(0).toUpperCase() + angle.slice(1)}</span>
                <p>${text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="modal__tab-content hidden" id="tab-scripts">
        <div class="script-tabs">
          ${angles.map((a, i) => `
            <button class="script-tab ${i===0?'active':''}" onclick="switchScriptTab(this,'script-${a}')">${a.charAt(0).toUpperCase()+a.slice(1)}-Based</button>
          `).join('')}
        </div>
        ${angles.map((a, i) => {
          const s = scripts[a] || {};
          const fullScript = `HOOK:\n${s.hook||''}\n\nVISUAL DIRECTION:\n${s.visual||''}\n\nVOICEOVER:\n${s.vo||''}\n\nFILMING TIPS:\n${(s.tips||[]).map((t,i)=>`${i+1}. ${t}`).join('\n')}\n\nCTA:\n${s.cta||''}`;
          return `
            <div class="script-panel ${i===0?'':'hidden'}" id="script-${a}">
              <div class="script-meta">
                <span>📌 Hook: ${s.hook || 'N/A'}</span>
              </div>
              <div class="script-block">
                <label>Visual Direction</label>
                <p>${s.visual || 'N/A'}</p>
              </div>
              <div class="script-block">
                <label>Voiceover Script</label>
                <p>${s.vo || 'N/A'}</p>
              </div>
              <div class="script-block">
                <label>Filming Tips</label>
                <ul>${(s.tips||[]).map(t=>`<li>${t}</li>`).join('')}</ul>
              </div>
              <div class="script-block">
                <label>CTA</label>
                <p>${s.cta || 'N/A'}</p>
              </div>
              <div class="script-actions">
                <button class="btn btn--ghost btn--sm" onclick="copyScript(\`${fullScript.replace(/`/g,'\\`')}\`)">📋 Copy Full Script</button>
                <span class="script-words" style="font-size:0.8rem;color:var(--text-muted)">~${Math.round((s.vo||'').split(' ').length / 130 * 60)}s speaking time</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="modal__footer">
        <a href="${p.shopUrl}" target="_blank" rel="noopener" class="btn btn--primary redirect-affiliate"
           data-product-id="${p.id}" data-product="${p.name}">View on EnviroBiotics Store →</a>
        <button class="btn btn--outline" onclick="closeProductModal()">Close</button>
      </div>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  attachAffiliateListeners();
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

function switchModalTab(btn, tabId) {
  document.querySelectorAll('.modal__tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.modal__tab-content').forEach(c => c.classList.add('hidden'));
  btn.classList.add('active');
  const tab = document.getElementById(`tab-${tabId}`);
  if (tab) tab.classList.remove('hidden');
}

function switchScriptTab(btn, panelId) {
  document.querySelectorAll('.script-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.script-panel').forEach(p => p.classList.add('hidden'));
  btn.classList.add('active');
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.remove('hidden');
}

function copyScript(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Script copied to clipboard!', '📋'));
}

// ============================================================
//  LEARN PAGE
// ============================================================
function renderLearnPage() {
  const categories = [...new Set(ARTICLES.map(a => a.category))];
  return `
    <div class="page-header">
      <div class="container">
        <h1 class="page-header__title">Knowledge<br><em>Library</em></h1>
        <p class="page-header__subtitle">Science-backed resources for EnviroBiotics affiliates and health-conscious audiences.</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        ${categories.map(cat => `
          <div class="article-category reveal">
            <h2 class="t-h3">${cat}</h2>
            <div class="article-grid">
              ${ARTICLES.filter(a => a.category === cat).map(a => `
                <a href="#/article/${a.id}" class="article-card reveal">
                  <div class="article-card__icon">${a.icon}</div>
                  <div class="article-card__body">
                    <h3 class="article-card__title">${a.title}</h3>
                    <p class="article-card__excerpt">${a.excerpt}</p>
                    <div class="article-card__meta">
                      <span class="badge badge--green">${a.category}</span>
                      <span>⏱ ${a.readTime}</span>
                    </div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// ============================================================
//  ARTICLE PAGE
// ============================================================
function renderArticle(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return `<div class="container" style="padding:4rem 1rem;text-align:center"><h2>Article not found</h2><a href="#/learn" class="btn btn--primary">Back to Library</a></div>`;
  const content = ARTICLE_CONTENT[id] || `<p>${article.excerpt}</p><p>Full article content coming soon.</p>`;
  return `
    <div class="article-page">
      <div class="article-page__header">
        <div class="container" style="max-width:780px">
          <a href="#/learn" class="back-link">← Back to Library</a>
          <div class="article-page__meta">
            <span class="badge badge--green">${article.category}</span>
            <span>⏱ ${article.readTime}</span>
          </div>
          <h1 class="article-page__title">${article.icon} ${article.title}</h1>
          <p class="article-page__excerpt">${article.excerpt}</p>
        </div>
      </div>
      <div class="article-page__body container" style="max-width:780px">
        ${content}
        <div class="article-cta">
          <h3>Ready to Make Your Indoor Space Healthier?</h3>
          <p>Explore EnviroBiotics products — the science-backed, chemical-free solution trusted worldwide.</p>
          <div style="display:flex;gap:1rem;flex-wrap:wrap">
            <a href="https://shop.envirobiotics.com/" target="_blank" rel="noopener" class="btn btn--primary">Shop EnviroBiotics →</a>
            <a href="#/learn" class="btn btn--outline">More Articles</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
//  FOUNDER DASHBOARD
// ============================================================
function renderDashboardPage() {
  return `
    <div class="page-header">
      <div class="container">
        <h1 class="page-header__title">Founder<br><em>Hub</em></h1>
        <p class="page-header__subtitle">Your EnviroBiotics affiliate command center — campaigns, scripts, scoring, and analytics.</p>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="dashboard-tabs" role="tablist">
          <button class="dash-tab active" data-tab="kpi" role="tab">📊 KPIs</button>
          <button class="dash-tab" data-tab="onboarding" role="tab">🗺️ Onboarding</button>
          <button class="dash-tab" data-tab="scorer" role="tab">🧬 Product Scorer</button>
          <button class="dash-tab" data-tab="scripts" role="tab">🎬 Script Hub</button>
          <button class="dash-tab" data-tab="links" role="tab">🔗 Links</button>
          <button class="dash-tab" data-tab="review" role="tab">📝 Weekly Review</button>
          <button class="dash-tab" data-tab="science" role="tab">🔬 Science Lookup</button>
        </div>
        <div id="dashboard-content" class="dashboard-content">
          ${renderKpiTab()}
        </div>
      </div>
    </section>
  `;
}

function initDashboard() {
  document.querySelectorAll('.dash-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.dashboardTab = btn.dataset.tab;
      const content = document.getElementById('dashboard-content');
      switch (btn.dataset.tab) {
        case 'kpi': content.innerHTML = renderKpiTab(); initCampaignLogListeners(); break;
        case 'onboarding': content.innerHTML = renderOnboardingTab(); initOnboarding(); break;
        case 'scorer': content.innerHTML = renderScorerTab(); initScorer(); break;
        case 'scripts': content.innerHTML = renderScriptHubTab(); initScriptHub(); break;
        case 'links': content.innerHTML = renderLinksTab(); initLinks(); break;
        case 'review': content.innerHTML = renderReviewTab(); initReview(); break;
        case 'science': content.innerHTML = renderScienceTab(); initScience(); break;
      }
    });
  });
  initCampaignLogListeners();
}

// --- KPI TAB ---
function renderKpiTab() {
  const camps = appState.campaigns;
  const totalViews = camps.reduce((s, c) => s + (c.views||0), 0);
  const totalClicks = camps.reduce((s, c) => s + (c.clicks||0), 0);
  const totalOrders = camps.reduce((s, c) => s + (c.orders||0), 0);
  const totalRevenue = camps.reduce((s, c) => s + (c.revenue||0), 0);
  const avgCTR = totalViews ? ((totalClicks/totalViews)*100).toFixed(2) : '0.00';
  const avgCR = totalClicks ? ((totalOrders/totalClicks)*100).toFixed(2) : '0.00';

  const statCards = [
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: '👁️', color: 'blue' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: '🖱️', color: 'green' },
    { label: 'Total Orders', value: totalOrders, icon: '🛍️', color: 'emerald' },
    { label: 'Est. Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: '💰', color: 'gold' },
    { label: 'Avg CTR', value: `${avgCTR}%`, icon: '📈', color: avgCTR >= 2 ? 'green' : 'orange', note: 'Target: ≥2%' },
    { label: 'Avg CR', value: `${avgCR}%`, icon: '🎯', color: avgCR >= 1.5 ? 'green' : 'orange', note: 'Target: ≥1.5%' },
  ].map(s => `
    <div class="stat-card">
      <div class="stat-card__icon">${s.icon}</div>
      <div class="stat-card__label">${s.label}</div>
      <div class="stat-card__value">${s.value}</div>
      ${s.note ? `<div class="stat-card__note">${s.note}</div>` : ''}
    </div>
  `).join('');

  const campaignRows = camps.map((c, i) => `
    <tr>
      <td>${c.date}</td>
      <td>${c.platform}</td>
      <td style="max-width:200px;font-size:0.85rem">${c.title}</td>
      <td>${c.product}</td>
      <td>${(c.views||0).toLocaleString()}</td>
      <td>${(c.clicks||0).toLocaleString()}</td>
      <td>${(c.orders||0)}</td>
      <td>$${(c.revenue||0).toLocaleString()}</td>
      <td><button class="btn btn--ghost btn--xs" onclick="deleteCampaign(${i})">✕</button></td>
    </tr>
  `).join('');

  return `
    <div class="kpi-grid">${statCards}</div>
    <div class="chart-section">
      <h3>Views Trend</h3>
      ${renderViewsChart(camps)}
    </div>
    <div class="campaign-log">
      <div class="campaign-log__header">
        <h3>Campaign Log</h3>
        <div style="display:flex;gap:0.5rem">
          <button class="btn btn--outline btn--sm" onclick="exportCampaignCSV()">⬇ Export CSV</button>
          <label class="btn btn--outline btn--sm" style="cursor:pointer">
            ⬆ Import CSV
            <input type="file" accept=".csv" style="display:none" onchange="importCampaignCSV(this)">
          </label>
          <button class="btn btn--primary btn--sm" onclick="showAddCampaignForm()">+ Add Campaign</button>
        </div>
      </div>
      <div id="add-campaign-form" style="display:none" class="add-form">
        ${renderAddCampaignForm()}
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Date</th><th>Platform</th><th>Title</th><th>Product</th><th>Views</th><th>Clicks</th><th>Orders</th><th>Revenue</th><th></th></tr></thead>
          <tbody id="campaign-tbody">${campaignRows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAddCampaignForm() {
  return `
    <div class="form-grid">
      <div class="form-group"><label>Date</label><input type="date" id="cf-date" value="${new Date().toISOString().slice(0,10)}" class="form-input"></div>
      <div class="form-group"><label>Platform</label>
        <select id="cf-platform" class="form-input">
          <option>TikTok</option><option>Instagram Reels</option><option>YouTube Shorts</option><option>YouTube</option><option>Pinterest</option><option>Facebook</option>
        </select>
      </div>
      <div class="form-group" style="grid-column:span 2"><label>Content Title</label><input type="text" id="cf-title" placeholder="e.g. Your HEPA filter doesn't clean surfaces" class="form-input"></div>
      <div class="form-group"><label>Hook Angle</label>
        <select id="cf-hook" class="form-input">
          <option value="problem">Problem-Based</option><option value="myth">Myth-Busting</option><option value="science">Science-Backed</option>
        </select>
      </div>
      <div class="form-group"><label>Product Promoted</label>
        <select id="cf-product" class="form-input">
          ${PRODUCTS.map(p => `<option>${p.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Views</label><input type="number" id="cf-views" placeholder="0" class="form-input"></div>
      <div class="form-group"><label>Clicks</label><input type="number" id="cf-clicks" placeholder="0" class="form-input"></div>
      <div class="form-group"><label>Orders</label><input type="number" id="cf-orders" placeholder="0" class="form-input"></div>
      <div class="form-group"><label>Revenue ($)</label><input type="number" id="cf-revenue" placeholder="0" class="form-input"></div>
      <div class="form-group" style="grid-column:span 2"><label>Lesson Learned</label><input type="text" id="cf-lesson" placeholder="What worked or didn't" class="form-input"></div>
      <div class="form-group" style="grid-column:span 2"><label>Next Action</label><input type="text" id="cf-next" placeholder="What to test next" class="form-input"></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn btn--primary" onclick="saveCampaign()">Save Campaign</button>
      <button class="btn btn--ghost" onclick="hideAddCampaignForm()">Cancel</button>
    </div>
  `;
}

function showAddCampaignForm() { document.getElementById('add-campaign-form').style.display = 'block'; }
function hideAddCampaignForm() { document.getElementById('add-campaign-form').style.display = 'none'; }

function saveCampaign() {
  const get = id => document.getElementById(id)?.value || '';
  const campaign = {
    date: get('cf-date'), platform: get('cf-platform'), title: get('cf-title'),
    hook: get('cf-hook'), product: get('cf-product'),
    views: parseInt(get('cf-views'))||0, likes: 0, saves: 0, comments: 0,
    clicks: parseInt(get('cf-clicks'))||0, orders: parseInt(get('cf-orders'))||0,
    revenue: parseFloat(get('cf-revenue'))||0,
    lesson: get('cf-lesson'), next: get('cf-next'), category: 'general',
  };
  appState.campaigns.push(campaign);
  localStorage.setItem('campaigns', JSON.stringify(appState.campaigns));
  showToast('Campaign saved!', '✅');
  const content = document.getElementById('dashboard-content');
  if (content) content.innerHTML = renderKpiTab();
  initCampaignLogListeners();
}

function deleteCampaign(i) {
  appState.campaigns.splice(i, 1);
  localStorage.setItem('campaigns', JSON.stringify(appState.campaigns));
  const content = document.getElementById('dashboard-content');
  if (content) content.innerHTML = renderKpiTab();
  initCampaignLogListeners();
}

function initCampaignLogListeners() {}

function exportCampaignCSV() {
  const headers = ['Date','Platform','Title','Hook','Product','Views','Clicks','Orders','Revenue','Lesson','Next Action'];
  const rows = appState.campaigns.map(c => [c.date,c.platform,`"${c.title}"`,c.hook,c.product,c.views,c.clicks,c.orders,c.revenue,`"${c.lesson||''}"`,`"${c.next||''}"`].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'campaigns.csv'; a.click();
  showToast('CSV exported!', '⬇');
}

function importCampaignCSV(input) {
  const file = input.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const lines = e.target.result.split('\n').slice(1).filter(l => l.trim());
    lines.forEach(line => {
      const [date,platform,title,hook,product,views,clicks,orders,revenue,lesson,next] = line.split(',');
      appState.campaigns.push({ date:date?.trim(), platform:platform?.trim(), title:(title||'').replace(/"/g,'').trim(),
        hook:hook?.trim(), product:product?.trim(), views:parseInt(views)||0, clicks:parseInt(clicks)||0,
        orders:parseInt(orders)||0, revenue:parseFloat(revenue)||0, lesson:(lesson||'').replace(/"/g,'').trim(),
        next:(next||'').replace(/"/g,'').trim(), likes:0, saves:0, comments:0, category:'general' });
    });
    localStorage.setItem('campaigns', JSON.stringify(appState.campaigns));
    showToast(`${lines.length} campaigns imported!`, '⬆');
    const content = document.getElementById('dashboard-content');
    if (content) content.innerHTML = renderKpiTab();
    initCampaignLogListeners();
  };
  reader.readAsText(file);
}

function renderViewsChart(camps) {
  if (!camps.length) return '<p style="color:var(--text-muted);text-align:center;padding:2rem">No data yet. Add your first campaign.</p>';
  const maxV = Math.max(...camps.map(c => c.views));
  const w = 600, h = 120, pad = 30;
  const pts = camps.map((c, i) => {
    const x = pad + (i / Math.max(camps.length - 1, 1)) * (w - pad * 2);
    const y = h - pad - ((c.views / maxV) * (h - pad * 2));
    return `${x},${y}`;
  }).join(' ');
  return `<div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" style="width:100%;max-height:120px">
    <polyline fill="none" stroke="var(--primary)" stroke-width="2" points="${pts}"/>
    ${camps.map((c, i) => {
      const x = pad + (i / Math.max(camps.length - 1, 1)) * (w - pad * 2);
      const y = h - pad - ((c.views / maxV) * (h - pad * 2));
      return `<circle cx="${x}" cy="${y}" r="4" fill="var(--primary)"/><text x="${x}" y="${h-2}" text-anchor="middle" font-size="9" fill="var(--text-muted)">${c.platform?.slice(0,4)||''}</text>`;
    }).join('')}
  </svg></div>`;
}

// --- ONBOARDING TAB ---
function renderOnboardingTab() {
  const days = [...new Set(appState.checklistItems.map(i => i.day))].sort((a,b) => a-b);
  const done = appState.checklistItems.filter(i => i.done).length;
  const total = appState.checklistItems.length;
  return `
    <div class="onboarding-header">
      <h3>7-Day EnviroBiotics Affiliate Onboarding</h3>
      <div class="progress-wrap">
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${(done/total)*100}%"></div></div>
        <span>${done}/${total} steps complete</span>
      </div>
    </div>
    <div class="roadmap">
      ${days.map(day => {
        const items = appState.checklistItems.filter(i => i.day === day);
        const dayDone = items.every(i => i.done);
        return `
          <div class="roadmap__day ${dayDone ? 'roadmap__day--done' : ''}">
            <div class="roadmap__day-label">Day ${day} ${dayDone ? '✅' : ''}</div>
            <div class="roadmap__items">
              ${items.map(item => `
                <div class="checklist-item ${item.done ? 'done' : ''}">
                  <input type="checkbox" id="cb-${item.id}" ${item.done ? 'checked' : ''} onchange="toggleOnboarding('${item.id}', this.checked)">
                  <label for="cb-${item.id}">
                    <strong>${item.text}</strong>
                    <span class="checklist-detail">${item.detail}</span>
                  </label>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div style="margin-top:1.5rem;display:flex;gap:1rem">
      <button class="btn btn--ghost btn--sm" onclick="resetOnboarding()">Reset Progress</button>
    </div>
  `;
}

function initOnboarding() {}

function toggleOnboarding(id, checked) {
  const item = appState.checklistItems.find(i => i.id === id);
  if (item) { item.done = checked; localStorage.setItem('onboarding', JSON.stringify(appState.checklistItems)); }
  const progress = document.querySelector('.progress-bar-fill');
  const done = appState.checklistItems.filter(i => i.done).length;
  const total = appState.checklistItems.length;
  if (progress) progress.style.width = `${(done/total)*100}%`;
  document.querySelector('.progress-wrap span').textContent = `${done}/${total} steps complete`;
}

function resetOnboarding() {
  appState.checklistItems.forEach(i => i.done = false);
  localStorage.setItem('onboarding', JSON.stringify(appState.checklistItems));
  const content = document.getElementById('dashboard-content');
  if (content) content.innerHTML = renderOnboardingTab();
}

// --- PRODUCT SCORER TAB ---
function renderScorerTab() {
  const criteria = [
    { id: 'pain', label: 'Pain Intensity', desc: 'How acute and universal is the problem this product solves?' },
    { id: 'content', label: 'Content Potential', desc: 'How visually demonstrable and viral-ready is this product?' },
    { id: 'science', label: 'Scientific Credibility', desc: 'Is there peer-reviewed evidence or official certification backing?' },
    { id: 'market', label: 'Market Availability', desc: 'How easy is it for global audiences to purchase?' },
    { id: 'commission', label: 'Commission Potential', desc: 'Expected affiliate commission rate × average order value?' },
    { id: 'differentiation', label: 'Differentiation', desc: 'How unique is this compared to easily available alternatives?' },
    { id: 'repeat', label: 'Repeat Purchase', desc: 'Does the customer need to buy again (cartridges, subscriptions)?' },
  ];
  return `
    <div class="scorer-section">
      <h3>Product Evaluation Scorer</h3>
      <p style="color:var(--text-muted);margin-bottom:1.5rem">Rate each criterion 1–5 to evaluate any affiliate product. Score 29–35 = Priority promotion candidate.</p>
      <div class="form-group" style="margin-bottom:1.5rem">
        <label>Product Name</label>
        <input type="text" id="scorer-name" placeholder="e.g. BioLogic Mini" class="form-input">
      </div>
      <div class="scorer-criteria">
        ${criteria.map(c => `
          <div class="scorer-item">
            <div class="scorer-item__header">
              <label>${c.label}</label>
              <span class="scorer-score" id="score-display-${c.id}">3</span>
            </div>
            <p class="scorer-desc">${c.desc}</p>
            <input type="range" min="1" max="5" value="3" class="scorer-slider" id="slider-${c.id}"
              oninput="document.getElementById('score-display-${c.id}').textContent=this.value; updateScorerTotal()">
          </div>
        `).join('')}
      </div>
      <div class="scorer-total">
        <span>Total Score: <strong id="scorer-total">21</strong> / 35</span>
        <span id="scorer-verdict" class="scorer-verdict">Good Candidate</span>
      </div>
      <div style="display:flex;gap:0.75rem;margin-top:1rem">
        <button class="btn btn--primary" onclick="saveProductScore()">Save Score</button>
        <button class="btn btn--ghost" onclick="loadEnviroScore()">Load BioLogic Mini Example</button>
      </div>
      <div id="saved-scores" class="saved-scores" style="margin-top:2rem">
        ${renderSavedScores()}
      </div>
    </div>
  `;
}

function initScorer() { updateScorerTotal(); }

function updateScorerTotal() {
  const ids = ['pain','content','science','market','commission','differentiation','repeat'];
  const total = ids.reduce((s, id) => s + parseInt(document.getElementById(`slider-${id}`)?.value || 3), 0);
  const el = document.getElementById('scorer-total');
  const verdict = document.getElementById('scorer-verdict');
  if (el) el.textContent = total;
  if (verdict) {
    if (total >= 29) { verdict.textContent = '🔥 Priority'; verdict.className = 'scorer-verdict good'; }
    else if (total >= 22) { verdict.textContent = '✅ Good Candidate'; verdict.className = 'scorer-verdict ok'; }
    else if (total >= 15) { verdict.textContent = '⚠️ Low Priority'; verdict.className = 'scorer-verdict warn'; }
    else { verdict.textContent = '❌ Skip'; verdict.className = 'scorer-verdict bad'; }
  }
}

function saveProductScore() {
  const name = document.getElementById('scorer-name')?.value || 'Unknown Product';
  const ids = ['pain','content','science','market','commission','differentiation','repeat'];
  const scores = {};
  ids.forEach(id => { scores[id] = parseInt(document.getElementById(`slider-${id}`)?.value || 3); });
  const total = Object.values(scores).reduce((a,b) => a+b, 0);
  appState.savedScores[name] = { scores, total, date: new Date().toLocaleDateString() };
  showToast(`Score for "${name}" saved!`, '🧬');
  document.getElementById('saved-scores').innerHTML = renderSavedScores();
}

function renderSavedScores() {
  const saved = Object.entries(appState.savedScores);
  if (!saved.length) return '<p style="color:var(--text-muted);text-align:center">No scores saved yet.</p>';
  return `<h4 style="margin-bottom:0.75rem">Saved Scores</h4>` + saved.map(([name, data]) => `
    <div class="saved-score-item">
      <strong>${name}</strong>
      <span class="badge ${data.total >= 29 ? 'badge--green' : data.total >= 22 ? 'badge--blue' : 'badge--orange'}">${data.total}/35</span>
      <span style="color:var(--text-muted);font-size:0.8rem">${data.date}</span>
    </div>
  `).join('');
}

function loadEnviroScore() {
  const example = { pain: 5, content: 5, science: 5, market: 4, commission: 4, differentiation: 5, repeat: 5 };
  Object.entries(example).forEach(([id, val]) => {
    const slider = document.getElementById(`slider-${id}`);
    const display = document.getElementById(`score-display-${id}`);
    if (slider) slider.value = val;
    if (display) display.textContent = val;
  });
  const nameInput = document.getElementById('scorer-name');
  if (nameInput) nameInput.value = 'BioLogic Mini';
  updateScorerTotal();
}

// --- SCRIPT HUB TAB ---
function renderScriptHubTab() {
  return `
    <div class="script-hub">
      <h3>Video Script Generator</h3>
      <p style="color:var(--text-muted);margin-bottom:1.5rem">Generate and customize content scripts for TikTok, Instagram Reels, and YouTube Shorts.</p>
      <div class="form-grid">
        <div class="form-group">
          <label>Select Product</label>
          <select id="sh-product" class="form-input" onchange="loadScript()">
            ${PRODUCTS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Hook Angle</label>
          <select id="sh-angle" class="form-input" onchange="loadScript()">
            <option value="problem">Problem-Based</option>
            <option value="myth">Myth-Busting</option>
            <option value="science">Science-Backed</option>
          </select>
        </div>
      </div>
      <div id="script-preview" class="script-preview-box"></div>
      <div id="script-editor-area" style="margin-top:1rem"></div>
    </div>
  `;
}

function initScriptHub() { loadScript(); }

function loadScript() {
  const pid = document.getElementById('sh-product')?.value;
  const angle = document.getElementById('sh-angle')?.value;
  const s = SCRIPT_TEMPLATES[pid]?.[angle];
  const preview = document.getElementById('script-preview');
  const editorArea = document.getElementById('script-editor-area');
  if (!s || !preview) return;
  const wordCount = s.vo ? s.vo.split(' ').length : 0;
  const speakSecs = Math.round(wordCount / 130 * 60);
  preview.innerHTML = `
    <div class="script-block"><label>📌 Hook</label><p>${s.hook}</p></div>
    <div class="script-block"><label>🎥 Visual Direction</label><p>${s.visual}</p></div>
    <div class="script-block"><label>🎙️ Voiceover</label><p>${s.vo}</p></div>
    <div class="script-block"><label>💡 Filming Tips</label><ul>${(s.tips||[]).map(t=>`<li>${t}</li>`).join('')}</ul></div>
    <div class="script-block"><label>📣 CTA</label><p>${s.cta}</p></div>
    <div class="script-meta">📝 ${wordCount} words · ⏱ ~${speakSecs}s speaking time ${speakSecs > 60 ? '⚠️ Consider trimming for under-60s format' : '✅ Good length'}</div>
  `;
  if (editorArea) editorArea.innerHTML = `
    <label style="font-weight:600;display:block;margin-bottom:0.5rem">✏️ Customize Script</label>
    <textarea id="script-edit" class="form-input" rows="8">${s.vo}</textarea>
    <div style="display:flex;gap:0.75rem;margin-top:0.75rem">
      <button class="btn btn--primary btn--sm" onclick="copyEditedScript()">📋 Copy Script</button>
    </div>
  `;
}

function copyEditedScript() {
  const text = document.getElementById('script-edit')?.value || '';
  navigator.clipboard.writeText(text).then(() => showToast('Script copied!', '📋'));
}

// --- LINKS TAB ---
function renderLinksTab() {
  return `
    <div class="links-section">
      <h3>Affiliate Link Configuration</h3>
      <p style="color:var(--text-muted);margin-bottom:1.5rem">Paste your personal EnviroBiotics affiliate tracking links below. These will replace all product links on the site automatically.</p>
      <div class="links-form">
        ${PRODUCTS.map(p => `
          <div class="form-group">
            <label>${p.name} <span style="color:var(--text-muted);font-size:0.85rem">(${p.tagline})</span></label>
            <div style="display:flex;gap:0.5rem">
              <input type="url" id="link-${p.id}" class="form-input"
                value="${appState.customLinks[p.id] || ''}"
                placeholder="${p.shopUrl}?ref=YOUR_AFFILIATE_ID">
              <a href="${p.shopUrl}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm">Test →</a>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:0.75rem;margin-top:1.5rem">
        <button class="btn btn--primary" onclick="saveLinks()">Save Links</button>
        <button class="btn btn--ghost" onclick="clearLinks()">Clear All</button>
      </div>
      <div class="links-info" style="margin-top:2rem;padding:1rem;background:var(--primary-light);border-radius:var(--radius);border-left:3px solid var(--primary)">
        <h4 style="margin:0 0 0.5rem">💡 Getting Your Affiliate Links</h4>
        <ol style="margin:0;padding-left:1.2rem;color:var(--text-secondary)">
          <li>Apply at <a href="https://envirobiotics.com/" target="_blank" rel="noopener">envirobiotics.com</a> → look for "Partner" or "Affiliate" in the footer</li>
          <li>Once approved, generate tracking URLs for each product</li>
          <li>Paste them above and save — every product button on this site updates instantly</li>
        </ol>
      </div>
    </div>
  `;
}

function initLinks() {}

function saveLinks() {
  PRODUCTS.forEach(p => {
    const val = document.getElementById(`link-${p.id}`)?.value?.trim();
    if (val) appState.customLinks[p.id] = val;
    else delete appState.customLinks[p.id];
  });
  localStorage.setItem('customLinks', JSON.stringify(appState.customLinks));
  showToast('Affiliate links saved! All product buttons updated.', '🔗');
  attachAffiliateListeners();
}

function clearLinks() {
  PRODUCTS.forEach(p => { const el = document.getElementById(`link-${p.id}`); if (el) el.value = ''; });
  appState.customLinks = {};
  localStorage.setItem('customLinks', '{}');
  showToast('Links cleared.', '🗑️');
}

// --- WEEKLY REVIEW TAB ---
function renderReviewTab() {
  return `
    <div class="review-section">
      <h3>Weekly Review Generator</h3>
      <p style="color:var(--text-muted);margin-bottom:1.5rem">Auto-generates a structured performance report from your campaign log data.</p>
      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1.5rem">
        <button class="btn btn--primary" onclick="generateReview()">Generate This Week's Report</button>
        <button class="btn btn--outline" onclick="downloadReview()">⬇ Download Markdown</button>
      </div>
      <div id="review-output" class="review-output">
        <p style="color:var(--text-muted);text-align:center;padding:2rem">Click "Generate" to create your weekly review from campaign data.</p>
      </div>
    </div>
  `;
}

function initReview() {}

function generateReview() {
  const camps = appState.campaigns;
  const totalViews = camps.reduce((s,c) => s+(c.views||0), 0);
  const totalClicks = camps.reduce((s,c) => s+(c.clicks||0), 0);
  const totalOrders = camps.reduce((s,c) => s+(c.orders||0), 0);
  const totalRevenue = camps.reduce((s,c) => s+(c.revenue||0), 0);
  const avgCTR = totalViews ? ((totalClicks/totalViews)*100).toFixed(2) : '0.00';
  const avgCR = totalClicks ? ((totalOrders/totalClicks)*100).toFixed(2) : '0.00';
  const bestCamp = camps.sort((a,b) => (b.views||0)-(a.views||0))[0];
  const topProduct = camps.reduce((acc,c) => { acc[c.product] = (acc[c.product]||0)+(c.orders||0); return acc; }, {});
  const topProd = Object.entries(topProduct).sort((a,b)=>b[1]-a[1])[0]?.[0] || 'N/A';

  const report = `# Weekly Performance Review — EnviroBiotics Affiliate Hub
**Period:** Week of ${new Date().toLocaleDateString('en-US', {month:'long',day:'numeric',year:'numeric'})}

---

## 📊 Weekly Snapshot
| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Total Views | ${totalViews.toLocaleString()} | — | — |
| Total Clicks | ${totalClicks.toLocaleString()} | — | — |
| Total Orders | ${totalOrders} | — | — |
| Est. Revenue | $${totalRevenue.toLocaleString()} | — | — |
| Avg CTR | ${avgCTR}% | ≥2% | ${parseFloat(avgCTR)>=2?'✅ On target':'⚠️ Below target'} |
| Avg CR | ${avgCR}% | ≥1.5% | ${parseFloat(avgCR)>=1.5?'✅ On target':'⚠️ Below target'} |

---

## 🏆 Best Performing Content
- **Title:** ${bestCamp?.title || 'N/A'}
- **Platform:** ${bestCamp?.platform || 'N/A'}
- **Views:** ${(bestCamp?.views||0).toLocaleString()}
- **Angle:** ${bestCamp?.hook || 'N/A'}
- **Key lesson:** ${bestCamp?.lesson || 'N/A'}

---

## 🛍️ Top Converting Product
- **${topProd}** led conversions this week

---

## 🔬 Recommended Next Tests
1. A/B test problem-based vs myth-busting hooks for BioLogic Mini
2. Test "30-day challenge" format for longer engagement arc
3. Try Pinterest for "clean home" and "allergen-free bedroom" keywords

---

## 📅 Next Week Focus
- [ ] Post at least 3 new short-form videos
- [ ] Reply to all comments within 24 hours
- [ ] Update Subscribe & Save promotion post
- [ ] Track metrics daily and log in campaign tracker

---
*Generated by EnviroBiotics Affiliate Hub*`;

  const output = document.getElementById('review-output');
  if (output) output.innerHTML = `<pre class="review-text">${report}</pre>`;
  window._lastReview = report;
}

function downloadReview() {
  if (!window._lastReview) { showToast('Generate a report first!', '⚠️'); return; }
  const blob = new Blob([window._lastReview], { type: 'text/markdown' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'weekly-review.md'; a.click();
  showToast('Review downloaded!', '⬇');
}

// --- SCIENCE LOOKUP TAB ---
function renderScienceTab() {
  const suggested = [
    'Active Environmental Probiotics indoor',
    'Bacillus subtilis competitive exclusion mold',
    'Environmental probiotic indoor air quality',
    'Dust mite allergen reduction probiotics',
    'Indoor microbiome health respiratory',
    'Chemical disinfectant antimicrobial resistance',
  ];
  return `
    <div class="science-section">
      <h3>Science Literature Lookup</h3>
      <p style="color:var(--text-muted);margin-bottom:1.5rem">Search PubMed/Europe PMC for peer-reviewed studies to back up your content claims.</p>
      <div style="display:flex;gap:0.5rem;margin-bottom:1rem">
        <input type="text" id="science-query" class="form-input" placeholder="e.g. environmental probiotics indoor air quality" value="">
        <button class="btn btn--primary" onclick="searchScience()">Search</button>
      </div>
      <div class="suggested-queries">
        <span style="font-size:0.85rem;color:var(--text-muted)">Suggested:</span>
        ${suggested.map(q => `<button class="tag-btn" onclick="prefillSearch('${q}')">${q}</button>`).join('')}
      </div>
      <div id="science-results" style="margin-top:1.5rem"></div>
    </div>
  `;
}

function initScience() {}

function prefillSearch(query) {
  const input = document.getElementById('science-query');
  if (input) { input.value = query; searchScience(); }
}

function searchScience() {
  const query = document.getElementById('science-query')?.value?.trim();
  if (!query) return;
  const results = document.getElementById('science-results');
  if (results) results.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:1rem">🔍 Searching Europe PMC...</p>';
  const encoded = encodeURIComponent(query);
  fetch(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encoded}&format=json&pageSize=8&resultType=core`)
    .then(r => r.json())
    .then(data => {
      const articles = data.resultList?.result || [];
      if (!articles.length) { results.innerHTML = '<p style="color:var(--text-muted);text-align:center">No results found. Try different keywords.</p>'; return; }
      results.innerHTML = articles.map(a => `
        <div class="science-result">
          <h4><a href="https://europepmc.org/article/${a.source}/${a.id}" target="_blank" rel="noopener">${a.title || 'Untitled'}</a></h4>
          <p style="font-size:0.85rem;color:var(--text-muted)">${a.authorString || ''} · ${a.journalTitle || ''} · ${a.pubYear || ''}</p>
          <p style="font-size:0.9rem;margin-top:0.25rem">${(a.abstractText || 'No abstract available.').slice(0, 200)}${a.abstractText?.length > 200 ? '…' : ''}</p>
          <button class="btn btn--ghost btn--xs" onclick="copyCitation('${(a.title||'').replace(/'/g,'\\\'').substring(0,80)}...', '${a.authorString?.split(',')[0]||''}', '${a.pubYear||''}', '${a.journalTitle||''}')" style="margin-top:0.5rem">📋 Copy Citation</button>
        </div>
      `).join('');
    })
    .catch(() => { results.innerHTML = '<p style="color:var(--danger);text-align:center">Search failed. Check your connection and try again.</p>'; });
}

function copyCitation(title, author, year, journal) {
  const citation = `${author} et al. (${year}). "${title}" ${journal}.`;
  navigator.clipboard.writeText(citation).then(() => showToast('Citation copied!', '📋'));
}

// ============================================================
//  LEGAL PAGES
// ============================================================
function renderDisclosurePage() {
  return `
    <div class="legal-page container">
      <h1>Affiliate Disclosure</h1>
      <p class="legal-date">Last updated: ${new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}</p>
      <p>This website contains affiliate links to EnviroBiotics products. As an affiliate, we may earn a commission when you make a purchase through our links, at no additional cost to you.</p>
      <h2>What This Means</h2>
      <p>When you click a product link on this site and complete a purchase, we receive a small commission from EnviroBiotics. This helps us keep this resource free and continue creating educational content about indoor air quality and environmental probiotics.</p>
      <h2>Our Commitment to Honest Reviews</h2>
      <p>We only promote products we genuinely believe provide value. Our editorial content is never influenced by affiliate relationships — all opinions, test results, and educational material on this site reflect our honest assessment of EnviroBiotics products.</p>
      <h2>EnviroBiotics Products</h2>
      <p>All product claims on this site reflect information from EnviroBiotics' official website, peer-reviewed research, and publicly available certification documentation. EnviroBiotics holds FDA GRAS, EPA Registration, MADE SAFE®, and ISO certifications.</p>
      <h2>Contact</h2>
      <p>Questions about our affiliate relationship? <a href="https://envirobiotics.com/" target="_blank" rel="noopener">Contact EnviroBiotics directly</a> or reach out through our site.</p>
      <p><a href="#/" class="btn btn--outline" style="margin-top:1rem">← Back to Home</a></p>
    </div>
  `;
}

function renderPrivacyPage() {
  return `
    <div class="legal-page container">
      <h1>Privacy Policy</h1>
      <p class="legal-date">Last updated: ${new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'})}</p>
      <h2>Data We Collect</h2>
      <p>This is a static client-side application. We do not collect, store, or transmit any personal information to external servers. All data (campaign logs, preferences, affiliate links) is stored locally in your browser's localStorage.</p>
      <h2>Third-Party Services</h2>
      <ul>
        <li><strong>EnviroBiotics / Shopify:</strong> When you click product links, you are redirected to EnviroBiotics' Shopify store, which operates under their own privacy policy.</li>
        <li><strong>Europe PMC API:</strong> Science lookup queries are sent to the Europe PMC public API. No personal data is included in these requests.</li>
        <li><strong>Google Fonts:</strong> Fonts are loaded from Google's CDN, which may set analytics cookies.</li>
      </ul>
      <h2>Cookies</h2>
      <p>We use browser localStorage (not cookies) to save your preferences and campaign data locally on your device. This data never leaves your browser.</p>
      <h2>Your Rights</h2>
      <p>You can clear all stored data at any time by clearing your browser's localStorage or using your browser's developer tools.</p>
      <p><a href="#/" class="btn btn--outline" style="margin-top:1rem">← Back to Home</a></p>
    </div>
  `;
}

// ============================================================
//  SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('visible')); return; }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}

// ============================================================
//  BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  applyTheme(appState.theme);
});
