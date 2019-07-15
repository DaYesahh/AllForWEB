# js声明变量的方式及特点

```javascript
ES5有两种：var命令和function命令
ES6有四种：let const import class
```

## var

## function

## let

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
f(); // undefined
// 上述f()中存在变量提升，应该是如下：

function f(){
    var tmp; // 只声明但未定义
    console.log(tmp);
    if(false) {
        var tmp = "hello world";
    }
}
// 所以真实情况是，局部变量tmp覆盖了全局变量tmp，输出为undefined
```

## const

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

## import

## class

