const { MangadexClient } = import("mangadex-full-api");

(async () => {
    // create a client
    const client = new MangadexClient();

    // search for One Piece
    const mangaResults = await client.manga.search({ title: "One Piece", limit: 5 });
    const onePiece = mangaResults[0]; // pick the main Japanese one

    // fetch chapters (JP)
    const chapters = await onePiece.getChapters({ translatedLanguage: ["ja"] });

    console.log(chapters);
})();