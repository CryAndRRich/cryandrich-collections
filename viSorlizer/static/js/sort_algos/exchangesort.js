async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(exchangeSort, elements);
}

async function exchangeSort(array) {
    for (let i = 0; i < array.length - 1; i += 1) {
        changeColor(i, BLUE);
        for (let j = i + 1; j < array.length; j += 1) {
            if (!running) {
                return;
            }
            if (compare(i, j)) {
                await swap(j, i);
                changeColor(i, BLUE);
                resetColor(j);
            }
        }
        resetColor(i);
    }
}

let codes = {
    "C": `
void exchangeSort(int *arr, int arrSize) {
    int i, j, temp;

    for (i = 0 ; i < arrSize - 1; i += 1) {
        for (j = i + 1; j < arrSize; j += 1) {
            if (arr[i] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    } 
}`, 
    "C++": `
void exchangeSort(vector&lt;int&gt;& arr) {
    int i, j;
    for (i = 0; i < arr.size() - 1; i += 1) {
        for (j = i + 1; j < arr.size(); j += 1) {
            if (arr[i] > arr[j]) {
                swap(&arr[i], &arr[j]);
            }
        }
    }
}`,
    "Java": `
static void exchangeSort(int[] arr) {
    int temp = 0;
    for(int i = 0; i < arr.length - 1; i += 1) {
        for(int j = 0; j < arr.length; j += 1) {
            if(arr[i] > arr[j]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function exchangeSort(arr) {
    for(let i = 0; i < arr.length - 1; i += 1) {
        for(let j = 0; j < arr.length; j += 1) {
            if(arr[i] > arr[j]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
}`,
    "TypeScript": `
function exchangeSort(arr: number[]): void{
    for(let i = 0; i < arr.length - 1; i += 1) {
        for(let j = 0; j < arr.length; j += 1) {
            if(arr[i] > arr[j]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
}`,
    "Python": `
def exchangeSort(arr: List[int]) -> None:
    for i in range(len(arr) - 1):
        for j in range(0, len(arr)):
            if arr[i] > arr[j]:
                arr[j], arr[i] = arr[i], arr[j]`
}