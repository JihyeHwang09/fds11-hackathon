let boardState = [
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
let x;
let y;
document.querySelectorAll(".row").forEach(rowEl => {
  rowEl.querySelectorAll(".col").forEach(colEl => {

  });
});

function drawBoard() {
  document.querySelectorAll(".row").forEach(rowEl => {
    rowEl.querySelectorAll(".col").forEach(colEl => {
      colEl.addEventListener("click", e => {
      console.log(Array.from(colEl.classList));
      console.log(Array.from(colEl.closest(".row").classList));
      let colElArray = Array.from(colEl.classList);
      let rowElArray = Array.from(colEl.closest(".row").classList);


      // 중복된 돌 놓을 수 없다고 알려주기
      if (colElArray.length > 2) {
        alert("중복된 자리에 놓을 수 없습니다.");
        return;
      }
      // 좌표 저장
      x = rowElArray[0].split("-")[1] - 1;
      y = colElArray[0].split("-")[1] - 1;

      // 흑돌, 백돌 번갈아 가며 놓기(클래스 추가)
      colEl.classList.add(check ? "black" : "white");
      check = !check;

      // 오목돌을 놓은 자리를 boardState의 상태에 적용한다.
      // 오목돌이 놓아진 경우
      // 흑돌을 놓은 경우
      if (colEl.classList.contains('black')) {
        boardState[x][y] = 1;
      // 백돌을 놓은 경우
      } else {
        boardState[x][y] = 2;
      }

      });
    });
  });
}

function resetBoard() {
  document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
      // 오목알들을 다 없애준다.
      // 추가했던 class들을 다 떼준다.
    colEl.classList.remove("black");
    colEl.classList.remove("white");
    // .result의 글씨가 안보이게 해준다.
    document.querySelector(".result").textContent = "";
    // REPLAY 버튼이 안보이게 해준다.
    // show 클래스를 떼준다.
    document.querySelector(".reset").classList.remove("show");
    })
  })
}








// 오목인지 판별
function omok(arr) {
  // 가로줄 확인
  for (let i = 0; i < arr.length; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < arr.length; j++) {
      // 새로운 플레이어를 발견했을 때
      if (currentPlayer !== arr[i][j]) {
        currentPlayer = arr[i][j];
        count = 1;
      } else {
        count++;
      }

      // 만약 1이나 2가 5번 연속되어 있으면
      // if ((currentPlayer === 1 && count === 5) || (currentPlayer === 2 && count === 5)) {
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }

  // 세로줄 확인
  for (let i = 0; i < arr.length; i++) {
    let currentPlayer1;
    let count1;
    for (let j = 0; j < arr.length; j++) {
      // 새로운 플레이어를 발견했을 때
      if (currentPlayer1 !== arr[j][i]) {
        currentPlayer1 = arr[j][i];
        count1 = 1;
      } else {
        count1++;
      }

      if ((currentPlayer1 === 1 || currentPlayer1 === 2) && count1 === 5) {
        return currentPlayer1;
      }
    }
  }

  // 왼쪽 대각선 확인
  // 윗 삼각형
  for (let i = 0; i < arr.length; i++) {
    let currentPlayer2;
    let count2;
    for (let j = 0; j < arr.length; j++) {
      if (i + j < arr.length && currentPlayer2 !== arr[i][i + j]) {
        currentPlayer2 = arr[i][i + j];
        count2 = 1;
      } else {
        count2++;
      }
      if ((currentPlayer2 === 1 || currentPlayer2 === 2) && count2 === 5) {
        return currentPlayer2;
      }
    }
  }
  // 아랫 삼각형
  for (let i = 0; i < arr.length; i++) {
    let currentPlayer3;
    let count3;
    for (let j = 0; j < arr.length; j++) {
      if (i + j < arr.length && currentPlayer3 !== arr[i + j][j]) {
        currentPlayer3 = arr[i + j][j];
        count3 = 1;
      } else {
        count3++;
      }
      if ((currentPlayer3 === 1 || currentPlayer3 === 2) && count3 === 5) {
        return currentPlayer3;
      }
    }
  }

  // 오른쪽 대각선 확인
  // 윗 삼각형

  for (let i = 0; i < arr.length; i++) {
    let currentPlayer4;
    let count4;
    for (let j = 0; j < arr.length; j++) {
      if (currentPlayer4 !== arr[j][arr.length - 1 - (i + j)]) {
        currentPlayer4 = arr[j][arr.length - 1 - (i + j)];
        count4 = 1;
      } else {
        count4++;
      }
      if ((currentPlayer4 === 1 || currentPlayer4 === 2) && count4 === 5) {
        return currentPlayer4;
      }
    }
  }

  // 아랫 삼각형
  for (let i = 0; i < arr.length; i++) {
    let currentPlayer5;
    let count5;
    for (let j = 0; j < arr.length; j++) {
      if (
        i + j < arr.length &&
        currentPlayer5 !== arr[i + j][arr.length - 1 - j]
      ) {
        currentPlayer5 = arr[i + j][arr.length - 1 - j];
        count5 = 1;
      } else {
        count5++;
      }
      if ((currentPlayer5 === 1 || currentPlayer5 === 2) && count5 === 5) {
        return currentPlayer5;
      }
    }
  }

  return 0;
}




// 오목이 아니라면, 칸을 더 선택할 수 있게 해준다.
// 오목이 되었다면, 승자를 알려주고 게임을 종료시킨다.
// 흑돌이 승리한 경우
if (omok(boardState) === 1) {
  alert('흑돌이 승리하였습니다.');
// 백돌이 승리한 경우
} else {
  alert('백돌이 승리하였습니다.');
}

drawBoard();
  // // 오목이면(게임이 종료되면) 리셋하기
  //     el.classList.remove();









  document.querySelector(".reset").addEventListener("click", e => {
    boardState = [
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
    resetBoard();
  });

  drawBoard();
