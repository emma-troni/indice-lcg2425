// ======== ASSIGNMENT 03 =========

// FUNZIONAMENTO GENERALE:
// - quando il canvas è disegnato all'avvio nel setup(), 
//   calculate() ha funzione di:
//     --> calcolo delle posizioni dei continenti e dei fiumi 
//     --> salvare i dati in un array globale (continentData) - richiamata poi in draw() per disegnare visualizzazione

// - gestione transizione Hover con mouseMoved(): https://p5js.org/reference/p5.Element/mouseMoved/: 
//   chiamata automaticamente ogni volta che il mouse si sposta 
//     --> definisce quale fiume l'utente sta selezionando (selectedRiver)

// - draw(): continua ad essere eseguita ripetutamente, 
//           non ci sono modifiche nel Canvas ad ogni frame --> ridisegno continuo non ha risultati visibili

// - disposizione Fiumi in disposizione randomica 
//     --> uso di isOverlapping() x controllo che i fiumi non si posizionino uno sopra l'altro
//         reference code: https://openprocessing.org/sketch/1138749/

// - calcolo dimensione continente in base ai fiumi al suo interno:
//   TH: circle packing [https://mathworld.wolfram.com/CirclePacking.html]
//      - x natura casuale del posizionamento dei fiumi all'interno del cerchio dei continenti
//      - e del fatto che tali fiumi non possono sovrapporsi 
//    --> è praticamente impossibile ottenere un "perfect packing"
//    --> addiziono un fattore ((costante di Apollonio) x aggiustare la dimensione del continente


// VAR GLOBALI
let riversDataset;
let table;
let nRivers;
let minRiverSize = 5;
let maxRiverSize = 100;
let minArea;
let maxArea;
let minTemp;
let maxTemp;
let continents = ["Africa", "Asia", "Australia", "Europe", "North America", "Oceania", "South America"];
let selectedRiver = null;
let continentData = [];
//                = [{[ info continente[i] , array dei fiumi interni al continente[i] ]};
let paddingContinentName = 15;
let distContinentsFactor = 3.5;
let yHeader = 30;

// COLORI 
let continentColor = "WhiteSmoke";
let bgColor = [28, 39, 51];
let txtColor = [["white"], [190]];
let tempColor = [[218, 225, 250], [23, 92, 130]];
//              [[ minTemp rgb ],[ maxTemp rgb ]]
let markColor = ["#d13f76", "#9e3a61"];

// store data bf setup() and draw()
function preload() {
  riversDataset = loadTable("data/rivers.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // converto csv in oggetto 
  table = riversDataset.getObject();
  nRivers = riversDataset.getRowCount();

  // trovo min/max della colonna area e min_temp
  minArea = Number(table[0].area);
  maxArea = Number(table[0].area);
  minTemp = Number(table[0].min_temp);
  maxTemp = Number(table[0].min_temp);
  for (let i = 1; i < nRivers; i++) {
    let area = Number(table[i].area);
    if (area < minArea) {
      minArea = area;
    }
    if (area > maxArea) {
      maxArea = area;
    }
    let temp = Number(table[i].min_temp);
    if (temp < minTemp) {
      minTemp = temp;
    }
    if (temp > maxTemp) {
      maxTemp = temp;
    }
  }
  // calcolo: maxRiverSize = f(dimensione finestra)
  updateRiverSize(); 
  // calcolo parametri continenti/fiumi utili per draw()
  calculate();
}

function calculate() {
  let riverData;
  let continentX = width / 2;
  let continentY = height - height / 2.5;
  let distContinents = min(windowWidth, windowHeight) / distContinentsFactor;
  // POSIIZONE CONTINENTI
  let continentPos = findPositionContinent(continents.length, continentX, continentY, distContinents);

  // array dove salvare i dati per riutilizzarli in draw
  // la svuoto in quanto ogni volta che si ricarica la pagina != disposizione fiumi
  // placedContinents = [];
  continentData = [];

  // PER OGNI CONTINENTE:
  for (let i = 0; i < continents.length; i++) {
    let continent = continents[i];
    let position = continentPos[i];
    // DIM CONTINENTI
    let continentSize = calculateContinentSize(continent);

    // salvo i fiumi appartenenti al i-esimo continente
    let continentRivers = [];
    for (let j = 0; j < nRivers; j++) {
      if (table[j].continent === continent) {
        continentRivers.push(table[j]);
      }
    }
    // salvo info j-esimi fiumi dell'i-esimo continente
    // posizioni fiumi per i-esimo continente
    let riverPositions = [];
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
        let distance = random(0, continentSize - riverSize / 2);
        let xRiver = position[0] + cos(angle) * distance;
        let yRiver = position[1] + sin(angle) * distance;

        if (!isOverlapping(xRiver, yRiver, riverSize / 2, riverPositions)) {
          riverData = {
            river: river.name,
            x: xRiver,
            y: yRiver,
            r: riverSize / 2,
            size: riverSize,
            continent: continent,
            temp: river.min_temp,
            color: getColorByTemperature(river.min_temp)
          };

          riverPositions.push(riverData);
          // placedContinents.push(riverData);
          placed = true;
        }
        attempts++;
      }

      if (!placed) {
        console.warn(`Failed to place ${river.name} in ${continent} after ${maxAttempts} attempts`);
      }
    }

    continentData.push({
      name: continent,
      x: position[0],
      y: position[1],
      size: continentSize,
      rivers: riverPositions
    });
    
  }
}

