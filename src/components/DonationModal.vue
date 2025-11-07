<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button v-if="currentStep !== 'showSuccess'" class="close-btn" @click="closeModal">
        X
      </button>
      <div v-if="currentStep === 'selectAmount'" class="step-container">
        <div class="modal-header">
          <i class="fas fa-hand-holding-heart"></i>
          <h2>Masukkan Nominal Donasi</h2>
        </div>
        <div class="steps">
          <span class="step active">1</span>
          <span class="step-divider"></span>
          <span class="step">2</span>
          <span class="step-divider"></span>
          <span class="step">3</span>
        </div>
        <div class="amount-options">
          <button class="amount-btn" :class="{ active: selectedAmount === 50000 }" @click="selectAmount(50000)">Rp 50.000</button>
          <button class="amount-btn" :class="{ active: selectedAmount === 100000 }" @click="selectAmount(100000)">Rp 100.000</button>
          <button class="amount-btn" :class="{ active: selectedAmount === 200000 }" @click="selectAmount(200000)">Rp 200.000</button>
          <button class="amount-btn" :class="{ active: selectedAmount === 500000 }" @click="selectAmount(500000)">Rp 500.000</button>
        </div>
        <input type="number" placeholder="Jumlah Lain" class="custom-amount-input" v-model.number="customAmount" @input="handleCustomInput">
        <button class="btn btn-primary" @click="goToSelectMethod">Lanjutkan ke Pembayaran</button>
      </div>
      <div v-if="currentStep === 'selectMethod'" class="step-container">
        <div class="modal-header">
          <i class="fas fa-wallet"></i>
          <h2>Pilih Metode Pembayaran</h2>
        </div>
        <div class="steps">
          <span class="step complete">1</span>
          <span class="step-divider"></span>
          <span class="step active">2</span>
          <span class="step-divider"></span>
          <span class="step">3</span>
        </div>
        <div class="payment-options">
          <label class="payment-option"><input type="radio" name="payment" v-model="selectedPayment" value="transfer"><span>Transfer Bank</span></label>
          <label class="payment-option"><input type="radio" name="payment" v-model="selectedPayment" value="qris"><span>QRIS (GoPay, OVO, ShopeePay)</span></label>
          <label class="payment-option"><input type="radio" name="payment" v-model="selectedPayment" value="virtual"><span>Virtual Account</span></label>
        </div>
        <div class="donation-summary">
          <h4>Rincian Donasi</h4>
          <div class="summary-row"><span>Jumlah Donasi</span><strong>{{ formatCurrency(finalAmount) }}</strong></div>
          <div class="summary-row"><span>Biaya Administrasi</span><strong>Rp 0</strong></div>
          <div class="summary-row total"><span>Total Pembayaran</span><strong>{{ formatCurrency(finalAmount) }}</strong></div>
        </div>
        <div class="button-group">
          <button class="btn btn-secondary" @click="currentStep = 'selectAmount'">Kembali</button>
          <button class="btn btn-primary" @click="goToPaymentScreen">Lanjut</button>
        </div>
      </div>
      <div v-if="currentStep === 'showQRIS'" class="step-container">
        <div class="modal-header"><i class="fas fa-qrcode"></i><h2>Scan QR Code</h2></div>
        <div class="steps">
          <span class="step complete">1</span><span class="step-divider"></span>
          <span class="step complete">2</span><span class="step-divider"></span>
          <span class="step active">3</span>
        </div>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ContohDonasi" alt="QR Code Donasi" class="qr-code-image">
        <div class="summary-row total simple">
          <span>Ringkasan Donasi</span><strong>{{ formatCurrency(finalAmount) }}</strong>
        </div>
        <button class="btn btn-primary" @click="markAsPaid">Cek Status</button>
      </div>
      <div v-if="currentStep === 'selectBank'" class="step-container">
        <div class="modal-header"><i class="fas fa-university"></i>
          <h2>Pilih Bank {{ selectedPayment === 'virtual' ? 'Virtual Account' : 'Tujuan' }}</h2>
        </div>
        <div class="steps">
          <span class="step complete">1</span><span class="step-divider"></span>
          <span class="step complete">2</span><span class="step-divider"></span>
          <span class="step active">3</span>
        </div>
        <div class="payment-options">
          <button class="payment-option bank" @click="selectBank('BCA')">Bank BCA</button>
          <button class="payment-option bank" @click="selectBank('Mandiri')">Bank Mandiri</button>
          <button class="payment-option bank" @click="selectBank('BRI')">Bank BRI</button>
        </div>
        <div class="button-group">
          <button class="btn btn-secondary" @click="currentStep = 'selectMethod'">Kembali</button>
        </div>
      </div>
      <div v-if="currentStep === 'showInstructions'" class="step-container">
        <div class="modal-header"><i class="fas fa-file-invoice-dollar"></i><h2>Instruksi Pembayaran</h2></div>
        <div class="steps">
          <span class="step complete">1</span><span class="step-divider"></span>
          <span class="step complete">2</span><span class="step-divider"></span>
          <span class="step active">3</span>
        </div>
        <div v-if="selectedPayment === 'virtual'" class="payment-details">
          <p>Selesaikan pembayaran ke nomor Virtual Account di bawah ini:</p>
          <div class="payment-info-box">
            <span>{{ bankDetails[selectedBank]?.name }} Virtual Account</span>
            <strong>{{ bankDetails[selectedBank]?.vaNumber }}</strong>
          </div>
        </div>
        <div v-if="selectedPayment === 'transfer'" class="payment-details">
          <p>Mohon transfer manual ke rekening di bawah ini:</p>
          <div class="payment-info-box">
            <span>{{ bankDetails[selectedBank]?.name }}</span>
            <strong>{{ bankDetails[selectedBank]?.accountNumber }}</strong>
            <span>a/n Yayasan Peduli Kucing</span>
          </div>
        </div>
        <div class="donation-summary">
          <div class="summary-row total"><span>Total Pembayaran</span><strong>{{ formatCurrency(finalAmount) }}</strong></div>
        </div>
        <div class="button-group">
          <button class="btn btn-secondary" @click="currentStep = 'selectBank'">Pilih Bank Lain</button>
          <button class="btn btn-primary" @click="markAsPaid">Saya Sudah Bayar</button>
        </div>
      </div>
      <div v-if="currentStep === 'showSuccess'" class="step-container">
        <div class="modal-header">
          <span class="success-icon-wrapper">
             <i class="fas fa-check"></i>
          </span>
          <h2>Donasi Berhasil Dikirim!</h2>
        </div>
        <p class="success-description">
          Terima kasih atas donasi anonim Anda sebesar <strong>{{ formatCurrency(finalAmount) }}</strong> untuk <strong>{{ donationModalStore.donation?.title || 'Kasus Ini' }}</strong>.
          Setiap rupiah yang Anda berikan akan langsung membantu proses penyembuhan.
        </p>
        <button class="btn btn-primary" @click="closeModalAndNavigate">
          Bantu Kasus Lain
        </button>
        <div class="recommendation-box">
          <p><strong><i class="fas fa-lightbulb"></i> Saran untuk Anda</strong></p>
          <p class="recommendation-text">
            Buat akun PeduliKucing untuk melacak status donasi Anda, 
            mendapat notifikasi update, dan menandai urgensi jika Anda ingin 
            menjadi donatur.
          </p>
          <div class="button-group">
            <button class="btn btn-primary" @click="goToRegister">Daftar Akun</button>
            <button class="btn btn-secondary" @click="closeModal">Nanti Saja</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { donationModalStore } from '../store/donationModalStore.js';
