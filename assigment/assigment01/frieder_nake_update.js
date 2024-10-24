// REFERENCE: https://www.tate.org.uk/art/artworks/nake-no-title-p80809
// No Title - 1967, Frieder Nake

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    angleMode(DEGREES);
    // https://p5js.org/reference/p5/blendMode/ 
    blendMode(DARKEST);
}

function draw() {
    background("#e8e6e4");
    // misure originali
    let testContentSize = 880;
    let testMarginSize = 260;
    let testStrokeSize = 9;

    // marginContentRatio = quante volte sta il margine nel content
    let marginContentRatio = testMarginSize / testContentSize;
    // (contentSize * strokeToContentRatio) = strokeWeight
    let strokeToContentRatio = testStrokeSize / testContentSize;

    let unitCount = 14; // N Righe == N colonne

    // margine = (contentSize * marginContentRatio) 
    // min(windowWidth, windowHeight) = (contentSize) + (margine * 2)
    let contentSize = min(windowWidth, windowHeight) / (marginContentRatio * 2 + 1);

    // unitSize = dimensione dell'unità della griglia di 14x14 (quadrato --> dimensione unica)
    let unitSize = contentSize / unitCount;
    let contentX = (windowWidth - contentSize) / 2;
    let contentY = (windowHeight - contentSize) / 2;

    // faccio si che il margine vari in base alla dimensione del contenuto in modo che sia responsive
    let strokeSize = contentSize * strokeToContentRatio;
    strokeWeight(strokeSize);

    // calcolo le coordinate del centro della prima riga e colonna e imposto lì l'origine del disegno
    push();
    translate(contentX, contentY);
    let red = color(205, 81, 40, 200);
    let orange = color(225, 125, 19, 190);
    let yellow = color(255, 210, 0, 160);
    let gray = color(183, 178, 178, 150);

    for (let row = 0; row < unitCount; row++) {
        for (let col = 0; col < unitCount; col++) {
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
                drawSquare(col, row, unitSize, unitCount)
            }
        }
    }
    pop();
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

function drawSquare(col, row, unitSize, unitCount) {
    let centerUnitX = col * unitSize + unitSize / 2;
    let centerUnitY = row * unitSize + unitSize / 2;

    // Lo square è più piccolo della unità
    let squareSize = random(unitSize * 0.6, unitSize * 0.95);

    push();

    translate(centerUnitX, centerUnitY);
    // max e min valore di x e y nel contenuto
    let contentMinX = 0 - centerUnitX;
    let contentMinY = 0 - centerUnitY;

    let contentMaxX = unitCount * unitSize - centerUnitX;
    let contentMaxY = unitCount * unitSize - centerUnitY;

    let a = -squareSize / 2;
    let b = a + squareSize;

    let angle = random(0, 90);

    let points = [[a, a], [a, b], [b, b], [b, a]];

    // [a, a] ----> [a, b]
    // ^                 |
    // |      (0, 0)     |
    // |                 v
    // [b, a] <---- [b, b]
    for (let i = 0; i < points.length; i++) {
        let startVettore = points[i];

        let endVettore;
        if (i == points.length - 1) {
            endVettore = points[0];
        } else {
            endVettore = points[i + 1];
        }

        // line(startVettore[0], startVettore[1], endVettore[0], endVettore[1]);

        // https://en.wikipedia.org/wiki/Rotation_matrix#In_two_dimensions

        // coordinate iniziali vettore ruotato (x1, y1)
        let x1 = startVettore[0] * cos(angle) - startVettore[1] * sin(angle);
        let y1 = startVettore[0] * sin(angle) + startVettore[1] * cos(angle);
        // coordinate finali vettore ruotato (x2, y2)
        let x2 = endVettore[0] * cos(angle) - endVettore[1] * sin(angle);
        let y2 = endVettore[0] * sin(angle) + endVettore[1] * cos(angle);

        // retta per 2 punti:
        // (x - x1) / (x2 - x1) = (y - y1) / (y2 - y1)

        // Se x1 è fuori dal margine sinistro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (x1 < contentMinX) {
            let x = contentMinX;
            let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
            x1 = x
            y1 = y
        }

        // Se x2 è fuori dal margine sinistro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (x2 < contentMinX) {
            let x = contentMinX;
            let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
            x2 = x
            y2 = y
        }

        // Se y1 è fuori dal margine superiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (y1 < contentMinY) {
            let y = contentMinY;
            let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
            x1 = x
            y1 = y
        }

        // Se y2 è fuori dal margine superiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (y2 < contentMinY) {
            let y = contentMinY;
            let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
            x2 = x
            y2 = y
        }

        // Se x1 è fuori dal margine destro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (x1 > contentMaxX) {
            let x = contentMaxX;
            let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
            x1 = x
            y1 = y
        }

        // Se x2 è fuori dal margine destro trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (x2 > contentMaxX) {
            let x = contentMaxX;
            let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
            x2 = x
            y2 = y
        }

        // Se y1 è fuori dal margine inferiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (y1 > contentMaxY) {
            let y = contentMaxY;
            let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
            x1 = x
            y1 = y
        }

        // Se y2 è fuori dal margine inferiore trovo un punto sulla retta x1y1 x2y2 che sia sul margine
        if (y2 > contentMaxY) {
            let y = contentMaxY;
            let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
            x2 = x
            y2 = y
        }

        point(x1, y1);
        point(x2, y2);
        line(x1, y1, x2, y2);
    }
    pop();
}

function isOutMarginX(x1, y1, x2, y2, centerUnit, contentMinX) {
    if (x1 < -centerUnit) {
        let x = 0 - centerUnit;
        let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
        x1 = x
        y1 = y
    }
    else if (x2 < contentMinX) {
        let x = contentMinX;
        let y = (x - x1) / (x2 - x1) * (y2 - y1) + y1;
        x2 = x
        y2 = y
    }
}
function isOutMarginY(x1, y1, x2, y2, contentMaxY) {
    if (y1 > contentMaxY) {
        let y = contentMaxY;
        let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        x1 = x
        y1 = y
    }
    if (y2 > contentMaxY) {
        let y = contentMaxY;
        let x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        x2 = x
        y2 = y
    }
}

