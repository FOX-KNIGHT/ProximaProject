import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Thermometer,
  CloudSun,
  Users,
  MapPin,
  Power,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Activity,
  Cpu,
  Zap,
  ShieldCheck
} from "lucide-react";
import "./LiveStatus.css";

const SolarisStat = ({ title, value, icon: Icon, delay, trend, color = "var(--proxima-cyan)" }) => (
  <motion.div
    className="solaris-stat-box glass-v3 interactive-card"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="stat-row">
      <div className="stat-label">
        <Icon size={12} style={{ color }} />
        <span>{title}</span>
      </div>
      {trend && (
        <div className={`stat-trend ${trend > 0 ? "up" : "down"}`}>
          {trend > 0 ? "+" : ""}{trend}%
        </div>
      )}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-visual">
      <div className="stat-bar-bg">
        <motion.div
          className="stat-bar-fill"
          style={{ background: color, color }}
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ delay: delay + 0.2, duration: 1 }}
        />
      </div>
    </div>
  </motion.div>
);

function LiveStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setTemp, setSetTemp] = useState(24);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStatus = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("http://localhost:5000/api/status");
      const data = await res.json();
      setStatus(data);
      setSetTemp(data.setTemperature);
    } catch (err) {
      console.error("Telemetry link failure:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setIsSyncing(false);
      }, 800);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  if (loading && !status) return (
    <div className="solaris-loader">
      <Activity className="animate-spin" size={32} />
      <span className="loader-text">Initializing Proxima Link...</span>
    </div>
  );

  return (
    <div className="solaris-dashboard">
      <div className="dashboard-grid">
        {/* Core Drive - Quantum Reactor Interface */}
        <motion.div
          className="core-drive-panel glass-v3 span-2-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="panel-header">
            <div className="panel-tag">
              <Zap size={10} />
              <span>Quantum Reactor • Alpha</span>
            </div>
            <button className={`sync-btn ${isSyncing ? "syncing" : ""}`} onClick={fetchStatus}>
              <RefreshCw size={14} />
            </button>
          </div>

          <div className="core-visualization">
            <div className="drive-rings">
              <div className="ring ring-1" />
              <div className="ring ring-2" />
              <div className="ring ring-3" />
            </div>
            <div className="temp-display">
              <div className="temp-label">Target Resonance</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={setTemp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="temp-number"
                >
                  {setTemp}<span>°C</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="drive-controls">
            <div className="stepper-group">
              <button onClick={() => setSetTemp(t => t - 1)} className="control-btn hover:text-red-400 Transition-all"><ChevronDown size={18} /></button>
              <div className="v-divider" />
              <button onClick={() => setSetTemp(t => t + 1)} className="control-btn hover:text-cyan-400 Transition-all"><ChevronUp size={18} /></button>
            </div>
            <button className="ignition-btn">
              <Power size={16} />
              <span>Engage Reactor</span>
            </button>
          </div>
        </motion.div>

        {/* Vital Metrics Range */}
        <div className="metrics-column span-2-2">
          <div className="metrics-header">
            <Cpu size={14} />
            <span>Telemetry Streams</span>
          </div>
          <div className="metrics-subgrid">
            <SolarisStat
              title="Ambient Node"
              value={`${status?.indoorTemperature || "--"}°C`}
              icon={Thermometer}
              delay={0.1}
              trend={1.2}
            />
            <SolarisStat
              title="Neural Load"
              value={status?.occupancy || "None"}
              icon={Users}
              delay={0.2}
              color="var(--proxima-violet)"
            />
            <SolarisStat
              title="External Flux"
              value={`${status?.outdoorTemperature || "--"}°C`}
              icon={CloudSun}
              delay={0.3}
              trend={-2.4}
              color="var(--proxima-emerald)"
            />
            <SolarisStat
              title="Shield Level"
              value="98.2%"
              icon={ShieldCheck}
              delay={0.4}
              color="var(--proxima-amber)"
            />
          </div>

          <div className="location-footer glass-v3">
            <div className="loc-info">
              <MapPin size={16} className="text-cyan-500" />
              <div>
                <div className="loc-name">{status?.room}</div>
                <div className="loc-meta">Proxima Global Grid • Secure</div>
              </div>
            </div>
            <div className="system-tag">STABLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveStatus;

