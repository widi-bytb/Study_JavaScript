function telephoneCheck(str) {
    let re = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
     if(str.match(re) !== null){
       return true;
     }
     return false;
  
  }
  
  telephoneCheck("555-555-5555");

//   第二种方法
function phoneCheck(str) {
let rex1 = /^(1\s?)?\d{3}([-\s]?)\d{3}\2\d{4}$/,
    rex2 = /^(1\s?)?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/;

    if (rex1.test(str)) {
        return true;
    }
    else {
        return rex2.test(str) ? true : false
    }
}