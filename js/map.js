/* ============================================
   MAP.JS — WebGIS Dusun Dawang
   Handles: Leaflet map initialization,
            layer management, markers, popups
   Uses real GeoJSON boundary data (WGS84)
   ============================================ */

// Coordinate center of Dusun Dawang (Ngluwar, Magelang area)
// Computed from UTM centroid of aoi_dawang polygon
const CENTER   = [-7.63739, 110.2494];
const ZOOM     = 16;
const ZOOM_MIN = 12;
const ZOOM_MAX = 20;

let mainMap  = null;
let miniMap  = null;
let baseLayers = {};
let overlayLayers = {};

// ---- Marker Category Styles ----
const MARKER_STYLES = {
  pemerintahan: { bg: '#C96A3A', emoji: '🏛️', label: 'Pemerintahan' },
  ibadah:       { bg: '#0A9396', emoji: '🕌', label: 'Tempat Ibadah' },
  kesehatan:    { bg: '#E8B86D', emoji: '🏥', label: 'Kesehatan'     },
  pendidikan:   { bg: '#386641', emoji: '🏫', label: 'Pendidikan'    },
  infrastruktur:{ bg: '#94D2BD', emoji: '⚙️', label: 'Infrastruktur' },
  pertanian:    { bg: '#2D6A4F', emoji: '🌾', label: 'Pertanian'     },
  umkm:         { bg: '#7B4A2D', emoji: '🏪', label: 'UMKM'          },
  umum:         { bg: '#8B5E3C', emoji: '📍', label: 'Fasilitas Umum'}
};

