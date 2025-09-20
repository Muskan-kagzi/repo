const express = require("express");
const router = express.Router();

// Mock locations for RiskMap
const locations = [
  { id: 1, name: "Zone A", lat: 28.7041, lng: 77.1025, risk: "high" },
  { id: 2, name: "Zone B", lat: 19.0760, lng: 72.8777, risk: "medium" },
  { id: 3, name: "Zone C", lat: 13.0827, lng: 80.2707, risk: "low" }
];

router.get("/", (req, res) => res.json(locations));

module.exports = router;
