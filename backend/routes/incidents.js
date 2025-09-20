const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let incidents = [
  { id: uuidv4(), title: "Minor fire", location: "Zone B", status: "resolved", date: new Date(Date.now()-86400000) }
];

router.get("/", (req, res) => res.json(incidents));

router.post("/", (req, res) => {
  const { title, location, description } = req.body;
  const newIncident = { id: uuidv4(), title, location, description, status: "open", date: new Date() };
  incidents.push(newIncident);
  res.status(201).json(newIncident);
});

module.exports = router;
