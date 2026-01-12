const temp = {};
function whAtelier(id) {
    const tbls = document.querySelectorAll('table[style="margin:auto; border-collapse:collapse;"]');
    const tbl = tbls[id];
    const trs = tbl.querySelectorAll("tr");
    const volume = {
        header: trs[2].querySelectorAll("td"),
        body: trs[3].querySelectorAll("td")
    }
    const bodyObj = {
        chapters: volume.body[0],
        info: volume.body[1],
        img: volume.body[2]
    }// 1. Extract page count
    const pagesLabel = bodyObj.info.querySelector('b:nth-of-type(2)');
    let pages = null;

    if (pagesLabel && pagesLabel.nextSibling) {
        pages = pagesLabel.nextSibling.textContent.trim();
    }

    // 2. Extract cover characters
    const coverLabel = bodyObj.info.querySelector('b:nth-of-type(3)');
    let coverCharacters = [];

    if (coverLabel) {
        // all <a> tags immediately after "Cover characters:"
        const anchors = [];
        let node = coverLabel.nextSibling;

        while (node) {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'A') {
                anchors.push(node);
            }
            node = node.nextSibling;
        }

        coverCharacters = anchors.map(a => a.textContent.trim());
    }

    const result = {
        title: [`Volume ${id + 1}`, `Volume ${id + 1}`],
        date_release: [
            volume.header[3].textContent.replace(/(\[.*?\]|\n)/g, ""),
            volume.header[1].textContent.replace(/(\[.*?\]|\n)/g, "")
        ],
        pages: [pages, pages],
        ISBN: [
            volume.header[4].textContent.replace(/(\[.*?\]|\n)/g, ""),
            volume.header[2].textContent.replace(/(\[.*?\]|\n)/g, "")
        ],
        chapters: {},
        cover_characters: coverCharacters,
        img: `images/whAtelier/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapters.querySelectorAll('li')) {
        const str = chapter.textContent.trim();

        // Match "Chapter 1", "Chapter 12", etc.
        const match = str.match(/^Chapter\s+(\d+)$/);
        if (!match) continue;

        const number = match[1];
        const title = `Chapter ${number}`;

        result.chapters[number] = [title, title];
    }

    temp[id + 1] = result;
}
for (let i = 0; i < 16; i++) whAtelier(i);
JSON.stringify(temp);