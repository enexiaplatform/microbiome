// ============================================================
//  EnviroBiotics Affiliate Hub — Data & State
// ============================================================

// --- CATEGORIES ---
const CATEGORIES = [
  { id: 'portable', label: 'Portable', icon: '🎒', color: 'blue' },
  { id: 'room',     label: 'Room',     icon: '🏠', color: 'green' },
  { id: 'home',     label: 'Whole Home', icon: '🏡', color: 'emerald' },
  { id: 'refill',   label: 'Refills',  icon: '🔁', color: 'purple' },
];

// --- PRODUCTS ---
const PRODUCTS = [
  {
    id: 'biologic-mini',
    name: 'BioLogic Mini',
    tagline: 'Portable · up to 300 sq ft',
    category: 'portable',
    price: '$99',
    priceNote: 'One-time purchase',
    coverage: '300 sq ft',
    image: 'images/biologic_mini.png',
    shopUrl: 'https://shop.envirobiotics.com/products/biologic-mini',
    cartUrl: 'https://shop.envirobiotics.com/cart/add?id=48644372496636&quantity=1&return_to=/cart',
    badge: 'Best Seller',
    painPoint: 'Allergens, mold spores, and harmful bacteria accumulating in your bedroom or home office — and air purifiers only treat the air, not surfaces.',
    commonFail: 'HEPA filters trap particles in the air but do nothing for surfaces where 80% of contaminants live.',
    mechanism: 'BioLogic Mini continuously mists Active Environmental Probiotics® that settle on every surface, competitively excluding mold, allergens, and harmful bacteria — naturally.',
    certifications: ['FDA GRAS', 'EPA Registered', 'MADE SAFE®', 'ISO Certified'],
    trustScore: 4.9,
    differentiation: 5,
    repeatPurchase: 5,
    features: [
      'Covers up to 300 sq ft continuously',
      'Plug-in anywhere — bedroom, office, car hotel room',
      'Silent, automated — set and forget',
      'Probiotic refill cartridges (Subscribe & Save)',
      'Safe around children, pets & sensitive individuals',
    ],
    scienceBacking: 'Active Environmental Probiotics (AEP®) sourced from nature, EPA Registered, FDA GRAS-certified beneficial Bacillus strains. Clinically tested in hospitals, schools, and hotels worldwide. Competitive exclusion reduces surface allergens by up to 75% in controlled studies.',
    contentAngles: {
      problem: 'Your "clean" bedroom is hiding millions of allergens on every surface — and your air purifier is doing absolutely nothing about it.',
      myth: 'Myth: if it looks clean, it is clean. The truth: surfaces you touch every day harbor more bacteria than a toilet seat.',
      science: 'Environmental probiotics don\'t kill — they compete. And they win. Here\'s the science behind EnviroBiotics.',
    },
  },
  {
    id: 'biotica-800',
    name: 'Biotica 800',
    tagline: 'Set-and-forget · up to 800 sq ft',
    category: 'room',
    price: '$249',
    priceNote: 'One-time purchase',
    coverage: '800 sq ft',
    image: 'images/biotica_800.png',
    shopUrl: 'https://shop.envirobiotics.com/products/biotica-800',
    cartUrl: 'https://shop.envirobiotics.com/cart/add?id=48644373184764&quantity=1&return_to=/cart',
    badge: 'Most Popular',
    painPoint: 'Shared living spaces — open-plan kitchens, living rooms, classrooms — accumulate mold, pet dander, and dust mite allergens that no single air purifier can address.',
    commonFail: 'Chemical sprays kill on contact but evaporate in hours, leaving surfaces re-contaminated almost immediately.',
    mechanism: 'Biotica 800 uses a high-capacity probiotic dispersal system that fills larger spaces with beneficial bacteria, establishing a persistent, self-renewing microbial shield on air, surfaces, and objects simultaneously.',
    certifications: ['FDA GRAS', 'EPA Registered', 'MADE SAFE®', 'ISO Certified'],
    trustScore: 4.8,
    differentiation: 5,
    repeatPurchase: 5,
    features: [
      'Covers up to 800 sq ft continuously',
      'High-capacity cartridge system for large shared spaces',
      'Reduces mold, allergens, pet dander, and dust mites',
      'Trusted in Grand Hyatt, Shangri-La, and hospitals',
      'PTPA Award winner — Parents Tested, Parents Approved',
    ],
    scienceBacking: 'Biotica 800 uses the same institutional-grade Active Environmental Probiotics® trusted by Grand Hyatt Hotels, Brooklyn Nets, and hospitals globally. Bacillus subtilis and related strains outcompete harmful microbes for nutrients and space, creating a lasting microbial balance across air and surfaces.',
    contentAngles: {
      problem: 'You spend 90% of your life indoors. Your living room, your office, your kids\' classroom — are they actually safe?',
      myth: 'Myth: chemical disinfectants keep your home safe. Reality: they kill beneficial bacteria too, making the problem worse.',
      science: 'How probiotic purification works 24/7 — without a filter to replace, a chemical to inhale, or a microbe to fear.',
    },
  },
  {
    id: 'ebiotic-home',
    name: 'E Biotic – Home',
    tagline: 'HVAC integration · whole-home coverage',
    category: 'home',
    price: 'From $599',
    priceNote: 'Professional-grade system',
    coverage: 'Whole home',
    image: 'images/ebiotic_home.png',
    shopUrl: 'https://envirobiotics.com/hvac#ebiotic-pro',
    cartUrl: 'https://envirobiotics.com/hvac#ebiotic-pro',
    badge: 'Pro System',
    painPoint: 'Whole-home air quality issues — recurring mold in hidden HVAC ducts, seasonal allergies affecting every room, pet odors that spread throughout the house.',
    commonFail: 'Standard HVAC filters catch large particles but do nothing about microbial contaminants circulating through the entire duct system.',
    mechanism: 'E Biotic integrates directly with your HVAC system to continuously disperse Environmental Probiotics through every duct and room simultaneously — balancing the entire indoor ecosystem hands-free.',
    certifications: ['FDA GRAS', 'EPA Registered', 'MADE SAFE®', 'ISO Certified'],
    trustScore: 4.9,
    differentiation: 5,
    repeatPurchase: 4,
    features: [
      'Integrates with any HVAC system',
      'Whole-home coverage from a single device',
      'Reaches hidden ducts, corners, and surfaces air purifiers can\'t',
      'Ideal for allergy sufferers and pet owners',
      'Used in hospitals, airports, and luxury hotels worldwide',
    ],
    scienceBacking: 'The E Biotic system distributes EPA-Registered probiotic strains through HVAC pathways at precise, automated intervals. Field studies in healthcare facilities show 60–80% reduction in airborne fungal spores and surface allergen loads within 30 days of use.',
    contentAngles: {
      problem: 'Your HVAC system is circulating mold spores, dust mite allergens, and bacteria through every room — 24 hours a day.',
      myth: 'Myth: HVAC filters protect your home\'s air. Truth: standard filters miss 99% of microbial contaminants.',
      science: 'The 3-step system that balances your entire home\'s microbiome — select, disperse, restore.',
    },
  },
  {
    id: 'refill-cartridges',
    name: 'Refill Cartridges',
    tagline: 'Subscribe & Save · recurring commission',
    category: 'refill',
    price: 'From $29',
    priceNote: 'Per cartridge — Subscribe & Save discount',
    coverage: 'Ongoing',
    image: 'images/refill_cartridges.png',
    shopUrl: 'https://shop.envirobiotics.com/collections/subscribe-save',
    cartUrl: 'https://shop.envirobiotics.com/collections/subscribe-save',
    badge: '💰 Recurring Revenue',
    painPoint: 'Customers love their EnviroBiotics device but need fresh probiotic cartridges every 30–60 days to maintain effectiveness.',
    commonFail: 'Other air purifier brands charge for filter replacements but don\'t actually improve air quality — EnviroBiotics cartridges deliver active, living probiotics.',
    mechanism: 'Each refill cartridge contains billions of EPA-Registered beneficial Bacillus spores ready to activate and colonize indoor surfaces, maintaining the protective microbial shield continuously.',
    certifications: ['FDA GRAS', 'EPA Registered', 'MADE SAFE®'],
    trustScore: 4.8,
    differentiation: 4,
    repeatPurchase: 5,
    features: [
      'Works with BioLogic Mini and Biotica 800',
      'Subscribe & Save for automatic delivery',
      'As an affiliate — earn recurring commissions monthly',
      'Compatible refills last 30–60 days per cartridge',
      'Bulk packs available for extra savings',
    ],
    scienceBacking: 'Refill cartridges maintain consistent probiotic concentrations of 10⁹ CFU/mL to ensure continuous competitive exclusion of harmful microorganisms. Spore-forming Bacillus strains remain stable at room temperature with no refrigeration required.',
    contentAngles: {
      problem: 'Your EnviroBiotics device is only as good as its last refill. Here\'s why you should never skip a replacement.',
      myth: 'Myth: once you buy an air purifier, you\'re done. Truth: living probiotic systems need fresh cultures to stay effective.',
      science: 'Why Bacillus spore technology in refill cartridges beats any filter on the market — indefinitely.',
    },
  },
];

