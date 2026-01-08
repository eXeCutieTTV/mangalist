import fs from "fs";
import fetch from "node-fetch"; // npm install node-fetch
import path from "path";

// Folder where you want to save images
const folder = "volumes";

// Create the folder if it doesn't exist
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

// Array of image URLs (your existing volumeLinks)
const volumeLinks = [
    "https://static.wikia.nocookie.net/onepiece/images/0/0e/Volume_1.png/revision/latest?cb=20220426144844",
    "https://static.wikia.nocookie.net/onepiece/images/2/2f/Volume_2.png/revision/latest?cb=20240219150533",
    "https://static.wikia.nocookie.net/onepiece/images/7/75/Volume_3.png/revision/latest?cb=20240129062627",
    "https://static.wikia.nocookie.net/onepiece/images/3/31/Volume_4.png/revision/latest?cb=20240219145353",
    "https://static.wikia.nocookie.net/onepiece/images/8/8a/Volume_5.png/revision/latest?cb=20240129063611",
    "https://static.wikia.nocookie.net/onepiece/images/f/fb/Volume_6.png/revision/latest?cb=20240219152558",
    "https://static.wikia.nocookie.net/onepiece/images/2/24/Volume_7.png/revision/latest?cb=20240219153038",
    "https://static.wikia.nocookie.net/onepiece/images/8/82/Volume_8.png/revision/latest?cb=20240219153151",
    "https://static.wikia.nocookie.net/onepiece/images/7/79/Volume_9.png/revision/latest?cb=20240219152311",
    "https://static.wikia.nocookie.net/onepiece/images/6/6b/Volume_10.png/revision/latest?cb=20240128184801",
    "https://static.wikia.nocookie.net/onepiece/images/1/1b/Volume_11.png/revision/latest?cb=20240219153451",
    "https://static.wikia.nocookie.net/onepiece/images/4/4e/Volume_12.png/revision/latest?cb=20240219154213",
    "https://static.wikia.nocookie.net/onepiece/images/b/b6/Volume_13.png/revision/latest?cb=20240219153730",
    "https://static.wikia.nocookie.net/onepiece/images/1/17/Volume_14.png/revision/latest?cb=20240219154009",
    "https://static.wikia.nocookie.net/onepiece/images/4/4e/Volume_15.png/revision/latest?cb=20240219150735",
    "https://static.wikia.nocookie.net/onepiece/images/4/45/Volume_16.png/revision/latest?cb=20240128181920",
    "https://static.wikia.nocookie.net/onepiece/images/6/64/Volume_17.png/revision/latest?cb=20240219154617",
    "https://static.wikia.nocookie.net/onepiece/images/a/a2/Volume_18.png/revision/latest?cb=20240219150929",
    "https://static.wikia.nocookie.net/onepiece/images/c/c9/Volume_19.png/revision/latest?cb=20240219151058",
    "https://static.wikia.nocookie.net/onepiece/images/3/32/Volume_20.png/revision/latest?cb=20240219165047",
    "https://static.wikia.nocookie.net/onepiece/images/a/a6/Volume_21.png/revision/latest?cb=20240219165058",
    "https://static.wikia.nocookie.net/onepiece/images/5/5e/Volume_22.png/revision/latest?cb=20240219154801",
    "https://static.wikia.nocookie.net/onepiece/images/5/5d/Volume_23.png/revision/latest?cb=20240219151243",
    "https://static.wikia.nocookie.net/onepiece/images/6/6a/Volume_24.png/revision/latest?cb=20240219151904",
    "https://static.wikia.nocookie.net/onepiece/images/e/ef/Volume_25.png/revision/latest?cb=20240219155015",
    "https://static.wikia.nocookie.net/onepiece/images/0/00/Volume_26.png/revision/latest?cb=20240221073352",
    "https://static.wikia.nocookie.net/onepiece/images/1/1d/Volume_27.png/revision/latest?cb=20240221080023",
    "https://static.wikia.nocookie.net/onepiece/images/a/a5/Volume_28.png/revision/latest?cb=20240221080812",
    "https://static.wikia.nocookie.net/onepiece/images/1/1a/Volume_29.png/revision/latest?cb=20240219165540",
    "https://static.wikia.nocookie.net/onepiece/images/5/52/Volume_30.png/revision/latest?cb=20240219145816",
    "https://static.wikia.nocookie.net/onepiece/images/f/f7/Volume_31.png/revision/latest?cb=20240219155154",
    "https://static.wikia.nocookie.net/onepiece/images/2/2b/Volume_32.png/revision/latest?cb=20240219155502",
    "https://static.wikia.nocookie.net/onepiece/images/e/e6/Volume_33.png/revision/latest?cb=20130115023232",
    "https://static.wikia.nocookie.net/onepiece/images/6/6c/Volume_34.png/revision/latest?cb=20240221075331",
    "https://static.wikia.nocookie.net/onepiece/images/6/65/Volume_35.png/revision/latest?cb=20130115023232",
    "https://static.wikia.nocookie.net/onepiece/images/6/63/Volume_36.png/revision/latest?cb=20240220121807",
    "https://static.wikia.nocookie.net/onepiece/images/b/bd/Volume_37.png/revision/latest?cb=20130115023233",
    "https://static.wikia.nocookie.net/onepiece/images/b/b6/Volume_38.png/revision/latest?cb=20240221081649",
    "https://static.wikia.nocookie.net/onepiece/images/4/47/Volume_39.png/revision/latest?cb=20130115023234",
    "https://static.wikia.nocookie.net/onepiece/images/2/2c/Volume_40.png/revision/latest?cb=20130115023345",
    "https://static.wikia.nocookie.net/onepiece/images/3/3a/Volume_41.png/revision/latest?cb=20240219181416",
    "https://static.wikia.nocookie.net/onepiece/images/1/16/Volume_42.png/revision/latest?cb=20130115023346",
    "https://static.wikia.nocookie.net/onepiece/images/1/15/Volume_43.png/revision/latest?cb=20240219181837",
    "https://static.wikia.nocookie.net/onepiece/images/d/d2/Volume_44.png/revision/latest?cb=20221230202513",
    "https://static.wikia.nocookie.net/onepiece/images/f/f4/Volume_45.png/revision/latest?cb=20130115023346",
    "https://static.wikia.nocookie.net/onepiece/images/c/cc/Volume_46.png/revision/latest?cb=20240219151646",
    "https://static.wikia.nocookie.net/onepiece/images/3/35/Volume_47.png/revision/latest?cb=20240219182305",
    "https://static.wikia.nocookie.net/onepiece/images/c/cd/Volume_48.png/revision/latest?cb=20240220123013",
    "https://static.wikia.nocookie.net/onepiece/images/d/d6/Volume_49.png/revision/latest?cb=20240219182821",
    "https://static.wikia.nocookie.net/onepiece/images/c/c7/Volume_50.png/revision/latest?cb=20130115024523",
    "https://static.wikia.nocookie.net/onepiece/images/4/43/Volume_51.png/revision/latest?cb=20240219183317",
    "https://static.wikia.nocookie.net/onepiece/images/6/6e/Volume_52.png/revision/latest?cb=20150704032519",
    "https://static.wikia.nocookie.net/onepiece/images/8/84/Volume_53.png/revision/latest?cb=20130115024524",
    "https://static.wikia.nocookie.net/onepiece/images/4/40/Volume_54.png/revision/latest?cb=20240221082453",
    "https://static.wikia.nocookie.net/onepiece/images/a/a0/Volume_55.png/revision/latest?cb=20240219202557",
    "https://static.wikia.nocookie.net/onepiece/images/a/af/Volume_56.png/revision/latest?cb=20240219184125",
    "https://static.wikia.nocookie.net/onepiece/images/0/04/Volume_57.png/revision/latest?cb=20240221082703",
    "https://static.wikia.nocookie.net/onepiece/images/5/5b/Volume_58.png/revision/latest?cb=20130115024526",
    "https://static.wikia.nocookie.net/onepiece/images/f/fd/Volume_59.png/revision/latest?cb=20240220124430",
    "https://static.wikia.nocookie.net/onepiece/images/d/d8/Volume_60.png/revision/latest?cb=20240221082916",
    "https://static.wikia.nocookie.net/onepiece/images/e/e8/Volume_61.png/revision/latest?cb=20240219203354",
    "https://static.wikia.nocookie.net/onepiece/images/d/df/Volume_62.png/revision/latest?cb=20240221083153",
    "https://static.wikia.nocookie.net/onepiece/images/7/71/Volume_63.png/revision/latest?cb=20240221084628",
    "https://static.wikia.nocookie.net/onepiece/images/8/8c/Volume_64.png/revision/latest?cb=20131108225027",
    "https://static.wikia.nocookie.net/onepiece/images/f/f0/Volume_65.png/revision/latest?cb=20240221083416",
    "https://static.wikia.nocookie.net/onepiece/images/f/f8/Volume_66.png/revision/latest?cb=20201201122207",
    "https://static.wikia.nocookie.net/onepiece/images/3/3b/Volume_67.png/revision/latest?cb=20190521073314",
    "https://static.wikia.nocookie.net/onepiece/images/e/ee/Volume_68.png/revision/latest?cb=20190521073425",
    "https://static.wikia.nocookie.net/onepiece/images/5/57/Volume_69.png/revision/latest?cb=20201201123338",
    "https://static.wikia.nocookie.net/onepiece/images/3/34/Volume_70.png/revision/latest?cb=20130605012318",
    "https://static.wikia.nocookie.net/onepiece/images/9/90/Volume_71.png/revision/latest?cb=20160414112827",
    "https://static.wikia.nocookie.net/onepiece/images/9/92/Volume_72.png/revision/latest?cb=20240221083904",
    "https://static.wikia.nocookie.net/onepiece/images/2/24/Volume_73.png/revision/latest?cb=20240219203939",
    "https://static.wikia.nocookie.net/onepiece/images/1/1c/Volume_74.png/revision/latest?cb=20240221084011",
    "https://static.wikia.nocookie.net/onepiece/images/1/1b/Volume_75.png/revision/latest?cb=20240221084142",
    "https://static.wikia.nocookie.net/onepiece/images/e/e6/Volume_76.png/revision/latest?cb=20240219204947",
    "https://static.wikia.nocookie.net/onepiece/images/a/aa/Volume_77.png/revision/latest?cb=20150408171434",
    "https://static.wikia.nocookie.net/onepiece/images/a/a5/Volume_78.png/revision/latest?cb=20201201123845",
    "https://static.wikia.nocookie.net/onepiece/images/0/07/Volume_79.png/revision/latest?cb=20160414111420",
    "https://static.wikia.nocookie.net/onepiece/images/d/d6/Volume_80.png/revision/latest?cb=20240219205446",
    "https://static.wikia.nocookie.net/onepiece/images/8/86/Volume_81.png/revision/latest?cb=20160617155054",
    "https://static.wikia.nocookie.net/onepiece/images/5/53/Volume_82.png/revision/latest?cb=20240219205714",
    "https://static.wikia.nocookie.net/onepiece/images/8/8a/Volume_83.png/revision/latest?cb=20161031165032",
    "https://static.wikia.nocookie.net/onepiece/images/d/d0/Volume_84.png/revision/latest?cb=20240219210128",
    "https://static.wikia.nocookie.net/onepiece/images/f/fe/Volume_85.png/revision/latest?cb=20201201124126",
    "https://static.wikia.nocookie.net/onepiece/images/a/ad/Volume_86.png/revision/latest?cb=20201201124338",
    "https://static.wikia.nocookie.net/onepiece/images/f/f1/Volume_87.png/revision/latest?cb=20240219210507",
    "https://static.wikia.nocookie.net/onepiece/images/c/c7/Volume_88.png/revision/latest?cb=20190521075647",
    "https://static.wikia.nocookie.net/onepiece/images/e/e9/Volume_89.png/revision/latest?cb=20201201125115",
    "https://static.wikia.nocookie.net/onepiece/images/3/3b/Volume_90.png/revision/latest?cb=20190521080720",
    "https://static.wikia.nocookie.net/onepiece/images/7/74/Volume_91.png/revision/latest?cb=20190508125729",
    "https://static.wikia.nocookie.net/onepiece/images/1/1f/Volume_92.png/revision/latest?cb=20190508130046",
    "https://static.wikia.nocookie.net/onepiece/images/4/4c/Volume_93.png/revision/latest?cb=20190704122018",
    "https://static.wikia.nocookie.net/onepiece/images/8/8a/Volume_94.png/revision/latest?cb=20191004134522",
    "https://static.wikia.nocookie.net/onepiece/images/0/0c/Volume_95.png/revision/latest?cb=20191228075843",
    "https://static.wikia.nocookie.net/onepiece/images/8/8a/Volume_96.png/revision/latest?cb=20201201125750",
    "https://static.wikia.nocookie.net/onepiece/images/5/57/Volume_97.png/revision/latest?cb=20200916165359",
    "https://static.wikia.nocookie.net/onepiece/images/b/b9/Volume_98.png/revision/latest?cb=20210204123114",
    "https://static.wikia.nocookie.net/onepiece/images/8/86/Volume_99.png/revision/latest?cb=20210604092155",
    "https://static.wikia.nocookie.net/onepiece/images/c/c6/Volume_100.png/revision/latest?cb=20210903160940",
    "https://static.wikia.nocookie.net/onepiece/images/b/b3/Volume_101.png/revision/latest?cb=20211122095619",
    "https://static.wikia.nocookie.net/onepiece/images/5/5e/Volume_102.png/revision/latest?cb=20220321092801",
    "https://static.wikia.nocookie.net/onepiece/images/6/69/Volume_103.png/revision/latest?cb=20220724115337",
    "https://static.wikia.nocookie.net/onepiece/images/a/a9/Volume_104.png/revision/latest?cb=20221027151810",
    "https://static.wikia.nocookie.net/onepiece/images/e/e4/Volume_105.png/revision/latest?cb=20230227145359",
    "https://static.wikia.nocookie.net/onepiece/images/9/9d/Volume_106.png/revision/latest?cb=20230621031238",
    "https://static.wikia.nocookie.net/onepiece/images/0/00/Volume_107.png/revision/latest?cb=20231022084700",
    "https://static.wikia.nocookie.net/onepiece/images/3/32/Volume_108.png/revision/latest?cb=20240219030223",
    "https://static.wikia.nocookie.net/onepiece/images/f/fa/Volume_109.png/revision/latest?cb=20240728095050",
    "https://static.wikia.nocookie.net/onepiece/images/2/28/Volume_110.png/revision/latest?cb=20241021032630",
    "https://static.wikia.nocookie.net/onepiece/images/f/fb/Volume_111.png/revision/latest?cb=20250217030811",
    "https://static.wikia.nocookie.net/onepiece/images/d/d8/Volume_112.png/revision/latest?cb=20250726131401",
    "https://static.wikia.nocookie.net/onepiece/images/8/80/Volume_113.png/revision/latest?cb=20251228004541"
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
