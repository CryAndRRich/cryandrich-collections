const minDelay = 900;
const maxDelay = 1200;

const minLetters = 10;
const maxLetters = 18;

const delay = 80;

const startAscii = 65;
const endAscii = 91;

const title = {
    "first-header": "SORTING",
    "second-header": "ALGORITHMS",
    "third-header": "VISUALIZER"
};

getEle("header").onclick = headerAnimation;
headerAnimation();

function oneHeaderAnimation(whichId) {
    getEle(whichId).innerHTML.split("").forEach( (_, i) => {
        letterAnimation(whichId, i);
    }
)}

function headerAnimation() {
    oneHeaderAnimation('first-header');
    oneHeaderAnimation('second-header');
    oneHeaderAnimation('third-header');
}

async function letterAnimation(child, i) {
    await sleep(Math.floor(Math.random() * minDelay) + maxDelay - minDelay);
    let rand = Math.floor(Math.random() * minLetters) + maxLetters - minLetters;
    let target = [];

    for (let k = 0; k < rand; k += 1) target.push(randomLetter());

    target.push(title[child][i]);

    for (let j = 0; j < target.length; j += 1) {
        changeLetter(child, target[j], i);
        await sleep(delay);
    }
}

function randomLetter() {
    return String.fromCharCode(startAscii + Math.floor(Math.random() * (endAscii - startAscii)));
}

function changeLetter(child, repl, i) {
    child = getEle(child);
    let temp = child.innerHTML;
    child.innerHTML = temp.substr(0, i) + repl + temp.substr(i+1);
}

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}