// --- STARTER KITS ---
const STARTER_KITS = [
  {
    id: 'starter-bedroom',
    name: 'Bedroom Essentials Kit',
    tagline: 'The allergy-free sleep upgrade',
    products: ['biologic-mini', 'refill-cartridges'],
    icon: '🛏️',
    description: 'BioLogic Mini + 3-month cartridge supply. Fall asleep knowing your bedroom surfaces are protected by billions of beneficial probiotics.',
    savings: 'Save 15%',
  },
  {
    id: 'starter-home',
    name: 'Whole-Home Protection Kit',
    tagline: 'Complete indoor ecosystem balance',
    products: ['biotica-800', 'refill-cartridges'],
    icon: '🏡',
    description: 'Biotica 800 + 6-month Subscribe & Save. Cover your entire living space with continuous probiotic protection.',
    savings: 'Save 20%',
  },
  {
    id: 'starter-family',
    name: 'Family Health Bundle',
    tagline: 'For homes with kids, pets, or allergy sufferers',
    products: ['biologic-mini', 'biotica-800', 'refill-cartridges'],
    icon: '👨‍👩‍👧‍👦',
    description: 'BioLogic Mini for bedrooms + Biotica 800 for shared spaces + Subscribe & Save. Maximum protection for every family member.',
    savings: 'Save 25%',
  },
  {
    id: 'starter-pro',
    name: 'Pro Creator Kit',
    tagline: 'Everything you need to review and promote',
    products: ['biologic-mini', 'biotica-800'],
    icon: '🎬',
    description: 'Get both devices to experience and compare. Perfect for content creators — unbox, test, and film your honest results.',
    savings: 'Creator Bundle',
  },
];

