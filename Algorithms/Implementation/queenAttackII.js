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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
    let attackCellCounter = 0;

    const vectors = [
        [0, 1],     // 0
        [1, 1],     // 45
        [1, 0],     // 90
        [1, -1],    // 135
        [0, -1],    // 180
        [-1, -1],   // 225
        [-1, 0],    // 270
        [-1, 1]     // 315    
    ];

    const diagonalPos = r_q - c_q;
    const diagonalNeg = r_q + c_q;

    const isBlockedCell = (cell) => (
        cell[0] === r_q ||                          // blockers at the same row as queen
        cell[1] === c_q ||                          // blockers at the same column as queen
        cell[0] - cell[1] === diagonalPos ||        // blockers diagonal positive slope
        cell[0] + cell[1] === diagonalNeg           // blockers diagonal negative slope
    );

    const blockedCells = obstacles.filter(isBlockedCell);

    vectors.forEach(vector => {
        let [row, col] = [r_q + vector[0], c_q + vector[1]];
        let isBlocked = false;

        while (row > 0 && row <= n && col > 0 && col <= n && !isBlocked) {
            isBlocked = blockedCells.some(cell => cell[0] === row && cell[1] === col);

            if (!isBlocked) {
                attackCellCounter++;
                [row, col] = [row + vector[0], col + vector[1]];
            }
        }
    });

    console.log(blockedCells.length);
    return attackCellCounter;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r_q = parseInt(secondMultipleInput[0], 10);

    const c_q = parseInt(secondMultipleInput[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
