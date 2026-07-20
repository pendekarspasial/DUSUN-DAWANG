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
      color: "from-dawang-paddy to-dawang-paddyLight",
      coords: { lat: -7.6190, lng: 110.2790, zoom: 16 },
      description: "Lahan persawahan meluas di sisi selatan dan timur dusun, ditenagai oleh debit air melimpah dari jaringan irigasi alami pegunungan. Sistem tanam padi dan palawija menjadi penopang utama ekonomi masyarakat.",
      image: "/fotorumah/RT2.jpg.jpg",
      details: ["Puluhan hektar persawahan aktif berpadi", "Sistem pembagian air irigasi adil berazaskan gotong royong", "Panorama Merapi yang menawan sebagai daya tarik eduwisata"]
    },
    {
      id: 4,
      title: "Bab IV: Peta Digital & Transformasi KKN",
      subtitle: "Inovasi WebGIS untuk Masa Depan Desa",
      icon: Cpu,
      badge: "Inovasi GIS",
      color: "from-dawang-clayLight to-dawang-paddyGold",
      coords: { lat: -7.6170, lng: 110.2780, zoom: 17 },
      description: "Melalui Program KKN, data persil rumah, batas administrasi RT, dan fasilitas dusun telah terdigitasi ke dalam format WGS84 GeoJSON dan WebGIS StoryMap. Website ini menjadi sarana dokumentasi jangka panjang dan transparansi informasi bagi publik.",
      image: "/fotorumah/Kades.jpeg.jpg",
      details: ["Peta Spasial berbasis QGIS & Leaflet Engine", "Integrasi QR Code pada Papan Informasi Dusun", "Arsip Digital Program Kerja Mahasiswa KKN 2025"]
    }
  ];

  return (
    <section id="alur-narasi" className="relative py-16 px-4 sm:px-6 bg-gradient-to-b from-[#141311] via-[#1c1714] to-[#141311] border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-dawang-clay/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-clay/20 border border-dawang-clay/40 text-dawang-clayLight text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Alur Narasi & Peta StoryMap</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Perjalanan Dusun Dawang
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Telusuri setiap babak cerita sejarah, masyarakat, persawahan, hingga digitalisasi spasial.
        </p>
      </div>

      {/* Chapter Tabs for Quick Switching */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {chapters.map((chap, idx) => {
          const Icon = chap.icon;
          const isActive = activeChapter === idx;
          return (
            <button
              key={chap.id}
              onClick={() => setActiveChapter(idx)}
              className={`p-3 rounded-2xl text-left transition-all duration-300 border active:scale-95 ${
                isActive
                  ? 'glass-card-elevated border-dawang-gold/50 shadow-2.5d-md ring-1 ring-dawang-gold/40'
                  : 'glass-card border-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-dawang-gold' : 'text-dawang-sandDim'}`}>
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

      {/* Active Chapter Card Showcase */}
      {chapters.map((chap, idx) => {
        if (idx !== activeChapter) return null;
        const Icon = chap.icon;

        return (
          <div
            key={chap.id}
            className="glass-card-elevated rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2.5d-lg relative overflow-hidden transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Text Narrative Column */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-dawang-card border border-white/10 text-dawang-gold text-xs font-bold">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{chap.badge}</span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-3xl text-dawang-sand">
                  {chap.title}
                </h3>
                <p className="text-xs text-dawang-gold font-medium italic">
                  {chap.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-dawang-sandMuted leading-relaxed">
                  {chap.description}
                </p>

                <div className="space-y-2 pt-2">
                  {chap.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-dawang-sand">
                      <div className="w-1.5 h-1.5 rounded-full bg-dawang-clayLight" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {onFocusMapLocation && (
                  <button
                    onClick={() => onFocusMapLocation(chap.coords.lat, chap.coords.lng, chap.coords.zoom)}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 rounded-xl bg-dawang-clay text-white text-xs font-bold shadow-2.5d-sm hover:brightness-110 active:scale-95 transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Lihat Lokasi di Peta GIS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Visual Image Card Column */}
              <div className="md:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2.5d-md border border-white/15 aspect-video md:aspect-square">
                  <img
                    src={getAssetUrl(chap.image)}
                    alt={chap.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dawang-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-2 bg-dawang-card/80 backdrop-blur-md rounded-xl border border-white/10 text-[11px] text-dawang-sand">
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
