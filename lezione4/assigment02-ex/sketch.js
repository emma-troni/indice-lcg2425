function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(220);
  noFill();
  stroke("tomato");
  blendMode(BURN);
  for (let i=0; i<10; i++) {
    push();
    translate(50*i,0);
    repeteWorm(random(1,10),25,5); 
    pop();
  }
}

function drawWorm(side,nPoints) {
  // let side = 20;
  // let nPoints = 5;
  beginShape(); // inizio forma
  // vanno inseriti i vertici 
  for (let point = 0; point<nPoints; point++) {
    let x = random(side); 
    let y = random(side);
    // vertex(x,y);
    curveVertex(x,y);
  }
  endShape(); // fine forma
}

function repeteWorm(numWorms, side, points) {
  for (let n = 0; n < numWorms; n++) {

    drawWorm(side, points);
  }
}


