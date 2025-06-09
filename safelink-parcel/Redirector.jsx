import React, { useEffect } from "react";
import CryptoJS from "crypto-js";

const Redirector = () => {
  useEffect(() => {
    const secret = "safelink-key"; // Ganti kalau perlu
    const hash = window.location.hash.slice(2); // hapus #/
    
    try {
      const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(hash), secret);
      const originalUrl = decrypted.toString(CryptoJS.enc.Utf8);
      
      if (originalUrl && originalUrl.startsWith("http")) {
        window.location.href = originalUrl;
      } else {
        document.body.innerHTML = `<h2 style="color:red;text-align:center;margin-top:50px">Invalid or corrupted link</h2>`;
      }
    } catch (error) {
      document.body.innerHTML = `<h2 style="color:red;text-align:center;margin-top:50px">Failed to decrypt link</h2>`;
    }
  }, []);

  return (
    <div style={{ color: "#eee", textAlign: "center", marginTop: "3rem" }}>
      <h2>Redirecting...</h2>
      <p>Silakan tunggu sebentar...</p>
    </div>
  );
};

export default Redirector;