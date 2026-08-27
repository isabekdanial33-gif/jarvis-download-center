"use client";

import { useMemo, useState } from "react";
import { releases, latestAndroid, latestWindows, formatBytes, releaseDownloadUrl } from "../lib/releases.js";

const filters = [["all", "ALL BUILDS"], ["windows", "WINDOWS"], ["android", "ANDROID APK"]];

function DownloadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>;
}

function PlatformIcon({ platform }) {
  return platform === "android" ? <span className="platformGlyph">A</span> : <span className="platformGlyph windowsGlyph">⊞</span>;
}

function DownloadButton({ item, primary = false }) {
  return (
    <a className={primary ? "downloadButton primary" : "downloadButton"} href={releaseDownloadUrl(item)}>
      <DownloadIcon />
      <span><b>{item.cta}</b><small>{item.version} · {formatBytes(item.size)}</small></span>
    </a>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [copied, setCopied] = useState("");
  const visible = useMemo(() => releases.filter((item) => filter === "all" || item.platform === filter), [filter]);

  async function copyHash(item) {
    await navigator.clipboard.writeText(item.sha256);
    setCopied(item.filename);
    window.setTimeout(() => setCopied(""), 1600);
  }

  return (
    <main>
      <nav className="nav shell">
        <a href="#top" className="wordmark"><span className="miniOrb" />JARVIS <i>INTELLIGENCE</i></a>
        <div className="navLinks"><a href="#downloads">DOWNLOADS</a><a href="#versions">VERSIONS</a><a href="#install">INSTALL</a></div>
        <span className="status"><i />SYSTEM ONLINE</span>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <div className="overline">JARVIS / PERSONAL COMPUTER INTELLIGENCE</div>
          <h1>YOUR MACHINE.<br /><em>NOW INTELLIGENT.</em></h1>
          <p>Voice-first AI control for Windows and Android. Talk, automate, build, navigate — with your models, your keys and your rules.</p>
          <div className="heroActions"><DownloadButton item={latestWindows} primary /><DownloadButton item={latestAndroid} /></div>
          <div className="heroMeta"><span>WINDOWS 10/11 · X64</span><span>ANDROID 8.0+</span><span>BRING YOUR OWN API</span></div>
        </div>
        <div className="core" aria-label="JARVIS neural core illustration">
          <div className="coreLabel top">VOICE / SCREEN / ACTION</div>
          <div className="ring r1"><div className="ring r2"><div className="ring r3"><div className="orb"><span /></div></div></div></div>
          <div className="coordinates">51.1694° N<br />71.4491° E</div>
          <div className="coreLabel bottom">CORE // 04.06</div>
        </div>
      </section>

      <section className="latest shell" id="downloads">
        <header className="sectionHeader"><div><span>01</span><p>RECOMMENDED BUILDS</p></div><h2>CHOOSE YOUR SYSTEM</h2><p>Latest stable releases. Older builds remain available below.</p></header>
        <div className="productGrid">
          <article className="productCard featured">
            <div className="cardTop"><PlatformIcon platform="windows" /><span>PRIMARY RELEASE</span></div>
            <div><p className="platform">WINDOWS DESKTOP</p><h3>JARVIS<br />ASSISTANT</h3><p className="description">Full installer with global F10 activation, wake word, screen vision, cursor and keyboard control.</p></div>
            <div className="cardFooter"><div><b>{latestWindows.version}</b><span>{formatBytes(latestWindows.size)} · SETUP · X64</span></div><DownloadButton item={latestWindows} /></div>
          </article>
          <article className="productCard androidCard">
            <div className="cardTop"><PlatformIcon platform="android" /><span>MOBILE RELEASE</span></div>
            <div><p className="platform">ANDROID APK</p><h3>JARVIS<br />MOBILE</h3><p className="description">The same command center interface with voice wake, volume-key launch and Accessibility control.</p></div>
            <div className="cardFooter"><div><b>{latestAndroid.version}</b><span>{formatBytes(latestAndroid.size)} · APK · ARM/X64</span></div><DownloadButton item={latestAndroid} /></div>
          </article>
          <article className="featureList">
            <p className="platform">WHAT'S INSIDE</p>
            {["MULTI-MODEL API SUPPORT", "LOCAL GGUF MODELS", "VOICE WAKE + BARGE-IN", "SCREEN + COMPUTER CONTROL", "ENCRYPTED LOCAL SECRETS", "PROJECTS, CHATS, LOGS"].map((feature, index) => <div key={feature}><span>{String(index + 1).padStart(2, "0")}</span>{feature}<i>✓</i></div>)}
          </article>
        </div>
      </section>

      <section className="archive shell" id="versions">
        <header className="sectionHeader compact"><div><span>02</span><p>RELEASE ARCHIVE</p></div><h2>ALL VERSIONS</h2><p>{releases.length} downloadable builds</p></header>
        <div className="filterBar" role="tablist" aria-label="Filter releases">
          {filters.map(([id, label]) => <button role="tab" aria-selected={filter === id} className={filter === id ? "active" : ""} onClick={() => setFilter(id)} key={id}>{label}<span>{id === "all" ? releases.length : releases.filter((item) => item.platform === id).length}</span></button>)}
        </div>
        <div className="releaseTable">
          <div className="tableHead"><span>PLATFORM / BUILD</span><span>VERSION</span><span>SIZE</span><span>SHA-256</span><span>ACTION</span></div>
          {visible.map((item) => (
            <article className={item.recommended ? "releaseRow recommended" : "releaseRow"} key={item.filename}>
              <div className="releaseName"><PlatformIcon platform={item.platform} /><span><b>{item.label}</b><small>{item.kind}{item.recommended ? " · RECOMMENDED" : item.legacy ? " · LEGACY" : ""}</small></span></div>
              <b className="version">{item.version}</b><span className="size">{formatBytes(item.size)}</span>
              <button className="hash" onClick={() => copyHash(item)} title="Copy SHA-256">{copied === item.filename ? "COPIED" : `${item.sha256.slice(0, 10)}…`}</button>
              <a className="rowDownload" href={releaseDownloadUrl(item)} aria-label={`Download ${item.label} ${item.version}`}><DownloadIcon /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="install shell" id="install">
        <header className="sectionHeader compact"><div><span>03</span><p>QUICK START</p></div><h2>INSTALL & WAKE</h2><p>Two minutes to first command</p></header>
        <div className="installGrid">
          <article><span>WINDOWS</span><h3>01</h3><p>Download Setup, open it, complete installation, then enter your API key. Press <b>F10</b> or enable the “Jarvis” wake word.</p><aside>Smart App Control may block unsigned builds. Keep Defender enabled and review the SHA-256 before running.</aside></article>
          <article><span>ANDROID</span><h3>02</h3><p>Install the APK, allow restricted settings, then enable <b>JARVIS — phone control</b> in Accessibility.</p><aside>Enable microphone and notification access for background wake word. Hold Volume + and − together to launch.</aside></article>
        </div>
      </section>

      <footer className="shell"><div className="wordmark"><span className="miniOrb" />JARVIS <i>INTELLIGENCE</i></div><p>LOCAL-FIRST · USER-CONTROLLED · ALL RELEASES VERIFIED BY SHA-256</p><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
