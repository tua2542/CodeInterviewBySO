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
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

function starBombExplode(grid) {
    const m = grid.length;
    const n = grid[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '*') {
                grid[i] = grid[i].substring(0, j) + '.' + grid[i].substring(j + 1);
                
                if (i - 1 > -1) {
                    grid[i - 1] = grid[i - 1].substring(0, j) + '.' + grid[i - 1].substring(j + 1);
                }
                
                if (i + 1 < m && grid[i + 1][j] !== '*') {
                    grid[i + 1] = grid[i + 1].substring(0, j) + '.' + grid[i + 1].substring(j + 1);
                }
                
                if (j - 1 > -1) {
                    grid[i] = grid[i].substring(0, j - 1) + '.' + grid[i].substring(j);
                }
                
                if (j + 1 < n && grid[i][j + 1] !== '*') {
                    grid[i] = grid[i].substring(0, j + 1) + '.' + grid[i].substring(j + 2);
                }
            }
        }
    }
}

function reverseState(grid) {
    const m = grid.length;
    const n = grid[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '.') {
                grid[i] = grid[i].substring(0, j) + 'O' + grid[i].substring(j + 1);
            } else if (grid[i][j] === 'O') {
                grid[i] = grid[i].substring(0, j) + '*' + grid[i].substring(j + 1);
            }
        }
    }
}

function plantAllBombs(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const allBombs = 'O'.repeat(n);
    const ans = [];

    for (let i = 0; i < m; i++) {
        ans.push(allBombs);
    }

    return ans;
}

function bomberMan(n, grid) {
    const ans = [...grid];

    if (n % 2 === 0) {
        return plantAllBombs(grid);
    } else if (n > 1) {
        reverseState(ans);
        starBombExplode(ans);
        const ans1 = [...ans];
        reverseState(ans);
        starBombExplode(ans);
        const ans2 = [...ans];

        if ((n + 1) % 4 === 0) {
            return ans1;
        } else if ((n + 3) % 4 === 0) {
            return ans2;
        }
    }

    return ans;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r = parseInt(firstMultipleInput[0], 10);

    const c = parseInt(firstMultipleInput[1], 10);

    const n = parseInt(firstMultipleInput[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = bomberMan(n, grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
