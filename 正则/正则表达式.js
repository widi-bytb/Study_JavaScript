/*语法：var 变量 = new RegEXP("正则表达式","匹配模式");
 * var 变量= /正则表达式/匹配模式
 *[]和|是或的关系;a|b==[ab];[a-z]任意的小写的字母;
 [0-9]任意数字
 *[^ ]除了
 *
 */
//检查一个字符串中是否含有abc或adc或aec
reg = /a[bde]c/
var reg = /a|b/i; //var reg=/[ab]/i
//var reg = new RegExp("a", "i");
console.log(typeof reg);
var str = "a";
var result = reg.test(str);
console.log(result);
console.log(reg.test("c"));