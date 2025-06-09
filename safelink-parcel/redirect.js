// Ambil parameter code dari URL
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
const infoEl = document.getElementById("info");
const altBtn = document.getElementById("altBtn");

// Ambil safelinks dari localStorage
const safelinks = JSON.parse(localStorage.getItem("safelinks") || "{}");

if (!code || !safelinks[code]) {
  infoEl.textContent = "Invalid or missing link code.";
} else {
  const realUrl = safelinks[code];
  infoEl.textContent = "You will be redirected shortly...";
  altBtn.style.display = "inline-block";
  altBtn.onclick = () => window.location.href = realUrl;

  setTimeout(() => {
    window.location.href = realUrl;
  }, 5000); // delay 5 detik sebelum redirect
}