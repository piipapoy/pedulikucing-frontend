<template>
  <main class="container">
    <section class="header-section">
      <i class="fas fa-heart header-icon"></i>
      <h2>Setiap Donasi Menyelamatkan Nyawa</h2>
      <p>Pilih cara Anda berkontribusi: bantu kasus spesifik yang butuh pertolongan segera, atau dukung program komunitas yang memberikan dampak jangka panjang.</p>
      <div class="search-filter-bar">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Cari kasus darurat..."
            v-model="searchTerm" 
          >
        </div>
        <button class="filter-button" @click="isFilterOpen = !isFilterOpen">
          <i class="fas fa-filter"></i>
        </button>
      </div>
    </section>
    <div v-if="isFilterOpen" class="filter-modal-overlay" @click="isFilterOpen = false">
      <div class="filter-modal" @click.stop>
        <h4>Filter & Urutkan</h4>
        <div class="filter-group">
          <label>Urutkan Berdasarkan</label>
          <select v-model="selectedSort">
            <option value="mendesak">Paling Mendesak</option>
            <option value="terbaru">Terbaru</option>
            <option value="hampir_penuh">Hampir Penuh</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Lokasi</label>
          <select v-model="selectedLocation">
            <option value="semua">Semua Lokasi</option>
            <option value="Jakarta Barat">Jakarta Barat</option>
            <option value="Bandung Barat">Bandung Barat</option>
            <option value="Jakarta">Jakarta</option>
            </select>
        </div>
        <button class="btn-reset-filter" @click="resetFilters">
          Hapus Filter
        </button>
        <button class="btn-tutup-filter" @click="isFilterOpen = false">
          Terapkan
        </button>
      </div>
    </div>
    <section class="donation-category">
      <h3>Kasus Darurat Membutuhkan Bantuan</h3>
      <div class="donation-grid">
        <DonationCard
          v-for="kasus in kasusDarurat"
          :key="kasus.id"
          :donation="kasus" 
        />
      </div>
    </section>
    <section class="donation-category">
      <h3>Program Komunitas Berkelanjutan</h3>
      <div class="donation-grid">
        <DonationCard
          v-for="program in programKomunitas"
          :key="program.id"
          :donation="program"
        />
      </div>
    </section>
    <section class="transparency-section">
      <h3>Transparansi Donasi Real-Time</h3>
      <p>Setiap donasi yang masuk langsung terlihat dan dapat diverifikasi oleh publik</p>
      <div class="transparency-container">
        <div class="transparency-list">
          <h4>Donasi Terbaru (Real-Time)</h4>
          <ul>
            <li v-for="donasi in recentDonations" :key="donasi.id">
              <div class="donor-info">
                <strong>{{ donasi.name }}</strong>
                <span>{{ donasi.campaign }}</span>
              </div>
              <div class="donation-amount">
                <strong>{{ formatCurrency(donasi.amount) }}</strong>
                <span>{{ donasi.time }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="transparency-summary">
          <h4>Total Impact Hari Ini</h4>
          <div class="summary-item">
            <span>Total Donasi Masuk</span>
            <strong>{{ formatCurrency(impactSummary.total) }}</strong>
          </div>
          <div class="summary-item">
            <span>Jumlah Donatur</span>
            <strong>{{ impactSummary.donors }} orang</strong>
          </div>
          <div class="summary-item">
            <span>Kasus Terbantu</span>
            <strong>{{ impactSummary.cases }} kasus</strong>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref, computed } from 'vue';
