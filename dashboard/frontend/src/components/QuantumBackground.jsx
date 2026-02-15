import React, { useMemo } from "react";
import { motion } from "framer-motion";

const SolarisFlux = () => {
  const particles = useMemo(() => [...Array(15)].map((_, i) => ({
    id: i,
    size: Math.random() * 400 + 200,
    duration: Math.random() * 20 + 25,
    delay: Math.random() * -20,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: i % 2 === 0 ? "var(--proxima-amber-glow)" : "var(--proxima-cyan-glow)"
  })), []);

  return (
    <div className="solaris-flux-container" style={{
      position: "fixed",
      inset: 0,
      zIndex: -1,
      background: "var(--bg-void)",
      overflow: "hidden"
    }}>
      {/* Dynamic Light Leaks */}
      <div className="light-leak leak-1" />
      <div className="light-leak leak-2" />

      {/* Floating Aurora Orbs */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="flux-orb"
          initial={{
            opacity: 0,
            x: `${p.x}%`,
            y: `${p.y}%`,
            scale: 0.8
          }}
          animate={{
            x: [`${p.x}%`, `${p.x + 10}%`, `${p.x - 5}%`, `${p.x}%`],
            y: [`${p.y}%`, `${p.y - 15}%`, `${p.y + 10}%`, `${p.y}%`],
            opacity: [0.3, 0.6, 0.4, 0.3],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${p.color}, transparent 70%)`,
            filter: "blur(60px)",
            pointerEvents: "none"
          }}
        />
      ))}

      {/* Grid Overlay for Technical Feel */}
      <div className="solaris-grid-overlay" />

      <style dangerouslySetInnerHTML={{
        __html: `
        .solaris-flux-container::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
          opacity: 0.04;
          pointer-events: none;
        }
        
        .light-leak {
          position: absolute;
          width: 80vw;
          height: 60vh;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
        }
        
        .leak-1 {
          top: -10%;
          left: -10%;
          background: var(--proxima-amber);
          animation: leak-drift 25s infinite alternate ease-in-out;
        }
        
        .leak-2 {
          bottom: -10%;
          right: -10%;
          background: var(--proxima-cyan);
          animation: leak-drift 30s infinite alternate-reverse ease-in-out;
        }

        .solaris-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--border-glass) 1px, transparent 1px),
                            linear-gradient(90deg, var(--border-glass) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at center, black, transparent 80%);
          opacity: 0.05;
        }

        @keyframes leak-drift {
          from { transform: translate(0, 0) scale(1.2); }
          to { transform: translate(10%, 15%) scale(1); }
        }
      `}} />
    </div>
  );
};

export default SolarisFlux;
