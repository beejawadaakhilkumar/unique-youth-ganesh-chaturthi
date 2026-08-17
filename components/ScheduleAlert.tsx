"use client";

import { useState, useEffect } from "react";
// 1. Import your live database connection
import { createClient } from "@/lib/supabase"; 

export default function ScheduleAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. Fetch from the cloud every time the modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchLiveSchedule = async () => {
        setLoading(true);
        const supabase = createClient();
        if (!supabase) return;
        
        const { data } = await supabase
          .from('ganesh_schedule')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (data) {
          setScheduleData(data);
        }
        setLoading(false);
      };

      fetchLiveSchedule();
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
              {loading && <p style={{ textAlign: "center", padding: "20px" }}>Loading live schedule...</p>}
              
              {!loading && scheduleData.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>No events scheduled yet.</p>
              )}

              {/* 3. Render the cloud data */}
              {!loading && scheduleData.map((item) => (
                <div className="schedule-item" key={item.id}>
                  <div className="schedule-icon">🕉️</div>
                  <div className="schedule-details">
                    <h4>{item.event_name}</h4>
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