const viewport = document.getElementById('viewport');

// Example: Greek letters for each card
const cardData = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'α'];
const cards = [];

const cardWidth = 160;
const cardHeight = 260;
const overlap = 40;
const speed = 1;

// Initialize cards with absolute x-positions
cardData.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = text; // <-- edit the text here
    viewport.appendChild(card);
    cards.push({ el: card, x: i * (cardWidth - overlap) });
});

function animate() {
    const vpRect = viewport.getBoundingClientRect();
    const vpCenter = vpRect.width / 2;

    cards.forEach((cardObj) => {
        // Move left
        cardObj.x -= speed;

        //console.log('hi1', cardObj, findPos(cardObj.el), cardObj.el.offsetLeft)
        // recycle if fully off-screen left
        if (cardObj.x < -700) {
            const rightMostX = Math.max(...cards.map(c => c.x));
            cardObj.x = rightMostX + cardWidth - overlap;
        }

        // compute center distance for angle
        const cardCenter = cardObj.el.getBoundingClientRect().left + overlap;
        const dist = cardCenter - vpCenter;
        const maxAngle = 14;
        const norm = Math.max(-1, Math.min(1, dist / vpCenter));

        const angle = norm * maxAngle;
        const y = 18; // vertical offset for angled cards

        // Center card detection
        if (Math.abs(dist) < cardWidth / 2) {
            cardObj.el.style.transform = `translateX(${cardObj.x}px) translateY(0px) rotate(0deg)`;
            cardObj.el.style.zIndex = 10;
        } else {
            cardObj.el.style.transform = `translateX(${cardObj.x}px) translateY(${y}px) rotate(${angle}deg)`;
            cardObj.el.style.zIndex = 1;
        }
    });

    requestAnimationFrame(animate);
}

animate();