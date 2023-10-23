class Vehicle {
  constructor(x, y, rad) {
    this.pos = creatVector(x, y);
    this.vel = creatVector();
    this.acc = creatVector();
    this.mass = 1;
    this.rad = rad;
    this.color = color;
  }

  seek(target) {
    // target.sub(this.pos);
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.speeMx);
    // desired.normalize();
    // desired.mult(this.speedMx);
    let steering = p5.Vector.sub(desired, this.vel);
    if (debug) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke(127);
      line(0, 0, desired.x, desired.y);
      pop();
    }
  }

  applyForce(force) {
    // force.div(this.mass);
    let calcedAcc = p5.Vecror.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStorke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * console(radians(-135)), this.rad * sin(radians(-135)));
    vertex(this.rad, 0);
    vertex(this.rad * console(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    pop();
  }
}
