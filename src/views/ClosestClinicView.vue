<template>
  <div class="page-container">
    <main class="content-wrapper">
      <section class="page-header">
        <span class="header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="3"></circle>
          </svg>
        </span>
        <h2>Klinik Hewan Terdekat</h2>
        <p>
          Temukan klinik hewan yang siap menangani kebutuhan kucing darurat atau rutin. 
          Semua klinik mitra telah terverifikasi dan siap membantu kucing Anda 24/7.
        </p>
      </section>
      <SearchFilter @search="handleSearch" @toggle-filter="toggleFilterModal" />
      <h3 class="list-heading">Klinik Terdekat Dari Lokasi Anda</h3>
      <div class="clinic-cards-grid">
        <ShelterCard 
          v-for="(clinic, index) in filteredClinics" 
          :key="index" 
          :shelter="clinic"
          :is-clinic="true" 
        />
        <p v-if="filteredClinics.length === 0" class="no-results-msg">Tidak ada klinik yang ditemukan.</p>
      </div>
      <section class="clinic-cta-footer">
        <h3>Klinik Anda Ingin Bergabung?</h3>
        <p>Bergabunglah dengan jaringan klinik mitra PeduliKucing dan bantu lebih banyak kucing mendapat perawatan terbaik di seluruh Indonesia.</p>
        <button class="cta-button-clinic">Daftar Sebagai Klinik Mitra</button>
      </section>
      <div v-if="showFilter" class="filter-modal-overlay">
        <div class="filter-modal-content">
            <h4>Pengaturan Filter (Dummy)</h4>
            <p>Fitur filter lanjutan akan datang segera.</p>
            <button @click="showFilter = false">Tutup</button>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import SearchFilter from '../components/SearchFilter.vue';
import ShelterCard from '../components/ShelterCard.vue';
const CLINICS_DATA = [
    {
      name: 'Klinik Hewan Sehat Sentosa',
      location: 'Jakarta Barat (0.4 km)',
      image: '/src/assets/cats/shelter-1.png',
      description: 'Shelter terpercaya dengan fokus pada sterilisasi massal dan program adopsi yang bertanggung jawab.',
      stats: { rescued: '2,000', operational: '15' },
      specialties: ['Sterilisasi Massal', 'Perawatan Medis'],
      services: ['Emergency', 'Vaksinasi', 'Rawat Inap'],
      contact: { phone: '+62 813-7890-1234', email: 'hello@sanemeow.org' }
    },
    {
      name: 'Klinik Hewan Murni Cipta',
      location: 'Jakarta Selatan (1.2 km)',
      image: '/src/assets/cats/shelter-2.png',
      description: 'Menyediakan layanan komprehensif untuk kucing dan hewan kecil lainnya.',
      stats: { rescued: '1,500', operational: '8' },
      specialties: ['Grooming', 'Operasi Minor'],
      services: ['Vaksinasi', 'Rawat Inap'],
      contact: { phone: '+62 812-1111-2222', email: 'murni@klinik.com' }
    },
    {
      name: 'Klinik Hewan Bahagia',
      location: 'Tangerang Kota (3.5 km)',
      image: '/src/assets/cats/shelter-3.png',
      description: 'Fokus pada perawatan preventif dan edukasi pemilik hewan.',
      stats: { rescued: '3,000', operational: '20' },
      specialties: ['Gizi', 'Edukasi'],
      services: ['Emergency', 'Rawat Inap'],
      contact: { phone: '+62 819-3333-4444', email: 'bahagia@klinik.com' }
    },
];
const allClinics = ref([
    ...CLINICS_DATA,
    ...CLINICS_DATA.map((c, i) => ({ ...c, name: c.name + ' - Duplikat ' + i, location: 'Bekasi', id: 100 + i })),
]);
const searchTerm = ref('');
const showFilter = ref(false);
const filteredClinics = computed(() => {
    if (!searchTerm.value) return allClinics.value;
    const query = searchTerm.value.toLowerCase();
    return allClinics.value.filter(clinic => 
        clinic.name.toLowerCase().includes(query) || 
        clinic.location.toLowerCase().includes(query)
    );
});
const handleSearch = (query) => {
    searchTerm.value = query;
};
const toggleFilterModal = () => {
    showFilter.value = !showFilter.value;
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@700&display=swap');
:root {
  --primary-color: #0b4f4a;
  --bg-color-light: #f8f9fa;
  --text-color: #2d2d2d;
  --text-color-secondary: #555;
}
.page-container {
  background-color: var(--bg-color-light);
  min-height: 100vh;
}
.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
.page-header {
  text-align: center;
  max-width: 800px;
  margin: 1rem auto 2.5rem auto;
}
.header-icon {
  display: inline-block;
  color: var(--primary-color);
  margin-bottom: 1rem;
}
.page-header h2 {
  font-family: 'Source Serif Pro', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}
.page-header p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-color-secondary);
  line-height: 1.6;
}
.list-heading {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1.5rem 0;
}
.clinic-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}
@media (min-width: 768px) {
  .clinic-cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .clinic-cards-grid {
    grid-template-columns: repeat(4, 1fr); 
  }
}
.no-results-msg {
    grid-column: 1 / -1;
    text-align: center;
    color: var(--text-color-secondary);
    font-size: 1.1rem;
    padding: 2rem 0;
}
.clinic-cta-footer {
  background-color: var(--primary-color);
  color: white;
  border-radius: 1rem;
  padding: 3rem 1.5rem;
  text-align: center;
}
.clinic-cta-footer h3 {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}
.clinic-cta-footer p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0.75rem auto 2.5rem auto;
}
.cta-button-clinic {
  background-color: white;
  color: var(--primary-color);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 3rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 5px 10px rgba(255, 255, 255, 0.3);
}
.cta-button-clinic:hover {
  background-color: #f0fafa;
}
.filter-modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.filter-modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
}
</style>