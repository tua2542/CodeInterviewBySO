function NumToroman(num) {

    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = '';
    let arr = [];

    for(let i = 0; i < romanNumerals.length; i++){
        while(num >= romanNumerals[i].value){
            result = result + romanNumerals[i].numeral;
            num = num - romanNumerals[i].value;
            arr.push(result);
        }
    }

    return arr;

}


let number = 1850;

let roman = NumToroman(number);
console.log(roman);