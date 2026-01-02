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

