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

function waitForElement(id) {
    return new Promise((resolve) => {
        // Check if element already exists
        const el = document.getElementById(id);
        if (el) {
            resolve(el);
            return;
        }

        // Create a MutationObserver to watch for DOM changes
        const observer = new MutationObserver(() => {
            const el = document.getElementById(id);
            if (el) {
                resolve(el);
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
}
//usage // waitForElement(id).then(()=>{console.log('hello world')});


async function saveEntryMap() {
    const filename = "entryMap.js";
    const content = "const entryMap = " + JSON.stringify(entryMap, null, 4) + ";";

    // This triggers the workflow on GitHub
    const response = await fetch("https://api.github.com/repos/eXeCutieTTV/mangalist/actions/workflows/create-js-file.yml/dispatches", {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json",
            // Using the GitHub Actions token is automatic if using workflow_dispatch from GitHub web UI
            // If private repo, call this through a serverless function that uses GITHUB_TOKEN
        },
        body: JSON.stringify({
            ref: "main",   // branch name
            inputs: { filename, content }
        })
    });

    if (response.ok) {
        alert("Workflow triggered! Check your repo for the new file.");
    } else {
        const text = await response.text();
        alert("Error triggering workflow: " + text);
    }
}
