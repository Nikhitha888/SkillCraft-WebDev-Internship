const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let mode = "player";

const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function setMode(selectedMode){
  mode = selectedMode;
  restartGame();
}

function handleCellClick(clickedCellEvent){

  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex =
    parseInt(clickedCell.getAttribute("data-index"));

  if(gameState[clickedCellIndex] !== "" || !gameActive){
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkWinner();

  if(mode === "computer" &&
     currentPlayer === "O" &&
     gameActive){

      setTimeout(computerMove,500);
  }
}

function checkWinner(){

  let roundWon = false;

  for(let i=0; i<winningConditions.length; i++){

    const condition = winningConditions[i];

    const a = gameState[condition[0]];
    const b = gameState[condition[1]];
    const c = gameState[condition[2]];

    if(a === "" || b === "" || c === ""){
      continue;
    }

    if(a === b && b === c){
      roundWon = true;
      break;
    }
  }

  if(roundWon){
    statusText.textContent =
      `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if(!gameState.includes("")){
    statusText.textContent = "Draw!";
    gameActive = false;
    return;
  }

  currentPlayer =
    currentPlayer === "X" ? "O" : "X";

  statusText.textContent =
    `${currentPlayer}'s Turn`;
}

function computerMove(){

  let emptyCells = [];

  gameState.forEach((cell,index)=>{
    if(cell === ""){
      emptyCells.push(index);
    }
  });

  const randomIndex =
    emptyCells[Math.floor(Math.random()*emptyCells.length)];

  gameState[randomIndex] = "O";

  cells[randomIndex].textContent = "O";

  checkWinner();
}

function restartGame(){

  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];

  statusText.textContent = `${currentPlayer}'s Turn`;

  cells.forEach(cell=>{
    cell.textContent = "";
  });
}

cells.forEach(cell=>
  cell.addEventListener("click", handleCellClick)
);

statusText.textContent = `${currentPlayer}'s Turn`;