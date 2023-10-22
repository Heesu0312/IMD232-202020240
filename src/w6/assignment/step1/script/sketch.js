class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.particles = [];
  }

  createParticle() {
    this.particles.push(
      new Particle(
        this.emittingPos.x,
        this.emittingPos.y,
        random(1, 5),
        random(360),
        100,
        50
      )
    );
  }

  applyGravity(gravity) {
    this.particles.forEach((particle) => {
      const scaledG = p5.Vector.mult(gravity, particle.mass);
      particle.applyForce(scaledG);
    });
  }

  applyForce(force) {
    this.particles.forEach((particle) => {
      particle.applyForce(force);
    });
  }

  update() {
    this.particles.forEach((particle) => {
      particle.update();
    });
  }

  display() {
    this.particles.forEach((particle) => {
      particle.display();
    });
  }

  removeDeadParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].isOffScreen()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

class Particle {
  constructor(posX, posY, mass, h, s, v) {
    this.pos = createVector(posX, posY);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = this.mass * 5;
    this.color = color(h, s, v);
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  isOffScreen() {
    return this.pos.y > height + this.rad;
  }
}

let emitter;
let gravity;
let wind;

function setup() {
  createCanvas(800, 600);
  colorMode(HSL, 360, 100, 100);
  emitter = new Emitter(width / 2, 0);
  gravity = createVector(0, 0.1);
  wind = createVector(0.5, 0);
  background(255);
}

function draw() {
  background(255);
  emitter.createParticle();
  emitter.applyGravity(gravity);
  emitter.applyForce(wind);
  emitter.update();
  emitter.display();
  emitter.removeDeadParticles();
  console.log(emitter.particles.length);
}

function mousePressed() {
  emitter.particles = [];
}
