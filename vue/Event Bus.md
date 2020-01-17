# Event Bus

## 简介

`EventBus`是事件总线，可以适用于父子、兄弟、隔代组件之间的交互。是事件的中心，可以向该中心注册发送事件或接受事件，所有组件都可以平行的通知其他组件。对比`vuex`，将通知的概念上升到了共享状态层次。

## 使用方式

### 创建方式

- 创建一个文件，命名为`event-bus.js`，将其导出。该文件只是一个不具备DOM的组件，只有实例方法。

  ```javascript
  import vue from 'vue'
  export const EventBus = new Vue();
  ```

- 在项目中的`main.js`中初始化`EventBus`：

  ```javascript
  Vue.prototype.$EventBus = new Vue()
  ```

  这种方式创建的是全局的事件总线，原理是采用订阅/发布模式。

### 通信方式

#### 普通

使用EventBus，哪个组件使用它，需要将其引入：

`import EventBus from 'event-bus'`

然后某个组件需要对她**发送事件**：

```javascript
<template>
   <button @click="decrease()"></button>    
</template>
<script>
   import {EventBus} from "../event-bus.js" 
export default{
    name:"DecreaseCount"
    data(){
        return {
            num:1,
            deg:180
        }
    },
        methods: {
            decrease(){
                // 注意这里是使用的EventBus.$emit
                EventBus.$emit("decreased",{
                    num: this.num,
                    deg: this.deg
                })
            }
        }
}
</script>
```

在某个组件中去**接收事件**：

```javascript
<template>
    <div id="app">
        <div class="container"  :style="{transform: 'rotateY(' + degValue + 'deg)'}">
             <div class="front">
                <div class="decrement">
                    <DecreaseCount />
                </div>
                <div class="show-front"> {{fontCount}} </div>
             </div>    
        </div>    
    </div>    
</template>
<script>
   import DecreaseCount from "./components/DecreaseCount";
   import { EventBus } from "./event-bus.js";
export default {
    name: "App",
    components: {
        DecreaseCount
    },
    data(){
        return {
            degValue: 0,
            fontCount: 0,
            backCount: 0
        }
    },
    mounted(){
        // 注意这里采用的EventBus.$on("方法名")
        EventBus.$on("decreased",({num,deg}) => {
            this.fontCount -= num
            this.$nextTick(() => {
                this.backCount -= num
                this.degValue -= deg;
            })
        })
    }
}
</script>
```

如果只想监听一次事件，可以采用`EventBus.$once()`

如果想移除监听事件，可以采用`EventBus.$off()`，移除特定的就传参，全部移除则不传参

#### 全局

工作原理是发布/订阅模式。



