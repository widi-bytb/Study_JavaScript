function destroyer(arr) {
  let newArr = [...arguments];
  let valsToRemove = newArr.slice(1)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < valsToRemove.length; j++) {
      if (arr[i] === valsToRemove[j]) {
        delete arr[i];
      }
    }
  }
  return arr.filter(item => item !== null); 
}

let result = destroyer([1, 2, 3, 1, 2, 3], 2, 3);
console.log(result);