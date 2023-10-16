const cNum = 8;
const rNum = 8;
let gridC;
let gridR;
let angleBegin = 0;
let angleBeginVel = 1;
let angleStep = 15;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  colorMode(HSL, 360, 100, 100, 100);
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);

  for (let r = 0; r < rNum; r++) {
    for (let c = 0; c < cNum; c++) {
      push();
      translate(
        ((c + 1) * width) / (cNum + 1),
        ((r + 1) * height) / (rNum + 1)
      );
      if (r % 2 === 0) {
        rotate(radians(angleBegin + c * angleStep));
      } else {
        rotate(radians(angleBegin + (c + 0.5) * angleStep + 180));
      }

      drawGraphic(c, r);
      pop();
    }
  }

  angleBegin += angleBeginVel;
}

function drawGraphic(c, r) {
  let hue;

  if (r % 2 === 0) {
    hue = c % 2 === 0 ? 0 : 60;
  } else {
    hue = c % 2 === 0 ? 240 : 120;
  }

  noFill();
  stroke(hue, 80, 70);
  ellipse(0, 0, 40, 40);

  stroke(0);
  line(0, 0, 20, 0);

  fill(0);
  ellipse(20, 0, 7, 7);
}
