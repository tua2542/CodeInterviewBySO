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
 * Complete the 'timeInWords' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER h
 *  2. INTEGER m
 */

function timeInWords(h, m) {
    const words = {
        0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
        11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen'
    };
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

    const getWord = (num) => {
        if (num < 20) {
            return words[num];
        } else {
            const digit = num % 10;
            return tens[Math.floor(num / 10)] + (digit ? ' ' + words[digit] : '');
        }
    };


    if (m === 0) {
        return `${words[h]} o' clock`;
    } else if (m === 15) {
        // console.log(h + ":"+ m + " AM");
        return `quarter past ${words[h]}`;
    } else if (m === 30) {
        // console.log(h + ":"+ m + " AM");
        return `half past ${words[h]}`;
    } else if (m === 45) {
        // console.log(h + ":"+ m + " AM");
        return `quarter to ${words[h + 1]}`;
    } else if (m < 30) {
        // console.log(h + ":"+ m + " AM");
        return `${getWord(m)} minute${m === 1 ? '' : 's'} past ${words[h]}`;
    } else {
        // console.log(h + ":"+ m + " AM");
        return `${getWord(60 - m)} minute${m === 59 ? '' : 's'} to ${words[h + 1]}`;
    }
}

//refactored
function timeInWords(h, m) {
    const words = {
        0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
        11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
        20: 'twenty', 21: 'twenty-one', 22: 'twenty-two', 23: 'twenty-three'
    };

    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

    const getWord = (num) => (num < 20) ? words[num] : `${tens[Math.floor(num / 10)]}${num % 10 ? ' ' + words[num % 10] : ''}`;

    const timeToWords = (hour, minute) => {
        if (minute === 0) {
            return `${words[hour]} o' clock`;
        } else if (minute === 15) {
            return `quarter past ${words[hour]}`;
        } else if (minute === 30) {
            return `half past ${words[hour]}`;
        } else if (minute === 45) {
            return `quarter to ${words[hour + 1]}`;
        } else if (minute < 30) {
            return `${getWord(minute)} minute${minute === 1 ? '' : 's'} past ${words[hour]}`;
        } else {
            return `${getWord(60 - minute)} minute${minute === 59 ? '' : 's'} to ${words[hour + 1]}`;
        }
    };

    return timeToWords(h, m);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    const result = timeInWords(h, m);

    ws.write(result + '\n');

    ws.end();
}
