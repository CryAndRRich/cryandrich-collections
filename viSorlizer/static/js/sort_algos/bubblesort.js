async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(bubbleSort, elements);
}

async function bubbleSort(array) {
    for (let i = 1; i < array.length - 1; i += 1) {
        for (let j = 0; j < array.length - i; j += 1) {
            if (!running) {
                return;
            }
            if (compare(j, j + 1)) {
                await swap(j, j + 1);
            }
        }
    }
}

let codes = {
    "C": `
void bubbleSort(int *arr, int arrSize) {
    int i, j, temp;

    for (i = 0 ; i < arrSize - 1; i += 1) {
        for (j = 0 ; j < arrSize - i - 1; j += 1) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    } 
}`, 
    "C++": `
void bubbleSort(vector&lt;int&gt;& arr) {
    int i, j;
    for (i = 0; i < arr.size() - 1; i += 1) {
        for (j = 0; j < arr.size() - i - 1; j += 1) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}`,
    "Java": `
static void bubbleSort(int[] arr) {
    int temp = 0;
    for(int i = 0; i < arr.length; i += 1) {
        for(int j = 0; j < arr.length - i - 1; j += 1) {
            if(arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i += 1) {
        for(let j = 0; j < arr.length - i - 1; j += 1) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    "TypeScript": `
function bubbleSort(arr: number[]): void{
    for(let i = 0; i < arr.length; i += 1) {
        for(let j = 0; j < arr.length - i - 1; j += 1) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    "Python": `
def bubbleSort(arr: List[int]) -> None:
    for i in range(len(arr) - 1):
        for j in range(0, len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`
}