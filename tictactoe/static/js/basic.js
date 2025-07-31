let n = 10;
function addButtons() {
    const playArea = document.getElementById('play-area');
    for (let i = 1; i <= n * n; i++) {
        const button = document.createElement('button');
        button.className = 'grid light-mode';
        button.id = 'grid' + i;
        playArea.appendChild(button);

        if (i % n === 0 && i < n * n) {
            playArea.appendChild(document.createElement('br'));
        }
    }
}

let currentChr = 'X';
let XPoint = [];
let OPoint = [];
let XScore = 0;
let OScore = 0;

class XOGrid {
    constructor(x, y, buttonId) {
        this.x = x;
        this.y = y;
        this.button = document.getElementById(buttonId);
        this.button.onclick = () => {
            this.set(buttonId)
        }
    }
    set(buttonId) {
        this.button = document.getElementById(buttonId);

        const audio = document.getElementById('audio');
        audio.play();

        if (this.button.innerText === '') {
            this.button.innerText = currentChr;
            if (currentChr === 'X') {
                XPoint.push(this);
                this.button.style.color = 'red';
            } else {
                OPoint.push(this);
                this.button.style.color = 'blue';
            }

            checkWin(this.x, this.y - 1, currentChr);
            currentChr = currentChr === 'X' ? 'O': 'X';
            switchChr();
        }
    }
}

function checkWinningDiagonal1(x, y, currChr) {
    let Diagonal1 = [x + y * n];
    for (let i = 1; i < Math.min(x, y + 1); i++) {
        const button_id = document.getElementById('grid' + (x - i + (y - i) * n));
        if (button_id.innerText === currChr) {
            Diagonal1.push(x - i + (y - i) * n);
        }
        else {
            break;
        }
    }
    
    for (let i = 1; i <= Math.min(n - x, n - 1 - y); i++) {
        const button_id = document.getElementById('grid' + (x + i + (y + i) * n));
        if (button_id.innerText === currChr) {
            Diagonal1.push(x + i + (y + i) * n);
        }
        else {
            break;
        }
    }
    
    return Diagonal1;
}

function checkWinningDiagonal2(x, y, currChr) {
    let Diagonal2 = [x + y * n];
    for (let i = 1; i < Math.min(n + 1 - x, y + 1); i++) {
        const button_id = document.getElementById('grid' + (x + i + (y - i) * n));
        if (button_id.innerText === currChr) {
            Diagonal2.push(x + i + (y - i) * n);
        }
        else {
            break;
        }
    }
    
    for (let i = 1; i < Math.min(x, n - y); i++) {
        const button_id = document.getElementById('grid' + (x - i + (y + i) * n));
        if (button_id.innerText === currChr) {
            Diagonal2.push(x - i + (y + i) * n);
        }
        else {
            break;
        }
    }

    return Diagonal2;
}

function checkWinningRow(x, y, currChr) {
    let Row = [x + y * n];
    for (let i = 1; i < x; i++) {
        const button_id = document.getElementById('grid' + (x - i + y * n));
        if (button_id.innerText === currChr) {
            Row.push(x - i + y * n);
        }
        else {
            break;
        }
    }
    
    for (let i = 1; i <= n - x; i++) {
        const button_id = document.getElementById('grid' + (x + i + y * n));
        if (button_id.innerText === currChr) {
            Row.push(x + i + y * n);
        }
        else {
            break;
        }
    }

    return Row;
}

function checkWinningColumn(x, y, currChr) {
    let Col = [x + y * n];
    for (let i = 1; i <= y; i++) {
        const button_id = document.getElementById('grid' + (x + (y - i) * n));
        if (button_id.innerText === currChr) {
            Col.push(x + (y - i) * n);
        }
        else {
            break;
        }
    }
    
    for (let i = 1; i < n - y; i++) {
        const button_id = document.getElementById('grid' + (x + (y + i) * n));
        if (button_id.innerText === currChr) {
            Col.push(x + (y + i) * n);
        }
        else {
            break;
        }
    }

    return Col;
}

function checkWinningPossibility(x, y, currChr) {
    let Diagonal1 = checkWinningDiagonal1(x, y, currChr);
    let Diagonal2 = checkWinningDiagonal2(x, y, currChr);
    let Row = checkWinningRow(x, y, currChr);
    let Col = checkWinningColumn(x, y, currChr);

    let winning_pos = [];
    if (Diagonal1.length >= 5) {
        for (let i = 0; i < Diagonal1.length; i++) {
            winning_pos.push(Diagonal1[i]);
        }
    }
    if (Diagonal2.length >= 5) {
        for (let i = 0; i < Diagonal2.length; i++) {
            winning_pos.push(Diagonal2[i]);
        }
    }
    if (Row.length >= 5) {
        for (let i = 0; i < Row.length; i++) {
            winning_pos.push(Row[i]);
        }
    }
    if (Col.length >= 5) {
        for (let i = 0; i < Col.length; i++) {
            winning_pos.push(Col[i]);
        }
    }
    return winning_pos;
}

function checkWin(x, y, currChr) {
    const statusLabel = document.getElementById('status');
    let winning_pos = checkWinningPossibility(x, y, currChr);
    if (winning_pos.length >= 5) {
        winningPosition(winning_pos);
        statusLabel.innerText = currChr + ' wins';
        if (currChr === 'X') {
            XScore += 1;
        }
        else {
            OScore += 1;
        }
        scoreBoard()
        disableGame();
        return;
    }

    if (XPoint.length + OPoint.length === 100) {
        statusLabel.innerText = 'Draw';
        disableGame();
    }
}

function winningPosition(pos) {
    for (let i = 0; i < pos.length; i++) {
        const button_id = document.getElementById('grid' + pos[i]);
        button_id.style.backgroundColor = (currentTheme == 'light') ? 'orange': 'gray';
    }
}

function disableGame() {
    const buttons = document.getElementsByClassName('grid');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    const play = document.getElementById('play-again');
    play.innerText = 'Next Round';
}

function playAgain() {
    for (let i = 1; i <= n * n; i++) {
        const button = document.getElementById('grid' + i);
        button.disabled = false;
        button.innerText = '';
        button.style.backgroundColor = (currentTheme == 'light') ? 'white': 'black';
    }
    XPoint = [];
    OPoint = [];
    currentChr = 'X';

    const statusLabel = document.getElementById('status');
    statusLabel.innerText = "X's turn";
    titleCheck();
    
    const play = document.getElementById('play-again');
    play.innerText = 'Cancel Round';
}

function resetGame() {
    XScore = 0;
    OScore = 0;
    scoreBoard();
    playAgain();
}

window.onload = () => {
    let squareElements = document.getElementsByClassName('grid');
    for (let i = 0; i < squareElements.length; i++) {
        new XOGrid(i % n + 1, Math.floor(i / n) + 1, squareElements[i].id);
    }
};