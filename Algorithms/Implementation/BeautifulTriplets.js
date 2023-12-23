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
 * Complete the 'beautifulTriplets' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER d
 *  2. INTEGER_ARRAY arr
 */

function beautifulTriplets(d, arr) {
    let count = 0;
    for(let i = 0; i < arr.length - 2; i++){
        for(let j = i + 1; j < arr.length - 1; j++){
            if(arr[j] - arr[i] === d){
                for(let k = j + 1; k < arr.length; k++){
                    if(arr[k] - arr[j] === d){
                        count = count + 1;
                    }
                }
            }
        }
    }
    return count;

}

//hastable
function beautifulTriplets(d, arr) {
    let count = 0;
    const numCount = new Map();

    // Populate the hashtable with the occurrences of each element
    for (const num of arr) {
        numCount.set(num, (numCount.get(num) || 0) + 1);
    }

    // Iterate through the array to find beautiful triplets
    for (const num of arr) {
        const secondNum = num + d;
        const thirdNum = secondNum + d;

        if (numCount.has(secondNum) && numCount.has(thirdNum)) {
            count += numCount.get(secondNum) * numCount.get(thirdNum);
        }
    }

    return count;
}

//hashtable
function minimumDistances(arr) {
    let minDistance = Infinity;
    const lastSeen = new Map();

    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];

        if (lastSeen.has(num)) {
            const distance = i - lastSeen.get(num);
            minDistance = Math.min(minDistance, distance);
        }

        lastSeen.set(num, i);
    }

    return minDistance === Infinity ? -1 : minDistance;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const d = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = beautifulTriplets(d, arr);

    ws.write(result + '\n');

    ws.end();
}
