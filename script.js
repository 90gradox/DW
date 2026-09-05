const platforms = document.querySelectorAll(".platform");
const selectedPlatform = document.getElementById("selectedPlatform");
const urlInput = document.getElementById("urlInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultMeta = document.getElementById("resultMeta");
const formats = document.getElementById("formats");

let currentPlatform = "TikTok";

const formatMap = {
  TikTok: ["MP4 · Video"],
  Instagram: ["MP4 · Reel / Video"],
  Facebook: ["MP4 · Video"],
  YouTube: ["MP4 · 1080p", "MP4 · 720p", "MP3 · Audio"]
};

platforms.forEach(btn => {
  btn.addEventListener("click", () => {
    platforms.forEach(item => item.classList.remove("active"));
    btn.classList.add("active");
    currentPlatform = btn.dataset.platform;
    selectedPlatform.textContent = currentPlatform;
    result.hidden = true;
  });
});

urlInput.addEventListener("input", () => {
  clearBtn.style.display = urlInput.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
  urlInput.value = "";
  clearBtn.style.display = "none";
  result.hidden = true;
  urlInput.focus();
});

function isLikelyUrl(value) {
  try {
    const u = new URL(value);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
}

analyzeBtn.addEventListener("click", () => {
  const value = urlInput.value.trim();

  if (!value || !isLikelyUrl(value)) {
    urlInput.focus();
    urlInput.style.borderColor = "#e50914";
    setTimeout(() => urlInput.style.borderColor = "", 900);
    return;
  }

  const original = analyzeBtn.innerHTML;
  analyzeBtn.innerHTML = "<span>Analizando...</span><span>•••</span>";
  analyzeBtn.disabled = true;

  setTimeout(() => {
    result.hidden = false;
    resultTitle.textContent = `${currentPlatform}: enlace detectado`;
    resultMeta.textContent = "Vista previa simulada · Conecta tu backend para obtener datos reales.";
    formats.innerHTML = "";

    formatMap[currentPlatform].forEach(format => {
      const button = document.createElement("button");
      button.className = "format-btn";
      button.textContent = `↓ ${format}`;
      button.addEventListener("click", () => {
        alert(`La interfaz está lista para ${format}. Para iniciar una descarga real debes conectar un backend autorizado.`);
      });
      formats.appendChild(button);
    });

    analyzeBtn.innerHTML = original;
    analyzeBtn.disabled = false;
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 650);
});

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("open"));
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  const nav = document.querySelector("nav");
  nav.style.display = nav.style.display === "flex" ? "" : "flex";
  nav.style.position = "absolute";
  nav.style.right = "24px";
  nav.style.top = "72px";
  nav.style.flexDirection = "column";
  nav.style.background = "#fff";
  nav.style.padding = "18px";
  nav.style.borderRadius = "16px";
  nav.style.boxShadow = "0 15px 40px rgba(0,0,0,.12)";
});
