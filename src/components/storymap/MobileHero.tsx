import React from 'react';
import { Map, ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';
import { DusunInfo } from '../../types';

interface MobileHeroProps {
  dusun: DusunInfo;
  onOpenGis: () => void;
  onExploreStory: () => void;
}

export const MobileHero: React.FC<MobileHeroProps> = ({
  dusun,
  onOpenGis,
  onExploreStory,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-6 pb-12">
      {/* Background Layers: Volcanic Gradient + Low Opacity Batik Tile */}
      <div className="absolute inset-0 bg-gradient-to-b from-dawang-dark via-[#1a1815] to-dawang-dark pointer-events-none" />
      <div className="absolute inset-0 bg-batik-hero opacity-20 bg-cover bg-center pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-batik-tile opacity-10 pointer-events-none" />

      {/* Decorative Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-dawang-clay/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-dawang-paddy/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-10 text-center flex-1 flex flex-col items-center justify-center">
        
        {/* Regional Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dawang-card/80 border border-white/10 text-dawang-gold text-xs font-semibold shadow-2.5d-sm mb-6 animate-float-slow">
          <span className="w-2 h-2 rounded-full bg-dawang-clay animate-ping" />
          <ShieldCheck className="w-3.5 h-3.5 text-dawang-gold" />
          <span>{dusun.desa} · {dusun.kecamatan} · {dusun.kabupaten}</span>
        </div>

        {/* Main Title & Tagline */}
        <h1 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-dawang-sand tracking-tight mb-3">
          <span className="block bg-gradient-to-r from-dawang-sand via-white to-dawang-sandMuted bg-clip-text text-transparent">
            {dusun.nama}
          </span>
          <span className="block font-sans font-medium text-lg sm:text-2xl md:text-3xl text-dawang-gold italic mt-2">
            "Bersahaja di Lereng Merapi"
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-xl text-xs sm:text-base text-dawang-sandMuted leading-relaxed mb-8">
          Portal Peta Digital & Cerita Interaktif yang menyajikan narasi sejarah, demografi kependudukan, potensi pertanian, serta informasi peta wilayah Dusun Dawang.
        </p>

        {/* Quick-Action CTA Buttons for Mobile QR Visitors */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md px-2 mb-10">
          <button
            onClick={onOpenGis}
            className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-dawang-clay to-dawang-clayLight text-white font-bold text-sm shadow-2.5d-md hover:brightness-110 active:scale-98 transition-all"
          >
            <Map className="w-5 h-5 animate-pulse" />
            <span>Buka Peta Interaktif Dusun</span>
          </button>

          <button
            onClick={onExploreStory}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-card text-dawang-sand font-semibold text-sm hover:bg-dawang-card border border-white/15 active:scale-98 transition-all"
          >
            <Sparkles className="w-4 h-4 text-dawang-gold" />
            <span>Jelajahi Cerita Dusun</span>
          </button>
        </div>

        {/* 2.5D Key Highlights Pill Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          <div className="glass-card rounded-xl p-3 text-center border border-white/10 shadow-2.5d-sm">
            <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Total Warga</p>
            <p className="text-xl font-bold text-dawang-sand font-serif mt-0.5">458 Jiwa</p>
          </div>

          <div className="glass-card rounded-xl p-3 text-center border border-white/10 shadow-2.5d-sm">
            <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Kepala Keluarga</p>
            <p className="text-xl font-bold text-dawang-sand font-serif mt-0.5">124 KK</p>
          </div>

          <div className="glass-card rounded-xl p-3 text-center border border-white/10 shadow-2.5d-sm">
            <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Luas Wilayah</p>
            <p className="text-xl font-bold text-dawang-gold font-serif mt-0.5">±85 Ha</p>
          </div>

          <div className="glass-card rounded-xl p-3 text-center border border-white/10 shadow-2.5d-sm">
            <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Ketinggian</p>
            <p className="text-xl font-bold text-dawang-paddyGold font-serif mt-0.5">350 mdpl</p>
          </div>
        </div>

      </div>

      {/* Scroll Down Prompt */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-4">
        <button
          onClick={onExploreStory}
          className="flex flex-col items-center text-xs text-dawang-sandDim hover:text-dawang-sand transition-colors group"
        >
          <span className="mb-1 text-[11px] tracking-wider uppercase font-semibold">Gulir Ke Bawah</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-dawang-gold" />
        </button>
      </div>

      {/* Organic Curved Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-dawang-surface clip-path-curve pointer-events-none" />
    </section>
  );
};
