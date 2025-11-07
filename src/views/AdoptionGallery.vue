<template>
  <div> 
    <Navbar /> 
    
    <div class="adoption-page-container">
      
      <aside class="filter-sidebar">
        <h2 class="sidebar-title">Filter Pencarian</h2>
        
        <AdoptionFilterSidebar @update:filters="handleFilterUpdate" />
        
      </aside>
      
      <main class="cat-gallery-main">
        <div class="gallery-header">
          
          <label class="favorite-toggle-label">
              <input type="checkbox" v-model="showFavorites" class="favorite-checkbox">
              Tampilkan Favorit Saya
          </label>
          
          <div class="search-input-wrapper">
              <BaseInput 
                  id="search-cat"
                  placeholder="Cari nama kucing..."
                  v-model="searchQuery"
              />
          </div>
        </div>

        <div class="cat-card-grid">
          <CatCard 
            v-for="cat in filteredCats" 
            :key="cat.id"
            :image="cat.image"
            :name="cat.name"
            :age="cat.age"
            :location="cat.location"
            :gender="cat.gender"
            :description="cat.description"
            :karakter="cat.karakter"
            :steril="cat.steril"
            :vaksin="cat.vaksin"
            @viewProfile="handleViewProfile(cat.id)"
          />

          <p v-if="filteredCats.length === 0" class="no-results">
              Tidak ada kucing yang cocok dengan kriteria filter.
          </p>
        </div>

        <button v-if="hasMore" @click="loadMore" class="load-more-btn">
          Muat Lebih Banyak
        </button>

      </main>
    </div>
  </div> 
</template>

<script setup>
import { ref, computed } from 'vue'

// --- PATH IMPOR DISESUAIKAN KE FOLDER KOMPONEN ---
import CatCard from '../components/CatCard.vue' 
import BaseInput from '../components/BaseInput.vue' 
import AdoptionFilterSidebar from '../components/AdoptionFilterSidebar.vue' 
// -----------------------------

// --- Data Kucing Dummy ---
const cats = ref([
    { id: 1, name: 'Lana', image: '/src/assets/cats/lana.png', age: 2, location: 'Jakarta Selatan', gender: 'Betina', description: 'cantik yang sangat manja dan cocok untuk pemula', karakter: ['Manja', 'Tenang'], steril: true, vaksin: true },
    { id: 2, name: 'Milo', image: '/src/assets/cats/milo.png', age: 3, location: 'Surabaya', gender: 'Jantan', description: 'dewasa yang mandiri dan cocok untuk yang sibuk', karakter: ['Mandiri', 'Tenang'], steril: true, vaksin: false },
    { id: 3, name: 'Bella', image: '/src/assets/cats/bella.png', age: 1, location: 'Bandung Kota', gender: 'Betina', description: 'muda yang sangat manja dan mudah dirawat', karakter: ['Manja', 'Aktif'], steril: false, vaksin: true },
    { id: 4, name: 'Toby', image: '/src/assets/cats/toby.png', age: 0.5, location: 'Jakarta Selatan', gender: 'Jantan', description: 'anak kucing yang sangat aktif dan lucu', karakter: ['Aktif', 'Manja'], steril: false, vaksin: true },
    { id: 5, name: 'Luna', image: '/src/assets/cats/luna.png', age: 4, location: 'Surabaya', gender: 'Betina', description: 'kucing senior yang tenang dan penyayang', karakter: ['Tenang', 'Mandiri'], steril: true, vaksin: true },
])

const searchQuery = ref('')
const showFavorites = ref(false)

const activeFilters = ref({
    location: 'Semua Lokasi',
    age: 'Semua Usia',
    gender: null,
    health: [], 
    character: [],
})

function handleFilterUpdate(newFilters) {
    activeFilters.value = newFilters
}

