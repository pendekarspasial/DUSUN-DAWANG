import React from 'react';
import { X, MapPin, Home, Layers, Info, Navigation, ExternalLink, Share2 } from 'lucide-react';
import { GeoJSONFeatureProperties } from '../../types';

interface BottomSheetDetailProps {
  feature: GeoJSONFeatureProperties | null;
  onClose: () => void;
  onFocusMap?: () => void;
}

export const BottomSheetDetail: React.FC<BottomSheetDetailProps> = ({
  feature,
  onClose,
  onFocusMap,
}) => {
  if (!feature) return null;

  const title = feature.Name || feature.nama || feature.pemilik || feature.RT || `Fitur GIS #${feature.id || 'Detail'}`;
  const subtitle = feature.fungsi || feature.keterangan || (feature.RT ? `Wilayah ${feature.RT}` : 'Informasi Spasial Dusun Dawang');
  const area = feature.luas_m2 ? `${Number(feature.luas_m2).toLocaleString('id-ID')} m²` : null;

  return (
    <div className="fixed bottom-16 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-40 animate-in slide-in-from-bottom duration-300 pointer-events-auto">
      <div className="glass-bottom-sheet sm:glass-card-elevated rounded-3xl p-5 border border-white/15 shadow-2.5d-lg space-y-4 max-h-[70vh] overflow-y-auto">
        
        {/* Top Handle / Close Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto sm:hidden" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-dawang-clay animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-dawang-gold">
              Detail Geospasial
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-dawang-sandDim hover:text-white bg-dawang-card hover:bg-dawang-border transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Header */}
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-dawang-sand flex items-center gap-2">
            <Home className="w-4 h-4 text-dawang-clayLight flex-shrink-0" />
            <span className="truncate">{title}</span>
          </h3>
          <p className="text-xs text-dawang-sandMuted">{subtitle}</p>
        </div>

        {/* Feature Image / Placeholder */}
        {feature.foto ? (
          <div className="rounded-xl overflow-hidden aspect-video bg-dawang-surface border border-white/10">
            <img src={feature.foto} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="bg-dawang-card/70 rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-dawang-paddy/30 text-dawang-paddyGold flex items-center justify-center font-bold text-lg">
              🗺️
            </div>
            <div className="text-xs">
              <p className="font-semibold text-dawang-sand">Persil Spasial Dusun Dawang</p>
              <p className="text-dawang-sandDim text-[11px]">Terverifikasi Hasil Survey KKN 2025</p>
            </div>
          </div>
        )}

        {/* Attribute List */}
        <div className="space-y-2 text-xs">
          {feature.RT && (
            <div className="flex justify-between p-2 rounded-lg bg-dawang-card/50">
              <span className="text-dawang-sandDim">Batas RT</span>
              <span className="font-bold text-dawang-sand">{feature.RT}</span>
            </div>
          )}

          {area && (
            <div className="flex justify-between p-2 rounded-lg bg-dawang-card/50">
              <span className="text-dawang-sandDim">Estimasi Luas</span>
              <span className="font-bold text-dawang-gold">{area}</span>
            </div>
          )}

          {feature.pemilik && (
            <div className="flex justify-between p-2 rounded-lg bg-dawang-card/50">
              <span className="text-dawang-sandDim">Nama Kepala Keluarga / Bangunan</span>
              <span className="font-bold text-dawang-sand">{feature.pemilik}</span>
            </div>
          )}

          {feature.keterangan && (
            <div className="p-2 rounded-lg bg-dawang-card/50">
              <span className="text-dawang-sandDim block mb-0.5">Catatan Atribut</span>
              <span className="text-dawang-sand">{feature.keterangan}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {onFocusMap && (
            <button
              onClick={onFocusMap}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-dawang-clay text-white text-xs font-bold shadow-2.5d-sm hover:brightness-110 active:scale-95 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Fokus Kamera</span>
            </button>
          )}

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Geospasial ${title}`,
                  text: `Lihat lokasi ${title} di WebGIS Dusun Dawang`,
                  url: window.location.href,
                }).catch(() => {});
              }
            }}
            className="p-2.5 rounded-xl glass-card text-dawang-sand hover:bg-dawang-card active:scale-95 transition-all"
            title="Bagikan Lokasi"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
