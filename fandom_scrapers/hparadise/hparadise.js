const temp = {};
const imgs = [];
function hparadise(id) {
    const tbl = document.querySelectorAll(`table[style="border-collapse:collapse;"]`)[id + 1].querySelectorAll("tr");
    const tblObj = {
        header: tbl[0].querySelectorAll("td"),
        body: tbl[1].querySelectorAll("td")
    }
    const result = {
        title: [],
        date_release: [tblObj.header[1].innerText, tblObj.header[1].innerText],
        pages: [tblObj.body[1].innerText.match(/\Pages: \d+/)[0].match(/\d+/)[0], tblObj.body[1].innerText.match(/\Pages: \d+/)[0].match(/\d+/)[0]],
        ISBN: [tblObj.header[2].innerText, tblObj.header[2].innerText],
        chapters: {},
        cover_characters: [],
        img: `images/hparadise/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of tblObj.body[0].querySelectorAll("li")) {
        const title = chapter.innerText;
        const number = title.match(/\d+/)[0].trim();
        result.chapters[number] = title;
    }
    for (const character of tblObj.body[1].querySelectorAll(":scope > a")) {
        result.cover_characters.push(character.innerText.trim());
    }
    imgs.push(tblObj.body[1].querySelector("figure").querySelector("a").href);
    temp[id + 1] = result;
}
for (let i = 0; i < 13; i++)hparadise(i);
JSON.stringify(temp);