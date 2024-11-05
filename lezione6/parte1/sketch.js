// LEZIONE 6 pt 1
// sito bello: https://www.w3schools.com/js/js_type_conversion.asp

//  VISUALIZZAZIONE DEI DATI
// https://p5js.org/reference/p5/p5.Table/ 


let riversData;
let arrayOfNames = [];
let lunghezze = [];
let arrayObjects = [];

// collegamenti tra nomi/lunghezze
// --> OGGETTI --> object <key, value>
let objectTest = {
  name: "pippo",
  lunghezza: 10
};

function preload() {
  riversData = loadTable("../dataset/rivers-data-reduced.csv");
  // 10 righe - 1a riga = header tabella

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //fissare indice di colonna a 1
  //scorrere le righe
  for (let r = 1; r < riversData.getRowCount(); r++) {
    //acceder all'elemento r,1
    //salvare il nome nell'aray
    arrayOfNames[r] = riversData.get(r, 1);
    lunghezze.push(Number(riversData.get(r, 3)));
    //creare un obj che ci imponga il vincolo nome, lunghezza
    let tmp = { name: riversData.get(r, 1), lunghezza: riversData.get(r, 3) };
    arrayObjects.push(tmp);
    //0 --> nome,lung di riga 1;
    //1 --> nome, lung di riga 2...
  }
  //array può essere ordinato in questo modo
  lunghezze.sort();
  // array --> collezione di oggetti 
  arrayObjects.sort((a, b) => b.lunghezza-a.lunghezza);
  noLoop();
  // ordinare in maniera decrescente
  lunghezze.sort( (a,b) => b - a );
  angleMode(DEGREES);
}

function draw() {
  background(220);
  textSize(50);
  textSize(10);
  //asse x e asse y
  stroke(155);
  strokeWeight(2);
  let xMin = 40;
  let xMax = 390;
  let yMin = 20;
  let yMax = 200;
  //asse y, fissata una x variato y
  line(xMin, yMax, xMin, yMin);
  //asse x
  line(xMin, yMax, xMax, yMax);
  //aggiungere label asse y
  //label ruotata
  push();
  noStroke();
  textSize(20);
  translate(20, 100);
  rotate(-90);
  text("Len", 0, 0);
  pop();

  //aggiungere label asse x
  noStroke();
  textSize(20);
  text("River", 150, 220);

  strokeWeight(10);
  stroke(0);
  for (let i = 0; i < arrayObjects.length; i++) {
    //intervallo destinazione (xMin, xMax)
    let x = map(i, 0, arrayObjects.length, xMin + 5, xMax);
    //intervallo di inizio 
    //intervallo di destinazione
    let y = map(arrayObjects[i].lunghezza, min(lunghezze), max(lunghezze), yMax, yMin);
    // noStroke();
    // text(y,x,x);
    push()
    translate(x, y + 25);
    rotate(30);
    strokeWeight(1);
    textSize(15);
    text(arrayObjects[i].name, 0, 0);
    pop();
    // strokeWeight(10);
    point(x, y);
  }

}
