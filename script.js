let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let scores = { X: 0, O: 0 };
let highestScore = 0;

function initializeGame(resetScores = false) {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
        box.style.color = "#fff";
        box.addEventListener("click", handleCellClick);
    });

    turn = "X";
    isGameOver = false;
    document.getElementById("turn-display").textContent = turn;
    document.getElementById("results").textContent = "";
    document.getElementById("congrats")?.remove();

    if (resetScores) {
        scores = { X: 0, O: 0 };
        highestScore = 0;
        updateScores();
    }

    // Reset grid and background color to original settings
    document.body.style.backgroundColor = "#252A34";
    document.querySelector(".main-grid").style.backgroundColor = "#252A34";
}

function handleCellClick(e) {
    if (isGameOver || e.target.innerHTML !== "") return;
    e.target.innerHTML = turn;

    if (checkWin()) {
        isGameOver = true;
        document.getElementById("results").textContent = `Player ${turn} wins! 🎉`;
        displayCelebration(turn);
        scores[turn]++;
        updateScores();
        updateHighestScore();
    } else if (checkDraw()) {
        isGameOver = true;
        document.getElementById("results").textContent = "It's a draw!";
    } else {
        turn = turn === "X" ? "O" : "X";
        document.getElementById("turn-display").textContent = turn;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
            return true;
        }
        return false;
    });
}

function checkDraw() {
    return Array.from(boxes).every(box => box.innerHTML !== "");
}

function updateScores() {
    document.getElementById("scoreX").textContent = scores["X"];
    document.getElementById("scoreO").textContent = scores["O"];
}

function updateHighestScore() {
    const maxScore = Math.max(scores["X"], scores["O"]);
    if (maxScore > highestScore) {
        highestScore = maxScore;
        document.getElementById("highest-score").textContent = highestScore;
    }
}

// Display celebratory message and emojis
function displayCelebration(winner) {
    const congratsMessage = document.createElement('div');
    congratsMessage.id = 'congrats';
    congratsMessage.innerHTML = `🎉 Congratulations Player ${winner}! 🎉`;
    document.body.appendChild(congratsMessage);

    // Change background and grid color for celebration
    document.body.style.backgroundColor = "#FF6347"; // Tomato color for background
    document.querySelector(".main-grid").style.backgroundColor = "#FFEB3B"; // Yellow grid color
}

// Event Listeners
document.getElementById("replay-game").addEventListener("click", () => initializeGame(false));
document.getElementById("new-game").addEventListener("click", () => initializeGame(true));

initializeGame();
