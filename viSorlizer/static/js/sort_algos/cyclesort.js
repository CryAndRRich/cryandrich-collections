async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(cycleSort, elements);
}

async function cycleSort(array) {
    for (let i = 0; i < array.length - 1; i += 1) {
        let pos = i;
        for (let j = i + 1; j < array.length; j += 1) {
            if (!running) {
                return;
            }
            if(compare(i, j)) {
                pos += 1;
            }
        }
        if (pos == i) {
            continue;
        }
        await swap(i, pos);

        while (pos != i) {
            pos = i;
            for (let j = i + 1; j < array.length; j += 1) {
                if (!running) {
                    return;
                }
                if(compare(i, j)) {
                    pos += 1;
                }
            }
            await swap(i, pos);
        }
    }
}

let codes = {
    "C": `
void cycleSort(int *arr, int arrSize) {
    int cycle_start, pos, i, temp;

    for (cycle_start = 0; cycle_start <= arrSize - 2; cycle_start += 1) {
        int item = arr[cycle_start];
        pos = cycle_start;
        for (i = cycle_start + 1; i < arrSize; i += 1) {
            if (arr[i] < item)
                pos += 1;
        }
        if (pos == cycle_start)
            continue;

        temp = arr[pos];
        arr[pos] = item;
        item = temp;

        while (pos != cycle_start) {
            pos = cycle_start;
            for (i = cycle_start + 1; i < arrSize; i += 1) {
                if (arr[i] < item)
                    pos += 1;
            }
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
        }
    }
}
    `,
    "C++": `
void cycleSort(vector&lt;int&gt;& arr) {
    for (int cycle_start = 0; cycle_start <= arr.size() - 2; cycle_start += 1) {
        int item = arr[cycle_start];
        int pos = cycle_start;
        for (int i = cycle_start + 1; i < arr.size(); i += 1) {
            if (arr[i] < item)
                pos += 1;
        }
        if (pos == cycle_start)
            continue;

        int temp = arr[pos];
        arr[pos] = item;
        item = temp;

        while (pos != cycle_start) {
            pos = cycle_start;
            for (int i = cycle_start + 1; i < arr.size(); i += 1) {
                if (arr[i] < item)
                    pos += 1;
            }
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
        }
    }
}
    `,
    "Java": `
static void cycleSort(int[] arr) {
    for (int cycle_start = 0; cycle_start <= arr.length - 2; cycle_start += 1) {
        int item = arr[cycle_start];
        int pos = cycle_start;
        for (int i = cycle_start + 1; i < arr.length; i += 1) {
            if (arr[i] < item)
                pos += 1;
        }
        if (pos == cycle_start)
            continue;

        int temp = arr[pos];
        arr[pos] = item;
        item = temp;
        
        while (pos != cycle_start) {
            pos = cycle_start;
            for (int i = cycle_start + 1; i < arr.length; i += 1) {
                if (arr[i] < item)
                    pos += 1;
            }
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
        }
    }
}
    `,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function cycleSort(arr) {
    for (let cycle_start = 0; cycle_start <= arr.length - 2; cycle_start += 1) {
        let item = arr[cycle_start];
        let pos = cycle_start;
        for (let i = cycle_start + 1; i < arr.length; i += 1) {
            if (arr[i] < item)
                pos += 1;
        }
        if (pos === cycle_start)
            continue;

        let temp = arr[pos];
        arr[pos] = item;
        item = temp;
        
        while (pos !== cycle_start) {
            pos = cycle_start;
            for (let i = cycle_start + 1; i < arr.length; i += 1) {
                if (arr[i] < item)
                    pos += 1;
            }
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
        }
    }
}
    `,
    "TypeScript": `
function cycleSort(arr: number[]): void {
    for (let cycle_start = 0; cycle_start <= arr.length - 2; cycle_start += 1) {
        let item = arr[cycle_start];
        let pos = cycle_start;
        for (let i = cycle_start + 1; i < arr.length; i += 1) {
            if (arr[i] < item)
                pos += 1;
        }
        if (pos === cycle_start)
            continue;

        let temp = arr[pos];
        arr[pos] = item;
        item = temp;
        
        while (pos !== cycle_start) {
            pos = cycle_start;
            for (let i = cycle_start + 1; i < arr.length; i += 1) {
                if (arr[i] < item)
                    pos += 1;
            }
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
        }
    }
}
    `,
    "Python": `
def cycleSort(arr: List[int]) -> None:
    for cycle_start in range(0, len(array) - 1):
        item = array[cycle_start]
        pos = cycle_start

        for i in range(cycle_start + 1, len(array)):
            if array[i] < item:
                pos += 1

        if pos == cycle_start:
            continue

        array[pos], item = item, array[pos]
        while pos != cycle_start:
            pos = cycle_start
            for i in range(cycle_start + 1, len(array)):
                if array[i] < item:
                    pos += 1
            array[pos], item = item, array[pos]
`
};
  