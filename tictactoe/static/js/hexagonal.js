let n = 10;
function addButtons() {
    const playArea = document.getElementById('play-area');
    for (let i = 1; i <= n * n; i++) {
        const button = document.createElement('button');
        button.className = 'grid light-mode';
        button.id = 'grid' + i;

        if(i % (2 * n) > n || i % (2 * n) == 0) {
            button.style.marginLeft = '28.75px';
            button.style.marginRight = '-26.25px';
        }

        playArea.appendChild(button);        
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

function validPosition(x) {
    return x >= 1 && x <= n;
}

function checkWinningDiagonal1(x, y, currChr) {
    let Diagonal1 = [x + y * n];
    let ind_down = 0, ind_up = 0;
    let i = 1, j = 1;

    while(true) {
        if ((y - i) % 2 != 0){
            ind_up += 1;
        }

        if(!validPosition(x - ind_up) || !validPosition(y - i + 1)) {
            break;
        }

        const button_id = document.getElementById('grid' + (x - ind_up + (y - i) * n));
        if (button_id.innerText === currChr) {
            Diagonal1.push(x - ind_up + (y - i) * n);
        } else {
            break;
        }
        i += 1;
    }
    
    while(true) {
        if ((y + j) % 2 == 0){
            ind_down += 1;
        }

        if(!validPosition(x + ind_down) || !validPosition(y + j + 1)) {
            break;
        }

        const button_id = document.getElementById('grid' + (x + ind_down + (y + j) * n));
        if (button_id.innerText === currChr) {
            Diagonal1.push(x + ind_down + (y + j) * n);
        } else {
            break;
        }
        j += 1;
    }
    
    return Diagonal1;
}

function checkWinningDiagonal2(x, y, currChr) {
    let Diagonal2 = [x + y * n];
    let ind_down = 0;
    let ind_up = 0;
    let i = 1, j = 1;

    while(true) {
        if ((y + i) % 2 != 0){
            ind_up += 1;
        }

        if(!validPosition(x - ind_up) || !validPosition(y + i + 1)) {
            break;
        }

        const button_id = document.getElementById('grid' + (x - ind_up + (y + i) * n));
        if (button_id.innerText === currChr) {
            Diagonal2.push(x - ind_up + (y + i) * n);
        } else {
            break;
        }
        i += 1;
    }
    
    while(true) {
        if ((y - j) % 2 == 0){
            ind_down += 1;
        }

        if(!validPosition(x + ind_down) || !validPosition(y - j + 1)) {
            break;
        }

        const button_id = document.getElementById('grid' + (x + ind_down + (y - j) * n));
        if (button_id.innerText === currChr) {
            Diagonal2.push(x + ind_down + (y - j) * n);
        } else {
            break;
        }
        j += 1;
    }

    return Diagonal2;
}

function checkWinningRow(x, y, currChr) {
    let Row = [x + y * n];
    for (let i = 1; i < x; i++) {
        const button_id = document.getElementById('grid' + (x - i + y * n));
        if (button_id.innerText === currChr) {
            Row.push(x - i + y * n);
        } else {
            break;
        }
    }
    
    for (let i = 1; i <= n - x; i++) {
        const button_id = document.getElementById('grid' + (x + i + y * n));
        if (button_id.innerText === currChr) {
            Row.push(x + i + y * n);
        } else {
            break;
        }
    }

    return Row;
}

function checkWinningPossibility(x, y, currChr) {
    let Diagonal1 = checkWinningDiagonal1(x, y, currChr);
    let Diagonal2 = checkWinningDiagonal2(x, y, currChr);
    let Row = checkWinningRow(x, y, currChr);

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
        } else {
            OScore += 1;
        }

        scoreBoard()
        disableGame();
        return;
    }

    if (XPoint.length + OPoint.length === n * n) {
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
