# IIFE的作用域访问问题

## 匿名函数内部变量未使用关键字1

```javascript
var b = 10;
(function b(){
	debugger
    b = 20;// 虽然这里定义b = 20，但是没有使用关键字，认为还是全局变量b，但是函数提升比变量提升早，所以还是函数b
    console.log(b); // function b
})();
```

## 匿名函数内部变量未使用关键字2

```javascript
var b = 10;
(function a(){
    b = 20;// 无函数提升覆盖，所以还是变量b，当前作用域中给他赋值了，成20
    console.log(b); // 20
})();
```

## 匿名函数内部变量使用关键字

```javascript
var b = 10;
(function b(){
    var b = 20;// 先沿着局部作用域找，如果没有再去全局作用域，当前有，则直接用20
    console.log(b); // 20
})();
```



## 各种题目

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