// ---- Create Custom Marker ----
function createMarker(feature) {
  const style = MARKER_STYLES[feature.kategori] || MARKER_STYLES.umum;
  const size = 40;

  const iconHtml = `
    <div style="
      width:${size}px; height:${size}px;
      background:${style.bg};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      box-shadow:0 4px 15px rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      border:2px solid rgba(255,255,255,0.4);
      cursor:pointer;
    ">
      <span style="transform:rotate(45deg);font-size:16px;line-height:1;">${style.emoji}</span>
    </div>
  `;

  const icon = L.divIcon({
    html: iconHtml,
    className: '',
    iconSize:   [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor:[0, -size - 5]
  });

  const imgHtml = feature.foto
    ? `<img src="${feature.foto}" alt="${feature.nama}" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:10px;" onerror="this.style.display='none'" />`
    : '';

  const kontakHtml = feature.kontak
    ? `<div style="margin-top:6px;font-size:0.78rem;color:#7B4A2D;"><span style="font-weight:600;">📞</span> ${feature.kontak}</div>`
    : '';

  const popup = `
    <div class="popup-inner">
      ${imgHtml}
      <div class="popup-kategori" style="color:${style.bg};">${style.label}</div>
      <div class="popup-nama">${feature.nama}</div>
      <div class="popup-desc">${feature.deskripsi || ''}</div>
      ${kontakHtml}
    </div>
  `;

  return L.marker([feature.lat, feature.lng], { icon })
    .bindPopup(popup, { maxWidth: 260, className: 'custom-popup' });
}

// ---- Load GeoJSON files (WGS84) ----
async function loadGeoJSON(filename) {
  try {
    const res = await fetch('Data_geojson/' + filename);
    if (!res.ok) throw new Error('not found');
    return await res.json();
  } catch (e) {
    console.warn('Could not load:', filename);
    return null;
  }
}

// Fallback approximate polygon for Dusun Dawang
function getFallbackBoundary() {
  return [
    [-7.63681, 110.24698],
    [-7.63676, 110.24716],
    [-7.63653, 110.24797],
    [-7.63693, 110.24986],
    [-7.63702, 110.25036],
    [-7.63732, 110.25071],
    [-7.63777, 110.25151],
    [-7.63813, 110.25156],
    [-7.63834, 110.25158],
    [-7.63895, 110.25157],
    [-7.63962, 110.25118],
    [-7.63923, 110.25007],
    [-7.63921, 110.25002],
    [-7.63918, 110.24951],
    [-7.63915, 110.24938],
    [-7.63902, 110.24885],
    [-7.63889, 110.24866],
    [-7.63870, 110.24839],
    [-7.63865, 110.24824],
    [-7.63859, 110.24797],
    [-7.63849, 110.24779],
    [-7.63828, 110.24761],
    [-7.63816, 110.24745],
    [-7.63806, 110.24731],
    [-7.63776, 110.24693],
    [-7.63681, 110.24698]
  ];
}

// RT color palette (Tanah Jawa tones)
const RT_COLORS = {
  'RT 01': { color: '#C96A3A', fillColor: '#C96A3A', label: 'RT 01' },
  'RT 02': { color: '#386641', fillColor: '#386641', label: 'RT 02' },
  'RT 03': { color: '#0A9396', fillColor: '#0A9396', label: 'RT 03' },
  'RT 04': { color: '#E8B86D', fillColor: '#8B6914', label: 'RT 04' },
  'RT 05': { color: '#7B4A2D', fillColor: '#7B4A2D', label: 'RT 05' },
};

// ---- Initialize Main Map ----
async function initMainMap(fasilitas) {
  const mapEl = document.getElementById('main-map');
  if (!mapEl || mainMap) return;

  // Base tile layers
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 20
  });

  const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri &mdash; Source: Esri, DigitalGlobe',
    maxZoom: 20
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

  mainMap.zoomControl.setPosition('bottomright');

  // ---- Load Real GeoJSON Boundary ----
  // Priority: area_dawang (detailed) > wgs84_aoi_dawang (converted) > fallback
  const boundaryLayer = L.layerGroup();
  const boundaryGeoJSON = await loadGeoJSON('wgs84_area_dawang.geojson')
                       || await loadGeoJSON('wgs84_aoi_dawang.geojson');

  if (boundaryGeoJSON) {
    L.geoJSON(boundaryGeoJSON, {
      style: {
        color: '#C96A3A',
        weight: 3,
        dashArray: '8, 5',
        fillColor: '#C96A3A',
        fillOpacity: 0.06
      }
    }).bindPopup('<div class="popup-inner"><div class="popup-nama">Batas Dusun Dawang</div><div class="popup-desc">Batas administrasi Dusun Dawang, Desa Blongkeng</div></div>')
      .addTo(boundaryLayer);
  } else {
    // Fallback
    L.polygon(getFallbackBoundary(), {
      color: '#C96A3A',
      weight: 3,
      dashArray: '8, 5',
      fillColor: '#C96A3A',
      fillOpacity: 0.06
    }).addTo(boundaryLayer)
      .bindPopup('<div class="popup-inner"><div class="popup-nama">Batas Dusun Dawang</div></div>');
  }

  // ---- Blongkeng context layer (desa) ----
  const blongkengLayer = L.layerGroup();
  const blongkengGeoJSON = await loadGeoJSON('wgs84_area_blongkeng.geojson');
  if (blongkengGeoJSON) {
    L.geoJSON(blongkengGeoJSON, {
      style: {
        color: '#E8B86D',
        weight: 1.5,
        dashArray: '4, 6',
        fillColor: 'transparent',
        fillOpacity: 0
      }
    }).bindPopup('<div class="popup-inner"><div class="popup-kategori" style="color:#E8B86D;">Batas Desa</div><div class="popup-nama">Desa Blongkeng</div><div class="popup-desc">Kec. Ngluwar, Kab. Magelang</div></div>')
      .addTo(blongkengLayer);
  }

  // Dusun name label
  L.marker(CENTER, {
    icon: L.divIcon({
      html: `<div style="
        background:rgba(59,35,20,0.92);
        color:#E8B86D;
        padding:5px 12px;
        border-radius:20px;
        font-size:11px;
        font-weight:700;
        font-family:'Plus Jakarta Sans',sans-serif;
        white-space:nowrap;
        box-shadow:0 2px 12px rgba(0,0,0,0.4);
        border:1px solid rgba(232,184,109,0.35);
        letter-spacing:0.5px;
      ">🗺 Dusun Dawang</div>`,
      className: '',
      iconAnchor: [65, 14]
    })
  }).addTo(boundaryLayer);

  boundaryLayer.addTo(mainMap);

  // ---- RT Layer ----
  const rtLayer = L.layerGroup();
  const rtGeoJSON = await loadGeoJSON('wgs84_aoi_rt.geojson');

  if (rtGeoJSON) {
    L.geoJSON(rtGeoJSON, {
      style: function(feature) {
        const status = feature.properties.STATUS || 'RT 01';
        const c = RT_COLORS[status] || RT_COLORS['RT 01'];
        return {
          color: c.color,
          weight: 2,
          fillColor: c.fillColor,
          fillOpacity: 0.15,
          dashArray: '4, 3'
        };
      },
      onEachFeature: function(feature, layer) {
        const status = feature.properties.STATUS;
        layer.bindPopup(`<div class="popup-inner"><div class="popup-kategori" style="color:#C96A3A;">Rukun Tetangga</div><div class="popup-nama">${status}</div><div class="popup-desc">Wilayah administrasi ${status} Dusun Dawang</div></div>`);
        layer.on('mouseover', function() { this.setStyle({ fillOpacity: 0.35 }); });
        layer.on('mouseout', function() { this.setStyle({ fillOpacity: 0.15 }); });
      }
    }).addTo(rtLayer);
  }

  // ---- Fasilitas Layer ----
  const fasilitasLayer = L.layerGroup();
  if (fasilitas && fasilitas.length) {
    fasilitas.forEach(f => {
      createMarker(f).addTo(fasilitasLayer);
    });
    fasilitasLayer.addTo(mainMap);
  }

  // ---- Perangkat Desa Layer ----
  const perangkatLayer = L.layerGroup();
  const perangkat = window.DUSUN_DATA?.perangkat || [];
  perangkat.forEach(p => {
    const iconHtml = `
      <div style="
        width:42px;height:42px;
        background:#C96A3A;
        border-radius:50%;
        border:3px solid #E8B86D;
        box-shadow:0 4px 15px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;
        overflow:hidden;
        cursor:pointer;
      ">
        ${p.foto
          ? `<img src="${p.foto}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.parentElement.innerHTML='👤'" />`
          : '<span style="font-size:18px;">👤</span>'}
      </div>
    `;
    const icon = L.divIcon({ html: iconHtml, className: '', iconSize: [42,42], iconAnchor: [21,21], popupAnchor: [0,-25] });
    const popup = `
      <div class="popup-inner">
        ${p.foto ? `<img src="${p.foto}" style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;" onerror="this.style.display='none'" />` : ''}
        <div class="popup-kategori" style="color:#C96A3A;">Perangkat Desa</div>
        <div class="popup-nama">${p.nama}</div>
        <div class="popup-desc">${p.jabatan}</div>
        ${p.kontak ? `<div style="margin-top:5px;font-size:0.78rem;color:#7B4A2D;">📞 ${p.kontak}</div>` : ''}
        ${p.wilayah ? `<div style="margin-top:3px;font-size:0.78rem;color:#7B4A2D;">📍 ${p.wilayah}</div>` : ''}
      </div>
    `;
    if (p.lat && p.lng) {
      L.marker([p.lat, p.lng], { icon })
        .bindPopup(popup, { maxWidth: 260, className: 'custom-popup' })
        .addTo(perangkatLayer);
    }
  });

  // ---- Pembagian Dusun Layer (semua dusun di Desa Blongkeng) ----
  const dusunLayer = L.layerGroup();
  const dusunGeoJSON = await loadGeoJSON('wgs84_pembagian_dusun.geojson');

  // Warna unik per dusun (Tanah Jawa palette)
  const DUSUN_COLORS = {
    'Dawang':      { color: '#C96A3A', fill: '#C96A3A', opacity: 0.35, weight: 3 },  // Dusun kita - menonjol
    'Caruban':     { color: '#386641', fill: '#386641', opacity: 0.15, weight: 1.5 },
    'Ngentak':     { color: '#0A9396', fill: '#0A9396', opacity: 0.15, weight: 1.5 },
    'Blongkeng 1': { color: '#E8B86D', fill: '#C49040', opacity: 0.15, weight: 1.5 },
    'Blongkeng 2': { color: '#E8B86D', fill: '#C49040', opacity: 0.12, weight: 1.5 },
    'Karangrejo':  { color: '#7B4A2D', fill: '#7B4A2D', opacity: 0.15, weight: 1.5 },
    'Karangasem':  { color: '#8B5E3C', fill: '#8B5E3C', opacity: 0.15, weight: 1.5 },
    'Sabrangkali': { color: '#2D6A4F', fill: '#2D6A4F', opacity: 0.15, weight: 1.5 },
  };

  if (dusunGeoJSON) {
    L.geoJSON(dusunGeoJSON, {
      style: function(feature) {
        const nama = feature.properties.NAMOBJ || 'Lainnya';
        const c = DUSUN_COLORS[nama] || { color: '#888', fill: '#888', opacity: 0.12, weight: 1 };
        return {
          color:       c.color,
          weight:      c.weight,
          dashArray:   nama === 'Dawang' ? null : '5, 4',
          fillColor:   c.fill,
          fillOpacity: c.opacity
        };
      },
      onEachFeature: function(feature, layer) {
        const nama  = feature.properties.NAMOBJ || 'Dusun';
        const rt    = feature.properties.Batas_RT;
        const isDawang = nama === 'Dawang';

        // Tooltip permanen untuk Dawang, hover untuk yang lain
        const tooltipContent = `<strong>${isDawang ? '📍 ' : ''}${nama}</strong>${rt ? `<br><small>${rt}</small>` : ''}`;
        layer.bindTooltip(tooltipContent, {
          permanent: isDawang,
          direction: 'center',
          className: 'dusun-tooltip',
          offset: [0, 0]
        });

        layer.bindPopup(`
          <div class="popup-inner">
            <div class="popup-kategori" style="color:${isDawang ? '#C96A3A' : '#386641'};">
              ${isDawang ? '⭐ Dusun Kami' : 'Dusun Tetangga'}
            </div>
            <div class="popup-nama">Dusun ${nama}</div>
            <div class="popup-desc">Desa Blongkeng, Kec. Ngluwar, Kab. Magelang</div>
            ${rt ? `<div style="margin-top:5px;font-size:0.78rem;color:#7B4A2D;">📋 ${rt}</div>` : ''}
          </div>
        `);

        // Highlight on hover
        layer.on('mouseover', function() {
          this.setStyle({ fillOpacity: isDawang ? 0.50 : 0.30, weight: isDawang ? 4 : 2.5 });
        });
        layer.on('mouseout', function() {
          const c = DUSUN_COLORS[nama] || { opacity: 0.12, weight: 1 };
          this.setStyle({ fillOpacity: c.opacity, weight: c.weight });
        });
      }
    }).addTo(dusunLayer);
  }

  // ---- Store overlay layers ----
  overlayLayers = {
    '🏘️ Batas Dusun Dawang':    boundaryLayer,
    '🗂️ Pembagian Dusun':        dusunLayer,
    '🗃️ Batas RT (Dawang)':      rtLayer,
    '🏡 Batas Desa Blongkeng':   blongkengLayer,
    '📍 Fasilitas Umum':          fasilitasLayer,
    '👤 Perangkat Desa':          perangkatLayer,
    '🌾 Tutupan Lahan':           lahanLayer,
  };

  baseLayers = {
    '🗺️ OpenStreetMap':  osmLayer,
    '🛰️ Citra Satelit':  satelliteLayer,
    '⛰️ Topografi':      topoLayer,
  };

  L.control.layers(baseLayers, overlayLayers, {
    position: 'topright',
    collapsed: true
  }).addTo(mainMap);

  L.control.scale({ position: 'bottomleft', imperial: false }).addTo(mainMap);

  // ---- Custom layer buttons ----
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
          if (mainMap.hasLayer(fasilitasLayer)) mainMap.removeLayer(fasilitasLayer);
          else mainMap.addLayer(fasilitasLayer);
          break;
        case 'lahan':
          if (mainMap.hasLayer(rtLayer)) mainMap.removeLayer(rtLayer);
          else mainMap.addLayer(rtLayer);
          break;
        case 'infra':
          if (mainMap.hasLayer(perangkatLayer)) mainMap.removeLayer(perangkatLayer);
          else mainMap.addLayer(perangkatLayer);
          break;
      }
    });
  });

  setTimeout(() => mainMap.invalidateSize(), 300);
}

// ---- Initialize Mini Map (Profil Section) ----
async function initMiniMap(koordinat) {
  const mapEl = document.getElementById('profil-mini-map');
  if (!mapEl || miniMap) return;

  const center = koordinat
    ? [koordinat.lat, koordinat.lng]
    : CENTER;

  miniMap = L.map('profil-mini-map', {
    center: center,
    zoom: 15,
    zoomControl: false,
    scrollWheelZoom: false,
    dragging: false,
    doubleClickZoom: false,
    touchZoom: false,
    attributionControl: false,
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20
  }).addTo(miniMap);

  // Add boundary
  const boundaryGeoJSON = await loadBoundary();
  if (boundaryGeoJSON) {
    L.geoJSON(boundaryGeoJSON, {
      style: {
        color: '#E8B86D',
        weight: 2.5,
        dashArray: '6, 4',
        fillColor: 'transparent',
        fillOpacity: 0
      }
    }).addTo(miniMap);
  } else {
    L.polygon(getFallbackBoundary(), {
      color: '#E8B86D',
      weight: 2,
      dashArray: '6, 4',
      fillColor: 'transparent',
      fillOpacity: 0
    }).addTo(miniMap);
  }

  // Center marker
  L.marker(center, {
    icon: L.divIcon({
      html: `<div style="
        width:16px;height:16px;
        background:#C96A3A;
        border-radius:50%;
        border:3px solid #E8B86D;
        box-shadow:0 2px 10px rgba(0,0,0,0.5);
      "></div>`,
      className: '',
      iconSize: [16,16],
      iconAnchor: [8,8]
    })
  }).addTo(miniMap);

  // Label
  L.marker(center, {
    icon: L.divIcon({
      html: `<div style="
        background:rgba(59,35,20,0.92);color:#E8B86D;
        padding:3px 9px;border-radius:12px;
        font-size:10px;font-weight:700;
        font-family:'Plus Jakarta Sans',sans-serif;
        white-space:nowrap;margin-top:18px;
        box-shadow:0 2px 8px rgba(0,0,0,0.4);
        border:1px solid rgba(232,184,109,0.3);
      ">📍 Dusun Dawang</div>`,
      className:'', iconAnchor:[55,-4]
    })
  }).addTo(miniMap);

  mapEl.style.cursor = 'pointer';
  mapEl.addEventListener('click', () => {
    document.getElementById('peta').scrollIntoView({ behavior: 'smooth' });
  });

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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.DUSUN_DATA) {
      initMiniMap(window.DUSUN_DATA.dusun?.koordinat);
      initMainMap(window.DUSUN_DATA.fasilitas || []);
    }
  }, 500);
});

const mapObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (mainMap) mainMap.invalidateSize();
      if (miniMap) miniMap.invalidateSize();
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  const mapEl  = document.getElementById('main-map');
  const miniEl = document.getElementById('profil-mini-map');
  if (mapEl)  mapObserver.observe(mapEl);
  if (miniEl) mapObserver.observe(miniEl);
});
