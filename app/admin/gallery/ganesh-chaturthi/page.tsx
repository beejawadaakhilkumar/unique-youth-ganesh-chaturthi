"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// This imports the Supabase connection we just made!
import { createClient } from "@/lib/supabase";
export default function AdminGaneshVideos() {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const savedUser = sessionStorage.getItem("logged_in_admin");
    if (savedUser) setIsLoggedIn(true);
    setIsChecking(false);
  }, []);

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      setStatus("Please select a video file first.");
      return;
    }

    if (!supabase) {
      setStatus("Error: Database not connected.");
      return;
    }

    setStatus("Uploading video to cloud... Please wait (this might take a minute for large files).");

    try {
      // 1. Upload the actual video file to the 'ganesh-videos' storage bucket
      const fileExt = videoFile.name.split('.').pop();
      const uniqueFileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase
        .storage
        .from('ganesh-videos')
        .upload(uniqueFileName, videoFile);

      if (uploadError) throw uploadError;

      // 2. Get the live public URL of the uploaded video
      const { data: { publicUrl } } = supabase
        .storage
        .from('ganesh-videos')
        .getPublicUrl(uniqueFileName);

      // 3. Save the Title and the new URL to the database table
      const { error: dbError } = await supabase
        .from('ganesh_videos')
        .insert([
          { title: title, video_url: publicUrl }
        ]);

      if (dbError) throw dbError;

      // Success! Clear the form.
      setTitle("");
      setVideoFile(null);
      
      const fileInput = document.getElementById('video-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      setStatus("🎉 Video uploaded successfully to the live database!");
      setTimeout(() => setStatus(""), 5000);

    } catch (error: any) {
      console.error("Upload error:", error);
      setStatus(`Error: ${error.message}`);
    }
  };

  if (isChecking) return <main style={{ minHeight: "100vh" }}></main>;
  if (!isLoggedIn) {
    return (
      <div style={{ padding: "50px", textAlign: "center", marginTop: "10vh" }}>
        <h2>Access Denied</h2>
        <p>You must be logged in as an admin to upload videos.</p>
        <Link href="/admin" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <main className="admin-wrap" style={{ padding: "40px 20px" }}>
      <div className="container">
        <Link href="/admin" style={{ display: "inline-block", marginBottom: "20px", fontWeight: "bold" }}>
          ← Back to Dashboard
        </Link>

        <h1>Upload MP4 Videos</h1>
        <p>Upload video files directly to the live cloud database.</p>

        <form 
          onSubmit={handleAddVideo} 
          className="panel" 
          style={{ maxWidth: "600px", marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px", backgroundColor: "#fff" }}
        >
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Video Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="e.g., Visarjan Dance 2026"
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Select MP4 Video</label>
            <input 
              id="video-upload"
              type="file" 
              accept="video/mp4,video/quicktime,video/x-m4v,video/*" 
              onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)} 
              required 
              style={{ 
                width: "100%", 
                padding: "10px", 
                border: "1px dashed #999", 
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                cursor: "pointer"
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
            Upload to Cloud Database
          </button>
          
          {status && (
            <p style={{ color: status.includes("Error") ? "red" : "green", fontWeight: "bold", marginTop: "5px" }}>
              {status}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}