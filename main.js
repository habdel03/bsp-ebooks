'use strict';

/* ═══════════════════
   COUNTDOWN TIMER — 24h
═══════════════════ */
(function initTimer() {
  const stored = localStorage.getItem('bsp_timer_end');
  let endTime;
  if (stored && parseInt(stored) > Date.now()) {
    endTime = parseInt(stored);
  } else {
    endTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('bsp_timer_end', endTime);
  }

  function tick() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('bsp_timer_end', endTime);
      return;
    }
    const pad = n => String(n).padStart(2, '0');
    const h = document.getElementById('t-h');
    const m = document.getElementById('t-m');
    const s = document.getElementById('t-s');
    if (h) h.textContent = pad(Math.floor(diff / 3600000));
    if (m) m.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (s) s.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();


const books = [
  {
    id: 0,
    title: "Combat Spirituel",
    category: "Combat & Victoire",
    price: "2 500 FCFA",
    priceOld: "5 000 FCFA",
    cover: "images/Combat_Spirituel.png",
    desc: "Des attaques inexpliquées dans ta vie professionnelle, familiale ou spirituelle ? Rien n'arrive par hasard. Cet ebook t'enseigne à identifier les forteresses invisibles que l'ennemi dresse contre toi — et te donne les armes prophétiques pour les renverser une à une.",
    includes: [
      "Identification des 7 types d'attaques spirituelles courantes",
      "Décrets prophétiques pour renverser chaque forteresse",
      "Prières de couverture et de protection divine",
      "Guide d'armure spirituelle selon Éphésiens 6",
      "Programme de 21 jours de combat spirituel intense",
      "Témoignages de percées documentées"
    ],
    results: [
      "Reconnaître et nommer les attaques avant qu'elles frappent",
      "Marcher dans une autorité spirituelle renouvelée",
      "Briser les forteresses de maladie, pauvreté et blocages",
      "Protéger ton foyer, tes enfants et tes finances",
      "Vivre une vie de victoire durable en Christ"
    ]
  },
  {
    id: 1,
    title: "Jeûne et Délivrance",
    category: "Délivrance & Liberté",
    price: "2 500 FCFA",
    priceOld: "5 000 FCFA",
    cover: "images/Jeune_et_D\u00e9livrance.png",
    desc: "Le jeûne n'est pas une pratique religieuse — c'est une arme de destruction massive contre les oppressions spirituelles. Cet ebook te guide pas à pas pour combiner le jeûne et la prière afin de briser les blocages invisibles et libérer ta destinée.",
    includes: [
      "Fondements bibliques du jeûne de délivrance",
      "Types de jeûnes selon les situations spirituelles",
      "Prières ciblées pour chaque jour de jeûne",
      "Décrets de délivrance et de liberté en Christ",
      "Guide pour briser les oppressions générationnelles",
      "Programme de jeûne de 3, 7 et 21 jours"
    ],
    results: [
      "Briser les chaînes d'oppression spirituelle profonde",
      "Expérimenter une liberté authentique en Christ",
      "Débloquer des situations figées depuis des années",
      "Renforcer ta communion avec le Saint-Esprit",
      "Entrer dans ta destinée prophétique libéré(e)"
    ]
  },
  {
    id: 2,
    title: "Principes Bibliques de Réussite",
    category: "Prospérité & Destinée",
    price: "2 500 FCFA",
    priceOld: "5 000 FCFA",
    cover: "images/Principes_Bibliques_de_Reussite.png",
    desc: "La réussite n'est pas un accident — c'est le fruit de principes spirituels précis que Dieu a gravés dans Sa Parole. Ces 12 lois bibliques ont transformé des destinées ordinaires en histoires extraordinaires. Il est temps que la tienne en fasse partie.",
    includes: [
      "Les 12 lois spirituelles de la réussite selon la Bible",
      "Application pratique de chaque principe au quotidien",
      "Prières d'activation de la prospérité divine",
      "Exercices de transformation de la mentalité de limitation",
      "Études de cas bibliques de personnages transformés",
      "Plan d'action sur 90 jours pour ta destinée"
    ],
    results: [
      "Transformer ta vision de la réussite selon Dieu",
      "Briser la mentalité de pauvreté et de médiocrité",
      "Activer les bénédictions financières et professionnelles",
      "Découvrir et aligner ta vie à ta destinée prophétique",
      "Devenir une personne d'impact selon le plan de Dieu"
    ]
  }
];

const WA_NUMBER = '2250749907695';

/* ═══════════════════
   DYNAMIC HEADER OFFSETS
   Layout: [BANNER fixed top:0]
           [TICKER in flow, margin-top = bannerH]
           [NAV    fixed, top = bannerH + tickerH]
           [HERO   padding-top = bannerH + tickerH + navH + 32]
═══════════════════ */
function updateOffsets() {
  const banner = document.getElementById('urgency-banner');
  const ticker = document.getElementById('social-ticker');
  const nav    = document.getElementById('navbar');
  const root   = document.documentElement;

  // Banner height — 0 when hidden
  const bannerH = (banner && banner.style.display !== 'none') ? banner.offsetHeight : 0;
  // Ticker is in normal flow so offsetHeight is always correct
  const tickerH = ticker ? ticker.offsetHeight : 0;
  const navH    = nav    ? nav.offsetHeight    : 0;

  root.style.setProperty('--banner-h', bannerH + 'px');          // ticker margin-top
  root.style.setProperty('--ticker-h', tickerH + 'px');          // for no-banner nav fallback
  root.style.setProperty('--nav-top',  (bannerH + tickerH) + 'px');
  root.style.setProperty('--hero-pad', (bannerH + tickerH + navH + 32) + 'px');
}

window.addEventListener('DOMContentLoaded', updateOffsets);
let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(updateOffsets, 80);
}, { passive: true });
setTimeout(updateOffsets, 150);
setTimeout(updateOffsets, 500);

