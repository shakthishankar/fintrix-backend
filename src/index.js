require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dealRoutes = require("./routes/dealRoutes");
const emailSearchRoutes = require("./routes/emailSearchRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/ai.routes");

const express = require("express");
const { initBlockchain } = require("./config/blockchain");
const blockchainRoutes = require("./routes/blockchain.routes");

const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db"); // Add this import
const { connectPostgres } = require("./config/postgres");

// AI Microservice Health Check
const axios = require("axios");

async function checkAIService() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/health");
    console.log("✅ AI Microservice Connected:", res.data);
  } catch (err) {
    console.log("❌  AI Microservice Not Reachable:", err.message);
  }
}
checkAIService();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware for JSON parsing
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Organization routes
const organizationRoutes = require("./routes/organizationRoutes");
app.use("/api/organizations", organizationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/deals", dealRoutes);

// Email Search and auth routes

app.use("/api/email-search", emailSearchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

//Domain Search routes
const domainSearchRoutes = require("./routes/domainSearchRoutes");
app.use("/api", domainSearchRoutes);
// Blockchain routes
initBlockchain(); // Initialize blockchain connection
app.use("/api/blockchain", blockchainRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "running" });
});

const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB to connect
    await connectPostgres(); // Wait for PostgreSQL to connect
    app.listen(PORT, () => {
      console.log(`🚀 Fintrix Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
