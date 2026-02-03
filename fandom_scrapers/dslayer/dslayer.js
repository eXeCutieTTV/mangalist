const temp = {};
const imgs = [];
function dslayer(id) {
    const tbl = document.querySelectorAll(".wds-tab__content.wds-is-current")[0];
    const volume = tbl.querySelectorAll("table")[id].children[0].children;
    const tblObj = {
        header: volume[2].children,
        body: volume[3].children
    }
    const bodyObj = {
        chapters: tblObj.body[0].querySelectorAll("li"),
        info: tblObj.body[1],
        img: tblObj.body[2].children[0].children[0].children[2].querySelector("a").href
    }
    const result = {
        title: [bodyObj.info.children[0].innerText.trim(), bodyObj.info.children[0].innerText.trim()],
        date_release: [tblObj.header[3].innerText.replace(/\[\d+\]/, "").trim(), tblObj.header[1].innerText.replace(/\[\d+\]/, "").trim()],
        pages: [bodyObj.info.innerText.match(/Pages: \d+/)[0].match(/\d+/)[0], bodyObj.info.innerText.match(/Pages: \d+/)[0].match(/\d+/)[0]],
        ISBN: [tblObj.header[4].innerText.replace("ISBN", "").trim(), tblObj.header[2].innerText.replace("ISBN", "").trim()],
        chapters: {},
        cover_characters: [],
        img: `images/dslayer/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters) {
        if (chapter.innerText.includes("Bonus")) {
            result.chapters["Bonus"] = [chapter.innerText, chapter.innerText];
        } else {
            const title = chapter.innerText;
            const number = chapter.innerText.match(/\d+/)[0];
            result.chapters[number] = [title, title];
        }
    }
    for (const character of bodyObj.info.querySelectorAll("a")) {
        result.cover_characters.push(character.innerText.trim());
    }
    imgs.push(bodyObj.img);
    temp[id + 1] = result;
}
for (let i = 0; i < 23; i++)dslayer(i);
JSON.stringify(temp);