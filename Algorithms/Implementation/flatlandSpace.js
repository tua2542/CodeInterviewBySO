'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function flatlandSpaceStations(n, c) {
    // Sort the array of space station positions
    c.sort((a, b) => a - b);

    // Calculate the maximum distance from any city to the nearest space station
    let maxDistance = Math.max(c[0], n - 1 - c[c.length - 1]);

    // Iterate through space stations to find the maximum distance
    for (let i = 0; i < c.length - 1; i++) {
        maxDistance = Math.max(maxDistance, Math.floor((c[i + 1] - c[i]) / 2));
    }

    return maxDistance;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");

    ws.end();
}
