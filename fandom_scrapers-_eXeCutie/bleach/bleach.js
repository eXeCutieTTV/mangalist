function bleach(id) {
    const wrapper = document.getElementsByClassName('mw-content-ltr')[0];
    const volume_section = Math.floor(id / 10);
    const tbl = wrapper.querySelectorAll('table');
    const trs = tbl[volume_section].querySelectorAll('tr');
    //for(let i=0;i<74;i++) console.log(Math.floor(i/10));
    //console.log(trs);
    const volume1 = {
        header: trs[id * volume_section + 2],
        body: trs[id * volume_section + 3],
        desc: trs[id * volume_section + 4]
    }
    return volume1;
}
for (let i = 0; i < 74; i++) bleach(i); 
