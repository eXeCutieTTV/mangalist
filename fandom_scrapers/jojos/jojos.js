let temp = {};
let imgs = [];
let range = [];

let saga = 2;

saga === 1
    ? range = [0, 2]
    : saga === 2
        ? range = [3, 6]
        : saga === 3
            ? range = [7, 16]
            : saga === 4
                ? range = [17, 25]
                : saga === 5
                    ? range = [26, 34]
                    : saga === 6
                        ? range = [35, 43]
                        : saga === 7
                            ? range = [44, 51]
                            : null;

function jojos(id) {
    /*
    const index_id = id <= 3
        ? `PB_Volume_${id}`
        : id <= 7
            ? `BT_Volume_${id - 3}`
            : id <= 17
                ? `SC_Volume_${id - 7}`
                : id <= 26
                    ? `DU_Volume_${id - 17}`
                    : id <= 35
                        ? `Volume_${id - 26}`
                        : id <= 44
                            ? `Volume_${id - 35}`
                            : id <= 52
                                ? `Volume_${id - 44}`
                                : null;
                                */

    let index_id = null;
    let url = null;
    if (id <= 2) {
        index_id = `PB_Volume_${id + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_1`;
    } else if (id <= 6) {
        index_id = `BT_Volume_${id - 3 + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_2`;
    } else if (id <= 16) {
        index_id = `SC_Volume_${id - 7 + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_3_Hardcover`;
    } else if (id <= 25) {
        index_id = `DU_Volume_${id - 17 + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_4`;
    } else if (id <= 34) {
        index_id = `Volume_${id - 26 + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_5`;
    } else if (id <= 43) {
        index_id = `Volume_${id - 35 + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_6`;
    } else if (id <= 51) {
        index_id = `Volume_${id - 44 + 1}`;
        url = `https://jojowiki.com/List_of_English_JoJo%27s_Bizarre_Adventure_Chapters/Part_7`;
    }
    console.log(index_id)

    const tbl = document.getElementById(index_id)
    console.log(tbl);
    const tblObj = {
        header: tbl.children[0].children,
        body: tbl.children
    }
    //console.log(tblObj);
    const bodyObj = {
        header: tblObj.body[0],
        info: tblObj.body[1]
    }
    //console.log(bodyObj)
    const infoObj = {
        img: bodyObj.info.children[0],
        chapters: bodyObj.info.querySelector(".volumeTableChList").querySelectorAll("li")
    }
    //console.log(infoObj);


    const result = {
        title: [bodyObj.header.querySelector(".volumeTableTitle").innerText.replace(/\n/, "").trim(), bodyObj.header.querySelector(".volumeTableTitle").innerText.replace(/\n/, "").trim()],
        date_release: [bodyObj.info.querySelector(".volumeTableInfo").children[1].children[0].innerText.replace(/\[\d+\]/, "").trim(), bodyObj.info.querySelector(".volumeTableInfo").children[1].children[0].innerText.replace(/\[\d+\]/, "").trim()],
        pages: [],
        ISBN: [bodyObj.info.querySelector(".volumeTableInfo").children[1].children[1].innerText.trim(), bodyObj.info.querySelector(".volumeTableInfo").children[1].children[1].innerText.trim()],
        chapters: {},
        cover_characters: [],
        img: `images/jojos/vol_${String(id + 1).padStart(3, "0")}.png`,
        owned: false,
        prise: "10 €",
        date_bought: ""
    }
    for (const chapter of infoObj.chapters) {
        const titles = [chapter.children[0].children[0].innerText, chapter.children[0].children[1].children[1].innerHTML.replace(/<ruby[^>]*>.*?<rb>(.*?)<\/rb>.*?<\/ruby>/g, "$1").replace(/<[^>]+>/g, "")];
        //^^ removes furigana
        let number = $(chapter).index() + chapter.parentElement.start;
        result.chapters[number] = [titles[0], titles[1]];
    }
    temp[id + 1] = result;
    imgs.push(infoObj.img.querySelector("img").src);
}

//const range = [45, 51];
for (let i = range[0]; i <= range[1]; i++)jojos(i);
// merge temp normally 
temp = Object.assign(JSON.parse(localStorage.prevTemp || "{}"), temp);
localStorage.prevTemp = JSON.stringify(temp);

imgs = JSON.stringify(imgs.reverse().concat(JSON.parse(localStorage.prevImgs || "[]")));
localStorage.prevImgs = imgs;

console.log(localStorage.prevTemp, localStorage.prevImgs);
/*
    localStorage.removeItem("prevTemp");
    localStorage.removeItem("prevImgs");
    localStorage.removeItem("prevObj");
*/
// can do semi-manually for each section, except for last one. last one has to be done completely manually... or w a new scraper.