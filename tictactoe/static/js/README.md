# Tic Tac Toe Game:
This is the file that contains the JS files which implement the **functions of each variation** (currently, there are 3 variations: basic, hexagonal grids and 3D board)

**Note**: The JS code for all variations, were originally inspired by Jothin Kumar’s repository [tic-tac-toe](https://github.com/Jothin-kumar/tic-tac-toe). I then customized it to suit my purpose

The **structure** of each js file includes the **XOGrid class**, the **checkWin function**, and **additional functions** for game termination, reset, and multiple rounds

## XOGrid class
This class defines the cell **attributes** for the TicTacToe game: **(x, y)** coordinates and **(x, y, z)** for the Qubic game or 3D version

```
class XOGrid {
    constructor(x, y, buttonId) {
        this.x = x;
        this.y = y;
        this.z = z; (Only for 3D version)
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
```

## checkWin function
This function **determines** whether the **winning condition** has been met (5 identical symbols in a row or diagonal for the 2D version, and 3 identical symbols in a row, diagonal, or vertically across 3 boards for the 3D version)

For **2D version** (`basic.js` and `hexagonal.js`), this function is called **every time** a player adds a symbol to the board. It primarily checks **four** directions, and for **hexagonal** boards, it checks **three** directions

For **3D version** (`qubic.js`), the function uses the **simplest** method to check for a win is to use a variable `winningPossibilities` in the js file to **store** all **winning positions** and sequentially check if there are three cells in a row, diagonal, or vertically across 3 boards) with the same character. Since this is a **3x3x3** grid, the checking process doesn’t **take much time**

## Additional functions
* playAgain(): A function to play another round and store past scores
* resetGame(): A function to reset the game and clear all saved data
* switchTheme(): A function to toggle between dark and light themes

## Visual examples
### Basic tictactoe
![basic](https://github.com/CryAndRRich/Tictactoe-Game/blob/main/.github/demo_img3.jpg)
### Hexagonal grids
![hexagonal](https://github.com/CryAndRRich/Tictactoe-Game/blob/main/.github/demo_img4.jpg)
### Qubic - 3D version (Dark Grid Mode)
![qubic](https://github.com/CryAndRRich/Tictactoe-Game/blob/main/.github/demo_img5.jpg)
