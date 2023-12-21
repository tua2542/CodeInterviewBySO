'use strict';

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
 * Complete the 'kaprekarNumbers' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER p
 *  2. INTEGER q
 */

function kaprekarNumbers(p, q) {
    let kaprekarNumbers = [];

    for (let num = p; num <= q; num++) {
        const square = BigInt(num) * BigInt(num);
        const squareStr = square.toString();
        const d = num.toString().length;
        const rightPartStr = squareStr.slice(-d);
        const leftPartStr = squareStr.slice(0, -d) || '0';

        const leftPart = parseInt(leftPartStr);
        const rightPart = parseInt(rightPartStr);

        if (leftPart + rightPart === num) {
            kaprekarNumbers.push(num);
        }

    }
    if (kaprekarNumbers.length > 0) {
        console.log(kaprekarNumbers.join(' '));
    } else {
        console.log('INVALID RANGE');
    }

}

function main() {
    const p = parseInt(readLine().trim(), 10);

    const q = parseInt(readLine().trim(), 10);

    kaprekarNumbers(p, q);
}
