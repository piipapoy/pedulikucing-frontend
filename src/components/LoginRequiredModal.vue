<template>
  <BaseModal :show="show" @close="$emit('close')">
    <div class="modal-body">
      <button class="close-button" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="icon-wrapper">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="#DC2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 class="title">Login Diperlukan!</h2>
      <p class="description">
        Untuk keamanan dan kenyamanan semua pihak, komunikasi dengan shelter harus dilakukan melalui sistem chat terintegrasi kami.
      </p>
      <div class="reason-box">
        <h4 class="reason-title">Mengapa Harus Login?</h4>
        <ul class="reason-list">
          <li>
            <span>1</span>
            Melindungi privasi adopter dan shelter.
          </li>
          <li>
            <span>2</span>
            Mencegah spam dan komunikasi yang tidak bertanggung jawab.
          </li>
          <li>
            <span>3</span>
            Menyimpan riwayat percakapan untuk referensi.
          </li>
          <li>
            <span>4</span>
            Memastikan hanya calon adopter serius yang menghubungi.
          </li>
        </ul>
      </div>
      <div class="info-box">
        <span class="chat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </span>
        <div class="info-box-text">
          <h4 class="feature-title">Fitur Chat Terintegrasi</h4>
          <p class="feature-description">
            Setelah login, Anda dapat langsung chat dengan shelter melalui sistem pesan internal kami.
          </p>
        </div>
      </div>
      <div class="button-group">
        <BaseButton @click="goToRegister">Daftar Akun</BaseButton>
        <BaseButton variant="outline" @click="$emit('close')">
          Nanti Saja
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
<script>
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import BaseModal from '../components/BaseModal.vue'
export default {
  name: 'LoginRequiredModal',
  props: {
    show: Boolean
  },
  emits: ['close'],
  components: { BaseModal, BaseButton },
  setup(props, { emit }) {
    const router = useRouter()
    const goToRegister = () => {
      emit('close')
      router.push('/register')
    }
    return { goToRegister }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+Pro:wght@700&display=swap');
.modal-body {
  text-align: center;
  padding: 1.5rem 1.5rem 1.5rem 1.5rem; 
  font-family: 'Inter', sans-serif;
  position: relative; 
}
.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;
}
.close-button svg {
  width: 100%;
  height: 100%;
  color: #888; 
}
.close-button:hover {
  background: #f0f0f0;
  color: #333;
}
.icon-wrapper {
  width: 64px;
  height: 64px;
  margin: 0.5rem auto 1rem auto; 
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fee2e2; 
  position: relative;
  z-index: 1; 
}
.title {
  font-family: 'Source Serif Pro', serif;
  font-size: 1.75rem; 
  font-weight: 700;
  color: var(--text-color, #2d2d2d);
  margin-bottom: 0.5rem;
}
.description {
  font-size: 1rem; 
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}
.reason-box {
  background-color: #e0f2f1;
  text-align: left;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}
.reason-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: var(--primary-color, #0b4f4a);
  text-align: left;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}
.reason-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.reason-list li {
  display: flex;
  align-items: flex-start;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}
.reason-list li span {
  font-weight: 700;
  background-color: var(--primary-color, #0b4f4a);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  margin-right: 0.75rem;
  flex-shrink: 0;
}
.info-box {
  background-color: #f8f9fa;
  padding: 1.25rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}
.chat-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-color-light, #e0f2f1);
  color: var(--primary-color, #0b4f4a);
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-icon svg {
  width: 18px;
  height: 18px;
}
.info-box-text {
  flex-grow: 1;
}
.feature-title {
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0.25rem 0;
}
.feature-description {
  font-size: 0.875rem;
  color: #555;
  margin: 0;
  line-height: 1.5;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>