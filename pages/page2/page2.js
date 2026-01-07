/*
let entryMap = {
    "One Piece": {
        "title": "One Piece",
        "author": "Eiichiro Oda",
        "released": "1997",
        "volumes": {
            "1": {
                "chapters": {
                    "1": [
                        "Romance Dawn —The Dawn of the Adventure—",
                        "冒険の夜明け"
                    ],
                    "2": [
                        "That Guy, 'Straw Hat Luffy'",
                        "その男〝麦わらのルフィ〟"
                    ],
                    "3": [
                        "Introducing Pirate Hunter Zoro",
                        "海賊狩りのゾロ'登場'"
                    ],
                    "4": [
                        "Marine Captain 'Axe-Hand Morgan'",
                        "海軍大佐”斧手のモーガン"
                    ],
                    "5": [
                        "The Pirate King and the Great Swordsman",
                        "海賊王と大剣豪"
                    ],
                    "6": [
                        "The First",
                        "人目"
                    ],
                    "7": [
                        "Friends",
                        "友達"
                    ],
                    "8": [
                        "Introducing Nami",
                        "ナミ登場"
                    ]
                },
                "pages": [216, 208],
                "img": "https://static.wikia.nocookie.net/onepiece/images/0/0e/Volume_1.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "1997-12-24",
                "total_sold": ">1,000,000",
                "owned": true
            },
            "2": {
                "chapters": {
                    "9": [
                        "Buggy the Clown",
                        "道化のバギー"
                    ],
                    "10": [
                        "Incident at the Tavern",
                        "酒場の一件"
                    ],
                    "11": [
                        "Flight",
                        "逃走"
                    ],
                    "12": [
                        "Dog",
                        "犬"
                    ],
                    "13": [
                        "Treasure",
                        "宝物"
                    ],
                    "14": [
                        "Reckless",
                        "向こう見ず"
                    ],
                    "15": [
                        "Gong",
                        "ゴング"
                    ],
                    "16": [
                        "High Level, Low Level",
                        "ハイレベル・ローレル"
                    ]
                },
                "pages": [200, 200],
                "img": "https://static.wikia.nocookie.net/onepiece/images/2/2f/Volume_2.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "1998-04-30",
                "total_sold": ">1,000,000",
                "owned": true
            },
            "3": {
                "chapters": {
                    "18": [
                        "The Pirate Buggy the Clown",
                        "海賊「道化のバギー」"
                    ],
                    "19": [
                        "Devil Fruit",
                        "悪魔の実"
                    ],
                    "20": [
                        "The Way of the Thief",
                        "泥棒道"
                    ],
                    "21": [
                        "Town",
                        "町"
                    ],
                    "22": [
                        "You're the Rare Breed",
                        "あんたが珍獣"
                    ],
                    "23": [
                        "Captain Usopp Appears",
                        "キャプテン・ウソップ登場"
                    ],
                    "24": [
                        "Things That Can't Be Faked",
                        "偽れぬもの"
                    ],
                    "25": [
                        "800 Lies",
                        "ウソ800"
                    ],
                    "26": [
                        "Captain Kuro’s Plan",
                        "キャプテン・クロの一計"
                    ]
                },
                "pages": [200, 200],
                "img": "https://static.wikia.nocookie.net/onepiece/images/7/75/Volume_3.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "1998-08-04",
                "total_sold": ">1,000,000",
                "owned": true
            },
            "4": {
                "chapters": {
                    "27": [
                        "For Whom the Bell Tolls",
                        "鐘は誰のために鳴る"
                    ],
                    "28": [
                        "The Return of Captain Kuro",
                        "キャプテン・クロ再び"
                    ],
                    "29": [
                        "The Foxy Men of Shells",
                        "貝殻のフォクシー一味"
                    ],
                    "30": [
                        "Confrontation",
                        "対決"
                    ],
                    "31": [
                        "The Worst Client",
                        "最悪の依頼人"
                    ],
                    "32": [
                        "Sergeant Major Front",
                        "一等兵フロント"
                    ],
                    "33": [
                        "Little East Blue",
                        "小さな東の海"
                    ]
                },
                "pages": [208, 192],
                "img": "https://static.wikia.nocookie.net/onepiece/images/3/31/Volume_4.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "1998-12-21",
                "total_sold": ">1,000,000",
                "owned": true
            },
            "5": {
                "chapters": {
                    "34": [
                        "We Are!",
                        "おれたちの海だ！"
                    ],
                    "35": [
                        "To the Sea!",
                        "海へ！"
                    ],
                    "36": [
                        "Yosaku & Johnny",
                        "ヨサクとジョニー"
                    ],
                    "37": [
                        "Nami’s Trek",
                        "ナミの軌跡"
                    ],
                    "38": [
                        "Zeff and Sanji",
                        "ゼフとサンジ"
                    ],
                    "39": [
                        "The Red Foot",
                        "赤い足"
                    ],
                    "40": [
                        "Baratie",
                        "バラティエ"
                    ]
                },
                "pages": [200, 192],
                "img": "https://static.wikia.nocookie.net/onepiece/images/8/8a/Volume_5.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "1999-03-19",
                "total_sold": ">1,000,000",
                "owned": true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                "pages": [200, 192],
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
            "6": {
                chapters: {
                    "41": [],
                    "42": [],
                    "43": [],
                    "44": [],
                    "45": [],
                    "46": []
                },
                img: "",
                prise: "",
                date_bought: "",
                date_released: "",
                total_sold: "",
                owned: true
            },
        }
    },
    "Bleach": {
        "title": "Bleach",
        "author": "Tite Kubo",
        "released": "2001",
        "volumes": {
            "1": {
                "chapters": {
                    "1": [
                        "Death & Strawberry",
                        "ザ・デス・アンド・ザ・ストロベリー"
                    ],
                    "2": [
                        "Starter",
                        "スターター"
                    ],
                    "3": [
                        "Headhittin’",
                        "ヘッドヒッティン’"
                    ],
                    "4": [
                        "Why Do You Eat It?",
                        "なぜそれを食べる？"
                    ],
                    "5": [
                        "Binda Blinda",
                        "ビンダ・ブリンダ"
                    ],
                    "6": [
                        "Microcrack.",
                        "マイクロクラック"
                    ],
                    "7": [
                        "The Pink Cheeked Parakeet",
                        "ピンクほっぺのインコ"
                    ]
                },
                "img": "https://static.wikia.nocookie.net/bleach/images/a/ad/MangaVolume1Cover.png/revision/latest?cb=20190530063053&path-prefix=en",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "2002-01-05",
                "total_sold": ">500,000",
                "owned": true
            },
            "2": {
                "chapters": {
                    "8": [
                        "Chasing Chad",
                        "チャド追跡"
                    ],
                    "9": [
                        "Monster vs. New Girl (Part 1)",
                        "モンスター対ニューガール①"
                    ],
                    "10": [
                        "Monster vs. New Girl (Part 2)",
                        "モンスター対ニューガール②"
                    ],
                    "11": [
                        "Leech-Bombs and Mom",
                        "リーク爆弾と母"
                    ],
                    "12": [
                        "The Gate of the End",
                        "終わりの門"
                    ],
                    "13": [
                        "Bad Standard",
                        "バッド・スタンダード"
                    ],
                    "14": [
                        "School Daze!!!",
                        "スクール・デイズ!!!"
                    ],
                    "15": [
                        "Wasted but Wanted",
                        "浪費されても求められる"
                    ]
                },
                "img": "https://static.wikia.nocookie.net/bleach/images/5/54/MangaVolume2Cover.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "2002-03-04",
                "total_sold": ">500,000",
                "owned": true
            },
            "3": {
                "chapters": {
                    "16": [
                        "Memories in the Rain",
                        "雨の思い出"
                    ],
                    "17": [
                        "A Star and a Stray Dog",
                        "星と迷い犬"
                    ],
                    "18": [
                        "Flowers on the Precipice",
                        "崖の花"
                    ],
                    "19": [
                        "The Undead",
                        "アンデッド"
                    ],
                    "20": [
                        "White Tower Rocks",
                        "ホワイト・タワー・ロックス"
                    ],
                    "21": [
                        "Beginning of the Death of Tomorrow",
                        "明日の死の始まり"
                    ]
                },
                "img": "https://static.wikia.nocookie.net/bleach/images/7/75/MangaVolume3Cover.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "2002-06-04",
                "total_sold": ">500,000",
                "owned": true
            },
            "4": {
                "chapters": {
                    "22": [
                        "Quincy Archer Hates You",
                        "クインシー・アーチャーはお前が嫌いだ"
                    ],
                    "23": [
                        "Right Arm of the Giant",
                        "巨人の右腕"
                    ],
                    "24": [
                        "The Death Trilogy Overture",
                        "死の三部作序曲"
                    ],
                    "25": [
                        "The Broken Coda",
                        "壊れたコーダ"
                    ],
                    "26": [
                        "The Blade and Me",
                        "ブレードと俺"
                    ]
                },
                "img": "https://static.wikia.nocookie.net/bleach/images/5/50/MangaVolume4Cover.png",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "2002-09-04",
                "total_sold": ">500,000",
                "owned": true
            },
            "5": {
                "chapters": {
                    "27": [
                        "Fourteen Days for Conspiracy",
                        "陰謀の14日間"
                    ],
                    "28": [
                        "Tattoo on the Sky",
                        "空のタトゥー"
                    ],
                    "29": [
                        "A Star and a Stray Dog (Extra)",
                        "星と迷い犬（特別編）"
                    ],
                    "30": [
                        "Flower on the Precipice (Extra)",
                        "崖の花（特別編）"
                    ]
                },
                "img": "https://static.wikia.nocookie.net/bleach/images/4/4e/MangaVolume5Cover.png/revision/latest?cb=20200107160347&path-prefix=en",
                "prise": "10 €",
                "date_bought": "",
                "date_released": "2002-11-01",
                "total_sold": ">500,000",
                "owned": true
            }
        }
    }
};*/

