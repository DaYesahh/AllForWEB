# keep-alive

## 介绍

是Vue的内置组件，可以将组件切换过程中的状态保留，存储在缓存中，不会因为组件变化而重新渲染Dom。

其中有两个属性：`include`和`exclude`，`include`是如果条件符合则保留，而`exclude`是如果条件符合则不保留。两个属性都可以使用字符串或正则表达式。

也可以用在路由中，需要使用路由的$route.meta的keepAlive属性。如下

```javascript
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

但是需要在`router`中设置`router`的原信息`meta`：

```javascript
  export default new Router({
    routes: [
      {
        path: '/',
        name: 'Hello',
        component: Hello,
        meta: {
          keepAlive: false // 不需要缓存
       }
     },
     {
       path: '/page1',
       name: 'Page1',
       component: Page1,
       meta: {
         keepAlive: true // 需要被缓存
       }
     }
   ]
 })
```

关于`keep-alive`中，还有两个钩子函数：`actived`和`deactived`，`actived`中可以获取到数据，类似于vue声明周期中的`created`。是`keep-alive`被激活的时候调用，而`actived`是`keep-alive`被停用的时候调用。

页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated





