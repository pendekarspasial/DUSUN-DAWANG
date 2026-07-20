import { VillageData } from '../types';

export const defaultVillageData: VillageData = {
  dusun: {
    nama: "Dusun Dawang",
    desa: "Desa Blongkeng",
    kecamatan: "Kec. Ngluwar",
    kabupaten: "Kab. Magelang",
    provinsi: "Jawa Tengah",
    koordinat: { lat: -7.6170, lng: 110.2780 },
    luasWilayah: "±85 Ha",
    jumlahRT: 5,
    jumlahRW: 1,
    kepalaDusun: "Bapak Subardi",
    ketinggian: "±350 mdpl",
    sejarah: "Dusun Dawang terletak di kawasan subur lereng Gunung Merapi, Desa Blongkeng, Kecamatan Ngluwar, Kabupaten Magelang. Dikelilingi oleh hamparan persawahan produktif dan dikuasai oleh sistem irigasi alami pegunungan, nama 'Dawang' mengandung filosofi Jawa kuno yaitu tempat yang padhang (terang, terbuka, dan membawa kebaikan). Karakter khas warganya sangat menjunjung tinggi tradisi gotong royong, kearifan lokal pertanian, dan kehangatan bermasyarakat.",
    visiMisi: "Mewujudkan Dusun Dawang yang berdaya saing digital, mandiri pangan, sejahtera, dan lestari melalui pemanfaatan GIS serta sinergi kebudayaan Jawa.",
    batasDusun: {
      utara: "Dusun Karangnongko",
      selatan: "Dusun Blongkeng III",
      timur: "Sungai Krasak / Batas DIY",
      barat: "Persawahan Blongkeng I"
    }
  },
  penduduk: {
    total: 458,
    lakiLaki: 231,
    perempuan: 227,
    jumlahKK: 124,
    kelompokUmur: [
      { label: "0–4 th", laki: 18, perempuan: 17 },
      { label: "5–14 th", laki: 35, perempuan: 32 },
      { label: "15–24 th", laki: 42, perempuan: 40 },
      { label: "25–34 th", laki: 38, perempuan: 36 },
      { label: "35–44 th", laki: 40, perempuan: 39 },
      { label: "45–54 th", laki: 32, perempuan: 33 },
      { label: "55–64 th", laki: 18, perempuan: 20 },
      { label: "65+ th", laki: 8, perempuan: 10 }
    ],
    mataPencaharian: [
      { label: "Petani & Pekebun", jumlah: 142 },
      { label: "Buruh Tani", jumlah: 67 },
      { label: "Wiraswasta / UMKM", jumlah: 48 },
      { label: "PNS / TNI / Polri", jumlah: 12 },
      { label: "Pelajar / Mahasiswa", jumlah: 89 },
      { label: "Ibu Rumah Tangga", jumlah: 72 },
      { label: "Lainnya", jumlah: 28 }
    ],
    pendidikan: [
      { label: "Belum Sekolah", jumlah: 35 },
      { label: "SD / Sederajat", jumlah: 138 },
      { label: "SMP / Sederajat", jumlah: 102 },
      { label: "SMA / Sederajat", jumlah: 119 },
      { label: "D3 / S1 / S2", jumlah: 64 }
    ],
    perRT: [
      { rt: "RT 01", kk: 24, jiwa: 88 },
      { rt: "RT 02", kk: 26, jiwa: 95 },
      { rt: "RT 03", kk: 25, jiwa: 92 },
      { rt: "RT 04", kk: 23, jiwa: 85 },
      { rt: "RT 05", kk: 26, jiwa: 98 }
    ]
  },
  fasilitas: [
    {
      id: 1,
      nama: "Balai Dusun Dawang",
      kategori: "pemerintahan",
      lat: -7.6170,
      lng: 110.2780,
      deskripsi: "Pusat kegiatan warga, balai pertemuan, dan pelayanan administrasi dusun.",
      icon: "building",
      foto: "/fotorumah/Kadus.jpg.jpg"
    },
    {
      id: 2,
      nama: "Masjid Al-Ikhlas Dawang",
      kategori: "ibadah",
      lat: -7.6168,
      lng: 110.2775,
      deskripsi: "Masjid utama dusun sebagai pusat keagamaan, pengajian rutin, dan shalat berjamaah.",
      icon: "mosque",
      foto: "/fotorumah/Masjid.jpg.jpg"
    },
    {
      id: 3,
      nama: "Musholla RT 03",
      kategori: "ibadah",
      lat: -7.6183,
      lng: 110.2788,
      deskripsi: "Musholla warga RT 03 untuk kegiatan ibadah sehari-hari dan TPA anak-anak.",
      icon: "mosque",
      foto: "/fotorumah/Musholla.jpg.jpg"
    },
    {
      id: 4,
      nama: "Posyandu Dawang",
      kategori: "kesehatan",
      lat: -7.6175,
      lng: 110.2785,
      deskripsi: "Pos pelayanan kesehatan terpadu balita, ibu hamil, dan pemeriksaan lansia.",
      icon: "health",
      foto: "/fotorumah/Kades.jpeg.jpg"
    },
    {
      id: 5,
      nama: "SD Negeri Blongkeng",
      kategori: "pendidikan",
      lat: -7.6162,
      lng: 110.2792,
      deskripsi: "Fasilitas pendidikan dasar utama untuk anak-anak Dusun Dawang.",
      icon: "school",
      foto: "/fotorumah/Kades1.jpg"
    },
    {
      id: 6,
      nama: "Makam Dusun Dawang",
      kategori: "umum",
      lat: -7.6158,
      lng: 110.2768,
      deskripsi: "Area pemakaman umum warga Dusun Dawang.",
      icon: "cemetery",
      foto: "/fotorumah/makam.jpg.jpg"
    }
  ],
  potensi: [
    {
      judul: "Pertanian & Perkebunan Subur",
      deskripsi: "Lahan persawahan melimpah di kaki Merapi yang menghasilkan padi beras merah, melon, dan tanaman sayuran organik kualitas unggul.",
      icon: "🌾",
      warna: "hijau",
      foto: "/fotorumah/RT1.jpg.jpg"
    },
    {
      judul: "Wisata Lanskap Merapi",
      deskripsi: "Pemandangan panorama sawah berlatar belakang puncak Gunung Merapi dengan hawa sejuk yang potensial sebagai jalur gowes dan eduwisata.",
      icon: "🏔️",
      warna: "biru",
      foto: "/fotorumah/RT2.jpg.jpg"
    },
    {
      judul: "UMKM Pangan & Olahan Lokal",
      deskripsi: "Produksi camilan tradisional, emping melinjo, keripik, dan usaha rumahan warga yang dipasarkan hingga tingkat kabupaten.",
      icon: "🏪",
      warna: "orange",
      foto: "/fotorumah/RT3.jpg.jpg"
    },
    {
      judul: "Budaya & Gotong Royong Jawa",
      deskripsi: "Tradisi nyadran, merti dusun, kesenian rorod, serta budaya gotong royong warga yang masih terpelihara dengan sangat kuat.",
      icon: "🎭",
      warna: "ungu",
      foto: "/fotorumah/RT4.jpg.jpg"
    },
    {
      judul: "Generasi Muda Digital",
      deskripsi: "Pemuda-pemudi Karang Taruna yang aktif mengadopsi teknologi digital dan promosi media sosial untuk kemajuan desa.",
      icon: "👨‍👩‍👧‍👦",
      warna: "merah",
      foto: "/fotorumah/RW.jpg.jpg"
    },
    {
      judul: "Melimpahnya Sumber Air Irigasi",
      deskripsi: "Jaringan saluran irigasi alami yang terus mengalir sepanjang tahun menjamin keandalan panen dan ketersediaan air bersih.",
      icon: "💧",
      warna: "cyan",
      foto: "/fotorumah/Musholla.jpg.jpg"
    }
  ],
  prokerKKN: [
    {
      id: 1,
      judul: "Pemetaan Spasial & WebGIS Interaktif Dusun Dawang",
      kategori: "Teknologi & GIS",
      emoji: "🗺️",
      deskripsi: "Pemetaan batas RT, persil bangunan/rumah warga, dan penggunaan lahan menggunakan GPS & QGIS, dilanjutkan pembangunan WebGIS StoryMap digital yang diakses melalui QR Code di papan informasi publik.",
      anggota: ["Subhan Arfi", "Nabila Putri"],
      tanggal: "Juli 2025",
      durasi: "4 Minggu",
      output: "Peta Peta Cetak A0 + Website WebGIS StoryMap"
    },
    {
      id: 2,
      judul: "Penyuluhan Kesehatan, PHBS & Pendampingan Posyandu",
      kategori: "Kesehatan",
      emoji: "🏥",
      deskripsi: "Pendampingan rutin posyandu balita & lansia, sosialisasi Perilaku Hidup Bersih & Sehat (PHBS), serta pemeriksaan tekanan darah & gula darah gratis.",
      anggota: ["Rizky Ananda", "Siti Nurhaliza"],
      tanggal: "Juli 2025",
      durasi: "3 Minggu",
      output: "Buku Edukasi Kesehatan + Checking Kit"
    },
    {
      id: 3,
      judul: "Digitalisasi UMKM & Pelatihan Pemasaran Digital",
      kategori: "Pendidikan & Ekonomi",
      emoji: "💻",
      deskripsi: "Pelatihan fotografi produk HP, pembuatan akun Google Maps Business, serta pembuatan kemasan (packaging) menarik untuk UMKM Dusun Dawang.",
      anggota: ["Farhan Ramadhan", "Diah Ayu"],
      tanggal: "Juli 2025",
      durasi: "2 Minggu",
      output: "Label Produk Baru + Pinning Google Maps"
    },
    {
      id: 4,
      judul: "Penghijauan Dusun & Edukasi Pengelolaan Sampah",
      kategori: "Lingkungan",
      emoji: "🌱",
      deskripsi: "Penanaman 100 bibit tanaman buah & pohon peneduh di sepanjang jalan dusun, serta sosialisasi pemilahan sampah organik untuk kompos cair.",
      anggota: ["Ahmad Fauzi", "Tri Wahyuni"],
      tanggal: "Juli 2025",
      durasi: "3 Minggu",
      output: "100 Pohon Ditanam + Tong Sampah Organik"
    },
    {
      id: 5,
      judul: "Bimbingan Belajar & Pojok Baca Anak Dawang",
      kategori: "Pendidikan",
      emoji: "📚",
      deskripsi: "Program les gratis matematika & bahasa Inggris interaktif untuk anak SD, serta pengadaan koleksi buku di Balai Dusun Dawang.",
      anggota: ["Larasati Intan", "Bima Nugraha"],
      tanggal: "Juli 2025",
      durasi: "4 Minggu",
      output: "Pojok Baca Balai Dusun + Modul Les"
    },
    {
      id: 6,
      judul: "Revitalisasi Plang Penunjuk Jalan & Nomor Rumah",
      kategori: "Infrastruktur",
      emoji: "🪧",
      deskripsi: "Pemasangan plang batas RT, papan arah fasilitas umum, serta penataan nomor urut bangunan warga yang terhubung dengan database GIS.",
      anggota: ["Subhan Arfi", "Ahmad Fauzi"],
      tanggal: "Juli 2025",
      durasi: "2 Minggu",
      output: "15 Plang Arah + Kode Rumah QR"
    },
    {
      id: 7,
      judul: "Penyusunan Profil Dusun & Digital Archive KKN",
      kategori: "Administrasi",
      emoji: "📋",
      deskripsi: "Dokumentasi arsip komprehensif seluruh program KKN, profil demografi, dan monografi dusun dalam format digital yang dapat terus diperbarui.",
      anggota: ["Semua Anggota Tim KKN"],
      tanggal: "Juli 2025",
      durasi: "4 Minggu",
      output: "Buku Monografi Dusun + E-Archive"
    }
  ],
  timKKN: {
    namaKelompok: "KKN Bela Negara Periode II 2026 — Angkatan 84.180",
    universitas: "UPN \"Veteran\" Yogyakarta",
    tahun: "2026",
    dosenPembimbing: "—",
    anggota: [
      {
        nama: "Christopher Daniel Simbolon",
        nim: "—",
        jurusan: "Teknik Geomatika",
        foto: "assets/images/kkn/christopher.jpg",
        peran: "Ketua",
        prokerUtama: "Koordinasi & Pemetaan Spasial"
      },
      {
        nama: "Pashya Syachrila",
        nim: "—",
        jurusan: "Teknik Industri",
        foto: "assets/images/kkn/pashya.jpg",
        peran: "Sekretaris",
        prokerUtama: "Dokumentasi & Administrasi"
      },
      {
        nama: "Dini Aminarti",
        nim: "—",
        jurusan: "Akuntansi",
        foto: "assets/images/kkn/dini.jpg",
        peran: "Bendahara",
        prokerUtama: "Pengelolaan Keuangan Tim"
      },
      {
        nama: "Eka Putri Prabaningrum",
        nim: "—",
        jurusan: "Hubungan Masyarakat",
        foto: "assets/images/kkn/eka.jpg",
        peran: "Humas",
        prokerUtama: "Komunikasi & Relasi Warga"
      },
      {
        nama: "Hafshah Afifah Khairunnisa",
        nim: "—",
        jurusan: "Manajemen",
        foto: "assets/images/kkn/hafshah.jpg",
        peran: "Humas",
        prokerUtama: "Sosialisasi & Publikasi"
      },
      {
        nama: "Dwiatma Meilany Putri",
        nim: "—",
        jurusan: "Teknik Perminyakan",
        foto: "assets/images/kkn/dwiatma.jpg",
        peran: "PDD",
        prokerUtama: "Publikasi, Dokumentasi & Desain"
      },
      {
        nama: "Gregorius Dennis A",
        nim: "—",
        jurusan: "Manajemen",
        foto: "assets/images/kkn/gregorius.jpg",
        peran: "PDD",
        prokerUtama: "Desain Grafis & Media"
      },
      {
        nama: "Adhiimu Ayundha Artha Wijaya",
        nim: "—",
        jurusan: "Ekonomi Pembangunan",
        foto: "assets/images/kkn/adhiimu.jpg",
        peran: "Logistik",
        prokerUtama: "Sarana & Prasarana"
      },
      {
        nama: "Ferdy Adinata Prabaswara",
        nim: "—",
        jurusan: "Teknik Geofisika",
        foto: "assets/images/kkn/ferdy.jpg",
        peran: "Logistik",
        prokerUtama: "Perlengkapan & Pengadaan"
      },
      {
        nama: "Satria Rikhan Ganendra",
        nim: "—",
        jurusan: "Sistem Informasi",
        foto: "assets/images/kkn/satria.jpg",
        peran: "Logistik",
        prokerUtama: "Sistem Informasi & Teknologi"
      }
    ]
  }
};
