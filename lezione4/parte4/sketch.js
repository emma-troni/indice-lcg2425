
// LEZIONE 4 - PARTE 4 
// growing moon

let canvasXMax = 400, canvasYMax = 400;
let moonXpos = 255;
let moonYpos = 50;
let phase = 50;
let diametro = 100;

function setup() {
  createCanvas(canvasXMax, canvasYMax);
}


function draw() {
  background("navy");
  //moon
  colorMode(RGB);

  // FUNZIONE DISEGNO LUNA
  drawMoon(50, 100, 100, 5)
  drawMoon(moonXpos, moonYpos, 100, phase)



  stroke(0);//black outline
  strokeWeight(1);//outline thickness
  fill("green");
  let y = 300;
  rect(0, y, canvasXMax, y);
  stroke(0);//black outline
  strokeWeight(1);//outline thickness
  let x_casa = 0;
  let house_height = 100, house_width = 100;
  for (let numero_case = 0; numero_case < 3; numero_case++) {
    fill("white");
    rect(x_casa, y - house_height, house_width, house_height);
    fill("red");
    let roof_height = 80;
    triangle(x_casa, y - house_height, x_casa + house_width, y - house_height, x_casa + (house_width / 2), y - house_height - roof_height);
    x_casa += house_width + 30;
  }
  //displays the x and y position of the mouse on the canvas
  stroke("white");
  strokeWeight(1);
  fill(255);//white text
  textSize(50)

  // delimita i confini con l'operatore modulo
  moonXpos = (moonXpos + 1) % canvasXMax;
  phase = phase +0.2;
  if (phase>diametro) {
    phase = -diametro;
  }
}

//--------DISEGNO + TRASLAZIONE LUNA------------
function drawMoon(xMoon, yMoon, dMoon, phase) {
   // traslazione luna 
    // momento in cui luna è "piena" --> cerchio blu a dx
    // spostare cerchio blu a sx --> velocità !=
  push();
  // disegno luna
  fill(255, 255, 0, 200);
  stroke(255, 255, 255, 100)
  strokeWeight(10); //large outline
  circle(xMoon, yMoon, dMoon)
  //overlappin circle 
  // traslazione di una certa fase in orizzontale
  translate(phase,0)
  stroke("navy");
  fill("navy");
  circle(xMoon, yMoon, dMoon);
  pop();
    
}

