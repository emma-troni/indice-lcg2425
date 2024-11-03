// ASSIGMENT 02 | Algorithmic Gliph generation
// REFERENCE --> mappe metropolitane: https://www.minniemuse.com/articles/musings/the-subway-map 
// Per ogni glifo:
// - linee che hanno un angolo variabile tra 0/45/90° --> creo una sottogriglia per ogni mappa 
//   per far si che le linee spezzate delle metro passino per i vertici di tale griglia
// - maggiore probabilità di passaggio verso il centro --> Prossimo punto + vicino passando per il centro
// - per ogni linea almeno due punti esterni e un punto vicino al centro


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    frameRate(0.5);
}

function draw() {
    background("white");
    // dim di scalate sulla base di quelle date:
    let scaleRatio = windowWidth / 1920;
    let maxUnitSize = 200;
    let unitSize = maxUnitSize * scaleRatio;
    // valore massimo del margine = 0.2% della larghezza della finestra
    let margin = windowWidth * 0.02;
    // dim contenuto
    let contentWidth = windowWidth - margin * 2;
    let contentHeight = windowHeight - margin * 2;
    
    // n max di colonne/righe si adatta in base allo spazio disponibile
    let nColumns = floor(contentWidth / unitSize);
    let nRows = floor(contentHeight / unitSize);
    
    // dim effettive della griglia
    let gridWidth = nColumns * unitSize;
    let gridHeight = nRows * unitSize;

    // centrare la griglia all'interno della finestra
    let contentX = (windowWidth - gridWidth) / 2;
    let contentY = (windowHeight - gridHeight) / 2;
    translate(contentX, contentY)

    // grid
    noFill();
    for (let r = 0; r < nRows; r++) {
        for (let c = 0; c < nColumns; c++) {
            push()
            translate(c * unitSize + unitSize / 2, r * unitSize  + unitSize / 2)
            translate(-unitSize / 2, -unitSize / 2)
            drawMap(unitSize, scaleRatio)
            pop()

        }
    }
}

function drawMap(unitSize, scaleRatio) {
    let gridSize = 10;
    // griglia 10x10 all'interno di ogni unità della griglia + grande
    let scaledStroke = 8 * scaleRatio;
    let unitSmallSize = unitSize / gridSize;
    let colors = ["blue", "red", "green", "orange", "hotpink"];
    let linesCount = floor(random(3, colors.length + 1))

    // voglio gestire la griglia di punti points per tenere traccia dei punti su cui sono già passata
    // points[x qualsiasi][y qualsiasi]=true
    // la matrice/array points[col][row] verrà impostat a true quando una fermata viene "visitata"
    let points = [];
    for (let row = 0; row < gridSize; row++) {
        let singlePoint = [];
        for (let col = 0; col < gridSize; col++) {
            singlePoint.push(false);
        }
        points.push(singlePoint);
    }


    for (let color = 0; color < linesCount; color++) {
        stroke(colors[color]);
        // lunghezza linea metro
        let [x, y] = [floor(random(3, 6)), floor(random(3, 6))];
        let stopsCount = floor(random(5, gridSize * scaleRatio))
        // scelgo il numero di iterazioni in base al numero dei colori
        for (let stop = 0; stop < stopsCount; stop++) {
            let nextX, nextY;
            // CICLO PER DEFINIRE LOGICA DELLE FERMATE 
            // continua a generare punti a caso finché non ne trova uno che rispetta le condizioni:
            // - nextX non deve uscire dalla griglia a sx/dx
            // - nextY non deve uscire dalla griglia in alto/basso   
            // - se la fermata già stata visitata, ha una probablità random<5% fermarsi anche su un punto visitato
            do {
                // floor(random (-1,2) --> -1,0,1 --> 8 pti + vicini nella griglia rispetto alla cella/pto precedente
                // - - -
                // - x -
                // - - -  
                nextX = x + floor(random(-1, 2));
                nextY = y + floor(random(-1, 2));

            } while (
                nextX < 0 || nextX >= gridSize ||
                nextY < 0 || nextY >= gridSize ||
                (points[nextX][nextY] && random() > 0.05)
            );
            strokeWeight(scaledStroke);
            line(x * unitSmallSize, y * unitSmallSize, nextX * unitSmallSize, nextY * unitSmallSize
            );
            // draw stop
            push()
            strokeWeight(1)
            fill("white")
            circle(x * unitSmallSize, y * unitSmallSize, scaledStroke, scaledStroke)
            circle(nextX * unitSmallSize, nextY * unitSmallSize, scaledStroke, scaledStroke)
            pop()
            points[x][y] = true;
            points[nextX][nextY] = true;
            x = nextX;
            y = nextY;
        }
    }
}




// https://p5js.org/reference/p5/resizeCanvas/ 
// resizeCanvas() immediately clears the canvas and calls redraw()
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}

