async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(mergeSort, elements, 0, elements.length);
}

async function mergeSort(array, start, end) {
    if (start >= end - 1) return;
    let mid = start + ~~((end - start) / 2);

    await mergeSort(array, start, mid);
    await mergeSort(array, mid, end);

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
        changeColor(i + start, RED);
        playNote(calculateFreq(i + start), NOTE_DURATION);
        await sleep(SORT_DELAY / elements.length);
        resetColor(i + start);
    }
}

let codes = {
    "C": `
void merge(int *arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i += 1)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j += 1)
        R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    while (i < n1)
        arr[k++] = L[i++];
    while (j < n2)
        arr[k++] = R[j++];
}

void mergeSortHelper(int *arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void mergeSort(int *arr, int arrSize) {
    mergeSortHelper(arr, 0, arrSize - 1);
}
`,
    "C++": `
void merge(vector&lt;int&gt;& arr, int left, int mid, int right) {
    vector&lt;int&gt; leftArr(arr.begin() + left, arr.begin() + mid + 1);
    vector&lt;int&gt; rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    int i = 0, j = 0, k = left;
    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < leftArr.size()) {
        arr[k++] = leftArr[i++];
    }
    while (j < rightArr.size()) {
        arr[k++] = rightArr[j++];
    }
}

void mergeSortHelper(vector&lt;int&gt;& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSortHelper(arr, left, mid);
        mergeSortHelper(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void mergeSort(vector&lt;int&gt;& arr) {
    if (arr.size() > 1)
        mergeSortHelper(arr, 0, arr.size() - 1);
}
`,
    "Java": `
public class MergeSort {
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; i += 1) {
            L[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j += 1) {
            R[j] = arr[mid + 1 + j];
        }
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
            }
        }
        while (i < n1) {
            arr[k++] = L[i++];
        }
        while (j < n2) {
            arr[k++] = R[j++];
        }
    }
    
    private static void mergeSortHelper(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSortHelper(arr, left, mid);
            mergeSortHelper(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    public static void mergeSort(int[] arr) {
        if (arr == null || arr.length < 2) return;
        mergeSortHelper(arr, 0, arr.length - 1);
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 */
function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while(i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSortHelper(array) {
    if (array.length <= 1) return array;
    const mid = Math.floor(array.length / 2);
    const left = mergeSortHelper(array.slice(0, mid));
    const right = mergeSortHelper(array.slice(mid));
    return merge(left, right);
}

function mergeSort(arr) {
    if (arr.length <= 1) return;
    const sorted = mergeSortHelper(arr);
    for (let i = 0; i < arr.length; i += 1) {
        arr[i] = sorted[i];
    }
}

`,
    "TypeScript": `
function merge(left: number[], right: number[]): number[] {
    const result = [];
    let i = 0, j = 0;
    while(i < left.length && j < right.length){
         if(left[i] <= right[j]){
              result.push(left[i++]);
         } else {
              result.push(right[j++]);
         }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSortHelper(arr: number[]): number[] {
    if(arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortHelper(arr.slice(0, mid));
    const right = mergeSortHelper(arr.slice(mid));
    return merge(left, right);
}

function mergeSort(arr: number[]): void {
    if(arr.length <= 1) return;
    const sorted = mergeSortHelper(arr);
    for(let i = 0; i < arr.length; i += 1){
         arr[i] = sorted[i];
    }
}
`,
    "Python": `
def mergeSort(arr: List[int]) -> None:
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        mergeSort(L)
        mergeSort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
`
};
