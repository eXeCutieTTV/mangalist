const carousel = document.getElementById('carousel');

// 1. Duplicate cards for infinite loop
let cards = [...carousel.children];
cards.forEach(card => carousel.appendChild(card.cloneNode(true)));

// Update list after cloning
cards = [...carousel.children];

let userInteracted = false;
let autoScrollTimer = null;

// -----------------------------
// Infinite Loop Logic
// -----------------------------
carousel.addEventListener('scroll', () => {
    const maxScroll = carousel.scrollWidth / 2;

    if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft -= maxScroll;
    }

    updateCenterCard();
    resetAutoScrollTimer();
});

// -----------------------------
// Detect Center Card
// -----------------------------
function updateCenterCard() {
    const carouselRect = carousel.getBoundingClientRect();
    const centerX = carouselRect.left + carouselRect.width / 2;

    let closest = null;
    let closestDist = Infinity;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);

        if (dist < closestDist) {
            closestDist = dist;
            closest = card;
        }
    });

    cards.forEach(card => card.classList.remove('center'));
    if (closest) closest.classList.add('center');
}

updateCenterCard();

// -----------------------------
// Keyboard Arrow Keys
// -----------------------------
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        userInteracted = true;
        carousel.scrollLeft -= 220; // card width + gap
    }
    if (e.key === 'ArrowRight') {
        userInteracted = true;
        carousel.scrollLeft += 220;
    }
});

// -----------------------------
// Auto Scroll (after 5 seconds)
// -----------------------------
function startAutoScroll() {
    autoScrollTimer = setInterval(() => {
        if (!userInteracted) {
            carousel.scrollLeft += 0.5; // very slow
        }
    }, 16); // ~60fps
}

function resetAutoScrollTimer() {
    userInteracted = true;
    clearInterval(autoScrollTimer);

    setTimeout(() => {
        userInteracted = false;
    }, 5000);

    startAutoScroll();
}

// Start auto-scroll initially
startAutoScroll();
