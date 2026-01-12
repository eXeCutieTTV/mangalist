import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/naruto";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/naruto/images/2/2b/Vol1.png/revision/latest/scale-to-width-down/100?cb=20210224013411",
    "https://static.wikia.nocookie.net/naruto/images/c/ca/Vol2.png/revision/latest/scale-to-width-down/100?cb=20210224103341",
    "https://static.wikia.nocookie.net/naruto/images/e/e1/Vol3.png/revision/latest/scale-to-width-down/100?cb=20210224103354",
    "https://static.wikia.nocookie.net/naruto/images/3/30/Vol4.png/revision/latest/scale-to-width-down/100?cb=20210223121145",
    "https://static.wikia.nocookie.net/naruto/images/4/41/Vol5.png/revision/latest/scale-to-width-down/100?cb=20210224103406",
    "https://static.wikia.nocookie.net/naruto/images/d/d0/Vol6.png/revision/latest/scale-to-width-down/100?cb=20210224103709",
    "https://static.wikia.nocookie.net/naruto/images/f/fa/Vol7.png/revision/latest/scale-to-width-down/100?cb=20210224103718",
    "https://static.wikia.nocookie.net/naruto/images/4/47/Vol8.png/revision/latest/scale-to-width-down/100?cb=20210224103727",
    "https://static.wikia.nocookie.net/naruto/images/5/5f/Vol9.png/revision/latest/scale-to-width-down/100?cb=20210331022102",
    "https://static.wikia.nocookie.net/naruto/images/5/54/Vol10.png/revision/latest/scale-to-width-down/100?cb=20210331022104",
    "https://static.wikia.nocookie.net/naruto/images/8/88/Vol11.png/revision/latest/scale-to-width-down/100?cb=20210331022106",
    "https://static.wikia.nocookie.net/naruto/images/9/94/Vol12.png/revision/latest/scale-to-width-down/100?cb=20210331022107",
    "https://static.wikia.nocookie.net/naruto/images/0/0e/Vol13.png/revision/latest/scale-to-width-down/100?cb=20210331022109",
    "https://static.wikia.nocookie.net/naruto/images/b/b0/Vol14.png/revision/latest/scale-to-width-down/100?cb=20210331022904",
    "https://static.wikia.nocookie.net/naruto/images/9/98/Vol15.png/revision/latest/scale-to-width-down/100?cb=20210331022906",
    "https://static.wikia.nocookie.net/naruto/images/3/3d/Vol16.png/revision/latest/scale-to-width-down/100?cb=20210331022907",
    "https://static.wikia.nocookie.net/naruto/images/5/5c/Vol17.png/revision/latest/scale-to-width-down/100?cb=20210331022908",
    "https://static.wikia.nocookie.net/naruto/images/a/a3/Vol18.png/revision/latest/scale-to-width-down/100?cb=20210331022911",
    "https://static.wikia.nocookie.net/naruto/images/a/a9/Vol19.png/revision/latest/scale-to-width-down/100?cb=20210331110609",
    "https://static.wikia.nocookie.net/naruto/images/5/56/Vol20.png/revision/latest/scale-to-width-down/100?cb=20210331110610",
    "https://static.wikia.nocookie.net/naruto/images/5/57/Vol21.png/revision/latest/scale-to-width-down/100?cb=20210331110611",
    "https://static.wikia.nocookie.net/naruto/images/7/7f/Vol22.png/revision/latest/scale-to-width-down/100?cb=20210331110613",
    "https://static.wikia.nocookie.net/naruto/images/a/ab/Vol23.png/revision/latest/scale-to-width-down/100?cb=20210331110614",
    "https://static.wikia.nocookie.net/naruto/images/3/38/Vol24.png/revision/latest/scale-to-width-down/100?cb=20210331110615",
    "https://static.wikia.nocookie.net/naruto/images/a/a4/Vol25.png/revision/latest/scale-to-width-down/100?cb=20210224003258",
    "https://static.wikia.nocookie.net/naruto/images/e/e3/Vol26.png/revision/latest/scale-to-width-down/100?cb=20210331151743",
    "https://static.wikia.nocookie.net/naruto/images/b/b5/Vol27.png/revision/latest/scale-to-width-down/100?cb=20210331151744",
    "https://static.wikia.nocookie.net/naruto/images/f/fe/Vol28.png/revision/latest/scale-to-width-down/100?cb=20210224100143",
    "https://static.wikia.nocookie.net/naruto/images/c/cd/Vol29.png/revision/latest/scale-to-width-down/100?cb=20210224100154",
    "https://static.wikia.nocookie.net/naruto/images/9/96/Vol30.png/revision/latest/scale-to-width-down/100?cb=20210222100036",
    "https://static.wikia.nocookie.net/naruto/images/4/4b/Vol31.png/revision/latest/scale-to-width-down/100?cb=20210224100523",
    "https://static.wikia.nocookie.net/naruto/images/7/79/Vol32.png/revision/latest/scale-to-width-down/100?cb=20210224100500",
    "https://static.wikia.nocookie.net/naruto/images/e/ec/Vol33.png/revision/latest/scale-to-width-down/100?cb=20210224100534",
    "https://static.wikia.nocookie.net/naruto/images/e/e3/Vol34.png/revision/latest/scale-to-width-down/100?cb=20210224100826",
    "https://static.wikia.nocookie.net/naruto/images/e/e3/Vol35.png/revision/latest/scale-to-width-down/100?cb=20210224100839",
    "https://static.wikia.nocookie.net/naruto/images/6/66/Vol36.png/revision/latest/scale-to-width-down/100?cb=20210224100849",
    "https://static.wikia.nocookie.net/naruto/images/2/2a/Vol37.png/revision/latest/scale-to-width-down/100?cb=20210224101100",
    "https://static.wikia.nocookie.net/naruto/images/5/54/Vol38.png/revision/latest/scale-to-width-down/100?cb=20210222101157",
    "https://static.wikia.nocookie.net/naruto/images/5/58/Vol39.png/revision/latest/scale-to-width-down/100?cb=20210222101207",
    "https://static.wikia.nocookie.net/naruto/images/7/79/Vol40.png/revision/latest/scale-to-width-down/100?cb=20210222101214",
    "https://static.wikia.nocookie.net/naruto/images/4/44/Vol41.png/revision/latest/scale-to-width-down/100?cb=20210222100901",
    "https://static.wikia.nocookie.net/naruto/images/a/a3/Vol42.png/revision/latest/scale-to-width-down/100?cb=20210222100839",
    "https://static.wikia.nocookie.net/naruto/images/b/b6/Vol43.png/revision/latest/scale-to-width-down/100?cb=20250830012824",
    "https://static.wikia.nocookie.net/naruto/images/7/73/Vol44.png/revision/latest/scale-to-width-down/100?cb=20210222100421",
    "https://static.wikia.nocookie.net/naruto/images/8/8b/Vol45.png/revision/latest/scale-to-width-down/100?cb=20210222100432",
    "https://static.wikia.nocookie.net/naruto/images/c/c9/Vol46.png/revision/latest/scale-to-width-down/100?cb=20210222100402",
    "https://static.wikia.nocookie.net/naruto/images/e/e7/Vol47.png/revision/latest/scale-to-width-down/100?cb=20210222031600",
    "https://static.wikia.nocookie.net/naruto/images/1/17/Volume48.PNG/revision/latest/scale-to-width-down/100?cb=20130610063704",
    "https://static.wikia.nocookie.net/naruto/images/9/9a/Volume49.PNG/revision/latest/scale-to-width-down/100?cb=20130610063948",
    "https://static.wikia.nocookie.net/naruto/images/1/16/Volume50.PNG/revision/latest/scale-to-width-down/100?cb=20210222031558",
    "https://static.wikia.nocookie.net/naruto/images/5/53/Volume51.png/revision/latest/scale-to-width-down/100?cb=20210222031201",
    "https://static.wikia.nocookie.net/naruto/images/2/2e/Volume_52_Cover.png/revision/latest/scale-to-width-down/100?cb=20210222031151",
    "https://static.wikia.nocookie.net/naruto/images/4/41/Volume53.png/revision/latest/scale-to-width-down/100?cb=20210222030934",
    "https://static.wikia.nocookie.net/naruto/images/0/07/Volume54.png/revision/latest/scale-to-width-down/100?cb=20210222030927",
    "https://static.wikia.nocookie.net/naruto/images/f/fa/Volume55.png/revision/latest/scale-to-width-down/100?cb=20140816030445",
    "https://static.wikia.nocookie.net/naruto/images/7/73/Volume56.png/revision/latest/scale-to-width-down/100?cb=20210222030647",
    "https://static.wikia.nocookie.net/naruto/images/3/39/Volume57.png/revision/latest/scale-to-width-down/100?cb=20210330135736",
    "https://static.wikia.nocookie.net/naruto/images/0/08/Volume58.png/revision/latest/scale-to-width-down/100?cb=20210222030055",
    "https://static.wikia.nocookie.net/naruto/images/6/6a/Volume_59_cover.png/revision/latest/scale-to-width-down/100?cb=20130610072231",
    "https://static.wikia.nocookie.net/naruto/images/2/2b/Volume_60_cover.png/revision/latest/scale-to-width-down/100?cb=20130610072447",
    "https://static.wikia.nocookie.net/naruto/images/5/5a/Volume61.png/revision/latest/scale-to-width-down/100?cb=20210223121051",
    "https://static.wikia.nocookie.net/naruto/images/7/7f/Volume62.png/revision/latest/scale-to-width-down/100?cb=20210223121049",
    "https://static.wikia.nocookie.net/naruto/images/4/45/Volume63.PNG/revision/latest/scale-to-width-down/100?cb=20210330135738",
    "https://static.wikia.nocookie.net/naruto/images/a/af/Volume64.PNG/revision/latest/scale-to-width-down/100?cb=20210330134552",
    "https://static.wikia.nocookie.net/naruto/images/d/d8/Volume65.png/revision/latest/scale-to-width-down/100?cb=20210330134555",
    "https://static.wikia.nocookie.net/naruto/images/f/f8/Volume_66.png/revision/latest/scale-to-width-down/100?cb=20210331141502",
    "https://static.wikia.nocookie.net/naruto/images/3/3b/Volume_67.png/revision/latest/scale-to-width-down/100?cb=20210330133416",
    "https://static.wikia.nocookie.net/naruto/images/e/ee/Volume_68.png/revision/latest/scale-to-width-down/100?cb=20210330135739",
    "https://static.wikia.nocookie.net/naruto/images/5/57/Volume_69.png/revision/latest/scale-to-width-down/100?cb=20210222025543",
    "https://static.wikia.nocookie.net/naruto/images/7/75/Volume70.png/revision/latest/scale-to-width-down/100?cb=20140730121703",
    "https://static.wikia.nocookie.net/naruto/images/9/90/Volume_71.png/revision/latest/scale-to-width-down/100?cb=20210330134558",
    "https://static.wikia.nocookie.net/naruto/images/8/81/Vol72.png/revision/latest/scale-to-width-down/100?cb=20210331141503"
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
