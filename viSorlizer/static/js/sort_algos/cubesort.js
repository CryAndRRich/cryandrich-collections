async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(cubeSort, elements);
}

async function cubeSort(array) {
    const CUBE_SIZE = 8;
    let n = array.length;
    for (let i = 0; i < n; i += CUBE_SIZE) {
        if (!running) {
            return;
        }
        let right = (i + CUBE_SIZE < n) ? i + CUBE_SIZE : n;
        await insertion(i, right);
    }

    let step = CUBE_SIZE;
    while (step < n) {
        if (!running) {
            return;
        }
        for (let i = 0; i < n; i += 2 * step) {
            let mid = i + step;
            let right = (i + 2 * step < n) ? i + 2 * step : n;
            if (mid < n) {
                await merge(array, i, mid, right);
            }
        }
        step *= 2;
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

void cubeSort(int *arr, int arrSize) {
    const int CUBE_SIZE = 8;
    for (int i = 0; i < arrSize; i += CUBE_SIZE) {
        int right = (i + CUBE_SIZE < arrSize) ? i + CUBE_SIZE : arrSize;
        insertion(arr, i, right);
    }
    
    int step = CUBE_SIZE;
    while (step < arrSize) {
        for (int i = 0; i < arrSize; i += 2 * step) {
            int mid = i + step;
            int right = (i + 2 * step < arrSize) ? i + 2 * step : arrSize;
            if (mid < arrSize) {
                merge(arr, i, mid, right);
            }
        }
        step *= 2;
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

void cubeSort(vector&lt;int&gt;& arr) {
    const int CUBE_SIZE = 8;
    for (int i = 0; i < arr.size(); i += CUBE_SIZE) {
        int right = (i + CUBE_SIZE < arr.size()) ? i + CUBE_SIZE : arr.size();
        insertion(arr, i, right);
    }
    
    int step = CUBE_SIZE;
    while (step < arr.size()) {
        for (int i = 0; i < arr.size(); i += 2 * step) {
            int mid = i + step;
            int right = (i + 2 * step < arr.size()) ? i + 2 * step : arr.size();
            if (mid < arr.size()) {
                merge(arr, i, mid, right);
            }
        }
        step *= 2;
    }
}
`,
    "Java": `
public class CubeSort {
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
    
    public static void cubeSort(int[] arr) {
        final int CUBE_SIZE = 8;
        for (int i = 0; i < arr.length; i += CUBE_SIZE) {
            int right = (i + CUBE_SIZE < arr.length) ? i + CUBE_SIZE : arr.length;
            insertion(arr, i, right);
        }
        
        int step = CUBE_SIZE;
        while (step < arr.length) {
            for (int i = 0; i < arr.length; i += 2 * step) {
                int mid = i + step;
                int right = (i + 2 * step < arr.length) ? i + 2 * step : arr.length;
                if (mid < arr.length) {
                    merge(arr, i, mid, right);
                }
            }
            step *= 2;
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
    
function cubeSort(arr) {
    const CUBE_SIZE = 8;
    for (let i = 0; i < arr.length; i += CUBE_SIZE) {
        let right = (i + CUBE_SIZE < arr.length) ? i + CUBE_SIZE : arr.length;
        insertion(arr, i, right);
    }
    
    let step = CUBE_SIZE;
    while (step < arr.length) {
        for (let i = 0; i < arr.length; i += 2 * step) {
            let mid = i + step;
            let right = (i + 2 * step < arr.length) ? i + 2 * step : arr.length;
            if (mid < arr.length) {
                merge(arr, i, mid, right);
            }
        }
        step *= 2;
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

function cubeSort(arr: number[]): void {
    const CUBE_SIZE = 8;
    for (let i = 0; i < arr.length; i += CUBE_SIZE) {
        let right = (i + CUBE_SIZE < arr.length) ? i + CUBE_SIZE : arr.length;
        insertion(arr, i, right);
}

let step = CUBE_SIZE;
    while (step < arr.length) {
        for (let i = 0; i < arr.length; i += 2 * step) {
            let mid = i + step;
            let right = (i + 2 * step < arr.length) ? i + 2 * step : arr.length;
            if (mid < arr.length) {
                merge(arr, i, mid, right);
            }
        }
        step *= 2;
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

def cubeSort(arr: List[int]) -> None:
    CUBE_SIZE = 8
    for i in range(0, len(arr), CUBE_SIZE):
        right = i + CUBE_SIZE if i + CUBE_SIZE < len(arr) else len(arr)
        insertion(arr, i, right)

    step = CUBE_SIZE
    while step < len(arr):
        for i in range(0, len(arr), 2 * step):
            mid = i + step
            right = i + 2 * step if i + 2 * step < len(arr) else len(arr)
            if mid < len(arr):
                merge(arr, i, mid, right)
        step *= 2
`
};
