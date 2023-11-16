'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function getTotalX(a, b) {
    let result = 0;
    for (let i = Math.max(...a); i <= Math.min(...b); i++) {
        let isFactorMultiple = true;
        for (let ele of a) {
            if (i % ele !== 0) {
                isFactorMultiple = false;
                break;
            }
        }
        if (isFactorMultiple) {
            for (let ele of b) {
                if (ele % i !== 0) {
                    isFactorMultiple = false;
                    break;
                }
            }
        }
        if (isFactorMultiple) {
            result++;
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

    const total = getTotalX(arr, brr);

    ws.write(total + '\n');

    ws.end();
}
