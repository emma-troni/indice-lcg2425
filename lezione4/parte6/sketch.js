// LEZIONE 4 PARTE 6 

let button;
let elem;
let dice = 1;

// ARRAY
// collezione ordinata di elementi
let numbers = [ 1, 2, 5, 79];
// per accedere usare idx, 4 elementi
// numbers[0]--> 1, numbers[1]--> 2, numbers[2]--> 5, numbers[3] -->79.
// #elem = 4, 0 -- #elem -1, 0-->3
let colors = [ "red", "green", "pink", "blue", "orange", "yellow" ];
// #elem=6, 0 --> #elem-1=5
// colors[0]-->red; colors[3]-->blue...



function setup() {
  elem = createElement( "h2", "Keep rolling");
  elem.position(0, 0);
  createCanvas(400, 400);
  button = createButton("roll the dice");
  button.position(200, 200);
  button.mousePressed(rollDice);
}

function draw() {
  background("violet");
  stroke("pink");
  strokeWeight(2);
  //corrispondore 
  // 1 --> rosso
  // 2 --> verde
  // 4 --> blu
  // 5 --> arancione
  // 6 --> giallo
  // if ( dice == 1 ) {
  //   color = "red";
  // } else if (dice == 2){
  //   color = "green";
  // } else if (dice==3) {
  //   color = "blu";
  // }
  let color = colors[dice-1];
  fill(color);
  textSize(30);
  text("Dice value "+ dice, 5, 300);
}

function rollDice(){
  dice = random(1,6);
  //vogliamo solo numeri interi
  //intero inferiore, 1.1 --> 1
  // dice = floor(dice);
  //intero superiore, 1.1 --> 2
  dice = ceil(dice);
}