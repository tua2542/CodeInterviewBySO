'use strict';

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
 * Complete the 'bonAppetit' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY bill
 *  2. INTEGER k
 *  3. INTEGER b
 */

function bonAppetit(bill, k, b) {
    let initialValue = 0;
    let sumOfBill = bill.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );
    let result = sumOfBill - bill[k];
    let actual = result / 2;
    let difference = b - actual;
    
    if(bill[k] && actual !== b){
        console.log(difference);
    } else {
        console.log("Bon Appetit");
    }
}
//Hashtable
function bonAppetit(bill, k, b) {
    const billHash = {};
    let sumOfBill = 0;

    for (let i = 0; i < bill.length; i++) {
        if (i !== k) {
            sumOfBill += bill[i];
            billHash[i] = bill[i];
        }
    }

    const actual = sumOfBill / 2;
    const difference = b - actual;

    if (bill[k] && actual !== b) {
        console.log(difference);
    } else {
        console.log("Bon Appetit");
    }
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const bill = readLine().replace(/\s+$/g, '').split(' ').map(billTemp => parseInt(billTemp, 10));

    const b = parseInt(readLine().trim(), 10);

    bonAppetit(bill, k, b);
}
