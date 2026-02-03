const temp = {};
const imgs = [];
function sakamoto(id) {
    const tbl = document.querySelector(".mw-content-ltr.mw-parser-output").children[4].children[0].children;
    const tblObj = {
        header: tbl[id * 2 + 2].children,
        body: tbl[id * 2 + 3].children
    }
    const bodyObj = {
        chapters: tblObj.body[0].children[1].querySelectorAll("li"),
        info: tblObj.body[1],
        img: tblObj.body[2].querySelector("a").href
    }
    const result = {
        title: [bodyObj.info.querySelector("b").innerText.trim(), bodyObj.info.querySelector("b").innerText.trim()],
        date_release: [tblObj.header[3].innerText.trim(), tblObj.header[1].innerText.trim()],
        pages: [`${bodyObj.info.innerText.split(`\n`)[4].match(/\d+/) ? bodyObj.info.innerText.split(`\n`)[4].match(/\d+/)[0] : bodyObj.info.innerText.split(`\n`)[3].match(/\d+/)}`, `${bodyObj.info.innerText.split(`\n`)[3].match(/Japanese/) ? bodyObj.info.innerText.split(`\n`)[3].match(/\d+/)[0] : null}`],
        ISBN: [tblObj.header[4].innerText.trim().replace(/ISBN\s*/, ""), tblObj.header[2].innerText.trim().replace(/ISBN\s*/, "")],
        chapters: {},
        cover_characters: [],
        img: `images/sakamoto/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters) {
        const number = Number(chapter.innerText.match(/Days \d+/)[0].match(/\d+/)[0]);
        result.chapters[number] = [chapter.innerText.trim(), chapter.innerText.trim()];
    }
    for (const character of bodyObj.info.querySelectorAll("a")) {
        result.cover_characters.push(character.innerText.trim());
    }
    imgs.push(bodyObj.img);
    temp[id + 1] = result;
}
for (let i = 0; i < 25; i++)sakamoto(i);
JSON.stringify(temp);