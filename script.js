/* ================================================
   The Gadget Ghor — দ্যা গ্যাজেট ঘর
   script.js — সম্পূর্ণ JavaScript
   ================================================ */

/* ================================================
   ১. প্রোডাক্ট ডেটা — এখানে নতুন পণ্য যোগ করুন
   ================================================ */
const PRODUCTS = [
  {
    id: 1, cat: 'fan',
    icon: '🌀', name: 'রিচার্জেবল টেবিল ফ্যান',
    desc: '৩ স্পিড, ৮ ঘণ্টা ব্যাকআপ, USB চার্জিং',
    price: '৳৬৫০', old: '৳৮৫০', badge: 'hot', bg: '#FFF3E0'
  },
  {
    id: 2, cat: 'audio',
    icon: '🎧', name: 'Wireless Earbuds Pro',
    desc: 'Bluetooth 5.0, নয়েজ ক্যান্সেলিং, ডিপ বেস',
    price: '৳৫৫০', old: '৳৭৫০', badge: 'new', bg: '#F3E5F5'
  },
  {
    id: 3, cat: 'charger',
    icon: '🔋', name: '৬৫W ফাস্ট চার্জার',
    desc: 'সকল ফোনের জন্য, দ্রুত চার্জিং',
    price: '৳৩৫০', old: '৳৫০০', badge: '', bg: '#E3F2FD'
  },
  {
    id: 4, cat: 'light',
    icon: '💡', name: 'RGB LED স্ট্রিপ লাইট',
    desc: '৫ মিটার, ১৬ কালার, রিমোট কন্ট্রোল',
    price: '৳৪৫০', old: '৳৬০০', badge: 'hot', bg: '#FFFDE7'
  },
  {
    id: 5, cat: 'watch',
    icon: '⌚', name: 'স্মার্ট ওয়াচ Ultra',
    desc: 'হার্ট রেট, স্টেপ কাউন্টার, Bluetooth',
    price: '৳৯৫০', old: '৳১৪০০', badge: 'new', bg: '#E8F5E9'
  },
  {
    id: 6, cat: 'audio',
    icon: '🔊', name: 'Bluetooth Speaker Mini',
    desc: 'পোর্টেবল, ওয়াটারপ্রুফ, ৮ ঘণ্টা',
    price: '৳৭৫০', old: '৳১০০০', badge: '', bg: '#FCE4EC'
  },
  {
    id: 7, cat: 'other',
    icon: '🔥', name: 'USB স্মার্ট লাইটার',
    desc: 'ইলেকট্রিক, ওয়াইন্ড-প্রুফ, রিচার্জেবল',
    price: '৳২৫০', old: '৳৩৫০', badge: 'hot', bg: '#E0F7FA'
  },
  {
    id: 8, cat: 'charger',
    icon: '🔌', name: 'পাওয়ার ব্যাংক ২০০০০mAh',
    desc: 'ডুয়াল USB, ফাস্ট চার্জ, LED ডিসপ্লে',
    price: '৳১২৫০', old: '৳১৮০০', badge: 'new', bg: '#F9FBE7'
  },
];

/* ── আপনার WhatsApp নম্বর এখানে বদলান ── */
const WA_NUMBER = '8801XXXXXXXXX';

/* ================================================
   ২. প্রোডাক্ট রেন্ডার ও ফিল্টার
   ================================================ */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const list = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === filter);

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px; color:#888;">
        😔 এই ক্যাটাগরিতে কোনো পণ্য নেই।
      </div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const badgeHTML = p.badge === 'new'
      ? '<span class="badge-new">NEW</span>'
      : p.badge === 'hot'
        ? '<span class="badge-hot">🔥 HOT</span>'
        : '';

    const waText = encodeURIComponent(`আমি ${p.name} অর্ডার করতে চাই`);

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-thumb" style="background:${p.bg}">
          ${badgeHTML}
          <span style="font-size:3.8rem">${p.icon}</span>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="prod-desc">${p.desc}</p>
          <div class="price-row">
            <div>
              <div class="price">${p.price}</div>
              <div class="price-old">${p.old}</div>
            </div>
          </div>
          <a class="order-btn"
             href="https://wa.me/${WA_NUMBER}?text=${waText}"
             target="_blank"
             rel="noopener">
            💬 WhatsApp অর্ডার
          </a>
        </div>
      </div>`;
  }).join('');

  /* কার্ড লোড হওয়ার সময় fade-in অ্যানিমেশন */
  grid.querySelectorAll('.product-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity .35s ease ${i * 0.07}s, transform .35s ease ${i * 0.07}s`;
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}

function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

