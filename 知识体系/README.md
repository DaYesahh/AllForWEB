# CC大神养成记

**2020-02-18**

1. vue双向绑定

![image-20200218204316552](https://github.com/DaYesahh/AllForWEB/blob/master/%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB/images/image-20200218204316552.png)

complie什么情况下使用。原理。

2. dom

讲讲虚拟dom(优点)。虚拟dom怎么监听dom的变化。

3. diff

深度优先遍历，记录差异；差异类型；列表对比算法；diff(有无key)；patch

4. 生命周期

8个过程（创建前/后, 载入前/后,更新前/后,销毁前/销毁后）

5. Vue指定
   - v-text
   - v-html
   - v-bind
   - v-on
   - v-model
   - v-for
   - v-if

**2020-02-19**

1. 组件通信方式

~~还需巩固~~、已混淆

2. vuex

* store中的数据发生改变，依赖这个数据的组件也会发生更新
* Vue.js中ajax请求代码应该写在组件的methods中还是vuex的actions中？
  答：
  一、如果请求来的数据是不是要被其他组件公用，仅仅在请求的组件内使用，就不需要放入vuex 的state里。
  二、如果被其他地方复用，这个很大几率上是需要的，如果需要，请将请求放入action里，方便复用，并包装成promise返回，在调用处用async await处理返回的数据。如果不要复用这个请求，那么直接写在vue文件里很方便。

3. keep-alive

在被keep-alive包含的组件/路由中，会多出两个生命周期的钩子:activated 与 deactivated

* activated在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用
* deactivated：组件被停用(离开路由)时调用

4. 为什么使用vue，它的优点

   * 优点：

   【1】只专注与视图层的轻量级的框架

   【2】数据的双向绑定 优点是减少了dom操作

   【3】组件化 和 响应式设计

   【4】实现数据与结构的分离 高效轻便 易于浏览器的加载速度

   * Vue和其他框架的区别

   1.与Angular.js的区别
    相同点：

   - ａ：都支持指令：内置指令和自定义指令。

   - ｂ：都支持过滤器：内置过滤器和自定义过滤器。
   - ｃ：都支持双向数据绑定。
   - ｄ：都不支持低端浏览器。

   不同点：

   - ａ：Aangular的学习成本高，增加了依赖注入Dependency Injection特性，而Vue本身提供的API都比较简单，直观。

   　*  b：在性能上，Angualr依赖对数据做脏检查，所以Watcher越多越慢。Vue使用基于依赖追踪的观察并且使用异步队列更新。所有的数据都是独立触发的。对于庞大的应用来说，这个优化差异还是比较明显的。

   2.与React的区别
   相同点：

   　　- ａ：React采用特殊的JSX语法，Vue在组件开发中也推崇编写Vue特殊文件格式，对文件内容都有一些约定，两者都需要编译后使用。
   　　- b：中心思想相同：一切都是组件，组件实例之间可以嵌套。
   　　- c：都提供合理的钩子函数，可以让开发者定制化地去处理需求。
   　　- d：都不内置列数Ajax，Route等功能的核心包，而是以插件的方式加载。
   　　- e：在组件开发中都支持mixins的特性。

   不同点：

   　　- ａ：React依赖Virtual DOM，而Vue使用的是DOM模板，React采用的Virtual DOM会对渲染出来的结果做脏检查。
   　　- b：vue在模板中提供了指令，过滤器等，可以非常方便，开解的操作DOM。

**2020-02-20**

1. MVVM原理

MVVM的实现主要是三个核心点：

* 响应式：vue如何监听data的属性变化
* 模板解析：vue的模板是如何被解析的（render-》with）
* 渲染：vue模板是如何被渲染成HTML的（render）

模板渲染为html分为两种情况，第一种是初次渲染的时候，第二种是渲染之后数据发生改变的时候，它们都需要调用updateComponent,其形式如下：

```js
vm._update(vnode){
  const prevVnode = vm._vnode
  vm._vnode = vnode
  if (!prevVnode){
    vm.$el = vm.__patch__(vm.$el,vnode)
  } else {
    vm.$el = vm.__patch__(prevVnode,vnode)
  }
}

function updateComponent(){
  vm._update(vm._render())
}
```

首先读取当前的虚拟DOM——vm._vnode,判断其是否为空，若为空，则为初次渲染，将虚拟DOM全部渲染到所对应的容器当中（vm.$el），若不为空，则是数据发生了修改，通过响应式我们可以监听到这一情况，使用diff算法完成新旧对比并修改。

2. 路由相关

Hash、History ；vue-router（补充）

3. HTML块级、行内、行内块级

   举例、行内元素和块级元素的转换（display、float、position）

4. BFC

触发条件、特性、用途、如何创建

5. 盒模型

W3C 和IE 盒子模型、外边距重叠

**2020-02-21**

1. dom事件和事件委托

什么是事件冒泡、阻止冒泡、事件委托

2. flex

还需学习

3. 栅栏布局

4. 元素消失的方式

   5种方式

5. 动画相关属性

2D、3D、关键帧

6. em和rem

区别、像素

7. line-height

属性细节、有无单位区别。

**2020-02-24**

1. let const
2. 箭头函数

箭头函数不能用于构造函数，没有prototype属性，不能绑定arguments，不能绑定this，无法使用call()或apply来改变其运行的作用域

3. 异步

promise

4. map

5. symbol

6. vue15



**2020-02-25**

1. 原型和原型链
2. 闭包
3. 跨域的方式
4. JS的执行机制
5. 作用域
6. 变量提升
7. vue30