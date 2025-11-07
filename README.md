# 🐾 Peduli Kucing: Frontend Platform Adopsi dan Laporan Darurat

Proyek ini adalah implementasi *frontend* (antarmuka pengguna) dari platform Peduli Kucing, yang berfokus pada penyediaan antarmuka yang modern, interaktif, dan **responsif** untuk memfasilitasi adopsi serta mekanisme pelaporan cepat untuk kucing yang membutuhkan pertolongan darurat. Proyek ini dibangun menggunakan **Vue.js** (Composition API) dan CSS murni.

## 🔗 Informasi Repositori

| Kategori | Detail |
| :--- | :--- |
| **URL Repo** | `https://github.com/piipapoy/pedulikucing-frontend.git` |
| **Teknologi** | Vue.js 3 (Composition API), Vite, CSS Scoped |

---

## ✨ Fitur Utama & Fokus Responsivitas

Aplikasi ini mencakup halaman utama (Views) dan komponen modular (Components) dengan perhatian khusus pada adaptasi ke perangkat seluler.

### 📄 Halaman Utama (Views)

| File | Deskripsi | Status Responsif |
| :--- | :--- | :--- |
| **`AdoptionGallery.vue`** | Halaman utama galeri adopsi, menampilkan kartu kucing, filter, dan fitur pencarian. | **Responsif:** Filter sidebar menumpuk di atas grid kartu pada layar mobile (`@media (max-width: 1024px)`). |
| **`ReportForm.vue`** | Formulir multi-langkah (stepper) untuk melaporkan kucing darurat. | **Responsif:** Desain *centered* dengan `max-width` dan alur vertikal, aman di semua ukuran layar. |
| `Homepage.vue` | Halaman pendaratan (landing page) utama aplikasi. | |
| `DonationPage.vue` | Halaman untuk donasi dan kampanye penggalangan dana. | |

### 🧩 Komponen Kritis

| File | Deskripsi | Implementasi Kunci |
| :--- | :--- | :--- |
| **`Navbar.vue`** | Bar navigasi utama. | Menggunakan **Menu Hamburger** (`@media (max-width: 992px)`) untuk menghemat ruang dan mencegah pemotongan. |
| **`Footer.vue`** | Bagian kaki halaman. | Beralih dari tata letak kolom horizontal menjadi baris vertikal di layar mobile (`@media (max-width: 768px)`). |
| **`CatCard.vue`** | Kartu detail untuk setiap kucing adopsi. | *Mobile-ready* dengan *dynamic class binding* untuk ikon hati (love) dan penanganan teks panjang agar tidak *overflow*. |
| `Step*.vue` | Langkah-langkah dalam formulir (`StepUpload`, `StepLocation`, dll.). | Menjaga struktur form tetap bersih per langkah. |

---

## 💻 Cara Menjalankan Proyek (Setup Lokal)

Proyek ini dibuat menggunakan **Vite** dan memerlukan **Node.js** terinstal pada sistem Anda.

### Persyaratan Sistem

* **Node.js** (Versi 16 atau lebih tinggi direkomendasikan)
* **npm** atau **Yarn**

### Langkah-Langkah Eksekusi

Anda dapat mengunduh kode melalui **Git Clone** atau **Download ZIP**.

#### Opsi 1: Menggunakan Git Clone (Direkomendasikan)

1.  Buka Terminal (atau Command Prompt) dan gunakan perintah `git clone`:

    ```bash
    git clone [https://github.com/piipapoy/pedulikucing-frontend.git](https://github.com/piipapoy/pedulikucing-frontend.git)
    cd pedulikucing-frontend
    ```

#### Opsi 2: Download File ZIP

1.  Akses URL repositori di *browser* Anda.
2.  Klik tombol **`Code`** berwarna hijau, lalu pilih **`Download ZIP`**.
3.  Ekstrak file ZIP tersebut ke folder yang Anda inginkan.
4.  Buka Terminal dan navigasi ke folder proyek yang diekstrak:

    ```bash
    cd nama-folder-proyek-yang-diekstrak
    ```

#### 2. Instal Dependensi

Setelah berhasil masuk ke folder proyek, instal semua paket Node.js yang diperlukan (terdaftar dalam `package.json`):

```bash
# Menggunakan npm (Direkomendasikan)
npm install

# ATAU jika Anda menggunakan Yarn
# yarn install
```

#### 3. Jalankan Server Pengembangan

Setelah instalasi selesai, jalankan aplikasi di server pengembangan lokal:

```bash
# Menggunakan npm
npm run dev

# ATAU jika Anda menggunakan Yarn
# yarn dev
```

#### 4. Akses Aplikasi

Server akan menampilkan URL lokal di terminal. Buka Browser Anda dan navigasi ke alamat tersebut.
Biasanya, alamat lokal adalah: http://localhost:5173/
