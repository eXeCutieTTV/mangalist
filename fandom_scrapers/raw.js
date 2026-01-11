let amount = 14; //<-- amount of volumes to be added
function raw(id, title) {
    const result = {
        title: [],
        date_release: [],
        pages: [],
        ISBN: [],
        chapters: {},
        cover_characters: "",
        img: `images/${title}/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10€",
        date_bought: ""
    }
    temp[id + 1] = result;
}
for (let i = 0; i < amount; i++) raw(i, /*title*/ /*example: 'frieren'*/);
JSON.stringify(temp);