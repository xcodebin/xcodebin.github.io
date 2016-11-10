# About: 数据表格插件
# Other:
# Created: Xiaolong WU on 16/5/15 下午10:01.
# Editored:
# VersionHistory:
#   V16.04.26  完成插件 进行优化和完善
#   V16.04.06  初始化构造
# Dependencies:
#   jquery  ^2.2.2
#   semantic ^2.1.8
#   malihu-custom-scrollbar-plugin ^3.1.3
#   jquery.floatThead 1.4.0
#   underscore  ^1.8.3
# TODO:
#   1 将查询控件改为支持在html中书写
#   2 加入定时刷新
#   4 加入进度显示
#   7 加入单元格点击引导效果
#   9 静态数据
#   10 静默刷新
#   12 提供最高级别的 禁用 和 恢复 按钮使用 api 方法
#   13 前端like搜索
#   14 静态数据分页,前端分页一并解决
#   15 提供按钮处html 随意编写api
#   17 开放选择复选框可以多选,及时是单选状态的datagrid

###
Api:
  $.datagrid() 初始化table return 当前datagrid 与节点绑定的对象1对1对象
  $.fn.datagrid.opts 全局参数设置

  主要事件发起流程:
    onSeatchToolbar ->onGridReady ->onBeforeLoad -> loader
    -> onLoadResults->onLoadSuccess/onLoadError ->loadFilter

  样式优先级 低->高:
  alignHandle(整体样式)->rowAllStyle(行统一样式)->rowStyler(行格式回调)
  ->allStyle(单元格统一样式)->headStyle(头部样式)->styler(单元格样式回调)

  attr 属性 可以console.log打印下即可知道对象属性和方法
      $ele 表格对象jq节点对象
      $parEle 表格对象父节点
      defaults 默认参数对象
      opt 对象实际参数对象
      page 分页对象 其中包括页码 当前页数据等
        pageNum 当前页号码
        pageSize 当前分页大小
        startRow 开始记录数
        endRow 结束记录数
        pages 总共多少页
        total 总共多少数据
        prePage 前一页页码
        nextPage 下页页码
        isFirstPage 是否是第一页
        isLastPage 是否是最后一页
        list 数据数组集合
      loaderQuery 查询参数集合(自读状态)
      $title 标题头
      $titleSearchDropdown 标题头查询组件控件
      $titleHanderButtonFn 标题头按钮组对象
      $titleColumnsShowDropdown 标题头显示列下拉控件
      $titleSearchInp 标题头检索查询input栏
      $titleRefreshBut 标题头刷新按钮
      $titleClearSearchBut 标题头查询清空按钮

      $pageMenu 分页栏
      $pageDropJump 跳转分页控件
      $pageToolbar 分页尺码栏
      $pageSizeDrop 页尺码下拉控件
      $toolbar 检索工具栏
      $searchDropdown 检索下拉控件
      $columnsShowDropdown 显示列下拉控件
      $columnCheckbox 下拉全选框
      $refreshBut 刷新按钮
      $searchInp 检索查询input栏
      $clearSearchBut 查询清空按钮
      $theadTh 表格标题栏单元格集合
      $thCheckbox 表格全选框
      $handerButtonFn 头部栏按钮组对象
      $rowAll 数据行jq对象
      sort 排序字段
      orderby 排序方向
      rowsArr 选择行数据
      rowsArrKey 选中行号
      $selRowArr 数据行选中行jq对象
      loadLock 加载数据上锁
      loadLockTimeout 加载数据上锁定时器


  opt 配置
      url(str): table请求路径
      queryParams(obj): 数据参数 {name: 'easyui',subject: 'datagrid'}
      loader(fn(query请求参数)):请求之前调用方法,返回对象将会作为查询条件的追加,返回参数对象进行查询 返回false将终止查询
      loadFilter(fn(data)):加载成功后可对数据进行调整/过滤最终返回数据
      data(array[obj]):静态数据 eg:[{f1:'value11', f2:'value12'},{f1:'value21', f2:'value22'}]
      height(num): 表格高度单位px def:0 自动最大高  大于0的整数 为手动表格高 与maxHeight 只能二选一
      maxHeight(num): 表格最大高度 此项为自适应高度.def :0 关闭自适应高度 大于0的整数为最大极限高度 与height只能二选一
      hoverRow(bool): hover行效果 def:true开启 false 关闭
      compact(bool): 表格采用紧凑型 def:false非紧凑型 true 紧凑型 当无高控件时才起效
      showHeader(bool): 显示表头 def:true  false不显示
      striped(bool):是否采用条纹 def:true 采用 false不采用
      initLoad(bool):初始化是否载入数据 def:true 载入数据 false 不初始化载入数据
      alignHandle(str):整体样式 一般是对齐 def:center居中 left居左 right居右 其他值为class(多个用空格分开) 优先级小于columns的align
      headStyle(str):头部样式class 多个用空格隔开
      rowAllStyle(str):行统一样式class 多个用空格隔开 优先级小于rowStyler 注意class的权重级
      rowStyler(fn(row)):行格式回调 优先级小于columns的styler 返回str则为直接样式eg:'color:#fff;'返回对象格式为eg:{className:'r1', style:'color:#fff'}
      loadLockTime(num):加载数据超时设置 单位毫秒 def:8000 毫秒
      title(str/fn):标题栏内容,str:标题名称 fn为返回的html结构
      tableInfo(str):表格信息描述
      titleClass(str):标题栏class 多个用空格隔开
      titleToolbarShow(bool):是否展示标题栏工具栏 def:false 不显示 true显示
      titleSearchInpShow(bool):是否显示标题头搜索栏 def:true 显示 false 不显示
      titleRefreshBut(bool):是否显示标题头刷新按钮 def:true 显示 false 不显示
      titleColumnsShow(bool):是否显示标题头列展示下拉 def:true 展示 false 不显示
      titleSearchToolbar(fn):标题头查询组件结构, fn则以返回html代码段为li结构html字符串
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
      titleFunToolbar(array[obj]):标题头功能菜单结构,obj则为标准样式 fn则以返回html代码段为结构
        obj:按钮属性
            text(str):显示文本
            info(str):描述信息
            icon(str):图标class
            class(str):补充class样式 将会覆盖 具体可使用自定义 或 semantic已有的
            attr(obj):补充更多属性给按钮,obj格式{"attr":"v1","attr2":"v2"},将会全部累加到属性
            selectRow(bool):需要选中数据才能使用 def:false 无数据选中要求 true 只有选中数据才能使用
            hide(bool):隐藏按钮 def:false 不隐藏 true隐藏 注意:当且仅当本身和后面的按钮都为隐藏时生效
            handler(fn(事件e,$ele触发js对象)):为点击事件方法

      toolbarShow(bool):是否显示工具栏 def:true 显示  false 不显示
      searchInpShow(bool):是否显示搜索栏 def:true 显示 false 不显示
      refreshBut(bool):是否显示刷新按钮 def:true 显示 false 不显示
      columnsShow(bool):是否显示列展示下拉 def:true 展示 false 不显示
      searchToolbar(fn):查询组件结构, fn则以返回html代码段为li结构html字符串
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
      funClass(str):功能菜单结构 class样式 def:mini compact basic,自定义多个中间空格
      funToolbar(array[obj]/fn):功能菜单结构,obj则为标准样式 fn则以返回html代码段为结构
        obj:按钮属性
            text(str):显示文本 不设置名称则为更多按钮的设置
            icon(str):图标class
            class(str):补充class样式 将会覆盖 具体可使用自定义 或 semantic已有的
            attr(obj):补充更多属性给按钮,obj格式{"attr":"v1","attr2":"v2"},将会全部累加到属性
            selectRow(bool):需要选中数据才能使用 def:false 无数据选中要求 true 只有选中数据才能使用
            hide(bool):隐藏按钮 def:false 不隐藏 true隐藏 注意:当且仅当本身和后面的按钮都为隐藏时生效
            handler(fn(事件e,$ele触发js对象)):为点击事件方法
        fn:返回值
            <button type="button" class="am-btn am-btn-default" onclick="(new Obj()).fn(**)"><span class="am-icon-plus"></span> 新增</button>
            ....循环

      loadMsg(str):加载时描述文字 def:加载稍等..  当为null时无加载显示
      loadPrompt(bool):是否显示加载过度 def:true显示 false不显示

      pagination(str):是否需要分页栏 def:'max' 显示全尺寸分页 min显示小尺寸  hide 不显示
      pageSize(num):默认分页大小 def:15
      pageList(Array[num]):分页选择值 def:[15,30,100,200]
      selectWay(str):选择方式 def:multi 可多选  radio只能单选 disable 全部无法选择
      selectCancel(bool):是否可取消最后一行取消 def:true 可以取消 false 不能取消
      disSelect(fn(row 行数据,rowId 行id)):根据方法判断是否屏蔽某行是否可选中 返回false 无法选中  否则均和选中

      lineNum(str/bool):是否显示行号 def:false 不显示 'left'表格左侧显示 'right'表格右侧显示
      cumNum(bool):是否累计 def:false 不累计  true累计计数
      numAllStyle(str): 行号单元格统一样式class 多个用空格隔开 优先级小于styler 参考rowAllStyle
      checkbox(str/bool):是否显示行复选框 def:'left' 表格左显示 'right'表格右显示 false 不显示
      checkAllStyle(str):复选单元格统一样式class 多个用空格隔开 优先级小于styler 参考rowAllStyle
      columns(array[obj]) : 表头设置 可在html结构中构造 datarid插件将会进行扫描 定义为data-opts="title:'标题',field:'title'"
        obj: 列属性
            title(str):显示标题
            info(str):描述信息
            field(str):显示列数据
            sort(bool):是否可排序 def:true 开启  false关闭
            orderBy(str):排序方式 仅支持单一列排序 def:null 不进行初始化排序 asc低到高 desc高到低排序
            width(num):列宽度 单位px def自动自适应  大于0的整数 为手动表格高
            hidden(str):隐藏状态 def:show非隐藏 hide隐藏 disa 消失(无法在列选型中展示出来,一般用以存储数据)
            formatter(fn(column单元格数据,row行记录)):内容数据回调方法

            allStyle(str):单元格统一样式class 多个用空格隔开 优先级小于styler 参考rowAllStyle
            styler(fn):单元格样式回调 参考rowStyler

            edit(bool):是否可编辑设置 def:false不可编辑 true可编辑
            editVali(fn(row行数据,cell数据)):验证是否可编辑 返回false 不可编辑 否则为可编辑
            editConfirm(fn(index行号从0开始,row行数据,field单元格数据标示,naVal历史值,newVal新值)):编辑后保存回调方法 返回true将恢复格式
            editCancel(fn(index行号从0开始,row行数据,field单元格数据标示,naVal历史值)):编辑后取消回调方法  返回true将恢复格式
      onSeatchToolbar(fn):查询组件构造成功后 回调
      onTitleSeatchToolbar(fn):标题头查询组件构造成功后 回调
      onGridReady(fn):datagrid初始化后 回调
      onBeforeLoad(fn):datagrid加载之前 回调 相比load load主要是追加查询参数用
      onLoadResults(fn(data,err)):datagrid得到数据后 回调 不管是否成功或者失败 data是标准的分页对象
      onLoadSuccess(fn(data)):成功加载后 回调
      onLoadError(fn(error):加载失败后 回调
      onRowReady(fn):表格数据填充完成后 回调
      onSelectClear(fn):清空查询按钮点击 回调
      onSelectRow(fn(index行号从0开始,row行数据)):单击选中行后 回调
      onClickRow(fn(index行号从0开始,row行数据)):单击行后 回调
      onDblClickRow(fn(index行号从0开始,row行数据)):双击行后 回调
      onClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):点击单元格 回调
      onDblClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):双击单元格 回调
      onBeforeSortColumn(fn(sort,order)):列排序前 回调
      onBeforeEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态前 回调
      onBeginEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态 回调
      onEndEdit(fn(index行号从0开始,row行数据,field单元格数据标示,setVal设置值)):结束编辑状态后 回调


  fn  eg: obj.getRow({index:1}) 或 $**.datagrid("getRow",{index:1})
      tableHeadToTop() 滚动条置顶并刷新表头
      getRow(index(num/arr[num]/arr[Obj(fieldName:fieidVal)])) 获取row数据对象
      getSelected(index(num/arr[num]/null)) 获取选中的行数据 null获取全部值数组  下标从0开始
      getUnSelect() 获取单页未选中行数据
      getSelIndex() 获取选中的行数据索引值
      getParentRow(jqEle) 根据jq节点获取上一级行row数据对象和index索引号,返回对象,格式为{index:8,row:Obj}
      clearSelect() 清空选中行
      setUrl(url) 设置url地址
      load(paramsObj) 加载数据 eg:$.datagrid('load',{code: '01',name: 'name01'});
      reload() 刷新当前页数据
      loadData(page刷新第几页) 加载新数据,老数据将全部清除 page为空时刷新第一页
      selectAll() 全选
      selectAnyRow(index:num/array[num]/array[Obj(fieldName:fieidVal)]) 选中某行 行号 0为第一行 或者根据 健值对
      unselectAnyRow(index:num/array[num]/array[Obj(fieldName:fieidVal)]) 清除某些行 行号 0为第一行 或者根据 健值对
      saveEdit() 保存编辑并恢复不可编辑
      cancelEdit() 撤销编辑并恢复不可编辑
      getEditors() 获取编辑状态的Cell单元格对象 返回[{$cell:jq节点对象,value:值}]
      updateRow 更新row行数据 $.datagrid('updateRow',{index: 2,row: {name: 'new name',note: 'new note message'}})
      appendRow 追加row行数据 $.datagrid('appendRow',{rows:[{name: 'new name',age: 30,note: 'some messages'}]})
      insertRow  插入row行到某一行 $.datagrid('insertRow',{index: 1,rows: {name: 'new name',age: 30,note: 'some messages'}})
      deleteRow(index(null/num/arr[num]/arr[Obj(fieldName:fieidVal)])) 删除某一行 不传或传入空值则删除选中行
      clearData 清空row
      showColumn(index(arr[str field名称]) 显示列  str为field名称
      hideColumn(index(arr[str field名称]) 隐藏列  str为field名称
      sortColumn(null/sort 排序字段,orderby 排序方向) 依据某列进行排序 null则清空排序 $.datagrid('sort', {sort: '排序field字段名',orderby: '排序方向 desc倒序 asc 正序'})
      setTitle({title:str}) 设置表头标题文本
      getTitle() 获取表头标题文本
      dropDire($ele,heigth) 判断下拉框是否向下展示 返回true向下展示 false向上展示,其中$ele为下拉框jq对象,heigth是下拉框最大高度

  event 事件
      onBeforeLoad(fn):datagrid加载之前 回调 相比load load主要是追加查询参数用
      onLoadResults(fn(data,err)):datagrid得到数据后 回调
      onLoadSuccess(fn(data)):成功加载后 回调
      onLoadError(fn(error):加载失败后 回调
      onRowReady(fn):表格数据填充完成后 回调
      onSelectClear(fn):清空查询按钮点击 回调
      onSelectRow(fn(index行号从0开始,row行数据)):单击选中行后 回调
      onClickRow(fn(index行号从0开始,row行数据)):单击行后 回调
      onDblClickRow(fn(index行号从0开始,row行数据)):双击行后 回调
      onClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):点击单元格 回调
      onDblClickCell(fn(index行号从0开始,field数据标示,text单元格文本,row行数据)):双击单元格 回调
      onBeforeSortColumn(fn(sort,order)):列排序前 回调
      onBeforeEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态前 回调
      onBeginEdit(fn(index行号从0开始,field数据标示,text单元格文本,row行数据))):开始编辑状态 回调
      onEndEdit(fn(index行号从0开始,row行数据,field单元格数据标示,setVal设置值)):结束编辑状态后 回调

###


class datagrid

  constructor:(@$ele,opts,others...)->
    @defaults= # 默认参数
      height:0 # 表格高度单位px def:0 自动最大高  大于0的整数 为手动表格高
      maxHeight:0 # 表格最大高度 此项为自适应高度.def :0 关闭自适应高度 大于0的整数为最大极限高度
      hoverRow:true # hover行效果 def:true开启 false 关闭
      compact:false # 表格采用紧凑型 def:false非紧凑型 true 紧凑型
      showHeader:true # 显示表头 def:true  false不显示
      alignHandle:'left' # 表头格式 def:center居中 left居左 right居右 其他值为class 优先级小于columns的align
      loadLockTime:8000 # 加载数据超时设置 单位毫秒 def:8000 毫秒
      titleToolbarShow:false # 是否展示标题栏工具栏 def:false 不显示 true显示
      titleSearchInpShow:true # 是否显示标题头搜索栏 def:true 显示 false 不显示
      titleRefreshBut:true # 是否显示标题头刷新按钮 def:true 显示 false 不显示
      titleColumnsShow:true  #是否显示标题头列展示下拉 def:true 展示 false 不显示
      striped:true  # 是否采用条纹 def:true 采用 false不采用
      initLoad:true # 初始化是否载入数据 def:true 载入数据 false 不初始化载入数据
      toolbarShow:true # 是否显示工具栏 def:true 显示  false 不显示
      searchInpShow:true # 是否显示搜索栏 def:true 显示 false 不显示
      refreshBut:true # 是否显示刷新按钮 def:true 显示 false 不显示
      columnsShow:true # 是否显示列展示下拉 def:true 展示 false 不显示
      funClass:'mini compact basic' # 功能菜单结构 class样式 def:mini compact basic,自定义多个中间空格
      loadMsg:'加载稍等..' # 加载时描述文字 def:加载稍等..  当为null时无加载显示
      loadPrompt:true  # 是否显示加载过度 def:true显示 false不显示
      pagination:'max' # 是否需要分页栏 def:'max' 显示全尺寸分页 min显示小尺寸  hide 不显示
      pageSize:15 # 默认分页大小
      pageList:[15,30,100,200] # 分页选择值 def:[15,30,100,200]
      selectWay:'multi' # 选择方式 def:multi 可多选  radio只能单选 disable 全部无法选择
      selectCancel:true # 是否可取消最后一行取消 def:true 可以取消 false 不能取消
      lineNum:false # 是否显示行号 def:false 不显示 'left'表格左侧显示 'right'表格右侧显示
      cumNum:false # 是否累计 def:false 不累计  true累计计数
      checkbox:'left' # 是否显示行复选框 def:'left' 表格左显示 'right'表格右显示 false 不显示

    @opt = $.extend({}, @defaults,$.fn.datagrid.opts, opts)

    @loadLock=false #加载上锁 默认未上锁
    @loadLockTimeout=null

    @page = # 分页对象 其中包括页码 当前页数据等
      pageNum:1 # 当前页号码
      pageSize:0 # 当前分页大小
      startRow:0 # 开始记录数
      endRow:0 # 结束记录数
      pages:0 # 总共多少页
      total:0 # 总共多少数据
      prePage:0 # 前一页页码
      nextPage:0 # 下页页码
      isFirstPage:true # 是否是第一页
      isLastPage:true # 是否是最后一页
      list:[] # 数据数组集合


    @creatGrid() # 创建主体表格

    @creatTitle() # 创建标题栏目

    @creatGridThead() # 创建表格头部

    @creatHeadMenu() # 创建表格头部菜单栏和检索栏

    @creatPageMenu() # 创建底部分页菜单

    @eventGrid() # 表格主体事件
    @eventTitle() # 标题栏事件注册
    @eventGridThead() # 表头事件注册注册
    @eventHeadMenu() # 头部菜单栏事件
    @eventPageMenu() # 底部分页栏事件注册
    @opt.onGridReady?() # datagrid初始化后 回调
    @setPopup()
    @loadData() if @opt.initLoad # 加载数据


  ###
    执行路由
    opts
  ###
  perform:(opts,others...)->
    if _.isObject opts # 进行参数覆盖
      @opt = $.extend({}, @opt,opts)
    else
      if _.isString opts # 执行方法调用
        fun = eval("this.#{opts}")
        fun(others[0])


  ###
    设置冒泡
    opts
  ###
  setPopup:(opts)->
    $popup = @$parEle.parent().find("[data-content]");
    $popup.popup(
      position : 'top center'
      delay: {
        show: 800
      }
    )


  ###
    标题栏事件注册
    opts
  ###
  eventTitle:->
    if @opt.titleToolbarShow or @opt.titleFunToolbar #  列显示下拉

      # 刷新按钮点击
      if @$titleRefreshBut then @$titleRefreshBut.off('click').on 'click',(e)=>
        @reload()

      # 清除按钮点击
      if @$titleClearSearchBut then @$titleClearSearchBut.off('click').on 'click',(e)=>
        if @$titleSearchInp then @$titleSearchInp.val null
        if @$titleSearchDropdown then @$titleSearchDropdown.dropdown('hide')
        @opt.onSelectClear?() # 清空查询按钮点击 回调
        @loadData()

      # 检索栏回车
      if @$titleSearchInp then @$titleSearchInp.on 'keydown',(e)=>
        @loadData() if e.keyCode==13

      if @$titleColumnsShowDropdown
        $fuCheckbox = @$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']")
        $checkbox = @$titleColumnsShowDropdown.find("[ids='titleCheckbox']").checkbox()
        # 显示列栏全选展示
        $fuCheckbox.checkbox({
          onChecked:->
            $checkbox.checkbox('check')
          onUnchecked:->
            $checkbox.checkbox('uncheck')
        })

        # 显示列栏项目选展示
        t = @
        $checkbox.checkbox({
          onChange:=>
            t.checkAllShowBox()
          onChecked:->
            t.tableHeadToTop()
            cid = $(@).val()
            t.opt.columns[cid].hidden = 'show'
            $th = t.$theadTh.parent().find("[ids='c#{cid}']")
            $td = t.$rowAll.find("td[ids='c#{cid}']")
            $th.removeClass "the-dn"
            $td.removeClass "the-dn"

          onUnchecked:->
            t.tableHeadToTop()
            cid = $(@).val()
            t.opt.columns[cid].hidden = 'hide'
            $th = t.$theadTh.parent().find("[ids='c#{cid}']")
            $td = t.$rowAll.find("td[ids='c#{cid}']")
            $th.addClass "the-dn"
            $td.addClass "the-dn"
        })


  ###
    创建标题栏
    opts
  ###
  creatTitle:->
    if @opt.title
      title = ''
      if typeof @opt.title is 'function'
        title = @opt.title()
      else
        title = @opt.title

    titleFunToolbar = @opt.titleFunToolbar # 标题头功能菜单结构
    if @opt.titleToolbarShow or titleFunToolbar
      radiusClass=''
      searchInpHtml=''
      if @opt.titleSearchInpShow  # 检索input栏
        searchInpHtml = """
                          <input ids="titleSearchInp" type="text" placeholder="搜索..." data-content="输入查询信息,回车进行检索" data-variation="mini inverted">
                        """
        radiusClass = 'input'
      else
        radiusClass = 'buttons'

      titleRefreshButHtml =''
      if @opt.titleRefreshBut     #  刷新按钮
        titleRefreshButHtml = """
                              <div ids="titleRefreshBut" class="ui button mini compact icon teal " data-content="刷新数据" data-variation="mini inverted"><i class="icon refresh"></i></div>
                              """

      titleColumnsHtml=''
      if @opt.titleColumnsShow  #  列显示下拉
        columnsShowBarHtml =''
        $.each(@opt.columns,(i,columnsObj)->
          columnsObj.hidden ?='show'
          if columnsObj.title and columnsObj.hidden isnt 'disa' # 是否开启复选框
            columnsShowBarHtml +="""
                                    <div ids='titleCheckbox' column='#{i}' class="ui checkbox the-dropdown-col">
                                        <input type="checkbox" value='#{i}'>
                                        <label>#{columnsObj.title}</label>
                                    </div>
                                """
        )
        titleColumnsHtml = """
                            <div ids='titleColumnsShowDropdown' class="ui button top right pointing mini dropdown compact icon teal the-z1200" data-content="展示列勾选" data-variation="mini inverted">
                                <i class="icon list layout"></i>
                                <div class="menu">
                                    <div ids="titleFuCheckbox" class="ui checkbox the-dropdown-col">
                                        <input type="checkbox">
                                        <label>全选</label>
                                    </div>
                                    <div class="divider"></div>
                                    <div ids="titleColumnsCheckbox" class="the-dropdown-check">
                                       #{columnsShowBarHtml}
                                    </div>
                                    <div class="item the-dn"></div>
                                </div>
                            </div>
                           """

      searchHtml =''
      searchHtml = @opt.titleSearchToolbar() if @opt.titleSearchToolbar # 条件过滤下拉
      if searchHtml
        searchHtml = """
                      <div ids='titleSearchDropdown' class="ui button top right pointing mini dropdown compact icon teal the-z1200" data-content="数据筛选" data-variation="mini inverted">
                          <i class="icon search"></i>
                          <div class="menu">
                              <div class="the-dropdown-search">
                                #{searchHtml}
                              </div>
                              <div class="divhig"></div>
                              <div class="the-dropdown-clear">
                                  <button ids='titleClearSearchBut' class="mini ui button basic compact fluid teal">清空</button>
                              </div>
                              <div class="item the-dn"></div>
                          </div>
                      </div>
                     """


      buttonsHtml = ''
      handlerArr = []
      if titleFunToolbar
        buttonHtml =""
        otherButHtml =""
        $.each(titleFunToolbar,(i,obj)->
          classStr= ''
          attrStr=''
          iconStr =''
          attrVal =''
          classStr+= obj.class if obj.class
          attrStr += """ disabled """ if obj.selectRow
          iconStr += """<i class="icon #{obj.icon}"></i>""" if obj.icon

          if obj.attr
            attrKeys = _.keys(obj.attr)
            for k in attrKeys
              attrVal+=""" #{k}="#{obj.attr[k]}" """

          if obj.hide
            info = """ data-content="#{obj.info}" data-variation="mini inverted" """ if obj.info
            otherButHtml +="""
                            <div ids='titleHanderButtonFn' class="item #{classStr} #{attrStr}" #{info?=''} #{attrVal}>#{iconStr}#{obj.text}</div>
                           """
          else
            text = """ data-content="#{obj.text}" data-variation="mini inverted" """ if obj.text
            buttonHtml +="""
                          <div ids='titleHanderButtonFn' class="ui button mini compact icon teal #{classStr} #{attrStr}" #{text?=''} #{attrVal}>#{iconStr}</div>
                          """
          handlerArr.push obj.handler ? ->
        )
        if otherButHtml
          otherButHtml="""
                          <div ids='titleOtherButs' class="ui floating dropdown icon teal button">
                            <i class="dropdown icon" data-content="更多功能" data-variation="mini inverted"></i>
                            <div class="menu">
                                #{otherButHtml}
                            </div>
                          </div>
                        """
        buttonsHtml +="""#{buttonHtml}#{otherButHtml}"""


      toolbarHtml = """
                    <div class="ui right #{radiusClass} action mini compact the-table-fr">
                        #{searchInpHtml?=''}
                        #{titleRefreshButHtml?=''}
                        #{titleColumnsHtml?=''}
                        #{searchHtml?=''}
                        #{buttonsHtml?=''}
                    </div>
                    """

    titleHtml = """
                <table class="ui top attached segment table #{@opt.titleClass}">
                    <thead>
                    <tr>
                      <th ids='titleStr' class="table-white">#{title?=''}</th>
                      <th class="table-white">#{toolbarHtml?=''}</th>
                    </tr>
                    </thead>
                </table>
                """


    @$parEle.before titleHtml
    @$title = @$parEle.prev()

    if @opt.titleSearchInpShow  # 检索input栏
      # 查询输入框
      @$titleSearchInp = @$title.find("[ids='titleSearchInp']")

    if @opt.titleRefreshBut     #  刷新按钮
      @$titleRefreshBut = @$title.find("[ids='titleRefreshBut']")

    if searchHtml # 初始化过滤条件下拉
      @$titleSearchDropdown = @$title.find("[ids='titleSearchDropdown']").dropdown()
      @opt.onTitleSeatchToolbar?() # 查询组件构造成功后 回调
      # 清空查询按钮
      @$titleClearSearchBut = @$title.find("[ids='titleClearSearchBut']")

    if titleFunToolbar # 绑定功能按钮组事件
      @$titleHanderButtonFn = @$title.find("[ids='titleHanderButtonFn']")
      $.each(handlerArr,(i,handler)=>
        @$titleHanderButtonFn.eq(i).bind('click',(e)->handler({e:e,$ele:@}))
      )
      @$title.find("[ids='titleOtherButs']").dropdown()

    if @opt.titleColumnsShow # 显示列下拉
      # 初始化显示列下拉
      @$titleColumnsShowDropdown = @$title.find("[ids='titleColumnsShowDropdown']").dropdown()
      # 初始化显示列下拉滚动条
      @$titleColumnsShowDropdown.find("[ids='titleColumnsCheckbox']").scrollbar({theme:'dark-thin'})
      # 初始化下拉选中
      allChecked = true
      allUnchecked = true
      $.each(@opt.columns,(i,columnsObj)=>
        if columnsObj.title
          if columnsObj.hidden is 'show'
            allUnchecked = false
            @$titleColumnsShowDropdown.find("[ids='titleCheckbox'][column='#{i}']").checkbox('set checked')
          else if columnsObj.hidden is 'hide'
            allChecked = false
        true
      )
      $titleFuCheckbox = @$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']")
      if allChecked
        $titleFuCheckbox.checkbox('set checked')
      else if allUnchecked
        $titleFuCheckbox.checkbox('set unchecked')
      else
        $titleFuCheckbox.checkbox('set indeterminate')




  ###
    底部分页栏事件注册
    opts
  ###
  eventPageMenu:->

    # 分页大小下拉
    @$pageSizeDrop.find("[ids='pageSizeOpt']").off('click').on 'click',(e)=>
      @opt.pageSize=$(e.currentTarget).attr "data-value"
      @loadData()



  ###
    创建底部分页菜单
    opts
  ###
  creatPageMenu:->
    pagebarHtml = ''
    classStr = ''
    if @opt.pagination is 'hide'
      classStr += ' the-dn '
    if @opt.pagination is 'max'
      selectHtml = ''
      $.each(@opt.pageList,(i,pageNo)->
        selectHtml+="""<div ids='pageSizeOpt' class="item" data-value="#{pageNo}">#{pageNo}</div>"""
      )
      pagebarHtml = """
                    <table ids='pageMenu' class="ui bottom attached segment table #{classStr}" >
                        <tfoot>
                            <tr>
                                <th class="table-white">
                                    <div class="ui floated left menu the-tfoot-menu">
                                        <div ids='pageSizeDrop' class="ui bottom selection dropdown mini compact tfoot-page-number" data-content="选择分页大小" data-variation="mini inverted">
                                            <input type="hidden" name="gender" value="#{@opt.pageSize}">
                                            <i class="dropdown icon"></i>
                                            <div class="default text">分页</div>
                                            <div class="menu tfoot-pagecon-wrap">
                                                #{selectHtml}
                                            </div>
                                        </div>
                                        <div ids='pageSize' class="ui mini label" data-content="当前页记录数" data-variation="mini inverted">...</div>
                                        <div ids='pageTotal' class="ui mini label" data-content="总记录数" data-variation="mini inverted">...</div>
                                    </div>
                                    <div ids="pageToolbar" class="ui menu floated right borderless the-tfoot-menu">
                                        <a ids='pageBut' pageNum='-1' class="icon item" data-content="向前翻页" data-variation="mini inverted"><i class="angle left icon"></i></a>
                                        <a ids='pageBut' class="item"><i class="notched circle loading icon"></i></a>
                                        <a ids='pageBut' pageNum='-2' class="icon item" data-content="向后翻页" data-variation="mini inverted"><i class="angle right icon"></i></a>
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    """
    if @opt.pagination is 'min'
      pagebarHtml = """
                    <table ids='pageMenu' class="ui bottom attached segment table #{classStr}" >
                        <tfoot>
                            <tr>
                                <th class="table-white">
                                    <div ids="pageToolbar" class="ui menu floated right borderless the-tfoot-menu">
                                        <a ids='pageBut' pageNum='-1' class="icon item" data-content="向前翻页" data-variation="mini inverted"><i class="angle left icon"></i></a>
                                        <a ids='pageDrop' class="item"><i class="notched circle loading icon"></i></a>
                                        <a ids='pageBut' pageNum='-2' class="icon item" data-content="向后翻页" data-variation="mini inverted"><i class="angle right icon"></i></a>
                                    </div>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    """

    @$parEle.after pagebarHtml
    @$pageMenu = @$parEle.next("[ids='pageMenu']")
    @$pageSizeDrop = @$pageMenu.find("[ids='pageSizeDrop']").dropdown(direction: 'upward')

  # 将表格移顶
  tableHeadToTop:->
    # 在有滚动条状态下 移动到顶端 在进行表头高度调整
    if (@opt.height or @opt.maxHeight) and @opt.showHeader
      #移至顶端再进行刷新
      @$parEle.find(".mCSB_scrollTools .mCSB_dragger").eq(0).css('top','0px')
      @$parEle.find(".mCSB_container").eq(0).css('top','0px')
      @$ele.floatThead('reflow')
      # 调整表格数据滚动条高度
      setTimeout(=>
        scollHeight =@$parEle.find('.floatThead-container').css('height')
        @$parEle.find('.mCSB_draggerContainer').css('top',scollHeight)
        @$parEle.mCustomScrollbar('update')
      ,300)

  # 更新全列显示复选框状态
  checkAllShowBox:->
    if @$columnsShowDropdown
      allChecked = true
      allUnchecked = true
      $fuCheckbox = @$columnsShowDropdown.find("[ids='fuCheckbox']")
      $checkbox = @$columnsShowDropdown.find("[ids='checkbox']")
      $checkbox.each((i)->
        if $(@).checkbox('is checked')
          allUnchecked = false
        else
          allChecked = false
        true
      )
      if allChecked
        $fuCheckbox.checkbox('set checked')
      else if allUnchecked
        $fuCheckbox.checkbox('set unchecked')
      else
        $fuCheckbox.checkbox('set indeterminate')

    if @$titleColumnsShowDropdown
      allChecked = true
      allUnchecked = true
      $fuCheckbox = @$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']")
      $checkbox = @$titleColumnsShowDropdown.find("[ids='titleCheckbox']")
      $checkbox.each((i)->
        if $(@).checkbox('is checked')
          allUnchecked = false
        else
          allChecked = false
        true
      )
      if allChecked
        $fuCheckbox.checkbox('set checked')
      else if allUnchecked
        $fuCheckbox.checkbox('set unchecked')
      else
        $fuCheckbox.checkbox('set indeterminate')


  ###
    头部菜单栏事件
    opts
  ###
  eventHeadMenu:->
    if @opt.toolbarShow

      # 刷新按钮点击
      if @$refreshBut then @$refreshBut.off('click').on 'click',(e)=>
        @reload()

      # 清除按钮点击
      if @$clearSearchBut then @$clearSearchBut.off('click').on 'click',(e)=>
        if @$searchInp then @$searchInp.val null
        if @$searchDropdown then @$searchDropdown.dropdown('hide')
        @opt.onSelectClear?() # 清空查询按钮点击 回调
        @loadData()

      # 检索栏回车
      if @$searchInp then @$searchInp.on 'keydown',(e)=>
        @loadData() if e.keyCode==13

      if @$columnsShowDropdown
        $fuCheckbox = @$columnsShowDropdown.find("[ids='fuCheckbox']")
        $checkbox = @$columnsShowDropdown.find("[ids='checkbox']").checkbox()

        # 显示列栏全选展示
        $fuCheckbox.checkbox({
          onChecked:->
            $checkbox.checkbox('check')
          onUnchecked:->
            $checkbox.checkbox('uncheck')
        })

        # 显示列栏项目选展示
        t = @
        $checkbox.checkbox({
          onChange:=>
            t.checkAllShowBox()
          onChecked:->
            t.tableHeadToTop()
            cid = $(@).val()
            t.opt.columns[cid].hidden = 'show'
            $th = t.$theadTh.parent().find("[ids='c#{cid}']")
            $td = t.$rowAll.find("td[ids='c#{cid}']")
            $th.removeClass "the-dn"
            $td.removeClass "the-dn"

          onUnchecked:->
            t.tableHeadToTop()
            cid = $(@).val()
            t.opt.columns[cid].hidden = 'hide'
            $th = t.$theadTh.parent().find("[ids='c#{cid}']")
            $td = t.$rowAll.find("td[ids='c#{cid}']")
            $th.addClass "the-dn"
            $td.addClass "the-dn"
        })



  ###
    创建表格头部菜单栏和检索栏
    opts
  ###
  creatHeadMenu:->
    #构建菜单栏
    if @opt.toolbarShow
      funToolbar = @opt.funToolbar # 功能菜单结构

      buttonsHtml =""
      handlerArr = []
      if funToolbar instanceof Array # 是功能对象
        buttonHtml =""
        otherButHtml =""
        moreClassStr = "" # 更多按钮的样式
        moreAttrStr = ""  # 更多按钮的属性
        $.each(funToolbar,(i,obj)->
          classStr= ''
          attrStr=''
          iconStr=''
          attrVal = ''
          if obj.text
            classStr+= obj.class if obj.class
            attrStr += """ disabled """ if obj.selectRow
            iconStr += """<i class="icon #{obj.icon}"></i>""" if obj.icon
            info = """ data-content="#{obj.info}" data-variation="mini inverted" """ if obj.info

            if obj.attr
              attrKeys = _.keys(obj.attr)
              for k in attrKeys
                attrVal+=""" #{k}="#{obj.attr[k]}" """

            if obj.hide
              otherButHtml +="""
                              <div ids='handerButtonFn' class="item #{classStr} #{attrStr}" #{info?=''}  #{attrVal}>#{iconStr}#{obj.text}</div>
                             """
            else
              buttonHtml+="""
                          <button ids='handerButtonFn' class="ui button #{classStr} #{attrStr}" #{info?=''} #{attrVal}>#{iconStr}#{obj.text}</button>
                          """
            handlerArr.push obj.handler ? ->
          else
            moreClassStr = obj.class
            attrKeys = _.keys(obj.attr)
            for k in attrKeys
              moreAttrStr+=""" #{k}="#{obj.attr[k]}" """
        )
        if otherButHtml
          otherButHtml="""
                          <div ids='otherButs' class="ui floating dropdown icon button #{moreClassStr}" #{moreAttrStr} >
                              <span data-content="更多功能" data-variation="mini inverted">更多</span>
                              <i class="dropdown icon"></i>
                              <div class="menu"> #{otherButHtml}</div>
                            </div>
                        """
        buttonsHtml +="""<div class="ui buttons #{@opt.funClass}">#{buttonHtml}#{otherButHtml}</div>"""
      if typeof funToolbar is "function" # 直定义结构
        buttonsHtml = funToolbar()

      searchHtml =''
      searchHtml = @opt.searchToolbar() if @opt.searchToolbar # 过滤检索栏
      if searchHtml
        searchHtml = """
                      <div ids='searchDropdown' class="ui button top right pointing mini dropdown compact icon teal the-z1200" data-content="数据筛选" data-variation="mini inverted">
                          <i class="icon search"></i>
                          <div class="menu">
                              <div class="the-dropdown-search">
                                #{searchHtml}
                              </div>
                              <div class="divhig"></div>
                              <div class="the-dropdown-clear">
                                  <button ids='clearSearchBut' class="mini ui button basic compact fluid teal">清空</button>
                              </div>
                              <div class="item the-dn"></div>
                          </div>
                      </div>
                     """

      # 下拉列展示
      columnsHtml = ''
      if @opt.columnsShow # 是否显示列展示下拉
        columnsShowBarHtml =''
        $.each(@opt.columns,(i,columnsObj)->
          columnsObj.hidden ?='show'
          if columnsObj.title and columnsObj.hidden isnt 'disa' # 是否开启复选框
            columnsShowBarHtml +="""
                                    <div ids='checkbox' column='#{i}' class="ui checkbox the-dropdown-col">
                                        <input type="checkbox" value='#{i}'>
                                        <label>#{columnsObj.title}</label>
                                    </div>
                                """
        )
        columnsHtml = """
                      <div ids='columnsShowDropdown' class="ui button top right pointing mini dropdown compact icon teal the-z1200" data-content="展示列勾选" data-variation="mini inverted">
                            <i class="icon list layout"></i>
                            <div class="menu">
                                <div ids="fuCheckbox" class="ui checkbox the-dropdown-col">
                                    <input type="checkbox">
                                    <label>全选</label>
                                </div>
                                <div class="divider"></div>
                                <div ids="columnsCheckbox" class="the-dropdown-check">
                                   #{columnsShowBarHtml}
                                </div>
                                <div class="item the-dn"></div>
                            </div>
                        </div>
                      """

      searchInputHtml = ''
      radiusClass=''
      if @opt.searchInpShow # 搜索栏
        searchInputHtml = """<input ids='searchInp' type="text" placeholder="搜索..." data-content="输入查询信息,回车进行检索" data-variation="mini inverted">"""
        radiusClass = 'input'
      else
        radiusClass = 'buttons'

      refreshButHtml = ''
      if @opt.refreshBut # 是否显示刷新按钮
        refreshButHtml = """<div ids='refreshBut' class="ui button mini compact icon teal" data-content="刷新数据" data-variation="mini inverted"><i class="icon refresh"></i></div>"""

      toolbarHtml = """
                    <div class="ui right #{radiusClass} action mini compact the-table-fr">
                        #{searchInputHtml}
                        #{refreshButHtml}
                        #{columnsHtml}
                        #{searchHtml}
                    </div>
                    """

      toolbarHtml ="""
                  <table class="ui attached segment table">
                      <thead>
                      <tr>
                          <th class="the-table-tool">
                              #{buttonsHtml}
                              #{toolbarHtml?=''}
                          </th>
                      </tr>
                      </thead>
                  </table>
                   """
      @$parEle.before(toolbarHtml)
      @$toolbar=@$parEle.prev()
      if funToolbar
        @$handerButtonFn = @$toolbar.find("[ids='handerButtonFn']")
        $.each(handlerArr,(i,handler)=>
          @$handerButtonFn.eq(i).bind('click',(e)->handler({e:e,$ele:@}))
        )
        @$toolbar.find("[ids='otherButs']").dropdown()

      if searchHtml # 初始化过滤条件下拉
        @$searchDropdown = @$toolbar.find("[ids='searchDropdown']").dropdown()
        @opt.onSeatchToolbar?() # 查询组件构造成功后 回调
        # 清空查询按钮
        @$clearSearchBut = @$toolbar.find("[ids='clearSearchBut']")

      if @opt.refreshBut # 是否显示刷新按钮
        # 刷新按钮
        @$refreshBut = @$toolbar.find("[ids='refreshBut']")

      if @opt.searchInpShow # 搜索栏
        # 查询输入框
        @$searchInp = @$toolbar.find("[ids='searchInp']")

      if @opt.columnsShow # 是否显示列展示下拉
        # 初始化显示列下拉
        @$columnsShowDropdown = @$toolbar.find("[ids='columnsShowDropdown']").dropdown()
        # 初始化显示列下拉滚动条
        @$columnsShowDropdown.find("[ids='columnsCheckbox']").scrollbar({theme:'dark-thin'})
        # 初始化下拉选中
        allChecked = true
        allUnchecked = true
        $.each(@opt.columns,(i,columnsObj)=>
          if columnsObj.title
            if columnsObj.hidden is 'show'
              allUnchecked = false
              @$columnsShowDropdown.find("[ids='checkbox'][column='#{i}']").checkbox('set checked')
            else if columnsObj.hidden is 'hide'
              allChecked = false
          true
        )
        $fuCheckbox = @$columnsShowDropdown.find("[ids='fuCheckbox']")
        if allChecked
          $fuCheckbox.checkbox('set checked')
        else if allUnchecked
          $fuCheckbox.checkbox('set unchecked')
        else
          $fuCheckbox.checkbox('set indeterminate')






  ###
    表头事件注册
    opts
  ###
  eventGridThead:->

    # 表头点击排序
    @$theadTh.off('click').on 'click',(e)=>
      $th = $(e.currentTarget)
      $i = $th.find('i.icon.sort')
      ids = $th.attr("ids")
      if ids and @opt.columns[location=ids.substring(1)].sort is true
        field = @opt.columns[location].field
        if @sort is field # 进行排序
          switch @orderby
            when 'desc'
              $i.removeClass("descending").addClass("ascending")
              @sort=field
              @orderby='asc'
            when 'asc'
              $i.removeClass("ascending")
              @sort=null
              @orderby=null
        else
          @$theadTh.find('i.icon.sort').removeClass("ascending descending")
          $i.addClass("descending")
          @sort=field
          @orderby='desc'
        @opt.onBeforeSortColumn?(sort:@sort,order:@orderby)
        @loadData()

    # 表格全选框
    @$thCheckbox = @$ele.find("th [ids='thCheckbox']").checkbox()
    @$thCheckbox.off('click').on 'click',(e)->e.preventDefault() if e and e.preventDefault
    @$thCheckbox.parent().off('click').on 'click',(e)=>
      if @opt.selectWay is 'multi' and @opt.selectCancel is true
        if @$thCheckbox.checkbox('is checked') or (@$ele.find("tbody tr.disabled").length>0 and @$thCheckbox.checkbox('is indeterminate')) # 清空选中
          @clearSelect()
        else # 全选
          @selectAll()




  ###
    创建表格头部
    opts
  ###
  creatGridThead:->

    creatNum = => # 创建列行号
      classStr =''
      classStr+=" #{@opt.numAllStyle} " if !@opt.headStyle and @opt.numAllStyle
      classStr+=' left aligned ' if @opt.lineNum is 'left'
      classStr+=' right aligned ' if @opt.lineNum is 'right'
      classStr=""" class="table-white #{classStr}" """ if classStr
      "<th #{classStr} ></th>"

    creatCheck = => # 创建行选中checkbox
      classStr =''
      classStr+=" #{@opt.checkAllStyle} " if !@opt.headStyle and @opt.checkAllStyle
      classStr+=' am-hide ' if @opt.selectWay is 'radio' or @opt.selectWay is 'disable'
      classStr+=' left aligned ' if @opt.checkbox is 'left'
      classStr+=' right aligned ' if @opt.checkbox is 'right'
      textHtml = """
                  <div ids='thCheckbox' class="ui checkbox fitted">
                      <input type="checkbox"><label></label>
                  </div>
                 """
      classStr=""" class="table-white #{classStr}" """ if classStr
      """<th #{classStr} style='width:30px;'>#{textHtml}</th>"""

    creatTh = (opts)=> # 创建行
      {columnsObj,k} = opts
      columnsObj.sort ?=true # 是否可排序 def:true 开启  false关闭
      columnsObj.align ?='center' # 列格式 def:center居中 left居左 right居右 其他值为class
      columnsObj.hidden ?='show' # 隐藏状态 def:show非隐藏 hide隐藏 disa 消失(无法在列选型中展示出来)
      columnsObj.edit ?=false # 是否可编辑设置 def:false不可编辑 true可编辑

      classStr =''
      styleStr=''

      classStr+=' the-dn ' if columnsObj.hidden is 'hide' or columnsObj.hidden is 'disa'
      classStr+=" #{columnsObj.allStyle} " if !@opt.headStyle and columnsObj.allStyle

#      styleStr+=" width:#{columnsObj.width}px; " if columnsObj.width >0
#      styleStr+=" min-width:120px; " if columnsObj.edit

      switch @opt.alignHandle # 整体单元格样式 一般是对齐 def:center居中 left居左 right居右 其他值为class 优先级小于columns的align
        when 'center' then  classStr+= "center aligned"
        when 'left' then classStr+= "left aligned"
        when 'right' then classStr+= "right aligned"
        else classStr+= "#{@opt.alignHandle}"
      sortHtml = ''
      textHtml = ''
      if columnsObj.sort
        switch columnsObj.orderBy
          when 'asc'
            sortHtml+="""<i class="icon sort ascending "></i>"""
            @sort = columnsObj.field
            @orderby = 'asc'
          when 'desc'
            sortHtml+="""<i class="icon sort descending "></i>"""
            @sort = columnsObj.field
            @orderby = 'desc'
          else
            sortHtml+="""<i class="icon sort "></i>"""
      textHtml = "#{columnsObj.title?=''}#{sortHtml}"
      classStr +=" the-table-th " if textHtml.trim().length>0

      classStr=""" class="table-white #{classStr}" """ if classStr
      styleStr=""" style="#{styleStr}" """ if styleStr
      """<th ids='c#{k}' #{classStr} #{styleStr}>#{textHtml}</th>"""

    # 创建表头栏目
    creatThead = (opts)->
      theadClassStr=""" class="the-dn" """ if !opts.showHeader # 显示表头 def:true  false不显示

      trClass=''
      if opts.headStyle #头部样式
        trClass+=" #{opts.headStyle} "
      else
        trClass+=" #{opts.rowAllStyle} " if opts.rowAllStyle
      trClass=""" class="#{trClass}" """ if trClass
      "<thead #{theadClassStr}><tr #{trClass} >#{columnsHtml}</tr></thead>"

    columnsHtml=""
    $.each(@opt.columns,(i,columnsObj)=>
      columnsHtml+=creatNum() if @opt.lineNum is 'left' and i is 0
      columnsHtml+=creatCheck() if @opt.checkbox is 'left' and i is 0
      columnsHtml+=creatTh(columnsObj:columnsObj,k:i)
      columnsHtml+=creatCheck() if @opt.checkbox is 'right' and i is @opt.columns.length-1
      columnsHtml+=creatNum() if @opt.lineNum is 'right' and i is @opt.columns.length-1
    )
    @$ele.append(creatThead(@opt))
    @$theadTh = @$ele.find("thead th")


  ###
    表格主体事件
    opts
  ###
  eventGrid:->
    $tdCheckbox = @$ele.find("td [ids='tdCheckbox']").checkbox()
    $tdCheckbox.off('click').on 'click',(e)->e.preventDefault() if e and e.preventDefault

    $tdCheckbox.find("checkbox").off('click').on 'click',(e)->e.preventDefault() if e and e.preventDefault

    # 双击行
    if @$rowAll and @opt.onDblClickRow
      @$rowAll.off('dblclick').on 'dblclick',(e)=>
        $row = $(e.currentTarget)
        num = parseInt $row.prevAll().length
#        num = parseInt $row.attr('ids').substring(1)
        rowData = @page.list[num]
        @opt.onDblClickRow({index:num,row:rowData})


    # 单元格双击
    if @$rowAll and @opt.onDblClickCell
      @$ele.find("tbody td[ids]").off('dblclick').on 'dblclick',(e)=>
        $cell = $(e.currentTarget)
        $row = $cell.parent("tr")
        num = parseInt $row.prevAll().length
#        num = parseInt $row.attr('ids').substring(1)
        rowData = @page.list[num]
        tdId = parseInt $cell.attr("ids").substring(1) # td排序
        columns = @opt.columns[tdId] # 单元格属性对象
        @opt.onDblClickCell({
          index:num
          field:rowData[columns.field]
          text:$cell.text()
          row:rowData
        })


    # 单元格点击
    if @$rowAll
      @$ele.find("tbody td").off('click').on 'click',(e)=>
        $cell = $(e.currentTarget)
        $row = $cell.parent()
        $checkbox = $row.find("td [ids='tdCheckbox']")
        num = parseInt $row.prevAll().length # 当前行所在编号 用以获取数据
        rowData = @page.list[num] # 当前行数据
        ids = $cell.attr("ids")
        if ids
          tdId = ids.substring(1)
          columns = @opt.columns[tdId] # 单元格属性对象
          @opt.onClickCell?(
            index:num
            field:columns.field if columns and columns.field
            text:$cell.text() if columns and columns.field
            row:rowData
          )
        return false if $row.attr("ids") isnt @$rowAll.eq(num).attr('ids')
        # 选择一行
        selectOne = =>
          select = $row.attr("select")
          # 取消全部的选择
          $tdCheckbox.checkbox('set unchecked')
          # 取消全部的高亮
          @$rowAll.removeClass('warning').removeAttr('select')
          @rowsArr=null # 清空选中行数据
          @rowsArrKey=null # 清空选择行号
          @$selRowArr=null # 清空选中行jq对象
          @opt.onClickRow?({index:num,row:rowData})
          if !select # 加上选择
            @rowsArr=[rowData]
            @rowsArrKey=[num]
            $row.addClass('warning').attr('select','select')
            $checkbox.checkbox('set checked')
            @$selRowArr=[$row]
            @opt.onSelectRow?({index:num,row:rowData})
          if @$selRowArr and @$selRowArr.length > 0
            if @$selRowArr.length is @$rowAll.length
              @$thCheckbox.checkbox('set checked')
            else
              @$thCheckbox.checkbox('set indeterminate')
            @effButton()
          else
            @$thCheckbox.checkbox('set unchecked')
            @failButton()


        # 选择一行 必须选中 无法取消
        selectMustOne = =>
          select = $row.attr("select")
          # 取消全部的选择 除了当前
          $tdCheckbox.not($checkbox).checkbox('set unchecked')
          # 取消全部的高亮 除了当前
          @$rowAll.not($row).removeClass('warning').removeAttr('select')
          # 清空全部的数据
          @rowsArr=[rowData]
          @rowsArrKey=[num]
          @$selRowArr=[$row] # 清空选中行jq对象
          @opt.onClickRow?({index:num,row:rowData})
          if !select # 加上选择
            $row.addClass('warning').attr('select','select')
            $checkbox.checkbox('set checked')
            @opt.onSelectRow?({index:num,row:rowData})
          if @$selRowArr and @$selRowArr.length > 0
            if @$selRowArr.length is @$rowAll.length
              @$thCheckbox.checkbox('set checked')
            else
              @$thCheckbox.checkbox('set indeterminate')
            @effButton()
          else
            @$thCheckbox.checkbox('set unchecked')

        # 选择任意一行
        selectAny = =>
          select = $row.attr("select")
          if select # 取消选择
            @unselectAnyRow(index:num)
          else # 加上选择
            @selectAnyRow(index:num)


        if $row.attr('disable') isnt 'disable'
          if columns and columns.edit
            edit = $cell.attr("edit")
            if columns.editVali
              editIf = true if columns.editVali({row:rowData,cell:rowData[columns.field]})
            else
              editIf = true
            @editCell(index:num,$cell:$cell,columns:columns,row:rowData) if editIf and !edit

          switch @opt.selectWay
            when 'disable' then e.preventDefault()
            when 'radio'
              switch @opt.selectCancel
                when true # 可以取消最后一行
                  selectOne()
                when false # 不可以取消最后一行
                  selectMustOne()
            when 'multi' then selectAny()









  ###
    创建主体表格
    opts
  ###
  creatGrid:->
    id = @$ele.attr('id')
    classStr = ''
    classStr+=" selectable " if @opt.hoverRow is true  #  hover行效果 def:true开启 false 关闭
    classStr+=" compact " if @opt.compact is true  # 表格采用紧凑型 def:false非紧凑型 true 紧凑型
    switch @opt.alignHandle # 整体单元格样式 一般是对齐 def:center居中 left居左 right居右 其他值为class 优先级小于columns的align
      when 'center' then  classStr+= " center aligned "
      when 'left' then classStr+= " left aligned "
      when 'right' then classStr+= " right aligned "
      else classStr+= "#{@opt.alignHandle}"

    classStr+= " striped " if @opt.striped is true  # 是否采用条纹 def:true 采用 false不采用

    #构建table结构
    tableHtml = """
                 <div ids="tablePa" class="ui attached segment blurring the-p0b0">
                     <table id="#{id}" class="ui attached table #{classStr} the-wpm0">
                     </table>
                 </div>
                """
    @$ele.replaceWith tableHtml
    @$ele = $("##{id}")
    @$parEle = @$ele.parent()

    if @opt.height or @opt.maxHeight #设定高度并渲染插件滚动条
      if @opt.height>0
        @$parEle.css("height","#{@opt.height}px")
      else
        @$parEle.css("max-height","#{@opt.maxHeight}px")
      @$parEle.scrollbar({theme:'dark-thin',autoHideScrollbar:false})

    loadHtml = """
                <div ids="tableLoad" class="ui inverted dimmer">
                    <div class="ui indeterminate large text loader">Loading</div>
                </div>
               """
    @$parEle.append  loadHtml


  ###
    笼罩层
    opts
      unlock 解锁操作 true解锁
  ###
  lockCheck:(opts)->
    {unlock}=opts if opts
    if unlock # 解锁
      @loadLock = false
      clearTimeout(@loadLockTimeout)
    else
      if @loadLock
        if @xhr
          @xhr.abort()
          @xhr=null
        clearTimeout(@loadLockTimeout) if @loadLockTimeout
      @loadLock = true
      @loadLockTimeout = setTimeout(=>
        @loadLock = false
        @$parEle.dimmer('hide') if @opt.loadPrompt
        @opt.onLoadResults?() # datagrid得到数据后 回调 不管是否成功或者失败 data是标准的分页对象
        @opt.onLoadError?() # 加载失败后 回调
      ,@opt.loadLockTime)


  ###
    加载数据
    opts
  ###
  loadData:(opts)->
    {page}=opts if opts
    @lockCheck()
    page?=1
    @tableHeadToTop() # 滚动条置顶并刷新表头
    @opt.onBeforeLoad?() # datagrid加载之前 回调 相比load load主要是追加查询参数用
    if @opt.url
      searchInp = null
      if @$titleSearchInp or @$searchInp
        if @$titleSearchInp then searchInp = @$titleSearchInp.val()
        if @$searchInp then searchInp = @$searchInp.val()
      query = $.extend({page:page,size:parseInt(@opt.pageSize),sort:@sort,orderby:@orderby},{search:searchInp},@opt.queryParams)
      @loaderQuery = @opt.loader?(query:query) # 请求之前调用方法,返回对象将会作为查询条件的追加,返回fasle将终止查询
      if @loaderQuery isnt false
        @$parEle.dimmer(closable: false).dimmer('show') if @opt.loadPrompt
        jsonTool = $.jsonTool('ajax',{
          url:@opt.url
          data:$.extend(query,@loaderQuery)
          onSuccess:(data)=>
            @clearData()
            @page=data
            @opt.onLoadResults?({data:data}) # datagrid得到数据后 回调 不管是否成功或者失败 data是标准的分页对象
            @opt.onLoadSuccess?({data:data})# 成功加载后 回调
            if @opt.loadFilter
              @addData({rowsArr:@opt.loadFilter({data:data.list})})
            else
              @addData({rowsArr:data.list})
            @updatePage(data) # 更新分页栏  包括页码栏 页号数 分页栏
            @eventPage()
            @$parEle.dimmer('hide') if @opt.loadPrompt
            @tableHeadToTop() # 滚动条置顶并刷新表头
            @lockCheck(unlock:true)
          onError:(err)=>
            @$parEle.dimmer('hide') if @opt.loadPrompt
            @opt.onLoadResults?({err:err}) # datagrid得到数据后 回调 不管是否成功或者失败 data是标准的分页对象
            @opt.onLoadError?({err:err}) # 加载失败后 回调
            @lockCheck(unlock:true)
        })
        @xhr = jsonTool.xhr
    else
      if @opt.data
        @page ={}
        @clearData()
        @page.list = @opt.data
        @addData({rowsArr:@opt.data})



  ###
    添加表格数据
    opts
      rowsArr([Obj]) 数据对象数组
      location(str) 添加位置  def:botton底端添加 top顶端添加
  ###
  addData:(opts)->
    {rowsArr,location}=opts
    location?='botton' # 底端添加
    trHtml =''
    rowNum =0 # 已经包含行数
    rowNum = @$rowAll.length if @$rowAll
    thisNum = 0 # 将要添加行数
    row =null
    tdHtml = ''

    creatNum = => # 添加行号
      classStr = ''
      classStr +=' the-table-ord '
      classStr +=@opt.numAllStyle if @opt.numAllStyle
      classStr += "left aligned" if @opt.lineNum is 'left'
      classStr += "right aligned" if @opt.lineNum is 'right'
      classStr=""" class=" #{classStr}" """ if classStr
      if @opt.cumNum
        num = @page.startRow+rowNum+thisNum
      else
        num = rowNum+thisNum+1
      tdHtml+="<td #{classStr} >#{num}</td>"


    creatCheck = => # 添加行checkbox
      contHtml =''
      classStr = ''
      classStr +=@opt.checkAllStyle if @opt.checkAllStyle
      classStr += "left aligned" if @opt.checkbox is 'left'
      classStr += "right aligned" if @opt.checkbox is 'right'

      contHtml+="""
                    <div ids="tdCheckbox" class="ui checkbox fitted">
                        <input type="checkbox"><label></label>
                    </div>
                  """
      classStr=""" class=" #{classStr}" """ if classStr
      tdHtml+="<td #{classStr} >#{contHtml}</td>"


    creatTd = (opts)=> # 添加行
      {columnsRow,k} = opts
      classTdStr = ' the-datagrid-td '
      styleTdStr = ''
      styler = columnsRow.styler
      if styler # 单元格样式回调
        stylerCb = styler({row:row,cell:row[columnsRow.field]})
        if _.isObject stylerCb
          {className,style}=stylerCb
          classTdStr+=className if className
          styleTdStr+=style if style
        else
          styleTdStr+=stylerCb
      else # 单元格统一样式
        classTdStr+=columnsRow.allStyle if columnsRow.allStyle

      classTdStr+=" the-dn " if columnsRow.hidden is 'hide' or columnsRow.hidden is 'disa'

      styleTdStr+=" max-width:#{columnsRow.width}px;overflow: hidden; " if columnsRow.width >0

      styleTdStr+=" min-width:120px; "  if columnsRow.edit

      classTdStr =" class='#{classTdStr}' " if classTdStr
      styleTdStr =" style='#{styleTdStr}' " if styleTdStr

      if columnsRow.field
        fieldVal = row[columnsRow.field]
        fieldVal = columnsRow.formatter({column:fieldVal,row:row}) if columnsRow.formatter
      else
        fieldVal =columnsRow.formatter({row:row}) if columnsRow.formatter
      contHtml=''
      contHtml="""#{fieldVal}""" if fieldVal
      contHtml +="""<i class="edit icon teal the-ml10"></i>""" if columnsRow.edit

      tdHtml+="<td ids='c#{k}' #{classTdStr} #{styleTdStr}>#{contHtml}</td>"

    $.each rowsArr,(i,dataRow)=> # 遍历行
      thisNum =i
      row = dataRow
      rowStyler = @opt.rowStyler
      classTrStr = ''
      styleTrStr = ''
      classTrStr+=' disabled ' if @opt.disSelect?({row:row,rowId:i}) is false
      if rowStyler # 行格式回调
        rowStylerCb = rowStyler({row:row})
        if _.isObject rowStylerCb
          {className,style}=rowStylerCb
          classTrStr+=" #{className} " if className
          styleTrStr+=" #{style} " if style
        else
          styleTrStr+=" #{rowStylerCb} "
      else
        classTrStr+=" #{@opt.rowAllStyle} " if @opt.rowAllStyle
      classTrStr=" class='#{classTrStr}' " if classTrStr
      styleTrStr=" style='#{styleTrStr}' " if styleTrStr

      $.each @opt.columns,(k,columnsRow)=> # 遍历单元格
        if @opt.lineNum is 'left' and k is 0
          creatNum()
        if @opt.checkbox is 'left' and k is 0
          creatCheck()
        creatTd(k:k,columnsRow:columnsRow)
        if @opt.checkbox is 'right' and k is @opt.columns.length-1
          creatCheck()
        if @opt.lineNum is 'right' and k is @opt.columns.length-1
          creatNum()

      trHtml+="<tr ids='r#{rowNum+thisNum}' #{classTrStr} #{styleTrStr} >#{tdHtml}</tr>"
      tdHtml=''

    $tbody = @$ele.find('tbody')
    if $tbody.length>0
      switch location
        when 'botton' then  $tbody.append trHtml #从低端插入
        when 'top' then  $tbody.prepend trHtml # 从头部插入
        else
          if @$rowAll
            @$rowAll.eq(location).before trHtml
          else
            $tbody.prepend trHtml
    else
      @$ele.append("<tbody>#{trHtml}</tbody>")

    $tbody = @$ele.find('tbody')
    @$rowAll = @$ele.find('tbody tr')
    if (@opt.height or @opt.maxHeight) and @opt.showHeader #固定表格头部
      @$ele.floatThead(position: 'absolute',scrollContainer: true)
      # 调整表格数据滚动条高度
      scollHeight =@$parEle.find('.floatThead-container').css('height')
      @$parEle.find('.mCSB_draggerContainer').css('top',scollHeight)
      @$parEle.mCustomScrollbar('update')

    @eventGrid()
    @opt.onRowReady?()


  ###
    分页事件注册
    opts
  ###
  eventPage:->

    @$pageToolbar.find("[ids='pageBut']").off('click').on 'click',(e)=>
      pageNum = $(e.currentTarget).attr "pageNum"
      switch pageNum
        when '-1'
          if @page.prePage is 0 then @loadData({page:@page.pages})
          else @loadData({page:@page.prePage})
        when '-2'
          if @page.nextPage is 0 then @loadData()
          else @loadData({page:@page.nextPage})
        else
          @loadData({page:pageNum})


  ###
    更新分页栏  包括页码栏 页号数 分页栏
    opts
      pageNum 当前页号码
      pageSize 当前分页大小
      startRow 开始记录数
      endRow 结束记录数
      pages 总共多少页
      total 总共多少数据
      prePage 前一页页码
      nextPage 下页页码
      isFirstPage 是否是第一页
      isLastPage 是否是最后一页
  ###
  updatePage:(opts)->
    {pageNum
    pageSize
    startRow
    endRow
    pages
    total
    prePage
    nextPage
    isFirstPage
    isLastPage}=opts

    $pageSize = @$pageMenu.find("[ids='pageSize']").text("#{startRow}-#{endRow}") # 当前页记录统计
    $pageTotal = @$pageMenu.find("[ids='pageTotal']").text("#{total}") # 总记录数

    @$pageToolbar = @$pageMenu.find("[ids='pageToolbar']")
    if @opt.pagination is 'max'  # 全尺寸分页
      if @$pageToolbar.find("[ids='pageBut']").length is 3 # 初始化分页
        pageButHtml = ''
        if pages >=7
          for k in [1..4]
            classStr = if k is 1 then 'active' else ''
            pageButHtml +=""" <a ids='pageBut' pageNum='#{k}' class="item #{classStr} ">#{k}</a> """
          pageListHtml = ''
          for k in [1..pages]
            pageListHtml +="""<div ids='pageBut' pageNum='#{k}' class="item">#{k}</div>"""
          pageButHtml +="""
                        <div ids='pageDrop' class="ui item icon bottom left dropdown">
                                ...
                                <div class="menu tfoot-page-list the-bdrs-spc1">
                                    #{pageListHtml}
                                </div>
                        </div>
                        """
          pageButHtml +=""" <a ids='pageBut' pageNum='#{pages}' class="item">#{pages}</a> """
        else
          if pages is 0
            classStr =  'active'
            pageButHtml +=""" <a ids='pageBut' class="item #{classStr} " pageNum='1'>1</a> """
          else
            for k in [1..pages]
              classStr = if k is 1 then 'active' else ''
              pageButHtml +=""" <a ids='pageBut' class="item #{classStr} " pageNum='#{k}'>#{k}</a> """
        @$pageToolbar.find("[ids='pageBut']:eq(1)").replaceWith pageButHtml
      else # 非第一次加载
        pageButHtml = ''
        if pages >=7
          if pageNum >=4
            pageButHtml +=""" <a ids='pageBut' pageNum='1' class="item #{classStr} ">1</a> """
            if pageNum+1 < pages
              pageButHtml +="""
                              <a ids='pageBut' pageNum='#{pageNum-1}' class="item">#{pageNum-1}</a>
                              <a ids='pageBut' pageNum='#{pageNum}' class="item active">#{pageNum}</a>
                              <a ids='pageBut' pageNum='#{pageNum+1}' class="item">#{pageNum+1}</a>
                            """
            else
              if pageNum+1 is pages
                pageButHtml +="""
                              <a ids='pageBut' pageNum='#{pages-3}' class="item">#{pages-3}</a>
                              <a ids='pageBut' pageNum='#{pages-2}' class="item">#{pages-2}</a>
                              <a ids='pageBut' pageNum='#{pages-1}' class="item active">#{pages-1}</a>
                              """
              else
                pageButHtml +="""
                              <a ids='pageBut' pageNum='#{pages-3}' class="item">#{pages-3}</a>
                              <a ids='pageBut' pageNum='#{pages-2}' class="item">#{pages-2}</a>
                              <a ids='pageBut' pageNum='#{pages-1}' class="item">#{pages-1}</a>
                              """
            pageListHtml = ''
            for k in [1..pages]
              pageListHtml +="""<div ids='pageBut' pageNum='#{k}' class="item">#{k}</div>"""
            pageButHtml +="""
                          <div ids='pageDrop' class="ui item icon bottom left dropdown">
                                  ...
                                  <div class="menu tfoot-page-list the-bdrs-spc1">
                                      #{pageListHtml}
                                  </div>
                          </div>
                          """
            classStr = if pages is pageNum then 'active' else ''
            pageButHtml +=""" <a ids='pageBut' pageNum='#{pages}' class="item #{classStr}">#{pages}</a> """

          else
            for k in [1..4]
              classStr = if k is pageNum then 'active' else ''
              pageButHtml +=""" <a ids='pageBut' pageNum='#{k}' class="item #{classStr} ">#{k}</a> """
            pageListHtml = ''
            for k in [1..pages]
              pageListHtml +="""<div ids='pageBut' pageNum='#{k}' class="item">#{k}</div>"""
            pageButHtml +="""
                          <div ids='pageDrop' class="ui item icon bottom left dropdown">
                                  ...
                                  <div class="menu tfoot-page-list the-bdrs-spc1">
                                      #{pageListHtml}
                                  </div>
                          </div>
                          """
            pageButHtml +=""" <a ids='pageBut' pageNum='#{pages}' class="item">#{pages}</a> """
        else
          if pages is 0
            classStr =  'active'
            pageButHtml +=""" <a ids='pageBut' class="item #{classStr} " pageNum='1'>1</a> """
          else
            for k in [1..pages]
              classStr = if k is pageNum then 'active' else ''
              pageButHtml +=""" <a ids='pageBut' class="item #{classStr} " pageNum='#{k}'>#{k}</a> """
        @$pageToolbar.children(":not(:first,:last)").remove()
        @$pageToolbar.find("[ids='pageBut']:eq(0)").after pageButHtml
    if @opt.pagination is 'min'  # 小尺寸分页
      pageListHtml = ''
      for k in [1..pages]
        pageListHtml +="""<div ids='pageBut' pageNum='#{k}' class="item">#{k}</div>"""
      pageButHtml ="""
                    <div ids='pageDrop' class="ui item icon bottom left dropdown">
                            #{pageNum}
                            <div class="menu tfoot-page-list the-bdrs-spc1">
                                #{pageListHtml}
                            </div>
                    </div>
                    """
      @$pageToolbar.find("[ids='pageDrop']").replaceWith pageButHtml

    @$pageDropJump = @$pageToolbar.find("[ids='pageDrop']").dropdown()
    @$pageDropJump.find(".menu").scrollbar({theme:'dark-thin'})



  ###
    清除表格数据
    opts
  ###
  clearData:->
    @$ele.find("tbody tr").remove()
    @$thCheckbox.checkbox('set unchecked')
    @$rowAll =null
    @rowsArr =null
    @rowsArrKey=null
    @$selRowArr =null # 清空选中行jq对象
    @page = # 分页对象 其中包括页码 当前页数据等
      pageNum:1 # 当前页号码
      pageSize:0 # 当前分页大小
      startRow:0 # 开始记录数
      endRow:0 # 结束记录数
      pages:0 # 总共多少页
      total:0 # 总共多少数据
      prePage:0 # 前一页页码
      nextPage:0 # 下页页码
      isFirstPage:true # 是否是第一页
      isLastPage:true # 是否是最后一页
      list:[] # 数据数组集合
    @failButton()



  ###
    编辑单元格
    opts
      $cell 单元格jq对象
      columns 列属性对象
  ###
  editCell:(opts)->
    {index,$cell,columns,row}=opts
    naVal = $.trim($cell.text())
    @opt.onBeforeEdit?(index:index,field:columns.field,text:naVal,row:row)
    html="""
          <div ids='editText' class="ui fluid input action mini compact">
              <input type="text">
              <div ids='editConfirm' class="ui button mini compact icon teal"><i class="icon checkmark"></i></div>
              <div ids='editCancel' class="ui button mini compact icon teal"><i class="icon remove"></i></div>
          </div>
         """
    $cell.html html
    $cell.attr("edit",naVal)
    $edit = $cell.find("[ids='editText']")
    $editText = $edit.find("input") # 输入栏
    $editConfirm = $edit.find("[ids='editConfirm']") # 确认按钮
    $editCancel = $edit.find("[ids='editCancel']") # 取消按钮
    $editText.val(naVal).focus()
    # 屏蔽单双击冒泡事件
    $edit.off('click').on 'click',(e)->e.stopPropagation() if e and e.stopPropagation
    $edit.off('dblclick').on 'dblclick',(e)->e.stopPropagation() if e and e.stopPropagation

    endEdit = (opts)=>
      {newVal} = opts
      $cell.html """#{newVal}<i class="edit icon teal the-ml10"></i>"""
      $cell.removeAttr "edit"
      @opt.onEndEdit?(index:index,row:row,field:columns.field,setVal:newVal)

    $editConfirm.off('click').on 'click',(e)=>
      e.stopPropagation()
      newVal = $editText.val()
      if columns.editConfirm
        endEdit({newVal:newVal}) if columns.editConfirm(index:index,row:row,field:columns.field,naVal:naVal,newVal:newVal)
      else
        endEdit({newVal:newVal})

    $editCancel.off('click').on 'click',(e)=>
      e.stopPropagation()
      if columns.editCancel
        endEdit({newVal:naVal}) if columns.editCancel(index:index,row:row,field:columns.field,naVal:naVal)
      else
        endEdit({newVal:naVal})





  ###
    获取row数据对象
    opts
      index  null返回全部表格数据集合/num类型为根据位置获取/array[num]为获取多个/array[{fieldName:fieidVal}]根据对象值获取多个
  ###
  getRow:(opts)->
    {index}=opts if opts
    return null if !@page
    if index or index is 0
      if _.isNumber index # 数字类型
        return  if @page.list then _.clone(@page.list[index]) else null
      else
        if _.isArray index
          if _.isNumber index[0]
            list=[]
            $.each(index,(i,n)=>
              list.push _.clone(@page.list[n])
            )
            return list
          else
            if _.isObject index[0]
              list=[]
              $.each(index,(i,obj)=>
                $.each(@page.list,(k,row)=>
                  keys = _.keys(obj)
                  addIf = true
                  $.each(keys,(t,key)=>
                    if row[key] isnt _.values(obj)[t]
                      addIf = false
                  )
                  list.push _.clone(row) if addIf
                )
              )
              return list
    else # 返回全部
      return if @page.list then _.clone(@page.list) else null




  ###
    获取选中的行数据
    opts
      index  num/arr[num]/null  获取选中的行数据 null获取全部值数组  下标从0开始
  ###
  getSelected:(opts)->
    {index}=opts if opts
    return null if !@rowsArr
    if index
      if _.isNumber index
        return _.clone(@rowsArr[index])
      else
        if _.isArray index
          list=[]
          $.each(index,(i,k)=>
            list.push _.clone(@rowsArr[k])
          )
          return list
    else
      return _.clone(@rowsArr)

  ###
    获取单页未选中行数据
    opts
  ###
  getUnSelect:(opts)->
    _.difference(@page.list,@rowsArr)




  ###
    获取选择的行索引
    opts
  ###
  getSelIndex:(opts)->
    return @rowsArrKey


  ###
    根据jq节点获取上一级行row数据对象和index索引号,返回对象,格式为{index:8,row:Obj}
    opts
  ###
  getParentRow:(opts)->
    {jqEle} = opts
    $tr = jqEle.parents("tr[ids*='r']:eq(0)")
    num = parseInt $tr.prevAll().length
    row = @getRow(index:num)
    {index:num,row:row}


  ###
    清空选中行
    opts
  ###
  clearSelect:->
    notDis = @$ele.find("tbody tr:not(.disabled)")
    notDis.find("[ids='tdCheckbox']").checkbox('set unchecked')
    notDis.removeClass('warning').removeAttr('select')
    $.each(@rowsArr,(i,rowData)=>
      num = @rowsArrKey[i]
      @opt.onClickRow?({index:num,row:rowData})
    )
    @rowsArr=null # 清空选中行数据
    @rowsArrKey=null # 清空选择行号
    @$selRowArr =null # 清空选中行jq对象
    @$thCheckbox.checkbox('set unchecked')
    @failButton()




  ###
    全选
    opts
  ###
  selectAll:->
    notDis = @$ele.find("tbody tr:not(.disabled)")
    notDis.addClass('warning').attr('select','select')
    notDis.find("[ids='tdCheckbox']").checkbox('set checked')
    @rowsArr = [] # 清空选中行数据
    @rowsArrKey =[] # 清空选择行号
    @$selRowArr =[] # 清空选中行jq对象
    notDis.each((i,e)=>
      t = $(e)
      num = parseInt t.prevAll().length
#      num = parseInt t.attr('ids').substring(1)
      rowData = @page.list[num]
      @rowsArr.push rowData
      @rowsArrKey.push num
      @$selRowArr.push t
      @opt.onSelectRow?({index:num,row:rowData})
      @opt.onClickRow?({index:num,row:rowData})
    )
    if @$selRowArr and @$selRowArr.length > 0
      if @$selRowArr.length is @$rowAll.length
        @$thCheckbox.checkbox('set checked')
      else
        @$thCheckbox.checkbox('set indeterminate')
      @effButton()
    else
      @$thCheckbox.checkbox('set unchecked')




  ###
    设置url地址
    opts
      url:新的url地址
  ###
  setUrl:(opts)->
    {url}=opts if opts
    @opt.url = url if url



  ###
    加载数据
    opts
  ###
  load:(opts)->
    @opt.queryParams = $.extend({}, @opt.queryParams,opts) if opts
    @loadData()



  ###
    刷新当前页数据
    opts
  ###
  reload:->
    @loadData({page:@page.pageNum})


  ###
    选中某行 行号 0为第一行
    opts
      index num/array[num]/array[Obj(fieldName:fieidVal)]
  ###
  selectAnyRow:(opts)->
    {index}=opts if opts
    select=[]
    if _.isNumber index
      select.push index
    else
      if _.isArray index
        if _.isNumber index[0]
          $.each(index,(i,n)=>
            select.push n
          )
        else
          if _.isObject index[0]
            $.each(index,(i,obj)=>
              $.each(@page.list,(k,row)=>
                keys = _.keys(obj)
                addIf = true
                $.each(keys,(t,key)=>
                  if row[key] isnt _.values(obj)[t]
                    addIf = false
                )
                select.push k if addIf
              )
            )
    select = _.uniq select
    $.each(select,(i,k)=>
      $row = @$rowAll.eq(k)
      $checkbox = $row.find("td [ids='tdCheckbox']")
      rowData = @page.list[k]
      # 添加数据
      if !@rowsArr
        @rowsArr=[]
        @rowsArrKey=[]
        @$selRowArr=[]
      if _.indexOf(@rowsArrKey, k)<0
        @rowsArr.push rowData
        @rowsArrKey.push k
        # 添加复选
        $checkbox.checkbox('set checked')
        # 添加高亮
        $row.addClass('warning').attr('select','select')
        @$selRowArr.push $row
        @opt.onSelectRow?({index:k,row:rowData})
      @opt.onClickRow?({index:k,row:rowData})
    )
    if @$selRowArr and @$selRowArr.length > 0
      if @$selRowArr.length is @$rowAll.length
        @$thCheckbox.checkbox('set checked')
      else
        @$thCheckbox.checkbox('set indeterminate')
    else
      @$thCheckbox.checkbox('set unchecked')
    @effButton()




  ###
    清除某些行 行号 0为第一行 或者根据 健值对
    opts
      index num/array[num]/array[Obj(fieldName:fieidVal)]
  ###
  unselectAnyRow:(opts)->
    {index}=opts if opts
    return null if !@rowsArr
    select=[]
    if _.isNumber index
      select.push index
    else
      if _.isArray index
        if _.isNumber index[0]
          $.each(index,(i,n)=>
            select.push n
          )
        else
          if _.isObject index[0]
            $.each(index,(i,obj)=>
              $.each(@page.list,(k,row)=>
                keys = _.keys(obj)
                addIf = true
                $.each(keys,(t,key)=>
                  if row[key] isnt _.values(obj)[t]
                    addIf = false
                )
                select.push k if addIf
              )
            )
    select = _.uniq select
    $.each(select,(i,k)=>
      return if i is @$selRowArr.length-1 and @opt.selectCancel is false
      $row = @$rowAll.eq(k)
      $checkbox = $row.find("td [ids='tdCheckbox']")
      @opt.onClickRow?({index:k,row:@rowsArr[i]})
      # 删除数据
      $.each(@rowsArrKey,(i,key)=>
        if key is k
          @rowsArr.splice(i,1)
          @rowsArrKey.splice(i,1)
          @$selRowArr.splice(i,1)
          return
      )
      # 取消复选框
      $checkbox.checkbox('set unchecked')
      # 移除高亮
      $row.removeClass('warning').removeAttr('select')
    )
    if @$selRowArr and @$selRowArr.length > 0
      if @$selRowArr.length is @$rowAll.length
        @$thCheckbox.checkbox('set checked')
      else
        @$thCheckbox.checkbox('set indeterminate')
    else
      @$thCheckbox.checkbox('set unchecked')
      @failButton()



  ###
    保存编辑并恢复不可编辑
    opts
  ###
  saveEdit:(opts)->
    $cells = @$ele.find("tbody td[edit]")
    $cells.each(->
      $cell = $(@)
      $editText = $cell.find("input")
      newVal =  $editText.val()
      $cell.html("""#{newVal}<i class="edit icon teal the-ml10"></i>""")
    )
    $cells.removeAttr "edit"

  ###
    撤销编辑并恢复不可编辑
    opts
  ###
  cancelEdit:(opts)->
    $cells = @$ele.find("tbody td[edit]")
    $cells.each(->
      $cell = $(@)
      oldVal =  $cell.attr("edit")
      $cell.html """#{oldVal}<i class="edit icon teal the-ml10"></i>"""
    )
    $cells.removeAttr "edit"



  ###
    获取编辑状态的Cell单元格对象
    opts
  ###
  getEditors:()->
    $cells = @$ele.find("tbody td[edit]")
    reVal=[]
    $cells.each(->
      $cell = $(@)
      $editText = $cell.find("[ids='editText'] input")
      reVal.push {$cell:$cell,value:$editText.val()}
    )
    return reVal






  ###
    更新row行数据
    opts
      index 更新行位置
      row 根据数据
  ###
  updateRow:(opts)->
    {index,row} = opts
    $row = @$rowAll.eq(index)
    k = _.indexOf(@rowsArrKey, index)
    if k > -1 # 更新选中的数据
      oldRow = @rowsArr[k]
      @rowsArr[k] = $.extend({}, oldRow,row)
    oldRow = @page.list[index]
    @page.list[index] = $.extend({}, oldRow,row)

    $.each @opt.columns,(k,columnsRow)=>
      contHtml =''
      if columnsRow.field
        fieldVal = row[columnsRow.field]
        fieldVal = columnsRow.formatter({column:fieldVal,row:row}) if columnsRow.formatter
      else
        fieldVal =columnsRow.formatter({row:row}) if columnsRow.formatter
      contHtml+=""" #{fieldVal} """ if fieldVal
      contHtml+="""<i class="edit icon teal" style='margin-left: 10px'></i>""" if columnsRow.edit
      k++ if @opt.cumNum
      k++ if @opt.checkbox is 'left'
      $row.find("td").eq(k).html contHtml if contHtml
    @eventGrid()



  ###
    追加row行数据
    opts
      rowsArr([Obj]) 数据对象数组
  ###
  appendRow:(opts)->
    {rows} = opts
    # 存在页码等的未修改问题
    $.each rows,(i,dataRow)=>
      @page.list.push dataRow
      @page.total++
    @addData(rowsArr:rows)


  ###
    插入row行到某一行
    opts
      index 插入目标行索引
      row 插入数据数组
  ###
  insertRow:(opts)->
    {index,rows}=opts
    # 存在页码等的未修改问题
    $.each rows,(i,dataRow)=>
      @page.list.splice(index,0,dataRow)
      @page.total++
    @addData(rowsArr:rows,location:index)

  ###
    删除某一行
    opts
      index num类型为根据位置删除/array[num]为删除多个/array[{fieldName:fieidVal}]根据对象值删除多个
  ###
  deleteRow:(opts)->
    {index} = opts if opts
    return null if !@page
    delArr = []
    if index || index is 0
      if _.isNumber index # 数字类型
        delArr.push index
      else
        if _.isArray index
          if _.isNumber index[0]
            delArr = index
          else
            if _.isObject index[0]
              $.each(index,(i,obj)=>
                $.each(@page.list,(k,row)=>
                  keys = _.keys(obj)
                  addIf = true
                  $.each(keys,(t,key)=>
                    if row[key] isnt _.values(obj)[t]
                      addIf = false
                  )
                  delArr.push k
                )
              )
    else
      delArr = @rowsArrKey

    delArr = _.uniq delArr
    newList =[]
    newRowsArr =[]
    newRowsArrKey = []
    $newSelRowArr = []
    # 整理记录数据
    $.each(@page.list,(i,row)=>
      if _.indexOf(delArr, i)<0 then  newList.push row
    )
    @page.total = newList.length
    @page.list = newList

    # 整理jq数据
    $.each(delArr,(i,k)=>
      @$rowAll.eq(k).attr("del","del")
    )
    $pRow = @$rowAll.parent()
    $pRow.find("tr[del='del']").remove()
    @$rowAll = $pRow.find("tr")

    # 整理选中数据
    $.each(@rowsArrKey,(i,k)=>
      if _.indexOf(delArr, k)<0
        newRowsArrKey.push k
        newRowsArr.push @rowsArr[i]
        $newSelRowArr.push @$selRowArr[i]
    )
    @rowsArr = newRowsArr
    @rowsArrKey = newRowsArrKey
    @$selRowArr = $newSelRowArr


  ###
    显示列
    opts
      index(arr[str field名称])  str为field名称
  ###
  showColumn:(opts)->
    {index} = opts
    showArr = []
    $.each(@opt.columns,(i,columns)->
      if _.indexOf(index,columns.field)>-1
        showArr.push i
    )
    @tableHeadToTop()

    $.each(showArr,(i,column)=>
      @opt.columns[column].hidden = 'show'
      $th = @$theadTh.parent().find("[ids='c#{column}']")
      $th.removeClass "the-dn"
      if @$rowAll
        $td = @$rowAll.find("td[ids='c#{column}']")
        $td.removeClass "the-dn"
      @$columnsShowDropdown.find("[ids='checkbox'][column='#{column}']").checkbox('set checked') if @$columnsShowDropdown
      @$titleColumnsShowDropdown.find("[ids='titleCheckbox'][column='#{column}']").checkbox('set checked') if @$titleColumnsShowDropdown
    )
    @checkAllShowBox()


  ###
    隐藏列
    opts
      index arr[str field名称] str为field名称
  ###
  hideColumn:(opts)->
    {index} = opts
    hideArr = []
    $.each(@opt.columns,(i,columns)->
      if _.indexOf(index,columns.field)>-1
        hideArr.push i
    )

    # 在有滚动条状态下 移动到顶端 在进行表头高度调整
    if hideArr and (@opt.height or @opt.maxHeight) and @opt.showHeader
#移至顶端再进行刷新
      @$parEle.find(".mCSB_scrollTools .mCSB_dragger").eq(0).css('top','0px')
      @$parEle.find(".mCSB_container").eq(0).css('top','0px')
      @$ele.floatThead('reflow')
      # 调整表格数据滚动条高度
      setTimeout(=>
        scollHeight =@$parEle.find('.floatThead-container').css('height')
        @$parEle.find('.mCSB_draggerContainer').css('top',scollHeight)
        @$parEle.mCustomScrollbar('update')
      ,300)

    $.each(hideArr,(i,column)=>
      @opt.columns[column].hidden = 'hide'
      $th = @$theadTh.parent().find("[ids='c#{column}']")
      $th.addClass "the-dn"
      if @$rowAll
        $td = @$rowAll.find("td[ids='c#{column}']")
        $td.addClass "the-dn"
      @$columnsShowDropdown.find("[ids='checkbox'][column='#{column}']").checkbox('set unchecked') if @$columnsShowDropdown
      @$titleColumnsShowDropdown.find("[ids='titleCheckbox'][column='#{column}']").checkbox('set unchecked') if @$titleColumnsShowDropdown
    )
    if @$columnsShowDropdown
      allChecked = true
      allUnchecked = true
      $fuCheckbox = @$columnsShowDropdown.find("[ids='fuCheckbox']")
      $checkbox = @$columnsShowDropdown.find("[ids='checkbox']")
      $checkbox.each((i)->
        if $(@).checkbox('is checked')
          allUnchecked = false
        else
          allChecked = false
        true
      )
      if allChecked
        $fuCheckbox.checkbox('set checked')
      else if allUnchecked
        $fuCheckbox.checkbox('set unchecked')
      else
        $fuCheckbox.checkbox('set indeterminate')
    if @$titleColumnsShowDropdown
      allChecked = true
      allUnchecked = true
      $fuCheckbox = @$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']")
      $checkbox = @$titleColumnsShowDropdown.find("[ids='titleCheckbox']")
      $checkbox.each((i)->
        if $(@).checkbox('is checked')
          allUnchecked = false
        else
          allChecked = false
        true
      )
      if allChecked
        $fuCheckbox.checkbox('set checked')
      else if allUnchecked
        $fuCheckbox.checkbox('set unchecked')
      else
        $fuCheckbox.checkbox('set indeterminate')



  ###
    依据某列进行排序
    opts null则
      sort 排序field字段名
      orderby 排序方向 desc倒序 asc 正序
  ###
  sortColumn:(opts)->
    {sort,orderby} = opts if opts
    k=''
    $.each(@opt.columns,(i,columns)->
      k=i if columns.field is sort
    )
    $i=@$parEle.find("thead th[ids='c#{k}'] i.icon.sort")
    resIco = => # 刷新排序图标
      @$theadTh.find('i.icon.sort').removeClass("ascending descending")
    switch orderby
      when 'desc'
        resIco()
        $i.attr("class",'icon sort descending')
        @sort=sort
        @orderby='desc'

      when 'asc'
        resIco()
        $i.attr("class",'icon sort ascending')
        @sort=sort
        @orderby='asc'
      else
        resIco()
        $i.attr("class",'icon sort')
        @sort=null
        @orderby=null
    @opt.onBeforeSortColumn?(sort:@sort,order:@orderby)
    @loadData()

  ###
    设置表头标题文本
    opts
      title 标题信息
  ###
  setTitle:(opts)->
    {title} = opts if opts
    @$title.find("[ids='titleStr']").html title


  ###
    获取表头标题文本
    opts
  ###
  getTitle:()->
    @$title.find("[ids='titleStr']").html()

  ###
    让必选按钮生效
    opts
  ###
  effButton:()->
    $.each(@opt.funToolbar,(i,butObj)=>@$handerButtonFn.eq(i).removeClass('disabled') if butObj.selectRow)if @$handerButtonFn
    $.each(@opt.titleFunToolbar,(i,butObj)=>@$titleHanderButtonFn.eq(i).removeClass('disabled') if butObj.selectRow)if @$titleHanderButtonFn

  ###
    让必选按钮失效
    opts
  ###
  failButton:()->
    $.each(@opt.funToolbar,(i,butObj)=>@$handerButtonFn.eq(i).addClass('disabled') if butObj.selectRow)if @$handerButtonFn
    $.each(@opt.titleFunToolbar,(i,butObj)=>@$titleHanderButtonFn.eq(i).addClass('disabled') if butObj.selectRow)if @$titleHanderButtonFn


  ###
    下拉方向
    opts
  ###
  dropDire:(opts)->
    {$ele,height}=opts
    tr = $ele.parents("tr[ids*='r']:eq(0)")
    nextAll = tr.nextAll()
    nextTrHeigth = 0 # 后面的高度
    nextAll.each((i,ele)->
      nextTr = $(ele).css('height')
      nextTrHeigth +=parseInt nextTr.substring(0,nextTr.indexOf('px'))
    )
    if  nextTrHeigth>=height then true
    else
      befAll = tr.prevAll()
      befTrHeigth = 0 # 前端的高度
      befAll.each((i,ele)->
        befTr = $(ele).css('height')
        befTrHeigth +=parseInt befTr.substring(0,befTr.indexOf('px'))
      )
      trHeigth = tr.css('height')
      trHeigth = parseInt trHeigth.substring(0,trHeigth.indexOf('px'))
      scollHeight =@$parEle.find('.floatThead-container').css('height')
      scollHeight = parseInt scollHeight.substring(0,scollHeight.indexOf('px'))
      tableHeight = @$parEle.parents(".mCustomScrollBox:eq(0)").css('height')
      tableHeight = parseInt tableHeight.substring(0,tableHeight.indexOf('px'))
      if befTrHeigth+trHeigth+height<(tableHeight-scollHeight) then true else false



######################################################
  ###
    查询组件构造成功后 回调
    opts
  ###
  onBeforeLoad:(opts)->
    @opt.onBeforeLoad=opts


  ###
    datagrid得到数据后
    opts
  ###
  onLoadResults:(opts)->
    @opt.onLoadResults=opts

  ###
    成功加载后 回调
    opts
  ###
  onLoadSuccess:(opts)->
    @opt.onLoadSuccess=opts

  ###
    加载失败后 回调
    opts
  ###
  onLoadError:(opts)->
    @opt.onLoadError=opts

  ###
    表格数据填充完成后 回调
    opts
  ###
  onRowReady:(opts)->
    @opt.onRowReady=opts

  ###
    清空查询按钮点击 回调
    opts
  ###
  onSelectClear:(opts)->
    @opt.onSelectClear=opts

  ###
    单击选中行后 回调
    opts
  ###
  onSelectRow:(opts)->
    @opt.onSelectRow=opts

  ###
    单击选中行后 回调
    opts
  ###
  onClickRow:(opts)->
    @opt.onClickRow=opts

  ###
    双击行后 回调
    opts
  ###
  onDblClickRow:(opts)->
    @opt.onDblClickRow=opts

  ###
    点击单元格 回调
    opts
  ###
  onClickCell:(opts)->
    @opt.onClickCell=opts

  ###
    双击单元格 回调
    opts
  ###
  onDblClickCell:(opts)->
    @opt.onDblClickCell=opts


  ###
    列排序前 回调
    opts
  ###
  onBeforeSortColumn:(opts)->
    @opt.onBeforeSortColumn=opts

  ###
    开始编辑状态前 回调
    opts
  ###
  onBeforeEdit:(opts)->
    @opt.onBeforeEdit=opts


  ###
    开始编辑状态 回调
    opts
  ###
  onBeginEdit:(opts)->
    @opt.onBeginEdit=opts

  ###
    结束编辑状态后 回调
    opts
  ###
  onEndEdit:(opts)->
    @opt.onEndEdit=opts




(->
  $.fn.datagrid = (opts,others...)->
    obj = this.data("obj")
    if obj
      obj.perform(opts,others...)
    else
      obj = new datagrid(this,opts,others...)
      this.data("obj",obj)
    return obj

  # 表格全局参数
  $.fn.datagrid.opts ={}
)()