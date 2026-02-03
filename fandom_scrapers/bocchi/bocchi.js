const temp = {};
const imgs = [];
function bocchi(id) {
    const tbl = document.querySelector(".portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default").children;

    const result = {
        title: [],
        date_release: [tbl[5].children[1].innerText.trim(), tbl[5].children[1].innerText.trim()],
        pages: [tbl[3].children[1].innerText.trim(), tbl[3].children[1].innerText.trim()],
        ISBN: [tbl[6].children[1].innerText.replace(/\ISBN/, "").trim(), tbl[6].children[1].innerText.replace(/\ISBN/, "").trim()],
        chapters: {},
        cover_characters: [],
        img: `images/bocchi/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    const chapter_range = tbl[2].children[1].innerText.match(/\d+/g);
    for (let i = 0; i < chapter_range[1]; i++) {
        const number = i + 1;
        result.chapters[number] = [`Chapter ${number}`, `Chapter ${number}`];
    }
    temp[id + 1] = result;
    imgs.push(tbl[1].children[2].querySelector("a").href);
}
for (let i = 0; i < 6; i++)bocchi(i);
console.log(temp);