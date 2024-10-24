// reference https://spalterdigital.com/artworks/quatre-quarts-rd-four-quarters-rd/
// TITOLO: Quatre – Quarts – RD (Four Quarters – RD
// ARTISTA: Vera Molnar
// DATA: 2012

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    angleMode(DEGREES)
}

function draw() {
    background("white");
    noStroke();
    
    
    fill("green")
    rect(0, windowHeight / 2, windowWidth / 2, windowHeight / 2)
    // primo quadrante:
    let firstLineSize = 13.5;
    let distance = 17.5;
    for (let x = 0; x < windowWidth / 2+ distance/2; x +=distance) {
        for (let y = 0; y < windowHeight / 2; y += distance) {
            stroke("green");
            drawSmallRect(x, y, firstLineSize);
        }
    }
    let secondLineSize = 27;
    let secondDistance = 18;
    let factor = 27/13.5;
    
    for (let x = windowWidth / 2 + distance; x < windowWidth; x +=distance) {
        for (let y = 0; y < windowHeight / 2; y += distance) {
            stroke("red")
            drawSmallRect(x, y, secondLineSize);
        }
    }
    let thirdLineSize = factor*13.5*2
    for (let x = windowWidth / 2 + distance; x < windowWidth; x +=distance) {
        for (let y = windowHeight / 2; y < windowHeight; y += distance) {
            stroke("red")
            drawSmallRect(x, y, thirdLineSize);
        }
    }
}

function drawSmallRect(xPos, yPos, size) {
    push()
    translate(xPos, yPos)
    
    let xOneRect = -size/2;
    let yOneRect = 0;
    let xTwoRect = +size/2;
    let yTwoRect = 0;

    let angle = random(0, 360)
    rotate(angle);
    strokeWeight(2);
    line(xOneRect, yOneRect, xTwoRect, yTwoRect)
    pop()
}