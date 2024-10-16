function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
  }
  
  function fillRandom() {
    if (random(1) < 0.2) {
        fill("#c1c1c1");
    } 
    else if (random(1) < 0.05) {
        fill("black");
    }
    else {
        fill(random(50, 200), random(50, 150), random(50, 180));
    }
  }
  
  function draw() {
    background("#c1c1c1");
    noStroke();
    fill("black");
    
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
    
    fill("#c1c1c1");
  
    function simple(col, row) {
      fillRandom();
      rect(paddingX + col * colWidth, paddingY + row * rowHeight, colWidth, rowHeight); 
    }
  
    function double(col, row) {
      fillRandom();
      rect(paddingX + col * colWidth, paddingY + row * rowHeight, colWidth, rowHeight); 
      
      fillRandom();
      
      let doubleStart = random(rowHeight / 3, (rowHeight / 3) * 2);
      let doubleHeight = random(rowHeight / 6, rowHeight / 3);
      rect(paddingX + col * colWidth, paddingY + row * rowHeight + doubleStart, colWidth, doubleHeight); 
    }
    
    function triple(col, row) {
      fillRandom();
      rect(paddingX + col * colWidth, paddingY + row * rowHeight, colWidth, rowHeight); 
      
      fillRandom();
      
      let doubleStart = random(rowHeight / 3, (rowHeight / 3) * 2);
      rect(paddingX + col * colWidth, paddingY + row * rowHeight + doubleStart, colWidth, rowHeight - doubleStart); 
      
      fillRandom();
      
      let tripleStart = random((rowHeight / 3) * 2, rowHeight);
      rect(paddingX + col * colWidth, paddingY + row * rowHeight + tripleStart, colWidth, rowHeight - tripleStart); 
    }
    
    function halfAndHalf(col, row) {
      fillRandom();
      rect(paddingX + col * colWidth + colWidth / 2 - 1, paddingY + row * rowHeight, colWidth / 2, rowHeight);
      fillRandom();
      rect(paddingX + col * colWidth, paddingY + row * rowHeight, colWidth / 2, rowHeight);
    }
    
    function quadSplitFullHeight(col, row) {
      let x = paddingX + col * colWidth;
      let y = paddingY + row * rowHeight;
      
      let splitHeight = 20;
      
      fillRandom();
      rect(paddingX + col * colWidth, paddingY + row * rowHeight, colWidth, rowHeight);
      
      fillRandom();
      
      quad(
        x, y,
        x + colWidth, y + rowHeight - splitHeight,
        x + colWidth, y + rowHeight,
        x, y + splitHeight
      );
    }
  
    function quadSplit(col, row) {
      let x = paddingX + col * colWidth;
      let y = paddingY + row * rowHeight;
      
      let splitHeight = 10;
      let splitStart = (rowHeight - splitHeight) / 2;
      // let splitStart = random(rowHeight / 3, (rowHeight / 3) * 2)
      
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
        x, y,
        x + colWidth, y,
        x + colWidth, y + splitRight,
        x, y + splitLeft
      );
      
      fillRandom();
      
      quad(
        x, y + splitLeft,
        x + colWidth, y + splitRight,
        x + colWidth, y + rowHeight,
        x, y + rowHeight,
      );
    }
    
    for (let col = 1; col < colCount; col += 2) {
      // Ultima colonna e' completamente bianca
      if (col == colCount - 2) {
        fill("#c1c1c1");
        rect(paddingX + col * colWidth, paddingY, colWidth, paddedHeight); 
        break
      }
      
      for (let row = 0; row < rowCount; row += 1) {
        random([
          simple,
          double,
          triple,
          halfAndHalf,
          quadSplit,
          quadSplitFullHeight,
        ])(col, row);
      }
    }
  }
  