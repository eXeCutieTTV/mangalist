const temp = {};
function frieren(id) {
    const tbl = document.querySelectorAll("table")[4];
    const trs = tbl.querySelectorAll("tr");
    const volume = {
        header: trs[4 * id + 2].querySelectorAll("td"),
        body: trs[4 * id + 3].querySelectorAll("td")
    }
    const bodyObj = {
        chapters: volume.body[0],
        info: volume.body[1],
        img: volume.body[2]
    }
    const pagesLabel = bodyObj.info.querySelector('b:nth-of-type(1)');
    let pages = null;
    if (pagesLabel && pagesLabel.nextSibling) pages = pagesLabel.nextSibling.textContent.trim();  // 2. Extract cover characters 
    const coverList = bodyObj.info.querySelectorAll('ul li a');
    const coverCharacters = [...coverList].map(a => a.textContent.trim());
    const result = {
        title: [],
        date_release: [volume.header[1].textContent.replace(/(\[.*?\]|\n)/g, ""), volume.header[3].textContent.replace(/(\[.*?\]|\n)/g, "")],
        pages: [pages, pages],
        ISBN: [volume.header[4].textContent.replace(/(\[.*?\]|\n|ISBN)/g, "").trim(), volume.header[2].textContent.replace(/(\[.*?\]|\n|ISBN)/g, "").trim()],
        chapters: {},
        cover_characters: coverCharacters,
        img: `images/frieren/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }

    for (const chapter of bodyObj.chapters.querySelectorAll('li')) {
        const str = chapter.textContent.trim();
        const match = str.match(/^Chapter (\d+):\s*(.+)$/);

        if (!match) continue;

        let [, number, title] = match;

        // normalize: remove leading zeros
        number = number.replace(/^0+(\d)/, "$1");

        result.chapters[number] = [title, title];
    }
    temp[id + 1] = result;
}
for(let i = 0; i < 15; i++) frieren(i);
JSON.stringify(temp);