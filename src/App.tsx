import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
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
import { getAssetUrl } from './utils/path';

// Per-component Error Boundary for debugging
interface EBState { hasError: boolean; error: Error | null }
class EB extends Component<{ children: ReactNode; name: string }, EBState> {
  state: EBState = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  componentDidCatch(e: Error, i: ErrorInfo) { console.error('[EB]', this.props.name, e, i); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', margin: '0.5rem', background: '#1c1b18', border: '1px solid #c2593f', borderRadius: '8px', color: '#f9f6f0' }}>
          <p style={{ color: '#c2593f', fontSize: '0.75rem', fontWeight: 'bold' }}>⚠️ Error di: {this.props.name}</p>
          <pre style={{ fontSize: '0.65rem', color: '#999488', marginTop: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cerita');
  const [gisMode, setGisMode] = useState<boolean>(false);
  const [villageData, setVillageData] = useState<VillageData>(defaultVillageData);
  const [selectedGeoJsonFile, setSelectedGeoJsonFile] = useState<string | undefined>(undefined);

  // Load JSON data from public/data/dusun.json if available
  useEffect(() => {
    fetch(getAssetUrl('data/dusun.json'))
      .then((res) => {
        if (!res.ok) throw new Error('dusun.json fetch error');
        return res.json();
      })
      .then((data) => {
        if (data && data.dusun) {
          setVillageData((prev: VillageData) => {
            const hasRealTimKKN =
              data.timKKN &&
              data.timKKN.anggota &&
              data.timKKN.anggota.length > 0 &&
              !data.timKKN.anggota[0].nama.includes('Nama Mahasiswa');
            return {
              ...prev,
              dusun: { ...prev.dusun, ...data.dusun },
              penduduk: data.penduduk ? { ...prev.penduduk, ...data.penduduk } : prev.penduduk,
              fasilitas: data.fasilitas && data.fasilitas.length ? data.fasilitas : prev.fasilitas,
              potensi: data.potensi && data.potensi.length ? data.potensi : prev.potensi,
              prokerKKN: data.prokerKKN && data.prokerKKN.length ? data.prokerKKN : prev.prokerKKN,
              timKKN: hasRealTimKKN ? { ...prev.timKKN, ...data.timKKN } : prev.timKKN,
            };
          });
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
      <EB name="Preloader">
        <Preloader />
      </EB>

      <EB name="Navbar">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gisMode={gisMode}
          setGisMode={setGisMode}
        />
      </EB>

      {gisMode ? (
        <main className="w-full h-[calc(100vh-64px)] relative">
          <EB name="FullWebGIS">
            <FullWebGIS
              fasilitas={villageData.fasilitas}
              initialFocusFile={selectedGeoJsonFile}
              onCloseGis={() => setGisMode(false)}
            />
          </EB>
        </main>
      ) : (
        <main className="space-y-4 pb-16">
          <EB name="MobileHero">
            <MobileHero
              dusun={villageData.dusun}
              onOpenGis={() => handleOpenGisWithFile()}
              onExploreStory={handleExploreStory}
            />
          </EB>

          <EB name="IdentitySummaryCard">
            <IdentitySummaryCard
              dusun={villageData.dusun}
              penduduk={villageData.penduduk}
            />
          </EB>

          <EB name="StoryTimeline">
            <StoryTimeline
              onFocusMapLocation={(lat, lng, zoom) => {
                setGisMode(true);
              }}
            />
          </EB>

          <EB name="ThematicMapGrid">
            <ThematicMapGrid
              onSelectMapForGis={(file) => handleOpenGisWithFile(file)}
            />
          </EB>

          <EB name="DemographicsModule">
            <DemographicsModule
              penduduk={villageData.penduduk}
            />
          </EB>

          <EB name="VillagePotentialModule">
            <VillagePotentialModule
              potensi={villageData.potensi}
            />
          </EB>

          <EB name="KKNProfileModule">
            <KKNProfileModule
              timKKN={villageData.timKKN}
            />
          </EB>

          <EB name="DigitalArchiveModule">
            <DigitalArchiveModule
              prokerList={villageData.prokerKKN}
            />
          </EB>

          <EB name="VisualGalleryModule">
            <VisualGalleryModule />
          </EB>

          <EB name="Footer">
            <Footer dusun={villageData.dusun} />
          </EB>
        </main>
      )}

      <EB name="StickyBottomNav">
        <StickyBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gisMode={gisMode}
          setGisMode={setGisMode}
        />
      </EB>
    </div>
  );
};

export default App;
