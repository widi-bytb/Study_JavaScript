

// 如果传入的字符串是回文字符串，则返回 true。 否则返回 false

// 回文 palindrome，指在忽略标点符号、大小写和空格的前提下，正着读和反着读一模一样。

// 注意：检查回文时，你需要先去除所有非字母数字的字符（标点、空格和符号），并将所有字母都转换成大写或都转换成小写。

// 我们会传入具有不同格式的字符串，如 racecar、RaceCar 和 race CAR 等等。

// 我们也会传入一些包含特殊符号的字符串，例如 2A3*3a2、2A3 3a2、2_A3*3#A2。
function palindrome(str) {

    let arr = str.match(/[0-9a-z]/gi).map(item => item.toLowerCase());//取出

    let middleIndex = Math.ceil((arr.length - 1) / 2);

    for (let i = 0; i < middleIndex; i++) {
        if (arr[i] != arr[arr.length - 1 - i]) {
            return false;
        }
    }

    return true;
}
let result = palindrome("eye");
console.log(result);