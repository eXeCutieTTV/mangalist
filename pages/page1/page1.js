const viewport = document.getElementById('viewport');


// Greek letters as id for each card
const cardData = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
const cards = [];
const cardDataMap = [{
    title: "ONEPIECE",
    img: "https://upload.wikimedia.org/wikipedia/en/a/a3/One_Piece%2C_Volume_1.jpg"
}]

const cardWidth = 160;
const cardHeight = 260;
const overlap = 40;
const speed = .1;


// Initialize cards with logical positions and index
cardData.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-wrap">
            <div class="card-top">
                ${cardDataMap[0].title}
            </div>
            <div class="card-bottom">
                <img src="${cardDataMap[0].img}" alt="">
            </div>
        </div>
    `;
    viewport.appendChild(card);
    cards.push({ el: card, x: i * (cardWidth - overlap), index: i });
});


function animate() {
    const vpRect = viewport.getBoundingClientRect();
    const vpCenter = vpRect.width / 2;


    // Step 1: Find the center card (closest to viewport center)
    let centerCard = null;
    let minDist = Infinity;


    cards.forEach(c => {
        const r = c.el.getBoundingClientRect();
        const cardCenter = r.left + overlap;
        const dist = Math.abs(cardCenter - vpCenter);
        if (dist < minDist) {
            minDist = dist;
            centerCard = c;
        }
    });


    // Step 2: Update each card
    cards.forEach(c => {
        // Move left
        c.x -= speed;


        // Recycle if fully off-screen left
        if (c.x + cardWidth < -700) {
            const rightMostX = Math.max(...cards.map(cc => cc.x));
            c.x = rightMostX + cardWidth - overlap;
        }


        // Compute distance from center in card units
        const distanceFromCenter = c.index - centerCard.index; // negative=left, 0=center, positive=right
        const z = Math.max(1, 100 - Math.abs(distanceFromCenter)); // highest z at center
        c.el.style.zIndex = z;


        // Compute angle and vertical offset
        const cardCenter = c.x + cardWidth;
        const distToVpCenter = cardCenter - vpCenter;
        const maxAngle = 14;
        const norm = Math.max(-1, Math.min(1, distToVpCenter / vpCenter));
        const angle = norm * maxAngle;
        const y = 18;

        const realY = y + Math.abs(distanceFromCenter) * 10;

        // Transform
        if (distanceFromCenter === 0) {
            c.el.classList.add("center");
            c.el.style.transform = `translateX(${c.x}px) translateY(0px) rotate(0deg)`;
        } else if (distanceFromCenter < 0) {
            if (c.el.classList.value === "card center") c.el.classList.remove("center");
            c.el.style.transform = `translateX(${c.x}px) translateY(${realY}px) rotate(${angle}deg)`;
        } else if (distanceFromCenter > 0) {
            if (c.el.classList.value === "card center") c.el.classList.remove("center");
            c.el.style.transform = `translateX(${c.x}px) translateY(${realY}px) rotate(${-angle}deg)`;
        }
    });
    requestAnimationFrame(animate);
}
animate();

const middleDiv = document.getElementById("page1-middle-wrap");

middleDiv.addEventListener("click", () => {
    openPage("page2", "pages/page2/page2.html");
    waitForElement({ el: "page2-wrapper" }).then(() => {
        page2();
    });
});
// doesnt tilt when it exits being the center card
// i think its because it has negative rotate value, both on left and right sides - should have positive on right side, and negative on left side.

// fix the the wheel connection
// fix z-index for card while its being cycled - so it isnt visible behind the other cards