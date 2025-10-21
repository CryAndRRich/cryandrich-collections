async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(cocktailSort, elements);
}

async function cocktailSort(array) {
    let start = 0;
    let end = array.length - 1;
    let new_start, new_end;
    
    while (start <= end) {
        new_start = end;
        new_end = start;
        
        for (let i = start; i < end; i += 1) {
            if (!running) {
                return;
            }
            if (compare(i, i + 1)) {
                await swap(i, i + 1);
                new_end = i;
            }
        }
        end = new_end;
        
        for (let i = end; i >= start; i -= 1) {
            if (!running) {
                return;
            }
            if (compare(i, i + 1)) {
                await swap(i + 1, i);
                new_start = i;
            }
        }
        start = new_start;
    }
}
let codes = {
    "C": `
void cocktailSort(int *arr, int arrSize) {
    int start = 0;
    int end = arrSize - 1;
    int new_start, new_end;
    
    while (start <= end) {
        new_start = end;
        new_end = start;
        
        for (int i = start; i < end; i += 1) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_end = i;
            }
        }
        end = new_end - 1;
        
        for (int i = end; i >= start; i -= 1) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_start = i;
            }
        }
        start = new_start + 1;
    }
}
`,
    "C++": `
void cocktailSort(vector&lt;int&gt;& arr) {
    int start = 0;
    int end = arr.size() - 1;
    int new_start, new_end;
    
    while (start <= end) {
        new_start = end;
        new_end = start;
        
        for (int i = start; i < end; i += 1) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                new_end = i;
            }
        }
        end = new_end - 1;
        
        for (int i = end; i >= start; i -= 1) {
            if (arr[i] > arr[i + 1]) {
                swap(arr[i], arr[i + 1]);
                new_start = i;
            }
        }
        start = new_start + 1;
    }
}
`,
    "Java": `
static void cocktailSort(int[] arr) {
    int start = 0;
    int end = arr.length - 1;
    int new_start, new_end;
    
    while (start <= end) {
        new_start = end;
        new_end = start;
        
        for (int i = start; i < end; i += 1) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_end = i;
            }
        }
        end = new_end - 1;
        
        for (int i = end; i >= start; i -= 1) {
            if (arr[i] > arr[i + 1]) {
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_start = i;
            }
        }
        start = new_start + 1;
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function cocktailSort(arr) {
    let start = 0;
    let end = arr.length - 1;
    let new_start, new_end;
    
    while (start <= end) {
        new_start = end;
        new_end = start;
        
        for (let i = start; i < end; i += 1) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_end = i;
            }
        }
        end = new_end - 1;
        
        for (let i = end; i >= start; i -= 1) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_start = i;
            }
        }
        start = new_start + 1;
    }
}
`,
    "TypeScript": `
function cocktailSort(arr: number[]): void {
    let start = 0;
    let end = arr.length - 1;
    let new_start: number, new_end: number;
    
    while (start <= end) {
        new_start = end;
        new_end = start;
        
        for (let i = start; i < end; i += 1) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_end = i;
            }
        }
        end = new_end - 1;
        
        for (let i = end; i >= start; i -= 1) {
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                new_start = i;
            }
        }
        start = new_start + 1;
    }
}
`,
    "Python": `
def cocktailSort(arr: list[int]) -> None:
    start, end = 0, len(arr) - 1
    while start <= end:
        new_start = end
        new_end = start
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i + 1], arr[i] = arr[i], arr[i + 1]
                new_end = i

        end = new_end - 1
        for i in range(end, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i + 1], arr[i] = arr[i], arr[i + 1]
                new_start = i
        
        start = new_start + 1
`
}
