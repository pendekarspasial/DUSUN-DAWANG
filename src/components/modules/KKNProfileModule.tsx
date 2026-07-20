import React from 'react';
import { Award, GraduationCap, UserCheck, Sparkles, BookOpen } from 'lucide-react';
import { TimKKNInfo } from '../../types';
import { getAssetUrl } from '../../utils/path';

interface KKNProfileModuleProps {
  timKKN: TimKKNInfo;
}

export const KKNProfileModule: React.FC<KKNProfileModuleProps> = ({ timKKN }) => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-gold/20 border border-dawang-gold/40 text-dawang-gold text-xs font-semibold mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
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
      <div className="glass-card-elevated rounded-2xl p-5 mb-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-dawang-clay/20 flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5 text-dawang-clay" />
          </div>
          <div>
            <span className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-bold">Nama Tim</span>
            <p className="text-xs font-bold text-dawang-sand">{timKKN.namaKelompok}</p>
          </div>
        </div>

        <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-dawang-gold/20 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-dawang-gold" />
          </div>
          <div>
            <span className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-bold">Universitas · Tahun</span>
            <p className="text-xs font-bold text-dawang-gold">{timKKN.universitas} · {timKKN.tahun}</p>
          </div>
        </div>

        <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dawang-paddy/30 text-dawang-paddyGold border border-dawang-paddy/50 text-xs font-bold">
          <UserCheck className="w-4 h-4" />
          <span>10 Mahasiswa</span>
        </div>
      </div>

      {/* 10 Students Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {timKKN.anggota.map((student, idx) => {
          // Role → color mapping
          const roleColor: Record<string, string> = {
            'Ketua': 'bg-dawang-clay/30 text-dawang-clayLight border-dawang-clay/40',
            'Sekretaris': 'bg-dawang-gold/20 text-dawang-gold border-dawang-gold/40',
            'Bendahara': 'bg-dawang-paddy/30 text-dawang-paddyGold border-dawang-paddy/40',
            'Humas': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            'PDD': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            'Logistik': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          };
          const roleClass = roleColor[student.peran] || 'bg-dawang-card text-dawang-sandMuted border-white/10';

          return (
            <div
              key={idx}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2.5d-sm hover:shadow-2.5d-md hover:border-dawang-gold/30 transition-all duration-300 group"
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
                {/* Role Badge overlay */}
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold border ${roleClass}`}>
                  {student.peran}
                </div>
                {/* Number badge */}
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/50 text-white text-[9px] font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
              </div>

              {/* Info */}
              <div className="p-3 space-y-1">
                <h3 className="font-bold text-[11px] sm:text-xs text-dawang-sand leading-tight">{student.nama}</h3>
                <p className="text-[10px] text-dawang-gold font-medium leading-tight">{student.jurusan}</p>
                {student.prokerUtama && (
                  <p className="text-[9px] text-dawang-sandDim leading-tight mt-1 line-clamp-2">{student.prokerUtama}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
