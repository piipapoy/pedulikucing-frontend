<template>
  <div class="linktree-container">
    <div class="header-section">
      <img src="/src/assets/logo.png" alt="Logo PeduliKucing" class="profile-logo">
      <h1 class="username-title">@pedulikucing.id</h1>
      <p class="description-text">Satu tempat untuk menyelamatkan, mengadopsi, dan membantu kucing di seluruh Indonesia.</p>
    </div>
    <div class="links-wrapper">
      <h2 class="group-title">Aksi Cepat</h2>
      <RouterLink 
        v-for="link in primaryLinks" 
        :key="link.path" 
        :to="link.path" 
        class="link-button primary-variant"
      >
        <span class="link-icon">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
      <h2 class="group-title">Komunitas & Informasi</h2>
      <RouterLink 
        v-for="link in infoLinks" 
        :key="link.path" 
        :to="link.path" 
        class="link-button info-variant"
      >
        <span class="link-icon">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
      <h2 class="group-title">Akun</h2>
      <RouterLink 
        v-for="link in authLinks" 
        :key="link.path" 
        :to="link.path" 
        class="link-button auth-variant"
      >
        <span class="link-icon">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
    </div>
    <p class="footer-note">PeduliKucing • All Rights Reserved</p>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
const primaryLinks = [
  { label: 'LAPOR DARURAT (Report Form)', path: '/lapor', icon: '🚨' },
  { label: 'GALERI ADOPSI (Adoption Gallery)', path: '/adopsi', icon: '🐱' },
  { label: 'DETAIL ADOPSI (Contoh Bella)', path: '/adopsi/bella', icon: '🔍' },
  { label: 'FORMULIR ADOPSI STEP 1', path: '/adopsi/bella/form', icon: '📋' },
];
const infoLinks = [
  { label: 'HALAMAN UTAMA (Homepage)', path: '/home', icon: '🏠' },
  { label: 'KOMUNITAS (Foster & Shelter)', path: '/komunitas', icon: '🤝' },
  { label: 'KLINIK TERDEKAT', path: '/klinik-terdekat', icon: '🏥' },
  { label: 'DONASI (Galeri)', path: '/donasi', icon: '💖' },
  { label: 'DETAIL DONASI (Contoh)', path: '/donasi/1', icon: '📈' },
];
const authLinks = [
  { label: 'LOGIN (Autentikasi)', path: '/login', icon: '➡️' },
  { label: 'REGISTER (Pendaftaran)', path: '/register', icon: '➕' },
];
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
:root {
  --primary-color: #0b4f4a;
  --bg-dark: #2d2d2d;
  --bg-light: #f4f4f4;
}
.linktree-container {
  background-color: var(--bg-light);
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-section {
  text-align: center;
  margin-bottom: 2rem;
  max-width: 450px;
}
.profile-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: contain;
  border: 4px solid var(--primary-color);
  margin-bottom: 0.5rem;
}
.username-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--primary-color);
  margin: 0;
}
.description-text {
    font-size: 0.9rem;
    color: #666;
    margin: 0.5rem 0 0;
}
.links-wrapper {
  width: 100%;
  max-width: 500px;
}
.group-title {
    font-size: 1rem;
    font-weight: 700;
    color: #444;
    margin: 1.5rem 0 0.8rem 0;
    padding-left: 0.5rem;
    border-bottom: 2px solid #ddd;
}
.link-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem 1.2rem;
  margin-bottom: 0.75rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: var(--text-color);
  border: 1px solid transparent;
}
.link-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.link-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
}
.link-button.primary-variant {
  background-color: white;
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.link-button.info-variant {
  background-color: #f0fafa;
  color: #333;
}
.link-button.auth-variant {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #222;
}
.footer-note {
    font-size: 0.8rem;
    color: #888;
    margin-top: 3rem;
}
</style>