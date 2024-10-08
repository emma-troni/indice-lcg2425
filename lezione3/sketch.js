let canvasXMax = 400;
let canvasYMax = 400;

function setup() {
  createCanvas(canvasXMax, canvasYMax);
  // per creare il background una sola volta
  // background(219, 90, 211);
}

function draw() {

  // funzione draw è ADDIZIONALE --> aggiungo backround + scritta per fare l'animazione
  // funzione background interno alla funzione draw in modo da aggiungere
  background(219, 90, 211);
  // concatenare delle variabili es. mauseX con un pezzo di testo
  textSize(20);
  let stringToPrint = "Mouse x = " + mouseX + ";    "+"Mouse y = " + mouseY+";";
  text(stringToPrint, 20, 20);

  

}
