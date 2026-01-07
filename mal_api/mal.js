import "dotenv/config";
import fs from "fs";
import path from "path";

// Folder you want to save into
const folder = "./mal_api/mal_data";
// Ensure the folder exists
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
}

// The file path
const filePath = path.join(folder, "anime.json");

// MyAnimeList API URL
const url =
    "https://api.myanimelist.net/v2/anime/10357?fields=rank,mean,alternative_titles";

try {
    const res = await fetch(url, {
        headers: {
            "X-MAL-CLIENT-ID": "c7881da4edf20e0485a13bcd1119be61"
        },
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const data = await res.json();

    // Write JSON to the folder
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    console.log(`Saved JSON to ${filePath}`);
} catch (err) {
    console.error(err);
}
