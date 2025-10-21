const SHUFFLE_DELAY = 2000;
const SORT_DELAY = 5000;

const RED = "element-red";
const BLUE = "element-blue";
const GREEN = "element-green";

const NOTE_DURATION = 50;
const FREQ_MIN = 200;
const FREQ_MAX = 600;

const VOLUME = 1;
const audioCtx = new(window.AudioContext)();

let elements = [];
let running = false;
let shuffling = false;

let comparisons = 0;
let swaps = 0;

window.addEventListener("load", () => {
    fillBox();
    document.getElementById("audio").addEventListener("click", audioButton);
    updateAudioIcon();

    let imple = getEle("imple-btns");
    if (!imple) return;
    for (let i = 0; i < imple.children.length - 1; i += 1) {
        imple.children[i].addEventListener("click", () => {
            loadCode(imple.children[i]);
        })
    }
    loadCode(imple.children[0]);
});

function fillBox(value=getEle("slider").value) {
    let box = getEle("sort-container");
    let size = 100 / value;
    clearBox(box);

    elements = [];

    for (let i = 0; i < value; i += 1) {
        let element = document.createElement("div");
        element.classList.add("element");
        element.style.left = i * size + "%";
        element.style.width = size + "%";
        element.style.height = (i + 1) * size + "%";
        elements.push(element);
        box.append(element);
    }
}

function clearBox(box) {
    while (box.lastElementChild) {
        box.removeChild(box.lastElementChild);
    }
}

function audioButton() {
    audio = getEle("audio").firstElementChild.innerHTML === "volume_off" | 0;
    updateAudioIcon();

    fetch("/audio/", {
        method: "PUT",
    })
}

function updateAudioIcon() {
    let icons = ["volume_off", "volume_up"];
    getEle("audio").firstChild.innerHTML = icons[audio | 0];
}

function loadCode(btn) {
    let lang = btn.firstElementChild.title;
    let imple = getEle("imple-btns");

    for (let i = 0; i < imple.children.length; i += 1) {
        imple.children[i].classList.remove("imple-btns-activated");
    }

    btn.classList.add("imple-btns-activated");
    let code = getEle("code");
    code.innerHTML = codes[lang];
    code.className = '';
    code.classList.add(lang.toLowerCase())
}

function sliderChange() {
    running = false;
    let slider = getEle("slider");
    let sliderSpan = getEle("slider-span");
    sliderSpan.innerHTML = slider.value;
    fillBox();
    activateButtons();
}

function activateButtons() {
    btn = getEle("run-btn");
    btn.lastElementChild.innerHTML = 'play_arrow'
    btn.onclick = run;
    btn.disabled = false;
    document.getElementById("shuffle-btn").disabled = false;
}

async function shuffle() {
    running = true;
    shuffling = true;
    updateCompare(0, 0);
    disableButtons();
    for (let i = 0; i < elements.length; i += 1) {
        let rand_index = Math.floor(Math.random() * elements.length);
        await swap(i, rand_index, SHUFFLE_DELAY / elements.length);
    }
    activateButtons();
    shuffling = false;
    running = false;
}

function disableButtons() {
    btn = getEle("run-btn");
    btn.lastElementChild.innerHTML = 'stop'
    btn.onclick = stop;
    btn.disabled = false;
    document.getElementById("shuffle-btn").disabled = true;
}

function stop() {
    running = false;
}

