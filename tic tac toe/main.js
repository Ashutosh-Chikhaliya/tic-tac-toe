let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#resetBtn");
let winner = document.querySelector(".winner");
let newGame = document.querySelector("#newGameBtn");

// player 1--> player x
// player 2--> player o
// alternate turn ..... X O X O X O

let turnO = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let resetGame = () => {
  turnO = true;
  enabledBoxBtn();
  winner.innerHTML = "";
  count = 0;
};

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (turnO) {
      btn.innerHTML = "O";
      turnO = false;
    } else {
      btn.innerHTML = "X";
      turnO = true;
    }
    btn.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1Val = btns[pattern[0]].innerText;
    let pos2Val = btns[pattern[1]].innerText;
    let pos3Val = btns[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winnerMsg(pos1Val);
      }
    }
  }
};

// winner msg
let winnerMsg = (pos1Val = "draw") => {
  winner.innerHTML = `winner : ${pos1Val}`;
  disabledBoxBtn();
};

//draw
let gameDraw = () => {
  winner.innerHTML = `Game is Draw`;
  disabledBoxBtn();
};

// after game end
let disabledBoxBtn = () => {
  for (let btn of btns) {
    btn.disabled = true;
  }
};

let enabledBoxBtn = () => {
  for (let btn of btns) {
    btn.disabled = false;
    btn.innerText = "";
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
