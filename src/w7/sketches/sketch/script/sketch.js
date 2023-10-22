class ball {
  constructor(posX, posY, mass, h, s, v) {
    this.pos = createVector(posX, posY);
    //위치
    this.vel = createVector();
    //속력
    this.acc = createVector();
    //가속도
    this.mass = mass;
    //질량 = 고정
    this.rad = this.mass * 5;
    //반지름 = 고정
    this.color = color(h, s, v);
  }
  //외부에서의 힘
  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    // const calcedAcc = force.div(this.mass);
    //-> force 의 값을 고정시키게 하기 위해서는 위의 식을 쓰는 것이 좋음.
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    // this.vel.limit(5);
    this.pos.add(this.vel);
    // this.acc.set(0, 0);
    this.acc.mult(0);
    //벡터의 길이를 바꾸는것
    // this.acc.setMag(0);
  }
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }
}

let balls = [];
let gravity;
let wind;

function setup() {
  setCanvasContainer('mySketchGoesHere', 2, 1, true);

  colorMode(HSL, 360, 100, 100);
  //colormode는 HSL 로 해야한다.
  for (let n = 0; n < 10; n++) {
    balls.push(new ball(random(width), 0, random(1, 20), random(360), 100, 50));
  }

  gravity = createVector(0, 0.1);
  wind = createVector(0.5, 0);

  background(255);
}
function draw() {
  background(255);
  balls.forEach((each) => {
    const scaledG = p5.Vector.mult(gravity, each.mass);
    each.applyForce(scaledG);
    each.applyForce(wind);
    each.update();
    each.display();
  });
}

function mousePressed() {
  for (let n = 0; n < balls.length; n++) {
    balls[n] = new ball(random(width), 0, random(1, 20), random(360), 100, 50);
  }
}
