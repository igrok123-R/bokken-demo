// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// =====================================================
// MENU DATA
// Añadir plato nuevo: { name, price, desc, img (opcional) }
// Añadir foto a categoría: cambia img de la categoría
// Foto específica de plato: añade img al item del plato
// =====================================================
const menuData = {
  baos: {
    label: 'Crispy Baos',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Bao Classic',  price: '4,50', desc: 'Panceta de cerdo guisada a baja temperatura desmechada, pimiento verde, cilantro.' },
      { name: 'El Japo',   price: '4,50', desc: 'Pollo frito karaague, spicy mayo, cebolla frita.' },
      { name: 'Nikkei',     price: '6,50', desc: 'Secreto anticuchero, salsa de anticucho, cebolla encurtida, cilantro.' },
    ],
  },
  rolls: {
    label: 'Rolls 8piezas',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Acevichado', price: '7,95', desc: 'Aguacate, langostino, sashimi de salmón, salsa acevichada, togarashi.' },
      { name: 'Lomo Saltado', price: '7,95', desc: 'Aguacate, langostino, sashimi de ternera flambeado, salsa de lomo saltado, patata paja.' },
      { name: 'Anticuchero', price: '7,95', desc: 'Aguacate, langostino, sashimi de ternera flambeado, salsa anticuchera, togarashi, cebollino.' },
      { name: 'Huancaina', price: '7,95', desc: 'Aguacate, langostino, sashimi de ternera flambeado, salsa huancaina, togarashi, cebollino.' },
      { name: 'Crispy Salmón', price: '8,00', desc: 'Frito en panko, aguacate, salmón, teriyaki, mayonesa, cebolla frita.' },
      { name: 'Bokken Roll', price: '8,00', desc: 'Frito al panko, relleno de panceta desmechada, salsa bokken, cebolla frita, cebolleta.' },
    ],
  },
  woks: {
    label: 'Fire Woks',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Pad Thai', price: '5,50', desc: 'Tallarines de arroz, salsa pad thai, zanahoria, shitake, cebolla, col, brotes de soja, cilantro, cacahuetes, limón.' },
      { name: 'Yakisoba', price: '5,50', desc: 'Noodles, salsa yakisoba, huevo, zanahoria, shitake, cebolla, col, cebollino.' },
      { name: 'Tallarines Huancaina', price: '6,00', desc: 'Tallarines, salsa huancaina, parmesano, cebollino, lomo saltado.' },
      { name: 'Bokken Rice', price: '6,00', desc: 'Arroz jazmín, huevo, shitake, cilantro, panceta de cerdo estilo asiatico.' },
      { name: 'Nikkei Rice', price: '5,50', desc: 'Arroz jazmín, huevo, brotes de soja, salsa nikkei, mayo-anticucho por encima, cebollino.' },
    ],
  },
  pokebowls: {
    label: 'Pokebowls',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Pokebowl', price: '7,85', desc: 'Aguacate, wakame, edamame, surimi, pepino, cebolla frita, lombarda, sésamo mix, salsa acevichada por encima. A elegir proteina entre salmón, pollo karaague o tofu.' },
    ],
  },
  teas: {
    label: 'Bubble Teas',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Te Clasico',  price: '4,50', desc: 'Te negro con leche y perlas de tapioca.' },
      { name: 'Matcha',      price: '4,75', desc: 'Te matcha con leche de soja y perlas de tapioca.' },
      { name: 'Fresa',       price: '4,50', desc: 'Fresa natural, leche de coco, perlas de tapioca.' },
      { name: '2 Teas x 8', price: '8,00', desc: 'Elige dos sabores.' },
    ],
  },
  fritos: {
    label: 'Fritos',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Pato Estilo Bokken',        price: '12,50', desc: 'Pato en tempura acompañado de 2 crispy bao, pepino, cebollino y salsa bokken.' },
      { name: 'Karaague con arroz',              price: '4,50', desc: 'Contramuslos de pollo frito estilo japones con arroz y una salsa a elegir.' },
      { name: 'Gyozas de Cerdo o Pollo', price: '3,95', desc: '5UD, acompañadas de salsa de gyozas.' },
      { name: 'Rollitos vegetales',          price: '2,50', desc: '3UD y una salsa a elegir.' },
      { name: 'Langostino al panko',          price: '2,50', desc: '3UD y una salsa a elegir.' },
      { name: 'Snack Bokken',          price: '(M)0,50€ / (XL)1,00', desc: 'Snack a elegir tamaño, normal o XL.' },
    ],
  },
  combos: {
    label: 'Combos',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: '2 Crispy Bao', price: '8,00',  desc: 'Elige un bao' },
      { name: 'Pato Bokken + 2 Crispy Bao',       price: '20,00', desc: '2 pato bokken y 2 crispy bao a elegir.' },
      { name: '2 bubble teas',      price: '8,00', desc: '2 bubble teas a elegir.' },
      { name: 'Rolls 14PIEZAS',          price: '14,00', desc: '14 rolls a 1€ cada uno.' },
    ],
  },
};


