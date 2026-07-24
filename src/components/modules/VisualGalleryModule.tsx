import React, { useState, useEffect } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';
import { getAssetUrl } from '../../utils/path';

export const VisualGalleryModule: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryItems = [
    '/fotorumah/Kadus.jpg.jpg',
    '/fotorumah/Masjid.jpg.jpg',
    '/fotorumah/RT1.jpg.jpg',
    '/fotorumah/RT2.jpg.jpg',
    '/fotorumah/RT3.jpg.jpg',
    '/fotorumah/RT4.jpg.jpg',
    '/fotorumah/RW.jpg.jpg',
    '/fotorumah/Musholla.jpg.jpg',
    '/fotorumah/Kades.jpeg.jpg',
    '/fotorumah/Kades1.jpg',
    '/fotorumah/makam.jpg.jpg',
  ];

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeImage]);


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
          {galleryItems.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(src)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-white/15 shadow-[0_10px_20px_rgba(0,0,0,0.6)] hover:border-dawang-gold hover:scale-[1.03] transition-all duration-300 group"
            >
              <img
                src={getAssetUrl(src)}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Image Preview Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-4xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-2 right-2 z-10 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-dawang-clay border border-white/30 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={getAssetUrl(activeImage)}
                alt=""
                className="max-h-[85vh] max-w-full rounded-3xl border-2 border-white/30 shadow-2xl object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
