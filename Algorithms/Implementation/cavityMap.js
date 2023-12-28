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
 * Complete the 'cavityMap' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function cavityMap(grid) {
    const n = grid.length;

    // Convert the grid string into a 2D array
    const map = grid.map(row => row.split('').map(Number));

    // Iterate through the grid, excluding the border cells
    for (let i = 1; i < n - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            const currentCell = map[i][j];
            const topCell = map[i - 1][j];
            const bottomCell = map[i + 1][j];
            const leftCell = map[i][j - 1];
            const rightCell = map[i][j + 1];

            // Check if the current cell is a cavity
            if (currentCell > topCell && currentCell > bottomCell && currentCell > leftCell && currentCell > rightCell) {
                // Mark the cavity with 'X'
                grid[i] = grid[i].substring(0, j) + 'X' + grid[i].substring(j + 1);
            }
        }
    }

    return grid;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = cavityMap(grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
