import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/oshink";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/oshi_no_ko/images/d/d4/Volume_1_%28English%29.png/revision/latest?cb=20221015000717",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/1/15/Volume_2_%28English%29.png/revision/latest?cb=20240616063143",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/6/6c/Volume_3_%28English%29.png/revision/latest?cb=20240616063145",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/e/e4/Volume_4_%28English%29.png/revision/latest?cb=20240616063146",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/2/2e/Volume_5_%28English%29.png/revision/latest?cb=20240616063145",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/4/45/Volume_6_%28English%29.png/revision/latest?cb=20240401045736",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/a/a8/Volume_7_%28English%29.png/revision/latest?cb=20240616063146",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/d/d0/Volume_8_%28English%29.png/revision/latest?cb=20241103073427",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/3/37/Volume_9_%28English%29.png/revision/latest?cb=20250123103611",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/3/31/Volume_10_%28English%29.png/revision/latest?cb=20250503093034",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/d/de/Volume_11_%28English%29.png/revision/latest?cb=20250530101834",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/1/1f/Volume_12_%28English%29.png/revision/latest?cb=20250916154429",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/e/e3/None.png/revision/latest?cb=20200822095649",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/e/e3/None.png/revision/latest?cb=20200822095649",
    "https://static.wikia.nocookie.net/oshi_no_ko/images/e/e3/None.png/revision/latest?cb=20200822095649"
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
