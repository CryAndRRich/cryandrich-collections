async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(pancakeSort, elements);
}

async function flip(k) {
    let left = 0;
    while (left < k) {
        if (!running) {
            return;
        }
        await swap(left, k);
        k -= 1;
        left += 1;
    }
}

function max_index(k) {
    let index = 0;
    for (let i = 0; i < k; i += 1) {
        if (compare(i, index)) {
            index = i;
        }
    }
    return index;
}

async function pancakeSort(array) {
    let n = array.length;
    while (n > 1) {
        if (!running) {
            return;
        }
        let maxidx = max_index(n);
        if (maxidx != n - 1) {
            if (maxidx != 0) {
                await flip(maxidx);
            }
            await flip(n - 1);
        }
        n -= 1;
    }
}

var codes = {
    "C": `
void flip(int* arr, int k) {
    int left = 0;
    while (left < k) {
        int temp = arr[left];
        arr[left] = arr[k];
        arr[k] = temp;
        k -= 1;
        left += 1;
    }
}

int maxIndex(int* arr, int k) {
    int index = 0;
    for (int i = 0; i < k; i += 1) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

void pancakeSort(int* arr, int arrSize) {
    int maxidx;
    int n = arrSize;
    while (n > 1) {
        maxidx = maxIndex(arr, n);
        if (maxidx != n - 1) {
            if (maxidx != 0) {
                flip(arr, maxidx);
            }
            flip(arr, n - 1);
        }
        n -= 1;
    }
}`,
    "C++": `
void flip(vector&lt;int&gt;& arr, int k) {
    int left = 0;
    while (left < k) {
        int temp = arr[left];
        arr[left] = arr[k];
        arr[k] = temp;
        k -= 1;
        left += 1;
    }
}

int maxIndex(vector&lt;int&gt;& arr, int k) {
    int index = 0;
    for (int i = 0; i < k; i += 1) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

void pancakeSort(vector&lt;int&gt;& arr) {
    int maxidx;
    int n = arr.size();
    while (n > 1) {
        maxidx = maxIndex(arr, n);
        if (maxidx != n - 1) {
            if (maxidx != 0) {
                flip(arr, maxidx);
            }
            flip(arr, n - 1);
        }
        n -= 1;
    }
}`,
    "Java": `
public static void flip(int[] arr, int k) {
    int left = 0;
    while (left < k) {
        int temp = arr[left];
        arr[left] = arr[k];
        arr[k] = temp;
        k -= 1;
        left += 1;
    }
}

public static int maxIndex(int[] arr, int k) {
    int index = 0;
    for (int i = 0; i < k; i += 1) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

public static void pancakeSort(int[] arr) {
    int maxidx;
    int n = arr.length;
    while (n > 1) {
        maxidx = maxIndex(arr, n);
        if (maxidx != n - 1) {
            if (maxidx != 0) {
                flip(arr, maxidx);
            }
            flip(arr, n - 1);
        }
        n -= 1;
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} k
 */
function flip(arr, k) {
    let left = 0;
    while (left < k) {
        [arr[left], arr[k]] = [arr[k], arr[left]];
        k -= 1;
        left += 1;
    }
}

function max_index(arr, k) {
    let index = 0;
    for (let i = 0; i < k; i += 1) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

function pancakeSort(arr) {
    let n = arr.length;
    while (n > 1) {
        let maxidx = max_index(arr, n);
        if (maxidx != n - 1) {
            if (maxidx != 0) {
                flip(arr, maxidx);
            }
            flip(arr, n - 1);
        }
        n -= 1;
    }
}`,
    "TypeScript": `
function flip(arr: number[], k: number): void{
    let left = 0;
    while (left < k) {
        [arr[left], arr[k]] = [arr[k], arr[left]];
        k -= 1;
        left += 1;
    }
}

function max_index(arr: number[], k: number): number{
    let index = 0;
    for (let i = 0; i < k; i += 1) {
        if (arr[i] > arr[index]) {
            index = i;
        }
    }
    return index;
}

function pancakeSort(arr: number[]): void{
    let n = arr.length;
    while (n > 1) {
        let maxidx = max_index(arr, n);
        if (maxidx != n - 1) {
            if (maxidx != 0) {
                flip(arr, maxidx);
            }
            flip(arr, n - 1);
        }
        n -= 1;
    }
}`,
    "Python": `
def flip(arr, k):
    left = 0
    while left < k:
        arr[left], arr[k] = arr[k], arr[left]
        k -= 1
        left += 1

def max_index(arr, k):
    index = 0
    for i in range(k):
        if arr[i] > arr[index]:
            index = i
    return index

def pancake_sort(arr):
    n = len(arr)
    while n > 1:
        maxidx = max_index(arr, n)
        if maxidx != n - 1:
            if maxidx != 0:
                flip(arr, maxidx)
            flip(arr, n - 1)
        n -= 1`
}