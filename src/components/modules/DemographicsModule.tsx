import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Users, Briefcase, GraduationCap, Home, TrendingUp } from 'lucide-react';
import { PendudukInfo } from '../../types';

interface DemographicsModuleProps {
  penduduk: PendudukInfo;
}

export const DemographicsModule: React.FC<DemographicsModuleProps> = ({ penduduk }) => {
  const [activeTab, setActiveTab] = useState<'pekerjaan' | 'pendidikan' | 'rt' | 'umur'>('pekerjaan');

  const COLORS = ['#c2593f', '#d4a359', '#2e5a44', '#8cb369', '#d97757', '#e5b869', '#407b5e'];

  return (
    <section id="demografi" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0c1611] via-[#13241b] to-[#0c1611] border-y-2 border-[#8cb369]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e5a44] border-2 border-[#8cb369]/60 text-[#8cb369] text-xs font-extrabold tracking-wide mb-3 shadow-lg">
            <Users className="w-4 h-4 text-[#8cb369] animate-pulse" />
            <span>STATISTIK & MONOGRAFI</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Data Kependudukan Dusun
          </h2>
          <p className="text-xs sm:text-sm text-[#8cb369]/90 font-medium mt-2">
            Struktur demografi, potensi tenaga kerja, dan profil pendidikan 458 warga Dusun Dawang.
          </p>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="glass-card rounded-2xl p-5 border-2 border-white/15 flex items-center gap-4 shadow-lg hover:border-[#8cb369]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-dawang-clay/30 border border-dawang-clay/50 flex items-center justify-center text-dawang-clayLight text-xl font-bold shadow-md">
              👥
            </div>
            <div>
              <p className="text-xs text-dawang-sandDim font-bold uppercase">Total Warga</p>
              <p className="text-xl font-extrabold text-dawang-sand font-serif">{penduduk.total} Jiwa</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border-2 border-white/15 flex items-center gap-4 shadow-lg hover:border-[#8cb369]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-dawang-gold/30 border border-dawang-gold/50 flex items-center justify-center text-dawang-gold text-xl font-bold shadow-md">
              👨
            </div>
            <div>
              <p className="text-xs text-dawang-sandDim font-bold uppercase">Laki-Laki</p>
              <p className="text-xl font-extrabold text-dawang-gold font-serif">{penduduk.lakiLaki} Jiwa</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border-2 border-white/15 flex items-center gap-4 shadow-lg hover:border-[#8cb369]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-dawang-paddy/40 border border-dawang-paddyLight/50 flex items-center justify-center text-dawang-paddyGold text-xl font-bold shadow-md">
              👩
            </div>
            <div>
              <p className="text-xs text-dawang-sandDim font-bold uppercase">Perempuan</p>
              <p className="text-xl font-extrabold text-[#8cb369] font-serif">{penduduk.perempuan} Jiwa</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border-2 border-white/15 flex items-center gap-4 shadow-lg hover:border-[#8cb369]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/30 border border-blue-400/50 flex items-center justify-center text-blue-300 text-xl font-bold shadow-md">
              🏠
            </div>
            <div>
              <p className="text-xs text-dawang-sandDim font-bold uppercase">Total KK</p>
              <p className="text-xl font-extrabold text-dawang-sand font-serif">{penduduk.jumlahKK} KK</p>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('pekerjaan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              activeTab === 'pekerjaan'
                ? 'bg-[#8cb369] text-slate-950 shadow-xl border-2 border-white/30'
                : 'glass-card border-white/10 text-dawang-sandMuted hover:text-white'
            }`}
          >
            Mata Pencaharian
          </button>
          <button
            onClick={() => setActiveTab('pendidikan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              activeTab === 'pendidikan'
                ? 'bg-[#8cb369] text-slate-950 shadow-xl border-2 border-white/30'
                : 'glass-card border-white/10 text-dawang-sandMuted hover:text-white'
            }`}
          >
            Tingkat Pendidikan
          </button>
          <button
            onClick={() => setActiveTab('rt')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              activeTab === 'rt'
                ? 'bg-[#8cb369] text-slate-950 shadow-xl border-2 border-white/30'
                : 'glass-card border-white/10 text-dawang-sandMuted hover:text-white'
            }`}
          >
            Sebaran per RT
          </button>
          <button
            onClick={() => setActiveTab('umur')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
              activeTab === 'umur'
                ? 'bg-[#8cb369] text-slate-950 shadow-xl border-2 border-white/30'
                : 'glass-card border-white/10 text-dawang-sandMuted hover:text-white'
            }`}
          >
            Kelompok Umur
          </button>
        </div>

        {/* Chart Container */}
        <div className="glass-card-elevated rounded-3xl p-6 sm:p-8 border-2 border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          {activeTab === 'pekerjaan' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-dawang-sand flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-dawang-gold" />
                Mata Pencaharian Utama Warga Dusun Dawang
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={penduduk.mataPencaharian} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <XAxis dataKey="label" stroke="#999488" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                    <YAxis stroke="#999488" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1c1b18', borderColor: '#36342e', borderRadius: '12px', color: '#f9f6f0' }} />
                    <Bar dataKey="jumlah" radius={[8, 8, 0, 0]}>
                      {penduduk.mataPencaharian.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'pendidikan' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-dawang-sand flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-dawang-clayLight" />
                Tingkat Pendidikan Terakhir Warga
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={penduduk.pendidikan} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <XAxis dataKey="label" stroke="#999488" fontSize={11} />
                    <YAxis stroke="#999488" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1c1b18', borderColor: '#36342e', borderRadius: '12px', color: '#f9f6f0' }} />
                    <Bar dataKey="jumlah" fill="#d4a359" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'rt' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-dawang-sand flex items-center gap-2">
                <Home className="w-5 h-5 text-dawang-paddyGold" />
                Distribusi Penduduk & KK per RT (RT 01 - RT 05)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-dawang-sand">
                  <thead className="bg-[#141311]/80 text-dawang-gold uppercase text-[10px] font-bold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Wilayah RT</th>
                      <th className="py-3 px-4">Jumlah KK</th>
                      <th className="py-3 px-4">Jumlah Jiwa</th>
                      <th className="py-3 px-4">Persentase</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {penduduk.perRT.map((rt, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-dawang-sand">{rt.rt}</td>
                        <td className="py-3 px-4 text-dawang-gold font-semibold">{rt.kk} KK</td>
                        <td className="py-3 px-4 text-dawang-sand">{rt.jiwa} Jiwa</td>
                        <td className="py-3 px-4 text-[#8cb369] font-bold">
                          {((rt.jiwa / penduduk.total) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'umur' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-dawang-sand flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8cb369]" />
                Komposisi Kelompok Umur Penduduk
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={penduduk.kelompokUmur} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <XAxis dataKey="label" stroke="#999488" fontSize={11} />
                    <YAxis stroke="#999488" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#1c1b18', borderColor: '#36342e', borderRadius: '12px', color: '#f9f6f0' }} />
                    <Bar dataKey="laki" name="Laki-laki" fill="#c2593f" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="perempuan" name="Perempuan" fill="#8cb369" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
