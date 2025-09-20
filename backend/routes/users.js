const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// This users list is the same as auth.users in-memory; for simplicity replicate a local list
let users = [
  { id: uuidv4(), username: "admin", name: "Admin User", role: "admin" }
];

router.get("/", (req, res) => res.json(users));

router.post("/", (req, res) => {
  const { username, name, role } = req.body;
  const newUser = { id: uuidv4(), username, name, role: role || "user" };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ message: "User not found" });
  users[idx] = { ...users[idx], ...data };
  res.json(users[idx]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.json({ success: true });
});

module.exports = router;
