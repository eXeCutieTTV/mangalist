const temp = {};
const imgs = [];
function tog(id) {
    const tbl = document.querySelector(".portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default").children;
    const tblObj = {
        img: tbl[1].children[3].querySelector("a").href,
        uniInfo: tbl[2].children,
        koInfo: tbl[3].children, //just for ISBN & date
        enInfo: tbl[4].children
    }
    const result = {
        title: [`Book ${id + 1}`, `Book ${id + 1}`],
        date_release: [tblObj.enInfo[5].children[1].innerText.trim(), tblObj.koInfo[5].children[1].innerText.trim()],
        pages: [tblObj.uniInfo[3].children[1].innerText.trim(), tblObj.uniInfo[3].children[1].innerText.trim()],
        ISBN: [tblObj.enInfo[1].children[1].innerText.trim().replace("ISBN ", ""), tblObj.koInfo[1].children[1].innerText.trim().replace("ISBN ", "")],
        chapters: {},
        cover_characters: [],
        img: `images/tog/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const character of tblObj.enInfo[2].querySelectorAll("a")) {
        result.cover_characters.push(character.innerText.trim());
    }

    for (const chapter of document.querySelector(".mw-content-ltr.mw-parser-output").querySelectorAll("li")) {
        if (chapter.innerText.includes("Ch.")) {
            const number = chapter.innerText.match(/\d+/)[0];
            const title = chapter.children[0].innerText.trim();
            result.chapters[number] = [title, title];
        }
    }
    imgs.push(tblObj.img);
    temp[id + 1] = result;
}
for (let i = 0; i < 3; i++) tog(i);
JSON.stringify(temp);
//just did it manually 3 times xd