import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/chainsawman";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/chainsaw-man/images/8/8a/Volume_01_-_English.png/revision/latest?cb=20230409072326",
    "https://static.wikia.nocookie.net/chainsaw-man/images/d/de/Volume_02_-_English.png/revision/latest?cb=20230409081059",
    "https://static.wikia.nocookie.net/chainsaw-man/images/b/ba/Volume_03_-_English.png/revision/latest?cb=20230409081715",
    "https://static.wikia.nocookie.net/chainsaw-man/images/3/35/Volume_04_-_English.png/revision/latest?cb=20230409081801",
    "https://static.wikia.nocookie.net/chainsaw-man/images/d/dc/Volume_05_-_English.png/revision/latest?cb=20230409082119",
    "https://static.wikia.nocookie.net/chainsaw-man/images/e/ef/Volume_06_-_English.png/revision/latest?cb=20230409082247",
    "https://static.wikia.nocookie.net/chainsaw-man/images/9/94/Volume_07_-_English.png/revision/latest?cb=20230409082439",
    "https://static.wikia.nocookie.net/chainsaw-man/images/b/b0/Volume_08_-_English.png/revision/latest?cb=20230409082654",
    "https://static.wikia.nocookie.net/chainsaw-man/images/7/77/Volume_09_-_English.png/revision/latest?cb=20230409082720",
    "https://static.wikia.nocookie.net/chainsaw-man/images/9/99/Volume_10_-_English.png/revision/latest?cb=20230409082826",
    "https://static.wikia.nocookie.net/chainsaw-man/images/4/41/Volume_11_-_English.png/revision/latest?cb=20230409082841",
    "https://static.wikia.nocookie.net/chainsaw-man/images/1/14/Volume_12_-_English.png/revision/latest?cb=20231003053232",
    "https://static.wikia.nocookie.net/chainsaw-man/images/8/88/Volume_13_-_English.png/revision/latest?cb=20231226083316",
    "https://static.wikia.nocookie.net/chainsaw-man/images/5/54/Volume_14_-_English.png/revision/latest?cb=20240206230255",
    "https://static.wikia.nocookie.net/chainsaw-man/images/b/be/Volume_15_-_English.png/revision/latest?cb=20240506213357",
    "https://static.wikia.nocookie.net/chainsaw-man/images/a/a7/Volume_16_-_English.png/revision/latest?cb=20240902224054",
    "https://static.wikia.nocookie.net/chainsaw-man/images/c/ce/Volume_17_-_English.png/revision/latest?cb=20250106195557",
    "https://static.wikia.nocookie.net/chainsaw-man/images/a/a4/Volume_18_-_English.png/revision/latest?cb=20250505175045",
    "https://static.wikia.nocookie.net/chainsaw-man/images/9/92/Volume_19_-_English.png/revision/latest?cb=20251007082037",
    "https://static.wikia.nocookie.net/chainsaw-man/images/3/3b/Volume_20_-_English.png/revision/latest?cb=20260112004129",
    "https://static.wikia.nocookie.net/chainsaw-man/images/d/d5/NoPicAvailable.png/revision/latest?cb=20260106210041",
    "https://static.wikia.nocookie.net/chainsaw-man/images/d/d5/NoPicAvailable.png/revision/latest?cb=20260106210041",
    "https://static.wikia.nocookie.net/chainsaw-man/images/d/d5/NoPicAvailable.png/revision/latest?cb=20260106210041"
]

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
