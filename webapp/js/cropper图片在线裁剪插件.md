# Crop 图片裁剪插件

## API 网址
[https://github.com/fengyuanchen/cropper](https://github.com/fengyuanchen/cropper)

## 基本教程
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>demo</title>
	<link  href="/path/to/cropper.css" rel="stylesheet">
</head>
<body>
<div>
  <img id="image" src="picture.jpg">
</div>

<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/cropper.js"></script>
<script type="text/javascript">
$('#image').cropper({
  aspectRatio: 16 / 9,
  crop: function(e) {
    // Output the result data for cropping image.
    console.log(e.x);
    console.log(e.y);
    console.log(e.width);
    console.log(e.height);
    console.log(e.rotate);
    console.log(e.scaleX);
    console.log(e.scaleY);
  }
});
</script>
</body>
</html>
```

## options
* viewMode: 视图模式，默认为0
* aspectRatio: 宽长比例，例如16/9代表16:9的宽高比
* data: 截取的数据
* responsive: 窗体大小改变时，重新截取图片
* modal: 是否显示幕布
* guides: 是否显示选框的虚线边框
* movable: 是否可以移动
* rotatable: 是否允许翻转
* scalable: 是否允许拉伸
* zoomable: 是否允许缩放
* cropstart: 开始截取
* corpmove: 选框移动
* cropend: 截取结束

## methods
* crop(): 手动显示选框
* reset(): 重置选框
* clear(): 清除选框
* replace(): 替换图片路径
* enable(): 允许选取
* disable(): 不允许选取
* destroy(): 销毁选框
* move(x, [y]): 往x,y轴移动指定距离
* moveTo(x, [y]): 移动到x,y轴的指定位置
* zoom(): 缩放指定数值
* zoomTo(): 缩放到指定数值
* rotate(): 旋转指定数值
* rotateTo(): 旋转到指定数值
* scale(): 拉伸指定数值
* scaleTo(): 拉伸到指定数值
* getData(): 获取数据，包括x,y,width,height,rotate,scaleX,scaleY
* setData(): 设定数据
* getCroppedCanvas([options]): 获得截取后的图片，并展现在canvas中

## events
* build.cropper: 截取开始前，图片载入后触发
* built.cropper: 截取结束后触发
* cropstart.cropper: 截取开始触发
* cropmove.cropper: 选区移动触发
* cropend.cropper: 截取结束触发
* zoom.cropper: 缩放触发

## 浏览器兼容
Chrome (latest)
Firefox (latest)
Safari (latest)
Opera (latest)
Edge (latest)
Internet Explorer 8+