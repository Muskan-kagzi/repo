import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/run-pipeline", async (req, res) => {
  try {
    const response = await fetch("http://localhost:5001/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body), // forward bbox, year, etc.
    });

    const html = await response.text();
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pipeline execution failed" });
  }
});

export default router;
