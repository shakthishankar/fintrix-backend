// /src/models/domainSearchModel.js

const mongoose = require("mongoose");

const domainSearchSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
        trim: true // Added for good practice
    },
    expirationDate: {
        type: String,
        default: null,
    },
    dnsRecords: {
        A: { type: [String], default: [] }, // More specific type
        MX: { type: [Object], default: [] }, // Saves the full MX record objects
        NS: { type: [String], default: [] }
    },
    // This field is correctly named to match your controller
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("DomainSearch", domainSearchSchema);