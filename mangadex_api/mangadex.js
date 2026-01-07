import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Folder to save JSON into
const folder = "./mangadex_api/mangadex_data";
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
}

// Hardcoded MangaDex entries
const mangaEntries = [
    {
        id: "239d6260-d71f-43b0-afff-074e3619e3de", // Bleach main series
        title: "Bleach"
    },
    {
        id: "some-other-uuid", // Example: another manga
        title: "Another Manga"
    }
];

for (const entry of mangaEntries) {
    const mangaId = entry.id;
    const mangaTitle = entry.title;

    // File path
    const filePath = path.join(folder, `manga_${mangaId}.json`);

    (async () => {
        try {
            console.log(`Fetching manga: ${mangaTitle} (${mangaId})`);

            // 1️⃣ Fetch manga metadata
            const mangaRes = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
            if (!mangaRes.ok) throw new Error(`HTTP error ${mangaRes.status} fetching manga metadata`);
            const mangaData = await mangaRes.json();
            const manga = mangaData.data;

            // 2️⃣ Fetch chapters (paginated)
            let chapters = [];
            let offset = 0;
            const limit = 100;
            let total = 0;

            do {
                const chapterRes = await fetch(
                    `https://api.mangadex.org/chapter?manga=${mangaId}&limit=${limit}&offset=${offset}&translatedLanguage[]=en&order[chapter]=asc`
                );
                if (!chapterRes.ok) throw new Error(`HTTP error ${chapterRes.status} fetching chapters`);

                const chapterData = await chapterRes.json();
                total = chapterData.total;
                chapters.push(...chapterData.data);
                offset += limit;

                console.log(`Fetched ${chapters.length} / ${total} chapters...`);
            } while (chapters.length < total);

            // 3️⃣ Group chapters by volume
            let chaptersByVolume = {};
            for (const ch of chapters) {
                const vol = ch.attributes.volume ?? "Unknown";
                if (!chaptersByVolume[vol]) chaptersByVolume[vol] = [];
                chaptersByVolume[vol].push({
                    id: ch.id,
                    title: ch.attributes.title,
                    chapter: ch.attributes.chapter,
                    publishAt: ch.attributes.publishAt,
                    pages: ch.attributes.pages,
                    translatedLanguage: ch.attributes.translatedLanguage
                });
            }

            // Sort chapters inside each volume
            for (const vol in chaptersByVolume) {
                chaptersByVolume[vol].sort((a, b) => {
                    const c1 = parseFloat(a.chapter) || 0;
                    const c2 = parseFloat(b.chapter) || 0;
                    return c1 - c2;
                });
            }

            // 4️⃣ Combine manga info + grouped chapters
            const output = {
                manga: manga,
                chaptersByVolume: chaptersByVolume
            };

            // Write to file
            fs.writeFileSync(filePath, JSON.stringify(output, null, 2), "utf-8");
            console.log(`Saved manga + chapters to ${filePath}`);
        } catch (err) {
            console.error(`Error fetching manga ${mangaTitle}:`, err);
        }
    })();
}
