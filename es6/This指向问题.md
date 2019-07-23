# This指向问题

- 浏览器下执行的为window
- node下略为复杂，和js中的是不一样的

## node的this

首先上代码

```javascript
console.log("outside this is what:",this) // {}
this.name = 10
console.log("outside this is what secondly:",this) // {name:10}
console.log("outside name is what:",this.name) // 10

global.name = 90
function testthis2(){
	console.log("inside this is what:",this) // global
	console.log("inside name is what:",this.name) // 90,如果没有定义global.name = 90，则输出为undefined	
}
testthis2()

function Fn(){
    this.num = 998;
}
var fn = new Fn();
console.log(fn.num); // 998
console.log(global.num); // undefined
```

总结为：

- 函数中的this是global，所以如果要挂载变量，需要在global中添加属性
- 构造函数中的this是指向自身实例
- node中全局中的this实际上指向的是module.exports
- node中的作用域分为全局作用域（global）和模块作用域