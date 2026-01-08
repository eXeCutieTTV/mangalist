function bleach(id) {
    const wrapper = document.getElementsByClassName('mw-content-ltr')[0];
    const tbl = wrapper.querySelectorAll('table');
    const trs = tbl[Math.floor(id / 10)].querySelectorAll('tr');
    //for(let i=0;i<74;i++) console.log(Math.floor(i/10));
    //console.log(trs);
}
for (let i = 0; i < 74; i++) bleach(i);