// POSIZIONE CONTINENTI 
function findPositionContinent(nContinents, centerContentX, centerContentY, distContinents) {
  let continentPositions = [];

  // disposizione a raggera per width > 800
  let angleStep = TWO_PI / nContinents;
  for (let i = 0; i < nContinents; i++) {
    let angle = i * angleStep;
    let x = centerContentX + cos(angle) * distContinents;
    let y = centerContentY + sin(angle) * distContinents;
    continentPositions.push([x, y]);

  }
  return continentPositions;
}

// DIM CONTINENTE proporzionale al n di fiumi al suo interno
function calculateContinentSize(continent) {
  let riversPerContinent = [];
  for (let i = 0; i < nRivers; i++) {
    if (table[i].continent === continent) {
      riversPerContinent.push(table[i]);
    }
  }

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

  // fattore di compensazione per la Circle Packing Theory: https://en.wikipedia.org/wiki/Circle_packing 
  // 1. inefficienza del circle packing (C appollonio = 10% circa)
  let packingInefficiencyFactor = 1.1;
  // 2. spazio extra per facilitare il posizionamento
  let extraPadding = maxRiverSize/2.8;

  let finalRadius = (theoryRadius * packingInefficiencyFactor) + extraPadding;
  return finalRadius;
}

// VERIFICA se un nuovo cerchio si sovrappone a uno degli altri cerchi già esistenti. 
function isOverlapping(x, y, radius, rivers) {
  for (let river of rivers) {
    // dist() -- https://p5js.org/reference/p5/dist/
    // calcolala distanza tra il centro del nuovo cerchio (x, y) e il centro del cerchio esistente (river.x, river.y)
    if (dist(x, y, river.x, river.y) < radius + river.r) {
      return true;
    }
  }
  return false;
}

// HOVER
// 1. se il puntatore è all'interno del raggio del cerchio (river.r) --> selectedRiver = river;
// 2. else --> selectedRiver = null;
function mouseMoved() {
  for (let continent of continentData) {
    for (let river of continent.rivers) {
      if (dist(mouseX, mouseY, river.x, river.y) < river.r) {
        selectedRiver = river;
        return;
      }
    }
  }
  selectedRiver = null;
}

