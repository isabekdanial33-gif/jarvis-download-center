import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { releases,latestAndroid,latestWindows } from "../lib/releases.js";
const dist=path.resolve(process.cwd(),"..","JarvisAssistant","dist");
test("release filenames and hashes are unique",()=>{assert.equal(new Set(releases.map(item=>item.filename)).size,releases.length);assert.equal(new Set(releases.map(item=>item.sha256)).size,releases.length)});
test("latest Windows and Android builds are recommended",()=>{assert.equal(latestWindows.version,"0.4.6");assert.equal(latestAndroid.version,"0.2.0");assert.equal(latestWindows.recommended,true);assert.equal(latestAndroid.recommended,true)});
test("every catalog entry points to a real artifact with the expected size",()=>{for(const release of releases){const stat=fs.statSync(path.join(dist,release.filename));assert.equal(stat.size,release.size,release.filename)}});
