// ASSIGMENT 02 | Algorithmic Gliph generation
// REFERENCE --> mappe metropolitane: https://www.minniemuse.com/articles/musings/the-subway-map 
// Per ogni glifo:
// - linee che hanno un angolo variabile tra 0/45/90° --> creo una sottogriglia per ogni mappa per far si che le linee spezzate delle metro passino per i vertici di tale griglia
// - maggiore probabilità di passaggio verso il centro --> Prossimo punto + vicino passando per il centro
// - per ogni linea almeno due punti esterni e un punto vicino al centro

let colors = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    noLoop();
    colors = [
        'red', 'blue', 'orange'
    ];
}

function draw() {
    background("white");

    // calcolo il fattore di scala in base alla dimensione attuale della finestra rispetto alla dimensione massima
    let maxWindowWidth = 1920;
    let scaleFactor = windowWidth / maxWindowWidth;
    // dimensinoe della cella rispetto al fattore di scala
    let maxCellSize = 200;
    let cellSize = maxCellSize * scaleFactor;
    // margine proporzionale alla finestra
    // pvalore massimo del margine = 5% della larghezza della finestra
    let maxMarginRatio = 0.02;
    let margin = windowWidth * maxMarginRatio;

    // calcolo le dimensioni del contenuto in base alla finestra e al margine
    let contentWidth = windowWidth - margin * 2;
    let contentHeight = windowHeight - margin * 2;

    // n max di colonne/righe si adatta in base allo spazio disponibile
    let nColumns = floor(contentWidth / cellSize);
    let nRows = floor(contentHeight / cellSize);

    // larghezza e altezza effettive della griglia
    let gridWidth = nColumns * cellSize;
    let gridHeight = nRows * cellSize;

    // centrare la griglia all'interno della finestra
    // translate(margin,margin)
    // calcolo le distanze per 
    let contentX = (windowWidth - gridWidth) / 2;
    let contentY = (windowHeight - gridHeight) / 2;
    translate(contentX, contentY)
    // ------------ perchè non funziona con margin????

    // disegno il content x testare che sia tutto corretto
    // fill("pink");
    // noStroke();
    // rect(0, 0, gridWidth, gridHeight); 

    // grid
    noFill();
    stroke("black");
    for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nColumns; c++) {
            let x = c * cellSize;
            let y = r * cellSize;
            push()
            translate(x, y)
            strokeWeight(1);
            // rect(0, 0, cellSize, cellSize);
            drawMap(cellSize)
            pop()

        }
    }
}

function drawMap(cellSize) {
    // griglia 10x10 all'interno di ogni cella
    strokeWeight(1);
    let subCellSize = cellSize / 10;
    let points = [];
    for (let x = 0; x < 10; x++) {
        let colPoints = [];
        for (let y = 0; y < 10; y++) {
            colPoints.push(false);
            // let subX = y * subCellSize;
            // let subY = x * subCellSize;
        }
        points.push(colPoints);
    }
    console.log(points);
    for (let i = 0; i < colors.length; i++) {
        stroke(colors[i]);
        let linePoints = [
            [floor(random(0, 10)) * subCellSize, floor(random(0, 10)) * subCellSize],
            [floor(random(4, 6)) * subCellSize, floor(random(4, 6)) * subCellSize],
            [floor(random(0, 10)) * subCellSize, floor(random(0, 10)) * subCellSize]
        ];
        for (let j = 0; j < linePoints.length - 1; j++) {
            line(linePoints[j][0], linePoints[j][1], linePoints[j + 1][0], linePoints[j + 1][1]);
        }
    }
}




// https://p5js.org/reference/p5/resizeCanvas/ 
// resizeCanvas() immediately clears the canvas and calls redraw()
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}
