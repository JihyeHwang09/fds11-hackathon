let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let check = true;
let flag = true;
let colEl = document.querySelectorAll(".col");
const startBtnEl = document.querySelector('.startBtn');

const whiteTimerEl = document.querySelector('.white-timer');
const blackTimerEl = document.querySelector('.black-timer');


function drawBoard() {
  colEl.forEach(el => {
    el.addEventListener("click", e => {
      if (!flag) return;
      // console.log(Array.from(el.classList));
      // console.log(Array.from(el.closest(".row").classList));
      let x;
      let y;
      let colArray = Array.from(el.classList);
      let rowArray = Array.from(el.closest(".row").classList);

      // 중복된 자리에 놓을 수 없게 하기
      // 1. classList.contains를 이용
      if (el.classList.contains("black") || el.classList.contains("white")) {
        alert("중복된 자리에 놓을 수 없습니다.");
        return;
      }
      // 2. colArray.length를 이용
      // if (colArray.length > 2) {
      //     alert("중복된 자리에 놓을 수 없습니다.");
      //   }

      // 흑돌, 백돌 번갈아 가며 놓기(클래스 추가)
      el.classList.add(check ? "black" : "white");

      // 좌표 저장
      x = rowArray[0].split("-")[1] - 1;
      y = colArray[0].split("-")[1] - 1;

      // 오목돌을 놓은 자리를 board의 상태에 적용한다.
      // 흑돌을 놓은 경우 1, 백돌을 놓은 경우 2를 board에 넣는다.
      board[x][y] = check ? 1 : 2;

      // 다른 색깔 돌이 놓아지게 바꿔주기
      check = !check;
      // 오목이 된 경우

      // 흑돌이 승리한 경우
      if (omok(1) || omok(2)) {
        document.querySelector(".startBtn").classList.remove("show");
        document.querySelector(".resetBtn").classList.add("show");
        if (omok(1)) {
          setTimeout(() => {
            alert("흑돌이 승리하였습니다.");
          }, 200);
          // 백돌이 승리한 경우
        } else if (omok(2)) {
          setTimeout(() => {
            alert("백돌이 승리하였습니다.");
          }, 200);
        }
        flag = false;
      }
      // 오목인지 판별하는 함수
      function omok(type) {
        let leftCross = 0, rightCross = 0, leftReverse = 0, rightReverse = 0
        for (let i = 0; i < board.length; i++) {
          // 가로 horizon= 0, 세로 vertical = 0 -> 초기화
          let horizon = vertical = 0;
          for (let j = 0; j < board.length; j++) {
            if (board[i][j] === type) {
              horizon++;
            } else {
              horizon = 0;
            }
            if (board[j][i] === type) {
              vertical++;
            } else {
              vertical = 0;
            }
            if (horizon === 5 || vertical === 5) {
              return true;
            }
            if (i + j < board.length && board[j][i + j] === type) {
              leftCross++;
            } else {
              leftCross = 0;
            }
            if (i + j < board.length && board[i + j][j] === type) {
              rightCross++;
            } else {
              rightCross = 0;
            }
            if (leftCross === 5 || rightCross === 5) {
              return true;
            }
            if (i + j < board.length && board[board.length - 1 - j][i + j] === type) {
              leftReverse++;
            } else {
              leftReverse = 0;
            }
            if (i + j < board.length && board[board.length - 1 - (i + j)][j] === type) {
              rightReverse++;
            } else {
              rightReverse = 0;
            }
            if (leftReverse === 5 || rightReverse === 5) {
              return true;
            }
          }
        }
        return false;
      }





    });
  });
}


// REPLAY 버튼을 눌렀을 때 리셋하기
document.querySelector(".resetBtn").addEventListener("click", e => {
    document.querySelectorAll(".col").forEach(el => {
      board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      // 오목알들을 다 없애준다.
      // 추가했던 class들을 다 떼준다.
      el.classList.remove("black");
      el.classList.remove("white");
      // REPLAY 버튼이 안보이게 해준다.
      document.querySelector(".resetBtn").classList.remove("show");
      // Start 버튼을 보여준다.
      startBtnEl.classList.add("show");
      flag = true;
    });
});
startBtnEl.addEventListener("click", e => {
  drawBoard();
});


