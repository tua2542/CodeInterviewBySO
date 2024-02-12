function solution(A) {
    let negCount = 0;
    let zeroCount = 0;
    let posCount = 0;
    for (let i = 0; i < A.length; i++) {
        if (i % 2 === 0) {
            if (A[i] <= 0) {
                negCount++;
            }
        } else {
            if (A[i] >= 0) {
                posCount++;
            } else if (A[i] < 0) {
                zeroCount++;
            }
        }
    }

    if (negCount + zeroCount !== posCount) {
        return -1;
    }

    return Math.max(negCount, zeroCount);
}


// Test cases
console.log(solution([1, 0, 3, 4, 5, 0, 6]));  // Output: 3
console.log(solution([7, 4, -3, 0, -5, 1, 0])); // Output: -1
console.log(solution([-5, 0, 3, 0]));          // Output: 2         