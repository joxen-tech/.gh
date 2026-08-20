/* ==========================================================================
   dryrobe® — CART ENGINE
   Real, persistent, vanilla-JS commerce state. Survives page refresh and
   navigation between pages via localStorage. Every page includes this file
   (after icons.js + products-data.js) and gets: cart, wishlist, recently
   viewed, toasts, and the cart drawer — all wired automatically.
   ========================================================================== */
const LS_CART = "dryrobe_cart_v1";
const LS_WISHLIST = "dryrobe_wishlist_v1";
const LS_RECENT = "dryrobe_recent_v1";
const SHIPPING_FLAT = 30; // GHS — free over threshold
const FREE_SHIPPING_THRESHOLD = 500;

function lsGet(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v || fallback; }
  catch (e) { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable — fail silently */ }
}

const Cart = {
  items: lsGet(LS_CART, []),        // { id, size, color, qty }
  wishlist: lsGet(LS_WISHLIST, []), // [productId]
  recent: lsGet(LS_RECENT, []),     // [productId] most-recent-first

  persist() { lsSet(LS_CART, this.items); },
  persistWishlist() { lsSet(LS_WISHLIST, this.wishlist); },
  persistRecent() { lsSet(LS_RECENT, this.recent); },

  count() { return this.items.reduce((a, b) => a + b.qty, 0); },
  subtotal() {
    return this.items.reduce((sum, it) => {
      const p = getProduct(it.id);
      return p ? sum + p.price * it.qty : sum;
    }, 0);
  },
  shipping() { const s = this.subtotal(); return s === 0 || s >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT; },
  total() { return this.subtotal() + this.shipping(); },

  add(id, size, color, qty, opts) {
    qty = qty || 1;
    const p = getProduct(id);
    if (!p) return;
    size = size || p.sizes[0];
    color = color || (p.colors[0] && p.colors[0].name);
    const i = this.items.findIndex((x) => x.id === id && x.size === size && x.color === color);
    if (i >= 0) this.items[i].qty += qty;
    else this.items.push({ id, size, color, qty });
    this.persist();
    renderAll();
    if (!opts || opts.openDrawer !== false) CartDrawer.open();
    toast(ICON.check, "Added to bag — " + p.name);
  },
  updateQty(id, size, color, qty) {
    const i = this.items.findIndex((x) => x.id === id && x.size === size && x.color === color);
    if (i < 0) return;
    if (qty <= 0) { this.items.splice(i, 1); }
    else { this.items[i].qty = qty; }
    this.persist();
    renderAll();
  },
  remove(id, size, color) {
    this.items = this.items.filter((x) => !(x.id === id && x.size === size && x.color === color));
    this.persist();
    renderAll();
    toast(ICON.check, "Removed from bag");
  },
  clear() { this.items = []; this.persist(); renderAll(); },

  toggleWishlist(id) {
    const p = getProduct(id);
    const i = this.wishlist.indexOf(id);
    if (i >= 0) { this.wishlist.splice(i, 1); toast(ICON.heart, "Removed from wishlist"); }
    else { this.wishlist.push(id); toast(ICON.heart, "Added to wishlist" + (p ? " — " + p.name : "")); }
    this.persistWishlist();
    renderAll();
  },
  isWishlisted(id) { return this.wishlist.includes(id); },

  addRecent(id) {
    this.recent = this.recent.filter((x) => x !== id);
    this.recent.unshift(id);
    this.recent = this.recent.slice(0, 12);
    this.persistRecent();
  }
};

/* ---------------- toast system ---------------- */
function toast(iconSvg, message) {
  let stack = document.getElementById("toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "toast-stack";
    document.body.appendChild(stack);
  }
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = '<span class="toast-icon">' + iconSvg + '</span><span>' + message + '</span>';
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 2400);
}

/* ---------------- product card renderer (shared across all pages) ---------------- */
function renderProductMedia(p, opts) {
  opts = opts || {};
  const cls = opts.className || "img-wrap";
  if (p.photo) {
    const second = p.gallery && p.gallery[1] ? p.gallery[1] : p.image;
    return '<div class="' + cls + '"><img class="primary" src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
      '<img class="secondary" src="' + second + '" alt="" loading="lazy"></div>';
  }
  const icon = ICON[productGarmentIcon(p)] || ICON.garmentTee;
  return '<div class="' + cls + '" style="background:' + placeholderGradient(p) + '"><div class="ph-card">' + icon + '</div></div>';
}
function placeholderGradient(p) {
  const c = p.colors && p.colors[0] ? p.colors[0].hex : "#222";
  return "linear-gradient(155deg," + shade(c, 18) + "," + shade(c, -55) + ")";
}
function shade(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return "rgb(" + r + "," + g + "," + b + ")";
}

function buildProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";
  const wishlisted = Cart.isWishlisted(p.id);
  const badge = p.badge ? '<span class="card-badge">' + p.badge + '</span>' : (p.stock === 0 ? '<span class="card-badge" style="background:#404040;">SOLD OUT</span>' : "");
  card.innerHTML =
    '<a class="card-media-link" href="product.html?id=' + p.id + '" style="position:relative;display:block;">' +
      badge +
      '<button class="card-wish' + (wishlisted ? " liked" : "") + '" aria-label="wishlist" data-wish="' + p.id + '">' + ICON.heart + '</button>' +
      renderProductMedia(p) +
    '</a>' +
    '<div class="card-body">' +
      '<div class="p-cat">' + p.gender + ' · ' + p.category + '</div>' +
      '<a href="product.html?id=' + p.id + '"><div class="p-name">' + p.name + '</div></a>' +
      '<div class="p-price">GHS ' + p.price + '</div>' +
      '<div class="card-quickadd-wrap">' +
        '<button class="quickadd-btn" data-quickadd="' + p.id + '">' + (p.stock === 0 ? "Notify Me" : "Quick Add") + ' ' + ICON.plus + '</button>' +
        '<div class="quickadd-pop" id="qa-' + p.id + '"></div>' +
      '</div>' +
    '</div>';

  card.querySelector('[data-wish]').addEventListener("click", (e) => {
    e.preventDefault(); e.stopPropagation();
    Cart.toggleWishlist(p.id);
  });
  const qaBtn = card.querySelector('[data-quickadd]');
  qaBtn.addEventListener("click", (e) => {
    e.preventDefault(); e.stopPropagation();
    if (p.stock === 0) { toast(ICON.check, "We'll email you when " + p.name + " restocks (demo)"); return; }
    openQuickAdd(p, card.querySelector("#qa-" + p.id), qaBtn);
  });
  return card;
}

function openQuickAdd(p, popEl, anchorBtn) {
  document.querySelectorAll(".quickadd-pop.open").forEach((el) => { if (el !== popEl) el.classList.remove("open"); });
  if (popEl.classList.contains("open")) { popEl.classList.remove("open"); return; }
  const needsVariant = p.sizes.length > 1 || (p.sizes[0] && p.sizes[0] !== "One Size");
  if (!needsVariant) {
    Cart.add(p.id, p.sizes[0], p.colors[0] && p.colors[0].name);
    return;
  }
  popEl.innerHTML = '<p>Select size</p><div class="quickadd-sizes"></div>';
  const row = popEl.querySelector(".quickadd-sizes");
  p.sizes.forEach((s) => {
    const b = document.createElement("button");
    b.className = "qa-size-btn"; b.type = "button"; b.textContent = s;
    b.addEventListener("click", () => {
      Cart.add(p.id, s, p.colors[0] && p.colors[0].name);
      popEl.classList.remove("open");
    });
    row.appendChild(b);
  });
  popEl.classList.add("open");
}
document.addEventListener("click", (e) => {
  if (!e.target.closest(".card-quickadd-wrap")) {
    document.querySelectorAll(".quickadd-pop.open").forEach((el) => el.classList.remove("open"));
  }
});

/* ---------------- horizontal rail: build + drag/swipe + arrows ---------------- */
function buildRail(containerEl, products, opts) {
  opts = opts || {};
  containerEl.innerHTML = "";
  if (products.length === 0) {
    containerEl.innerHTML = '<p style="color:#666;font-size:0.85rem;">Nothing to show yet.</p>';
    return;
  }
  products.forEach((p) => containerEl.appendChild(buildProductCard(p)));
  enableRailDrag(containerEl);
}
function enableRailDrag(track) {
  let isDown = false, startX, scrollLeft, moved = false;
  track.addEventListener("mousedown", (e) => {
    isDown = true; moved = false; track.classList.add("dragging");
    startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
  });
  window.addEventListener("mouseup", () => { isDown = false; track.classList.remove("dragging"); });
  track.addEventListener("mouseleave", () => { isDown = false; track.classList.remove("dragging"); });
  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) moved = true;
    track.scrollLeft = scrollLeft - walk;
  });
  // prevent link-click firing right after a drag
  track.addEventListener("click", (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
}
function wireRailArrows(prevId, nextId, trackId, amount) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId), next = document.getElementById(nextId);
  if (prev) { prev.innerHTML = ICON.chevronLeft; prev.addEventListener("click", () => track.scrollBy({ left: -(amount || 600), behavior: "smooth" })); }
  if (next) { next.innerHTML = ICON.chevronRight; next.addEventListener("click", () => track.scrollBy({ left: amount || 600, behavior: "smooth" })); }
}

