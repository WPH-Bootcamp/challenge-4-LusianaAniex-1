/**
 * Main Application - CLI Interface with Chalk Colors
 */
import readlineSync from 'readline-sync';
import chalk from 'chalk';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

// Color themes
const theme = {
  title: chalk.hex('#FF6B6B').bold,
  menu: chalk.hex('#4ECDC4'),
  success: chalk.hex('#1DD1A1').bold,
  error: chalk.hex('#FF9FF3').bold,
  warning: chalk.hex('#FECA57'),
  info: chalk.hex('#54A0FF'),
  highlight: chalk.hex('#FF9FF3').bold,
  border: chalk.hex('#00D2D3'),
  emoji: chalk.hex('#FF9FF3'),
};

/**
 * Utility untuk membuat border
 */
function createBox(title, width = 40) {
  const border = '='.repeat(width);
  // Remove emojis for consistent centering
  const cleanTitle = title.replace(/[🎯🔍✏️📊🏆📈👥🗑️]/g, '').trim();
  // Pre-calculated centered titles untuk konsistensi
  const centeredTitles = {
    'HAPUS SISWA': '         HAPUS SISWA         ',
    'TAMBAH SISWA BARU': '     TAMBAH SISWA BARU     ',
    'CARI SISWA': '           CARI SISWA          ',
    'UPDATE DATA SISWA': '     UPDATE DATA SISWA     ',
    'TAMBAH NILAI SISWA': '    TAMBAH NILAI SISWA    ',
    'TOP 3 SISWA TERBAIK': '   TOP 3 SISWA TERBAIK   ',
    'STATISTIK KELAS': '       STATISTIK KELAS      ',
    'DAFTAR SEMUA SISWA': '    DAFTAR SEMUA SISWA    ',
    'SISTEM MANAJEMEN NILAI SISWA': 'SISTEM MANAJEMEN NILAI SISWA',
  };

  const centeredTitle = centeredTitles[cleanTitle] || cleanTitle;

  return `+${border}+\n|${centeredTitle}|\n+${border}+`;
}

/**
 * Utility untuk garis pemisah
 */
function createLine(length = 40) {
  return '-'.repeat(length);
}

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log(theme.border(createBox('SISTEM MANAJEMEN NILAI SISWA', 44)));
  console.log(theme.menu('1. Tambah Siswa Baru'));
  console.log(theme.menu('2. Lihat Semua Siswa'));
  console.log(theme.menu('3. Cari Siswa'));
  console.log(theme.menu('4. Update Data Siswa'));
  console.log(theme.menu('5. Hapus Siswa'));
  console.log(theme.menu('6. Tambah Nilai Siswa'));
  console.log(theme.menu('7. Lihat Top 3 Siswa'));
  console.log(theme.menu('8. Statistik Kelas'));
  console.log(theme.menu('9. Keluar & Simpan'));
  console.log(theme.border('='.repeat(44)));
}

/**
 * Handler untuk menambah siswa baru
 */
async function addNewStudent() {
  console.log(theme.border(createBox(' TAMBAH SISWA BARU', 30)));

  try {
    const id = readlineSync.question(theme.highlight('Masukkan ID Siswa: '));
    const name = readlineSync.question(
      theme.highlight('Masukkan Nama Siswa: ')
    );
    const className = readlineSync.question(
      theme.highlight('Masukkan Kelas: ')
    );

    if (!id || !name || !className) {
      console.log(theme.error('❌ Error: Semua field harus diisi!'));
      return;
    }

    const student = new Student(id, name, className);
    const result = manager.addStudent(student);
    console.log(theme.success('✅ ' + result));
    // Auto save
    await manager.saveData();
  } catch (error) {
    console.log(theme.error('❌ Error: ' + error.message));
  }
}

/**
 * Handler untuk melihat semua siswa
 */
