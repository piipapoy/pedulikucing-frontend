<template>
  <div class="detail-container">
    <router-link to="/donasi" class="back-link">
      <i class="fas fa-arrow-left"></i> Kembali ke Halaman Donasi
    </router-link>
    <div v-if="donation" class="detail-content">
      <div class="column-left">
        <div class="info-card bella-card">
          <div class="bella-header">
            <h1>{{ donation.title }}</h1>
            <span class="tag tag-gender">{{ donation.gender }}</span>
          </div>
          <span 
            v-if="donation.type !== 'program'" 
            class="info-line">
            <i class="fas fa-clock"></i> {{ donation.age }}
          </span>
          <span 
            v-if="donation.type !== 'program'" 
            class="info-line">
            <i class="fas fa-map-marker-alt"></i> {{ donation.location }}
          </span>
          <BaseButton @click="openDonationModal" variant="default">Bantu Sekarang</BaseButton>
          <BaseButton variant="outline">Hubungi Penggalang</BaseButton>
        </div>
        <div class="info-card donasi-list-card">
          <h3>Donasi <span class="donasi-count">{{ donation.donors.length }}</span></h3>
          <ul class="donasi-list">
            <li v-for="donor in donation.donors" :key="donor.id">
              <strong>{{ donor.name }}</strong>
              <span>Berdonasi sebesar <strong>{{ formatCurrency(donor.amount) }}</strong></span>
            </li>
          </ul>
        </div>
        <div class="info-card penggalang-card">
          <h3>Informasi Penggalang</h3>
          <strong>{{ donation.fundraiser.name }}</strong>
          <span>{{ donation.fundraiser.role }}</span>
          <p>{{ donation.fundraiser.address }}</p>
          <p class="phone">{{ donation.fundraiser.phone }}</p>
        </div>
      </div>
      <div class="column-right">
        <div class="image-card">
          <img :src="donation.imageUrl" alt="Donation Image" class="main-image">
          <i class="fas fa-heart heart-icon"></i>
          <div class="thumbnail-gallery">
            <img 
              v-for="(thumb, index) in donation.thumbnails" 
              :key="index" 
              :src="thumb" 
              alt="Thumbnail" 
              class="thumbnail"
              :class="{ 'thumbnail-active': activeThumbnailIndex === index }"
              @click="changeMainImage(index)"
            >
          </div>
        </div>
        <div class="info-card story-card">
          <div class="story-header">
            <h3>Cerita Penggalangan Dana</h3>
            <i class="fas fa-chevron-right"></i>
          </div>
          <span class="story-date">{{ donation.storyDate }}</span>
          <p class="story-text-full">{{ donation.story }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading data donasi...</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '../components/BaseButton.vue'; 
const route = useRoute();
const DUMMY_DATA = {
    id: 1, 
    title: 'Biaya Operasi Kucing Tertabrak di Bawah Flyover', 
    type: 'kasus', 
    gender: 'Jantan', 
    age: '2 Tahun', 
    location: 'Bandung Kota',
    imageUrl: '/src/assets/cats/kucing_detail_1.png',
    thumbnails: ['/src/assets/cats/kucing_detail_1.png', '/src/assets/cats/kucing_detail_2.png'],
    storyDate: '3 Hari yang lalu',
    story: 'Kucing ini ditemukan dalam kondisi kritis di bawah flyover. Kaki belakangnya patah parah dan membutuhkan operasi segera. Dana ini akan digunakan untuk operasi, rawat inap, dan biaya pasca operasi selama 2 bulan. Mohon bantuan dan doa dari rekan-rekan semua.',
    donors: [
        { id: 1, name: 'Sumbang Anonim', amount: 150000 },
        { id: 2, name: 'Maya', amount: 50000 },
        { id: 3, name: 'Budi', amount: 200000 },
        { id: 4, name: 'Citra', amount: 100000 },
    ],
    fundraiser: {
        name: 'Dr. Sarah Veteriner',
        role: 'Veterinarian',
        address: 'Jl. Kemang Raya No. 123, Jakarta Selatan',
        phone: '+62 812-3456-7890'
    }
};
const donation = ref(null);
const activeThumbnailIndex = ref(0);
onMounted(() => {
    const donationId = route.params.id; 
    donation.value = DUMMY_DATA; 
    if (donation.value.thumbnails && donation.value.thumbnails.length > 0) {
      donation.value.imageUrl = donation.value.thumbnails[0];
    }
});
const changeMainImage = (index) => {
  activeThumbnailIndex.value = index;
  donation.value.imageUrl = donation.value.thumbnails[index]; 
};
const formatCurrency = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
const openDonationModal = () => {
    alert('Modal Donasi Dibuka!');
};
</script>
<style scoped>
:root {
  --primary-color: #008080;
  --primary-dark: #0A5C5C;
  --text-light: #777;
  --border-color: #E0E0E0;
}
.detail-container {
  max-width: 1100px;
  margin: 20px auto;
  padding: 20px;
}
.back-link {
  text-decoration: none;
  color: var(--primary-color, #008080);
  font-weight: bold;
  margin-bottom: 20px;
  display: inline-block;
}
.back-link i {
  margin-right: 8px;
}
.detail-content {
  display: flex;
  flex-wrap: wrap; 
  gap: 30px;
}
.column-left {
  flex: 1; 
  min-width: 300px; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.column-right {
  flex: 2; 
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.info-card {
  background-color: #FFF;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.info-card h3 {
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  font-size: 18px;
}
.bella-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.bella-card h1 {
  margin: 0;
  font-size: 28px;
}
.tag-gender {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: bold;
  background-color: #E6FFFA;
  color: var(--primary-color, #008080);
}
.info-line {
  display: block;
  color: var(--text-light);
  margin-bottom: 5px;
}
.info-line i {
  color: var(--primary-color, #008080);
  margin-right: 8px;
  width: 16px;
}
.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  margin-top: 10px;
  box-sizing: border-box; 
}
.btn-primary {
  background-color: var(--primary-dark, #0A5C5C);
  color: white;
}
.btn-secondary {
  background-color: white;
  color: var(--primary-dark, #0A5C5C);
  border: 1px solid var(--primary-dark, #0A5C5C);
}
.donasi-count {
  font-size: 14px;
  background-color: #E6F7FF;
  color: #0056b3;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: bold;
  margin-left: 8px;
}
.donasi-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 10px; 
}
.donasi-list li {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px dashed var(--border-color);
}
.donasi-list li:last-child {
  border-bottom: none;
}
.donasi-list li span {
  font-size: 12px;
  color: var(--text-light);
}
.donasi-list::-webkit-scrollbar {
  width: 6px;
}
.donasi-list::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 3px;
}
.donasi-list::-webkit-scrollbar-thumb {
  background-color: var(--primary-dark, #0A5C5C);
  border-radius: 3px;
}
.donasi-list {
  scrollbar-width: thin;
  scrollbar-color: var(--primary-dark, #0A5C5C) #f0f0f0;
}
.penggalang-card strong {
  display: block;
  font-size: 16px;
}
.penggalang-card span {
  font-size: 14px;
  color: var(--text-light);
}
.penggalang-card p {
  font-size: 14px;
  margin: 10px 0 0 0;
  line-height: 1.5;
}
.penggalang-card .phone {
  font-weight: bold;
  color: var(--primary-dark, #0A5C5C);
  margin-top: 10px;
  display: block;
}
.image-card {
  position: relative;
  padding: 0; 
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.main-image {
  width: 100%;
  height: 400px; 
  display: block;
  object-fit: cover;
}
.heart-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  color: var(--primary-color, #008080); 
  background-color: white; 
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
}
.thumbnail-gallery {
  display: flex;
  gap: 10px;
  padding: 15px; 
  background-color: white; 
}
.thumbnail {
  width: 80px; 
  height: 80px; 
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid transparent; 
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.thumbnail-active {
  border-color: var(--primary-color, #008080); 
}
.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.story-header i {
  color: var(--text-light);
}
.story-date {
  font-size: 12px;
  color: var(--text-light);
  font-weight: bold;
  margin: 10px 0;
  display: block;
}
.story-card p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-light);
  margin: 0;
}
.read-more {
  text-decoration: none;
  color: var(--primary-color, #008080);
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
}
@media (max-width: 768px) {
  .column-left, .column-right {
    flex: 1 1 100%; 
    min-width: unset;
  }
}
</style>