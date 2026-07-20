import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { PotensiItem } from '../../types';

interface VillagePotentialModuleProps {
  potensi: PotensiItem[];
}

export const VillagePotentialModule: React.FC<VillagePotentialModuleProps> = ({ potensi }) => {
  const [selectedPotensi, setSelectedPotensi] = useState<PotensiItem | null>(null);

  return (
    <section id="potensi" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#19150d] via-[#261f12] to-[#19150d] border-y-2 border-[#d4a359]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a359] text-slate-950 border-2 border-[#f5cb78] text-xs font-black tracking-wide mb-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
            <span>KEUNGGULAN & KEKAYAAN ALAM</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Potensi & Pesona Dusun
          </h2>
          <p className="text-xs sm:text-sm text-dawang-goldLight font-medium mt-2">
            Aset penting pendukung kemandirian pangan, wisata budaya, dan pengembangan ekonomi warga.
          </p>
        </div>

        {/* Potensi Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {potensi.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 border-2 border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-dawang-gold hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#141311] border-2 border-dawang-gold/40 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-dawang-gold bg-[#141311]/80 px-2.5 py-1 rounded-lg border border-dawang-gold/30">
                    Potensi 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-lg text-dawang-sand group-hover:text-dawang-gold transition-colors">
                  {item.judul}
                </h3>

                <p className="text-xs text-dawang-sandMuted leading-relaxed line-clamp-3">
                  {item.deskripsi}
                </p>
              </div>

              <button
                onClick={() => setSelectedPotensi(item)}
                className="mt-5 inline-flex items-center justify-between w-full pt-3 border-t border-white/10 text-xs font-bold text-dawang-gold hover:text-white transition-colors"
              >
                <span>Pelajari Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Modal Detail */}
        {selectedPotensi && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="glass-card-elevated rounded-3xl max-w-lg w-full p-6 border-2 border-dawang-gold/60 shadow-2xl relative space-y-4">
              
              <button
                onClick={() => setSelectedPotensi(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-dawang-clay"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#141311] border-2 border-dawang-gold flex items-center justify-center text-3xl shadow-lg">
                  {selectedPotensi.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-dawang-gold uppercase">Potensi Unggulan</span>
                  <h3 className="font-serif font-bold text-xl text-dawang-sand">{selectedPotensi.judul}</h3>
                </div>
              </div>

              <p className="text-xs text-dawang-sandMuted leading-relaxed bg-[#141311]/90 p-4 rounded-2xl border border-white/10">
                {selectedPotensi.deskripsi}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-dawang-sand flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-dawang-gold" />
                  Rekomendasi Pengembangan
                </h4>
                <p className="text-xs text-dawang-sandDim leading-relaxed">
                  Pengembangan lebih lanjut potensi ini dikolaborasikan bersama perangkat desa, Pokdarwis, serta tim KKN melalui pemetaan digital dan pemberdayaan masyarakat.
                </p>
              </div>

              <button
                onClick={() => setSelectedPotensi(null)}
                className="w-full py-3 rounded-xl bg-dawang-gold text-slate-950 text-xs font-extrabold shadow-lg hover:brightness-110"
              >
                Tutup Modal Detail
              </button>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};
