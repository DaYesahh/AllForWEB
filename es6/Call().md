# Call()

```javascript
call方法是js中每个函数原型链上的方法
```

- 使用call()方法调用函数并且指定上下文的this

  ```javascript
  function print(){
  	var msg = [this.person, 'is an awesome', this.role].join(' ');
  	console.log(msg);
  	console.log(this) // {person:'douglas crockfod',role:'js developer'}
  }
  
  var desc = {
  	person:'douglas crockfod',
  	role:'js developer'
  }
  
  print.call(desc) // 相当于把desc当作this传入，即指定print的上下文是desc
  ```


