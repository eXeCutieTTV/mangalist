//0indexed
const temp = {};
function bleach(id) {
    const wrapper = document.getElementsByClassName('mw-content-ltr')[0];
    const tables = wrapper.querySelectorAll('table');

    const tableIndex = Math.floor(id / 10);
    const rowIndex = 2 + (id % 10) * 3;

    const trs = tables[tableIndex].querySelectorAll('tr');

    const volume = {
        header: trs[rowIndex],
        body: trs[rowIndex + 1],
        desc: trs[rowIndex + 2] //<-- unused
    };
    const header_tds = volume.header.querySelectorAll('td');

    const body_tds = volume.body.querySelectorAll('td');
    const bodyObj = {
        chapterlist: body_tds[0],
        info: body_tds[1],
        img: body_tds[2]
    }

    const result = {
        title: [bodyObj.info.querySelector('i').textContent, bodyObj.info.querySelector('i').textContent],
        date_release: [header_tds[3].textContent.replace(/(\[.*?\]|\n)/g, ""), header_tds[1].textContent.replace(/(\[.*?\]|\n)/g, "")],
        pages: [bodyObj.info.textContent.match(/Pages:\s*(\d+)/)?.[1], bodyObj.info.textContent.match(/Pages:\s*(\d+)/)?.[1]],
        ISBN: [header_tds[4].textContent.replace(/(\[.*?\]|\n|ISBN)/g, "").trim(), header_tds[2].textContent.replace(/(\[.*?\]|\n|ISBN)/g, "").trim()],
        chapters: {},
        cover_characters: [bodyObj.info.textContent.match(/Cover character:\s*([^\nP]+)/)?.[1].trim(), bodyObj.info.textContent.match(/Cover character:\s*([^\nP]+)/)?.[1].trim()],
        img: `images/bleach/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10€",
        date_bought: ""
    }
    for (const chapter of bodyObj.chapterlist.querySelectorAll('a')) {
        const str = chapter.textContent.trim();
        const match = str.match(/^(\d+(?:\.\d+)?)\.\s*(.+)$/);

        if (!match) continue;

        let [, number, title] = match;

        // normalize: remove leading zeros
        number = number.replace(/^0+(\d)/, "$1");

        result.chapters[number] = [title, title];
    }
    temp[id + 1] = (result);
}
for (let i = 0; i < 74; i++) bleach(i);