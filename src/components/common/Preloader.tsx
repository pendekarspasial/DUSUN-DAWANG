import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 25;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dawang-dark flex flex-col items-center justify-center p-4 transition-opacity duration-500">
      {/* Background Batik Accent */}
      <div className="absolute inset-0 bg-batik-tile opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xs text-center">
        {/* Animated Badge Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-dawang-clay to-dawang-paddy flex items-center justify-center text-3xl shadow-2.5d-lg mb-4 animate-float-slow">
          🗺️
        </div>

        <h1 className="font-serif font-bold text-2xl text-dawang-sand tracking-wide mb-1">
          Dusun Dawang
        </h1>
        <p className="text-xs text-dawang-gold font-medium mb-6 uppercase tracking-wider">
          Desa Blongkeng · Ngluwar · Magelang
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-dawang-card rounded-full overflow-hidden border border-white/10 mb-2">
          <div
            className="h-full bg-gradient-to-r from-dawang-clay via-dawang-gold to-dawang-paddyLight transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[11px] text-dawang-sandDim animate-pulse">
          Memuat StoryMap & Peta Spasial ({progress}%)...
        </p>
      </div>
    </div>
  );
};
