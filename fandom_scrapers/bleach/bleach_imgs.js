import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "images/bleach";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/bleach/images/a/ad/MangaVolume1Cover.png/revision/latest?cb=20190530063053&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/5/54/MangaVolume2Cover.png/revision/latest?cb=20190925022731&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/7/75/MangaVolume3Cover.png/revision/latest?cb=20190731054852&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/5/50/MangaVolume4Cover.png/revision/latest?cb=20190925224701&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/4/4e/MangaVolume5Cover.png/revision/latest?cb=20200107160347&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/b/ba/MangaVolume6Cover.png/revision/latest?cb=20200110200518&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/2d/Bleach_cover_07.png/revision/latest?cb=20200115062345&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/e/e8/MangaVolume8Cover.png/revision/latest?cb=20200119021107&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/7/74/MangaVolume9Cover.png/revision/latest?cb=20200209021440&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/fc/MangaVolume10Cover.png/revision/latest?cb=20200214215909&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/fe/MangaVolume11Cover.png/revision/latest?cb=20200225224904&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/6/6c/MangaVolume12Cover.png/revision/latest?cb=20200306001302&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/d/d0/MangaVolume13Cover.png/revision/latest?cb=20200319043707&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/e/e6/BleachVolume14Cover.png/revision/latest?cb=20200326200216&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/c/c4/BleachVolume15Cover.png/revision/latest?cb=20200406021304&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/b/b9/MangaVolume16Cover.png/revision/latest?cb=20200414070743&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/20/MangaVolume17Cover.png/revision/latest?cb=20200421075720&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/6/67/MangaVolume18Cover.png/revision/latest?cb=20200423101458&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/fa/MangaVolume19Cover.png/revision/latest?cb=20200501074455&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/4/4e/MangaVolume20Cover.png/revision/latest?cb=20200508081228&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/5/50/Bleach_cover_21.png/revision/latest?cb=20200511102420&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/d/df/MangaVolume22Cover.png/revision/latest?cb=20210604011440&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/7/78/MangaVolume23Cover.png/revision/latest?cb=20210616055311&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/3/3e/MangaVolume24Cover.png/revision/latest?cb=20210624093649&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/d/d6/MangaVolume25Cover.png/revision/latest?cb=20210906101205&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/b/b6/MangaVolume26Cover.png/revision/latest?cb=20210916150009&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/a/af/MangaVolume27Cover.png/revision/latest?cb=20211228120001&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/5/5a/MangaVolume28Cover.png/revision/latest?cb=20220203202449&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/fb/MangaVolume29Cover.png/revision/latest?cb=20220524102820&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/e/e8/Bleach_cover_30.png/revision/latest?cb=20220528093226&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/b/bf/Bleach_cover_31.png/revision/latest?cb=20220616095854&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/f9/Bleach_cover_32.png/revision/latest?cb=20220625050757&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/d/d3/MangaVolume33Cover.png/revision/latest?cb=20220820203938&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/a/a3/MangaVolume34Cover.png/revision/latest?cb=20220830042809&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/7/70/MangaVolume35Cover.png/revision/latest?cb=20220911065843&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/d/de/Bleach_cover_36.png/revision/latest?cb=20251225052948&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/7/73/MangaVolume37Cover.png/revision/latest?cb=20251225053058&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/f1/Bleach_cover_38.png/revision/latest?cb=20251225053245&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/f7/MangaVolume39Cover.png/revision/latest?cb=20251225053402&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/6/6f/Bleach_cover_40.png/revision/latest?cb=20251225053534&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/7/72/Bleach_cover_41.png/revision/latest?cb=20251225053817&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/1/13/MangaVolume42Cover.png/revision/latest?cb=20251225054042&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/e/e9/MangaVolume43Cover.png/revision/latest?cb=20251225054219&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/29/MangaVolume44Cover.png/revision/latest?cb=20251225054327&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/4/4e/MangaVolume45Cover.png/revision/latest?cb=20251225054508&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/2e/MangaVolume46Cover.png/revision/latest?cb=20251225054603&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/4/41/MangaVolume47Cover.png/revision/latest?cb=20251225054719&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/3/38/MangaVolume48Cover.png/revision/latest?cb=20251225054925&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/0/0a/Vol._49_Lost_Agent_Cover.png/revision/latest?cb=20110427214411&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/b/ba/Volume_50_Cover.png/revision/latest?cb=20110606002447&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/0/0a/MangaVolume51Cover.png/revision/latest?cb=20141201194354&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/2e/Volume_52_Cover.png/revision/latest?cb=20111006141746&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/0/0e/Volume_53_Cover.png/revision/latest?cb=20210224082016&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/fe/MangaVolume54Cover.png/revision/latest?cb=20210224083037&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/4/40/Bleach_Volume_55.png/revision/latest?cb=20221106044533&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/5/55/Bleach_Volume_56.png/revision/latest?cb=20221116211014&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/4/42/Bleach_Volume_57.png/revision/latest?cb=20221119052616&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/0/05/MangaVolume58Cover.png/revision/latest?cb=20221230000918&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/e/ec/MangaVolume59Cover.png/revision/latest?cb=20231207015636&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/20/MangaVolume60Cover.png/revision/latest?cb=20231207015735&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/f/f6/MangaVolume61Cover.png/revision/latest?cb=20231207015841&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/9/97/MangaVolume62Cover.png/revision/latest?cb=20231207015935&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/c/c8/MangaVolume63Cover.png/revision/latest?cb=20231207020012&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/5/5f/Volume_64_Cover.png/revision/latest?cb=20231207020114&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/3/3d/MangaVolume65Cover.png/revision/latest?cb=20231207020152&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/c/c3/Bleach_Volume_66.png/revision/latest?cb=20231207020239&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/3/3a/Bleach_volume_67_cover.png/revision/latest?cb=20231207020318&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/2/27/Bleach_volume_68_cover.png/revision/latest?cb=20231207020402&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/9/96/Bleach_Volume_69_Cover.png/revision/latest?cb=20231207020500&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/8/85/Bleach_Volume_70_Cover.png/revision/latest?cb=20231207020559&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/9/96/Bleach_Volume_71_Cover.png/revision/latest?cb=20231207020642&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/a/aa/Bleach_Volume_72_Cover.png/revision/latest?cb=20231207020745&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/d/d5/MangaVolume73Cover.png/revision/latest?cb=20231207020800&path-prefix=en",
    "https://static.wikia.nocookie.net/bleach/images/1/14/MangaVolume74Cover.png/revision/latest?cb=20231207020825&path-prefix=en"
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