// --- QUIZ ---
const QUIZ_QUESTIONS = [
  {
    id: 'concern',
    question: 'What is your biggest indoor health concern?',
    options: [
      { label: 'Allergies & dust mites in my bedroom', value: 'allergy' },
      { label: 'Mold, damp odors, or musty smells', value: 'mold' },
      { label: 'Pet dander affecting the whole house', value: 'pet' },
      { label: 'Overall indoor air quality & bacteria', value: 'general' },
    ],
  },
  {
    id: 'space',
    question: 'What space are you trying to protect?',
    options: [
      { label: 'A single room (bedroom or office)', value: 'small' },
      { label: 'A large room or open-plan living area', value: 'medium' },
      { label: 'My entire home (multiple rooms)', value: 'large' },
      { label: 'I travel and want portable protection', value: 'travel' },
    ],
  },
  {
    id: 'approach',
    question: 'What matters most to you?',
    options: [
      { label: 'Chemical-free, natural solution', value: 'natural' },
      { label: 'Science-backed, clinically proven', value: 'science' },
      { label: 'Set-and-forget convenience', value: 'convenience' },
      { label: 'Best value — recurring savings', value: 'value' },
    ],
  },
];

// --- ARTICLES ---
const ARTICLES = [
  {
    id: 'indoor-ecosystem',
    title: 'The Indoor Ecosystem: Why Your Home\'s Microbiome Matters',
    excerpt: 'You spend 90% of your life indoors. The microbial balance of that environment directly shapes your respiratory health, allergy severity, and immune resilience.',
    category: 'Educational',
    readTime: '5 min read',
    icon: '🌿',
    tags: ['indoor air', 'microbiome', 'health'],
  },
  {
    id: 'probiotics-vs-chemicals',
    title: 'Probiotics vs. Chemical Disinfectants: What Science Actually Says',
    excerpt: 'Chemical cleaners kill 99.9% of bacteria — including the beneficial ones. Here\'s why that\'s a problem, and how environmental probiotics offer a smarter alternative.',
    category: 'Science',
    readTime: '6 min read',
    icon: '🔬',
    tags: ['science', 'chemicals', 'probiotics'],
  },
  {
    id: 'mold-allergens',
    title: 'Mold, Allergens & Dust Mites: The Invisible Threat in Your Home',
    excerpt: 'Dust mites produce 200 times their body weight in waste every day. Mold spores survive on most surfaces for months. Here\'s what\'s actually living in your "clean" home.',
    category: 'Educational',
    readTime: '4 min read',
    icon: '🦠',
    tags: ['mold', 'allergens', 'dust mites'],
  },
  {
    id: 'how-aep-works',
    title: 'How Active Environmental Probiotics® Work — Step by Step',
    excerpt: 'From nature collection to EPA registration to your living room — the full science behind EnviroBiotics\' patented AEP® technology.',
    category: 'Science',
    readTime: '7 min read',
    icon: '⚗️',
    tags: ['AEP', 'technology', 'EnviroBiotics'],
  },
  {
    id: 'hvac-hygiene',
    title: 'HVAC Hygiene: The Hidden Source of Indoor Air Pollution',
    excerpt: 'Most homeowners never think about what\'s inside their HVAC ducts. Spoiler: it\'s a breeding ground for mold, bacteria, and allergens being distributed to every room.',
    category: 'Guide',
    readTime: '5 min read',
    icon: '🏠',
    tags: ['HVAC', 'indoor air', 'whole home'],
  },
  {
    id: 'certifications-explained',
    title: 'FDA GRAS, EPA Registered, MADE SAFE® — What EnviroBiotics\' Certifications Actually Mean',
    excerpt: 'Four letters can mean the difference between safe and risky. Here\'s exactly what each of EnviroBiotics\' certifications verifies — and why they matter for your family.',
    category: 'Educational',
    readTime: '4 min read',
    icon: '✅',
    tags: ['FDA', 'EPA', 'MADE SAFE', 'certifications'],
  },
  {
    id: 'affiliate-content-guide',
    title: 'The EnviroBiotics Content Creator\'s Playbook',
    excerpt: 'The 3 content angles that convert best, the science hooks that stop scrollers, and the posting cadence that compounds results — built specifically for EnviroBiotics affiliates.',
    category: 'Guide',
    readTime: '8 min read',
    icon: '🎬',
    tags: ['content', 'affiliate', 'creator'],
  },
  {
    id: 'compare-solutions',
    title: 'EnviroBiotics vs. HEPA Filters vs. Chemical Sprays: The Honest Comparison',
    excerpt: 'Air purifiers treat only the air they can suck in. Chemical sprays last hours. Environmental probiotics work 24/7 on every surface. Here\'s the data.',
    category: 'Science',
    readTime: '5 min read',
    icon: '📊',
    tags: ['comparison', 'HEPA', 'chemicals'],
  },
  {
    id: 'success-stories',
    title: '7 Real EnviroBiotics Success Stories — Allergy Relief, Mold Control, Pet Owners',
    excerpt: 'From a family with a dust mite-allergic child to a dog owner battling pet dander — real customers, real results, and the content angles that made affiliate creators go viral.',
    category: 'Guide',
    readTime: '6 min read',
    icon: '⭐',
    tags: ['testimonials', 'results', 'case studies'],
  },
];

