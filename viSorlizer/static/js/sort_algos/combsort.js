async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(combSort, elements);
}

async function combSort(array) {
    let gap = array.length;
    let shrink = 1.3;
    let sorted = false;
    
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        } else if (gap == 9 || gap == 10) {
            gap = 11;
        }
        
        for (let i = 0; i < array.length - gap; i += 1) {
            if (!running) {
                return;
            }
            if(compare(i, i + gap)) {
                await swap(i, i + gap);
                sorted = false;
            }
        }
    }
}


let codes = {
    "C": `
void combSort(int *arr, int arrSize) {
    int gap = arrSize;
    double shrink = 1.3;
    int sorted = 0;

    while (!sorted) {
        gap = (int)((double)gap / shrink);
        if(gap <= 1) {
            gap = 1;
            sorted = 1;
        } else if (gap == 9 || gap == 10) {
            gap = 11;
        }

        for(int i = 0; i < arrSize - gap; i += 1) {
            if(arr[i] > arr[i + gap]) {
                int temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                sorted = false;
            }
        }
    }
    
}`, 
    "C++": `
void combSort(vector&lt;int&gt;& arr) {
    int gap = arr.size();
    double shrink = 1.3;
    bool sorted = false;
    
    while (!sorted) {
        gap = int(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        } else if (gap == 9 || gap == 10) {
            gap = 11;
        }
        for (int i = 0; i < arr.size() - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                swap(&arr[i], &arr[i + gap]);
                sorted = false;
            }
        }
    }
}
`,
    "Java": `
static void combSort(int[] arr) {
    int gap = arr.length;
    double shrink = 1.3;
    boolean sorted = false;
    
    while (!sorted) {
        gap = (int)(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        } else if (gap == 9 || gap == 10) {
            gap = 11;
        }
        for (int i = 0; i < arr.length - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                int temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                sorted = false;
            }
        }
    }
}`,
    "JavaScript": `
/**
 * @param {number[]} arr
 */
function combSort(arr) {
    let gap = arr.length;
    const shrink = 1.3;
    let sorted = false;
    
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        } else if (gap === 9 || gap === 10) {
            gap = 11;
        }
        
        for (let i = 0; i < arr.length - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                let temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                sorted = false;
            }
        }
    }
}`,
    "TypeScript": `
function combSort(arr: number[]): void {
    let gap = arr.length;
    const shrink = 1.3;
    let sorted = false;
    
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        } else if (gap === 9 || gap === 10) {
            gap = 11;
        }
        
        for (let i = 0; i < arr.length - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                let temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                sorted = false;
            }
        }
    }
}`,
    "Python": `
def combSort(arr: List[int]) -> None:
    gap = len(arr)
    shrink = 1.3
    sorted = False
    
    while not sorted:
        gap = int(gap / shrink)
        if gap <= 1:
            gap = 1
            sorted = True
        elif gap == 9 or gap == 10:
            gap = 11
        
        for i in range(len(arr) - gap):
            if arr[i] > arr[i + gap]:
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                sorted = False`
}