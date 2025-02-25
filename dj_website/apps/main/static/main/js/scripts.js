import { disableScrolling, enableScrolling } from '../../../../../static/js/lenis-setup.js';

// Hide Navbar on scroll events
// ====================================
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
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

menuNavigationItems.forEach(link => {
    link.addEventListener('click', () => {
        tlMenu.reverse(); // Close the menu
    });
});

// Open menu on click
menuOpenBtn.addEventListener('click', function () {
    tlMenu.play();
});

// Close menu on click
menuCloseBtn.addEventListener('click', function () {
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
    const menuBg = document.querySelector('.menu');
    menuBg.style.background = `radial-gradient(circle at ${currentX}% ${currentY}%, #f23038, #f8225e, #ab73e4, #8a82ee)`;
    // Keep animating
    requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
    // Update target position on mouse move
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
});

// Start the animation
animate();


// Animate the live stream title, subtitle, and text
// ====================================
const liveStreamTitle = document.querySelector('.live-stream__title');
const liveStreamSubtitle = document.querySelector('.live-stream__subtitle');
const liveStreamText = document.querySelector('.live-stream__text');

// Create a timeline for the text elements
const tlLiveStreamText = gsap.timeline({
    scrollTrigger: {
        // Trigger the animation when the title enters the viewport
        trigger: liveStreamTitle,
        start: 'top 90%',
        toggleActions: 'play none none none'
    },
});

// Animate the title
tlLiveStreamText.fromTo(
    liveStreamTitle,
    {
        y: 10,
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)'
    },
    {
        y: 0,
        opacity: 1,
        duration: 1.5,
        clipPath: 'inset(0 0 0% 0)',
        ease: 'power2.out',
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
        duration: 1.5,
        ease: 'power2.out',
    },
    '<0.2'
);

// Animate the text
tlLiveStreamText.fromTo(
    liveStreamText,
    {
        y: 10,
        opacity: 0,
        clipPath: 'inset(100% 0 0 0)'
    },
    {
        y: 0,
        opacity: 1,
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.8,
        ease: 'power2.out',
    },
    '<0.2'
);


// Live stream card animation
// ====================================
const liveStreamCards = document.querySelectorAll('.live-stream__card-wrapper');
liveStreamCards.forEach((card) => {
    const cardText = card.querySelector('.card-left');
    const cardImage = card.querySelector('.live-stream__image');

    const tlLiveStreamCard = gsap.timeline({
        scrollTrigger: {
            trigger: card,
            start: 'clamp(top 80%)',
            toggleActions: 'play none none none'
        },
    });

    // Reveal the card
    tlLiveStreamCard.fromTo(
        card,
        {
            clipPath: 'inset(0 0 100% 0)',
        },
        {
            clipPath: 'inset(0 0 0% 0)',
            duration: 2,
            ease: 'power2.out',
        }
    );

    // Reveal text
    tlLiveStreamCard.fromTo(
        cardText,
        {
            clipPath: 'inset(100% 0 0 0)',
            opacity: 0,
        },
        {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
        },
        '<0.3'
    );

    // Reveal image
    tlLiveStreamCard.fromTo(
        cardImage,
        {
            clipPath: 'inset(0 0 100% 0)',
            opacity: 0,
        },
        {
            clipPath: 'inset(0 0 0% 0)',
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
        },
        '<0.3'
    );
});


// Text Slider
// ====================================
let loops = gsap.utils.toArray('.slider-row').map((line, i) => {
    const links = line.querySelectorAll('.slider-item');
    return horizontalLoop(links, {
        repeat: -1,
        speed: 1 + i * 0.5,
        reversed: false,
        paddingRight: parseFloat(gsap.getProperty(links[0], 'marginRight', 'px'))
    });
});

let currentScroll = 0;
let scrollDirection = 1;

