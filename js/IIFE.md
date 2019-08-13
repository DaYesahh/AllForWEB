# IIFE

`IIFE:Immediately Invoked Function Expression(声明即执行的函数表达式，也就是声明函数的同时立即调用这个函数)`

因为es5中只有全局作用域和函数作用域，木有块级作用域，为了弥补没有块级作用域的缺陷，而只有function才可以将作用域隔离出来，所以出现了IIFE，将变量和函数封装到function中。

```javascript
// 写法一
(function(){
    
}());
// 写法二
(function(){
    
})(); // 更常见
```

- 特点

- + 匿名函数
  + 只执行一次
  + 可以带参数（可多个）

  ```javascript
  var a = 2;
  (function IIFE(global){ // 可以取名
      var a = 3;
      console.log(a)
      console.log(global,a)
  })(window)
  console.log(a) // 2
  ```


