<template>
  <div>
    <Navbar /> 
    <div class="report-container">
      <ReportSuccess v-if="formSubmitted" @later="resetForm" @register="handleRegister" />
      <div class="form-card-wrapper" v-else>
          <div class="header-report">
            <img src="/src/assets/LogoReport.png" alt="Lonceng Alarm" class="header-icon-bell">
            <h1>Lihat Kucing Butuh Pertolongan? Jangan Ragu, Laporkan.</h1>
            <p>Setiap menit sangat berharga. Tim relawan kami siap membantu kucing dalam situasi darurat 24/7.</p>
            <div class="stepper">
              <div :class="['step', { 'active': currentStep >= 1 }]">1</div>
              <div :class="['line', { 'active': currentStep >= 2 }]"></div>
              <div :class="['step', { 'active': currentStep >= 2 }]">2</div>
              <div :class="['line', { 'active': currentStep >= 3 }]"></div>
              <div :class="['step', { 'active': currentStep >= 3 }]">3</div>
              <div :class="['line', { 'active': currentStep >= 4 }]"></div>
              <div :class="['step', { 'active': currentStep >= 4 }]">4</div>
            </div>
          </div>
          <div class="form-card">
            <div class="step-title-wrapper">
                <img :src="stepIcons[currentStep]" alt="Icon Langkah" class="icon-title">
                <h3 class="step-title">{{ stepTitles[currentStep] }}</h3>
            </div>
            <StepUpload v-if="currentStep === 1" />
            <StepLocation v-else-if="currentStep === 2" />
            <StepCondition v-else-if="currentStep === 3" />
            <StepContact v-else-if="currentStep === 4" />
            <div class="form-actions">
              <button v-if="currentStep > 1" @click="prevStep" class="btn-secondary">Kembali</button>
              <button @click="nextStep" class="btn-primary">
                {{ currentStep === 4 ? 'Kirim Laporan' : 'Lanjut' }}
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import StepUpload from '../components/StepUpload.vue'
import StepLocation from '../components/StepLocation.vue'
import StepCondition from '../components/StepCondition.vue'
import StepContact from '../components/StepContact.vue'
import ReportSuccess from '../components/ReportSuccess.vue'
const currentStep = ref(1)
const formSubmitted = ref(false) 
const stepIcons = {
    1: '/src/assets/uploadfoto.png', 
    2: '/src/assets/lokasi.png', 
    3: '/src/assets/condition.png', 
    4: '/src/assets/contact.png', 
}
const stepTitles = {
    1: 'Upload Foto/Video', 
    2: 'Tandai Lokasi', 
    3: 'Deskripsi Kondisi', 
    4: 'Kontak Pelapor', 
}
function nextStep() {
    if (currentStep.value < 4) {
        currentStep.value++
    } else {
        formSubmitted.value = true
    }
}
function prevStep() {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}
function resetForm() {
    currentStep.value = 1
    formSubmitted.value = false
}
function handleRegister() {
    console.log("Navigasi ke halaman pendaftaran...")
}
</script>
<style scoped>
.report-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  margin-top: 5rem; 
}
.form-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header-report {
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
}
.header-icon-bell {
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.5rem;
}
.header-report h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.5rem;
}
.header-report p {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
}
.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  gap: 0.5rem;
}
.step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e5e7eb;
  color: #6b7280;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.step.active {
  background-color: #0f766e;
  color: white;
}
.line {
  height: 2px;
  width: 40px;
  background-color: #e5e7eb;
  transition: background-color 0.3s;
}
.line.active {
  background-color: #0f766e;
}
.form-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.step-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1f2937;
    margin-bottom: 1.5rem;
}
.icon-title {
    width: 1.5rem;
    height: 1.5rem;
}
.step-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}
.btn-primary {
  background-color: #0f766e;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}
.btn-secondary {
  background: #e5e7eb;
  color: #374151;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
}
</style>