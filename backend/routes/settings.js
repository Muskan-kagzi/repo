const express = require("express");
const router = express.Router();

let settings = {
  notifications: true,
  theme: "light",
  alertThreshold: 0.7
};

router.get("/", (req, res) => res.json(settings));

router.put("/", (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

module.exports = router;
