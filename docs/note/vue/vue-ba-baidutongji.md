---
title: vue-ba 使用百度统计
editLink: false
category: vue
tag:
  - vue
  - vue-ba
  - 百度统计
---

### 1. 申请百度统计账号

前往官网注册百度统计账号，并添加网站。

<a href="https://tongji.baidu.com/">百度统计官网地址：https://tongji.baidu.com/</a>

::: center
![](/images/baidutongji-1.png)
:::

### 2. 获取js代码中的siteId

获取网址参数，图中打码部分的siteId: ==614cebXXXXXXXXXXXXXXXXX368f831f8== 。
::: center
![](/images/baidutongji-2.png)
:::

### 3. 安装vue-ba

``` shell
npm install --save vue-ba
```

### 4. 在main.js文件中引入vue-ba 

<a href="https://github.com/minlingchao1/vue-ba/">vue-ba github地址</a>

``` javascript
// vue-ba 接入百度统计 https://github.com/minlingchao1/vue-ba/
import ba from 'vue-ba'
Vue.use(ba, '614cebXXXXXXXXXXXXXXXXX368f831f8')
Vue.use(ba, { siteId: '614cebXXXXXXXXXXXXXXXXX368f831f8' })
```
到此，您的整个站点所有页面的请求访问都会被百度统计到了。

### 5. 高级用法 v-track-event 和 v-track-pageview 指令

#### 1. v-track-event 指令用于统计监听事件

使用指令 v-track-event 监听事件， 通过 modifiers 指定事件类型，将自动为绑定元素添加事件监听，当事件触发调用统计代码。 如不指定事件，默认监听 click 事件。

可通过逗号分隔的字符串或对象字面量传递参数，以字符串传递时请注意参数顺序，可参考trackEvent API。

统计自定义事件使用 v-track-event.someEvent:custom
```html
<button v-track-event.click="'category, action''"></button> // 统计click事件

<button v-track-event="'category, action'"></button> // 统计click事件简写

<input v-track-event.keypress="'category, action'"> // 统计keypress事件

<input v-track-event.someEvent:custom="'category, action'"> // 统计someEvent事件,someEvent是自定义事件

<button v-track-event="'category, action, opt_label, opt_value'"><button> // 以字符串传递参数

<button v-track-event="{category:'event', action:'click'}"></button> // 以对象字面量传递参数

```

#### 2. v-track-pageview 指令用于统计虚拟PV

使用指令 track-pageview 统计虚拟 PV ，一般可以配合 v-show 或 v-if 来统计局部动态视图的 PV。

可通过逗号分隔的字符串或对象字面量传递参数，以字符串传递时请注意参数顺序，可参考trackPageview API 用法

``` html
<div v-show="show" v-track-pageview="'/bar'">bar</div> //  跟踪 v-show 绑定元素的虚拟pv

<div v-if="show" v-track-pageview="'/foo'">foo</div> // 跟踪 v-if 绑定元素的虚拟pv

<div v-track-pageview="'/tar'"></div> // 以字符串指定受访页面和来源

<div v-track-pageview="{pageURL:'/zoo''}"></div> // 以对象字面量指定受访页面和来源
```

<a href="https://github.com/minlingchao1/vue-ba/">参考文档</a>