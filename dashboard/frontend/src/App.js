import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Globe,
  ChevronRight,
  Search,
  Bell,
  User
} from "lucide-react";
import LiveStatus from "./components/LiveStatus";
import AIInsights from "./components/AIInsights";
import IntegrityStatus from "./components/IntegrityStatus";
import GridStatus from "./components/GridStatus";
import Sidebar from "./components/Sidebar";
import QuantumBackground from "./components/QuantumBackground";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="nebula-app-shell">
      <QuantumBackground />
      <div className="noise" />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="nebula-viewport">
        <header className="nebula-header">
          <div className="header-left">
            <div className="breadcrumb">
              <span className="bc-root">Core System</span>
              <ChevronRight size={14} className="bc-sep" />
              <span className="bc-active">{activeTab.replace("-", " ")}</span>
            </div>
            <h2 className="header-title">
              {activeTab === "dashboard" && "Nerve Center Overview"}
              {activeTab === "ai" && "Neural Engine Analytics"}
              {activeTab === "integrity" && "Subsystem Integrity"}
              {activeTab === "grid" && "Nexis Grid Management"}
            </h2>
          </div>

          {/* Central Heartbeat Visualization */}
          <div className="core-heartbeat">
            <div className="heartbeat-ring" />
            <div className="heartbeat-core">
              <Activity size={18} />
            </div>
            <div className="heartbeat-label">SYNC ACTIVE</div>
          </div>

          <div className="header-right">
            <div className="header-search">
              <Search size={18} />
              <input type="text" placeholder="Search nodes..." />
            </div>
            <div className="header-actions">
              <button className="action-btn"><Bell size={20} /></button>
              <div className="v-divider" />
              <button className="user-profile">
                <div className="avatar-orb">
                  <User size={18} />
                </div>
                <span>Administrator</span>
              </button>
            </div>
          </div>
        </header>

        <section className="nebula-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="content-wrapper"
            >
              {activeTab === "dashboard" && <LiveStatus />}
              {activeTab === "ai" && <AIInsights />}
              {activeTab === "integrity" && <IntegrityStatus />}
              {activeTab === "grid" && <GridStatus />}
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="nebula-footer">
          <div className="footer-status">
            <div className="status-indicator online" />
            <span>Master Node Sync: Stable</span>
          </div>
          <div className="footer-meta">
            <span>© 2026 Proxima Advanced Ecosystems</span>
            <div className="h-dot" />
            <span className="text-emerald-400">Sustainable AGI Intelligence</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

