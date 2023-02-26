// Class继承


// [*]1.简介
// Class可以通过extends关键字实现继承，让子类继承父类的属性和方法。extends的写法比ES5的原型链继承，要清晰和方便很多
{
    class Point {
    }

    class ColorPoint extends Point {
    }
}
// 上面示例中，Point是父类，ColorPoint是子类，他通过extends关键字，继承了Point类的所有属性和方法。但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类

// 下面，我们在ColorPoint内部加上代码
{
    class Point { }

    class ColorPoint extends Point {
        constructor(x, y, color) {
            super(x, y);  // 调用父类的constructor(x,y)
            this.color = color;
        }

        toString() {
            return this.color + ' ' + super.toString(); // 调用父类的toString()
        }
    }
}
// 上面实例中，constructor()方法和toString()方法内部，都出现了super关键字。super在这里表示父类的构造函数，用来新建一个父类的实例对象。

// ES6规定，子类必须在constructor()方法中调用super()，否则就会报错，这时因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用super()方法，子类就得不到自己的this对象。
{
    class Point { }

    class ColorPoint extends Point {
        constructor() {

        }
    }

    // let cp = new ColorPoint(); // ReferenceError
}
// 上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super()，导致新建实例时报错

// 为什么子类的构造函数，一定要调用super()？原因就在于 ES6 的继承机制，与 ES5 完全不同。ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。
// ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用super()方法，因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类。

// 注意，这意味着新建子类实例时，父类的构造函数必定会先运行一次
{
    class Foo {
        constructor() {
            // console.log(1);
        }
    }

    class Bar extends Foo {
        constructor() {
            super();
            // console.log(2)
        }
    }

    const bar = new Bar();
}
// 上面实例中，子类Bar新建实例时，会输出1和2。原因就是子类构造函数调用super()时，会执行一次父类构造函数

// 另一需要注意的地方是，在子类的构造函数中，只有调用super()之后，才可以使用this关键字，否则会报错。这时因为子类实例的构建，必须先完成父类的继承，只有super()方法才能让子类实例继承父类
{
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class ColorPoint extends Point {
        constructor(x, y, color) {
            // this.color = color; // ReferenceError
            super(x, y);
            this.color = color; // 正确
        }
    }

    const bar = new ColorPoint();
}
// 上面代码中，子类的constructor()方法没有调用super()之前，就使用this关键字，结果报错，而放在super()之后就是正确的

// 如果子类没有定义constructor()方法，这个方法会默认添加，并且里面会调用super()，也就是说，不管有没有显式定义，任何一个子类都有constructor()方法
{

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    class ColorPoint extends Point {

    }

    // 等同于
    class ColorPoint1 extends Point {
        constructor(...args) {
            super(...args);
        }
    }

    // 有了子类的定义，就可以生成子类的实例了

    let cp = new ColorPoint(25, 8, 'green');

    cp instanceof ColorPoint // true
    cp instanceof Point  // true
}
// 上面实例中，实例对象cp同时是ColorPoint和Point两个类的实例，这与ES5的行为完全一致

// 除了私有属性，父类的所有属性和方法，都会被子类继承，其中包括静态方法
{
    class A {
        static hello() {
            console.log('hello world');
        }
    }

    class B extends A {

    }
    // B.hello()
}
// 上面代码中，hello是A类的静态方法，B继承A，也绩承了A的静态方法。

// 子类无法继承父类的私有属性，或者说，私有属性只能定义它的class里面使用
{
    class Foo {
        #p = 1;
        #m() {
            console.log('hello');
        }
    }

    class Bar extends Foo {
        constructor() {
            super();
            // console.log(this.#p); // 报错
            // this.#m(); // 报错
        }
    }
}
// 上面示例中，子类Bar调用父类Foo的私有属性或者私有方法，都会报错

