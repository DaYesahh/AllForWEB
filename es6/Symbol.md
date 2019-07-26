# Symbol

- ```ES5```的对象属性名都是字符串
- ```Symbol```，表示独一无二的值。
- ```JS```语言的第七种数据类型。前六种是：```Undefined、Null、NaN、String、Boolean、Number、Object```。
- ```ES6```的对象属性名有两种类型
  + 字符串，点运算符后总是字符串
  + ```Symbol```类型，不可用点运算符，必须用**方括号**。
- ```symbol```是原始数据类型，所以```Symbol```函数前不能用```new```，因为它不是对象，也不能添加属性和方法。
- 可接受字符串为参数。表示对Symobl实例的描述，为了作为区分，而且Symbol可以转为字符串。如果是对象，会自动调用对象的```toString```方法，转化为字符串。
- 因为参数只是作为描述，即使参数相同，值却不相等。
- 不可与其他类型运算
- 可显示转为字符串、布尔值，但是不可为数值

## ```Symbol.prototype.description```

```javascript
const sym = Symbol('foo');
sym.description // "foo" 即为描述
```

## 作为属性名的Symbol

其表达方式如下:

```javascript
const mysymbol = Symbol();
const a = {}

a[mysymbol] = 'hello'

console.log(typeof mysymbol) // symbol

console.log(typeof mysymbol == "symbol")  //注意：这里必须是小写，然后类型都是字符串的形式

console.log(a) // { [Symbol()]: 'hello' }

let s = Symbol();
let q = Symbol();

let obj = {
	[s]:function (arg) {
		console.log("s")
	},
	[q](arg) {
		console.log("q")
	}
}

console.log(obj) // { [Symbol()]: [Function], [Symbol()]: [Function] }
```

## 属性名的遍历

```javascript
for..in  for..of  Object.keys()  Object.getOwnPropertyNames()  JSON.stringify()、均不可遍历Symbol的属性
```
- ```Object.getOwnPropertySymbols```

```javascript
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]
```

- ```Reflect.ownKeys```

  ```javascript
  let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
  };
  
  Reflect.ownKeys(obj)
  //  ["enum", "nonEnum", Symbol(my_key)]
  ```


## ```Symbol.for() Symbol.keyFor()```

- 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 ```Symbol ```值。如果有，就返回这个 ```Symbol ```值，否则就新建并返回一个以该字符串为名称的 ```Symbol ```值，新建的与```Symobl()```创建的即使参数相同，但也不相等
- `Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。
- `Symbol.for`为 Symbol 值登记的名字，是全局环境的，可以在不同的 ```iframe ```或 ```service worker``` 中取到同一个值。

## 内置的Symbol值

### ```Symbol.hasInstance```

```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

### ```Symbol.isConcatSpreadable```

对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。

```javascript
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

### ```Symbol.species```

```javascript
class MyArray extends Array {
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

console.log(b instanceof MyArray) // true
console.log(c instanceof MyArray) // true

console.log(b instanceof Array) // true
console.log(c instanceof Array) // true

// 以上中myArray是Array的子类，而通过子类衍生的实例b c的构造函数是MyArray
// 而设置了Symbol.species属性以后则：
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}

b instanceof MyArray // false
b instanceof Array // true
// 这是衍生实例的构造函数为基类，而不是子类
```

### ```Symbol.match```

对象的`Symbol.match`属性，指向一个函数。当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值。

### ```Symbol.replace```

对象的```Symbol.replace```属性，指向一个方法，当该对象被```String.prototype.replace```方法调用时，会返回该方法的返回值。

### ```Symbol.search```

对象的`Symbol.search`属性，指向一个方法，当该对象被`String.prototype.search`方法调用时，会返回该方法的返回值。

### ```symbol.split```

对象的`Symbol.split`属性，指向一个方法，当该对象被`String.prototype.split`方法调用时，会返回该方法的返回值。

### ```symbol.iterator```

对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法。

### ```symbol.toPrimitive```

对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

`Symbol.toPrimitive`被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式。

- Number：该场合需要转成数值
- String：该场合需要转成字符串
- Default：该场合可以转成数值，也可以转成字符串

### ```Symbol.toStringTag```

### ```symbol.unscopables```





