const temp = {}; // object instead of array

function tabl(id) {
    const tbl = document.getElementById(`Volume_${id}`);
    const trs = tbl.querySelectorAll('tr');
    const trsObj = {
        jptr: trs[2],
        ustr: trs[3],
        bodytr: trs[4],
        sbstr: trs[5]
    };
    const jptds = trsObj.jptr.querySelectorAll('td');
    const ustds = trsObj.ustr.querySelectorAll('td');
    const bodytds = trsObj.bodytr.querySelectorAll('td');
    const body_chapters_ul = bodytds[0].querySelector('ul');
    const body_chapters_lis = body_chapters_ul.querySelectorAll('li');
    const body_characters_ul = bodytds[1].querySelector('ul');
    const body_characters_lis = body_characters_ul.querySelectorAll('li');
    const a = bodytds[2].querySelector('a');

    const result = {
        title: [ustds[0].textContent.replace(/\n/, ""), jptds[0].textContent.replace(/\n/, "")],
        date_release: [
            ustds[1].textContent.replace(/(\[.*?\]|\n)/g, ""),
            jptds[1].textContent.replace(/(\[.*?\]|\n)/g, "")
        ],
        pages: [ustds[2].textContent.replace(/\n/, ""), jptds[2].textContent.replace(/\n/, "")],
        ISBN: [ustds[3].textContent.replace(/\n/, ""), jptds[3].textContent.replace(/\n/, "")],
        chapters: {},
        cover_characters: [],
        img: a.href.replace(/\/revision.*$/, "")
,
        owned: true,
        prise: "10 €",
        date_bought: ""
    };

    for (const li of body_chapters_lis) {
        let text = li.textContent.replace(/\n/g, "").trim();
        const chapterNumber = text.match(/^\d+/)?.[0];
        if (!chapterNumber) continue;
        text = text.replace(/^\d+\.\s*/, "");

        const match = text.match(/^(.*?)\s*\((.+)\)$/);
        let enTitle, jpTitle;

        if (match) {
            enTitle = match[1].trim();
            jpTitle = match[2].split(",")[0].trim(); // remove romanization
        } else {
            enTitle = text.trim();
            jpTitle = "";
        }

        result.chapters[chapterNumber] = [enTitle, jpTitle];
    }

    for (const li of body_characters_lis) {
        result.cover_characters.push(li.textContent);
    }

    // Assign result to the volume number key in the object
    temp[id] = result;
}

// Loop through all volumes
for (let i = 1; i < 114; i++) {
    tabl(i);
}
