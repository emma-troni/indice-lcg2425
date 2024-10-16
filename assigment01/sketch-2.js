function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
}

function draw() {
    noStroke();
    background("#c1c1c1");
    // prima base rettangoli neri
    fill("black");
    // let hRect = (6.9 / 100) * windowHeight;
    // let wRect = (1.5/100)*windowWidth;
    let paddingX = 150;
    let paddingY = 100;
    let paddedWidth = windowWidth - paddingX * 2;
    let paddedHeight = windowHeight - paddingY * 2;
  
    let rowCount = 11;
    let rowHeight = paddedHeight / rowCount;
    
    let colCount = 35;
    let colWidth = paddedWidth / colCount;
    
    for (let row = 1; row < rowCount; row += 2) {
      rect(paddingX, paddingY + row * rowHeight, paddedWidth, rowHeight);
    }

}
