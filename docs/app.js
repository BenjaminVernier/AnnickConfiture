/* ============================================================
   La Confiture d'Annick — mockup boutique (static, no backend)
   Fictional brand · demo only · no real transactions
   ============================================================ */

const PRODUCTS = [
  { id: "fraise",    name: "Fraise des bois",         fruit: "Fraise",  price: 9.5,  color: "#c0392b", desc: "Fraises des bois et gariguette, une pointe de vanille de Madagascar." },
  { id: "abricot",   name: "Abricot & romarin",       fruit: "Abricot", price: 8.9,  color: "#e08a2b", desc: "Abricots du Roussillon, brin de romarin cueilli à la main." },
  { id: "myrtille",  name: "Myrtille sauvage",         fruit: "Myrtille",price: 10.5, color: "#4b3b7a", desc: "Myrtilles sauvages des Vosges, à peine sucrées." },
  { id: "figue",     name: "Figue de Solliès",         fruit: "Figue",   price: 10.9, color: "#6d2b6b", desc: "Figues noires de Solliès et zeste d'orange confit." },
  { id: "framboise", name: "Framboise & violette",     fruit: "Framboise",price: 9.9, color: "#b5316f", desc: "Framboises de Dordogne relevées d'une fleur de violette." },
  { id: "mirabelle", name: "Mirabelle de Lorraine",    fruit: "Mirabelle",price: 8.9, color: "#d9a52b", desc: "Les mirabelles dorées du jardin d'Annick." },
  { id: "cassis",    name: "Gelée de cassis",          fruit: "Cassis",  price: 9.9,  color: "#3a1f4d", desc: "Gelée limpide de cassis noir de Bourgogne." },
  { id: "orange",    name: "Orange amère & gingembre", fruit: "Agrume",  price: 8.5,  color: "#e67e22", desc: "Oranges amères de Séville et gingembre frais." },
];
const BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

/* ---------- helpers ---------- */
function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const t = pct < 0 ? 0 : 255, p = Math.abs(pct) / 100;
  r = Math.round((t - r) * p) + r; g = Math.round((t - g) * p) + g; b = Math.round((t - b) * p) + b;
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
const euro = (n) => n.toFixed(2).replace(".", ",") + " €";

/* ---------- the jar illustration ---------- */
function jarSVG(color, w = 92) {
  const id = "jm" + color.slice(1);
  const h = Math.round((w * 120) / 80);
  return `<svg viewBox="0 0 80 120" width="${w}" height="${h}" role="img" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(color, 10)}"/><stop offset="1" stop-color="${shade(color, -20)}"/>
    </linearGradient></defs>
    <rect x="14" y="30" width="52" height="84" rx="11" fill="#fffdf9" stroke="#e4d7c3" stroke-width="1.2"/>
    <path d="M16 49 h48 v54 a9 9 0 0 1 -9 9 h-30 a9 9 0 0 1 -9 -9 z" fill="url(#${id})"/>
    <rect x="16" y="46" width="48" height="5" rx="2.5" fill="${shade(color, 20)}"/>
    <rect x="21" y="40" width="5" height="64" rx="2.5" fill="#ffffff" opacity="0.22"/>
    <rect x="12" y="26" width="56" height="9" rx="4" fill="#efe3cf" stroke="#e4d7c3" stroke-width="1"/>
    <path d="M20 27 q20 -17 40 0 q-5 -11 -20 -11 q-15 0 -20 11z" fill="#f3e9d8" stroke="#e4d7c3" stroke-width="1"/>
    <ellipse cx="40" cy="27" rx="22" ry="4.6" fill="none" stroke="${color}" stroke-width="1.4" opacity="0.55"/>
    <rect x="23" y="70" width="34" height="27" rx="2" fill="#fffdf9" stroke="#e4d7c3" stroke-width="0.8"/>
    <text x="40" y="85" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="13" font-style="italic" fill="#5b2a43">A</text>
    <rect x="31" y="90" width="18" height="1.4" fill="#b0863b"/>
  </svg>`;
}

/* ---------- render: products ---------- */
function renderProducts() {
  document.getElementById("productGrid").innerHTML = PRODUCTS.map((p) => `
    <article class="product">
      <div class="product-jar">${jarSVG(p.color, 104)}</div>
      <div class="product-fruit">${p.fruit}</div>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-foot">
        <span class="product-price">${euro(p.price)}</span>
        <button class="add-btn" data-add="${p.id}">Ajouter</button>
      </div>
    </article>`).join("");

  document.getElementById("heroJars").innerHTML =
    ["#b5316f", "#d9a52b", "#4b3b7a", "#c0392b"].map((c, i) => jarSVG(c, 118 - i * 8)).join("");
}

