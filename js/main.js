/* ============================================
   MAIN.JS — WebGIS Dusun Dawang
   Handles: preloader, navbar, particles,
            scroll animations, gallery,
            data rendering from JSON
   ============================================ */

// ---- Load data ----
let DUSUN_DATA = null;

async function loadData() {
  try {
    const res = await fetch('data/dusun.json');
    DUSUN_DATA = await res.json();
    initWithData();
  } catch (e) {
    console.warn('Could not load dusun.json, using fallback data');
    DUSUN_DATA = getFallbackData();
    initWithData();
  }
}

function getFallbackData() {
  return {
    dusun: { nama: 'Dusun Dawang', desa: 'Desa Blongkeng', kecamatan: 'Kec. Ngluwar', kabupaten: 'Kab. Magelang', kepalaDusun: 'Bapak [Nama]', batasDusun: { utara: '[Utara]', selatan: '[Selatan]', timur: '[Timur]', barat: '[Barat]' } },
    penduduk: { total: 458, lakiLaki: 231, perempuan: 227, jumlahKK: 124, perRT: [{ rt:'RT 01',kk:24,jiwa:88 },{ rt:'RT 02',kk:26,jiwa:95 },{ rt:'RT 03',kk:25,jiwa:92 },{ rt:'RT 04',kk:23,jiwa:85 },{ rt:'RT 05',kk:26,jiwa:98 }], kelompokUmur: [], mataPencaharian: [], pendidikan: [] },
    potensi: [],
    prokerKKN: [],
    timKKN: { namaKelompok: '[Nama Kelompok]', universitas: '[Universitas]', tahun: '2025', dosenPembimbing: 'Dr. [Nama DPL]', anggota: [] }
  };
}

function initWithData() {
  renderBatasDusun();
  renderInfoAdmin();
  renderRTTable();
  renderPotensiGrid();
  renderProkerGrid();
  renderTimGrid();
  renderKKNInfo();
  renderFooterInfo();
  // Charts & Map are initialized from their own files
  window.dispatchEvent(new Event('data-ready'));
}

// ---- Preloader ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 600);
    }
  }, 1800);
});

// ---- Navbar ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile');
let menuOpen = false;

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.add('transparent');
    navbar.classList.remove('scrolled');
  }

  // Back to top
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.classList.toggle('visible', window.scrollY > 500);
  }

  // Active nav link
  updateActiveNavLink();
});

function toggleMenu() {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
}

