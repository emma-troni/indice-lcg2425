// LEZIONE 5 PARTE 1

// ARRAYS
//    collezione di elementi
//    ordinata 
//    tecnicamente omogenea 
//    dinamica --> può cambiare le sue dimensioni a nostro piacimento
// INDICI ARRAY:
// 0 --> array.length() = N - 1

let arrayNum = [23, 100, 20, 77, 15, 11, 27];
let collectionParole = [
  "bello",
  "oop",
  "oplà",
  "collezioneDiParole"
];

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background("hotpink");
  fill(0);
  textSize(30);
  // è possibilevedere un elemento dopo l'altro di un array
  // METODO DI ITERAZIONE
  let ycoord = 50;
  for(let i=0; i < collectionParole.length ; i++){
    // (arrayNum[i] --> i-th elem of array
    text(collectionParole[i], 20, ycoord);
    ycoord = ycoord + 50;
  }
  //ellissi con dimensioni diverse
  //ellissi con dimensioni diverse
  noFill();
  for(let i=0; i < arrayNum.length; i++){
    //dato il valore del arrayNum[i]
    //creare un ellisse con dimensione basata su lui
    ellipse(50*i+50, 300, arrayNum[i], arrayNum[i]);
    stroke("blue");
  }
}
