async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(flashSort, elements);
}

async function flashSort(array) {
    const n = array.length;
  
    let min_val = getValue(array[0]);
    let max_index = 0;
    for (let i = 1; i < n; i++) {
        if (!running) {
            return;
        }
        if (getValue(array[i]) < min_val) {
            min_val = getValue(array[i]);
            updateCompare(comparisons + 1, swaps);
        }
        if (compare(i, max_index)) {
            max_index = i;
        }
    }

    const m = Math.max(2, Math.floor(0.43 * n));
    const L = new Array(m).fill(0);
    const c1 = (m - 1) / (getValue(array[max_index]) - min_val);
  
    for (let i = 0; i < n; i += 1) {
        if (!running) {
            return;
        }
        const k = Math.floor(c1 * (getValue(array[i]) - min_val));
        L[k] += 1;
    }
  
    for (let i = 1; i < m; i += 1) {
        if (!running) {
            return;
        }
        L[i] += L[i - 1];
    }
  
    await swap(0, max_index);
  
    let move = 0;
    let j = 0;
    let k = m - 1;
  
    while (move < n - 1) {
        while (j >= L[k]) {
            if (!running) {
                return;
            }
            j += 1;
            k = Math.floor(c1 * (getValue(array[j]) - min_val));
        }
        while (j !== L[k]) {
            if (!running) {
                return;
            }
            k = Math.floor(c1 * (getValue(array[j]) - min_val));
            const pos = L[k] - 1;
            await swap(j, pos);
            L[k] -= 1;
            move += 1;
        }
    }

    await insertion(0, array.length);
}

