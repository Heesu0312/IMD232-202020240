let particles = [];
let gravity;

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  colorMode(HSL, 360, 100, 100, 100);
  gravity = createVector(0, 0.05);
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);

  if (random(1) < 0.5) {
    let x = random(width);
    let p = new Particle(x, 0);
    particles.push(p);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.applyForce(gravity);
    p.update();
    p.display();

    if (p.isOffScreen()) {
      particles.splice(i, 1);
    }
  }

  console.log('현재 파티클 수: ' + particles.length);
}
