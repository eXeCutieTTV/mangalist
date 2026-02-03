const temp = {};
const imgs = [];
function berserk(id) {
    const tbl = document.querySelector(".wikitable").children[0].children;
    const tblObj = {
        header: tbl[id * 2 + 1].children,
        body: tbl[id * 2 + 2].children
    }
    const bodyObj = {
        chapters: tblObj.body[0].querySelectorAll("li"),
        info: tblObj.body[1],
        img: tblObj.body[2]
    }
    const result = {
        title: [],
        date_release: [tblObj.header[3].innerText.trim(), tblObj.header[2].innerText.trim()],
        pages: [bodyObj.img.innerText.split(`\n`)[2].length > 0
            ? bodyObj.img.innerText.split(`\n`)[2].replace(/\(en\)|pages/g, "").trim()
            : null,
        bodyObj.img.innerText.split(`\n`)[1].length > 0
            ? bodyObj.img.innerText.split(`\n`)[1].replace(/\(ja\)|pages/g, "").trim()
            : null],
        ISBN: [`${bodyObj.info.innerText.match(/\(SE\)/)
            ? bodyObj.info.children[1].querySelectorAll("a")[2].innerText.trim()
            : bodyObj.info.children[1].querySelectorAll("a")[1]
                ? bodyObj.info.children[1].querySelectorAll("a")[1].innerText.trim()
                : null
            }`,
        bodyObj.info.children[1].querySelectorAll("a")[0].innerText.trim()],
        chapters: {},
        cover_characters: [],
        img: `images/berserk/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters) {
        const title = chapter.querySelector("a").innerText.trim();
        const number = chapter.innerText.split(".")[0].trim();
        result.chapters[number] = [title, title];
    }
    for (const character of bodyObj.info.querySelectorAll("li")) {
        result.cover_characters.push(character.innerText.trim());
    }
    imgs.push(bodyObj.img.querySelector("a").href);
    temp[id + 1] = result;
}
for (let i = 0; i < 43; i++) berserk(i);
JSON.stringify(temp);