const filteredCats = computed(() => {
    let results = cats.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        results = results.filter(cat => cat.name.toLowerCase().includes(query))
    }
    if (activeFilters.value.location && activeFilters.value.location !== 'Semua Lokasi') {
        results = results.filter(cat => cat.location === activeFilters.value.location)
    }
    if (activeFilters.value.age && activeFilters.value.age !== 'Semua Usia') {
        const ageFilter = activeFilters.value.age
        results = results.filter(cat => {
            if (ageFilter === '< 1 Tahun') return cat.age < 1
            if (ageFilter === '1-3 Tahun') return cat.age >= 1 && cat.age <= 3
            if (ageFilter === '> 3 Tahun') return cat.age > 3
            return true
        })
    }
    if (activeFilters.value.gender) {
        results = results.filter(cat => cat.gender === activeFilters.value.gender)
    }
    if (activeFilters.value.health.length > 0) {
        results = results.filter(cat => {
            return activeFilters.value.health.every(filter => {
                if (filter === 'Steril') return cat.steril
                if (filter === 'Vaksin') return cat.vaksin
                return true
            })
        })
    }
    if (activeFilters.value.character.length > 0) {
        results = results.filter(cat => {
            return cat.karakter.some(catChar => activeFilters.value.character.includes(catChar))
        })
    }
    if (showFavorites.value) {
        // Implementasi logika favorit sesungguhnya di sini
        // Untuk sementara, kita hanya menampilkan ID 1
        results = results.filter(cat => cat.id === 1) 
    }

    return results
})

const hasMore = computed(() => filteredCats.value.length < cats.value.length)

function handleViewProfile(catId) {
    console.log('Lihat profil kucing dengan ID:', catId)
}

function loadMore() {
    console.log('Memuat lebih banyak kucing...')
}
</script>

<style scoped>
.adoption-page-container {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
  gap: 2rem;
  padding-top: 4rem; /* Jarak dari Navbar */
}

.filter-sidebar {
  width: 280px; 
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: fit-content; 
}
.sidebar-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark, #1f2937);
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 0.5rem;
}
.cat-gallery-main {
  flex-grow: 1;
}

/* Header di atas grid kartu */
.gallery-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

/* Tombol Favorit di sebelah kiri input */
.favorite-toggle-label {
    display: flex;
    align-items: center;
    font-size: 0.95rem;
    color: var(--text-dark, #374151);
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap; 
    order: -1; /* Pindah ke kiri */
}
.favorite-checkbox {
    margin-right: 0.5rem;
    width: 18px;
    height: 18px;
    accent-color: var(--primary-color, #0f766e);
}

.search-input-wrapper {
    max-width: 400px; 
    flex-grow: 1;
}
/* Memastikan BaseInput mengambil lebar penuh di containernya */
.search-input-wrapper :deep(.form-input) { 
    width: 100%;
}

.cat-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 24px;
}
.no-results {
    grid-column: 1 / -1; 
    text-align: center;
    color: var(--text-gray, #6b7280);
    padding: 3rem 0;
    font-size: 1.1rem;
}
.load-more-btn {
  background-color: white;
  color: var(--primary-color, #0f766e);
  border: 1px solid var(--primary-color, #0f766e);
  font-weight: 600;
  padding: 0.6rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 3rem;
  width: 100%;
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.load-more-btn:hover {
  background-color: var(--primary-color, #0f766e);
  color: white;
}
/* Media Queries (Mobile/Tablet) */
@media (max-width: 1024px) {
  .adoption-page-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    padding-top: 1rem;
  }
  .filter-sidebar {
    width: 100%;
    padding: 1rem;
  }
  .gallery-header {
      flex-direction: row; /* Biarkan sejajar di mobile/tablet */
      justify-content: space-between;
  }
  .search-input-wrapper {
    max-width: 100%;
    width: 70%; /* Input mengambil sebagian besar lebar */
    order: 1; /* Pindah ke kanan */
  }
  .favorite-toggle-label {
    order: 0; /* Pindah ke kiri */
    width: 30%;
    justify-content: flex-start;
  }
  .cat-card-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>