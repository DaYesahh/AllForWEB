# Map

- 类似于对象，键值对的集合
- 键不限于字符串，是各种类型的值都可以当作键。对象是“字符串-值”，键是“值-值”

## 用法

- 任何具有`Iterator`接口、且每个成员都是一个双元素的数组的数据结构都可以当作`Map`构造函数的参数！

```javascript
// 普通对象
const m = new Map();
const o = {p:'Hello World'};
m.set(o,'content')
m.get(o)
m.has(o)
m.delete(o)

// 接受二维数组作为参数，会自动将内数组作为一键一值，如果不是二维数组，则会报错，因为参数的内部不是一个对象，或者是iterator
const map = new Map([
    ['name','namezhi'], 
    ['title','title1']
])
console.log(map)
// Map {'name' => 'zs', 'title' => 'author'} 
// Map是这种结构


    // 其本质执行是：
const items = [
    ['name','namezhi'], 
    ['title','title1']
];
const map = new Map();
items.forEach(
    ([key,value]) => map.set(key,value)
)
```

- 创建map格式：

```javascript
const m = new Map();
const o = {p:'Hello world'};
console.log(m) // Map {}
m.set(o) // Map {{p:'Hello world'} => undefined}
//m.set(o,'content') 
console.log(m)// Map {{p:'Hello world'} => 'content'}

const m2 = new Map();
const o2 = ['a','b']
m2.set(o2)
console.log(m2) // Map { [ 'a', 'b' ] => undefined }

const m3 = new Map([['a','b']])
console.log(m3) // Map {'a' => 'b'}
```

- 如果对同一个键多次赋值，后面的值将覆盖前面的值。

- 如果读取一个未知的键，则返回`undefined`。

  ```javascript
  new Map().get('asfddfsasadf')
  // undefined
  ```

- 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

  ```javascript
  const map = new Map();
  map.set(['a'],555)
  let b = map.get(['a'])
  console.log(b) // undefined
  // 表面是对同一个键取值，但是数组本质是object是引用类型，所以名相同，地址不同，则不是同一个值
  ```

- Map的键跟地址绑定，只要内存地址不一样，就视为两个键，解决了**同名属性碰撞**的问题

- 简单类型的值判定方式为**只要两个值严格相等**，则视为相同的键：
- + `0`和`-0`则是相同的键
  + 布尔值`true`和字符串`true`则是不同的键
  + `undefined`和`null`也是两个不同的键
  + 虽然`NaN`不严格相等于自身，但`Map`视为相同的键（猜测可能是因为es6中有办法判断其为严格相等了）

## 实例的方法和属性

### `size()`

### `Map.prototype.set(key,value)`

- 返回新`map`
- set方法设置键名key对应的键值为value,如果`key`已经有值，则键值会被更新，否则就新生成该键。

```javascript
const m = new Map();
m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
```

- 因为返回新的map结构，所以可以采用链式写法

  ```javascript
  let map = new Map()
    .set(1, 'a')
    .set(2, 'b')
    .set(3, 'c');
  ```

### `Map.prototype.get(key)`

- `get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

### `Map.prototype.has(key)`

- `has`方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```javascript
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

### `Map.prototype.delete(key)`

`delete`方法删除某个键，返回`true`。如果删除失败，返回`false`。

```javascript
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```

### `Map.prototype.clear()`

`clear`方法清除所有成员，没有返回值。

```javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

## 遍历方法

### `Map.prototype.keys()`

返回键名

### ``Map.prototype.values()``

返回键值

### `Map.prototype.entries()`

返回所有成员的遍历器

```javascript
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
// Map默认遍历接口是Symbol.iterator属性
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
map[Symbol.iterator] == map.entries // true
```

### `Map.prototype.forEach()`

遍历`Map`的所有成员

```javascript
map.forEach(function(value, key, map) { // 注意三个参数
  console.log("Key: %s, Value: %s", key, value);
});
```

还可以接受第二个参数绑定`this`。

```javascript
const reporter = {
    report: function (key,value) {
        console.log(key,value)
    }
}
map.forEach(function(value,key,map) {
    this.report(key,value)
},reporter);
```

## 与其他数据结构的互相转换

### Map转数组

最方便的使用扩展运算符

```javascript
const map = new Map([
  [1,'one'],
  [2,'two'],
  [3,'three'],
]);

console.log([...map.keys()])
// [1,2,3]
console.log([...map.values()])
// ['one','two','three']
console.log([...map.entries()])
// [[1,'one'],[2,'two'],[3,'three']]
console.log([...map])
// [[1,'one'],[2,'two'],[3,'three']] 
```

- 结合数组的`map`和`filter`方法

```javascript
const map1 = new Map(
   [...map].filter(([k,v]) => k<3)
)
console.log(map1) 
// Map {1 => 'one', 2 => 'two'}

const map2 = new Map(
   [...map].map(([k,v]) => [k*2,'_'+v])
)
console.log(map2)
// Map {2 => '_one', 4 => '_two', 6 => '_three'}
```

### 数组转Map

只要作为参数传入Map结构即可。

### Map转为对象

因为对象的键是字符串，所以如果map的键也是字符串，则可以转换。

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

### 对象转`Map`

```javascript
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

// 都是一个套路，新建一个map，遍历对象，将其作为参数加入map中
```

### Map转为Json

#### 对象Json

Map的键名都是字符串

```javascript
function strMapToJson(strMap){
    return JSON.stringify(strMapToObj(strMap)); //  先转化为对象，再转化为obj，再序列化为json
}
let myMap = new Map()
```

#### 数组Json

```javascript
function mapToArrayJson(map){
	return JSON.stringify([...map])
}

let myMap = new Map().set(true,7).set({foo:3},['abc']);

console.log(mapToArrayJson(myMap))
// [[true,7],[{foo:3},['abc']]]
```

### JSON转为Map

### 键名为字符串

```javascript
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

## WeakMap

。。。。。



