// Symbol 表示独一无二的值。它属于 JavaScript 语言的数据类型之一

let s = Symbol();

typeof s
//"symbol"

// Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
let s1 = Symbol("foo");
let s2 = Symbol("bar");

s1 //Symbol(foo)
s2 //Symbol(bar)

s1.toString(); //"Symbol(foo)"
s2.toString(); //"Symbol(bar)"

// 如果Symbol的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个Symbol值。
const obj = {
    toString() {
        return 'abc'
    }
};
const sym = Symbol(obj);
sym //Symbol(abc)

// 注意，Symbol的函数的参数只是表示对当前Symbol值的描述,因此相同的参数Symbol函数的返回值是不一样的。
// 没有参数的情况
let sy1 = Symbol();
let sy2 = Symbol();

sy1 === sy2 //false

// 有参数的情况
let sy3 = Symbol('foo');
let sy4 = Symbol('foo');

sy3 === sy4 //false

// Symbol值不能与其他类型的值进行运算，会报错
// 但是，Symbol值可以显示转为字符串
// 另外，Symbol值也可以转为布尔值，但是不能转为数值。
let sym1 = Symbol();
Boolean(sym1) // true
    !sym // false

if (sym1) {
    // ...
}

//Number(sym1) // TypeError
//sym1 + 2 // TypeError




// 创建Symbol的时候，可以添加一个描述
const symb1 = Symbol('foo');
// symb的描述就是字符串foo
// 但是，读取这个描述需要将Symbol显式转为字符串
const symb2 = Symbol('foo');

String(symb2) //"Symbol(foo)"
symb2.toString(); //"Symbol(foo)"

// 上面的用法不是很方便。ES2019提供了一个实例对象description,直接返回Symbol的描述
const symb3 = Symbol('foo');

symb3.description //"foo"



//作为属性名的Symbol
// 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，
// 就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
let mySymbol = Symbol();

// 第一种写法
let a = {}
a[mySymbol] = 'Hello';

// 第二种写法
let a1 = {
    [mySymbol]: 'Hello'
};

// 第三种写法
let a2 = {};
Object.defineProperty(a, mySymbol, {
    value: 'Hello'
});

// 以上的写法都得到同样的结果，代码通过方括号结构和Object.defineProperty，将对象的属性名指定为一个 Symbol 值。
a[mySymbol] //"Hello"
// 但是注意，Symbol值作为对象属性名时，不能用点运算符
const mySymbol1 = Symbol();
const a3 = {};

a.mySymbol1 = 'Hello';
a[mySymbol1] //undefined
a['mySymbol1'] //"Hello"
// 上面代码中，因为点运算符后面总是字符串，所有不会读取mySymbol1作为标识名所指代的那个值，导致a3的属性名实际上是一个字符串
// 而不是一个Symbol值


// 同理，在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中
let s3 = Symbol();

// let obj1 = {
//   [s3]:function(arg){
//     // console.log(arg);
//   }
// };

// obj1[s3](123)
// 上面代码中，如果s3不放在方括号中，该属性的键名就是字符串s3，而不是s3所代表的那个 Symbol 值。

// 采用增强的对象写法，上面代码的obj1对象可以写得更简洁一些。
let obj1 = {
    [s3](arg) {

    }
};


// Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {};

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
// console.log(log.levels.DEBUG, 'debug message');
// console.log(log.levels.INFO, 'info message');
// 常量使用 Symbol 值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的switch语句会按设计的方式工作。
// 还有一点需要注意，Symbol 值作为属性名时，该属性还是公开属性，不是私有属性




// 属性名的遍历
// Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环
// 中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

// 但是，它也不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取
// 指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

const obj2 = {};
let a4 = Symbol('a')
let b4 = Symbol('b')

obj2[a4] = 'Hello';
obj2[b4] = "world";

const objectSymbols = Object.getOwnPropertySymbols(obj2);

objectSymbols //[ Symbol(a), Symbol(b) ]

// 另外一个新的API，Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和Symbol键名
let obj3 = {
    [Symbol('my_key')]: 1,
    enum: 2,
    noEnum: 3
};

Reflect.ownKeys(obj3) //[ 'enum', 'noEnum', Symbol(my_key) ]

// 由于以Symbol值作为键名，不会被常规方法遍历得到。我们可以利用这个特性。
// 为对象定义一些非私有的，但又希望只用于内部的方法
let size = Symbol('size');

class Collection {
    constructor() {
        this[size] = 0;
    }
    add(item) {
        this[this[size]] = item;
        this[size]++
    }

    static sizeOf(instance) {
        return instance[size];

    }
}

let x = new Collection();
Collection.sizeOf(x) //0

x.add('foo');
Collection.sizeOf(x) //1

Object.keys(x) //['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]


// Symbol.for(),Symbol.keyFor()

// 有时，我们希望重新使用同一个Symbol值，Symbol.for()方法可以做到这一点。
// 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值
// 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

let s4 = Symbol.for('foo');
let s5 = Symbol.for('foo');

s4 === s5 //true
//  s4和s5都是Symbol值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值

