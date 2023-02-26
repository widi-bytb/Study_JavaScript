// [x]Set
// 基本用法
// 它类似于数组,但是成员的值都是唯一的，没有重复的值。
// Set本身是一个构造函数，用来生成Set数据结构
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    // console.log(i) // 2,3,5,4
}
// 通过add()方法向Set结构加入成员，结构表明Set结构不会添加重复的值

// Set函数可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set] //1,2,3,4

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size //5 
// 向Set加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set内部判断两个值是否不同，使用的算法叫做
// “Same-value-zero equality”,它类似于精确相等运算符（===）,主要的区别是向Set加入值是认为NaN的等于自身，而精确相等运算符认为NaN不等于自身
let set2 = new Set();
let a = NaN;
let b = NaN;
set2.add(a);
set2.add(b);

// 向Set实例添加了两次NaN,但是只会加入一个。这表明，在Set内部，两个NaN是相等的，

let set3 = new Set();

set3.add({});
set3.size //1

set3.add({});
set3.size //2
// 由于两个空对象不相等，所以它，它们被视为两个值



// [x]Set实例的属性和方法
// Set结构的实例有以下属性
//  -Set.prototype.constructor：构造函数，默认就是Set函数。
//  -Set.prototype.size：返回Set实例的成员总数。

// Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。四个操作方法
// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。

// 下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。

// 对象的写法
// const properties = {
//   'width':1,
//   'height':1

// };

// if(properties[someName]){
//     // do something
// }

// Set的写法
// const properties1 = new Set();

// properties.add('width');
// properties.add('height');

// if(properties1[someName]){
//     //  do something

// }

// TODOArray.from方法可以将Set结构转换为数组
const items1 = new Set([1, 3, 4, 5, ]);
const array = Array.from(items1);
// 这就提供了去除数组重复成员的另一种方法
function dedupe(array) {
    return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3, 3])


// [x]遍历操作
// Set结构的实例有四个遍历方法，可以用于遍历成员

// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员

// 重点需要特别指出的是，Set的遍历顺序就是插入顺序，这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用的时候就能保证按照添加顺序调用。

let set1 = new Set(['red', 'green', 'blue']);

for (let item of set1.keys()) {
    // console.log(item)
    // red
    // green
    // blue
}

for (let item of set1.values()) {
    // console.log(item);
    // red
    // green
    // blue
}

for (let item of set1.entries()) {
    // console.log(item);
    // [ 'red', 'red' ]
    // [ 'green', 'green' ]
    // [ 'blue', 'blue' ]

}
// entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数值，它的两个成员完全相等。

// [*]Set结构的实例默认可遍历，它的默认遍历器生成函数就是他的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values //true

// 这意味着，可以省略values方法，直接用for...of循环遍历Set
let set4 = new Set(['red', 'green', 'blue']);

for (let x of set4) {
    // red
    // green
    // blue

}


// [*]forEach()
// Set结构的实例与数组一样，也要拥有forEach方法，用于对每个成员执行某个操作，没有返回值


// 遍历的应用
// 扩展运算符（...）内部使用for..of循环，所以也可以用于Set结构
let set5 = new Set(['red', 'green', 'blue']);
let arr = [...set5]
// console.log(arr)
// [ 'red', 'green', 'blue' ]

// [*]扩展运算符和Set结构相结合，就可以去除数组的重复成员
let arr1 = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr1)]
console.log(unique);
// [ 3, 5, 2 ]

// [*]而且，数组的map和filter方法也可以间接用于Set了
let set6 = new Set([1, 2, 3]);
set6 = new Set([...set6].map(x => x * 2));
// console.log(set6);
// Set(3) { 2, 4, 6 }

let set7 = new Set([1, 2, 3, 4, 5]);
set7 = new Set([...set7].filter(x => (x % 2) == 0));
// console.log(set7);
// Set(2) { 2, 4 }

// [x]因此使用Set可以很容易地实现并集,交集，差集，
let a1 = new Set([1, 2, 3]);
let b1 = new Set([4, 3, 2]);

// [*]并集
let union = new Set([...a1], [...b1]);
// console.log(union);
// Set(3) { 1, 2, 3 }

// [*]交集
let intersect = new Set([...a1].filter(x => b1.has(x)));
// console.log(intersect);
// Set(2) { 2, 3 }

// [*](a1相对于b1的)差集
let difference = new Set([...a1].filter(x => !b1.has(x)));
// console.log(difference);
// Set(1) { 1 }

