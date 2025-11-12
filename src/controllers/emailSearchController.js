const dns = require("dns").promises;           // built-in module, safe
const EmailSearch = require("../models/emailSearchModel");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.emailSearch = async (req, res) => {
  try {
    const { email } = req.body;

    // --- 1️⃣ Validate input ---
    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // --- 2️⃣ Check syntax ---
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        email,
        valid: false,
        message: "Invalid email format"
      });
    }

    const domain = email.split("@")[1];
    let valid = false;

    // --- 3️⃣ Check MX records (mail servers) ---
    try {
      const mxRecords = await dns.resolveMx(domain);
      valid = Array.isArray(mxRecords) && mxRecords.length > 0;
    } catch (err) {
      valid = false; // domain has no MX record
    }

    // --- 4️⃣ Save search result ---
    const record = await EmailSearch.create({
      email,
      domain,
      valid
    });

    // --- 5️⃣ Respond cleanly ---
    res.status(200).json({
      success: true,
      data: {
        email,
        domain,
        valid,
        timestamp: new Date()
      },
      recordId: record._id
    });
  } catch (error) {
    console.error("Email search error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
