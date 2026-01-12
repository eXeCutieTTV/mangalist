import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/frieren";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/frieren/images/6/64/Volume_1_ENG.jpg/revision/latest?cb=20210825163021",
    "https://static.wikia.nocookie.net/frieren/images/2/23/Volume_2_ENG.jpg/revision/latest?cb=20210825163045",
    "https://static.wikia.nocookie.net/frieren/images/c/c9/Volume_3_ENG.jpg/revision/latest?cb=20211124055046",
    "https://static.wikia.nocookie.net/frieren/images/5/58/Volume_4_ENG.jpg/revision/latest?cb=20220302080609",
    "https://static.wikia.nocookie.net/frieren/images/9/9b/Volume_5_ENG.jpg/revision/latest?cb=20220302080836",
    "https://static.wikia.nocookie.net/frieren/images/c/cf/Volume_6_ENG.jpg/revision/latest?cb=20220609024729",
    "https://static.wikia.nocookie.net/frieren/images/e/e2/Volume_7_ENG.png/revision/latest?cb=20230521082140",
    "https://static.wikia.nocookie.net/frieren/images/a/ac/Volume_8_ENG.png/revision/latest?cb=20230521082142",
    "https://static.wikia.nocookie.net/frieren/images/3/3a/Volume_9_ENG.png/revision/latest?cb=20230521082145",
    "https://static.wikia.nocookie.net/frieren/images/5/51/Volume_10_ENG.png/revision/latest?cb=20230823203218",
    "https://static.wikia.nocookie.net/frieren/images/3/38/Volume_11_ENG.png/revision/latest?cb=20240420210807",
    "https://static.wikia.nocookie.net/frieren/images/c/c3/Volume_12_ENG.png/revision/latest?cb=20240912205920",
    "https://static.wikia.nocookie.net/frieren/images/9/90/Volume_13_ENG.png/revision/latest?cb=20241223063546",
    "https://static.wikia.nocookie.net/frieren/images/d/d3/Volume_14_ENG.png/revision/latest?cb=20251010065544",
    "https://static.wikia.nocookie.net/frieren/images/7/75/No_image_available.png/revision/latest?cb=20220112213151"
];

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
