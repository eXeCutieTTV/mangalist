function transformChapters(obj) {
    if (!Array.isArray(obj) || obj.length === 0) return null;

    return {
        [obj[0].tome.id]: {
            chapters: obj.reduce((acc, ch) => {
                acc[ch.id] = [ch.title, ""];
                return acc;
            }, {})
        }
    };
}

async function fetchTome(tomeNumber) {
    const url = `https://api.api-onepiece.com/v2/chapters/en/tome/${tomeNumber}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const json = await res.json();
    return transformChapters(json);
}

async function fetchAllTomes() {
    const result = {};          // ← OBJECT, not array

    for (let i = 1; i <= 114; i++) {
        const tome = await fetchTome(i);
        if (tome) {
            Object.assign(result, tome); // ← merge
        }
    }

    return result;
}
fetchAllTomes().then(el => console.log(el));