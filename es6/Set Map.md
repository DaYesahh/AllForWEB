# Set Map

## Set

```javascript
类似于数组
所有成员的值是唯一的（）
Set()是一个构造函数
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



## Map



