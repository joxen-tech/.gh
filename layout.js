/* ==========================================================================
   dryrobe® — LAYOUT ENGINE
   Injects the navbar, mobile nav, footer, cart drawer and search overlay
   into every page (so none of that markup is hand-duplicated 16 times),
   then wires up their interactions. Include after icons.js, products-data.js
   and cart.js. Requires <div id="site-header"></div> and
   <div id="site-footer"></div> placeholders in the page HTML.
   ========================================================================== */

const NAV_LINKS = [
  { label: "Men", href: "men.html", mega: "Men" },
  { label: "Women", href: "women.html", mega: "Women" },
  { label: "Kids", href: "kids.html", mega: "Kids" },
  { label: "New Arrivals", href: "new-arrivals.html" },
  { label: "Collections", href: "collections.html" },
  { label: "Lookbook", href: "lookbook.html" }
];
const MEGA_CATEGORIES = {
  Men: ["T-Shirts", "Shirts", "Hoodies", "Jackets", "Trousers", "Shorts", "Accessories"],
  Women: ["Dresses", "Tops", "Blouses", "Skirts", "Jeans", "Trousers", "Jackets", "Knitwear"],
  Kids: ["Boys", "Girls", "T-Shirts", "Hoodies", "Sets", "Shorts", "Dresses", "Jackets"]
};

const NAVBAR_HTML = `
<div id="navbar-wrap">
  <header id="navbar">
    <nav>
      <a href="index.html" class="logo-link font-archivo">dryrobe<sup>&reg;</sup></a>
      <ul id="nav-links">${NAV_LINKS.map((l) => `<li data-mega="${l.mega || ""}"><a href="${l.href}">${l.label}</a></li>`).join("")}</ul>
      <div class="nav-icons">
        <button aria-label="search" id="icon-search"></button>
        <button aria-label="wishlist" id="icon-wishlist" style="position:relative;"><span id="icon-wishlist-slot"></span><span id="wishlist-count">0</span></button>
        <button aria-label="cart" id="icon-cart" style="position:relative;"><span id="icon-cart-slot"></span><span id="cart-count">0</span></button>
        <button aria-label="menu" id="icon-mobile-menu" style="display:none;"></button>
      </div>
    </nav>
    <div id="mega-menu"><div class="mega-inner"><div><h3 class="font-archivo" id="mega-title"></h3><ul id="mega-list"></ul></div><div id="mega-menu-img"><img src="menu.jpg" alt=""></div></div></div>
  </header>
</div>

<div id="mobile-nav">
  <div class="mobile-nav-head"><a href="index.html" class="logo-link font-archivo">dryrobe<sup>&reg;</sup></a><button id="mobile-nav-close" aria-label="close menu"></button></div>
  <ul id="mobile-nav-links"></ul>
  <div class="mobile-nav-foot"><a href="cart.html" class="btn btn-outline" style="width:100%;">View Bag</a></div>
</div>

<div id="search-overlay">
  <button id="search-close" aria-label="close search"></button>
  <div class="search-inner">
    <label for="search-input">SEARCH</label>
    <input type="text" id="search-input" placeholder="What are you looking for?" autocomplete="off">
    <div id="search-results"></div>
  </div>
</div>
`;

