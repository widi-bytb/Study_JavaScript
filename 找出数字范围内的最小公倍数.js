function smallestCommons(arr) {
    // 设置
    const [min, max] = arr.sort((a, b) => a - b);
    const numberDivisors = max - min + 1;//计算有多少项
    // SCM的最大可能值
    let upperBound = 1;
    for (let i = min; i <= max; i++) {
      upperBound *= i;//上限
    }
    // 测试所有倍数'max'
    for (let multiple = max; multiple <= upperBound; multiple += max) {
      // 检查范围中的每个值是否划分“multiple”
      let divisorCount = 0;
      for (let i = min; i <= max; i++) {
        // 计数除数
        if (multiple % i === 0) {
          divisorCount++;
        }
      }
      if (divisorCount === numberDivisors) {
        return multiple;
      }
    }
  }
  
 console.log(smallestCommons([1, 5]));
//************************************************************************************************
//  ES6 
function smallestCommons(arr) {
    // 设置
    const [min, max] = arr.sort((a, b) => a - b);
    const range = Array(max - min + 1)
      .fill(0)
      .map((_, i) => i + min);
    // SCM的最大可能值
    const upperBound = range.reduce((prod, curr) => prod * curr);
    // 测试“ max”的所有倍数
    for (let multiple = max; multiple <= upperBound; multiple += max) {
      // 检查范围中的每个值是否划分“多个”
      const divisible = range.every((value) => multiple % value === 0);
      if (divisible) {
        return multiple;
      }
    }
  }
  
  smallestCommons([1, 5]);


  

//************************************************************************************************ */
function smallestCommons(arr) {
  // Setup
  const [min, max] = arr.sort((a, b) => a - b);
  const range = Array(max - min + 1)
    .fill(0)
    .map((_, i) => i + min);
  // GCD of two numbers
  // https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclid's_algorithm
  const gcd = (a, b) => (b === 0) ? a : gcd(b, a % b);
  // LCM of two numbers
  // https://en.wikipedia.org/wiki/Least_common_multiple#Using_the_greatest_common_divisor
  const lcm = (a, b) => a * b / gcd(a, b);
  // LCM of multiple numbers
  // https://en.wikipedia.org/wiki/Least_common_multiple#Other
  return range.reduce((multiple, curr) => lcm(multiple, curr));
}

smallestCommons([1, 5]);

// 该解决方案使用维基百科的最大公约数和最小公倍数的公式和算法来紧凑快速地计算最小公倍数。


//*****************************************************************/
// 找到一系列数字的SCM
function smallestCommons(arr) {
  let primeFactors = {};
  const [min, max] = arr.sort((a, b) => a - b);
  for (let i = min; i <= max; i++) {
    // 分解范围的数字
    let primes = getPrimeFactors(i);
    for (let j in primes) {
      // 添加因子以设置或更新出现数量
      if (!primeFactors[j] || primes[j] > primeFactors[j]) {
        primeFactors[j] = primes[j]
      }
    }
  }
  // 通过分解构建SCM
  let multiple = 1;
  for (let i in primeFactors) {
    multiple *= i ** primeFactors[i]
  }
  return multiple;
}

// 计算数字的主要因素
function getPrimeFactors(num) {
  const factors = {};
  for (let prime = 2; prime <= num; prime++) {
    // 因子的计数发生
    // 请注意，复合值不会划分
    while ((num % prime) === 0) {
      factors[prime] = (factors[prime]) ? factors[prime] + 1 : 1;
      num /= prime;
    }
  }
  return factors;
}

smallestCommons([1, 5]);

// 此解决方案使用范围内数字的素数分解来计算最小公倍数.一般来说，解决方案3的速度要快得多，但是对于一个非常大的范围或非常大的值，有时解决方案3可能会在某些浏览器中触发递归限制。