/* ---------------- cart drawer ---------------- */
const CartDrawer = {
  open() {
    document.getElementById("cart-overlay").classList.add("open");
    document.getElementById("cart-drawer").classList.add("open");
  },
  close() {
    document.getElementById("cart-overlay").classList.remove("open");
    document.getElementById("cart-drawer").classList.remove("open");
  }
};

function renderCartDrawer() {
  const body = document.getElementById("cart-body");
  const footer = document.getElementById("cart-footer");
  const ctlWrap = document.getElementById("cart-complete-look");
  if (!body) return;
  body.innerHTML = "";
  if (Cart.items.length === 0) {
    body.innerHTML = '<div class="cart-empty">' + ICON.cartLg + '<p>Your bag is empty</p></div>';
    footer.style.display = "none";
    if (ctlWrap) ctlWrap.style.display = "none";
    return;
  }
  Cart.items.forEach((it) => {
    const p = getProduct(it.id);
    if (!p) return;
    const row = document.createElement("div");
    row.className = "cart-item";
    const thumb = p.photo ? '<img src="' + p.image + '" alt="' + p.name + '">' : ICON[productGarmentIcon(p)];
    row.innerHTML =
      '<div class="ci-thumb">' + thumb + '</div>' +
      '<div class="ci-info">' +
        '<p class="ci-name">' + p.name + '</p>' +
        '<p class="ci-meta">Size ' + it.size + ' · ' + it.color + '</p>' +
        '<div class="ci-row2">' +
          '<div class="qty-stepper"><button data-dec>' + ICON.minus + '</button><span>' + it.qty + '</span><button data-inc>' + ICON.plus + '</button></div>' +
          '<span class="ci-price">GHS ' + (p.price * it.qty) + '</span>' +
        '</div>' +
      '</div>' +
      '<button class="remove-btn" aria-label="remove">' + ICON.trash + '</button>';
    row.querySelector("[data-inc]").addEventListener("click", () => Cart.updateQty(it.id, it.size, it.color, it.qty + 1));
    row.querySelector("[data-dec]").addEventListener("click", () => Cart.updateQty(it.id, it.size, it.color, it.qty - 1));
    row.querySelector(".remove-btn").addEventListener("click", () => Cart.remove(it.id, it.size, it.color));
    body.appendChild(row);
  });
  footer.style.display = "block";
  document.getElementById("cart-subtotal").textContent = "GHS " + Cart.subtotal();
  const shipVal = Cart.shipping();
  document.getElementById("cart-shipping").textContent = shipVal === 0 ? "Free" : "GHS " + shipVal;
  document.getElementById("cart-total").textContent = "GHS " + Cart.total();

  if (ctlWrap) {
    const lastItem = getProduct(Cart.items[Cart.items.length - 1].id);
    const rel = lastItem ? getRelated(lastItem, 6) : [];
    if (rel.length) {
      ctlWrap.style.display = "block";
      const track = document.getElementById("ctl-track");
      track.innerHTML = "";
      rel.forEach((rp) => {
        const el = document.createElement("div");
        el.className = "ctl-item";
        const thumb = rp.photo ? '<img src="' + rp.image + '" alt="">' : ICON[productGarmentIcon(rp)];
        el.innerHTML = '<div class="ctl-thumb">' + thumb + '</div><div class="ctl-name">' + rp.name + '</div><button class="ctl-add">+ Add</button>';
        el.querySelector(".ctl-add").addEventListener("click", () => Cart.add(rp.id, rp.sizes[0], rp.colors[0] && rp.colors[0].name, 1, { openDrawer: false }));
        track.appendChild(el);
      });
    } else { ctlWrap.style.display = "none"; }
  }
}

/* ---------------- global render + badge counts (called after any state change) ---------------- */
function renderAll() {
  const cc = document.getElementById("cart-count");
  const wc = document.getElementById("wishlist-count");
  if (cc) cc.textContent = Cart.count();
  if (wc) wc.textContent = Cart.wishlist.length;
  renderCartDrawer();
  document.querySelectorAll("[data-wish]").forEach((btn) => {
    btn.classList.toggle("liked", Cart.isWishlisted(btn.getAttribute("data-wish")));
  });
  if (typeof onCartRender === "function") onCartRender();
}
