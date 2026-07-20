import React from 'react';
import { MapPin, Mountain, Trees, Compass, Users, Home, Award } from 'lucide-react';
import { DusunInfo, PendudukInfo } from '../../types';

interface IdentitySummaryCardProps {
  dusun: DusunInfo;
  penduduk: PendudukInfo;
}

export const IdentitySummaryCard: React.FC<IdentitySummaryCardProps> = ({
  dusun,
  penduduk,
}) => {
  return (
    <section id="cerita" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#1c1a17] via-[#24211d] to-[#1c1a17] border-y-2 border-dawang-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-dawang-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dawang-clay/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dawang-gold/20 border-2 border-dawang-gold/60 text-dawang-gold text-xs font-extrabold tracking-wide mb-3 shadow-lg">
            <Compass className="w-4 h-4 text-dawang-gold animate-pulse" />
            <span>IDENTITAS & GEOGRAFI</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Sekilas Dusun Dawang
          </h2>
          <p className="text-xs sm:text-sm text-dawang-goldLight font-medium mt-2">
            Mengenal ruang, sejarah, dan kehidupan warga di kawasan subur lereng Gunung Merapi.
          </p>
        </div>

        {/* 2.5D Main Grid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: History & Origin (7 cols) */}
          <div className="lg:col-span-7 glass-card-elevated rounded-3xl p-6 sm:p-8 relative border-2 border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-dawang-gold/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-dawang-clay/30 border-2 border-dawang-clay/60 flex items-center justify-center text-dawang-clayLight shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-dawang-sand">
                  Filosofi & Sejarah Dawang
                </h3>
                <p className="text-xs text-dawang-gold font-medium">Warisan Budaya & Makna Nama</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-dawang-sandMuted leading-relaxed mb-6">
              {dusun.sejarah}
            </p>

            <div className="bg-[#141311]/90 rounded-2xl p-4 border border-dawang-gold/30 shadow-md">
              <h4 className="text-xs font-extrabold text-dawang-gold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-dawang-gold animate-ping" />
                Visi Dusun
              </h4>
              <p className="text-xs text-dawang-sand italic font-serif leading-relaxed">"{dusun.visiMisi}"</p>
            </div>
          </div>

          {/* Right Column: Geographic Stats & Limits (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Elevation & Location Pill */}
            <div className="glass-card rounded-2xl p-5 border-2 border-white/15 flex items-center justify-between shadow-lg hover:border-dawang-paddyGold/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-dawang-paddy/40 border border-dawang-paddyLight/50 text-dawang-paddyGold flex items-center justify-center shadow-md">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-dawang-sandDim font-medium">Topografi & Altitude</p>
                  <p className="text-sm font-bold text-dawang-sand">{dusun.ketinggian} · Kaki Merapi</p>
                </div>
              </div>
              <span className="text-xs font-bold text-dawang-paddyGold bg-dawang-paddy/40 border border-dawang-paddyLight/60 px-3 py-1.5 rounded-xl shadow-sm">
                Subur & Sejuk
              </span>
            </div>

            {/* Area & Administrative Limits */}
            <div className="glass-card rounded-2xl p-5 border-2 border-white/15 shadow-lg">
              <h4 className="text-xs font-extrabold text-dawang-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-dawang-clayLight" />
                Batas Administratif Dusun
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#141311]/80 p-3 rounded-xl border border-white/10 shadow-inner">
                  <span className="text-[10px] text-dawang-sandDim block font-bold uppercase">Utara</span>
                  <span className="font-bold text-dawang-sand">{dusun.batasDusun.utara}</span>
                </div>
                <div className="bg-[#141311]/80 p-3 rounded-xl border border-white/10 shadow-inner">
                  <span className="text-[10px] text-dawang-sandDim block font-bold uppercase">Selatan</span>
                  <span className="font-bold text-dawang-sand">{dusun.batasDusun.selatan}</span>
                </div>
                <div className="bg-[#141311]/80 p-3 rounded-xl border border-white/10 shadow-inner">
                  <span className="text-[10px] text-dawang-sandDim block font-bold uppercase">Timur</span>
                  <span className="font-bold text-dawang-sand">{dusun.batasDusun.timur}</span>
                </div>
                <div className="bg-[#141311]/80 p-3 rounded-xl border border-white/10 shadow-inner">
                  <span className="text-[10px] text-dawang-sandDim block font-bold uppercase">Barat</span>
                  <span className="font-bold text-dawang-sand">{dusun.batasDusun.barat}</span>
                </div>
              </div>
            </div>

            {/* Quick Demographics Preview */}
            <div className="glass-card rounded-2xl p-5 border-2 border-white/15 flex items-center justify-around text-center shadow-lg">
              <div>
                <Users className="w-6 h-6 text-dawang-clayLight mx-auto mb-1" />
                <p className="text-[10px] text-dawang-sandDim font-bold uppercase">Pria</p>
                <p className="text-base font-extrabold text-dawang-sand">{penduduk.lakiLaki} Jiwa</p>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <div>
                <Users className="w-6 h-6 text-dawang-gold mx-auto mb-1" />
                <p className="text-[10px] text-dawang-sandDim font-bold uppercase">Wanita</p>
                <p className="text-base font-extrabold text-dawang-sand">{penduduk.perempuan} Jiwa</p>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <div>
                <Home className="w-6 h-6 text-dawang-paddyGold mx-auto mb-1" />
                <p className="text-[10px] text-dawang-sandDim font-bold uppercase">Total RT</p>
                <p className="text-base font-extrabold text-dawang-sand">{dusun.jumlahRT} RT</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
