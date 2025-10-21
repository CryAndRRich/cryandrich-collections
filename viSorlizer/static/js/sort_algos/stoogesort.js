async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(stoogeSort, elements, 0, elements.length - 1);
}

async function stoogeSort(array, i, j) {
    if (!running) {
        return;
    }
    if (compare(i, j)) {
        await swap(i, j);
    }
    if (j - i > 1) {
        t = Math.floor((j - i + 1) / 3);
        await stoogeSort(array, i, j - t);
        await stoogeSort(array, i + t, j);
        await stoogeSort(array, i, j - t);
    }
}

let codes = {
    "C": `
void stoogeSort(int *arr, int i, int j) {
    if (arr[i] > arr[j]) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    if (j - i + 1 > 2) {
        int t = (j - i + 1) / 3;
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
`,
    "C++": `
void stoogeSort(vector&lt;int&gt;& arr, int i, int j) {
    if (arr[i] > arr[j])
        swap(arr[i], arr[j]);
    if (j - i + 1 > 2) {
        int t = (j - i + 1) / 3;
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
`,
    "Java": `
static void stoogeSort(int[] arr, int i, int j) {
    if (arr[i] > arr[j]) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    if (j - i + 1 > 2) {
        int t = (j - i + 1) / 3;
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} i
 * @param {number} j
 */
function stoogeSort(arr, i, j) {
    if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    if (j - i + 1 > 2) {
        let t = Math.floor((j - i + 1) / 3);
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
`,
    "TypeScript": `
function stoogeSort(arr: number[], i: number, j: number): void {
    if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    if (j - i + 1 > 2) {
        let t = Math.floor((j - i + 1) / 3);
        stoogeSort(arr, i, j - t);
        stoogeSort(arr, i + t, j);
        stoogeSort(arr, i, j - t);
    }
}
`,
    "Python": `
def stoogeSort(arr: list, i: int, j: int) -> None:
    if arr[i] > arr[j]:
        arr[i], arr[j] = arr[j], arr[i]
    if (j - i + 1) > 2:
        t = (j - i + 1) // 3
        stoogeSort(arr, i, j - t)
        stoogeSort(arr, i + t, j)
        stoogeSort(arr, i, j - t)
`
};
