import React from 'react';
import { MapPin, Phone, QrCode, ShieldCheck, Instagram } from 'lucide-react';
import { DusunInfo } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface FooterProps {
  dusun: DusunInfo;
}

export const Footer: React.FC<FooterProps> = ({ dusun }) => {
  return (
    <footer className="bg-dawang-surface border-t border-dawang-border/80 pt-12 pb-24 md:pb-12 text-dawang-sandMuted text-xs relative overflow-hidden">
      <div className="absolute inset-0 bg-batik-tile opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Brand & Partner Logos Info (6 cols) */}
        <div className="md:col-span-7 space-y-5">
          <div className="flex items-center gap-4">
            {/* Logo Kab Magelang */}
            <div className="w-12 h-12 rounded-xl bg-white/10 p-1.5 border border-white/20 flex items-center justify-center shadow-md">
              <img
                src={getAssetUrl('assets/images/logo_kab_magelang.png')}
                alt="Logo Kabupaten Magelang"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Logo Tim KKN Dawang */}
            <div className="w-12 h-12 rounded-xl bg-white/10 p-1 border border-white/20 flex items-center justify-center shadow-md overflow-hidden">
              <img
                src={getAssetUrl('assets/images/logo_kkn_dawang.jpg')}
                alt="Logo Tim KKN Dawang"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-dawang-sand">{dusun.nama}</h3>
              <p className="text-xs text-dawang-gold font-semibold">{dusun.desa} · {dusun.kecamatan} · {dusun.kabupaten}</p>
            </div>
          </div>

          <p className="text-xs text-dawang-sandMuted leading-relaxed max-w-xl">
            Portal Peta Digital & Cerita Interaktif resmi Dusun Dawang. Dikembangkan oleh Tim KKN Bela Negara UPN Veteran Yogyakarta 2026 sebagai sarana transparansi informasi kependudukan, potensi pertanian, dan peta wilayah.
          </p>

          {/* Mobile QR Card */}
          <div className="glass-card p-3 rounded-2xl border border-white/10 flex items-center gap-3 bg-dawang-card/60 max-w-md">
            <div className="w-14 h-14 bg-white p-1 rounded-xl flex items-center justify-center flex-shrink-0 shadow-2.5d-sm">
              <div className="w-full h-full bg-dawang-dark rounded p-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-2.5 h-2.5 bg-dawang-gold rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-dawang-clay rounded-sm" />
                </div>
                <div className="text-[7px] font-mono text-center text-white font-bold">QR PETA</div>
                <div className="flex justify-between">
                  <div className="w-2.5 h-2.5 bg-dawang-paddyGold rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-dawang-gold rounded-sm" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-dawang-gold font-bold text-xs">
                <QrCode className="w-4 h-4" />
                <span>Peta Digital QR Code</span>
              </div>
              <p className="text-[11px] text-dawang-sandDim mt-0.5">
                Scan via Smartphone di Papan Informasi Publik Dusun Dawang.
              </p>
            </div>
          </div>
        </div>

        {/* Institutional Contacts (5 cols) */}
        <div className="md:col-span-5 space-y-4 bg-dawang-card/40 p-5 rounded-2xl border border-white/10">
          <h4 className="font-bold text-xs text-dawang-sand uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
            <ShieldCheck className="w-4 h-4 text-dawang-paddyGold" />
            <span>Kontak & Informasi Desa</span>
          </h4>

          <div className="space-y-3 text-xs text-dawang-sandMuted">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-dawang-clay flex-shrink-0 mt-0.5" />
              <span>Balai Dusun Dawang, Desa Blongkeng, Kec. Ngluwar, Kab. Magelang 56485</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-dawang-gold flex-shrink-0" />
              <a
                href="tel:081575906559"
                className="hover:text-dawang-gold transition-colors font-medium text-dawang-sand"
              >
                081575906559 <span className="text-dawang-gold font-bold">(Pak Mundoni - Kadus Dawang)</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />
              <a
                href="https://instagram.com/dailydawang"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition-colors font-medium text-dawang-sand flex items-center gap-1"
              >
                <span>Instagram Tim KKN:</span>
                <span className="text-pink-400 font-bold underline">@dailydawang</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal / Copyright */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 mt-8 border-t border-white/5 text-center sm:text-left text-[11px] text-dawang-sandDim">
        <p>© 2026 Pemerintah Dusun Dawang & Tim KKN UPN Veteran Yogyakarta. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};
