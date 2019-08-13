# Component

## 创建组件的几种方式

- 全局组件

```javascript
let oo = Vue.extend({
    template:"<div><h2>全局组件</h2></div>"
})
Vue.component("ooCom",oo)
```

- 局部组件

```javascript
let oo = Vue.extend({
    template:"<div><h2>全局组件</h2></div>"
})
new Vue({
    el:"#app"
    data:{},
    methods:{},
    components:{
        "ooCom":oo,
    }
})
```

- 另一种全局加局部

```javascript
Vue.component("ooCom",{
    template:"<div><h2>全局组件</h2></div>"
})

new Vue({
    el:"#app",
    data:{},
    methods:{},
    components:{
        "ooCom":
        {
            template:"<div><h2>局部组件</h2></div>"
        }
    }
})
```

- 使用template定义

```javascript
<div id="app">
    <oo-com></oo-com>
</div>
<template id="ooha">
    <div>
       <h1>这是全局组件<h1>
    </div>
</template>
Vue.component("ooCom",{
    template:"#ooha"
})
new Vue({
    el:"#app",
    data:{},
    methods:{},
})
```

### 父子组件

`父组件向子组件传递数据使用props选项，而子组件通过events事件触发，发送数据给父组件`

- `props`
- `this.$emit("func",[args])`

