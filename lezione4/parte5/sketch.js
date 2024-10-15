// LEZIONE 4 PARTE 5
// creazione di un bottone

let button;
let elem;
let dice = 0; 
function setup() {
  elem = createElement("h2","Keep Rolling")
  elem.position(0,0);
  createCanvas(400, 400);

  // BOTTONE
  button = createButton("roll the dice");
  button.position(150,150);

  // quando mouse schiacciato --> roll dice
  button.mousePressed(rollDice);
}

function draw() {
  background(220);
  stroke("white");
  strokeWeight(2);
  fill("white");
  textSize(30);
  text("Dice value: "+ dice, 5, 300);
}

function rollDice(){
  dice = random(1,6);
  // SOLO N INTERI 
  dice = floor(dice); 
  // floor(dice) --> per DIFETTO
  // ceil(dice) --> per ECCESSO
}