const temp = {};
function oshink(id) {
    const wrapper = document.querySelector(".mw-content-ltr.mw-parser-output");
    const tbls = wrapper.querySelectorAll("table:not(.volumeheader):not(.mw-collapsible.mw-made-collapsible)");
    const tbl = tbls[id];
    const trs = tbl.querySelectorAll("tr");
    const tblObj = {
        jp: trs[0].querySelectorAll("th"),
        en: trs[1].querySelectorAll("th"),
        body: trs[2].querySelectorAll("td")
    }

    const result = {
        title: [],
        date_release: [tblObj.en[1].textContent.replace(/(\[.*?\]|\n)/g, ""), tblObj.jp[2].textContent.replace(/(\[.*?\]|\n)/g, "")],
        pages: [],
        ISBN: [tblObj.en[2].textContent.replace(/(\[.*?\]|\n|ISBN)/g, "").trim(), tblObj.jp[3].textContent.replace(/(\[.*?\]|\n|ISBN)/g, "").trim()],
        chapters: {},
        cover_characters: [],
        img: `images/oshink/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of tblObj.body[0].querySelectorAll("li")) {
        if (chapter.querySelector("a").title.match(/Interlude/)) {
            const title = chapter.textContent.replace(/(Oshi no Ko | Chapter)/g, "").trim();
            result.chapters[title] = [title, title];
        } else {

            const str = chapter.textContent.trim();
            const cleaned = str.match(/Chapter (\d+): \s*(.*)/);
            const match = cleaned[2];

            if (!match) continue;

            const split = match.split("「");
            const title = [split[0], split[1].replace(/」/, "").split(",")[0]];
            result.chapters[cleaned[1]] = [title[0], title[1]];
        }
    }
    for (const char of tblObj.body[1].querySelectorAll("a")) {
        result.cover_characters.push(char.textContent.trim());
    }
    temp[id + 1] = result;
    //temp.push(tblObj.body[2].children[0].children[0].children[2].querySelector("a").href); //img urls
}
for (let i = 0; i < 15; i++) oshink(i);
JSON.stringify(temp);