import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { writeFile } from "fs/promises";
import fs from "fs";

const temp = {};
const imgs = [];

function getVolumeInfo(id) {
    if (id <= 3) {
        return {
            index_id: `PB_Volume_${id + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_1`
        };
    } else if (id <= 7) {
        return {
            index_id: `BT_Volume_${id - 3 + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_2`
        };
    } else if (id <= 17) {
        return {
            index_id: `SC_Volume_${id - 7 + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_3_Hardcover`
        };
    } else if (id <= 26) {
        return {
            index_id: `DU_Volume_${id - 17 + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_4`
        };
    } else if (id <= 35) {
        return {
            index_id: `Volume_${id - 26 + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_5`
        };
    } else if (id <= 44) {
        return {
            index_id: `Volume_${id - 35 + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_6`
        };
    } else if (id <= 52) {
        return {
            index_id: `Volume_${id - 44 + 1}`,
            url: `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_7`
        };
    }
    return null;
}

async function jojos(id) {
    const info = getVolumeInfo(id);
    if (!info) return;

    const res = await fetch(info.url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const tbl = $(`#${info.index_id}`);

    const header = tbl.children().eq(0);
    const body = tbl.children().eq(1);

    const titleText = header.find(".volumeTableTitle").text().replace(/\n/, "").trim();

    const infoBox = body.find(".volumeTableInfo");
    const release = infoBox.children().eq(1).children().eq(0).text().replace(/\[\d+\]/, "").trim();
    const isbn = infoBox.children().eq(1).children().eq(1).text().trim();

    const chapterList = body.find(".volumeTableChList li");

    const chapters = {};

    const ol = body.find(".volumeTableChList").parent("ol");
    const start = Number(ol.attr("start") || 1);

    chapterList.each((i, el) => {
        const li = $(el);

        const jp = li.find("a").eq(0).text().trim();

        const rawHtml = li.find("a").eq(1).html() || "";
        const en = rawHtml
            .replace(/<ruby[^>]*>.*?<rb>(.*?)<\/rb>.*?<\/ruby>/g, "$1")
            .replace(/<[^>]+>/g, "")
            .trim();

        const number = start + i;

        chapters[number] = [jp, en];
    });

    const imgUrl = body.find("img").attr("src") || "";

    imgs.push(imgUrl);

    temp[id + 1] = {
        title: [titleText, titleText],
        date_release: [release, release],
        pages: [],
        ISBN: [isbn, isbn],
        chapters,
        cover_characters: [],
        img: `images/jojos/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    };
}

// scrape all 52 volumes
for (let i = 0; i < 51; i++) {
    await jojos(i);
}

// ensure folder exists
fs.mkdirSync("images/jojos", { recursive: true });

// write JSON
await writeFile("fandom_scrapers/jojos/raw.json", JSON.stringify(temp, null, 2), "utf8");
await writeFile("fandom_scrapers/jojos/imgs.json", JSON.stringify(imgs, null, 2), "utf8");
