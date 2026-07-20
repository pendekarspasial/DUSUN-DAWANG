import React, { useState } from 'react';
import { BookOpen, MapPin, ChevronRight, Sparkles, Droplet, Landmark, Cpu } from 'lucide-react';
import { getAssetUrl } from '../../utils/path';

interface StoryTimelineProps {
  onFocusMapLocation?: (lat: number, lng: number, zoom: number) => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onFocusMapLocation }) => {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 1,
      title: "Bab I: Akar Sejarah & Kearifan Dawang",
      subtitle: "Warisan Luhur di Kaki Merapi",
      icon: Landmark,
      badge: "Sejarah & Nilai",
      color: "from-dawang-clay to-dawang-clayLight",
      coords: { lat: -7.6170, lng: 110.2780, zoom: 17 },
      description: "Dusun Dawang berdiri kukuh dengan nilai kebersamaan dan tradisi Jawa. Istilah 'Dawang' menggambarkan tempat yang padhang (terang benderang), menandakan pandangan hidup warga yang senantiasa terbuka, guyub rukun, dan berdaya dalam suasana kehangatan desa.",
      image: "/fotorumah/Kadus.jpg.jpg",
      details: ["Balai Dusun sebagai pusat musyawarah warga", "Tradisi Nyadran dan Gotong Royong bulanan", "Penjagaan nilai-nilai luhur Jawa sangkan paraning dumadi"]
    },
    {
      id: 2,
      title: "Bab II: Demografi & Harmoni Warga",
      subtitle: "Masyarakat Produktif & Guyub Rukun",
      icon: BookOpen,
      badge: "Masyarakat",
      color: "from-dawang-gold to-dawang-goldLight",
      coords: { lat: -7.6168, lng: 110.2775, zoom: 18 },
      description: "Dihuni oleh 458 jiwa yang tersebar di 5 RT dan 1 RW, mayoritas warga bergerak di bidang pertanian produktif, UMKM olahan pangan, dan perdagangan. Hubungan antar-RT terjalin sangat erat melalui kegiatan posyandu, pkk, dan kerja bakti rutin.",
      image: "/fotorumah/RT1.jpg.jpg",
      details: ["124 Kepala Keluarga dalam 5 wilayah RT", "Posyandu aktif untuk anak & lansia", "Kegiatan keagamaan di Masjid Al-Ikhlas & Musholla RT 03"]
    },
    {
      id: 3,
      title: "Bab III: Sawah Subur & Irigasi Merapi",
      subtitle: "Lanskap Hijau Pendukung Ketahanan Pangan",
      icon: Droplet,
      badge: "Pertanian & Alam",
      color: "from-dawang-paddy to-dawang-paddyGold",
      coords: { lat: -7.6190, lng: 110.2790, zoom: 17 },
      description: "Tanah vulkanik kaya hara yang dialiri saluran irigasi alami dari lereng Merapi menjadikan hamparan sawah Dusun Dawang menghasilkan padi dan sayuran organik melimpah. Pertanian menjadi denyut nadi perekonomian utama warga.",
      image: "/fotorumah/RT2.jpg.jpg",
      details: ["±85 Hektar total luas wilayah pertanian & pemukiman", "Sistem saluran irigasi tradisional terjaga rapi", "Kelompok tani aktif pengembang benih lokal"]
    },
    {
      id: 4,
      title: "Bab IV: Digitalisasi Spasial & WebGIS",
      subtitle: "Masa Depan Dusun Berdaya Teknologi",
      icon: Cpu,
      badge: "Inovasi GIS",
      color: "from-[#2563eb] to-[#60a5fa]",
      coords: { lat: -7.6170, lng: 110.2780, zoom: 16 },
      description: "Program KKN Bela Negara UPN Veteran Yogyakarta 2026 menghadirkan inovasi pemetaan spasial presisi tinggi dan platform WebGIS StoryMap berbasis QR Code. Seluruh batas wilayah, fasilitas umum, dan persil bangunan kini dapat diakses secara digital.",
      image: "/fotorumah/RT3.jpg.jpg",
      details: ["Pemetaan Geospasial WGS84 presisi tinggi", "Interaktif WebGIS berbasis QR Code papan informasi", "Arsip Digital KKN & Monografi Desa terintegrasi"]
    }
  ];

  return (
    <section id="alur-narasi" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#161210] via-[#241a15] to-[#161210] border-y-2 border-dawang-clay/50 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-dawang-clay/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dawang-clay/30 border-2 border-dawang-clay/60 text-dawang-clayLight text-xs font-extrabold tracking-wide mb-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-dawang-clayLight animate-spin" />
            <span>ALUR NARASI & PETA STORYMAP</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Perjalanan Dusun Dawang
          </h2>
          <p className="text-xs sm:text-sm text-dawang-goldLight font-medium mt-2">
            Telusuri setiap babak cerita sejarah, masyarakat, persawahan, hingga digitalisasi spasial.
          </p>
        </div>

        {/* Chapter Tabs for Quick Switching */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {chapters.map((chap, idx) => {
            const Icon = chap.icon;
            const isActive = activeChapter === idx;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapter(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 border-2 active:scale-95 shadow-md ${
                  isActive
                    ? 'bg-[#141311] border-dawang-gold text-white shadow-xl ring-2 ring-dawang-gold/50 -translate-y-1'
                    : 'glass-card border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-dawang-gold' : 'text-dawang-sandDim'}`}>
                    Bab 0{chap.id}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-dawang-gold' : 'text-dawang-sandDim'}`} />
                </div>
                <p className={`text-xs font-bold truncate ${isActive ? 'text-dawang-sand' : 'text-dawang-sandMuted'}`}>
                  {chap.badge}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Chapter Display Card */}
        {chapters.map((chap, idx) => {
          if (idx !== activeChapter) return null;
          const Icon = chap.icon;
          return (
            <div
              key={chap.id}
              className="glass-card-elevated rounded-3xl p-6 sm:p-8 border-2 border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-fadeIn"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-dawang-clay text-white shadow-md">
                      {chap.badge}
                    </span>
                    <span className="text-xs text-dawang-gold font-bold">Bab {chap.id} Dari 4</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-dawang-sand">
                    {chap.title}
                  </h3>
                  <p className="text-sm font-semibold text-dawang-gold italic">
                    "{chap.subtitle}"
                  </p>

                  <p className="text-xs sm:text-sm text-dawang-sandMuted leading-relaxed">
                    {chap.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {chap.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-dawang-sand">
                        <span className="w-1.5 h-1.5 rounded-full bg-dawang-gold flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Focus on WebGIS Map Button */}
                  {onFocusMapLocation && (
                    <button
                      onClick={() => onFocusMapLocation(chap.coords.lat, chap.coords.lng, chap.coords.zoom)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-dawang-clay to-dawang-clayLight text-white font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all mt-4"
                    >
                      <MapPin className="w-4 h-4 animate-bounce" />
                      <span>Lihat Lokasi Bab Ini di Peta WebGIS</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Chapter Photo */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-white/15 shadow-xl aspect-[4/3]">
                    <img
                      src={getAssetUrl(chap.image)}
                      alt={chap.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141311]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#141311]/90 backdrop-blur-md rounded-xl border border-white/15 text-xs text-dawang-sand font-bold shadow-md">
                      📍 Lokasi Terkait: {chap.badge}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
