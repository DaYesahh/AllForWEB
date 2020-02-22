# let和const命令

## 其它小笔记

- for循环设置变量的部分是父作用域，而循环体内部是一个单独的子作用域。

  ```javascript
  for(let i = 0; i < 3; i++){
      let i = 'abc'; // 这里用let和相同变量名验证，以为let只在当前作用域有效。
      console.log(i)
  }
  // 输出结果为三个abc
  ```


## let特点

- 不存在变量提升，而var存在。
- 暂时性死区：只要块级作用域内存在let命令，它所声明的变量就绑定这个区域，不再受外部的影响，意味着在这个块级作用域内，如果变量未声明，就不可用。
- 不允许在相同作用域内重复声明。

```javascript
var tmp = new Date();
 
function f(){
    console.log(tmp);
    if(false) {
        var tmp = 'hello wolrd';
    }
}
f(); // undefined，如果没有声明tmp，则是报错
// 上述f()中存在变量提升，应该是如下：

function f(){
    var tmp; // 只声明但未定义
    console.log(tmp);
    if(false) {
        tmp = "hello world";
    }
}
// 所以真实情况是，局部变量tmp覆盖了全局变量tmp，输出为undefined
```

## const特点

- 声明即定义，定义即固定，不可后续改变。
- 块级作用域内有效
- 无变量提升，暂时性死区
- 当const定义的变量是引用类型的时候，而引用类型存储是存储的指针，而不是地址，所以const存储的是指针而不是地址上保存的数据。所以不可改变指针，但可改变该数据。即如下：

```javascript
const foo = {}
// 为foo添加一个属性，可以成功
foo.prop = 123;
// 但是如果将foo指向另一个对象，就会报错
foo = {}; //TypeError:"foo" is read-only
```



- 

## 块级作用域

- 块级作用域嵌套时，内外的同名变量不受影响。

```javascript
function f1(){
    let n = 5;
    if(true) {
        let n = 10;
    }
    console.log(n); // 5，内块的变量，没有影响外块的变量。
}
```

- 块级作用域间可以任意嵌套，且相互不影响。

```javascript
{{{
    { let insane = 'Hello world' }
    console.log(insane); // 报错，因为insane在别的块级作用域。
}}}
```

- 块级作用域的出现，使广泛应用的**立即执行函数表达式(IIFE)**不再必要

