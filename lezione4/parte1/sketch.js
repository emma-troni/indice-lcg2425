// LEZIONE 4 PARTE 1

function setup() {
  createCanvas(400, 400);
  // RECTMODE 
  // Modifies the location from which rectangles are drawn by changing the way in which parameters given to rect() are interpreted.
  rectMode(CENTER);
}

function draw() {
  background(220);
  strokeWeight(1);
  fill("violet");
  // trasla TUTTI gli oggetti in DRAWS -- sposta TUTTO il foglio
  // anche L'ORIGINE è TRASLATA
  // translate(100,100);
  translate(mouseX,mouseY);
  rect(50,50,100,50)
  fill("purple");
  rect(0,0,200,30);
  strokeWeight(5);
  point(0,0);
  point(50,50);
  
}
