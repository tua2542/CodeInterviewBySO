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
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s) {
    const sanitizedString = s.replace(/\s/g, '');
    const length = sanitizedString.length;
    const c = Math.ceil(Math.sqrt(length));
    const result = [];
    for(let i = 0; i < c; i++){
        let substr = '';
        for(let j = i; j < length; j += c){
            substr = substr + s[j];
        }
        result.push(substr);
    }
    return result.join(' ');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = encryption(s);

    ws.write(result + '\n');

    ws.end();
}
