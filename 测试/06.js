

// 在这道题目中，我们需要写一个字符串的搜索与替换函数，它的返回值为完成替换后的新字符串。

// 这个函数接收的第一个参数为待替换的句子。

// 第二个参数为句中需要被替换的单词。

// 第三个参数为替换后的单词。

// 注意： 在更换原始单词时保留原始单词中第一个字符的大小写。 即如果传入的第二个参数为 Book，第三个参数为 dog，那么替换后的结果应为 Dog

function myReplace(str, before, after) {
    return str
           .split(" ")
           .map((x) => (x == before)? 
                (x[0] == x[0].toUpperCase()) ?
                (after[0].toUpperCase() + after.slice(1)) : after.toLowerCase() 
                : x)
           .join(" ");
  
  }
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");

  function myReplace(str, before, after) {
    const strArr = str.split(" ");
    const [wordToReplace] = strArr.filter(item => item === before);
    const replacement = wordToReplace[0] === wordToReplace[0].toUpperCase()
      ? after[0].toUpperCase() + after.slice(1)
      : after[0].toLowerCase() + after.slice(1);
    return strArr.map(item => (item === before ? replacement : item)).join(" ");
  }
  
  // test:
  myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");