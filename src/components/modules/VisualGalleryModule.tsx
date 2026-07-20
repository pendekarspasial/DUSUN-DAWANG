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
    <section id="galeri" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#090909] via-[#141414] to-[#090909] border-y-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border-2 border-white/40 text-white text-xs font-extrabold tracking-wide mb-3 shadow-lg">
            <Camera className="w-4 h-4 text-white animate-pulse" />
            <span>GALERI DOKUMENTASI VISUAL</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Potret Kehidupan Dawang
          </h2>
          <p className="text-xs sm:text-sm text-dawang-sandMuted font-medium mt-2">
            Dokumentasi keindahan alam, aktivitas warga, dan infrastruktur fisik Dusun Dawang.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-white/15 shadow-[0_10px_20px_rgba(0,0,0,0.6)] hover:border-dawang-gold hover:scale-[1.03] transition-all duration-300 group"
            >
              <img
                src={getAssetUrl(item.src)}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-3 left-3 right-3 space-y-1">
                <span className="text-[9px] font-extrabold text-dawang-gold bg-black/80 px-2 py-0.5 rounded-md border border-dawang-gold/30">
                  {item.category}
                </span>
                <p className="text-xs font-bold text-white leading-tight line-clamp-1">
                  {item.title}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative max-w-4xl w-full flex flex-col items-center">
              
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-dawang-clay border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={getAssetUrl(activeImage.src)}
                alt={activeImage.title}
                className="max-h-[75vh] w-auto rounded-3xl border-2 border-white/30 shadow-2xl object-contain"
              />

              <div className="mt-4 text-center space-y-1">
                <span className="text-xs font-extrabold text-dawang-gold bg-[#141311] px-3.5 py-1 rounded-full border border-dawang-gold/40 shadow-md">
                  {activeImage.category}
                </span>
                <p className="font-serif font-bold text-xl text-dawang-sand mt-2">{activeImage.title}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
