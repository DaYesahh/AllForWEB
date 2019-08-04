# Iterator

作用：

- 为各种数据结构，提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- `ES6` 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

遍历过程

- 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
- 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
- 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
- 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

## 默认`Iterator`接口

- 当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

- 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”`（iterable）`。
- 默认的 `Iterator` 接口部署在数据结构的`Symbol.iterator`属性，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”
- `Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数，执行这个函数，就会返回一个遍历器
- 至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 `Symbol `的特殊值，所以要放在方括号内
- 有的数据结构默认部署了`Iterator`属性，有的木

### 数组调用遍历器对象

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
// 变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器对象。
```

### 调用Iterator接口的场合

- **解构赋值**
- **扩展运算符**
- **yield\***

## 字符串的Iterator接口

```javascript
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

调用`Symbol.iterator`方法返回一个遍历器对象，在这个遍历器上可以调用 `next` 方法，实现对于字符串的遍历。

## 遍历器对象的`return()、throw()`

遍历器对象除了具有`next`方法，还可以具有`return`方法和`throw`方法。如果你自己写遍历器对象生成函数，那么`next`方法是必须部署的，`return`方法和`throw`方法是否部署是可选的。

`return`方法的使用场合是，如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法。

