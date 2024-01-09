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
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
    let uniqueChars = [...new Set(s)];
    let maxLength = 0;

    for (let i = 0; i < uniqueChars.length; i++) {
        for (let j = i + 1; j < uniqueChars.length; j++) {
            let char1 = uniqueChars[i];
            let char2 = uniqueChars[j];
            
            let validString = s.split('').filter((char) => char === char1 || char === char2).join('');
            
            if(isAlternate(validString)){
                maxLength = Math.max(maxLength, validString.length);
            }
        }
    }
    
    return maxLength;
}
function isAlternate(s){
    for(let i = 1; i < s.length; i++){
        if(s[i] === s[i - 1]){
            return false;
        }
    }
    return true;
}


        function main() {
            const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

            const l = parseInt(readLine().trim(), 10);

            const s = readLine();

            const result = alternate(s);

            ws.write(result + '\n');

            ws.end();
        }
