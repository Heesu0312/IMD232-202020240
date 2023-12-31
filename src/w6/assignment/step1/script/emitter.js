class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 4);
    this.angle = random(TWO_PI);
    this.size = 11;
    this.color = color(random(360), random(100), random(50, 80), 70);
    this.acceleration = createVector(0, 0);
  }

  // applyForce(force) {
  //   this.acceleration.add(force);
  // }

  update() {
    this.vel.add(this.acceleration);
    this.pos.add(this.vel);
    this.angle += this.vel.mag() * 0.03;
    this.acceleration.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(this.color);
    noStroke();
    rect(0, 0, this.size, this.size);
    pop();
  }

  isOffScreen() {
    return (
      this.pos.y > height + 100 || this.pos.x < -100 || this.pos.x > width + 100
    );
  }
}