let codes = {
    "C": `
void insertion(int *arr, int arrSize) {
    int i, key, j;
    for (i = 1; i < arrSize; i += 1) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void flashSort(int *arr, int arrSize) {
    int min_val = arr[0];
    int max_index = 0;
    int i, j, k, pos, move, m, temp;
    for (i = 1; i < arrSize; i += 1) {
        if (arr[i] < min_val) {
            min_val = arr[i];
        }
        if (arr[i] > arr[max_index]) {
            max_index = i;
        }
    }
    if (arr[max_index] == min_val) {
        return;
    }
    m = (2 > (int)(0.43 * arrSize) ? 2 : (int)(0.43 * arrSize));
    int *L = (int*) malloc(m * sizeof(int));
    for (i = 0; i < m; i += 1) {
        L[i] = 0;
    }
    double c1 = (double)(m - 1) / (arr[max_index] - min_val);
    for (i = 0; i < arrSize; i += 1) {
        int index = (int)(c1 * (arr[i] - min_val));
        L[index] += 1;
    }
    for (i = 1; i < m; i += 1) {
        L[i] += L[i - 1];
    }

    temp = arr[0];
    arr[0] = arr[max_index];
    arr[max_index] = temp;
    
    move = 0;
    j = 0;
    k = m - 1;
    while (move < arrSize - 1) {
        while (j >= L[k]) {
            j += 1;
            k = (int)(c1 * (arr[j] - min_val));
        }
        while (j != L[k]) {
            k = (int)(c1 * (arr[j] - min_val));
            pos = L[k] - 1;

            temp = arr[pos];
            arr[pos] = arr[j];
            arr[j] = temp;

            L[k] -= 1;
            move += 1;
        }
    }
    free(L);
    insertion(arr, arrSize);
}
`,
    "C++": `
void insertion(vector&lt;int&gt;& arr) {
    int i, key, j;
    for (i = 1; i < arr.size(); i += 1) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

void flashSort(vector&lt;int&gt;& arr) {
    int n = arr.size();
    int min_val = arr[0];
    int max_index = 0;
    int i, j, k, pos, move, m, temp;
    for (i = 1; i < n; i += 1) {
        if (arr[i] < min_val) {
            min_val = arr[i];
        }
        if (arr[i] > arr[max_index]) {
            max_index = i;
        }
    }
    if (arr[max_index] == min_val) {
        return;
    }
    m = (2 > (int)(0.43 * n) ? 2 : (int)(0.43 * n));
    vector&lt;int&gt; L(m, 0);
    double c1 = (double)(m - 1) / (arr[max_index] - min_val);
    for (i = 0; i < n; i += 1) {
        int index = (int)(c1 * (arr[i] - min_val));
        L[index] += 1;
    }
    for (i = 1; i < m; i += 1) {
        L[i] += L[i - 1];
    }

    temp = arr[0];
    arr[0] = arr[max_index];
    arr[max_index] = temp;
    
    move = 0;
    j = 0;
    k = m - 1;
    while (move < n - 1) {
        while (j >= L[k]) {
            j += 1;
            k = (int)(c1 * (arr[j] - min_val));
        }
        while (j != L[k]) {
            k = (int)(c1 * (arr[j] - min_val));
            pos = L[k] - 1;
    
            temp = arr[pos];
            arr[pos] = arr[j];
            arr[j] = temp;
    
            L[k] -= 1;
            move += 1;
        }
    }
    insertion(arr);
}
  `,
    "Java": `
static void insertion(int[] arr) {
    for (int i = 1; i < arr.length; i += 1) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

static void flashSort(int[] arr) {
    int n = arr.length;
    int min_val = arr[0];
    int max_index = 0;
    int i, j, k, pos, move, m, temp;
    for (i = 1; i < n; i += 1) {
        if (arr[i] < min_val) {
            min_val = arr[i];
        }
        if (arr[i] > arr[max_index]) {
            max_index = i;
        }
    }
    if (arr[max_index] == min_val) {
        return;
    }
    m = Math.max(2, (int)(0.43 * n));
    int[] L = new int[m];
    for (i = 0; i < m; i += 1) {
        L[i] = 0;
    }
    double c1 = (double)(m - 1) / (arr[max_index] - min_val);
    for (i = 0; i < n; i += 1) {
        int index = (int)(c1 * (arr[i] - min_val));
        L[index] += 1;
    }
    for (i = 1; i < m; i += 1) {
        L[i] += L[i - 1];
    }

    temp = arr[0];
    arr[0] = arr[max_index];
    arr[max_index] = temp;

    move = 0;
    j = 0;
    k = m - 1;
    while (move < n - 1) {
        while (j >= L[k]) {
            j += 1;
            k = (int)(c1 * (arr[j] - min_val));
        }
        while (j != L[k]) {
            k = (int)(c1 * (arr[j] - min_val));
            pos = L[k] - 1;

            temp = arr[pos];
            arr[pos] = arr[j];
            arr[j] = temp;

            L[k] -= 1;
            move += 1;
        }
    }
    insertion(arr);
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function insertion(arr) {
    for (let i = 1; i < arr.length; i += 1) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

/**
 * @param {number[]} arr
 */
function flashSort(arr) {
    const n = arr.length;
    if (n === 0) return;
    let min_val = arr[0];
    let max_index = 0;
    let i, j, k, pos, move, m, temp;
    for (i = 1; i < n; i += 1) {
        if (arr[i] < min_val) {
            min_val = arr[i];
        }
        if (arr[i] > arr[max_index]) {
            max_index = i;
        }
    }
    if (arr[max_index] === min_val) return;
    m = Math.max(2, Math.floor(0.43 * n));
    let L = new Array(m).fill(0);
    let c1 = (m - 1) / (arr[max_index] - min_val);
    for (i = 0; i < n; i += 1) {
        let index = Math.floor(c1 * (arr[i] - min_val));
        L[index] += 1;
    }
    for (i = 1; i < m; i += 1) {
        L[i] += L[i - 1];
    }
    
    temp = arr[0];
    arr[0] = arr[max_index];
    arr[max_index] = temp;
    
    move = 0;
    j = 0;
    k = m - 1;
    while (move < n - 1) {
        while (j >= L[k]) {
            j += 1;
            k = Math.floor(c1 * (arr[j] - min_val));
        }
        while (j !== L[k]) {
            k = Math.floor(c1 * (arr[j] - min_val));
            pos = L[k] - 1;
           
            temp = arr[pos];
            arr[pos] = arr[j];
            arr[j] = temp;
           
            L[k] -= 1;
            move += 1;
        }
    }
    insertion(arr);
}
`,
    "TypeScript": `
function insertion(arr: number[]): void {
    for (let i = 1; i < arr.length; i += 1) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
}

function flashSort(arr: number[]): void {
    const n = arr.length;
    let min_val = arr[0];
    let max_index = 0;
    let i: number, j: number, k: number, pos: number, move: number, m: number, temp: number;
    for (i = 1; i < n; i += 1) {
        if (arr[i] < min_val) {
            min_val = arr[i];
        }
        if (arr[i] > arr[max_index]) {
            max_index = i;
        }
    }
    if (arr[max_index] === min_val) return;
    
    m = Math.max(2, Math.floor(0.43 * n));
    let L = new Array(m).fill(0);
    let c1 = (m - 1) / (arr[max_index] - min_val);
    for (i = 0; i < n; i += 1) {
        let index = Math.floor(c1 * (arr[i] - min_val));
        L[index] += 1;
    }
    for (i = 1; i < m; i += 1) {
        L[i] += L[i - 1];
    }

    temp = arr[0];
    arr[0] = arr[max_index];
    arr[max_index] = temp;
    
    move = 0;
    j = 0;
    k = m - 1;
    while (move < n - 1) {
        while (j >= L[k]) {
            j += 1;
            k = Math.floor(c1 * (arr[j] - min_val));
        }
        while (j !== L[k]) {
            k = Math.floor(c1 * (arr[j] - min_val));
            pos = L[k] - 1;
    
            temp = arr[pos];
            arr[pos] = arr[j];
            arr[j] = temp;
    
            L[k] -= 1;
            move += 1;
        }
    }
    insertion(arr);
}
`,
    "Python": `
def insertion(arr: List[int]) -> None:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def flashSort(arr: List[int]) -> None:
    n = len(arr)
    min_val = arr[0]
    max_index = 0
    for i in range(1, n):
        if arr[i] < min_val:
            min_val = arr[i]
        if arr[i] > arr[max_index]:
            max_index = i

    if arr[max_index] == min_val:
        return

    m = max(2, int(0.43 * n))
    L = [0] * m
    c1 = (m - 1) / (arr[max_index] - min_val)
    for x in arr:
        k = int(c1 * (x - min_val))
        L[k] += 1
    for i in range(1, m):
        L[i] += L[i - 1]
    
    arr[0], arr[max_index] = arr[max_index], arr[0]
    
    move = 0
    j = 0
    k = m - 1
    while move < n - 1:
        while j >= L[k]:
            j += 1
            k = int(c1 * (arr[j] - min_val))
        while j != L[k]:
            k = int(c1 * (arr[j] - min_val))
            pos = L[k] - 1
            arr[pos], arr[j] = arr[j], arr[pos]
            L[k] -= 1
            move += 1
    insertion(arr)
`
};
