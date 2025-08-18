import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let endpoint = isLogin
        ? "http://localhost:3000/auth/api/login"
        : "http://localhost:3000/auth/api/register";

      let payload = { name, email, password };

      const res = await axios.post(endpoint, payload);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/main");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea, #764ba2)", // gradient background
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "350px",
          width: "100%",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          background: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#333",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {isLogin ? "Welcome Back 👋" : "Create an Account ✨"}
        </h2>

        {!isLogin && (
          <>
            <label style={{ fontWeight: "500", fontSize: "14px" }}>Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                outline: "none",
                transition: "0.3s",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
            />
          </>
        )}

        <label style={{ fontWeight: "500", fontSize: "14px" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <label style={{ fontWeight: "500", fontSize: "14px" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "0.3s",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #667eea")}
          onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #5a67d8, #6b46c1)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(135deg, #667eea, #764ba2)")
          }
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            style={{
              border: "none",
              background: "transparent",
              color: "#667eea",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;
