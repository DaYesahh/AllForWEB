# Virtual Dom 原生Dom谁快

来自尤大，以下为要点，提炼精华。

- 框架的意义在于掩盖底层的DOM操作，所以单纯操作dom的时候，没有框架比单纯操作dom更快，毕竟远水再管用也不会比近水沟方便迅速。
- React未明确表明React比原生操作DOM快，React的基本思维是每次有变动就整个渲染整个应用。
- innerHTML和Virtual DOM重绘性能消耗。
- + innerHTML是render html string O(template size) + 重新创建所有DOM元素O(DOM size)
  + virtual DOM: render Virtual DOM + diff O(template size) + 必要的DOM更新O(DOM change)

  +  
- innerHTML不管是js计算、dom操作都和整个界面相关，而vd只有js计算和整个页面相关。
- 而dom操作是和数据变动量相关的
- 除了React，其他框架一般用的数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。
- MVVM 的变化检查是数据层面的【MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查(scope digest O(watcher count) + 必要 DOM 更新 O(DOM change))使得任何变动都有固定的O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集(重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)可以看到)，在 js 和 DOM 层面都是 O(change)：】，而 React 的检查是 DOM 结构层面的。
- 以上关于脏检查和依赖收集的关系。
- + 脏检查：任何小变动都有的和 watcher 数量相关的性能代价
  + 在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗
- MVVM与React渲染列表的时候的差距
- + 这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素（Vue提供了uid，确定是同一条数据，以此来复用）
  + React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。
- 性能比较看场合
- + 初始渲染：Virtual DOM > 脏检查 >= 依赖收集
  + 小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
  + 大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化


