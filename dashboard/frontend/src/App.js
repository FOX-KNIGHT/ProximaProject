import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ChevronRight,
  Search,
  Bell,
  User,
  Cpu
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
    <div className="proxima-app-root">
      <QuantumBackground />
      <div className="noise" />

      <div className="nebula-app-shell">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="nebula-viewport">
          <header className="nebula-header">
            <div className="header-left">
              <div className="breadcrumb">
                <span className="bc-root">Core System</span>
                <ChevronRight size={12} className="bc-sep" />
                <span className="bc-active">{activeTab.replace("-", " ")}</span>
              </div>
              <h2 className="header-title">
                {activeTab === "dashboard" && "Command Overview"}
                {activeTab === "ai" && "Neural Flow Analysis"}
                {activeTab === "integrity" && "Core Shield Integrity"}
                {activeTab === "grid" && "Power Nexus Status"}
              </h2>
            </div>

            <div className="core-heartbeat">
              <motion.div
                className="heartbeat-core"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity size={16} />
              </motion.div>
              <div className="heartbeat-label">SYSTEM ONLINE</div>
            </div>

            <div className="header-right">
              <div className="header-search">
                <Search size={16} className="text-muted" />
                <input type="text" placeholder="Access nodes..." />
              </div>
              <div className="header-actions">
                <button className="action-btn"><Bell size={18} /></button>
                <div className="v-divider" />
                <button className="user-profile">
                  <div className="avatar-orb">
                    <User size={16} />
                  </div>
                  <span className="nav-label">Admin</span>
                </button>
              </div>
            </div>
          </header>

          <section className="nebula-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
              <span>NEURAL LINK: ENCRYPTED</span>
            </div>
            <div className="footer-meta">
              <span>PROXIMA OS v2.0</span>
              <div className="h-dot" />
              <span className="text-gradient-proxima">Automated Ecosystem</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;

