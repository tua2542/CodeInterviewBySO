function PowerOfTwo(number) {
    let num = 1;
    for (let i = num; i <= number; i++) {
        if ((i & (i - 1) )=== 0) {
            console.log("POWER");
        } else {
            console.log(i);
        }
    }
}


let n = 20;

PowerOfTwo(n);

