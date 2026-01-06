// test.js
const { MangadexClient } = require("mangadex-full-api");

(async () => {
    const client = new MangadexClient();

    // 1. Search for One Piece manga
    const mangaResults = await client.manga.search({ title: "One Piece", limit: 5 });
    if (!mangaResults.length) {
        console.error("One Piece not found");
        return;
    }
    const onePiece = mangaResults[0]; // pick the main Japanese one

    // 2. Fetch ALL chapters
    const chaptersData = await onePiece.getChapters({ translatedLanguage: ["en", "ja"], limit: 500 });
    // MangaDex may paginate automatically; v6 fetches all pages internally if you set high limit

    // 3. Transform into volume → chapters → JP+EN object
    const result = {};

    for (const ch of chaptersData) {
        const volumeId = ch.volume ?? "0"; // some chapters may not have a volume
        if (!result[volumeId]) result[volumeId] = { chapters: {} };

        const chapterNum = ch.chapterNumber ?? ch.id; // fallback if chapter number missing
        result[volumeId].chapters[chapterNum] = {
            en: ch.title?.en ?? null,
            ja: ch.title?.ja ?? null,
        };
    }

    console.log(JSON.stringify(result, null, 2));
})();
//uB9wxVB2Jv71KMPaSE47t5B5MzL67b6a