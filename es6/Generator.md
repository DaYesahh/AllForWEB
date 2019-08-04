# Generator

- `Generator` 函数是一个状态机，封装了多个内部状态。

- 执行` Generator` 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

- `function`关键字与函数名之间有一个星号

- 函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

  ```javascript
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  // 两个表达式：yield return
  // 三个状态：hello，world 和 return 语句（结束执行）
  var hw = helloWorldGenerator();
  
  hw.next()
  // { value: 'hello', done: false }
  
  hw.next()
  // { value: 'world', done: false }
  
  hw.next()
  // { value: 'ending', done: true }
  
  hw.next()
  // { value: undefined, done: true }
  ```

- 调用 Generator 函数后，该函数并**不执行**

- 返回一个指向**内部状态的指针对象**

- 必须调用遍历器对象的`next`方法，使得指针移向下一个状态

- `Generator` 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

## `yield`表达式

遍历器对象的`next`方法的运行逻辑如下。

- 遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

- 下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

- 如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

- 如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。
- `yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。
- `yield`表达式如果用在`generator`函数的另一个表达式之中，必须放在圆括号里面。
- 本身没有返回值，或者说总是返回`undefiend`。`next`可以带一个返回值，该参数会被当做上一个`yield`表达式的返回值

## 延缓执行

```javascript
function* f() {
  console.log('执行了！')
}

var generator = f(); // 没有立即执行

setTimeout(function () {
  generator.next()
}, 2000);

```

## 与Iterator接口的关系

- 任何对象的`Symbol.Iterator`的方法，**等于**该对象的**遍历器生成函数**，调用该函数，会返回该对象的的一个**遍历器对象**

- `generator`函数就是一个遍历器生成函数，因此可以赋值给对象的`symbol.iterator`属性，从而使该对象具有`Iterator`接口。

  ```javascript
  var myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  
  [...myIterable] // [1, 2, 3]
  ```

- `generator`函数执行后会返回一个对象，该对象便具有了`symbol.iterator`属性，也就是`iterator`接口，该对象就是他自身。

```javascript
function* gen(){
	yield 1;
	yield 2;
	yield 3;
	return 4;
}

let g = gen()

console.log((g[Symbol.iterator])() == g)
// true
```

## next方法参数

- 例1：

```javascript
function* f(){
	for(let i = 0; true; i++){
		let reset = yield i;
		if(reset) { i = -1; }
	}
}
var g = f();
console.log(g.next());
// { value: 0, done: false }
console.log(g.next());
// { value: 1, done: false }
console.log(g.next(true));
// { value: 0, done: false }
// 因为next传参进去以后，i被赋值为-1，则执行i++为0
```

- 例2

```javascript
function* foo(x){
	let y = 2 * (yield (x+1));
	let z = yield (y/3);
	return (x+y+z)
}

var a = foo(5)
console.log(a.next())
// { value: 6, done: false } x+1
console.log(a.next())
// { value: NaN, done: false } (x+1)*2
console.log(a.next())
// { value: NaN, done: true  } (x+1)*2/3

var b = foo(5)
console.log(b.next())
// { value: 6, done: false }
console.log(b.next(12))
// { value: 8, done: false }
console.log(b.next(13))
// { value: 42, done: true }

```

- 例3：

```javascript
function* dataConsumer(){
	console.log('Start')
	console.log(`1.${yield}`);
	console.log(`2.${yield}`);
	return 'result';
}

let genobj = dataConsumer();

console.log(genobj.next());
// Start
console.log(genobj.next('a'))
// { value: undefined, done: false }
// 1.a
genobj.next(genobj.next('b'))
// { value: undefined, done: false }
// 2.b
```

## for..of循环

`for...of`循环可以自动遍历 Generator 函数运行时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

这里需要注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的`6`，不包括在`for...of`循环之中。

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

## 实例方法

### `Generator.prototype.throw() `

```java
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
// 第一个错误被 Generator 函数体内的catch语句捕获。i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
```

- `throw`方法可以接受一个参数，该参数会被`catch`语句接收，建议抛出`Error`对象的实例。

```javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了！'));
// Error: 出错了！(…)
```

注意，不要混淆遍历器对象的`throw`方法和全局的`throw`命令。上面代码的错误，是用遍历器对象的`throw`方法抛出的，而不是用`throw`命令抛出的。后者只能被函数体外的`catch`语句捕获。

如果 Generator 函数内部没有部署`try...catch`代码块，那么`throw`方法抛出的错误，将被外部`try...catch`代码块捕获。

```javascript
var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
```

- `throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法。

```javascript
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}

var g = gen();
g.throw(1);
// Uncaught 1
```

- `throw`方法被捕获以后，会附带执行下一条`yield`表达式。也就是说，会附带执行一次`next`方法。

```javascript
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```

- `throw`命令与`g.throw`方法是无关的，两者互不影响。

```javascript
var gen = function* gen(){
  yield console.log('hello');
  yield console.log('world');
}

var g = gen();
g.next();

try {
  throw new Error();
} catch (e) {
  g.next();
}
// hello
// world
```

。。。。。。。。。。。。。。。。。。。

### `Generator.prototype.return()`

Generator 函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历 Generator 函数。

```javascript
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

- 如果`return`方法调用时，不提供参数，则返回值的`value`属性为`undefined`。
- 如果 Generator 函数内部有`try...finally`代码块，且正在执行`try`代码块，那么`return`方法会推迟到`finally`代码块执行完再执行。

```javascript
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

### `next()、throw()、return() 的共同点`

`next()`、`throw()`、`return()`这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换`yield`表达式。

- `next()`是将`yield`表达式替换成一个值。

```javascript
const g = function* (x, y) {
  let result = yield x + y;
  return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;
```

- `throw()`是将`yield`表达式替换成一个`throw`语句。

```javascript
gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

- `return()`是将`yield`表达式替换成一个`return`语句。

```javascript
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

## yield* 表达式

如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。

```javascript
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// x
// a
// b
// y
```

ES6 提供了`yield*`表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。

```javascript
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

- 任何数据结构只要有 Iterator 接口，就可以被`yield*`遍历。

#### 完全二叉树

```javascript
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

## 作为对象属性的Generator函数

```javascript
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
// 等价于
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};

```

## Generator 函数的this

。。。。。。。。。。。。。。