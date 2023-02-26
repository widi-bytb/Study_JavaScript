/**
 * 电子邮件
 * hollo   .nihao@abc.com.cn
 * 任意字母数字下划线.任意字母下划线 @ 任意字母数字.任意字母（2-5）.任意字母（2-5）
 * \w{3,}    (\.\w+)*  @   [A-Za-z0-9]+  (\.[a-zA-Z]{2,5}){1,2}
 * 
 */
var emailReg = /^\w{3,}(\.\w+)*@[A-Za-z0-9]+(\.[a-zA-Z]{2,5}){1,2}$/;
var email = "abc@gamil.com.cn";
var resultEmail = emailReg.test(email);
console.log(resultEmail);