let amount = 74; //<-- amount of volumes to be added
const temp = {};
function raw(id) {
    const result = {
        title: [],
        date_release: [],
        pages: [],
        ISBN: [],
        chapters: {},
        img: "",
        owned: false,
        prise: "10€",
        date_bought: ""
    }
    temp[id + 1] = result;
}
for (let i = 0; i < amount; i++)raw(i);