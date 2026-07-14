/* ============================================
   CHARTS.JS — WebGIS Dusun Dawang
   Chart.js visualisasi data kependudukan:
   - Donut: Jenis Kelamin
   - Pie: Tingkat Pendidikan
   - Bar horizontal: Mata Pencaharian
   - Bar stacked: Piramida Penduduk
   ============================================ */

// ---- Global Chart Defaults ----
Chart.defaults.font.family = "'Plus Jakarta Sans', system-ui, sans-serif";
Chart.defaults.font.size   = 12;
Chart.defaults.color       = '#6B7280';
Chart.defaults.plugins.legend.display = true;

// ---- Color Palettes (Tanah Jawa) ----
const COLORS = {
  primary:  ['#8B3E1E','#C96A3A','#E0885A','#E8B86D','#F5DCA8'],
  green:    ['#1E4025','#386641','#5A9464','#7AB87A','#A8D5A8'],
  earth:    ['#3B2314','#7B4A2D','#A0673A','#C49878','#E8D5B7'],
  mixed:    ['#C96A3A','#386641','#E8B86D','#7B4A2D','#5A9464','#8B3E1E','#A0673A'],
  gender:   ['#C96A3A', '#386641'],
  laki:     '#C96A3A',
  perempuan:'#386641',
};

function getChartData() {
  if (window.DUSUN_DATA?.penduduk) return window.DUSUN_DATA.penduduk;
  return {
    lakiLaki: 231, perempuan: 227, total: 458,
    kelompokUmur: [
      { label:'0–4 th',  laki:18, perempuan:17 },
      { label:'5–14 th', laki:35, perempuan:32 },
      { label:'15–24 th',laki:42, perempuan:40 },
      { label:'25–34 th',laki:38, perempuan:36 },
      { label:'35–44 th',laki:40, perempuan:39 },
      { label:'45–54 th',laki:32, perempuan:33 },
      { label:'55–64 th',laki:18, perempuan:20 },
      { label:'65+ th',  laki:8,  perempuan:10 },
    ],
    mataPencaharian: [
      { label:'Petani',            jumlah:142 },
      { label:'Buruh Tani',        jumlah:67  },
      { label:'Wiraswasta',        jumlah:48  },
      { label:'PNS/TNI/Polri',     jumlah:12  },
      { label:'Pelajar/Mahasiswa', jumlah:89  },
      { label:'Ibu Rumah Tangga',  jumlah:72  },
      { label:'Lainnya',           jumlah:28  },
    ],
    pendidikan: [
      { label:'Belum Sekolah',    jumlah:35  },
      { label:'SD/Sederajat',     jumlah:138 },
      { label:'SMP/Sederajat',    jumlah:102 },
      { label:'SMA/Sederajat',    jumlah:119 },
      { label:'D3/S1+',           jumlah:64  },
    ],
  };
}

// ---- Chart 1: Gender Donut ----
function initChartGender(data) {
  const ctx = document.getElementById('chart-gender');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Laki-Laki', 'Perempuan'],
      datasets: [{
        data: [data.lakiLaki, data.perempuan],
        backgroundColor: ['#C96A3A', '#386641'],
        borderColor: ['#FAF0E6', '#FAF0E6'],
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyleWidth: 10,
            font: { size: 12, weight: '500' }
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const val = ctx.parsed;
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((val / total) * 100).toFixed(1);
              return ` ${val.toLocaleString('id-ID')} jiwa (${pct}%)`;
            }
          }
        }
      }
    },
    plugins: [{
      id: 'center-text',
        afterDraw(chart) {
        const { width, height, ctx } = chart;
        ctx.save();
        const total = data.lakiLaki + data.perempuan;
        const cx = width / 2;
        const cy = height / 2 - 15;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#3B2314';
        ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
        ctx.fillText(total.toLocaleString('id-ID'), cx, cy);
        ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
        ctx.fillStyle = '#7B4A2D';
        ctx.fillText('Total Penduduk', cx, cy + 18);
        ctx.restore();
      }
    }]
  });
}

// ---- Chart 2: Pendidikan Pie ----
function initChartPendidikan(data) {
  const ctx = document.getElementById('chart-pendidikan');
  if (!ctx || !data.pendidikan?.length) return;

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: data.pendidikan.map(d => d.label),
      datasets: [{
        data: data.pendidikan.map(d => d.jumlah),
        backgroundColor: ['#E8D5B7','#C49878','#A0673A','#7B4A2D','#386641'],
        borderColor: '#FAF0E6',
        borderWidth: 2,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 12,
            usePointStyle: true,
            pointStyleWidth: 10,
            font: { size: 11 },
            boxWidth: 12,
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const val = ctx.parsed;
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              return ` ${val} orang (${((val/total)*100).toFixed(1)}%)`;
            }
          }
        }
      }
    }
  });
}

// ---- Chart 3: Mata Pencaharian Horizontal Bar ----
function initChartPekerjaan(data) {
  const ctx = document.getElementById('chart-pekerjaan');
  if (!ctx || !data.mataPencaharian?.length) return;

  const sorted = [...data.mataPencaharian].sort((a, b) => b.jumlah - a.jumlah);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(d => d.label),
      datasets: [{
        label: 'Jumlah Warga',
        data: sorted.map(d => d.jumlah),
        backgroundColor: sorted.map((_, i) => {
          const colors = ['#8B3E1E','#C96A3A','#E0885A','#E8B86D','#386641','#7B4A2D','#A0673A'];
          return colors[i % colors.length];
        }),
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ${ctx.parsed.x} orang`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
          ticks: { font: { size: 11 }, color: '#6B7280' },
          border: { display: false }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11, weight: '500' }, color: '#1C2B3A' },
          border: { display: false }
        }
      }
    }
  });
}

// ---- Chart 4: Piramida Penduduk Stacked Horizontal Bar ----
function initChartPiramida(data) {
  const ctx = document.getElementById('chart-piramida');
  if (!ctx || !data.kelompokUmur?.length) return;

  const labels = data.kelompokUmur.map(d => d.label).reverse();
  const lakiData = data.kelompokUmur.map(d => -d.laki).reverse(); // negative for left side
  const perempuanData = data.kelompokUmur.map(d => d.perempuan).reverse();

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Laki-Laki',
          data: lakiData,
          backgroundColor: '#C96A3A',
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: 'Perempuan',
          data: perempuanData,
          backgroundColor: '#386641',
          borderRadius: 4,
          borderSkipped: false,
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 16,
            font: { size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: ctx => {
              const val = Math.abs(ctx.parsed.x);
              return ` ${ctx.dataset.label}: ${val} jiwa`;
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
          ticks: {
            font: { size: 10 },
            color: '#6B7280',
            callback: v => Math.abs(v)
          },
          border: { display: false }
        },
        y: {
          stacked: true,
          grid: { display: false },
          ticks: { font: { size: 11 }, color: '#1C2B3A' },
          border: { display: false }
        }
      }
    }
  });
}

// ---- Initialize all charts when data is ready ----
function initAllCharts() {
  const data = getChartData();
  initChartGender(data);
  initChartPendidikan(data);
  initChartPekerjaan(data);
  initChartPiramida(data);
}

// Wait for data
window.addEventListener('data-ready', initAllCharts);

// Fallback: init on DOMContentLoaded if data loads fast
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (!document.getElementById('chart-gender').__chart) {
      initAllCharts();
    }
  }, 800);
});
