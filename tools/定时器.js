   // 尝试创建一个可以执行简单动画的函数
   // 参数：
   // obj :要执行动画的对象
   // attr:要执行动画的样式 比如：left top width height
   // target :执行动画目标的位置
   // speed: 移动的速度
   // callback:回调函数，这个函数将会在动画执行完毕以后执行
   function move(obj, attr, target, speed, callback) {
       // 关闭上一个定时器
       clearInterval(obj.timer);

       // 获取元素当前的位置
       var current = parseInt(getStyle(obj, attr));
       // 判断速度的正负值
       if (current > target) {
           // 速度为负值
           speed = -speed;
       }


       // 向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
       obj.timer = setInterval(function() {


           // 获取box1的原来的attr值
           var oldValue = parseInt(getStyle(obj, attr));

           // 在旧值的基础上减少 
           var newValue = oldValue + speed; +
           3
           // 判断newValue是否小于0
           // 向左移动时，需要判断newValue是否小于target
           // 向右移动时，需要判断newValue是否大于target
           if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
               newValue = target;
           }

           // 将我们的新指设置给box1
           obj.style[attr] = newValue + "px";



           // 当我们元素移动到0px时，停止动画
           if (newValue === target) {
               clearInterval(obj.timer);
               // 动画执行完毕，调用回调函数
               // 加个&&想转就转，并不会报错
               callback && callback();
           }
       }, 30);

   };



   // 定义一个函数，用来获取指定元素的当前样式
   // 参数：obj 要获取的样式的元素 name 要获取的样式名
   function getStyle(obj, name) {
       return getComputedStyle(obj, null)[name];
   };