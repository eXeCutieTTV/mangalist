import { Mangadex } from "mangadex-full-api";

const client = new Mangadex();

// search for One Piece
const mangaResults = await client.manga.search({ title: "One Piece", limit: 5 });
const onePiece = mangaResults[0]; // pick the main Japanese one

// fetch chapters (JP)
const chapters = await onePiece.getChapters({ translatedLanguage: ["ja"] });

// chapters is an array of chapter objects with:
// chapter.chapterNumber, chapter.title, chapter.volume, etc.
