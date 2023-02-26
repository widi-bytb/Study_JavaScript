

// 质数（prime number）是大于 1 且仅可以被 1 和自己整除的数。 比如，2 就是一个质数，因为它只可以被 1 和 2（它本身）整除。 相反，4 不是质数，因为它可以被 1, 2 和 4 整除。

// 请完成 sumPrimes 方法，使其返回小于等于传入参数数字的所有质数之和。

function sumPrimes(num) {
    // 辅助功能检查原始
    
    function isPrime(num) {
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i == 0)
          return false;//说明是偶数
      }
      return true;
    }
  
    // 检查所有数字的原则
    let sum = 0;
    for (let i = 2; i <= num; i++) {
      if (isPrime(i))
        sum += i;
    }
    return sum;
  }
console.log(sumPrimes(100));


//第二种方法
function sumPrimes(num) {
  // 素数筛
  let isPrime = Array(num + 1).fill(true);
  // 0和1不是素数
  isPrime[0] = false;
  isPrime[1] = false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (isPrime[i]) {
      // 我没有被标记为错误 - 这是PRIME
      for (let j = i * i; j <= num; j += i)
        isPrime[j] = false;
    }
  }

  // 总和所有仍然标记为prime的值
  return isPrime.reduce(
    (sum, prime, index) => prime ? sum + index : sum, 0
  );
}