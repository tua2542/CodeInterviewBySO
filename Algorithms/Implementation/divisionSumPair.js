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
 * Complete the 'divisibleSumPairs' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER_ARRAY ar
 */
//Method 1 Nested loop
function divisibleSumPairs(n, k, ar) {
    let count = 0;
    for(let i =0; i < ar.length; i++){
        for(let j = i+1; j < ar.length; j++){
             if(((ar[i] + ar[j]) % k) === 0){
                 count++;
             }
        }
    }
    return count;
}
//Method 2 Hashtable
function divisibleSumPairs(n, k, ar) {
    let count = 0;
    let map = {};

    for (let i in ar) {
        let mod = ar[i] % k;
        let compl = (k - mod) % k;

        if (map[compl]) {
            count += map[compl];
        }

        // Update the frequency of the current remainder
        map[mod] = (map[mod] || 0) + 1;
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const ar = readLine().replace(/\s+$/g, '').split(' ').map(arTemp => parseInt(arTemp, 10));

    const result = divisibleSumPairs(n, k, ar);

    ws.write(result + '\n');

    ws.end();
}
