import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/apothecary";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/1/1c/LN-Vol1-CoverEN-print.png/revision/latest?cb=20240129021743",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/2/21/LN_Vol2-CoverEN.jpg/revision/latest?cb=20220224174655",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/e/e9/LN_Vol3-CoverEN.jpg/revision/latest?cb=20220224175230",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/6/6c/LN_Vol4-CoverEN.jpg/revision/latest?cb=20220224175657",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/8/88/LN_Vol5-CoverEN.png/revision/latest?cb=20240129014700",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/4/46/LN_Vol6-1.png/revision/latest?cb=20230320233151",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/4/4c/LN_Vol7-1.png/revision/latest?cb=20230321000128",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/6/68/LN_Vol8-CoverEN.png/revision/latest?cb=20240129014742",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/9/9d/LN_Vol9-CoverEN.jpg/revision/latest?cb=20230707215817",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/2/26/LN_Vol10-CoverEN.png/revision/latest?cb=20240123184232",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/5/53/LN_Vol11-CoverEN.png/revision/latest?cb=20240129014829",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/1/15/LN_Vol12-CoverEN.png/revision/latest?cb=20240531013108",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/4/43/LN_Vol13-CoverEN.png/revision/latest?cb=20241004211149",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/a/af/LN_Vol14-CoverEN.png/revision/latest?cb=20241229195502",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/9/9b/LN_Vol15-CoverEN.png/revision/latest?cb=20250517105859",
    "https://static.wikia.nocookie.net/kusuriya-no-hitorigoto/images/0/08/LN-Vol-CoverEN-placeholder.png/revision/latest?cb=20250217014710"
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
