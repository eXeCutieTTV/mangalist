import fetch from "node-fetch"; // npm install node-fetch

const temp = {};
const imgs = [];

async function ngnl_wrap(id) {
    async function url_raw(id) {
        const url = `https://no-game-no-life.fandom.com/wiki/Light_Novel_Volume_${id + 1}`;
        const res = await fetch(url);
        const raw = await res.text();   // <— here is your HTML
        return raw;
    }

    const html = await url_raw(id);

    async function ngnl(id) {
        const div = document.querySelector(".mw-content-ltr.mw-parser-output");
        const chapter_div = div.querySelectorAll(".tabber")[1].children;
        const info_div = div.querySelector("aside").children;

        const infoObj = {
            img: info_div[0].children[1].children[2],
            body: info_div[1].children
        };

        const result = {
            title: [],
            date_release: [
                infoObj.body[2].querySelector("div").textContent.trim(),
                infoObj.body[1].querySelector("div").textContent.trim()
            ],
            pages: [
                infoObj.body[6].querySelector("div").textContent.trim(),
                infoObj.body[5].querySelector("div").textContent.trim()
            ],
            ISBN: [
                infoObj.body[4].querySelector("div").textContent.trim(),
                infoObj.body[3].querySelector("div").textContent.trim()
            ],
            chapters: {},
            cover_characters: Array.from(
                infoObj.body[7].querySelectorAll("a")
            ).map(a => a.textContent.trim()),
            img: `images/ngnl/vol_${String(id + 1).padStart(3, "0")}.png`,
            owned: false,
            prise: "10 €",
            date_bought: ""
        };

        for (let i = 1; i < 3; i++) {
            const lis = chapter_div[i].querySelectorAll("li");

            lis.forEach((li, index) => {
                const title = li.textContent
                    .trim()
                    .replace(/Chapter \d+ - /, "");

                const chapterIndex = index + 1;
                result.chapters[chapterIndex] ??= [];
                result.chapters[chapterIndex][i - 1] = title;
            });
        }

        imgs.push(infoObj.img.querySelector("a").href);
        temp[id + 1] = result;
    }
}
//for (let i = 0; i < 13; i++) { ngnl(i); }

//console.log(temp, imgs);