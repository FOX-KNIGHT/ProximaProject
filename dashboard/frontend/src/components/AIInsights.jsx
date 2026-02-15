import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Lightbulb,
  BrainCircuit,
  Cpu,
  ShieldCheck,
  Activity,
  BarChart3,
  Globe2,
  Lock
} from "lucide-react";
import "./AIInsights.css";

const SolarisNeuralMetric = ({ title, value, unit, icon: Icon, delay, color = "var(--solaris-blue)" }) => (
  <motion.div
    className="solaris-neural-card glass-v3 interactive-card"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <div className="card-top">
      <div className="card-icon" style={{ background: color + "22", color }}>
        <Icon size={16} />
      </div>
      <span className="card-label">{title}</span>
    </div>
    <div className="card-body">
      <span className="card-val">{value}</span>
      <span className="card-unit">{unit}</span>
    </div>
  </motion.div>
);

function AIInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ai-insights");
        const data = await res.json();
        setInsights(data);
      } catch (err) {
        console.error("Neural link failure:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return (
    <div className="solaris-loader">
      <BrainCircuit className="animate-pulse text-blue-500" size={32} />
      <span>SYNCHRONIZING NEURAL ARRAYS...</span>
    </div>
  );

  return (
    <div className="solaris-neural-view">
      <div className="neural-grid">
        {/* Neural Engine Core */}
        <motion.div
          className="neural-engine-panel glass-v3-heavy span-2-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="panel-header">
            <div className="panel-tag blue">
              <BrainCircuit size={12} />
              <span>NEURAL CORE ALPHA</span>
            </div>
            <div className="accuracy-pill">
              <span>ACCURACY:</span>
              <span className="val">{Math.round(insights?.confidenceScore * 100)}%</span>
            </div>
          </div>

          <div className="core-logic-box">
            <div className="logic-icon">
              <Lightbulb size={24} className="text-amber-500" />
            </div>
            <div className="logic-content">
              <h3 className="logic-title">SYSTEM OPTIMIZATION RECOMMENDATION</h3>
              <p className="logic-desc">{insights?.aiDecision}</p>
            </div>
          </div>

          <div className="neural-viz-container">
            <div className="neural-nodes-sim" />
            <div className="target-sync-value">
              <div className="v-label">TARGET SYNC</div>
              <div className="v-number">{insights?.recommendedTemperature}°C</div>
            </div>
          </div>
        </motion.div>

        {/* Network Metrics */}
        <div className="metrics-side-panel span-2-2">
          <div className="panel-header">
            <div className="panel-tag emerald">
              <Activity size={12} />
              <span>LOAD TELEMETRY</span>
            </div>
          </div>

          <div className="load-tracks">
            {[...(insights?.usagePattern?.peakHours || []), ...(insights?.usagePattern?.lowUsageHours || [])].map((hour, idx) => (
              <div className="load-row" key={idx}>
                <div className="row-info">
                  <span className="time">{hour}</span>
                  <span className={`status ${idx < (insights?.usagePattern?.peakHours?.length || 0) ? 'peak' : 'nominal'}`}>
                    {idx < (insights?.usagePattern?.peakHours?.length || 0) ? 'PEAK' : 'NOMINAL'}
                  </span>
                </div>
                <div className="row-track">
                  <motion.div
                    className="fill"
                    initial={{ width: 0 }}
                    animate={{ width: idx < (insights?.usagePattern?.peakHours?.length || 0) ? "90%" : "35%" }}
                    transition={{ delay: 0.3, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="metrics-triad">
            <SolarisNeuralMetric
              title="Privacy Guard"
              value={insights?.carbonReduction?.co2SavedKgToday || 0}
              unit="KG"
              icon={Lock}
              delay={0.1}
              color="var(--solaris-emerald)"
            />
            <SolarisNeuralMetric
              title="Yield Optimized"
              value={insights?.energySavings?.today?.costSavedINR || 0}
              unit="INR"
              icon={Zap}
              delay={0.2}
              color="var(--solaris-amber)"
            />
          </div>
        </div>

        {/* Projection Summary */}
        <motion.div
          className="projection-footer glass-v3 span-full"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="proj-info">
            <div className="proj-icon">
              <BarChart3 size={20} />
            </div>
            <div>
              <div className="proj-title">LUNAR CYCLE PROJECTION</div>
              <div className="proj-meta">SYNAPTIC FORECAST · PROTOCOL 2.4</div>
            </div>
          </div>
          <div className="proj-stats">
            <div className="p-stat">
              <div className="p-label">ACCUMULATED CREDIT</div>
              <div className="p-val text-amber-500">₹{insights?.energySavings?.thisMonth?.costSavedINR || 0}</div>
            </div>
            <div className="v-divider" />
            <div className="p-stat">
              <div className="p-label">EMISSION OFFSET</div>
              <div className="p-val text-blue-500">{insights?.carbonReduction?.co2SavedKgMonth || 0} KG</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AIInsights;
