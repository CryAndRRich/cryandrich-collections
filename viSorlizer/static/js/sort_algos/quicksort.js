async function run() {
    if(!running) updateCompare(0, 0);
    runBtn(quickSort, elements, 0, elements.length - 1)
}

async function quickSort(array, left, right) {
    if (left < right) {
        let j = await partition(left, right);
        await quickSort(array, left, j - 1);
		await quickSort(array, j + 1, right);
    }
}

let codes = {
    "C": `
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int left, int right) {
    int pivot = arr[left];
    int l = left + 1;
    int r = right;
    while (1) {
        while (l <= r && arr[r] >= pivot) {
            r -= 1;
        }
        while (l <= r && arr[l] <= pivot) {
            l += 1;
        }
        if (l <= r) {
            swap(&arr[l], &arr[r]);
        } else {
            break;
        }
    }
    swap(&arr[left], &arr[r]);
    return r;
}

void quickSort(int arr[], int left, int right) {
    if (left >= right)
        return;
    int pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
}
`,

    "C++": `
int partition(vector&lt;int&gt;& arr, int left, int right) {
    int pivot = arr[left];
    int l = left + 1;
    int r = right;
    while (true) {
        while (l <= r && arr[r] >= pivot) {
            r -= 1;
        }
        while (l <= r && arr[l] <= pivot) {
            l += 1;
        }
        if (l <= r) {
            swap(arr[l], arr[r]);
        } else {
            break;
        }
    }
    swap(arr[left], arr[r]);
    return r;
}

void quickSort(vector&lt;int&gt;& arr, int left, int right) {
    if (left >= right)
        return;
    int pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
}
`,

    "Java": `
public class QuickSort {
    static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    static int partition(int[] arr, int left, int right) {
        int pivot = arr[left];
        int l = left + 1;
        int r = right;
        while (true) {
            while (l <= r && arr[r] >= pivot) {
                r -= 1;
            }
            while (l <= r && arr[l] <= pivot) {
                l += 1;
            }
            if (l <= r) {
                swap(arr, l, r);
            } else {
                break;
            }
        }
        swap(arr, left, r);
        return r;
    }

    static void quickSort(int[] arr, int left, int right) {
        if (left >= right)
            return;
        int pivot = partition(arr, left, right);
        quickSort(arr, left, pivot - 1);
        quickSort(arr, pivot + 1, right);
    }
}
`,

    "JavaScript": `
/**
 * @param {number[]} arr
 * @param {number} left
 * @param {number} right
 */
function quickSort(arr, left, right) {
    if (left >= right) return;
    const pivot = arr[left];
    let l = left + 1;
    let r = right;
    while (true) {
        while (l <= r && arr[r] >= pivot) {
            r -= 1;
        }
        while (l <= r && arr[l] <= pivot) {
            l += 1;
        }
        if (l <= r) {
            [arr[l], arr[r]] = [arr[r], arr[l]];
        } else {
            break;
        }
    }
    [arr[left], arr[r]] = [arr[r], arr[left]];
    const pivot = r;
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
}
`,

    "TypeScript": `
function quickSort(arr: number[], left: number, right: number): void {
    if (left >= right) return;
    const pivot: number = arr[left];
    let l: number = left + 1;
    let r: number = right;
    while (true) {
        while (l <= r && arr[r] >= pivot) {
            r -= 1;
        }
        while (l <= r && arr[l] <= pivot) {
            l += 1;
        }
        if (l <= r) {
            [arr[l], arr[r]] = [arr[r], arr[l]];
        } else {
            break;
        }
    }
    [arr[left], arr[r]] = [arr[r], arr[left]];
    const pivot: number = r;
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
}
`,

    "Python": `
def partition(array: List[int], left: int, right: int) -> int:
    pivot = array[left]
    l = left + 1
    r = right

    while True:
        while l <= r and array[r] >= pivot:
            r -= 1

        while l <= r and array[l] <= pivot:
            l += 1

        if l <= r:
            array[l], array[r] = array[r], array[l]
        else:
            break

    array[left], array[r] = array[r], array[left]
    return r

def quick_sort(array: List[int], left: int, right: int) -> None:
    if left >= right:
        return
    pivot = partition(array, left, right)
    quick_sort(array, left, pivot - 1)
    quick_sort(array, pivot + 1, right)
`
}
