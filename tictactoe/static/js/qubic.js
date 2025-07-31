let n = 3;

function addButtons() {
    const playArea = document.getElementById('play-area');
    for (let i = 1; i <= n * n * n; i++) {
        const button = document.createElement('button');
        button.className = 'grid light-mode';
        button.id = 'grid' + i; 
        playArea.appendChild(button);
    }
    changePos();
}

function changePos() {
    const buttons = document.getElementsByClassName("grid");
    let i = 0;
    while (i <= n * n * n) {
        let mar = (n - 1 - (i % (n * n)) / n) * 65;
        for (let j = 0; j < n; j++) {
            buttons[i + j].style.marginLeft = mar + 'px';
        }
        i += n;
    }
}

let currentChr = 'X';
let XPoint = [];
let OPoint = [];
let XScore = 0;
let OScore = 0;

class XOGrid {
    constructor(x, y, z, buttonId) {
        this.x = x;
        this.y = y;
        this.z = z;
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

            checkWin(this.x, this.y - 1, this.z - 1, this.button.innerText);
            currentChr = currentChr === 'X' ? 'O': 'X';
            switchChr();
        }
    }
}

function validPosition(x) {
    return x >= 1 && x <= n;
}

const winningPossibilities = [
    [1, 0, 0], [0, 1, 0], [0, 0, 1],
    [1, 1, 0], [1, -1, 0],
    [1, 0, 1], [0, 1, 1], [1, 0, -1], [0, 1, -1],
    [1, 1, 1], [1, -1, 1], [1, 1, -1], [1, -1, -1]
] 

function checkWinningPossibility(x, y, z, currChr) {
    let winningPos = [];

    for (let i = 0; i < winningPossibilities.length; i++) {
        let nx = winningPossibilities[i][0];
        let ny = winningPossibilities[i][1];
        let nz = winningPossibilities[i][2];

        let pos = [x + n * y + n * n * z];
        let k = 1;
        while(validPosition(x + k * nx) && validPosition(y + 1 + k * ny) && validPosition(z + 1 + k * nz)) {
            let id = (x + k * nx) + (y + k * ny) * n + (z + k * nz) * n * n;
            const button = document.getElementById('grid' + id);
            if (button.innerText === currChr) {
                pos.push(id);
            }
            else {
                break;
            }
            k += 1;
        }

        let h = 1;
        while(validPosition(x - h * nx) && validPosition(y + 1 - h * ny) && validPosition(z + 1 - h * nz)) {
            let id = (x - h * nx) + (y - h * ny) * n + (z - h * nz) * n * n;
            const button = document.getElementById('grid' + id);
            if (button.innerText === currChr) {
                pos.push(id);
            }
            else {
                break;
            }
            h += 1;
        }

        if (pos.length >= 3) {
            for(let j = 0; j < pos.length; j++) {
                winningPos.push(pos[j]);
            }
        }

    }
    return winningPos;
}

function checkWin(x, y, z, currChr) {
    const statusLabel = document.getElementById('status');

    let winningPos = checkWinningPossibility(x, y, z, currChr);
    if (winningPos.length >= 3) {
        winningPosition(winningPos);
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

    if (XPoint.length + OPoint.length === n * n * n) {
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
    for (let i = 1; i <= n * n * n; i++) {
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
        new XOGrid(i % n + 1, Math.floor(i / n) % n + 1, Math.floor(i / (n * n)) + 1, squareElements[i].id);
    }
};
