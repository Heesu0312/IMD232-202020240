let traffic; //Traffic 클래스의 인스턴스를 나타내는 변수 traffic를 선언
let infiniteOffset = 80; //infiniteOffset 변수를 80으로 초기화

function setup() {
  //초기 설정을 위한 setup 함수이며 캔버스를 생성하고 색상 모드를 설정
  setCanvasContainer('canvas', 3, 2, true);
  colorMode(HSL, 360, 100, 100, 100);
  background('white');
  traffic = new Traffic(); //Traffic 클래스의 인스턴스를 생성하여 traffic 변수에 할당
  for (let n = 0; n < 10; n++) {
    //10번 반복하여 traffic 객체에 무작위 위치에 차량을 추가
    traffic.addVehicle(random(width), random(height));
  }
}

function draw() {
  //애니메이션을 그리기 위한 draw 함수이며 매 프레임마다 배경을 지우고 traffic 객체를 업데이트하여 차량을 이동
  background('white');
  traffic.run();
}

function mouseDragged() {
  //마우스 드래그 이벤트를 처리하는 함수이며 현재 마우스 위치에 차량을 추가
  traffic.addVehicle(mouseX, mouseY);
}
