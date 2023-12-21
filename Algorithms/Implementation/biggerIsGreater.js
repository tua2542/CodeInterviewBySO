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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w) {
    const arr = w.split('');
    let i = arr.length - 2;
    
    // Find the first character that is smaller than the character to its right
    while(i >= 0 && arr[i] >= arr[i + 1]){
        i = i - 1;
    }
    
    // If there is no such character, the string is the last permutation
    if(i === -1){
        return 'no answer';
    }
    
    // Find the smallest character to the right of i and larger than arr[i]
    let j = arr.length - 1;
    while(arr[j] <= arr[i]){
        j = j - 1;
    }
    
    [arr[i], arr[j]] = [arr[j], arr[i]];
    
    const reversed = arr.splice(i + 1).reverse();
    arr.push(...reversed);
    
    return arr.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