import DonationCard from '../components/DonationCard.vue';
const isFilterOpen = ref(false); 
const selectedSort = ref('mendesak');
const selectedLocation = ref('semua');
const searchTerm = ref('');
const resetFilters = () => {
  selectedSort.value = 'mendesak';
  selectedLocation.value = 'semua';
  isFilterOpen.value = false;
};
const allDonationData = [
  { id: 1, title: 'Rescue Kucing di Bawah Jembatan', type: 'kasus', location: 'Jakarta Barat', terkumpul: 1800000, target: 5000000, percentage: 36, imageUrl: '/src/assets/cats/kucing_darurat_1.png' },
  { id: 2, title: 'Biaya Operasi Kucing Tertabrak', type: 'kasus', location: 'Bandung Barat', terkumpul: 4500000, target: 7000000, percentage: 64, imageUrl: '/src/assets/cats/kucing_darurat_2.png' },
  { id: 3, title: 'Program Vaksinasi Kucing Liar', type: 'program', location: 'Jakarta', terkumpul: 9000000, target: 10000000, percentage: 90, imageUrl: '/src/assets/cats/program_vaksin.png' },
  { id: 4, title: 'Pakan Harian Shelter Induk', type: 'program', location: 'Jakarta Barat', terkumpul: 6000000, target: 15000000, percentage: 40, imageUrl: '/src/assets/cats/program_pakan.png' }
];
const filteredData = computed(() => {
  let data = [...allDonationData];
  return data;
});
const kasusDarurat = computed(() => 
  filteredData.value.filter(d => d.type === 'kasus')
);
const programKomunitas = computed(() =>
  filteredData.value.filter(d => d.type === 'program')
);
const recentDonations = ref([
  { id: 1, name: 'Azmi', campaign: 'Rescue Kucing dari Banjir', amount: 100000, time: '2 menit lalu' },
  { id: 2, name: 'Budi', campaign: 'Bantuan Pakan Shelter', amount: 50000, time: '3 menit lalu' },
  { id: 3, name: 'Citra', campaign: 'Rescue Kucing dari Banjir', amount: 200000, time: '5 menit lalu' },
  { id: 4, name: 'Doni', campaign: 'Rescue Kucing dari Banjir', amount: 25000, time: '6 menit lalu' },
]);
const impactSummary = ref({
  total: 2850000,
  donors: 47,
  cases: 8
});
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
</script>
<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.header-section {
  text-align: center;
  margin-bottom: 40px;
}
.header-icon {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 10px;
}
.header-section h2 {
  font-size: 28px;
  margin: 10px 0;
}
.header-section p {
  font-size: 16px;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto 20px auto;
}
.search-filter-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
.search-box {
  display: flex;
  align-items: center;
  padding: 0; 
  width: 450px; 
  background-color: white; 
  border-radius: 8px; 
  overflow: hidden;
  border: 1px solid var(--border-color);
}
.search-box i {
  color: #888; 
  margin-left: 12px; 
  margin-right: 8px; 
  font-size: 16px;
}
.search-box input {
  border: none; 
  outline: none;
  width: 100%;
  font-size: 14px;
  padding: 10px 0; 
  background-color: transparent; 
}
.filter-button {
  background: white; 
  border: 1px solid var(--border-color); 
  border-radius: 8px; 
  padding: 10px 14px; 
  cursor: pointer;
  font-size: 16px;
  color: var(--text-light); 
  display: flex; 
  align-items: center;
  justify-content: center;
}
.donation-category {
  margin-bottom: 40px;
}
.donation-category h3 {
  font-size: 24px;
  margin-bottom: 20px;
}
.donation-grid {
  display: flex; 
  overflow-x: auto; 
  gap: 24px; 
  padding-bottom: 20px; 
  scroll-snap-type: x mandatory;
}
.transparency-section {
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 32px;
  margin-top: 40px;
}
.transparency-section h3 {
  text-align: center;
  font-size: 24px;
  margin: 0;
}
.transparency-section p {
  text-align: center;
  color: var(--text-light);
  margin: 10px 0 30px 0;
}
.transparency-container {
  display: flex;
  gap: 30px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
.transparency-list,
.transparency-summary {
  width: 50%; 
}
.transparency-list h4,
.transparency-summary h4 {
  font-size: 18px;
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}
.transparency-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 12px;
}
.transparency-list li {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: none;
}
.transparency-list li:last-child {
  border-bottom: none;
}
.donor-info strong, .donation-amount strong {
  display: block;
  font-size: 15px;
  color: var(--text-color);
}
.donor-info span, .donation-amount span {
  font-size: 13px;
  color: var(--text-light);
}
.donation-amount {
  text-align: right;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 14px 0;
}
.summary-item span {
  color: var(--text-light);
}
.summary-item strong {
  color: var(--text-color);
  font-size: 18px;
}
@media (max-width: 768px) {
  .donation-grid {
    grid-template-columns: 1fr; 
  }
  .transparency-container {
    flex-direction: column; 
  }
  .transparency-list,
  .transparency-summary {
    width: 100%;
  }
}
.donation-grid {
  display: flex;
  overflow-x: auto;
  gap: 24px;
  padding-bottom: 20px; 
  scroll-snap-type: x mandatory;
}
.donation-grid {
  scrollbar-width: thin; 
  scrollbar-color: var(--primary-color) #E0E0E0; 
}
.donation-grid::-webkit-scrollbar {
  height: 8px; 
}
.donation-grid::-webkit-scrollbar-track {
  background: #0E5A56; 
  border-radius: 4px;
}
.donation-grid::-webkit-scrollbar-thumb {
  background-color: var(--primary-color); 
  border-radius: 4px; 
}
.transparency-list ul::-webkit-scrollbar {
  width: 6px; 
}
.transparency-list ul::-webkit-scrollbar-track {
  background: #f0f0f0; 
  border-radius: 3px;
}
.transparency-list ul::-webkit-scrollbar-thumb {
  background-color: var(--primary-color, #008080); 
  border-radius: 3px;
}
.transparency-list ul {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color, #008080) #f0f0f0;
}
</style>