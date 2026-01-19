import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/ngnl";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/no-game-no-life/images/4/46/Light_Novel_Volume_1_Cover.jpeg/revision/latest?cb=20171107093418",
    "https://static.wikia.nocookie.net/no-game-no-life/images/9/90/Light_Novel_Volume_2_Cover.jpeg/revision/latest?cb=20171107093407",
    "https://static.wikia.nocookie.net/no-game-no-life/images/f/f4/Light_Novel_Volume_3_Cover.jpeg/revision/latest?cb=20171107093350",
    "https://static.wikia.nocookie.net/no-game-no-life/images/b/b9/Light_Novel_Volume_4_Cover.jpeg/revision/latest?cb=20171107093335",
    "https://static.wikia.nocookie.net/no-game-no-life/images/f/f2/Light_Novel_Volume_5_Cover.jpeg/revision/latest?cb=20171107093321",
    "https://static.wikia.nocookie.net/no-game-no-life/images/b/bf/Light_Novel_Volume_6_Cover.jpeg/revision/latest?cb=20171107093309",
    "https://static.wikia.nocookie.net/no-game-no-life/images/6/6a/Light_Novel_Volume_7_Cover.jpeg/revision/latest?cb=20171107093258",
    "https://static.wikia.nocookie.net/no-game-no-life/images/b/b2/Light_Novel_Volume_8_Cover.jpeg/revision/latest?cb=20171107093242",
    "https://static.wikia.nocookie.net/no-game-no-life/images/c/c4/Light_Novel_Volume_9_Cover.jpeg/revision/latest?cb=20171107093230",
    "https://static.wikia.nocookie.net/no-game-no-life/images/a/a7/Light_Novel_Volume_10_Cover.jpeg/revision/latest?cb=20180325132435",
    "https://static.wikia.nocookie.net/no-game-no-life/images/f/fc/Volume_11_Cover_JP.jpeg/revision/latest?cb=20211101034928",
    "https://static.wikia.nocookie.net/no-game-no-life/images/c/cf/Volume_12_JP.jpg/revision/latest?cb=20230323203855",
    "https://static.wikia.nocookie.net/no-game-no-life/images/5/52/Unknown.jpg/revision/latest?cb=20200718000752"
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
