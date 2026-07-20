import React from 'react';
import { MapPin, Mail, Phone, QrCode, Download, Heart, ShieldCheck, Compass } from 'lucide-react';
import { DusunInfo } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface FooterProps {
  dusun: DusunInfo;
}

export const Footer: React.FC<FooterProps> = ({ dusun }) => {
  return (
    <footer className="bg-dawang-surface border-t border-dawang-border/80 pt-12 pb-24 md:pb-12 text-dawang-sandMuted text-xs relative overflow-hidden">
      <div className="absolute inset-0 bg-batik-tile opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand & QR Info (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dawang-clay to-dawang-paddy flex items-center justify-center text-xl shadow-2.5d-sm">
              🗺️
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-dawang-sand">{dusun.nama}</h3>
              <p className="text-[11px] text-dawang-gold font-medium">{dusun.desa} · {dusun.kecamatan} · {dusun.kabupaten}</p>
            </div>
          </div>

          <p className="text-xs text-dawang-sandMuted leading-relaxed">
            Portal Peta Digital & Cerita Interaktif resmi Dusun Dawang. Dikembangkan sebagai sarana transparansi informasi kependudukan, potensi pertanian, dan dokumen digital KKN.
          </p>

          {/* Mobile QR Card */}
          <div className="glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3 bg-dawang-card/60">
            <div className="w-16 h-16 bg-white p-1 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2.5d-sm">
              {/* QR Code Simulation Graphic */}
              <div className="w-full h-full bg-dawang-dark rounded p-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-3 h-3 bg-dawang-gold rounded-sm" />
                  <div className="w-3 h-3 bg-dawang-clay rounded-sm" />
                </div>
                <div className="text-[8px] font-mono text-center text-white font-bold">QR PETA</div>
                <div className="flex justify-between">
                  <div className="w-3 h-3 bg-dawang-paddyGold rounded-sm" />
                  <div className="w-3 h-3 bg-dawang-gold rounded-sm" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-dawang-gold font-bold text-xs">
                <QrCode className="w-3.5 h-3.5" />
                <span>Peta Digital QR Code</span>
              </div>
              <p className="text-[11px] text-dawang-sandDim mt-0.5">
                Scan via Smartphone di Papan Informasi Publik Dusun Dawang.
              </p>
            </div>
          </div>
        </div>

        {/* Spatial Downloads (3 cols) */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-xs text-dawang-sand uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-dawang-gold" />
            <span>Unduh Dataset Spasial</span>
          </h4>

          <div className="space-y-1.5 text-[11px]">
            <a
              href={getAssetUrl('Data_geojson/wgs84_aoi_dawang.geojson')}
              download
              className="flex items-center justify-between p-2 rounded-xl bg-dawang-card/60 hover:bg-dawang-card text-dawang-sand transition-colors border border-white/5"
            >
              <span>GeoJSON Batas Dusun</span>
              <Download className="w-3.5 h-3.5 text-dawang-clayLight" />
            </a>

            <a
              href={getAssetUrl('Data_geojson/wgs84_aoi_rt.geojson')}
              download
              className="flex items-center justify-between p-2 rounded-xl bg-dawang-card/60 hover:bg-dawang-card text-dawang-sand transition-colors border border-white/5"
            >
              <span>GeoJSON Batas RT 01-05</span>
              <Download className="w-3.5 h-3.5 text-dawang-gold" />
            </a>

            <a
              href={getAssetUrl('Data_geojson/wgs84_rumah.geojson')}
              download
              className="flex items-center justify-between p-2 rounded-xl bg-dawang-card/60 hover:bg-dawang-card text-dawang-sand transition-colors border border-white/5"
            >
              <span>GeoJSON Persil Rumah Warga</span>
              <Download className="w-3.5 h-3.5 text-dawang-paddyGold" />
            </a>

            <a
              href={getAssetUrl('Data_geojson/wgs84_sawah.geojson')}
              download
              className="flex items-center justify-between p-2 rounded-xl bg-dawang-card/60 hover:bg-dawang-card text-dawang-sand transition-colors border border-white/5"
            >
              <span>GeoJSON Irigasi & Sawah</span>
              <Download className="w-3.5 h-3.5 text-dawang-clayLight" />
            </a>
          </div>
        </div>

        {/* Institutional Contacts & Credits (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-xs text-dawang-sand uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-dawang-paddyGold" />
            <span>Kontak Desa</span>
          </h4>

          <div className="space-y-2 text-[11px] text-dawang-sandMuted">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-dawang-clay flex-shrink-0 mt-0.5" />
              <span>Balai Dusun Dawang, Desa Blongkeng, Kec. Ngluwar, Kab. Magelang 56485</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-dawang-gold flex-shrink-0" />
              <span>Perangkat Dusun: +62 812-3456-7890</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-dawang-paddyGold flex-shrink-0" />
              <span>desablongkeng@magelangkab.go.id</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Copyright */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-dawang-sandDim">
        <p>© 2025 Pemerintah Dusun Dawang & Tim KKN. Hak Cipta Dilindungi.</p>
        <p className="flex items-center gap-1">
          Dibuat dengan <Heart className="w-3 h-3 text-dawang-clay fill-dawang-clay" /> untuk Warga Dusun Dawang
        </p>
      </div>
    </footer>
  );
};
