const mongoose = require("mongoose");

const domainSearchSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
    },
    // 1. ADDED: This 'status' field was missing 
    status: {
        type: String,
        default: 'active'
    },
    expirationDate: {
        type: String,
        default: null,
    },
    // We keep dnsRecords because your controller searches for it [cite: 70]
    dnsRecords: {
        A: { type: Array, default: [] },
        MX: { type: Array, default: [] },
        NS: { type: Array, default: [] }
    },
    // 2. REMOVED: The old 'timestamp' field is replaced by 'timestamps: true'
}, {
    // 3. ADDED: This automatically adds the 'createdAt' field 
    timestamps: true
});

module.exports = mongoose.model("DomainSearch", domainSearchSchema);