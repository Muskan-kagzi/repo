const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let alerts = [
  { id: uuidv4(), message: "Unusual movement detected", location: "Zone A", severity: "high", date: new Date() }
];

router.get("/", (req, res) => res.json(alerts));

router.post("/", (req, res) => {
  const { message, location, severity } = req.body;
  const newAlert = { id: uuidv4(), message: message || "Alert", location: location || null, severity: severity || "low", date: new Date() };
  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

module.exports = router;
