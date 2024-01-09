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
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s, k) {
    if(k < 0){
        k = (k % 26) + 26;
    }
    
    let result = '';
    for(let i = 0; i < s.length; i++){
        let char = s[i];
        
        if(char.match(/[a-zA-Z]/)){
            let code = s.charCodeAt(i);
            
            if(char === char.toUpperCase()){
                char = String.fromCharCode(((code - 65 + k) % 26) + 65);
                
            } else {
                char = String.fromCharCode(((code - 97 + k) % 26) + 97);
            }
        }
        result = result + char;
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine();

    const k = parseInt(readLine().trim(), 10);

    const result = caesarCipher(s, k);

    ws.write(result + '\n');

    ws.end();
}
