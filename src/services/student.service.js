const Course = require('../models/course.model');
const Student = require('../models/student.model');

async function runStudentExamples() {
  // Create the related records before storing their IDs on students.
  const msc = await Course.create({ name: 'MScIT' });
  const bca = await Course.create({ name: 'BCA' });

  // Check a document without inserting it. Every other required field is valid.
  const invalid = new Student({
    studentId: 'TEST', name: 'Test', age: 20,
    course: msc._id, marks: 120, city: 'Surat'
  });
  try {
    await invalid.validate();
  } catch (error) {
    if (!error.errors?.marks) throw error;
    console.log('Expected marks validation error:', error.errors.marks.message);
  }

  const studentExists = await Student.exists({ studentId: 'TEST' });
  console.log('Invalid record inserted:', Boolean(studentExists));

  // Create: omit isActive; Mongoose supplies its default of true.
  const students = [
    { studentId: 'S01', name: 'Asha', age: 21, course: msc._id, marks: 82, city: 'Surat' },
    { studentId: 'S02', name: 'Ravi', age: 23, course: msc._id, marks: 58, city: 'Ahmedabad' },
    { studentId: 'S03', name: 'Neha', age: 20, course: bca._id, marks: 91, city: 'Surat' },
    { studentId: 'S04', name: 'Imran', age: 22, course: msc._id, marks: 70, city: 'Vadodara' },
    { studentId: 'S05', name: 'Kavya', age: 24, course: bca._id, marks: 45, city: 'Rajkot' }
  ];
  const inserted = await Student.insertMany(students);
  console.log('Inserted students:', inserted);

  const allStudents = await Student.find().populate('course', 'name');
  console.log('All students:', allStudents);

  const suratStudents = await Student.find({ city: 'Surat' }).populate('course', 'name');
  console.log('Students in Surat:', suratStudents);

  const highMarksStudents = await Student.find({ marks: { $gte: 70 } })
    .sort({ marks: -1 }).populate('course', 'name');
  console.log('Marks at least 70:', highMarksStudents);

  // Read one record by its unique studentId.
  const asha = await Student.findOne({ studentId: 'S01' }).populate('course', 'name');
  console.log('Found S01:', asha);

  // Update one record and display the returned, updated student.
  const ravi = await Student.findOneAndUpdate(
    { studentId: 'S02' }, { $set: { marks: 65 } },
    { returnDocument: 'after', runValidators: true }
  ).populate('course', 'name');
  
  console.log('Updated S02:', ravi);

  // BCA is stored as an ObjectId, so filter with bca._id.
  const updateResult = await Student.updateMany(
    { course: bca._id }, { $set: { isActive: false } },
    { runValidators: true }
  );
  // console.log('BCA students changed:', updateResult.modifiedCount);
  // console.log('BCA students:', await Student.find({ course: bca._id })
  //   .populate('course', 'name'));
  const bcaStudents = await Student.find({ course: bca._id }).populate('course', 'name');
  console.log('BCA students changed:', updateResult.modifiedCount);
  console.log('BCA students:', bcaStudents);

  // Delete S05, then confirm it is absent.
  const deletedS05 = await Student.findOneAndDelete({ studentId: 'S05' });
  console.log('Deleted S05:', deletedS05);
  const s05Exists = await Student.exists({ studentId: 'S05' });
  console.log('S05 still exists:', Boolean(s05Exists));
}

module.exports = { runStudentExamples };
