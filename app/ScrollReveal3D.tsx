"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollReveal3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Left Panel (Corporator)
  const leftX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const leftZ = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  const leftRotateY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  // Center Panel (Colony President) - Rises from the deep background
  const centerZ = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  const centerY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

  // Right Panel (Youth Leader)
  const rightX = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
  const rightZ = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  const rightRotateY = useTransform(scrollYProgress, [0, 1], [-60, 0]);

  // Shared Fade
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1]);

  return (
    <section className="scroll-3d-wrapper section alt">
      <div className="container section-head">
        <div className="eyebrow accent-text">Our Leadership</div>
        <h2>Guiding Our Association</h2>
        <p>The pillars of our community who make this celebration possible.</p>
      </div>

      <div ref={containerRef} className="scroll-3d-container container">
        
        {/* Left Side: Corporator */}
        <motion.div
          className="scroll-panel scroll-panel-left leader-card-3d"
          style={{ x: leftX, z: leftZ, rotateY: leftRotateY, opacity }}
        >
          <div className="leader-img">
            <img src="https://placehold.co/400x500/ecdcc9/711d14?text=Photo" alt="Corporator" />
          </div>
          <div className="leader-info">
            <div className="leader-role">Hon. Corporator</div>
            <h3>[Corporator Name]</h3>
            <p>Ward / Area Name</p>
          </div>
        </motion.div>

        {/* Center Side: Colony President */}
        <motion.div
          className="scroll-panel leader-card-3d"
          style={{ y: centerY, z: centerZ, opacity }}
        >
          <div className="leader-img">
            <img src="https://placehold.co/400x500/ecdcc9/711d14?text=Photo" alt="Colony President" />
          </div>
          <div className="leader-info">
            <div className="leader-role">Colony President</div>
            <h3>[President Name]</h3>
            <p>Unique Youth Association</p>
          </div>
        </motion.div>

        {/* Right Side: Youth Leader */}
        <motion.div
          className="scroll-panel scroll-panel-right leader-card-3d"
          style={{ x: rightX, z: rightZ, rotateY: rightRotateY, opacity }}
        >
          <div className="leader-img">
            <img src="https://placehold.co/400x500/ecdcc9/711d14?text=Photo" alt="Youth Leader" />
          </div>
          <div className="leader-info">
            <div className="leader-role">Youth Leader</div>
            <h3>[Leader Name]</h3>
            <p>Unique Youth Association</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}