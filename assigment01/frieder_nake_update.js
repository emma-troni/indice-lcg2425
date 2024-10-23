// REFERENCE: https://www.tate.org.uk/art/artworks/nake-no-title-p80809
// no title, 1967, Frieder Nake

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();

    angleMode(DEGREES);
}

let count = 14; // N Righe == N colonne

function draw() {
    noStroke();
    background("#e8e6e4");

    // misure originali
    let testContentSize = 880;
    let testMarginSize = 260;
    let testStrokeSize = 9;
    let marginContentRatio = testMarginSize / testContentSize;
    let strokeToContentRatio = testStrokeSize / testContentSize;

    // min(windowWidth, windowHeight) = (contentSize) + (contentSize * marginContentRatio * 2)
    let contentSize = min(windowWidth, windowHeight) / (marginContentRatio * 2 + 1);
    let unitSize = contentSize / count;
    let marginX = (windowWidth - contentSize) / 2;
    let marginY = (windowHeight - contentSize) / 2;

    let strokeSize = contentSize * strokeToContentRatio;

    push();

    let centerX = marginX + unitSize / 2;
    let centerY = marginY + unitSize / 2;
    translate(centerX, centerY);

    noFill();

    strokeWeight(strokeSize);
  
    let red = color(216, 81, 40, 180);
    let orange = color(217, 125, 19, 190);
    let yellow = color(236, 216, 27, 160);
    let gray = color(178, 178, 178, 150);
    
    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            // isSquare(col,row): per definire la parte dove disegnare gli elementi 
            if (isSquare(col, row)) {
                // in centro alla figura
                if (row >= -col + 6 && row < -col + 21) {
                    // N rossi (23/54 -> 42.6%) 
                    // N arancioni (17/54 -> 31.5%) 
                    //  N gialli (12/54 -> 22.2%) 
                    //  N grigi (2/54 -> 3.7%)
                    let choice = random();
                    if (choice < 0.426) {
                        stroke(red);
                    } else if (choice < (0.741)) {
                        stroke(orange);
                    } else if (choice < 0.963) {
                        stroke(yellow);
                    } else {
                        stroke(gray);
                    }
                } else {
                    // nei due vertici (in alto dx e in basso sx)
                    // N rossi (15/30 -> 50%)
                    // N arancio (13/30 ->43.3%)
                    //  N giallin (2/30 -> 6.7%)
                    let choice = random();
                    if (choice < 0.50) {
                        stroke(red);
                    } else if (choice < (0.433 + 0.5)) {
                        stroke(orange);
                    } else {
                        stroke(yellow);
                    }
                }
                // drawSquare(col, row, unitSize);
                drawSquare(col, row, unitSize, contentSize, marginX, marginY)
            }
        }
    }

    pop();
  
    // Per i margini:
    // fill("#ff000044");
    // rect(0, 0, marginX, windowHeight);
    // rect(0, 0, windowWidth, marginY);
    // rect(0, windowHeight, windowWidth, -marginY);
    // rect(windowWidth, 0, -marginX, windowHeight);
}

function isSquare(col, row) {
    // y = mx + q
    // row > col + q

    if (row >= col + 6) {
        // Salta la parte dopo e continua il ciclo.
        return false;
    }

    if (row <= col - 6) {
        return false;
    }

    if (row >= -col + 6 && row < -col + 22) {
        // Fascio di rette parallele pari:
        // row = col + q dove q deve essere pari
        if ((row - col) % 2 == 0) {
            return false;
        }
    }

    return true;
}


function drawSquare(col, row, unitSize, color) {
    let unitX = col * unitSize;
    let unitY = row * unitSize;

    let squareSize = random(unitSize * 0.8, unitSize * 0.9);
    let radius = squareSize * 0.05;
  
    let unitCenter = unitSize / 2;

    push();
  
    translate(unitX, unitY);
    
    let halfSize = squareSize / 2;
    let a = -halfSize;
    let b = a + squareSize;
  
    let angle = random(0, 360);
  
    let points = [[a, a], [a, b], [b, b], [b, a]];
    for (let i = 0; i < points.length; i++) {
      let start = points[i];
      let end = points[i == points.length - 1 ? 0 : i + 1];
      
      let x1 = start[0] * cos(angle) - start[1] * sin(angle);
      let y1 = start[0] * sin(angle) + start[1] * cos(angle);
      let x2 = end[0] * cos(angle) - end[1] * sin(angle);
      let y2 = end[0] * sin(angle) + end[1] * cos(angle);
      
      // Se x1 è fuori dal margine sinistro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitX + halfSize + x1 < 0) {
        let x = -unitX - halfSize;
        let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
        x1 = x
        y1 = y
        point(x, y);
      }
    
      // Se x2 è fuori dal margine sinistro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitX + halfSize + x2 < 0) {
        let x = -unitX - halfSize;
        let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
        x2 = x
        y2 = y
        point(x, y);
      } 
      
      // Se y1 è fuori dal margine superiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitY + halfSize + y1 < 0) {
        let y = -unitY - halfSize;
        let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        x1 = x
        y1 = y
        point(x, y);
      }
      
      // Se y2 è fuori dal margine superiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitY + halfSize + y2 < 0) {
        let y = -unitY - halfSize;
        let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        x2 = x
        y2 = y
        point(x, y);
      } 
      
      // Se x1 è fuori dal margine destro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitX + halfSize + x1 > unitSize * count) {
        let x = -unitX - halfSize + unitSize * count;
        let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
        x1 = x
        y1 = y
        point(x, y);
      }
      
      // Se x2 è fuori dal margine destro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitX + halfSize + x2 > unitSize * count) {
        let x = -unitX - halfSize + unitSize * count;
        let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
        x2 = x
        y2 = y
        point(x, y);
      }
            
      // Se y1 è fuori dal margine inferiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitY + halfSize + y1 > unitSize * count) {
        let y = -unitY - halfSize + unitSize * count;
        let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        x1 = x
        y1 = y
        point(x, y);
      }
      
      // Se y2 è fuori dal margine inferiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
      if (unitY + halfSize + y2 > unitSize * count) {
        let y = -unitY - halfSize + unitSize * count;
        let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        x2 = x
        y2 = y
        point(x, y);
      } 
      
      line(x1, y1, x2, y2);
    }

    pop();
}