// --- ARTICLE CONTENT ---
const ARTICLE_CONTENT = {
  'indoor-ecosystem': `
    <h2>The 90% Problem</h2>
    <p>According to the EPA, Americans spend an average of 90% of their time indoors. Yet most of us invest far more energy in our diet, exercise, and outdoor activities than in the quality of the air and surfaces inside our homes.</p>
    <p>This oversight has significant health consequences. Indoor air can be <strong>2 to 5 times more polluted</strong> than outdoor air, according to EPA research. Mold spores, dust mite allergens, pet dander, and harmful bacteria accumulate on every surface you touch, breathe near, and sleep on.</p>
    <h2>What Is the Indoor Microbiome?</h2>
    <p>Just as your gut has a microbiome — a community of trillions of beneficial and harmful microorganisms — so does your home. The "built environment microbiome" includes bacteria, fungi, and other microorganisms that colonize your walls, furniture, HVAC ducts, bedding, and the air itself.</p>
    <p>In a healthy outdoor ecosystem, beneficial microorganisms naturally outcompete harmful ones. But modern sealed, climate-controlled buildings disrupt this balance. We've created indoor environments that favor harmful pathogens — and then we fight them with chemicals that kill beneficial bacteria too, making the imbalance worse.</p>
    <h2>The EnviroBiotics Solution</h2>
    <p>Active Environmental Probiotics® (AEP®) from EnviroBiotics restore this natural balance. By continuously misting beneficial Bacillus strains into your indoor environment, EnviroBiotics creates a persistent microbial shield — outcompeting mold, allergens, and harmful bacteria through competitive exclusion, without chemicals, without toxins, without side effects.</p>
    <p><strong>Trusted in hospitals, schools, hotels, and airports in over 20 countries.</strong></p>
    <p><a href="https://shop.envirobiotics.com/" target="_blank" rel="noopener" class="btn btn--primary">Explore EnviroBiotics Products →</a></p>
  `,
  'probiotics-vs-chemicals': `
    <h2>The Chemical Cleaning Paradox</h2>
    <p>Antibacterial sprays, disinfectant wipes, and alcohol-based cleaners promise to eliminate 99.9% of bacteria. But there's a critical problem: they also kill the beneficial bacteria that keep harmful pathogens in check.</p>
    <p>This creates a vacuum. When you remove all bacteria from a surface — good and bad — you give the first microorganism to arrive an empty ecosystem to colonize. Harmful bacteria, which reproduce faster in disturbed environments, often win this race.</p>
    <h2>Antimicrobial Resistance</h2>
    <p>The WHO lists antimicrobial resistance as one of the greatest threats to global health. Regular exposure to chemical disinfectants accelerates the development of resistant strains — meaning your cleaning products may be making bacteria harder to kill over time.</p>
    <h2>The Probiotic Alternative</h2>
    <p>Environmental probiotics work differently. Instead of killing all bacteria, they flood your indoor environment with beneficial strains that compete with harmful microorganisms for resources — food, space, and attachment sites on surfaces.</p>
    <p>This is called <strong>competitive exclusion</strong> — a natural process that requires no chemicals, leaves no toxic residue, and actually strengthens over time as probiotic populations establish themselves.</p>
    <p>EnviroBiotics' Active Environmental Probiotics® are sourced from pristine natural environments, screened for absolute safety, and EPA Registered. They're FDA GRAS certified and MADE SAFE® verified — safe around children, pets, and immunocompromised individuals.</p>
    <p><a href="https://envirobiotics.com/how-it-works" target="_blank" rel="noopener" class="btn btn--primary">See How EnviroBiotics Technology Works →</a></p>
  `,
  'mold-allergens': `
    <h2>The Hidden Inhabitants of Your Clean Home</h2>
    <p>A square meter of mattress can harbor up to <strong>2 million dust mites</strong>. Each mite produces 200 times its body weight in fecal matter every day — and that waste is one of the most potent allergens known to science.</p>
    <p>Dust mite allergens trigger asthma attacks, eczema flares, year-round rhinitis, and disrupted sleep in over 1 billion people worldwide. And they're virtually invisible — your "clean" bed may be their thriving habitat.</p>
    <h2>Mold: The Persistent Problem</h2>
    <p>Mold spores are present in virtually every indoor environment. Under the right conditions — humidity, organic material, and limited competition — they germinate and release mycotoxins that cause respiratory irritation, headaches, and in some cases, serious immune disorders.</p>
    <p>Chemical treatments kill visible mold temporarily, but spores survive on most surfaces for months, regerminating as soon as conditions allow.</p>
    <h2>How EnviroBiotics Addresses This</h2>
    <p>EnviroBiotics' beneficial Bacillus strains actively consume the organic matter that dust mites and mold feed on — creating an environment where these allergen sources cannot thrive. In independent studies, regular use reduced surface allergen loads by <strong>up to 75%</strong> within 30 days.</p>
    <p><a href="https://shop.envirobiotics.com/products/biologic-mini" target="_blank" rel="noopener" class="btn btn--primary">Try BioLogic Mini for Bedrooms →</a></p>
  `,
};

