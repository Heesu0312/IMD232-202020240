function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  ellipseMode(CENTER);
}

function draw() {
  background('orange');

  noStroke();
  fill('blue');
  circle(80, 80, 70);
  fill('red');
  rect(100, 100, 20, 20);
  fill('yellow');
  quad(20, 30, 80, 30, 80, 70, 20, 70);
}
