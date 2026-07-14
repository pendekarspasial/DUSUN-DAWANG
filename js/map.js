/* ============================================
   MAP.JS — WebGIS Dusun Dawang
   Handles: Leaflet map initialization,
            layer management, markers, popups
   ============================================ */

// Coordinate center of Dusun Dawang (Ngluwar, Magelang area)
const CENTER   = [-7.617, 110.278];
const ZOOM     = 15;
const ZOOM_MIN = 12;
const ZOOM_MAX = 19;

let mainMap  = null;
let miniMap  = null;
let baseLayers = {};
let overlayLayers = {};
let currentBaseLayer = null;

// ---- Marker Category Styles ----
const MARKER_STYLES = {
  pemerintahan: { bg: '#52B788', emoji: '🏛️', label: 'Pemerintahan' },
  ibadah:       { bg: '#0A9396', emoji: '🕌', label: 'Tempat Ibadah' },
  kesehatan:    { bg: '#F4A261', emoji: '🏥', label: 'Kesehatan'    },
  pendidikan:   { bg: '#E9C46A', emoji: '🏫', label: 'Pendidikan'   },
  infrastruktur:{ bg: '#94D2BD', emoji: '⚙️', label: 'Infrastruktur'},
  pertanian:    { bg: '#2D6A4F', emoji: '🌾', label: 'Pertanian'    },
  umum:         { bg: '#8B5E3C', emoji: '📍', label: 'Fasilitas Umum'}
};

