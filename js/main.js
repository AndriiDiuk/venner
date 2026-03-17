/**
 * main.js — подключение include-блоков, заполнение данных из SITE, интерактив.
 * Подключается с defer после site-data.js
 */

(function () {
  'use strict';

  /* ================================================================
     1. INCLUDE LOADER — подгружает HTML-фрагменты в [data-include]
     ================================================================ */
  async function loadIncludes() {
    const slots = document.querySelectorAll('[data-include]');
    const promises = Array.from(slots).map(async (el) => {
      const path = el.getAttribute('data-include');
      try {
        const res = await fetch(path);
        if (!res.ok) return;
        el.innerHTML = await res.text();
      } catch (_) { /* тихий fallback */ }
    });
    await Promise.all(promises);
  }

  /* ================================================================
     2. POPULATE — заполняет DOM элементы данными из SITE
     ================================================================ */
  function populate() {
    if (typeof SITE === 'undefined') return;

    /* --- Header --- */
    setAttr('.logo', 'href', SITE.basePath || '/');
    setText('#header-cta', SITE.cta.calc.label);
    setAttr('#header-cta', 'href', prefixHref(SITE.cta.calc.href));
    setText('#header-phone', SITE.contacts.phone);
    setAttr('#header-phone', 'href', SITE.contacts.phoneHref);

    buildMainNav();
    buildExtraNav();

    /* --- Footer --- */
    const year = new Date().getFullYear();
    setText('#footer-company', SITE.company.fullName);
    setText('#footer-tagline', SITE.tagline || SITE.company.tagline);
    setHTML('#copyright', SITE.copyright.replace('{year}', year));
    setText('#footer-request', SITE.cta.request.label);
    setAttr('#footer-request', 'href', prefixHref(SITE.cta.request.href));
    setText('#footer-contact', 'Связаться');
    setAttr('#footer-contact', 'href', prefixHref('/kontakty/'));
    buildLegalLinks();
    buildFooterMessengers();
    buildFooterExtraNav();

    /* --- CTA Contact block --- */
    setAttr('#cta-calc', 'href', prefixHref(SITE.cta.calc.href));
    setText('#cta-calc', SITE.cta.calc.label);
    setText('#cta-call', 'Позвонить ' + SITE.contacts.phone);
    setAttr('#cta-call', 'href', SITE.contacts.phoneHref);
    buildMessengers('#cta-messengers');
    buildWorkFormatFAQ();

    /* --- Discuss block --- */
    setAttr('#discuss-cta', 'href', prefixHref(SITE.cta.request.href));
    document.querySelectorAll('.discuss__avatar').forEach(function (img) {
      var src = img.getAttribute('src');
      if (src && src.startsWith('/')) img.setAttribute('src', prefixHref(src));
    });

    /* --- CTA Contact quick nav --- */
    document.querySelectorAll('.cta-contact__quick-nav a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href) a.setAttribute('href', prefixHref(href));
    });

    /* --- Breadcrumbs --- */
    document.querySelectorAll('.breadcrumb a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href) a.setAttribute('href', prefixHref(href));
    });

    /* --- Forms consent --- */
    var consent = SITE.consentText.replace(/href="\//g, 'href="' + (SITE.basePath || '/'));
    document.querySelectorAll('.consent-text').forEach(function (el) {
      el.innerHTML = consent;
    });
  }

  /* ---- Nav builders ---- */
  function buildMainNav() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;
    var html = '';
    SITE.menu.forEach(function (item) {
      var hasSub = item.children && item.children.length;
      html += '<li class="nav-item' + (hasSub ? ' has-dropdown' : '') + '">';
      html += '<a href="' + prefixHref(item.href) + '">' + item.label + '</a>';
      if (hasSub) {
        html += '<ul class="dropdown">';
        item.children.forEach(function (sub) {
          html += '<li><a href="' + prefixHref(sub.href) + '">' + sub.label + '</a></li>';
        });
        html += '</ul>';
      }
      html += '</li>';
    });
    nav.innerHTML = html;
  }

  function buildExtraNav() {
    var nav = document.getElementById('extra-nav');
    if (!nav) return;
    var html = '';
    SITE.menuExtra.forEach(function (item) {
      html += '<li><a href="' + prefixHref(item.href) + '">' + item.label + '</a></li>';
    });
    nav.innerHTML = html;
  }

  function buildLegalLinks() {
    var el = document.getElementById('legal-links');
    if (!el) return;
    var html = '';
    SITE.legal.forEach(function (l) {
      html += '<li><a href="' + prefixHref(l.href) + '">' + l.label + '</a></li>';
    });
    el.innerHTML = html;
  }

  function buildFooterMessengers() {
    var el = document.getElementById('footer-messengers');
    if (!el) return;
    buildMessengers('#footer-messengers');
  }

  function buildFooterExtraNav() {
    var nav = document.getElementById('footer-extra-nav');
    if (!nav) return;
    var html = '';
    SITE.menuExtra.forEach(function (item) {
      html += '<li><a href="' + prefixHref(item.href) + '">' + item.label + '</a></li>';
    });
    nav.innerHTML = html;
  }

  function buildMessengers(selector) {
    var el = document.querySelector(selector);
    if (!el) return;
    var html = '';
    SITE.messengers.forEach(function (m) {
      html += '<a class="messenger-chip" href="' + m.href + '" target="_blank" rel="noopener" aria-label="' + m.name + '">';
      html += '<span class="ico" aria-hidden="true">' + m.icon + '</span>';
      html += '<span>' + m.name + '</span>';
      html += '</a>';
    });
    el.innerHTML = html;
  }

  function buildWorkFormatFAQ() {
    var el = document.getElementById('work-format-faq');
    if (!el) return;
    var html = '';
    SITE.workFormat.forEach(function (item, i) {
      html += '<div class="faq-item-simple' + (i === 0 ? ' open' : '') + '">';
      html += '<button class="faq-head" type="button"><span>' + item.title + '</span><span class="arrow" aria-hidden="true">&#9662;</span></button>';
      html += '<div class="faq-body"><p>' + item.text + '</p></div>';
      html += '</div>';
    });
    el.innerHTML = html;
  }

  /* ================================================================
     3. INTERACTIVE — бургер, табы, FAQ, формы, cookies
     ================================================================ */

  /* --- Burger menu --- */
  function initBurger() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open');
    });

    // close on outside click
    document.addEventListener('click', function (e) {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* --- Dropdowns (hover on desktop, click on mobile) --- */
  function initDropdowns() {
    document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth < 981) {
          e.preventDefault();
          link.parentElement.classList.toggle('dropdown-open');
        }
      });
    });
  }

  /* --- Tabs --- */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabsWrap) {
      var tabs = tabsWrap.querySelectorAll('.tab[role="tab"]');
      tabs.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var tablist = btn.parentElement;
          tablist.querySelectorAll('.tab[role="tab"]').forEach(function (t) {
            t.setAttribute('aria-selected', 'false');
          });
          btn.setAttribute('aria-selected', 'true');

          var targetId = btn.getAttribute('data-tab');
          var host = tablist.parentElement;
          var panesRoot = host.querySelector('.tabpanes') || host.parentElement.querySelector('.tabpanes');
          if (!panesRoot) return;

          panesRoot.querySelectorAll('.tabpane').forEach(function (p) {
            p.classList.remove('active');
          });
          var target = panesRoot.querySelector('#' + CSS.escape(targetId));
          if (target) target.classList.add('active');
        });
      });
    });
  }

  /* --- FAQ accordion (details + custom) --- */
  function initFAQ() {
    // Custom FAQ (non-details)
    document.addEventListener('click', function (e) {
      var head = e.target.closest('.faq-head');
      if (!head) return;
      var item = head.closest('.faq-item-simple');
      if (item) item.classList.toggle('open');
    });
  }

  /* --- Forms validation --- */
  function initForms() {
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var valid = true;

        // Check required fields
        form.querySelectorAll('[required]').forEach(function (field) {
          if (!field.value.trim()) {
            valid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });

        // Check consent checkbox
        var consent = form.querySelector('input[name="consent"]');
        if (consent && !consent.checked) {
          valid = false;
          consent.closest('.form-check').classList.add('is-invalid');
        }

        if (!valid) {
          e.preventDefault();
          var firstInvalid = form.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
        }
      });

      // Live validation on input
      form.querySelectorAll('[required]').forEach(function (field) {
        field.addEventListener('input', function () {
          if (field.value.trim()) {
            field.classList.remove('is-invalid');
          }
        });
      });
    });
  }

  /* --- Phone mask (simple) --- */
  function initPhoneMask() {
    document.querySelectorAll('input[type="tel"]').forEach(function (input) {
      input.addEventListener('input', function () {
        var val = input.value.replace(/\D/g, '');
        if (val.length === 0) { input.value = ''; return; }
        if (val[0] === '7' || val[0] === '8') {
          var formatted = '+7';
          if (val.length > 1) formatted += ' (' + val.substring(1, 4);
          if (val.length > 4) formatted += ') ' + val.substring(4, 7);
          if (val.length > 7) formatted += '-' + val.substring(7, 9);
          if (val.length > 9) formatted += '-' + val.substring(9, 11);
          input.value = formatted;
        }
      });
    });
  }

  /* --- Cookie banner --- */
  function initCookies() {
    var banner = document.querySelector('.cookie-banner');
    if (!banner) return;
    if (localStorage.getItem('cookies_accepted')) return;

    banner.style.display = '';
    var btn = banner.querySelector('.cookie-accept');
    if (btn) {
      btn.addEventListener('click', function () {
        localStorage.setItem('cookies_accepted', '1');
        banner.style.display = 'none';
      });
    }
  }

  /* --- Smooth scroll for anchor links --- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* ================================================================
     4. JSON-LD — базовая микроразметка Organization + WebSite
     ================================================================ */
  function injectJsonLd() {
    if (typeof SITE === 'undefined') return;

    var org = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.company.name,
      url: SITE.company.domain,
      logo: SITE.company.domain + '/img/logo.webp',
      telephone: SITE.contacts.phone,
      email: SITE.contacts.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.company.city,
      },
      sameAs: Object.values(SITE.socials),
    };

    var website = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.company.name,
      url: SITE.company.domain,
    };

    appendJsonLd(org);
    appendJsonLd(website);
  }

  function appendJsonLd(data) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /* ================================================================
     5. INIT
     ================================================================ */
  async function init() {
    await loadIncludes();
    populate();
    initBurger();
    initDropdowns();
    initTabs();
    initFAQ();
    initForms();
    initPhoneMask();
    initCookies();
    initSmoothScroll();
    injectJsonLd();
  }

  /* --- helpers --- */
  function prefixHref(href) {
    if (typeof SITE === 'undefined' || !href) return href;
    var base = SITE.basePath || '/';
    if (href.startsWith('/') && !href.startsWith('//')) {
      return base + href.slice(1);
    }
    return href;
  }
  function setText(sel, text) {
    var el = document.querySelector(sel);
    if (el) el.textContent = text || '';
  }
  function setHTML(sel, html) {
    var el = document.querySelector(sel);
    if (el) el.innerHTML = html || '';
  }
  function setAttr(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val || '');
  }

  /* run */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
