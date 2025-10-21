const sort_algorithms = [
    { href: "flashsort", algorithm: "Flash Sort", best: "n", average: "n", worst: "n<sup>2</sup>", memory: "n", stable: "No", inPlace: "No", method: "Distribution" },
    { href: "heapsort", algorithm: "Heap Sort", best: "nlogn", average: "nlogn", worst: "nlogn", memory: "1", stable: "No", inPlace: "Yes", method: "Selection" },
    { href: "cubesort", algorithm: "Cube Sort", best: "n", average: "nlogn", worst: "nlogn", memory: "1", stable: "Yes", inPlace: "", method: "Insertion" },
    { href: "pesort", algorithm: "PE Sort", best: "nlogn", average: "nlogn", worst: "nlogn", memory: "logn", stable: "No", inPlace: "Yes", method: "Selection" },
    { href: "quicksort", algorithm: "Quick Sort", best: "nlogn", average: "nlogn", worst: "n<sup>2</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Partitioning" },
    { href: "introsort", algorithm: "Intro Sort", best: "nlogn", average: "nlogn", worst: "nlogn", memory: "logn", stable: "No", inPlace: "", method: "Partitioning & Selection" },
    { href: "mergesort", algorithm: "Merge Sort", best: "nlogn", average: "nlogn", worst: "nlogn", memory: "n", stable: "Yes", inPlace: "No", method: "Merging" },
    { href: "timsort", algorithm: "Tim Sort", best: "n", average: "nlogn", worst: "nlogn", memory: "n", stable: "Yes", inPlace: "", method: "Merge & Insertion" },
    { href: "shellsort", algorithm: "Shell Sort", best: "nlogn", average: "n<sup>4/3</sup>", worst: "n<sup>3/2</sup>", memory: "1", stable: "No", inPlace: "", method: "Insertion" },
    { href: "insertionsort", algorithm: "Insertion Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "Yes", inPlace: "Yes", method: "Insertion" },
    { href: "selectionsort", algorithm: "Selection Sort", best: "n<sup>2</sup>", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Selection" },
    { href: "bubblesort", algorithm: "Bubble Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "Yes", inPlace: "Yes", method: "Exchanging" },
    { href: "oddevensort", algorithm: "Odd‑even Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "Yes", inPlace: "Yes", method: "Exchanging" },
    { href: "cocktailsort", algorithm: "Cocktail Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "Yes", inPlace: "Yes", method: "Exchanging" },
    { href: "combsort", algorithm: "Comb Sort", best: "nlogn", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Exchanging" },
    { href: "exchangesort", algorithm: "Exchange Sort", best: "n<sup>2</sup>", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Exchanging" },
    { href: "gnomesort", algorithm: "Gnome Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "Yes", inPlace: "Yes", method: "Exchanging" },
    { href: "pancakesort", algorithm: "Pancake Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Selection" },
    { href: "cyclesort", algorithm: "Cycle Sort", best: "n<sup>2</sup>", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Selection" },
    { href: "stoogesort", algorithm: "Stooge Sort", best: "n<sup>log3/log1.5</sup>", average: "n<sup>log3/log1.5</sup>", worst: "n<sup>log3/log1.5</sup>", memory: "1", stable: "No", inPlace: "Yes", method: "Recursive" },
    { href: "strandsort", algorithm: "Strand Sort", best: "n", average: "n<sup>2</sup>", worst: "n<sup>2</sup>", memory: "n", stable: "Yes", inPlace: "No", method: "Selection" }
];

const tbody = document.getElementById("table-body");

sort_algorithms.forEach(sort => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><a href="${sort.href}">${sort.algorithm}</a></td>
        <td>${sort.best}</td>
        <td>${sort.average}</td>
        <td>${sort.worst}</td>
        <td>${sort.memory}</td>
        <td>${sort.stable}</td>
        <td>${sort.inPlace}</td>
        <td>${sort.method}</td>
    `;
    tbody.appendChild(tr);
});