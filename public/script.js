const X_CLASS = "x"
const O_CLASS = "o"
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")
const winMessageElement = document.getElementById("winMessage")
const restartButton = document.getElementById("restartButton")
const win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const winMessageText = document.querySelector("[winning-message-text]")
let oTurn

startGame()


restartButton.addEventListener("click", startGame)

function startGame(){
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
  cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once: true })
    })
    setBoardHoverClass()
    winMessageElement.classList.remove("show")
}

function handleClick(e) {
const cell = e.target
const currentClass = oTurn ? O_CLASS : X_CLASS
placeMark(cell, currentClass)
if (checkWin(currentClass)) {
  endGame(false)  
} else if(isdraw()) {
 endGame(true)
} else {
    swapTurn()
    setBoardHoverClass()
}

}

function endGame(draw){
if (draw) {
    winMessageText.innerText = "Draw!" 
} else {
    winMessageText.innerText = oTurn ? "O wins" : "X wins"

}

winMessageElement.classList.add('show')
}

function isdraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS)
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurn(){
    oTurn = !oTurn
}
function setBoardHoverClass() {
board.classList.remove(X_CLASS)
board.classList.remove(O_CLASS)
if (oTurn) {
    board.classList.add(O_CLASS)
} else {
    board.classList.add(X_CLASS)
}
}

function checkWin(currentClass) {
    return win_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
