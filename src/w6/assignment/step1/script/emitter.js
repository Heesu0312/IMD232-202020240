class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 2);
    this.angle = random(TWO_PI);
    this.size = 10;
    this.color = color(random(360), random(100), random(50, 80), 70);
  }

  applyForce(force) {
    this.vel.add(force);
  }

  update() {
    this.pos.add(this.vel);
    this.angle += this.vel.mag() * 0.03;
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
