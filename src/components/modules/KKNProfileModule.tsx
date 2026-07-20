import React from 'react';
import { Award, GraduationCap, UserCheck, Sparkles, BookOpen } from 'lucide-react';
import { TimKKNInfo } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface KKNProfileModuleProps {
  timKKN: TimKKNInfo;
}

export const KKNProfileModule: React.FC<KKNProfileModuleProps> = ({ timKKN }) => {
  return (
    <section id="tim-kkn" className="relative py-16 px-4 sm:px-6 bg-gradient-to-b from-[#141311] via-[#191722] to-[#141311] border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dawang-gold/20 border border-dawang-gold/40 text-dawang-gold text-xs font-semibold mb-3 shadow-2.5d-sm">
            <GraduationCap className="w-4 h-4 text-dawang-gold" />
            <span>KKN Bela Negara Periode II 2026 · Angkatan 84.180</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
            Tim KKN Dusun Dawang
          </h2>
          <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
            10 mahasiswa UPN "Veteran" Yogyakarta dari berbagai disiplin ilmu yang mengabdikan diri untuk kemajuan Dusun Dawang.
          </p>
        </div>

        {/* University & Team Info Bar */}
        <div className="glass-card-elevated rounded-2xl p-5 mb-10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2.5d-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dawang-clay/20 border border-dawang-clay/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-dawang-clayLight" />
            </div>
            <div>
              <span className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-bold">Nama Tim</span>
              <p className="text-xs font-bold text-dawang-sand">{timKKN.namaKelompok}</p>
            </div>
          </div>

          <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-dawang-gold/20 border border-dawang-gold/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-dawang-gold" />
            </div>
            <div>
              <span className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-bold">Universitas · Tahun</span>
              <p className="text-xs font-bold text-dawang-gold">{timKKN.universitas} · {timKKN.tahun}</p>
            </div>
          </div>

          <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dawang-paddy/30 text-dawang-paddyGold border border-dawang-paddy/50 text-xs font-bold shadow-2.5d-sm">
            <UserCheck className="w-4 h-4" />
            <span>10 Mahasiswa</span>
          </div>
        </div>

        {/* 10 Students Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {timKKN.anggota.map((student, idx) => {
            // High Contrast Role Badge color mapping
            const roleColor: Record<string, string> = {
              'Ketua': 'bg-[#c2593f] text-white border-[#e0755b] shadow-lg',
              'Sekretaris': 'bg-[#d4a359] text-black border-[#f5cb78] shadow-lg font-black',
              'Bendahara': 'bg-[#2e5a44] text-white border-[#488767] shadow-lg',
              'Humas': 'bg-[#2563eb] text-white border-[#60a5fa] shadow-lg',
              'PDD': 'bg-[#8b5cf6] text-white border-[#c084fc] shadow-lg',
              'Logistik': 'bg-[#f97316] text-white border-[#fdba74] shadow-lg',
            };
            const roleClass = roleColor[student.peran] || 'bg-[#24231f] text-white border-white/20 shadow-lg';

            return (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2.5d-sm hover:shadow-2.5d-md hover:border-dawang-gold/40 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Portrait Photo */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-dawang-surface">
                  <img
                    src={getAssetUrl(student.foto)}
                    alt={student.nama}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.nama)}&background=24231f&color=d4a359&size=256`;
                    }}
                  />
                  
                  {/* High-Contrast Bold Role Badge Overlay */}
                  <div className={`absolute top-2 left-2 px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wide border ${roleClass}`}>
                    {student.peran}
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 flex items-center justify-center shadow-md">
                    {idx + 1}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3.5 space-y-1 bg-dawang-card/90">
                  <h3 className="font-bold text-xs text-dawang-sand leading-tight line-clamp-1">{student.nama}</h3>
                  <p className="text-[10px] text-dawang-gold font-semibold leading-tight">{student.jurusan}</p>
                  {student.prokerUtama && (
                    <p className="text-[9px] text-dawang-sandDim leading-tight mt-1 line-clamp-2">{student.prokerUtama}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
