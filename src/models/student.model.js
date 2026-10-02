const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18 },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  marks: { type: Number, required: true, min: 0, max: 100 },
  city: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;
