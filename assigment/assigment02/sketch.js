// ASSIGMENT 02 | Algorithmic Pen and Ink Gliph
// REFERENCE --> mappe metropolitane: https://www.minniemuse.com/articles/musings/the-subway-map 
// Per ogni glifo:
// - linee che hanno un angolo variabile tra 0/45/90°
// - maggiore probabilità di passaggio verso il centro --> Prossimo punto + vicino passando per il centro
// - per ogni linea almeno due punti esterni e un punto vicino al centro


// https://p5js.org/reference/p5/resizeCanvas/ 
// resizeCanvas() immediately clears the canvas and calls redraw()


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// variabili globali
let angles = [0, 45, 90, 135, 180, 225, 270, 315];
let cellSize = 70;
let margin = 0;
let padding = 50;

let contentWidth = width - (margin * 2);
let contentHeight = height - (margin * 2);
let unitWidth = contentWidth / padding;
let unitHeight = contentWidth / padding;



function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();
  colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFBE0B',
    '#4D4D4D', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4'
  ];

}

function draw() {
  background("white");
  translate(margin, margin);

  let nRows = (windowWidth) / cellSize;
  let nCols = (windowHeight) / cellSize;
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      push();
      translate(col * cellSize, row * cellSize);
      drawGrid();
      drawMap();
      pop();
    }
  }

  // https://p5js.org/reference/p5/beginShape/ 
  // the beginShape() and endShape() functions allow for creating custom shapes in 2D or 3D
  // NB Transformations such as translate(), rotate(), and scale() don't work between beginShape() and endShape()
  // beginShape(LINES);
  // vertex(30, 20);
  // vertex(85, 20);
  // vertex(85, 75);
  // vertex(30, 75);
  // endShape();

  // beginShape(POINTS);
  // strokeWeight(3);
  // stroke("red");
  // vertex(30, 20);
  // vertex(85, 20);
  // vertex(85, 75);
  // vertex(30, 75);
  // endShape();

}

function drawGrid() {
  quad(0, 0, 0, cellSize, cellSize, cellSize, cellSize, 0)
  // // seleziona randomicamente il pto d'inizio/fine per ogni linea
  push()
  beginShape(POINTS);
  stroke("red");
  strokeWeight(4);
  vertex(0, 0);
  vertex(0, cellSize);
  vertex(cellSize, cellSize);
  vertex(cellSize, 0);
  endShape();
  pop()
}

function drawMap() {
  stroke("red");
  strokeWeight(2);
  let centerX = cellSize / 2;
  let centerY = cellSize / 2;

  let startX = random(-centerX, +centerX);
  let startY = random(-centerY, centerY);
  beginShape(POINTS);
  vertex(startX,startY);
  // vertex(85, 75);
  // vertex(30, 75);
  endShape();

}

