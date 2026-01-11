const temp = {};
function hxh(id) {
    const tbl = document.querySelectorAll(".wikitable")[0].querySelector("tbody");
    const trs = tbl.querySelectorAll("tr");

    const volume = {
        header: trs[2 * id + 3], //+1, but +3 to skip the volume0
        body: trs[2 * id + 4] //-||-
    }
    const header_tds = volume.header.querySelectorAll("td");
    const body_tds = volume.body.querySelectorAll("td");
    const bodyObj = {
        chapter: body_tds[0],
        info: body_tds[1],
        img: body_tds[2]
    }
    const info_lis = bodyObj.info.querySelectorAll("li");

    const result = {
        title: [header_tds[1].textContent.replace(/\n/, ""), header_tds[1].textContent.replace(/\n/, "")],
        date_release: [header_tds[2].textContent.replace(/\n/, ""), header_tds[3].textContent.replace(/\n/, "")],
        pages: [bodyObj.img.querySelector("i").textContent.replace(/\ pages/, ""), bodyObj.img.querySelector("i").textContent.replace(/\ pages/, "")],
        ISBN: [info_lis[1].textContent.replace(/\(EN\)/, "").trim(), info_lis[0].textContent.replace(/\(JP\)/, "").trim()],
        chapters: {},
        cover_characters: info_lis[2].textContent,
        img: `images/hunter-x-hunter/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10€",
        date_bought: ""
    }

    for (const chapter of bodyObj.chapter.querySelectorAll("li")) {
        const str = chapter.textContent.trim();
        const match = str.match(/^(\d+(?:\.\d+)?)\.\s*(.+)$/);

        if (!match) continue;

        let [, number, title] = match;

        // normalize: remove leading zeros
        number = number.replace(/^0+(\d)/, "$1");

        result.chapters[number] = [title, title];
    }

    temp[id + 1] = result;
}
for (let i = 0; i < 38; i++)hxh(i);
JSON.stringify(temp);