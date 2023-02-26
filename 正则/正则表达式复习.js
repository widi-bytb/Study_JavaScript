/**
 * 量词
 * -通过量词可以设置一个内容出现的次数
 * 量词只对前边一个内容起作用
 * -{n}正好出现n次
 * -{m,n}出现m-n次
 * -{m,}出现m次以上
 * -+ 至少一个,相当于{1，}
 * -*0个或者多个，相当于{0，}
 * -？0个或者1个，相当于{0，1}
 */

/**
 * 检查一个字符串中的是否以a开头
 * ^表示开头，var reg = /^a/;
 * $表示结尾 var reg = /a$/;
//  * !如果在正则表达式中同时使用^$则要求字符串完全符合正则表达式；var reg = /^a$/==a
 */

/**
 * var reg = /a{3}b/       当量词出现在第一个内容的位置时表示找连续3次出现的a加b，也就是aaab，a出现的次数可以多
 * var reg = /ab{3}/       当量词出现在最后一个内容的位置时表示找b加连续出现3次的a，也就是baaa，a出现的次数可以多
 * var reg = /ab{3}c/      当量词出现在中间内容位置的时候表示找a加上连续3次出现的b加c，并且连续出现的a次数不能多,否则false
 * var reg = /{m,}/        不管位置，表示匹配出现m次以上的内容
 */
//var reg = /(ab){2}/;
var reg = /ab+c/;
//console.log(reg.test("aaaabbbcacccc"));

/**
 * 创建一个正则表达式，用来检测一个字符串是否是一个合法的手机号
 * 手机号规则：
 * 134567890123
 * 第一位以1开头
 * 第二位3-9任意数字
 * 第三位以后任意数字{9个} 
 */
var phoneStr = "13456789012";
var reg = /^1[3-9][0-9]{9}$/g;
var result = reg.test(phoneStr);
//console.log(result);
/**
 * 检查一个字符串中是否含有.
 * .表示任意字符
 * 在正则表达式中使用\转义字符
 * \.来表示.
 * \\表示\
 *!console.log(reg.test("\\"));
 *?注意：使用构造函数时，由于它的参数是一个字符串，而\是字符串中的转义字符，
 *?如果要使用\则需要使用\\代替
 *
 *去除开头的空格
 *!str = str.replace(/^s*$/,"");
 *去除结尾的空格
 *!str = str.replace(/\s*$/,"");
 *结合起来
 *!str = str.replace(/^s*|\s*$/g,"");
 *
 */
var reg = /\./;
console.log(reg.test("a.baaa"));