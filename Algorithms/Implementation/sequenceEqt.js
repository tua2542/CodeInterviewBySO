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
 * Complete the 'permutationEquation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY p as parameter.
 */

function permutationEquation(p) {
    let n = p.length;
    let result = [];
    for (let i = 1; i <= n; i++) {
        let indexOfX = p.indexOf(i) + 1;
        let indexOfResult = p.indexOf(indexOfX) + 1;
        result.push(indexOfResult);
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const p = readLine().replace(/\s+$/g, '').split(' ').map(pTemp => parseInt(pTemp, 10));

    const result = permutationEquation(p);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
