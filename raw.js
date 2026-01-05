function raw() {
    const result = [];
    const chapters = [];
    result.push({
        volume: obj[0].tome.id,
        chapters
    });
    for (const chapter of obj) {
        chapters.push({
            chapter: chapter.id,
            title: chapter.title,
            desc: chapter.description
        });
    }
    return result;
}
raw();
//https://api.api-onepiece.com/v2/chapters/en/tome/1