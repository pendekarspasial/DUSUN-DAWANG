import React from 'react';
import { Award, GraduationCap, UserCheck, Sparkles, BookOpen } from 'lucide-react';
import { TimKKNInfo } from '../../types';

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
          <span>Pengabdian Masyarakat 2025</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Profil Tim KKN Dusun Dawang
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          10 mahasiswa lintas disiplin ilmu yang mendedikasikan karya, ide, dan pemetaan geospasial untuk kemajuan desa.
        </p>
      </div>

      {/* DPL & Team Info Bar */}
      <div className="glass-card-elevated rounded-2xl p-5 mb-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-bold">Dosen Pembimbing Lapangan</span>
          <p className="text-sm font-bold text-dawang-gold">{timKKN.dosenPembimbing}</p>
        </div>

        <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

        <div>
          <span className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-bold">Universitas & Tahun</span>
          <p className="text-sm font-bold text-dawang-sand">{timKKN.universitas} · {timKKN.tahun}</p>
        </div>

        <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-dawang-paddy/30 text-dawang-paddyGold border border-dawang-paddy/50 text-xs font-bold">
          <UserCheck className="w-4 h-4" />
          <span>10 Mahasiswa Aktif</span>
        </div>
      </div>

      {/* 10 Students Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {timKKN.anggota.map((student, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl p-5 border border-white/10 shadow-2.5d-sm hover:shadow-2.5d-md hover:border-dawang-gold/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-dawang-surface border border-white/10 flex-shrink-0">
                  <img
                    src={student.foto || '/fotorumah/Kadus.jpg.jpg'}
                    alt={student.nama}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-dawang-sand">{student.nama}</h3>
                  <p className="text-[11px] text-dawang-gold font-medium">{student.jurusan}</p>
                  <p className="text-[10px] text-dawang-sandDim font-mono">NIM: {student.nim}</p>
                </div>
              </div>

              <div className="bg-dawang-card/70 p-2.5 rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-dawang-sandDim">Peran Tim</span>
                  <span className="font-bold text-dawang-clayLight">{student.peran}</span>
                </div>
                {student.prokerUtama && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-dawang-sandDim">Proker Utama</span>
                    <span className="font-semibold text-dawang-paddyGold truncate max-w-[140px]">{student.prokerUtama}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
