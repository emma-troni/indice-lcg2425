// REFERENCE BELLA
// https://openprocessing.org/sketch/2330360 
// 
// https://openprocessing.org/sketch/2176841

const branchingFactor = 0.025;
const noiseFactor = 5;
const agentArray = [];
const agentSpeed = 100;
let world;

function setup() {
    init();
}

function init() {
    createCanvas(windowWidth, windowHeight);
    noiseSeed();
    stroke("black");
    background("white");
    noFill();

    world = array2d();
    agentArray.length = 0;
    agentArray.push(agent());
}

mouseClicked = () => init();

function draw() {
    for (let i = 0; i < agentSpeed; i++) {
        agentArray.forEach((agent) => agent.next());
        // oogni volta che si chiama il metodo .next() su questo iteratore, la funzione generatrice esegue il codice fino al prossimo yield, e poi si "pausa" nuovamente, restituendo un valore.
    }
}

// funzione generatrice --> non viene eseguita subito | restituisce un oggetto iteratore.
function* agent() {
    const x = random(width);
    const y = random(height);
    const heading = 0;
    const stack = [{ x, y, heading }];
    world.set(x, y);

    while (stack.length) {
        let { x, y, heading } = stack.pop();

        const num = random() < branchingFactor ? 2 : 1;
        for (i = 0; i < num; i++, heading += PI / 2) {
            let newX = x;
            let newY = y;
            do {
                n = noise(newX / width, newY / height) * noiseFactor;
                newX = (newX + cos(heading + n) + width) % width;
                newY = (newY + sin(heading + n) + height) % height;
            } while (floor(newX) === floor(x) && floor(newY) === floor(y));
            if (!world.canMoveTo(newX, newY)) continue;
            stack.push({ x: newX, y: newY, heading });
            world.set(newX, newY);
            // per produrre un valore che viene restituito temporaneamente dall'iteratore
            yield;
        }
    }
}

function array2d() {
    const array = Array.from({ length: width }, () => Array(height).fill(false));

    return {
        canMoveTo: (x, y) => {
            return array[floor(x)][floor(y)] === false;
        },
        set: (x, y, colour) => {
            array[floor(x)][floor(y)] = true;
            rect(x, y, 1);
        },
    };
}
