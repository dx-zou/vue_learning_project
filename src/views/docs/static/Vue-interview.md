# Vue核心知识

## 1. VDOM 和真实 DOM 

### 1.1 引言

> DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程） JS 代码调用 DOM API 必须 挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化， 引擎间切换的单位代价将迅速积累若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

### 1.2 区别

- 虚拟 DOM 不会立马进行排版与重绘操作

- 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多DOM节点排版与重绘损耗
- 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

##  2. MVVM 框架

　　mvvm 是 model + view + viewmodel 框架，通过 viewmodel 连接数据模型model 和 view

　　区别：vue 是数据驱动，通过数据来显示视图层而不是节点操用

　　场景：数据操作比较多的场景，更加快捷

## 3. 双向绑定

　　vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

　　具体步骤：

　　第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 
这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化

　　第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

　　第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:

　　1、在自身实例化时往属性订阅器(dep)里面添加自己

　　2、自身必须有一个update()方法

　　3、待属性变动dep.notice()通知时，能调用自身的 update() 方法，并触发Compile中绑定的回调，则功成身退。

　　第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

## 4. 生命周期

![vue的生命周期图](https://cn.vuejs.org/images/lifecycle.png)

　　总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

　　**创建前/后**

　　在beforeCreated阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。

　　在created阶段，vue实例的数据对象data有了，$el还没有。

　　**载入前/后**

　　在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。

　　在mounted阶段，vue实例挂载完成，data.message成功渲染。

　　**更新前/后**

　　当data变化时，会触发beforeUpdate和updated方法。

　　**销毁前/后**

　　在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

## vuex 面试题

**1、有哪几种属性**

　　有 5 种，分别是 state、getter、mutation、action、module

**2、vuex 的 store 特性是什么**

　　(1) vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data

　　(2) state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新

　　(3) 它通过 mapState 把全局的 state 和 getters 映射到当前组件的 computed 计算属性

**3、 vuex 的 getter 特性是什么**

　　(1) getter 可以对 state 进行计算操作，它就是 store 的计算属性

　　(2) 虽然在组件内也可以做计算属性，但是 getters 可以在多给件之间复用

　　(3) 如果一个状态只在一个组件内使用，是可以不用 getters

**4、vuex 的 mutation 特性是什么**

　　action 类似于 muation, 不同在于：action 提交的是 mutation,而不是直接变更状态

　　action 可以包含任意异步操作

**5、vue 中 ajax 请求代码应该写在组件的methods中还是vuex 的action中**

　　如果请求来的数据不是要被其他组件公用，仅仅在请求的组件内使用，就不需要放入 vuex 的 state 里

　　如果被其他地方复用，请将请求放入 action 里，方便复用，并包装成 promise 返回

**5、不用 vuex 会带来什么问题**

　　可维护性会下降，你要修改数据，你得维护3个地方

　　可读性下降，因为一个组件里的数据，你根本就看不出来是从哪里来的

　　增加耦合，大量的上传派发，会让耦合性大大的增加，本来Vue用Component就是为了减少耦合，现在这么用，和组件化的初衷相背

## 如何优化首屏加载速度

>
> 在Vue项目中，引入到工程中的所有js、css文件，编译时都会被打包进vendor.js，浏览器在加载该文件之后才能开始显示首屏。若是引入的库众多，那么vendor.js文件体积将会相当的大，影响首屏的体验

```
解决方法是：
将引用的外部js、css文件剥离开来，不编译到vendor.js中，而是用资源的形式引用，这样浏览器可以使用多个线程异步将vendor.js、外部的js等加载下来，达到加速首开的目的。外部的库文件，可以使用CDN资源，或者别的服务器资源等。
```

#### 几种常用的优化方法：

- 使用npm run build --report命令进行大文件定位
- 路由的按需加载
- 将打包生成后 index.html页面 里面的JS文件引入方式放在 body 的最后
- 用文档的cdn文件代替 npm 安装包
- UI库的按需加载
- 开启 Gzip 压缩