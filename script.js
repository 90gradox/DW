const API_BASE = ""; // Ej.: "https://tu-backend.example.com"

const urlInput = document.getElementById("url");
const analyzeBtn = document.getElementById("analyze");
const result = document.getElementById("result");
const statusBox = document.getElementById("status");
const resultUrl = document.getElementById("resultUrl");
const downloadBtn = document.getElementById("download");

let currentUrl = "";

function setStatus(text, error=false){
  statusBox.textContent = text;
  statusBox.className = "status" + (error ? " error" : "");
}

function looksLikeDirectVideo(url){
  try{
    const u = new URL(url);
    return /^https?:$/.test(u.protocol);
  }catch{return false}
}

analyzeBtn.addEventListener("click", async ()=>{
  const url = urlInput.value.trim();
  result.classList.add("hidden");
  if(!looksLikeDirectVideo(url)){
    setStatus("Introduce una URL válida que comience por http:// o https://.", true);
    return;
  }
  currentUrl = url;
  resultUrl.textContent = url;
  setStatus("Comprobando enlace…");

  // Si hay backend configurado, consulta sus metadatos.
  if(API_BASE){
    try{
      const r = await fetch(`${API_BASE}/api/inspect?url=${encodeURIComponent(url)}`);
      if(!r.ok) throw new Error("No se pudo analizar el enlace.");
      const data = await r.json();
      resultUrl.textContent = data.filename || url;
    }catch(e){
      setStatus(e.message, true);
      return;
    }
  }
  result.classList.remove("hidden");
  setStatus("Enlace listo. Pulsa descargar.");
});

downloadBtn.addEventListener("click", async ()=>{
  if(!currentUrl) return;
  if(!API_BASE){
    // Descarga directa para URLs de archivos públicos.
    const a = document.createElement("a");
    a.href = currentUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setStatus("Si el servidor de origen lo permite, la descarga comenzará en una nueva pestaña.");
    return;
  }

  try{
    setStatus("Preparando descarga…");
    const r = await fetch(`${API_BASE}/api/download?url=${encodeURIComponent(currentUrl)}`);
    if(!r.ok) throw new Error("El backend rechazó la descarga.");
    const blob = await r.blob();
    const disposition = r.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="?([^"]+)"?/i);
    const filename = match ? match[1] : "descarga-90-video";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus("Descarga iniciada.");
  }catch(e){ setStatus(e.message, true); }
});
