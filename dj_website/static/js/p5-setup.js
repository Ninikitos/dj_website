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
    "RnB Music",
    "Vinyl",
    "Live",
    "Vibe",
    "DJ Destruct 305",
    "Miami",
    "From Haiti",
    "Book me",
    "Music",
    "Live",
    "Vibe Vibe Vibe",
    "DJ Destruct 305",
    "TikTok",
    "Instagram"
];

function setup() {
    const section = document.querySelector('#accent-text');
    const canvas = createCanvas(section.clientWidth, section.clientHeight);
    canvas.parent('accent-text');

    engine = Engine.create();

    const sectionHeight = section.clientHeight;
    const sectionWidth = section.clientWidth;

    const groundY = sectionHeight - 5;

    ground = Bodies.rectangle(
        sectionWidth / 2,
        groundY,
        sectionWidth,
        10,
        {isStatic: true}
    );

    wallLeft = Bodies.rectangle(0, sectionHeight / 2, 10, sectionHeight, {isStatic: true});
    wallRight = Bodies.rectangle(sectionWidth, sectionHeight / 2, 10, sectionHeight, {isStatic: true});

    World.add(engine.world, [ground, wallLeft, wallRight]);

    for (let i = 0; i < wordsToDisplay.length; i++) {
        words.push(new Word(random(sectionWidth), -200, wordsToDisplay[i]));
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

        let isMobile = window.innerWidth <= 768; // Define a breakpoint for mobile
        let scaleFactor = isMobile ? 0.6 : 1; // Reduce size by half on mobile

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill("#E5E0E0");
        stroke("#0f0f0f");
        strokeWeight(3 * scaleFactor); // Scale stroke weight
        rect(0, 0, this.word.length * 30 * scaleFactor, 80 * scaleFactor, 40 * scaleFactor); // Scale rect size
        noStroke();
        fill("#0f0f0f");
        textSize(40 * scaleFactor); // Scale text size
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
                {x: random(-0.3, 0.3), y: random(-0.3, 0.3)}
            );
        }
    }
}