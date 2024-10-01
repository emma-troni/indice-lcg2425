function setup() {
  createCanvas(400, 400);
}

// esiste solamente una sola funzione una nel codice
// PRIMA COLORE POI FORMA RELATIVA!!
//    1. background
//    2. colore
//    3. stroke
//    4. forma


function draw() {
  background("darkblue");
  fill("lightyellow");
  stroke("black");  
  strokeWeight(1);
  circle(190,100,80);
  // dobbiamo cambiare i parametri di fill e stroke prima di poter modificare il rect
  fill("green");
  stroke("darkgreen");
  strokeWeight(5);
  rect(0,200,450,200);
  // testo
  fill("white");
  stroke(0);
  strokeWeight(2);
  textSize(20);
  text("C'era una volta...", 10,30);
}




