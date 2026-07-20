import React, { useState } from 'react';
import { Compass, Download, Eye, Layers, X, FileText, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '../../utils/path';

interface ThematicMapItem {
  id: string;
  title: string;
  category: string;
  scale: string;
  year: string;
  author: string;
  description: string;
  thumbnail: string;
  geojsonFile: string;
  format: string;
}

interface ThematicMapGridProps {
  onSelectMapForGis?: (file: string) => void;
}

export const ThematicMapGrid: React.FC<ThematicMapGridProps> = ({ onSelectMapForGis }) => {
  const [selectedMap, setSelectedMap] = useState<ThematicMapItem | null>(null);

  const maps: ThematicMapItem[] = [
    {
      id: 'batas-rt',
      title: 'Peta Batas Administrasi & Wilayah RT 01-05',
      category: 'Administrasi',
      scale: '1 : 2.500',
      year: '2025',
      author: 'Tim KKN Dusun Dawang',
      description: 'Peta pembagian wilayah RT 01 hingga RT 05 Dusun Dawang beserta lokasi Balai Dusun dan titik strategis desa.',
      thumbnail: '/fotorumah/Kadus.jpg.jpg',
      geojsonFile: 'wgs84_aoi_rt.geojson',
      format: 'GeoJSON / PNG / PDF'
    },
    {
      id: 'tutupan-lahan',
      title: 'Peta Tutupan Lahan & Persil Bangunan',
      category: 'Penggunaan Lahan',
      scale: '1 : 2.500',
      year: '2025',
      author: 'Tim KKN Dusun Dawang',
      description: 'Peta hasil digitasi persil rumah warga, area bangunan umum, dan vegetasi pekarangan.',
      thumbnail: '/fotorumah/RT1.jpg.jpg',
      geojsonFile: 'wgs84_rumah.geojson',
      format: 'GeoJSON / SHP / PDF'
    },
    {
      id: 'sawah-irigasi',
      title: 'Peta Sebaran Lahan Pertanian & Irigasi',
      category: 'Pertanian',
      scale: '1 : 3.000',
      year: '2025',
      author: 'Tim KKN Dusun Dawang',
      description: 'Peta area persawahan produktif, jenis lahan tanam, dan jaringan saluran irigasi alami dari lereng Merapi.',
      thumbnail: '/fotorumah/RT2.jpg.jpg',
      geojsonFile: 'wgs84_sawah.geojson',
      format: 'GeoJSON / PDF'
    },
    {
      id: 'fasilitas-umum',
      title: 'Peta Fasilitas Publik & Perangkat Desa',
      category: 'Infrastruktur',
      scale: '1 : 2.500',
      year: '2025',
      author: 'Tim KKN Dusun Dawang',
      description: 'Peta titik lokasi masjid, posyandu, sekolah dasar, makam dusun, dan kediaman tokoh perangkat desa.',
      thumbnail: '/fotorumah/Masjid.jpg.jpg',
      geojsonFile: 'wgs84_perangkatdesa.geojson',
      format: 'GeoJSON / PNG'
    },
    {
      id: 'area-blongkeng',
      title: 'Peta Posisi Dusun di Desa Blongkeng',
      category: 'Kawasan Desa',
      scale: '1 : 10.000',
      year: '2025',
      author: 'Tim KKN Dusun Dawang',
      description: 'Peta konteks keberadaan Dusun Dawang di wilayah batas Desa Blongkeng, Kecamatan Ngluwar.',
      thumbnail: '/fotorumah/RT3.jpg.jpg',
      geojsonFile: 'wgs84_area_blongkeng.geojson',
      format: 'GeoJSON / PDF'
    },
    {
      id: 'pembagian-dusun',
      title: 'Peta Zona Pembagian Dusun Dawang',
      category: 'Perencanaan',
      scale: '1 : 3.000',
      year: '2025',
      author: 'Tim KKN Dusun Dawang',
      description: 'Peta zonasi potensi pengembanan desa wisata, kawasan pertanian terlindungi, dan pemukiman.',
      thumbnail: '/fotorumah/RT4.jpg.jpg',
      geojsonFile: 'wgs84_pembagian_dusun.geojson',
      format: 'GeoJSON / PDF'
    }
  ];

  return (
    <section id="peta-tematik" className="relative py-16 px-4 sm:px-6 bg-gradient-to-b from-[#141311] via-[#14181f] to-[#141311] border-y border-white/5 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dawang-gold/20 border border-dawang-gold/40 text-dawang-gold text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Koleksi Kartografi Digital</span>
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-dawang-sand tracking-wide">
          Galeri Peta Tematik Spasial
        </h2>
        <p className="text-xs sm:text-sm text-dawang-sandMuted mt-2">
          Koleksi peta tematik resmi hasil survei lapangan dan digitasi geospasial Dusun Dawang.
        </p>
      </div>

      {/* Grid of Maps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map) => (
          <div
            key={map.id}
            className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2.5d-sm hover:shadow-2.5d-md hover:border-dawang-gold/50 transition-all duration-300 flex flex-col group"
          >
            {/* Thumbnail Header */}
            <div className="relative aspect-video overflow-hidden bg-dawang-surface">
              <img
                src={getAssetUrl(map.thumbnail)}
                alt={map.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dawang-dark via-transparent to-transparent" />
              
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-dawang-dark/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-dawang-gold uppercase">
                {map.category}
              </span>

              <span className="absolute bottom-3 right-3 text-[10px] font-mono text-dawang-sandMuted bg-dawang-card/90 px-2 py-0.5 rounded">
                Skala {map.scale}
              </span>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-sm text-dawang-sand group-hover:text-dawang-gold transition-colors line-clamp-2">
                  {map.title}
                </h3>
                <p className="text-xs text-dawang-sandMuted line-clamp-2 mt-1">
                  {map.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => setSelectedMap(map)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-dawang-card hover:bg-dawang-border text-dawang-sand text-xs font-semibold border border-white/10 active:scale-95 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-dawang-gold" />
                  <span>Detail Peta</span>
                </button>

                {onSelectMapForGis && (
                  <button
                    onClick={() => onSelectMapForGis(map.geojsonFile)}
                    className="flex items-center justify-center p-2 rounded-xl bg-dawang-clay hover:bg-dawang-clayLight text-white text-xs font-bold active:scale-95 transition-all"
                    title="Buka di WebGIS"
                  >
                    <Compass className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Bottom Sheet / Modal */}
      {selectedMap && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg glass-bottom-sheet sm:glass-card-elevated sm:rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-dawang-gold" />
                <h3 className="font-bold text-sm text-dawang-sand">Metadata Peta Tematik</h3>
              </div>
              <button
                onClick={() => setSelectedMap(null)}
                className="p-1 rounded-lg text-dawang-sandDim hover:text-white bg-dawang-card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h4 className="font-serif font-bold text-lg text-dawang-sand">{selectedMap.title}</h4>
            <p className="text-xs text-dawang-sandMuted leading-relaxed">{selectedMap.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-dawang-card/80 p-3 rounded-xl border border-white/5">
              <div>
                <span className="text-[10px] text-dawang-sandDim block">Kategori</span>
                <span className="font-semibold text-dawang-sand">{selectedMap.category}</span>
              </div>
              <div>
                <span className="text-[10px] text-dawang-sandDim block">Skala Kartografi</span>
                <span className="font-semibold text-dawang-sand">{selectedMap.scale}</span>
              </div>
              <div>
                <span className="text-[10px] text-dawang-sandDim block">Tahun Pembuatan</span>
                <span className="font-semibold text-dawang-sand">{selectedMap.year}</span>
              </div>
              <div>
                <span className="text-[10px] text-dawang-sandDim block">Penyusun Data</span>
                <span className="font-semibold text-dawang-sand">{selectedMap.author}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-dawang-paddyGold bg-dawang-paddy/20 p-2.5 rounded-xl border border-dawang-paddy/30">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Sistem Koordinat Terverifikasi: WGS 84 / UTM Zone 49S</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getAssetUrl(`Data_geojson/${selectedMap.geojsonFile}`)}
                download
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-dawang-clay text-white text-xs font-bold shadow-2.5d-sm hover:brightness-110 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File GeoJSON ({selectedMap.format.split(' ')[0]})</span>
              </a>

              <button
                onClick={() => setSelectedMap(null)}
                className="px-4 py-3 rounded-xl glass-card text-xs text-dawang-sand font-semibold hover:bg-dawang-card"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}
      </div>
    </section>
  );
};
