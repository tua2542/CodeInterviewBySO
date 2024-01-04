'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'almostSorted' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */
function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function reverseSubarray(arr, start, end) {
    while (start < end) {
        const temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}

function almostSorted(arr) {
    const n = arr.length;
    let left = -1;
    let right = -1;

    for (let i = 0; i < n - 1; ++i) {
        if (arr[i] > arr[i + 1]) {
            left = i;
            break;
        }
    }

    for (let i = n - 1; i >= 1; --i) {
        if (arr[i] < arr[i - 1]) {
            right = i;
            break;
        }
    }

    if (left === -1 && right === -1) {
        console.log("yes");
        return;
    }

    swap(arr, left, right);

    if (isSorted(arr)) {
        console.log("yes");
        console.log(`swap ${left + 1} ${right + 1}`);
        return;
    }

    // Reset arr
    swap(arr, left, right);
    reverseSubarray(arr, left, right);

    if (isSorted(arr)) {
        console.log("yes");
        console.log(`reverse ${left + 1} ${right + 1}`);
    } else {
        console.log("no");
    }
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
