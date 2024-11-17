// ====== ASSIGNMENT 03 =======
// DATASET: https://docs.google.com/spreadsheets/d/1E3mbwhm85jmDY4q7yUmgg19AvuyPo4ttUwY7ex8tMIg/edit?gid=0#gid=0 

// Circle Packing Diagram
//    It displays values of leaf nodes of a hierarchical structure by using circles areas: continent, name
//    The hierarchical structure is depicted using nested circles. 
//    A further quantitative dimension with size and a quantitative or categorical dimension (lenght) with color (avg_temp).

let riversData;
let table;
let nRivers;
let minRiverSize = 5; // per minLength
let maxRiverSize = 50; // per maxLength
let maxLength;
let minLength;
let minAvgtemp;
let maxAvgtemp;
let continents = ["Africa", "Asia", "Australia", "Europe", "North America", "Oceania", "South America"];

// colori 
let continentColors = ["black", "green", "black", "blue", "red", "orange", "pink"];


function preload() {
  // ----loadTable()----- 
  riversData = loadTable("data/rivers.csv", "csv", "header");
  console.log(riversData)
  // https://p5js.org/reference/p5/loadTable/
  // Reads the contents of a file or URL and creates a p5.Table object with its values
  // p5.Table objects store data with multiple rows and columns, much like in a traditional spreadsheet
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // getObject()
  // https://p5js.org/reference/p5.Table/getObject/
  // Retrieves all table data and returns as an object. 
  // If a column name is passed in, each row object will be stored with that attribute as its title.
  table = riversData.getObject();

  nRivers = riversData.getRowCount();
  console.log(nRivers)
  console.log(table);
  // console.log(table[0].length);

  minLength = Number(table[0].length);
  maxLength = Number(table[0].length);
  for (let i = 1; i < nRivers; i++) {
    let value = Number(table[i].length);
    if (value < minLength) {
      minLength = value;
    }
    if (value > maxLength) {
      maxLength = value;
    }
  }

  minTemp = Number(table[0].avg_temp);
  maxTemp = Number(table[0].avg_temp);
  for (let i = 1; i < nRivers; i++) {
    let value = Number(table[i].avg_temp);
    if (value < minTemp) {
      minTemp = value;
    }
    if (value > maxTemp) {
      maxTemp = value;
    }
  }
  console.log(minTemp)
  console.log(maxTemp)

}


function draw() {
  background(220);
  let scaleRatio = windowWidth / 1920;
  push()
  fill("black")
  textAlign(CENTER, TOP);
  text("Rivers in the World", width / 2, 20);
  pop()
  drawContinent();

  // drawGlyph();
}

function getColorByTemperature(baseColor, temperature) {
  // Mappa la temperatura su una scala da 0 a 1
  let brightness = map(temperature, minTemp, maxTemp, 0.2, 1);
  
  // Definiamo i valori RGB per il blu scuro e blu chiaro
  let darkBlue = color(0, 0, 139);    // blu scuro
  let lightBlue = color(173, 216, 230);  // blu chiaro
  
  // Interpoliamo tra i due blu basandoci sulla temperatura
  let r = lerp(red(darkBlue), red(lightBlue), brightness);
  let g = lerp(green(darkBlue), green(lightBlue), brightness);
  let b = lerp(blue(darkBlue), blue(lightBlue), brightness);
  // let c = color(baseColor);
  // let r = red(c);
  // let g = green(c);
  // let b = blue(c);
  
  // Schiarisci il colore base mescolandolo con il bianco
  r = lerp(r, 255, brightness);
  g = lerp(g, 255, brightness);
  b = lerp(b, 255, brightness);
  
  return color(r, g, b);
}


function drawGlyph(xPos, yPos, continent, baseColor) {
  noStroke();
  let x = xPos;
  let riverSize = 0;
  const padding = 10; // padding fisso di 10px
  
  for (let i = 0; i < nRivers; i++) {
      if (table[i].continent == continent) {
          // Ottieni la temperatura e mappa il colore
          let temp = Number(table[i].avg_temp);
          let riverColor = getColorByTemperature(baseColor, temp);
          
          fill(riverColor);
          let length = Number(table[i].length);
          riverSize = map(length, minLength, maxLength, minRiverSize, maxRiverSize);
          circle(x, yPos, riverSize);
          // Sposta x della dimensione del cerchio più il padding
          x = x + riverSize + padding;
      }
  }
}


function drawContinent() {
  let x = 250;
  let y = 100;
  let radius = 100;
  let yStep = 110;
  for (let i = 0; i < continents.length; i++) {
    let continent = continents[i];
    let color = continentColors[i];

    push();
    noFill();
    stroke("grey");
    circle(x, y, radius);
    pop();
    drawGlyph(x, y, continent, color);
    y += yStep; 
  }

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
