"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollReveal3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start when top of container hits bottom of screen, finish when center hits center
    offset: ["start end", "center center"],
  });

  // Left Panel Math
  const leftX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const leftZ = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  const leftRotateY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  // Right Panel Math
  const rightX = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const rightZ = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  const rightRotateY = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  // Shared Fade
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section className="scroll-3d-wrapper">
      <div className="container section-head">
        <div className="eyebrow accent-text">Our Spirit</div>
        <h2>What Drives Us</h2>
      </div>

      <div ref={containerRef} className="scroll-3d-container container">
        {/* Left Side */}
        <motion.div
          className="scroll-panel scroll-panel-left"
          style={{ x: leftX, z: leftZ, rotateY: leftRotateY, opacity }}
        >
          <div className="scroll-content">
            <div className="scroll-icon">🙏</div>
            <h2>Devotion</h2>
            <p>
              United by faith, we bring the blessings of Lord Ganesha to our colony. 
              Every year is a new opportunity to celebrate our shared devotion.
            </p>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="scroll-panel scroll-panel-right"
          style={{ x: rightX, z: rightZ, rotateY: rightRotateY, opacity }}
        >
          <div className="scroll-content">
            <div className="scroll-icon">🤝</div>
            <h2>Community</h2>
            <p>
              Building friendships, sharing joy, and celebrating together. 
              The Unique Youth Association is more than a group; it's a family.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}