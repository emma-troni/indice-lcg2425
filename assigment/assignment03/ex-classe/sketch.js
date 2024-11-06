// ====== ESEMPIO ASSIGNMENT 03 =======
// REFERENCE: https://www.behance.net/gallery/99114047/Population-Density 

let data;
let dataObj;
let circleSize = 130;
let padding = 20;

// colori
let pageColor = "#EDEDED";
let circleColor = "black";
let textColor = "black";
let dotColor = "white";
// p5 - non esistono gradienti --> librerie già esistenti
// https://alexandru-postolache.github.io/p5.colorGenerator/demo/ 
color = ["#FF0802", "#FFCDCD", "#FF989C", "#FF6666"," #FF3833"] // gradiente giallo

function preload() {
  // loadTable()
  // https://p5js.org/reference/p5/loadTable/
  // per verificare che i dati vengono caricati bene
  // loadtable --> 3 parametri
  //    1. percorso
  //    2. formato file
  //    3. header
  data = loadTable("assets/data.csv", "csv", "header");
  // funzinoe preload carica csv - fa operazione - mettilo dentro data - dopo chiama setup
}

function setup() {
  // dimensione glifo = circleSize
  let totalWidth = (circleSize * data.getRowCount()) + (padding * (1 + data.getRowCount()));

  createCanvas(totalWidth, windowHeight);
  background(pageColor);

  // .getObject()
  // https://p5js.org/reference/p5.Table/getObject/
  dataObj = data.getObject();
  // crea un oggetto più comodo per la gestione di data visualization
  // estrai l'oggetto = dammi i dati in forma di oggetto
  // console.log(dataObj);
  let xPos = padding + circleSize / 2;
  let yPos = windowHeight / 2;

  // ciclo for per disegnare un glifo per ogni riga
  // https://p5js.org/reference/p5.Table/getColumnCount/
  // https://p5js.org/reference/p5.Table/getRowCount/ 
  for (let row = 0; row < data.getRowCount(); row++) {
    //carico i dati della riga
    let item = dataObj[row];
    // disegno glifos
    drawGlyph(xPos, yPos, circleSize, item);
    xPos = xPos + padding + circleSize;
  }
}

function draw() { }

function drawGlyph(x, y, size, rowData) {

  //disegno il cerchio rosso per la popolazione
  let popMax= 1439; // da dataset - bisognerebbe cercare una funzione che trova il valore masssimo
  let popSize = map(rowData.population, 0, popMax, 0, size);
  // https://p5js.org/reference/p5/map/ --> Re-maps a number from one range to another.
  noStroke();
  fill("red");
  // a cazzo di cane
  ellipse(x+size/4, y+size/2, popSize, popSize);

  //disegno sfondo
  fill(circleColor);
  ellipse(x, y, size, size);
  //scrivo il nome
  fill(textColor);

  textAlign(CENTER, CENTER);
  textSize(16);
  text(rowData.country, x, y + size / 2 + 20);

  for (let j = 0; j < rowData.density; j++) {
    //disegna pallini
    fill(dotColor);

    // creo angolo casuale
    let angle = random(TWO_PI);
    let r = random(size / 2);

    push();
    //mi pongo al centro del glifo
    translate(x, y);
    //ruoto in base alla variabile angle
    rotate(angle);
    // //mi sposto in funzione del raggio
    // posso crare pallini casuali all'interno del mio glifo
    ellipse(r, 0, 3, 3);
    //ripristino assi
    pop();
    // al momento n pallini vicini al centro > margini --> radici? probabilità?
  }
}