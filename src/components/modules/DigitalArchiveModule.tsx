import React, { useState, useEffect } from 'react';
import {
  FolderArchive, CheckCircle, Search, X,
  Image as ImageIcon, PlayCircle, ChevronLeft, ChevronRight,
  BookOpen, FileText, ListOrdered, Target, Users, ZoomIn, ZoomOut,
} from 'lucide-react';
import { ProkerKKNItem } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface DigitalArchiveModuleProps {
  prokerList: ProkerKKNItem[];
}

type PageType = 'cover' | 'narasi' | 'langkah' | 'output' | 'foto' | 'video';
interface BookPage { type: PageType; label: string }

function buildPages(proker: ProkerKKNItem): BookPage[] {
  const pages: BookPage[] = [{ type: 'cover', label: 'Sampul' }];
  if (proker.narasi) pages.push({ type: 'narasi', label: 'Narasi Kegiatan' });
  if (proker.langkah?.length) pages.push({ type: 'langkah', label: 'Langkah-Langkah' });
  pages.push({ type: 'output', label: 'Capaian & Output' });
  if (proker.foto?.length) pages.push({ type: 'foto', label: 'Dokumentasi Foto' });
  if (proker.video) pages.push({ type: 'video', label: 'Dokumentasi Video' });
  return pages;
}

const KATEGORI_COLORS: Record<string, string> = {
  'Proker Utama': 'from-[#8b2800]/40 to-[#c2593f]/20 border-[#c2593f]/50',
  'Proker Pendukung': 'from-[#1a4a20]/40 to-[#3a8b40]/20 border-[#4a9b50]/50',
  'Proker Individu': 'from-[#1a2a5a]/40 to-[#3a5ab0]/20 border-[#4a6ac0]/50',
};

const KATEGORI_TEXT: Record<string, string> = {
  'Proker Utama': 'text-dawang-clay',
  'Proker Pendukung': 'text-emerald-400',
  'Proker Individu': 'text-blue-400',
};