// --- DEFAULT ONBOARDING STEPS ---
const defaultOnboarding = [
  // Day 1
  { day: 1, id: 'ob1', text: 'Join the EnviroBiotics affiliate/partner program at envirobiotics.com/affiliate', done: false, detail: 'Apply for the affiliate program. You\'ll receive your unique referral code and tracking links within 1–3 business days.' },
  { day: 1, id: 'ob2', text: 'Set up your affiliate tracking links in the Links tab of the Founder Hub', done: false, detail: 'Once approved, paste your personal affiliate links into the Links tab of the Founder Hub. This will update all buttons on the website instantly.' },
  { day: 1, id: 'ob3', text: 'Order your first product sample (BioLogic Mini recommended)', done: false, detail: 'Personal experience is the most credible content. Order BioLogic Mini to test in your bedroom for 2 weeks before filming.' },
  // Day 2
  { day: 2, id: 'ob4', text: 'Read the full EnviroBiotics technology page: envirobiotics.com/how-it-works', done: false, detail: 'Understanding the science deeply makes your content 10x more credible and persuasive.' },
  { day: 2, id: 'ob5', text: 'Score all 4 EnviroBiotics products using the Product Scorer in Founder Hub', done: false, detail: 'Use the scoring model to decide which product to promote first based on your audience.' },
  { day: 2, id: 'ob6', text: 'Research your audience: who suffers from indoor allergies, mold, or pet dander?', done: false, detail: 'Join Facebook groups, Reddit communities (r/homeimprovement, r/allergies), and YouTube comments to understand pain points.' },
  // Day 3
  { day: 3, id: 'ob7', text: 'Write your first video script using the Video Script Hub (BioLogic Mini — Problem angle)', done: false, detail: 'Start with a "problem-based" hook. Example: "Your bedroom air purifier is doing nothing about the millions of allergens on your mattress..."' },
  { day: 3, id: 'ob8', text: 'Plan a filming session: unboxing + bedroom placement + 30-day challenge', done: false, detail: 'Film your BioLogic Mini unboxing, setup, and commit to a 30-day honest review series.' },
  // Day 4
  { day: 4, id: 'ob9', text: 'Film your first short-form video (30–60 seconds, strong hook, problem-solution format)', done: false, detail: 'Hook in the first 2 seconds. Show the problem visually. Reveal the probiotic solution. End with clear CTA.' },
  { day: 4, id: 'ob10', text: 'Add captions, zoom effects, and text overlays', done: false, detail: 'Captions increase watch time by 40%. Use large, high-contrast text. Zoom-in on the product misting.' },
  // Day 5
  { day: 5, id: 'ob11', text: 'Publish on TikTok, Instagram Reels, and YouTube Shorts simultaneously', done: false, detail: 'Best posting windows: Tuesday–Thursday 12–3pm EST or 7–9pm EST. Use hashtags: #indoorairquality #probiotics #allergyrelief #homehealth' },
  { day: 5, id: 'ob12', text: 'Add your affiliate link to your bio or link-in-bio tool', done: false, detail: 'Use Linktree, Later, or Beacons to create a landing page with all 4 EnviroBiotics product links.' },
  // Day 6
  { day: 6, id: 'ob13', text: 'Track performance: views, clicks, orders in the Founder Hub campaign log', done: false, detail: 'Target metrics: CTR ≥ 2%, CR ≥ 1.5%, Average Order Value ≥ $99. EnviroBiotics has strong AOV due to product price point.' },
  { day: 6, id: 'ob14', text: 'Reply to every comment in the first 24 hours', done: false, detail: 'Early engagement boosts distribution. Answer questions about the science — this builds trust and drives conversions.' },
  // Day 7
  { day: 7, id: 'ob15', text: 'Film a myth-busting video: "Why HEPA filters aren\'t enough"', done: false, detail: 'This angle performs extremely well — viewers who feel deceived by existing products are highly motivated buyers.' },
  { day: 7, id: 'ob16', text: 'Promote a starter kit combo (BioLogic Mini + 3-month cartridge supply)', done: false, detail: 'Bundle promotions have higher AOV and earn more commission per sale. Great for "gift ideas" content.' },
  { day: 7, id: 'ob17', text: 'Export your first Weekly Review from the Founder Hub', done: false, detail: 'Review CTR, CR, best-performing angle, and top-converting product. Use this to plan Week 2.' },
  { day: 7, id: 'ob18', text: 'Set up Subscribe & Save promotion for recurring commissions', done: false, detail: 'EnviroBiotics Subscribe & Save is your best long-term income. Promote the refill cartridge subscription for monthly recurring affiliate revenue.' },
];

