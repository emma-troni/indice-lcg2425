function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background("#3c3b4c");
  noStroke();

  fill("lightblue");
  let vGutter = 5;
  // let rectY = 10;
  let rectWidth = 10;
  let rectHeight = 20;
  // colonne = larghezza schermo / (larghezza rett + spazio orizzontale)
  let nColums = windowWidth / (rectWidth + vGutter);
  // righe = altezza schermo / (altezza rett + spazio orizzontale)
  let rows = windowHeight / (rectHeight + vGutter);


  for (i = 0; i < nColums; i++) {
    for (r = 0; r < rows; r++) {
      let xPos = i * (rectWidth + vGutter) + random(-2.5, 2.5);
      let yPos = r*25+ random(-2.5, 2.5);
      // margine
      let margine = 40;
      if ((xPos>margine)&& (xPos<windowWidth-margine) && (yPos>margine) && (yPos<windowHeight-margine*1.5)) {
        fill("lightBlue");
      } else {
        fill("#3c3b4c");
      }

      // riproduzione rettangoli
      rect(xPos, yPos, rectWidth, rectHeight);
    }
  }
}
