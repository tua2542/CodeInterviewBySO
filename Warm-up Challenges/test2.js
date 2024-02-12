function showListNumWithPow (n) {
    let num = 1;
    for (let i = num; i <= n; i++) {
        if((i & (i - 1)) === 0){
            console.log("POWER");
        } else {
            console.log(i);
        }
    }
}

showListNumWithPow(7);