let amount = 74;
const temp = [];
function raw(id) {
    const result = {
        [`${id + 1}`]: {
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
    }
    temp.push(result);
}
for (let i = 0; i < amount; i++)raw(i);