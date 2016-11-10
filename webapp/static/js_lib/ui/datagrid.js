
/*
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
 */
var datagrid,
  slice = [].slice;

datagrid = (function() {
  function datagrid() {
    var $ele1, base, opts, others;
    $ele1 = arguments[0], opts = arguments[1], others = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    this.$ele = $ele1;
    this.defaults = {
      height: 0,
      maxHeight: 0,
      hoverRow: true,
      compact: false,
      showHeader: true,
      alignHandle: 'left',
      loadLockTime: 8000,
      titleToolbarShow: false,
      titleSearchInpShow: true,
      titleRefreshBut: true,
      titleColumnsShow: true,
      striped: true,
      initLoad: true,
      toolbarShow: true,
      searchInpShow: true,
      refreshBut: true,
      columnsShow: true,
      funClass: 'mini compact basic',
      loadMsg: '加载稍等..',
      loadPrompt: true,
      pagination: 'max',
      pageSize: 15,
      pageList: [15, 30, 100, 200],
      selectWay: 'multi',
      selectCancel: true,
      lineNum: false,
      cumNum: false,
      checkbox: 'left'
    };
    this.opt = $.extend({}, this.defaults, $.fn.datagrid.opts, opts);
    this.loadLock = false;
    this.loadLockTimeout = null;
    this.page = {
      pageNum: 1,
      pageSize: 0,
      startRow: 0,
      endRow: 0,
      pages: 0,
      total: 0,
      prePage: 0,
      nextPage: 0,
      isFirstPage: true,
      isLastPage: true,
      list: []
    };
    this.creatGrid();
    this.creatTitle();
    this.creatGridThead();
    this.creatHeadMenu();
    this.creatPageMenu();
    this.eventGrid();
    this.eventTitle();
    this.eventGridThead();
    this.eventHeadMenu();
    this.eventPageMenu();
    if (typeof (base = this.opt).onGridReady === "function") {
      base.onGridReady();
    }
    this.setPopup();
    if (this.opt.initLoad) {
      this.loadData();
    }
  }


  /*
    执行路由
    opts
   */

  datagrid.prototype.perform = function() {
    var fun, opts, others;
    opts = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (_.isObject(opts)) {
      return this.opt = $.extend({}, this.opt, opts);
    } else {
      if (_.isString(opts)) {
        fun = eval("this." + opts);
        return fun(others[0]);
      }
    }
  };


  /*
    设置冒泡
    opts
   */

  datagrid.prototype.setPopup = function(opts) {
    var $popup;
    $popup = this.$parEle.parent().find("[data-content]");
    return $popup.popup({
      position: 'top center',
      delay: {
        show: 800
      }
    });
  };


  /*
    标题栏事件注册
    opts
   */

  datagrid.prototype.eventTitle = function() {
    var $checkbox, $fuCheckbox, t;
    if (this.opt.titleToolbarShow || this.opt.titleFunToolbar) {
      if (this.$titleRefreshBut) {
        this.$titleRefreshBut.off('click').on('click', (function(_this) {
          return function(e) {
            return _this.reload();
          };
        })(this));
      }
      if (this.$titleClearSearchBut) {
        this.$titleClearSearchBut.off('click').on('click', (function(_this) {
          return function(e) {
            var base;
            if (_this.$titleSearchInp) {
              _this.$titleSearchInp.val(null);
            }
            if (_this.$titleSearchDropdown) {
              _this.$titleSearchDropdown.dropdown('hide');
            }
            if (typeof (base = _this.opt).onSelectClear === "function") {
              base.onSelectClear();
            }
            return _this.loadData();
          };
        })(this));
      }
      if (this.$titleSearchInp) {
        this.$titleSearchInp.on('keydown', (function(_this) {
          return function(e) {
            if (e.keyCode === 13) {
              return _this.loadData();
            }
          };
        })(this));
      }
      if (this.$titleColumnsShowDropdown) {
        $fuCheckbox = this.$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']");
        $checkbox = this.$titleColumnsShowDropdown.find("[ids='titleCheckbox']").checkbox();
        $fuCheckbox.checkbox({
          onChecked: function() {
            return $checkbox.checkbox('check');
          },
          onUnchecked: function() {
            return $checkbox.checkbox('uncheck');
          }
        });
        t = this;
        return $checkbox.checkbox({
          onChange: (function(_this) {
            return function() {
              return t.checkAllShowBox();
            };
          })(this),
          onChecked: function() {
            var $td, $th, cid;
            t.tableHeadToTop();
            cid = $(this).val();
            t.opt.columns[cid].hidden = 'show';
            $th = t.$theadTh.parent().find("[ids='c" + cid + "']");
            $td = t.$rowAll.find("td[ids='c" + cid + "']");
            $th.removeClass("the-dn");
            return $td.removeClass("the-dn");
          },
          onUnchecked: function() {
            var $td, $th, cid;
            t.tableHeadToTop();
            cid = $(this).val();
            t.opt.columns[cid].hidden = 'hide';
            $th = t.$theadTh.parent().find("[ids='c" + cid + "']");
            $td = t.$rowAll.find("td[ids='c" + cid + "']");
            $th.addClass("the-dn");
            return $td.addClass("the-dn");
          }
        });
      }
    }
  };


  /*
    创建标题栏
    opts
   */

  datagrid.prototype.creatTitle = function() {
    var $titleFuCheckbox, allChecked, allUnchecked, base, buttonHtml, buttonsHtml, columnsShowBarHtml, handlerArr, otherButHtml, radiusClass, searchHtml, searchInpHtml, title, titleColumnsHtml, titleFunToolbar, titleHtml, titleRefreshButHtml, toolbarHtml;
    if (this.opt.title) {
      title = '';
      if (typeof this.opt.title === 'function') {
        title = this.opt.title();
      } else {
        title = this.opt.title;
      }
    }
    titleFunToolbar = this.opt.titleFunToolbar;
    if (this.opt.titleToolbarShow || titleFunToolbar) {
      radiusClass = '';
      searchInpHtml = '';
      if (this.opt.titleSearchInpShow) {
        searchInpHtml = "<input ids=\"titleSearchInp\" type=\"text\" placeholder=\"搜索...\" data-content=\"输入查询信息,回车进行检索\" data-variation=\"mini inverted\">";
        radiusClass = 'input';
      } else {
        radiusClass = 'buttons';
      }
      titleRefreshButHtml = '';
      if (this.opt.titleRefreshBut) {
        titleRefreshButHtml = "<div ids=\"titleRefreshBut\" class=\"ui button mini compact icon teal \" data-content=\"刷新数据\" data-variation=\"mini inverted\"><i class=\"icon refresh\"></i></div>";
      }
      titleColumnsHtml = '';
      if (this.opt.titleColumnsShow) {
        columnsShowBarHtml = '';
        $.each(this.opt.columns, function(i, columnsObj) {
          if (columnsObj.hidden == null) {
            columnsObj.hidden = 'show';
          }
          if (columnsObj.title && columnsObj.hidden !== 'disa') {
            return columnsShowBarHtml += "<div ids='titleCheckbox' column='" + i + "' class=\"ui checkbox the-dropdown-col\">\n    <input type=\"checkbox\" value='" + i + "'>\n    <label>" + columnsObj.title + "</label>\n</div>";
          }
        });
        titleColumnsHtml = "<div ids='titleColumnsShowDropdown' class=\"ui button top right pointing mini dropdown compact icon teal the-z1200\" data-content=\"展示列勾选\" data-variation=\"mini inverted\">\n    <i class=\"icon list layout\"></i>\n    <div class=\"menu\">\n        <div ids=\"titleFuCheckbox\" class=\"ui checkbox the-dropdown-col\">\n            <input type=\"checkbox\">\n            <label>全选</label>\n        </div>\n        <div class=\"divider\"></div>\n        <div ids=\"titleColumnsCheckbox\" class=\"the-dropdown-check\">\n           " + columnsShowBarHtml + "\n        </div>\n        <div class=\"item the-dn\"></div>\n    </div>\n</div>";
      }
      searchHtml = '';
      if (this.opt.titleSearchToolbar) {
        searchHtml = this.opt.titleSearchToolbar();
      }
      if (searchHtml) {
        searchHtml = "<div ids='titleSearchDropdown' class=\"ui button top right pointing mini dropdown compact icon teal the-z1200\" data-content=\"数据筛选\" data-variation=\"mini inverted\">\n    <i class=\"icon search\"></i>\n    <div class=\"menu\">\n        <div class=\"the-dropdown-search\">\n          " + searchHtml + "\n        </div>\n        <div class=\"divhig\"></div>\n        <div class=\"the-dropdown-clear\">\n            <button ids='titleClearSearchBut' class=\"mini ui button basic compact fluid teal\">清空</button>\n        </div>\n        <div class=\"item the-dn\"></div>\n    </div>\n</div>";
      }
      buttonsHtml = '';
      handlerArr = [];
      if (titleFunToolbar) {
        buttonHtml = "";
        otherButHtml = "";
        $.each(titleFunToolbar, function(i, obj) {
          var attrKeys, attrStr, attrVal, classStr, iconStr, info, j, k, len, ref, text;
          classStr = '';
          attrStr = '';
          iconStr = '';
          attrVal = '';
          if (obj["class"]) {
            classStr += obj["class"];
          }
          if (obj.selectRow) {
            attrStr += " disabled ";
          }
          if (obj.icon) {
            iconStr += "<i class=\"icon " + obj.icon + "\"></i>";
          }
          if (obj.attr) {
            attrKeys = _.keys(obj.attr);
            for (j = 0, len = attrKeys.length; j < len; j++) {
              k = attrKeys[j];
              attrVal += " " + k + "=\"" + obj.attr[k] + "\" ";
            }
          }
          if (obj.hide) {
            if (obj.info) {
              info = " data-content=\"" + obj.info + "\" data-variation=\"mini inverted\" ";
            }
            otherButHtml += "<div ids='titleHanderButtonFn' class=\"item " + classStr + " " + attrStr + "\" " + (info != null ? info : info = '') + " " + attrVal + ">" + iconStr + obj.text + "</div>";
          } else {
            if (obj.text) {
              text = " data-content=\"" + obj.text + "\" data-variation=\"mini inverted\" ";
            }
            buttonHtml += "<div ids='titleHanderButtonFn' class=\"ui button mini compact icon teal " + classStr + " " + attrStr + "\" " + (text != null ? text : text = '') + " " + attrVal + ">" + iconStr + "</div>";
          }
          return handlerArr.push((ref = obj.handler) != null ? ref : function() {});
        });
        if (otherButHtml) {
          otherButHtml = "<div ids='titleOtherButs' class=\"ui floating dropdown icon teal button\">\n  <i class=\"dropdown icon\" data-content=\"更多功能\" data-variation=\"mini inverted\"></i>\n  <div class=\"menu\">\n      " + otherButHtml + "\n  </div>\n</div>";
        }
        buttonsHtml += "" + buttonHtml + otherButHtml;
      }
      toolbarHtml = "<div class=\"ui right " + radiusClass + " action mini compact the-table-fr\">\n    " + (searchInpHtml != null ? searchInpHtml : searchInpHtml = '') + "\n    " + (titleRefreshButHtml != null ? titleRefreshButHtml : titleRefreshButHtml = '') + "\n    " + (titleColumnsHtml != null ? titleColumnsHtml : titleColumnsHtml = '') + "\n    " + (searchHtml != null ? searchHtml : searchHtml = '') + "\n    " + (buttonsHtml != null ? buttonsHtml : buttonsHtml = '') + "\n</div>";
    }
    titleHtml = "<table class=\"ui top attached segment table " + this.opt.titleClass + "\">\n    <thead>\n    <tr>\n      <th ids='titleStr' class=\"table-white\">" + (title != null ? title : title = '') + "</th>\n      <th class=\"table-white\">" + (toolbarHtml != null ? toolbarHtml : toolbarHtml = '') + "</th>\n    </tr>\n    </thead>\n</table>";
    this.$parEle.before(titleHtml);
    this.$title = this.$parEle.prev();
    if (this.opt.titleSearchInpShow) {
      this.$titleSearchInp = this.$title.find("[ids='titleSearchInp']");
    }
    if (this.opt.titleRefreshBut) {
      this.$titleRefreshBut = this.$title.find("[ids='titleRefreshBut']");
    }
    if (searchHtml) {
      this.$titleSearchDropdown = this.$title.find("[ids='titleSearchDropdown']").dropdown();
      if (typeof (base = this.opt).onTitleSeatchToolbar === "function") {
        base.onTitleSeatchToolbar();
      }
      this.$titleClearSearchBut = this.$title.find("[ids='titleClearSearchBut']");
    }
    if (titleFunToolbar) {
      this.$titleHanderButtonFn = this.$title.find("[ids='titleHanderButtonFn']");
      $.each(handlerArr, (function(_this) {
        return function(i, handler) {
          return _this.$titleHanderButtonFn.eq(i).bind('click', function(e) {
            return handler({
              e: e,
              $ele: this
            });
          });
        };
      })(this));
      this.$title.find("[ids='titleOtherButs']").dropdown();
    }
    if (this.opt.titleColumnsShow) {
      this.$titleColumnsShowDropdown = this.$title.find("[ids='titleColumnsShowDropdown']").dropdown();
      this.$titleColumnsShowDropdown.find("[ids='titleColumnsCheckbox']").scrollbar({
        theme: 'dark-thin'
      });
      allChecked = true;
      allUnchecked = true;
      $.each(this.opt.columns, (function(_this) {
        return function(i, columnsObj) {
          if (columnsObj.title) {
            if (columnsObj.hidden === 'show') {
              allUnchecked = false;
              _this.$titleColumnsShowDropdown.find("[ids='titleCheckbox'][column='" + i + "']").checkbox('set checked');
            } else if (columnsObj.hidden === 'hide') {
              allChecked = false;
            }
          }
          return true;
        };
      })(this));
      $titleFuCheckbox = this.$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']");
      if (allChecked) {
        return $titleFuCheckbox.checkbox('set checked');
      } else if (allUnchecked) {
        return $titleFuCheckbox.checkbox('set unchecked');
      } else {
        return $titleFuCheckbox.checkbox('set indeterminate');
      }
    }
  };


  /*
    底部分页栏事件注册
    opts
   */

  datagrid.prototype.eventPageMenu = function() {
    return this.$pageSizeDrop.find("[ids='pageSizeOpt']").off('click').on('click', (function(_this) {
      return function(e) {
        _this.opt.pageSize = $(e.currentTarget).attr("data-value");
        return _this.loadData();
      };
    })(this));
  };


  /*
    创建底部分页菜单
    opts
   */

  datagrid.prototype.creatPageMenu = function() {
    var classStr, pagebarHtml, selectHtml;
    pagebarHtml = '';
    classStr = '';
    if (this.opt.pagination === 'hide') {
      classStr += ' the-dn ';
    }
    if (this.opt.pagination === 'max') {
      selectHtml = '';
      $.each(this.opt.pageList, function(i, pageNo) {
        return selectHtml += "<div ids='pageSizeOpt' class=\"item\" data-value=\"" + pageNo + "\">" + pageNo + "</div>";
      });
      pagebarHtml = "<table ids='pageMenu' class=\"ui bottom attached segment table " + classStr + "\" >\n    <tfoot>\n        <tr>\n            <th class=\"table-white\">\n                <div class=\"ui floated left menu the-tfoot-menu\">\n                    <div ids='pageSizeDrop' class=\"ui bottom selection dropdown mini compact tfoot-page-number\" data-content=\"选择分页大小\" data-variation=\"mini inverted\">\n                        <input type=\"hidden\" name=\"gender\" value=\"" + this.opt.pageSize + "\">\n                        <i class=\"dropdown icon\"></i>\n                        <div class=\"default text\">分页</div>\n                        <div class=\"menu tfoot-pagecon-wrap\">\n                            " + selectHtml + "\n                        </div>\n                    </div>\n                    <div ids='pageSize' class=\"ui mini label\" data-content=\"当前页记录数\" data-variation=\"mini inverted\">...</div>\n                    <div ids='pageTotal' class=\"ui mini label\" data-content=\"总记录数\" data-variation=\"mini inverted\">...</div>\n                </div>\n                <div ids=\"pageToolbar\" class=\"ui menu floated right borderless the-tfoot-menu\">\n                    <a ids='pageBut' pageNum='-1' class=\"icon item\" data-content=\"向前翻页\" data-variation=\"mini inverted\"><i class=\"angle left icon\"></i></a>\n                    <a ids='pageBut' class=\"item\"><i class=\"notched circle loading icon\"></i></a>\n                    <a ids='pageBut' pageNum='-2' class=\"icon item\" data-content=\"向后翻页\" data-variation=\"mini inverted\"><i class=\"angle right icon\"></i></a>\n                </div>\n            </th>\n        </tr>\n    </tfoot>\n</table>";
    }
    if (this.opt.pagination === 'min') {
      pagebarHtml = "<table ids='pageMenu' class=\"ui bottom attached segment table " + classStr + "\" >\n    <tfoot>\n        <tr>\n            <th class=\"table-white\">\n                <div ids=\"pageToolbar\" class=\"ui menu floated right borderless the-tfoot-menu\">\n                    <a ids='pageBut' pageNum='-1' class=\"icon item\" data-content=\"向前翻页\" data-variation=\"mini inverted\"><i class=\"angle left icon\"></i></a>\n                    <a ids='pageDrop' class=\"item\"><i class=\"notched circle loading icon\"></i></a>\n                    <a ids='pageBut' pageNum='-2' class=\"icon item\" data-content=\"向后翻页\" data-variation=\"mini inverted\"><i class=\"angle right icon\"></i></a>\n                </div>\n            </th>\n        </tr>\n    </tfoot>\n</table>";
    }
    this.$parEle.after(pagebarHtml);
    this.$pageMenu = this.$parEle.next("[ids='pageMenu']");
    return this.$pageSizeDrop = this.$pageMenu.find("[ids='pageSizeDrop']").dropdown({
      direction: 'upward'
    });
  };

  datagrid.prototype.tableHeadToTop = function() {
    if ((this.opt.height || this.opt.maxHeight) && this.opt.showHeader) {
      this.$parEle.find(".mCSB_scrollTools .mCSB_dragger").eq(0).css('top', '0px');
      this.$parEle.find(".mCSB_container").eq(0).css('top', '0px');
      this.$ele.floatThead('reflow');
      return setTimeout((function(_this) {
        return function() {
          var scollHeight;
          scollHeight = _this.$parEle.find('.floatThead-container').css('height');
          _this.$parEle.find('.mCSB_draggerContainer').css('top', scollHeight);
          return _this.$parEle.mCustomScrollbar('update');
        };
      })(this), 300);
    }
  };

  datagrid.prototype.checkAllShowBox = function() {
    var $checkbox, $fuCheckbox, allChecked, allUnchecked;
    if (this.$columnsShowDropdown) {
      allChecked = true;
      allUnchecked = true;
      $fuCheckbox = this.$columnsShowDropdown.find("[ids='fuCheckbox']");
      $checkbox = this.$columnsShowDropdown.find("[ids='checkbox']");
      $checkbox.each(function(i) {
        if ($(this).checkbox('is checked')) {
          allUnchecked = false;
        } else {
          allChecked = false;
        }
        return true;
      });
      if (allChecked) {
        $fuCheckbox.checkbox('set checked');
      } else if (allUnchecked) {
        $fuCheckbox.checkbox('set unchecked');
      } else {
        $fuCheckbox.checkbox('set indeterminate');
      }
    }
    if (this.$titleColumnsShowDropdown) {
      allChecked = true;
      allUnchecked = true;
      $fuCheckbox = this.$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']");
      $checkbox = this.$titleColumnsShowDropdown.find("[ids='titleCheckbox']");
      $checkbox.each(function(i) {
        if ($(this).checkbox('is checked')) {
          allUnchecked = false;
        } else {
          allChecked = false;
        }
        return true;
      });
      if (allChecked) {
        return $fuCheckbox.checkbox('set checked');
      } else if (allUnchecked) {
        return $fuCheckbox.checkbox('set unchecked');
      } else {
        return $fuCheckbox.checkbox('set indeterminate');
      }
    }
  };


  /*
    头部菜单栏事件
    opts
   */

  datagrid.prototype.eventHeadMenu = function() {
    var $checkbox, $fuCheckbox, t;
    if (this.opt.toolbarShow) {
      if (this.$refreshBut) {
        this.$refreshBut.off('click').on('click', (function(_this) {
          return function(e) {
            return _this.reload();
          };
        })(this));
      }
      if (this.$clearSearchBut) {
        this.$clearSearchBut.off('click').on('click', (function(_this) {
          return function(e) {
            var base;
            if (_this.$searchInp) {
              _this.$searchInp.val(null);
            }
            if (_this.$searchDropdown) {
              _this.$searchDropdown.dropdown('hide');
            }
            if (typeof (base = _this.opt).onSelectClear === "function") {
              base.onSelectClear();
            }
            return _this.loadData();
          };
        })(this));
      }
      if (this.$searchInp) {
        this.$searchInp.on('keydown', (function(_this) {
          return function(e) {
            if (e.keyCode === 13) {
              return _this.loadData();
            }
          };
        })(this));
      }
      if (this.$columnsShowDropdown) {
        $fuCheckbox = this.$columnsShowDropdown.find("[ids='fuCheckbox']");
        $checkbox = this.$columnsShowDropdown.find("[ids='checkbox']").checkbox();
        $fuCheckbox.checkbox({
          onChecked: function() {
            return $checkbox.checkbox('check');
          },
          onUnchecked: function() {
            return $checkbox.checkbox('uncheck');
          }
        });
        t = this;
        return $checkbox.checkbox({
          onChange: (function(_this) {
            return function() {
              return t.checkAllShowBox();
            };
          })(this),
          onChecked: function() {
            var $td, $th, cid;
            t.tableHeadToTop();
            cid = $(this).val();
            t.opt.columns[cid].hidden = 'show';
            $th = t.$theadTh.parent().find("[ids='c" + cid + "']");
            $td = t.$rowAll.find("td[ids='c" + cid + "']");
            $th.removeClass("the-dn");
            return $td.removeClass("the-dn");
          },
          onUnchecked: function() {
            var $td, $th, cid;
            t.tableHeadToTop();
            cid = $(this).val();
            t.opt.columns[cid].hidden = 'hide';
            $th = t.$theadTh.parent().find("[ids='c" + cid + "']");
            $td = t.$rowAll.find("td[ids='c" + cid + "']");
            $th.addClass("the-dn");
            return $td.addClass("the-dn");
          }
        });
      }
    }
  };


  /*
    创建表格头部菜单栏和检索栏
    opts
   */

  datagrid.prototype.creatHeadMenu = function() {
    var $fuCheckbox, allChecked, allUnchecked, base, buttonHtml, buttonsHtml, columnsHtml, columnsShowBarHtml, funToolbar, handlerArr, moreAttrStr, moreClassStr, otherButHtml, radiusClass, refreshButHtml, searchHtml, searchInputHtml, toolbarHtml;
    if (this.opt.toolbarShow) {
      funToolbar = this.opt.funToolbar;
      buttonsHtml = "";
      handlerArr = [];
      if (funToolbar instanceof Array) {
        buttonHtml = "";
        otherButHtml = "";
        moreClassStr = "";
        moreAttrStr = "";
        $.each(funToolbar, function(i, obj) {
          var attrKeys, attrStr, attrVal, classStr, iconStr, info, j, k, l, len, len1, ref, results;
          classStr = '';
          attrStr = '';
          iconStr = '';
          attrVal = '';
          if (obj.text) {
            if (obj["class"]) {
              classStr += obj["class"];
            }
            if (obj.selectRow) {
              attrStr += " disabled ";
            }
            if (obj.icon) {
              iconStr += "<i class=\"icon " + obj.icon + "\"></i>";
            }
            if (obj.info) {
              info = " data-content=\"" + obj.info + "\" data-variation=\"mini inverted\" ";
            }
            if (obj.attr) {
              attrKeys = _.keys(obj.attr);
              for (j = 0, len = attrKeys.length; j < len; j++) {
                k = attrKeys[j];
                attrVal += " " + k + "=\"" + obj.attr[k] + "\" ";
              }
            }
            if (obj.hide) {
              otherButHtml += "<div ids='handerButtonFn' class=\"item " + classStr + " " + attrStr + "\" " + (info != null ? info : info = '') + "  " + attrVal + ">" + iconStr + obj.text + "</div>";
            } else {
              buttonHtml += "<button ids='handerButtonFn' class=\"ui button " + classStr + " " + attrStr + "\" " + (info != null ? info : info = '') + " " + attrVal + ">" + iconStr + obj.text + "</button>";
            }
            return handlerArr.push((ref = obj.handler) != null ? ref : function() {});
          } else {
            moreClassStr = obj["class"];
            attrKeys = _.keys(obj.attr);
            results = [];
            for (l = 0, len1 = attrKeys.length; l < len1; l++) {
              k = attrKeys[l];
              results.push(moreAttrStr += " " + k + "=\"" + obj.attr[k] + "\" ");
            }
            return results;
          }
        });
        if (otherButHtml) {
          otherButHtml = "<div ids='otherButs' class=\"ui floating dropdown icon button " + moreClassStr + "\" " + moreAttrStr + " >\n    <span data-content=\"更多功能\" data-variation=\"mini inverted\">更多</span>\n    <i class=\"dropdown icon\"></i>\n    <div class=\"menu\"> " + otherButHtml + "</div>\n  </div>";
        }
        buttonsHtml += "<div class=\"ui buttons " + this.opt.funClass + "\">" + buttonHtml + otherButHtml + "</div>";
      }
      if (typeof funToolbar === "function") {
        buttonsHtml = funToolbar();
      }
      searchHtml = '';
      if (this.opt.searchToolbar) {
        searchHtml = this.opt.searchToolbar();
      }
      if (searchHtml) {
        searchHtml = "<div ids='searchDropdown' class=\"ui button top right pointing mini dropdown compact icon teal the-z1200\" data-content=\"数据筛选\" data-variation=\"mini inverted\">\n    <i class=\"icon search\"></i>\n    <div class=\"menu\">\n        <div class=\"the-dropdown-search\">\n          " + searchHtml + "\n        </div>\n        <div class=\"divhig\"></div>\n        <div class=\"the-dropdown-clear\">\n            <button ids='clearSearchBut' class=\"mini ui button basic compact fluid teal\">清空</button>\n        </div>\n        <div class=\"item the-dn\"></div>\n    </div>\n</div>";
      }
      columnsHtml = '';
      if (this.opt.columnsShow) {
        columnsShowBarHtml = '';
        $.each(this.opt.columns, function(i, columnsObj) {
          if (columnsObj.hidden == null) {
            columnsObj.hidden = 'show';
          }
          if (columnsObj.title && columnsObj.hidden !== 'disa') {
            return columnsShowBarHtml += "<div ids='checkbox' column='" + i + "' class=\"ui checkbox the-dropdown-col\">\n    <input type=\"checkbox\" value='" + i + "'>\n    <label>" + columnsObj.title + "</label>\n</div>";
          }
        });
        columnsHtml = "<div ids='columnsShowDropdown' class=\"ui button top right pointing mini dropdown compact icon teal the-z1200\" data-content=\"展示列勾选\" data-variation=\"mini inverted\">\n      <i class=\"icon list layout\"></i>\n      <div class=\"menu\">\n          <div ids=\"fuCheckbox\" class=\"ui checkbox the-dropdown-col\">\n              <input type=\"checkbox\">\n              <label>全选</label>\n          </div>\n          <div class=\"divider\"></div>\n          <div ids=\"columnsCheckbox\" class=\"the-dropdown-check\">\n             " + columnsShowBarHtml + "\n          </div>\n          <div class=\"item the-dn\"></div>\n      </div>\n  </div>";
      }
      searchInputHtml = '';
      radiusClass = '';
      if (this.opt.searchInpShow) {
        searchInputHtml = "<input ids='searchInp' type=\"text\" placeholder=\"搜索...\" data-content=\"输入查询信息,回车进行检索\" data-variation=\"mini inverted\">";
        radiusClass = 'input';
      } else {
        radiusClass = 'buttons';
      }
      refreshButHtml = '';
      if (this.opt.refreshBut) {
        refreshButHtml = "<div ids='refreshBut' class=\"ui button mini compact icon teal\" data-content=\"刷新数据\" data-variation=\"mini inverted\"><i class=\"icon refresh\"></i></div>";
      }
      toolbarHtml = "<div class=\"ui right " + radiusClass + " action mini compact the-table-fr\">\n    " + searchInputHtml + "\n    " + refreshButHtml + "\n    " + columnsHtml + "\n    " + searchHtml + "\n</div>";
      toolbarHtml = "<table class=\"ui attached segment table\">\n    <thead>\n    <tr>\n        <th class=\"the-table-tool\">\n            " + buttonsHtml + "\n            " + (toolbarHtml != null ? toolbarHtml : toolbarHtml = '') + "\n        </th>\n    </tr>\n    </thead>\n</table>";
      this.$parEle.before(toolbarHtml);
      this.$toolbar = this.$parEle.prev();
      if (funToolbar) {
        this.$handerButtonFn = this.$toolbar.find("[ids='handerButtonFn']");
        $.each(handlerArr, (function(_this) {
          return function(i, handler) {
            return _this.$handerButtonFn.eq(i).bind('click', function(e) {
              return handler({
                e: e,
                $ele: this
              });
            });
          };
        })(this));
        this.$toolbar.find("[ids='otherButs']").dropdown();
      }
      if (searchHtml) {
        this.$searchDropdown = this.$toolbar.find("[ids='searchDropdown']").dropdown();
        if (typeof (base = this.opt).onSeatchToolbar === "function") {
          base.onSeatchToolbar();
        }
        this.$clearSearchBut = this.$toolbar.find("[ids='clearSearchBut']");
      }
      if (this.opt.refreshBut) {
        this.$refreshBut = this.$toolbar.find("[ids='refreshBut']");
      }
      if (this.opt.searchInpShow) {
        this.$searchInp = this.$toolbar.find("[ids='searchInp']");
      }
      if (this.opt.columnsShow) {
        this.$columnsShowDropdown = this.$toolbar.find("[ids='columnsShowDropdown']").dropdown();
        this.$columnsShowDropdown.find("[ids='columnsCheckbox']").scrollbar({
          theme: 'dark-thin'
        });
        allChecked = true;
        allUnchecked = true;
        $.each(this.opt.columns, (function(_this) {
          return function(i, columnsObj) {
            if (columnsObj.title) {
              if (columnsObj.hidden === 'show') {
                allUnchecked = false;
                _this.$columnsShowDropdown.find("[ids='checkbox'][column='" + i + "']").checkbox('set checked');
              } else if (columnsObj.hidden === 'hide') {
                allChecked = false;
              }
            }
            return true;
          };
        })(this));
        $fuCheckbox = this.$columnsShowDropdown.find("[ids='fuCheckbox']");
        if (allChecked) {
          return $fuCheckbox.checkbox('set checked');
        } else if (allUnchecked) {
          return $fuCheckbox.checkbox('set unchecked');
        } else {
          return $fuCheckbox.checkbox('set indeterminate');
        }
      }
    }
  };


  /*
    表头事件注册
    opts
   */

  datagrid.prototype.eventGridThead = function() {
    this.$theadTh.off('click').on('click', (function(_this) {
      return function(e) {
        var $i, $th, base, field, ids, location;
        $th = $(e.currentTarget);
        $i = $th.find('i.icon.sort');
        ids = $th.attr("ids");
        if (ids && _this.opt.columns[location = ids.substring(1)].sort === true) {
          field = _this.opt.columns[location].field;
          if (_this.sort === field) {
            switch (_this.orderby) {
              case 'desc':
                $i.removeClass("descending").addClass("ascending");
                _this.sort = field;
                _this.orderby = 'asc';
                break;
              case 'asc':
                $i.removeClass("ascending");
                _this.sort = null;
                _this.orderby = null;
            }
          } else {
            _this.$theadTh.find('i.icon.sort').removeClass("ascending descending");
            $i.addClass("descending");
            _this.sort = field;
            _this.orderby = 'desc';
          }
          if (typeof (base = _this.opt).onBeforeSortColumn === "function") {
            base.onBeforeSortColumn({
              sort: _this.sort,
              order: _this.orderby
            });
          }
          return _this.loadData();
        }
      };
    })(this));
    this.$thCheckbox = this.$ele.find("th [ids='thCheckbox']").checkbox();
    this.$thCheckbox.off('click').on('click', function(e) {
      if (e && e.preventDefault) {
        return e.preventDefault();
      }
    });
    return this.$thCheckbox.parent().off('click').on('click', (function(_this) {
      return function(e) {
        if (_this.opt.selectWay === 'multi' && _this.opt.selectCancel === true) {
          if (_this.$thCheckbox.checkbox('is checked') || (_this.$ele.find("tbody tr.disabled").length > 0 && _this.$thCheckbox.checkbox('is indeterminate'))) {
            return _this.clearSelect();
          } else {
            return _this.selectAll();
          }
        }
      };
    })(this));
  };


  /*
    创建表格头部
    opts
   */

  datagrid.prototype.creatGridThead = function() {
    var columnsHtml, creatCheck, creatNum, creatTh, creatThead;
    creatNum = (function(_this) {
      return function() {
        var classStr;
        classStr = '';
        if (!_this.opt.headStyle && _this.opt.numAllStyle) {
          classStr += " " + _this.opt.numAllStyle + " ";
        }
        if (_this.opt.lineNum === 'left') {
          classStr += ' left aligned ';
        }
        if (_this.opt.lineNum === 'right') {
          classStr += ' right aligned ';
        }
        if (classStr) {
          classStr = " class=\"table-white " + classStr + "\" ";
        }
        return "<th " + classStr + " ></th>";
      };
    })(this);
    creatCheck = (function(_this) {
      return function() {
        var classStr, textHtml;
        classStr = '';
        if (!_this.opt.headStyle && _this.opt.checkAllStyle) {
          classStr += " " + _this.opt.checkAllStyle + " ";
        }
        if (_this.opt.selectWay === 'radio' || _this.opt.selectWay === 'disable') {
          classStr += ' am-hide ';
        }
        if (_this.opt.checkbox === 'left') {
          classStr += ' left aligned ';
        }
        if (_this.opt.checkbox === 'right') {
          classStr += ' right aligned ';
        }
        textHtml = "<div ids='thCheckbox' class=\"ui checkbox fitted\">\n    <input type=\"checkbox\"><label></label>\n</div>";
        if (classStr) {
          classStr = " class=\"table-white " + classStr + "\" ";
        }
        return "<th " + classStr + " style='width:30px;'>" + textHtml + "</th>";
      };
    })(this);
    creatTh = (function(_this) {
      return function(opts) {
        var classStr, columnsObj, k, sortHtml, styleStr, textHtml;
        columnsObj = opts.columnsObj, k = opts.k;
        if (columnsObj.sort == null) {
          columnsObj.sort = true;
        }
        if (columnsObj.align == null) {
          columnsObj.align = 'center';
        }
        if (columnsObj.hidden == null) {
          columnsObj.hidden = 'show';
        }
        if (columnsObj.edit == null) {
          columnsObj.edit = false;
        }
        classStr = '';
        styleStr = '';
        if (columnsObj.hidden === 'hide' || columnsObj.hidden === 'disa') {
          classStr += ' the-dn ';
        }
        if (!_this.opt.headStyle && columnsObj.allStyle) {
          classStr += " " + columnsObj.allStyle + " ";
        }
        switch (_this.opt.alignHandle) {
          case 'center':
            classStr += "center aligned";
            break;
          case 'left':
            classStr += "left aligned";
            break;
          case 'right':
            classStr += "right aligned";
            break;
          default:
            classStr += "" + _this.opt.alignHandle;
        }
        sortHtml = '';
        textHtml = '';
        if (columnsObj.sort) {
          switch (columnsObj.orderBy) {
            case 'asc':
              sortHtml += "<i class=\"icon sort ascending \"></i>";
              _this.sort = columnsObj.field;
              _this.orderby = 'asc';
              break;
            case 'desc':
              sortHtml += "<i class=\"icon sort descending \"></i>";
              _this.sort = columnsObj.field;
              _this.orderby = 'desc';
              break;
            default:
              sortHtml += "<i class=\"icon sort \"></i>";
          }
        }
        textHtml = "" + (columnsObj.title != null ? columnsObj.title : columnsObj.title = '') + sortHtml;
        if (textHtml.trim().length > 0) {
          classStr += " the-table-th ";
        }
        if (classStr) {
          classStr = " class=\"table-white " + classStr + "\" ";
        }
        if (styleStr) {
          styleStr = " style=\"" + styleStr + "\" ";
        }
        return "<th ids='c" + k + "' " + classStr + " " + styleStr + ">" + textHtml + "</th>";
      };
    })(this);
    creatThead = function(opts) {
      var theadClassStr, trClass;
      if (!opts.showHeader) {
        theadClassStr = " class=\"the-dn\" ";
      }
      trClass = '';
      if (opts.headStyle) {
        trClass += " " + opts.headStyle + " ";
      } else {
        if (opts.rowAllStyle) {
          trClass += " " + opts.rowAllStyle + " ";
        }
      }
      if (trClass) {
        trClass = " class=\"" + trClass + "\" ";
      }
      return "<thead " + theadClassStr + "><tr " + trClass + " >" + columnsHtml + "</tr></thead>";
    };
    columnsHtml = "";
    $.each(this.opt.columns, (function(_this) {
      return function(i, columnsObj) {
        if (_this.opt.lineNum === 'left' && i === 0) {
          columnsHtml += creatNum();
        }
        if (_this.opt.checkbox === 'left' && i === 0) {
          columnsHtml += creatCheck();
        }
        columnsHtml += creatTh({
          columnsObj: columnsObj,
          k: i
        });
        if (_this.opt.checkbox === 'right' && i === _this.opt.columns.length - 1) {
          columnsHtml += creatCheck();
        }
        if (_this.opt.lineNum === 'right' && i === _this.opt.columns.length - 1) {
          return columnsHtml += creatNum();
        }
      };
    })(this));
    this.$ele.append(creatThead(this.opt));
    return this.$theadTh = this.$ele.find("thead th");
  };


  /*
    表格主体事件
    opts
   */

  datagrid.prototype.eventGrid = function() {
    var $tdCheckbox;
    $tdCheckbox = this.$ele.find("td [ids='tdCheckbox']").checkbox();
    $tdCheckbox.off('click').on('click', function(e) {
      if (e && e.preventDefault) {
        return e.preventDefault();
      }
    });
    $tdCheckbox.find("checkbox").off('click').on('click', function(e) {
      if (e && e.preventDefault) {
        return e.preventDefault();
      }
    });
    if (this.$rowAll && this.opt.onDblClickRow) {
      this.$rowAll.off('dblclick').on('dblclick', (function(_this) {
        return function(e) {
          var $row, num, rowData;
          $row = $(e.currentTarget);
          num = parseInt($row.prevAll().length);
          rowData = _this.page.list[num];
          return _this.opt.onDblClickRow({
            index: num,
            row: rowData
          });
        };
      })(this));
    }
    if (this.$rowAll && this.opt.onDblClickCell) {
      this.$ele.find("tbody td[ids]").off('dblclick').on('dblclick', (function(_this) {
        return function(e) {
          var $cell, $row, columns, num, rowData, tdId;
          $cell = $(e.currentTarget);
          $row = $cell.parent("tr");
          num = parseInt($row.prevAll().length);
          rowData = _this.page.list[num];
          tdId = parseInt($cell.attr("ids").substring(1));
          columns = _this.opt.columns[tdId];
          return _this.opt.onDblClickCell({
            index: num,
            field: rowData[columns.field],
            text: $cell.text(),
            row: rowData
          });
        };
      })(this));
    }
    if (this.$rowAll) {
      return this.$ele.find("tbody td").off('click').on('click', (function(_this) {
        return function(e) {
          var $cell, $checkbox, $row, base, columns, edit, editIf, ids, num, rowData, selectAny, selectMustOne, selectOne, tdId;
          $cell = $(e.currentTarget);
          $row = $cell.parent();
          $checkbox = $row.find("td [ids='tdCheckbox']");
          num = parseInt($row.prevAll().length);
          rowData = _this.page.list[num];
          ids = $cell.attr("ids");
          if (ids) {
            tdId = ids.substring(1);
            columns = _this.opt.columns[tdId];
            if (typeof (base = _this.opt).onClickCell === "function") {
              base.onClickCell({
                index: num,
                field: columns && columns.field ? columns.field : void 0,
                text: columns && columns.field ? $cell.text() : void 0,
                row: rowData
              });
            }
          }
          if ($row.attr("ids") !== _this.$rowAll.eq(num).attr('ids')) {
            return false;
          }
          selectOne = function() {
            var base1, base2, select;
            select = $row.attr("select");
            $tdCheckbox.checkbox('set unchecked');
            _this.$rowAll.removeClass('warning').removeAttr('select');
            _this.rowsArr = null;
            _this.rowsArrKey = null;
            _this.$selRowArr = null;
            if (typeof (base1 = _this.opt).onClickRow === "function") {
              base1.onClickRow({
                index: num,
                row: rowData
              });
            }
            if (!select) {
              _this.rowsArr = [rowData];
              _this.rowsArrKey = [num];
              $row.addClass('warning').attr('select', 'select');
              $checkbox.checkbox('set checked');
              _this.$selRowArr = [$row];
              if (typeof (base2 = _this.opt).onSelectRow === "function") {
                base2.onSelectRow({
                  index: num,
                  row: rowData
                });
              }
            }
            if (_this.$selRowArr && _this.$selRowArr.length > 0) {
              if (_this.$selRowArr.length === _this.$rowAll.length) {
                _this.$thCheckbox.checkbox('set checked');
              } else {
                _this.$thCheckbox.checkbox('set indeterminate');
              }
              return _this.effButton();
            } else {
              _this.$thCheckbox.checkbox('set unchecked');
              return _this.failButton();
            }
          };
          selectMustOne = function() {
            var base1, base2, select;
            select = $row.attr("select");
            $tdCheckbox.not($checkbox).checkbox('set unchecked');
            _this.$rowAll.not($row).removeClass('warning').removeAttr('select');
            _this.rowsArr = [rowData];
            _this.rowsArrKey = [num];
            _this.$selRowArr = [$row];
            if (typeof (base1 = _this.opt).onClickRow === "function") {
              base1.onClickRow({
                index: num,
                row: rowData
              });
            }
            if (!select) {
              $row.addClass('warning').attr('select', 'select');
              $checkbox.checkbox('set checked');
              if (typeof (base2 = _this.opt).onSelectRow === "function") {
                base2.onSelectRow({
                  index: num,
                  row: rowData
                });
              }
            }
            if (_this.$selRowArr && _this.$selRowArr.length > 0) {
              if (_this.$selRowArr.length === _this.$rowAll.length) {
                _this.$thCheckbox.checkbox('set checked');
              } else {
                _this.$thCheckbox.checkbox('set indeterminate');
              }
              return _this.effButton();
            } else {
              return _this.$thCheckbox.checkbox('set unchecked');
            }
          };
          selectAny = function() {
            var select;
            select = $row.attr("select");
            if (select) {
              return _this.unselectAnyRow({
                index: num
              });
            } else {
              return _this.selectAnyRow({
                index: num
              });
            }
          };
          if ($row.attr('disable') !== 'disable') {
            if (columns && columns.edit) {
              edit = $cell.attr("edit");
              if (columns.editVali) {
                if (columns.editVali({
                  row: rowData,
                  cell: rowData[columns.field]
                })) {
                  editIf = true;
                }
              } else {
                editIf = true;
              }
              if (editIf && !edit) {
                _this.editCell({
                  index: num,
                  $cell: $cell,
                  columns: columns,
                  row: rowData
                });
              }
            }
            switch (_this.opt.selectWay) {
              case 'disable':
                return e.preventDefault();
              case 'radio':
                switch (_this.opt.selectCancel) {
                  case true:
                    return selectOne();
                  case false:
                    return selectMustOne();
                }
                break;
              case 'multi':
                return selectAny();
            }
          }
        };
      })(this));
    }
  };


  /*
    创建主体表格
    opts
   */

  datagrid.prototype.creatGrid = function() {
    var classStr, id, loadHtml, tableHtml;
    id = this.$ele.attr('id');
    classStr = '';
    if (this.opt.hoverRow === true) {
      classStr += " selectable ";
    }
    if (this.opt.compact === true) {
      classStr += " compact ";
    }
    switch (this.opt.alignHandle) {
      case 'center':
        classStr += " center aligned ";
        break;
      case 'left':
        classStr += " left aligned ";
        break;
      case 'right':
        classStr += " right aligned ";
        break;
      default:
        classStr += "" + this.opt.alignHandle;
    }
    if (this.opt.striped === true) {
      classStr += " striped ";
    }
    tableHtml = "<div ids=\"tablePa\" class=\"ui attached segment blurring the-p0b0\">\n    <table id=\"" + id + "\" class=\"ui attached table " + classStr + " the-wpm0\">\n    </table>\n</div>";
    this.$ele.replaceWith(tableHtml);
    this.$ele = $("#" + id);
    this.$parEle = this.$ele.parent();
    if (this.opt.height || this.opt.maxHeight) {
      if (this.opt.height > 0) {
        this.$parEle.css("height", this.opt.height + "px");
      } else {
        this.$parEle.css("max-height", this.opt.maxHeight + "px");
      }
      this.$parEle.scrollbar({
        theme: 'dark-thin',
        autoHideScrollbar: false
      });
    }
    loadHtml = "<div ids=\"tableLoad\" class=\"ui inverted dimmer\">\n    <div class=\"ui indeterminate large text loader\">Loading</div>\n</div>";
    return this.$parEle.append(loadHtml);
  };


  /*
    笼罩层
    opts
      unlock 解锁操作 true解锁
   */

  datagrid.prototype.lockCheck = function(opts) {
    var unlock;
    if (opts) {
      unlock = opts.unlock;
    }
    if (unlock) {
      this.loadLock = false;
      return clearTimeout(this.loadLockTimeout);
    } else {
      if (this.loadLock) {
        if (this.xhr) {
          this.xhr.abort();
          this.xhr = null;
        }
        if (this.loadLockTimeout) {
          clearTimeout(this.loadLockTimeout);
        }
      }
      this.loadLock = true;
      return this.loadLockTimeout = setTimeout((function(_this) {
        return function() {
          var base, base1;
          _this.loadLock = false;
          if (_this.opt.loadPrompt) {
            _this.$parEle.dimmer('hide');
          }
          if (typeof (base = _this.opt).onLoadResults === "function") {
            base.onLoadResults();
          }
          return typeof (base1 = _this.opt).onLoadError === "function" ? base1.onLoadError() : void 0;
        };
      })(this), this.opt.loadLockTime);
    }
  };


  /*
    加载数据
    opts
   */

  datagrid.prototype.loadData = function(opts) {
    var base, base1, jsonTool, page, query, searchInp;
    if (opts) {
      page = opts.page;
    }
    this.lockCheck();
    if (page == null) {
      page = 1;
    }
    this.tableHeadToTop();
    if (typeof (base = this.opt).onBeforeLoad === "function") {
      base.onBeforeLoad();
    }
    if (this.opt.url) {
      searchInp = null;
      if (this.$titleSearchInp || this.$searchInp) {
        if (this.$titleSearchInp) {
          searchInp = this.$titleSearchInp.val();
        }
        if (this.$searchInp) {
          searchInp = this.$searchInp.val();
        }
      }
      query = $.extend({
        page: page,
        size: parseInt(this.opt.pageSize),
        sort: this.sort,
        orderby: this.orderby
      }, {
        search: searchInp
      }, this.opt.queryParams);
      this.loaderQuery = typeof (base1 = this.opt).loader === "function" ? base1.loader({
        query: query
      }) : void 0;
      if (this.loaderQuery !== false) {
        if (this.opt.loadPrompt) {
          this.$parEle.dimmer({
            closable: false
          }).dimmer('show');
        }
        jsonTool = $.jsonTool('ajax', {
          url: this.opt.url,
          data: $.extend(query, this.loaderQuery),
          onSuccess: (function(_this) {
            return function(data) {
              var base2, base3;
              _this.clearData();
              _this.page = data;
              if (typeof (base2 = _this.opt).onLoadResults === "function") {
                base2.onLoadResults({
                  data: data
                });
              }
              if (typeof (base3 = _this.opt).onLoadSuccess === "function") {
                base3.onLoadSuccess({
                  data: data
                });
              }
              if (_this.opt.loadFilter) {
                _this.addData({
                  rowsArr: _this.opt.loadFilter({
                    data: data.list
                  })
                });
              } else {
                _this.addData({
                  rowsArr: data.list
                });
              }
              _this.updatePage(data);
              _this.eventPage();
              if (_this.opt.loadPrompt) {
                _this.$parEle.dimmer('hide');
              }
              _this.tableHeadToTop();
              return _this.lockCheck({
                unlock: true
              });
            };
          })(this),
          onError: (function(_this) {
            return function(err) {
              var base2, base3;
              if (_this.opt.loadPrompt) {
                _this.$parEle.dimmer('hide');
              }
              if (typeof (base2 = _this.opt).onLoadResults === "function") {
                base2.onLoadResults({
                  err: err
                });
              }
              if (typeof (base3 = _this.opt).onLoadError === "function") {
                base3.onLoadError({
                  err: err
                });
              }
              return _this.lockCheck({
                unlock: true
              });
            };
          })(this)
        });
        return this.xhr = jsonTool.xhr;
      }
    } else {
      if (this.opt.data) {
        this.page = {};
        this.clearData();
        this.page.list = this.opt.data;
        return this.addData({
          rowsArr: this.opt.data
        });
      }
    }
  };


  /*
    添加表格数据
    opts
      rowsArr([Obj]) 数据对象数组
      location(str) 添加位置  def:botton底端添加 top顶端添加
   */

  datagrid.prototype.addData = function(opts) {
    var $tbody, base, creatCheck, creatNum, creatTd, location, row, rowNum, rowsArr, scollHeight, tdHtml, thisNum, trHtml;
    rowsArr = opts.rowsArr, location = opts.location;
    if (location == null) {
      location = 'botton';
    }
    trHtml = '';
    rowNum = 0;
    if (this.$rowAll) {
      rowNum = this.$rowAll.length;
    }
    thisNum = 0;
    row = null;
    tdHtml = '';
    creatNum = (function(_this) {
      return function() {
        var classStr, num;
        classStr = '';
        classStr += ' the-table-ord ';
        if (_this.opt.numAllStyle) {
          classStr += _this.opt.numAllStyle;
        }
        if (_this.opt.lineNum === 'left') {
          classStr += "left aligned";
        }
        if (_this.opt.lineNum === 'right') {
          classStr += "right aligned";
        }
        if (classStr) {
          classStr = " class=\" " + classStr + "\" ";
        }
        if (_this.opt.cumNum) {
          num = _this.page.startRow + rowNum + thisNum;
        } else {
          num = rowNum + thisNum + 1;
        }
        return tdHtml += "<td " + classStr + " >" + num + "</td>";
      };
    })(this);
    creatCheck = (function(_this) {
      return function() {
        var classStr, contHtml;
        contHtml = '';
        classStr = '';
        if (_this.opt.checkAllStyle) {
          classStr += _this.opt.checkAllStyle;
        }
        if (_this.opt.checkbox === 'left') {
          classStr += "left aligned";
        }
        if (_this.opt.checkbox === 'right') {
          classStr += "right aligned";
        }
        contHtml += "<div ids=\"tdCheckbox\" class=\"ui checkbox fitted\">\n    <input type=\"checkbox\"><label></label>\n</div>";
        if (classStr) {
          classStr = " class=\" " + classStr + "\" ";
        }
        return tdHtml += "<td " + classStr + " >" + contHtml + "</td>";
      };
    })(this);
    creatTd = (function(_this) {
      return function(opts) {
        var className, classTdStr, columnsRow, contHtml, fieldVal, k, style, styleTdStr, styler, stylerCb;
        columnsRow = opts.columnsRow, k = opts.k;
        classTdStr = ' the-datagrid-td ';
        styleTdStr = '';
        styler = columnsRow.styler;
        if (styler) {
          stylerCb = styler({
            row: row,
            cell: row[columnsRow.field]
          });
          if (_.isObject(stylerCb)) {
            className = stylerCb.className, style = stylerCb.style;
            if (className) {
              classTdStr += className;
            }
            if (style) {
              styleTdStr += style;
            }
          } else {
            styleTdStr += stylerCb;
          }
        } else {
          if (columnsRow.allStyle) {
            classTdStr += columnsRow.allStyle;
          }
        }
        if (columnsRow.hidden === 'hide' || columnsRow.hidden === 'disa') {
          classTdStr += " the-dn ";
        }
        if (columnsRow.width > 0) {
          styleTdStr += " max-width:" + columnsRow.width + "px;overflow: hidden; ";
        }
        if (columnsRow.edit) {
          styleTdStr += " min-width:120px; ";
        }
        if (classTdStr) {
          classTdStr = " class='" + classTdStr + "' ";
        }
        if (styleTdStr) {
          styleTdStr = " style='" + styleTdStr + "' ";
        }
        if (columnsRow.field) {
          fieldVal = row[columnsRow.field];
          if (columnsRow.formatter) {
            fieldVal = columnsRow.formatter({
              column: fieldVal,
              row: row
            });
          }
        } else {
          if (columnsRow.formatter) {
            fieldVal = columnsRow.formatter({
              row: row
            });
          }
        }
        contHtml = '';
        if (fieldVal) {
          contHtml = "" + fieldVal;
        }
        if (columnsRow.edit) {
          contHtml += "<i class=\"edit icon teal the-ml10\"></i>";
        }
        return tdHtml += "<td ids='c" + k + "' " + classTdStr + " " + styleTdStr + ">" + contHtml + "</td>";
      };
    })(this);
    $.each(rowsArr, (function(_this) {
      return function(i, dataRow) {
        var base, className, classTrStr, rowStyler, rowStylerCb, style, styleTrStr;
        thisNum = i;
        row = dataRow;
        rowStyler = _this.opt.rowStyler;
        classTrStr = '';
        styleTrStr = '';
        if ((typeof (base = _this.opt).disSelect === "function" ? base.disSelect({
          row: row,
          rowId: i
        }) : void 0) === false) {
          classTrStr += ' disabled ';
        }
        if (rowStyler) {
          rowStylerCb = rowStyler({
            row: row
          });
          if (_.isObject(rowStylerCb)) {
            className = rowStylerCb.className, style = rowStylerCb.style;
            if (className) {
              classTrStr += " " + className + " ";
            }
            if (style) {
              styleTrStr += " " + style + " ";
            }
          } else {
            styleTrStr += " " + rowStylerCb + " ";
          }
        } else {
          if (_this.opt.rowAllStyle) {
            classTrStr += " " + _this.opt.rowAllStyle + " ";
          }
        }
        if (classTrStr) {
          classTrStr = " class='" + classTrStr + "' ";
        }
        if (styleTrStr) {
          styleTrStr = " style='" + styleTrStr + "' ";
        }
        $.each(_this.opt.columns, function(k, columnsRow) {
          if (_this.opt.lineNum === 'left' && k === 0) {
            creatNum();
          }
          if (_this.opt.checkbox === 'left' && k === 0) {
            creatCheck();
          }
          creatTd({
            k: k,
            columnsRow: columnsRow
          });
          if (_this.opt.checkbox === 'right' && k === _this.opt.columns.length - 1) {
            creatCheck();
          }
          if (_this.opt.lineNum === 'right' && k === _this.opt.columns.length - 1) {
            return creatNum();
          }
        });
        trHtml += "<tr ids='r" + (rowNum + thisNum) + "' " + classTrStr + " " + styleTrStr + " >" + tdHtml + "</tr>";
        return tdHtml = '';
      };
    })(this));
    $tbody = this.$ele.find('tbody');
    if ($tbody.length > 0) {
      switch (location) {
        case 'botton':
          $tbody.append(trHtml);
          break;
        case 'top':
          $tbody.prepend(trHtml);
          break;
        default:
          if (this.$rowAll) {
            this.$rowAll.eq(location).before(trHtml);
          } else {
            $tbody.prepend(trHtml);
          }
      }
    } else {
      this.$ele.append("<tbody>" + trHtml + "</tbody>");
    }
    $tbody = this.$ele.find('tbody');
    this.$rowAll = this.$ele.find('tbody tr');
    if ((this.opt.height || this.opt.maxHeight) && this.opt.showHeader) {
      this.$ele.floatThead({
        position: 'absolute',
        scrollContainer: true
      });
      scollHeight = this.$parEle.find('.floatThead-container').css('height');
      this.$parEle.find('.mCSB_draggerContainer').css('top', scollHeight);
      this.$parEle.mCustomScrollbar('update');
    }
    this.eventGrid();
    return typeof (base = this.opt).onRowReady === "function" ? base.onRowReady() : void 0;
  };


  /*
    分页事件注册
    opts
   */

  datagrid.prototype.eventPage = function() {
    return this.$pageToolbar.find("[ids='pageBut']").off('click').on('click', (function(_this) {
      return function(e) {
        var pageNum;
        pageNum = $(e.currentTarget).attr("pageNum");
        switch (pageNum) {
          case '-1':
            if (_this.page.prePage === 0) {
              return _this.loadData({
                page: _this.page.pages
              });
            } else {
              return _this.loadData({
                page: _this.page.prePage
              });
            }
            break;
          case '-2':
            if (_this.page.nextPage === 0) {
              return _this.loadData();
            } else {
              return _this.loadData({
                page: _this.page.nextPage
              });
            }
            break;
          default:
            return _this.loadData({
              page: pageNum
            });
        }
      };
    })(this));
  };


  /*
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
   */

  datagrid.prototype.updatePage = function(opts) {
    var $pageSize, $pageTotal, classStr, endRow, isFirstPage, isLastPage, j, k, l, m, nextPage, o, p, pageButHtml, pageListHtml, pageNum, pageSize, pages, prePage, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, startRow, total;
    pageNum = opts.pageNum, pageSize = opts.pageSize, startRow = opts.startRow, endRow = opts.endRow, pages = opts.pages, total = opts.total, prePage = opts.prePage, nextPage = opts.nextPage, isFirstPage = opts.isFirstPage, isLastPage = opts.isLastPage;
    $pageSize = this.$pageMenu.find("[ids='pageSize']").text(startRow + "-" + endRow);
    $pageTotal = this.$pageMenu.find("[ids='pageTotal']").text("" + total);
    this.$pageToolbar = this.$pageMenu.find("[ids='pageToolbar']");
    if (this.opt.pagination === 'max') {
      if (this.$pageToolbar.find("[ids='pageBut']").length === 3) {
        pageButHtml = '';
        if (pages >= 7) {
          for (k = j = 1; j <= 4; k = ++j) {
            classStr = k === 1 ? 'active' : '';
            pageButHtml += " <a ids='pageBut' pageNum='" + k + "' class=\"item " + classStr + " \">" + k + "</a> ";
          }
          pageListHtml = '';
          for (k = l = 1, ref = pages; 1 <= ref ? l <= ref : l >= ref; k = 1 <= ref ? ++l : --l) {
            pageListHtml += "<div ids='pageBut' pageNum='" + k + "' class=\"item\">" + k + "</div>";
          }
          pageButHtml += "<div ids='pageDrop' class=\"ui item icon bottom left dropdown\">\n        ...\n        <div class=\"menu tfoot-page-list the-bdrs-spc1\">\n            " + pageListHtml + "\n        </div>\n</div>";
          pageButHtml += " <a ids='pageBut' pageNum='" + pages + "' class=\"item\">" + pages + "</a> ";
        } else {
          if (pages === 0) {
            classStr = 'active';
            pageButHtml += " <a ids='pageBut' class=\"item " + classStr + " \" pageNum='1'>1</a> ";
          } else {
            for (k = m = 1, ref1 = pages; 1 <= ref1 ? m <= ref1 : m >= ref1; k = 1 <= ref1 ? ++m : --m) {
              classStr = k === 1 ? 'active' : '';
              pageButHtml += " <a ids='pageBut' class=\"item " + classStr + " \" pageNum='" + k + "'>" + k + "</a> ";
            }
          }
        }
        this.$pageToolbar.find("[ids='pageBut']:eq(1)").replaceWith(pageButHtml);
      } else {
        pageButHtml = '';
        if (pages >= 7) {
          if (pageNum >= 4) {
            pageButHtml += " <a ids='pageBut' pageNum='1' class=\"item " + classStr + " \">1</a> ";
            if (pageNum + 1 < pages) {
              pageButHtml += "<a ids='pageBut' pageNum='" + (pageNum - 1) + "' class=\"item\">" + (pageNum - 1) + "</a>\n<a ids='pageBut' pageNum='" + pageNum + "' class=\"item active\">" + pageNum + "</a>\n<a ids='pageBut' pageNum='" + (pageNum + 1) + "' class=\"item\">" + (pageNum + 1) + "</a>";
            } else {
              if (pageNum + 1 === pages) {
                pageButHtml += "<a ids='pageBut' pageNum='" + (pages - 3) + "' class=\"item\">" + (pages - 3) + "</a>\n<a ids='pageBut' pageNum='" + (pages - 2) + "' class=\"item\">" + (pages - 2) + "</a>\n<a ids='pageBut' pageNum='" + (pages - 1) + "' class=\"item active\">" + (pages - 1) + "</a>";
              } else {
                pageButHtml += "<a ids='pageBut' pageNum='" + (pages - 3) + "' class=\"item\">" + (pages - 3) + "</a>\n<a ids='pageBut' pageNum='" + (pages - 2) + "' class=\"item\">" + (pages - 2) + "</a>\n<a ids='pageBut' pageNum='" + (pages - 1) + "' class=\"item\">" + (pages - 1) + "</a>";
              }
            }
            pageListHtml = '';
            for (k = o = 1, ref2 = pages; 1 <= ref2 ? o <= ref2 : o >= ref2; k = 1 <= ref2 ? ++o : --o) {
              pageListHtml += "<div ids='pageBut' pageNum='" + k + "' class=\"item\">" + k + "</div>";
            }
            pageButHtml += "<div ids='pageDrop' class=\"ui item icon bottom left dropdown\">\n        ...\n        <div class=\"menu tfoot-page-list the-bdrs-spc1\">\n            " + pageListHtml + "\n        </div>\n</div>";
            classStr = pages === pageNum ? 'active' : '';
            pageButHtml += " <a ids='pageBut' pageNum='" + pages + "' class=\"item " + classStr + "\">" + pages + "</a> ";
          } else {
            for (k = p = 1; p <= 4; k = ++p) {
              classStr = k === pageNum ? 'active' : '';
              pageButHtml += " <a ids='pageBut' pageNum='" + k + "' class=\"item " + classStr + " \">" + k + "</a> ";
            }
            pageListHtml = '';
            for (k = q = 1, ref3 = pages; 1 <= ref3 ? q <= ref3 : q >= ref3; k = 1 <= ref3 ? ++q : --q) {
              pageListHtml += "<div ids='pageBut' pageNum='" + k + "' class=\"item\">" + k + "</div>";
            }
            pageButHtml += "<div ids='pageDrop' class=\"ui item icon bottom left dropdown\">\n        ...\n        <div class=\"menu tfoot-page-list the-bdrs-spc1\">\n            " + pageListHtml + "\n        </div>\n</div>";
            pageButHtml += " <a ids='pageBut' pageNum='" + pages + "' class=\"item\">" + pages + "</a> ";
          }
        } else {
          if (pages === 0) {
            classStr = 'active';
            pageButHtml += " <a ids='pageBut' class=\"item " + classStr + " \" pageNum='1'>1</a> ";
          } else {
            for (k = r = 1, ref4 = pages; 1 <= ref4 ? r <= ref4 : r >= ref4; k = 1 <= ref4 ? ++r : --r) {
              classStr = k === pageNum ? 'active' : '';
              pageButHtml += " <a ids='pageBut' class=\"item " + classStr + " \" pageNum='" + k + "'>" + k + "</a> ";
            }
          }
        }
        this.$pageToolbar.children(":not(:first,:last)").remove();
        this.$pageToolbar.find("[ids='pageBut']:eq(0)").after(pageButHtml);
      }
    }
    if (this.opt.pagination === 'min') {
      pageListHtml = '';
      for (k = s = 1, ref5 = pages; 1 <= ref5 ? s <= ref5 : s >= ref5; k = 1 <= ref5 ? ++s : --s) {
        pageListHtml += "<div ids='pageBut' pageNum='" + k + "' class=\"item\">" + k + "</div>";
      }
      pageButHtml = "<div ids='pageDrop' class=\"ui item icon bottom left dropdown\">\n        " + pageNum + "\n        <div class=\"menu tfoot-page-list the-bdrs-spc1\">\n            " + pageListHtml + "\n        </div>\n</div>";
      this.$pageToolbar.find("[ids='pageDrop']").replaceWith(pageButHtml);
    }
    this.$pageDropJump = this.$pageToolbar.find("[ids='pageDrop']").dropdown();
    return this.$pageDropJump.find(".menu").scrollbar({
      theme: 'dark-thin'
    });
  };


  /*
    清除表格数据
    opts
   */

  datagrid.prototype.clearData = function() {
    this.$ele.find("tbody tr").remove();
    this.$thCheckbox.checkbox('set unchecked');
    this.$rowAll = null;
    this.rowsArr = null;
    this.rowsArrKey = null;
    this.$selRowArr = null;
    this.page = {
      pageNum: 1,
      pageSize: 0,
      startRow: 0,
      endRow: 0,
      pages: 0,
      total: 0,
      prePage: 0,
      nextPage: 0,
      isFirstPage: true,
      isLastPage: true,
      list: []
    };
    return this.failButton();
  };


  /*
    编辑单元格
    opts
      $cell 单元格jq对象
      columns 列属性对象
   */

  datagrid.prototype.editCell = function(opts) {
    var $cell, $edit, $editCancel, $editConfirm, $editText, base, columns, endEdit, html, index, naVal, row;
    index = opts.index, $cell = opts.$cell, columns = opts.columns, row = opts.row;
    naVal = $.trim($cell.text());
    if (typeof (base = this.opt).onBeforeEdit === "function") {
      base.onBeforeEdit({
        index: index,
        field: columns.field,
        text: naVal,
        row: row
      });
    }
    html = "<div ids='editText' class=\"ui fluid input action mini compact\">\n    <input type=\"text\">\n    <div ids='editConfirm' class=\"ui button mini compact icon teal\"><i class=\"icon checkmark\"></i></div>\n    <div ids='editCancel' class=\"ui button mini compact icon teal\"><i class=\"icon remove\"></i></div>\n</div>";
    $cell.html(html);
    $cell.attr("edit", naVal);
    $edit = $cell.find("[ids='editText']");
    $editText = $edit.find("input");
    $editConfirm = $edit.find("[ids='editConfirm']");
    $editCancel = $edit.find("[ids='editCancel']");
    $editText.val(naVal).focus();
    $edit.off('click').on('click', function(e) {
      if (e && e.stopPropagation) {
        return e.stopPropagation();
      }
    });
    $edit.off('dblclick').on('dblclick', function(e) {
      if (e && e.stopPropagation) {
        return e.stopPropagation();
      }
    });
    endEdit = (function(_this) {
      return function(opts) {
        var base1, newVal;
        newVal = opts.newVal;
        $cell.html(newVal + "<i class=\"edit icon teal the-ml10\"></i>");
        $cell.removeAttr("edit");
        return typeof (base1 = _this.opt).onEndEdit === "function" ? base1.onEndEdit({
          index: index,
          row: row,
          field: columns.field,
          setVal: newVal
        }) : void 0;
      };
    })(this);
    $editConfirm.off('click').on('click', (function(_this) {
      return function(e) {
        var newVal;
        e.stopPropagation();
        newVal = $editText.val();
        if (columns.editConfirm) {
          if (columns.editConfirm({
            index: index,
            row: row,
            field: columns.field,
            naVal: naVal,
            newVal: newVal
          })) {
            return endEdit({
              newVal: newVal
            });
          }
        } else {
          return endEdit({
            newVal: newVal
          });
        }
      };
    })(this));
    return $editCancel.off('click').on('click', (function(_this) {
      return function(e) {
        e.stopPropagation();
        if (columns.editCancel) {
          if (columns.editCancel({
            index: index,
            row: row,
            field: columns.field,
            naVal: naVal
          })) {
            return endEdit({
              newVal: naVal
            });
          }
        } else {
          return endEdit({
            newVal: naVal
          });
        }
      };
    })(this));
  };


  /*
    获取row数据对象
    opts
      index  null返回全部表格数据集合/num类型为根据位置获取/array[num]为获取多个/array[{fieldName:fieidVal}]根据对象值获取多个
   */

  datagrid.prototype.getRow = function(opts) {
    var index, list;
    if (opts) {
      index = opts.index;
    }
    if (!this.page) {
      return null;
    }
    if (index || index === 0) {
      if (_.isNumber(index)) {
        if (this.page.list) {
          return _.clone(this.page.list[index]);
        } else {
          return null;
        }
      } else {
        if (_.isArray(index)) {
          if (_.isNumber(index[0])) {
            list = [];
            $.each(index, (function(_this) {
              return function(i, n) {
                return list.push(_.clone(_this.page.list[n]));
              };
            })(this));
            return list;
          } else {
            if (_.isObject(index[0])) {
              list = [];
              $.each(index, (function(_this) {
                return function(i, obj) {
                  return $.each(_this.page.list, function(k, row) {
                    var addIf, keys;
                    keys = _.keys(obj);
                    addIf = true;
                    $.each(keys, function(t, key) {
                      if (row[key] !== _.values(obj)[t]) {
                        return addIf = false;
                      }
                    });
                    if (addIf) {
                      return list.push(_.clone(row));
                    }
                  });
                };
              })(this));
              return list;
            }
          }
        }
      }
    } else {
      if (this.page.list) {
        return _.clone(this.page.list);
      } else {
        return null;
      }
    }
  };


  /*
    获取选中的行数据
    opts
      index  num/arr[num]/null  获取选中的行数据 null获取全部值数组  下标从0开始
   */

  datagrid.prototype.getSelected = function(opts) {
    var index, list;
    if (opts) {
      index = opts.index;
    }
    if (!this.rowsArr) {
      return null;
    }
    if (index) {
      if (_.isNumber(index)) {
        return _.clone(this.rowsArr[index]);
      } else {
        if (_.isArray(index)) {
          list = [];
          $.each(index, (function(_this) {
            return function(i, k) {
              return list.push(_.clone(_this.rowsArr[k]));
            };
          })(this));
          return list;
        }
      }
    } else {
      return _.clone(this.rowsArr);
    }
  };


  /*
    获取单页未选中行数据
    opts
   */

  datagrid.prototype.getUnSelect = function(opts) {
    return _.difference(this.page.list, this.rowsArr);
  };


  /*
    获取选择的行索引
    opts
   */

  datagrid.prototype.getSelIndex = function(opts) {
    return this.rowsArrKey;
  };


  /*
    根据jq节点获取上一级行row数据对象和index索引号,返回对象,格式为{index:8,row:Obj}
    opts
   */

  datagrid.prototype.getParentRow = function(opts) {
    var $tr, jqEle, num, row;
    jqEle = opts.jqEle;
    $tr = jqEle.parents("tr[ids*='r']:eq(0)");
    num = parseInt($tr.prevAll().length);
    row = this.getRow({
      index: num
    });
    return {
      index: num,
      row: row
    };
  };


  /*
    清空选中行
    opts
   */

  datagrid.prototype.clearSelect = function() {
    var notDis;
    notDis = this.$ele.find("tbody tr:not(.disabled)");
    notDis.find("[ids='tdCheckbox']").checkbox('set unchecked');
    notDis.removeClass('warning').removeAttr('select');
    $.each(this.rowsArr, (function(_this) {
      return function(i, rowData) {
        var base, num;
        num = _this.rowsArrKey[i];
        return typeof (base = _this.opt).onClickRow === "function" ? base.onClickRow({
          index: num,
          row: rowData
        }) : void 0;
      };
    })(this));
    this.rowsArr = null;
    this.rowsArrKey = null;
    this.$selRowArr = null;
    this.$thCheckbox.checkbox('set unchecked');
    return this.failButton();
  };


  /*
    全选
    opts
   */

  datagrid.prototype.selectAll = function() {
    var notDis;
    notDis = this.$ele.find("tbody tr:not(.disabled)");
    notDis.addClass('warning').attr('select', 'select');
    notDis.find("[ids='tdCheckbox']").checkbox('set checked');
    this.rowsArr = [];
    this.rowsArrKey = [];
    this.$selRowArr = [];
    notDis.each((function(_this) {
      return function(i, e) {
        var base, base1, num, rowData, t;
        t = $(e);
        num = parseInt(t.prevAll().length);
        rowData = _this.page.list[num];
        _this.rowsArr.push(rowData);
        _this.rowsArrKey.push(num);
        _this.$selRowArr.push(t);
        if (typeof (base = _this.opt).onSelectRow === "function") {
          base.onSelectRow({
            index: num,
            row: rowData
          });
        }
        return typeof (base1 = _this.opt).onClickRow === "function" ? base1.onClickRow({
          index: num,
          row: rowData
        }) : void 0;
      };
    })(this));
    if (this.$selRowArr && this.$selRowArr.length > 0) {
      if (this.$selRowArr.length === this.$rowAll.length) {
        this.$thCheckbox.checkbox('set checked');
      } else {
        this.$thCheckbox.checkbox('set indeterminate');
      }
      return this.effButton();
    } else {
      return this.$thCheckbox.checkbox('set unchecked');
    }
  };


  /*
    设置url地址
    opts
      url:新的url地址
   */

  datagrid.prototype.setUrl = function(opts) {
    var url;
    if (opts) {
      url = opts.url;
    }
    if (url) {
      return this.opt.url = url;
    }
  };


  /*
    加载数据
    opts
   */

  datagrid.prototype.load = function(opts) {
    if (opts) {
      this.opt.queryParams = $.extend({}, this.opt.queryParams, opts);
    }
    return this.loadData();
  };


  /*
    刷新当前页数据
    opts
   */

  datagrid.prototype.reload = function() {
    return this.loadData({
      page: this.page.pageNum
    });
  };


  /*
    选中某行 行号 0为第一行
    opts
      index num/array[num]/array[Obj(fieldName:fieidVal)]
   */

  datagrid.prototype.selectAnyRow = function(opts) {
    var index, select;
    if (opts) {
      index = opts.index;
    }
    select = [];
    if (_.isNumber(index)) {
      select.push(index);
    } else {
      if (_.isArray(index)) {
        if (_.isNumber(index[0])) {
          $.each(index, (function(_this) {
            return function(i, n) {
              return select.push(n);
            };
          })(this));
        } else {
          if (_.isObject(index[0])) {
            $.each(index, (function(_this) {
              return function(i, obj) {
                return $.each(_this.page.list, function(k, row) {
                  var addIf, keys;
                  keys = _.keys(obj);
                  addIf = true;
                  $.each(keys, function(t, key) {
                    if (row[key] !== _.values(obj)[t]) {
                      return addIf = false;
                    }
                  });
                  if (addIf) {
                    return select.push(k);
                  }
                });
              };
            })(this));
          }
        }
      }
    }
    select = _.uniq(select);
    $.each(select, (function(_this) {
      return function(i, k) {
        var $checkbox, $row, base, base1, rowData;
        $row = _this.$rowAll.eq(k);
        $checkbox = $row.find("td [ids='tdCheckbox']");
        rowData = _this.page.list[k];
        if (!_this.rowsArr) {
          _this.rowsArr = [];
          _this.rowsArrKey = [];
          _this.$selRowArr = [];
        }
        if (_.indexOf(_this.rowsArrKey, k) < 0) {
          _this.rowsArr.push(rowData);
          _this.rowsArrKey.push(k);
          $checkbox.checkbox('set checked');
          $row.addClass('warning').attr('select', 'select');
          _this.$selRowArr.push($row);
          if (typeof (base = _this.opt).onSelectRow === "function") {
            base.onSelectRow({
              index: k,
              row: rowData
            });
          }
        }
        return typeof (base1 = _this.opt).onClickRow === "function" ? base1.onClickRow({
          index: k,
          row: rowData
        }) : void 0;
      };
    })(this));
    if (this.$selRowArr && this.$selRowArr.length > 0) {
      if (this.$selRowArr.length === this.$rowAll.length) {
        this.$thCheckbox.checkbox('set checked');
      } else {
        this.$thCheckbox.checkbox('set indeterminate');
      }
    } else {
      this.$thCheckbox.checkbox('set unchecked');
    }
    return this.effButton();
  };


  /*
    清除某些行 行号 0为第一行 或者根据 健值对
    opts
      index num/array[num]/array[Obj(fieldName:fieidVal)]
   */

  datagrid.prototype.unselectAnyRow = function(opts) {
    var index, select;
    if (opts) {
      index = opts.index;
    }
    if (!this.rowsArr) {
      return null;
    }
    select = [];
    if (_.isNumber(index)) {
      select.push(index);
    } else {
      if (_.isArray(index)) {
        if (_.isNumber(index[0])) {
          $.each(index, (function(_this) {
            return function(i, n) {
              return select.push(n);
            };
          })(this));
        } else {
          if (_.isObject(index[0])) {
            $.each(index, (function(_this) {
              return function(i, obj) {
                return $.each(_this.page.list, function(k, row) {
                  var addIf, keys;
                  keys = _.keys(obj);
                  addIf = true;
                  $.each(keys, function(t, key) {
                    if (row[key] !== _.values(obj)[t]) {
                      return addIf = false;
                    }
                  });
                  if (addIf) {
                    return select.push(k);
                  }
                });
              };
            })(this));
          }
        }
      }
    }
    select = _.uniq(select);
    $.each(select, (function(_this) {
      return function(i, k) {
        var $checkbox, $row, base;
        if (i === _this.$selRowArr.length - 1 && _this.opt.selectCancel === false) {
          return;
        }
        $row = _this.$rowAll.eq(k);
        $checkbox = $row.find("td [ids='tdCheckbox']");
        if (typeof (base = _this.opt).onClickRow === "function") {
          base.onClickRow({
            index: k,
            row: _this.rowsArr[i]
          });
        }
        $.each(_this.rowsArrKey, function(i, key) {
          if (key === k) {
            _this.rowsArr.splice(i, 1);
            _this.rowsArrKey.splice(i, 1);
            _this.$selRowArr.splice(i, 1);
          }
        });
        $checkbox.checkbox('set unchecked');
        return $row.removeClass('warning').removeAttr('select');
      };
    })(this));
    if (this.$selRowArr && this.$selRowArr.length > 0) {
      if (this.$selRowArr.length === this.$rowAll.length) {
        return this.$thCheckbox.checkbox('set checked');
      } else {
        return this.$thCheckbox.checkbox('set indeterminate');
      }
    } else {
      this.$thCheckbox.checkbox('set unchecked');
      return this.failButton();
    }
  };


  /*
    保存编辑并恢复不可编辑
    opts
   */

  datagrid.prototype.saveEdit = function(opts) {
    var $cells;
    $cells = this.$ele.find("tbody td[edit]");
    $cells.each(function() {
      var $cell, $editText, newVal;
      $cell = $(this);
      $editText = $cell.find("input");
      newVal = $editText.val();
      return $cell.html(newVal + "<i class=\"edit icon teal the-ml10\"></i>");
    });
    return $cells.removeAttr("edit");
  };


  /*
    撤销编辑并恢复不可编辑
    opts
   */

  datagrid.prototype.cancelEdit = function(opts) {
    var $cells;
    $cells = this.$ele.find("tbody td[edit]");
    $cells.each(function() {
      var $cell, oldVal;
      $cell = $(this);
      oldVal = $cell.attr("edit");
      return $cell.html(oldVal + "<i class=\"edit icon teal the-ml10\"></i>");
    });
    return $cells.removeAttr("edit");
  };


  /*
    获取编辑状态的Cell单元格对象
    opts
   */

  datagrid.prototype.getEditors = function() {
    var $cells, reVal;
    $cells = this.$ele.find("tbody td[edit]");
    reVal = [];
    $cells.each(function() {
      var $cell, $editText;
      $cell = $(this);
      $editText = $cell.find("[ids='editText'] input");
      return reVal.push({
        $cell: $cell,
        value: $editText.val()
      });
    });
    return reVal;
  };


  /*
    更新row行数据
    opts
      index 更新行位置
      row 根据数据
   */

  datagrid.prototype.updateRow = function(opts) {
    var $row, index, k, oldRow, row;
    index = opts.index, row = opts.row;
    $row = this.$rowAll.eq(index);
    k = _.indexOf(this.rowsArrKey, index);
    if (k > -1) {
      oldRow = this.rowsArr[k];
      this.rowsArr[k] = $.extend({}, oldRow, row);
    }
    oldRow = this.page.list[index];
    this.page.list[index] = $.extend({}, oldRow, row);
    $.each(this.opt.columns, (function(_this) {
      return function(k, columnsRow) {
        var contHtml, fieldVal;
        contHtml = '';
        if (columnsRow.field) {
          fieldVal = row[columnsRow.field];
          if (columnsRow.formatter) {
            fieldVal = columnsRow.formatter({
              column: fieldVal,
              row: row
            });
          }
        } else {
          if (columnsRow.formatter) {
            fieldVal = columnsRow.formatter({
              row: row
            });
          }
        }
        if (fieldVal) {
          contHtml += " " + fieldVal + " ";
        }
        if (columnsRow.edit) {
          contHtml += "<i class=\"edit icon teal\" style='margin-left: 10px'></i>";
        }
        if (_this.opt.cumNum) {
          k++;
        }
        if (_this.opt.checkbox === 'left') {
          k++;
        }
        if (contHtml) {
          return $row.find("td").eq(k).html(contHtml);
        }
      };
    })(this));
    return this.eventGrid();
  };


  /*
    追加row行数据
    opts
      rowsArr([Obj]) 数据对象数组
   */

  datagrid.prototype.appendRow = function(opts) {
    var rows;
    rows = opts.rows;
    $.each(rows, (function(_this) {
      return function(i, dataRow) {
        _this.page.list.push(dataRow);
        return _this.page.total++;
      };
    })(this));
    return this.addData({
      rowsArr: rows
    });
  };


  /*
    插入row行到某一行
    opts
      index 插入目标行索引
      row 插入数据数组
   */

  datagrid.prototype.insertRow = function(opts) {
    var index, rows;
    index = opts.index, rows = opts.rows;
    $.each(rows, (function(_this) {
      return function(i, dataRow) {
        _this.page.list.splice(index, 0, dataRow);
        return _this.page.total++;
      };
    })(this));
    return this.addData({
      rowsArr: rows,
      location: index
    });
  };


  /*
    删除某一行
    opts
      index num类型为根据位置删除/array[num]为删除多个/array[{fieldName:fieidVal}]根据对象值删除多个
   */

  datagrid.prototype.deleteRow = function(opts) {
    var $newSelRowArr, $pRow, delArr, index, newList, newRowsArr, newRowsArrKey;
    if (opts) {
      index = opts.index;
    }
    if (!this.page) {
      return null;
    }
    delArr = [];
    if (index || index === 0) {
      if (_.isNumber(index)) {
        delArr.push(index);
      } else {
        if (_.isArray(index)) {
          if (_.isNumber(index[0])) {
            delArr = index;
          } else {
            if (_.isObject(index[0])) {
              $.each(index, (function(_this) {
                return function(i, obj) {
                  return $.each(_this.page.list, function(k, row) {
                    var addIf, keys;
                    keys = _.keys(obj);
                    addIf = true;
                    $.each(keys, function(t, key) {
                      if (row[key] !== _.values(obj)[t]) {
                        return addIf = false;
                      }
                    });
                    return delArr.push(k);
                  });
                };
              })(this));
            }
          }
        }
      }
    } else {
      delArr = this.rowsArrKey;
    }
    delArr = _.uniq(delArr);
    newList = [];
    newRowsArr = [];
    newRowsArrKey = [];
    $newSelRowArr = [];
    $.each(this.page.list, (function(_this) {
      return function(i, row) {
        if (_.indexOf(delArr, i) < 0) {
          return newList.push(row);
        }
      };
    })(this));
    this.page.total = newList.length;
    this.page.list = newList;
    $.each(delArr, (function(_this) {
      return function(i, k) {
        return _this.$rowAll.eq(k).attr("del", "del");
      };
    })(this));
    $pRow = this.$rowAll.parent();
    $pRow.find("tr[del='del']").remove();
    this.$rowAll = $pRow.find("tr");
    $.each(this.rowsArrKey, (function(_this) {
      return function(i, k) {
        if (_.indexOf(delArr, k) < 0) {
          newRowsArrKey.push(k);
          newRowsArr.push(_this.rowsArr[i]);
          return $newSelRowArr.push(_this.$selRowArr[i]);
        }
      };
    })(this));
    this.rowsArr = newRowsArr;
    this.rowsArrKey = newRowsArrKey;
    return this.$selRowArr = $newSelRowArr;
  };


  /*
    显示列
    opts
      index(arr[str field名称])  str为field名称
   */

  datagrid.prototype.showColumn = function(opts) {
    var index, showArr;
    index = opts.index;
    showArr = [];
    $.each(this.opt.columns, function(i, columns) {
      if (_.indexOf(index, columns.field) > -1) {
        return showArr.push(i);
      }
    });
    this.tableHeadToTop();
    $.each(showArr, (function(_this) {
      return function(i, column) {
        var $td, $th;
        _this.opt.columns[column].hidden = 'show';
        $th = _this.$theadTh.parent().find("[ids='c" + column + "']");
        $th.removeClass("the-dn");
        if (_this.$rowAll) {
          $td = _this.$rowAll.find("td[ids='c" + column + "']");
          $td.removeClass("the-dn");
        }
        if (_this.$columnsShowDropdown) {
          _this.$columnsShowDropdown.find("[ids='checkbox'][column='" + column + "']").checkbox('set checked');
        }
        if (_this.$titleColumnsShowDropdown) {
          return _this.$titleColumnsShowDropdown.find("[ids='titleCheckbox'][column='" + column + "']").checkbox('set checked');
        }
      };
    })(this));
    return this.checkAllShowBox();
  };


  /*
    隐藏列
    opts
      index arr[str field名称] str为field名称
   */

  datagrid.prototype.hideColumn = function(opts) {
    var $checkbox, $fuCheckbox, allChecked, allUnchecked, hideArr, index;
    index = opts.index;
    hideArr = [];
    $.each(this.opt.columns, function(i, columns) {
      if (_.indexOf(index, columns.field) > -1) {
        return hideArr.push(i);
      }
    });
    if (hideArr && (this.opt.height || this.opt.maxHeight) && this.opt.showHeader) {
      this.$parEle.find(".mCSB_scrollTools .mCSB_dragger").eq(0).css('top', '0px');
      this.$parEle.find(".mCSB_container").eq(0).css('top', '0px');
      this.$ele.floatThead('reflow');
      setTimeout((function(_this) {
        return function() {
          var scollHeight;
          scollHeight = _this.$parEle.find('.floatThead-container').css('height');
          _this.$parEle.find('.mCSB_draggerContainer').css('top', scollHeight);
          return _this.$parEle.mCustomScrollbar('update');
        };
      })(this), 300);
    }
    $.each(hideArr, (function(_this) {
      return function(i, column) {
        var $td, $th;
        _this.opt.columns[column].hidden = 'hide';
        $th = _this.$theadTh.parent().find("[ids='c" + column + "']");
        $th.addClass("the-dn");
        if (_this.$rowAll) {
          $td = _this.$rowAll.find("td[ids='c" + column + "']");
          $td.addClass("the-dn");
        }
        if (_this.$columnsShowDropdown) {
          _this.$columnsShowDropdown.find("[ids='checkbox'][column='" + column + "']").checkbox('set unchecked');
        }
        if (_this.$titleColumnsShowDropdown) {
          return _this.$titleColumnsShowDropdown.find("[ids='titleCheckbox'][column='" + column + "']").checkbox('set unchecked');
        }
      };
    })(this));
    if (this.$columnsShowDropdown) {
      allChecked = true;
      allUnchecked = true;
      $fuCheckbox = this.$columnsShowDropdown.find("[ids='fuCheckbox']");
      $checkbox = this.$columnsShowDropdown.find("[ids='checkbox']");
      $checkbox.each(function(i) {
        if ($(this).checkbox('is checked')) {
          allUnchecked = false;
        } else {
          allChecked = false;
        }
        return true;
      });
      if (allChecked) {
        $fuCheckbox.checkbox('set checked');
      } else if (allUnchecked) {
        $fuCheckbox.checkbox('set unchecked');
      } else {
        $fuCheckbox.checkbox('set indeterminate');
      }
    }
    if (this.$titleColumnsShowDropdown) {
      allChecked = true;
      allUnchecked = true;
      $fuCheckbox = this.$titleColumnsShowDropdown.find("[ids='titleFuCheckbox']");
      $checkbox = this.$titleColumnsShowDropdown.find("[ids='titleCheckbox']");
      $checkbox.each(function(i) {
        if ($(this).checkbox('is checked')) {
          allUnchecked = false;
        } else {
          allChecked = false;
        }
        return true;
      });
      if (allChecked) {
        return $fuCheckbox.checkbox('set checked');
      } else if (allUnchecked) {
        return $fuCheckbox.checkbox('set unchecked');
      } else {
        return $fuCheckbox.checkbox('set indeterminate');
      }
    }
  };


  /*
    依据某列进行排序
    opts null则
      sort 排序field字段名
      orderby 排序方向 desc倒序 asc 正序
   */

  datagrid.prototype.sortColumn = function(opts) {
    var $i, base, k, orderby, resIco, sort;
    if (opts) {
      sort = opts.sort, orderby = opts.orderby;
    }
    k = '';
    $.each(this.opt.columns, function(i, columns) {
      if (columns.field === sort) {
        return k = i;
      }
    });
    $i = this.$parEle.find("thead th[ids='c" + k + "'] i.icon.sort");
    resIco = (function(_this) {
      return function() {
        return _this.$theadTh.find('i.icon.sort').removeClass("ascending descending");
      };
    })(this);
    switch (orderby) {
      case 'desc':
        resIco();
        $i.attr("class", 'icon sort descending');
        this.sort = sort;
        this.orderby = 'desc';
        break;
      case 'asc':
        resIco();
        $i.attr("class", 'icon sort ascending');
        this.sort = sort;
        this.orderby = 'asc';
        break;
      default:
        resIco();
        $i.attr("class", 'icon sort');
        this.sort = null;
        this.orderby = null;
    }
    if (typeof (base = this.opt).onBeforeSortColumn === "function") {
      base.onBeforeSortColumn({
        sort: this.sort,
        order: this.orderby
      });
    }
    return this.loadData();
  };


  /*
    设置表头标题文本
    opts
      title 标题信息
   */

  datagrid.prototype.setTitle = function(opts) {
    var title;
    if (opts) {
      title = opts.title;
    }
    return this.$title.find("[ids='titleStr']").html(title);
  };


  /*
    获取表头标题文本
    opts
   */

  datagrid.prototype.getTitle = function() {
    return this.$title.find("[ids='titleStr']").html();
  };


  /*
    让必选按钮生效
    opts
   */

  datagrid.prototype.effButton = function() {
    if (this.$handerButtonFn) {
      $.each(this.opt.funToolbar, (function(_this) {
        return function(i, butObj) {
          if (butObj.selectRow) {
            return _this.$handerButtonFn.eq(i).removeClass('disabled');
          }
        };
      })(this));
    }
    if (this.$titleHanderButtonFn) {
      return $.each(this.opt.titleFunToolbar, (function(_this) {
        return function(i, butObj) {
          if (butObj.selectRow) {
            return _this.$titleHanderButtonFn.eq(i).removeClass('disabled');
          }
        };
      })(this));
    }
  };


  /*
    让必选按钮失效
    opts
   */

  datagrid.prototype.failButton = function() {
    if (this.$handerButtonFn) {
      $.each(this.opt.funToolbar, (function(_this) {
        return function(i, butObj) {
          if (butObj.selectRow) {
            return _this.$handerButtonFn.eq(i).addClass('disabled');
          }
        };
      })(this));
    }
    if (this.$titleHanderButtonFn) {
      return $.each(this.opt.titleFunToolbar, (function(_this) {
        return function(i, butObj) {
          if (butObj.selectRow) {
            return _this.$titleHanderButtonFn.eq(i).addClass('disabled');
          }
        };
      })(this));
    }
  };


  /*
    下拉方向
    opts
   */

  datagrid.prototype.dropDire = function(opts) {
    var $ele, befAll, befTrHeigth, height, nextAll, nextTrHeigth, scollHeight, tableHeight, tr, trHeigth;
    $ele = opts.$ele, height = opts.height;
    tr = $ele.parents("tr[ids*='r']:eq(0)");
    nextAll = tr.nextAll();
    nextTrHeigth = 0;
    nextAll.each(function(i, ele) {
      var nextTr;
      nextTr = $(ele).css('height');
      return nextTrHeigth += parseInt(nextTr.substring(0, nextTr.indexOf('px')));
    });
    if (nextTrHeigth >= height) {
      return true;
    } else {
      befAll = tr.prevAll();
      befTrHeigth = 0;
      befAll.each(function(i, ele) {
        var befTr;
        befTr = $(ele).css('height');
        return befTrHeigth += parseInt(befTr.substring(0, befTr.indexOf('px')));
      });
      trHeigth = tr.css('height');
      trHeigth = parseInt(trHeigth.substring(0, trHeigth.indexOf('px')));
      scollHeight = this.$parEle.find('.floatThead-container').css('height');
      scollHeight = parseInt(scollHeight.substring(0, scollHeight.indexOf('px')));
      tableHeight = this.$parEle.parents(".mCustomScrollBox:eq(0)").css('height');
      tableHeight = parseInt(tableHeight.substring(0, tableHeight.indexOf('px')));
      if (befTrHeigth + trHeigth + height < (tableHeight - scollHeight)) {
        return true;
      } else {
        return false;
      }
    }
  };


  /*
    查询组件构造成功后 回调
    opts
   */

  datagrid.prototype.onBeforeLoad = function(opts) {
    return this.opt.onBeforeLoad = opts;
  };


  /*
    datagrid得到数据后
    opts
   */

  datagrid.prototype.onLoadResults = function(opts) {
    return this.opt.onLoadResults = opts;
  };


  /*
    成功加载后 回调
    opts
   */

  datagrid.prototype.onLoadSuccess = function(opts) {
    return this.opt.onLoadSuccess = opts;
  };


  /*
    加载失败后 回调
    opts
   */

  datagrid.prototype.onLoadError = function(opts) {
    return this.opt.onLoadError = opts;
  };


  /*
    表格数据填充完成后 回调
    opts
   */

  datagrid.prototype.onRowReady = function(opts) {
    return this.opt.onRowReady = opts;
  };


  /*
    清空查询按钮点击 回调
    opts
   */

  datagrid.prototype.onSelectClear = function(opts) {
    return this.opt.onSelectClear = opts;
  };


  /*
    单击选中行后 回调
    opts
   */

  datagrid.prototype.onSelectRow = function(opts) {
    return this.opt.onSelectRow = opts;
  };


  /*
    单击选中行后 回调
    opts
   */

  datagrid.prototype.onClickRow = function(opts) {
    return this.opt.onClickRow = opts;
  };


  /*
    双击行后 回调
    opts
   */

  datagrid.prototype.onDblClickRow = function(opts) {
    return this.opt.onDblClickRow = opts;
  };


  /*
    点击单元格 回调
    opts
   */

  datagrid.prototype.onClickCell = function(opts) {
    return this.opt.onClickCell = opts;
  };


  /*
    双击单元格 回调
    opts
   */

  datagrid.prototype.onDblClickCell = function(opts) {
    return this.opt.onDblClickCell = opts;
  };


  /*
    列排序前 回调
    opts
   */

  datagrid.prototype.onBeforeSortColumn = function(opts) {
    return this.opt.onBeforeSortColumn = opts;
  };


  /*
    开始编辑状态前 回调
    opts
   */

  datagrid.prototype.onBeforeEdit = function(opts) {
    return this.opt.onBeforeEdit = opts;
  };


  /*
    开始编辑状态 回调
    opts
   */

  datagrid.prototype.onBeginEdit = function(opts) {
    return this.opt.onBeginEdit = opts;
  };


  /*
    结束编辑状态后 回调
    opts
   */

  datagrid.prototype.onEndEdit = function(opts) {
    return this.opt.onEndEdit = opts;
  };

  return datagrid;

})();

(function() {
  $.fn.datagrid = function() {
    var obj, opts, others;
    opts = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    obj = this.data("obj");
    if (obj) {
      obj.perform.apply(obj, [opts].concat(slice.call(others)));
    } else {
      obj = (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(datagrid, [this, opts].concat(slice.call(others)), function(){});
      this.data("obj", obj);
    }
    return obj;
  };
  return $.fn.datagrid.opts = {};
})();

//# sourceMappingURL=datagrid.js.map
