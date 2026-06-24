// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Menu data — no item codes
const menuData = {
  baos: {
    label: 'Baos',
    items: [
      { name: 'Bao Classic',  price: '4,50', desc: 'Carne desmechada, salsa hoisin, pepino y cebolleta.' },
      { name: 'Crispy Bao',   price: '4,50', desc: 'Pollo en tempura, mayonesa wasabi, lechuga, zanahoria encurtida.' },
      { name: 'Pato Bao',     price: '6,50', desc: 'Pato confitado, pepino, salsa hoisin, cebolleta. Dos unidades.' },
      { name: 'Veggie Bao',   price: '4,50', desc: 'Tofu frito, aguacate, col lombarda, mayonesa de soja.' },
    ],
  },
  rolls: {
    label: 'Rolls',
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
    items: [
      { name: 'Pad Thai',         price: '5,50', desc: 'Fideos de arroz salteados al wok, huevo, brotes de soja, cacahuete, lima. Elige proteina.' },
      { name: 'Wok Bokken',       price: '5,50', desc: 'Verduras de temporada con salsa bokken y arroz. Nuestra receta. Elige proteina.' },
      { name: 'Noodles Teriyaki', price: '5,50', desc: 'Fideos con salsa teriyaki, sesamo y cebolleta. Suave y adictivo.' },
      { name: 'Wok Anticuchero',  price: '7,00', desc: 'Secreto iberico marinado con pasta de aji panca peruano. Arroz o fideos.' },
    ],
  },
  pokebowls: {
    label: 'Pokebowls',
    items: [
      { name: 'Classic', price: '7,85', desc: 'Salmon, aguacate, edamame, zanahoria, maiz, arroz de sushi.' },
      { name: 'Tuna',    price: '8,50', desc: 'Atun fresco, mango, pepino, cebolla morada, espinacas, arroz.' },
      { name: 'Pollo',   price: '7,85', desc: 'Pollo teriyaki, aguacate, edamame, zanahoria, arroz.' },
      { name: 'Veggie',  price: '7,50', desc: 'Tofu marinado, aguacate, edamame, pepino, zanahoria, arroz.' },
    ],
  },
  teas: {
    label: 'Bubble Teas',
    items: [
      { name: 'Te Clasico',  price: '4,50', desc: 'Te negro con leche y perlas de tapioca.' },
      { name: 'Matcha',      price: '4,75', desc: 'Te matcha con leche de soja y perlas de tapioca.' },
      { name: 'Fresa',       price: '4,50', desc: 'Fresa natural, leche de coco, perlas de tapioca.' },
      { name: '2 Teas x 8', price: '8,00', desc: 'Elige dos sabores.' },
    ],
  },
  fritos: {
    label: 'Fritos',
    items: [
      { name: 'Gyozas (6 ud)',        price: '3,95', desc: 'Empanadillas japonesas de cerdo y col, vapor y plancha. Con salsa gyoza.' },
      { name: 'Edamame',              price: '2,50', desc: 'Vainas de soja al vapor con sal en escamas.' },
      { name: 'Gyozas Veggie (6 ud)', price: '3,95', desc: 'Empanadillas de tofu, seta y col. Sin carne.' },
      { name: 'Tempura Mix',          price: '5,50', desc: 'Gamba y verdura en tempura ligera con salsa ponzu.' },
    ],
  },
  combos: {
    label: 'Combos',
    items: [
      { name: 'Bao + Bubble Tea', price: '8,50',  desc: 'Elige 1 bao y 1 bubble tea.' },
      { name: 'Roll + Wok',       price: '12,00', desc: 'Elige 1 roll y 1 wok. El almuerzo completo.' },
      { name: 'Pato Bokken',      price: '20,00', desc: 'Pato Bokken + 2 Crispy Baos + 1 Bubble Tea.' },
      { name: 'Familia',          price: '28,00', desc: '2 Rolls + 2 Woks + 2 Bubble Teas. Para dos personas.' },
    ],
  },
};

const tabsBar  = document.getElementById('tabs-bar');
const menuBody = document.getElementById('menu-body');

// Build tab buttons
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

// Render menu items for a given category (or all)
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
        row.innerHTML = `
          <span class="m-name">${item.name}</span>
          <span class="m-price">${item.price} €</span>
          <span class="m-desc">${item.desc}</span>
        `;
        section.appendChild(row);
      });

      menuBody.appendChild(section);
    });

    menuBody.style.opacity = '1';
  }, 130);
}

// Tab click handler
tabsBar.addEventListener('click', e => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  tabsBar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(btn.dataset.cat);
});

// Initial render
renderMenu('todo');
