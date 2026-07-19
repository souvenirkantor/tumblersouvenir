/**
* Template Name: Strive
* Template URL: https://bootstrapmade.com/strive-bootstrap-business-template/
* Updated: Sep 20 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      // If page is loaded with a filter hash, trigger the filter
      if (window.location.hash && window.location.hash.startsWith('#filter-')) {
        let activeFilter = '.' + window.location.hash.substring(1);
        if (window.location.hash === '#filter-all' || window.location.hash === '#filter-semua') {
          activeFilter = '*';
        }
        let filterButton = isotopeItem.querySelector(`.isotope-filters li[data-filter="${activeFilter}"]`);
        if (filterButton) {
          filterButton.click();
        }
      }
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  function handleHashScroll() {
    if (window.location.hash) {
      let hash = window.location.hash;
      let targetElement = null;

      if (hash.startsWith('#filter-')) {
        targetElement = document.querySelector('#katalog-produk');
      } else {
        try {
          targetElement = document.querySelector(hash);
        } catch (e) {
          // Ignore invalid selector errors
        }
      }

      if (targetElement) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(targetElement).scrollMarginTop;
          window.scrollTo({
            top: targetElement.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  window.addEventListener('load', handleHashScroll);
  window.addEventListener('hashchange', function () {
    handleHashScroll();
    // Trigger isotope filter update on hashchange
    if (window.location.hash && window.location.hash.startsWith('#filter-')) {
      let activeFilter = '.' + window.location.hash.substring(1);
      if (window.location.hash === '#filter-all' || window.location.hash === '#filter-semua') {
        activeFilter = '*';
      }
      document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
        let filterButton = isotopeItem.querySelector(`.isotope-filters li[data-filter="${activeFilter}"]`);
        if (filterButton) {
          filterButton.click();
        }
      });
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * WhatsApp Floating Button Injection
   */
  function initWhatsAppButton() {
    if (document.querySelector('.whatsapp-float')) return;

    const waLink = document.createElement('a');
    waLink.href = 'https://wa.me/6288989643555';
    waLink.target = '_blank';
    waLink.className = 'whatsapp-float';
    waLink.setAttribute('aria-label', 'Hubungi kami via WhatsApp');
    waLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.98c-.202-.101-1.194-.588-1.378-.654-.185-.066-.32-.1-.455.101-.136.2-.524.654-.643.791-.12.137-.24.154-.442.053-1.012-.505-1.71-1.025-2.385-2.185-.182-.311.182-.288.52-.962.068-.137.034-.258-.017-.36-.051-.1-.455-1.096-.622-1.5-.162-.39-.327-.336-.454-.336-.118-.006-.254-.006-.39-.006-.136 0-.356.051-.543.254-.187.203-.714.698-.714 1.7 0 1.005.731 1.977.833 2.112.102.135 1.437 2.2 3.483 3.084.488.21 1.01.34 1.393.461.507.162.968.139 1.332.085.407-.06 1.194-.488 1.36-.96.166-.472.166-.877.117-.96-.049-.084-.183-.135-.386-.236"/></svg>`;
    document.body.appendChild(waLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppButton);
  } else {
    initWhatsAppButton();
  }

  /**
   * Intercept contact form submission and redirect to WhatsApp
   */
  document.addEventListener('submit', function (event) {
    const form = event.target;
    if (form && form.classList && form.classList.contains('php-email-form') && form.getAttribute('action') === 'forms/contact.php') {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const name = form.querySelector('[name="name"]').value;
      const email = form.querySelector('[name="email"]').value;
      const subject = form.querySelector('[name="subject"]').value;
      const message = form.querySelector('[name="message"]').value;

      const text = `Halo Vendor Tumbler Souvenir,\n\nSaya ingin mengirimkan pesan:\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\nPesan: ${message}`;
      const waUrl = `https://wa.me/6288989643555?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
    }
  }, true);

  /**
   * Dynamically load recent posts on index.html
   */
  async function loadRecentPosts() {
    const recentPostsContainer = document.querySelector('#recent-posts .row');
    if (!recentPostsContainer) return; // Only run on pages that have the recent posts section

    try {
      const response = await fetch('blog.html');
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      const articles = doc.querySelectorAll('article.card');
      if (articles.length < 3) return;

      const parseArticle = (el) => {
        return {
          img: el.querySelector('img.card-img-top')?.getAttribute('src') || '',
          imgAlt: el.querySelector('img.card-img-top')?.getAttribute('alt') || '',
          cat: el.querySelector('.badge')?.textContent || '',
          date: el.querySelector('.text-muted.small')?.textContent || '',
          title: el.querySelector('.card-title a')?.textContent || '',
          link: el.querySelector('.card-title a')?.getAttribute('href') || '#',
          excerpt: el.querySelector('.card-text')?.textContent || '',
          authorImg: el.querySelector('.card-footer img')?.getAttribute('src') || '',
          authorName: el.querySelector('.card-footer .small.text-muted')?.textContent || ''
        };
      };

      const a1 = parseArticle(articles[0]);
      const a2 = parseArticle(articles[1]);
      const a3 = parseArticle(articles[2]);

      const fixUrl = (url) => url ? url.replace(window.location.origin + '/', '') : '';

      recentPostsContainer.innerHTML = `
          <div class="col-lg-8" data-aos="fade-up" data-aos-delay="100">
            <article class="featured-post">
              <div class="featured-img">
                <img src="${fixUrl(a1.img)}" alt="${a1.imgAlt}" class="img-fluid" loading="lazy" decoding="async">
                <div class="featured-badge">Unggulan</div>
              </div>
              <div class="featured-content">
                <div class="post-header">
                  <a href="blog.html" class="category">${a1.cat}</a>
                  <span class="post-date">${a1.date}</span>
                </div>
                <h2 class="post-title">
                  <a href="${a1.link}">${a1.title}</a>
                </h2>
                <p class="post-excerpt">
                  ${a1.excerpt}
                </p>
                <div class="post-footer">
                  <div class="author-info">
                    <img src="${fixUrl(a1.authorImg)}" alt="${a1.authorName}" class="author-avatar" loading="lazy" decoding="async">
                    <div class="author-details">
                      <span class="author-name">${a1.authorName}</span>
                    </div>
                  </div>
                  <a href="${a1.link}" class="read-more">Baca Selengkapnya</a>
                </div>
              </div>
            </article>
          </div>
          <div class="col-lg-4">
            <article class="recent-post" data-aos="fade-up" data-aos-delay="200">
              <div class="recent-img">
                <img src="${fixUrl(a2.img)}" alt="${a2.imgAlt}" class="img-fluid" loading="lazy" decoding="async">
              </div>
              <div class="recent-content">
                <a href="blog.html" class="category">${a2.cat}</a>
                <h3 class="recent-title">
                  <a href="${a2.link}">${a2.title}</a>
                </h3>
                <div class="recent-meta">
                  <span class="author">Oleh ${a2.authorName}</span>
                  <span class="date">${a2.date}</span>
                </div>
              </div>
            </article>
            <article class="recent-post" data-aos="fade-up" data-aos-delay="250">
              <div class="recent-img">
                <img src="${fixUrl(a3.img)}" alt="${a3.imgAlt}" class="img-fluid" loading="lazy" decoding="async">
              </div>
              <div class="recent-content">
                <a href="blog.html" class="category">${a3.cat}</a>
                <h3 class="recent-title">
                  <a href="${a3.link}">${a3.title}</a>
                </h3>
                <div class="recent-meta">
                  <span class="author">Oleh ${a3.authorName}</span>
                  <span class="date">${a3.date}</span>
                </div>
              </div>
            </article>
          </div>
      `;
    } catch (e) {
      console.error('Error loading recent posts:', e);
    }
  }

  window.addEventListener('load', loadRecentPosts);

})();