function viewAllStudents() {
  console.log(theme.border(createBox('DAFTAR SEMUA SISWA', 32)));
  const allStudents = manager.getAllStudents();

  if (allStudents.length === 0) {
    console.log(theme.warning('📝 Tidak ada siswa yang terdaftar.'));
    return;
  }
  console.log(theme.info(`📊 Total: ${allStudents.length} siswa\n`));

  allStudents.forEach((student, index) => {
    const average = student.getAverage();
    const status = student.getGradeStatus();
    const statusColor = status === 'Lulus' ? theme.success : theme.error;

    console.log(theme.highlight(`Siswa #${index + 1}`));
    console.log(displayStudentWithColor(student));
    console.log(statusColor(`Status: ${status}`));
    console.log(theme.border('-'.repeat(50)));
  });
}

/**
 * Format student info dengan warna
 */
function displayStudentWithColor(student) {
  const subjects = Object.keys(student.getGrades());
  let info = theme.info(`ID: ${student.getId()}\n`);
  info += theme.info(`Nama: ${student.getName()}\n`);
  info += theme.info(`Kelas: ${student.getClassName()}\n`);

  if (subjects.length > 0) {
    info += theme.info('Mata Pelajaran:\n');
    subjects.forEach((subject) => {
      const score = student.getGrades()[subject];
      const scoreColor =
        score >= 75 ? theme.success : score >= 60 ? theme.warning : theme.error;
      info += `  - ${subject}: ${scoreColor(score)}\n`;
    });
    info += theme.info(`Rata-rata: ${theme.highlight(student.getAverage())}\n`);
  } else {
    info += theme.warning('Belum ada nilai yang dimasukkan\n');
  }

  return info;
}
/**
 * Handler untuk mencari siswa berdasarkan ID
 */
function searchStudent() {
  console.log(theme.border(createBox(' CARI SISWA', 24)));
  const id = readlineSync.question(
    theme.highlight('Masukkan ID Siswa yang dicari: ')
  );

  if (!id) {
    console.log(theme.error('❌ ID harus diisi!'));
    return;
  }

  const student = manager.findStudent(id);

  if (student) {
    const status = student.getGradeStatus();
    const statusColor = status === 'Lulus' ? theme.success : theme.error;

    console.log(theme.success('\n✅ Siswa ditemukan:'));
    console.log(displayStudentWithColor(student));
    console.log(statusColor(`Status: ${status}`));
  } else {
    console.log(theme.error(`❌ Siswa dengan ID "${id}" tidak ditemukan.`));
  }
}

/**
 * Handler untuk update data siswa
 */
async function updateStudent() {
  console.log(theme.border(createBox(' UPDATE DATA SISWA', 30)));

  const id = readlineSync.question(
    theme.highlight('Masukkan ID Siswa yang akan diupdate: ')
  );

  if (!id) {
    console.log(theme.error('❌ ID harus diisi!'));
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(theme.error(`❌ Siswa dengan ID "${id}" tidak ditemukan.`));
    return;
  }

  console.log(theme.success('\n📋 Data saat ini:'));
  console.log(displayStudentWithColor(student));
  console.log(
    theme.info('\nMasukkan data baru (kosongkan jika tidak ingin mengubah):')
  );
  const newName = readlineSync.question(
    theme.highlight(`Nama baru [${student.getName()}]: `)
  );
  const newClass = readlineSync.question(
    theme.highlight(`Kelas baru [${student.getClassName()}]: `)
  );

  const updateData = {};
  if (newName) updateData.name = newName;
  if (newClass) updateData.className = newClass;

  if (Object.keys(updateData).length > 0) {
    try {
      const result = manager.updateStudent(id, updateData);
      console.log(theme.success('✅ ' + result));
      await manager.saveData();
    } catch (error) {
      console.log(theme.error('❌ ' + error.message));
    }
  } else {
    console.log(theme.warning('ℹ️ Tidak ada perubahan yang dilakukan.'));
  }
}

/**
 * Handler untuk menghapus siswa
 */
