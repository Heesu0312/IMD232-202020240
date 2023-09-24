let circle;
const accelerationMagnitude = 0.1;
let redLineLength = 10;
let isClicked = false;
let clickDirection;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  circle = new Circle(width / 2, height / 2);
}

function draw() {
  background(225);
  circle.update();
  circle.display();

  if (mouseIsPressed) {
    isClicked = true;
    clickDirection = createVector(mouseX, mouseY).sub(circle.position);
    clickDirection.normalize();
  } else {
    isClicked = false;
  }
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.radius = 30;
  }

  update() {
    const target = createVector(mouseX, mouseY);

    const accelerationVector = p5.Vector.sub(target, this.position);
    accelerationVector.setMag(accelerationMagnitude);

    this.acceleration = accelerationVector;

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.wrapAround();

    redLineLength = min(redLineLength, this.radius - 5);

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

    fill('black');
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);

    stroke('blue');
    line(
      this.position.x,
      this.position.y,
      this.position.x + this.velocity.x * 10,
      this.position.y + this.velocity.y * 10
    );

    stroke('red');

    if (isClicked) {
      const bounce = clickDirection.copy().mult(10);
      this.velocity.add(bounce);
    }

    let centerToMouse = p5.Vector.sub(
      createVector(mouseX, mouseY),
      this.position
    );
    centerToMouse.setMag(redLineLength);

    let endX = this.position.x + centerToMouse.x;
    let endY = this.position.y + centerToMouse.y;

    line(this.position.x, this.position.y, endX, endY);

    return this;
  }
}
