async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(selectionSort, elements);
}

async function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i += 1) {
        let jmin = i;
        for (let j = i + 1; j < array.length; j += 1) {
            if (!running) {
                return;
            }
            if (!compare(j, jmin)) {
                jmin = j
            }
        }

        if (jmin != i) {
            await swap(jmin, i);
        }
    }
}

let codes = {
    "C": `
void selectionSort(int *arr, int arrSize) {
    int i, j, jmin, temp;
    for (i = 0; i < arrSize - 1; i += 1) {
        jmin = i;
        for (j = i + 1; j < arrSize; j += 1) {
            if (arr[j] < arr[jmin]) {
                jmin = j;
            }
        }
        if (jmin != i) {
            temp = arr[i];
            arr[i] = arr[jmin];
            arr[jmin] = temp;
        }
    }
}`,
    "C++": `
void selectionSort(vector&lt;int&gt;& arr) {
    for (int i = 0; i < arr.size() - 1; i += 1) {
        int jmin = i;
        for (int j = i + 1; j < arr.size(); j += 1) {
            if (arr[j] < arr[jmin]) {
                jmin = j;
            }
        }
        if (jmin != i) {
            swap(&arr[i], &arr[jmin]);
        }
    }
}`,
    "Java": `
static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i += 1) {
        int jmin = i;
        for (int j = i + 1; j < arr.length; j += 1) {
            if (arr[j] < arr[jmin]) {
                jmin = j;
            }
        }
        if (jmin != i) {
            int temp = arr[i];
            arr[i] = arr[jmin];
            arr[jmin] = temp;
        }
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i += 1) {
        let jmin = i;
        for (let j = i + 1; j < arr.length; j += 1) {
            if (arr[j] < arr[jmin]) {
                jmin = j;
            }
        }
        if (jmin !== i) {
            let temp = arr[i];
            arr[i] = arr[jmin];
            arr[jmin] = temp;
        }
    }
}`,
    "TypeScript": `
function selectionSort(arr: number[]): void {
    for (let i = 0; i < arr.length - 1; i += 1) {
        let jmin = i;
        for (let j = i + 1; j < arr.length; j += 1) {
            if (arr[j] < arr[jmin]) {
                jmin = j;
            }
        }
        if (jmin !== i) {
            let temp = arr[i];
            arr[i] = arr[jmin];
            arr[jmin] = temp;
        }
    }
}`,
    "Python": `
def selectionSort(arr: List[int]) -> None:
    n = len(arr)
    for i in range(n - 1):
        jmin = i
        for j in range(i + 1, n):
            if arr[j] < arr[jmin]:
                jmin = j
        arr[i], arr[jmin] = arr[jmin], arr[i]`
}
