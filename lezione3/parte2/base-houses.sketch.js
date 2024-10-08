let canvasXMax = 400, canvasYMax = 400;
let moonXpos = 255;
let moonYpos = 50;
let slider;
function setup() {
  createCanvas(canvasXMax, canvasYMax);
  slider = createSlider(0,255,0,1);
  // createSlider( minimo, massimo, default, step );
  slider.position(0,canvasYMax-60);
  slider.size(200);
}

// OBIETTIVO 
// --> animare la luna verso dx
//    variabile che definisce la coordinata x della luna si aggiorni 

function draw() {
  background("blue");

  // FRAME RATE
  //   --> con quale frequenza si aggiorna il nostro disegno
  frameRate(5);


  //moon
  colorMode(RGB);
  fill(255, 255, 200);
  stroke(255, 255, 255, 100)
  strokeWeight(10); //large outline
  circle(moonXpos, 50, 100)


  // // ANIMAZIONE DELLA LUNA
  // animazione semplice ma non ricomincia:
  // moonXpos = moonXpos + 1;


  // // METODO AGGIORNAMENTO 1
  // se la luna esce dai bordi:
  // if (usciamo dal forlio ==> moonX>canvasXMax) {ripartiamo da moonXpos=0}
  // if (moonXpos > canvasXMax) {
  //   moonXpos = 0;
  // } else {
  //   moonXpos = moonXpos + 1;
  // }


  // METODO AGGIORNAMENTO 2
  //  frameCount --> x+=1 per ogni frame disegnato
  moonXpos = frameCount;
  // modulo % 
  // ==> da il resto della divisione intera
  //     utile per valutare se pari o dispari


  // per disaccoppiare le velocità di aggiornamento aggiungiamo un fattore 
  moonXpos = (frameCount * 5 + 700) % canvasXMax;


  // 1 % 400 --> 1 / 400 = 0 , resto = 1
  // 2 % 400 --> 2 / 400 = 0 , resto = 2
  // numero % 2 --> 0;

  //overlappin circle
  stroke("hotpink");
  fill("hotpink");
  circle(moonXpos + 50, 50, 100);
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


  //  ROLLOVER --> agiamo se passimo sopra
  // if (passiamo sopra) {facciamo cose}
  // siamo dentro le x della casa?
  // mouseX > x_casa
  // mouseX < x_casa + house_width
  // siamo dentro le y della cosa?
  // mouseY > left_corner
  // mouseY < left_corner + house_whidth

  // AND --------> && ---> entrambe true
  // OR  --------> || ---> almeno una sia vera

  // NB la variabile x_casa è stata cambiata nel ciclo for:
  x_casa = 0

  let left_Corner = y - house_height;
  let sliderValue = slider.value()
  if ((mouseX > x_casa) && (mouseX < x_casa+house_width) && (mouseY > left_Corner) && (mouseY < left_Corner + house_width)){
    fill(sliderValue);
    rect(x_casa, y - house_height, house_width, house_height);
  } 


  // RANDOM STARS
  // voglio disegnare stelle random
  // per ripetere una certa operazione --> for
  // x = x + 1 
  // x += 1
  // x ++
  let xStar = 0;
  let yStar = 0;
  // generare 5 stelle
  for (let nStars = 0; nStars < 5; nStars++) {
    stroke(random(0, 555), random(0, 555), random(0, 555));
    strokeWeight(random(10, 40));
    point(xStar, yStar);
    // generare numeri randomici
    xStar = random(0, canvasXMax);
    yStar = random(0, canvasYMax / 2);
  }


  // SE VOGLIAMO FERMARE L'ANIMAZIONE
  // if (frameCount == 50) {
  //   noLoop();
  // }

  //displays the x and y position of the mouse on the canvas
  stroke("white");
  strokeWeight(1);
  fill(255);//white text
  textSize(20);
  text(`Frame-Count = ${frameCount}  Value= ${sliderValue}`, 5, 380);
}
