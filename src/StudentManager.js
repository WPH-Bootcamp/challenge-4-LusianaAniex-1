import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Student from './Student.js';

// Fix untuk __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StudentManager {
  #students;
  #dataFile;

  constructor(dataFile = '../data/students.json') {
    this.#students = new Map();
    this.#dataFile = path.join(__dirname, dataFile);
    console.log(`📁 Data file: ${this.#dataFile}`);
  }

  // Data persistence methods
  async loadData() {
    try {
      console.log('🔍 Mencari file data...');
      const data = await fs.readFile(this.#dataFile, 'utf8');

      // Cek jika file kosong
      if (!data.trim()) {
        console.log('ℹ️  File data kosong, mulai dengan data baru.');
        return;
      }

      const studentsData = JSON.parse(data);

      // Cek jika tidak ada data siswa
      if (studentsData.length === 0) {
        console.log('ℹ️  Tidak ada data siswa, mulai dengan data kosong.');
        return;
      }

      studentsData.forEach((studentData) => {
        const student = Student.fromJSON(studentData);
        this.#students.set(student.getId(), student);
      });

      console.log(`✅ Data berhasil dimuat (${studentsData.length} siswa)`);
    } catch (error) {
      // If file doesn't exist, start with empty data
      if (error.code === 'ENOENT') {
        console.log('ℹ️  File data tidak ditemukan, membuat file baru...');
        await this.saveData(); // Buat file kosong
      } else if (error instanceof SyntaxError) {
        console.log('❌ File data corrupt, membuat file baru...');
        await this.saveData(); // Buat file baru
      } else {
        console.error('❌ Error loading data:', error.message);
      }
    }
  }

  async saveData() {
    try {
      const studentsArray = Array.from(this.#students.values()).map((student) =>
        student.toJSON()
      );

      // Buat folder jika belum ada
      const dataDir = path.dirname(this.#dataFile);
      await fs.mkdir(dataDir, { recursive: true });

      // Tulis data ke file
      await fs.writeFile(
        this.#dataFile,
        JSON.stringify(studentsArray, null, 2)
      );
      console.log(`💾 Data disimpan: ${studentsArray.length} siswa`);
    } catch (error) {
      console.error('❌ Error saving data:', error.message);
    }
  }

  // CRUD operations
  addStudent(student) {
    if (!(student instanceof Student)) {
      throw new Error('Parameter must be an instance of Student');
    }

    if (this.#students.has(student.getId())) {
      throw new Error(`Student with ID ${student.getId()} already exists`);
    }

    this.#students.set(student.getId(), student);
    return `Student ${student.getName()} added successfully`;
  }

  removeStudent(id) {
    if (!this.#students.has(id)) {
      throw new Error(`Student with ID ${id} not found`);
    }

    const studentName = this.#students.get(id).getName();
    this.#students.delete(id);
    return `Student ${studentName} removed successfully`;
  }

  findStudent(id) {
    return this.#students.get(id) || null;
  }

  updateStudent(id, updateData) {
    const student = this.findStudent(id);
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }

    const allowedUpdates = ['name', 'className'];
    const updates = Object.keys(updateData);
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdate) {
      throw new Error('Only name and className can be updated');
    }

    if (updateData.name) {
      student.setName(updateData.name);
    }
    if (updateData.className) {
      student.setClassName(updateData.className);
    }

    return `Student ${id} updated successfully`;
  }

  getAllStudents() {
    return Array.from(this.#students.values());
  }

  getTopStudents(n = 3) {
    const students = this.getAllStudents();

    return students
      .filter((student) => Object.keys(student.getGrades()).length > 0)
      .sort((a, b) => b.getAverage() - a.getAverage())
      .slice(0, n);
  }

  displayAllStudents() {
    const students = this.getAllStudents();

    if (students.length === 0) {
      return 'No students found';
    }

    let display = `=== DAFTAR SISWA ===\n`;
    students.forEach((student, index) => {
      display += student.displayInfo();
      if (index < students.length - 1) {
        display += '------------------------\n';
      }
    });

    return display;
  }

  // Statistics methods
  getClassStatistics() {
    const students = this.getAllStudents();
    const classStats = {};

    students.forEach((student) => {
      const className = student.getClassName();
      if (!classStats[className]) {
        classStats[className] = {
          count: 0,
          totalAverage: 0,
          passed: 0,
          failed: 0,
        };
      }

      classStats[className].count++;
      classStats[className].totalAverage += student.getAverage();

      if (student.getGradeStatus() === 'Lulus') {
        classStats[className].passed++;
      } else {
        classStats[className].failed++;
      }
    });

    // Calculate averages
    Object.keys(classStats).forEach((className) => {
      classStats[className].average =
        classStats[className].count > 0
          ? parseFloat(
              (
                classStats[className].totalAverage / classStats[className].count
              ).toFixed(2)
            )
          : 0;
      delete classStats[className].totalAverage;
    });

    return classStats;
  }

  // Get student count
  getStudentCount() {
    return this.#students.size;
  }
}

export default StudentManager;
