const mongoose = require('mongoose');

// Import MONGO_URI from .env
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // 🚀 Modern drivers don't need extra options
    console.log('✅ MongoDB connected: Fintrix DB ready for fintech action!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
