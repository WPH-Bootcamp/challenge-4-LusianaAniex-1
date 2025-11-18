# Student Grade Management System

Sistem Manajemen Nilai Siswa berbasis CLI (Command Line Interface) yang dibangun menggunakan JavaScript dengan pendekatan Object-Oriented Programming (OOP).

## 🚀 Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run Application**
   npm start

## 📋 Fitur

- ✅ **Tambah Siswa Baru** - Input data siswa (ID, Nama, Kelas)
- ✅ **Lihat Semua Siswa** - Menampilkan daftar lengkap siswa dengan nilai
- ✅ **Cari Siswa** - Pencarian siswa berdasarkan ID
- ✅ **Update Data Siswa** - Edit informasi siswa (nama dan kelas)
- ✅ **Hapus Siswa** - Menghapus data siswa dari sistem
- ✅ **Tambah Nilai Siswa** - Input nilai mata pelajaran untuk siswa
- ✅ **Lihat Top 3 Siswa** - Ranking siswa berdasarkan nilai rata-rata tertinggi
- ✅ **Data Persistence** - Penyimpanan data otomatis ke file JSON
- ✅ **Validasi Input** - Pencegahan input tidak valid

## 🏗️ Struktur Project

```
student-grade-management-system/
├── src/
│   ├── Student.js          # Class Student dengan private fields
│   └── StudentManager.js   # Class untuk mengelola data siswa
├── data/
│   └── students.json       # File penyimpanan data (auto-generated)
├── index.js               # Main application & CLI interface
└── package.json           # Dependencies dan configuration
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js versi 14.0.0 atau lebih tinggi

### Installation

1. Clone atau download project ini
2. Masuk ke directory project:

   ```bash
   cd student-grade-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Jalankan aplikasi:
   ```bash
   npm start
   ```

## 🎮 Cara Penggunaan

### Menu Utama

```
=================================
SISTEM MANAJEMEN NILAI SISWA
=================================
1. Tambah Siswa Baru
2. Lihat Semua Siswa
3. Cari Siswa
4. Update Data Siswa
5. Hapus Siswa
6. Tambah Nilai Siswa
7. Lihat Top 3 Siswa
8. Keluar
=================================
```

### Contoh Penggunaan

1. **Menambah Siswa Baru:**

   ```
   Masukkan ID Siswa: S001
   Masukkan Nama Siswa: Budi Santoso
   Masukkan Kelas: 10A
   ```

2. **Menambah Nilai:**

   ```
   Masukkan ID Siswa: S001
   Mata Pelajaran: Matematika
   Nilai (0-100): 85
   ```

3. **Melihat Top 3 Siswa:**
   - Menampilkan ranking siswa berdasarkan nilai rata-rata tertinggi
   - Dilengkapi dengan emoji medali (🥇🥈🥉)

## 💾 Sistem Penyimpanan

- Data secara otomatis disimpan ke file `data/students.json`
- Data otomatis dimuat saat aplikasi dijalankan
- Format penyimpanan: JSON array of student objects

## 🎯 Kriteria Penilaian

### OOP Implementation (40%)

- ✅ Penggunaan class dengan benar
- ✅ Encapsulation dengan private fields (`#property`)
- ✅ Method yang sesuai dengan tanggung jawab class
- ✅ Constructor yang tepat

### Functionality (40%)

- ✅ Semua fitur CRUD berfungsi
- ✅ Perhitungan rata-rata dan status kelulusan
- ✅ Pencarian dan sorting berfungsi
- ✅ Data persistence menggunakan file JSON

### Code Quality (20%)

- ✅ Clean code dan readable
- ✅ Error handling yang baik
- ✅ Validasi input
- ✅ Dokumentasi yang jelas

## 📊 Sistem Penilaian

- **Rentang Nilai:** 0-100
- **Status Kelulusan:**
  - Rata-rata ≥ 75: **LULUS** ✅
  - Rata-rata < 75: **TIDAK LULUS** ❌

## 🛠️ Teknologi yang Digunakan

- **JavaScript ES6+** dengan modul ES6
- **Object-Oriented Programming** (Class, Encapsulation)
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

## 🔧 Development

Untuk development mode dengan auto-restart:

```bash
# Jika ada script dev di package.json
npm run dev
```

## 🐛 Troubleshooting

### Error: "require is not defined"

- Pastikan menggunakan `import/export` bukan `require/module.exports`
- Pastikan `"type": "module"` ada di package.json

### File data tidak terbentuk

- Aplikasi akan membuat file secara otomatis saat pertama kali dijalankan
- Pastikan folder `data/` memiliki permission write

### Input tidak responsive

- Gunakan terminal yang mendukung readline-sync
- Hindari menggunakan IDE built-in terminal yang terbatas

## 👥 Author

Dibuat untuk memenuhi Challenge 4: Sistem Manajemen Nilai Siswa

## 📄 License

ISC License

---

**Selamat menggunakan Sistem Manajemen Nilai Siswa!** 🎓✨
