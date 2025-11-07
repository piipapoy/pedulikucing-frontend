<template>
  <div class="donation-card" :class="cardTypeClass">
    <div class="card-image-container">
      <img :src="donation.imageUrl" :alt="donation.title">
      <span class="card-tag" :class="{ 'tag-program': donation.type === 'program' }">
        <i v-if="donation.type === 'program'" class="fas fa-sync-alt"></i>
        {{ donation.tag }}
      </span>
    </div>
    <div class="card-content">
      <h4>{{ donation.title }}</h4>
      <p v-if="donation.type === 'kasus'" class="card-description">{{ donation.description }}</p>
      <span v-if="donation.type === 'kasus'" class="card-location">
        <i class="fas fa-map-marker-alt"></i> {{ donation.location }}
      </span>
      <div v-if="donation.type === 'program'">
        <p class="card-description program-desc">
          Bantuan pakan rutin untuk shelter dan foster parent yang membutuhkan
        </p>
        <ul class="card-perks">
          <li>
            <i class="fas fa-heart"></i> <span><strong>Manfaat:</strong> {{ donation.manfaat }}</span>
          </li>
          <li>
            <i class="fas fa-circle-notch"></i> <span><strong>Dampak:</strong> {{ donation.dampak }}</span>
          </li>
        </ul>
      </div>
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="progress-labels">
        <div class="progress-label-left">
          <span>Terkumpul</span>
          <strong>{{ formatCurrency(donation.terkumpul) }}</strong>
        </div>
        <div class="progress-label-right">
          <span>{{ progressPercent.toFixed(0) }}%</span>
          <span>Target {{ formatCurrency(donation.target) }}</span>
        </div>
      </div>
      <router-link :to="`/donasi/${donation.id}`" class="btn btn-primary">
        {{ donation.type === 'kasus' ? 'Bantu Sekarang' : 'Dukung Program Ini' }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  donation: {
    type: Object,
    required: true
  }
});
const progressPercent = computed(() => {
  if (props.donation.target === 0) return 0;
  return (props.donation.terkumpul / props.donation.target) * 100;
});
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value);
};
const cardTypeClass = computed(() => {
  return props.donation.type === 'kasus' ? 'card-type-kasus' : 'card-type-program';
});
</script>
<style scoped>
.donation-card {
  border: 1px solid var(--border-color, #E0E0E0);
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0; 
  width: 350px; 
  scroll-snap-align: start; 
}
.card-image-container {
  position: relative;
}
.donation-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}
.card-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
}
.card-tag.tag-program {
  background-color: var(--primary-dark, #0A5C5C);
  display: flex;
  align-items: center;
  gap: 4px;
}
.card-tag.tag-program i {
  font-size: 10px;
}
.card-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition: background-color 0.3s ease;
}
.card-content h4 {
  font-size: 18px;
  margin: 0 0 8px 0;
  color: var(--text-color, #333);
}
.card-description {
  font-size: 14px;
  color: var(--text-light, #777);
  margin: 0 0 12px 0;
  min-height: 40px; 
}
.card-location {
  font-size: 14px;
  color: var(--primary-color, #008080); 
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
.card-location i {
  color: var(--primary-color, #008080); 
  margin-right: 6px;
  font-size: 16px;
}
.program-desc {
  min-height: 0; 
  margin-bottom: 16px;
}
.card-perks {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--text-light, #777);
}
.card-perks li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
}
.card-perks li i {
  color: var(--primary-color, #008080); 
  margin-right: 8px;
  margin-top: 3px;
  width: 16px; 
}
.card-perks li strong {
  color: var(--text-color, #333);
}
.progress-bar {
  background-color: #F0F0F0;
  border-radius: 10px;
  height: 8px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 8px;
}
.progress-bar-fill {
  background-color: var(--primary-dark, #0A5C5C); 
  height: 100%;
  border-radius: 10px;
}
.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 16px;
}
.progress-label-left span,
.progress-label-right span {
  display: block;
  color: var(--text-light, #777);
}
.progress-label-left strong {
  font-size: 14px;
  color: var(--text-color, #333);
}
.progress-label-right {
  text-align: right;
}
.progress-label-right span:first-child {
  color: var(--primary-color, #008080);
  font-weight: bold;
}
.btn-primary {
  background-color: var(--primary-dark, #0A5C5C); 
  color: white;
  border: none;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  margin-top: auto; 
}
.btn-primary:hover {
  background-color: #004d4d; 
}
.card-type-kasus .card-content {
  background-color: white; 
}
.card-type-kasus {
  border-color: var(--border-color, #E0E0E0);
}
.card-type-program .card-content {
  background-color: var(--secondary-color, #BFEFEA);
}
.card-type-program {
  border-color: var(--primary-color, #008080); 
}
</style>