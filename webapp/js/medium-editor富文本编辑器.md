# medium-editor-demo
A simple demo for medium-editor.

**API:**
[https://github.com/yabwe/medium-editor](https://github.com/yabwe/medium-editor)

## 简单教程
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>demo</title>
	<link rel="stylesheet" href="bower_components/medium-editor/dist/css/medium-editor.min.css">
	<link rel="stylesheet" href="bower_components/medium-editor/dist/css/themes/default.css">
</head>
<body>
<br><br>
<div class="editor"></div>
<script src="bower_components/medium-editor/dist/js/medium-editor.min.js"></script>
<script>
	var editor = new MediumEditor('.editor');
</script>
</body>
</html>
```