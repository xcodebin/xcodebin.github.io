# DataGrid
> 创建一个常规通用的数据表格

```html
<div id="userDataGrid"></div> //构建html
```
```javascript
userDataGrid = $("#userDataGrid").datagrid({ //构建js
    url:'../../behind/user/userPage',
    title:'用户信息',
    height:530,
    pagination:'max',
    lineNum:'left',
    cumNum:true,
    funToolbar:[ # 功能按钮
      {text:'新增',icon:'plus',handler:function(opts){...}},
      {text:'删除',icon:'trash outline',selectRow:true,handler:function(opts){...}},
      {text:'注销',icon:'remove user',selectRow:true,handler:function(opts){...}},
      {text:'恢复',icon:'add user',selectRow:true,handler:function(opts){
        var e = opt.e;
        var $ele = opts.$ele;
        ...
      }}
    ],
    columns:[ // 列描述
          {field:'usrPersonLogo',sort:false},
          {field:'usrPersonLogo',sort:false},
          {title:'专业/系/学科',field:'usrProfessional',orderBy:'asc',edit:true}
    ],
    onDblClickCell:function(){ //初始化监听回调方法
      ...
    }
})
```


# attribute 属性
```javascript
    var userDataGrid = $("#userDataGrid").datagrid()
    var ele = userDataGrid.ele // 获取到表格对象的jq节点对象了
    var pageNum = userDataGrid.page.pageNum // 获取到表格对象的当前页号码
```
* $ele 表格对象jq节点对象
* $parEle 表格对象父节点
* defaults 默认参数对象
* opt 对象实际参数对象
* page 分页对象 其中包括页码 当前页数据等
    * pageNum 当前页号码
    * pageSize 当前分页大小
    * startRow 开始记录数
    * endRow 结束记录数
    * pages 总共多少页
    * total 总共多少数据
    * prePage 前一页页码
    * nextPage 下页页码
    * isFirstPage 是否是第一页
    * isLastPage 是否是最后一页
    * list 数据数组集合
* loaderQuery 查询参数集合(自读状态)
* $title 标题头
* $titleSearchDropdown 标题头查询组件控件
* $titleHanderButtonFn 标题头按钮组对象
* $titleColumnsShowDropdown 标题头显示列下拉控件
* $titleSearchInp 标题头检索查询input栏
* $titleRefreshBut 标题头刷新按钮
* $titleClearSearchBut 标题头查询清空按钮
* $pageMenu 分页栏
* $pageDropJump 跳转分页控件
* $pageToolbar 分页尺码栏
* $pageSizeDrop 页尺码下拉控件
* $toolbar 检索工具栏
* $searchDropdown 检索下拉控件
* $columnsShowDropdown 显示列下拉控件
* $columnCheckbox 下拉全选框
* $refreshBut 刷新按钮
* $searchInp 检索查询input栏
* $clearSearchBut 查询清空按钮
* $theadTh 表格标题栏单元格集合
* $thCheckbox 表格全选框
* $handerButtonFn 头部栏按钮组对象
* $rowAll 数据行jq对象
* $selRowArr 数据行选中行jq对象
* sort 排序字段
* orderby 排序方向
* rowsArr 选择行数据
* rowsArrKey 选中行号
* loadLock 加载数据上锁
* loadLockTimeout 加载数据上锁定时器


