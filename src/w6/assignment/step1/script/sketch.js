let particles = [];
let gravity;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);
  rectMode(CENTER);
  colorMode(HSL, 360, 100, 100, 100);
  gravity = createVector(0, 0.05);
  background(360, 0, 100);
}

function draw() {
  background(360, 0, 100);

  // 파티클 생성
  if (random(1) < 0.5) {
    let x = random(width);
    let p = new Particle(x, 0);
    particles.push(p);
  }

  // 파티클 업데이트 및 그리기
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.applyForce(gravity); // 중력 적용
    p.update();
    p.display();

    // 화면을 벗어난 파티클 제거
    if (p.isOffScreen()) {
      particles.splice(i, 1);
    }
  }

  // 현재 파티클의 갯수를 콘솔에 표시
  console.log('현재 파티클 수: ' + particles.length);
}
