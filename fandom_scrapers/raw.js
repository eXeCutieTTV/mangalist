let range = [/*min*/49, 52/*max*/] //<-- range of volumes to be added
const temp = {};
function raw(id, title) {
    const result = {
        title: [],
        date_release: [],
        pages: [],
        ISBN: [],
        chapters: {},
        cover_characters: [],
        img: `images/${title}/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    temp[id + 1] = result;
}
for (let i = range[0] - 1; i <= range[1] - 1; i++) raw(i, /*title*/ /*example: 'frieren'*/);
JSON.stringify(temp);