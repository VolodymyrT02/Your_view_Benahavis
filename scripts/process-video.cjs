#!/usr/bin/env node
const { existsSync, mkdirSync, copyFileSync } = require("fs");
const { spawnSync } = require("child_process");
const path = require("path");

const root = process.cwd();
const input = path.resolve(root, "assets-source/videos/property-tour.mp4");
const outputDir = path.resolve(root, "public/media");
const output = path.resolve(outputDir, "property-tour-720p.mp4");
const posterOutput = path.resolve(root, "public/property-tour-poster.jpg");

const ensureDir = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const run = (command, args, errorMessage) => {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(errorMessage);
  }
};

const hasFfmpeg = () => {
  const probe = spawnSync("ffmpeg", ["-version"], { stdio: "ignore" });
  return probe.status === 0;
};

if (!existsSync(input)) {
  console.warn("⚠️  No source video found at", input);
  process.exit(0);
}

ensureDir(outputDir);

if (hasFfmpeg()) {
  try {
    console.log("🎥 Generating 720p H.264 output…");
    run(
      "ffmpeg",
      [
        "-y",
        "-i",
        input,
        "-vf",
        "scale='min(1280,iw)':-2",
        "-c:v",
        "libx264",
        "-crf",
        "22",
        "-preset",
        "medium",
        "-c:a",
        "aac",
        "-movflags",
        "+faststart",
        output,
      ],
      "Failed to create optimised video output",
    );

    console.log("🖼️  Extracting poster frame…");
    run(
      "ffmpeg",
      [
        "-y",
        "-i",
        input,
        "-ss",
        "00:00:02",
        "-vframes",
        "1",
        "-vf",
        "scale='min(1600,iw)':-2",
        posterOutput,
      ],
      "Failed to generate poster image",
    );
  } catch (error) {
    console.warn("⚠️  ", error.message, "— falling back to copying original video");
    copyFileSync(input, output);
  }
} else {
  console.warn("⚠️  ffmpeg not found. Copying original video to public/media.");
  copyFileSync(input, output);
  if (!existsSync(posterOutput)) {
    console.warn("ℹ️  Poster image missing and ffmpeg unavailable. Please add it manually at:", posterOutput);
  }
}

console.log("✅ Video assets are ready.");
