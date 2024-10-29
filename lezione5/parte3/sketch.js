// LEZIONE 5 pt 3
// sito bello: https://www.w3schools.com/js/js_type_conversion.asp

//  VISUALIZZAZIONE DEI DATI
// https://p5js.org/reference/p5/p5.Table/ 


let riversData;
let arrayOfNames = [];
let lunghezze = [];
function preload() {
  riversData = loadTable("../dataset/rivers-data-reduced.csv");
  // 10 righe - 1a riga = header tabella

}

function setup() {
  noLoop();
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // ci interessa solo la colonna dei nomi:
  // matrice = array di array --> indicizzabile
  // righe comprese tra [0,100]; 
  // colonne comprese tra [0,11];
  // nomi = col[1]
  for (let r = 1; r < riversData.getRowCount(); r++) {
    // accedere all'elelmento riversData[r][1];
    arrayOfNames[r] = riversData.get(r, 1);
    lunghezze.push(Number(riversData.get(r,3)));


  }
  // //per scorrere nell'interezza la tabella
  // for(let r=0; riversData.getRowCount(); r++){
  //   for(let c=0; riversData.getColumnCount(); c++){
  //     // x ogni riga
  //     // scorri ogni colonna
  //     riversData.get(r,c);
  //   }
  // }
}

function draw() {
  background("darkblue");
  fill("violet")
  // da: reference/p5/p5.Table
  textSize(40);
  text("Row Count: " + riversData.getRowCount(), windowWidth / 4, windowHeight / 2);
  text("Col Count: " + riversData.getColumnCount(), windowWidth / 4, windowHeight / 2 + 50);
  text(riversData.get(0, 3), 20, 350) // sta effettivamente leggendo la colonna lunghezze

  textSize(10);
  // // vorrei mostrare tutta la colonna
  // let yPos=20;
  // // riga = 0 --> header colonna --> parto da i = 1
  // for (let i = 1; i < arrayOfNames.length; i++){
  //   text(arrayOfNames[i], 100, yPos);
  //   yPos += 20
  // }


  // asse x e asse y
  // creare un lunchard ?? assi che fanno vedere gli elementi  per ogni fiume (x) con una lunghezza (y)
  let xMin = 40;
  let xMax = 390;
  let yMin = 20;
  let yMax = 200;
  stroke(155);
  strokeWeight(2);
  line(xMin, yMax, xMin, yMin);
  line(xMin, yMax, xMax, yMax);

  noStroke();
  fill("white")
  push() // salvo il contesto attuale
  //LABEL ASSE Y
  textSize(20);
  translate(20, 100)
  rotate(-90);
  text("Len", 10, 10);
  // asse x
  pop()
  textSize(20);
  text("river", 190, 220);

  // ridifiniire una scala di rappresentazione
  // FUNZIONE ---> MAP (riscalando la coordinata) 
  // https://p5js.org/examples/calculating-values-map/ 

  strokeWeight(5);
  stroke("white");
  // scorrere tutte le lunghezze + mostrarle sul grafico
  for (let i = 0; i < lunghezze.length; i++) {
    // map() --> value, intervallo iniziale, intervallo di destinazione
    // intervallo di iniziale: [0 --> lunghezze.length]
    // intervallo di destinazione: (xMin, 390)

    // let x = map(i,0, lunghezze.length, xMin, xMax);
    // let y = map(lunghezze[i], min(lunghezze), max(lunghezze),yMin, yMax);
    // sto assegnando a un array perchè anche se è una condiizone dinamica 
    // dobbiamo digli esplicitamente di aggiungere un elmeento a un array

    let x = map(i, 0, lunghezze.length, xMin, xMax);
    //intervallo di inizio 
    //intervallo di destinazione
    let y = map(lunghezze[i], min(lunghezze), max(lunghezze), yMax, yMin);
    
    point(x, y);
  }



}