// [*]如果想在遍历操作中，同步改变原来的结构，目前没有直接的方法，但有两种变通方法，一种是利用原Set结构映射出一个新的结构，然后
// 赋值给原来的Set结构；另一种是利用Array.from方法。
// 方法一

let set8 = new Set([1, 2, 3]);
set8 = new Set([...set8].map(val => val * 2));
// console.log(set8);
// Set(3) { 2, 4, 6 }

// 方法二
let set9 = new Set([1, 2, 3]);
set9 = new Set(Array.from(set9, val => val * 2));
// console.log(set9);
// Set(3) { 2, 4, 6 }
// 上面代码提供了两种方法，直接在遍历操作中改变原来的Set结构。


// WeakSet
// WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。首先，WeakSet的成员只能是对象，而不是其他类型的值。
const ws = new WeakSet();
// ws.add(1)   TypeError: Invalid value used in weak set
// ws.add(Symbol())   TypeError: Invalid value used in weak set

// 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
// 这是因为垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。
// 由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

// 语法
// WeakSet 是一个构造函数,可以使用new命令,创建WeakSet数据结构.
const ws1 = new WeakSet();
// 作为构造函数，WeakSet可以接受一个数组或类似数组的对象作为参数。（实际上任何具有Iterable接口的对象，都可以作为WeakSet的参数。）该数组的所有成员，都会自动成为WeakSet实例对象成员。
const a2 = [
    [1, 2],
    [3, 4]
];
const ws2 = new WeakSet(a2);
// WeakSet {[1, 2], [3, 4]}

// 上面代码中，a是一个数组，它有两个成员，也都是数组。将a作为WeakSet构造函数参数，a的成员会自动成为WeakSet的是成员。
// 注意，是a数组的成员成为WeakSet的成员，而不是a数组本身，这意味着，数组的成员只能是对象。

const b2 = [3, 4];
// const ws3 = new WeakSet(b2);  // Uncaught TypeError: Invalid value used in weak set(…)
// 上面代码中，数组a的成员不是对象，加入WeakSet就会报错。

// WeakSet结构有以下三个方法。

// -WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
// -WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
// -WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
// 下面是一个例子。
const ws3 = new WeakSet();
const obj = {};
const foo = {};

ws3.add(obj);

ws3.has(obj); //false 

// ws3.delete(window);

// WeakSet没有size属性，没有办法遍历它的成员。

// ws3.size // undefined
// ws3.forEach // undefined

// ws3.forEach(function(item){console.log(`WeakSet has ${item}`);});
//  TypeError: undefined is not a function

// 上面代码试图获取size和forEach属性，结果都不能成功，
// WeakSet不能遍历，是因为成员都是若引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处，是存储DOM节点，而不用担心这些节点从文档移除，会引发内存泄漏。

//***** 下面是另一个例子
const foos = new WeakSet();
class Foo {
    constructor() {
        foo.add(this)
    }
    method() {
        if (!foos.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用!')
        }
    }
}

// 上面代码中保证了foo的实例方法，只能在Foo的实例上调用。这里使用WeakSet的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。




// Map
// JavaScript的对象(Object)，本质上是键值对的集合（Hash结构），但是传统上只能用字符串当做键。这给它的使用带来了很大的限制。


const data = {};
// const element = document.getElementById('myDiv');

// data[element] = 'metadata';
// data['object HTMLDivElement']

// 上面代码原意是将一个DOM节点作为对象data的键，但是由于对象直接受字符串作为键名，所以element被自动转换为字符串[object HTMLDivElement]。

// 为了解决这个问题，ES6提供了Map数据结构，它类似于对象，也是键值对的集合，但是‘键’的范围不限于字符串，各种类型的值（包括对象）都可以当做键。也就是说，Object结构提供了‘字符串-值’的
// 对应，Map结构提供了‘值-值’的对应，是一种跟完善的Hash结构实现。如果你需要‘键值对’的数据结构，Map比Object更合适。

const m = new Map();
const o = {
    p: 'Hello World'
};

m.set(o, 'content')
m.get(o) // content

m.has(o) // true
m.delete(o) // true
m.has(o) // false

// 上面代码使用Map结构的set方法，将对象o当做m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。

// 上面的例子展示了如何向Map添加成员。作为构造函数，Map也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // '张三'
map.has('title') // true
map.get('title') // 'Author'

