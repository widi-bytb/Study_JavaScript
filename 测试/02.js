// read() 提示输入两个值，并将其保存为对象属性，属性名分别为 a 和 b。
// sum() 返回保存的值的和。
// mul() 将保存的值相乘并返回计算结果。


let calculator = {
    // ……你的代码……
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    },
    read() {
        this.a = +prompt("a ?", 0);
        this.b = +prompt("b ?", 0);
    }


};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());