require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Add this import

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware for JSON parsing
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'running' });
});

// Connect to MongoDB first
connectDB();

// Then start the server
app.listen(PORT, () => {
  console.log(`Fintrix Backend server running on port ${PORT}`);
});