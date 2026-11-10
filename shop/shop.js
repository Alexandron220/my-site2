(function () {
  var products = window.DG_PRODUCTS || [];

  function money(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " р.";
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function card(p) {
    var url = "/" + p.slug;
    var c = el("article", "dg-card");

    var imgLink = el("a", "dg-card__img");
    imgLink.href = url;
    imgLink.setAttribute("aria-label", p.title);
    var img = document.createElement("img");
    img.src = p.image;
    img.alt = p.title;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", function () { img.style.visibility = "hidden"; });
    imgLink.appendChild(img);
    c.appendChild(imgLink);

    var body = el("div", "dg-card__body");
    var name = el("h3", "dg-card__name");
    var nameLink = el("a", null, p.title);
    nameLink.href = url;
    name.appendChild(nameLink);
    body.appendChild(name);
    body.appendChild(el("p", "dg-card__text", p.text));

    var prices = el("div", "dg-card__prices");
    if (p.variants) {
      p.variants.forEach(function (v) {
        var row = el("div", "dg-card__row");
        row.appendChild(el("span", null, v.label));
        row.appendChild(el("b", null, money(v.price)));
        prices.appendChild(row);
      });
    } else {
      var row = el("div", "dg-card__row");
      row.appendChild(el("span", null, "Цена"));
      var val = el("span");
      val.appendChild(el("b", null, money(p.price)));
      if (p.oldPrice) val.appendChild(el("s", null, money(p.oldPrice)));
      row.appendChild(val);
      prices.appendChild(row);
    }
    body.appendChild(prices);

    var btn = el("a", "dg-btn", "Подробнее");
    btn.href = url;
    body.appendChild(btn);
    c.appendChild(body);
    return c;
  }

  /* каталог */
  var grid = document.getElementById("dg-catalog");
  if (grid) products.forEach(function (p) { grid.appendChild(card(p)); });

  /* слайдер */
  var host = document.getElementById("dg-carousel");
  if (host) {
    var track = el("div", "dg-track");
    track.setAttribute("role", "region");
    track.setAttribute("aria-label", "Товары");
    track.tabIndex = 0;
    products.forEach(function (p) { track.appendChild(card(p)); });

    function arrow(dir) {
      var b = el("button", "dg-arrow dg-arrow--" + (dir < 0 ? "prev" : "next"));
      b.type = "button";
      b.setAttribute("aria-label", dir < 0 ? "Предыдущие товары" : "Следующие товары");
      b.innerHTML = '<svg viewBox="0 0 7.3 13" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">' +
        '<polyline points="' + (dir < 0 ? "6.8,0.5 0.8,6.5 6.8,12.5" : "0.5,0.5 6.5,6.5 0.5,12.5") + '"/></svg>';
      b.addEventListener("click", function () {
        var first = track.querySelector(".dg-card");
        var gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        track.scrollBy({ left: dir * (first.getBoundingClientRect().width + gap), behavior: "smooth" });
      });
      return b;
    }
    var prev = arrow(-1), next = arrow(1);
    host.appendChild(prev);
    host.appendChild(track);
    host.appendChild(next);

    function update() {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    }
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
    });
    update();
  }

  /* колонка покупки на странице товара */
  Array.prototype.forEach.call(document.querySelectorAll(".dg-buy"), function (box) {
    var p = products.filter(function (x) { return x.slug === box.getAttribute("data-slug"); })[0];
    if (!p) return;
    var priceEl = box.querySelector('[data-dg="price"]');
    var optsEl = box.querySelector('[data-dg="opts"]');
    var btn = box.querySelector('[data-dg="btn"]');
    var items = p.variants || [{ label: "", price: p.price, oldPrice: p.oldPrice, payUrl: p.payUrl }];
    var cur = 0;

    function render() {
      var v = items[cur];
      priceEl.textContent = "";
      priceEl.appendChild(el("span", null, money(v.price)));
      if (v.oldPrice) priceEl.appendChild(el("s", null, money(v.oldPrice)));
      var payUrl = v.payUrl || p.payUrl || window.DG_ROBOKASSA_PAY_URL;
      if (payUrl) {
        btn.href = payUrl;
        btn.textContent = "Заказать";
      } else {
        btn.href = "mailto:";
        btn.textContent = "Заказать";
        btn.removeAttribute("href");
      }
      Array.prototype.forEach.call(optsEl.children, function (c, i) { c.setAttribute("aria-pressed", i === cur ? "true" : "false"); });
    }
    if (p.variants) {
      p.variants.forEach(function (v, i) {
        var c = el("button", "dg-chip", v.label);
        c.type = "button";
        c.addEventListener("click", function () { cur = i; render(); });
        optsEl.appendChild(c);
      });
    }
    render();
  });
})();

/* галерея на странице товара: стрелки */
(function () {
  Array.prototype.forEach.call(document.querySelectorAll(".dg-gallery"), function (g) {
    var track = g.querySelector(".dg-gallery__track");
    var prev = g.querySelector(".dg-gallery__arrow--prev");
    var next = g.querySelector(".dg-gallery__arrow--next");
    if (!prev || !next) return;
    function step(dir) { track.scrollBy({ left: dir * track.clientWidth, behavior: "smooth" }); }
    function update() {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
    update();
  });
})();
