import {checkWin, winCombos} from "./checkwin";
import {underline} from "./underline";

let origBoard;
let humanScore = 0;
let computerScore = 0;
const huPlayer = 'O';
const aiPlayer = 'X';

let human1 = document.getElementById('human');
let human2 = document.getElementById('computer');
let clear = document.getElementById('clear');

clear.addEventListener('click', () => {
    location.reload();
});

let currentPlayer = false;

const cells = document.querySelectorAll('.cell');
startGame();
document.getElementById('startGame').addEventListener('click', startGame);

function startGame() {
    document.querySelector('.endgame').style.display = 'none';
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    if (typeof origBoard[square.target.id] === 'number' && currentPlayer == false) {
        currentPlayer = !currentPlayer;
        console.log(currentPlayer);
        turn(square.target.id, huPlayer);
        underline();
        checkTie();
    } else if (typeof origBoard[square.target.id] === 'number' && currentPlayer == true) {
        currentPlayer = !currentPlayer;
        console.log(currentPlayer);
        turn(square.target.id, aiPlayer);
        underline();
        checkTie();
    }
};

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) gameOver(gameWon)
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player === huPlayer ? 'blue' : 'red';
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player === huPlayer ? 'Player 1 win' : 'Player 2 win');
}

function emptySquares() {
    return origBoard.filter(s => typeof s === 'number');
}

function checkTie() {
    if (emptySquares().length === 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'green';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner('Tie Game!');
        return true;
    }
    return false;
}

function declareWinner(who) {
    if (who === 'Player 1 win') {
        humanScore++;
    } else if (who === 'Player 2 win') {
        computerScore++
    }
    human1.innerText = humanScore;
    human2.innerText = computerScore;
    document.querySelector('.endgame').style.display = 'block';
    document.querySelector('.endgame .text').innerText = who;
}

export {human1, human2, currentPlayer, origBoard}
