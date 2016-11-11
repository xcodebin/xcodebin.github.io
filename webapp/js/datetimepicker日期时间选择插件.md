# datetimepicker
A simple bootstrap datetimepicker.

[https://github.com/smalot/bootstrap-datetimepicker](https://github.com/smalot/bootstrap-datetimepicker)

> 修复BUG

**原文：**

```javascript
this.defaultTimeZone=(new Date()).toString().split("(")[1].slice(0,-1);
```

**改为：**

```javascript
this.defaultTimeZone='GMT '+(new Date()).getTimezoneOffset()/60
```


## 简单示例

```html
<input ids="beginRegisDate" size="16" type="text" value="2012-06-15 14:45" class="form_datetime" />
```

> datepicker

```javascript
$("[ids='beginRegisDate']").datetimepicker({
    format: 'yyyy-mm-dd',
    language:  'zh-CN',
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    minView:2
});
```

> datetimepicker

```javascript
$("[ids='beginRegisDate']").datetimepicker({
    format: 'yyyy-mm-dd hh:ii',
    language:  'zh-CN',
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1
});
```