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
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function round(n) {
    // Smaller multiple 
    let a = parseInt(n / 5, 10) * 5;

    // Larger multiple 
    let b = a + 5;

    // Return of closest of two 
    return (n - a > b - n) ? b : a;
}

function gradingStudents(grades) {
    let result = [];
    for (let i = 0; i < grades.length; i++) {
        let newValue = Math.ceil(grades[i] / 5) * 5;
        if (newValue - grades[i] < 3 && grades[i] >= 38) {
            grades[i] = round(grades[i])
            result.push(grades[i]);
        } else {
            result.push(grades[i]);
        }
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const gradesCount = parseInt(readLine().trim(), 10);

    let grades = [];

    for (let i = 0; i < gradesCount; i++) {
        const gradesItem = parseInt(readLine().trim(), 10);
        grades.push(gradesItem);
    }

    const result = gradingStudents(grades);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
