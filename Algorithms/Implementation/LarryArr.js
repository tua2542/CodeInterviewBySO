'use strict';

const fs = require('fs');

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
 * Complete the 'larrysArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY A as parameter.
 */

function larrysArray(A) {
    for (let searchVal = 1; searchVal <= A.length; searchVal++) {
        let currPos = A.indexOf(searchVal);

        while (A[searchVal - 1] !== searchVal) {
            if (currPos - (searchVal - 1) >= 2) {
                const midPos = A[currPos - 1];
                const firstPos = A[currPos - 2];
                A[currPos - 2] = A[currPos];
                A[currPos - 1] = firstPos;
                A[currPos] = midPos;
                currPos -= 2;
            } else {
                if (currPos + 1 >= A.length) {
                    return "NO";
                }
                const lastPos = A[currPos + 1];
                const firstPos = A[currPos - 1];
                A[currPos - 1] = A[currPos];
                A[currPos + 1] = firstPos;
                A[currPos] = lastPos;
                currPos -= 1;
            }
        }
    }

    let prev = -1;
    for (const i of A) {
        if (prev > i) {
            return "NO";
        }
        prev = i;
    }

    return "YES";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

        const result = larrysArray(A);

        ws.write(result + '\n');
    }

    ws.end();
}
