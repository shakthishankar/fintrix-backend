const mongoose = require("mongoose");

const emailSearchSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  domain: { 
    type: String, 
    required: true 
  },
  // --- ADDED ---
  // This stores the result of the verification (true or false)
  valid: {
    type: Boolean,
    required: true
  },
  // This will link to the user who ran the search
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // --- END ADDED ---
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("EmailSearch", emailSearchSchema);