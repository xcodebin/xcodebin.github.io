# DropTree
> 创建一个常规通用的下拉树插件

```html
    <div ids="bb"></div> //构建html
```
```javascript
    $dropTreeObj = $("#aa [ids='bb']")
    $dropTreeObj = $dropTreeObj.droptree({ //举例初始化 
        url:'../../agency/getAgencyTree', //举例 options 配置用法
        onLoadReady:function(opts){ //非必须 举例回调事件用法
            data = opts.data
        }
    });
    $dropTreeObj.selectNode('1234') //举例 Methods 方法用法
    $dropTreeObj.onDropReady(function(){  //举例 Events 事件用法
        console.log("测试回调方法")
    })
    selectAll = $dropTreeObj.selectArr //举例 attribute 属性用法
```


# attribute 属性
* $ele 下拉树组件对象jq节点对象
* $treeList 树列表jq节点对象
* $defInfo 默认提示节点
* selectArr 选择节点数据


# options 配置
* url(str):获取数据地址  当为null时无加载显示  url与data只有一个会生效
* data(str):静态数据初始化  结构为json
* initLoad(bool):初始化是否载入数据 def:true 载入数据 false 不初始化载入数据
* queryParams(obj): 数据参数 {name: 'easyui',subject: 'datagrid'}
* loader(fn(query请求参数)):请求之前调用方法,返回对象将会作为查询条件的追加,返回参数对象进行查询 返回false将终止查询
* loadFilter(fn(data)):加载成功后可对数据进行调整/过滤最终返回数据 data为json格式
* selectWay(str):选择方式 def: radio只能单选  multi 可多选
* multiUnitText(str):多选时描述的单位 def:"个" 如:"已选 1 个机构"此时 multiUnitText的值就是"个机构"
* promptText(str):输入框空值提示文本 def:"请选择"
* selectText(str):检索框空值提示文本 def:"搜索信息"
* defValueId(array[str]):默认值选中 传入id值数组
* maxHeight(num):最大高度,def:200 px
* openAllNode(bool):加载完展开全部节点 def:false 不展开 true展开
* onDropReady(fn):下拉组件初始化完成后 回调
* onLoadReady(fn(data加载到的数据json)):树数据加载完成后 回调
* onSelectNode(fn(node节点数据,selectArr全部选中信息)):单击选中节点后 回调 返回tree node对象
* onUnSelectNode(fn(node节点数据,selectArr全部选中信息)):单击取消选中节点后 回调 返回tree node对象
* onChangeSelectNode(fn(node节点数据,selectArr全部选中信息)):改变选中节点后 回调 返回tree node对象
* onShowDrop(fn):展示下拉树前回调
* onHideDrop(fn):隐藏下拉树前回调
* onClearSelect(fn)清空选择回调
      
      
# Methods 方法
* setUrl(url):设置获取数据url地址
* setData(data): 设置静态数据初始化 结构为json
* showDrop(): 展示下拉树
* hideDrop(): 隐藏下拉树
* selectNode(nodeId:str/array[str]): 根据树节点id 选中节点
* unSelectNode(nodeId:str/array[str]): 根据树节点id 取消选中节点
* clearSelect(): 清空选择
* ?addDate(data): 添加数据至tree结构  json结构str数据
* loadTree(params 参数信息):加载树信息 params 结构如下{name: 'easyui',subject: 'datagrid'}
* getSelects():获取选中节点数据对象 返回array[obj] obj包含:"id"节点id "parent"父节点id "text"文本名称

# Events 事件
* onDropReady(fn):下拉组件初始化完成后 回调
* onLoadReady(fn(data加载到的数据json)):树数据加载完成后 回调
* onSelectNode(fn(node节点数据,selectArr全部选中信息)):单击选中节点后 回调 返回tree node对象
* onUnSelectNode(fn(node节点数据,selectArr全部选中信息)):单击取消选中节点后 回调 返回tree node对象
* onChangeSelectNode(fn(node节点数据,selectArr全部选中信息)):改变选中节点后 回调 返回tree node对象
* onShowDrop(fn):展示下拉树前回调
* onHideDrop(fn):隐藏下拉树前回调
* onClearSelect(fn)清空选择回调
