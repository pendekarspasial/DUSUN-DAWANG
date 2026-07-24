export interface DusunInfo {
  nama: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  koordinat: { lat: number; lng: number };
  luasWilayah: string;
  jumlahRT: number;
  jumlahRW: number;
  kepalaDusun: string;
  ketinggian: string;
  sejarah: string;
  visiMisi: string;
  batasDusun: {
    utara: string;
    selatan: string;
    timur: string;
    barat: string;
  };
}

export interface KelompokUmur {
  label: string;
  jumlah: number;
}

export interface MataPencaharian {
  label: string;
  jumlah: number;
}

export interface Pendidikan {
  label: string;
  jumlah: number;
}

export interface DataRT {
  rt: string;
  kk: number;
  jiwa: number;
}

export interface PendudukInfo {
  total: number;
  lakiLaki: number;
  perempuan: number;
  jumlahKK: number;
  kelompokUmur: KelompokUmur[];
  mataPencaharian: MataPencaharian[];
  pendidikan: Pendidikan[];
  perRT: DataRT[];
}

export interface FasilitasItem {
  id: number;
  nama: string;
  kategori: 'pemerintahan' | 'ibadah' | 'kesehatan' | 'pendidikan' | 'infrastruktur' | 'pertanian' | 'umum';
  lat: number;
  lng: number;
  deskripsi: string;
  icon: string;
  foto?: string;
}

export interface PotensiItem {
  judul: string;
  deskripsi: string;
  icon: string;
  warna: string;
  foto?: string;
}

export interface ProkerKKNItem {
  id: number;
  judul: string;
  kategori: string;
  emoji: string;
  deskripsi: string;
  anggota: string[];
  tanggal: string;
  durasi: string;
  output: string;
  laporanUrl?: string;
  posterUrl?: string;
}

export interface AnggotaKKN {
  nama: string;
  nim: string;
  jurusan: string;
  foto: string;
  peran: string;
  prokerUtama?: string;
}

export interface TimKKNInfo {
  namaKelompok: string;
  universitas: string;
  tahun: string;
  dosenPembimbing: string;
  anggota: AnggotaKKN[];
}

export interface VillageData {
  dusun: DusunInfo;
  penduduk: PendudukInfo;
  fasilitas: FasilitasItem[];
  potensi: PotensiItem[];
  prokerKKN: ProkerKKNItem[];
  timKKN: TimKKNInfo;
}

export interface MapLayerConfig {
  id: string;
  name: string;
  file: string;
  color: string;
  fillColor?: string;
  type: 'polygon' | 'point' | 'line';
  visible: boolean;
  opacity: number;
}

export interface GeoJSONFeatureProperties {
  Name?: string;
  nama?: string;
  RT?: string;
  luas_m2?: number;
  keterangan?: string;
  pemilik?: string;
  fungsi?: string;
  id?: string | number;
  [key: string]: any;
}
