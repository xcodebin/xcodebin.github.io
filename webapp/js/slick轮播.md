slick轮播插件
=====

### API & Demo 网址
[http://kenwheeler.github.io/slick](http://kenwheeler.github.io/slick)

### 基本使用方法
** 引入文件 **

```html
<link rel="stylesheet" type="text/css" href="../slick.css"/>
<link rel="stylesheet" type="text/css" href="../slick-theme.css"/>
```
```html
<script type="text/javascript" src="../slick.min.js"></script>
```

** 一个简单的轮播示例 **

```html
<html>
  <head>
  <title>My Now Amazing Webpage</title>
  <link rel="stylesheet" type="text/css" href="slick/slick.css"/>
  <link rel="stylesheet" type="text/css" href="slick/slick-theme.css"/>
  </head>
  <body>

  <div class="your-class">
    <div>your content</div>
    <div>your content</div>
    <div>your content</div>
  </div>

  <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="slick/slick.min.js"></script>

  <script type="text/javascript">
    $(document).ready(function(){
      $('.your-class').slick({
        autoplay: true
      });
    });
  </script>

  </body>
</html>
```

### Package Managers
```shell
# Bower
bower install --save slick-carousel

# NPM
npm install slick-carousel
```

### 常用settings
* autoplay 是否允许自动播放，默认为true
* autoplaySpeed 自动播放时间间隔，默认为3000
* dots 是否出现轮播指示点，默认为false
* dotsClass 设置指示点的class名称，默认为'slick-dots'
* draggable 设置是否允许鼠标拖拽滚动，默认为'true'
* arrows 是否出现左右箭头，默认为'true'
* slidesToShow 一屏显示几张图片，默认为'1'
* slidesToScroll 一次滚动几张图片，默认为'1'
* swipe 是否允许移动端滑动，默认为'true'
* vertical 设置竖直方向轮播，默认为'false'

*settings使用示例*

```javascript
$('.autoplay').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});
```

### 常用events
* afterChange 轮播滚动后的回调事件
* beforeChange 轮播滚动前的回调事件
* destroy 当轮播被取消时的事件
* swipe 滑动/拖拽轮播时触发事件
* init 轮播初始化时的事件

*events使用示例*

```javascript
// On swipe event
$('.your-element').on('swipe', function(event, slick, direction){
  console.log(direction);
  // left
});

// On before slide change
$('.your-element').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  console.log(nextSlide);
});
```

### 常用methods
* slick 初始化轮播
* unslick 取消轮播
* slickNext 触发下一个轮播
* slickPrev 触发上一个轮播
* slickPause 暂停自动播放
* slickAdd 添加一屏
* slickRemove 删除一屏
* slickCurrentSlide 返回当前轮播的index

*methods使用示例*

```javascript
// Add a slide
$('.your-element').slick('slickAdd',"<div></div>");

// Get the current slide
var currentSlide = $('.your-element').slick('slickCurrentSlide');
```

### 浏览器兼容
slick兼容ie8+及chrome，firefox，safari等现代浏览器。