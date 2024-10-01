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
  strokeWeight(0);
  rect(0, ysize / 2, xsize + 50, ysize / 2);


  // stelle
  stroke("yellow");
  strokeWeight(25);
  let x_star = xsize / 40;
  let y_star = ysize / 5;

  // testo
  fill("white");
  stroke(0);
  strokeWeight(2);
  textSize(xsize / 40);
  text("esercizio in classe", 15, 15);
  // luna
  stroke("yellow");
  strokeWeight(8);
  circle(355, 45, 80);

  // casette
  fill("white");
  strokeWeight(2);
  stroke("black");
  let w_house = 70;
  let h_house = 70;
  let x_house = 0;
  let y_house = ysize/2-h_house;
  rect(x_house, y_house, w_house, h_house);
  // tetto
  fill("red");
  triangle(x_house, y_house, x_house + w_house, y_house, x_house + (w_house) / 2, y_house / 2);
  for (let n_case = 0; n_case < 3; n_case++) {
    x_house = x_house + w_house * 1.5;
    fill("red");
    triangle(x_house, y_house, x_house + w_house, y_house, x_house + (w_house) / 2, y_house / 2);
    fill("white");
    rect(x_house, y_house, w_house, h_house);
  }

}
