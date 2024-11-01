// Algorithmic Pen and Ink Gliph
// REFERENCE: mappe metropolitane: https://www.minniemuse.com/articles/musings/the-subway-map 
// Per ogni glifo:
// - linee che hanno un angolo variabile tra 0/45/90°
// - maggiore probabilità di passaggio verso il centro --> Prossimo punto + vicino passando per il centro
// - per ogni linea almeno due punti esterni e un punto vicino al centro

// Funzione BEGINSHAPE(): 
// https://p5js.org/reference/p5/beginShape/ 

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");

}
