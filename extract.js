// extract .txt files manifest from google drive
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";

const RCLONE_EXE = "C:\\rclone\\rclone.exe";
const REMOTE_NAME = "gdrive:";
const BATCH_SIZE = 50;
const BATCH_NUM = 7;  // Change this each run: 1, 2, 3, 4, 5, 6, 7
const OUTPUT_FILE = `drive_summary_batch_${BATCH_NUM}.json`;

async function run() {
  console.log("Fetching file list from Google Drive...");

  const listCmd = spawnSync(RCLONE_EXE, [
    "lsf", REMOTE_NAME,
    "--include", "*.txt",
    "--recursive", "--files-only", "--format", "p"
  ]);

  if (listCmd.error) return console.error("Rclone failed. Check RCLONE_EXE path.");

  let fileList = listCmd.stdout
    .toString()
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  // console.log("Sample paths:", fileList.slice(0, 3));
  console.log(`Total files found: ${fileList.length}`);

  const start = (BATCH_NUM - 1) * BATCH_SIZE;
  const end = start + BATCH_SIZE;
  fileList = fileList.slice(start, end);
  console.log(`Batch ${BATCH_NUM}: files ${start + 1} to ${Math.min(end, fileList.length)} of ${fileList.length}`);

  const manifest = [];

  for (const [i, remotePath] of fileList.entries()) {
    const fileName = path.basename(remotePath);
    console.log(`[${i + 1}/${fileList.length}] ${fileName}`);

    const copy = spawnSync(RCLONE_EXE, ["cat", `${REMOTE_NAME}${remotePath}`]);

    if (copy.status !== 0) {
      console.warn(`Skip ${fileName}: ${copy.stderr.toString().trim()}`);
      continue;
    }

    const text = copy.stdout.toString() || "";
    manifest.push({
      fileName,
      remotePath,
      size: `${(Buffer.byteLength(copy.stdout) / 1024).toFixed(2)} KB`,
      snippet: text.substring(0, 1000).replace(/\s+/g, ' ').trim()
    });
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`Done. Saved to ${OUTPUT_FILE}`);
  
}

run();