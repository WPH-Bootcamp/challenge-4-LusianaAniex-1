# 🚀 Setup Guide - Sistem Manajemen Nilai Siswa

Sistem Manajemen Nilai Siswa berbasis CLI (Command Line Interface) yang dibangun menggunakan JavaScript dengan pendekatan Object-Oriented Programming (OOP).

## 📋 Prerequisites

- **Node.js** (versi 16.0.0 atau lebih baru)
- **npm** (biasanya sudah termasuk dengan Node.js)

### ✅ Verifikasi Installation

````bash
node --version
npm --version

## 🚀 Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
````

2. **Run Application**
   npm start
   or
   node index.js

📁 Project Structure
text
t-challenge-4-rep/
├── src/
│ ├── Student.js # Class Student dengan encapsulation
│ └── StudentManager.js # Class management dengan persistence
├── data/
│ └── students.json # Auto-generated data storage
├── index.js # Main CLI application
├── package.json # Dependencies & configuration
└── SETUP.md # This file

## 📋 Fitur

- 📝 **Tambah Siswa Baru** - Input data siswa (ID, Nama, Kelas)
- 👥 **Lihat Semua Siswa** - Menampilkan daftar lengkap siswa dengan nilai
- 🔍 **Cari Siswa** - Pencarian siswa berdasarkan ID
- ✏️ **Update Data Siswa** - Edit informasi siswa (nama dan kelas)
- 🗑️ **Hapus Siswa** - Menghapus data siswa dari sistem
- 📊 **Tambah Nilai Siswa** - Input nilai mata pelajaran untuk siswa
- 🏆 **Lihat Top 3 Siswa** - Ranking siswa berdasarkan nilai rata-rata tertinggi
- 💾 **Data Persistence** - Penyimpanan data otomatis ke file JSON
- ⚡ **Validasi Input** - Pencegahan input tidak valid/Comprehensive error handling
- 📈 **Class Statistics** - Statistik per kelas
- 🔄 **Auto Save** - Simpan setelah setiap operasi
- 📊 **Progress Bars** - Visual statistics

## 🚀 Cara Menjalankan

**First Time Setup**

- Run npm install untuk install dependencies

- Run npm start untuk menjalankan aplikasi

- File data/students.json akan dibuat otomatis

**Adding Sample Data**

- Pilih menu 1 - Tambah Siswa Baru

- Contoh Input:

ID: S001

Nama: Budi Santoso

Kelas: 10A

- Pilih menu 6 - Tambah Nilai

ID: S001

Mata Pelajaran: Matematika

Nilai: 85

**Viewing Statistics**

- Menu 7 - Top 3 siswa berdasarkan rata-rata

- Menu 8 - Statistik lengkap per kelas

## 📊 Sistem Penilaian

- **Rentang Nilai:** 0-100
- **Status Kelulusan:**
  - Rata-rata ≥ 75: **LULUS** ✅
  - Rata-rata < 75: **TIDAK LULUS** ❌

🎨 Color System
🟢 Hijau - Success, lulus, positif
🔴 Merah - Error, tidak lulus, warning
🟡 Kuning - Warning, peringatan
🔵 Biru - Information, data
🟣 Ungu - Highlight, important

**⚠️ Troubleshooting**

- Error: "Cannot find package"

# Pastikan dependencies terinstall

npm install

- Error: "Cannot use import statement"
  Pastikan package.json memiliki "type": "module"

- Data tidak tersimpan
  Pastikan folder data/ ada dan writable
  Check permission folder

- Colors tidak muncul
  Pastikan chalk terinstall: npm list chalk

**🔧 Development**

- Run dengan auto-restart (Node.js 18+)
  node --watch index.js
- Debug mode
  DEBUG=true node index.js

## 🛠️ Teknologi yang Digunakan

- **JavaScript ES6+** dengan modul ES6
- **Object-Oriented Programming** (Class, Object, Inheritance, Encapsulation)
- **readline-sync** untuk input CLI
- **File System** module untuk data persistence

## 📝 Contoh Data Output

```javascript
// Format data yang disimpan (data/students.json)
[
  {
    id: 'S001',
    name: 'Budi Santoso',
    className: '10A',
    grades: {
      Matematika: 85,
      'Bahasa Indonesia': 90,
      IPA: 88,
    },
  },
];
```

## 📄 License

ISC License

---

**Selamat menggunakan Sistem Manajemen Nilai Siswa!** 🎓✨
