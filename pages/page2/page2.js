//const { merge } = require("cheerio");

function newTKN() { localStorage.mangalist_token = prompt("New pat_token") }
async function page2() {
    const pageWrapper = document.getElementById("gallery-wrapper");

    const newFetch = await fetch("raw_data.json");
    const newEntry = await newFetch.json();

    //vv file manipulation
    const folder = "generated"; // folder inside repo
    const repoOwner = "eXeCutieTTV";
    const repoName = "mangalist";
    const token = (localStorage.getItem("mangalist_token") || "").trim();
    // Update this fallback file manually when you want to pin a newer preset.
    const fallbackOwnMapPath = ["generated/generated_1770730523604.json", new Date(1770730523604)];

    function buildDefaultOwnMap(entryMap) {
        const defaults = {};
        for (const entry of Object.values(entryMap)) {
            defaults[entry.title] = {};
            for (const volNum of Object.keys(entry.volumes)) {
                defaults[entry.title][volNum] = false;
            }
        }
        return defaults;
    }

    function mergeOwnMap(entryMap, sourceMap) {
        const merged = buildDefaultOwnMap(entryMap);
        if (!sourceMap || typeof sourceMap !== "object") return merged;

        for (const [title, volumes] of Object.entries(sourceMap)) {
            if (!merged[title] || typeof volumes !== "object") continue;
            for (const [volNum, owned] of Object.entries(volumes)) {
                if (volNum in merged[title]) merged[title][volNum] = owned === true;
            }
        }
        return merged;
    }

    async function updateJSON() {
        if (!token) {
            alert("No PAT found in localStorage, so updates are disabled.");
            return;
        }
        const timestamp = Date.now();
        const filename = `generated_${timestamp}.json`;

        function toBase64(str) {
            const utf8 = new TextEncoder().encode(str);
            let binary = "";
            utf8.forEach(byte => binary += String.fromCharCode(byte));
            return btoa(binary);
        }

        const content = JSON.stringify(own_bool_map, null, 2);

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
    async function getNewestFile() {
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folder}`;

        const response = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API list failed: ${response.status}`);
        }

        const files = await response.json();

        if (!Array.isArray(files)) {
            throw new Error("GitHub API list did not return an array.");
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

        if (!fileResponse.ok) {
            throw new Error(`GitHub file fetch failed: ${fileResponse.status}`);
        }

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

    async function getFallbackOwnMap() {
        const fallbackResponse = await fetch(fallbackOwnMapPath[0]);
        if (!fallbackResponse.ok) {
            throw new Error(`Fallback JSON fetch failed: ${fallbackResponse.status}`);
        }
        const fallbackJson = await fallbackResponse.json();
        return { name: fallbackOwnMapPath[0], data: fallbackJson };
    }

    async function loadOwnMap() {
        if (!token) {
            alert("No PAT token found in localStorage. Using preset JSON; data may be out of date. Current file from: \n" + fallbackOwnMapPath[1]);
            return getFallbackOwnMap();
        }

        try {
            return await getNewestFile();
        } catch (error) {
            console.warn("Falling back to preset JSON:", error);
            alert("GitHub API load failed. Using preset JSON; data may be out of date.");
            return getFallbackOwnMap();
        }
    }

    let loadedOwnMap;
    try {
        loadedOwnMap = await loadOwnMap();
    } catch (error) {
        console.warn("Fallback failed, using default all-false map:", error);
        alert("Could not load preset JSON. Falling back to default ownership map.");
        loadedOwnMap = { name: "default-generated", data: {} };
    }

    const own_bool_map = mergeOwnMap(newEntry, loadedOwnMap.data);
    const fileName = loadedOwnMap.name;
    console.log(`JSON parsed from file: \n${fileName}`, own_bool_map);
    console.log(`JSON from: \n${new Date(Number(fileName.replace("generated_", "").replace(".json", "").trim()))}`);
    console.log(`JSON parsed from static file:`, newEntry);

    const entryMap = newEntry;
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
        //wrapper for each series
        const seriesWrapper = document.createElement("div");
        Object.assign(seriesWrapper.style, {
            marginBottom: "30px",
        });
        seriesWrapper.classList.add("page2-series-wrapper");
        seriesWrapper.setAttribute("data-title", entry.title);
        seriesWrapper.setAttribute("data-author", entry.author);
        seriesWrapper.setAttribute("data-volumes", Object.keys(entry.volumes).length);
        pageWrapper.appendChild(seriesWrapper);

        // Series title
        const headerWrap = document.createElement("div");
        headerWrap.classList.add("page2-series-header-wrap");
        seriesWrapper.appendChild(headerWrap);

        const header = document.createElement("h2");
        header.textContent = `${entry.title} - ${entry.author}`; //<-- title and author
        Object.assign(header.style, {
            display: "inline-block",
            cursor: "pointer",
            margin: "5px 0"
        });
        header.classList.add("page2-series-header");
        headerWrap.appendChild(header);

        const filterMenu = document.createElement("div");
        filterMenu.classList.add("page2-filter-menu");
        filterMenu.innerHTML = `
            <div class="page2-filter-menu-item" data-filter="all">Show all</div>
            <div class="page2-filter-menu-item" data-filter="unowned">Show unowned</div>
            <div class="page2-filter-menu-item" data-filter="owned">Show owned</div>
        `;
        headerWrap.appendChild(filterMenu);

        // Create gallery for this series
        const gallery = document.createElement("div");
        gallery.classList.add("page2-series-gallery");
        Object.assign(gallery.style, {
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            padding: "10px",
            marginBottom: "20px"
        });
        seriesWrapper.appendChild(gallery);

        // Loop over volumes
        for (const [volNum, volData] of Object.entries(entry.volumes)) {
            //console.log(volNum);
            const wrapper = document.createElement("div");
            wrapper.style.textAlign = "center";

            const img = document.createElement("img");
            const footer = document.createElement("div");
            footer.classList.add("page2-modal-footer")
            footer.textContent = volNum.toLowerCase().includes("one-shot")
                ? volNum
                : `Volume ${volNum}`;

            footer.setAttribute("data-path.title", entry.title);
            footer.setAttribute("data-path.vol", volNum);
            own_bool_map[entry.title][volNum] === true
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
                    ${volData.title[0] === volData.title[1]
                        ? volData.title[0] === undefined
                            ? ""
                            : `<h3 style="margin: 0; margin-bottom:15px;">${volData.title[0]}</h3>`
                        : `
                            <h3 style="margin: 0;">${volData.title[0]}</h3>
                            <h3 style="margin: 0; margin-bottom:15px;">${volData.title[1]}</h3>
                        `
                    }
                    <div style="display:flex;margin-bottom:15px;">
                        <div>
                            <img src="${volData.img}" alt="Volume ${volNum} cover" style="width:auto; height:300px; display:block; border-radius:5px;">
                        </div>
                        <div>
                            <ul style="margin: 0; overflow-y: auto; max-height: 300px; scrollbar-width: none;">
                        ${Object.entries(volData.chapters)
                        .map(([chapNum, titles]) => {
                            const [en, jp] = titles;
                            const titleText = en === jp
                                ? en
                                : `${en} / ${jp}`;
                            return `<li>Chapter ${chapNum}: ${titleText}</li>`;
                        })
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
            const entry = own_bool_map[title][volume];
            console.log(entry, title, volume);
            let bool = entry
            if (bool === true) {
                own_bool_map[title][volume] = false;
                footer.classList.add("volume-not-owned");
                footer.classList.remove("volume-owned");
            }
            else if (bool === false) {
                own_bool_map[title][volume] = true;
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
    //vv updateBtn to create file
    const updateBtn = document.getElementById("update_list-btn");
    updateBtn.addEventListener("click", () => {
        console.log("updated JSON", own_bool_map);
        updateJSON();
    });
    //^^
    //vv headers clickable to filter. hover to pick filter aswell.
    const series_wrappers = document.querySelectorAll(".page2-series-wrapper");
    for (const wrapper of series_wrappers) {
        let toggle_state = 0;

        const header = wrapper.querySelector(".page2-series-header");
        const headerWrap = wrapper.querySelector(".page2-series-header-wrap");
        const filterMenu = wrapper.querySelector(".page2-filter-menu");
        const gallery_div = wrapper.querySelector(".page2-series-gallery");
        if (!header || !headerWrap || !filterMenu || !gallery_div) continue;
        function display_unowned() {
            for (const entry of gallery_div.children) {
                if (entry.children[1].className.includes("volume-owned")) {
                    entry.hidden = !entry.hidden; // toggle visibility
                }
            }
        }
        function display_owned() {
            for (const entry of gallery_div.children) {
                if (entry.children[1].className.includes("volume-not-owned")) {
                    entry.hidden = !entry.hidden; // toggle visibility
                }
            }
        }
        function display_all() {
            for (const entry of gallery_div.children) {
                entry.hidden = false; // show all
            }
        }
        function set_filter(state) {
            display_all();
            if (state === 1) {
                display_unowned();
            } else if (state === 2) {
                display_owned();
            }
            toggle_state = state;
        }

        header.addEventListener("click", () => {
            if (toggle_state === 0) {
                set_filter(1);
            } else if (toggle_state === 1) {
                set_filter(2);
            } else if (toggle_state === 2) {
                set_filter(0);
            }
        });

        let hoverTimer = null;
        function open_menu() {
            filterMenu.classList.add("open");
        }
        function close_menu() {
            filterMenu.classList.remove("open");
        }

        headerWrap.addEventListener("mouseenter", () => {
            hoverTimer = setTimeout(open_menu, 1000);
        });
        headerWrap.addEventListener("mouseleave", () => {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
                hoverTimer = null;
            }
            close_menu();
        });

        filterMenu.addEventListener("click", (e) => {
            const item = e.target.closest(".page2-filter-menu-item");
            if (!item) return;
            e.stopPropagation();

            const filter = item.dataset.filter;
            if (filter === "all") {
                set_filter(0);
            } else if (filter === "unowned") {
                set_filter(1);
            } else if (filter === "owned") {
                set_filter(2);
            }
            close_menu();
        });
    }
    //^^
    //vv gallery filters

    //dropdown
    function bindHoverDropdown(triggerEl, menuEl, closeDelay = 120) {
        let closeTimer = null;

        function openMenu() {
            if (closeTimer) clearTimeout(closeTimer);
            menuEl.style.display = "block";
        }

        function scheduleClose() {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                menuEl.style.display = "none";
            }, closeDelay);
        }

        triggerEl.addEventListener("mouseenter", openMenu);
        triggerEl.addEventListener("mouseleave", scheduleClose);
        menuEl.addEventListener("mouseenter", openMenu);
        menuEl.addEventListener("mouseleave", scheduleClose);
    }

    const filter = document.getElementById("filter_galleries");
    const filterMenu = document.getElementById("filter_dropdown");
    bindHoverDropdown(filter, filterMenu);

    //ordering
    const filter_entries = document.getElementsByClassName("filter_entry");
    const filters_obj = {
        search: filter_entries[0].children[0],
        title: filter_entries[1],
        author: filter_entries[2],
        entries: filter_entries[3]
    }
    let asc_desc_state = [0, 1, 0];//to toggle between decending and ascending // 0 = asc, 1 = desc
    function filter_gallery(type) {
        const galleries = Array.from(pageWrapper.children);

        const sortable = galleries.map(gallery => ({
            el: gallery,
            title: gallery.dataset.title.toLowerCase(),
            author: gallery.dataset.author.toLowerCase(),
            entries: Number(gallery.dataset.volumes)
        }));
        switch (type) {
            case "title":
                if (asc_desc_state[0] === 0) {
                    sortable.sort((a, b) => a.title.localeCompare(b.title));
                    asc_desc_state[0] = 1;
                } else {
                    sortable.sort((a, b) => b.title.localeCompare(a.title));
                    asc_desc_state[0] = 0;
                }
                break;
            case "author":
                if (asc_desc_state[1] === 0) {
                    sortable.sort((a, b) => a.author.localeCompare(b.author));
                    asc_desc_state[1] = 1;
                } else {
                    sortable.sort((a, b) => b.author.localeCompare(a.author));
                    asc_desc_state[1] = 0;
                }
                break;
            case "entries":
                if (asc_desc_state[2] === 0) { // lowest → highest 
                    sortable.sort((a, b) => a.entries - b.entries);
                    asc_desc_state[2] = 1;
                } else { // highest → lowest 
                    sortable.sort((a, b) => b.entries - a.entries);
                    asc_desc_state[2] = 0;
                }
                break;
        }
        sortable.forEach(item => pageWrapper.appendChild(item.el));
    }

    filters_obj.title.addEventListener("click", () => {
        filter_gallery("title");
    });
    filters_obj.author.addEventListener("click", () => {
        filter_gallery("author");
    });
    filters_obj.entries.addEventListener("click", () => {
        filter_gallery("entries");
    });
    //input filter vv
    function display_only_when_including_input(input) {
        const galleries = pageWrapper.children;
        for (const gallery of galleries) {
            const header = gallery.querySelector("h2");
            if (!header.innerText.toLowerCase().includes(input)) gallery.style.display = "none";
            if (header.innerText.toLocaleLowerCase().includes(input)) gallery.style.display = "block";
        }
    }
    filters_obj.search.addEventListener("input", () => {
        display_only_when_including_input(filters_obj.search.value.toLowerCase());
    });
    //^^ gallery filters
    //vv "On using the site"
    const on_using_the_site_el = document.getElementsByClassName("topbar-entry")[2];
    const on_using_the_site_menu_el = on_using_the_site_el.querySelector("div");
    bindHoverDropdown(on_using_the_site_el, on_using_the_site_menu_el);
    //^^ "On using the site"
}
// ensure JSON is always formatted with [EN,JP] - not [JP,EN].
// fix hxh^^

//vv manual function to sort the static data by author
function sortByAuthor(data) {
    const arr = Object.entries(data).map(([key, value]) => ({
        key,
        author: value.author.toLowerCase(),
        value
    }));

    arr.sort((a, b) => a.author.localeCompare(b.author));

    const sorted = {};
    for (const item of arr) {
        sorted[item.key] = item.value;
    }

    return sorted;
}
