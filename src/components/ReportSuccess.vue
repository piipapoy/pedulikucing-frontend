<template>
  <div class="success-page-container">
    <div class="success-card">
      <div class="success-icon-wrapper">
        <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h2 class="title-success">Laporan Berhasil Dikirim!</h2>
      <p class="message-success">
        Terima kasih telah melaporkan kucing yang membutuhkan bantuan. Tim kami akan segera menindaklanjuti laporan Anda.
      </p>
      <div class="next-steps-box">
        <h3 class="subtitle-steps">Apa Yang Terjadi Selanjutnya?</h3>
        <div class="step-detail">
          <span class="step-number">1</span>
          <p class="step-desc">
            **Verifikasi (1-2 jam)**<br>Tim relawan akan memverifikasi lokasi dan kondisi kucing.
          </p>
        </div>
        <div class="step-detail">
          <span class="step-number">2</span>
          <p class="step-desc">
            **Penyelamatan**<br>Kucing akan diselamatkan dan dibawa ke klinik mitra.
          </p>
        </div>
        <div class="step-detail">
          <span class="step-number">3</span>
          <p class="step-desc">
            **Penggalangan Dana**<br>Kasus akan dipublikasikan untuk penggalangan biaya pengobatan.
          </p>
        </div>
        <div class="step-detail">
          <span class="step-number">4</span>
          <p class="step-desc">
            **Update Progress**<br>Anda akan mendapat update perkembangan kesehatan kucing.
          </p>
        </div>
      </div>
      <div class="suggestion-box">
        <h3 class="subtitle-suggestion">Saran untuk Anda</h3>
        <p class="suggestion-message">
          Buat akun PeduliKucing untuk melacak status laporan Anda secara real-time, mendapat notifikasi update, dan menindak lanjuti jika kasusnya fatal.
        </p>
        <div class="action-buttons">
          <button @click="$emit('register')" class="btn-primary">Daftar Akun</button>
          <button @click="$emit('later')" class="btn-secondary">Nanti Saja</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['register', 'later']) 
</script>
<style scoped>
.success-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  width: 100%;
}
.success-card {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  width: 90%;
  max-width: 550px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
.success-icon-wrapper {
  background-color: #ecfdf5; 
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}
.check-icon {
  width: 32px;
  height: 32px;
  color: #0b4f4a; 
}
.title-success {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}
.message-success {
  color: #374151;
  margin-bottom: 2rem;
  font-size: 1rem;
}
.next-steps-box {
  background: #ecfdf5; 
  border-radius: 12px;
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
}
.subtitle-steps {
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
}
.step-detail {
  display: flex;
  margin-bottom: 0.8rem;
  gap: 0.8rem;
  align-items: flex-start;
}
.step-number {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #0f766e;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
}
.step-desc {
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
}
.step-desc strong {
    font-weight: 600;
    color: #1f2937;
}
.suggestion-box {
  background: #ffffff;
  padding: 1rem 0;
}
.subtitle-suggestion {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}
.suggestion-message {
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn-primary {
  background-color: #0b4f4a; 
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.btn-secondary {
  background: none;
  border: 1px solid #d1d5db;
  color: #4b5563;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}
</style>