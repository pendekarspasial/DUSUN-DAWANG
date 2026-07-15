/* ==========================================================================
   ROUTER.JS — AJAX Page Router with hash scroll handling
   Supports: 3-page architecture, zero-refresh page loading,
             smooth scrolling to page section hashes, local file:/// fallback
   ========================================================================== */

let isPageTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize router interceptors
  initRouter();
  
  // Highlight active menu on load
  highlightNavbar();

  // If there's a hash on initial load, scroll to it
  if (window.location.hash) {
    setTimeout(() => {
      scrollToHash(window.location.hash);
    }, 500);
  }
});

function initRouter() {
  // If open locally via file:/// protocol, fall back to standard routing
  if (window.location.protocol === 'file:') {
    console.log('Router: Local file system detected. Falling back to standard browser routing.');
    return;
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    let href = link.getAttribute('href');
    if (!href) return;

    // Check if it is a relative local page link
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.getAttribute('target') === '_blank'
    ) {
      return; // Ignore external links, mailto, tel, etc.
    }

    // Resolve resolved target URL details
    const targetUrl = new URL(href, window.location.href);
    const targetPathname = targetUrl.pathname.substring(targetUrl.pathname.lastIndexOf('/') + 1) || 'index.html';
    const currentPathname = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1) || 'index.html';

    // Scenario A: Clicked on a hash link pointing to the CURRENT page (e.g. '#' or '#profil' or 'index.html#profil' while on index.html)
    if (targetPathname === currentPathname) {
      if (targetUrl.hash) {
        e.preventDefault();
        window.history.pushState(null, document.title, targetUrl.hash);
        scrollToHash(targetUrl.hash);
        highlightNavbar();
        closeMobileMenu();
      }
      return;
    }

    // Scenario B: Clicked on a link pointing to a DIFFERENT page (e.g. peta.html, kkn.html, index.html#profil from peta.html)
    e.preventDefault();
    navigateToPage(targetUrl.href);
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    navigateToPage(window.location.href, false); // false = do not push state to history
  });
}

function navigateToPage(url, pushState = true) {
  if (isPageTransitioning) return;

  // Clean up existing maps before page transition
  if (window.mainMap) {
    try { window.mainMap.remove(); } catch(e) { console.warn('mainMap cleanup:', e); }
    window.mainMap = null;
  }
  if (window.miniMap) {
    try { window.miniMap.remove(); } catch(e) { console.warn('miniMap cleanup:', e); }
    window.miniMap = null;
  }

  isPageTransitioning = true;
  const overlay = document.getElementById('transition-overlay');
  
  if (overlay) {
    overlay.classList.add('active');
  }

  // Fetch target page
  setTimeout(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const newContent = doc.getElementById('page-content');
        const currentContent = document.getElementById('page-content');

        if (newContent && currentContent) {
          // Replace content
          currentContent.innerHTML = newContent.innerHTML;

          // Update Document Title
          document.title = doc.title;

          // Update browser history URL
          if (pushState) {
            window.history.pushState(null, doc.title, url);
          }

          // Close preloader
          const preloader = document.getElementById('preloader');
          if (preloader) preloader.remove();

          // Highlight navbar active link
          highlightNavbar();
          closeMobileMenu();

          // Re-initialize page specific script components
          reinitializeScriptsForCurrentPage();

          // Scroll to target hash or top of page
          const targetUrl = new URL(url);
          if (targetUrl.hash) {
            setTimeout(() => {
              scrollToHash(targetUrl.hash);
            }, 100);
          } else {
            window.scrollTo(0, 0);
          }
        }
      })
      .catch(err => {
        console.error('Failed to load page dynamically:', err);
        window.location.href = url;
      })
      .finally(() => {
        setTimeout(() => {
          if (overlay) {
            overlay.classList.remove('active');
          }
          isPageTransitioning = false;
        }, 500);
      });
  }, 350);
}

function scrollToHash(hash) {
  const targetId = hash.substring(1);
  const element = document.getElementById(targetId);
  if (element) {
    // If it is inside main page-content container (some pages have vertical scrolls)
    const contentContainer = document.getElementById('page-content');
    
    // We scroll both window and page-content to be perfectly safe
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
    
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function closeMobileMenu() {
  const navMobile = document.getElementById('nav-mobile');
  const hamburger = document.getElementById('nav-hamburger');
  if (navMobile) navMobile.classList.remove('active');
  if (hamburger) hamburger.classList.remove('active');
}

function highlightNavbar() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  const hash = window.location.hash;

  // Remove active from all nav-links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  if (page === 'index.html' || page === '') {
    if (hash === '#profil') {
      const el = document.getElementById('nav-profil');
      if (el) el.classList.add('active');
    } else if (hash === '#kependudukan') {
      const el = document.getElementById('nav-kependudukan');
      if (el) el.classList.add('active');
    } else {
      const el = document.getElementById('nav-hero');
      if (el) el.classList.add('active');
    }
  } else if (page === 'peta.html') {
    const el = document.getElementById('nav-peta');
    if (el) el.classList.add('active');
  } else if (page === 'kkn.html') {
    const el = document.getElementById('nav-arsip');
    if (el) el.classList.add('active');
  }
}

function reinitializeScriptsForCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  console.log('Re-initializing scripts for:', page);

  // Common scroll reveal trigger
  if (typeof initReveal === 'function') {
    setTimeout(initReveal, 100);
  }

  if (page === 'index.html' || page === '') {
    // Re-initialize particles canvas
    if (typeof initParticles === 'function') {
      initParticles();
    }
    
    // Re-initialize charts and mini-map (since they are now on index.html!)
    if (typeof loadData === 'function') {
      loadData();
    }
    
    setTimeout(() => {
      if (window.DUSUN_DATA) {
        if (typeof initMiniMap === 'function') {
          initMiniMap(window.DUSUN_DATA.dusun?.koordinat);
        }
        if (typeof initAllCharts === 'function') {
          initAllCharts();
        }
      }
    }, 450);
  }

  else if (page === 'peta.html') {
    // Reset map variable cleanly
    window.mainMap = null;
    
    // Re-initialize Leaflet map
    if (window.DUSUN_DATA) {
      if (typeof initMainMap === 'function') {
        initMainMap(window.DUSUN_DATA.fasilitas || []);
      }
    } else {
      document.addEventListener('data-ready', () => {
        if (typeof initMainMap === 'function' && window.DUSUN_DATA) {
          initMainMap(window.DUSUN_DATA.fasilitas || []);
        }
      }, { once: true });
    }
  }

  else if (page === 'kkn.html') {
    // Re-initialize gallery lightboxes and data cards
    if (typeof loadData === 'function') {
      loadData();
    }
    if (typeof initGallery === 'function') {
      initGallery();
    }
  }
}
