async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(heapSort, elements);
}

async function heapSort(array) {
    let length = array.length;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= 0) {
        if (!running) {
            return;
        }
        await heapify(length, i);
        i -= 1;
    }

    while (k >= 0) {
        if (!running) return;
        await swap(0, k);
        await heapify(k, 0);
        k -= 1;
    }
}

let codes = {
  "C": `
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int *arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int *arr, int arrSize) {
    for (int i = arrSize / 2 - 1; i >= 0; i -= 1)
        heapify(arr, arrSize, i);
    
    for (int i = arrSize - 1; i > 0; i -= 1) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}
`,
  "C++": `
void heapify(vector&lt;int&gt;& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector&lt;int&gt;& arr) {
    for (int i = arr.size() / 2 - 1; i >= 0; i -= 1)
        heapify(arr, arr.size(), i);
    
    for (int i = arr.size() - 1; i > 0; i -= 1) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}
`,
  "Java": `
private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

static void heapSort(int[] arr) {
    for (int i = arr.length / 2 - 1; i >= 0; i -= 1)
        heapify(arr, arr.length, i);
    
    for (int i = arr.length - 1; i > 0; i -= 1) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}
`,
  "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} n
 * @param {number} i
 */
function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest !== i) {
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1)
        heapify(arr, arr.length, i);
    
    for (let i = arr.length - 1; i > 0; i -= 1) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}
`,
  "TypeScript": `
function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest !== i) {
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}
function heapSort(arr: number[]): void {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1)
        heapify(arr, arr.length, i);
    
    for (let i = arr.length - 1; i > 0; i -= 1) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}
`,
  "Python": `
def heapify(arr: List[int], n: int, i: int) -> None:
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heapSort(arr: List[int]) -> None:
    for i in range(len(arr) // 2 - 1, -1, -1):
        heapify(arr, len(arr), i)
    
    for i in range(len(arr) - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
`
};
