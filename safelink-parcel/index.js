import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");

  // Generate kode unik sederhana dari URL (contoh pakai hashing sederhana)
  function generateCode(url) {
    // Simple hash: convert char codes sum to hex string
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash + url.charCodeAt(i) * (i + 1)) % 1000000;
    }
    return hash.toString(16).padStart(5, "0").toUpperCase();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!inputUrl.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    try {
      new URL(inputUrl); // Validasi URL
    } catch {
      setError("Invalid URL format");
      return;
    }
    const code = generateCode(inputUrl);
    // Simpan ke localStorage (kode -> url), nanti redirect baca dari sini
    let safelinks = JSON.parse(localStorage.getItem("safelinks") || "{}");
    safelinks[code] = inputUrl;
    localStorage.setItem("safelinks", JSON.stringify(safelinks));
    setGeneratedCode(code);
  }

  function handleCopy() {
    if (!generatedCode) return;
    navigator.clipboard.writeText(`${window.location.origin}/redirect.html?code=${generatedCode}`);
    alert("Safelink copied!");
  }

  return (
    <div>
      <h1>Safelink Generator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Paste your original URL here..."
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button type="submit">Generate Safelink</button>
      </form>
      {error && <p className="error">{error}</p>}
      {generatedCode && (
        <div id="output">
          <p>Here is your safelink:</p>
          <code>{`${window.location.origin}/redirect.html?code=${generatedCode}`}</code>
          <button id="copyBtn" onClick={handleCopy}>Copy Safelink</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));