async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(gnomeSort, elements);
}

async function gnomeSort(array) {
    let i = 0;
    while (i < array.length) {
        if (!running) {
            return;
        }
        if(i == 0 || compare(i, i - 1)) {
            i += 1;
        } else {
            await swap(i, i - 1)
            i -= 1;
        }
    }
}
let codes = {
    "C": `
void gnomeSort(int *arr, int arrSize) {
    int i = 0;

    while (i < arrSize) {
        if (i == 0 || arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            int temp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = temp;
            i -= 1;
        }
    }
}
`,
    "C++": `
void gnomeSort(vector&lt;int&gt;& arr) {
    int i = 0;
    while (i < arr.size()) {
        if (i == 0 || arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            swap(&arr[i], &arr[i - 1]);
            i -= 1;
        }
    }
}
`,
    "Java": `
static void gnomeSort(int[] arr) {
    int i = 0;
    while (i < arr.length) {
        if (i == 0 || arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            int temp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = temp;
            i -= 1;
        }
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function gnomeSort(arr) {
    let i = 0;
    while (i < arr.length) {
        if (i === 0 || arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            let temp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = temp;
            i -= 1;
        }
    }
}
`,
    "TypeScript": `
function gnomeSort(arr: number[]): void {
    let i = 0;
    while (i < arr.length) {
        if (i === 0 || arr[i] >= arr[i - 1]) {
            i += 1;
        } else {
            let temp = arr[i];
            arr[i] = arr[i - 1];
            arr[i - 1] = temp;
            i -= 1;
        }
    }
}
`,
    "Python": `
def gnomeSort(arr: List[int]) -> None:
    i = 0
    while i < len(arr):
        if i == 0 or arr[i] >= arr[i - 1]:
            i += 1
        else:
            arr[i], arr[i - 1] = arr[i - 1], arr[i]
            i -= 1
`
}
