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
let riverCircles = []; // array per memorizzare le informazioni dei fiumi
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

let infoLayer; // Layer per le informazioni
let selectedRiver = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Crea il layer per le informazioni
  infoLayer = createGraphics(windowWidth, windowHeight);
  noLoop();
  table = riversData.getObject();
  nRivers = riversData.getRowCount();

  // Trovo il min/max per length e min_temp
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
  textSize(20);
  // HEADER
  textAlign(CENTER, TOP);
  push()
  textStyle(BOLD);
  fill(txtColor);
  text("Rivers in the World", width / 2, 30);
  pop()
  // Reset riverCircles array all'inizio di ogni draw
  riverCircles = [];

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
  drawLegend();

  // Disegna il layer delle informazioni sopra tutto
  image(infoLayer, 0, 0);
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
  let successfullyPlacedCircles = 0;
  let totalAttemptedCircles = 0;

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
    totalAttemptedCircles++;

    let attempts = 0;
    let maxAttempts = nRivers * 10;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
      let angle = random(0, TWO_PI);
      let distance = random(0, maxRadius - riverSize / 2);
      let x = centerX + cos(angle) * distance;
      let y = centerY + sin(angle) * distance;

      if (!isOverlapping(x, y, riverSize / 2, placedCircles)) {
        // Aggiungi il fiume all'array dei cerchi posizionati
        placedCircles.push({
          x: x,
          y: y,
          r: riverSize / 2
        });

        // Aggiungi il fiume all'array globale con tutte le informazioni
        riverCircles.push({
          x: x,
          y: y,
          r: riverSize / 2,
          name: rivers[i].name,
          length: rivers[i].length,
          temp: rivers[i].min_temp,
          continent: continent
        });

        let riverColor = getColorByTemperature(rivers[i].min_temp);
        fill(riverColor);
        noStroke();
        circle(x, y, riverSize);

        placed = true;
        successfullyPlacedCircles++;
      }
      attempts++;
    }

    if (!placed) {
      console.warn(`fallito di inserire ${rivers[i].name} in ${continent} dopo ${maxAttempts} attempts`);
    }
  }

  // log per verifica 
  // console.log(`${continent} STATISTICS:`);
  // console.log(`Failed placements: ${totalAttemptedCircles - successfullyPlacedCircles}`);
  // console.log(`Placement success rate: ${(successfullyPlacedCircles / totalAttemptedCircles * 100).toFixed(2)}%`);
}

// Funzione per gestire il click del mouse
function mousePressed() {
  let clicked = false;
  
  for (let circle of riverCircles) {
    if (dist(mouseX, mouseY, circle.x, circle.y) < circle.r) {
      clicked = true;
      
      // Se clicco lo stesso fiume, lo deseleziono
      if (selectedRiver === circle) {
        selectedRiver = null;
        infoLayer.clear();
      } else {
        // Altrimenti seleziono il nuovo fiume
        selectedRiver = circle;
        
        // Pulisci il layer delle informazioni
        infoLayer.clear();
        
        // Disegna le informazioni sul layer separato
        infoLayer.push();
        infoLayer.fill(txtColor);
        infoLayer.noStroke();
        infoLayer.textSize(14);
        infoLayer.textAlign(CENTER);
        
        // Crea il testo informativo
        let info = `${circle.name}\nLength: ${circle.length}km\nTemp: ${circle.temp}°C`;
        
        // Calcola l'altezza del box informativo
        let lines = info.split('\n');
        let boxHeight = lines.length * 20;
        
        // Posizione del testo sopra il cerchio
        let textY = circle.y - circle.r - boxHeight - 10;
        
        // Disegna un rettangolo semi-trasparente dietro il testo
        infoLayer.fill(0, 0, 0, 200);
        infoLayer.rect(circle.x - 100, textY - 10, 200, boxHeight + 20, 5);
        
        // Disegna il testo
        infoLayer.fill(txtColor);
        infoLayer.text(info, circle.x, textY + boxHeight/2);
        infoLayer.pop();
      }
      
      break;
    }
  }
  
  if (!clicked) {
    selectedRiver = null;
    infoLayer.clear();
  }
  
  // Aggiorna solo il layer delle informazioni
  image(infoLayer, 0, 0);
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
  // valori vicini a minTemp: brightness -->0
  // valori vicini a maxTemp: brightness -->1
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
// Aggiungi questa funzione per gestire il ridimensionamento della finestra
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Ridimensiona anche il layer delle informazioni
  infoLayer.resizeCanvas(windowWidth, windowHeight);
  if (windowWidth > 1100) {
    distContinentsFactor = 3.5;
  } else if (700 < windowWidth < 1100) {
    distContinentsFactor = 4;
  } else if (600 < windowWidth < 700) {
    distContinentsFactor = 11;
  }
  redraw();
}