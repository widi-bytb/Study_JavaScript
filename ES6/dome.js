 var fs = require('fs');
 var co = require('co');
 var thunkify = require('thunkify');
 var readFile = thunkify(fs.readFile);

 var gen = function* () {
    var f1 = yield readFile('D:/readFile/a.txt');
    var f2 = yield readFile('D:/readFile/b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
  };

co(gen)