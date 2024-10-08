let canvasXMax = 600;
let canvasYMax = 600;

function setup() {
  createCanvas(canvasXMax, canvasYMax);
  // per creare il background una sola volta
  background("hotPink");
}

function draw() {

  // funzione draw è ADDIZIONALE --> aggiungo backround + scritta per fare l'animazione
  // funzione background interno alla funzione draw 
  // in modo da aggiungere ogni volta che disegno 
  // per fare in modo che non si sovrappongano le scritte
  // concatenare delle variabili es. mauseX con un pezzo di testo
  
  // textSize(20);
  // strokeWeight(0);
  // let FirstString = "Mouse x = " + mouseX + ";";
  // let SecondString = "Mouse y = " + mouseY + ";";
  // fill("white");
  // text(FirstString, 20, 40);
  // text(SecondString, 20, 60);


  // linea che segue la posizione del mouse
  strokeWeight(1);
  line(0, mouseX, canvasXMax, mouseY);


  // FEEDBACK PRESS MOUSE
  // disegnare linea giallla se schiacciamo mouse
  // p5 -> true   --> se mouse schiacciato
  //    -> false  --> altrimenti
  if (mouseIsPressed == true) {
    // LEFT, RIGHTm CENTRAL
    if (mouseButton == RIGHT) {
      background("hotpink");
    }
    stroke("yellow");
  } else {
    stroke("white");
  }


}
