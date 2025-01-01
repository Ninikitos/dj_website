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


// Animate the live stream title, subtitle, and text
// ====================================
const liveStreamTitle = document.querySelector(".live-stream__title");
const liveStreamSubtitle = document.querySelector(".live-stream__subtitle");
const liveStreamText = document.querySelector(".live-stream__text");

// Create a timeline for the text elements
const tlLiveStreamText = gsap.timeline({
    scrollTrigger: {
        // Trigger the animation when the title enters the viewport
        trigger: liveStreamTitle,
        start: "top 90%",
        toggleActions: "play none none none",
        markers: false,
    },
});

// Animate the title
tlLiveStreamText.fromTo(
    liveStreamTitle,
    {
        y: 10,
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)'
    },
    {
        y: 0,
        opacity: 1,
        duration: 1.5,
        clipPath: 'inset(0% 0 0 0)',
        ease: "power2.out",
    }
);

// Animate the subtitle
tlLiveStreamText.fromTo(
    liveStreamSubtitle,
    {
        y: 10,
        opacity: 0,
    },
    {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
    },
    "<0.2"
);

// Animate the text
tlLiveStreamText.fromTo(
    liveStreamText,
    {
        y: 10,
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)'
    },
    {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.8,
        ease: "power2.out",
    },
    "<0.2"
);


// Live stream card animation
// ====================================
const liveStreamCards = document.querySelectorAll(".live-stream__card-wrapper");
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
            clipPath: "inset(0 0 100% 0)",
            opacity: 0,
        },
        {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        },
        "<0.3"
    );
});


// Text Slider
// ====================================
const row = document.querySelector(".slider-row");
const texttl = gsap.timeline(); // Start paused

if (row) {
    const row_width = row.getBoundingClientRect().width;
    const row_item_width = row.children[0].getBoundingClientRect().width;
    const initial_offset = ((2 * row_item_width) / row_width) * 100 * -1;

    texttl.set(row, {
        xPercent: initial_offset
    });

    texttl.to(row, {
        ease: "none",
        duration: 10,
        xPercent: 0,
        repeat: -1
    });

    let smoothedVelocity = 0;
    const velocitySmoothingFactor = 0.1;

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: self => {
            const rawVelocity = self.getVelocity() / 200;

            const scaledVelocity = Math.min(
                Math.max(Math.abs(smoothedVelocity += (rawVelocity - smoothedVelocity) * velocitySmoothingFactor), 0.1),
                1.4
            );

            const timeScale = rawVelocity < 0 ? -scaledVelocity : scaledVelocity;

            if (Math.abs(timeScale) > 0.1) {
                texttl.timeScale(timeScale);
            }
        }
    });

    texttl.play();
}


// Image Slider
// ====================================
// Create matchMedia instance
let mm = gsap.matchMedia();
const imageSlides = document.querySelector('.image-reveal');
// const containerHeight = imageSlides.offsetHeight;
// const scrollMultiplier = 2.5;

// Desktop
mm.add("(min-width: 768px)", () => {
    const imageSliderTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".image-reveal",
            start: "top",
            end: "+=1000",
            scrub: 1.5,
            pin: true
        },
    });

    // Desktop animation sequence
    imageSliderTl
        .to('#image-reveal_1', {
            rotate: "3deg",
            width: '100%',
            duration: 1,
            ease: "power2.inOut",
        })
        .to("#image-reveal_2", {
            rotate: '-4deg',
            width: "80%",
            duration: 3,
            ease: "power2.inOut",
        })
        .to("#image-reveal_3", {
            width: "60%",
            duration: 3,
            ease: "power2.inOut",
        });
});

// Mobile
mm.add("(max-width: 767.98px)", () => {
    gsap.to('.image-reveal__slide', {
        yPercent: -300,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.image-reveal',
            start: 'top center',
            end: `top+=1500`,
            scrub: 1.2,
            pin: true,
            ease: 'power2.inOut',
            pinSpacing: false,
            markers: true
        }
    })
});