// 上面代码在新建Map实例时，就指定了两个键name和title.
// map构造函数接受数组作为参数，实际上执行的是下面的算法
const items2 = [
    ['name', '张三'],
    ['title', 'author']
];

const map1 = new Map();

items2.forEach(
    ([key, value]) => map1.set(key, value)
);

// 事实上，不仅仅是数组，任何具有Iterable接口，且每个成员都是一个双元素的数组的数据结构都可以当做Map构造函数的参数。
const set10 = new Set([
    ['foo', 1],
    ['bar', 2]
]);
const m1 = new Map(set10);
m1.get('foo') // 1

const m2 = new Map([
    ['baz', 3]
]);
const m3 = new Map(m2);
m3.get('baz') // 3
// 上面代码中，我们分别使用Set对象和Map对象，当作Map构造函数的参数，结果都生成了新的Map对象。
// 如果对同一个键多次赋值，后面的值将覆盖前面的值
const map2 = new Map();

map2
    .set(1, 'aaa')
    .set(1, 'bbb');

map2.get(1) // bbb
// 上面代码对键1连续赋值两次，后一次的值覆盖了前一次的值
// 如果读取一个未知的值，则返回一个undefined
new Map().get('asdfsdfas') //undefined

// 注意，只有对同一个对象的引用，Map结构才将其视为同一个键。这一点要非常小心。
const map3 = new Map();

map3.set(['a'], 555);
map3.get(['a']) // undefined

// 上面代码的set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址不一样的，因此get方法无法读取改键，返回undefined
// 同理，同样的值两个实例，在Map结构中被视为两个键
const map4 = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
    .set(k1, 111)
    .set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
// 上面代码中，变量k1和k2的值是一样的，但是它们在Map结构中被视为两个键。

// 由上可知，Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就是为两个键。这就解决了同名属性碰撞(clash)的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用
// 担心自己的属性与原作者的属性同名。

// 如果Map的键是一个简单类型的值（数字，字符串，布尔值），则只要两个值严格相等，Map将其视为一个键，
// 比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键，另外，undefined和null也是两个不同的键，虽然NaN不严格相等与自身，但Map将其视为同一个键。

let map5 = new Map();

map5.set(-0, 123);
map5.get(+0) // 123

map5.set(true, 1)
map5.set('true', 2)
map5.get(true) // 1

map5.set(undefined, 3)
map5.set(null, 4)
map5.get(undefined) // 3

map5.set(NaN, 123)
map5.get(NaN) // 123



// 实例的属性和操作方法
// Map结构的实例有以下属性和操作方法

// size属性
// size属性返回Map结构的成员总数
const map6 = new Map();
map6.set('foo', true);
map6.set('bar', false);

map6.size // 2

// Map.prototype.set(key, value)
// set方法设置键名key对应的键值位value，然后返回整个Map结构。如果可以已经有值，则键值会被更新，否则就会新生成改键。
const m4 = new Map();

m4.set('edition', 6) //键是字符串
m4.set(262, 'standard') //键是数值
m4.set(undefined, 'nah') //键是undefined

// Map.prototype.get(key)
// get方法读取key对应的是值，如果找不到key，返回undefined
const m5 = new Map();

const hello = function () {
    console.log('hello')
}
m5.set(hello, 'Hello ES6!') // 键是函数
// console.log(m5.get(hello));
m5.get(hello)

// Map.prototype.has(key)
// has方法返回一个布尔值，表示某个键是否在当前Map对象之中。
const m6 = new Map();

m6.set('edition', 6);
m6.set(262, 'standard');
m6.set(undefined, 'nah');

m6.has('edition') // true
m6.has('years') //false
m6.has(262) // true
m6.has(undefined) // true

// Map.prototype.delete(key)
// delete方法删除某个键，返回true，如果删除失败，返回false
const m7 = new Map();

m7.set(undefined, 'nah')
m7.has(undefined) // true

m7.delete(undefined)
m7.has(undefined) // false

// Map.prototype.clear()
// clear方法清除所有成员，没有返回值
let map7 = new Map();
map7.set('foo', true)
map7.set('bar', false)
map7.size // 2 
map7.clear()
map7.size // 0

// 遍历方法
// Map结构原生提供三个遍历器生成函数和一个遍历方法

// -Map.prototype.keys()：返回键名的遍历器。
// -Map.prototype.values()：返回键值的遍历器。
// -Map.prototype.entries()：返回所有成员的遍历器。
// -Map.prototype.forEach()：遍历 Map 的所有成员。

