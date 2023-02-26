// 儿童黑话

// 儿童黑话也叫 Pig Latin，是一种英语语言游戏。 规则如下：

// - 如果单词以辅音开头，就把第一个辅音字母或第一组辅音簇移到单词的结尾，并在后面加上 ay。

// - 如果单词以元音开头，只需要在结尾加上 way。

// 请把传入的字符串根据上述规则翻译成儿童黑话并返回结果。 输入的字符串一定是一个小写的英文单词。
function translatePigLatin(str){
    let consonantRegex = /^[^aeiou]+/;
    let myConsonants =str.match(consonantRegex);
    return myConsonants !==null ? 
    str
    .replace(consonantRegex,"")
    .concat(myConsonants)
    .concat("ay")
    :str.concat("way");

}

console.log(translatePigLatin("consonant"));