

require('dotenv').config();
const { connectDatabase, disconnectDatabase } = require('./config/database');
const { runStudentExamples } = require('./services/student.service');

async function main() {
  try {
    await connectDatabase();
    await runStudentExamples();
  } catch (error) {
    console.error('Connection or operation failed:', error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

main();
