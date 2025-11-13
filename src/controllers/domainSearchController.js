const whois = require("whois-json");
const dns = require("dns").promises;
const DomainSearch = require("../models/domainSearchModel");

exports.domainSearch = async (req, res) => {
    try {
        const { domain } = req.body;

        if (!domain) {
            return res.status(400).json({
                success: false,
                message: "Domain is required"
            });
        }

        // WHOIS lookup
        const whoisData = await whois(domain);

        // Extract expiration date
        const expirationDate =
            whoisData?.expires ||
            whoisData["Expiration Date"] ||
            whoisData["Registry Expiry Date"] ||
            null;

        // DNS lookups
        let dnsA = [];
        let dnsMX = [];
        let dnsNS = [];

        try {
            dnsA = await dns.resolve(domain, "A");
        } catch { }

        try {
            dnsMX = await dns.resolve(domain, "MX");
        } catch { }

        try {
            dnsNS = await dns.resolve(domain, "NS");
        } catch { }

        // Save to MongoDB
        const record = await DomainSearch.create({
            domain,
            expirationDate,
            dnsRecords: {
                A: dnsA,
                MX: dnsMX,
                NS: dnsNS
            }
        });

        return res.json({
            success: true,
            data: {
                domain,
                expirationDate,
                dnsRecords: {
                    A: dnsA,
                    MX: dnsMX,
                    NS: dnsNS
                },
                timestamp: record.timestamp
            },
            recordId: record._id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};