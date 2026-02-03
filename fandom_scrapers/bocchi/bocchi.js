import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "fs/promises";
import fs from "fs";

const temp = {};
const imgs = [];

async function bocchi(id) {
    const url = `https://bocchi-the-rock.fandom.com/wiki/Volume_${id + 1}`;
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    // -----------------------------
    // 1. Extract the infobox
    // -----------------------------
    const tbl = $(".portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default").children();

    const date_release = [
        tbl.eq(5).find("> .pi-data-value").text().trim(),
        tbl.eq(5).find("> .pi-data-value").text().trim()
    ];

    const pages = [
        tbl.eq(3).find("> .pi-data-value").text().trim(),
        tbl.eq(3).find("> .pi-data-value").text().trim()
    ];

    const ISBN = [
        tbl.eq(6).find("> .pi-data-value").text().replace(/ISBN/i, "").trim(),
        tbl.eq(6).find("> .pi-data-value").text().replace(/ISBN/i, "").trim()
    ];

    // -----------------------------
    // 2. Chapters (auto‑generated)
    // -----------------------------
    const chapter_range = tbl.eq(2).find("> .pi-data-value").text().match(/\d+/g);
    const chapters = {};

    if (chapter_range && id < 4) {
        const max = Number(chapter_range[1]);
        const min = Number(chapter_range[0]);
        for (let i = min; i <= max; i++) {
            chapters[i] = [`Chapter ${i}`, `Chapter ${i}`];
        }
    } /*else if (chapter_range && id === 4) {
        const chap_tbl = document.querySelector(".wikitable").children[0].children;
        for (const chapter of chap_tbl) {
            if (Number(chapter.children[0].innerText.trim())) {
                const number = Number(chapter.children[0].innerText.trim());
                chapters[number] = [`Chapter ${number}`, `Chapter ${number}`];
            }
        }
    } else if (chapter_range && id > 4) {

    }*/

    // -----------------------------
    // 3. Cover image
    // -----------------------------
    const coverImg =
        tbl.eq(1).find("a").attr("href") ||
        $("aside img").first().parent().attr("href") ||
        "";

    imgs.push(coverImg);

    // -----------------------------
    // 4. Final object
    // -----------------------------
    temp[id + 1] = {
        title: [],
        date_release,
        pages,
        ISBN,
        chapters,
        cover_characters: [],
        img: `images/bocchi/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    };
}

// scrape 4 volumes - rest has to be done manually...
for (let i = 0; i < 4; i++) {
    await bocchi(i);
}

fs.mkdirSync("images/bocchi", { recursive: true });
await writeFile("fandom_scrapers/bocchi/raw.json", JSON.stringify(temp, null, 2), "utf8");
await writeFile("fandom_scrapers/bocchi/imgs.json", JSON.stringify(imgs, null, 2), "utf8");

function fill(min, max) {
    for (let i = min; i <= max; i++)chapters[i] = [`Chapter ${i}`, `Chapter ${i}`]
}// to make it easier to manually fill in the missing chapters. - example: fill(58,58);