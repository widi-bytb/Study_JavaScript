// 凯撒密码（ Caesar cipher）是最简单且最广为人知的密码（ciphers），也被称为移位密码（shift cipher）。 在移位密码中，明文中的字母通过按照一个固定数目进行偏移后被替换成新的字母。

// ROT13 是一个被广泛使用的加密技术，明文中的所有字母都被移动 13 位。 也就是， A ↔ N，B ↔ O 等等。

// 编写一个函数，它将 ROT13 编码的字符串作为输入并返回解码字符串。

// 所有解码后的字母都必须为字母大写。 请不要解码非字母的字符（例如，空格、标点符号），但你需要在结果中保留它们。

function rot13(str) { // LBH QVQ VG!

    var myCipher = [];
    var myArray = [];

    for (i = 0; i < str.length; i++) {
        // 转换字符 - 或者如果是标点符号。 忽略空间。
        if (str.charCodeAt(i) > 64 && str.charCodeAt(i) < 78) {
            myArray.push(String.fromCharCode(str.charCodeAt(i) + 13));
        } else if (str.charCodeAt(i) > 77 && str.charCodeAt(i) < 91) {
            myArray.push(String.fromCharCode(77 - (90 - str.charCodeAt(i))));
        } else if (str.charCodeAt(i) > 32 && str.charCodeAt(i) < 65) {
            myArray.push(str.charAt(i));
        }

        // 遇到空间或到达字符串末端时，将单词推到数组

        if (str.charCodeAt(i) == 32) {
            myCipher.push(myArray.join(''));
            myArray.length = 0;
        }
         

        if (i == (str.length - 1)) {
            myCipher.push(myArray.join(''));
        }

    }

    return myCipher.join(" ");

}

// 将以下输入更改为测试
let result = rot13("SERR CVMMN!");
console.log(result);

// 第二种方法
function rot13(str) {
    let re = /[A-Z]/g;
    let re1 = /[A-M]/;
    return str.replace(re,((c)=>{
      return String.fromCharCode(c.charCodeAt() + (re1.test(c) ? 13 : -13));
    }));
  }
  
  rot13("SERR PBQR PNZC");