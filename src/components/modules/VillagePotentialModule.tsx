import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { PotensiItem } from '../../types';

interface VillagePotentialModuleProps {
  potensi: PotensiItem[];
}

export const VillagePotentialModule: React.FC<VillagePotentialModuleProps> = ({ potensi }) => {
  const [selectedPotensi, setSelectedPotensi] = useState<PotensiItem | null>(null);

  return (
    <section id="potensi" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-clay/20 border border-dawang-clay/40 text-dawang-clayLight text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Keunggulan & Kekayaan Alam</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Potensi & Pesona Dusun
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Aset penting pendukung kemandirian pangan, wisata budaya, dan pengembangan ekonomi warga.
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {potensi.map((item, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-6 border border-white/10 shadow-2.5d-sm hover:shadow-2.5d-md hover:border-dawang-gold/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            onClick={() => setSelectedPotensi(item)}
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-dawang-card flex items-center justify-center text-2xl shadow-2.5d-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="font-serif font-bold text-lg text-dawang-sand group-hover:text-dawang-gold transition-colors">
                {item.judul}
              </h3>

              <p className="text-xs text-dawang-sandMuted line-clamp-3 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-white/5 flex items-center justify-between text-xs text-dawang-gold font-bold">
              <span>Pelajari Potensi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet Modal */}
      {selectedPotensi && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md glass-bottom-sheet sm:glass-card-elevated sm:rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedPotensi.icon}</span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-dawang-sand">{selectedPotensi.judul}</h3>
                  <p className="text-xs text-dawang-gold">Potensi Utama Dusun Dawang</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPotensi(null)}
                className="p-1.5 rounded-xl text-dawang-sandDim hover:text-white bg-dawang-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedPotensi.foto && (
              <div className="rounded-xl overflow-hidden aspect-video bg-dawang-surface border border-white/10">
                <img src={selectedPotensi.foto} alt={selectedPotensi.judul} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-xs sm:text-sm text-dawang-sandMuted leading-relaxed">
              {selectedPotensi.deskripsi}
            </p>

            <div className="bg-dawang-card/80 p-3.5 rounded-xl border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-dawang-paddyGold font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rencana Pengembangan Berkelanjutan</span>
              </div>
              <p className="text-dawang-sandDim text-[11px]">
                Dukungan fasilitas infrastruktur spasial dan promosi WebGIS ditujukan agar potensi ini menarik kemitraan investor, wisatawan, dan akademisi.
              </p>
            </div>

            <button
              onClick={() => setSelectedPotensi(null)}
              className="w-full py-3 rounded-xl bg-dawang-clay text-white text-xs font-bold shadow-2.5d-sm hover:brightness-110"
            >
              Tutup Modal Detail
            </button>

          </div>
        </div>
      )}
    </section>
  );
};