# options 配置
```javascript
    $("#userDataGrid").datagrid({url:'../../behind/user/userPage'})
```
* url(str): table请求路径
* queryParams(obj): 数据参数 {name: 'easyui',subject: 'datagrid'}
* loader(fn(query请求参数)):请求之前调用方法,返回对象将会作为查询条件的追加,返回参数对象进行查询 返回false将终止查询
* loadFilter(fn(data):加载成功后可对数据进行调整/过滤最终返回数据
* data(array[obj]):静态数据 eg:[{f1:'value11', f2:'value12'},{f1:'value21', f2:'value22'}]
* height(num): 表格高度单位px def:0 自动最大高  大于0的整数 为手动表格高 与maxHeight 只能二选一
* maxHeight(num): 表格最大高度 此项为自适应高度.def :0 关闭自适应高度 大于0的整数为最大极限高度 与height只能二选一
* hoverRow(bool): hover行效果 def:true开启 false 关闭
* compact(bool): 表格采用紧凑型 def:false非紧凑型 true 紧凑型 当无高控件时才起效
* showHeader(bool): 显示表头 def:true  false不显示
* striped(bool):是否采用条纹 def:true 采用 false不采用
* initLoad(bool):初始化是否载入数据 def:true 载入数据 false 不初始化载入数据
* alignHandle(str):整体样式 一般是对齐 def:center居中 left居左 right居右 其他值为class(多个用空格分开) 优先级小于columns的align
* headStyle(str):头部样式class 多个用空格隔开
* rowAllStyle(str):行统一样式class 多个用空格隔开 优先级小于rowStyler 注意class的权重级
* rowStyler(fn(row)):行格式回调 优先级小于columns的styler 返回str则为直接样式eg:'color:#fff;'返回对象格式为eg:{className:'r1', style:'color:#fff'}
* loadLockTime(num):加载数据超时设置 单位毫秒 def:8000 毫秒
* title(str/fn):标题栏内容,str:标题名称 fn为返回的html结构
* titleClass(str):标题栏class 多个用空格隔开
* titleToolbarShow(bool):是否展示标题栏工具栏 def:false 不显示 true显示
* titleSearchInpShow(bool):是否显示标题头搜索栏 def:true 显示 false 不显示
* titleRefreshBut(bool):是否显示标题头刷新按钮 def:true 显示 false 不显示
* titleColumnsShow(bool):是否显示标题头列展示下拉 def:true 展示 false 不显示
* titleSearchToolbar(fn):标题头查询组件结构, fn则以返回html代码段为li结构html字符串
```
    eg:
        <li>
            <div class="am-btn-block search-if" data-am-dropdown>
                <button class="am-btn am-btn-default am-btn-block am-dropdown-toggle" data-am-dropdown-toggle>是否激活 <span class="am-icon-caret-down"></span></button>
                <ul class="am-dropdown-content">
                    <li><a href="javascript:;">激活</a></li>
                    <li><a href="javascript:;">未激活</a></li>
                    <li class="am-divider"></li>
                    <li><a href="javascript:;">取消</a></li>
                </ul>
            </div>
        </li> ....循环
```
* titleFunToolbar(array[obj]):标题头功能菜单结构,obj则为标准样式 fn则以返回html代码段为结构
    * obj:按钮属性
        * text(str):显示文本
        * icon(str):图标class
        * selectRow(bool):需要选中数据才能使用 def:false 无数据选中要求 true 只有选中数据才能使用
        * hide(bool):隐藏按钮 def:false 不隐藏 true隐藏 注意:当且仅当本身和后面的按钮都为隐藏时生效
        * handler(fn(事件e,$ele触发js对象)):为点击事件方法
* toolbarShow(bool):是否显示工具栏 def:true 显示  false 不显示
* searchInpShow(bool):是否显示搜索栏 def:true 显示 false 不显示
* refreshBut(bool):是否显示刷新按钮 def:true 显示 false 不显示
* columnsShow(bool):是否显示列展示下拉 def:true 展示 false 不显示
* searchToolbar(fn):查询组件结构, fn则以返回html代码段为li结构html字符串
```
    eg:
        <li>
            <div class="am-btn-block search-if" data-am-dropdown>
                <button class="am-btn am-btn-default am-btn-block am-dropdown-toggle" data-am-dropdown-toggle>是否激活 <span class="am-icon-caret-down"></span></button>
                <ul class="am-dropdown-content">
                    <li><a href="javascript:;">激活</a></li>
                    <li><a href="javascript:;">未激活</a></li>
                    <li class="am-divider"></li>
                    <li><a href="javascript:;">取消</a></li>
                </ul>
            </div>
        </li> ....循环
```
* funClass(str):功能菜单结构 class样式 def:mini compact basic,自定义多个中间空格
* funToolbar(array[obj]/fn):功能菜单结构,obj则为标准样式 fn则以返回html代码段为结构
* obj:按钮属性
  *  text(str):显示文本
  *  icon(str):图标class
  *  class(str):补充class样式 将会覆盖 具体可使用自定义 或 semantic已有的
  *  selectRow(bool):需要选中数据才能使用 def:false 无数据选中要求 true 只有选中数据才能使用
  *  hide(bool):隐藏按钮 def:false 不隐藏 true隐藏 注意:当且仅当本身和后面的按钮都为隐藏时生效
  *  handler(fn(事件e,$ele触发js对象)):为点击事件方法
* fn:返回值
```
     <button type="button" class="am-btn am-btn-default" onclick="(new Obj()).fn(**)"><span class="am-icon-plus"></span> 新增</button>
     ....循环
```
* loadMsg(str):加载时描述文字 def:加载稍等..  当为null时无加载显示
* loadPrompt(bool):是否显示加载过度 def:true显示 false不显示
* pagination(str):是否需要分页栏 def:'max' 显示全尺寸分页 min显示小尺寸  hide 不显示
* pageSize(num):默认分页大小 def:15
* pageList(Array[num]):分页选择值 def:[15,30,100,200]
* selectWay(str):选择方式 def:multi 可多选  radio只能单选 disable 全部无法选择
* selectCancel(bool):是否可取消最后一行取消 def:true 可以取消 false 不能取消
* disSelect(fn(row 行数据,rowId 行id)):根据方法判断是否屏蔽某行是否可选中 返回false 无法选中  否则均和选中
* lineNum(str/bool):是否显示行号 def:false 不显示 'left'表格左侧显示 'right'表格右侧显示
* cumNum(bool):是否累计 def:false 不累计  true累计计数
* numAllStyle(str): 行号单元格统一样式class 多个用空格隔开 优先级小于styler 参考rowAllStyle
* checkbox(str/bool):是否显示行复选框 def:'left' 表格左显示 'right'表格右显示 false 不显示
* checkAllStyle(str):复选单元格统一样式class 多个用空格隔开 优先级小于styler 参考rowAllStyle
* columns(array[obj]) : 表头设置 可在html结构中构造 datarid插件将会进行扫描 定义为data-opts="title:'标题',field:'title'"
    * obj: 列属性
        * title(str):显示标题
        * field(str):显示列数据
        * sort(bool):是否可排序 def:true 开启  false关闭
        * orderBy(str):排序方式 仅支持单一列排序 def:null 不进行初始化排序 asc低到高 desc高到低排序
        * width(num):列宽度 单位px def自动自适应  大于0的整数 为手动表格高
        * hidden(str):隐藏状态 def:show非隐藏 hide隐藏 disa 消失(无法在列选型中展示出来,一般用以存储数据)
        * formatter(fn(column单元格数据,row行记录)):内容数据回调方法
        * allStyle(str):单元格统一样式class 多个用空格隔开 优先级小于styler 参考rowAllStyle
        * styler(fn):单元格样式回调 参考rowStyler
        * edit(bool):是否可编辑设置 def:false不可编辑 true可编辑
        * editVali(fn(row行数据,cell数据)):验证是否可编辑 返回false 不可编辑 否则为可编辑
        * editConfirm(fn(index行号从0开始,row行数据,field单元格数据标示,naVal历史值,newVal新值)):编辑后保存回调方法 返回true将恢复格式
        * editCancel(fn(index行号从0开始,row行数据,field单元格数据标示,naVal历史值)):编辑后取消回调方法  返回true将恢复格式
* onSeatchToolbar(fn):查询组件构造成功后 回调
* onTitleSeatchToolbar(fn):标题头查询组件构造成功后 回调
* onGridReady(fn):datagrid初始化后 回调
* onBeforeLoad(fn):datagrid加载之前 回调 相比load load主要是追加查询参数用
* onLoadResults(fn(obj{data,err})):datagrid得到数据后 回调 不管是否成功或者失败 data是标准的分页对象
* onLoadSuccess(fn(obj{data})):成功加载后 回调
* onLoadError(fn(obj{error}):加载失败后 回调
* onRowReady(fn):表格数据填充完成后 回调
* onSelectClear(fn):清空查询按钮点击 回调
* onSelectRow(fn(index行号从0开始,row行数据)):单击选中行后 回调
* onClickRow(fn(index行号从0开始,row行数据)):单击行后 回调
* onDblClickRow(fn(index行号从0开始,row行数据)):双击行后 回调
* onClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):点击单元格 回调
* onDblClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):双击单元格 回调
* onBeforeSortColumn(fn(sort,order)):列排序前 回调
* onBeforeEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态前 回调
* onBeginEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态 回调
* onEndEdit(fn(index行号从0开始,row行数据,field单元格数据标示,setVal设置值)):结束编辑状态后 回调

