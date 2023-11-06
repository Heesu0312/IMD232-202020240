class Traffic {
  constructor() {
    //Traffic 객체를 초기화하고 vehicles 배열을 빈 배열로 설정
    this.vehicles = [];
  }

  run() {
    //vehicles 배열 내의 모든 차량에 대해 다음 단계를 수행
    this.vehicles.forEach((eachVehicle) => {
      const separate = eachVehicle.separate(this.vehicles);
      separate.mult(1); //차량 간의 분리 힘을 계산하고 이를 각 차량에 적용하여 차량들이 서로 너무 가까이 몰리지 않도록 함
      eachVehicle.applyForce(separate);
      const align = eachVehicle.align(this.vehicles);
      align.mult(0.5); //차량 간의 일치하는 힘을 계산하고 이를 각 차량에 적용하여 차량들이 일정 방향으로 움직이도록 함
      eachVehicle.applyForce(align);
      const cohesion = eachVehicle.cohesion(this.vehicles);
      cohesion.mult(0.5); //차량 간의 응집 힘을 계산하고 이를 각 차량에 적용하여 차량들이 서로 가까이 모여 움직이도록 함
      eachVehicle.applyForce(cohesion);
      eachVehicle.update(); //각 차량의 위치와 속도를 업데이트하여 움직임
      eachVehicle.borderInfinite(); //만약 차량이 화면 경계를 벗어나면 반대편에서 나타날 수 있도록 처리함
      eachVehicle.display(); //각 차량을 화면에 그림
    });
  }

  addVehicle(x, y) {
    //이 메서드는 주어진 위치 x와 y에 새로운 차량을 생성하고 vehicles 배열에 추가하며 차량의 질량, 반지름, 최대 속도, 최대 힘, 그리고 색상은 미리 정의되어 있으며 이를 새로운 차량에 설정함
    // const mass = floor(random(1, 3));
    const mass = 1;
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 12, 5, 0.1, color(random(360), 100, 40))
    );
  }
}
