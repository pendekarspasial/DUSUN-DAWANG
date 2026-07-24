import React, { useState, useEffect } from 'react';
import { FolderArchive, CheckCircle, Search, X, Image, PlayCircle } from 'lucide-react';
import { ProkerKKNItem } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface DigitalArchiveModuleProps {
  prokerList: ProkerKKNItem[];
}

export const DigitalArchiveModule: React.FC<DigitalArchiveModuleProps> = ({ prokerList }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedProker, setSelectedProker] = useState<ProkerKKNItem | null>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedProker) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProker]);

  const categories = ['semua', 'Proker Utama', 'Proker Pendukung', 'Proker Individu'];

  const filteredProker = prokerList.filter((item) => {
    const matchesCategory = selectedCategory === 'semua' || item.kategori.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery = item.judul.toLowerCase().includes(query.toLowerCase()) || item.deskripsi.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="arsip-kkn" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#171412] via-[#241d18] to-[#171412] border-y-2 border-dawang-clay/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c2593f] text-white border-2 border-[#e0755b] text-xs font-extrabold tracking-wide mb-3 shadow-lg">
            <FolderArchive className="w-4 h-4 text-white animate-pulse" />
            <span>ARSIP DIGITAL & REKAP PROKER</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Dokumentasi Program KKN
          </h2>
          <p className="text-xs sm:text-sm text-dawang-clayLight font-medium mt-2">
            Rekapitulasi karya pengabdian, pemetaan geospasial, dan program pemberdayaan warga Dusun Dawang.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-dawang-sandDim absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari program kerja KKN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141311]/90 border-2 border-white/15 text-xs text-dawang-sand placeholder-dawang-sandDim focus:outline-none focus:border-dawang-gold shadow-md"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-md ${
                  selectedCategory === cat
                    ? 'bg-dawang-clay text-white shadow-xl border-2 border-white/30'
                    : 'glass-card border-white/10 text-dawang-sandMuted hover:text-white'
                }`}
              >
                {cat === 'semua' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Proker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProker.map((proker) => (
            <div
              key={proker.id}
              className="glass-card rounded-2xl p-6 border-2 border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-dawang-clay hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#141311] border-2 border-dawang-clay/40 flex items-center justify-center text-2xl shadow-md">
                    {proker.emoji}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-dawang-clayLight bg-[#141311]/90 px-2.5 py-1 rounded-lg border border-dawang-clay/30">
                    {proker.kategori}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-dawang-sand leading-snug group-hover:text-dawang-gold transition-colors">
                  {proker.judul}
                </h3>

                <p className="text-xs text-dawang-sandMuted line-clamp-3 leading-relaxed">
                  {proker.deskripsi}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-dawang-gold font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {proker.output}
                </span>

                <button
                  onClick={() => setSelectedProker(proker)}
                  className="px-3 py-1.5 rounded-lg bg-dawang-clay/30 hover:bg-dawang-clay text-white text-[11px] font-bold border border-dawang-clay/50 transition-all"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedProker && (
          <div
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
            onClick={() => setSelectedProker(null)}
          >
            <div
              className="glass-card-elevated rounded-3xl max-w-lg w-full p-6 border-2 border-dawang-clay/60 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProker(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-dawang-clay shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#141311] border-2 border-dawang-clay flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                  {selectedProker.emoji}
                </div>
                <div>
                  <span className="text-xs font-bold text-dawang-clayLight uppercase">{selectedProker.kategori}</span>
                  <h3 className="font-serif font-bold text-xl text-dawang-sand">{selectedProker.judul}</h3>
                </div>
              </div>

              <p className="text-xs text-dawang-sandMuted leading-relaxed bg-[#141311]/90 p-4 rounded-2xl border border-white/10 shadow-inner">
                {selectedProker.deskripsi}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#141311]/80 p-3 rounded-xl border border-white/10">
                <div>
                  <span className="text-dawang-sandDim block text-[10px]">Waktu Pelaksanaan</span>
                  <span className="font-bold text-dawang-sand">{selectedProker.tanggal} ({selectedProker.durasi})</span>
                </div>
                <div>
                  <span className="text-dawang-sandDim block text-[10px]">Capaian Output</span>
                  <span className="font-bold text-dawang-gold">{selectedProker.output}</span>
                </div>
              </div>

              {/* Foto Dokumentasi */}
              {selectedProker.foto && selectedProker.foto.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-dawang-sandDim flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5 text-dawang-gold" />
                    Foto Dokumentasi
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProker.foto.map((f, i) => (
                      <img
                        key={i}
                        src={getAssetUrl(f)}
                        alt={`Dokumentasi ${i + 1}`}
                        className="w-full aspect-video object-cover rounded-xl border border-white/10"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {selectedProker.video && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-dawang-sandDim flex items-center gap-1.5">
                    <PlayCircle className="w-3.5 h-3.5 text-dawang-gold" />
                    Video Dokumentasi
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <video
                      src={getAssetUrl(selectedProker.video)}
                      controls
                      className="w-full"
                      preload="metadata"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedProker(null)}
                className="w-full py-3 rounded-xl bg-dawang-clay text-white text-xs font-extrabold shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Tutup Arsip
              </button>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};
