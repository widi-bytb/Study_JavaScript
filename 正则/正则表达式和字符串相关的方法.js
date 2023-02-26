var str = "1a2b3c4d5e6f"
    /**
     * split()
     * -将字符串拆分成一个数组
     * -可以传递正则表达式作为参数
     * -这个方法即使不指定全局匹配模式，也会全都拆分
     */
    //var result = str.split(/[a-z]/);

/**
 * search()
 * -可以搜索字符串中是否含有指定内容
 * -search()只会查找第一个，即使设置全局
 * 
 */
str = "abc hollo abc aec";
//result = str.search("a[be]c")
/**
 * match()
 * -可以根据正则表达式，从一个字符串中将符合条件的内容提前出来
 * 默认情况下match()只会找到第一个符合要求的的内容，找到之后就停止检索
 * 我们可以设置正则表达式为全局匹配模式，这样就会匹配到所有的内容
 *可以为一个个正则表达式设置多个匹配模式，且顺序无所谓
 *-match()会将匹配到的内容封装到一个数组中返回，即使只查询到一个结果
 */
str = "1a2b3c4d5e6fABC";
result = str.match(/[a-z]/gi);
//console.log(result[0]);
/**
 * replace()
 * -可以将字符串中的指定内容替换为新的内容      
 * -参数
 * 1，被替换的内容，可以接受一个正则表达式作为参数
 * 2，新的内容
 * -默认只会替换第一个
 */
result = str.replace(/[a-z]/ig, "");
console.log(result);