window.addEventListener('scroll', () => {
    let direction = (window.scrollY > currentScroll) ? 1 : -1;

    if (direction !== scrollDirection) {
        // Add acceleration effect on direction change
        loops.forEach(tl => {
            gsap.to(tl, {
                timeScale: direction * 3,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true,
                onComplete: () => {
                    gsap.to(tl, {
                        timeScale: direction,
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                }
            });
        });
        const shadowDirection = direction === 1
            ? '5px -5px 0 var(--main-secondary)' // Scrolling down
            : '-5px 5px 0 var(--main-secondary)'; // Scrolling up

        document.querySelectorAll('.slider-item').forEach(item => {
            item.style.textShadow = shadowDirection;
        });
        scrollDirection = direction;
    }
    currentScroll = window.scrollY;
});

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: {ease: 'none'},
            onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert 'x' to 'xPercent' to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px'));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, 'x', 'px')) / w * 100 + gsap.getProperty(el, 'xPercent'));
            return xPercents[i];
        }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], 'scaleX') + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX');
        tl.to(item, {
            xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
            duration: distanceToLoop / pixelsPerSecond
        }, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false
            }, distanceToLoop / pixelsPerSecond)
            .add('label' + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index, vars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }

    tl.next = vars => toIndex(curIndex + 1, vars);
    tl.previous = vars => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    return tl;
}


// Image Slider
// ====================================
// Create matchMedia instance
window.addEventListener('load', () => {
    const imageSliderMM = gsap.matchMedia();

    // Desktop
    imageSliderMM.add('(min-width: 768px)', () => {
        const imageSliderTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.image-reveal',
                start: 'clamp(top)',
                end: '+=1000',
                scrub: 1.5,
                pin: true,
                invalidateOnRefresh: true
            },
        });

        imageSliderTl
            .to('#image-reveal_1', {
                rotate: '3deg',
                width: '100%',
                duration: 1,
                ease: 'power2.inOut',
            })
            .to('#image-reveal_2', {
                rotate: '-4deg',
                width: '80%',
                duration: 3,
                ease: 'power2.inOut',
            })
            .to('#image-reveal_3', {
                width: '60%',
                duration: 3,
                ease: 'power2.inOut',
            })
            .to('body', {
                backgroundColor: 'rgba(28, 24, 25, 1)',
                duration: 10,
                ease: 'power2.inOut',
            }, '-=9');
        ScrollTrigger.refresh()
    });

    // Mobile
    imageSliderMM.add('(max-width: 767.98px)', () => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.image-reveal',
                start: 'top center+=150',
                end: 'bottom-=700',
                scrub: 1,
                pin: true,
                ease: 'none',
                pinSpacing: false,
            }
        });

        // Animation for sliding up images
        timeline
            .to('#image-reveal_1', {
                yPercent: -90,
                ease: 'none',
            })
            .to('#image-reveal_2', {
                yPercent: -90,
                ease: 'none',
            }, '>0.1')
            .to('#image-reveal_3', {
                yPercent: -90,
                ease: 'none',
            }, '>0.1')
            .to('body', {
                backgroundColor: 'rgba(28, 24, 25, 1)',
                duration: 1,
                ease: 'power2.inOut',
            }, '<');

        ScrollTrigger.refresh();
    });
});


// About reveal
// ====================================
const aboutTitle = document.querySelector('.about__title');
const aboutSubtitle = document.querySelector('.about__subtitle');
const aboutTextList = document.querySelectorAll('.about__content-item');
const aboutImage = document.querySelector('.about__content-img');
const aboutTextDescription = document.querySelector('.about__content-text p');
const aboutCTA = document.querySelector('#about-cta');
const aboutFacts = document.querySelectorAll('.about__info-item');

const aboutMM = gsap.matchMedia();

