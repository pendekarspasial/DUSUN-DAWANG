import React, { useState } from 'react';
import { Layers, Map as MapIcon, LocateFixed, Bookmark, Info, Eye, EyeOff, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { MapLayerConfig } from '../../types';

interface FloatingMapControlsProps {
  layers: MapLayerConfig[];
  onToggleLayer: (id: string) => void;
  onChangeOpacity: (id: string, opacity: number) => void;
  activeBasemap: string;
  onChangeBasemap: (basemap: string) => void;
  onLocateUser: () => void;
  onSelectBookmark: (lat: number, lng: number, zoom: number) => void;
}

export const FloatingMapControls: React.FC<FloatingMapControlsProps> = ({
  layers,
  onToggleLayer,
  onChangeOpacity,
  activeBasemap,
  onChangeBasemap,
  onLocateUser,
  onSelectBookmark,
}) => {
  const [activePanel, setActivePanel] = useState<'none' | 'layers' | 'basemaps' | 'bookmarks' | 'legend'>('none');

  const basemaps = [
    { id: 'satellite', name: 'Satelit Esri', desc: 'Foto Udara High Res' },
    { id: 'osm', name: 'OpenStreetMap', desc: 'Peta Jalan Standar' },
    { id: 'dark', name: 'CartoDB Dark', desc: 'Vektor Gelap Minimalis' },
    { id: 'topo', name: 'Esri Topografik', desc: 'Kontur & Ketinggian' },
  ];

  const bookmarks = [
    { name: 'Balai Dusun (Pusat)', lat: -7.6170, lng: 110.2780, zoom: 18 },
    { name: 'Masjid Al-Ikhlas', lat: -7.6168, lng: 110.2775, zoom: 19 },
    { name: 'Area RT 01 - RT 05', lat: -7.6172, lng: 110.2782, zoom: 17 },
    { name: 'Persawahan Sisi Timur', lat: -7.6190, lng: 110.2790, zoom: 16 },
    { name: 'Batas Desa Blongkeng', lat: -7.6170, lng: 110.2780, zoom: 14 },
  ];

  const togglePanel = (panel: 'layers' | 'basemaps' | 'bookmarks' | 'legend') => {
    setActivePanel((prev) => (prev === panel ? 'none' : panel));
  };

  return (
    <div className="absolute top-20 right-3 sm:right-6 z-30 flex flex-col gap-2 pointer-events-auto">
      
      {/* Action Buttons Pillar */}
      <div className="glass-card rounded-2xl p-1.5 flex flex-col gap-1.5 border border-white/15 shadow-2.5d-md bg-dawang-dark/90 backdrop-blur-xl">
        <button
          onClick={() => togglePanel('layers')}
          className={`p-2.5 rounded-xl transition-all ${
            activePanel === 'layers' ? 'bg-dawang-clay text-white shadow-2.5d-sm' : 'text-dawang-sand hover:bg-dawang-card'
          }`}
          title="Layer Spasial"
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={() => togglePanel('basemaps')}
          className={`p-2.5 rounded-xl transition-all ${
            activePanel === 'basemaps' ? 'bg-dawang-gold text-dawang-dark shadow-2.5d-sm' : 'text-dawang-sand hover:bg-dawang-card'
          }`}
          title="Pilihan Basemap"
        >
          <MapIcon className="w-4 h-4" />
        </button>

        <button
          onClick={() => togglePanel('bookmarks')}
          className={`p-2.5 rounded-xl transition-all ${
            activePanel === 'bookmarks' ? 'bg-dawang-paddyGold text-dawang-dark shadow-2.5d-sm' : 'text-dawang-sand hover:bg-dawang-card'
          }`}
          title="Bookmark Titik"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        <button
          onClick={onLocateUser}
          className="p-2.5 rounded-xl text-dawang-sand hover:bg-dawang-card active:scale-95 transition-all"
          title="Lokasi Saya (GPS)"
        >
          <LocateFixed className="w-4 h-4 text-dawang-clayLight" />
        </button>
      </div>

      {/* Floating Panel: Layers Switcher & Opacity */}
      {activePanel === 'layers' && (
        <div className="absolute top-0 right-14 w-72 glass-card-elevated rounded-2xl p-4 border border-white/15 shadow-2.5d-lg space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="font-bold text-xs text-dawang-sand flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-dawang-clay" />
              <span>Layer Spasial WGS84</span>
            </h4>
            <span className="text-[10px] text-dawang-sandDim">{layers.filter((l) => l.visible).length} Aktif</span>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {layers.map((layer) => (
              <div key={layer.id} className="p-2.5 rounded-xl bg-dawang-card/70 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="text-xs font-semibold text-dawang-sand">{layer.name}</span>
                  </div>

                  <button
                    onClick={() => onToggleLayer(layer.id)}
                    className={`p-1 rounded-lg ${layer.visible ? 'text-dawang-paddyGold' : 'text-dawang-sandDim'}`}
                  >
                    {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {layer.visible && (
                  <div className="flex items-center gap-2 text-[10px] text-dawang-sandDim pt-1">
                    <SlidersHorizontal className="w-3 h-3 text-dawang-gold" />
                    <span>Transparansi: {Math.round(layer.opacity * 100)}%</span>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      value={layer.opacity}
                      onChange={(e) => onChangeOpacity(layer.id, parseFloat(e.target.value))}
                      className="w-full h-1 bg-dawang-border rounded-lg appearance-none cursor-pointer accent-dawang-gold"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Panel: Basemaps */}
      {activePanel === 'basemaps' && (
        <div className="absolute top-12 right-14 w-64 glass-card-elevated rounded-2xl p-4 border border-white/15 shadow-2.5d-lg space-y-2 animate-in fade-in duration-200">
          <h4 className="font-bold text-xs text-dawang-sand pb-2 border-b border-white/10">
            Peta Dasar (Basemap)
          </h4>
          <div className="space-y-1.5">
            {basemaps.map((b) => (
              <button
                key={b.id}
                onClick={() => onChangeBasemap(b.id)}
                className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                  activeBasemap === b.id
                    ? 'bg-dawang-gold text-dawang-dark font-bold shadow-2.5d-sm'
                    : 'bg-dawang-card/60 text-dawang-sand hover:bg-dawang-card'
                }`}
              >
                <div>
                  <p className="font-bold">{b.name}</p>
                  <p className="text-[10px] opacity-80">{b.desc}</p>
                </div>
                {activeBasemap === b.id && <ShieldCheck className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Panel: Bookmarks */}
      {activePanel === 'bookmarks' && (
        <div className="absolute top-24 right-14 w-64 glass-card-elevated rounded-2xl p-4 border border-white/15 shadow-2.5d-lg space-y-2 animate-in fade-in duration-200">
          <h4 className="font-bold text-xs text-dawang-sand pb-2 border-b border-white/10">
            Fokus Kamera Dusun
          </h4>
          <div className="space-y-1">
            {bookmarks.map((bm, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectBookmark(bm.lat, bm.lng, bm.zoom);
                  setActivePanel('none');
                }}
                className="w-full text-left p-2.5 rounded-xl bg-dawang-card/60 hover:bg-dawang-card text-xs font-semibold text-dawang-sand flex items-center justify-between transition-colors"
              >
                <span>{bm.name}</span>
                <Bookmark className="w-3.5 h-3.5 text-dawang-gold" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
