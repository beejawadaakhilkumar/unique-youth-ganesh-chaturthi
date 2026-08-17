"use client";

import { useState } from "react";

export default function ExpandableYouth() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow accent-text">Our Force</div>
          <h2>Youth Members</h2>
          <p>The energetic youth who bring our Ganesh Chaturthi celebrations to life.</p>
        </div>

        {!isOpen ? (
          <div className="btn-wrapper mt-0">
            <button onClick={() => setIsOpen(true)} className="btn btn-primary">
              View More Youth Members ↓
            </button>
          </div>
        ) : (
          <div className="leaders-grid">
            {/* Bunny */}
            <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/bunny.png" alt="Bunny" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Satish</h3>
              </div>
            </div>

            {/* Raj */}
            <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/raj.png" alt="Raj" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Raj Kumar</h3>
              </div>
            </div>

            {/* Bhanu */}
            <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/bhanu.png" alt="Bhanu" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Bhanu</h3>
              </div>
            </div>

            {/* Mani */}
            <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/mani.png" alt="Mani" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Mani</h3>
              </div>
            </div>

            {/* Akhil */}
            <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/Akhilkumarr.png" alt="Akhil" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Akhil Kumar</h3>
              </div>
            </div>
             <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/laddu.png" alt="Laddu" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Hemanth</h3>
              </div>
            </div>
             <div className="card leader-card">
              <div className="leader-img">
                <img src="/images/sidhu.png" alt="sidhu" />
              </div>
              <div className="leader-info">
                <div className="leader-role">Youth Member</div>
                <h3>Sidhu</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}