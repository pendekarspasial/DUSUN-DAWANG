/* ==========================================================================
   ROUTER.JS — AJAX Page Router with Immersive Transition Effect
   Supports: Zero-refresh AJAX dynamic content loading, Page transitions,
             Fallback to standard page load for file:// scheme (offline)
   ========================================================================== */

let isPageTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize the router
  initRouter();
  
  // Set initial active state of navbar based on current page
  highlightNavbar();
});

function initRouter() {
  // If open locally via file:/// protocol, fall back to standard HTML navigation
  // because browsers block fetch() requests on local file paths due to CORS.
  if (window.location.protocol === 'file:') {
    console.log('Router: Local file system detected. Falling back to standard browser routing.');
    return;
  }

  // Intercept clicks on links that are relative and point to other pages
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Check if it is a local page transition (e.g. index.html, profil.html, peta.html, kkn.html)
    if (
      href.endsWith('.html') ||
      href === './' ||
      href === '/' ||
      (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
    ) {
      e.preventDefault();
      
      // Resolve path
      const targetUrl = new URL(href, window.location.href).href;
      
      // Navigate using AJAX
      navigateToPage(targetUrl);
    }
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
  
  // 1. Show transition overlay (Batik Loading Overlay)
  if (overlay) {
    overlay.classList.add('active');
  }

  // 2. Fetch the target page in the background after overlay transitions in (350ms)
  setTimeout(() => {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(html => {
        // Parse fetched HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract content inside <main id="page-content">
        const newContent = doc.getElementById('page-content');
        const currentContent = document.getElementById('page-content');

        if (newContent && currentContent) {
          // Replace page content
          currentContent.innerHTML = newContent.innerHTML;

          // Update Document Title
          document.title = doc.title;

          // Update browser history URL
          if (pushState) {
            window.history.pushState(null, doc.title, url);
          }

          // Force page scroll to top
          window.scrollTo(0, 0);

          // Remove new preloader if parsed, we don't need it on AJAX transition
          const preloader = document.getElementById('preloader');
          if (preloader) {
            preloader.remove();
          }

          // Highlight navbar active link
          highlightNavbar();

          // Close mobile menu if open
          const navMobile = document.getElementById('nav-mobile');
          const hamburger = document.getElementById('nav-hamburger');
          if (navMobile) navMobile.classList.remove('active');
          if (hamburger) hamburger.classList.remove('active');

          // 3. Re-run initializers for scripts
          reinitializeScriptsForCurrentPage();
        }
      })
      .catch(err => {
        console.error('Failed to load page dynamically:', err);
        // Fallback to standard page load if AJAX fetch fails
        window.location.href = url;
      })
      .finally(() => {
        // 4. Remove transition overlay
        setTimeout(() => {
          if (overlay) {
            overlay.classList.remove('active');
          }
          isPageTransitioning = false;
        }, 500);
      });
  }, 350);
}

function highlightNavbar() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

  // Remove active from all nav-links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Add active based on current page
  if (page === 'index.html' || page === '') {
    const el = document.getElementById('nav-hero');
    if (el) el.classList.add('active');
  } else if (page === 'profil.html') {
    const el = document.getElementById('nav-profil');
    if (el) el.classList.add('active');
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

  // Common initializers
  // Re-run ScrollReveal or fade reveal animations
  if (typeof initReveal === 'function') {
    setTimeout(initReveal, 100);
  }

  if (page === 'index.html' || page === '') {
    // Re-initialize particles canvas on hero page
    if (typeof initParticles === 'function') {
      initParticles();
    }
  }

  else if (page === 'profil.html') {
    // Re-initialize charts and mini-map
    if (typeof loadData === 'function') {
      loadData();
    }
    // We need to wait for DUSUN_DATA to load or trigger manually
    setTimeout(() => {
      if (window.DUSUN_DATA) {
        if (typeof initMiniMap === 'function') {
          initMiniMap(window.DUSUN_DATA.dusun?.koordinat);
        }
        if (typeof initAllCharts === 'function') {
          initAllCharts();
        }
      }
    }, 400);
  }

  else if (page === 'peta.html') {
    // Reset map variables so mainMap is re-created cleanly
    window.mainMap = null;
    
    // Re-initialize Leaflet map
    if (window.DUSUN_DATA) {
      if (typeof initMainMap === 'function') {
        initMainMap(window.DUSUN_DATA.fasilitas || []);
      }
    } else {
      // Wait for data-ready event or check DUSUN_DATA
      document.addEventListener('data-ready', () => {
        if (typeof initMainMap === 'function' && window.DUSUN_DATA) {
          initMainMap(window.DUSUN_DATA.fasilitas || []);
        }
      }, { once: true });
    }
  }

  else if (page === 'kkn.html') {
    // Re-run lightbox gallery initialization and load data
    if (typeof loadData === 'function') {
      loadData();
    }
    if (typeof initGallery === 'function') {
      initGallery();
    }
  }
}
