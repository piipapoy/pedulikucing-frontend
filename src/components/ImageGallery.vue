<template>
  <div class="image-gallery">
    <div class="main-image-container">
      <img :src="images[currentImageIndex]" alt="Main Cat Image" class="main-image">
      <button 
        @click.stop="toggleLove" 
        :class="['love-button', { 'loved': isLoved }]"
        aria-label="Add to favorites"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
          class="lucide lucide-heart"
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.31l-0.77-0.73a5.4 5.4 0 0 0-7.65 0C1.83 7.03 1.83 11.23 4.28 13.68L12 22l7.72-8.32c2.45-2.45 2.45-6.65 0-9.1Z"/>
        </svg>
      </button>
    </div>
    <div class="thumbnail-gallery">
      <img 
        v-for="(image, index) in images" 
        :key="index" 
        :src="image" 
        :class="{ 'thumbnail': true, 'active': index === currentImageIndex }"
        @click="currentImageIndex = index"
        alt="Cat Thumbnail"
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      currentImageIndex: 0,
      isLoved: false
    };
  },
  methods: {
    toggleLove() {
      this.isLoved = !this.isLoved;
      this.$emit('toggle-love', this.isLoved);
    }
  }
};
</script>
<style scoped>
:root {
  --primary-color: #0b4f4a; 
}
.image-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.main-image-container {
  position: relative; 
  width: 100%;
  padding-top: 75%;
  background-color: #ffffff;
  overflow: hidden; 
}
.main-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.thumbnail-gallery {
  display: flex;
  gap: 0.75rem; 
  justify-content: flex-start; 
  overflow-x: auto; 
  padding-bottom: 0rem;
}
.thumbnail {
  width: 80px; 
  height: 60px; 
  object-fit: cover;
  border-radius: 0.375rem; 
  cursor: pointer;
  border: 2px solid transparent; 
  transition: border-color 0.2s ease-in-out;
}
.thumbnail.active {
  border-color: var(--primary-color); 
}
.love-button {
  position: absolute;
  top: 1.5rem; 
  right: 1.5rem;
  background-color: #BAEAE7; 
  border: none;
  border-radius: 50%;
  width: 44px; 
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15); 
  transition: transform 0.2s ease-in-out;
  z-index: 10;
  padding: 0; 
}
.love-button:hover {
  transform: scale(1.05); 
}
.love-button svg {
  width: 26px; 
  height: 26px;
  color: #0B4F4A;
  fill: none;
  transition: fill 0.2s ease-in-out;
  stroke-width: 2;
}
.love-button.loved svg {
  color: #0B4F4A;
  fill: #0B4F4A;
}
</style>