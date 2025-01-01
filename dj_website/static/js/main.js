document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Observer);
    gsap.registerPlugin()

    // Website Preloader
    const preloader = document.querySelector(".preloader");
    const preloaderText = document.querySelector(".preloader h2");
    const preloaderImage = document.querySelector(".preloader__img-wrapper img");
    const heroSocials = document.querySelector(".socials");
    const heroMenu = document.querySelector('.header__menu');
    const heroMenuOpenWrapper = document.querySelector('.header__menu-wrapper');
    const heroTitle = document.querySelector('.hero__title');
    const heroSubTitle = document.querySelector('.hero__subtitle');
    const heroLinkTikTok = document.querySelector('.hero__link-tiktok');
    const heroLinkBook = document.querySelector('.hero__link-book');
    const heroMusicListenAll = document.querySelector('.hero__music-link');
    const heroMusicItems = document.querySelectorAll('.hero__music-item');

    const tlPreloader = gsap.timeline();
    tlPreloader.to(preloaderText, {
        duration: 1.5, opacity: 1, scale: 1.2, ease: "power2.out",
    })
        .to(preloaderImage, {
            duration: 1.5, y: "0%", ease: "power2.out",
        }, "-=0.5")
        .to(preloaderImage, {
            duration: 1, y: "110%", ease: "power2.in"
        }, "+=0.5")
        .to(preloaderText, {
            duration: 1, opacity: 0, scale: 1.1, ease: "power2.in", delay: 0.5
        })
        .to(preloader, {
            duration: 1, y: "-100%", ease: "power2.inOut", onComplete: () => {
                preloader.style.display = "none";
            },
        });

    // Trigger hero animation after preloader completes
    tlPreloader.eventCallback("onComplete", () => {
        const tlHero = gsap.timeline();
        tlHero
            .to(heroSocials, {
                duration: 1, clipPath: 'inset(0 0 0% 0)', ease: 'power2.inOut',
            })
            .to(heroMenu, {
                duration: 1, clipPath: 'inset(0% 0 0 0)', ease: 'power2.inOut',
            }, '-=1')
            .to(heroMenuOpenWrapper, {
                duration: 1, clipPath: 'inset(0 0 0% 0)', ease: 'power2.inOut',
            }, '-=1')
            .to(heroTitle, {
                duration: 1.5, clipPath: 'inset(0 0 0% 0)', ease: 'power2.inOut',
            }, '-=1')
            .to(heroSubTitle, {
                duration: 1, clipPath: 'inset(0% 0 0 0)', ease: 'power2.inOut',
            }, '-=1')
            .to(heroLinkTikTok, {
                duration: 1, opacity: 1, y: 0, ease: 'power2.inOut',
            }, '-=1')
            .to(heroLinkBook, {
                duration: 1, opacity: 1, y: 0, ease: 'power2.inOut',
            }, '-=1')
            .to(heroMusicItems, {
                duration: 2, x: 0, opacity: 1, ease: 'power2.out', clipPath: 'inset(0% 0 0 0)', stagger: 0.2,
            }, '-=2')
            .to(heroMusicListenAll, {
                duration: 1, opacity: 1, x: 0, ease: 'power2.inOut'
            }, '-=2');
    });
});