// Desktop
aboutMM.add('(min-width: 768px)', () => {
    const tlAboutDesktop = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'clamp(top+=500)',
            toggleActions: 'play none none none'
        },
    });

    // Animation sequences
    tlAboutDesktop
        .fromTo(aboutTitle, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            clipPath: 'inset(0 0 0% 0)',
            ease: 'power2.out',
        })
        .fromTo(aboutSubtitle, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power2.out',
        }, '<0.2')
        .fromTo(aboutTextList, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
            '--border-width': '0%'
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 2,
            stagger: 0.2,
            '--border-width': '100%',
            ease: 'power2.in',
        }, '-=3')
        .fromTo(aboutImage, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 3,
            ease: 'power2.out',
        }, '<0.3');

    // Timeline for animations that execute on scrollTrigger
    const tlAboutDesktopScroll = gsap.timeline({
        scrollTrigger: {
            trigger: aboutTextDescription,
            start: 'top+=500',
            toggleActions: 'play none none none',
        },
    });

    // ScrollTrigger-based animation sequences
    tlAboutDesktopScroll
        .fromTo(aboutTextDescription, {
            y: 20,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.8,
            ease: 'power2.out',
        }, '<')
        .fromTo(aboutCTA, {
            y: 20,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
        }, '<')
        .fromTo(aboutFacts, {
            y: 20,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
            stagger: 0.4,
            ease: 'power2.out',
        }, '<');
});

// Mobile
aboutMM.add('(max-width: 767.98px)', () => {
    const tlAboutMobile = gsap.timeline({
        scrollTrigger: {
            trigger: '.about',
            start: 'top-=700',
            toggleActions: 'play none none none'
        },
    });

    // Reuse the same animation logic
    tlAboutMobile
        .fromTo(aboutTitle, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
        }, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            clipPath: 'inset(0% 0 0 0)',
            ease: 'power2.out',
        })
        .fromTo(aboutSubtitle, {
            y: 10,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
        }, '<0.2')
        .fromTo(aboutTextList, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
            '--border-width': '0%'
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 2,
            stagger: 0.2,
            '--border-width': '100%',
            ease: 'power2.in',
        })
        .fromTo(aboutImage, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 2,
            ease: 'power2.out',
        }, '<0.2');

    // Timeline for animations that execute on scrollTrigger
    const tlAboutDesktopScroll = gsap.timeline({
        scrollTrigger: {
            trigger: aboutTextDescription,
            start: 'top bottom-=200',
            toggleActions: 'play none none none',
        },
    });

    // ScrollTrigger-based animation sequences
    tlAboutDesktopScroll
        .fromTo(aboutTextDescription, {
            y: 20,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0%)'
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0%)',
            duration: 0.8,
            ease: 'power2.out',
        },)
        .fromTo(aboutCTA, {
            y: 20,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 3,
            ease: 'power2.out',
        }, '<0.2')
        .fromTo(aboutFacts, {
            y: 20,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0%)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0%)',
            duration: 1.5,
            stagger: 0.4,
            ease: 'power2.out',
        }, '-=2');
});


// Music
// ====================================
const slider = document.querySelector('.music__yt-slider ul');

let isDragging = false;
let startX, scrollLeft, dragStartTime;
let movedDuringDrag = false;

// Add threshold for distinguishing between clicks and drags
const DRAG_THRESHOLD = 5;
const CLICK_THRESHOLD = 200;

// Mouse Down: Start Dragging
slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartTime = Date.now();
    movedDuringDrag = false;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

// Mouse Leave: Stop Dragging
slider.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.classList.remove('active');
});

// Mouse Up: Stop Dragging
slider.addEventListener('mouseup', (e) => {
    const dragDuration = Date.now() - dragStartTime;

    if (movedDuringDrag || dragDuration > CLICK_THRESHOLD) {
        e.preventDefault();
        e.stopPropagation();

        // Prevent the next click event
        const preventNextClick = (clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
            slider.removeEventListener('click', preventNextClick, true);
        };

        slider.addEventListener('click', preventNextClick, true);
    }

    isDragging = false;
    slider.classList.remove('active');
});

// Mouse Move: Scroll While Dragging
slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(walk) > DRAG_THRESHOLD) {
        movedDuringDrag = true;
    }

    slider.scrollLeft = scrollLeft - walk;
});

// Prevent Text Selection While Dragging
slider.addEventListener('dragstart', (e) => e.preventDefault());

// Handle clicks
slider.addEventListener('click', (e) => {
    if (movedDuringDrag) {
        e.preventDefault();
        e.stopPropagation();
        movedDuringDrag = false;
    }
});