// 如果父类定义了私有属性的读写方法，子类就可以通过这些方法，读写私有属性
{
    class Foo {
        #p = 1;
        getP() {
            return this.#p;
        }
    }

    class Bar extends Foo {
        constructor() {
            super();
            // console.log(this.getP()); // 1
        }
    }
    // const bar = new Bar();
}
// 上面示例中，getP()是父类用来读取私有属性的方法，通过该方法，子类就可以读到父类的私有属性



// [*]2.Object.getPrototypeOf():
// Object.getPrototypeOf()方法可以用从子类上获取父类。
{
    class Point { /*...*/ }

    class ColorPoint extends Point { /*...*/ }

    Object.getPrototypeOf(ColorPoint) === Point
    // true
}
// 因此，可以使用这个方法判断，一个类是否继承了另一个类



// 3.super关键字
// super这个关键字，即可以当做函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同

// 第一种情况，super作为函数调用时，代表父类的构造函数。ES6要求，子类的构造函数必须执行一次super函数
{
    class A { }

    class B extends A {
        constructor() {
            super();
        }
    }
}
// 上面代码中,子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则JavaScript引擎会报错

// 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)
{
    class A {
        constructor() {
            // console.log(new.target.name);
        }
    }
    class B extends A {
        constructor() {
            super();
        }
    }
    // new A() // A
    // new B() // B

}
// 上面代码中，new.target指向当前正在执行的函数。可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。也就是说，super()内部的this指向的是B。

// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错
{
    class A { }

    class B extends A {
        m() {
            // super(); // 报错
        }
    }
}
// 上面代码中，super()用在B类的m方法之中，就会造成语法错误

// 第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
{
    class A {
        p() {
            return 2;
        }
    }

    class B extends A {
        constructor() {
            super();
            // console.log(super.p()); // 2
        }
    }

    let b = new B();
}
// 上面代码中，子类B当中的super.p()，就是将super当作一个对象使用。这时，super在普通方法之中，指向A.prototype,所以super.p()就相当于A.prototype.p()

// 这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
{
    class A {
        constructor() {
            this.p = 2;
        }
    }

    class B extends A {
        get m() {
            return super.p;
        }
    }

    let b = new B();
    b.m // undefined
}
// 上面代码中，p是父类A实例的属性，super.p就引用不到它

// 如果属性定义在父类的原型对象上，super就可以取到
{
    class A { }
    A.prototype.x = 2;

    class B extends A {
        constructor() {
            super();
            // console.log(super.x) // 2
        }
    }

    let b = new B();
}
// 上面代码中属性x是定义在A.prototype上面的，所以super.x可以取到它的值。

// ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
{
    class A {
        constructor() {
            this.x = 1;
        }
        print() {
            // console.log(this.x);
        }
    }

    class B extends A {
        constructor() {
            super();
            this.x = 2;
        }
        m() {
            super.print();
        }
    }

    let b = new B();
    b.m() // 2
}
// 上面代码中，super.print()虽然调用的是A.prototype.print()，但是A.prototype.print()内部的this指向子类的B的实例，导致输出的是2，而不是1，也就说，实际上执行的是super.print.call(this)

// 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，复制的属性会变成子类实例的属性
{
    class A {
        constructor() {
            this.x = 1;
        }
    }


    class B extends A {
        constructor() {
            super();
            this.x = 2;
            super.x = 3;
            // console.log(super.x); // undefined
            // console.log(this.x); // 3
        }
    }

    let b = new B();
}
// 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3.而当读取super.x的时候，读的是A.prototype.x，所以返回undefined

// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
{

    class Parent {
        static myMethod(msg) {
            console.log('static', msg);
        }

        myMethod(msg) {
            console.log('instance', msg);
        }
    }

    class Child extends Parent {
        static myMethod(msg) {
            super.myMethod(msg);
        }

        myMethod(msg) {
            super.myMethod(msg);
        }
    }

    // Child.myMethod(1); // static 1

    var child = new Child();
    // child.myMethod(2); // instance 2
}
// 上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象

