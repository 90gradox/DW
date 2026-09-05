const express = require("express");
const cors = require("cors");
const { Readable } = require("stream");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({origin: true}));
app.use(express.json({limit:"1mb"}));

function validateUrl(value){
  const u = new URL(value);
  if(!["http:","https:"].includes(u.protocol)) throw new Error("Protocolo no permitido.");
  return u;
}

app.get("/api/inspect", async (req,res)=>{
  try{
    const u = validateUrl(req.query.url);
    const r = await fetch(u, {method:"HEAD", redirect:"follow"});
    const type = r.headers.get("content-type") || "";
    if(!type.startsWith("video/"))
      return res.status(415).json({error:"La URL no parece ser un archivo de video directo."});
    res.json({
      filename: decodeURIComponent(u.pathname.split("/").pop() || "video"),
      contentType:type,
      size:r.headers.get("content-length")
    });
  }catch(e){res.status(400).json({error:e.message});}
});

app.get("/api/download", async (req,res)=>{
  try{
    const u = validateUrl(req.query.url);
    const r = await fetch(u, {redirect:"follow"});
    if(!r.ok) return res.status(r.status).json({error:"El servidor de origen no permitió la descarga."});
    const type = r.headers.get("content-type") || "";
    if(!type.startsWith("video/"))
      return res.status(415).json({error:"Solo se permiten archivos de video directos."});

    const name = decodeURIComponent(new URL(r.url).pathname.split("/").pop() || "descarga-90.mp4")
      .replace(/[^a-zA-Z0-9._-]/g,"_");
    res.setHeader("Content-Type", type);
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    if(r.headers.get("content-length")) res.setHeader("Content-Length", r.headers.get("content-length"));
    Readable.fromWeb(r.body).pipe(res);
  }catch(e){res.status(400).json({error:e.message});}
});

app.get("/health",(req,res)=>res.json({ok:true,service:"Descarga 90"}));

app.listen(PORT,()=>console.log(`Descarga 90 backend en puerto ${PORT}`));
