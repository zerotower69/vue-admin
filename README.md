# vue-admin
> 手摸手，实现一个Vue的后台管理系统
> 

## 脚本说明
```shell

```

## 项目说明
> 大部分照搬了花裤衩大佬的[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin/)
通过阅读文档和它的博客结合自己以前开发碰到的问题，改动了一部分，
> 虽然照搬很多，但是我大多数也是本着能自己敲就自己敲的原则，重在理解，了解项目的整个组织结构以及
> 功能的划分。
> 
> 值得说明的一点是:单元测试非常重要，最好还是一口气写完组件的核心功能来一个单元测试看该执行
> 的方法执行了没有，用户交互效果是否复合预期，至于css样式我觉得倒是可以慢慢优化。
## 项目使用到的插件
> 本项目所有的插件还是说明一下,以后再使用node的脚手架开发就知道哪些
> 插件常用或者必须了。


## 项目的文件路径

```shell
├─api   #全局api
├─assets  #字体图片等静态资源
├─components  
├─directive
├─filters
├─icons
├─lang  #语言
├─mock
├─router
├─store
├─styles
├─utils  #公共方法
├─vendor  #公共的vendor
└─views

```

## 关于使用icon的问题
> 由于使用了element-ui  我们需要判断icon是官方自带的el-icon-*
>还是自己配置的icon  (建议从alibaba icon处获取)

## 对vue组件进行单元测试
>  期望自己创建的Vue组件达到某个效果，每次去使用测试有点不靠谱，开发效率也底下，
> 不妨使用 Vue.js官方推荐的[单元测试库](https://vue-test-utils.vuejs.org/zh)
> 吧。


## 使用scss

> sass+sass-loader  无需配置  不要使用node-sass,特别无语，几乎是100%报错。

## 使用Mock模拟后台数据
> 做本管理系统,少不了从后台拿数据，但是呢，写后台几乎都能与这个项目媲美了，
> 还是自己定义api,使用mock模拟后端传来的数据格式,方便使用。同时，通过
> 这样的方式也是能定义后端所有的api接口和业务划分，之后写后台也能方便不少。


## 报错修复

### 1.单元测试时组件引入错误
```shell
yarn add babel-plugin-transform-es2015-modules-commonjs -D
```
在.babelrc
```json
"plugins": ["transform-es2015-modules-commonjs"]
```
