class Student {
  #id;
  #name;
  #className;
  #grades;

  constructor(id, name, className) {
    this.#validateInput(id, name, className);

    this.#id = id;
    this.#name = name;
    this.#className = className;
    this.#grades = {};
  }

  // Private method for input validation
  #validateInput(id, name, className) {
    if (!id || typeof id !== 'string') {
      throw new Error('ID must be a non-empty string');
    }
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    if (
      !className ||
      typeof className !== 'string' ||
      className.trim().length === 0
    ) {
      throw new Error('Class name must be a non-empty string');
    }
  }

  // Public methods
  addGrade(subject, score) {
    if (
      !subject ||
      typeof subject !== 'string' ||
      subject.trim().length === 0
    ) {
      throw new Error('Subject must be a non-empty string');
    }
    if (typeof score !== 'number' || score < 0 || score > 100) {
      throw new Error('Score must be a number between 0 and 100');
    }

    this.#grades[subject] = score;
    return `Grade ${score} for ${subject} added successfully`;
  }

  getAverage() {
    const subjects = Object.keys(this.#grades);
    if (subjects.length === 0) {
      return 0;
    }

    const total = subjects.reduce(
      (sum, subject) => sum + this.#grades[subject],
      0
    );
    return parseFloat((total / subjects.length).toFixed(2));
  }

  getGradeStatus() {
    const average = this.getAverage();
    return average >= 75 ? 'Lulus' : 'Tidak Lulus';
  }

  displayInfo() {
    const subjects = Object.keys(this.#grades);
    let info = `ID: ${this.#id}\n`;
    info += `Nama: ${this.#name}\n`;
    info += `Kelas: ${this.#className}\n`;

    if (subjects.length > 0) {
      info += `Mata Pelajaran:\n`;
      subjects.forEach((subject) => {
        info += `  - ${subject}: ${this.#grades[subject]}\n`;
      });
      info += `Rata-rata: ${this.getAverage()}\n`;
      info += `Status: ${this.getGradeStatus()}\n`;
    } else {
      info += `Belum ada nilai yang dimasukkan\n`;
    }

    return info;
  }

  // Getters
  getId() {
    return this.#id;
  }
  getName() {
    return this.#name;
  }
  getClassName() {
    return this.#className;
  }
  getGrades() {
    return { ...this.#grades };
  }

  // Setters with validation
  setName(name) {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    this.#name = name;
  }

  setClassName(className) {
    if (
      !className ||
      typeof className !== 'string' ||
      className.trim().length === 0
    ) {
      throw new Error('Class name must be a non-empty string');
    }
    this.#className = className;
  }

  // For JSON serialization
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      className: this.#className,
      grades: this.#grades,
    };
  }

  // Static method to create from JSON
  static fromJSON(data) {
    const student = new Student(data.id, data.name, data.className);
    Object.keys(data.grades || {}).forEach((subject) => {
      student.addGrade(subject, data.grades[subject]);
    });
    return student;
  }
}

export default Student;
