let pos;
let vel;
let acc;
let radius = 25;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  aac = createVector();
  console.log(pos);
  console.log(vel);
  ellipse(pos.x, pos.y, 50);
}

function draw() {
  background(255);
  Update();
  InfiniteEdge();
}

function Update() {
  acc = p5.Vector.random2D();
  acc.mult(2);
  vel.add(acc);
  pos.add(vel);
}

function InfiniteEdge() {
  background(255);

  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y < height) {
    pos.y = 0;
  }
  ellipse(pos.x, pos.y, 2 * radius);
}
