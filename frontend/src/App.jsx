import React, { useEffect, useState } from "react";
import { getQuestions } from "./api.jsx";
import category from "./category_names.json";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.jsx";
import "./App.css";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [title, setTitle] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [head, sethead] = useState("Question");
  const [bookmarks, setBookmarks] = useState([]);
  const [username, setUsername] = useState("");

  const fetchbook = async () => {
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
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getQuestions(search, title, page, limit);
      const updated = data.data.map((q) => ({
        ...q,
        boo: bookmarks.some((b) => b._id === q._id),
        open: false, // collapsible state
      }));
      setQuestions(updated);
      setTotalPages(data.totalPages);
      console.log(totalPages)

    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchbook();
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, title, page, bookmarks]);

  const handleBookmark = async (id) => {
    try {
      await axios.post(
        "https://geekheaven-3.onrender.com/api/book",
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchbook();
    } catch (err) {
      console.error("Error updating bookmark:", err);
    }
  };

  const toggleCollapse = (id) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === id ? { ...q, open: !q.open } : q
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="main">
        <div className="container">
          <div className="head">
            <div>
              <h1 className="title">📌 {head}</h1>
            </div>
            <div className="filters">
              <input
                type="text"
                placeholder="🔍 Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <select
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setPage(1);
                  sethead(e.target.value);
                }}
              >
                <option value="">-- Select Category --</option>
                {category.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && <p className="loading">⏳ Loading...</p>}

          <div className="ques">
            {!loading && (
              <ul className="question-list">
                {questions.map((q) => (
                  <li
                    key={q._id}
                    className={`question-card ${q.boo ? "bookmarked" : ""}`}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleCollapse(q._id)}
                    >
                      <h3>{q.title}</h3>
                      <span>{q.open ? "▲" : "▼"}</span>
                    </div>
                    {q.open && (
                      <div style={{ marginTop: "10px" }}>
                        <a
                          href={q.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            marginBottom: "10px",
                          }}
                        >
                          🔗 View More
                        </a>
                        <br />
                        <button
                          className="bookmark-btn"
                          onClick={() => handleBookmark(q._id)}
                        >
                          {q.boo ? "✅ Bookmarked" : "📑 Bookmark"}
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ⬅ Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next ➡
            </button>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
