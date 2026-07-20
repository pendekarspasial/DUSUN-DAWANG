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
    <section id="demografi" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-paddy/20 border border-dawang-paddy/40 text-dawang-paddyGold text-xs font-semibold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Statistik & Monografi</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Data Kependudukan Dusun
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Struktur demografi wujud keberagaman, mata pencaharian, dan tingkat pendidikan warga Dawang.
        </p>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="glass-card-elevated rounded-2xl p-4 text-center border border-white/10 shadow-2.5d-sm">
          <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Total Penduduk</p>
          <p className="text-2xl font-bold text-dawang-sand font-serif mt-1">{penduduk.total} Jiwa</p>
          <span className="text-[10px] text-dawang-paddyGold bg-dawang-paddy/20 px-2 py-0.5 rounded mt-1 inline-block">
            100% Warga Terdata
          </span>
        </div>

        <div className="glass-card-elevated rounded-2xl p-4 text-center border border-white/10 shadow-2.5d-sm">
          <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Kepala Keluarga</p>
          <p className="text-2xl font-bold text-dawang-gold font-serif mt-1">{penduduk.jumlahKK} KK</p>
          <span className="text-[10px] text-dawang-gold bg-dawang-gold/20 px-2 py-0.5 rounded mt-1 inline-block">
            Rata-rata 3.7 Jiwa/KK
          </span>
        </div>

        <div className="glass-card-elevated rounded-2xl p-4 text-center border border-white/10 shadow-2.5d-sm">
          <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Laki-Laki</p>
          <p className="text-2xl font-bold text-dawang-clayLight font-serif mt-1">{penduduk.lakiLaki} Jiwa</p>
          <span className="text-[10px] text-dawang-sandDim bg-dawang-card px-2 py-0.5 rounded mt-1 inline-block">
            50.4% Populasi
          </span>
        </div>

        <div className="glass-card-elevated rounded-2xl p-4 text-center border border-white/10 shadow-2.5d-sm">
          <p className="text-[10px] text-dawang-sandDim uppercase tracking-wider font-semibold">Perempuan</p>
          <p className="text-2xl font-bold text-dawang-paddyGold font-serif mt-1">{penduduk.perempuan} Jiwa</p>
          <span className="text-[10px] text-dawang-sandDim bg-dawang-card px-2 py-0.5 rounded mt-1 inline-block">
            49.6% Populasi
          </span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('pekerjaan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pekerjaan'
              ? 'bg-dawang-clay text-white shadow-2.5d-sm'
              : 'glass-card text-dawang-sandMuted hover:text-dawang-sand'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Mata Pencaharian</span>
        </button>

        <button
          onClick={() => setActiveTab('pendidikan')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pendidikan'
              ? 'bg-dawang-gold text-dawang-dark shadow-2.5d-sm'
              : 'glass-card text-dawang-sandMuted hover:text-dawang-sand'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Tingkat Pendidikan</span>
        </button>

        <button
          onClick={() => setActiveTab('rt')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rt'
              ? 'bg-dawang-paddyGold text-dawang-dark shadow-2.5d-sm'
              : 'glass-card text-dawang-sandMuted hover:text-dawang-sand'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Sebaran Per-RT</span>
        </button>
      </div>

      {/* Chart Section */}
      <div className="glass-card-elevated rounded-3xl p-6 border border-white/15 shadow-2.5d-lg">
        
        {activeTab === 'pekerjaan' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-dawang-sand">Distribusi Mata Pencaharian Utama Warga</h3>
              <span className="text-[10px] text-dawang-gold uppercase font-bold">Dominan: Petani (142 Warga)</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={penduduk.mataPencaharian} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <XAxis type="number" stroke="#999488" fontSize={11} />
                  <YAxis dataKey="label" type="category" stroke="#f9f6f0" fontSize={11} width={120} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1b18', borderColor: '#36342e', borderRadius: '12px', color: '#f9f6f0' }}
                  />
                  <Bar dataKey="jumlah" radius={[0, 8, 8, 0]}>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={penduduk.pendidikan}
                    dataKey="jumlah"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={45}
                    paddingAngle={3}
                  >
                    {penduduk.pendidikan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1c1b18', borderColor: '#36342e', borderRadius: '12px', color: '#f9f6f0' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-6 space-y-2">
              <h3 className="font-bold text-sm text-dawang-sand mb-3">Tingkat Pendidikan Terakhir</h3>
              {penduduk.pendidikan.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-dawang-card/60 border border-white/5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-dawang-sand font-medium">{p.label}</span>
                  </div>
                  <span className="font-bold text-dawang-gold">{p.jumlah} Jiwa</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rt' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-dawang-sand">Tabel Distribusi Penduduk per RT (RT 01 - RT 05)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-dawang-sandDim uppercase text-[10px]">
                    <th className="py-3 px-4">Wilayah RT</th>
                    <th className="py-3 px-4">Jumlah KK</th>
                    <th className="py-3 px-4">Total Jiwa</th>
                    <th className="py-3 px-4">Rata-rata / KK</th>
                    <th className="py-3 px-4">Persentase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {penduduk.perRT.map((rt, idx) => (
                    <tr key={idx} className="hover:bg-dawang-card/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-dawang-gold">{rt.rt}</td>
                      <td className="py-3 px-4 text-dawang-sand">{rt.kk} KK</td>
                      <td className="py-3 px-4 font-bold text-dawang-sand">{rt.jiwa} Jiwa</td>
                      <td className="py-3 px-4 text-dawang-sandMuted">{(rt.jiwa / rt.kk).toFixed(1)} Jiwa</td>
                      <td className="py-3 px-4 text-dawang-paddyGold font-semibold">
                        {((rt.jiwa / penduduk.total) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
