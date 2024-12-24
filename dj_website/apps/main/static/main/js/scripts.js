// Hide Navbar on scroll events
// ====================================
const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        navbar.style.transform = "translateY(-100%)";
    } else {
        // Scrolling up - show navbar
        navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
});


// Animate menu
// ====================================
const menuOpenBtn = document.querySelector('.header__menu');
const menuCloseBtn = document.querySelector('.menu__close');
const menuBackground = document.querySelector('header');
const menuAvatar = document.querySelector('.menu__avatar');
const menuNavigationItems = document.querySelectorAll('.menu__navigation li');
const menuDecor = document.querySelector('.menu__decor');

// Define the timeline globally
const tlMenu = gsap.timeline({paused: true});

// Configure the animation
tlMenu.to(menuBackground, {
    duration: 2,
    height: '100vh',
    ease: 'power2.inOut',
}).to(menuAvatar, {
    duration: 1,
    clipPath: 'inset(0 0 0% 0)',
    ease: 'power2.inOut',
}, '-=1').to(menuNavigationItems, {
    duration: 1.2,
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    ease: 'power2.out',
    stagger: 0.1,
}, '-=1.2').to(menuDecor, {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: 'power2.inOut'
}, '-=1');

// Open menu on click
menuOpenBtn.addEventListener('click', function () {
    // Play the timeline
    tlMenu.play();
});

// Close menu on click
menuCloseBtn.addEventListener('click', function () {
    // tlMenu.progress(1); // Jump to the end of the opening animation if it's not finished
    // tlMenu.timeScale(2).reverse(); // Faster reverse
    tlMenu.reverse();

});


// Make Menu background move with mouse
// ====================================
// Default gradient center
let targetX = 50;
let targetY = 50;
let currentX = 50;
let currentY = 50;

function animate() {
    // Move the current position toward the target
    currentX += (targetX - currentX) * 0.07;
    currentY += (targetY - currentY) * 0.07;
    const menuBg = document.querySelector(".menu");
    menuBg.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, #f23038, #f8225e, #ab73e4, #8a82ee)`;
    // Keep animating
    requestAnimationFrame(animate);
}

document.addEventListener("mousemove", (e) => {
    // Update target position on mouse move
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
});

// Start the animation
animate();


// Live stream card animation
// ====================================
const liveStreamCards = document.querySelectorAll(".live-stream__card");

liveStreamCards.forEach((card) => {
    const cardText = card.querySelector(".card-left");
    const cardImage = card.querySelector(".live-stream__image");

    const tlLiveStreamCard = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false,
        },
    });

    // Reveal the card
    tlLiveStreamCard.fromTo(
        card,
        {
            clipPath: "inset(0 0 100% 0)",
        },
        {
            clipPath: "inset(0 0 0% 0)",
            duration: 2,
            ease: "power2.out",
        }
    );

    // Reveal text
    tlLiveStreamCard.fromTo(
        cardText,
        {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
        },
        {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
        },
        "<0.3"
    );

    // Reveal image
    tlLiveStreamCard.fromTo(
        cardImage,
        {
            clipPath: "inset(0 0 100% 0)", // Start fully hidden
            opacity: 0,
        },
        {
            clipPath: "inset(0 0 0% 0)", // Reveal image
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        },
        "<0.3" // Slight overlap with the text animation
    );
});

