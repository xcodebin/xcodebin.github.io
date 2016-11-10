# About: 下拉树插件
# Other:
# Created: Xiejinghang on 16/7/3 23:00 pm.
# Editored: Xiaolong WU on 16/8/10 下午3:24.
# VersionHistory:
#   V16.08.10  进行优化 完善
#   V16.07.15  初始化构造
# Dependencies:
#   jquery  ^2.2.2
#   semantic ^2.1.8
#   malihu-custom-scrollbar-plugin ^3.1.3
#   underscore  ^1.8.3
#   jstree ^3.3.1
# TODO:
#
###
Api:
  attr 属性 可以console.log打印下即可知道对象属性和方法
      $ele 下拉树组件对象jq节点对象
      $treeList 树列表jq节点对象
      $defInfo 默认提示节点
      $searchTreeInp 查询输入框对象
      $searchTreeBut 查询按钮对象
      $treeValue tree的值
      selectArr 选择节点数据
      data tree数据对象

  opt 配置
      url(str):获取数据地址  当为null时无加载显示  url与data只有一个会生效
      data(str):静态数据初始化  结构为json
      name(str):控件的name值 默认为dropTree
      initLoad(bool):初始化是否载入数据 def:true 载入数据 false 不初始化载入数据
      queryParams(obj): 数据参数 {name: 'easyui',subject: 'datagrid'}
      loader(fn(query请求参数)):请求之前调用方法,返回对象将会作为查询条件的追加,返回参数对象进行查询 返回false将终止查询
      loadFilter(fn(data)):加载成功后可对数据进行调整/过滤最终返回数据 data为json格式
      selectWay(str):选择方式 def: radio只能单选  multi 可多选
      multiUnitText(str):多选时描述的单位 def:"个" 如:"已选 1 个机构"此时 multiUnitText的值就是"个机构"
      promptText(str):输入框空值提示文本 def:"请选择"
      selectText(str):检索框空值提示文本 def:"搜索信息"
      defValueId(array[id]):默认值选中
      maxHeight(num):最大高度,def:200 px
      openAllNode(bool):加载完展开全部节点 def:false 不展开 true展开
      onDropReady(fn):下拉组件初始化完成后 回调
      onLoadReady(fn(data加载到的数据json)):树数据加载完成后 回调
      onMakeReady(fn):下拉组件最后构建完成后 回调
      onSelectNode(fn(node节点数据,selectArr全部选中信息)):单击选中节点后 回调 返回tree node对象
      onUnSelectNode(fn(node节点数据,selectArr全部选中信息)):单击取消选中节点后 回调 返回tree node对象
      onChangeSelectNode(fn(node节点数据,selectArr全部选中信息)):改变选中节点后 回调 返回tree node对象
      onShowDrop(fn):展示下拉树前回调
      onHideDrop(fn):隐藏下拉树前回调
      onClearSelect(fn)清空选择回调


  fn 方法
      setUrl(url):设置获取数据url地址
      setData(data): 设置静态数据初始化 结构为json
      getDate(): 获取树data数据
      showDrop(): 展示下拉树
      hideDrop(): 隐藏下拉树
      selectNode(nodeId:str/array[str]): 根据树节点id 选中节点
      unSelectNode(nodeId:str/array[str]): 根据树节点id 取消选中节点
      clearSelect(): 清空选择
      ?addData(data): 添加数据至tree结构  json结构str数据
      loadTree(params 参数信息):加载树信息 params 结构如下{name: 'easyui',subject: 'datagrid'}
      getSelects():获取选中节点数据对象 返回array[obj] obj包含:"id"节点id "parent"父节点id "text"文本名称

  event 事件
      onDropReady(fn):下拉组件初始化完成后 回调
      onLoadReady(fn(data加载到的数据json)):树数据加载完成后 回调
      onMakeReady(fn):下拉组件最后构建完成后 回调
      onSelectNode(fn(node节点数据,selectArr全部选中信息)):单击选中节点后 回调 返回tree node对象
      onUnSelectNode(fn(node节点数据,selectArr全部选中信息)):单击取消选中节点后 回调 返回tree node对象
      onChangeSelectNode(fn(node节点数据,selectArr全部选中信息)):改变选中节点后 回调 返回tree node对象
      onShowDrop(fn):展示下拉树前回调
      onHideDrop(fn):隐藏下拉树前回调
      onClearSelect(fn)清空选择回调


