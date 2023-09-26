let circle;
const acceleration = 100;
const velocity = 10;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  circle = new Circle(width / 2, height / 2);
}

function draw() {
  background(225);
  circle.update();
  circle.display();
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = 30;
  }

  update() {
    const randomAcceleration = p5.Vector.random2D().mult(2);
    this.acceleration = randomAcceleration;

    this.acceleration.limit(2);

    this.velocity.add(this.acceleration);

    this.velocity.limit(10);

    this.position.add(this.velocity);
    this.wrapAround();

    return this;
  }

  wrapAround() {
    if (this.position.x < -this.radius) {
      this.position.x = width + this.radius;
    } else if (this.position.x > width + this.radius) {
      this.position.x = -this.radius;
    }

    if (this.position.y < -this.radius) {
      this.position.y = height + this.radius;
    } else if (this.position.y > height + this.radius) {
      this.position.y = -this.radius;
    }
  }

  display() {
    stroke(0);
    line(this.position.x, this.position.y, mouseX, mouseY);

    stroke('red');
    let accVector = this.acceleration.copy().mult(acceleration);
    line(
      this.position.x,
      this.position.y,
      this.position.x + accVector.x,
      this.position.y + accVector.y
    );

    stroke('blue');
    let velVector = this.velocity.copy().mult(velocity);
    line(
      this.position.x,
      this.position.y,
      this.position.x + velVector.x,
      this.position.y + velVector.y
    );

    fill('black');
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);

    return this;
  }
}
