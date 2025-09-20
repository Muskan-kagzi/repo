const express = require("express");
const router = express.Router();

// Mock forecast/prediction data
router.get("/", (req, res) => {
  res.json({
    generatedAt: new Date(),
    forecasts: [
      { area: "Zone A", riskScore: 0.85, next24h: "high" },
      { area: "Zone B", riskScore: 0.45, next24h: "medium" }
    ]
  });
});

module.exports = router;
