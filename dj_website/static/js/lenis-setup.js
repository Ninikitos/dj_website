// Initialize Lenis
const lenis = new Lenis({
    smooth: true,
    direction: 'vertical',
    smoothTouch: true,
});

// Sync Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// GSAP's ticker updates Lenis
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing
gsap.ticker.lagSmoothing(0);

// Function to disable scrolling
export function disableScrolling() {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollbarWidth}px`;
    lenis.stop();
}

// Function to enable scrolling
export function enableScrolling() {
    document.body.style.overflow = '';
    document.body.style.marginRight = '';
    lenis.start();
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}