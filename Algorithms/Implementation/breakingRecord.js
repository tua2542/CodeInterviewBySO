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

function breakingRecords(scores) {
    let currentHigh = scores[0];
    let currentLow = scores[0];
    let highCount = 0;
    let lowCount = 0;
    scores.forEach(score => {
        if (score > currentHigh) {
            currentHigh = score;
            highCount = highCount + 1;
        } else if (score < currentLow) {
            currentLow = score
            lowCount = lowCount + 1;
        }
    });
    return [highCount, lowCount];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const scores = readLine().replace(/\s+$/g, '').split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
