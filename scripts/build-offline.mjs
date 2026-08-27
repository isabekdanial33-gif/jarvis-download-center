import fs from "node:fs";
import path from "node:path";
import { releases, latestAndroid, latestWindows, latestMacArmZip, latestMacIntelZip } from "../lib/releases.js";

const root = process.cwd();
const source = process.env.JARVIS_RELEASE_DIR || path.resolve(root, "..", "JarvisAssistant", "dist");
const downloads = path.join(root, "public", "downloads");
fs.mkdirSync(downloads, { recursive: true });

for (const release of releases) {
  const direct = path.join(source, release.filename);
  const arch = release.filename.includes("arm64") ? "jarvis-macos-arm64" : "jarvis-macos-x64";
  const from = fs.existsSync(direct) ? direct : path.join(source, "macos-0.5.0", arch, release.filename);
  const to = path.join(downloads, release.filename);
  const stat = fs.statSync(from);
  if (stat.size !== release.size) throw new Error(`Unexpected size for ${release.filename}`);
  if (fs.existsSync(to)) {
    if (fs.statSync(to).size !== release.size) throw new Error(`Invalid existing file: ${to}`);
    continue;
  }
  fs.linkSync(from, to);
}

const data = JSON.stringify(releases).replaceAll("<", "\\u003c");
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>JARVIS — Offline Download Center</title><style>
:root{--bg:#05080b;--panel:#0a1116;--line:#1c3039;--cyan:#29e5ff;--text:#ecf8fa;--muted:#6f828b}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:Arial,sans-serif;background-image:linear-gradient(rgba(41,229,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(41,229,255,.035) 1px,transparent 1px);background-size:48px 48px}.shell{width:min(1100px,calc(100% - 30px));margin:auto}nav{height:76px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;font:11px Consolas,monospace;letter-spacing:2px}.brand{display:flex;align-items:center;gap:10px}.orb{width:24px;height:24px;border:1px solid var(--cyan);border-radius:50%;box-shadow:inset 0 0 10px var(--cyan),0 0 12px var(--cyan)}.online{color:#62eab2}.hero{padding:80px 0 65px;border-bottom:1px solid var(--line)}.label{color:var(--cyan);font:10px Consolas,monospace;letter-spacing:2px}h1{margin:18px 0;font-size:clamp(52px,8vw,94px);line-height:.9;letter-spacing:-6px}h1 span{color:transparent;-webkit-text-stroke:1px var(--cyan)}.hero p{max-width:650px;color:#91a3ac;line-height:1.6}.actions{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap}.primary{display:block;padding:18px 24px;background:var(--cyan);color:#001014;text-decoration:none;font:bold 11px Consolas,monospace;letter-spacing:1px}.secondary{background:var(--panel);color:var(--text);border:1px solid var(--line)}section{padding:70px 0}.head{display:flex;justify-content:space-between;align-items:end;margin-bottom:25px}.head h2{margin:8px 0 0;font-size:38px}.filters{display:flex;gap:5px}.filters button{padding:11px 15px;background:var(--panel);border:1px solid var(--line);color:var(--muted);cursor:pointer}.filters button.active{background:var(--cyan);color:#001014}.list{border:1px solid var(--line)}.row{min-height:76px;padding:12px 16px;border-bottom:1px solid var(--line);display:grid;grid-template-columns:2fr .6fr .7fr 46px;align-items:center}.row:last-child{border-bottom:0}.row:hover{background:#09151b}.name{display:flex;flex-direction:column;gap:5px}.name b{font-size:12px}.name small,.size{color:var(--muted);font:9px Consolas,monospace}.version{font:12px Consolas,monospace}.dl{width:38px;height:38px;border:1px solid var(--cyan);color:var(--cyan);display:grid;place-items:center;text-decoration:none}.dl:hover{background:var(--cyan);color:#001014}.note{padding:18px;border:1px solid #514521;background:#17140a;color:#c9b977;font:11px/1.6 Consolas,monospace;margin-top:24px}footer{padding:35px 0;border-top:1px solid var(--line);color:var(--muted);font:9px Consolas,monospace}@media(max-width:650px){nav .online{display:none}.hero{padding-top:55px}h1{letter-spacing:-4px}.head{display:block}.filters{margin-top:20px}.row{grid-template-columns:1fr 60px 40px}.version{display:none}}
</style></head><body><nav class="shell"><div class="brand"><i class="orb"></i>JARVIS INTELLIGENCE</div><div class="online">● OFFLINE RELEASE STORAGE READY</div></nav>
<header class="hero shell"><div class="label">LOCAL DOWNLOAD CENTER / ALL BUILDS</div><h1>DOWNLOAD<br><span>JARVIS.</span></h1><p>This page works without a server. Every button points to a real EXE, APK, DMG or ZIP containing JARVIS Assistant.app stored beside this page.</p><div class="actions"><a class="primary" href="public/downloads/${latestWindows.filename}" download>DOWNLOAD WINDOWS ${latestWindows.version} ↓</a><a class="primary secondary" href="public/downloads/${latestMacArmZip.filename}" download>MAC APPLE SILICON ZIP ↓</a><a class="primary secondary" href="public/downloads/${latestMacIntelZip.filename}" download>MAC INTEL ZIP ↓</a><a class="primary secondary" href="public/downloads/${latestAndroid.filename}" download>DOWNLOAD APK ${latestAndroid.version} ↓</a></div></header>
<section class="shell"><div class="head"><div><div class="label">RELEASE ARCHIVE</div><h2>ALL VERSIONS</h2></div><div class="filters"><button class="active" data-filter="all">ALL</button><button data-filter="windows">WINDOWS</button><button data-filter="macos">macOS</button><button data-filter="android">ANDROID</button></div></div><div id="list" class="list"></div><div class="note">macOS: unpack ZIP, move JARVIS Assistant.app to Applications, then Control-click → Open. Allow Accessibility, Screen Recording and Microphone. If necessary, run: xattr -dr com.apple.quarantine "/Applications/JARVIS Assistant.app". Never disable Gatekeeper globally.</div></section><footer class="shell">JARVIS DOWNLOAD CENTER · LOCAL FILE MODE · 2026</footer>
<script>const releases=${data};const list=document.querySelector('#list');const fmt=n=>n>1048576?(n/1048576).toFixed(1)+' MB':(n/1024).toFixed(1)+' KB';function draw(filter='all'){list.innerHTML=releases.filter(r=>filter==='all'||r.platform===filter).map(r=>'<div class="row"><div class="name"><b>'+r.label+'</b><small>'+r.kind+(r.recommended?' · RECOMMENDED':r.legacy?' · LEGACY':'')+'</small></div><b class="version">'+r.version+'</b><span class="size">'+fmt(r.size)+'</span><a class="dl" title="Download '+r.filename+'" download href="public/downloads/'+encodeURIComponent(r.filename)+'">↓</a></div>').join('')}draw();document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');draw(b.dataset.filter)})</script></body></html>`;

fs.writeFileSync(path.join(root, "OPEN-DOWNLOADS.html"), html, "utf8");
console.log(`Prepared ${releases.length} real downloads in ${downloads}`);