async function swap(i, j, delay) {
    updateCompare(comparisons, swaps + 1);
    if (typeof delay === "undefined") delay = SORT_DELAY / elements.length;
    let freq = Math.floor(((getValue(i) + getValue(j)) / 200) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    playNote(freq, NOTE_DURATION);
    if (!running) return;
    changeColor(i, RED);
    [elements[i].style.left, elements[j].style.left] = [elements[j].style.left, elements[i].style.left];
    [elements[i], elements[j]] = [elements[j], elements[i]];
    await sleep(delay);
    resetColor(j);
}

function updateCompare(i, j) {
    if(shuffling) return;
    comparisons = i;
    swaps = j;
    let comparisonSpan = getEle("comparison-span");
    let swapSpan = getEle("swap-span");
    comparisonSpan.innerHTML = i;
    swapSpan.innerHTML = j;
}

function getValue(i) {
    return typeof i === "object" ? parseFloat(i.style.height.slice(0, -1)) : parseFloat(elements[i].style.height.slice(0, -1));
}

function playNote(frequency, duration) {
    if (!audio) return;
    const oscillator = new OscillatorNode(audioCtx);
    const gainNode = new GainNode(audioCtx);
    oscillator.type = "square";
    oscillator.frequency.value = frequency; 
    gainNode.gain.value = VOLUME;
    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();

    setTimeout(function() {
        oscillator.stop();
    }, duration);
}

function changeColor(i, color) {
    elements[i].classList.add(color);
}

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

function resetColor(i) {
    elements[i].classList.remove(RED);
    elements[i].classList.remove(BLUE);
    elements[i].classList.remove(GREEN);
}

function resetColors() {
    for (let i = 0; i < elements.length; i += 1) resetColor(i);
}

function compare(x, y) {
    updateCompare(comparisons + 1, swaps);
    return getValue(x) >= getValue(y);
}

async function runBtn(sort, ...args) {
    running = true;
    disableButtons();
    await sort(...args);
    await controlLoop();
    resetColors();
    activateButtons();
    running = false;
}

async function controlLoop() {
    let delay = SHUFFLE_DELAY / elements.length / 2;
    let animate_length = parseInt(elements.length / 6);
    for (let i = 0; i < elements.length + animate_length; i += 1) {
        if (!running) return;

        if (i < elements.length) {
            playNote(calculateFreq(i), NOTE_DURATION);
            changeColor(i, GREEN);
        }

        if (i > animate_length - 1) {
            resetColor(i - animate_length);
        }
        await sleep(delay);
    }
}

function calculateFreq(i) {
    return getValue(i) / 100 * (FREQ_MAX - FREQ_MIN) + FREQ_MIN;
}

async function copy() {
    const codeText = document.getElementById('code').innerText;
    navigator.clipboard.writeText(codeText);

    const icon = document.querySelector('#copy-btn i');
    
    icon.textContent = 'check';
    icon.style.color = 'green';
    
    setTimeout(() => {
      icon.textContent = 'copy_all';
      icon.style.color = 'white';
    }, 750);
}

async function insertion(start, end) {
    for (let i = start + 1; i < end; i += 1) {
        let j = i;
        while (j > start) {
            if (!running) {
                return;
            }
            
            if (compare(j, j - 1)) {
                break;
            }
            await swap(j, j - 1)
            j -= 1;
        }
    }
}

async function merge(array, start, mid, end) {
    let cache = Array(end - start).fill(array[0]);
    let k = mid;

    for (let i = start, r = 0; i < mid; r += 1, i += 1) {
        if (!running) {
            return;
        }
        while (k < end && getValue(array[k]) < getValue(array[i])) {
            updateCompare(comparisons + 1, swaps);
            cache[r] = array[k];
            r += 1;
            k += 1;
        }
        cache[r] = array[i];
    }

    for (let i = 0; i < k - start; i += 1) {
        if (!running) {
            return;
        }
        array[i + start] = cache[i];
        array[i + start].style.left = (100 / elements.length) * (i + start) + "%";
        changeColor(i + start, BLUE);
        playNote(calculateFreq(i + start), NOTE_DURATION);
        await sleep(SORT_DELAY / elements.length);
        resetColor(i + start);
    }
}

async function heapify(length, i) {
    if (!running) {
        return;
    }
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < length && compare(left, largest)) {
        largest = left;
    }

    if (right < length && compare(right, largest)) {
        largest = right;
    }

    if (largest != i) {
        await swap(i, largest);
        await heapify(length, largest);
    }
}

async function partition(left, right) {
    let pivot = left;
    changeColor(pivot, RED);
    let i = left;
    let j = right;
    changeColor(j, BLUE);

    while (i < j) {
        if (!running) return;
        while (i < j) {
            if(!compare(pivot, i)) {
                break;
            }
            resetColor(i);
            i += 1;
            changeColor(i, GREEN);
        }
        while (true) {
            if(compare(pivot, j)) {
                break;
            }
            resetColor(j);
            j -= 1;
            changeColor(j, BLUE);
        }
        changeColor(pivot, RED);

        if (i < j) {
            await swap(i, j);
        }
    }
    await swap(pivot, j);
    resetColor(i);
    resetColor(j);
    resetColor(pivot);
    return j;
}