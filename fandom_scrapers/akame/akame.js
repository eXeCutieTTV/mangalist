const temp = {};
const imgs = [];
function akame(id) {
    const tbl = document.querySelector('table[style="margin:auto; border-collapse:collapse;"]').children[0].children
    const tblObj = {
        header: tbl[2 + id * 3].children,
        body: tbl[2 + id * 3 + 1].children
    }
    const bodyObj = {
        chapters: tblObj.body[0].querySelectorAll("li"),
        info: tblObj.body[1],
        img: tblObj.body[2].querySelector("a").href
    }
    const result = {
        title: [],
        date_release: [tblObj.header[1].innerHTML.split("<br>")[1].replace("\n", "").replace(/\(.+\)/, "").trim(), tblObj.header[1].innerHTML.split("<br>")[0].replace(/\(.+\)/, "").trim()],
        pages: [bodyObj.info.innerText.match(/\d+/)[0], bodyObj.info.innerText.match(/\d+/)[0]],
        ISBN: [tblObj.header[2].querySelectorAll("a")[1].innerText.trim(), tblObj.header[2].querySelectorAll("a")[0].innerText.trim()],
        chapters: {},
        cover_characters: Array.from(bodyObj.info.querySelectorAll("a")).map(character => character.innerText.trim()),
        img: `images/akame/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters) {
        const match = chapter.innerText.split(": ");
        if (match[0].includes("Extra")) {
            const title = match[1].trim();
            result.chapters["Extra"] = [title, title];
        } else {
            const number = match[0].match(/\d+/)[0];
            const title = match[1].trim();
            result.chapters[number] = [title, title];
        }
    }
    temp[id + 1] = result;
    imgs.push(bodyObj.img);
}
for (let i = 0; i < 15; i++)akame(i);
JSON.stringify(temp);