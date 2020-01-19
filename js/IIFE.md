# IIFE

`IIFE:Immediately Invoked Function Expression(声明即执行的函数表达式，也就是声明函数的同时立即调用这个函数)`

因为es5中只有全局作用域和函数作用域，木有块级作用域，为了弥补没有块级作用域的缺陷，而只有function才可以将作用域隔离出来，所以出现了IIFE，将变量和函数封装到function中。

作用是：避免与全局作用域内的其他变量命名冲突，或者污染全局命名空间。

```javascript
// 写法一：括号放进去，且包裹的是匿名函数
(function(){
    
}());
// 写法二：括号在外面，且包裹的是匿名函数
(function(){
    
})(); // 更常见
// 写法三：将IIFE的结果保存到变量中，且包裹的是匿名函数
var res = (function (){
	return {
		a:'b'
	}
})()
console.log(res)// { a: 'b' }
// 写法四：包裹箭头函数，且括号在外面！
(() => {
    
})()
// 写法五：包裹普通函数，且传递参数，此时括号在外面！
(function hh(params){
   console.log(params)
})("haha")
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



## IIFE的作用域访问的问题

### 匿名函数内部变量未使用关键字1

```javascript
var b = 10;
(function b(){
	debugger
    b = 20;// 虽然这里定义b = 20，但是没有使用关键字，认为还是全局变量b，但是函数提升比变量提升早，所以还是函数b
    console.log(b); // function b
})();
```

### 匿名函数内部变量未使用关键字2

```javascript
var b = 10;
(function a(){
    b = 20;// 无函数提升覆盖，所以还是变量b，当前作用域中给他赋值了，成20
    console.log(b); // 20
})();
```

### 匿名函数内部变量使用关键字

```javascript
var b = 10;
(function b(){
    var b = 20;// 先沿着局部作用域找，如果没有再去全局作用域，当前有，则直接用20
    console.log(b); // 20
})();
```

### 各种题目

- ```javascript
  var obj1 = (function(){
     var inner = '1-1';
     return {
     	inner:'1-2',
     	say:function(){
     		console.log(obj1) // return后的对象{inner:'1-2',say:[function]}
     		console.log(this.inner) // '1-2'
     	}
     }
  })();
  obj1.say();
  ```

- 