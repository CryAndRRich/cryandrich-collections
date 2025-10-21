async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(strandSort, elements);
}

async function strandSort(array) {
    let s = 1;
    let sorted = 1;
    while (sorted < array.length) {
        if (!running) {
            return;
        }
        let i = sorted;
        while (i < array.length) {
            if (!running) {
                return;
            }
            if(compare(i, sorted - 1)) {
                await swap(i, sorted);
                sorted += 1;
            }
            i += 1;
        }
        await merge(array, 0, s, sorted);
        s = sorted;
        sorted += 1;
    }
    await merge(array, 0, s, sorted);
}

let codes = {
    "C": `
void merge(int *arr, int start, int mid, int end) {
    int i = start, j = mid;
    while (i < j && j < end) {
        if (arr[i] <= arr[j]) {
            i += 1;
        } else {
            int temp = arr[j];
            int k;
            for (k = j; k > i; k -= 1) {
                arr[k] = arr[k - 1];
            }
            arr[i] = temp;
            i += 1;
            j += 1;
        }
    }
}

void strandSort(int *arr, int arrSize) {
    int s = 1;
    int sorted = 1;
    while (sorted < arrSize) {
        int i = sorted;
        while (i < arrSize) {
            if (arr[i] > arr[sorted - 1]) {
                int temp = arr[i];
                arr[i] = arr[sorted - 1];
                arr[sorted - 1] = temp;
                sorted += 1;
            }
            i += 1;
        }
        merge(arr, 0, s, sorted);
        s = sorted;
        sorted += 1;
    }
    merge(arr, 0, s, sorted);
}
`,
    "C++": `
void merge(vector&lt;int&gt;& arr, int start, int mid, int end) {
    int i = start, j = mid;
    while (i < j && j < end) {
        if (arr[i] <= arr[j]) {
            i += 1;
        } else {
            int temp = arr[j];
            for (int k = j; k > i; k -= 1) {
                arr[k] = arr[k - 1];
            }
            arr[i] = temp;
            i += 1;
            j += 1;
        }
    }
}

void strandSort(vector&lt;int&gt;& arr) {
    int s = 1;
    int sorted = 1;
    while (sorted < arr.size()) {
        int i = sorted;
        while (i < arr.size()) {
            if (arr[i] > arr[sorted - 1]) {
                int temp = arr[i];
                arr[i] = arr[sorted - 1];
                arr[sorted - 1] = temp;
                sorted += 1;
            }
            i += 1;
        }
        merge(arr, 0, s, sorted);
        s = sorted;
        sorted += 1;
    }
    merge(arr, 0, s, sorted);
}
`,
    "Java": `
public class StrandSort {
    public static void merge(int[] arr, int start, int mid, int end) {
        int i = start, j = mid;
        while (i < j && j < end) {
            if (arr[i] <= arr[j]) {
                i += 1;
            } else {
                int temp = arr[j];
                for (int k = j; k > i; k -= 1) {
                    arr[k] = arr[k - 1];
                }
                arr[i] = temp;
                i += 1;
                j += 1;
            }
        }
    }
    
    public static void strandSort(int[] arr) {
        int s = 1;
        int sorted = 1;
        while (sorted < arr.length) {
            int i = sorted;
            while (i < arr.length) {
                if (arr[i] > arr[sorted - 1]) {
                    int temp = arr[i];
                    arr[i] = arr[sorted - 1];
                    arr[sorted - 1] = temp;
                    sorted += 1;
                }
                i += 1;
            }
            merge(arr, 0, s, sorted);
            s = sorted;
            sorted += 1;
        }
        merge(arr, 0, s, sorted);
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} start
 * @param {number} mid
 * @param {number} end
 */
function merge(arr, start, mid, end) {
    let i = start, j = mid;
    while (i < j && j < end) {
        if (arr[i] <= arr[j]) {
            i += 1;
        } else {
            let temp = arr[j];
            for (let k = j; k > i; k -= 1) {
                arr[k] = arr[k - 1];
            }
            arr[i] = temp;
            i += 1;
            j += 1;
        }
    }
}

function strandSort(arr) {
    let s = 1;
    let sorted = 1;
    while (sorted < arr.length) {
        let i = sorted;
        while (i < arr.length) {
            if (arr[i] > arr[sorted - 1]) {
                let temp = arr[i];
                arr[i] = arr[sorted - 1];
                arr[sorted - 1] = temp;
                sorted += 1;
            }
            i += 1;
        }
        merge(arr, 0, s, sorted);
        s = sorted;
        sorted += 1;
    }
    merge(arr, 0, s, sorted);
}
`,
    "TypeScript": `
function merge(arr: number[], start: number, mid: number, end: number): void {
    let i = start, j = mid;
    while (i < j && j < end) {
        if (arr[i] <= arr[j]) {
            i += 1;
        } else {
            let temp = arr[j];
            for (let k = j; k > i; k -= 1) {
                arr[k] = arr[k - 1];
            }
            arr[i] = temp;
            i += 1;
            j += 1;
        }
    }
}

function strandSort(arr: number[]): void {
    let s = 1;
    let sorted = 1;
    while (sorted < arr.length) {
        let i = sorted;
        while (i < arr.length) {
            if (arr[i] > arr[sorted - 1]) {
                let temp = arr[i];
                arr[i] = arr[sorted - 1];
                arr[sorted - 1] = temp;
                sorted += 1;
            }
            i += 1;
        }
        merge(arr, 0, s, sorted);
        s = sorted;
        sorted += 1;
    }
    merge(arr, 0, s, sorted);
}
`,
    "Python": `
def merge(arr: List[int], start: int, mid: int, end: int) -> None:
    i = start
    j = mid
    while i < j and j < end:
        if arr[i] <= arr[j]:
            i += 1
        else:
            temp = arr[j]
            arr[i+1:j+1] = arr[i:j]
            arr[i] = temp
            i += 1
            j += 1

def strandSort(arr: List[int]) -> None:
    s = 1
    sorted = 1
    while sorted < len(arr):
        i = sorted
        while i < len(arr):
            if arr[i] > arr[sorted - 1]:
                temp = arr[i]
                arr[i] = arr[sorted - 1]
                arr[sorted - 1] = temp
                sorted += 1
            i += 1
        merge(arr, 0, s, sorted)
        s = sorted
        sorted += 1
    merge(arr, 0, s, sorted)
`
};

