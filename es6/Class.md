# Class

## ES5与ES6的对比

- ES5的方法

  ```javascript
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
  };
  
  var p = new Point(1, 2);
  
  ```

  + 内部方法是可枚举的

    ```javascript
    var Point = function (x, y) {
      // ...
    };
    
    Point.prototype.toString = function() {
      // ...
    };
    
    Object.keys(Point.prototype)
    // ["toString"]
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]
    ```

- ES6的类

  + 类的数据类型就是函数，类本身就指向构造函数。

  ```javascript
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  
  console.log(typeof Point) // function
  console.log(Point === Point.prototype.constructor) // true
  // ES6中的类也就是构造函数的另一种写法。
  // 类的数据类型就是函数，类本身就指向构造函数。
  ```

  + 类的所有方法都定义在类的`prototype`属性上面。

    ```javascript
    class Point {
      constructor() {
        // ...
      }
    
      toString() {
        // ...
      }
    
      toValue() {
        // ...
      }
    }
    
    // 等同于
    
    Point.prototype = {
      constructor() {},
      toString() {},
      toValue() {},
    };
    
    // Object.assign方法可以很方便地一次向类添加多个方法。
    Object.assign(Point.prototype, {
      toString(){},
      toValue(){}
    });
    ```

- + 内部所有定义的方法，都是不可枚举的（non-enumerable）。

    ```javascript
    // 内部所有定义的方法，都是不可枚举的（non-enumerable）。
    class Point {
      constructor(x, y) {
        // ...
      }
    
      toString() {
        // ...
      }
    }
    
    Object.keys(Point.prototype)
    // []
    Object.getOwnPropertyNames(Point.prototype)
    // ["constructor","toString"]
    ```

## `constructor(必须存在)`

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。**一个类必须有`constructor`方法**，如果没有显式定义，一个空的`constructor`方法会被默认添加。

- `constructor`方法默认返回实例对象（即`this`），也完全可以指定返回另外一个对象。
- 类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

## 类的实例

- 与 ES5 一样，类的所有实例共享一个原型对象。

  ```javascript
  var p1 = new Point(2,3);
  var p2 = new Point(3,2);
  
  p1.__proto__ === p2.__proto__
  //true
  ```

- 实例的属性除非显式定义在其本身（即定义在`this`对象上），否则都是定义在原型上（即定义在`class`上）。**定义在了原型上，则不属于实例自身，而是实例们共用原型对象的属性。**

  ```javascript
  //定义类
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  
  var point = new Point(2, 3);
  
  point.toString() // (2, 3)
  
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true
  ```

## 取值函数和存值函数

与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let inst = new MyClass();
inst.prop = 123;
// setter: 123
inst.prop
// 'getter'
```

- 存值函数和取值函数是设置在属性的 Descriptor 对象上的。

  ```javascript
  class CustomHTMLElement {
    constructor(element) {
      this.element = element;
    }
  
    get html() {
      return this.element.innerHTML;
    }
  
    set html(value) {
      this.element.innerHTML = value;
    }
  }
  // Object.getOwnPropertyDescriptor(obj,prop)是返回obj这个对象prop属性的描述符
  var descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype, "html"
  );
  
  console.log("get" in descriptor)  // true
  console.log("set" in descriptor ) // true
  ```

## 属性表达式

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }
  [methodName]() {
    // ...
  }
}
```

## Class表达式

类似函数的定义方式：

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// Me只可以在类中使用，这个类的大名还是MyClass
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 如果不用Me，则可以写成如下形式：
const MyClass = class { /* ... */ };
```

- 使用**匿名函数**实现**立即执行类**定义：

  ```javascript
  let person = new class {
    constructor(name) {
      this.name = name;
    }
  
    sayName() {
      console.log(this.name);
    }
  }('张三');
  
  person.sayName(); // "张三"
  ```

## 注意点

