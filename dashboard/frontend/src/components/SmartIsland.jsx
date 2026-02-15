import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Brain,
  ShieldCheck,
  Zap,
  ChevronRight,
  Settings
} from "lucide-react";

const NavItem = ({ id, label, icon: Icon, activeTab, setActiveTab }) => {
  const isActive = activeTab === id;

  return (
    <motion.button
      className={`nav-island-item ${isActive ? "active" : ""}`}
      onClick={() => setActiveTab(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="icon-wrapper">
        <Icon size={20} />
      </div>
      <span className="label">{label}</span>
      {isActive && (
        <motion.div
          layoutId="island-active-indicator"
          className="active-dot"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

const SmartIsland = ({ activeTab, setActiveTab }) => {
  return (
    <motion.div
      className="smart-island-container"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="island-glass">
        <div className="island-section main-nav">
          <NavItem
            id="dashboard"
            label="Home"
            icon={LayoutDashboard}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem
            id="ai"
            label="Neural"
            icon={Brain}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem
            id="integrity"
            label="Shield"
            icon={ShieldCheck}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <NavItem
            id="grid"
            label="Energy"
            icon={Zap}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="island-divider" />

        <div className="island-section actions">
          <motion.button
            className="action-btn"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Settings size={20} />
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
};

export default SmartIsland;
