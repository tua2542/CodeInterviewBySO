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
 * Complete the 'acmTeam' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY topic as parameter.
 */

function acmTeam(topic) {
    const numberOfPeople = topic.length;

    let maxTopicsKnown = 0;
    let numberOfTeamsWithMaxTopics = 0;

    for (let i = 0; i < numberOfPeople - 1; i++) {
        for (let j = i + 1; j < numberOfPeople; j++) {
            const topicsKnown = countTopicsKnown(topic[i], topic[j]);

            if (topicsKnown > maxTopicsKnown) {
                maxTopicsKnown = topicsKnown;
                numberOfTeamsWithMaxTopics = 1;
            } else if (topicsKnown === maxTopicsKnown) {
                numberOfTeamsWithMaxTopics++;
            }
        }
    }

    return [maxTopicsKnown, numberOfTeamsWithMaxTopics];
}

function countTopicsKnown(person1, person2) {
    return [...person1].reduce((count, topic, index) => (topic === '1' || person2[index] === '1') ? count + 1 : count, 0);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let topic = [];

    for (let i = 0; i < n; i++) {
        const topicItem = readLine();
        topic.push(topicItem);
    }

    const result = acmTeam(topic);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