###








class droptree

  constructor:(@$ele,opts,others...)->
    @defaults= # 默认参数
      name:'dropTree' # 控件的name值 默认为dropTree
      initLoad:true # 初始化是否载入数据 def:true 载入数据 false 不初始化载入数据
      selectWay:"radio" # 选择方式 def: radio只能单选  multi 可多选
      multiUnitText:"个" # 多选时描述的单位 def:"个" 如:"已选 1 个机构"此时 multiUnitText的值就是"个机构"
      promptText:"请选择" # 输入框空值提示文本 def:"请选择"
      selectText:"搜索信息" # 检索框空值提示文本 def:"搜索信息"
      maxSelect:0 # 最大选择数,def:0 无限制,>0时仅对selectWay为"multi"多选模式起作用
      maxHeight:200 #最大高度,def:200 px
      openAllNode:false # 加载完展开全部节点 def:false 不展开 true展开



    @opt = $.extend({}, @defaults,$.fn.droptree.opts, opts)
    @creatTree()
    @loadTree() if @opt.initLoad and (@opt.data or @opt.url)  # 加载数据

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
    树事件
    opts
  ###
  eventDrop:->
    # 清理按钮
    @$clearBut.off('click').on 'click',(e)=>
      @clearSelect()
      @hideDrop()

    # 查询按钮
    @$searchTreeBut.off('click').on 'click',(e)=>
      @searchTree()

    # 查询栏
    @$searchTreeInp.off('keydown').on 'keydown',(e)=>
      if e.keyCode==13
        @searchTree()
        e.stopPropagation()


  ###
    创建树节点
    opts
  ###
  creatTree:->
    html = """
            <div class="ui selection dropdown the-droptree">
              <i class="dropdown icon"></i>
              <input ids='treeValue' style='display: none;' name="#{@opt.name}">
              <div ids='defInfo' class="default text">#{@opt.promptText}</div>
              <div class="menu tree-content">
                <div class="ui input action">
                  <input ids='searchTreeInp' type="text" placeholder="#{@opt.selectText}" />
                  <button ids='searchTreeBut' type="button" class="ui teal button icon">
                    <i class="icon refresh"></i>
                  </button>
                </div>
                <div class="ui divider"></div>
                <div ids='treeList'></div>
                <div class="ui divider"></div>
                <div class="droptree-foot">
                  <button ids='clearBt' type="button" class="teal ui button fluid">清空选择</button>
                </div>
                <div class="item the-dn active selected"></div>
              </div>
            </div>
           """
    @$ele.after(html)
    $dropTree = @$ele.next()
    $dropTree.data("obj",@$ele.data("obj"))
    @$ele.remove()
    @$ele = $dropTree
    @$treeList = @$ele.find("[ids='treeList']")
    @$defInfo  = @$ele.find("[ids='defInfo']")
    @$clearBut =  @$ele.find("[ids='clearBt']")
    @$searchTreeInp = @$ele.find("[ids='searchTreeInp']")
    @$searchTreeBut = @$ele.find("[ids='searchTreeBut']")
    @$treeValue =  @$ele.find("[ids='treeValue']")
    @$ele.dropdown(
      onShow:=>
        height = @$ele.css('height')
        height = height.substring(0,height.indexOf('px'))
        maxHeight = $(window).height()-@$ele.offset().top-height-20-40-41
        if @opt.maxHeight> parseInt(maxHeight)
          if maxHeight>100
            @$treeList.css("height","#{maxHeight}px")
          else
            @$treeList.css("height","100px")
        else
          @$treeList.css("height","#{@opt.maxHeight}px")
        @opt.onShowDrop?()
      onHide:=>
        @opt.onHideDrop?()
    )
    @opt.onDropReady?() # 下拉组件初始化完成后 回调
    @eventDrop()



  ###
    加载树数据
    opts
  ###
  loadTree:(opts)->
    if @opt.url
      query = if opts then  $.extend({}, @opt.queryParams,opts) else @opt.queryParams
      @loaderQuery = @opt.loader?(query:query) # 请求之前调用方法,返回对象将会作为查询条件的追加,返回fasle将终止查询
      if @loaderQuery isnt false
        $.jsonTool('ajax',{
          url:@opt.url
          data:$.extend(query,@loaderQuery)
          onSuccess:(data)=>
            treeData = data.data
            treeData = eval("(" + treeData + ")") if _.isString treeData
            if treeData and treeData.length>0
              if @opt.loadFilter
                @makeTree({treeData:@opt.loadFilter({data:treeData})})
              else
                @makeTree({treeData:treeData})
            @opt.onLoadReady?(data:treeData) # 树数据加载完成后 回调
          onError:(err)=>
            console.log "树数据加载error"
            #todo
        })
    else
      if @opt.data
        treeData = @opt.data
        treeData = eval("(" + treeData + ")") if _.isString treeData
        if treeData and treeData.length>0
          if @opt.loadFilter
            @makeTree({treeData:@opt.loadFilter({data:treeData})})
          else
            @makeTree({treeData:treeData})
        @opt.onLoadReady?(data:treeData) # 树数据加载完成后 回调


  ###
    树事件
    opts
  ###
  eventTree:->
    @$treeList.unbind('loaded.jstree').on("loaded.jstree",(event, data)=>
      @$treeList.jstree("open_all") if @opt.openAllNode # 是否全部展开
      if @opt.defValueId and @opt.defValueId.length>0 # 构造默认值
        @selectNode(nodeId:@opt.defValueId)
    )

    # 选择节点
    @$treeList.unbind('select_node.jstree').bind("select_node.jstree",(node,selected)=>
      @updateValue()
      @opt.onSelectNode?(node:selected.node,selectArr:@selectArr) # 单击选中节点后 回调
      @opt.onChangeSelectNode?(node:selected.node,selectArr:@selectArr) # 改变选中节点后 回调
      @hideDrop() if @opt.selectWay is 'radio'
    )

    # 取消选择节点
    @$treeList.unbind('deselect_node.jstree').bind("deselect_node.jstree",(node,selected)=>
      @updateValue()
      @opt.onUnSelectNode?(node:selected.node,selectArr:@selectArr) # 单击取消选中节点后 回调
      @opt.onChangeSelectNode?(node:selected.node,selectArr:@selectArr) # 改变选中节点后 回调
    )



  ###
    构造tree
    opts
  ###
  makeTree:(opts)->
    {treeData}=opts
    treeConfig =
      "core":
        "data": treeData
        "themes":
          "icons": false
          "dots": false
      "search":
        "case_insensitive": true
        "show_only_matches": true

    switch @opt.selectWay # 单选多选处理
      when 'radio'
        treeConfig.plugins = ["search"]
      when 'multi'
        treeConfig.plugins = ["checkbox", "search"]
        treeConfig.checkbox =
          "keep_selected_style": false

    @$treeList.jstree('destroy') if @$treeList
    @$treeList.jstree(treeConfig).bind 'ready.jstree',(event, data)=>
      @opt.onMakeReady?()
    @eventTree()


  ###
    设置url地址
    opts
      url:新的url地址
  ###
  setUrl:(opts)->
    {url}=opts if opts
    @opt.url = url if url

  ###
    设置数据
    opts
      data 静态数据初始化 结构为json
  ###
  setData:(opts)->
    {data}=opts if opts
    @opt.data = data if data
    @loadTree()

  ###
    获取树data数据
    opts
  ###
  getDate:(opts)->
    @opt.data

  ###
    展示下拉树
    opts
  ###
  showDrop:(opts)->
    @$ele.dropdown('show')



  ###
    隐藏下拉树
    opts
  ###
  hideDrop:(opts)->
    @$ele.dropdown('hide')



  ###
    根据树节点id 选中节点
    opts
      nodeId  str/array[str] 节点id 选中节点
  ###
  selectNode:(opts)->
    {nodeId} = opts
    # @$searchTreeInp.val('')
    # @$treeList.jstree('search', '')
    if _.isString nodeId
      @clearSelect() if @opt.selectWay is 'radio'
      @$treeList.jstree('select_node', nodeId)
    if _.isArray nodeId
      if @opt.selectWay is 'radio'
        @clearSelect() if @opt.selectWay is 'radio'
        @$treeList.jstree('select_node', nodeId[0])
      else
        @$treeList.jstree('select_node', nodeId)

  ###
    根据树节点id 取消选中节点
    opts
      nodeId  str/array[str]  树节点id
  ###
  unSelectNode:(opts)->
    {nodeId} = opts
    if _.isString nodeId
      @$treeList.jstree('deselect_node', nodeId)
    if _.isArray nodeId
      if @opt.selectWay is 'radio'
        @$treeList.jstree('deselect_node', nodeId[0])
      else
        @$treeList.jstree('deselect_node', nodeId)


  ###
    更新下拉框值
    opts
  ###
  updateValue:(opts)->
    @selectArr= @$treeList.jstree('get_selected',true)
    if @opt.selectWay is 'radio'
      @$treeValue.val true
      @$ele.dropdown('set text', @selectArr[0].text)
    else
      if @selectArr.length>0
        @$treeValue.val true
        @$ele.dropdown('set text', "已选 #{@selectArr.length} #{@opt.multiUnitText}")
      else
        @clearSelect()


  ###
    清空选择
    opts
  ###
  clearSelect:()->
    @selectArr = null
    @$treeList.jstree('deselect_all')
    @$searchTreeInp.val('') # 清空搜索框
    @$treeList.jstree('search', '') # 清空搜索内容
    if @opt.defValueId # 有默认值
      nodeId = @opt.defValueId
      if _.isString nodeId
        @$treeList.jstree('select_node', nodeId)
      if _.isArray nodeId
        if @opt.selectWay is 'radio'
          @$treeList.jstree('select_node', nodeId[0])
        else
          @$treeList.jstree('select_node', nodeId)
    else # 无默认值
      @$treeValue.val ''
      @$ele.dropdown('set text', null)
      @$defInfo.addClass("default").text("#{@opt.promptText}")
      @opt.onChangeSelectNode?(node:null,selectArr:@selectArr) # 改变选中节点后 回调
    @opt.onClearSelect?() # 清空选择回调

  ###
    检索树节点
    opts
  ###
  searchTree:()->
    seaVal = @$searchTreeInp.val()
    @$treeList.jstree('search', seaVal)


  ###
    获取选择节点数据对象集合
    opts
  ###
  getSelects:()->
    @selectArr

  ###
    下拉组件初始化完成后 回调
    opts
  ###
  onDropReady:(opts)->
    @opt.onDropReady=opts

  ###
    树数据加载完成后 回调
    opts
  ###
  onLoadReady:(opts)->
    @opt.onLoadReady=opts

  ###
    单击选中节点后 回调
    opts
  ###
  onSelectNode:(opts)->
    @opt.onSelectNode = opts

  ###
    单击取消选中节点后 回调
    opts
  ###
  onUnSelectNode:(opts)->
    @opt.onUnSelectNode = opts

  ###
    改变选中节点后 回调 返回tree node对象
    opts
  ###
  onChangeSelectNode:(opts)->
    @opt.onChangeSelectNode = opts

  ###
    展示下拉树前回调
    opts
  ###
  onShowDrop:(opts)->
    @opt.onShowDrop = opts

  ###
    隐藏下拉树前回调
    opts
  ###
  onHideDrop:(opts)->
    @opt.onHideDrop = opts

  ###
    清空选择回调
    opts
  ###
  onClearSelect:(opts)->
    @opt.onClearSelect = opts


  ###
    下拉组件最后构建完成后 回调
    opts
  ###
  onMakeReady:(opts)->
    @opt.onMakeReady = opts



(->
  $.fn.droptree = (opts,others...)->
    obj = this.data("obj")
    if obj
      obj.perform(opts,others...)
    else
      obj = new droptree(this,opts,others...)
      this.data("obj",obj)
    return obj

  # 全局参数
  $.fn.droptree.opts ={}
)()