const express = require("express");
const router = express.Router();

/*
  GET /api/grid
  Simulation of energy grid stability and renewable mix.
*/
router.get("/", (req, res) => {
    res.json({
        totalLoad: "124.5 MW",
        renewableMix: 0.72,
        gridStability: "Stable",
        peakDemand: false,
        frequency: "50.02 Hz",
        energySource: [
            { type: "Solar", percentage: 0.45 },
            { type: "Wind", percentage: 0.27 },
            { type: "Thermal", percentage: 0.28 }
        ],
        lastUpdated: new Date().toISOString()
    });
});

module.exports = router;
