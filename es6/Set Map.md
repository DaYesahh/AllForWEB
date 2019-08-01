# Set Map

## Set

```javascript
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
  set.size // 2 则{}被视为两个值
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

- `Set.prototype.entries()`：返回键值对的遍历器，输出为数组。

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

- `Set.prototype.forEach()`：使用回调函数遍历每个成员

## Map



