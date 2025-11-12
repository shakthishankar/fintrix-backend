const mongoose = require("mongoose");

const emailSearchSchema = new mongoose.Schema({
  email: { type: String, required: true },
  domain: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmailSearch", emailSearchSchema);
