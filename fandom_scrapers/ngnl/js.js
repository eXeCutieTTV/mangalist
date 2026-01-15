import fetch from "node-fetch"; // npm install node-fetch
import { writeFile } from "fs/promises";

const url = `https://no-game-no-life.fandom.com/wiki/Light_Novel_Volume_1`;

async function savePage() {
    const res = await fetch(url);
    const html = await res.text();

    await writeFile("page.html", html, "utf8");
    console.log("Saved to page.html");
}

savePage();
