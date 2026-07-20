import React from 'react';

export const CardSkeleton: React.FC = () => (
  <div className="glass-card rounded-2xl p-4 animate-pulse space-y-3">
    <div className="w-full h-40 bg-dawang-card/80 rounded-xl" />
    <div className="h-4 bg-dawang-card/80 rounded w-3/4" />
    <div className="h-3 bg-dawang-card/60 rounded w-1/2" />
  </div>
);

export const MapSkeleton: React.FC = () => (
  <div className="w-full h-full bg-dawang-surface relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-batik-tile opacity-10" />
    <div className="text-center p-6 space-y-3 z-10 animate-pulse">
      <div className="w-12 h-12 rounded-full bg-dawang-card/80 mx-auto flex items-center justify-center text-xl">
        🗺️
      </div>
      <p className="text-sm font-semibold text-dawang-sandMuted">Menyiapkan Mesin Leaflet GIS...</p>
      <div className="w-32 h-1.5 bg-dawang-card rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-dawang-gold w-1/2 animate-shimmer" />
      </div>
    </div>
  </div>
);
