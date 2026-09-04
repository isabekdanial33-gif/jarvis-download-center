import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { releases,latestAndroid,latestWindows,latestMacArmZip,latestMacIntelZip } from "../lib/releases.js";
const dist=path.resolve(process.cwd(),"..","JarvisAssistant","dist");
function artifactPath(filename){const direct=path.join(dist,filename);if(fs.existsSync(direct))return direct;const arch=filename.includes("arm64")?"jarvis-macos-arm64":"jarvis-macos-x64";return path.join(dist,"macos-0.5.0",arch,filename)}
test("release filenames and hashes are unique",()=>{assert.equal(new Set(releases.map(item=>item.filename)).size,releases.length);assert.equal(new Set(releases.map(item=>item.sha256)).size,releases.length)});
test("latest desktop and Android builds are available",()=>{assert.equal(latestWindows.version,"0.5.0");assert.equal(latestAndroid.version,"0.2.0");assert.equal(latestMacArmZip.version,"0.5.0");assert.equal(latestMacIntelZip.version,"0.5.0");assert.equal(latestWindows.recommended,true);assert.equal(latestAndroid.recommended,true)});
test("every local catalog entry points to a real artifact with the expected size",()=>{for(const release of releases.filter(item=>!item.remoteOnly)){const stat=fs.statSync(artifactPath(release.filename));assert.equal(stat.size,release.size,release.filename)}});
test("remote builds have a direct release URL and verified metadata",()=>{for(const release of releases.filter(item=>item.remoteOnly)){assert.match(release.downloadUrl,/^https:\/\/github\.com\//);assert.ok(release.size>0);assert.match(release.sha256,/^[A-F0-9]{64}$/)}});
