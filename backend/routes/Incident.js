// const express = require("express");
// const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

// let incidents = [
//   { id: uuidv4(), title: "Minor fire", location: "Zone B", status: "resolved", date: new Date(Date.now()-86400000) }
// ];

// router.get("/", (req, res) => res.json(incidents));

// router.post("/", (req, res) => {
//   const { title, location, description } = req.body;
//   const newIncident = { id: uuidv4(), title, location, description, status: "open", date: new Date() };
//   incidents.push(newIncident);
//   res.status(201).json(newIncident);
// });

// module.exports = router;









const express = require("express");
const Incident = require("../models/Incident");

const router = express.Router();

// Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Report new incident
router.post("/", async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json(incident);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Verify/update incident
router.put("/:id", async (req, res) => {
  try {
    const updated = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
