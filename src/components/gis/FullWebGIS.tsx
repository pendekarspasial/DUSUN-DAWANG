import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { FloatingSearchBar } from './FloatingSearchBar';
import { FloatingMapControls } from './FloatingMapControls';
import { BottomSheetDetail } from './BottomSheetDetail';
import { MapLayerConfig, GeoJSONFeatureProperties, FasilitasItem } from '../../types';

interface FullWebGISProps {
  fasilitas: FasilitasItem[];
  initialFocusFile?: string;
  onCloseGis?: () => void;
}

export const FullWebGIS: React.FC<FullWebGISProps> = ({
  fasilitas,
  initialFocusFile,
  onCloseGis,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geojsonLayersRef = useRef<{ [key: string]: L.GeoJSON }>({});
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeBasemap, setActiveBasemap] = useState<string>('satellite');
  const [selectedFeature, setSelectedFeature] = useState<GeoJSONFeatureProperties | null>(null);

  const [layers, setLayers] = useState<MapLayerConfig[]>([
    { id: 'aoi_dawang', name: 'Batas Dusun Dawang', file: 'wgs84_aoi_dawang.geojson', color: '#c2593f', type: 'polygon', visible: true, opacity: 0.9 },
    { id: 'aoi_rt', name: 'Batas RT 01 - RT 05', file: 'wgs84_aoi_rt.geojson', color: '#d4a359', type: 'polygon', visible: true, opacity: 0.7 },
    { id: 'rumah', name: 'Persil Rumah / Bangunan', file: 'wgs84_rumah.geojson', color: '#e5b869', type: 'polygon', visible: true, opacity: 0.8 },
    { id: 'sawah', name: 'Area Persawahan Subur', file: 'wgs84_sawah.geojson', color: '#8cb369', type: 'polygon', visible: true, opacity: 0.6 },
    { id: 'perangkat', name: 'Lokasi Perangkat & Fasilitas', file: 'wgs84_perangkatdesa.geojson', color: '#ffffff', type: 'point', visible: true, opacity: 1 },
    { id: 'pembagian', name: 'Pembagian Wilayah Dusun', file: 'wgs84_pembagian_dusun.geojson', color: '#d97757', type: 'polygon', visible: false, opacity: 0.5 },
    { id: 'blongkeng', name: 'Batas Wilayah Desa Blongkeng', file: 'wgs84_area_blongkeng.geojson', color: '#36342e', type: 'polygon', visible: false, opacity: 0.4 },
  ]);

  const basemapUrls: { [key: string]: { url: string; attrib: string } } = {
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attrib: 'Esri World Imagery & GIS KKN Dawang 2025'
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attrib: '&copy; OpenStreetMap contributors'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attrib: '&copy; CARTO Dark GIS'
    },
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attrib: 'OpenTopoMap Topography'
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-7.6170, 110.2780],
      zoom: 17,
      zoomControl: false,
      attributionControl: false,
    });

    const initialTile = L.tileLayer(basemapUrls.satellite.url, {
      maxZoom: 20,
      attribution: basemapUrls.satellite.attrib,
    }).addTo(map);

    tileLayerRef.current = initialTile;
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle Basemap Change
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    const config = basemapUrls[activeBasemap] || basemapUrls.satellite;
    mapRef.current.removeLayer(tileLayerRef.current);
    const newTile = L.tileLayer(config.url, {
      maxZoom: 20,
      attribution: config.attrib,
    }).addTo(mapRef.current);
    tileLayerRef.current = newTile;
  }, [activeBasemap]);

  // Load WGS84 GeoJSON Layers
  useEffect(() => {
    if (!mapRef.current) return;

    layers.forEach((cfg) => {
      if (!cfg.visible) {
        if (geojsonLayersRef.current[cfg.id]) {
          mapRef.current?.removeLayer(geojsonLayersRef.current[cfg.id]);
          delete geojsonLayersRef.current[cfg.id];
        }
        return;
      }

      if (geojsonLayersRef.current[cfg.id]) {
        // Adjust existing opacity
        const layerGroup = geojsonLayersRef.current[cfg.id];
        layerGroup.setStyle({ fillOpacity: cfg.opacity * 0.6, opacity: cfg.opacity });
        return;
      }

      fetch(`/Data_geojson/${cfg.file}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (!mapRef.current) return;

          const layer = L.geoJSON(data, {
            style: (feature) => ({
              color: cfg.color,
              weight: cfg.id === 'aoi_dawang' ? 3 : 1.5,
              fillColor: cfg.color,
              fillOpacity: cfg.opacity * 0.5,
              dashArray: cfg.id === 'aoi_rt' ? '4, 4' : undefined,
            }),
            pointToLayer: (feature, latlng) => {
              return L.circleMarker(latlng, {
                radius: 7,
                fillColor: cfg.color,
                color: '#141311',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9,
              });
            },
            onEachFeature: (feature, l) => {
              l.on({
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                  const props = feature.properties || {};
                  setSelectedFeature(props);
                },
                mouseover: (e) => {
                  const target = e.target;
                  if (target.setStyle) {
                    target.setStyle({ weight: 3, fillOpacity: 0.8 });
                  }
                },
                mouseout: (e) => {
                  const target = e.target;
                  if (target.setStyle) {
                    target.setStyle({
                      weight: cfg.id === 'aoi_dawang' ? 3 : 1.5,
                      fillOpacity: cfg.opacity * 0.5,
                    });
                  }
                },
              });
            },
          }).addTo(mapRef.current);

          geojsonLayersRef.current[cfg.id] = layer;

          if (initialFocusFile && cfg.file === initialFocusFile) {
            mapRef.current.fitBounds(layer.getBounds(), { padding: [20, 20] });
          }
        })
        .catch((err) => console.warn(`GeoJSON fetch warning [${cfg.file}]:`, err));
    });
  }, [layers]);

  const handleToggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const handleChangeOpacity = (id: string, opacity: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, opacity } : l))
    );
  };

  const handleSelectSearchResult = (lat: number, lng: number, title: string) => {
    if (!mapRef.current) return;
    mapRef.current.setView([lat, lng], 19, { animate: true });
    setSelectedFeature({ Name: title, nama: title });
  };

  const handleLocateUser = () => {
    if (!mapRef.current) return;
    mapRef.current.locate({ setView: true, maxZoom: 18 });
  };

  const handleSelectBookmark = (lat: number, lng: number, zoom: number) => {
    if (!mapRef.current) return;
    mapRef.current.setView([lat, lng], zoom, { animate: true });
  };

  return (
    <div className="relative w-full h-screen bg-dawang-dark overflow-hidden">
      
      {/* Search Input Floating Bar */}
      <FloatingSearchBar
        fasilitas={fasilitas}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Floating Controls Widgets */}
      <FloatingMapControls
        layers={layers}
        onToggleLayer={handleToggleLayer}
        onChangeOpacity={handleChangeOpacity}
        activeBasemap={activeBasemap}
        onChangeBasemap={setActiveBasemap}
        onLocateUser={handleLocateUser}
        onSelectBookmark={handleSelectBookmark}
      />

      {/* Leaflet Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Bottom Sheet Feature Inspector */}
      <BottomSheetDetail
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onFocusMap={() => {
          if (selectedFeature && mapRef.current) {
            // keep current view centered
          }
        }}
      />

    </div>
  );
};
