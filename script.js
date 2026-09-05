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

const domains = {
  TikTok: ["tiktok.com", "vm.tiktok.com"],
  Instagram: ["instagram.com"],
  Facebook: ["facebook.com", "fb.watch"],
  YouTube: ["youtube.com", "youtu.be"]
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

function detectPlatform(value) {
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    for (const [platform, allowed] of Object.entries(domains)) {
      if (allowed.some(domain => host === domain || host.endsWith("." + domain))) {
        return platform;
      }
    }
  } catch {}
  return null;
}

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

function showInlineStatus(message, type = "info") {
  let status = document.getElementById("inlineStatus");
  if (!status) {
    status = document.createElement("div");
    status.id = "inlineStatus";
    status.style.cssText = `
      margin:10px 6px 4px;
      padding:12px 14px;
      border-radius:12px;
      font-size:11px;
      line-height:1.5;
      border:1px solid #e5e5e5;
      background:#fafafa;
      color:#666;
    `;
    analyzeBtn.parentElement.parentElement.appendChild(status);
  }
  status.textContent = message;
  status.style.color = type === "error" ? "#b80710" : "#666";
  status.style.borderColor = type === "error" ? "#f0b6b9" : "#e5e5e5";
}

analyzeBtn.addEventListener("click", () => {
  const value = urlInput.value.trim();

  if (!value || !isLikelyUrl(value)) {
    showInlineStatus("Pega un enlace válido para continuar.", "error");
    urlInput.focus();
    return;
  }

  const detected = detectPlatform(value);

  if (detected && detected !== currentPlatform) {
    currentPlatform = detected;
    platforms.forEach(item => {
      item.classList.toggle("active", item.dataset.platform === detected);
    });
    selectedPlatform.textContent = detected;
  }

  const original = analyzeBtn.innerHTML;
  analyzeBtn.innerHTML = "<span>Analizando...</span><span>•••</span>";
  analyzeBtn.disabled = true;

  setTimeout(() => {
    result.hidden = false;
    resultTitle.textContent = `${currentPlatform}: enlace detectado`;
    resultMeta.textContent = "Vista previa de la interfaz. Conecta tu backend para obtener los datos y archivos reales.";
    formats.innerHTML = "";

    formatMap[currentPlatform].forEach(format => {
      const button = document.createElement("button");
      button.className = "format-btn";
      button.textContent = `↓ ${format}`;
      button.addEventListener("click", () => {
        showInlineStatus(
          `El botón ${format} está listo. Para descargar el archivo realmente necesitas conectar el backend de Descarga 90.`,
          "info"
        );
      });
      formats.appendChild(button);
    });

    analyzeBtn.innerHTML = original;
    analyzeBtn.disabled = false;
    showInlineStatus("Enlace analizado correctamente. Esta versión es el frontend; la descarga real se conecta desde el backend.");
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 650);
});

document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("open"));
});

const menuBtn = document.querySelector(".menu-btn");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
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
}
