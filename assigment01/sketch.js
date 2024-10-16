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
  let rowCount = 11;
  let colCount = 35;
  let wRect = (windowWidth - (10.31/100) * windowWidth * 2) / colCount;
  let hRect = (windowHeight - (12.24/100) * windowHeight * 2)/ rowCount;
  let xMargin = (10.31 / 100) * windowWidth;
  let yMargin = (12.24 / 100) * windowHeight;
  

  // gap = wRect;
  // rect(100,100,wRect,hRect);

  let indexRow = 1;
  let indexCol = 0;
  for (let y = yMargin; y < windowHeight - yMargin; y += hRect) {
    if (indexRow % 2 == 0) {
      fill("black"); 
    } else if ((indexRow % 2 != 0) ){
      noFill();
    }
    
    for (let x = xMargin; x < windowWidth - xMargin; x += wRect) {
      rect(x, y, wRect, hRect);
    }
    indexRow++; 
    indexCol++
  }

  for (let x = xMargin; x < windowWidth - xMargin-wRect; x += wRect)  {
    for (let y = yMargin; y < windowHeight - yMargin; y += hRect) {
      
      if((indexCol%2==0)) {
        fill("#c1c1c1");
      } else if ((indexCol%2!=0)){
        noFill();
      } 
      rect(x, y, wRect, hRect);
    }
    indexCol++;
  }


  for (let x = xMargin; x < windowWidth - xMargin-2*wRect; x += wRect)  {
    for (let y = yMargin; y < windowHeight - yMargin; y += hRect) {
      
      if((indexCol%2==0)) {
        fill(random(50, 200), random(50, 170), random(50, 200));
      } else if (indexCol%2!=0){
        noFill();
      } 
      rect(x, y, wRect, hRect);
    }
    indexCol++;
  }



  


}
