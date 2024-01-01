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
 * Complete the 'happyLadybugs' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING b as parameter.
 */

function containsEmpty(b) {
    return b.includes('_');
}

function modes(b) {
    const map = new Map();
    for (const char of b) {
        if (char !== '_' && !map.has(char)) {
            map.set(char, 1);
        } else if (char !== '_') {
            map.set(char, map.get(char) + 1);
        }
    }
    return Array.from(map.values());
}

function happyLadybugs(b) {
    const dexter = "YES";
    const charList = [];
    const mods = modes(b);

    if (mods.length === 0) {
        return dexter;
    }

    for (const count of mods) {
        if (count === 1) {
            return "NO";
        }
    }

    if (dexter === "YES" && !containsEmpty(b)) {
        for (let i = 1; i < b.length - 1; i++) {
            const a = b.charAt(i - 1);
            const g = b.charAt(i + 1);
            if (b.charAt(i) !== a && b.charAt(i) !== g) {
                return "NO";
            }
        }
    }

    return dexter;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine().trim(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(readLine().trim(), 10);

        const b = readLine();

        const result = happyLadybugs(b);

        ws.write(result + '\n');
    }

    ws.end();
}
