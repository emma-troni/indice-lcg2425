// ====== ASSIGNMENT 03 =======
// DATASET: https://docs.google.com/spreadsheets/d/1E3mbwhm85jmDY4q7yUmgg19AvuyPo4ttUwY7ex8tMIg/edit?gid=0#gid=0 

// Circle Packing Diagram
//    It displays values of leaf nodes of a hierarchical structure by using circles areas: continent, name
//    The hierarchical structure is depicted using nested circles. 
//    A further quantitative dimension with size and a quantitative or categorical dimension (lenght) with color (avg_temp).
// var globali
let riversData;
let table;
let nRivers;
let minRiverSize = 1;
let maxRiverSize = 30;
let maxLength;
let minLength;
let minTemp;
let maxTemp;
let scaleFactor;
let continents = ["Africa", "Asia", "Australia", "Europe", "North America", "Oceania", "South America"];
let paddingContinentName = 15;
let distContinentsFactor = 3.5;

// COLORI 
let continentColor = "grey";
let bgColor = [13, 15, 23];
let txtColor = "white";
let tempColor = [[218, 225, 250], [23, 92, 230]];
//              [[ minTemp rgb ],[ maxTemp rgb ]]


function preload() {
  riversData = loadTable("data/rivers.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  table = riversData.getObject();
  nRivers = riversData.getRowCount();

  // min max lenght/min_temp:
  minLength = Number(table[0].length);
  maxLength = Number(table[0].length);
  minTemp = Number(table[0].min_temp);
  maxTemp = Number(table[0].min_temp);
  for (let i = 1; i < nRivers; i++) {
    let lengthValue = Number(table[i].length);
    if (lengthValue < minLength) {
      minLength = lengthValue;
    }
    if (lengthValue > maxLength) {
      maxLength = lengthValue;
    }
    let tempValue = Number(table[i].min_temp);
    if (tempValue < minTemp) {
      minTemp = tempValue;
    }
    if (tempValue > maxTemp) {
      maxTemp = tempValue;
    }
  }
  // console.log(minTemp)
  // console.log(maxTemp)
}

function draw() {
  background(bgColor);
  // HEADER
  textSize(20);
  textAlign(CENTER, TOP);
  push()
  textStyle(BOLD);
  fill(txtColor);
  text("Rivers in the World", width / 2, 30);
  pop()

  scaleFactor = min(windowWidth, windowHeight) / 1000;

  // CONTINENTI e FIUMI
  let distContinents = min(windowWidth, windowHeight) / distContinentsFactor;
  let positions = continentPos(continents.length, width / 2, height / 2 - height / 20, distContinents);
  // disegno ogni continente con i fiumi interni
  for (let i = 0; i < continents.length; i++) {
    let continent = continents[i];
    let x = positions[i][0];
    let y = positions[i][1];
    drawContinent(x, y, continent);
  }
  drawLegend()
}


// POSIZIONO CONTINENTI ogni cerchio equidistante ad esso lungo una circonferenza
function continentPos(num, centerContentX, centerContentY, distContinents) {
  let positions = [];
  let angleStep = TWO_PI / num;
  for (let i = 0; i < num; i++) {
    let angle = i * angleStep;
    let x = centerContentX + cos(angle) * distContinents;
    let y = centerContentY + sin(angle) * distContinents;
    positions.push([x, y]);
  }
  return positions;
}

// CONTINENTI
function drawContinent(x, y, continent) {
  // valuto la dimensione del cerchio a seconda del n di fiumi presenti:
  let radius = continentSize(continent);
  noFill();
  stroke(continentColor);
  strokeWeight(2);
  circle(x, y, radius * 2);
  // DISEGNO FIUMI INTERNI AI CONTINENTI
  drawRivers(x, y, radius, continent);

  // nome del continente sopra il cerchio
  let textOffsetY = radius + paddingContinentName;
  fill(txtColor);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(continent, x, y - textOffsetY); // Posiziona il testo sopra il cerchio

}

// DIM CONTINENTE proporzionale al n di fiumi al suo interno
function continentSize(continent) {
  let riversPerContinent = [];
  for (let i = 0; i < nRivers; i++) {
    if (table[i].continent === continent) {
      riversPerContinent.push(table[i]);
    }
  }
  // CIRCLE PACKING THEORY
  // https://mathworld.wolfram.com/CirclePacking.html, https://en.wikipedia.org/wiki/Circle_packing 
  // a causa della natura casuale del posizionamento dei fiumi all'interno del cerchio dei continenti
  // e del fatto che tali fiumi non possono sovrapporsi 
  // è praticamente impossibile ottenere un "perfect packing"
  // L'efficienza massima teorica del circle packing in un cerchio più grande 
  // è circa del: 0.9069 (costante di Apollonio)

  // calcolo l'area TEORICA necessaria 
  let theoryArea = 0;
  for (let i = 0; i < riversPerContinent.length; i++) {
    let numRivers = riversPerContinent[i].length;
    // proporzione dimensione cerchio rispetto alla dimensione relativa a Lenght di ciascun fiume
    let riverSize = map(numRivers, minLength, maxLength, minRiverSize, maxRiverSize);
    // area = PI*(raggio**2)
    theoryArea += PI * (riverSize / 2) ** 2;
  }
  // raggio TEORICO
  let theoryRadius = sqrt(theoryArea / PI);

  // fattore di compensazione per:
  // 1. inefficienza del circle packing (circa 10% = C appollonio)
  // 2. spazio extra per facilitare il posizionamento
  let packingInefficiencyFactor = 1.1;
  let extraPadding = 20;

  let finalRadius = (theoryRadius * packingInefficiencyFactor) + extraPadding;

  return finalRadius;
}

// FIUMI
function drawRivers(centerX, centerY, maxRadius, continent) {
  // counter per i cerchi effettivamente disegnati
  // let successfullyPlacedCircles = 0;
  // let totalAttemptedCircles = 0;

  // VALUTO i fiumi contenuti nel continente che sto analizzando
  let rivers = [];
  for (let i = 0; i < nRivers; i++) {
    if (table[i].continent === continent) {
      rivers.push(table[i]);
    }
  }
  // console.log(`Cerco di disengare ${rivers.length} fiumi per ${continent}`);
  // DISEGNO i cerchi dei fiumi
  let placedCircles = [];
  for (let i = 0; i < rivers.length; i++) {
    let length = rivers[i].length;
    let riverSize = map(length, minLength, maxLength, minRiverSize, maxRiverSize);
    // totalAttemptedCircles++;

    let attempts = 0;
    let maxAttempts = nRivers * 10;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
      let angle = random(0, TWO_PI);
      let distance = random(0, maxRadius - riverSize / 2);
      let x = centerX + cos(angle) * distance;
      let y = centerY + sin(angle) * distance;

      if (!isOverlapping(x, y, riverSize / 2, placedCircles)) {
        placedCircles.push({
          x: x,
          y: y,
          r: riverSize / 2,
          river: rivers[i].name,
          continent: continent
        });

        let riverColor = getColorByTemperature(rivers[i].min_temp);
        fill(riverColor);
        noStroke();
        circle(x, y, riverSize);

        placed = true;
        // successfullyPlacedCircles++;
      }
      attempts++;
    }
  // log per verifica 
    if (!placed) {
      console.warn(`fallito di inserire ${rivers[i].name} in ${continent} dopo ${maxAttempts} attempts`);
    }
  }
}

