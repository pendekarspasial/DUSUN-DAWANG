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
      year: '2026',
      author: 'Tim KKN UPN "Veteran" Yk',
      description: 'Peta pembagian wilayah RT 01 hingga RT 05 Dusun Dawang beserta lokasi Balai Dusun dan titik strategis desa.',
      thumbnail: '/fotorumah/Kadus.jpg.jpg',
      geojsonFile: 'wgs84_aoi_rt.geojson',
      format: 'GeoJSON / PNG / PDF'
    },
    {
      id: 'tutupan-lahan',
      title: 'Peta Tutupan Lahan & Persil Bangunan',
      category: 'Spasial & Bangunan',
      scale: '1 : 1.500',
      year: '2026',
      author: 'Tim KKN UPN "Veteran" Yk',
      description: 'Hasil pemetaan drone dan GPS lapang mencakup 124 persil rumah warga dan area terbangun Dusun Dawang.',
      thumbnail: '/fotorumah/RT1.jpg.jpg',
      geojsonFile: 'wgs84_rumah.geojson',
      format: 'GeoJSON / SHP / PDF'
    },
    {
      id: 'sawah-irigasi',
      title: 'Peta Lahan Pertanian & Jaringan Irigasi',
      category: 'Pertanian & Air',
      scale: '1 : 2.000',
      year: '2026',
      author: 'Tim KKN UPN "Veteran" Yk',
      description: 'Pemetaan ±85 Ha area persawahan produktif dan jalur irigasi alami pendukung ketahanan pangan dusun.',
      thumbnail: '/fotorumah/RT2.jpg.jpg',
      geojsonFile: 'wgs84_sawah.geojson',
      format: 'GeoJSON / PDF'
    },
    {
      id: 'fasilitas-perangkat',
      title: 'Peta Persebaran Fasilitas & Perangkat Desa',
      category: 'Fasilitas Umum',
      scale: '1 : 2.000',
      year: '2026',
      author: 'Tim KKN UPN "Veteran" Yk',
      description: 'Sebaran titik Balai Dusun, Masjid Al-Ikhlas, Posyandu, sekolah, serta lokasi fasilitas umum warga.',
      thumbnail: '/fotorumah/Masjid.jpg.jpg',
      geojsonFile: 'wgs84_perangkatdesa.geojson',
      format: 'GeoJSON / KML / PDF'
    },
    {
      id: 'konteks-blongkeng',
      title: 'Peta Regional Desa Blongkeng & Dawang',
      category: 'Regional',
      scale: '1 : 10.000',
      year: '2026',
      author: 'Tim KKN UPN "Veteran" Yk',
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
      year: '2026',
      author: 'Tim KKN UPN "Veteran" Yk',
      description: 'Peta zonasi potensi pengembangan desa wisata, kawasan pertanian terlindungi, dan pemukiman.',
      thumbnail: '/fotorumah/RT4.jpg.jpg',
      geojsonFile: 'wgs84_pembagian_dusun.geojson',
      format: 'GeoJSON / PDF'
    }
  ];

  return (
    <section id="peta-tematik" className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-[#0c121d] via-[#121c2a] to-[#0c121d] border-y-2 border-blue-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/30 border-2 border-blue-400/60 text-blue-300 text-xs font-extrabold tracking-wide mb-3 shadow-lg">
            <Layers className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span>KOLEKSI KARTOGRAFI DIGITAL</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-dawang-sand tracking-wide drop-shadow-md">
            Galeri Peta Tematik Spasial
          </h2>
          <p className="text-xs sm:text-sm text-blue-200/80 font-medium mt-2">
            Koleksi peta tematik resmi hasil survei lapangan dan digitasi geospasial Dusun Dawang.
          </p>
        </div>

        {/* Maps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maps.map((mapItem) => (
            <div
              key={mapItem.id}
              className="glass-card rounded-2xl overflow-hidden border-2 border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:border-cyan-400/60 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={getAssetUrl(mapItem.thumbnail)}
                    alt={mapItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e131b] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-600 text-white shadow-md border border-blue-300/40">
                    {mapItem.category}
                  </span>

                  <span className="absolute bottom-3 right-3 text-[10px] font-bold text-cyan-300 bg-[#0e131b]/90 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                    Skala {mapItem.scale}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-dawang-sand leading-snug group-hover:text-cyan-300 transition-colors">
                    {mapItem.title}
                  </h3>
                  <p className="text-xs text-dawang-sandMuted line-clamp-2 leading-relaxed">
                    {mapItem.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setSelectedMap(mapItem)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600/40 hover:bg-blue-600 text-white text-xs font-bold border border-blue-400/50 shadow-md transition-all active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pratinjau</span>
                </button>

                {onSelectMapForGis && (
                  <button
                    onClick={() => onSelectMapForGis(mapItem.geojsonFile)}
                    className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
                    title="Buka Peta Ini di Full WebGIS Interaktif"
                  >
                    <Compass className="w-4 h-4" />
                    <span className="hidden sm:inline">GIS</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Map Modal */}
        {selectedMap && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="glass-card-elevated rounded-3xl max-w-xl w-full p-6 border-2 border-cyan-400/50 shadow-2xl relative space-y-4">
              
              <button
                onClick={() => setSelectedMap(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-dawang-clay"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <FileText className="w-4 h-4" />
                <span>Detail Kartografi Digital</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-dawang-sand">
                {selectedMap.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#0e131b]/90 p-3 rounded-2xl border border-white/10">
                <div>
                  <span className="text-dawang-sandDim block">Kategori</span>
                  <span className="font-bold text-cyan-300">{selectedMap.category}</span>
                </div>
                <div>
                  <span className="text-dawang-sandDim block">Skala Cetak</span>
                  <span className="font-bold text-dawang-sand">{selectedMap.scale}</span>
                </div>
                <div>
                  <span className="text-dawang-sandDim block">Tahun Survei</span>
                  <span className="font-bold text-dawang-sand">{selectedMap.year}</span>
                </div>
                <div>
                  <span className="text-dawang-sandDim block">Penyusun</span>
                  <span className="font-bold text-dawang-sand">{selectedMap.author}</span>
                </div>
              </div>

              <p className="text-xs text-dawang-sandMuted leading-relaxed">
                {selectedMap.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={getAssetUrl(`Data_geojson/${selectedMap.geojsonFile}`)}
                  download
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 text-slate-950 text-xs font-extrabold shadow-lg hover:brightness-110 active:scale-95 transition-all"
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
