const axios = require("axios");

exports.getAIRecommendations = async (req, res) => {
  try {
    const aiURL = process.env.AI_URL;
    const response = await axios.post(aiURL, req.body);

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "AI Service Error",
      error: err.message,
    });
  }
};