/* ---------- render: values & reviews ---------- */
const VALUES = [
  { t: "Cuisson au chaudron", d: "Une cuisson lente, par petites quantités, pour préserver le fruit.", i: "M4 10h16v2a8 8 0 0 1-16 0zM7 10V7m5 3V6m5 4V7" },
  { t: "Fruits de saison", d: "Cueillis à maturité dans les vergers français, jamais ailleurs.", i: "M12 20a7 7 0 0 1-2-13c2-3 6-3 8 0a7 7 0 0 1-6 13zM12 7V3" },
  { t: "Rien à cacher", d: "70 % de fruits, sucre de canne, un soupçon de patience. C'est tout.", i: "M12 21s-7-4.6-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.4-7 10-7 10z" },
  { t: "Pots consignés", d: "Rapportez vos pots : nous les reprenons et les réutilisons.", i: "M7 7l-3 5h4m9-5l3 5h-4M9 17l3 4 3-4M6 12a6 6 0 0 0 12 0" },
];
function renderValues() {
  document.getElementById("values").innerHTML = VALUES.map((v) => `
    <div class="value">
      <span class="value-ico"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="${v.i}"/></svg></span>
      <h3>${v.t}</h3><p>${v.d}</p>
    </div>`).join("");
}
const AVIS = [
  { q: "La mirabelle a un goût d'été qu'on croyait perdu. On en reprend chaque matin.", a: "Camille", c: "Lyon" },
  { q: "Offertes à des amis parisiens difficiles : conquis. La figue, surtout.", a: "Thomas", c: "Nantes" },
  { q: "Enfin une confiture où l'on sent le fruit avant le sucre.", a: "Awa", c: "Bordeaux" },
];
function renderAvis() {
  document.getElementById("avisGrid").innerHTML = AVIS.map((r) => `
    <div class="avis-card">
      <div class="avis-stars">★★★★★</div>
      <p class="avis-quote">« ${r.q} »</p>
      <div class="avis-author"><strong>${r.a}</strong> · ${r.c}</div>
    </div>`).join("");
}

/* ---------- cart ---------- */
let cart = loadCart();
function loadCart() { try { return JSON.parse(localStorage.getItem("mj-cart")) || {}; } catch { return {}; } }
function saveCart() { try { localStorage.setItem("mj-cart", JSON.stringify(cart)); } catch {} }

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart(); renderCart(); bumpCount();
  toast(`${BY_ID[id].name} ajoutée au panier`);
}
function setQty(id, q) {
  if (q <= 0) delete cart[id]; else cart[id] = q;
  saveCart(); renderCart();
}
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() { return Object.entries(cart).reduce((s, [id, q]) => s + BY_ID[id].price * q, 0); }

function bumpCount() {
  const el = document.getElementById("cartCount");
  el.textContent = cartCount();
  el.animate([{ transform: "scale(1.5)" }, { transform: "scale(1)" }], { duration: 260 });
}

function renderCart() {
  document.getElementById("cartCount").textContent = cartCount();
  const host = document.getElementById("cartItems");
  const ids = Object.keys(cart);
  if (!ids.length) {
    host.innerHTML = `<div class="cart-empty">Votre panier est vide.<br>Il attend une belle confiture.</div>`;
  } else {
    host.innerHTML = ids.map((id) => {
      const p = BY_ID[id], q = cart[id];
      return `<div class="cart-line">
        <div class="cart-line-jar">${jarSVG(p.color, 40)}</div>
        <div class="cart-line-info">
          <div class="cart-line-name">${p.name}</div>
          <div class="cart-line-price">${euro(p.price)} · <button class="cart-line-remove" data-remove="${id}">retirer</button></div>
        </div>
        <div class="qty">
          <button data-dec="${id}" aria-label="Moins">−</button><span>${q}</span><button data-inc="${id}" aria-label="Plus">+</button>
        </div>
      </div>`;
    }).join("");
  }
  document.getElementById("cartTotal").innerHTML = euro(cartTotal());
}

function openCart() {
  document.getElementById("cartOverlay").hidden = false;
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  setTimeout(() => (document.getElementById("cartOverlay").hidden = true), 320);
}

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(() => (t.hidden = true), 300); }, 2600);
}

/* ---------- events ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-add],[data-inc],[data-dec],[data-remove]");
  if (!t) return;
  if (t.dataset.add) addToCart(t.dataset.add);
  else if (t.dataset.inc) setQty(t.dataset.inc, cart[t.dataset.inc] + 1);
  else if (t.dataset.dec) setQty(t.dataset.dec, cart[t.dataset.dec] - 1);
  else if (t.dataset.remove) setQty(t.dataset.remove, 0);
});
document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (!cartCount()) { toast("Votre panier est vide."); return; }
  cart = {}; saveCart(); renderCart();
  closeCart();
  toast("Merci ! Ceci est une maquette — aucune commande réelle n'a été passée.");
});
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.getElementById("newsletterNote");
  note.hidden = false;
  note.textContent = "Merci ! (Démonstration — aucune adresse n'est réellement enregistrée.)";
  document.getElementById("newsletterEmail").value = "";
});

/* ---------- init ---------- */
document.documentElement.style.scrollBehavior = "smooth";
renderProducts();
renderValues();
renderAvis();
renderCart();