async function deleteStudent() {
  console.log(theme.border(createBox('HAPUS SISWA', 30)));

  const id = readlineSync.question(
    theme.highlight('Masukkan ID Siswa yang akan dihapus: ')
  );

  if (!id) {
    console.log(theme.error('❌ ID harus diisi!'));
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(theme.error(`❌ Siswa dengan ID "${id}" tidak ditemukan.`));
    return;
  }

  console.log(theme.warning('\n⚠️ Data siswa yang akan dihapus:'));
  console.log(displayStudentWithColor(student));

  const confirm = readlineSync.question(
    theme.highlight('🚨Apakah Anda yakin ingin menghapus siswa ini? (y/N): ')
  );

  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    try {
      const result = manager.removeStudent(id);
      console.log(theme.success('✅ ' + result));
      await manager.saveData();
    } catch (error) {
      console.log(theme.error('❌ ' + error.message));
    }
  } else {
    console.log(theme.info('ℹ️ Penghapusan dibatalkan.'));
  }
}

/**
 * Handler untuk menambah nilai siswa
 */
async function addGradeToStudent() {
  console.log(theme.border(createBox(' TAMBAH NILAI SISWA', 32)));
  const id = readlineSync.question(theme.highlight('Masukkan ID Siswa: '));

  if (!id) {
    console.log(theme.error('❌ ID harus diisi!'));
    return;
  }

  const student = manager.findStudent(id);

  if (!student) {
    console.log(theme.error(`❌ Siswa dengan ID "${id}" tidak ditemukan.`));
    return;
  }

  console.log(theme.success('\n📋 Data siswa:'));
  console.log(`👤 ${theme.info('Nama:')} ${student.getName()}`);
  console.log(`🏫 ${theme.info('Kelas:')} ${student.getClassName()}`);

  const subject = readlineSync.question(theme.highlight('Mata Pelajaran: '));
  const scoreInput = readlineSync.question(theme.highlight('Nilai (0-100): '));

  if (!subject || !scoreInput) {
    console.log(theme.error('❌ Mata pelajaran dan nilai harus diisi!'));
    return;
  }

  const score = parseFloat(scoreInput);

  if (isNaN(score)) {
    console.log(theme.error('❌ Nilai harus berupa angka!'));
    return;
  }

  try {
    const result = student.addGrade(subject, score);
    console.log(theme.success('✅ ' + result));

    console.log(theme.info('📊 Rata-rata baru: ' + student.getAverage()));
    console.log(theme.info(' Status: ' + student.getGradeStatus()));
    await manager.saveData();
  } catch (error) {
    console.log(theme.error('❌ ' + error.message));
  }
}

/**
 * Handler untuk melihat top students
 */
