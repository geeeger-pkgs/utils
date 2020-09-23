# `lazyload`

> 面向现代浏览器的图片懒加载工具

## Usage

```
// commonjs引入方式
const Lazyload = require('@geeeger/lazyload');

// umd引入方式
// 配置config.js
// requirejs.config({path: {'lazyload': '脚本所在地址'}})
// define('你的模块名', ['lazyload'], function (Lazyload) {})


// 默认配置，可以
//const defaultOptions = {
//    attributeSrc: 'data-src',
//    attributeSrcset: 'data-srcset',
//    selector: '.qiefe-lazyload',
//}
const lazyload = Lazyload.create({
    // 任意可选配置
})

// html模板
// <div data-src="abc.png"></div>
// <img data-src="abcd.png">

lazyload.start();

// 若append更多模板内容

lazyload.start();

// 若动态替换了当前页面内容
lazyload.stop();

page.html(newdata);

lazyload.start();


// 数据全部读取完毕，删除lazyload监听（不可再使用）
lazyload.destory();

```
