import React from 'react';
import { Map, BookOpen, Users, Sparkles, FolderArchive, Compass } from 'lucide-react';
import { getAssetUrl } from '../../utils/path';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  gisMode: boolean;
  setGisMode: (mode: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  gisMode,
  setGisMode,
}) => {
  const navItems = [
    { id: 'cerita', label: 'Cerita Dusun', icon: BookOpen },
    { id: 'peta-tematik', label: 'Peta Tematik', icon: Compass },
    { id: 'demografi', label: 'Demografi', icon: Users },
    { id: 'potensi', label: 'Potensi & UMKM', icon: Sparkles },
    { id: 'arsip-kkn', label: 'Arsip KKN', icon: FolderArchive },
  ];

  const handleNavClick = (id: string) => {
    setGisMode(false);
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-dawang-border/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Location */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 p-1 border border-white/20 flex items-center justify-center shadow-2.5d-sm group-hover:scale-105 transition-transform duration-300">
            <img src={getAssetUrl('assets/images/logo_kab_magelang.png')} alt="Logo Kab Magelang" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-dawang-sand tracking-wide group-hover:text-dawang-gold transition-colors">
                Dusun Dawang
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-dawang-paddy/30 text-dawang-paddyGold border border-dawang-paddy/50">
                Blongkeng · Merapi
              </span>
            </div>
            <p className="text-xs text-dawang-sandDim">Ngluwar, Magelang, Jawa Tengah</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !gisMode && activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-dawang-clay text-white shadow-2.5d-sm'
                    : 'text-dawang-sandMuted hover:text-dawang-sand hover:bg-dawang-card/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* WebGIS Direct Switcher Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGisMode(!gisMode)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-2.5d-md active:scale-95 ${
              gisMode
                ? 'bg-dawang-gold text-dawang-dark hover:bg-dawang-goldLight ring-2 ring-dawang-gold/50'
                : 'bg-gradient-to-r from-dawang-clay to-dawang-clayLight text-white hover:brightness-110'
            }`}
          >
            <Map className="w-4 h-4 animate-pulse-subtle" />
            <span>{gisMode ? 'Tutup Peta' : 'Peta Interaktif Dusun'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
