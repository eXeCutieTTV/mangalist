//0indexed
const temp = [];
function bleach(id) {
    const wrapper = document.getElementsByClassName('mw-content-ltr')[0];
    const tables = wrapper.querySelectorAll('table');

    const tableIndex = Math.floor(id / 10);
    const rowIndex = 2 + (id % 10) * 3;

    const trs = tables[tableIndex].querySelectorAll('tr');

    const volume = {
        header: trs[rowIndex],
        body: trs[rowIndex + 1],
        desc: trs[rowIndex + 2]
    };

    temp.push(volume);
}
for (let i = 0; i < 74; i++) bleach(i);