// Animations
const music = document.querySelector('.music');
const musicAvatarImg = document.querySelector('.music__image-wrapper img');
const musicAvatarSlogan = document.querySelector('.music__slogan');
const musicTitle = document.querySelector('.music__title');
const musicSubtitle = document.querySelector('.music__subtitle');
const musicYtTitle = document.querySelector('.music__yt-title');
const musicYtSliderItems = document.querySelectorAll('.music__yt-slider-item');
const musicTracksTitle = document.querySelector('.music__tracks-title');
const musicTracksItems = document.querySelectorAll('.music__tracks-item');

const musicMM = gsap.matchMedia()
musicMM.add('(min-width: 768px)', () => {
    createMusicTl(300, 950);
    let musicContentTl = createMusicContentTl(400);
    musicAnimations(musicContentTl);
});

musicMM.add('(max-width: 767.98px)', () => {
    createMusicTl(-900, -40);
    let musicContentTl = createMusicContentTl(-700);
    musicAnimations(musicContentTl);
});

function createMusicTl(start, end) {
    return gsap.timeline({
        scrollTrigger: {
            trigger: music,
            start: `top+=${start}`,
            end: `bottom+=${end}`,
            toggleActions: 'play none none none',
            onEnter: () => {
                gsap.to(music, {
                    duration: 1,
                    backgroundColor: '#C6C2C2',
                    ease: 'power2.inOut',
                });
            },
            onLeave: () => {
                gsap.to(music, {
                    duration: 1,
                    backgroundColor: '#1C1819',
                    ease: 'power2.inOut',
                });
            },
            onEnterBack: () => {
                gsap.to(music, {
                    duration: 1,
                    backgroundColor: '#C6C2C2',
                    ease: 'power2.inOut',
                });
            },
            onLeaveBack: () => {
                gsap.to(music, {
                    duration: 1,
                    backgroundColor: '#1C1819',
                    ease: 'power2.inOut',
                });
            },
        },
    });
}

function createMusicContentTl(start) {
    return gsap.timeline({
        scrollTrigger: {
            trigger: musicTitle,
            start: `top+=${start}`,
            toggleActions: 'play none none none',
        }
    });
}

function musicAnimations(timeline) {
    return timeline
        .fromTo(musicAvatarImg, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0)',
        }, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            clipPath: 'inset(0% 0 0 0)',
            ease: 'power2.out',
        })
        .fromTo(musicAvatarSlogan, {
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power2.in',
        }, '-=2')
        .fromTo(musicTitle, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power2.in',
        }, '-=2')
        .fromTo(musicSubtitle, {
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power2.out',
        }, '-=2')
        .fromTo(musicYtTitle, {
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power2.out',
        }, '-=1')
        .fromTo(musicYtSliderItems, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
        }, '<')
        .fromTo(musicTracksTitle, {
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.5,
            ease: 'power2.out',
        })
        .fromTo(musicTracksItems, {
            y: 10,
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)',
        }, {
            y: 0,
            x: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
        }, '<');
}


// Shop
// ====================================
// Lightbox
const productItems = document.querySelectorAll('.product');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const thumbnailsContainer = document.querySelector('.thumbnails');
const closeButton = document.querySelector('.controls__close');
const shopTitle = document.querySelector('.shop__title');
const shopSubTitle = document.querySelector('.shop__subtitle');
const shopCards = document.querySelectorAll('.product');

let currentImages = [];
let currentIndex = 0;
let lightBoxStartX = 0;
let lightBoxEndX = 0;

ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
        const shopTlDesktop = gsap.timeline({
            scrollTrigger: {
                trigger: shopTitle,
                start: "top+=200",
                toggleActions: "play none none none",
            },
        });

        shopTlDesktop
            .fromTo(shopTitle, {
                y: 10,
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
            }, {
                y: 0,
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power2.in",
            })
            .fromTo(shopSubTitle, {
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
            }, {
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power2.out",
            })
            .fromTo(shopCards, {
                y: 40,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power2.inOut",
            }, "<");
    },

    "(max-width: 767px)": function () {
        const shopTlMobile = gsap.timeline({
            scrollTrigger: {
                trigger: shopTitle,
                start: "top-=700",
                toggleActions: "play none none none"
            },
        });

        shopTlMobile
            .fromTo(shopTitle, {
                y: 20,
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
            }, {
                y: 0,
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power2.in",
            })
            .fromTo(shopSubTitle, {
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
            }, {
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power2.out",
            })
            .fromTo(shopCards, {
                y: 50,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.3,
                ease: "power2.inOut",
            }, "<");
    },
});

