const temp = {};
const imgs = [];
function sololvl(id) {
    const tbl = document.querySelector(".tabber.wds-tabber").children[1].querySelector("tbody").children;
    const tblObj = {
        korean: tbl[id * 2 + 1].children,
        english: tbl[id * 2 + 2].children[0]
    }
    const result = {
        title: [],
        date_release: [tblObj.english.innerText.split(`\n`)[1].trim(), tblObj.korean[3].innerText.split(`\n`)[1].trim()],
        pages: [],
        ISBN: [tblObj.english.children[3].innerText.trim(), tblObj.korean[3].children[3].innerText.trim()],
        chapters: {},
        cover_characters: [],
        img: `images/sololvl/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of tblObj.korean[2].querySelectorAll("a")) {
        if (chapter.innerText.includes("Prologue")) result.chapters[0] = [chapter.innerText, chapter.innerText];
        else {
            const title = chapter.innerText;
            const number = Number(title.match(/\d+/)[0]);
            result.chapters[number] = [title, title];
        }
    }
    for (const character of tblObj.korean[4].children[1].querySelectorAll("a")) {
        result.cover_characters.push(character.innerText.trim());
    }
    imgs.push(tblObj.korean[4].children[0].children[0].children[0].children[2].querySelector("a").href);
    temp[id + 1] = result;
}
for (let i = 0; i < 15; i++)sololvl(i);
JSON.stringify(temp);