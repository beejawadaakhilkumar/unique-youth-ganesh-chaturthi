"use client";

import { useState, useEffect } from "react";
import { defaultSchedule, ScheduleItem } from "@/lib/data";

export default function ScheduleAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(defaultSchedule);

  // Every time the user opens the modal, check if the admin saved new timings
  useEffect(() => {
    if (isOpen) {
      const savedTimings = localStorage.getItem("admin_schedule");
      if (savedTimings) {
        setScheduleData(JSON.parse(savedTimings));
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <button 
        className="floating-schedule-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="View Festival Schedule"
      >
        <span className="bell-icon">🔔</span>
        <span className="btn-text">Timings</span>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              ✕
            </button>
            
            <div className="modal-header">
              <div className="eyebrow accent-text">Important Dates</div>
              <h3>Festival Schedule</h3>
            </div>

            <div className="schedule-list">
              {/* This loop dynamically renders whatever data is in the state */}
              {scheduleData.map((item) => (
                <div className="schedule-item" key={item.id}>
                  <div className="schedule-icon">{item.icon}</div>
                  <div className="schedule-details">
                    <h4>{item.title}</h4>
                    <p>{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}