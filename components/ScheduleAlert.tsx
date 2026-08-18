"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase"; 

export default function ScheduleAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the modal is closed, do nothing
    if (!isOpen) return;

    const supabase = createClient();
    if (!supabase) return;

    // Function to grab the schedule
    const fetchLiveSchedule = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('ganesh_schedule')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (data) setScheduleData(data);
      setLoading(false);
    };

    // Grab the initial data when they first open the popup
    fetchLiveSchedule();

    // 📡 THE MAGIC: Turn on the Realtime Radio Receiver
    const channel = supabase
      .channel('realtime_schedule')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'ganesh_schedule' },
        (payload) => {
          // If the database shouts that a change happened, fetch the new data instantly!
          console.log("Realtime update received!", payload);
          fetchLiveSchedule();
        }
      )
      .subscribe();

    // Hang up the connection when they close the popup to save battery/data
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen]);

  return (
    <>
      <button 
        className="floating-schedule-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="View Festival Schedule"
      >
        <span className="bell-icon">🔔</span>
        <span className="btn-text">Timings</span>
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOpen(false)}>✕</button>
            
            <div className="modal-header">
              <div className="eyebrow accent-text">Important Dates</div>
              <h3>Festival Schedule</h3>
            </div>

            <div className="schedule-list">
              {loading && scheduleData.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>Loading live schedule...</p>
              )}
              
              {!loading && scheduleData.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>No events scheduled yet.</p>
              )}

              {scheduleData.map((item) => (
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