function goToPage1() {
    const page0 = document.getElementById("page0");
    const page1 = document.getElementById("page1");

    // Start fade-out
    page0.classList.add("fade-out");

    // Start background fade (CSS handles the delay)
    document.documentElement.classList.add("red-bg");

    // After 0.6s (same as fade-out), switch active pages
    setTimeout(() => {
        page0.classList.remove("active");
        page1.classList.add("active");
    }, 601);
}

async function openPage(page, source) {
    const pDiv = document.getElementById(page);
    if (!pDiv) return;

    const response = await fetch(source);
    if (!response.ok) {
        throw new Error(`Failed to load ${source}: ${response.status}`);
    }

    const html = await response.text();
    pDiv.innerHTML = html;

    // fix which page has .active
    const pageList = document.querySelectorAll(".page");
    for (const page of pageList) {
        if (page.classList.value === "page active") {
            page.classList.remove("active");
        }
    }
    pDiv.classList.add("active");
}

function waitForElement({ el = null, obj = null }) {
    return new Promise((resolve) => {
        // If waiting for an object reference
        if (obj !== null) {
            if (obj) {
                resolve(obj);
                return;
            }

            const interval = setInterval(() => {
                if (obj) {
                    clearInterval(interval);
                    resolve(obj);
                }
            }, 50);

            return;
        }

        // If waiting for a DOM element by ID
        if (el !== null) {
            const existing = document.getElementById(el);
            if (existing) {
                resolve(existing);
                return;
            }

            const observer = new MutationObserver(() => {
                const found = document.getElementById(el);
                if (found) {
                    observer.disconnect();
                    resolve(found);
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }
    });
}



