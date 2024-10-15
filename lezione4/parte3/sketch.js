
// LEZIONE 4 PARTE 2
let angle = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // degrees ; radians di default;
  angleMode(DEGREES);
}

function draw() {
  background("violet");
  text('Disegnare e ruotare una palla da basket :)',22,10);
  // palla basket
  fill(255, 165, 0);
  stroke(0);
  strokeWeight(3);
  // drawBasketBall(angle);
  // drawBasketBall(200,200,100);
  drawBasketBall(100,100,50);
  drawRotateBasketBall(200,200,100,angle)
  angle += 1;

}

// function nomeFunzione( < lista dei parametri > ) { corpo fuzione }

function drawRotateBasketBall(xCenter,yCenter,dBall, angle){
  push();
  translate(xCenter,yCenter);
  rotate(angle);
  drawBasketBall(0,0,dBall);
  pop();
}


//  DISEGNO PALLA
function drawBasketBall(xCenter,yCenter,dBall) {
  fill("orange");
  stroke(0);
  strokeWeight(3);
  circle(xCenter,yCenter,dBall);
  // translate(xCenter,yCenter);
  line(-dBall/2+xCenter,0+yCenter,dBall/2+xCenter,0+yCenter);
  line(-dBall/3+xCenter,-dBall/3+yCenter,dBall/3+xCenter,dBall/3+yCenter);
  line(-dBall/3+xCenter,dBall/3+yCenter,dBall/3+xCenter,-dBall/3+yCenter);
  line(xCenter,-dBall/2+yCenter,xCenter,dBall/2+yCenter);

}

