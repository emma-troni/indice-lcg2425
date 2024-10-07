let xsize = 400;
let ysize = 400;

function setup() {
  createCanvas(xsize, ysize);
}

function draw() {
  // CIELO == sfondo
  background(107, 140, 255);

  // NUVOLE
  let xCloud = 200;
  let yCloud = 100;
  let sizeCloud = 40;
  strokeWeight(0);
  fill("white");
  // 1a riga
  for (x = xCloud * 0.2; x < xsize; x += sizeCloud * 4) {
    // centrale
    ellipse(x, yCloud, sizeCloud, sizeCloud * 0.6);
    // laterali
    ellipse(x - sizeCloud * 0.4, yCloud, sizeCloud * 0.6, sizeCloud * 0.6);
    ellipse(x + sizeCloud * 0.4, yCloud, sizeCloud * 0.6, sizeCloud * 0.6);
    // superiori
    ellipse(x + sizeCloud * 0.2, yCloud - sizeCloud * 0.3, sizeCloud * 0.5, sizeCloud * 0.5);
    ellipse(x - sizeCloud * 0.2, yCloud - sizeCloud * 0.3, sizeCloud * 0.5, sizeCloud * 0.5);
  }
  // 2a riga
  for (y = -40; y < ysize; y += sizeCloud * 4) {
    // centrale
    ellipse(y, yCloud * 0.5, sizeCloud, sizeCloud * 0.6);
    // laterale
    ellipse(y - sizeCloud * 0.4, yCloud * 0.5, sizeCloud * 0.6, sizeCloud * 0.6);
    // superiori
    ellipse(y + sizeCloud * 0.2, yCloud * 0.5 - sizeCloud * 0.3, sizeCloud * 0.5, sizeCloud * 0.5);
    ellipse(y - sizeCloud * 0.2, yCloud * 0.5 - sizeCloud * 0.3, sizeCloud * 0.5, sizeCloud * 0.5);
  }


  // TUBI
  fill("#13C642");
  stroke("black");
  strokeWeight(2);
  // let xPipe = 150;
  let wPipe = 50;
  let hPipe = 150;
  // scelgo una distanza assey per fare che poggino sempre a terra
  let yPipe = ysize - hPipe - wPipe;
  let radiusPipe = 5;
  // parte superiore
  kPipe = 8
  // rect(xPipe - wPipe * 0.25, yPipe - hPipe / kPipe, wPipe * 1.5, hPipe / kPipe, radiusPipe);
  // parte inferiore
  // rect(xPipe, yPipe, wPipe, hPipe)
  for (x = -20; x < xsize; x += 100) {
    rect(x - wPipe * 0.25, yPipe - hPipe / kPipe, wPipe * 1.5, hPipe / kPipe, radiusPipe);
    rect(x, yPipe, wPipe, hPipe);
  }

  // PAVIMENTO
  fill(139, 69, 19);
  groundSize = 50;
  // rect(0, ysize - groundSize, groundSize,groundSize);
  for (x = 0; x < xsize; x += groundSize) {
    strokeWeight(1.5);
    stroke("white");
    rect(x, ysize - groundSize, groundSize, groundSize)
  }

  // GOOMBA
  stroke("black")
  // let xGoomba = 100;
  let yGoomba = 310
  let sizeGoomba = 55;
  for (x = 80; x < xsize; x += 80) {
    // testa
    fill(150, 75, 0);
    ellipse(x, yGoomba + sizeGoomba * 0.08, sizeGoomba, sizeGoomba * 0.7);
    // occhi
    fill(250, 195, 120);
    ellipse(x - sizeGoomba * 0.2, yGoomba + sizeGoomba * 0.15, sizeGoomba * 0.25, sizeGoomba * 0.3);
    ellipse(x + sizeGoomba * 0.2, yGoomba + sizeGoomba * 0.15, sizeGoomba * 0.25, sizeGoomba * 0.3);
    fill("black");
    ellipse(x - sizeGoomba * 0.2, yGoomba + sizeGoomba * 0.15, sizeGoomba * 0.1, sizeGoomba * 0.15);
    ellipse(x + sizeGoomba * 0.2, yGoomba + sizeGoomba * 0.15, sizeGoomba * 0.08, sizeGoomba * 0.15);
    // sopracciglio
    strokeWeight(6);
    line(x - sizeGoomba * 0.3, yGoomba - sizeGoomba * 0.06, x - sizeGoomba * 0.08, yGoomba + sizeGoomba * 0.15);
    line(x + sizeGoomba * 0.3, yGoomba - sizeGoomba * 0.06, x + sizeGoomba * 0.08, yGoomba + sizeGoomba * 0.15);
    // pancia
    fill(250, 195, 120);
    strokeWeight(2);
    ellipse(x, yGoomba + sizeGoomba * 0.55, sizeGoomba * 0.6, sizeGoomba * 0.5);
    // piedi
    fill("black");
    ellipse(x - sizeGoomba * 0.25, yGoomba + sizeGoomba * 0.7, sizeGoomba * 0.45, sizeGoomba * 0.25)
    ellipse(x + sizeGoomba * 0.25, yGoomba + sizeGoomba * 0.7, sizeGoomba * 0.45, sizeGoomba * 0.25)
  }



}
