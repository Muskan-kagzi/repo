// const express = require("express");
// const router = express.Router();
// const { v4: uuidv4 } = require("uuid");

// // In-memory users (for demo)
// let users = [
//   { id: uuidv4(), username: "admin", password: "1234", name: "Admin User", role: "admin" }
// ];

// // POST /api/auth/login
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

//   // NOTE: in prod return JWT or session token
//   res.json({ success: true, user: { id: user.id, username: user.username, name: user.name, role: user.role } });
// });

// // POST /api/auth/register
// router.post("/register", (req, res) => {
//   const { username, password, name } = req.body;
//   if (users.find(u => u.username === username)) {
//     return res.status(400).json({ success: false, message: "Username exists" });
//   }
//   const newUser = { id: uuidv4(), username, password, name: name || username, role: "user" };
//   users.push(newUser);
//   res.json({ success: true, user: { id: newUser.id, username: newUser.username, name: newUser.name } });
// });

// module.exports = router;





// ----working---------------



const express = require("express");
const router = express.Router();

// Dummy users (replace later with DB)
const users = [
  { email: "operator@demo.com", password: "demo123", name: "Mining Operator" },
  { email: "inspector@demo.com", password: "demo123", name: "Inspection Team" },
  { email: "admin@demo.com", password: "demo123", name: "Main Admin" },
  { email: "site@demo.com", password: "demo123", name: "Site Admin" },
];

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.email === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  return res.json({
    success: true,
    user: {
      email: user.email,
      name: user.name,
    },
  });
});
module.exports = router;