// MOUSE OVER -- https://openprocessing.org/sketch/1028248/ reference code
function mouseIsHovered(x, y, radius) {
  return dist(mouseX, mouseY, x, y) < radius;
}

// VERIFICA se un nuovo cerchio si sovrappone a uno degli altri cerchi già esistenti. 
function isOverlapping(x, y, radius, circles) {
  // circles = {x: ..., y: ..., r: ...}
  for (let i = 0; i < circles.length; i++) {
    let other = circles[i];
    // dist() -- https://p5js.org/reference/p5/dist/
    // calcolala distanza tra il centro del nuovo cerchio (x, y) e il centro del cerchio esistente (other.x, other.y)
    let d = dist(x, y, other.x, other.y);
    // se distanza tra i due centri < somma dei due raggi => il nuovo cerchio si sovrappone
    if (d < radius + other.r) {
      return true;
    }
  }
  return false;
}

// COLORE FIUMI
function getColorByTemperature(temperature) {
  // proporzione: brightness = (temperature - minTemp)/(maxTemp-MinTemp)

  let brightness = map(temperature, minTemp, maxTemp, 0, 1);
  // lerp(a,b,t) --> https://p5js.org/reference/p5/lerp/ 
  // calcola un valore tra due numeri (a,b) dato uno specifico incremento (t)
  let r = lerp(tempColor[0][0], tempColor[1][0], brightness);
  let g = lerp(tempColor[0][1], tempColor[1][1], brightness);
  let b = lerp(tempColor[0][2], tempColor[1][2], brightness);
  return color(r, g, b);
}

