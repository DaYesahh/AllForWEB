# Map

- 类似于对象，键值对的集合
- 键不限于字符串，是各种类型的值都可以当作键。对象是“字符串-值”，键是“值-值”

## 用法

请看代码

```javascript
// 
const m = new Map();
const o = {p:'Hello World'};
m.set(o,'content')
m.get(o)
m.has(o)
m.delete(o)

// 接受二维数组作为参数，会自动将内数组作为一键一值
const map = new Map([
    ['name','namezhi'], 
    ['title','title1']
])
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



