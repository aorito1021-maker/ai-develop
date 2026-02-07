const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const remainingEl = document.getElementById("remaining");
const piecesContainer = document.getElementById("pieces");
const resetButton = document.getElementById("reset");

const gridSize = 10;
const cellSize = canvas.width / gridSize;
let board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
let score = 0;
let pieces = [];
let selectedIndex = null;

const shapes = [
  [
    [1, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
];

const clone = (shape) => shape.map((row) => [...row]);

const randomShape = () => clone(shapes[Math.floor(Math.random() * shapes.length)]);

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < gridSize; row += 1) {
    for (let col = 0; col < gridSize; col += 1) {
      ctx.fillStyle = board[row][col] ? "#4f46e5" : "#e0e7ff";
      ctx.fillRect(col * cellSize, row * cellSize, cellSize - 2, cellSize - 2);
    }
  }
}

function drawPieces() {
  piecesContainer.innerHTML = "";
  pieces.forEach((shape, index) => {
    const piece = document.createElement("div");
    piece.className = "piece";
    if (selectedIndex === index) {
      piece.style.outline = "2px solid #4f46e5";
    }
    piece.addEventListener("click", () => {
      selectedIndex = index;
      drawPieces();
    });

    shape.forEach((row) => {
      row.forEach((cell) => {
        const cellEl = document.createElement("div");
        cellEl.className = "piece-cell";
        if (cell) {
          cellEl.classList.add("active");
        }
        piece.appendChild(cellEl);
      });
    });
    piecesContainer.appendChild(piece);
  });
  remainingEl.textContent = pieces.length;
}

function newRound() {
  pieces = [randomShape(), randomShape(), randomShape()];
  selectedIndex = null;
  drawPieces();
}

function canPlace(shape, startRow, startCol) {
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      if (!shape[row][col]) continue;
      const boardRow = startRow + row;
      const boardCol = startCol + col;
      if (boardRow >= gridSize || boardCol >= gridSize) return false;
      if (board[boardRow][boardCol]) return false;
    }
  }
  return true;
}

function placeShape(shape, startRow, startCol) {
  let placedCells = 0;
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      if (!shape[row][col]) continue;
      board[startRow + row][startCol + col] = 1;
      placedCells += 1;
    }
  }
  score += placedCells * 10;
}

function clearLines() {
  const fullRows = [];
  const fullCols = [];
  for (let row = 0; row < gridSize; row += 1) {
    if (board[row].every((cell) => cell === 1)) {
      fullRows.push(row);
    }
  }
  for (let col = 0; col < gridSize; col += 1) {
    let allFilled = true;
    for (let row = 0; row < gridSize; row += 1) {
      if (!board[row][col]) {
        allFilled = false;
        break;
      }
    }
    if (allFilled) {
      fullCols.push(col);
    }
  }
  if (fullRows.length === 0 && fullCols.length === 0) return;

  fullRows.forEach((row) => {
    board[row] = Array(gridSize).fill(0);
  });
  fullCols.forEach((col) => {
    for (let row = 0; row < gridSize; row += 1) {
      board[row][col] = 0;
    }
  });
  score += (fullRows.length + fullCols.length) * 100;
}

function updateScore() {
  scoreEl.textContent = score.toString();
}

canvas.addEventListener("click", (event) => {
  if (selectedIndex === null) return;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const startCol = Math.floor(x / cellSize);
  const startRow = Math.floor(y / cellSize);
  const shape = pieces[selectedIndex];
  if (!shape) return;
  if (!canPlace(shape, startRow, startCol)) return;
  placeShape(shape, startRow, startCol);
  pieces.splice(selectedIndex, 1);
  selectedIndex = null;
  clearLines();
  updateScore();
  if (pieces.length === 0) {
    newRound();
  }
  drawBoard();
  drawPieces();
});

resetButton.addEventListener("click", () => {
  board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
  score = 0;
  updateScore();
  newRound();
  drawBoard();
});

newRound();
drawBoard();
updateScore();