/* ================================================
   ৩. মোবাইল হ্যামবার্গার মেনু
   ================================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const navBtn    = document.querySelector('.nav-order-btn');
  if (!hamburger) return;

  /* মোবাইল মেনু স্টাইল তৈরি */
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobileMenu';
  mobileMenu.style.cssText = `
    display: none;
    flex-direction: column;
    background: #1A1033;
    padding: 16px 5% 20px;
    gap: 8px;
    border-top: 1px solid #ffffff18;
  `;

  /* nav লিংকগুলো মোবাইল মেনুতে কপি */
  const links = [
    { href: '#categories', text: '📦 ক্যাটাগরি' },
    { href: '#products',   text: '🛍️ প্রোডাক্ট' },
    { href: '#soundbox',   text: '🔊 সাউন্ড বক্স' },
    { href: '#reviews',    text: '⭐ রিভিউ' },
    { href: '#contact',    text: '📞 যোগাযোগ' },
    { href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('আমি অর্ডার করতে চাই')}`, text: '💬 অর্ডার করুন', target: '_blank' },
  ];

  links.forEach(l => {
    const a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.text;
    if (l.target) a.target = l.target;
    a.style.cssText = 'color:#fff; text-decoration:none; padding:10px 14px; border-radius:8px; font-size:.95rem; transition:background .2s;';
    a.addEventListener('mouseenter', () => a.style.background = '#7C3AED');
    a.addEventListener('mouseleave', () => a.style.background = 'transparent');
    a.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      hamburger.classList.remove('open');
    });
    mobileMenu.appendChild(a);
  });

  document.querySelector('nav').after(mobileMenu);

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    hamburger.classList.toggle('open', !isOpen);
  });
}

/* ================================================
   ৪. Sticky Nav — স্ক্রল করলে রঙ পরিবর্তন
   ================================================ */
function initStickyNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.boxShadow = '0 4px 24px #0008';
    } else {
      nav.style.boxShadow = '0 2px 16px #0004';
    }
  }, { passive: true });
}

/* ================================================
   ৫. Active Nav Link — কোন সেকশনে আছেন হাইলাইট
   ================================================ */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.background = link.getAttribute('href') === `#${entry.target.id}`
            ? '#7C3AED' : '';
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? '#fff' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ================================================
   ৬. Scroll-to-top বাটন
   ================================================ */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.innerHTML = '⬆';
  btn.title = 'উপরে যান';
  btn.style.cssText = `
    position: fixed; bottom: 90px; right: 24px; z-index: 998;
    background: #7C3AED; color: #fff; border: none;
    width: 44px; height: 44px; border-radius: 50%;
    font-size: 1.1rem; cursor: pointer;
    box-shadow: 0 4px 16px #7C3AED55;
    opacity: 0; transition: opacity .3s, transform .3s;
    transform: translateY(10px);
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(10px)';
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================
   ৭. Scroll Reveal — সেকশন দেখা গেলে অ্যানিমেশন
   ================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.why-card, .review-card, .cat-card, .contact-card, .step'
  );

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

/* ================================================
   ৮. WhatsApp ফ্লোটিং বাটন — পালস ইফেক্ট
   ================================================ */
function initWAFloat() {
  const waBtn = document.querySelector('.wa-float');
  if (!waBtn) return;

  /* পালস রিং তৈরি */
  const ring = document.createElement('span');
  ring.style.cssText = `
    position: absolute; inset: -6px; border-radius: 50%;
    border: 3px solid #25D366; opacity: 0;
    animation: wa-ring 2s ease-out infinite;
  `;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wa-ring {
      0%   { transform: scale(1);   opacity: .6; }
      100% { transform: scale(1.5); opacity: 0;  }
    }
  `;
  document.head.appendChild(style);
  waBtn.style.position = 'relative';
  waBtn.appendChild(ring);
}

/* ================================================
   ৯. কাউন্টার অ্যানিমেশন — হিরো স্ট্যাটস
   ================================================ */
function animateCounter(el, target, suffix) {
  let count = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(timer);
  }, 30);
}

function initCounters() {
  const counters = [
    { selector: '.hero-stats .stat:nth-child(1) .num', target: 500, suffix: '+' },
    { selector: '.hero-stats .stat:nth-child(2) .num', target: 100, suffix: '+' },
  ];

  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  let triggered = false;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      counters.forEach(c => {
        const el = document.querySelector(c.selector);
        if (el) animateCounter(el, c.target, c.suffix);
      });
    }
  }, { threshold: 0.5 });

  observer.observe(heroSection);
}

