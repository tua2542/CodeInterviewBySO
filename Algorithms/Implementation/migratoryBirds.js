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

function migratoryBirds(arr) {
    let birdCount = new Map();
    
    for (let birdType of arr) {
        if (birdCount.has(birdType)) {
            birdCount.set(birdType, birdCount.get(birdType) + 1);
        } else {
            birdCount.set(birdType, 1);
        }
    }
    
    let mostFrequencBirds = [];
    let maxCount = 0;
    
    birdCount.forEach((count, birdType) => {
        if (count > maxCount) {
            maxCount = count;
            mostFrequencBirds = [birdType];
        } else if (count === maxCount) {
            mostFrequencBirds.push(birdType);
        }
    });
    
    return Math.min(...mostFrequencBirds);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = migratoryBirds(arr);

    ws.write(result + '\n');

    ws.end();
}
