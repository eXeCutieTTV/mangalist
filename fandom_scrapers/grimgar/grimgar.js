const temp = {};
const imgs = [];
function grimgar(id) {
    const tbl = document.querySelector(".article-table").children[0].children[id + 1].children;
    const bodyObj = {
        img: tbl[0].querySelector("a").href,
        title: tbl[1].innerText.split(`\n`),
        date: tbl[2].querySelectorAll("li"),
        isbn: tbl[3].querySelectorAll("li"),
    }
    const result = {
        title: [bodyObj.title[0].trim(), bodyObj.title[1].trim()],
        date_release: [bodyObj.date[2].innerText.replace(/\(.+\)/, "").trim(), bodyObj.date[0].innerText.replace(/\(.+\)/, "").trim()],
        pages: [],
        ISBN: [bodyObj.isbn[1].innerText.replace(/(ISBN|\(EN\))\s*/g, "").trim(), bodyObj.isbn[0].innerText.replace(/(ISBN|\(JP\))\s*/g, "").trim()],
        chapters: {},
        cover_characters: [],
        img: `images/grimgar/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    imgs.push(bodyObj.img);
    temp[id + 1] = result;
}
for (let i = 0; i < 21; i++) grimgar(i);
JSON.stringify(temp);