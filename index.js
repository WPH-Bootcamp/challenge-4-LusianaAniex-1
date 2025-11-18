/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 */
import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Statistik Kelas');
  console.log('9. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  try {
    const id = readlineSync.question('Masukkan ID Siswa: ');
    const name = readlineSync.question('Masukkan Nama Siswa: ');
    const className = readlineSync.question('Masukkan Kelas: ');

    if (!id || !name || !className) {
      console.log('❌ Error: Semua field harus diisi!');
      return;
    }

    const student = new Student(id, name, className);
    const result = manager.addStudent(student);
    console.log('✅ ' + result);
  } catch (error) {
    console.log('❌ Error: ' + error.message);
  }
}

/**
 * Handler untuk melihat semua siswa
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');

  const allStudents = manager.getAllStudents();

  if (allStudents.length === 0) {
    console.log('📝 Tidak ada siswa yang terdaftar.');
    return;
  }

  allStudents.forEach((student, index) => {
    console.log(`\n📋 Siswa #${index + 1}:`);
    console.log(student.displayInfo());
    console.log('─'.repeat(40));
  });
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa yang dicari: ');

  if (!id) {
    console.log('❌ ID harus diisi!');
    return;
  }

  const student = manager.findStudent(id);

  if (student) {
    console.log('\n✅ Siswa ditemukan:');
    console.log(student.displayInfo());
  } else {
    console.log('❌ Siswa dengan ID "' + id + '" tidak ditemukan.');
  }
}

/**
 * Handler untuk update data siswa
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa yang akan diupdate: ');

  if (!id) {
    console.log('❌ ID harus diisi!');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log('❌ Siswa dengan ID "' + id + '" tidak ditemukan.');
    return;
  }

  console.log('\n📋 Data saat ini:');
  console.log(student.displayInfo());

  console.log('\nMasukkan data baru (kosongkan jika tidak ingin mengubah):');
  const newName = readlineSync.question(
    'Nama baru [' + student.getName() + ']: '
  );
  const newClass = readlineSync.question(
    'Kelas baru [' + student.getClassName() + ']: '
  );

  const updateData = {};
  if (newName) updateData.name = newName;
  if (newClass) updateData.className = newClass;

  if (Object.keys(updateData).length > 0) {
    try {
      const result = manager.updateStudent(id, updateData);
      console.log('✅ ' + result);
    } catch (error) {
      console.log('❌ Error: ' + error.message);
    }
  } else {
    console.log('ℹ️  Tidak ada perubahan yang dilakukan.');
  }
}

/**
 * Handler untuk menghapus siswa
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa yang akan dihapus: ');

  if (!id) {
    console.log('❌ ID harus diisi!');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log('❌ Siswa dengan ID "' + id + '" tidak ditemukan.');
    return;
  }

  console.log('\n📋 Data siswa yang akan dihapus:');
  console.log(student.displayInfo());

  const confirm = readlineSync.question(
    'Apakah Anda yakin ingin menghapus siswa ini? (y/N): '
  );

  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    try {
      const result = manager.removeStudent(id);
      console.log('✅ ' + result);
    } catch (error) {
      console.log('❌ Error: ' + error.message);
    }
  } else {
    console.log('ℹ️  Penghapusan dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');

  const id = readlineSync.question('Masukkan ID Siswa: ');

  if (!id) {
    console.log('❌ ID harus diisi!');
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log('❌ Siswa dengan ID "' + id + '" tidak ditemukan.');
    return;
  }

  console.log('\n📋 Data siswa:');
  console.log('Nama: ' + student.getName());
  console.log('Kelas: ' + student.getClassName());

  const subject = readlineSync.question('Mata Pelajaran: ');
  const scoreInput = readlineSync.question('Nilai (0-100): ');

  if (!subject || !scoreInput) {
    console.log('❌ Mata pelajaran dan nilai harus diisi!');
    return;
  }

  const score = parseFloat(scoreInput);

  if (isNaN(score)) {
    console.log('❌ Nilai harus berupa angka!');
    return;
  }

  try {
    const result = student.addGrade(subject, score);
    console.log('✅ ' + result);

    console.log('📊 Rata-rata baru: ' + student.getAverage());
    console.log('🎓 Status: ' + student.getGradeStatus());
  } catch (error) {
    console.log('❌ Error: ' + error.message);
  }
}

/**
 * Handler untuk melihat top students
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log('📝 Tidak ada siswa dengan nilai.');
    return;
  }

  console.log('🏆 SISWA TERBAIK BERDASARKAN NILAI RATA-RATA:\n');

  topStudents.forEach((student, index) => {
    const rank = index + 1;
    const emoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉';

    console.log(emoji + ` Peringkat ${rank}:`);
    console.log(student.displayInfo());
    console.log('⭐'.repeat(20));
  });
}
// Handler untuk melihat statistik kelas
function viewClassStatistics() {
  console.log('\n--- Statistik Kelas ---');

  const stats = manager.getClassStatistics();

  if (Object.keys(stats).length === 0) {
    console.log('📊 Tidak ada data statistik.');
    return;
  }

  Object.keys(stats).forEach((className) => {
    const classStat = stats[className];
    console.log(`\n📈 Kelas: ${className}`);
    console.log(`   Jumlah Siswa: ${classStat.count}`);
    console.log(`   Rata-rata Kelas: ${classStat.average}`);
    console.log(`   Lulus: ${classStat.passed}`);
    console.log(`   Tidak Lulus: ${classStat.failed}`);
  });
}

/**
 * Utility function untuk membersihkan console
 */
function clearConsole() {
  console.log('\n'.repeat(50));
}

/**
 * Main program loop
 */
async function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  // Load data yang tersimpan
  try {
    await manager.loadData();
  } catch (error) {}

  let running = true;

  while (running) {
    displayMenu();

    const choice = readlineSync.question('Pilih menu (1-8): ');

    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        viewClassStatistics();
        break;
      case '9': 
        console.log('\n💾 Menyimpan data...');
        await manager.saveData();
        running = false;
        break;
      default:
        console.log('❌ Pilihan tidak valid! Silakan pilih 1-8.');
        break;
    }

    if (running) {
      console.log('\n⏎ Tekan Enter untuk melanjutkan...');
      readlineSync.question('');
      clearConsole();
    }
  }

  console.log('\n👋 Terima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main().catch((error) => {
  console.error('❌ Terjadi error:', error);
  process.exit(1);
});
