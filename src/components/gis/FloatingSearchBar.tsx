import React, { useState } from 'react';
import { Search, X, MapPin, Building, Home, Compass } from 'lucide-react';
import { FasilitasItem } from '../../types';

interface FloatingSearchBarProps {
  fasilitas: FasilitasItem[];
  onSelectResult: (lat: number, lng: number, title: string) => void;
}

export const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({
  fasilitas,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    { title: 'Balai Dusun Dawang', lat: -7.6170, lng: 110.2780, category: 'Pusat Dusun' },
    { title: 'Masjid Al-Ikhlas', lat: -7.6168, lng: 110.2775, category: 'Ibadah' },
    { title: 'Wilayah RT 01', lat: -7.6172, lng: 110.2778, category: 'RT' },
    { title: 'Wilayah RT 03', lat: -7.6183, lng: 110.2788, category: 'RT' },
    { title: 'Persawahan Utama', lat: -7.6190, lng: 110.2790, category: 'Pertanian' },
  ];

  const filteredFasilitas = query.trim()
    ? fasilitas.filter((f) => f.nama.toLowerCase().includes(query.toLowerCase()) || f.deskripsi.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelect = (lat: number, lng: number, title: string) => {
    onSelectResult(lat, lng, title);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 left-3 right-3 sm:left-6 sm:right-auto sm:w-96 z-30 pointer-events-auto">
      <div className="relative">
        
        {/* Search Input Box */}
        <div className="glass-card rounded-2xl p-2 flex items-center gap-2 border border-white/15 shadow-2.5d-md bg-dawang-dark/90 backdrop-blur-xl">
          <div className="w-9 h-9 rounded-xl bg-dawang-clay/20 text-dawang-clayLight flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Cari warga, RT, balai, masjid, sawah..."
            className="w-full bg-transparent text-dawang-sand text-xs placeholder:text-dawang-sandDim focus:outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-dawang-sandDim hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card-elevated rounded-2xl p-3 border border-white/15 shadow-2.5d-lg max-h-60 overflow-y-auto space-y-2">
            
            {/* Direct Query Matches */}
            {query.trim() && filteredFasilitas.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-dawang-gold px-2">Hasil Pencarian</p>
                {filteredFasilitas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelect(f.lat, f.lng, f.nama)}
                    className="w-full text-left p-2 rounded-xl hover:bg-dawang-card flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-dawang-clay" />
                      <span className="text-xs font-semibold text-dawang-sand">{f.nama}</span>
                    </div>
                    <span className="text-[10px] text-dawang-sandDim">{f.kategori}</span>
                  </button>
                ))}
              </div>
            )}

            {query.trim() && filteredFasilitas.length === 0 && (
              <div className="p-3 text-center text-xs text-dawang-sandDim">
                Tidak ada titik lokasi persis dengan kata kunci "{query}".
              </div>
            )}

            {/* Quick Presets / Popular Locations */}
            <div className="space-y-1 pt-1 border-t border-white/10">
              <p className="text-[10px] uppercase font-bold text-dawang-sandDim px-2">Lokasi Populer Dusun</p>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(p.lat, p.lng, p.title)}
                  className="w-full text-left p-2 rounded-xl hover:bg-dawang-card flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-dawang-paddyGold" />
                    <span className="font-semibold text-dawang-sand">{p.title}</span>
                  </div>
                  <span className="text-[10px] text-dawang-gold bg-dawang-gold/10 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                </button>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
