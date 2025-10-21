async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(shellSort, elements);
}

async function shellSort(array) {
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1]

    for (let k = 0; k < gaps.length; k += 1){
        let gap = gaps[k];
        for (let i = gap; i < array.length; i += 1) {
            if (!running) {
                return;
            }
            let j = i;
            while (j >= gap) {
                if (!running) {
                    return;
                }
                
                if (compare(j, j - gap)) {
                    break;
                }
                await swap(j - gap, j)
                j -= gap;
            }
        }
    };
}

let codes = {
    "C": `
void shellSort(int *arr, int arrSize) {
    int gaps[] = {701, 301, 132, 57, 23, 10, 4, 1};
    int gapsSize = sizeof(gaps) / sizeof(gaps[0]);
    int gap, i, j, temp;
    for (int k = 0; k < gapsSize; k += 1) {
        gap = gaps[k];
        for (i = gap; i < arrSize; i += 1) {
            temp = arr[i];
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}
`,
    "C++": `
void shellSort(vector&lt;int&gt;& arr) {
    vector&lt;int&gt; gaps = {701, 301, 132, 57, 23, 10, 4, 1};
    for (int gap : gaps) {
        for (int i = gap; i < arr.size(); i += 1) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}
`,
    "Java": `
static void shellSort(int[] arr) {
    int[] gaps = {701, 301, 132, 57, 23, 10, 4, 1};
    for (int gap : gaps) {
        for (int i = gap; i < arr.length; i += 1) {
            int temp = arr[i];
            int j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}
`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function shellSort(arr) {
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
    for (const gap of gaps) {
        for (let i = gap; i < arr.length; i += 1) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}
`,
    "TypeScript": `
function shellSort(arr: number[]): void {
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1];
    for (const gap of gaps) {
        for (let i = gap; i < arr.length; i += 1) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
    }
}
`,
    "Python": `
def shellSort(arr: List[int]) -> None:
    gaps = [701, 301, 132, 57, 23, 10, 4, 1]
    for gap in gaps:
        for i in range(gap, len(arr)):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            
            arr[j] = temp
`
}
