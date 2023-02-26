

// 把传入的数字转为罗马数字。

// 转换后的罗马数字字母必须都是大写。
function convertToRoman(num) {
    const map = new Map([['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]]);
    let result = '';
    for (let v of map) {
        const temp = parseInt(num/v[1],0);
        if (temp > 0) {
            for (let i = 0; i < temp; ++i) {
                result += v[0]
            }
        }
        num = num % v[1]
    }
    return result
}

let result = convertToRoman(36);
console.log(result);
