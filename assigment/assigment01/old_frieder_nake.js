// REFERENCE: https://www.tate.org.uk/art/artworks/nake-no-title-p80809
// no title, 1967, Frieder Nake

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    // dispongo i vari oggetti rispetto al loro centro
    rectMode(CENTER);
    angleMode(DEGREES);
}

function draw() {
    background("#e8e6e4");
    noStroke();

    let count = 14; // N Righe == N colonne
    
    // misurazioni dall'opera originale
    let testContentSize = 880;
    let testMarginSize = 260;
    let testStrokeSize = 9;

    // per ottenere le proporzioni indipendenti dal num di px
    // aspect ratio mi permette di ottenere delle proporzioni indipendenti dai pixel
    // che devono mantenersi rispettate

    // calcolo l'aspect ratio (larghezza / altezza):
    let marginContentRatio = testMarginSize / testContentSize;
    let strokeToContentRatio = testStrokeSize / testContentSize;

    // min(windowWidth, windowHeight) = (contentSize) + (contentSize * marginContentRatio * 2)
    let contentSize = min(windowWidth, windowHeight) / (marginContentRatio * 2 + 1);
    // unitSize = dimensione dell'unità della griglia di 14x14 (quadrato --> dimensione unica)
    let unitSize = contentSize / count;
    let marginX = (windowWidth - contentSize) / 2;
    let marginY = (windowHeight - contentSize) / 2;


    push();
    // calcolo le coordinate del centro della prima riga e colonna e imposto lì l'origine del disegno
    let centerX = marginX + unitSize / 2;
    let centerY = marginY + unitSize / 2;
    translate(centerX, centerY);

    //  aggiungo l'opacità direttamente nel codice colore
    let red = color(216, 81, 40, 180);
    let orange = color(217, 125, 19, 190);

    let yellow = color(236, 216, 27, 160);
    let gray = color(178, 178, 178, 150);

    // voglio rendere lo stroke degli elementi proporzionale alla dimensione del contenuto
    let strokeSize = contentSize * strokeToContentRatio;
    strokeWeight(strokeSize);
    noFill();

    for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
            // isSquare(col,row): per definire la parte dove disegnare gli elementi 
            if (isSquare(col, row)) {
                // in centro alla figura
                if (row >= -col + 6 && row < -col + 21) {
                    let choice = random(0,1);
                    // N rossi (23/54 -> 42.6%) 
                    // N arancioni (17/54 -> 31.5%) 
                    //  N gialli (12/54 -> 22.2%) 
                    //  N grigi (2/54 -> 3.7%)
                    if (choice < 0.426) {
                        stroke(red);
                    } else if (choice < (0.426 + 0.315)) {
                        stroke(orange);
                    } else if (choice <(0.426 + 0.315 + 0.222)) {
                        stroke(yellow);
                    } else {
                        stroke(gray);
                    }
                } else {
                    // nei due vertici (in alto dx e in basso sx)
                    // N rossi (15/30 -> 50%)
                    // N arancio (13/30 ->43.3%)
                    //  N gialli (2/30 -> 6.7%)
                    let choice = random();
                    if (choice < 0.50) {
                        stroke(red);
                    } else if (choice < (0.5 + 0.433)) {
                        stroke(orange);
                    } else {
                        stroke(yellow);
                    }
                }
                drawSquare(col, row, unitSize);
            }
        }
    }
    pop();

    // margini:
    fill("#e8e6e4");
    noStroke();

    rectMode(CORNER);
    rect(0, 0, marginX, windowHeight);
    rect(contentSize + marginX, 0, marginX, windowHeight);
    rect(0, 0, windowWidth, marginY);
    rect(0, conVtentSize + marginY, windowWidth, marginY);
}

// funzione che mi permette di verificare se la posizione degli elementi rientra nelle condizioni dell'opera
function isSquare(col, row) {
    // y = mx + q
    // m = 1:
    // row > col + q
    if (row >= col + 6) {
        // se rientra nella condizione
        // ritorna falso 
        return false;
    }
    if (row <= col - 6) {
        return false;
    }
    if (row >= -col + 6 && row < -col + 22) {
        // fascio di rette parallele pari:
        // row = col + q dove q deve essere pari
        if ((row - col) % 2 == 0) {
            return false;
        }
    }
    return true;
}

// semplice con rect
function drawSquare(col, row, unitSize) {
    // calcolo in che posizione sono (i-esima colonna, j-esima riga) posizionr dell'elem rispetto alla unitsize

    // componente y dell'unità della griglia di contentSize
    let unitX = col * unitSize;
    // componente y dell'unità della griglia di contentSize
    let unitY = row * unitSize;
    // dimensione randomica dei quadrati
    let squareSize = random(unitSize * 0.8, unitSize * 0.9);
    // curvatura angolo del 5% rispetto alla dimensione
    let radius = squareSize * 0.05;

    push();

    //traslo il centro degli oggetti  
    translate(unitX, unitY);
    let angle = random(0, 360);
    rotate(angle);

    rect(0, 0, squareSize, squareSize, radius);
    // punto visibile - vertice in alto/dx
    point(squareSize / 2, squareSize / 2);

    pop();
}




