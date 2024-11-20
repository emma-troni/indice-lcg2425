
// DA FARE
// mappare area non lunghezza
// eliminare liste inutili
// spostare legenda a sx: nome fiume, temperatura, lunghezza


// var globali
let riversData;
let table;
let nRivers;
let minRiverSize = 2;
let maxRiverSize = 50;
let maxArea;
let minArea;
let minTemp;
let maxTemp;
let scaleFactor;
let continents = ["Africa", "Asia", "Australia", "Europe", "North America", "Oceania", "South America"];
let paddingContinentName = 15;
let distContinentsFactor = 3.5;
let yHeader = 30;
// Calculate 
// continents.length, width / 2, height / 2 - height / 20, distContinents
let continentX;
let continentY;
let distContinents;
let continentPosition;
let continentData = []; // info di OGNI continente con i suoi fiumi
/*
continentData = [
    {
        name: "Africa",      
        x: position[0],      
        y: position[1],      
        radius: continentRadius,  
        rivers: riverPositions   
    },
    ...
]
*/
let riverData = []; //info di UN SINGOLO fiume
/*
riverData = {
    x: xRiver,          
    y: yRiver,           
    r: riverSize / 2,    
    size: riverSize,     
    river: river.name,   
    continent: continent, 
    color: getColorByTemperature(river.min_temp) 
}
*/

let riverPositions = []; //info di N fiumi del SINGOLO continente 
/*
riverPositions = [
    {riverData del I fiume},
    {riverData del II fiume },
    ...     
    {riverData del N fiume }
  ]
*/
let placedContinents = []; // info di TUTTI i fiumi di TUTTI i continenti per controllo di sovrapposizioni
/*
placedContinents = [
 { riverData del I fiume del I continente },
 { riverData del II fiume del I continente },
 { riverData del I fiume del II continente },
  ...
] 
*/
let selectedRiver = null;

// COLORI 
let continentColor = "grey";
let bgColor = [13, 15, 23];
let txtColor = "white";
let tempColor = [[218, 225, 250], [23, 92, 230]];
//              [[ minTemp rgb ],[ maxTemp rgb ]]

// blocco di codice da eseguire automaticamente una volta prima di setup() o draw()
function preload() {
  riversData = loadTable("data/rivers.csv", "csv", "header");
}

function calculate() {
  continentX = width / 2;
  continentY = height-height/2.5;
  scaleFactor = min(windowWidth, windowHeight) / 1000;
  distContinents = min(windowWidth, windowHeight) / distContinentsFactor;

  // POSIZIONE CONTINENT 
  continentPositions = findPositionContinent(continents.length,continentX, continentY, distContinents);

  placedContinents = [];
  continentData = [];
  
  for (let i = 0; i < continents.length; i++) {
    let continent = continents[i];
    let position = continentPositions[i];
    let continentRadius = continentSize(continent);

    // fiumi per il i-esimo continente
    let continentRivers = [];
    for (let j = 0; j < nRivers; j++) {
      if (table[j].continent === continent) {
        continentRivers.push(table[j]);
      }
    }

    // posizioni fiumi per i-esimo continente
    riverPositions = [];
    for (let j = 0; j < continentRivers.length; j++) {
      let river = continentRivers[j];
      let area = river.area;
      let riverSize = map(area, minArea, maxArea, minRiverSize, maxRiverSize);

      let attempts = 0;
      let maxAttempts = nRivers * 10;
      let placed = false;
      // CIRCLE PACKING --> gestione disposizione interna dei fiumi
      // tutorial: https://openprocessing.org/sketch/1138749/
      // controllo che i fiumi non si posizionino uno sopra l'altro
      while (!placed && attempts < maxAttempts) {
        let angle = random(0, TWO_PI);
        let distance = random(0, continentRadius - riverSize / 2);
        let xRiver = position[0] + cos(angle) * distance;
        let yRiver = position[1] + sin(angle) * distance;

        if (!isOverlapping(xRiver, yRiver, riverSize / 2, placedContinents)) {
          riverData = {
            x: xRiver,
            y: yRiver,
            r: riverSize / 2,
            size: riverSize,
            river: river.name,
            continent: continent,
            temp: river.min_temp,
            color: getColorByTemperature(river.min_temp)
          };

          riverPositions.push(riverData);
          placedContinents.push(riverData);
          placed = true;
        }
        attempts++;
      }

      if (!placed) {
        console.warn(`Failed to place ${river.name} in ${continent} after ${maxAttempts} attempts`);
      }
    }

    // salvo tutti i dati calcolati per poi usarli nella draw
    continentData.push({
      name: continent,
      x: position[0],
      y: position[1],
      radius: continentRadius,
      rivers: riverPositions
    });
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  table = riversData.getObject();
  nRivers = riversData.getRowCount();

  // min e max length/min_temp:
  minArea = Number(table[0].area);
  maxArea = Number(table[0].area);
  minTemp = Number(table[0].min_temp);
  maxTemp = Number(table[0].min_temp);
  for (let i = 1; i < nRivers; i++) {
    let lengthValue = Number(table[i].area);
    if (lengthValue < minArea) {
      minArea = lengthValue;
    }
    if (lengthValue > maxArea) {
      maxArea = lengthValue;
    }
    let tempValue = Number(table[i].min_temp);
    if (tempValue < minTemp) {
      minTemp = tempValue;
    }
    if (tempValue > maxTemp) {
      maxTemp = tempValue;
    }
  }
  console.log(minArea)
  console.log(maxArea)
  calculate();
}

// POSIZIONE CONTINENTI 
function findPositionContinent(nContinents, centerContentX, centerContentY, distContinents) {
  let continentPositions = [];
  if ((windowWidth < 800) && (windowHeight < 550)) {
    // disposizione orizzontale
    let totalWidth = nContinents * distContinents;
    let startX = (windowWidth - totalWidth) / 2;
    // let startY = (windowHeight)/8; s

    for (let i = 0; i < nContinents; i++) {
      let x = (i * distContinents) - startX;
      let y = centerContentY;
      continentPositions.push([x, y]);
    }
  } else {
    // disposizione a raggera per width > 800
    let angleStep = TWO_PI / nContinents;
    for (let i = 0; i < nContinents; i++) {
      let angle = i * angleStep;
      let x = centerContentX + cos(angle) * distContinents;
      let y = centerContentY + sin(angle) * distContinents;
      continentPositions.push([x, y]);
    }
  }
  return continentPositions;
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
    // let numRivers = riversPerContinent[i].length;
    // proporzione dimensione cerchio rispetto alla dimensione relativa a Length di ciascun fiume
    let riverSize = map(riversPerContinent[i].area, minArea, maxArea, minRiverSize, maxRiverSize);
    // area = PI*(raggio**2)
    theoryArea += PI * (riverSize / 2) ** 2;
  }
  // raggio TEORICO
  let theoryRadius = sqrt(theoryArea / PI);

  // fattore di compensazione per:
  // 1. inefficienza del circle packing (circa 10% = C appollonio)
  // 2. spazio extra per facilitare il posizionamento
  let packingInefficiencyFactor = 1.1;
  let extraPadding = 15;

  let finalRadius = (theoryRadius * packingInefficiencyFactor) + extraPadding;

  return finalRadius;
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
  // valori vicini a minTemp: brightness --> 0
  // valori vicini a maxTemp: brightness --> 1
  let brightness = map(temperature, minTemp, maxTemp, 0, 1);
  // lerp(a,b,t) --> https://p5js.org/reference/p5/lerp/ 
  // calcola un valore tra due numeri (a,b) dato uno specifico incremento (t)
  let r = lerp(tempColor[0][0], tempColor[1][0], brightness);
  let g = lerp(tempColor[0][1], tempColor[1][1], brightness);
  let b = lerp(tempColor[0][2], tempColor[1][2], brightness);
  return color(r, g, b);
}