productItems.forEach((item) => {
    item.addEventListener('click', () => {
        const productImages = JSON.parse(item.getAttribute('data-images'));
        currentImages = productImages;
        currentIndex = 0;

        if (productImages.length > 0) {
            const lightBoxTl = gsap.timeline();
            lightBoxTl.fromTo(
                lightbox,
                {opacity: 0},
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                })

            populateLightbox(productImages);
            disableScrolling();
            lightbox.classList.add('active');
        }
    });
});

function populateLightbox(images) {
    lightboxImg.src = images[0];
    thumbnailsContainer.innerHTML = '';

    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `thumbnail ${index + 1}`;
        thumbnail.classList.toggle('active', index === 0);
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            lightboxImg.src = image;
            updateThumbnailHighlight(index);
        });
        thumbnailsContainer.appendChild(thumbnail);
    });

    currentImages = images;

    currentIndex = 0;
    addSwipeHandlers(images);
}

function addSwipeHandlers() {
    // Remove previous handlers if they exist
    lightboxImg.removeEventListener('touchstart', handleTouchStart);
    lightboxImg.removeEventListener('touchmove', handleTouchMove);
    lightboxImg.removeEventListener('touchend', handleTouchEnd);

    // Define handlers locally for proper reattachment
    function handleTouchStart(event) {
        lightBoxStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        lightBoxEndX = event.touches[0].clientX;
        event.preventDefault();
    }

    function handleTouchEnd() {
        const diffX = lightBoxStartX - lightBoxEndX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                showNextImage(currentImages);
            } else {
                showPrevImage(currentImages);
            }
        }
        lightBoxStartX = 0;
        lightBoxEndX = 0;
    }

    // Add new handlers
    lightboxImg.addEventListener('touchstart', handleTouchStart);
    lightboxImg.addEventListener('touchmove', handleTouchMove);
    lightboxImg.addEventListener('touchend', handleTouchEnd);
}

function showNextImage(images) {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
    updateThumbnailHighlight(currentIndex);
}

function showPrevImage(images) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
    updateThumbnailHighlight(currentIndex);
}

// Update thumbnail highlight
function updateThumbnailHighlight(index) {
    const thumbnails = thumbnailsContainer.querySelectorAll('img');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Close Lightbox
function closeLightbox() {
    if (lightbox) {
        enableScrolling();
        lightbox.classList.remove('active');
    }
}

// Close on click
if (closeButton) {
    closeButton.addEventListener('click', closeLightbox);
}

// Close on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.code === 'Escape') {
        closeLightbox();
    }
});

// Navigate Images
document.querySelector('.controls__prev').addEventListener('click', () => {
    navigateImages(-1);
});
document.querySelector('.controls__next').addEventListener('click', () => {
    navigateImages(1);
});

function navigateImages(direction) {
    currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    updateThumbnailHighlight(currentIndex);
}

// Booking
// ====================================
const bookingTitle = document.querySelector('.live-stream__title.book__header');
const bookingSubtitle = document.querySelector('.live-stream__subtitle.book__subtitle');
const bookingText = document.querySelector('.section__text.live-stream__text.book__text');
const bookingCards = document.querySelectorAll('.book__card');
let isMobileBooking = window.innerWidth <= 768;

// Create a timeline for the text elements
const tlBooking = gsap.timeline({
    scrollTrigger: {
        // Trigger the animation when the title enters the viewport
        trigger: bookingTitle,
        start: isMobileBooking ? 'top-=650' : 'top+=50',
        toggleActions: 'play none none none'
    },
});

