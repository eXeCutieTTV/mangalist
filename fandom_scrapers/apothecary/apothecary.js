const temp = {};
const imgs = [];
function apothecary(id) {
    const volumes = document.querySelectorAll(
        'div[style*="width:100%"][style*="border-top-left-radius:0.5em"][style*="border-top-right-radius:0.5em"][style*="overflow:hidden"]'
    );
    const volume = volumes[id].children[0].querySelectorAll('tr');
    const volumeObj = {
        header: volume[2].children,
        body: volume[3].children,
    }
    const bodyObj = {
        chapterlist: volumeObj.body[0],
        info: volumeObj.body[1],
        img: volumeObj.body[2]
    }
    const result = {
        title: [],
        date_release: [volumeObj.header[3].textContent.trim(), volumeObj.header[1].textContent.trim()],
        pages: [],
        ISBN: [volumeObj.header[4].innerText.trim().replace(/(\[.*?\]|\n|More)/g, ""), volumeObj.header[2].innerText.trim().replace(/(\[.*?\]|\n|More)/g, "")],
        chapters: {},
        cover_characters: [],
        img: `images/apothecary/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    chapter_lis = bodyObj.chapterlist.querySelectorAll("li");
    for (const [key, value] of Object.entries(chapter_lis)) {
        if (value.innerText.trim().toLowerCase().includes("prologue")) {
            const title_long = value.innerText.trim();
            if (title_long.includes("(")) {
                const english_title = title_long.split("(")[0].trim().replace(/\*/, "");

                const inside = title_long.match(/\(([^)]*)\)/)[1].trim();
                const japanese_title = inside.split(",")[0].trim().replace(/\?/, "");

                result.chapters["prologue"] = [english_title, japanese_title];
            } else {
                result.chapters["prologue"] = [title_long, title_long];
            }
        }
        else if (value.innerText.trim().toLowerCase().includes("epilogue")) {
            const title_long = value.innerText.trim();
            if (title_long.includes("(")) {
                const english_title = title_long.split("(")[0].trim().replace(/\*/, "");

                const inside = title_long.match(/\(([^)]*)\)/)[1].trim();
                const japanese_title = inside.split(",")[0].trim().replace(/\?/, "");

                result.chapters["epilogue"] = [english_title, japanese_title];
            } else {
                result.chapters["epilogue"] = [title_long, title_long];
            }
        } else {
            if (id === 0) {
                const number = Number(key) + 1;
                const title_long = value.innerText;

                const english_title = title_long.split("(")[0].trim();

                const inside = title_long.match(/\(([^)]*)\)/)[1].trim();
                const japanese_title = inside.split(",")[0].trim();

                result.chapters[number] = [english_title, japanese_title];
            }
            else if (id === 1) {//for id===0 the number is a marker...
                const match = value.innerText.match(/^(\d+)\.\s*(.*)$/);
                const number = match[1];
                const title_long = match[2];

                const english_title = title_long.split("(")[0].trim();

                const inside = title_long.match(/\(([^)]*)\)/)[1].trim();
                const japanese_title = inside.split(",")[0].trim();

                result.chapters[number] = [english_title, japanese_title];
            } else {
                const text = value.innerText;

                // 1. Extract chapter number
                const numMatch = text.match(/^Chapter\s*(\d+):/i);
                const number = numMatch ? numMatch[1] : null;

                // 2. Extract ALL parentheses groups
                const parens = [...text.matchAll(/\(([^)]*)\)/g)];

                // Last parentheses = JP + romanization
                const lastInside = parens.pop()[1].trim();

                // 3. Japanese title = first item before comma
                const japanese_title = lastInside.split(",")[0].trim().replace(/\?/, "");

                // 4. English title = everything before the LAST parentheses group
                // Remove "Chapter X:"
                let english_title = text.replace(/^Chapter\s*\d+:\s*/, "");

                // Remove the last parentheses group
                english_title = english_title.replace(/\([^)]*\)\s*$/, "").trim().replace(/\*/, "");

                // Done
                result.chapters[number] = [english_title, japanese_title];
            }
        }
    }
    for (const character of bodyObj.info.querySelectorAll("a")) {
        result.cover_characters.push(character.textContent.trim());
    }
    imgs.push(bodyObj.img.children[0].children[2].querySelector("a").href);
    temp[id + 1] = result;
}
for (let i = 0; i < 16; i++) apothecary(i);
JSON.stringify(temp);
// for some weird aah reason, vol 11 chapters 19 & 20 are broken ---