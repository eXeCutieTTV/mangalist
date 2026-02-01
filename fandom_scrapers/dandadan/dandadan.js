const temp = {};
const imgs = [];
function dandadan(id) {
    const tbl = document.querySelectorAll(".mw-content-ltr.mw-parser-output")[0].querySelector("tbody").children;
    const volume = {
        header: tbl[5 + (id - 1) * 3].children,
        body: tbl[5 + (id - 1) * 3 + 1].children
    };
    const bodyObj = {
        chapters: volume.body[0].children,
        info: volume.body[1],
        img: volume.body[2]
    }
    const result = {
        title: [],
        date_release: [volume.header[3].innerText, volume.header[1].innerText],
        pages: [Number(bodyObj.info.innerHTML.match(/\d+/)[0]), Number(bodyObj.info.innerHTML.match(/\d+/)[0])],
        ISBN: [volume.header[4].innerText, volume.header[2].innerText],
        chapters: {},
        cover_characters: [],
        img: `images/dandadan/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters[1].querySelectorAll("li")) {
        const match = chapter.textContent.match(/\d+/);
        let number = match ? match[0].replace(/^0+(\d)/, "$1") : "One-ShShot";

        result.chapters[number] = [chapter.children[0].textContent, chapter.children[1].children[0].textContent];
    }
    for (const character of bodyObj.info.querySelectorAll("li")) {
        result.cover_characters.push(character.textContent);
    }
    bodyObj.img.querySelectorAll("[data-hash]").length > 0
        ? imgs.push(bodyObj.img.children[0].children[2].querySelector("a").href)
        : ""

    temp[id + 1] = result;
}
for (let i = 0; i < 22; i++)dandadan(i);
JSON.stringify(temp);
console.log(imgs);