// 需要特别注意的是，Map的遍历顺序就是插入顺序。
const map8 = new Map([
    ['F', 'no'],
    ['T', 'yes']
]);

for (let key of map8.keys()) {
    // console.log(key);
    // 'F'
    // 'T'
}
for (let value of map8.values()) {
    // console.log(value)
    // 'no'
    // 'yes'
}
for (let item of map8.entries()) {
    // console.log(item)
    // [ 'F', 'no' ]
    // [ 'T', 'yes' ]
}
// 或者
for (let [key, value] of map8.entries()) {
    // console.log(key,value)
    // ‘F’ 'no'
    // 'T' 'yes'
}
// 等同于使用map.entries()
for (let [key, value] of map8) {
    // console.log(key, value)
    // 'F' 'no'
    // 'T' 'yes'
}
// 上面代码最后的那个例子，表示Map结构的默认遍历接口(Symbol.iterator)属性，就是entries方法，
map8[Symbol.iterator] === map8.entries // true

// Map结构转为数组结构，比较快速的方法是使用扩展运算符(...)
const map9 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

[...map9.keys()]; // ['1','2','3']

[...map9.values()]; //    ['one','two','three']

[...map9.entries()]; //    [ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

[...map9] //[ [ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ] ]

// 结合数组的map方法，filter方法，可以实现Map的遍历和过滤（Map本身没有map和filter方法）
const map10 = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');

const map11 = new Map(
    [...map10].filter(([k, v]) => k < 3)
);
// Map(2) { 1 => 'a', 2 => 'b' }

const map12 = new Map(
    [...map10].map(([k, v]) => [k * 2, '_' + v])
);
// Map(3) { 2 => '_a', 4 => '_b', 6 => '_c' }

// 此外，Map还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function (value, key, map) {
    // console.log("Key: %s, Value: %s", key, value)
})

// forEach方法还可以接受第二个参数，用来绑定this
const reporter = {
    report: function (key, value) {
        // console.log("Key: %s, Value: %s", key, value);
    }
};

map.forEach(function (value, key, map) {
    this.report(key, value);
}, reporter)
// 上面代码中，forEach方法的回调函数的this，就指向reporter

// 与其他数据结构的互相转换

// (1)Map转为数组

// 前面已经提过，Map转为数组的最方便的方法，就是使用扩展运算符(...)
const myMap = new Map()
    .set(true, 7)
    .set({
        foo: 3
    }, ['abc']);
[...myMap] // [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// (2)数组转为Map

// 将数组传入Map构造函数，就可以转为Map
new Map([
    [true, 7],
    [{
            foo: 3
        },
        ['abc']
    ]
]);
// Map(2) { true => 7, Object { foo: 3 } => [ 'abc' ] }

// (3) Map转为对象

// 如果所有的Map的键都是字符串，它可以无损地转为对象
function srtMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

const myMap1 = new Map()
    .set('yes', true)
    .set('no', false);
srtMapToObj(myMap1)
//[Object: null prototype] { yes: true, no: false }
// 如果非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名

// （4）对象转为Map

// 对象转为Map可以通过Object.entries()
let obj1 = {
    'a': 1,
    'b': 2
}
let map13 = new Map(Object.entries(obj1));
// Map(2) { 'a' => 1, 'b' => 2 }
// 此外，也可以自己实现一个转换函数，
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
objToStrMap({
    yes: true,
    no: false
})
// Map(2) { 'yes' => true, 'no' => false }

// (5)Map转为JSON

// Map转为JSON要区分两种情况。一种情况是，Map的键名都是字符串，这是可以选择转为对象JSON。
function strMapTOJson(strMap) {
    return JSON.stringify(srtMapToObj(strMap));
}

let myMap3 = new Map().set('yes', true).set('no', false);
strMapTOJson(myMap3);
// {"yes":true,"no":false}


// 另一种情况是，Map的键名有非字符串，这时可以选择转为数组JSON
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}
let myMap2 = new Map().set(true, 7).set({
    foo: 3
}, ['abc']);
mapToArrayJson(myMap2)
// '[[true,7],[{"foo":3},["abc"]]]'

// (6)JSON转为Map

// JSON转为Map，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes":true,"no":false}')
// Map(2) { 'yes' => true, 'no' => false }

