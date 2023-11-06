class Vehicle {
  //Vehicle 클래스를 정의, 이 클래스는 차량을 표현, 여러 메서드와 속성을 가짐
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    //Vehicle 클래스의 생성자 함수를 정의, 이 함수는 차량의 속성들을 초기화
    this.pos = createVector(x, y); //차량의 위치를 나타내는 2D 벡터 pos를 초기화
    this.vel = p5.Vector.random2D(); //무작위 방향으로 초기화된 속도 벡터 vel를 생성
    this.acc = createVector(); //가속도를 나타내는 벡터 acc를 초기화
    this.mass = mass; //차량의 질량을 나타내는 mass를 설정
    this.rad = rad; //차량의 반지름을 설정
    this.speedMx = speedMx; //차량의 최대 속도를 나타내는 speedMx를 설정
    this.forceMx = forceMx; //차량이 받을 수 있는 최대 힘을 나타내는 forceMx를 설정
    this.neighborhooodRad = 50; // 이웃 차량을 감지하는 반경을 설정
    this.color = color; //차량의 색상을 설정
  }

  cohesion(others) {
    //다른 차량들과의 응집을 계산하는 메서드, 다른 차량과의 거리를 고려하여 움직임을 조절
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.pos);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.sub(this.pos);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  align(others) {
    //다른 차량들과의 일치를 계산하는 메서드, 다른 차량들의 속도를 고려하여 움직임을 조절
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          steer.add(each.vel);
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  separate(others) {
    //다른 차량들과의 분리를 계산하는 메서드, 다른 차량과 너무 가까우면 분리하여 충돌을 피함
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const dist = this.pos.dist(each.pos);
        if (dist > 0 && this.rad + each.rad > dist) {
          const distNormal = dist / (this.rad + each.rad);
          const towardMeVec = p5.Vector.sub(this.pos, each.pos);
          towardMeVec.setMag(1 / distNormal);
          steer.add(towardMeVec);
          cnt++;
        }
      }
    });
    if (cnt > 0) {
      steer.div(cnt);
      steer.setMag(this.speedMx);
      steer.sub(this.vel);
      steer.limit(this.forceMx);
    }
    return steer;
  }

  applyForce(force) {
    //주어진 힘을 차량에 적용하는 메서드
    const forceDivedByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDivedByMass);
  }

  update() {
    //차량의 상태를 업데이트하는 메서드이며 속도, 위치, 가속도를 업데이트
    this.vel.add(this.acc);
    this.vel.limit(this.speedMx);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  borderInfinite() {
    //차량이 화면 경계를 벗어나면 반대편으로 나타날 수 있도록 경계 조건을 처리하는 메서드
    if (this.pos.x < -infiniteOffset) {
      this.pos.x = width + infiniteOffset;
    } else if (this.pos.x > width + infiniteOffset) {
      this.pos.x = -infiniteOffset;
    }
    if (this.pos.y < -infiniteOffset) {
      this.pos.y = height + infiniteOffset;
    } else if (this.pos.y > height + infiniteOffset) {
      this.pos.y = -infiniteOffset;
    }
  }

  display() {
    //차량을 화면에 그리는 메서드, 모양과 색상을 설정하여 차량을 시각적으로 나타냄
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop();
  }
}
