const express = require("express");
const router = express.Router();

// Mock dashboard summary data
router.get("/", (req, res) => {
  res.json({
    totalUsers: 128,
    activeSensors: 32,
    openAlerts: 6,
    incidentsToday: 2
  });
});

module.exports = router;