// 但是，有一种特殊情况，整个JSON就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转换为Map。这往往是Map转为数组JSON的逆操作
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
// Map(2) { true => 7, { foo: 3 } => [ 'abc' ] }

// WeakMap
// WeakMap结构与Map结构类似，也是用于生成键值对的集合

// WeakMap可以使用set方法添加成员
const wm1 = new WeakMap();
const key = {
    foo: 1
};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k4 = [1, 2, 3];
const k5 = [4, 5, 6];
const wm2 = new WeakMap([
    [k4, 'foo'],
    [k5, 'bar']
]);
wm2.get(k5) // "bar"

// 重点：WeakMap与Map的区别有两点。

// 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
const map14 = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key

// 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

// 重点：WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
// const e1 = document.getElementById('foo');
// const e2 = document.getElementById('bar');
// const arr2 = [
//   [e1, 'foo 元素'],
//   [e2, 'bar 元素'],
// ];
// 上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
// 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
// arr2 [0] = null;
// arr2 [1] = null;
// 上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

// 重点：WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
// 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
const wm = new WeakMap();

// const element = document.getElementById('example');

// wm.set(element, 'some information');
// wm.get(element) // "some information"
// 上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。
// 也就是说，上面的 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。
// 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。

// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
const wm3 = new WeakMap();
let key2 = {};
let obj2 = {
    foo: 1
};

wm.set(key2, obj2);
obj2 = null;
wm3.get(key2)
// Object {foo: 1}
// 上面代码中，键值obj是正常引用。所以，即使在WeakMap外部消除了obj的引用，WeakMap内部引用依然存在

// WeakMap的语法
// 重点WeakMap与Map在API上的区别主要是两个，一是没有遍历操作（即没有keys(),values()和entries()方法），也没有size属性。因为没有办法列出所有键名某个键名是否存在完全不可预测，跟垃圾回收机制是否运行有关。
// 这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，、即不支持clear方法。因此，WeakSet只有四个方法可用：get(),set(),has(),delete()。
const wm4 = new WeakMap();

// size,forEach,clear方法都不存在
wm4.size //undefined
wm4.forEach //undefined
wm4.clear // undefined

// 难点WeakMap的示例

// 重点WeakMap的用途
// 前文说过，WeakMap应用的典型场合就是DOM节点作为键名。下面是一个例子

// let myWeakmap = new WeakMap();

// myWeakmap.set(
//   document.getElementById('logo'),
//   {timesClicked: 0})
// ;

// document.getElementById('logo').addEventListener('click', function() {
//   let logoData = myWeakmap.get(document.getElementById('logo'));
//   logoData.timesClicked++;
// }, false);
// 上面代码中，document.getElementById('logo')是一个DOM节点，每当发生click事件，就更新以下状态，
// 我们将这个状态作为键值放在WeakMap里，对应的键名就是这个节点对象。一旦这个DOM节点删除，该状态就会自动消失，不存在内存泄漏风险、

//重点 WeakMap的另一个用处是部署私有属性
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter ,action){
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
// 上面代码中，Countdown类的两个内部属性_counter和_action,是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。

//[x] WeakRef
// WeakSet和WeakMap是基于弱引用的数据结构，ES2021更进一步，提供了WeakRef对象，用于直接创建对象的弱引用，

let target = {};
let wr = new WeakRef(target);
// 上面示例中，target是原始对象，构造函数WeakRef()创建了一个基于target的新对象wr。这里，wr就是一个WeakRef的实例，属于对target的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr的引用不会妨碍原始对象target被垃圾回收机制清除，

// WeakRef实例对象有一个deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined
let target1 = {};
let wr1 = new WeakRef(target);

let obj3 = wr1.deref();
if(obj3){
    // target未被垃圾回收机制清除
}
// 上面示例中，deref()方法可以判断原始对象是否已被清除。

// 弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动消失
// function makeWeakCached(f) {
//     const cache = new Map();
//     return key => {
//       const ref = cache.get(key);
//       if (ref) {
//         const cached = ref.deref();
//         if (cached !== undefined) return cached;
//       }
  
//       const fresh = f(key);
//       cache.set(key, new WeakRef(fresh));
//       return fresh;
//     };
//   }
  
//   const getImageCached = makeWeakCached(getImage);

//  上面示例中，makeWeakCached()用于建立一个缓存，缓存里面保存对原始文件的弱引用。
// 注意，标准规定，一旦使用WeakRef()创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才被清除。