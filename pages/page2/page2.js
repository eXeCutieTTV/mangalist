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

    async function updateJSON() {
        const timestamp = Date.now();
        const filename = `generated_${timestamp}.json`;

        function toBase64(str) {
            const utf8 = new TextEncoder().encode(str);
            let binary = "";
            utf8.forEach(byte => binary += String.fromCharCode(byte));
            return btoa(binary);
        }

        const sorted = Object.fromEntries(Object.entries(entryMap).sort(([a], [b]) => a.localeCompare(b))); //<-- sorts alphabetically
        const content = JSON.stringify(sorted, null, 2);

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
    }
    /*
    document.getElementById("makeFile").addEventListener("click", async () => {
        const timestamp = Date.now();
        const filename = `generated_${timestamp}.json`;

        function toBase64(str) {
            const utf8 = new TextEncoder().encode(str);
            let binary = "";
            utf8.forEach(byte => binary += String.fromCharCode(byte));
            return btoa(binary);
        }

        const sorted = Object.fromEntries(Object.entries(entryMap).sort(([a], [b]) => a.localeCompare(b))); //<-- sorts alphabetically
        const content = JSON.stringify(sorted, null, 2);

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
    */
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
    const { name: fileName, data: entryMap } = await getNewestFile();
    console.log(`JSON parsed from file: ${fileName}`, entryMap);
    //^^ file manipulation

    // dynamic modal creation vv
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
        backgroundColor: "rgb(203 178 178)",
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
        header.textContent = `${entry.title} - ${entry.author}`; //<-- title and author
        Object.assign(header.style, {
            display: "inline",
            cursor: "pointer",
        });
        header.classList.add("page2-series-header");
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
            //console.log(volNum);
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
                height: "189px",
                borderRadius: "5px",
                transition: "transform 0.2s"
            });
            img.loading = "lazy";
            img.dataset.src = volData.img;
            img.alt = `Volume ${volNum} cover`;

            // Hover effect
            img.addEventListener("mouseenter", () => img.style.transform = "scale(1.05)");
            img.addEventListener("mouseleave", () => img.style.transform = "scale(1)");

            // Click opens modal
            img.addEventListener("click", () => {
                modalBody.innerHTML = `
                    <h1 style="margin: 0;">${entry.title}</h1>
                    <h2 style="margin: 10px 0;">Volume ${volNum}</h2>
                    <h3 style="margin: 0;">${volData.title[0]}</h3>
                    <h3 style="margin: 0; margin-bottom:15px;">${volData.title[1]}</h3>
                    <div style="display:flex;margin-bottom:15px;">
                        <div>
                            <img src="${volData.img}" alt="Volume ${volNum} cover" style="width:auto; height:300px; display:block; border-radius:5px;">
                        </div>
                        <div>
                            <ul style="margin: 0;">
                                ${Object.entries(volData.chapters)
                        .map(([chapNum, titles]) => `<li>Chapter ${chapNum}: ${titles[0]} / ${titles[1]}</li>`)
                        .join("")}
                            </ul>
                        </div>
                    </div>
                    <p style="margin: 4px 0;"><strong>Released:</strong> ${volData.date_release[1]}</p>
                    <p style="margin: 4px 0;"><strong>Price:</strong> ${volData.prise}</p>
                    <p style="margin: 4px 0;"><strong>Pages:</strong> ${volData.pages[0]/*volData.owned ? "Yes" : "No"*/}</p>
                    <p style="margin: 4px 0;"><strong>ISBN:</strong> ${volData.ISBN[0]}</p>
                `;
                modal.style.display = "flex";
            });

            wrapper.appendChild(img);
            wrapper.appendChild(footer);
            gallery.appendChild(wrapper);
        }
    }
    //^^ dynamic modal creation
    // owned togglevv
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
    //^^
    //img loads when near viewport vv
    const observer = new IntersectionObserver(
        entries => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;

                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        },
        {
            rootMargin: "300px" // preload before visible
        }
    );

    document.querySelectorAll("img[data-src]").forEach(img => {
        observer.observe(img);
    });
    //^^
    //vv headers clickable to create file
    const header_btns = document.getElementsByClassName("page2-series-header");
    for (const btn of header_btns) {
        console.log(btn);
        btn.addEventListener("click", () => {
            console.log("clicked header");
            updateJSON();
        });
    }
    //^^
}
//maybe make the js-creater button the header divs, instead of a button.
//the divs whereon it says the title of the manga and the author^^
//when the div is clicked, it creates the file^^
//actually a <h2>, not a div - but whatever.

