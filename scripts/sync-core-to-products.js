const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "automation", "project-split.json");

function ensureDirFor(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const sourcePath = path.join(root, config.sharedCore.path);
  const content = fs.readFileSync(sourcePath, "utf8");

  for (const target of config.sharedCore.syncTargets || []) {
    const targetPath = path.join(root, target);
    ensureDirFor(targetPath);
    fs.writeFileSync(targetPath, content, "utf8");
    console.log(`[split-sync] wrote ${target}`);
  }
}

main();
