import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/whAtelier";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/d/db/Volume_1_Cover.png/revision/latest?cb=20180723164948",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/5/5c/Volume_2_Cover.png/revision/latest?cb=20180825010731",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/d/d1/Volume_3_Cover.jpg/revision/latest?cb=20180820230037",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/1/18/Volume_4_Cover.png/revision/latest?cb=20180904211640",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/d/d0/Volume_5_Cover.jpeg/revision/latest?cb=20190902214950",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/c/c2/Volume_6_Cover.png/revision/latest?cb=20191228142352",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/f/fe/Volume_7_Cover.jpg/revision/latest?cb=20200527141736",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/c/c1/Volume_8.jpg/revision/latest?cb=20210317005215",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/5/55/Volume_9.jpg/revision/latest?cb=20210705203703",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/3/34/Volume_10_Cover.jpg/revision/latest?cb=20220421045059",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/d/da/Volume_11_cover.jpg/revision/latest?cb=20221012184712",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/6/6e/Volume_12_cover.jpg/revision/latest?cb=20230907200829",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/d/dd/Volume_13_cover.jpg/revision/latest?cb=20260111030504",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/f/f7/Volume_14_cover.jpg/revision/latest?cb=20260111030613",
    "https://static.wikia.nocookie.net/witch-hat-atelier/images/c/c0/Volume_15_cover.jpg/revision/latest?cb=20260111030645",
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
