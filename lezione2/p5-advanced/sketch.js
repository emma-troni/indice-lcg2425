// popolare il cielo di stelle con algoritmo
let xsize = 400;
let ysize = 400;


function setup() {
  createCanvas(xsize, ysize);
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
  // Prato
  fill("green");
  stroke("darkgreen");
  strokeWeight(5);
  rect(0,ysize/2,xsize+50,ysize/2);


  // stelle
  stroke("yellow");
  strokeWeight(25);
  let x_star = xsize/40;
  let y_star = ysize/5;
  // point(x_star+20,x_star+10);
  // point(x_star*2,ysize/4);
  point(x_star,y_star);
  let passo = 3;
  // struttura ciclo for: i=i+passo è l'aggiornamento alla fine del ciclo for
  // for (init; test; update) {corpo}
  for (let i=0; i<50; i= i+passo) {
    strokeWeight(i*2);
    if(i%2==0){
      // numeri pari
      // corpo di ramo vero
      stroke("pink");
    }else{
      // corpo di ramo false
      stroke("yellow");
    }

    point(x_star*i,y_star+i);
    
  }



  // testo
  fill("white");
  stroke(0);
  strokeWeight(2);
  textSize(xsize/20);
  text("C'era una volta...", xsize/40,ysize*0.1);
  // luna
  stroke("black");  
  strokeWeight(1);
  circle(xsize*0.5,ysize/4,xsize*0.2);
}
