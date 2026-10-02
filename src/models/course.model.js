const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, 
  required: true, 
  enum: ['MScIT', 'BCA'], 
  unique: true }
});

const Course = mongoose.model('Course', courseSchema, 'courses');

module.exports = Course;