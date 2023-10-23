// function isLovelyNumber(num) {
//     const digitCounts = new Map();

//     const numStr = num.toString();

//     for (const digit of numStr) {
//         if (digitCounts.has(digit)) {
//             digitCounts.set(digit, digitCounts.get(digit) + 1);
//         } else {
//             digitCounts.set(digit, 1);
//         }

//         if (digitCounts.get(digit) >= 3) {
//             return 'Not Lovely';
//         }
//     }

//     return 'Lovely';
// }

// // Test cases
// console.log(isLovelyNumber(0));     // Output: true
// console.log(isLovelyNumber(100));   // Output: true
// console.log(isLovelyNumber(1232));  // Output: true
// console.log(isLovelyNumber(9922));  // Output: true
// console.log(isLovelyNumber(1000));  // Output: false
// console.log(isLovelyNumber(33533)); // Output: false

function isLovelyNumber(n) {
    const binaryStr = n.toString(2);
    const onesCount = (binaryStr.match(/1/g) || []).length;
    const zerosCount = (binaryStr.match(/0/g) || []).length;

    if (onesCount === 2 && zerosCount === binaryStr.length - 2) {
        return parseInt('11', 2); // Return the repeating number in binary
    } else {
        return "Not Lovely";
    }
}

// Test cases
console.log(isLovelyNumber(2));   // Output: 2
console.log(isLovelyNumber(10));  // Output: 10
console.log(isLovelyNumber(21));  // Output: "Not Lovely"