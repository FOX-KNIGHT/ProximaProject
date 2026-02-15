import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Clock,
    Activity,
    Server,
    ChevronRight,
    Database,
    Lock,
    AlertCircle,
    Cpu,
    ShieldAlert
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
                <Server size={12} />
                <span>{id}</span>
            </div>
            <div className={`node-dot ${status === 'Stable' ? 'stable' : 'warning'}`} />
        </div>
        <div className="node-main">
            <div className="n-status">{status}</div>
            <div className="n-latency">{latency} LATENCY</div>
        </div>
    </motion.div>
);

const IntegrityStatus = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/integrity")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Integrity Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="solaris-loader">
            <ShieldCheck className="animate-spin text-emerald-500" size={32} />
            <span>VERIFYING SYSTEM PROTOCOLS...</span>
        </div>
    );

    return (
        <div className="solaris-integrity-view">
            <div className="integrity-grid">
                {/* System Sovereignty Core */}
                <motion.div
                    className="sovereignty-panel glass-v3-heavy span-2-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="panel-header">
                        <div className="panel-tag emerald">
                            <Lock size={12} />
                            <span>SYSTEM SOVEREIGNTY</span>
                        </div>
                        <div className={`security-status ${data?.securityStatus === 'Shielded' ? 'shielded' : 'alert'}`}>
                            {data?.securityStatus === 'Shielded' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                            <span>{data?.securityStatus}</span>
                        </div>
                    </div>

                    <div className="health-visual-area">
                        <div className="index-circle">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" className="track" />
                                <motion.circle
                                    cx="50" cy="50" r="45"
                                    className="fill"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: data?.healthScore || 0.85 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="index-content">
                                <div className="i-val">{Math.round((data?.healthScore || 0.85) * 100)}%</div>
                                <div className="i-label">SHIELD INDEX</div>
                            </div>
                        </div>
                    </div>

                    <div className="integrity-footer">
                        <div className="uptime-group">
                            <Clock size={16} className="text-blue-500" />
                            <div className="u-info">
                                <div className="u-label">CONTINUOUS UPTIME</div>
                                <div className="u-val">{data?.uptime}</div>
                            </div>
                        </div>
                        <button className="audit-btn">
                            DEEP SCAN <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>

                {/* Node Array */}
                <div className="node-array-panel span-2-2">
                    <div className="panel-header">
                        <div className="panel-tag blue">
                            <Cpu size={12} />
                            <span>NODE ARRAY CLUSTER</span>
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

                    <div className="latency-widget glass-v3">
                        <div className="w-header">
                            <Database size={16} className="text-purple-500" />
                            <span>SYNAPTIC LATENCY</span>
                        </div>
                        <div className="w-main">
                            <div className="w-val">0.45ms</div>
                            <div className="w-status">
                                <Activity size={10} />
                                <span>SYNCED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntegrityStatus;
