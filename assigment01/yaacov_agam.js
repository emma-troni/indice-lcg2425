// REFERENCE: https://www.mutualart.com/Artwork/HOMMAGE-A-G-B-/81B1FB12F37935C9
// HOMMAGE a G.B. - Yaacov Agam, 1973
function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  noStroke();
  background("#eceae6");

  let rowCount = 11;
  let colCount = 35;

  // ---valori calcolati su l'opera grande 1483x1080px---
  // singolo elemento rettangolare:
  let testUnitWidth = 33;
  let testUnitHeight = 68;
  // rettangolo più chiaro sotto:
  let testPaddingWidth = 15.5;
  let testPaddingHeight = 15.5;
  // margini:
  let testMarginWidth = 164;
  let testMarginHeight = 164;
  // per ottenere le proporzioni indipendenti dal n di px
  // calcolo l'aspect ratio (larghezza / altezza):
  let unitRatio = testUnitWidth / testUnitHeight;
  // margineX = Nvolte la larghezza del singolo elemento;
  let marginWidthRatio = testMarginWidth / testUnitWidth;
  // margineY = Mvolte l'altezza del singolo elemento;
  let marginHeightRatio = testMarginHeight / testUnitHeight; 
  // faccio lo stesso per il rettangolo piu chiaro sottostante:
  let paddingWidthRatio = testPaddingWidth / testUnitWidth;
  let paddingHeightRatio = testPaddingHeight / testUnitHeight;
  

  // voglio rendere l'opera "responsive"
  // al variare della dimensione dello schermo l'opera si deve adattare 
  // mantenendo le proporzioni originali
  // --> trovare le dimensioni del singolo elemento al variare degli altri parametri
  // creo le variabili che mi servono per la condizione seguente:
  let unitHeight = 0; 
  let unitWidth = 0;
  if (windowWidth >= windowHeight) {
    // larghezza finetstra > altezza finestra
    // windowHeight = (unitHeight * marginHeightRatio * 2) + (unitHeight * rowCount);
    unitHeight = windowHeight / (marginHeightRatio * 2 + rowCount);
    unitWidth = unitHeight * unitRatio;
  } else {
    // larghezza finetstra < altezza finestra
    // windowWidth = (unitWidth * marginWidthRatio * 2) + (unitWidth * colCount);
    unitWidth = windowWidth / (marginWidthRatio * 2 + colCount);
    unitHeight = unitWidth / unitRatio;
  }
  // content = insieme di tutte le righe e colonne 
  // griglia dell'elemento rettangolare:
  let contentWidth = unitWidth * colCount;
  let contentHeight = unitHeight * rowCount;

  // margini del rettangolo più chiaro sotto:
  // paddingX = Nvolte la larghezza del singolo elemento;
  let paddingWidth = unitWidth * paddingWidthRatio;
  // paddingY = Mvolte l'altezza del singolo elemento;
  let paddingHeight = unitHeight * paddingHeightRatio;

  // content (griglia) + padding del rettangolo chiaro sotto:
  let contentWithPaddingWidth = contentWidth + paddingWidth * 2;
  let contentWithPaddingHeight = contentHeight + paddingHeight * 2;

  // calcolo il dimensioni margine esterno al contenuto:
  let marginWidth = (windowWidth - contentWithPaddingWidth) / 2;
  let marginHeight = (windowHeight - contentWithPaddingHeight) / 2;

  push();
  // traslo l'origine del draw rispetto al margine
  translate(marginWidth, marginHeight);

  // rettangolo chiaro sotto:
  fill("#f1f1e6");
  rect(0, 0, contentWithPaddingWidth, contentWithPaddingHeight)

  // traslo l'origine del draw rispetto al margine + padding
  translate(paddingWidth, paddingHeight);
  
  // righe nere dispari:
  for (let row = 1; row < rowCount; row += 2) {
    fill("#2b2b2d");
    rect(0, row * unitHeight, contentWidth, unitHeight);
  }
  // colonne colorate dispari:
  for (let col = 1; col < colCount; col += 2) {
    if (col < colCount - 2) {
      for (let row = 0; row < rowCount; row++) {
        push();
        // traslo l'origine rispetto alla colonna e riga relativa
        translate(col * unitWidth, row * unitHeight);
        // inserisco le forme randomiche 
        // random([
        //   simpleRect,
        //   doubleRect,
        //   tripleRect,
        //   halfAndHalfRect,
        //   quadSplit,
        //   trapezoid,
        // ])(unitWidth, unitHeight);
        trapezoid(unitWidth, unitHeight);

        pop();
      }
    } else {
      fill("#f1f1e6");
      rect(col * unitWidth, 0, unitWidth, contentHeight);
    }
  }

  pop();
}
// funzionne
function fillRandom() {
  if (random(1) < 0.2) fill("#f1f1e6");
  else if (random(1) < 0.05) fill("#2b2b2d");
  else fill(random(50, 220), random(50, 220), random(50, 220));
}

function simpleRect(width, height) {
  fillRandom();
  rect(0, 0, width, height); 
}


function doubleRect(width, height) {
  fillRandom();
  rect(0, 0, width, height); 
  fillRandom();
  // rettangolino piu piccolo varia sia di posizione della y sia di altezza:
  let doubleStart = random(height / 2, (height / 3)* 2);
  let doubleHeight = random(height / 6, height / 3);
  rect(0, doubleStart, width, doubleHeight); 
}


function tripleRect(width, height) {
  fillRandom();
  rect(0, 0, width, height); 
  fillRandom();
  let doubleStart = random(height / 2, (height / 3) *2);
  rect(0, doubleStart, width, height - doubleStart); 
  fillRandom();
  let tripleStart = random((height / 3) *2, height);
  rect(0, tripleStart, width, height - tripleStart); 
}

function halfAndHalfRect(width, height) {
  fillRandom();
  rect(width / 2, 0, width / 2, height);
  fillRandom();
  rect(0, 0, width / 2, height);
}

function quadSplit(width, height) {
  let splitHeight = height * 0.4;
  fillRandom();
  rect(0, 0, width, height);
  fillRandom();
  // 4 vertici:
  quad(
    0, 0,
    width, height - splitHeight,
    width, height,
    0, splitHeight
  );
}

function trapezoid(width, height) {
  let splitHeight = 10;
  let splitStart = (height - splitHeight) / 2 - floor(random(0,2));
  let splitLeft, splitRight;
  if (random(1) < 0.5) {
    splitLeft = splitStart;
    splitRight = splitStart + splitHeight;
  } else {
    splitRight = splitStart;
    splitLeft = splitStart + splitHeight;
  }
  fillRandom();
  quad(
    0, 0,
    width, 0,
    width, splitRight,
    0, splitLeft
  );
  fillRandom();
  quad(
    0, splitLeft,
    width, splitRight,
    width, height,
    0, height,
  );
}