// Animate the title
tlBooking.fromTo(
    bookingTitle,
    {
        y: 10,
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)'
    },
    {
        y: 0,
        opacity: 1,
        duration: 1.5,
        clipPath: 'inset(0 0 0% 0)',
        ease: 'power2.out',
    }
)
    .fromTo(
        bookingText,
        {
            y: 10,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
        },
        '<0.2'
    ).fromTo(
    bookingSubtitle,
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
        ease: 'power2.out',
    },
    '<0.2'
).fromTo(
    bookingCards, {
        clipPath: 'inset(0 0 100% 0)'
    },
    {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.5,
        ease: 'power2.inOut'
    },
    '+=0.2'
);

const bookSlider = document.querySelector('.book__cards-wrapper');

let bookingIsDragging = false;
let bookingStartX, bookingScrollLeft, bookingDragStartTime;
let bookingMovedDuringDrag = false;

bookSlider.addEventListener('mousedown', (e) => {
    bookingIsDragging = true;
    bookingDragStartTime = Date.now();
    bookingMovedDuringDrag = false;
    bookSlider.classList.add('active');
    bookingStartX = e.pageX - bookSlider.offsetLeft;
    bookingScrollLeft = bookSlider.scrollLeft;

});

// Mouse Leave: Stop Dragging
bookSlider.addEventListener('mouseleave', () => {
    bookingIsDragging = false;
    bookSlider.classList.remove('active');
});

// Mouse Up: Stop Dragging
bookSlider.addEventListener('mouseup', (e) => {
    const dragDuration = Date.now() - bookingDragStartTime;

    if (bookingMovedDuringDrag || dragDuration > CLICK_THRESHOLD) {
        e.preventDefault();
        e.stopPropagation();

        // Prevent the next click event
        const preventNextClick = (clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
            bookSlider.removeEventListener('click', preventNextClick, true);
        };

        bookSlider.addEventListener('click', preventNextClick, true);
    }

    bookingIsDragging = false;
    bookSlider.classList.remove('active');
});

// Mouse Move: Scroll While Dragging
bookSlider.addEventListener('mousemove', (e) => {
    if (!bookingIsDragging) return;
    e.preventDefault();

    const x = e.pageX - bookSlider.offsetLeft;
    const walk = (x - bookingStartX) * 2;

    if (Math.abs(walk) > DRAG_THRESHOLD) {
        bookingMovedDuringDrag = true;
    }
    bookSlider.scrollLeft = bookingScrollLeft - walk;
});

// Prevent Text Selection While Dragging
bookSlider.addEventListener('dragstart', (e) => e.preventDefault());

// Handle clicks
bookSlider.addEventListener('click', (e) => {
    if (bookingMovedDuringDrag) {
        e.preventDefault();
        e.stopPropagation();
        bookingMovedDuringDrag = false;
    }
});


// Footer
// ====================================
const footerDecorOne = document.querySelector('.footer__top p:first-child');
const footerDecorTwo = document.querySelector('.footer__top p:last-child');
const footerImage = document.querySelector('.footer__img-wrapper');
const footerSocials = document.querySelectorAll('.socials__footer li');
const footerNav = document.querySelectorAll('.footer__menu li');
let isMobileFooter = window.innerWidth <= 768;

const footerTl = gsap.timeline({
    scrollTrigger: {
        trigger: footerDecorOne,
        start: isMobileFooter ? 'top-=650' : 'top+=300',
        toggleActions: 'play none none none'
    }
});

footerTl.fromTo(footerDecorOne,
    {opacity: 0},
    {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
    })
    .fromTo(footerDecorTwo,
        {opacity: 0},
        {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        }, '<')
    .fromTo(footerImage,
        {
            clipPath: 'inset(0 0 100% 0)'
        },
        {
            clipPath: 'inset(0 0 0% 0)',
            duration: 2,
            ease: 'power2.out'
        },
        '<0.5')
    .fromTo(footerSocials,
        {
            y: 10,
            opacity: 0

        },
        {
            y: 0,
            opacity: 1,
            duration: .5,
            stagger: 0.4,
            ease: 'power2.out'
        }, '<')
    .fromTo(footerNav,
        {
            y: 20,
            opacity: 0

        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.4,
            ease: 'power2.out'
        }, '<');