const mongoose = require("mongoose");

const domainSearchSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: String,
        default: null,
    },
    dnsRecords: {
        A: { type: Array, default: [] },
        MX: { type: Array, default: [] },
        NS: { type: Array, default: [] }
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("DomainSearch", domainSearchSchema);