// ---- Create Custom Marker ----
function createMarker(feature) {
  const style = MARKER_STYLES[feature.kategori] || MARKER_STYLES.umum;
  const size = 38;

  const iconHtml = `
    <div style="
      width:${size}px; height:${size}px;
      background:${style.bg};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 4px 15px rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      border:2px solid rgba(255,255,255,0.3);
    ">
      <span style="transform:rotate(45deg);font-size:15px;line-height:1;">${style.emoji}</span>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor:[0, -size - 5]
  });

  const popup = `
    <div class="popup-inner">
      <div class="popup-kategori" style="color:${style.bg};">${style.label}</div>
      <div class="popup-nama">${feature.nama}</div>
      <div class="popup-desc">${feature.deskripsi || ''}</div>
    </div>
  `;

  return L.marker([feature.lat, feature.lng], { icon })
    .bindPopup(popup, { maxWidth: 240, className: 'custom-popup' });
}

// ---- Dusun Boundary Polygon (approximate) ----
function getDusunBoundary() {
  // Approximate polygon for Dusun Dawang (placeholder coordinates)
  const offsetLat = 0.006;
  const offsetLng = 0.008;
  const [lat, lng] = CENTER;

  return [
    [lat + offsetLat * 0.8, lng - offsetLng * 0.3],
    [lat + offsetLat,       lng + offsetLng * 0.5],
    [lat + offsetLat * 0.5, lng + offsetLng],
    [lat - offsetLat * 0.3, lng + offsetLng * 0.8],
    [lat - offsetLat,       lng + offsetLng * 0.2],
    [lat - offsetLat * 0.8, lng - offsetLng * 0.5],
    [lat - offsetLat * 0.3, lng - offsetLng],
    [lat + offsetLat * 0.4, lng - offsetLng * 0.8],
  ];
}

// ---- Lahan Polygons (example tutupan lahan) ----
function getLahanPolygons() {
  const [lat, lng] = CENTER;
  return [
    {
      type: 'sawah',
      coords: [
        [lat - 0.002, lng - 0.004],
        [lat - 0.002, lng + 0.004],
        [lat - 0.005, lng + 0.005],
        [lat - 0.005, lng - 0.003],
      ],
      color: '#E9C46A', fill: 'rgba(233,196,106,0.2)', label: 'Sawah'
    },
    {
      type: 'sawah',
      coords: [
        [lat + 0.001, lng + 0.002],
        [lat + 0.001, lng + 0.006],
        [lat - 0.001, lng + 0.007],
        [lat - 0.001, lng + 0.001],
      ],
      color: '#E9C46A', fill: 'rgba(233,196,106,0.2)', label: 'Sawah'
    },
    {
      type: 'kebun',
      coords: [
        [lat + 0.003, lng - 0.006],
        [lat + 0.003, lng - 0.001],
        [lat + 0.005, lng - 0.001],
        [lat + 0.005, lng - 0.007],
      ],
      color: '#40916C', fill: 'rgba(64,145,108,0.2)', label: 'Kebun/Tegalan'
    },
    {
      type: 'permukiman',
      coords: [
        [lat - 0.001, lng - 0.003],
        [lat - 0.001, lng + 0.001],
        [lat + 0.001, lng + 0.001],
        [lat + 0.001, lng - 0.003],
      ],
      color: '#F4A261', fill: 'rgba(244,162,97,0.18)', label: 'Permukiman'
    },
  ];
}

// ---- Initialize Main Map ----
function initMainMap(fasilitas) {
  const mapEl = document.getElementById('main-map');
  if (!mapEl || mainMap) return;

  // Base tile layers
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
  });

  const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri &mdash; Source: Esri, DigitalGlobe',
    maxZoom: 19
  });

  const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap',
    maxZoom: 17
  });

  // Create map
  mainMap = L.map('main-map', {
    center: CENTER,
    zoom: ZOOM,
    minZoom: ZOOM_MIN,
    maxZoom: ZOOM_MAX,
    layers: [osmLayer],
    zoomControl: true,
  });

  // Move zoom control to bottom-right
  mainMap.zoomControl.setPosition('bottomright');

  // ---- Dusun Boundary Layer ----
  const boundaryLayer = L.layerGroup();
  const boundaryCoords = getDusunBoundary();
  L.polygon(boundaryCoords, {
    color: '#52B788',
    weight: 2.5,
    dashArray: '8, 5',
    fillColor: 'rgba(82,183,136,0.06)',
    fillOpacity: 1
  }).addTo(boundaryLayer)
    .bindPopup('<div class="popup-inner"><div class="popup-nama">Batas Dusun Dawang</div><div class="popup-desc">Batas administrasi Dusun Dawang, Desa Blongkeng</div></div>');

  // Dusun name label
  L.marker(CENTER, {
    icon: L.divIcon({
      html: `<div style="
        background:rgba(45,106,79,0.9);
        color:#fff;
        padding:4px 10px;
        border-radius:20px;
        font-size:11px;
        font-weight:700;
        font-family:'Plus Jakarta Sans',sans-serif;
        white-space:nowrap;
        box-shadow:0 2px 10px rgba(0,0,0,0.3);
        border:1px solid rgba(255,255,255,0.2);
      ">Dusun Dawang</div>`,
      className: '',
      iconAnchor: [55, 14]
    })
  }).addTo(boundaryLayer);

  boundaryLayer.addTo(mainMap);

  // ---- Fasilitas Layer ----
  const fasilitasLayer = L.layerGroup();
  if (fasilitas && fasilitas.length) {
    fasilitas.forEach(f => {
      createMarker(f).addTo(fasilitasLayer);
    });
    fasilitasLayer.addTo(mainMap);
  }

  // ---- Tutupan Lahan Layer ----
  const lahanLayer = L.layerGroup();
  getLahanPolygons().forEach(p => {
    L.polygon(p.coords, {
      color: p.color,
      weight: 1.5,
      fillColor: p.color,
      fillOpacity: 0.18
    }).addTo(lahanLayer)
      .bindPopup(`<div class="popup-inner"><div class="popup-nama">${p.label}</div></div>`);
  });

  // ---- Infrastruktur (placeholder route lines) ----
  const infraLayer = L.layerGroup();
  const [lat, lng] = CENTER;
  const jalan = [
    [[lat + 0.005, lng - 0.009], [lat + 0.003, lng - 0.001], [lat - 0.001, lng + 0.002], [lat - 0.004, lng + 0.008]],
    [[lat - 0.002, lng - 0.007], [lat - 0.002, lng + 0.001], [lat + 0.002, lng + 0.003]],
    [[lat + 0.001, lng - 0.005], [lat + 0.001, lng + 0.004]],
  ];
  const sungai = [
    [[lat + 0.006, lng + 0.002], [lat + 0.003, lng + 0.001], [lat - 0.001, lng + 0.003], [lat - 0.005, lng + 0.004]],
  ];
  jalan.forEach(coords => {
    L.polyline(coords, { color: '#F4A261', weight: 3, opacity: 0.8 }).addTo(infraLayer)
      .bindPopup('<div class="popup-inner"><div class="popup-nama">Jalan Dusun</div></div>');
  });
  sungai.forEach(coords => {
    L.polyline(coords, { color: '#94D2BD', weight: 2.5, opacity: 0.9, dashArray: '0' }).addTo(infraLayer)
      .bindPopup('<div class="popup-inner"><div class="popup-nama">Sungai</div></div>');
  });

  // ---- Store layers ----
  baseLayers = {
    '🗺️ OpenStreetMap':  osmLayer,
    '🛰️ Citra Satelit':  satelliteLayer,
    '⛰️ Topografi':      topoLayer,
  };

  overlayLayers = {
    '📏 Batas Administrasi': boundaryLayer,
    '📍 Fasilitas Umum':     fasilitasLayer,
    '🌿 Tutupan Lahan':      lahanLayer,
    '🛣️ Infrastruktur':     infraLayer,
  };

  // ---- Layer control panel ----
  L.control.layers(baseLayers, overlayLayers, {
    position: 'topright',
    collapsed: true
  }).addTo(mainMap);

  // ---- Scale control ----
  L.control.scale({ position: 'bottomleft', imperial: false }).addTo(mainMap);

  // ---- Custom layer buttons (top of section) ----
  document.querySelectorAll('.layer-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.layer-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const layer = btn.dataset.layer;
      switch (layer) {
        case 'base':
          mainMap.addLayer(osmLayer);
          mainMap.removeLayer(satelliteLayer);
          mainMap.removeLayer(topoLayer);
          break;
        case 'satellite':
          mainMap.addLayer(satelliteLayer);
          mainMap.removeLayer(osmLayer);
          mainMap.removeLayer(topoLayer);
          break;
        case 'fasilitas':
          mainMap.addLayer(fasilitasLayer);
          mainMap.removeLayer(lahanLayer);
          break;
        case 'lahan':
          mainMap.addLayer(lahanLayer);
          mainMap.removeLayer(fasilitasLayer);
          break;
        case 'infra':
          mainMap.addLayer(infraLayer);
          break;
      }
    });
  });

  // Fix map rendering when section becomes visible
  setTimeout(() => mainMap.invalidateSize(), 300);
}

