let array = [];
let comparisons = 0;
let swaps = 0;

function getSpeed() {
    const val = document.getElementById('speedSlider').value;
    return 210 - val; // инвертируем: больше = быстрее
}

function getSize() {
    return parseInt(document.getElementById('sizeSlider').value);
}

function updateStats() {
    document.getElementById('compCount').textContent = comparisons;
    document.getElementById('swapCount').textContent = swaps;
}

function resetStats() {
    comparisons = 0;
    swaps = 0;
    updateStats();
}

function generateArray() {
    array = [];
    resetStats();

    const size = getSize();
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    // Ширина столбика зависит от размера массива
    const barWidth = Math.max(2, Math.floor(900 / size) - 3);

    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 350) + 10;
        array.push(value);

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = value + 'px';
        bar.style.width = barWidth + 'px';
        container.appendChild(bar);
    }
}

// Слайдер размера сразу перегенерирует массив
document.getElementById('sizeSlider').addEventListener('input', generateArray);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setButtonsDisabled(disabled) {
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = disabled;
        btn.style.opacity = disabled ? '0.5' : '1';
    });
    document.getElementById('sizeSlider').disabled = disabled;
}

function showInfo(name, desc, complexity) {
    document.getElementById('algo-name').textContent = name;
    document.getElementById('algo-desc').textContent = desc;
    document.getElementById('algo-complexity').textContent = complexity;
}

async function bubbleSort() {
    showInfo(
        'Bubble Sort',
        'Compares adjacent elements and swaps them if they are in the wrong order. Repeats until sorted.',
        'Time complexity: O(n²) — simple but slow on large arrays'
    );

    const bars = document.querySelectorAll('.bar');
    setButtonsDisabled(true);
    resetStats();

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#facc15';
            bars[j + 1].style.backgroundColor = '#facc15';
            await sleep(getSpeed());

            comparisons++;
            updateStats();

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = array[j] + 'px';
                bars[j + 1].style.height = array[j + 1] + 'px';

                swaps++;
                updateStats();
            }

            bars[j].style.backgroundColor = '#e94560';
            bars[j + 1].style.backgroundColor = '#e94560';
        }
        bars[array.length - i - 1].style.backgroundColor = '#22c55e';
    }

    setButtonsDisabled(false);
}

async function selectionSort() {
    showInfo(
        'Selection Sort',
        'Finds the minimum element and places it at the beginning. Repeats for the remaining array.',
        'Time complexity: O(n²) — makes fewer swaps than Bubble Sort'
    );

    const bars = document.querySelectorAll('.bar');
    setButtonsDisabled(true);
    resetStats();

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#a855f7';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#facc15';
            await sleep(getSpeed());

            comparisons++;
            updateStats();

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = '#e94560';
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = '#a855f7';
            } else {
                bars[j].style.backgroundColor = '#e94560';
            }
        }

        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;

        bars[i].style.height = array[i] + 'px';
        bars[minIndex].style.height = array[minIndex] + 'px';

        bars[minIndex].style.backgroundColor = '#e94560';
        bars[i].style.backgroundColor = '#22c55e';

        swaps++;
        updateStats();
    }

    setButtonsDisabled(false);
}

