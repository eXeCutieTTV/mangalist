import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "fs/promises";

const temp = {};
const imgs = [];

async function ngnl_wrap(id) {
    const url = `https://no-game-no-life.fandom.com/wiki/Light_Novel_Volume_${id + 1}`;
    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);

    // -----------------------------
    // 1. Extract info-box cleanly
    // -----------------------------
    const info = {};

    $("aside .pi-data").each((i, el) => {
        const label = $(el).find(".pi-data-label").text().trim();
        const value = $(el).find(".pi-data-value").text().trim();
        if (label) info[label] = value;
    });

    // -----------------------------
    // 2. Extract chapters
    // -----------------------------
    const div = $(".mw-content-ltr.mw-parser-output");
    const chapter_div = div.find(".tabber").eq(1).children();

    const chapters = {};

    for (let i = 1; i < 3; i++) {
        const lis = $(chapter_div[i]).find("li");

        lis.each((index, li) => {
            const title = $(li).text().trim().replace(/Chapter \d+ - /, "");
            const chapterIndex = index + 1;
            chapters[chapterIndex] ??= [];
            chapters[chapterIndex][i - 1] = title;
        });
    }

    // -----------------------------
    // 3. Extract cover image URL
    // -----------------------------
    const coverImg = $("aside img").first().parent().attr("href") || "";

    imgs.push(coverImg);

    // -----------------------------
    // 4. Build final result object
    // -----------------------------
    temp[id + 1] = {
        title: [],
        date_release: [
            info["Release"] || "",
            info["Eng Release"] || ""
        ],
        pages: [
            info["Pages"] || "",
            info["Eng Pages"] || ""
        ],
        ISBN: [
            info["ISBN"] || "",
            info["Eng ISBN"] || ""
        ],
        chapters,
        cover_characters: (info["Cover Characters"] || "")
            .split(/,|and/)
            .map(s => s.trim())
            .filter(Boolean),
        img: `images/ngnl/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    };
}

for (let i = 0; i < 13; i++) {
    await ngnl_wrap(i);
}

await writeFile("fandom_scrapers/ngnl/raw.json", JSON.stringify(temp, null, 2), "utf8");
await writeFile("images/ngnl/imgs.json", JSON.stringify(imgs, null, 2), "utf8");
