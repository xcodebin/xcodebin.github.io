jstree树插件
======

### 官方Api网址
[https://www.jstree.com/api/](https://www.jstree.com/api/)
[https://github.com/vakata/jstree](https://github.com/vakata/jstree)

### 简单使用
1.引入jquery(1.9.1+)，引入一种jstree的主题，引入jstree的js源文件

```html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jstree/3.0.9/themes/default/style.min.css" />

<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jstree/3.0.9/jstree.min.js"></script>
```

2.使用html创建一颗树

```html
<div id="container">
  <ul>
    <li>Root node
      <ul>
        <li>Child node 1</li>
        <li>Child node 2</li>
      </ul>
    </li>
  </ul>
</div>
<script>
$(function() {
  $('#container').jstree();
});
</script>
```

或者使用数组或json来构建树，正确的json格式如下：
`[ { "text" : "Root node", "children" : [ "Child node 1", "Child node 2" ] } ]`

```html
<div id="container"></div>
<script>
$(function() {
  $('#container').jstree({
    'core' : {
      'data' : [
        { "text" : "Root node", "children" : [
            { "text" : "Child node 1" },
            { "text" : "Child node 2" }
          ]
        }
      ]
    }
  });
});
</script>
```

每个node的json参数有：

* id
* icon 节点的图标
* data 可以是任何你想加到节点上的数据，不影响外观
* state
	* selected 被选中状态
	* opened 打开状态
	* disabled 禁用状态
	* checked 需要附加checkbox插件，复选框被选中状态
	* undetermined 需要附加checkbox插件，懒加载时未被载入的状态
* li_attr 列表项的值
* a_attr 链接的值

参数使用的示例

```html
<div id="container"></div>
<script>
$(function() {
  $('#container').jstree({
    'core' : {
      'data' : [
          {
              "text" : "Root node",
              "state" : {"opened" : true },
              "children" : [
                  {
                    "text" : "Child node 1",
                    "state" : { "selected" : true },
                    "icon" : "glyphicon glyphicon-flash"
                  },
                  { "text" : "Child node 2", "state" : { "disabled" : true } }
              ]
        }
      ]
    }
  });
});
</script>
```

### 使用AJAX和lazy loading来构建树
示例

```html
<div id="container"></div>
<script>
$(function() {
  $('#container').jstree({
    'core' : {
      'data' : {
        "url" : "//www.jstree.com/fiddle/?lazy",
        "data" : function (node) {
          return { "id" : node.id };
        }
      }
    }
  });
});
</script>
```
服务端响应

```json
[{
  "id":1,"text":"Root node","children":[
    {"id":2,"text":"Child node 1","children":true},
    {"id":3,"text":"Child node 2"}
  ]
}]
```

### 使用回调函数

```html
<div id="container"></div>
<script>
$(function() {
  $('#container').jstree({
    'core' : {
      'data' : function (node, cb) {
        if(node.id === "#") {
          cb([{"text" : "Root", "id" : "1", "children" : true}]);
        }
        else {
          cb(["Child"]);
        }
      }
    }
  });
});
</script>
```

常用events
-----

* init 初始化树
* loading 载入时
* loaded 第一次载入完成
* ready 所有节点完成载入
* before_open 节点打开前
* after_open 节点打开后
* close_node 节点关闭后
* hover_node 当一个节点被hover时

官方api提供的events很多，具体参考[https://www.jstree.com/api/#/?q=event](https://www.jstree.com/api/#/?q=event)

常用插件
-----
使用一下插件能增加大量功能

* checkbox
* contextmenu
* dnd
* massload
* search
* sort
* state
* types
* unique
* wholerow

插件API [https://www.jstree.com/plugins/](https://www.jstree.com/plugins/)