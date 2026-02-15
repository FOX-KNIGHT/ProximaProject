const express = require("express");
const cors = require("cors");

const statusRoutes = require("./routes/status");
const aiInsightsRoutes = require("./routes/aiInsights");
const integrityRoutes = require("./routes/integrity");
const gridRoutes = require("./routes/grid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/status", statusRoutes);
app.use("/api/ai-insights", aiInsightsRoutes);
app.use("/api/integrity", integrityRoutes);
app.use("/api/grid", gridRoutes);



app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
    services: {
      status: "functional",
      ai: "optimized",
      integrity: "shielded",
      grid: "synchronized"
    }
  });
});

app.get("/", (req, res) => {
  res.send("Aetheris Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
