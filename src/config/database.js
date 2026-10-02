const mongoose = require('mongoose');

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    throw new Error('Set MONGODB_URI and DB_NAME in .env file');
  }

  await mongoose.connect(uri, { dbName });
  console.log(`Connected to ${dbName}`);
}

async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log('Connection closed');
}

module.exports = { connectDatabase, disconnectDatabase };