// ---- Initialize Mini Map (Profil Section) ----
function initMiniMap(koordinat) {
  const mapEl = document.getElementById('profil-mini-map');
  if (!mapEl || miniMap) return;

  const center = koordinat
    ? [koordinat.lat, koordinat.lng]
    : CENTER;

  miniMap = L.map('profil-mini-map', {
    center: center,
    zoom: 14,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    doubleClickZoom: false,
    touchZoom: false,
    attributionControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(miniMap);

  // Add boundary
  const boundaryCoords = getDusunBoundary();
  L.polygon(boundaryCoords, {
    color: '#52B788',
    weight: 2,
    dashArray: '6, 4',
    fillColor: 'rgba(82,183,136,0.1)',
    fillOpacity: 1
  }).addTo(miniMap);

  // Center marker
  L.marker(center, {
    icon: L.divIcon({
      html: `<div style="
        width:16px;height:16px;
        background:#52B788;
        border-radius:50%;
        border:3px solid #fff;
        box-shadow:0 2px 10px rgba(0,0,0,0.4);
      "></div>`,
      className: '',
      iconSize: [16,16],
      iconAnchor: [8,8]
    })
  }).addTo(miniMap);

  // Click to go to full map
  mapEl.style.cursor = 'pointer';
  mapEl.addEventListener('click', () => {
    document.getElementById('peta').scrollIntoView({ behavior: 'smooth' });
  });

  // Label
  L.marker(center, {
    icon: L.divIcon({
      html: `<div style="
        background:rgba(27,67,50,0.9);color:#fff;
        padding:3px 9px;border-radius:12px;
        font-size:10px;font-weight:700;
        font-family:'Plus Jakarta Sans',sans-serif;
        white-space:nowrap;margin-top:18px;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
      ">📍 Dusun Dawang</div>`,
      className:'',iconAnchor:[50,-4]
    })
  }).addTo(miniMap);

  setTimeout(() => miniMap.invalidateSize(), 400);
}

// ---- Wait for data then init maps ----
window.addEventListener('data-ready', () => {
  const data = window.DUSUN_DATA || null;
  const fasilitas  = data?.fasilitas   || [];
  const koordinat  = data?.dusun?.koordinat || null;
  initMiniMap(koordinat);
  initMainMap(fasilitas);
});

// Also init if data was already loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.DUSUN_DATA) {
      initMiniMap(window.DUSUN_DATA.dusun?.koordinat);
      initMainMap(window.DUSUN_DATA.fasilitas || []);
    }
  }, 500);
});

// Invalidate map size when scrolled into view
const mapObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (mainMap) mainMap.invalidateSize();
      if (miniMap) miniMap.invalidateSize();
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const mapEl = document.getElementById('main-map');
  const miniEl = document.getElementById('profil-mini-map');
  if (mapEl)  mapObserver.observe(mapEl);
  if (miniEl) mapObserver.observe(miniEl);
});
