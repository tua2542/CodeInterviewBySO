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
 * Complete the 'birthday' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY s
 *  2. INTEGER d
 *  3. INTEGER m
 */

function birthday(arr, d, m) {
  let count = 0;

  // Calculate the initial sum of the first m elements
  let currentSum = arr.slice(0, m).reduce((sum, num) => sum + num, 0);

  // Iterate through the array using a sliding window
  for (let i = m; i <= arr.length; i++) {
    // Check if the current sum equals the required sum d
    if (currentSum === d) {
      count++;
    }

    // Move the sliding window to the right by subtracting the first element
    // and adding the next element to the window
    currentSum = currentSum - arr[i - m] + (arr[i] || 0);
  }

  return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const d = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const result = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