function draw() {
  background(bgColor);

  // header
  textSize(25);
  textAlign(CENTER, TOP);
  push();
  textStyle(BOLD);
  fill(txtColor);
  text("Rivers in the World", width / 2, yHeader);
  pop();

  legenda();

  // continents e 
  for (let continent of continentData) {
    // disegno continent 
    noFill();
    stroke(continentColor);
    strokeWeight(2);
    circle(continent.x, continent.y, continent.radius * 2);

    // nome continente
    noStroke();
    let textOffsetY = continent.radius + paddingContinentName;
    fill(txtColor);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(continent.name, continent.x, continent.y - textOffsetY);

    // Draw rivers
    for (let river of continent.rivers) {
      fill(river.color);
      if (selectedRiver === river) {
        fill("white")
      }
      circle(river.x, river.y, river.size);
    }
  }
}

// MOUSE OVER 
// https://openprocessing.org/sketch/1028248/ reference code
function mouseIsHovered(x, y, radius) {
  return dist(mouseX, mouseY, x, y) < radius;
}

function mouseMoved() {
  for (const river of placedContinents) {
    if (mouseIsHovered(river.x, river.y, river.r)) {
      selectedRiver = river;
      return;
    }
  }
  selectedRiver = null;
}

// LEGENDA
function legenda() {
  let legendX = width / 2;
  let legendY = yHeader * 4;
  let paddingY = 20 * scaleFactor;
  let paddingX = 100 * scaleFactor;
  let gradWidth = 130 * scaleFactor;
  let gradHeight = 10 * scaleFactor;

  push();
  noStroke();
  translate(legendX, legendY);
  
  // titolo legenda
  fill(txtColor);
  textSize(16 * scaleFactor);
  textStyle(BOLD)
  textAlign(CENTER, TOP);
  text("Legenda", 0, -paddingY * 2);
  if (selectedRiver != null) {

    text(selectedRiver.river, 0, -paddingY * 2);
  } else {
    text("   ")
  }

  // temperatura 
  // LINEAR GRADIENT - tutorial https://www.youtube.com/watch?v=-MUOweQ6wac
  // reference code: https://github.com/Creativeguru97/YouTube_tutorial/blob/master/p5_hacks/Gradient_effect/linear_gradient/sketch.js 
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
  if (selectedRiver != null) {
    let markX = map(selectedRiver.temp, minTemp, maxTemp, gradX1, gradX1 + gradWidth)
    fill("red")
    rect(markX, gradY1, 3, gradHeight)
  }

  fill(txtColor);
  textAlign(CENTER, CENTER);
  text(minTemp + "°C", gradX1 - 20 * scaleFactor, gradY1 + gradHeight / 2);
  text(maxTemp + "°C", gradX2 + 20 * scaleFactor, gradY1 + gradHeight / 2);

  // LENGTH
  textAlign(LEFT, CENTER);
  let riversX = paddingX * 1.2;

  text(`River Length ()`, riversX, 0);
  // Cerchi di dimensioni rappresentative
  fill(txtColor);
  circle(riversX + 30 * scaleFactor, paddingY, minRiverSize );
  circle(riversX + 30 * scaleFactor, paddingY + 45 * scaleFactor, maxRiverSize );

  textAlign(LEFT, CENTER);
  text('Min Length: ' + minArea, riversX + 80 * scaleFactor, paddingY);
  text("Max Length", riversX + 80 * scaleFactor, paddingY + 45 * scaleFactor);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculate();
}