// LEZIONE 5 PT 2
// PRELOAD()
//    latenza in cui vedo le pagine weeb


// VARIABILE GLOBALE - dobbiamo usarla in tutti pezzi del codice
let myImage;

function preload() {
  // disaccoppiare caricamento media e dati in modo che le cose vengano effettuate mentre il browser sta cercando di renderizzare la pagina
  // funzione per caracre dati immaginii etc.
  // una serie di funzinoalità mentre la pagina si sta caricando

  // percorso fino all'immagine
  myImage = loadImage("../media/img3.jpg");
  newImage = loadImage("../media/img2.jpg")
   //../ --> la cartella superiore
}

//once and forever
function setup() {
  createCanvas(400, 400);
}

//loop
function draw() {
  background(220);
  // myImage;
  image(myImage,0,0);
  image(newImage, mouseX, mouseY);
}


