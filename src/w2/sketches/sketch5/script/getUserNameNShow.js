let userName = prompt('당신의 이름은 무엇입니까?', '홍길동');
let isUserNameCorrect = confirm('당신의 이름이 ' + userName + '이 맞습니까?');
if (isUserNameCorrect == true) {
  document.getElementById('user-name-goes-here').textContext =
    '환영합니다. ' + userName + '님';
}