function viewTopStudents() {
  console.log(theme.border(createBox(' TOP 3 SISWA TERBAIK', 34)));

  const topStudents = manager.getTopStudents(3);

  if (topStudents.length === 0) {
    console.log(theme.info('📝 Tidak ada siswa dengan nilai.'));
    return;
  }

  console.log(theme.info('🏆 SISWA TERBAIK BERDASARKAN NILAI RATA-RATA:\n'));

  topStudents.forEach((student, index) => {
    const rank = index + 1;
    const average = student.getAverage();
    const status = student.getGradeStatus();

    // Ranking emoji dan warna
    let rankEmoji, rankColor;
    switch (rank) {
      case 1:
        rankEmoji = '🥇';
        rankColor = chalk.hex('#FFD700').bold; // Gold
        break;
      case 2:
        rankEmoji = '🥈';
        rankColor = chalk.hex('#C0C0C0').bold; // Silver
        break;
      case 3:
        rankEmoji = '🥉';
        rankColor = chalk.hex('#CD7F32').bold; // Bronze
        break;
    }

    console.log(rankColor(`${rankEmoji} PERINGKAT ${rank}`));
    console.log(displayStudentWithColor(student));

    const statusColor = status === 'Lulus' ? theme.success : theme.error;
    console.log(statusColor(`🎓 Status: ${status}`));
    console.log(theme.border('+'.repeat(40)));
  });
}
// Handler untuk melihat statistik kelas
function viewClassStatistics() {
  console.log(theme.border(createBox(' STATISTIK KELAS', 28)));

  const stats = manager.getClassStatistics();

  if (Object.keys(stats).length === 0) {
    console.log(theme.warning('📊 Tidak ada data statistik.'));
    return;
  }

  Object.keys(stats).forEach((className) => {
    const classStat = stats[className];
    console.log(theme.highlight(`\n🏫 Kelas: ${className}`));
    console.log(theme.info(`   👥 Jumlah Siswa: ${classStat.count}`));
    console.log(theme.info(`   📊 Rata-rata Kelas: ${classStat.average}`));

    const passedColor = classStat.passed > 0 ? theme.success : theme.warning;
    const failedColor = classStat.failed > 0 ? theme.error : theme.info;

    console.log(passedColor(`   ✅ Lulus: ${classStat.passed}`));
    console.log(failedColor(`   ❌ Tidak Lulus: ${classStat.failed}`));

    // Progress bar untuk persentase kelulusan
    const total = classStat.count;
    if (total > 0) {
      const passPercentage = (classStat.passed / total) * 100;
      const barLength = 20;
      const filled = Math.round((passPercentage / 100) * barLength);
      const bar = '#'.repeat(filled) + '-'.repeat(barLength - filled);
      const percentageColor =
        passPercentage >= 75
          ? theme.success
          : passPercentage >= 50
          ? theme.warning
          : theme.error;
      console.log(
        theme.info(
          `   📈 Kelulusan: [${bar}] ${percentageColor(
            passPercentage.toFixed(1) + '%'
          )}`
        )
      );
    }
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
  // Clear console pertama kali
  clearConsole();
  // Welcome banner
  console.log(theme.border('========================================'));
  console.log(theme.title('      SELAMAT DATANG DI'));
  console.log(theme.title('  SISTEM MANAJEMEN NILAI SISWA'));
  console.log(theme.border('========================================'));

  // Load data yang tersimpan
  try {
    await manager.loadData();
    const count = manager.getStudentCount();
    console.log(theme.success(`✅ Data berhasil dimuat! (${count} siswa)`));
  } catch (error) {
    console.log(theme.warning('ℹ️ Mulai dengan data baru...'));
  }

  let running = true;

  while (running) {
    displayMenu();

    const choice = readlineSync.question(
      theme.highlight('\n🎯 Pilih menu (1-9): ')
    );

    switch (choice) {
      case '1':
        await addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        await updateStudent();
        break;
      case '5':
        await deleteStudent();
        break;
      case '6':
        await addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        viewClassStatistics();
        break;
      case '9':
        console.log(theme.info('\n💾 Menyimpan data...'));
        await manager.saveData();
        running = false;
        break;
      default:
        console.log(theme.error('❌ Pilihan tidak valid! Silakan pilih 1-9.'));
        break;
    }

    if (running && choice >= '1' && choice <= '8') {
      console.log(theme.highlight('\n⏎ Tekan Enter untuk melanjutkan...'));
      readlineSync.question('');
      clearConsole();
    }
  }

  // Goodbye message
  console.log(theme.border('========================================'));
  console.log(theme.title('     TERIMA KASIH TELAH MENGGUNAKAN'));
  console.log(theme.title('          APLIKASI KAMI! 👋'));
  console.log(theme.border('========================================'));
}

// Global error handling
process.on('uncaughtException', (error) => {
  console.log(theme.error('🚨 Terjadi error tak terduga: ' + error.message));
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(theme.error('🚨 Terjadi rejection: ' + reason));
});

// Jalankan aplikasi
main().catch((error) => {
  console.error(theme.error('❌ Terjadi error:'), error);
  process.exit(1);
});
