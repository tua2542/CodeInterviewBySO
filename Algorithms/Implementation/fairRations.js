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
 * Complete the 'fairRations' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY B as parameter.
 */

function fairRations(B) {
    let count = 0;

    for (let i = 0; i < B.length - 1; i++) {
        // If the current person has an odd number of loaves, distribute to them and the next person
        if (B[i] % 2 !== 0) {
            B[i]++;
            B[i + 1]++;
            count += 2; // Increment the count for the two distributed loaves
        }
    }

    // If the last person has an odd number of loaves, it's not possible to make it even
    if (B[B.length - 1] % 2 !== 0) {
        return "NO";
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const N = parseInt(readLine().trim(), 10);

    const B = readLine().replace(/\s+$/g, '').split(' ').map(BTemp => parseInt(BTemp, 10));

    const result = fairRations(B);

    ws.write(result + '\n');

    ws.end();
}
