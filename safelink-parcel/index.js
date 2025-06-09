import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import CryptoJS from "crypto-js";
import "./style.css"; // ✅ Wajib agar styling terikut di build

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncrypt = (e) => {
    e.preventDefault();
    setError("");

    if (!input.trim()) {
      setError("Input tidak boleh kosong.");
      return;
    }

    try {
      const encrypted = CryptoJS.AES.encrypt(input, "safelinkKey").toString();
      const base64 = btoa(encrypted);
      const currentUrl = window.location.origin;
      const resultUrl = `${currentUrl}/#/${base64}`;
      setOutput(resultUrl);
    } catch (err) {
      setError("Terjadi kesalahan saat mengenkripsi.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      alert("Link berhasil disalin!");
    });
  };

  return (
    <div>
      <h1>SafeLink Generator</h1>
      <form onSubmit={handleEncrypt}>
        <textarea
          placeholder="Tempelkan URL target di sini..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit">Generate SafeLink</button>
        {error && <div className="error">{error}</div>}
      </form>

      {output && (
        <>
          <div id="output">{output}</div>
          <button id="copyBtn" onClick={handleCopy}>
            Salin Link
          </button>
        </>
      )}
    </div>
  );
}

// Gunakan root modern (React 18+)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);