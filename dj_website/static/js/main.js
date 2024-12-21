document.addEventListener("DOMContentLoaded", () => {
    // Website Preloader
    const preloader = document.querySelector(".preloader");
    const preloaderText = document.querySelector(".preloader h2");
    const preloaderImage = document.querySelector(".preloader__img-wrapper img");

    const tlPreloader = gsap.timeline();
    tlPreloader.to(preloaderText, {
        duration: 1.5,
        opacity: 1,
        scale: 1.2,
        ease: "power2.out",
    })
        .to(preloaderImage, {
            duration: 1.5,
            y: "0%",
            ease: "power2.out",
        }, "-=0.5")
        .to(preloaderImage, {
            duration: 1,
            y: "-100%",
            ease: "power2.in"
        }, "+=0.5")
        .to(preloaderText, {
            duration: 1,
            opacity: 0,
            scale: 1.1,
            ease: "power2.in",
            delay: 0.5
        })
        .to(preloader, {
            duration: 1,
            y: "-100%",
            ease: "power2.inOut",
            onComplete: () => {
                preloader.style.display = "none";
                content.style.display = "block";
            },
        });
});