require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const leadRoutes = require('./routes/leadRoutes');
const dealRoutes = require('./routes/dealRoutes');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db'); // Add this import
const { connectPostgres } = require('./config/postgres');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware for JSON parsing
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Organization routes
const organizationRoutes = require('./routes/organizationRoutes');
app.use('/api/organizations', organizationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/deals', dealRoutes);


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