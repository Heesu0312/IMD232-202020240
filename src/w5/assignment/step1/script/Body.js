class Body {
  constructor(x, y, mass) {
    this.pos;
    this.vel;
    this.acc;
    this.mass;
    this.rad;
  }

  attract(body) {
    const force = p5.Vector.sub(this.pos, body.pos);

    return force;
  }

  applyForce(force) {
    const acc = p5.Vector.div(force, this.mass);
    this.acc.add(acc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  display() {
    noStroke();
    fill(0, 127);
    circle(this.pos.x, this.pos.y, this.rad * 2);
  }
}
