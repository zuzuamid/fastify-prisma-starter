import fs from "fs";
import path from "path";

const appDir = path.join(__dirname, "../", "app", "modules");

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const renameModule = (oldName: string, newName: string): void => {
  const oldDir = path.join(appDir, oldName);
  const newDir = path.join(appDir, newName);

  if (!fs.existsSync(oldDir)) {
    throw new Error(`❌ Module "${oldName}" does not exist.`);
  }

  // Check if newName module already exists
  if (fs.existsSync(newDir)) {
    throw new Error(`⚠️ Module "${newName}" already exists.`);
  }

  // STEP 1: Rename directory
  fs.renameSync(oldDir, newDir);
  console.log(`📂 Renamed directory: ${oldDir} → ${newDir}`);

  // STEP 2: Replace content in files
  const files = fs.readdirSync(newDir);
  const oldCap = capitalize(oldName);
  const newCap = capitalize(newName);

  files.forEach((file) => {
    const filePath = path.join(newDir, file);
    
    // Skip if it's a directory
    if (fs.statSync(filePath).isDirectory()) {
      return;
    }

    let content = fs.readFileSync(filePath, "utf-8");

    // Replace lowercase and capitalized names
    // Use word boundaries to avoid partial replacements
    content = content
      .replace(new RegExp(`\\b${oldName}\\b`, "g"), newName)
      .replace(new RegExp(`\\b${oldCap}\\b`, "g"), newCap)
      .replace(new RegExp(oldName, "g"), newName)
      .replace(new RegExp(oldCap, "g"), newCap);

    // Rename file if it contains the old module name
    let newFilePath = filePath;
    if (file.includes(oldName)) {
      const newFileName = file.replace(oldName, newName);
      newFilePath = path.join(newDir, newFileName);
    }

    fs.writeFileSync(newFilePath, content, "utf-8");

    if (filePath !== newFilePath) {
      fs.unlinkSync(filePath);
      console.log(`✏️  File renamed: ${path.basename(filePath)} → ${path.basename(newFilePath)}`);
    } else {
      console.log(`✅ File updated: ${path.basename(filePath)}`);
    }
  });

  console.log(`\n🎉 Module "${oldName}" successfully renamed to "${newName}"!`);
};

// ------------------------------
// CLI Usage
// ------------------------------
const oldName = process.argv[2];
const newName = process.argv[3];

if (!oldName || !newName) {
  console.error("❌ Usage: npm run rename-module <oldName> <newName>");
  console.error("   Example: npm run rename-module product item");
  process.exit(1);
}

try {
  renameModule(oldName, newName);
} catch (error: any) {
  console.error(error.message);
  process.exit(1);
}
