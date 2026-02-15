import React from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    BrainCircuit,
    ShieldCheck,
    Zap,
    Settings,
    HelpCircle,
    Layout
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
        { id: "ai", icon: <BrainCircuit size={20} />, label: "Neural Flow" },
        { id: "integrity", icon: <ShieldCheck size={20} />, label: "Core Guard" },
        { id: "grid", icon: <Zap size={20} />, label: "Energy Grid" },
    ];

    return (
        <motion.aside
            className="solaris-sidebar"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="sidebar-brand">
                <div className="logo-shield">
                    <Layout size={24} />
                </div>
                <span className="brand-text">SOLARIS</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? "active" : ""}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <div className="nav-icon">
                            {item.icon}
                        </div>
                        <span className="nav-label">{item.label}</span>
                        {activeTab === item.id && (
                            <motion.div
                                className="active-ledge"
                                layoutId="nav-active"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                style={{
                                    position: "absolute",
                                    left: -24,
                                    width: 4,
                                    height: 20,
                                    background: "var(--solaris-amber)",
                                    borderRadius: "0 4px 4px 0"
                                }}
                            />
                        )}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
                <button className="nav-item">
                    <Settings size={20} />
                    <span className="nav-label">Preferences</span>
                </button>
                <div className="divider-h" style={{ margin: "10px 0" }} />
                <div className="system-health" style={{ padding: "0 18px", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <div className="pulse-indicator" style={{ width: 6, height: 6 }} />
                        <span>KERNEL SECURE</span>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