// =====================================================
// TABS + MENU RENDER
// =====================================================
const tabsBar  = document.getElementById('tabs-bar');
const menuBody = document.getElementById('menu-body');

const allBtn = document.createElement('button');
allBtn.className = 'tab-btn active';
allBtn.dataset.cat = 'todo';
allBtn.textContent = 'Todo';
tabsBar.appendChild(allBtn);

Object.entries(menuData).forEach(([key, cat]) => {
  const btn = document.createElement('button');
  btn.className = 'tab-btn';
  btn.dataset.cat = key;
  btn.textContent = cat.label;
  tabsBar.appendChild(btn);
});

function renderMenu(cat) {
  menuBody.style.opacity = '0';

  setTimeout(() => {
    menuBody.innerHTML = '';
    const keys = cat === 'todo' ? Object.keys(menuData) : [cat];

    keys.forEach(key => {
      const data = menuData[key];
      if (!data) return;

      const section = document.createElement('div');
      section.className = 'cat-section';

      const head = document.createElement('h3');
      head.className = 'cat-head';
      head.textContent = data.label;
      section.appendChild(head);

      data.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'menu-item';
        row.setAttribute('role', 'button');
        row.setAttribute('tabindex', '0');
        row.setAttribute('aria-label', `${item.name}, ${item.price} euros`);
        row.innerHTML = `
          <span class="m-name">${item.name}</span>
          <span class="m-price">${item.price} €</span>
          <span class="m-desc">${item.desc}</span>
        `;
        row.addEventListener('click', () => openDishModal(item, key));
        row.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openDishModal(item, key);
          }
        });
        section.appendChild(row);
      });

      menuBody.appendChild(section);
    });

    menuBody.style.opacity = '1';
  }, 130);
}

tabsBar.addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  tabsBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(btn.dataset.cat);
});

renderMenu('todo');


// =====================================================
// DISH MODAL
// =====================================================
const modal      = document.getElementById('dish-modal');
const modalImg   = document.getElementById('modal-img');
const modalImgWrap = document.getElementById('modal-img-wrap');
const modalName  = document.getElementById('modal-name');
const modalPrice = document.getElementById('modal-price');
const modalDesc  = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

function openDishModal(item, catKey) {
  // Prioridad: foto del plato → foto de la categoría → sin foto
  const imgSrc = item.img || (menuData[catKey] && menuData[catKey].img) || null;

  if (imgSrc) {
    modalImg.src = imgSrc;
    modalImg.alt = item.name;
    modalImgWrap.style.display = 'block';
  } else {
    modalImgWrap.style.display = 'none';
  }

  modalName.textContent = item.name;
  modalPrice.textContent = item.price + ' €';
  modalDesc.textContent = item.desc;

  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeDishModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeDishModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeDishModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeDishModal();
});


// =====================================================
// GOOGLE MAPS — cookie consent gate
// =====================================================
const MAPS_KEY      = 'bokken_maps_consent';
const mapContainer  = document.getElementById('map-container');
const cookieBanner  = document.getElementById('cookie-banner');

function renderMap() {
  mapContainer.innerHTML = `<iframe
    src="https://maps.google.com/maps?q=Bokken+Street+Food+Nikkei+Mostoles+Madrid&z=16&output=embed&hl=es"
    title="Mapa de Bokken — Calle de la Concordia 6, Mostoles"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>`;
}

function renderMapPlaceholder() {
  mapContainer.innerHTML = `
    <div class="map-placeholder">
      <p>El mapa interactivo requiere aceptar cookies de Google Maps.</p>
      <a href="https://maps.google.com/?q=Calle+de+la+Concordia+6+Mostoles+Madrid"
         target="_blank" rel="noopener" class="btn btn-outline btn-sm">
        Ver en Google Maps &rarr;
      </a>
    </div>
  `;
}

function initMap() {
  const consent = localStorage.getItem(MAPS_KEY);
  if (consent === 'yes') {
    renderMap();
  } else {
    renderMapPlaceholder();
    if (consent !== 'no') {
      cookieBanner.classList.add('visible');
    }
  }
}

document.getElementById('cookie-accept').addEventListener('click', () => {
  localStorage.setItem(MAPS_KEY, 'yes');
  cookieBanner.classList.remove('visible');
  renderMap();
});

document.getElementById('cookie-reject').addEventListener('click', () => {
  localStorage.setItem(MAPS_KEY, 'no');
  cookieBanner.classList.remove('visible');
});

initMap();


// =====================================================
// HAMBURGER / MOBILE NAV
// =====================================================
const hamburger = document.getElementById('nav-hamburger');
const mobileNav = document.getElementById('mobile-nav');

function openMobileMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileNav.classList.add('open');
  mobileNav.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});


// =====================================================
// SCROLL TO TOP
// =====================================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
