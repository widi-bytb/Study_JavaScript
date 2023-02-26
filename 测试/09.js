function whatIsInAName(collection, source) {
    const arr = [];
    // 只修改这一行下面的代码
    const souceKeys = Object.keys(source);
    return collection.filter(obj => {
        for (let i = 0; i < souceKeys.length; i++) {
            if (!obj.hasOwnProperty(souceKeys[i]) || obj[souceKeys[i]] !== source[souceKeys[i]]) {
                return false;
            }
            //   return true;
        }
        return true;
    })

}

let result = whatIsInAName([{
    first: "Romeo",
    last: "Montague"
}, {
    first: "Mercutio",
    last: null
}, {
    first: "Tybalt",
    last: "Capulet"
}], {
    last: "Capulet"
});
console.log(result);