export const DigitalArchiveModule: React.FC<DigitalArchiveModuleProps> = ({ prokerList }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [selectedProker, setSelectedProker] = useState<ProkerKKNItem | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);

  useEffect(() => {
    if (selectedProker) {
      document.body.style.overflow = 'hidden';
      setCurrentPage(0);
      setPageKey((k) => k + 1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProker?.id]);

  const categories = ['semua', 'Proker Utama', 'Proker Pendukung', 'Proker Individu'];

  const filteredProker = prokerList.filter((item) => {
    const matchesCategory = selectedCategory === 'semua' || item.kategori === selectedCategory;
    const matchesQuery =
      item.judul.toLowerCase().includes(query.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const openModal = (proker: ProkerKKNItem) => {
    setSelectedProker(proker);
  };

  const goToPage = (idx: number, pages: BookPage[]) => {
    if (idx < 0 || idx >= pages.length) return;
    setCurrentPage(idx);
    setPageKey((k) => k + 1);
  };

  const renderPageContent = (pageType: PageType, proker: ProkerKKNItem) => {
    switch (pageType) {
      case 'cover':
        return (
          <div className="text-center space-y-5 py-8 px-2">
            <div className="text-7xl drop-shadow-xl leading-none">{proker.emoji}</div>
            <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full border ${KATEGORI_TEXT[proker.kategori] ?? 'text-dawang-clayLight'} bg-white/8 border-white/20`}>
              {proker.kategori}
            </span>
            <h3 className="font-serif font-bold text-xl text-dawang-sand leading-snug px-2">
              {proker.judul}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-center gap-1.5 text-dawang-gold font-semibold">
                <Users className="w-3.5 h-3.5" />
                Tim Pelaksana
              </div>
              <div className="space-y-0.5 text-dawang-sandMuted">
                {proker.anggota.map((a, i) => <div key={i}>{a}</div>)}
              </div>
            </div>
            <div className="text-[11px] text-dawang-sandDim bg-white/5 rounded-xl px-4 py-2 border border-white/10 inline-block">
              {proker.tanggal} · {proker.durasi}
            </div>
          </div>
        );

      case 'narasi':
        return (
          <div className="space-y-3 py-3">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-dawang-gold" />
              <h4 className="font-bold text-sm text-dawang-gold">Narasi Kegiatan</h4>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-3 text-xs text-dawang-sandMuted leading-[1.8] max-h-[52vh] overflow-y-auto pr-2">
              {(proker.narasi || '').split('\n\n').map((para, i) => (
                <p key={i} className={i === 0 ? 'text-dawang-sand' : ''}>{para}</p>
              ))}
            </div>
          </div>
        );

      case 'langkah':
        return (
          <div className="space-y-3 py-3">
            <div className="flex items-center gap-2 mb-1">
              <ListOrdered className="w-4 h-4 text-dawang-gold" />
              <h4 className="font-bold text-sm text-dawang-gold">Langkah-Langkah</h4>
            </div>
            <div className="space-y-2 max-h-[52vh] overflow-y-auto pr-1">
              {(proker.langkah || []).map((step, i) => (
                <div key={i} className="flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/8">
                  <span className="w-6 h-6 rounded-full bg-dawang-clay flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-dawang-sandMuted leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'output':
        return (
          <div className="space-y-3 py-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-dawang-gold" />
              <h4 className="font-bold text-sm text-dawang-gold">Capaian & Output</h4>
            </div>
            <div className="bg-dawang-gold/10 border-2 border-dawang-gold/30 rounded-2xl p-8 text-center space-y-5">
              <div className="text-6xl">{proker.emoji}</div>
              <p className="text-dawang-gold font-bold text-base leading-snug">{proker.output}</p>
              <div className="flex items-center justify-center gap-2 text-xs text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Program berhasil dilaksanakan</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs bg-white/5 p-3 rounded-xl border border-white/10">
              <div>
                <span className="text-dawang-sandDim block text-[10px] mb-0.5">Waktu Pelaksanaan</span>
                <span className="font-bold text-dawang-sand">{proker.tanggal}</span>
              </div>
              <div>
                <span className="text-dawang-sandDim block text-[10px] mb-0.5">Durasi</span>
                <span className="font-bold text-dawang-sand">{proker.durasi}</span>
              </div>
            </div>
          </div>
        );

      case 'foto':
        return (
          <div className="space-y-3 py-3">
            <div className="flex items-center gap-2 mb-1">
              <ImageIcon className="w-4 h-4 text-dawang-gold" />
              <h4 className="font-bold text-sm text-dawang-gold">Dokumentasi Foto</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-[52vh] overflow-y-auto">
              {(proker.foto || []).map((f, i) => (
                <button
                  key={i}
                  onClick={() => { setLightboxPhoto(f); setLightboxZoom(1); }}
                  className="relative group overflow-hidden rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-dawang-gold"
                >
                  <img
                    src={getAssetUrl(f)}
                    alt={`Foto ${i + 1}`}
                    className="w-full aspect-video object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-3 py-3">
            <div className="flex items-center gap-2 mb-1">
              <PlayCircle className="w-4 h-4 text-dawang-gold" />
              <h4 className="font-bold text-sm text-dawang-gold">Dokumentasi Video</h4>
            </div>
            <video src={getAssetUrl(proker.video || '')} controls
              className="w-full rounded-xl border border-white/10" preload="metadata" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="arsip-kkn" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#1a1006] via-[#251a08] to-[#1a1006] border-y-2 border-dawang-clay/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-orange-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-dawang-clay/10 rounded-full blur-3xl pointer-events-none" />

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

        {/* Filter & Search */}
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProker.map((proker) => (
            <div
              key={proker.id}
              className="glass-card rounded-2xl p-6 border-2 border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-dawang-clay hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#1c1408] border-2 border-dawang-clay/40 flex items-center justify-center text-2xl shadow-md">
                    {proker.emoji}
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${KATEGORI_TEXT[proker.kategori] ?? 'text-dawang-clayLight'} bg-[#1c1408]/90 border-white/15`}>
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
                <span className="text-dawang-gold font-semibold flex items-center gap-1 line-clamp-1 flex-1 mr-3">
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {proker.output}
                </span>
                <button
                  onClick={() => openModal(proker)}
                  className="px-3 py-1.5 rounded-lg bg-dawang-clay/30 hover:bg-dawang-clay text-white text-[11px] font-bold border border-dawang-clay/50 transition-all whitespace-nowrap"
                >
                  Buka Buku
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ────────────────── FLIPBOOK MODAL ────────────────── */}
        {selectedProker && (() => {
          const pages = buildPages(selectedProker);
          const page = pages[currentPage];
          const colorClass = KATEGORI_COLORS[selectedProker.kategori] ?? 'from-[#2a1c0e]/40 to-[#c2593f]/20 border-dawang-clay/50';

          return (
            <div
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedProker(null)}
            >
              <div
                className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-2 border-dawang-clay/50 flex flex-col"
                style={{ background: 'linear-gradient(160deg, #2e1d0d 0%, #1c1208 55%, #291a09 100%)', maxHeight: '90vh' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Book spine (left accent strip) */}
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-dawang-clay via-[#9a4028] to-[#6a2c18] rounded-l-3xl" />

                {/* Warm texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMCAwTDQgNE0tMSAxTDEgLTFNMyA1TDUgMyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pl-6 pr-5 pt-4 pb-3 border-b border-white/10 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-dawang-clay" />
                    <span className="text-xs font-bold text-dawang-sandDim">
                      {currentPage + 1} / {pages.length}
                    </span>
                    <span className="hidden sm:inline text-[10px] text-dawang-sandDim/50">— {page.label}</span>
                  </div>

                  {/* Tab pills */}
                  <div className="flex items-center gap-1 overflow-x-auto max-w-[60%]">
                    {pages.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i, pages)}
                        className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                          i === currentPage
                            ? 'bg-dawang-gold text-dawang-dark'
                            : 'text-dawang-sandDim hover:text-dawang-sand'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProker(null)}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-dawang-clay transition-all ml-2"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Page content */}
                <div className="pl-6 pr-5 flex-1 overflow-y-auto">
                  <div key={pageKey} className="animate-fadeIn">
                    {renderPageContent(page.type, selectedProker)}
                  </div>
                </div>

                {/* Navigation footer */}
                <div className="pl-6 pr-5 pb-5 pt-3 border-t border-white/10 flex-shrink-0">
                  {/* Progress bar */}
                  <div className="flex gap-1 mb-3 justify-center">
                    {pages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i, pages)}
                        className={`transition-all rounded-full ${
                          i === currentPage
                            ? 'w-6 h-2 bg-dawang-gold'
                            : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => goToPage(currentPage - 1, pages)}
                      disabled={currentPage === 0}
                      className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 text-dawang-sand disabled:opacity-25 hover:bg-white/10 transition-all active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => goToPage(currentPage + 1, pages)}
                      disabled={currentPage === pages.length - 1}
                      className="w-11 h-11 rounded-full flex items-center justify-center bg-dawang-clay text-white disabled:opacity-25 hover:brightness-110 transition-all active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ────────── LIGHTBOX ────────── */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex flex-col"
          onWheel={(e) => {
            e.preventDefault();
            setLightboxZoom(z => Math.max(0.5, Math.min(3, z - e.deltaY * 0.001)));
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-black/60 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLightboxZoom(z => Math.max(0.5, z - 0.25))}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-white text-xs font-mono w-14 text-center select-none">
                {Math.round(lightboxZoom * 100)}%
              </span>
              <button
                onClick={() => setLightboxZoom(z => Math.min(3, z + 0.25))}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => { setLightboxPhoto(null); setLightboxZoom(1); }}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-dawang-clay text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image area */}
          <div
            className="flex-1 overflow-auto flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => { setLightboxPhoto(null); setLightboxZoom(1); }}
          >
            <img
              src={getAssetUrl(lightboxPhoto)}
              alt="Preview"
              onClick={(e) => e.stopPropagation()}
              style={{
                transform: `scale(${lightboxZoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease',
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                cursor: 'default',
              }}
              className="rounded-lg shadow-2xl block"
            />
          </div>
        </div>
      )}
    </section>
  );
};
