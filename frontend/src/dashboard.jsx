import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar.jsx";

const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://geekheaven-3.onrender.com/api/getbook", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setUsername(response.data.name || "User");
      setBookmarks(response.data.final_list || []);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goal = 50;
  const progress = Math.min((bookmarks.length / goal) * 100, 100);

  return (
    <>
      <Navbar />

    
      <div style={{ display: "flex", width: "100vw", justifyContent: "center", paddingTop: "90px" }}>
        <div style={{ maxWidth: "900px", width: "100%", textAlign: "center" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>
              👋 Welcome back, {username}!
            </h1>
            <p style={{ fontSize: "1.2rem" }}>
              Here are your <strong>bookmarked questions</strong>. Keep learning 🚀
            </p>

          
            <div
              style={{
                width: "100%",
                background: "#e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                height: "20px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                  height: "100%",
                }}
              ></div>
            </div>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              {bookmarks.length} / {goal} bookmarks
            </p>
          </div>

       
          <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "1.8rem" }}>
            📘 Bookmarked Questions
          </h2>

          {loading ? (
            <p>Loading bookmarks...</p>
          ) : bookmarks.length === 0 ? (
            <p>No bookmarks yet. Start saving some!</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                padding: "10px",
              }}
            >
              {bookmarks.map((q) => (
                <div
                  key={q._id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <h3 style={{ marginBottom: "10px", color: "#333" }}>{q.title}</h3>
                  <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      padding: "8px 14px",
                      background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                      color: "#fff",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    🔗 View Question
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
