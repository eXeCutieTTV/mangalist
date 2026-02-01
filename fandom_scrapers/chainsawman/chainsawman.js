const temp = {};
const imgs = [];
function chainsawman(id) {
    const volume = document.querySelectorAll('table[style="border-collapse:collapse; border:1px #aaaaaa solid;"]')[id];
    const trs = volume.querySelectorAll("tr");

    const header = trs[0].querySelectorAll("td");
    const body = trs[1].querySelectorAll("td");

    const bodyObj = {
        chapters: body[0],
        info: body[1],
        img: body[2]
    }
    const isbn = volume.querySelectorAll('tr')[0].children[3].innerText.split("\n");
    const date = volume.querySelectorAll('tr')[0].children[2].innerText.split("\n");
    const result = {
        title: [header[1].innerText.trim(), header[1].innerText.trim()],
        date_release: [date[0].replace(/\(..\)$/, "").trim(), date[1].replace(/\(..\)$/, "").trim()],// 0 1, or 1 0?
        pages: [],
        ISBN: [isbn[0].replace(/\(..\)$/, "").replace(/\ISBN/, "").trim(), isbn[1].replace(/\(..\)$/, "").replace(/\ISBN/, "").trim()],
        chapters: {},
        cover_characters: [],
        img: `images/chainsawman/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters.querySelectorAll('li')) {

        const children = chapter.children;

        let title_en = children[0].textContent;
        let title_jp_long = children[1].children[0].textContent;

        let title_jp = title_jp_long.replace(/\s*\([^)]*\)\s*/g, "");

        let number = chapter.textContent.match(/\d+/)[0];
        number = number.replace(/^0+(\d)/, "$1"); // normalize: remove leading zeros

        result.chapters[number] = [title_en, title_jp];
    }
    let html = bodyObj.info.innerHTML;
    let matches = [...html.matchAll(/(\d+)\s*\((Japanese|English)\)/g)];
    for (const [_, num, lang] of matches) {
        if (lang === "Japanese") pages_jp = Number(num);
        if (lang === "English") pages_en = Number(num);
    }
    result.pages = [pages_en, pages_jp];
    for (const character of bodyObj.info.querySelectorAll("a")) result.cover_characters.push(character.textContent);
    imgs.push(bodyObj.img.querySelectorAll(".wds-tab__content")[1].querySelector("a").href);

    temp[id + 1] = result;
}
for (let i = 0; i < 23; i++)chainsawman(i);
//console.log(temp, imgs);
JSON.stringify(temp);