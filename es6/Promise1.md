# Promise

先看一段代码

```javascript
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(p1);
var p3 = new Promise(function(resolve,reject){
    resolve(1);
})
var p4 = new Promise(function(resolve,reject){
    resolve(p1);
})
// Promise.resolve(...)可以接收一个值或者是一个Promise对象作为参数。当参数是普通值时，它返回一个resolved状态的Promise对象，对象的值就是这个参数；当参数是一个Promise对象时，它直接返回这个Promise参数。
// 也就是说p2的值就是p1这个参数
console.log(p1 === p2) // true
console.log(p1 === p3) // false
console.log(p1 === p4) // false
console.log(p3 === p4) // false

p4.then(function(value) {
    console.log('p4=' + value)
})
p2.then(function(value) {
    console.log('p2=' + value)
})
p1.then(function(value) {
    console.log('p1=' + value)
})

// p2 = 1
// p1 = 1
// p4 = 1
```



- resolve vs reject

  先看一段代码

  ```javascript
  var p1 = new Promise(function(resolve,reject) {
      resolve(Promise.resolve('resolve'))
  })
  var p2 = new Promise(function(resolve,reject) {
      resolve(Promise.resolve('reject'))
  })
  var p3 = new Promise(function(resolve,reject) {
      reject(Promise.resolve('resolve'))
  })
  p1.then(
      function fullfilled(value){
          console.log('fullfilled:' + value)
      },
      function rejected(err) {
          console.log('rejected:' + err)
      }
  )
  p2.then(
      function fullfilled(value){
          console.log('fullfilled:' + value)
      },
      function rejected(err) {
          console.log('rejected:' + err)
      }
  )
  p3.then(
      function fullfilled(value){
          console.log('fullfilled:' + value)
      },
      function rejected(err) {
          console.log('rejected:' + err)
      }
  )
  
  // 控制台输出
  p3 rejected: [Object Promise]
  p1 fullfilled: resolve
  p2 rejected: reject
  ```

  ## Promise中的异常

  ```javascript
  var p1 = new Promise(function(resolve,reject){
      foo.bar();
      resolve(1);
  })
  p1.then(function(value){
      console.log('p1 then value:' + value)
  },function(err) {
      console.log('p1 then err: ' + err)
  }).then(function(value){
      console.log('p1 then then value:' + value)
  },function(err) {
      console.log('p1 then then err: ' + err);
  });
  // p1 then err : foo is undefined
  // p1 then then value: undefined
  
  var p2 = new Promise(function(resolve,reject){
      resolve(2);
  })
  p1.then(function(value){
      console.log('p2 then value:' + value)
      foo.bar();
  },function(err) {
      console.log('p2 then err: ' + err)
  }).then(function(value){
      console.log('p2 then then value:' + value)
  },function(err) {
      console.log('p2 then then err: ' + err);
      return 1;
  }).then(function(value){
      console.log('p2 then then then value: ' + value);
  },function(err){
      console.log('p2 then then then err: ' + err);
  });
  // p2 then value: 2
  // p2 then then err: foo is undefined
  // p2 then then then value: 1
  
  
  // 总的输出是像下面这样的：
  p1 then err: ReferenceError: foo is not defined
  p2 then value: 2
  p1 then then value: undefined
  p2 then then err: ReferenceError: foo is not defined
  p2 then then then value: 1
  // 可以看出，p1和p2多级then的回调函数是交替执行的，这正是Promise then回调的异步性决定的
  ```
