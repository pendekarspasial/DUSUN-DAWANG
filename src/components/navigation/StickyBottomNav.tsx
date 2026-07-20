import React from 'react';
import { BookOpen, Map, Users, Sparkles, FolderArchive } from 'lucide-react';

interface StickyBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  gisMode: boolean;
  setGisMode: (mode: boolean) => void;
}

export const StickyBottomNav: React.FC<StickyBottomNavProps> = ({
  activeTab,
  setActiveTab,
  gisMode,
  setGisMode,
}) => {
  const navItems = [
    { id: 'cerita', label: 'Cerita', icon: BookOpen, action: () => { setGisMode(false); setActiveTab('cerita'); scrollToSection('cerita'); } },
    { id: 'gis', label: 'Peta GIS', icon: Map, action: () => setGisMode(!gisMode) },
    { id: 'demografi', label: 'Demografi', icon: Users, action: () => { setGisMode(false); setActiveTab('demografi'); scrollToSection('demografi'); } },
    { id: 'potensi', label: 'Potensi', icon: Sparkles, action: () => { setGisMode(false); setActiveTab('potensi'); scrollToSection('potensi'); } },
    { id: 'arsip-kkn', label: 'Arsip KKN', icon: FolderArchive, action: () => { setGisMode(false); setActiveTab('arsip-kkn'); scrollToSection('arsip-kkn'); } },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none">
      <nav className="pointer-events-auto max-w-md mx-auto glass-bottom-sheet rounded-2xl p-1.5 flex items-center justify-around shadow-2.5d-lg border border-white/10 backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isGisTab = item.id === 'gis';
          const isActive = isGisTab ? gisMode : (!gisMode && activeTab === item.id);

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
                isGisTab
                  ? gisMode
                    ? 'bg-dawang-gold text-dawang-dark font-bold shadow-2.5d-sm ring-2 ring-dawang-gold/50'
                    : 'bg-dawang-clay text-white font-bold shadow-2.5d-sm'
                  : isActive
                  ? 'bg-dawang-card text-dawang-sand font-semibold border border-white/10'
                  : 'text-dawang-sandDim hover:text-dawang-sand'
              }`}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 ${isGisTab && gisMode ? 'animate-bounce' : ''}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