// LEGENDA
function drawLegend() {
  let legendX = width / 2;
  let legendY = height - height / 9;
  let paddingY = 20 * scaleFactor;
  let paddingX = 100 * scaleFactor;
  let gradWidth = 130 * scaleFactor;
  let gradHeight = 10 * scaleFactor;

  push();
  translate(legendX, legendY);

  // titolo legenda
  fill(txtColor);
  textSize(16 * scaleFactor);
  textStyle(BOLD)
  textAlign(CENTER, TOP);
  text("Legenda", 0, -paddingY * 2);

  // TEMPERATURA
  // LINEAR GRADIENT
  // video tutorial https://www.youtube.com/watch?v=-MUOweQ6wac
  // reference code: https://github.com/Creativeguru97/YouTube_tutorial/blob/master/p5_hacks/Gradient_effect/linear_gradient/sketch.js 
  noStroke();
  let gradX1 = -paddingX * 2;  // Posizione del gradiente
  let gradY1 = paddingY;  // Altezza relativa
  let gradX2 = gradX1 + gradWidth;
  let gradY2 = gradY1;
  textSize(12 * scaleFactor);
  textStyle(NORMAL)
  textAlign(LEFT, CENTER);
  text("Minimum Temperature Range", -paddingX * 2.4, 0);
  let gradient = drawingContext.createLinearGradient(gradX1, gradY1, gradX2, gradY2);
  gradient.addColorStop(0, getColorByTemperature(minTemp));
  gradient.addColorStop(1, getColorByTemperature(maxTemp));

  drawingContext.fillStyle = gradient;
  rect(gradX1, gradY1, gradWidth, gradHeight);

  fill(txtColor);
  textAlign(CENTER, CENTER);
  text(minTemp + "°C", gradX1 - 20 * scaleFactor, gradY1 + gradHeight / 2);
  text(maxTemp + "°C", gradX2 + 20 * scaleFactor, gradY1 + gradHeight / 2);

  //LUNGHEZZA
  textAlign(LEFT, CENTER);
  let riversX = paddingX * 1.2;
  text("River Length", riversX, 0);
  // Cerchi di dimensioni rappresentative
  fill(txtColor);
  circle(riversX + 30 * scaleFactor, paddingY, minRiverSize * scaleFactor);
  circle(riversX + 30 * scaleFactor, paddingY + 45 * scaleFactor, maxRiverSize * scaleFactor);

  textAlign(LEFT, CENTER);
  text("Min Length", riversX + 80 * scaleFactor, paddingY);
  text("Max Length", riversX + 80 * scaleFactor, paddingY + 45 * scaleFactor);

  pop();
}

// RESIZE 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth > 1100) {
    distContinentsFactor = 3.5;
  } else if (700 < windowWidth < 1100) {
    distContinentsFactor = 4;
  } else if (600<windowWidth < 700) {
    distContinentsFactor = 11;
  }
  redraw();
}
