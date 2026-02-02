const temp = {};
const imgs = [];
function bbox(id) {
    const tbl = document.querySelector(".mw-content-ltr.mw-parser-output").querySelectorAll("tbody")[id];
    const tblObj = {
        header: tbl.querySelectorAll("tr")[2].querySelectorAll("td"),
        body: tbl.querySelectorAll("tr")[3].querySelectorAll("td")
    }
    const bodyObj = {
        chapters: tblObj[0].querySelectorAll("li"),
        info: tblObj[1],
        img: tblObj[2]
    }
    const result = {
        title: [bodyObj.info.children[0].innerText, bodyObj.info.children[0].innerText],
        date_release: [tblObj.header[3].innerText, tblObj.header[1].innerText],
        pages: [bodyObj.info.innerText.match(/\d+/), bodyObj.info.innerText.match(/\d+/)],
        ISBN: [tblObj.header[4].querySelector("p").innerText, tblObj.header[2].querySelector("p").innerText],
        chapters: {},
        cover_characters: [],
        img: `images/bbox/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters) {
        const title = chapter.textContent.replace(/^#\d+:\s*/, "");
        const number = Number(chapter.textContent.match(/\d+/)[0]);

        result.chapters[number] = title;
    }
    for (const character of bodyObj.info.children[6].querySelectorAll("li")) {
        result.cover_characters.push(character.innerText);
    }
    imgs.push(bodyObj.img.children[0].children[0].children[2].querySelector("a").href);
    temp[id + 1] = result;
}
for (let i = 0; i < 24; i++)bbox(i);
JSON.stringify(temp);