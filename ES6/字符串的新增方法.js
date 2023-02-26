// String.raw()该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。
// let result = String.raw`Hi\n${2+2}!`
// let result =  String.raw`Hi\\n${5+2}!`
// console.log(result)




// repeat() 返回一个新的字符串，标识将原来字符串重复n次
// console.log('x'.repeat(3))
// 如果repeat的参数是负数或者Infinity，会报错。
// 'na'.repeat(Infinity)
// 'na'.repeat(-1)
// 参数NaN等同于0
// console.log('na'.repeat(NaN))


// padStart() , padEnd() 如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
// 一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
// console.log('x'.padStart(5,'ab'))
// console.log('x'.padStart(4,'ab'))

// console.log('x'.padEnd(5,'ab'))
// console.log('x'.padEnd(4,'ab'))

// 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
// 'xxxx'.padStart(4,'ab')
// 'xxxx'.padEnd(4,'ab')

// padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
// console.log('1'.padStart(10,'0'))
// console.log('12'.padStart(10,'0'))

// 另一个用途是提示字符串格式。
// console.log('12'.padStart(10,'YYYY-MM-DD'))
// console.log('09-12'.padStart(10,'YYYY-MM-DD'))



// trimStart() trimEnd() trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。
const s = '  abc  '

// console.log(s.trim())
// console.log(s.trimStart())
// console.log(s.trimEnd())



// replaceAll() 历史上，字符串的实例方法replace()只能替换第一个匹配。 
// 它的用法与replace()相同，返回一个新字符串，不会改变原字符串。
// console.log('aabbcc'.replace('b','_'))
// console.log('aabbcc'.replaceAll('b','_'))

String.prototype.replaceAll(searchValue, replacement)
// 上面代码中，searchValue是搜索模式，可以是一个字符串，也可以是一个全局的正则表达式（带有g修饰符）。

// 如果searchValue是一个不带有g修饰符的正则表达式，replaceAll()会报错。这一点跟replace()不同。
// 不报错
'aabbcc'.replace(/b/,'_')
// 报错
'aabbcc'.replaceAll(/b/,'_')

// replaceAll()的第二个参数replacement是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。

// $&：匹配的字符串。
// $` ：匹配结果前面的文本。
// $'：匹配结果后面的文本。
// $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
// $$：指代美元符号$。

// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'



// at() 方法接受一个整数作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。
const str = 'hello';
str.at(1) // "e"
str.at(-1) // "o"