// --- APP STATE ---
function safeJsonParse(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    console.error("Failed to parse localStorage key:", key, e);
    return defaultValue;
  }
}

const defaultCampaigns = [
  { date: '2026-07-01', platform: 'TikTok', title: 'Your HEPA filter doesn\'t clean surfaces', hook: 'problem', category: 'room', product: 'Biotica 800', views: 18200, likes: 1240, saves: 890, comments: 156, clicks: 412, orders: 6, revenue: 1494, lesson: 'Surface allergen angle outperforms air quality angle 3:1', next: 'Test myth-busting version of same script' },
  { date: '2026-07-05', platform: 'Instagram Reels', title: 'I replaced chemical sprays with probiotics', hook: 'myth', category: 'portable', product: 'BioLogic Mini', views: 31500, likes: 2800, saves: 1650, comments: 287, clicks: 820, orders: 9, revenue: 891, lesson: '"Chemical-free" messaging resonates strongly with mothers 25–45', next: 'Create "mom-focused" version with child safety angle' },
  { date: '2026-07-10', platform: 'YouTube Shorts', title: 'What\'s actually in your HVAC ducts', hook: 'science', category: 'home', product: 'E Biotic Home', views: 9400, likes: 580, saves: 340, comments: 72, clicks: 198, orders: 2, revenue: 1198, lesson: 'Higher price point needs longer content format — move to long-form YouTube', next: 'Film 5-min explainer video for YouTube proper' },
];

const appState = {
  theme: localStorage.getItem('theme') || 'light',
  quiz: { answers: {}, step: 0, complete: false },
  campaigns: safeJsonParse('campaigns', defaultCampaigns),
  savedScores: {},
  checklistItems: safeJsonParse('onboarding', null) || defaultOnboarding.map(i => ({ ...i })),
  customLinks: safeJsonParse('customLinks', {}),
  commissionRate: parseFloat(localStorage.getItem('commissionRate')) || 15,
  promoCode: localStorage.getItem('promoCode') || '',
  bioLink: localStorage.getItem('bioLink') || '',
  subid: '',
  dashboardTab: 'kpi',
};

// --- THEME ---
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  appState.theme = theme;
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  applyTheme(appState.theme === 'dark' ? 'light' : 'dark');
}

// --- TOAST ---
function showToast(message, icon = '✅') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Init theme on load
applyTheme(appState.theme);
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.addEventListener('click', toggleTheme);
});
