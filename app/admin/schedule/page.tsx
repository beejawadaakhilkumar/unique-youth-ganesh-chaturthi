"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { defaultSchedule, ScheduleItem } from "@/lib/data";

export default function AdminSchedule() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(defaultSchedule);
  const [status, setStatus] = useState("");

  // Load existing data when the admin page loads
  useEffect(() => {
    const savedTimings = localStorage.getItem("admin_schedule");
    if (savedTimings) {
      setSchedule(JSON.parse(savedTimings));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving changes...");
    
    // Save the changes to localStorage so the home page can read them
    localStorage.setItem("admin_schedule", JSON.stringify(schedule));

    setTimeout(() => {
      setStatus("Schedule updated successfully! Go check the Home page.");
      // Clear status message after 3 seconds
      setTimeout(() => setStatus(""), 3000);
    }, 500);
  };

  const updateTime = (id: string, newTime: string) => {
    setSchedule(schedule.map(item => item.id === id ? { ...item, time: newTime } : item));
  };

  return (
    <main className="admin-wrap" style={{ padding: "40px 20px" }}>
      <div className="container">
        <Link href="/admin" style={{ display: "inline-block", marginBottom: "20px" }}>
          ← Back to Dashboard
        </Link>

        <h1>Edit Festival Timings</h1>
        <p>Change the schedule timings below. Click save and check the home page!</p>

        <form onSubmit={handleSave} className="panel" style={{ maxWidth: "600px", marginTop: "20px" }}>
          {schedule.map((item) => (
            <div key={item.id} style={{ marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid #eee" }}>
              <label style={{ fontWeight: "bold", display: "flex", gap: "10px", alignItems: "center" }}>
                <span>{item.icon}</span> {item.title}
              </label>
              <input 
                type="text" 
                value={item.time} 
                onChange={(e) => updateTime(item.id, e.target.value)}
                style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              />
            </div>
          ))}
          
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
            Save New Timings
          </button>
          
          {status && <p style={{ color: "green", marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>{status}</p>}
        </form>
      </div>
    </main>
  );
}