# NaN

## 判断NaN是否相等

- `[NaN].includes(NaN)`
- `map`中的key不可重复，则会判断是否为重复
- `Object.is(NaN,NaN)`
- `set`，如果往set中添加两次NaN，会产生覆盖现象