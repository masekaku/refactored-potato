import React, { useState } from "react";
import ReactDOM from "react-dom";
import CryptoJS from "crypto-js";

const SECRET_KEY = "mySecretKey12345";

function encryptUrl(url) {
  return CryptoJS.AES.encrypt(url, SECRET_KEY).toString();
}

function SafeLinkGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function handleGenerate() {
    setError("");
    if (!input.trim()) {
      setError("Please enter at least one URL.");
      return;
    }

    const urls = input.trim().split(/\r?\n/).filter(Boolean);
    if (urls.length > 100) {
      setError("Maximum 100 URLs allowed.");
      return;
    }

    try {
      const encryptedUrls = urls.map((url) => {
        // Basic URL validation
        try {
          new URL(url);
        } catch {
          throw new Error(`Invalid URL detected: ${url}`);
        }
        return encryptUrl(url);
      });

      // Generate safelinks (for demo: just show encrypted strings)
      setOutput(encryptedUrls.join("\n"));
    } catch (e) {
      setError(e.message);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
    alert("Encrypted URLs copied to clipboard!");
  }

  return (
    <>
      <h1>SafeLink Generator</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
      >
        <textarea
          placeholder="Enter URLs (one per line, max 100)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit">Generate Encrypted URLs</button>
      </form>
      {error && <div className="error">{error}</div>}
      {output && (
        <>
          <div id="output">{output}</div>
          <button id="copyBtn" onClick={handleCopy}>
            Copy to Clipboard
          </button>
        </>
      )}
    </>
  );
}

ReactDOM.render(<SafeLinkGenerator />, document.getElementById("root"));
