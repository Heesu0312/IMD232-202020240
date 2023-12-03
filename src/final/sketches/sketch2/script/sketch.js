let aDrunkenObj;
let trace = [];

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  aDrunkenObj = new aDrunkenObj(width / 2, height / 2);

  background('white');
}

function draw() {
  const randomForce = p5.Vector.random2D();
  randomForce.mult(1);
  aDrunkenObj.applyForce(randomForce);
  aDrunkenObj.update();
  aDrunkenObj.infiniteEdge();

  trace.push([aDrunkenObj.pos.x, aDrunkenObj.pos.y]);

  background('white');
  aDrunkenObj.display();
}
