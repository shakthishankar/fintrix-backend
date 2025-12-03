const express = require("express");
const { getAIRecommendations } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/recommend", getAIRecommendations);

module.exports = router;
