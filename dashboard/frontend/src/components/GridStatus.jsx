import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Zap,
    Wind,
    Sun,
    Activity,
    Globe,
    Battery,
    ArrowUpRight,
    TrendingUp,
    Leaf
} from "lucide-react";
import "./GridStatus.css";

const SolarisSource = ({ type, percentage, delay }) => (
    <motion.div
        className="solaris-source-box glass-v3 interactive-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
    >
        <div className="source-top">
            <div className="source-icon-wrap">
                {type === 'Solar' ? <Sun size={14} className="text-amber-500" /> :
                    type === 'Wind' ? <Wind size={14} className="text-blue-500" /> :
                        <Battery size={14} className="text-emerald-500" />}
            </div>
            <span className="source-name">{type} LINK</span>
        </div>
        <div className="source-center">
            <span className="source-pct">{Math.round(percentage * 100)}%</span>
            <div className="source-mini-track">
                <motion.div
                    className="fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage * 100}%` }}
                    transition={{ duration: 1, delay: delay + 0.3 }}
                    style={{ background: type === 'Solar' ? 'var(--solaris-amber)' : type === 'Wind' ? 'var(--solaris-blue)' : 'var(--solaris-emerald)' }}
                />
            </div>
        </div>
    </motion.div>
);

const GridStatus = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/grid")
            .then(res => res.json())
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Grid Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="solaris-loader">
            <Zap className="animate-bounce text-amber-500" size={32} />
            <span>HARMONIZING GRID RESONANCE...</span>
        </div>
    );

    return (
        <div className="solaris-grid-view">
            <div className="grid-layout">
                {/* Main Power Nexus */}
                <motion.div
                    className="power-nexus-panel glass-v3-heavy span-2-2"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="panel-header">
                        <div className="panel-tag amber">
                            <Zap size={12} />
                            <span>POWER NEXUS ALPHA</span>
                        </div>
                        <div className={`grid-ping ${data?.gridStability === 'Stable' ? 'stable' : 'alert'}`}>
                            <div className="dot" />
                            <span>{data?.gridStability}</span>
                        </div>
                    </div>

                    <div className="nexus-visualizer">
                        <div className="mix-gauge">
                            <div className="gauge-outer">
                                <motion.div
                                    className="gauge-inner"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(data?.renewableMix || 0.6) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </div>
                            <div className="gauge-labels">
                                <div className="g-val">{Math.round((data?.renewableMix || 0.6) * 100)}%</div>
                                <div className="g-label">RENEWABLE MIX</div>
                            </div>
                        </div>

                        <div className="load-center">
                            <div className="l-icon">
                                <Activity size={32} className="text-amber-500" />
                            </div>
                            <div className="l-val">{data?.totalLoad}</div>
                            <div className="l-label">TOTAL INFRA LOAD</div>
                        </div>
                    </div>

                    <div className="nexus-footer">
                        <div className="freq-box">
                            <span className="label">RESONANCE</span>
                            <span className="val">{data?.frequency}</span>
                        </div>
                        <div className={`demand-tag ${data?.peakDemand ? 'peak' : 'nominal'}`}>
                            <TrendingUp size={14} />
                            <span>{data?.peakDemand ? 'PEAK WARNING' : 'NOMINAL FLOW'}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Grid Source Matrix */}
                <div className="source-matrix span-2-2">
                    <div className="panel-header">
                        <div className="panel-tag emerald">
                            <Leaf size={12} />
                            <span>SOURCE SYNERGY</span>
                        </div>
                    </div>
                    <div className="source-subgrid">
                        {(data?.energySource || []).map((source, i) => (
                            <SolarisSource
                                key={source.type}
                                type={source.type}
                                percentage={source.percentage}
                                delay={0.2 + (i * 0.1)}
                            />
                        ))}
                    </div>

                    <motion.div
                        className="yield-card glass-v3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="y-info">
                            <div className="y-icon">
                                <Globe size={20} className="text-blue-500" />
                            </div>
                            <div className="y-text">
                                <div className="y-title">CARBON OFFSET YIELD</div>
                                <div className="y-val-group">
                                    <span className="main">12.4t</span>
                                    <span className="sub">/ YEAR</span>
                                </div>
                            </div>
                        </div>
                        <div className="y-visual">
                            <ArrowUpRight size={20} className="text-emerald-500" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default GridStatus;