// 另外，在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
{
    class A {
        constructor() {
            this.x = 1;
        }
        static print() {
            console.log(this.x);
        }
    }

    class B extends A {
        constructor() {
            super();
            this.x = 2;
        }
        static m() {
            super.print();
        }
    }

    B.x = 3;
    // B.m() // 3
}
// 上面代码中,静态方法B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例

// 注意，使用super的时候，必须显式指定是作为函数，还是作为对象使用，否则会报错
{
    class A { }

    class B extends A {
        constructor() {
            super();
            // console.log(super); // 报错
        }
    }
}
// 上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。这时，如果能清晰地表明super的数据类型，就不会报错。
{
    class A { }

    class B extends A {
        constructor() {
            super();
            // console.log(super.valueOf() instanceof B); // true
        }
    }

    let b = new B();
}
// 上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例。

// 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字
{
    var obj = {
        toString() {
            return "MyObject: " + super.toString();
        }
    };

    obj.toString(); // MyObject: [object Object]
}



// [*]4.类的prototype属性和_proto_属性
// 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。

// （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。


{
    class A {
    }

    class B extends A {
    }

    B.__proto__ === A // true
    B.prototype.__proto__ === A.prototype // true
}
// 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性

// 这样的结果是因为，类的继承是按照下面的模式实现的
{
    class A {
    }

    class B {
    }

    // B 的实例继承 A 的实例
    Object.setPrototypeOf(B.prototype, A.prototype);

    // B 继承 A 的静态属性
    Object.setPrototypeOf(B, A);

    const b = new B();

    // 《对象的扩展》一章给出过Object.setPrototypeOf方法的实现。

    Object.setPrototypeOf = function (obj, proto) {
        obj.__proto__ = proto;
        return obj;
    }

    // 因此，就得到了上面的结果

    Object.setPrototypeOf(B.prototype, A.prototype);
    // 等同于
    B.prototype.__proto__ = A.prototype;

    Object.setPrototypeOf(B, A);
    // 等同于
    B.__proto__ = A;

    // 这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；
    // 作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。

    B.prototype = Object.create(A.prototype);
    // 等同于
    B.prototype.__proto__ = A.prototype;
}
// extends关键字后面可以跟很多种类型的值
{
    // class B extends A {
    // }
}
// 上面代码的A，只要是一个有prototype属性的函数，就能被B继承。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

// 下面，讨论两种情况，第一种，子类继承Object类
{
    class A extends Object {
    }

    A.__proto__ === Object // true
    A.prototype.__proto__ === Object.prototype // true
}
// 这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例

// 第二种情况，不存在任何继承
{
    class A {
    }

    A.__proto__ === Function.prototype // true
    A.prototype.__proto__ === Object.prototype // true
}
// 这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype
// 但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。



// 实例的__proto__属性
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

{
    class Point { };
    class ColorPoint extends Point { }

    var p1 = new Point(2, 3);
    var p2 = new ColorPoint(2, 3, 'red');

    p2.__proto__ === p1.__proto__ // false
    p2.__proto__.__proto__ === p1.__proto__ // true

    // 上面代码中，ColorPoint继承了Point，导致前者原型的原型是后者的原型

    // 因此，通过子类实例的__proto__._proto_属性可以修改父类实例的行为

    p2.__proto__.__proto__.printName = function () {
        console.log('Ha');
    };

    p1.printName() // "Ha"
}
// 上面代码在ColorPoint的实例p2上向Point类添加方法，结果影响到了Point的实例p1




// [*]5.原生构造函数的继承
// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有下面这些

// - Boolean()
// - Number()
// - String()
// - Array()
// - Date()
// - Function()
// - RegExp()
// - Error()
// - Object()

