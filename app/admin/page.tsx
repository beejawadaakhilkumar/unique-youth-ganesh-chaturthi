"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  
  // We use a quick loading state so the login screen doesn't flash for a split second
  const [isChecking, setIsChecking] = useState(true);

  // When the page loads, check if the browser remembers the user!
  useEffect(() => {
    const savedUser = sessionStorage.getItem("logged_in_admin");
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
    }
    setIsChecking(false); // Finished checking
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if ((cleanUsername === "akhil" || cleanUsername === "bunny") && cleanPassword === "2302") {
      setIsLoggedIn(true);
      setError("");
      
      // Save the login state to the browser session!
      sessionStorage.setItem("logged_in_admin", cleanUsername);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    // Clear the memory when they explicitly click Log Out
    sessionStorage.removeItem("logged_in_admin");
  };

  // Show a blank screen for a split second while we check their login status
  if (isChecking) {
    return <main style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}></main>;
  }

  // If NOT logged in, show the login form WITH the background image
  if (!isLoggedIn) {
    return (
      <main
        className="admin-wrap"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundImage: "url('/images/uniq.jpg')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="panel"
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "2rem",
            borderRadius: "8px",
            border: "1px solid #eaeaea",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Admin Login</h2>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <label
                htmlFor="username"
                style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                padding: "0.75rem",
                marginTop: "1rem",
                cursor: "pointer",
                border: "none",
                width: "100%",
              }}
            >
              Log in
            </button>
          </form>
        </div>
      </main>
    );
  }

  // If logged in, show your actual dashboard
  return (
    <main className="admin-wrap">
      <div className="admin-top">
        <div className="container">
          <strong>Unique Youth Association — Admin</strong>
          <button
            onClick={handleLogout}
            style={{ float: "right", background: "none", border: "none", color: "red", cursor: "pointer" }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className="admin-grid">
        <aside className="sidebar">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/members">Members</Link>
          <Link href="/admin/gallery">Gallery</Link>
          <Link href="/admin/schedule">Schedule</Link>
          <Link href="/">View Website</Link>
        </aside>
        <section className="dashboard">
          <h1>Admin Dashboard</h1>
          <div className="panel">
            <h2>Manage your website</h2>
            <p>
              Welcome back, <strong style={{ textTransform: "capitalize" }}>{username}</strong>! Use the sections on the left to manage colony members and festival
              gallery content. 
            </p>
            <div className="notice">
              Tip: Because we haven't connected Supabase yet, changes you make to the Schedule or Gallery will be temporarily saved to your browser using LocalStorage.
            </div>
            <Link className="btn btn-primary" href="/admin/members">
              Manage Members →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}