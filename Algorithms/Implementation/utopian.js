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
 * Complete the 'utopianTree' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

// normal
function utopianTree(n) {
    let height = 1;
    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            height = height + 1;
        } else {
            height = height * 2;
        }
    }
    return height;
}

// recursion
function utopianTree(n, height = 1, i = 1) {
    if (i > n) {
        return height;
    }

    if (i % 2 === 0) {
        // Spring (even cycle)
        return utopianTree(n, height + 1, i + 1);
    } else {
        // Summer (odd cycle)
        return utopianTree(n, height * 2, i + 1);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = utopianTree(n);

        ws.write(result + '\n');
    }

    ws.end();
}
