async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(introSort, elements);
}

async function heap(left, right) {
    let length = right - left + 1;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= left) {
        if (!running) {
            return;
        }
        await heapify(length, i);
        i -= 1;
    }

    while (k >= left) {
        if (!running) return;
        await swap(left, k);
        await heapify(k, 0);
        k -= 1;
    }
}

async function introspective(left, right, maxdepth) {
    if (right - left + 1 < 16) {
        await insertion(left, right + 1)
    } else if (maxdepth == 0) {
        await heap(left, right);
    } else {
        let pivot = await partition(left, right);
        await introspective(left, pivot - 1, maxdepth - 1);
        await introspective(pivot + 1, right, maxdepth - 1);
    }
}

async function introSort(array) {
    let maxdepth = Math.floor(Math.log2(array.length)) * 2;
    await introspective(0, array.length - 1, maxdepth);
}

let codes = {
    "C": `
void insertionsort(int *arr, int start, int end) {
    int i, j, key;
    for (i = start + 1; i < end; i += 1) {
        key = arr[i];
        j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

void heapify(int *arr, int start, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[start + left] > arr[start + largest])
        largest = left;
    if (right < n && arr[start + right] > arr[start + largest])
        largest = right;
    if (largest != i) {
        int temp = arr[start + i];
        arr[start + i] = arr[start + largest];
        arr[start + largest] = temp;
        heapify(arr, start, n, largest);
    }
}

void heapsort(int *arr, int start, int end) {
    int n = end - start;
    int i;
    for (i = n / 2 - 1; i >= 0; i -= 1) {
        heapify(arr, start, n, i);
    }
    for (i = n - 1; i > 0; i -= 1) {
        int temp = arr[start];
        arr[start] = arr[start + i];
        arr[start + i] = temp;
        heapify(arr, start, i, 0);
    }
}

int partition(int *arr, int low, int high) {
    int pivot = arr[low];
    int i = low + 1;
    int j = high - 1;
    while (1) {
        while (i <= j && arr[i] <= pivot)
            i += 1;
        while (i <= j && arr[j] >= pivot)
            j -= 1;
        if (i > j)
            break;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    int temp = arr[low];
    arr[low] = arr[j];
    arr[j] = temp;
    return j;
}

void introSortHelper(int *arr, int start, int end, int maxdepth) {
    int threshold = 16;
    if (end - start < threshold) {
        insertionsort(arr, start, end);
    } else if (maxdepth == 0) {
        heapsort(arr, start, end);
    } else {
        int p = partition(arr, start, end);
        introSortHelper(arr, start, p, maxdepth - 1);
        introSortHelper(arr, p + 1, end, maxdepth - 1);
    }
}

void introSort(int *arr, int n) {
    int maxdepth = (n > 0) ? ((int)(log(n) / log(2)) * 2) : 0;
    introSortHelper(arr, 0, n, maxdepth);
}
`,
    "C++": `
void insertionsort(vector&lt;int&gt;& arr, int start, int end) {
    for (int i = start + 1; i < end; i += 1) {
        int key = arr[i];
        int j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

void heapify(vector&lt;int&gt;& arr, int start, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[start + left] > arr[start + largest])
        largest = left;
    if (right < n && arr[start + right] > arr[start + largest])
        largest = right;
    if (largest != i) {
        swap(arr[start + i], arr[start + largest]);
        heapify(arr, start, n, largest);
    }
}

void heapsort(vector&lt;int&gt;& arr, int start, int end) {
    int n = end - start;
    for (int i = n / 2 - 1; i >= 0; i -= 1) {
        heapify(arr, start, n, i);
    }
    for (int i = n - 1; i > 0; i -= 1) {
        swap(arr[start], arr[start + i]);
        heapify(arr, start, i, 0);
    }
}

int partition(vector&lt;int&gt;& arr, int low, int high) {
    int pivot = arr[low];
    int i = low + 1;
    int j = high - 1;
    while (true) {
        while (i <= j && arr[i] <= pivot)
            i += 1;
        while (i <= j && arr[j] >= pivot)
            j -= 1;
        if (i > j)
            break;
        swap(arr[i], arr[j]);
    }
    swap(arr[low], arr[j]);
    return j;
}

void introSortHelper(vector&lt;int&gt;& arr, int start, int end, int maxdepth) {
    int threshold = 16;
    if (end - start < threshold) {
        insertionsort(arr, start, end);
    } else if (maxdepth == 0) {
        heapsort(arr, start, end);
    } else {
        int p = partition(arr, start, end);
        introSortHelper(arr, start, p, maxdepth - 1);
        introSortHelper(arr, p + 1, end, maxdepth - 1);
    }
}

void introSort(vector&lt;int&gt;& arr) {
    int n = arr.size();
    int maxdepth = (n > 0) ? (int(log2(n)) * 2) : 0;
    introSortHelper(arr, 0, n, maxdepth);
}
`,
    "Java": `
public class IntroSort {
    public static void insertionsort(int[] arr, int start, int end) {
        for (int i = start + 1; i < end; i += 1) {
            int key = arr[i];
            int j = i - 1;
            while (j >= start && arr[j] > key) {
                arr[j + 1] = arr[j];
                j -= 1;
            }
            arr[j + 1] = key;
        }
    }
    
    public static void heapify(int[] arr, int start, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        if (left < n && arr[start + left] > arr[start + largest])
            largest = left;
        if (right < n && arr[start + right] > arr[start + largest])
            largest = right;
        if (largest != i) {
            int temp = arr[start + i];
            arr[start + i] = arr[start + largest];
            arr[start + largest] = temp;
            heapify(arr, start, n, largest);
        }
    }
    
    public static void heapsort(int[] arr, int start, int end) {
        int n = end - start;
        for (int i = n / 2 - 1; i >= 0; i -= 1) {
            heapify(arr, start, n, i);
        }
        for (int i = n - 1; i > 0; i -= 1) {
            int temp = arr[start];
            arr[start] = arr[start + i];
            arr[start + i] = temp;
            heapify(arr, start, i, 0);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low + 1;
        int j = high - 1;
        while (true) {
            while (i <= j && arr[i] <= pivot)
                i += 1;
            while (i <= j && arr[j] >= pivot)
                j -= 1;
            if (i > j)
                break;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        int temp = arr[low];
        arr[low] = arr[j];
        arr[j] = temp;
        return j;
    }
    
    public static void introSortHelper(int[] arr, int start, int end, int maxdepth) {
        int threshold = 16;
        if (end - start < threshold) {
            insertionsort(arr, start, end);
        } else if (maxdepth == 0) {
            heapsort(arr, start, end);
        } else {
            int p = partition(arr, start, end);
            introSortHelper(arr, start, p, maxdepth - 1);
            introSortHelper(arr, p + 1, end, maxdepth - 1);
        }
    }
    
    public static void introSort(int[] arr) {
        int n = arr.length;
        int maxdepth = (n > 0) ? ((int)(Math.log(n) / Math.log(2)) * 2) : 0;
        introSortHelper(arr, 0, n, maxdepth);
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} start
 * @param {number} end
 */
function insertionsort(arr, start, end) {
    for (let i = start + 1; i < end; i += 1) {
        const key = arr[i];
        let j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

/**
 * @param {number[]} arr
 * @param {number} start
 * @param {number} n
 * @param {number} i
 * @param {number} start
 * @param {number} end
 * @param {number} low
 * @param {number} high
 * @param {number} maxdepth
*/
function heapify(arr, start, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[start + left] > arr[start + largest]) {
        largest = left;
    }
    if (right < n && arr[start + right] > arr[start + largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[start + i], arr[start + largest]] = [arr[start + largest], arr[start + i]];
        heapify(arr, start, n, largest);
    }
}

function heapsort(arr, start, end) {
    const n = end - start;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
        heapify(arr, start, n, i);
    }
    for (let i = n - 1; i > 0; i -= 1) {
        [arr[start], arr[start + i]] = [arr[start + i], arr[start]];
        heapify(arr, start, i, 0);
    }
}

function partition(arr, low, high) {
    const pivot = arr[low];
    let i = low + 1;
    let j = high - 1;
    while (true) {
        while (i <= j && arr[i] <= pivot) {
            i += 1;
        }
        while (i <= j && arr[j] >= pivot) {
            j -= 1;
        }
        if (i > j) break;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
}

function introSortHelper(arr, start, end, maxdepth) {
    const threshold = 16;
    if (end - start < threshold) {
        insertionsort(arr, start, end);
    } else if (maxdepth === 0) {
        heapsort(arr, start, end);
    } else {
        const p = partition(arr, start, end);
        introSortHelper(arr, start, p, maxdepth - 1);
        introSortHelper(arr, p + 1, end, maxdepth - 1);
    }
}

function introSort(arr) {
    const n = arr.length;
    const maxdepth = n > 0 ? Math.floor(Math.log2(n)) * 2 : 0;
    introSortHelper(arr, 0, n, maxdepth);
}
`,
    "TypeScript": `
function insertionsort(arr: number[], start: number, end: number): void {
    for (let i = start + 1; i < end; i += 1) {
        const key = arr[i];
        let j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

function heapify(arr: number[], start: number, n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && arr[start + left] > arr[start + largest]) {
        largest = left;
    }
    if (right < n && arr[start + right] > arr[start + largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[start + i], arr[start + largest]] = [arr[start + largest], arr[start + i]];
        heapify(arr, start, n, largest);
    }
}

function heapsort(arr: number[], start: number, end: number): void {
    const n = end - start;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
        heapify(arr, start, n, i);
    }
    for (let i = n - 1; i > 0; i -= 1) {
        [arr[start], arr[start + i]] = [arr[start + i], arr[start]];
        heapify(arr, start, i, 0);
    }
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[low];
    let i = low + 1;
    let j = high - 1;
    while (true) {
        while (i <= j && arr[i] <= pivot) {
            i += 1;
        }
        while (i <= j && arr[j] >= pivot) {
            j -= 1;
        }
        if (i > j) break;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
}

function introSortHelper(arr: number[], start: number, end: number, maxdepth: number): void {
    const threshold = 16;
    if (end - start < threshold) {
        insertionsort(arr, start, end);
    } else if (maxdepth === 0) {
        heapsort(arr, start, end);
    } else {
        const p = partition(arr, start, end);
        introSortHelper(arr, start, p, maxdepth - 1);
        introSortHelper(arr, p + 1, end, maxdepth - 1);
    }
}

function introSort(arr: number[]): void {
    const n = arr.length;
    const maxdepth = n > 0 ? Math.floor(Math.log2(n)) * 2 : 0;
    introSortHelper(arr, 0, n, maxdepth);
}
`,
    "Python": `
def insertionsort(arr: List[int], start: int, end: int) -> None:
    for i in range(start + 1, end):
        key = arr[i]
        j = i - 1
        while j >= start and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def heapify(arr: List[int], start: int, n: int, i: int) -> None:
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[start + left] > arr[start + largest]:
        largest = left
    if right < n and arr[start + right] > arr[start + largest]:
        largest = right
    if largest != i:
        arr[start + i], arr[start + largest] = arr[start + largest], arr[start + i]
        heapify(arr, start, n, largest)

def heapsort(arr: List[int], start: int, end: int) -> None:
    n = end - start
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, start, n, i)
    for i in range(n - 1, 0, -1):
        arr[start], arr[start + i] = arr[start + i], arr[start]
        heapify(arr, start, i, 0)

def partition(arr: List[int], low: int, high: int) -> int:
    pivot = arr[low]
    i = low + 1
    j = high - 1
    while True:
        while i <= j and arr[i] <= pivot:
            i += 1
        while i <= j and arr[j] >= pivot:
            j -= 1
        if i > j:
            break
        arr[i], arr[j] = arr[j], arr[i]
    arr[low], arr[j] = arr[j], arr[low]
    return j

def introSortHelper(arr: List[int], start: int, end: int, maxdepth: int) -> None:
    threshold = 16
    if end - start < threshold:
        insertionsort(arr, start, end)
    elif maxdepth == 0:
        heapsort(arr, start, end)
    else:
        p = partition(arr, start, end)
        introSortHelper(arr, start, p, maxdepth - 1)
        introSortHelper(arr, p + 1, end, maxdepth - 1)

def introSort(arr: List[int]) -> None:
    maxdepth = int(math.log2(len(arr))) * 2 if len(arr) > 0 else 0
    introSortHelper(arr, 0, len(arr), maxdepth)
`
};
