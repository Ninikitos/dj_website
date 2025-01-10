document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Observer);

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

    // Smooth scroll
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // gsap.fromTo(
    //     '.accent-text',
    //     {opacity: 0},
    //     {
    //         opacity: 1,
    //         duration: 1,
    //         onStart: startCanvas,
    //         scrollTrigger: {
    //             trigger: '.shop',
    //             start: 'bottom-=100',
    //             once: true,
    //
    //         },
    //     }
    // );

    // Function to start the canvas
    function startCanvas() {
        loopCanvas = true;
        setup();
        console.log('Canvas animation started!');
    }
});

//Canvas
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let words = [];
let ground, wallLeft, wallRight;
let wordsToDisplay = [
    "DJ Destruct 305",
    "Miami",
    "From Haiti",
    "RNB",
    "Music",
    "Live",
    "Vibe",
    "DJ Destruct 305",
    "Miami",
    "From Haiti",
    "RNB",
    "Music",
    "Live",
    "Vibe"
];

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('accent-text');

    engine = Engine.create();

    ground = Bodies.rectangle(width / 2, height - 505, width, 10, {
        isStatic: true,
    });
    wallLeft = Bodies.rectangle(0, height / 2, 10, height, {
        isStatic: true,
    });
    wallRight = Bodies.rectangle(width, height / 2, 10, height, {
        isStatic: true,
    });

    World.add(engine.world, [ground, wallLeft, wallRight]);

    for (let i = 0; i < wordsToDisplay.length; i++) {
        words.push(new Word(random(width), -200, wordsToDisplay[i]));
    }
}

function draw() {
    background("#F23038");
    Engine.update(engine);
    for (let word of words) {
        word.show();
    }
}

class Word {
    constructor(x, y, word) {
        this.body = Bodies.rectangle(x, y, word.length * 20, 40);
        this.word = word;
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill("#E5E0E0");
        stroke("#0f0f0f");
        strokeWeight(3);
        rect(0, 0, this.word.length * 30, 80, 40);
        noStroke();
        fill("#0f0f0f");
        textSize(40);
        textAlign(CENTER, CENTER);
        text(this.word.toUpperCase(), 0, 0);
        pop();
    }
}

function mouseMoved() {
    for (let word of words) {
        if (
            dist(mouseX, mouseY, word.body.position.x, word.body.position.y) <
            50
        ) {
            Body.applyForce(
                word.body,
                {x: word.body.position.x, y: word.body.position.y},
                {x: random(-0.2, 0.2), y: random(-0.2, 0.2)}
            );
        }
    }
}

