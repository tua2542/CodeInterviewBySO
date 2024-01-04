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
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
    const m = matrix.length;
    const n = matrix[0].length;
    const layers = Math.min(m, n) / 2;

    for (let layer = 0; layer < layers; layer++) {
        const perimeter = getPerimeter(layer, m, n);
        const rotation = r % perimeter;

        const values = getLayerValues(matrix, layer, m, n);
        const rotatedValues = rotateArray(values, rotation);

        setLayerValues(matrix, rotatedValues, layer, m, n);
    }

    printMatrix(matrix);
}

function getPerimeter(layer, m, n) {
    return 2 * (m - 2 * layer) + 2 * (n - 2 * layer) - 4;
}

function getLayerValues(matrix, layer, m, n) {
    const values = [];

    for (let i = layer; i < m - layer; i++) {
        values.push(matrix[i][layer]);
    }

    for (let j = layer + 1; j < n - layer - 1; j++) {
        values.push(matrix[m - layer - 1][j]);
    }

    for (let i = m - layer - 1; i >= layer; i--) {
        values.push(matrix[i][n - layer - 1]);
    }

    for (let j = n - layer - 2; j > layer; j--) {
        values.push(matrix[layer][j]);
    }

    return values;
}

function setLayerValues(matrix, values, layer, m, n) {
    let index = 0;

    for (let i = layer; i < m - layer; i++) {
        matrix[i][layer] = values[index++];
    }

    for (let j = layer + 1; j < n - layer - 1; j++) {
        matrix[m - layer - 1][j] = values[index++];
    }

    for (let i = m - layer - 1; i >= layer; i--) {
        matrix[i][n - layer - 1] = values[index++];
    }

    for (let j = n - layer - 2; j > layer; j--) {
        matrix[layer][j] = values[index++];
    }
}

function rotateArray(arr, r) {
    const rotatedArr = [...arr];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        const newIndex = (i + r) % n;
        rotatedArr[newIndex] = arr[i];
    }

    return rotatedArr;
}

function printMatrix(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        console.log(matrix[i].join(' '));
    }
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const r = parseInt(firstMultipleInput[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
