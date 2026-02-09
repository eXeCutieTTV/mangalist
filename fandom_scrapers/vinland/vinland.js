const temp = {};
const imgs = [];
function vinland(id) {
    const tbl = document.querySelector('.mw-content-ltr.mw-parser-output').children[0].children[0].children
    const tblObj = {
        header: tbl[1 + id * 2].children,
        body: tbl[2 + id * 2].children
    }
    const bodyObj = {
        chapters: tblObj.body[0].querySelectorAll("li"),
        info: tblObj.body[1],
        img: tblObj.body[2].querySelector("a").href
    }
    const result = {
        title: [tblObj.header[3].innerText, tblObj.header[3].innerText],
        date_release: [tblObj.header[1].innerText, tblObj.header[1].innerText],
        pages: [],
        ISBN: [tblObj.header[2].innerText, tblObj.header[2].innerText],
        chapters: {},
        cover_characters: Array.from(bodyObj.info.querySelectorAll("a")).map(character => character.innerText.trim()),
        img: `images/vinland/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters) {
        const match = chapter.innerText.split(": ");
        if (match[0].includes("Bonus Story") || match[0].includes("Side Story")) {
            const title = match[1].trim();
            result.chapters[match[0].trim()] = [title, title];
        } else {
            const number = match[0].match(/\d+/)[0];
            const title = match[1].trim();
            result.chapters[number] = [title, title];
        }
    }
    imgs.push(bodyObj.img);
    temp[id + 1] = result;
}
for (let i = 0; i < 29; i++)vinland(i);
JSON.stringify(temp);