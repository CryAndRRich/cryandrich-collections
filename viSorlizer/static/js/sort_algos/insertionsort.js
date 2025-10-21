async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(insertionSort, elements);
}

async function insertionSort(array) {
    for (let i = 1; i < array.length; i += 1) {
        let j = i;
        while (j > 0) {
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

let codes = {
    "C": `
void insertionSort(int *arr, int arrSize) {
    int i, key, j;
    for (i = 1; i < arrSize; i += 1) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    "C++": `
void bubbleSort(vector&lt;int&gt;& arr) {
    int i, key, j;
    for (i = 1; i < arr.size(); i += 1) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    "Java": `
static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i += 1) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} nums
 */
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i += 1) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}`,
    "TypeScript": `
function insertionSort(arr: number[]): void{
    for (let i = 1; i < arr.length; i += 1) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}`,
    "Python": `
def insertionSort(arr: List[int]) -> None:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`
}
