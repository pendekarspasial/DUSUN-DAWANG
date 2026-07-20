import React from 'react';
import { MapPin, Phone, ShieldCheck, Instagram } from 'lucide-react';
import { DusunInfo } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface FooterProps {
  dusun: DusunInfo;
}

export const Footer: React.FC<FooterProps> = ({ dusun }) => {
  return (
    <footer className="bg-dawang-surface border-t border-dawang-border/80 pt-10 pb-24 md:pb-10 text-dawang-sandMuted text-xs relative overflow-hidden">
      <div className="absolute inset-0 bg-batik-tile opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Brand & Partner Logos Info */}
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

        {/* Institutional Contacts Box */}
        <div className="w-full md:w-auto bg-dawang-card/40 p-4 rounded-2xl border border-white/10">
          <h4 className="font-bold text-xs text-dawang-sand uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-dawang-paddyGold" />
            <span>Kontak & Informasi Desa</span>
          </h4>

          <div className="space-y-2.5 text-xs text-dawang-sandMuted">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 mt-6 border-t border-white/5 text-center sm:text-left text-[11px] text-dawang-sandDim">
        <p>© 2026 Pemerintah Dusun Dawang & Tim KKN UPN Veteran Yogyakarta. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};