import { useRouter } from 'vue-router';
const router = useRouter(); 
const currentStep = ref('selectAmount');
const selectedAmount = ref(100000);
const customAmount = ref(null);
const finalAmount = ref(0);
const selectedPayment = ref('qris'); 
const selectedBank = ref(null); 
const bankDetails = ref({
  'BCA': { name: 'Bank BCA', vaNumber: '8808 1234 5678', accountNumber: '123-456-7890' },
  'Mandiri': { name: 'Bank Mandiri', vaNumber: '9001 1234 5678', accountNumber: '456-789-0123' },
  'BRI': { name: 'Bank BRI', vaNumber: '7777 1234 5678', accountNumber: '789-012-3456' },
});
const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0
  }).format(value);
};
const selectAmount = (amount) => {
  selectedAmount.value = amount;
  customAmount.value = null; 
};
const handleCustomInput = () => {
  selectedAmount.value = null; 
};
const goToSelectMethod = () => {
  const amount = selectedAmount.value || customAmount.value;
  if (amount && amount > 0) {
    finalAmount.value = amount;
    currentStep.value = 'selectMethod';
  } else {
    alert('Silakan masukkan nominal donasi');
  }
};
const goToPaymentScreen = () => {
  if (!selectedPayment.value) {
    alert('Silakan pilih metode pembayaran');
    return;
  }
  if (selectedPayment.value === 'qris') {
    currentStep.value = 'showQRIS';
  } else if (selectedPayment.value === 'transfer' || selectedPayment.value === 'virtual') {
    currentStep.value = 'selectBank';
  }
};
const selectBank = (bankName) => {
  selectedBank.value = bankName;
  currentStep.value = 'showInstructions';
};
const markAsPaid = () => {
  currentStep.value = 'showSuccess'; 
};
const closeModal = () => {
  donationModalStore.close();
  currentStep.value = 'selectAmount';
  selectedAmount.value = 100000;
  customAmount.value = null;
  finalAmount.value = 0;
  selectedPayment.value = 'qris';
  selectedBank.value = null;
};
const closeModalAndNavigate = () => {
  closeModal(); 
  router.push('/'); 
};
const goToRegister = () => {
  closeModal();
  router.push('/register'); 
};
</script>
<style scoped>
.modal-backdrop {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.6); display: flex;
  justify-content: center; align-items: center; z-index: 1000;
}
.modal-content {
  position: relative; background: white; padding: 24px 32px;
  border-radius: 16px; width: 90%; max-width: 450px;
}
.close-btn {
  position: absolute; top: 15px; right: 15px; background: none;
  border: none; font-size: 20px; color: #888; cursor: pointer; z-index: 1001;
}
.close-btn:hover { color: #333; }
.step-container {
  display: flex; flex-direction: column;
  align-items: center; gap: 20px; width: 100%;
}
.modal-header { text-align: center; }
.modal-header i { font-size: 32px; color: var(--primary-color, #008080); }
.modal-header h2 { margin: 10px 0 0 0; font-size: 22px; }
.steps { display: flex; align-items: center; gap: 10px; }
.step {
  width: 30px; height: 30px; border-radius: 50%;
  background-color: #f0f0f0; color: #999;
  display: grid; place-items: center; font-weight: bold;
}
.step.active { background-color: var(--primary-dark, #0A5C5C); color: white; }
.step.complete { background-color: var(--primary-color, #008080); color: white; }
.step-divider { width: 50px; height: 2px; background-color: #f0f0f0; }
.amount-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; }
.amount-btn {
  padding: 12px; border: 1px solid var(--border-color, #E0E0E0);
  background-color: white; border-radius: 8px; cursor: pointer;
  font-size: 14px; font-weight: 500;
}
.amount-btn.active {
  border-color: var(--primary-dark, #0A5C5C); background-color: #F0F8F8;
  color: var(--primary-dark, #0A5C5C); font-weight: bold;
}
.custom-amount-input {
  width: 100%; padding: 12px; border: 1px solid var(--border-color, #E0E0E0);
  border-radius: 8px; font-size: 14px;
}
.btn-primary {
  width: 100%; background-color: var(--primary-dark, #0A5C5C);
  color: white; border: none; padding: 12px;
  font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer;
}
.btn-secondary {
  width: 100%; background-color: white; color: var(--primary-dark, #0A5C5C);
  border: 1px solid var(--primary-dark, #0A5C5C); padding: 12px;
  font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer;
}
.payment-options { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.payment-option {
  width: 100%; padding: 14px; border: 1px solid var(--border-color, #E0E0E0);
  border-radius: 8px; display: flex; align-items: center; gap: 10px; cursor: pointer;
}
.payment-option:hover { background-color: #f9f9f9; }
.payment-option input[type="radio"] { width: 18px; height: 18px; }
.payment-option span { font-weight: 500; }
.payment-option.bank {
  background: white; justify-content: center; font-weight: 500;
}
.payment-option.bank:hover { border-color: var(--primary-dark, #0A5C5C); }
.donation-summary {
  width: 100%; padding: 16px; background-color: #f9f9f9;
  border-radius: 8px; border: 1px solid var(--border-color, #E0E0E0);
}
.donation-summary h4 {
  margin: 0 0 10px 0; padding-bottom: 10px;
  border-bottom: 1px dashed var(--border-color, #E0E0E0);
}
.summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
.summary-row.total { font-weight: bold; font-size: 16px; margin-top: 10px; }
.summary-row.total.simple {
  font-weight: 500; font-size: 14px; margin: 0; color: var(--text-light);
}
.summary-row.total.simple strong {
  color: var(--text-color); font-size: 16px; font-weight: bold;
}
.button-group { display: flex; gap: 10px; width: 100%; }
.button-group .btn-primary, .button-group .btn-secondary { width: 100%; }
.payment-details {
  display: flex; flex-direction: column;
  align-items: center; gap: 15px; width: 100%; text-align: center;
}
.qr-code-image {
  width: 200px; height: 200px; border: 1px solid var(--border-color, #E0E0E0);
  border-radius: 8px; background-color: #f9f9f9;
}
.payment-info-box {
  width: 100%; padding: 16px; border: 1px dashed var(--primary-color, #008080);
  background-color: #F0F8F8; border-radius: 8px;
}
.payment-info-box span { display: block; font-size: 14px; color: var(--text-light); }
.payment-info-box strong { font-size: 20px; color: var(--primary-dark, #0A5C5C); margin: 5px 0; }
.success-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-dark, #0A5C5C); 
  color: white;
  display: grid;
  place-items: center;
  font-size: 28px;
  margin-bottom: 10px;
}
.success-description {
  font-size: 14px;
  color: var(--text-light);
  text-align: center;
  line-height: 1.6;
}
.recommendation-box {
  width: 100%;
  background-color: #f7f7f7; 
  border-radius: 8px;
  padding: 16px;
  margin-top: 10px;
  text-align: center;
}
.recommendation-box p {
  margin: 0 0 10px 0;
  font-size: 14px;
}
.recommendation-box .recommendation-text {
  font-size: 12px;
  color: var(--text-light);
  line-height: 1.5;
  margin-bottom: 15px;
}
.recommendation-box .btn-primary {
  background-color: var(--primary-color, #008080);
}
</style>