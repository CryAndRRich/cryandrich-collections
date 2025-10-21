async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(oddevenSort, elements);
}

async function oddevenSort(array) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < array.length - 1; i += 2) {
            if (!running) {
                return;
            }
            if (compare(i, i + 1)) {
                await swap(i, i + 1);
                sorted = false;
            }
        }

        for (let i = 0; i < array.length - 1; i += 2) {
            if (!running) {
                return;
            }
            if (compare(i, i + 1)) {
                await swap(i, i + 1);
                sorted = false;
            }
        }
    }
}

let codes = {
    "C": `
void oddevenSort(int *arr, int arrSize) {
    int sorted = 0;
    while (!sorted) {
        sorted = 1;
        for (int i = 1; i < arrSize - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = 0;
            }
        }
        for (int i = 0; i < arrSize - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = 0;
            }
        }
    }
}`,
    "C++": `
void oddevenSort(vector&lt;int&gt;& arr) {
    bool sorted = false;
    while (!sorted) {
        sorted = true;
        for (size_t i = 1; i < arr.size() - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                swap(&arr[i], &arr[i + 1]);
                sorted = false;
            }
        }
        for (size_t i = 0; i < arr.size() - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                swap(&arr[i], &arr[i + 1]);
                sorted = false;
            }
        }
    }
}`,
    "Java": `
static void oddevenSort(int[] arr) {
    boolean sorted = false;
    while (!sorted) {
        sorted = true;
        for (int i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
        for (int i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function oddevenSort(arr) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
    }
}`,
    "TypeScript": `
function oddevenSort(arr: number[]): void {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }
    }
}`,
    "Python": `
def oddevenSort(arr: List[int]) -> None:
    sorted = False
    while not sorted:
        sorted = True
        for i in range(1, len(arr) - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted = False
        for i in range(0, len(arr) - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                sorted = False`
}
