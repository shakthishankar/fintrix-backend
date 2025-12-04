const express = require("express");
const {
  storeOnChain,
  fetchFromChain,
} = require("../controllers/blockchainController");

const router = express.Router();

// Matches the blockchain_integration_project endpoints:
router.post("/store", storeOnChain);
router.get("/fetch/:id", fetchFromChain);

module.exports = router;