/* ================================================
   ১০. টোস্ট নোটিফিকেশন — অর্ডার বাটনে ক্লিক করলে
   ================================================ */
function showToast(msg) {
  const existing = document.getElementById('toastMsg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toastMsg';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 160px; left: 50%; transform: translateX(-50%);
    background: #1A1033; color: #fff; padding: 12px 24px;
    border-radius: 30px; font-family: 'Hind Siliguri', sans-serif;
    font-size: .9rem; z-index: 9999; box-shadow: 0 4px 20px #0004;
    border: 1px solid #7C3AED; white-space: nowrap;
    animation: toastIn .3s ease;
  `;

  const s = document.createElement('style');
  s.textContent = `@keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(s);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity .3s';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function initOrderButtons() {
  document.addEventListener('click', e => {
    if (e.target.closest('.order-btn')) {
      showToast('✅ WhatsApp খুলছে... অর্ডার করুন!');
    }
  });
}

/* ================================================
   ১১. সার্চ বার — প্রোডাক্ট খোঁজার সুবিধা
   ================================================ */
function initSearch() {
  const productsSection = document.getElementById('products');
  if (!productsSection) return;

  const searchWrap = document.createElement('div');
  searchWrap.style.cssText = 'margin-bottom: 20px;';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '🔍 পণ্য খুঁজুন... (যেমন: ফ্যান, চার্জার)';
  input.style.cssText = `
    width: 100%; max-width: 420px; padding: 12px 20px;
    border: 2px solid #D8B4FE; border-radius: 30px;
    font-family: 'Hind Siliguri', sans-serif; font-size: .95rem;
    outline: none; color: #1A1033; background: #fff;
    transition: border-color .2s;
  `;
  input.addEventListener('focus',  () => input.style.borderColor = '#7C3AED');
  input.addEventListener('blur',   () => input.style.borderColor = '#D8B4FE');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    /* ফিল্টার বাটন রিসেট */
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-btn')?.classList.add('active');

    if (!q) { renderProducts('all'); return; }

    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:40px; color:#888;">
          😔 "<strong>${q}</strong>" নামে কোনো পণ্য পাওয়া যায়নি।
        </div>`;
      return;
    }

    /* সার্চ রেজাল্ট রেন্ডার (renderProducts-এর মতো) */
    grid.innerHTML = filtered.map(p => {
      const badgeHTML = p.badge === 'new'
        ? '<span class="badge-new">NEW</span>'
        : p.badge === 'hot'
          ? '<span class="badge-hot">🔥 HOT</span>'
          : '';
      const waText = encodeURIComponent(`আমি ${p.name} অর্ডার করতে চাই`);
      return `
        <div class="product-card">
          <div class="product-thumb" style="background:${p.bg}">
            ${badgeHTML}
            <span style="font-size:3.8rem">${p.icon}</span>
          </div>
          <div class="product-info">
            <h3>${p.name}</h3>
            <p class="prod-desc">${p.desc}</p>
            <div class="price-row">
              <div>
                <div class="price">${p.price}</div>
                <div class="price-old">${p.old}</div>
              </div>
            </div>
            <a class="order-btn"
               href="https://wa.me/${WA_NUMBER}?text=${waText}"
               target="_blank" rel="noopener">
              💬 WhatsApp অর্ডার
            </a>
          </div>
        </div>`;
    }).join('');
  });

  searchWrap.appendChild(input);
  const filterBar = productsSection.querySelector('.filter-bar');
  if (filterBar) filterBar.before(searchWrap);
}

/* ================================================
   ১২. পেজ লোড প্রোগ্রেস বার
   ================================================ */
function initProgressBar() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; width: 0%;
    background: linear-gradient(90deg, #FF6B00, #FF2D78, #7C3AED);
    z-index: 9999; transition: width .1s;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / total) * 100}%`;
  }, { passive: true });
}

/* ================================================
   ১৩. সব ফাংশন চালু করুন — পেজ লোড হলে
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();        /* প্রোডাক্ট দেখান */
  initMobileMenu();        /* মোবাইল মেনু */
  initStickyNav();         /* স্ক্রল নেভবার */
  initActiveNavLink();     /* অ্যাক্টিভ লিংক হাইলাইট */
  initScrollToTop();       /* উপরে যাওয়ার বাটন */
  initScrollReveal();      /* কার্ড অ্যানিমেশন */
  initWAFloat();           /* WhatsApp পালস */
  initCounters();          /* নম্বর কাউন্টার */
  initOrderButtons();      /* অর্ডার টোস্ট */
  initSearch();            /* সার্চ বার */
  initProgressBar();       /* স্ক্রল প্রোগ্রেস বার */
});
