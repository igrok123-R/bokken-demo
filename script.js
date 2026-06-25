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
    label: 'Baos',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Bao Classic',  price: '4,50', desc: 'Carne desmechada, salsa hoisin, pepino y cebolleta.' },
      { name: 'Crispy Bao',   price: '4,50', desc: 'Pollo en tempura, mayonesa wasabi, lechuga, zanahoria encurtida.' },
      { name: 'Pato Bao',     price: '6,50', desc: 'Pato confitado, pepino, salsa hoisin, cebolleta. Dos unidades.' },
      { name: 'Veggie Bao',   price: '4,50', desc: 'Tofu frito, aguacate, col lombarda, mayonesa de soja.' },
    ],
  },
  rolls: {
    label: 'Rolls',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Bokken Roll',   price: '8,00', desc: 'Panceta desmechada, salsa bokken, cebolla frita, cebolleta. Panko. 7 piezas.' },
      { name: 'Crispy Salmon', price: '8,00', desc: 'Salmon fresco, aguacate, teriyaki, cebolleta. Panko. 7 piezas.' },
      { name: 'Tuna Spicy',    price: '8,00', desc: 'Atun fresco, salsa picante, pepino, aguacate. 7 piezas.' },
      { name: 'California',    price: '7,50', desc: 'Surimi, aguacate, pepino. El clasico. 7 piezas.' },
      { name: 'Veggie Roll',   price: '7,00', desc: 'Aguacate, pepino, zanahoria, pimiento. Sin carne. 7 piezas.' },
      { name: 'Dragon Roll',   price: '9,50', desc: 'Gamba, aguacate, anguila, salsa unagi. 7 piezas.' },
      { name: '2 Rolls x 14', price: '14,00', desc: 'Elige dos rolls del menu. 14 piezas en total.' },
    ],
  },
  woks: {
    label: 'Fire Woks',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Pad Thai',         price: '5,50', desc: 'Fideos de arroz salteados al wok, huevo, brotes de soja, cacahuete, lima. Elige proteina.' },
      { name: 'Wok Bokken',       price: '5,50', desc: 'Verduras de temporada con salsa bokken y arroz. Nuestra receta. Elige proteina.' },
      { name: 'Noodles Teriyaki', price: '5,50', desc: 'Fideos con salsa teriyaki, sesamo y cebolleta. Suave y adictivo.' },
      { name: 'Wok Anticuchero',  price: '7,00', desc: 'Secreto iberico marinado con pasta de aji panca peruano. Arroz o fideos.' },
    ],
  },
  pokebowls: {
    label: 'Pokebowls',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Classic', price: '7,85', desc: 'Salmon, aguacate, edamame, zanahoria, maiz, arroz de sushi.' },
      { name: 'Tuna',    price: '8,50', desc: 'Atun fresco, mango, pepino, cebolla morada, espinacas, arroz.' },
      { name: 'Pollo',   price: '7,85', desc: 'Pollo teriyaki, aguacate, edamame, zanahoria, arroz.' },
      { name: 'Veggie',  price: '7,50', desc: 'Tofu marinado, aguacate, edamame, pepino, zanahoria, arroz.' },
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
      { name: 'Gyozas (6 ud)',        price: '3,95', desc: 'Empanadillas japonesas de cerdo y col, vapor y plancha. Con salsa gyoza.' },
      { name: 'Edamame',              price: '2,50', desc: 'Vainas de soja al vapor con sal en escamas.' },
      { name: 'Gyozas Veggie (6 ud)', price: '3,95', desc: 'Empanadillas de tofu, seta y col. Sin carne.' },
      { name: 'Tempura Mix',          price: '5,50', desc: 'Gamba y verdura en tempura ligera con salsa ponzu.' },
    ],
  },
  combos: {
    label: 'Combos',
    img: 'img/dishes/placeholder.svg',
    items: [
      { name: 'Bao + Bubble Tea', price: '8,50',  desc: 'Elige 1 bao y 1 bubble tea.' },
      { name: 'Roll + Wok',       price: '12,00', desc: 'Elige 1 roll y 1 wok. El almuerzo completo.' },
      { name: 'Pato Bokken',      price: '20,00', desc: 'Pato Bokken + 2 Crispy Baos + 1 Bubble Tea.' },
      { name: 'Familia',          price: '28,00', desc: '2 Rolls + 2 Woks + 2 Bubble Teas. Para dos personas.' },
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
