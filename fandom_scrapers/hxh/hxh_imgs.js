import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/hunter-x-hunter";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/hunterxhunter/images/7/7a/Volume_1_cover.png/revision/latest?cb=20230311220104",
    "https://static.wikia.nocookie.net/hunterxhunter/images/a/a2/Volume_2_cover.png/revision/latest?cb=20230311220114",
    "https://static.wikia.nocookie.net/hunterxhunter/images/7/7e/Volume_3_cover.png/revision/latest?cb=20230311220114",
    "https://static.wikia.nocookie.net/hunterxhunter/images/1/10/Volume_4_cover.png/revision/latest?cb=20230311220115",
    "https://static.wikia.nocookie.net/hunterxhunter/images/c/c8/Volume_5_cover.png/revision/latest?cb=20230311220115",
    "https://static.wikia.nocookie.net/hunterxhunter/images/c/c2/Volume_6_cover.png/revision/latest?cb=20230311220115",
    "https://static.wikia.nocookie.net/hunterxhunter/images/e/ef/Volume_7_cover.png/revision/latest?cb=20230311220115",
    "https://static.wikia.nocookie.net/hunterxhunter/images/b/b6/Volume_8_cover.png/revision/latest?cb=20230311220126",
    "https://static.wikia.nocookie.net/hunterxhunter/images/5/5c/Volume_9_cover.png/revision/latest?cb=20230311220124",
    "https://static.wikia.nocookie.net/hunterxhunter/images/e/e6/Volume_10_cover.png/revision/latest?cb=20230311220125",
    "https://static.wikia.nocookie.net/hunterxhunter/images/6/63/Volume_11_cover.png/revision/latest?cb=20230311220126",
    "https://static.wikia.nocookie.net/hunterxhunter/images/c/cc/Volume_12_cover.png/revision/latest?cb=20230311220123",
    "https://static.wikia.nocookie.net/hunterxhunter/images/b/b0/Volume_13_cover.png/revision/latest?cb=20230311220124",
    "https://static.wikia.nocookie.net/hunterxhunter/images/e/e0/Volume_14_cover.png/revision/latest?cb=20230311220135",
    "https://static.wikia.nocookie.net/hunterxhunter/images/2/2c/Volume_15_cover.png/revision/latest?cb=20230311220135",
    "https://static.wikia.nocookie.net/hunterxhunter/images/3/35/Volume_16_cover.png/revision/latest?cb=20230311220134",
    "https://static.wikia.nocookie.net/hunterxhunter/images/4/49/Volume_17_cover.png/revision/latest?cb=20230311220210",
    "https://static.wikia.nocookie.net/hunterxhunter/images/5/5c/Volume_18_cover.png/revision/latest?cb=20230311220136",
    "https://static.wikia.nocookie.net/hunterxhunter/images/a/a9/Volume_19_cover.png/revision/latest?cb=20230311220134",
    "https://static.wikia.nocookie.net/hunterxhunter/images/5/59/Volume_20_cover.png/revision/latest?cb=20230311220143",
    "https://static.wikia.nocookie.net/hunterxhunter/images/b/b3/Volume_21_cover.png/revision/latest?cb=20230311220143",
    "https://static.wikia.nocookie.net/hunterxhunter/images/6/66/Volume_22_cover.png/revision/latest?cb=20230311210945",
    "https://static.wikia.nocookie.net/hunterxhunter/images/6/62/Volume_23_cover.png/revision/latest?cb=20230311220140",
    "https://static.wikia.nocookie.net/hunterxhunter/images/9/9c/Volume_24_cover.png/revision/latest?cb=20230311220145",
    "https://static.wikia.nocookie.net/hunterxhunter/images/b/bd/Volume_25_cover.png/revision/latest?cb=20230311223634",
    "https://static.wikia.nocookie.net/hunterxhunter/images/b/bb/Volume_26_cover.png/revision/latest?cb=20230311220151",
    "https://static.wikia.nocookie.net/hunterxhunter/images/b/bf/Volume_27_cover.png/revision/latest?cb=20230311220152",
    "https://static.wikia.nocookie.net/hunterxhunter/images/1/17/Volume_28_cover.png/revision/latest?cb=20230311221757",
    "https://static.wikia.nocookie.net/hunterxhunter/images/4/46/Volume_29_cover.png/revision/latest?cb=20230311220155",
    "https://static.wikia.nocookie.net/hunterxhunter/images/a/a7/Volume_30_cover.png/revision/latest?cb=20230311220202",
    "https://static.wikia.nocookie.net/hunterxhunter/images/e/ee/Volume_31_cover.png/revision/latest?cb=20230311220201",
    "https://static.wikia.nocookie.net/hunterxhunter/images/a/a0/Volume_32_cover.png/revision/latest?cb=20230311220200",
    "https://static.wikia.nocookie.net/hunterxhunter/images/1/1c/Volume_33_cover.png/revision/latest?cb=20230311220203",
    "https://static.wikia.nocookie.net/hunterxhunter/images/6/60/Volume_34_cover.png/revision/latest?cb=20230311220206",
    "https://static.wikia.nocookie.net/hunterxhunter/images/4/4a/Volume_35_cover.png/revision/latest?cb=20180225101738",
    "https://static.wikia.nocookie.net/hunterxhunter/images/9/9b/Volume_36_cover.png/revision/latest?cb=20230311220210",
    "https://static.wikia.nocookie.net/hunterxhunter/images/1/1e/Volume_37_cover.png/revision/latest?cb=20221011232014",
    "https://static.wikia.nocookie.net/hunterxhunter/images/7/71/Volume_38_cover.png/revision/latest?cb=20240819111920"
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
