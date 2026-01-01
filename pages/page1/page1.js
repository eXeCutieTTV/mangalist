const carousel = document.getElementById("carousel");
let cards = [...carousel.children];
let index = 0; // can be fractional
const spacing = 220;

function render() {
    const count = cards.length;

    cards.forEach((card, i) => {
        // fractional offset
        let dist = i - index;

        // wrap around
        if (dist > count / 2) dist -= count;
        if (dist < -count / 2) dist += count;

        const x = dist * spacing;
        const scale = 1 - Math.abs(dist) * 0.15;
        const z = dist === 0 ? 50 : 0;
        const opacity = Math.abs(dist) > 2 ? 0 : 1;

        card.style.transform = `
            translateX(${x}px)
            translateZ(${z}px)
            scale(${scale})
        `;
        card.style.opacity = opacity;

        card.classList.toggle("center", Math.abs(dist) < 0.1);
    });
}

function next() {
    index = (index + 1) % cards.length;
    render();
}

function prev() {
    index = (index - 1 + cards.length) % cards.length;
    render();
}

// Arrow keys
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    stopAuto();
});

// Auto-scroll
let autoRotate = true;

function autoScroll() {
    if (autoRotate) {
        index = (index + 0.001) % cards.length; // slow drift
        render();
    }
    requestAnimationFrame(autoScroll);
}

function stopAuto() {
    autoRotate = false;
    setTimeout(() => autoRotate = true, 5000);
}

render();
autoScroll();