// Symbol.for()与Symbol()这两种写法，都会生成新的Symbol。它们的区别是，前者会登记在全局环境中供搜索，
// 后者不会。Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在,
// 如果不存在才会创建一个值。
// 比如，如果你调用Symbol.for('cat')30次，每次都会返回同一个Symbol值，但是调用Symbol('cat')30次，会返回30个不同的Symbol值。
Symbol.for('bar') === Symbol.for('bar') //true

Symbol('bar') === Symbol('bar') //false
// 上面的代码，由于Symbol('bar')写法没有登记机制，所以每次调用都会返回一个不同的值。


// Symbol.keyFor()方法返回一个已登记的Symbol类型的key.
let s6 = Symbol.for('foo');
Symbol.keyFor(s6) //"foo"

let s7 = Symbol('foo');
Symbol.keyFor(s7) // undefined

// 注意，Symbol.for()为Symbol值登记的名字，是全局环境的，不管有没有在全局环境运行。



// 内置的Symbol值
// 除了定义自己使用的Symbol值以外，ES6还提供了11个内置的Symbol值，指向语言内部使用的方法。

// Symbol.hasInstance
// 对象的Symbol.hasInstance 属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象实例时，会调用这个方法。

class Even {
    static[Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}

// 等同于
const Even1 = {
    [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
};

1 instanceof Even //false
2 instanceof Even1 //true
12345 instanceof Even //false


// Symbol.isConcatSpreadable
// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype()时，是否可以展开。
// let arr1 = ['c', 'd'];
// ['a', 'b'].concat(arr1, 'e') // ['a','b','c','d','e']
// arr1[Symbol.isConcatSpreadable] // undefined

// let arr2 = ['c', 'd'];
// arr2[Symbol.isConcatSpreadable] = false['a', 'b'].concat(arr2, 'e') // ['a','b',['c','d'],'e']
// 上面代码说明，数组的默认行为是可以展开的，Symbol.isConcatSpreadable默认等于undefined。该属性true时,也有展开的效果。
// 类似数组的对象正好相反，默认不展开。它的Symbol.isConcatSpreadable属性设为true,才可以展开

// let obj4 = {
//     length: 2,
//     0: 'c',
//     1: 'd'
// };

// ['a','b'].concat(obj4,'e') //['a','b',obj,'e']

// obj4[Symbol.isConcatSpreadable] = true;
// ['a','b'].concat(obj4, 'e')// ['a','b','c','d','e']


// Symbol.species 
// 对象的Symbol.species 属性,指向一个构造函数。创建衍生对象时，会使用该属性

class MyArray extends Array {
    static get[Symbol.species]() {
        return Array;
    }

}
const a5 = new MyArray(1, 2, 3);
const b = a5.map(x => x);
const c = a5.filter(x => x > 1);

b instanceof MyArray //true
c instanceof MyArray //true
// 上面的代码，子类MyArray继承了父类Array，a是MyArray的实例，b和c是a的衍生对象。
// 你可能会认为，b和c都是调用数组方法生成的，所以应该是数组（Array的实例），但实际上它们也是MyArray的实例
// Symbol.species属性就是为了解决这个问题而提供的。现在，我们可以为MyArray设置Symbol.species属性

// 总之，Symbol.species的作用在于，实例对象在运行过程中，需要再次调用自身的构造函数时，回调用该属性指定的构造函数。它主要的用途是，有些类库是在基类的基础上修改的，那么子类使用继承的方法时，作者可能希望返回基类的实例，而不是子类的实例


// Symbol.match
// 对象的Symbol.match 属性,指向一个函数。当执行str.match(myObject)时,如果该属性存在，会调用它，返回该方法的返回值。

// String.prototype.match(regexp)
// 等同于
// regexp[Symbol.match](this)

class MyMatcher {
    [Symbol.match](string) {
        return 'hello world'.indexOf(string);
    }
}

'e'.match(new MyMatcher()) //1


// Symbol.replace
// 对象的Symbol.replace 属性,指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。

// String.prototype.replace(searchValue, replaceValue)
//等同于
// searchValue[Symbol.replace](this, replaceValue)

const x1 = {};
x1[Symbol.replace] = (...s)=> console.log(s);

'Hello'.replace(x1,'world')//[ 'Hello', 'world' ]


// Symbol.search
// 对象的Symbol.search 属性,指向一个方法，当该对象被String.prototype方法调用时，会返回该方法的返回值
{
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
}
// Symbol.split
// 对象的Symbol.split属性，指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。

// String.prototype.split(separator, limit)
// // 等同于
// separator[Symbol.split](this, limit)
// 下面是一个例子。
{
class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
}
// 'foobar'
// 上面方法使用Symbol.split方法，重新定义了字符串对象的split方法的行为，

// Symbol.iterator
// 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
{
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
}
// 对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器，详细介绍参见《Iterator 和 for...of 循环》一章。
{
class Collection {
  *[Symbol.iterator]() {
    let i = 0;
    while(this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;

for(let value of myCollection) {
  console.log(value);
}
}
// 1
// 2
// Symbol.toPrimitive
// 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

// Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

// Number：该场合需要转成数值
// String：该场合需要转成字符串
// Default：该场合可以转成数值，也可以转成字符串
{
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
}