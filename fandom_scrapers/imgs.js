import fs from "fs";
import fetch from "node-fetch";
import path from "path";

// Arguments:
// 1) JSON file path
// 2) folder name
const jsonFile = process.argv[2];
const folderName = process.argv[3];

if (!jsonFile || !folderName) {
    console.error("Usage: node download.js <jsonFile> <folderName>");
    process.exit(1);
}

// Load JSON array
const jsonPath = path.resolve(jsonFile);
const volumeLinks = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

// Create folder: images/<folderName>
const folder = path.join("images", folderName);
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
}

async function downloadImage(url, filename) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Failed to download ${url}: ${res.status}`);
            return;
        }
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(path.join(folder, filename), Buffer.from(buffer));
        console.log(`Downloaded ${filename}`);
    } catch (err) {
        console.error(`Error downloading ${url}: ${err.message}`);
    }
}

(async () => {
    for (let i = 0; i < volumeLinks.length; i++) {
        const url = volumeLinks[i];
        const filename = `vol_${String(i + 1).padStart(3, "0")}.png`;
        await downloadImage(url, filename);
    }
})();

//example usage - node fandom_scrapers\imgs.js fandom_scrapers\bbox\imgs.json bbox