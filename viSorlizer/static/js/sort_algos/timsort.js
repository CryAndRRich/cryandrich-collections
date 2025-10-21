async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(timSort, elements);
}

async function timSort(array) {
    const minRun = 8;
    const n = array.length;
    for(let i = 0; i < n; i += minRun) { 
        await insertion(i, Math.min(i + minRun, n)); 
    } 
      
    for(let size = minRun; size < n; size *= 2) { 
        for(let left = 0; left < n; left += 2 * size) { 
            let mid = left + size; 
            let right = Math.min(left + 2 * size, n); 
            if(mid < right) 
                await merge(array, left, mid, right); 
        } 
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

void timSort(int *arr, int arrSize) {
    int minRun = 8;
    int i;
    for (i = 0; i < arrSize; i += minRun) {
        int end = (i + minRun < arrSize) ? i + minRun : arrSize;
        insertion(arr, i, end);
    }
    int size = minRun;
    while (size < arrSize) {
        for (int left = 0; left < arrSize; left += 2 * size) {
            int mid = (left + size < arrSize) ? left + size : arrSize;
            int right = (left + 2 * size < arrSize) ? left + 2 * size : arrSize;
            if (mid < right)
                merge(arr, left, mid, right);
        }
        size *= 2;
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

void timSort(vector&lt;int&gt;& arr) {
    int minRun = 8;
    int n = arr.size();
    for (int i = 0; i < n; i += minRun) {
        int end = (i + minRun < n) ? i + minRun : n;
        insertion(arr, i, end);
    }
    int size = minRun;
    while (size < n) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = (left + size < n) ? left + size : n;
            int right = (left + 2 * size < n) ? left + 2 * size : n;
            if (mid < right)
                merge(arr, left, mid, right);
        }
        size *= 2;
    }
}
`,
    "Java": `
public class TimSort {
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
    
    public static void timSort(int[] arr) {
        int minRun = 8;
        int n = arr.length;
        for (int i = 0; i < n; i += minRun) {
            int end = Math.min(i + minRun, n);
            insertion(arr, i, end);
        }
        int size = minRun;
        while (size < n) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = Math.min(left + size, n);
                int right = Math.min(left + 2 * size, n);
                if (mid < right)
                    merge(arr, left, mid, right);
            }
            size *= 2;
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

function timSort(arr) {
    const minRun = 8;
    const n = arr.length;
    for (let i = 0; i < n; i += minRun) {
        const end = Math.min(i + minRun, n);
        insertion(arr, i, end);
    }
    let size = minRun;
    while (size < n) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size, n);
            const right = Math.min(left + 2 * size, n);
            if (mid < right)
                merge(arr, left, mid, right);
        }
        size *= 2;
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

function timSort(arr: number[]): void {
    const minRun = 8;
    const n = arr.length;
    for (let i = 0; i < n; i += minRun) {
        const end = Math.min(i + minRun, n);
        insertion(arr, i, end);
    }
    let size = minRun;
    while (size < n) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size, n);
            const right = Math.min(left + 2 * size, n);
            if (mid < right)
                merge(arr, left, mid, right);
        }
        size *= 2;
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

def timSort(arr: List[int]) -> None:
    minRun = 8
    for start in range(0, len(arr), minRun): 
        end = min(start + minRun, len(arr)) 
        insertion(arr, start, end) 
  
    size = minRun 
    while size < len(arr): 
        for left in range(0, len(arr), 2 * size): 
            mid = min(len(arr), left + size) 
            right = min(left + 2 * size, len(arr)) 
  
            if mid < right: 
                merge(arr, left, mid, right) 
        size *= 2
`
};
