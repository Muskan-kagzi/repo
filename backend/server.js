// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json()); // to parse JSON body

// // Auth routes
// app.use("/api/auth", require("./routes/auth"));

// app.listen(PORT, () => {
//   console.log(`✅ Backend running on http://localhost:${PORT}`);
// });




const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // ✅ for MongoDB
console.log("✅ MongoDB Connected1")
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body
console.log("✅ MongoDB Connected2");
// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/rockfallai", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected3"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));       // Auth routes
app.use("/api/incidents", require("./routes/Incident")); // Incident routes

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});