// 以前，这些原生构造函数时无法继承的,比如，不能自己定义一个Array的子类
{
    function MyArray() {
        Array.apply(this, arguments);
    }

    MyArray.prototype = Object.create(Array.prototype, {
        constructor: {
            value: MyArray,
            writable: true,
            configurable: true,
            enumerable: true
        }
    });
}
// 上面代码定义了一个继承Array的MyArray类，但是，这个类的行为与Array完全不一致
{
    var colors = new MyArray();
    colors[0] = "red";
    colors.length  // 0

    colors.length = 0;
    colors[0]  // "red"
}
// 之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。

// ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。

// 下面的例子中，我们想让一个普通对象继承Error对象。
{
    var e = {};

    Object.getOwnPropertyNames(Error.call(e))
    // [ 'stack' ]

    Object.getOwnPropertyNames(e)
    // []
}
// 上面代码中，我们想通过Error.call(e)这种写法，让普通对象e具有Error对象的实例属性。但是，Error.call()完全忽略传入的第一个参数，而是返回一个新对象，e本身没有任何变化。这证明了Error.call(e)这种写法，无法继承原生构造函数。

// ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。
{
    class MyArray extends Array {
        constructor(...args) {
            super(...args);
        }
    }

    var arr = new MyArray();
    arr[0] = 12;
    arr.length // 1

    arr.length = 0;
    arr[0] // undefined
}
// 上面代码定义了一个MyArray类，继承了Array构造函数，因此就可以从MyArray生成数组的实例。这意味着，ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的。

// 上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。
{
    class VersionedArray extends Array {
        constructor() {
            super();
            this.history = [[]];
        }
        commit() {
            this.history.push(this.slice());
        }
        revert() {
            this.splice(0, this.length, ...this.history[this.history.length - 1]);
        }
    }

    var x = new VersionedArray();

    x.push(1);
    x.push(2);
    x // [1, 2]
    x.history // [[]]

    x.commit();
    x.history // [[], [1, 2]]

    x.push(3);
    x // [1, 2, 3]
    x.history // [[], [1, 2]]

    x.revert();
    x // [1, 2]
}
// 上面代码中，VersionedArray会通过commit方法，将自己的当前状态生成一个版本快照，存入history属性。revert方法用来将数组重置为最新一次保存的版本。除此之外，VersionedArray依然是一个普通数组，所有原生的数组方法都可以在它上面调用。

// 下面是一个自定义Error子类的例子，可以用来定制报错时的行为。
{
    class ExtendableError extends Error {
        constructor(message) {
            super();
            this.message = message;
            this.stack = (new Error()).stack;
            this.name = this.constructor.name;
        }
    }

    class MyError extends ExtendableError {
        constructor(m) {
            super(m);
        }
    }

    var myerror = new MyError('ll');
    myerror.message // "ll"
    myerror instanceof Error // true
    myerror.name // "MyError"
    myerror.stack
    // Error
    //     at MyError.ExtendableError
    // 
}
// 注意，继承Object的子类，有一个行为差异
{
    class NewObj extends Object {
        constructor() {
            super(...arguments);
        }
    }
    var o = new NewObj({ attr: true });
    o.attr === true  // false
}

// 上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。



// [*]6.Mixin模式的实现
// Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。
{
    const a = {
        a: 'a'
    };
    const b = {
        b: 'b'
    };
    const c = { ...a, ...b }; // {a: 'a', b: 'b'}
}
// 上面代码中，c对象是a对象和b对象的合成，具有两者的接口

// 下面是一个跟完备的事项,将多个类的接口"混入"(min in )另一个类
{
    function mix(...mixins) {
        class Mix {
            constructor() {
                for (let mixin of mixins) {
                    copyProperties(this, new mixin()); // 拷贝实例属性
                }
            }
        }

        for (let mixin of mixins) {
            copyProperties(Mix, mixin); // 拷贝静态属性
            copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
        }

        return Mix;
    }

    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if (key !== 'constructor'
                && key !== 'prototype'
                && key !== 'name'
            ) {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, desc);
            }
        }
    }

    // 上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
    // class DistributedEdit extends mix(Lodgeable, Serializable) {
    //     // ...
    // }
}