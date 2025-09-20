const express = require("express");
const router = express.Router();

// Mock sensors readings
const sensors = [
  { id: "s1", name: "Sensor 1", lat: 28.7, lng: 77.1, lastSeen: new Date(), value: 23.4 },
  { id: "s2", name: "Sensor 2", lat: 19.07, lng: 72.87, lastSeen: new Date(), value: 19.2 }
];

router.get("/", (req, res) => res.json(sensors));

module.exports = router;
