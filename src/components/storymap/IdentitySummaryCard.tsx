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
    <section id="cerita" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-paddy/20 border border-dawang-paddy/40 text-dawang-paddyGold text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Identitas & Geografi</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Sekilas Dusun Dawang
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Mengenal ruang, sejarah, dan kehidupan warga di kawasan subur lereng Gunung Merapi.
        </p>
      </div>

      {/* 2.5D Main Grid Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: History & Origin (8 cols) */}
        <div className="lg:col-span-7 glass-card-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-batik-tile opacity-10 pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-dawang-clay/20 border border-dawang-clay/40 flex items-center justify-center text-dawang-clayLight">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-dawang-sand">
                Filosofi & Sejarah Dawang
              </h3>
              <p className="text-xs text-dawang-sandDim">Warisan Budaya & Makna Nama</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-dawang-sandMuted leading-relaxed mb-6">
            {dusun.sejarah}
          </p>

          <div className="bg-dawang-card/80 rounded-2xl p-4 border border-white/10">
            <h4 className="text-xs font-bold text-dawang-gold uppercase tracking-wider mb-1">Visi Dusun</h4>
            <p className="text-xs text-dawang-sand italic">"{dusun.visiMisi}"</p>
          </div>
        </div>

        {/* Right Column: Geographic Stats & Limits (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Elevation & Location Pill */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-dawang-paddy/30 text-dawang-paddyGold flex items-center justify-center">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-dawang-sandDim font-medium">Topografi & Altitude</p>
                <p className="text-sm font-bold text-dawang-sand">{dusun.ketinggian} · Kaki Merapi</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-dawang-paddyGold bg-dawang-paddy/30 px-2.5 py-1 rounded-lg">
              Subur & Sejuk
            </span>
          </div>

          {/* Area & Administrative Limits */}
          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <h4 className="text-xs font-bold text-dawang-sand uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-dawang-clay" />
              Batas Administrative Dusun
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-dawang-card/60 p-2.5 rounded-xl">
                <span className="text-[10px] text-dawang-sandDim block">Utara</span>
                <span className="font-semibold text-dawang-sand">{dusun.batasDusun.utara}</span>
              </div>
              <div className="bg-dawang-card/60 p-2.5 rounded-xl">
                <span className="text-[10px] text-dawang-sandDim block">Selatan</span>
                <span className="font-semibold text-dawang-sand">{dusun.batasDusun.selatan}</span>
              </div>
              <div className="bg-dawang-card/60 p-2.5 rounded-xl">
                <span className="text-[10px] text-dawang-sandDim block">Timur</span>
                <span className="font-semibold text-dawang-sand">{dusun.batasDusun.timur}</span>
              </div>
              <div className="bg-dawang-card/60 p-2.5 rounded-xl">
                <span className="text-[10px] text-dawang-sandDim block">Barat</span>
                <span className="font-semibold text-dawang-sand">{dusun.batasDusun.barat}</span>
              </div>
            </div>
          </div>

          {/* Quick Demographics Preview */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 flex items-center justify-around text-center">
            <div>
              <Users className="w-5 h-5 text-dawang-clayLight mx-auto mb-1" />
              <p className="text-[10px] text-dawang-sandDim">Pria</p>
              <p className="text-sm font-bold text-dawang-sand">{penduduk.lakiLaki} Jiwa</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <Users className="w-5 h-5 text-dawang-gold mx-auto mb-1" />
              <p className="text-[10px] text-dawang-sandDim">Wanita</p>
              <p className="text-sm font-bold text-dawang-sand">{penduduk.perempuan} Jiwa</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <Home className="w-5 h-5 text-dawang-paddyGold mx-auto mb-1" />
              <p className="text-[10px] text-dawang-sandDim">Total RT</p>
              <p className="text-sm font-bold text-dawang-sand">{dusun.jumlahRT} RT</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
