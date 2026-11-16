const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";

let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

let xWins = 0;
let oWins = 0;


// Winning combinations

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// Cell click event

cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        checkWinner();

    });

});


// Check winner

function checkWinner() {

    let roundWon = false;

    for (let condition of winningConditions) {

        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            roundWon = true;
            break;

        }

    }

    if (roundWon) {

        statusText.textContent =
            "🎉 Player " + currentPlayer + " Wins!";

        if (currentPlayer === "X") {

            xWins++;
            scoreX.textContent = xWins;

        } else {

            oWins++;
            scoreO.textContent = oWins;

        }

        gameActive = false;

        return;

    }


    // Check draw

    if (!board.includes("")) {

        statusText.textContent = "🤝 It's a Draw!";

        gameActive = false;

        return;

    }


    // Switch player

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        "Player " + currentPlayer + "'s Turn";

}


// Restart round

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x", "o");

    });

}


// New game

function newGame() {

    restartGame();

    xWins = 0;
    oWins = 0;

    scoreX.textContent = "0";
    scoreO.textContent = "0";

}


// Button events

restartBtn.addEventListener("click", restartGame);

newGameBtn.addEventListener("click", newGame);