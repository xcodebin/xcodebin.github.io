# jquery-file-upload
> jquery-file-upload上传插件与semantic-ui结合

## API网址
[https://github.com/blueimp/jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload)

## 简单教程
*引入css和js文件*

```html
<link rel="stylesheet" href="bower_components/semantic/dist/semantic.min.css">

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js"></script>
<script src="bower_components/blueimp-file-upload/js/jquery.iframe-transport.js"></script>
<script src="bower_components/blueimp-file-upload/js/jquery.fileupload.js"></script>
<script src="bower_components/semantic/dist/semantic.min.js"></script>
<script src="file-upload.js"></script>
```

*加入dom节点*

```html
<div class="upload">
	<button class="ui blue button">上传文件</button>
	<input id="fileupload" type="file" name="files[]" multiple />
	<table class="upload-table"></table>
</div>
```

*加入js代码*

```javascript
$('.upload button').uploadFile({
	url: '//jquery-file-upload.appspot.com/',
	dataType: 'json',
	maxFileSize: 10000000,
	add: function(){
		console.info('添加文件回调函数');
	},
	done: function(){
		console.info('上传文件回调函数');
	}
});
```

## 参数：
* url: 文件传输网址
* dataType: 数据类型，例如json
* maxFileSize: 最大文件大小，以byte为单位
* add: function(){} 文件选择完成后的回调函数
* done: function(){} 文件上传完成后的回调函数