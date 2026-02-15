import React from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    BrainCircuit,
    ShieldCheck,
    Zap,
    Settings,
    Activity,
    Layers
} from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: "dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
        { id: "ai", icon: <BrainCircuit size={18} />, label: "Neural Flow" },
        { id: "integrity", icon: <ShieldCheck size={18} />, label: "Core Guard" },
        { id: "grid", icon: <Zap size={18} />, label: "Energy Grid" },
    ];

    return (
        <motion.aside
            className="proxima-sidebar"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="sidebar-brand">
                <div className="logo-orb">
                    <Layers size={20} />
                </div>
                <span className="brand-text">PROXIMA NEXUS</span>
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
                            />
                        )}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item">
                    <Settings size={18} />
                    <span className="nav-label">Preferences</span>
                </button>
                <div className="divider-h" style={{ margin: "8px 0" }} />
                <div className="system-health">
                    <div className="health-monitor">
                        <div className="status-indicator online" />
                        <span>KERNEL SECURE</span>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
