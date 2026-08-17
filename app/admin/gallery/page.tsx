"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminGallery() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving to database...");

    // Here is where you will eventually call Supabase to insert the row.
    // For now, we simulate a successful save:
    setTimeout(() => {
      setStatus("Successfully added to gallery!");
      setTitle("");
      setMediaUrl("");
      
      // Hide the form after 2 seconds
      setTimeout(() => {
        setShowForm(false);
        setStatus("");
      }, 2000);
    }, 1000);
  };

  return (
    <main className="admin-wrap">
      <div className="admin-top">
        <div className="container">
          <strong>Gallery Management</strong>
        </div>
      </div>
      
      <div className="admin-grid">
        <aside className="sidebar">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/members">Members</Link>
          <Link href="/admin/gallery">Gallery</Link>
          {/* I added the schedule link here for you as well! */}
          <Link href="/admin/schedule">Schedule</Link> 
          <Link href="/">View Website</Link>
        </aside>
        
        <section className="dashboard">
          <div className="dashboard-header">
            <h1>Gallery</h1>
            {/* Toggles the form open and closed */}
            <button 
              className="btn btn-primary" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "+ Add Photo"}
            </button>
          </div>
          
          <div className="panel">
            <div className="notice">
              Upload images to the Supabase Storage bucket named <strong>gallery</strong>, then save their public URL in the gallery table.
            </div>
            <p>Recommended image size: 1600 × 1000 or larger.</p>

            {/* THE UPLOAD FORM (Only shows when the button is clicked) */}
            {showForm && (
              <form 
                onSubmit={handleUpload} 
                style={{ 
                  marginTop: "20px", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "15px", 
                  borderTop: "1px solid #eaeaea", 
                  paddingTop: "20px" 
                }}
              >
                <h3>Upload New Media</h3>
                
                <div>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Event Title
                  </label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    placeholder="e.g., Ganesh Sthapana 2026"
                    style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Image / Video URL
                  </label>
                  <input 
                    type="text" 
                    value={mediaUrl} 
                    onChange={(e) => setMediaUrl(e.target.value)} 
                    required 
                    placeholder="https://..."
                    style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ alignSelf: "flex-start", marginTop: "10px" }}
                >
                  Save to Gallery
                </button>
                
                {status && (
                  <p style={{ color: status.includes("Error") ? "red" : "green", fontWeight: "bold", marginTop: "10px" }}>
                    {status}
                  </p>
                )}
              </form>
            )}

          </div>
        </section>
      </div>
    </main>
  );
}