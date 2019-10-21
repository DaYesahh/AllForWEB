# Set

## Set

```javascript
typeof set // object
typeof map // object
类似于数组
所有成员的值是唯一的（）
Set()是一个构造函数
没有键名，只有键值。
```

- 生成方式：`const s = new Set()`
- 可接受一个数组（或具有iterable接口的其他数据结构）作为参数

```javascript
const set = new Set([1,2,3,4,4]);
[...set] // [1,2,3,4]
```

- 使用`size`获取`set`长度

- 字符串去重

  ```javascript
  console.log([...new Set('ababbc')].join('')) // abc
  ```

- 向`set`中加入值以后，不会发生类型转换。`5`和`"5"`是两个不同的值

- `set`判断相等采用`Same-value-zero equality`，类似于`===`，但是可判断`NaN`相等

- 在`Set`内部，`NaN`是相等的

```javascript
let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
console.log(set) // Set {NaN}
```

- `Set`内部两个对象总是不相等的

  ```javascript
  let set = new Set();
  set.add({})
  set.size // 1
  set.add({});
  set.size // 2 则{}被视为两个值，因为其地址不同，和map类似，根据地址来判断值是否相等
  ```

### Set实例的属性和方法

Set结构的实例有下属性：

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

`Object`和`Set`结构判断是否包含重复键值:

```javascript
// object
const properties = {
	'width':1,
	'height':1,
}
if(properties['width']) {
	console.log(properties['width']) // 1
}

// Set
const set = new Set();
set.add("width")
set.add("height")
if(set.has("width")) {
	console.log(set) // Set {'width','height'}
}

```

- set转数组

  ```javascript
  const items = new Set([1,2,3,4,5])
  // set转数组
  const arr1 = Array.from(items)
  const arr2 = Array.from(set)
  console.log(arr1) // [1,2,3,4,5]
  console.log(arr2) // ['width','height']
  ```

### Set遍历

四种遍历方法：

```javascript
/注意：Set的遍历顺序就是元素的插入顺序，使用Set保存一个回调函数表，调用时能保证按照添加顺序调用/
```

- `Set.prototype.keys()`：返回键名的遍历器

- + `SET`没有键名，所以和`Set.prototype.values()`一样。

- `Set.prototype.values()`：返回键值的遍历器

  ```javascript
  for (let items of set.values()){
  	console.log(items)
  	// width
  	// height
  	// 均为string类型
  }
  ```

- `Set.prototype.entries()`：返回键值对的遍历器，输出为数组，因为set只有键值，没有键名，则数组有两项，均为键值。

  ```javascript
  for (let items of set.entries()) {
  	console.log(items)
  	/*
  Set { 'width', 'height' }
  [ 'width', 'width' ]
  [ 'height', 'height' ]
  	*/
  }
  ```

- `Set.prototype.forEach()`：使用回调函数遍历每个成员，**参数就是回调函数**

  ```javascript
  let set = new Set([1,4,9]);
  set.forEach((value,key) => console.log(key + " " + value));
  // 1 1
  // 4 4
  // 9 9
  // forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。
  ```

#### 遍历的应用

`...`内部使用`for...of`循环，所以也可以用于`Set`结构。

```javascript
let set = new Set(['red','green','blue']);
let arr = [...set] // ['red','green','blue']
```

- 数组去重，已知，查看《数组去重整理》
- 数组的函数也可以间接用于`Set`结构。

```javascript
let set = new Set([1,2,3])
set = new Set([...set].map(x = x*2));
// 返回Set结构:{2,4,6}
let set = new Set([1,2,3,4,5]);
set = new Set([...set].filter(x => (x%2) == 0));
```

- 并集、交集和差集

```javascript
let a = new Set([1,2,3])
let b = new Set([4,3,2])

// 并集
let union = new Set([...a,...b])
// Set {1,2,3,4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)))
// Set {2,3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)))
// Set {1}
```

- 直接改变原来的表结构，现在还没有，可以采用间接的，直接赋值即可

### `WeakSet`

- 特点
- + 不重复的值的集合
  + `WeakSet`构造函数
  + 成员只能是**对象**，不可是其他类型的值
  + `WeakSet`中的对象都是弱引用，垃圾回收机制不考虑`WeakSet`对该对象的引用，所以当其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于`WeakSet`之中
  + 为了垃圾回收机制，在`WeakSet`中适合临时存放一组对象以及存放跟对象绑定的信息。当对象在外部消失，在`WeakSet`中的引用就会消失。
  + ES6不可遍历，因为`WeakSet`内部成员的数量取决于垃圾回收机制的运行，但是垃圾回收机制的运行情况不清楚，所以不确定其内部元素。
- 语法

- + 参数是具有`Iterator`接口的对象，注意，对象是本质是对象，比如`Array`、`Set`等。

  + 参数的元素也需要是对象，因为WeakSet的规则是将参数的元素作为元素。如下：

    ```javascript
    const a = [[1,2],[3,4]];
    const ws1 = new WeakSet(a);
    console.log(ws1) // WeakSet { [items unknown] }
    
    const b = [3,4];
    const ws2 = new WeakSet(b);
    console.log(ws2) // 报错
    ```

#### 构造方法

- **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
- 注意，没有`size`属性，无法获取长度

#### 应用

- 存储DOM节点，而不用担心节点从文档中删除，从而引发内存泄漏。
- 实例调用的例子：保证实例只可以在本身调用
```javascript
class Foo{
    constructor(){
        foos.add(this)
    }
    method(){
        if(!foos.has(this)){
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用')
        }
    }
}





```