function closeBanner() {
  const banner = document.getElementById('urgency-banner');
  const nav    = document.getElementById('navbar');
  if (!banner) return;
  banner.style.transition = 'transform .4s ease, opacity .3s ease';
  banner.style.transform  = 'translateY(-100%)';
  banner.style.opacity    = '0';
  setTimeout(() => {
    banner.style.display = 'none';
    if (nav) nav.classList.add('no-banner');
    updateOffsets();
  }, 420);
}

/* ═══════════════════
   NAV SCROLL
═══════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 70);
}, { passive: true });

/* ═══════════════════
   MOBILE MENU
═══════════════════ */
function toggleMenu() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  const open = m.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}

/* ═══════════════════
   SCROLL REVEAL
═══════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ═══════════════════
   FAQ ACCORDION
═══════════════════ */
document.querySelectorAll('.faq-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ═══════════════════
   PRODUCT MODAL
═══════════════════ */
function openModal(id) {
  const book = books[id];
  const overlay = document.getElementById('productModal');
  document.getElementById('modalContent').innerHTML = `
    <img class="modal-cover-img" src="${book.cover}" alt="${book.title}" onerror="this.style.display='none'">
    <div class="modal-main">
      <div class="modal-eyebrow">${book.category}</div>
      <h2 class="modal-title">${book.title}</h2>
      <p class="modal-desc">${book.desc}</p>
      <div class="modal-section">
        <h4>Ce que contient cet ebook</h4>
        <ul class="modal-list">
          ${book.includes.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-section">
        <h4>Résultats attendus</h4>
        <ul class="modal-list">
          ${book.results.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-footer">
        <div>
          <div class="modal-price-label">Prix unique — accès immédiat</div>
          <div class="modal-price">${book.price} <span class="price-old">${book.priceOld}</span></div>
        </div>
        <button class="btn-primary" onclick="openPayment(${book.id})">✦ Acheter maintenant</button>
      </div>
    </div>`;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('productModal') || e === 'force') {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════
   PAYMENT MODAL
═══════════════════ */
let currentBook = null;

function openPayment(id) {
  currentBook = books[id];
  const desc = document.getElementById('payDesc');
  if (desc) desc.textContent = `"${currentBook.title}" — ${currentBook.price}`;
  // close product modal first
  document.getElementById('productModal').classList.remove('active');
  document.getElementById('payModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePayModal(e) {
  if (!e || e.target === document.getElementById('payModal') || e === 'force') {
    document.getElementById('payModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function confirmPayment(method) {
  document.getElementById('payModal').classList.remove('active');
  if (method === 'whatsapp' && currentBook) {
    const msg = encodeURIComponent(
      `Bonjour Prophète ! 🙏\nJe souhaite acheter l'ebook :\n"${currentBook.title}" — ${currentBook.price}\nComment procéder pour le paiement ?`
    );
    document.getElementById('whatsappLink').href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  }
  document.getElementById('successModal').classList.add('active');
}

function closeSuccessModal() {
  document.getElementById('successModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ═══════════════════
   BUNDLE PAYMENT
═══════════════════ */
function buyBundle() {
  const msg = encodeURIComponent(
    `Bonjour Prophète ! 🙏\nJe souhaite acheter le PACK COMPLET (3 ebooks) :\n- Combat Spirituel\n- Jeûne et Délivrance\n- Principes Bibliques de Réussite\n\nPrix : 6 000 FCFA (pack complet)\n\nComment procéder ?`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
}

/* ═══════════════════
   ESCAPE KEY
═══════════════════ */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeModal('force');
  closePayModal('force');
  closeSuccessModal();
  closeMenu();
});

/* ═══════════════════
   SMOOTH SCROLL for nav links
═══════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
