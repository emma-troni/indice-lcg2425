
// LEZIONE 4 PARTE 2
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  // degrees ; radians di default;
  angleMode(DEGREES);
}

function draw() {
  background("pink");
  // PUSH e POP creare MULTIPLI ANCHOR POINTS per trasformazioni isolate (delimita il contesto di trasformazione)
    // PUSH() --> INIZIO - salva contesto
    // POP()  --> FINE - ripristina l'anchor point 
  strokeWeight(1);
  fill("violet");
  // ruotare rettangolo 
  push()
  rotate(angle*0.5);
  rect(50,50,100,50);
  pop();
  fill("purple");
  rect(0,0,200,30);
  strokeWeight(5);
  point(0,0);

  // TUTTE LE TRASFORMAZIONI SONO ADDITIVE
  // RUOTARE SOLO UN OGGETTO --- rotazione applicata dopo la linea di codice
  push();
  translate(200,200);
  rotate(angle);
  circle(0,0,100);
  //  d = 100 --> r=50
  line(0,-50,0,50);
  pop();
  rect(50,50,100,50);
  point(50,50);
  angle = angle + 2;
  
}
