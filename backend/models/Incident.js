// models/Incident.js
const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ["Low", "Medium", "High"], required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ["Reported", "Verified", "Rejected", "NeedsInfo"], default: "Reported" },
  reportedBy: { type: String, required: true },
  verificationNotes: { type: String },
  verifiedBy: { type: String },
  verifiedAt: { type: Date },
  attachments: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Incident", incidentSchema);