function draw() {
  background(bgColor);

  // header
  textSize(25);
  textAlign(CENTER, TOP);
  push();
  textStyle(BOLD);
  fill(txtColor[0]);
  text("Rivers in the World", width / 2, yHeader);
  textStyle(NORMAL);
  textSize(15);
  fill(txtColor[1])
  text("Hover over the smaller circles within each continent to explore river details", width / 2, yHeader+30)
  pop();

  for (let continent of continentData) {
    // disegno continente 
    noFill();
    stroke(continentColor);
    fill(continentColor)
    strokeWeight(2);
    circle(continent.x, continent.y, continent.size * 2);

    // nome continente
    noStroke();
    let textOffsetY = continent.size + paddingContinentName;
    fill(txtColor[0]);
    textSize(14);
    textAlign(CENTER, CENTER);
    text(continent.name, continent.x, continent.y - textOffsetY);

    // disegno fiumi
    for (let river of continent.rivers) {
      fill(river.color);
      // transizione per hover
      if (selectedRiver === river) {
        fill(markColor[1]);
      }
      circle(river.x, river.y, river.size);
    }
  }

  legenda();
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

function legenda() {
  let legendX = 29;
  let legendY = yHeader * 3.2;
  let paddingY = 30;
  // let paddingX = 30;
  let gradWidth = 165;
  let gradHeight = 10;

  push();
  noStroke();
  translate(legendX, legendY);

  // TITOLO
  fill(txtColor[0]);
  textSize(16);
  textAlign(LEFT, TOP);
  push()
  textStyle(BOLD)
  text("Legenda", 0, 0);
  pop()

  // NOME FIUME
  textAlign(LEFT);
  textSize(11);
  text("None river selected", 0, paddingY);

  if (selectedRiver != null) {
    push()
    fill(bgColor)
    rect(0, paddingY, windowWidth / 2, 15)
    pop()
    text(selectedRiver.river + " river", 0, paddingY);
  } else {
    text("   ");
  }

  // TEMPERATURA 
  // LINEAR GRADIENT - tutorial https://www.youtube.com/watch?v=-MUOweQ6wac
  // reference code: https://github.com/Creativeguru97/YouTube_tutorial/blob/master/p5_hacks/Gradient_effect/linear_gradient/sketch.js 
  let gradX1 = 0;
  let gradY1 = paddingY * 2.3;
  let gradX2 = gradX1 + gradWidth;
  let gradY2 = gradY1;
  let markWidth = 3;
  text("Minimum Temperature Range [C°]", 0, paddingY * 1.8);

  let gradient = drawingContext.createLinearGradient(gradX1, gradY1, gradX2, gradY2);
  gradient.addColorStop(0, getColorByTemperature(minTemp));
  gradient.addColorStop(1, getColorByTemperature(maxTemp));
  drawingContext.fillStyle = gradient;
  rect(gradX1, gradY1, gradWidth, gradHeight);
  if (selectedRiver != null) {
    let markX = map(selectedRiver.temp, minTemp, maxTemp, gradX1, gradX1 + gradWidth)
    fill(markColor[0]);
    rect(markX, gradY1, markWidth, gradHeight)
    fill(txtColor[0]);
    text(selectedRiver.temp + "°C", markX - 5, gradY1 + 13)
  }

  fill(txtColor[0])
  text("River Area:", 0, paddingY * 4.2);
  circle(100, paddingY * 4.4, 10, 10);
  if (selectedRiver != null) {
    push();
    fill(bgColor)
    circle(100, paddingY * 4.4, 15, 15);

    pop();
    circle(100, paddingY * 4.4, selectedRiver.size, 10);
    text(selectedRiver.size + " m^2", 140, paddingY * 4.2)
  } else {
    text("[m^2]", 140, paddingY * 4.2)
  }
  pop();
}

function updateRiverSize() {
  // scala maxRiverSize in base alla diagonale della finestra
  let maxDiagonal = sqrt(1920 ** 2 + 1080 ** 2);
  let currentDiagonal = sqrt(windowWidth ** 2 + windowHeight ** 2); 
  maxRiverSize = map(currentDiagonal, 0, maxDiagonal, minRiverSize, maxRiverSize);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // ridefinisco il valore maxRiverSize
  updateRiverSize(); 
  // ridefinisco i parametri anche quando windowResize non solo quando si ricarica la pagina:
  calculate();
}