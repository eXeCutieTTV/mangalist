
import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/dandadan";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/dandadan/images/d/d4/Volume_1_%28English%29.png/revision/latest?cb=20220724083550",
    "https://static.wikia.nocookie.net/dandadan/images/1/15/Volume_2_%28English%29.png/revision/latest?cb=20220904192502",
    "https://static.wikia.nocookie.net/dandadan/images/6/6c/Volume_3_%28English%29.png/revision/latest?cb=20221221092100",
    "https://static.wikia.nocookie.net/dandadan/images/e/e4/Volume_4_%28English%29.png/revision/latest?cb=20230302022034",
    "https://static.wikia.nocookie.net/dandadan/images/2/2e/Volume_5_%28English%29.png/revision/latest?cb=20230627132432",
    "https://static.wikia.nocookie.net/dandadan/images/4/45/Volume_6_%28English%29.png/revision/latest?cb=20230902140308",
    "https://static.wikia.nocookie.net/dandadan/images/a/a8/Volume_7_%28English%29.png/revision/latest?cb=20240325201654",
    "https://static.wikia.nocookie.net/dandadan/images/d/d0/Volume_8_%28English%29.png/revision/latest?cb=20240410023742",
    "https://static.wikia.nocookie.net/dandadan/images/3/37/Volume_9_%28English%29.png/revision/latest?cb=20240510032922",
    "https://static.wikia.nocookie.net/dandadan/images/3/31/Volume_10_%28English%29.png/revision/latest?cb=20240625043327",
    "https://static.wikia.nocookie.net/dandadan/images/d/de/Volume_11_%28English%29.png/revision/latest?cb=20240924152902",
    "https://static.wikia.nocookie.net/dandadan/images/1/1f/Volume_12_%28English%29.png/revision/latest?cb=20241015171732",
    "https://static.wikia.nocookie.net/dandadan/images/0/0f/Volume_13_%28English%29.png/revision/latest?cb=20250130172447",
    "https://static.wikia.nocookie.net/dandadan/images/0/0b/Volume_14_%28English%29.png/revision/latest?cb=20250421225836",
    "https://static.wikia.nocookie.net/dandadan/images/9/91/Volume_15_%28English%29.png/revision/latest?cb=20250914053956",
    "https://static.wikia.nocookie.net/dandadan/images/7/70/Volume_16_%28English%29.png/revision/latest?cb=20250914054138",
    "https://static.wikia.nocookie.net/dandadan/images/6/6f/Volume_17_%28English%29.png/revision/latest?cb=20251009041522",
    "https://static.wikia.nocookie.net/dandadan/images/2/2b/Volume_18_%28English%29.png/revision/latest?cb=20251101033608",
    "https://static.wikia.nocookie.net/dandadan/images/8/85/Volume_19_%28English%29.png/revision/latest?cb=20260120053133"
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