# Methods 方法
通过datagrid对象调用对应的方法
```javascript
   var userDataGrid = $("#userDataGrid").datagrid()
   userDataGrid.getSelected({index:[1,2]})
```
* tableHeadToTop() 滚动条置顶并刷新表头
* getRow(index(num/arr[num]/arr[Obj(fieldName:fieidVal)])) 获取row数据对象
* getSelected(index(num/arr[num]/null)) 获取选中的行数据 null获取全部值数组  下标从0开始
* getSelIndex() 获取选中的行数据索引值
* getParentRow(jqEle) 根据jq节点获取上一级行row数据对象和index索引号,返回对象,格式为{index:8,row:Obj}
* clearSelect() 清空选中行
* setUrl(url) 设置url地址
* load(paramsObj) 加载数据 eg:$.datagrid('load',{code: '01',name: 'name01'});
* reload() 刷新当前页数据
* loadData(page刷新第几页) 加载新数据,老数据将全部清除 page为空时刷新第一页
* selectAll() 全选
* selectAnyRow(index:num/array[num]/array[Obj(fieldName:fieidVal)]) 选中某行 行号 0为第一行 或者根据 健值对
* unselectAnyRow(index:num/array[num]/array[Obj(fieldName:fieidVal)]) 清除某些行 行号 0为第一行 或者根据 健值对
* saveEdit() 保存编辑并恢复不可编辑
* cancelEdit() 撤销编辑并恢复不可编辑
* getEditors() 获取编辑状态的Cell单元格对象 返回[{$cell:jq节点对象,value:值}]
* updateRow 更新row行数据 $.datagrid('updateRow',{index: 2,row: {name: 'new name',note: 'new note message'}})
* appendRow 追加row行数据 $.datagrid('appendRow',{rows:[{name: 'new name',age: 30,note: 'some messages'}]})
* insertRow  插入row行到某一行 $.datagrid('insertRow',{index: 1,rows: {name: 'new name',age: 30,note: 'some messages'}})
* deleteRow(index(null/num/arr[num]/arr[Obj(fieldName:fieidVal)])) 删除某一行 不传或传入空值则删除选中行
* clearData 清空row
* showColumn(index(arr[str field名称]) 显示列  str为field名称
* hideColumn(index(arr[str field名称]) 隐藏列  str为field名称
* sortColumn(null/sort 排序字段,orderby 排序方向) 依据某列进行排序 null则清空排序 $.datagrid('sort', {sort: '排序field字段名',orderby: '排序方向 desc倒序 asc 正序'})
* setTitle({title:str}) 设置表头标题文本
* getTitle() 获取表头标题文本

# Events 事件
通过datagrid对象进行监听方法注册,从而捕获事件回调方法
```javascript
    var userDataGrid = $("#userDataGrid").datagrid()
    userDataGrid.onLoadResults(function(obj){
       data = obj.data;
       err = obj.err
       .....
    })
```
* onBeforeLoad(fn):datagrid加载之前 回调 相比load load主要是追加查询参数用
* onLoadResults(fn(obj{data,err})):datagrid得到数据后 回调
* onLoadSuccess(fn(obj{data})):成功加载后 回调
* onLoadError(fn(obj{error}):加载失败后 回调
* onRowReady(fn):表格数据填充完成后 回调
* onSelectClear(fn):清空查询按钮点击 回调
* onSelectRow(fn(index行号从0开始,row行数据)):单击选中行后 回调
* onClickRow(fn(index行号从0开始,row行数据)):单击行后 回调
* onDblClickRow(fn(index行号从0开始,row行数据)):双击行后 回调
* onClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):点击单元格 回调
* onDblClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):双击单元格 回调
* onBeforeSortColumn(fn(sort,order)):列排序前 回调
* onBeforeEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态前 回调
* onBeginEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态 回调
* onEndEdit(fn(index行号从0开始,row行数据,field单元格数据标示,setVal设置值)):结束编辑状态后 回调