const CART_DRAWER_HTML = `
<div id="cart-overlay"></div>
<aside id="cart-drawer">
  <div class="cart-head"><h3 class="font-archivo">Your Bag</h3><button id="cart-close" aria-label="close bag"></button></div>
  <div class="cart-body" id="cart-body"></div>
  <div class="cart-complete-look" id="cart-complete-look" style="display:none;">
    <p>Complete The Look</p>
    <div class="ctl-track" id="ctl-track"></div>
  </div>
  <div class="cart-footer" id="cart-footer" style="display:none;">
    <div class="cart-total-row"><span>Subtotal</span><span id="cart-subtotal"></span></div>
    <div class="cart-total-row"><span>Shipping</span><span id="cart-shipping"></span></div>
    <div class="cart-total-row total"><span>Total</span><span id="cart-total"><span class="note">Taxes calculated at checkout</span></span></div>
    <a href="checkout.html" class="checkout-btn">Checkout</a>
    <a href="cart.html" class="view-cart-link">View full bag</a>
  </div>
</aside>
<div id="toast-stack"></div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div>
      <a href="index.html" class="footer-brand font-archivo">dryrobe<sup>&reg;</sup></a>
      <p class="footer-tag">Engineered streetwear and everyday fashion. Built for the cold, made for the brave. Embrace the technology.</p>
      <div class="footer-social">
        <a href="#" aria-label="instagram">${ICON.instagram}</a>
      </div>
    </div>
    <div class="footer-cols">
      <div><h4>SHOP</h4><ul>
        <li><a href="men.html">Men</a></li><li><a href="women.html">Women</a></li><li><a href="kids.html">Kids</a></li>
        <li><a href="new-arrivals.html">New Arrivals</a></li><li><a href="collections.html">Collections</a></li><li><a href="lookbook.html">Lookbook</a></li>
      </ul></div>
      <div><h4>SUPPORT</h4><ul>
        <li><a href="faq.html">FAQ</a></li><li><a href="contact.html">Contact Us</a></li><li><a href="shipping-returns.html">Shipping & Returns</a></li>
        <li><a href="cart.html">Your Bag</a></li>
      </ul></div>
      <div><h4>COMPANY</h4><ul>
        <li><a href="about.html">About Us</a></li><li><a href="privacy-policy.html">Privacy Policy</a></li><li><a href="terms.html">Terms & Conditions</a></li>
      </ul></div>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; 2026 dryrobe&reg;. All rights reserved.
    <div class="legal-links"><a href="privacy-policy.html">Privacy</a><a href="terms.html">Terms</a><a href="shipping-returns.html">Shipping & Returns</a><a href="faq.html">FAQ</a></div>
  </div>
</footer>
`;

function injectLayout() {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (header) header.outerHTML = NAVBAR_HTML;
  document.body.insertAdjacentHTML("beforeend", CART_DRAWER_HTML);
  if (footer) footer.outerHTML = FOOTER_HTML;

  document.getElementById("icon-search").innerHTML = ICON.search;
  document.getElementById("icon-wishlist-slot").innerHTML = ICON.heart;
  document.getElementById("icon-cart-slot").innerHTML = ICON.cart;
  document.getElementById("icon-mobile-menu").innerHTML = ICON.filter.replace("filter", "");
  document.getElementById("icon-mobile-menu").innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>';
  document.getElementById("mobile-nav-close").innerHTML = ICON.x;
  document.getElementById("search-close").innerHTML = ICON.x;
  document.getElementById("cart-close").innerHTML = ICON.x;

  // highlight current page in nav
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-links li a").forEach((a) => { if (a.getAttribute("href") === path) a.parentElement.classList.add("active"); });

  wireMegaMenu();
  wireMobileNav();
  wireSearch();
  wireCartIcons();
  renderAll();
}

/* ---------------- mega menu (desktop hover) ---------------- */
function wireMegaMenu() {
  const wrap = document.getElementById("navbar-wrap");
  const menu = document.getElementById("mega-menu");
  document.querySelectorAll("#nav-links li[data-mega]").forEach((li) => {
    const gender = li.getAttribute("data-mega");
    if (!gender || !MEGA_CATEGORIES[gender]) return;
    li.addEventListener("mouseenter", () => openMega(gender));
  });
  wrap.addEventListener("mouseleave", () => closeMega());
  function openMega(gender) {
    document.getElementById("mega-title").textContent = gender;
    const list = document.getElementById("mega-list");
    list.innerHTML = "";
    MEGA_CATEGORIES[gender].forEach((cat) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = cat;
      btn.addEventListener("click", () => { location.href = "shop.html?gender=" + encodeURIComponent(gender) + "&category=" + encodeURIComponent(cat); });
      li.appendChild(btn);
      list.appendChild(li);
    });
    menu.classList.add("open");
  }
  function closeMega() { menu.classList.remove("open"); }
}