function closeMenu() {
  menuOpen = false;
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', toggleMenu);

function updateActiveNavLink() {
  const sections = ['profil','peta','kependudukan','potensi','galeri','arsip'];
  const scrollY = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    const navLink = document.getElementById('nav-' + id);
    if (!section || !navLink) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

// ---- Particle Canvas (Hero) ----
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.4 + 0.1
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(82, 183, 136, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ---- Counter Animation ----
function animateCounter(el, target, duration = 1500) {
  const isNumericOnly = /^\d+$/.test(String(target));
  if (!isNumericOnly) {
    el.textContent = target;
    return;
  }
  const start = 0;
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + eased * (target - start)).toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounter(el, target);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

// ---- Scroll Reveal ----
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => obs.observe(el));
}

// ---- Gallery Filter ----
function initGallery() {
  const tabs   = document.querySelectorAll('.galeri-tab');
  const items  = document.querySelectorAll('.galeri-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item => {
        if (cat === 'semua' || item.dataset.cat === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ---- Render Functions (from JSON data) ----

function renderBatasDusun() {
  const b = DUSUN_DATA?.dusun?.batasDusun;
  if (!b) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('batas-utara',   b.utara   || '[Utara]');
  set('batas-selatan', b.selatan || '[Selatan]');
  set('batas-timur',   b.timur   || '[Timur]');
  set('batas-barat',   b.barat   || '[Barat]');
}

function renderInfoAdmin() {
  const d = DUSUN_DATA?.dusun;
  if (!d) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('info-desa', d.desa || 'Desa Blongkeng');
  set('info-kec',  d.kecamatan?.replace('Kec. ', '') || 'Ngluwar');
  set('info-kab',  d.kabupaten || 'Kab. Magelang');
}

function renderRTTable() {
  const tbody = document.getElementById('rt-table-body');
  if (!tbody || !DUSUN_DATA?.penduduk?.perRT) return;

  const rows = DUSUN_DATA.penduduk.perRT.map((rt, i) => {
    const rataRata = (rt.jiwa / rt.kk).toFixed(1);
    return `
      <tr>
        <td><span class="rt-badge">${rt.rt}</span></td>
        <td style="font-weight:600;">${rt.kk} KK</td>
        <td style="font-weight:600;">${rt.jiwa} Jiwa</td>
        <td style="color:var(--text-muted);">${rataRata} jiwa/KK</td>
      </tr>`;
  }).join('');

  const total = DUSUN_DATA.penduduk;
  rows && (tbody.innerHTML = rows + `
    <tr style="background:rgba(45,106,79,0.04);">
      <td style="font-weight:700;">Total</td>
      <td style="font-weight:700;color:var(--primary);">${total.jumlahKK} KK</td>
      <td style="font-weight:700;color:var(--primary);">${total.total} Jiwa</td>
      <td style="color:var(--text-muted);">${(total.total/total.jumlahKK).toFixed(1)} jiwa/KK</td>
    </tr>`);
}

function renderPotensiGrid() {
  const grid = document.getElementById('potensi-grid');
  if (!grid || !DUSUN_DATA?.potensi?.length) return;

  grid.innerHTML = DUSUN_DATA.potensi.map((p, i) => `
    <div class="potensi-card ${p.warna} reveal delay-${(i % 3) + 1}">
      <span class="potensi-emoji">${p.icon}</span>
      <h3 class="potensi-title">${p.judul}</h3>
      <p class="potensi-desc">${p.deskripsi}</p>
    </div>
  `).join('');

  // Re-observe new elements
  initReveal();
}

function renderProkerGrid() {
  const grid = document.getElementById('proker-grid');
  if (!grid || !DUSUN_DATA?.prokerKKN?.length) return;

  grid.innerHTML = DUSUN_DATA.prokerKKN.map((pk, i) => `
    <div class="proker-card reveal delay-${(i % 3) + 1}">
      <div class="proker-header" data-emoji="${pk.emoji}">
        <div class="proker-kategori">${pk.kategori}</div>
        <div class="proker-emoji-title">
          <span class="proker-emoji-big">${pk.emoji}</span>
          <h3 class="proker-title">${pk.judul}</h3>
        </div>
      </div>
      <div class="proker-body">
        <p class="proker-desc">${pk.deskripsi}</p>
        <div class="proker-meta">
          <span class="proker-chip">📅 ${pk.tanggal}</span>
          <span class="proker-chip">⏱️ ${pk.durasi}</span>
          <span class="proker-chip">👥 ${Array.isArray(pk.anggota) ? pk.anggota.join(', ') : pk.anggota}</span>
        </div>
        <div class="proker-output">
          ✅ ${pk.output}
        </div>
      </div>
    </div>
  `).join('');

  initReveal();
}

function renderTimGrid() {
  const grid = document.getElementById('tim-grid');
  if (!grid || !DUSUN_DATA?.timKKN?.anggota?.length) return;

  const peranClass = {
    'Koordinator': 'peran-koordinator',
    'Sekretaris':  'peran-sekretaris',
    'Bendahara':   'peran-bendahara',
    'Anggota':     'peran-anggota'
  };

  grid.innerHTML = DUSUN_DATA.timKKN.anggota.map((m, i) => {
    const initials = m.nama.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
    const cls = peranClass[m.peran] || 'peran-anggota';
    const avatarContent = m.foto
      ? `<img src="${m.foto}" alt="${m.nama}" />`
      : initials;

    return `
      <div class="tim-card reveal delay-${(i % 5) + 1}">
        <div class="tim-avatar">${avatarContent}</div>
        <div class="tim-name">${m.nama}</div>
        <div class="tim-jurusan">${m.jurusan}</div>
        <span class="tim-peran ${cls}">${m.peran}</span>
      </div>
    `;
  }).join('');

  initReveal();
}

function renderKKNInfo() {
  const kkn = DUSUN_DATA?.timKKN;
  if (!kkn) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('kkn-nama-kelompok', kkn.namaKelompok || 'KKN [Nama Kelompok]');
  set('kkn-univ-tahun', kkn.universitas + ' · ');
  set('kkn-tahun', kkn.tahun || '2025');
  set('kkn-jumlah-proker', DUSUN_DATA?.prokerKKN?.length || 7);
  set('quote-tahun', kkn.tahun || '2025');
  set('tim-sub-text', `${kkn.anggota?.length || 10} mahasiswa dari berbagai jurusan yang bersatu mengabdi di Dusun Dawang`);
  set('dpl-text', `Dosen Pembimbing Lapangan: ${kkn.dosenPembimbing || 'Dr. [Nama DPL]'}`);
}

function renderFooterInfo() {
  const d = DUSUN_DATA?.dusun;
  const kkn = DUSUN_DATA?.timKKN;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  if (d) set('footer-kades', `Kepala Dusun: ${d.kepalaDusun || 'Bapak [Nama]'}`);
  if (kkn) {
    set('footer-kkn-kelompok', `🎓 ${kkn.namaKelompok || 'KKN [Nama Kelompok]'}`);
    set('footer-kkn-univ', `🏫 ${kkn.universitas || '[Nama Universitas]'}`);
    set('footer-kkn-tahun', `📅 Tahun ${kkn.tahun || '2025'}`);
  }
  set('footer-year', new Date().getFullYear());
}

// ---- Init All ----
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCounters();
  initGallery();
  loadData();

  // Delay reveal init slightly to allow DOM to settle
  setTimeout(initReveal, 300);
});
