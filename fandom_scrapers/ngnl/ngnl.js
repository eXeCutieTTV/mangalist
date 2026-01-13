import { JSDOM } from "jsdom";

const temp = {};
const imgs = [];
function ngnl(id) {
    const url = `https://no-game-no-life.fandom.com/wiki/Light_Novel_Volume_${id + 1}`;

    const div = document.querySelector(".mw-content-ltr.mw-parser-output");
    const chapter_div = div.querySelectorAll(".tabber")[1].children;
    const info_div = div.querySelectorAll("aside")[0].children;

    const infoObj = {
        img: info_div[0].children[1].children[2],
        body: info_div[1].children
    }


    const result = {
        title: [],
        date_release: [infoObj.body[2].querySelector("div").textContent, infoObj.body[1].querySelector("div").textContent],
        pages: [infoObj.body[6].querySelector("div").textContent, infoObj.body[5].querySelector("div").textContent],
        ISBN: [infoObj.body[4].querySelector("div").textContent, infoObj.body[3].querySelector("div").textContent],
        chapters: {},
        cover_characters: Array.from(infoObj.body[7].querySelectorAll("a"))
            .map(a => a.textContent.trim()),
        img: `images/ngnl/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (let i = 1; i < 3; i++) {
        for (const [index, li] of Object.entries(chapter_div[i].querySelectorAll("li"))) {
            const title = li.textContent.trim().replace(/Chapter \d+ - /, "");

            if (!result.chapters[Number(index) + 1]) {
                result.chapters[Number(index) + 1] = [];
            }
            result.chapters[Number(index) + 1][i - 1] = title;
        }
    }
    imgs.push(infoObj.img.querySelector("a").href)
    temp[id + 1] = result;
}
ngnl(1);
console.log(temp);