function newTKN() { localStorage.mangalist_token = prompt("New pat_token") }
async function page2() {
    const pageWrapper = document.getElementById("page2-wrapper");
    if (localStorage.mangalist_token.length > 0) console.log("pat token:", localStorage.mangalist_token);
    else localStorage.mangalist_token = prompt("pat_token")

    //vv file manipulation
    const folder = "generated"; // folder inside repo
    const repoOwner = "eXeCutieTTV";
    const repoName = "mangalist";
    const token = localStorage.mangalist_token; // visible to anyone using the page

    document.getElementById("makeFile").addEventListener("click", async () => {
        const timestamp = Date.now();
        const filename = `generated_${timestamp}.json`;

        function toBase64(str) {
            const utf8 = new TextEncoder().encode(str);
            let binary = "";
            utf8.forEach(byte => binary += String.fromCharCode(byte));
            return btoa(binary);
        }

        const content = `${JSON.stringify(entryMap, null, 2)}`;

        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folder}/${filename}`;

        const encodedContent = toBase64(content);

        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: `Add ${filename}`,
                content: encodedContent
            })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert(`File ${filename} pushed to GitHub`);
        } else {
            alert("Error: " + result.message);
        }
    });
    async function getNewestFile() {
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folder}`;

        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const files = await response.json();

        if (!Array.isArray(files)) {
            console.error("GitHub error:", files);
            return;
        }

        const jsonFiles = files.filter(f => f.name.endsWith(".json"));

        jsonFiles.sort((a, b) => {
            const tA = parseInt(a.name.match(/\d+/)[0]);
            const tB = parseInt(b.name.match(/\d+/)[0]);
            return tB - tA;
        });

        const newest = jsonFiles[0];

        // Fetch file content from GitHub API (NOT raw.githubusercontent.com)
        const fileApiUrl = newest.url; // this is the API endpoint, not the raw URL

        const fileResponse = await fetch(fileApiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const fileData = await fileResponse.json();

        // GitHub returns base64 content
        function fromBase64(b64) {
            const binary = atob(b64);
            const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
            return new TextDecoder().decode(bytes);
        }

        const decoded = fromBase64(fileData.content);
        const parsed = JSON.parse(decoded);

        return {
            name: newest.name,
            data: parsed
        };

    }
    const { data: entryMap } = await getNewestFile();
    console.log("JSON parsed:", entryMap);
    //^^ file manipulation


    // Create modal dynamically (one modal for all galleries)
    const modal = document.createElement("div");
    modal.id = "modal";
    Object.assign(modal.style, {
        display: "none",
        position: "fixed",
        zIndex: "1000",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    });

    const modalContent = document.createElement("div");
    Object.assign(modalContent.style, {
        backgroundColor: "#fff",
        padding: "20px",
        maxWidth: "600px",
        width: "90%",
        borderRadius: "10px",
        maxHeight: "80%",
        overflowY: "auto",
        position: "relative"
    });

    const modalClose = document.createElement("span");
    modalClose.innerHTML = "&times;";
    Object.assign(modalClose.style, {
        position: "absolute",
        right: "15px",
        top: "10px",
        fontSize: "28px",
        cursor: "pointer"
    });

    const modalBody = document.createElement("div");
    modalContent.appendChild(modalClose);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Modal close events
    modalClose.addEventListener("click", () => modal.style.display = "none");
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

    // Loop over series entries
    for (const entry of Object.values(entryMap)) {
        // Series title
        const header = document.createElement("h2");
        header.textContent = entry.title;
        pageWrapper.appendChild(header);

        // Create gallery for this series
        const gallery = document.createElement("div");
        Object.assign(gallery.style, {
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            padding: "10px",
            marginBottom: "20px"
        });
        pageWrapper.appendChild(gallery);

        // Loop over volumes
        for (const [volNum, volData] of Object.entries(entry.volumes)) {
            const wrapper = document.createElement("div");
            wrapper.style.textAlign = "center";

            const img = document.createElement("img");
            const footer = document.createElement("div");
            footer.classList.add("page2-modal-footer")
            footer.textContent = `Volume ${volNum}`;

            footer.setAttribute("data-path.title", entry.title);
            footer.setAttribute("data-path.vol", volNum);
            volData.owned === true
                ? footer.classList.add("volume-owned")
                : footer.classList.add("volume-not-owned");

            Object.assign(img.style, {
                cursor: "pointer",
                width: "120px",
                height: "auto",
                borderRadius: "5px",
                transition: "transform 0.2s"
            });

            img.src = volData.img;
            img.alt = `Volume ${volNum} cover`;

            // Hover effect
            img.addEventListener("mouseenter", () => img.style.transform = "scale(1.05)");
            img.addEventListener("mouseleave", () => img.style.transform = "scale(1)");

            // Click opens modal
            img.addEventListener("click", () => {
                modalBody.innerHTML = `
                    <h2>Volume ${volNum}: ${entry.title}</h2>
                    <img src="${volData.img}" alt="Volume ${volNum} cover" style="width:150px; display:block; margin-bottom:10px;">
                    <p><strong>Author:</strong> ${entry.author}</p>
                    <p><strong>Released:</strong> ${volData.date_released}</p>
                    <p><strong>Price:</strong> ${volData.prise}</p>
                    <p><strong>Total Sold:</strong> ${volData.total_sold}</p>
                    <p><strong>Chapters:</strong></p>
                    <ul>
                        ${Object.entries(volData.chapters)
                        .map(([chapNum, titles]) => `<li>Chapter ${chapNum}: ${titles[0]} / ${titles[1]}</li>`)
                        .join("")}
                    </ul>
                `;
                modal.style.display = "flex";
            });

            wrapper.appendChild(img);
            wrapper.appendChild(footer);
            gallery.appendChild(wrapper);
        }
    }

    const footers = document.querySelectorAll(".page2-modal-footer");
    for (const footer of footers) {
        footer.addEventListener("click", () => {
            const title = footer.dataset["path.title"];
            const volume = footer.dataset["path.vol"];
            const entry = entryMap[title].volumes[volume];
            console.log(entry, title, volume);
            let bool = entry.owned
            if (bool === true) {
                entry.owned = false;
                footer.classList.add("volume-not-owned");
                footer.classList.remove("volume-owned");
            }
            else if (bool === false) {
                entry.owned = true;
                footer.classList.add("volume-owned");
                footer.classList.remove("volume-not-owned");
            }
        });
    }
}


