// ===== SNAKE - GESTIONE SERPENTE =====
// diviso logicamente i dati tra:
//    - modulo principali di gestione del gioco
//    - modulo per la gestione del serpente

class Snake {
    // testa elemento separato dalla coda --> gestire il mangiare il cibo
  
    // oggetto 
    constructor(x, y) {
      // this. --> fa riferimento alla classe a cui si sta facdendo riferimento
      this.x = x;
      this.y = y;
      // velocità (dx ; dy)
      this.xspeed = 0.5;
      this.yspeed = 0;
      this.len = 0;
      this.tail = [];
  
    }
  
    // direzione di movimento --> modifica velocità quando KeyPressed()
    // velocità < 0 --> -1;
    // velocità > 0  --> +1 
    dir(x, y) {
      if (this.xspeed + x === 0 || this.yspeed + y === 0) {
        console.log("Invalid direction");
      } else {
        this.xspeed = x;
        this.yspeed = y;
      }
    }
  
    death() {
      score = this.len;
      for (var i = 0; i < this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
          this.len = 0;
          this.tail = [];
          return score, true;
        }
      }
      return 0, false;
    }
  
    eat(food_x, food_y) {
      if (this.x === food_x && this.y === food_y) {
        this.len++;
        return true;
      }
      
      return false;
    }
  
    // MOVIMENTO --> aggioranre LUNGHEZZA SERPENTE
    update() {
      if(this.len === this.tail.length) {
        for (var i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }
      
      this.tail[this.len - 1] = createVector(this.x, this.y);
  
      this.x = this.x + this.xspeed * scl;
      this.y = this.y + this.yspeed * scl;
  
      if (this.x > width - scl) {
        this.x = 0;
      } else if (this.x < 0) {
        this.x = width - scl;
      }
  
      if (this.y > height - scl) {
        this.y = 0;
      } else if (this.y < 0) {
        this.y = height - scl;
      }
    }
  
  
    // show() {
    //   fill(255);
    //   // coda == un vettore --> ciclo for
    //   for( var i = 0; i < this.tail.length; i++) {
    //     // / ogni elemento della coda ha una proprietà x e y
    //     rect(this.tail[i].x, this.tail[i].y, scl, scl);
    //   }
    //   // testa
    //   rect(this.x, this.y, scl, scl);
    // }
    show() {
      fill(255);
      for (var i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
      rect(this.x, this.y, scl, scl);
    }
  }