async function insertionSort() {
    showInfo(
        'Insertion Sort',
        'Builds a sorted array one element at a time by inserting each into its correct position.',
        'Time complexity: O(n²) — very fast on nearly sorted arrays'
    );

    const bars = document.querySelectorAll('.bar');
    setButtonsDisabled(true);
    resetStats();

    bars[0].style.backgroundColor = '#22c55e';

    for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = '#facc15';
        await sleep(getSpeed());

        while (j >= 0 && array[j] > current) {
            comparisons++;
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j] + 'px';
            bars[j + 1].style.backgroundColor = '#22c55e';
            bars[j].style.backgroundColor = '#facc15';
            await sleep(getSpeed());
            j--;

            swaps++;
            updateStats();
        }

        comparisons++;
        array[j + 1] = current;
        bars[j + 1].style.height = current + 'px';
        bars[j + 1].style.backgroundColor = '#22c55e';
        updateStats();
    }

    setButtonsDisabled(false);
}
async function quickSort(left = 0, right = array.length - 1, bars = document.querySelectorAll('.bar'), isFirst = true) {
    if (isFirst) {
        showInfo(
            'Quick Sort',
            'Picks a pivot element and partitions the array around it. Recursively sorts each partition.',
            'Time complexity: O(n log n) average — one of the fastest sorting algorithms in practice'
        );
        setButtonsDisabled(true);
        resetStats();
    }

    if (left >= right) {
        if (bars[left]) bars[left].style.backgroundColor = '#22c55e';
        if (isFirst) setButtonsDisabled(false);
        return;
    }

    // Выбираем pivot — последний элемент
    let pivotIndex = right;
    bars[pivotIndex].style.backgroundColor = '#a855f7';

    let i = left - 1;

    for (let j = left; j < right; j++) {
        bars[j].style.backgroundColor = '#facc15';
        await sleep(getSpeed());

        comparisons++;
        updateStats();

        if (array[j] <= array[pivotIndex]) {
            i++;

            // Меняем местами
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = array[i] + 'px';
            bars[j].style.height = array[j] + 'px';

            swaps++;
            updateStats();
        }

        bars[j].style.backgroundColor = '#e94560';
    }

    // Ставим pivot на своё место
    let temp = array[i + 1];
    array[i + 1] = array[right];
    array[right] = temp;

    bars[i + 1].style.height = array[i + 1] + 'px';
    bars[right].style.height = array[right] + 'px';

    bars[right].style.backgroundColor = '#e94560';
    bars[i + 1].style.backgroundColor = '#22c55e';

    let pivot = i + 1;

    // Рекурсивно сортируем левую и правую части
    await quickSort(left, pivot - 1, bars, false);
    await quickSort(pivot + 1, right, bars, false);

    if (isFirst) setButtonsDisabled(false);
}

async function mergeSort(left = 0, right = array.length - 1, bars = document.querySelectorAll('.bar'), isFirst = true) {
    if (isFirst) {
        showInfo(
            'Merge Sort',
            'Divides the array in half, sorts each half, then merges them back together.',
            'Time complexity: O(n log n) — guaranteed, unlike Quick Sort. Uses extra memory.'
        );
        setButtonsDisabled(true);
        resetStats();
    }

    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Сначала сортируем левую половину
    await mergeSort(left, mid, bars, false);
    // Потом правую
    await mergeSort(mid + 1, right, bars, false);
    // Потом сливаем
    await merge(left, mid, right, bars);

    if (isFirst) {
        // Красим всё в зелёный когда готово
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = '#22c55e';
        }
        setButtonsDisabled(false);
    }
}

async function merge(left, mid, right, bars) {
    let leftArr = array.slice(left, mid + 1);
    let rightArr = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        // Подсвечиваем сравниваемые элементы
        bars[k].style.backgroundColor = '#facc15';
        await sleep(getSpeed());

        comparisons++;
        updateStats();

        if (leftArr[i] <= rightArr[j]) {
            array[k] = leftArr[i];
            bars[k].style.height = leftArr[i] + 'px';
            i++;
        } else {
            array[k] = rightArr[j];
            bars[k].style.height = rightArr[j] + 'px';
            j++;
        }

        bars[k].style.backgroundColor = '#e94560';
        k++;
        swaps++;
        updateStats();
    }

    // Добавляем оставшиеся элементы
    while (i < leftArr.length) {
        bars[k].style.backgroundColor = '#facc15';
        await sleep(getSpeed());
        array[k] = leftArr[i];
        bars[k].style.height = leftArr[i] + 'px';
        bars[k].style.backgroundColor = '#e94560';
        i++;
        k++;
    }

    while (j < rightArr.length) {
        bars[k].style.backgroundColor = '#facc15';
        await sleep(getSpeed());
        array[k] = rightArr[j];
        bars[k].style.height = rightArr[j] + 'px';
        bars[k].style.backgroundColor = '#e94560';
        j++;
        k++;
    }
}
generateArray();