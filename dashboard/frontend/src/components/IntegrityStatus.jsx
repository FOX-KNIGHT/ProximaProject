import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Clock,
    Activity,
    Server,
    Zap,
    Cpu,
    ShieldAlert,
    Network,
    Lock
} from "lucide-react";
import "./IntegrityStatus.css";

const SolarisNode = ({ id, status, latency, delay }) => (
    <motion.div
        className="solaris-node-box glass-v3 interactive-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="node-top">
            <div className="node-id-tag">
                <div className={`node-dot ${status === 'Stable' ? 'stable' : 'warning'}`} />
                <span>Node {id.split('-')[1]}</span>
            </div>
            <span className="n-latency">{latency}</span>
        </div>
        <div className="n-status">{status}</div>
    </motion.div>
);

const IntegrityStatus = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIntegrityData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/integrity");
                const integrityData = await res.json();
                setData(integrityData);
            } catch (err) {
                console.error("Integrity link failure:", err);
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchIntegrityData();
    }, []);

    if (loading) return (
        <div className="solaris-loader">
            <ShieldCheck className="animate-pulse" size={32} />
            <span className="loader-text">Verifying System Shield...</span>
        </div>
    );

    return (
        <div className="solaris-integrity-view">
            <div className="integrity-grid">
                {/* Sovereignty Panel */}
                <motion.div
                    className="sovereignty-panel glass-v3 span-2-2"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="panel-header">
                        <div className="panel-tag blue">
                            <Lock size={10} />
                            <span>System Sovereignty</span>
                        </div>
                        <div className={`security-status ${data?.securityStatus === 'Shielded' ? 'shielded' : 'alert'}`}>
                            {data?.securityStatus === 'Shielded' ? <Lock size={10} /> : <ShieldAlert size={10} />}
                            <span>{data?.securityStatus}</span>
                        </div>
                    </div>

                    <div className="health-visual-area">
                        <div className="index-circle">
                            <svg width="260" height="260">
                                <circle className="track" cx="130" cy="130" r="120" />
                                <motion.circle
                                    className="fill"
                                    cx="130"
                                    cy="130"
                                    r="120"
                                    initial={{ strokeDashoffset: 754 }}
                                    animate={{ strokeDashoffset: 754 - (754 * (data?.healthScore || 0) / 100) }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    style={{ strokeDasharray: 754 }}
                                />
                            </svg>
                            <div className="index-content">
                                <div className="i-val">{data?.healthScore}%</div>
                                <div className="i-label">Health Index</div>
                            </div>
                        </div>
                    </div>

                    <div className="integrity-footer">
                        <div className="uptime-group">
                            <span className="u-label">Continuous Uptime</span>
                            <span className="u-val">{data?.uptime}</span>
                        </div>
                        <button className="audit-btn">
                            <Activity size={12} />
                            <span>Full Scan</span>
                        </button>
                    </div>
                </motion.div>

                {/* Node Array */}
                <div className="node-array-panel span-2-2">
                    <div className="panel-header">
                        <div className="panel-tag blue">
                            <Network size={10} />
                            <span>Active Node Array</span>
                        </div>
                    </div>

                    <div className="nodes-subgrid">
                        {(data?.nodeHealth || []).map((node, i) => (
                            <SolarisNode
                                key={node.id}
                                id={node.id}
                                status={node.status}
                                latency={node.latency}
                                delay={0.2 + (i * 0.1)}
                            />
                        ))}
                    </div>

                    <motion.div
                        className="latency-widget glass-v3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="w-header">
                            <Cpu size={14} />
                            <span>Neural Sync Speed</span>
                        </div>
                        <div className="w-main">
                            <div className="w-val">2.4ms</div>
                            <div className="w-status">
                                <Zap size={10} />
                                <span>ULTRA-FAST</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default IntegrityStatus;
