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

/*
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function hourglassSum(arr) {
    let rows = arr.length;
    let columns = arr[0].length;
    let max_hourglass_sum = Number.MIN_SAFE_INTEGER;
    for(let i = 0; i < rows-2; i++){
        for(let j = 0; j < columns-2; j++){
            let current_hourglass_sum = arr[i][j] + arr[i][j+1] + arr[i][j+2]
            + arr[i+1][j+1] + arr[i+2][j] + arr[i+2][j+1] + arr[i+2][j+2];
            console.log(current_hourglass_sum);
            max_hourglass_sum = Math.max(max_hourglass_sum, current_hourglass_sum);
        }
    }
    return max_hourglass_sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    const result = hourglassSum(arr);

    ws.write(result + '\n');

    ws.end();
}
