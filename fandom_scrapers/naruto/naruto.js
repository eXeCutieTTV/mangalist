const temp = {};
function naruto(id) {
    const tbls = document.getElementsByClassName("wikitable");
    const table = id < 27 ? tbls[0] : tbls[1];
    const trs = table.querySelectorAll("tr:not(.mainheader)");
    const localId = id < 27 ? id : id - 27;

    const volume = {
        header: trs[2 * localId].querySelectorAll("td"),
        body: trs[2 * localId + 1]
    }
    console.log(volume);
    const lis = volume.body.querySelectorAll("li");

    const result = {
        title: [volume.header[1].textContent.match(/^([^()]+) \(([^,]+),/)[1], volume.header[1].textContent.match(/^([^()]+) \(([^,]+),/)[2]],
        date_release: [volume.header[3].textContent.replace(/\n/, ""), volume.header[2].textContent.replace(/\n/, "")],
        pages: ["", ""],
        ISBN: ["", ""],
        chapters: {},
        cover_characters: "",
        img: `images/naruto/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of lis) {

        const str = chapter.textContent.trim();
        const match = str.match(/^(\d+(?:\.\d+)?)\.\s*(.+)$/);

        if (!match) continue;

        let [, number, title] = match;

        // normalize: remove leading zeros
        number = number.replace(/^0+(\d)/, "$1");

        const title_match = title.match(/^"([^"]+)" \(([^,]+),/);
        const title_en = title_match[1];
        const title_jp = title_match[2];

        result.chapters[number] = [title_en, title_jp];
    }
    temp[id + 1] = result;
}
naruto(27)
console.log(temp)