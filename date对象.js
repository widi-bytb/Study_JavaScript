var d = new Date();
var d2 = new Date("12 / 03 / 2022");

//console.log(d2);
var start = Date.now();
for (var i = 0; i < 100; i++) {
    console.log(i);
}
var end = Date.now();
console.log(end - start);