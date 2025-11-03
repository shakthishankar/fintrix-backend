require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Add this import
const { connectPostgres } = require('./config/postgres');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware for JSON parsing
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'running' });
});

const startServer = async () => {
  try {
    await connectDB();        // Wait for MongoDB to connect
    await connectPostgres();  // Wait for PostgreSQL to connect
    app.listen(PORT, () => {
      console.log(`🚀 Fintrix Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();