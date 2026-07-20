import React, { useState } from 'react';
import { FolderArchive, Download, FileText, Calendar, Clock, CheckCircle, Search, Filter, X } from 'lucide-react';
import { ProkerKKNItem } from '../../types';

interface DigitalArchiveModuleProps {
  prokerList: ProkerKKNItem[];
}

export const DigitalArchiveModule: React.FC<DigitalArchiveModuleProps> = ({ prokerList }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedProker, setSelectedProker] = useState<ProkerKKNItem | null>(null);

  const categories = ['semua', 'Teknologi & GIS', 'Kesehatan', 'Pendidikan & Ekonomi', 'Lingkungan', 'Infrastruktur', 'Administrasi'];

  const filteredProker = prokerList.filter((item) => {
    const matchesCategory = selectedCategory === 'semua' || item.kategori.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesQuery = item.judul.toLowerCase().includes(query.toLowerCase()) || item.deskripsi.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="arsip-kkn" className="relative py-16 px-4 sm:px-6 bg-gradient-to-b from-[#141311] via-[#1a1816] to-[#141311] border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-yellow-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-clay/20 border border-dawang-clay/40 text-dawang-clayLight text-xs font-semibold mb-3">
          <FolderArchive className="w-3.5 h-3.5" />
          <span>Repository Luaran & E-Archive</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Arsip Digital Program Kerja KKN
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Pusat pencarian dan unduhan dokumen laporan resmi, poster, media edukasi, dan hasil program kerja KKN.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-dawang-clay text-white shadow-2.5d-sm'
                  : 'glass-card text-dawang-sandDim hover:text-dawang-sand'
              }`}
            >
              {cat === 'semua' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari program kerja..."
            className="w-full bg-dawang-card/80 text-dawang-sand text-xs placeholder:text-dawang-sandDim rounded-xl px-3 py-2 pl-9 border border-white/10 focus:outline-none focus:border-dawang-gold"
          />
          <Search className="w-4 h-4 text-dawang-sandDim absolute left-3 top-2.5" />
        </div>

      </div>

      {/* Proker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProker.map((proker) => (
          <div
            key={proker.id}
            className="glass-card rounded-2xl p-6 border border-white/10 shadow-2.5d-sm hover:shadow-2.5d-md hover:border-dawang-gold/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{proker.emoji}</span>
                <span className="text-[10px] font-bold text-dawang-gold bg-dawang-gold/10 border border-dawang-gold/30 px-2.5 py-1 rounded-full uppercase">
                  {proker.kategori}
                </span>
              </div>

              <h3 className="font-bold text-base text-dawang-sand">{proker.judul}</h3>
              <p className="text-xs text-dawang-sandMuted leading-relaxed">{proker.deskripsi}</p>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-dawang-card/60 p-2.5 rounded-xl border border-white/5">
                <div className="flex items-center gap-1.5 text-dawang-sandMuted">
                  <Calendar className="w-3.5 h-3.5 text-dawang-clayLight" />
                  <span>{proker.tanggal}</span>
                </div>
                <div className="flex items-center gap-1.5 text-dawang-sandMuted">
                  <Clock className="w-3.5 h-3.5 text-dawang-paddyGold" />
                  <span>{proker.durasi}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-dawang-paddyGold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Output: {proker.output}</span>
              </span>

              <button
                onClick={() => setSelectedProker(proker)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dawang-clay hover:bg-dawang-clayLight text-white text-xs font-bold active:scale-95 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Buka Berkas</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Proker Detail Modal */}
      {selectedProker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg glass-bottom-sheet sm:glass-card-elevated sm:rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedProker.emoji}</span>
                <h3 className="font-bold text-sm text-dawang-sand">Berkas Laporan KKN</h3>
              </div>
              <button
                onClick={() => setSelectedProker(null)}
                className="p-1.5 rounded-xl text-dawang-sandDim hover:text-white bg-dawang-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h4 className="font-serif font-bold text-lg text-dawang-sand">{selectedProker.judul}</h4>
            <p className="text-xs text-dawang-sandMuted leading-relaxed">{selectedProker.deskripsi}</p>

            <div className="bg-dawang-card/80 p-3 rounded-xl border border-white/5 space-y-2 text-xs">
              <p className="font-bold text-dawang-gold">Tim Pelaksana Program:</p>
              <div className="flex flex-wrap gap-1">
                {selectedProker.anggota.map((a, idx) => (
                  <span key={idx} className="bg-dawang-border px-2 py-0.5 rounded text-[11px] text-dawang-sand">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`/Data_geojson/wgs84_aoi_dawang.geojson`}
                download
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-dawang-clay text-white text-xs font-bold shadow-2.5d-sm hover:brightness-110 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Laporan Resmi (PDF)</span>
              </a>

              <button
                onClick={() => setSelectedProker(null)}
                className="w-full py-2.5 rounded-xl glass-card text-xs text-dawang-sand font-semibold hover:bg-dawang-card"
              >
                Tutup Arsip
              </button>
            </div>

          </div>
        </div>
      )}
      </div>
    </section>
  );
};
