const mongoose = require("mongoose");

// This schema matches the Phase 4 deliverable exactly 
const emailSearchSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    domain: { 
        type: String, 
        required: true 
    },
    valid: { 
        type: Boolean, 
        default: false 
    },
    verifiedBy: { 
        type: String, 
        default: null 
    }
}, {
    // This option tells Mongoose to automatically add
    // the 'createdAt' field, as required by the task
    timestamps: true 
});

module.exports = mongoose.model("EmailSearch", emailSearchSchema);