import React, { useState } from 'react';
import { Camera, Eye, X, ZoomIn } from 'lucide-react';
import { getAssetUrl } from '../../utils/path';

export const VisualGalleryModule: React.FC = () => {
  const [activeImage, setActiveImage] = useState<{ src: string; title: string; category: string } | null>(null);

  const galleryItems = [
    { src: '/fotorumah/Kadus.jpg.jpg', title: 'Balai & Kantor Kepala Dusun Dawang', category: 'Fasilitas Dusun' },
    { src: '/fotorumah/Masjid.jpg.jpg', title: 'Masjid Utama Al-Ikhlas Dawang', category: 'Keagamaan' },
    { src: '/fotorumah/RT1.jpg.jpg', title: 'Persawahan & Lanskap RT 01', category: 'Pertanian & Alam' },
    { src: '/fotorumah/RT2.jpg.jpg', title: 'Jalan Akses Dusun & Wilayah RT 02', category: 'Infrastruktur' },
    { src: '/fotorumah/RT3.jpg.jpg', title: 'Pemukiman Warga & Area RT 03', category: 'Pemukiman' },
    { src: '/fotorumah/RT4.jpg.jpg', title: 'Lingkungan Asri RT 04', category: 'Pemukiman' },
    { src: '/fotorumah/RW.jpg.jpg', title: 'Kegiatan Warga RW Dawang', category: 'Masyarakat' },
    { src: '/fotorumah/Musholla.jpg.jpg', title: 'Musholla RT 03 Dawang', category: 'Keagamaan' },
    { src: '/fotorumah/Kades.jpeg.jpg', title: 'Kegiatan Posyandu & Kesehatan', category: 'Kesehatan' },
    { src: '/fotorumah/Kades1.jpg', title: 'SD Negeri Blongkeng', category: 'Pendidikan' },
    { src: '/fotorumah/makam.jpg.jpg', title: 'Makam Dusun Dawang', category: 'Fasilitas Umum' },
  ];

  return (
    <section id="galeri" className="relative py-16 px-4 sm:px-6 bg-gradient-to-b from-[#141311] via-[#161616] to-[#141311] border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-paddy/20 border border-dawang-paddy/40 text-dawang-paddyGold text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Galeri Dokumentasi Visual</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Dokumentasi Suasana Dawang
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Rekaman lensa keindahan alam, fasilitas umum, dan kehidupan bermasyarakat Dusun Dawang.
        </p>
      </div>

      {/* Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(item)}
            className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 aspect-video sm:aspect-square cursor-pointer shadow-2.5d-sm hover:shadow-2.5d-md transition-all duration-300"
          >
            <img
              src={getAssetUrl(item.src)}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dawang-dark/90 via-dawang-dark/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            
            <div className="absolute bottom-3 left-3 right-3 p-2 space-y-1">
              <span className="text-[10px] font-bold text-dawang-gold bg-dawang-gold/20 border border-dawang-gold/30 px-2 py-0.5 rounded uppercase">
                {item.category}
              </span>
              <p className="text-xs font-bold text-dawang-sand line-clamp-1 group-hover:text-dawang-gold transition-colors">
                {item.title}
              </p>
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/50 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-10 right-0 p-2 rounded-full text-white bg-dawang-card hover:bg-dawang-clay transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={getAssetUrl(activeImage.src)}
              alt={activeImage.title}
              className="max-h-[75vh] w-auto rounded-2xl border border-white/20 shadow-2.5d-lg object-contain"
            />

            <div className="mt-4 text-center space-y-1">
              <span className="text-xs font-bold text-dawang-gold bg-dawang-gold/20 px-3 py-1 rounded-full border border-dawang-gold/30">
                {activeImage.category}
              </span>
              <p className="font-serif font-bold text-lg text-dawang-sand">{activeImage.title}</p>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};
