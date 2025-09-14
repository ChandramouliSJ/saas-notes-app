import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("Registering...");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(JSON.stringify(data));
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleLogin = async () => {
    setMessage("Logging in...");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(JSON.stringify(data));
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Auth Test</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "8px 0" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "8px 0" }}
      />

      <button onClick={handleRegister} style={{ marginRight: "10px" }}>
        Register
      </button>
      <button onClick={handleLogin}>Login</button>

      <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>
        {message}
      </pre>
    </div>
  );
}