/* ---------------- mobile nav ---------------- */
function wireMobileNav() {
  const list = document.getElementById("mobile-nav-links");
  list.innerHTML = NAV_LINKS.map((l) => {
    if (l.mega && MEGA_CATEGORIES[l.mega]) {
      const subs = MEGA_CATEGORIES[l.mega].map((c) => `<li class="mn-sub"><a href="shop.html?gender=${encodeURIComponent(l.mega)}&category=${encodeURIComponent(c)}">${c}</a></li>`).join("");
      return `<li class="mn-parent"><a href="${l.href}">${l.label}</a></li>${subs}`;
    }
    return `<li><a href="${l.href}">${l.label}</a></li>`;
  }).join("") + `<li style="margin-top:1rem;border-top:1px solid #232323;padding-top:1rem;"><a href="wishlist.html">Wishlist</a></li>`;

  const mnav = document.getElementById("mobile-nav");
  document.getElementById("icon-mobile-menu").addEventListener("click", () => mnav.classList.add("open"));
  document.getElementById("mobile-nav-close").addEventListener("click", () => mnav.classList.remove("open"));
}

/* ---------------- search overlay ---------------- */
function wireSearch() {
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  document.getElementById("icon-search").addEventListener("click", () => {
    overlay.classList.add("open");
    setTimeout(() => input.focus(), 350);
  });
  document.getElementById("search-close").addEventListener("click", () => overlay.classList.remove("open"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") overlay.classList.remove("open"); });
  input.addEventListener("input", () => {
    const matches = searchProducts(input.value);
    if (!input.value.trim()) { results.innerHTML = ""; return; }
    if (matches.length === 0) { results.innerHTML = '<p class="search-empty">No results for &ldquo;' + input.value + '&rdquo;. Try a category like &ldquo;hoodie&rdquo; or &ldquo;dress&rdquo;.</p>'; return; }
    results.innerHTML = "";
    matches.slice(0, 10).forEach((p) => {
      const row = document.createElement("a");
      row.href = "product.html?id=" + p.id;
      row.className = "search-result-row";
      const thumb = p.photo ? '<img src="' + p.image + '" alt="">' : ICON[productGarmentIcon(p)];
      row.innerHTML = '<div class="srr-thumb">' + thumb + '</div><div><div class="srr-name">' + p.name + '</div><div class="srr-cat">' + p.gender + ' &middot; ' + p.category + '</div></div><div class="srr-price">GHS ' + p.price + '</div>';
      results.appendChild(row);
    });
  });
}

/* ---------------- cart / wishlist icon wiring ---------------- */
function wireCartIcons() {
  document.getElementById("icon-cart").addEventListener("click", () => CartDrawer.open());
  document.getElementById("cart-close").addEventListener("click", () => CartDrawer.close());
  document.getElementById("cart-overlay").addEventListener("click", () => CartDrawer.close());
  document.getElementById("icon-wishlist").addEventListener("click", () => { location.href = "wishlist.html"; });
}

/* ---------------- scroll reveal (IntersectionObserver, staggered) ---------------- */
function initScrollReveal(root) {
  root = root || document;
  const els = root.querySelectorAll(".reveal:not(.observed)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el, i) => {
    el.classList.add("observed");
    el.style.transitionDelay = (i % 8) * 60 + "ms";
    io.observe(el);
  });
}

/* ---------------- magnetic buttons (major CTAs only) ---------------- */
function initMagnetic() {
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = "translate(" + x * 0.25 + "px," + y * 0.35 + "px)";
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
  });
}

/* ---------------- respect reduced motion ---------------- */
const PREFERS_REDUCED_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", injectLayout);
