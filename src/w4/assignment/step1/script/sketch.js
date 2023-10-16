let bodies = [];
let G = 1;
let showVector = false;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  reset();
}

function draw() {
  background(255);

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
    bodies[i].update();
    bodies[i].display();
    if (showVector) {
      bodies[i].displayVectors();
    }
  }
}

function mousePressed() {
  if (isMouseInsideCanvas()) {
    reset();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    showVector = !showVector;
  }
}

function reset() {
  bodies = [];
  for (let i = 0; i < 20; i++) {
    let mass = random(16, 100);
    bodies[i] = new Body(random(width), random(height), mass);
  }
}
