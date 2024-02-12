function showListNumWithPow (n) {
    let num = 1;
    for (let i = num; i <= n; i++) {
        if(Number.isInteger(Math.sqrt(i))){
            console.log("POWER");
        } else {
            console.log(i);
        }
    }
}

showListNumWithPow(128);