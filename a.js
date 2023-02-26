function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
Person.prototype.toString = function() {
    return "Person[name=" + this.name + ",age=" + this.age + "]";
}
var per1 = new Person("孙悟空", 18);
var per2 = new Person("猪八戒", 28);
var per3 = new Person("红孩儿", 8);
var per4 = new Person("二郎神", 38);

var perArr = [per1, per2, per3, per4];

function gatAdult(arr) {
    var newArr = [];
    //遍历arr，获取arr中的Person对象
    for (var i = 0; i < arr.length; i++) {
        var p = arr[i];
        if (p.age >= 18) {
            newArr.push(p);
        };
    };
    //判断Person对象的age是否大于等于18
    //如果大于18，则将这个对象添加到newArr数组
    //将新的数组返回
    return newArr;
};
var result = gatAdult(perArr);
console.log(result);