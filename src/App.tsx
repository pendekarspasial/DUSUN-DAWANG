import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { StickyBottomNav } from './components/navigation/StickyBottomNav';
import { Preloader } from './components/common/Preloader';
import { MobileHero } from './components/storymap/MobileHero';
import { IdentitySummaryCard } from './components/storymap/IdentitySummaryCard';
import { StoryTimeline } from './components/storymap/StoryTimeline';
import { ThematicMapGrid } from './components/storymap/ThematicMapGrid';
import { FullWebGIS } from './components/gis/FullWebGIS';
import { DemographicsModule } from './components/modules/DemographicsModule';
import { VillagePotentialModule } from './components/modules/VillagePotentialModule';
import { KKNProfileModule } from './components/modules/KKNProfileModule';
import { DigitalArchiveModule } from './components/modules/DigitalArchiveModule';
import { VisualGalleryModule } from './components/modules/VisualGalleryModule';
import { Footer } from './components/modules/Footer';
import { defaultVillageData } from './data/villageData';
import { VillageData } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cerita');
  const [gisMode, setGisMode] = useState<boolean>(false);
  const [villageData, setVillageData] = useState<VillageData>(defaultVillageData);
  const [selectedGeoJsonFile, setSelectedGeoJsonFile] = useState<string | undefined>(undefined);

  // Load JSON data from public/data/dusun.json if available
  useEffect(() => {
    fetch('/data/dusun.json')
      .then((res) => {
        if (!res.ok) throw new Error('dusun.json fetch error');
        return res.json();
      })
      .then((data) => {
        if (data && data.dusun) {
          setVillageData((prev) => ({
            ...prev,
            dusun: { ...prev.dusun, ...data.dusun },
            penduduk: data.penduduk ? { ...prev.penduduk, ...data.penduduk } : prev.penduduk,
            fasilitas: data.fasilitas && data.fasilitas.length ? data.fasilitas : prev.fasilitas,
            potensi: data.potensi && data.potensi.length ? data.potensi : prev.potensi,
            prokerKKN: data.prokerKKN && data.prokerKKN.length ? data.prokerKKN : prev.prokerKKN,
            timKKN: data.timKKN ? { ...prev.timKKN, ...data.timKKN } : prev.timKKN,
          }));
        }
      })
      .catch((err) => console.log('Using default inline village data fallback:', err));
  }, []);

  const handleOpenGisWithFile = (file?: string) => {
    setSelectedGeoJsonFile(file);
    setGisMode(true);
  };

  const handleExploreStory = () => {
    setGisMode(false);
    setActiveTab('cerita');
    const el = document.getElementById('cerita');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dawang-dark text-dawang-sand relative font-sans">
      <Preloader />

      {/* Main Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gisMode={gisMode}
        setGisMode={setGisMode}
      />

      {/* Conditionally Render Fullscreen Interactive WebGIS Mode OR Narrative StoryMap Mode */}
      {gisMode ? (
        <main className="w-full h-[calc(100vh-64px)] relative">
          <FullWebGIS
            fasilitas={villageData.fasilitas}
            initialFocusFile={selectedGeoJsonFile}
            onCloseGis={() => setGisMode(false)}
          />
        </main>
      ) : (
        <main className="space-y-4 pb-16">
          {/* Hero Section */}
          <MobileHero
            dusun={villageData.dusun}
            onOpenGis={() => handleOpenGisWithFile()}
            onExploreStory={handleExploreStory}
          />

          {/* Identity & Sejarah Summary */}
          <IdentitySummaryCard
            dusun={villageData.dusun}
            penduduk={villageData.penduduk}
          />

          {/* Scroll Narrative Storymap Timeline */}
          <StoryTimeline
            onFocusMapLocation={(lat, lng, zoom) => {
              setGisMode(true);
            }}
          />

          {/* Thematic Map Gallery */}
          <ThematicMapGrid
            onSelectMapForGis={(file) => handleOpenGisWithFile(file)}
          />

          {/* Demographics & Monografi */}
          <DemographicsModule
            penduduk={villageData.penduduk}
          />

          {/* Village Potential */}
          <VillagePotentialModule
            potensi={villageData.potensi}
          />

          {/* KKN Team Members */}
          <KKNProfileModule
            timKKN={villageData.timKKN}
          />

          {/* Digital Archive */}
          <DigitalArchiveModule
            prokerList={villageData.prokerKKN}
          />

          {/* Visual Photography Gallery */}
          <VisualGalleryModule />

          {/* Footer */}
          <Footer dusun={villageData.dusun} />
        </main>
      )}

      {/* Thumb-Friendly Sticky Bottom Bar for Mobile Visitors */}
      <StickyBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gisMode={gisMode}
        setGisMode={setGisMode}
      />
    </div>
  );
};

export default App;
