async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(peSort, elements);
}

async function peSort(array) {
    const p = 2;
    let run = 1;
    while (run < array.length && compare(run, run - 1)) {
        run += 1;
    }
    
    while (run < array.length) {
        let block_size = Math.min(run * (p - 1), array.length - run);
        await insertion(run, run + block_size);
        await merge(array, 0, run, run + block_size);
        run += block_size;
    }
}

let codes = {
    "C": `
void insertion(int *arr, int start, int end) {
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

void peSort(int *arr, int arrSize) {
    int p = 2;
    int run = 1;
    while (run < arrSize && arr[run - 1] <= arr[run])
        run += 1;
    
    while (run < arrSize) {
        int block_size = fmin(run * (p - 1), arrSize - run);
        insertion(arr, run, run + block_size);
        merge(arr, 0, run, run + block_size);
        run += block_size;
    }
}
`, 
    "C++": `
void insertion(vector&lt;int&gt;& arr, int start, int end) {
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

void peSort(vector&lt;int&gt;& arr) {
    int p = 2;
    int run = 1;
    while (run < arr.size() && arr[run - 1] <= arr[run])
        run += 1;
    
    while (run < arr.size()) {
        int block_size = min(run * (p - 1), arr.size() - run);
        insertion(arr, run, run + block_size);
        merge(arr, 0, run, run + block_size);
        run += block_size;
    }
}
`,
    "Java": `
public class PESort {
    public static void insertion(int[] arr, int start, int end) {
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
    
    public static void peSort(int[] arr) {
        int p = 2;
        int run = 1;
        while (run < arr.length && arr[run - 1] <= arr[run])
            run += 1;
        
        while (run < arr.length) {
            int block_size = Math.min(run * (p - 1), arr.length - run);
            insertion(arr, run, run + block_size);
            merge(arr, 0, run, run + block_size);
            run += block_size;
        }
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
function insertion(arr, start, end) {
    for (let i = start + 1; i < end; i += 1) {
        let key = arr[i];
        let j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

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

function peSort(arr) {
    const p = 2;
    let run = 1;
    while (run < arr.length && arr[run - 1] <= arr[run]) {
        run += 1;
    }
    
    while (run < arr.length) {
        let block_size = min(run * (p - 1), arr.length - run);
        insertion(arr, run, run + block_size);
        merge(arr, 0, run, run + block_size);
        run += block_size;
    }
}
`,
    "TypeScript": `
function insertion(arr: number[], start: number, end: number): void {
    for (let i = start + 1; i < end; i += 1) {
        let key = arr[i];
        let j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

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

function peSort(arr: number[]): void {
    const p = 2;
    let run = 1;
    while (run < arr.length && arr[run - 1] <= arr[run]) {
        run += 1;
    }
    
    while (run < arr.length) {
        let block_size= min(run * (p - 1), arr.length - run);
        insertion(arr, run, run + block_size);
        merge(arr, 0, run, run + block_size);
        run += block_size;
    }
}
`,
    "Python": `
def insertion(arr: List[int], start: int, end: int) -> None:
    for i in range(start + 1, end):
        key = arr[i]
        j = i - 1
        while j >= start and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr: List[int], start: int, mid: int, end: int) -> None:
    i = start
    j = mid
    while i < j and j < end:
        if arr[i] <= arr[j]:
            i += 1
        else:
            temp = arr[j]
            arr[i + 1:j + 1] = arr[i:j]
            arr[i] = temp
            i += 1
            j += 1

def peSort(arr: List[int]) -> None:
    p = 2
    run = 1
    while run < len(arr) and arr[run - 1] <= arr[run]:
        run += 1

    while run < len(arr):
        block_size = min(run * (p - 1), len(arr) - run)
        insertion(arr, run, run + block_size)
        merge(arr, 0, run, run + block_size)
        run += block_size
`
};
