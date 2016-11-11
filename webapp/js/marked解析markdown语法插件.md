# marked
> markdown语法的解析编译插件

## API网址
[https://github.com/chjj/marked](https://github.com/chjj/marked)

## 基本教程
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
  <script src="lib/marked.js"></script>
</head>
<body>
  <div id="content"></div>
  <script>
    document.getElementById('content').innerHTML =
      marked('# Marked in browser\n\nRendered by **marked**.');
  </script>
</body>
</html>
```

## 基本语法
**marked(markdownString [,options] [,callback])**

## options
* highlight: 高亮代码块
	* code: 需要渲染的代码块
	* lang: 代码块的语言
	* callback: 当使用异步高亮时的回调函数
* renderer: 用来生成自定义标签
* gfm: 允许github偏好的markdown写法
* sanitize: 默认为false，忽略导出的html标签