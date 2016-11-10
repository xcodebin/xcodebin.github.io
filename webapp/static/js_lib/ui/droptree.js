
/*
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
 */
var droptree,
  slice = [].slice;

droptree = (function() {
  function droptree() {
    var $ele, opts, others;
    $ele = arguments[0], opts = arguments[1], others = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    this.$ele = $ele;
    this.defaults = {
      name: 'dropTree',
      initLoad: true,
      selectWay: "radio",
      multiUnitText: "个",
      promptText: "请选择",
      selectText: "搜索信息",
      maxSelect: 0,
      maxHeight: 200,
      openAllNode: false
    };
    this.opt = $.extend({}, this.defaults, $.fn.droptree.opts, opts);
    this.creatTree();
    if (this.opt.initLoad && (this.opt.data || this.opt.url)) {
      this.loadTree();
    }
  }


  /*
    执行路由
    opts
   */

  droptree.prototype.perform = function() {
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
    树事件
    opts
   */

  droptree.prototype.eventDrop = function() {
    this.$clearBut.off('click').on('click', (function(_this) {
      return function(e) {
        _this.clearSelect();
        return _this.hideDrop();
      };
    })(this));
    this.$searchTreeBut.off('click').on('click', (function(_this) {
      return function(e) {
        return _this.searchTree();
      };
    })(this));
    return this.$searchTreeInp.off('keydown').on('keydown', (function(_this) {
      return function(e) {
        if (e.keyCode === 13) {
          _this.searchTree();
          return e.stopPropagation();
        }
      };
    })(this));
  };


  /*
    创建树节点
    opts
   */

  droptree.prototype.creatTree = function() {
    var $dropTree, base, html;
    html = "<div class=\"ui selection dropdown the-droptree\">\n  <i class=\"dropdown icon\"></i>\n  <input ids='treeValue' style='display: none;' name=\"" + this.opt.name + "\">\n  <div ids='defInfo' class=\"default text\">" + this.opt.promptText + "</div>\n  <div class=\"menu tree-content\">\n    <div class=\"ui input action\">\n      <input ids='searchTreeInp' type=\"text\" placeholder=\"" + this.opt.selectText + "\" />\n      <button ids='searchTreeBut' type=\"button\" class=\"ui teal button icon\">\n        <i class=\"icon refresh\"></i>\n      </button>\n    </div>\n    <div class=\"ui divider\"></div>\n    <div ids='treeList'></div>\n    <div class=\"ui divider\"></div>\n    <div class=\"droptree-foot\">\n      <button ids='clearBt' type=\"button\" class=\"teal ui button fluid\">清空选择</button>\n    </div>\n    <div class=\"item the-dn active selected\"></div>\n  </div>\n</div>";
    this.$ele.after(html);
    $dropTree = this.$ele.next();
    $dropTree.data("obj", this.$ele.data("obj"));
    this.$ele.remove();
    this.$ele = $dropTree;
    this.$treeList = this.$ele.find("[ids='treeList']");
    this.$defInfo = this.$ele.find("[ids='defInfo']");
    this.$clearBut = this.$ele.find("[ids='clearBt']");
    this.$searchTreeInp = this.$ele.find("[ids='searchTreeInp']");
    this.$searchTreeBut = this.$ele.find("[ids='searchTreeBut']");
    this.$treeValue = this.$ele.find("[ids='treeValue']");
    this.$ele.dropdown({
      onShow: (function(_this) {
        return function() {
          var base, height, maxHeight;
          height = _this.$ele.css('height');
          height = height.substring(0, height.indexOf('px'));
          maxHeight = $(window).height() - _this.$ele.offset().top - height - 20 - 40 - 41;
          if (_this.opt.maxHeight > parseInt(maxHeight)) {
            if (maxHeight > 100) {
              _this.$treeList.css("height", maxHeight + "px");
            } else {
              _this.$treeList.css("height", "100px");
            }
          } else {
            _this.$treeList.css("height", _this.opt.maxHeight + "px");
          }
          return typeof (base = _this.opt).onShowDrop === "function" ? base.onShowDrop() : void 0;
        };
      })(this),
      onHide: (function(_this) {
        return function() {
          var base;
          return typeof (base = _this.opt).onHideDrop === "function" ? base.onHideDrop() : void 0;
        };
      })(this)
    });
    if (typeof (base = this.opt).onDropReady === "function") {
      base.onDropReady();
    }
    return this.eventDrop();
  };


  /*
    加载树数据
    opts
   */

  droptree.prototype.loadTree = function(opts) {
    var base, base1, query, treeData;
    if (this.opt.url) {
      query = opts ? $.extend({}, this.opt.queryParams, opts) : this.opt.queryParams;
      this.loaderQuery = typeof (base = this.opt).loader === "function" ? base.loader({
        query: query
      }) : void 0;
      if (this.loaderQuery !== false) {
        return $.jsonTool('ajax', {
          url: this.opt.url,
          data: $.extend(query, this.loaderQuery),
          onSuccess: (function(_this) {
            return function(data) {
              var base1, treeData;
              treeData = data.data;
              if (_.isString(treeData)) {
                treeData = eval("(" + treeData + ")");
              }
              if (treeData && treeData.length > 0) {
                if (_this.opt.loadFilter) {
                  _this.makeTree({
                    treeData: _this.opt.loadFilter({
                      data: treeData
                    })
                  });
                } else {
                  _this.makeTree({
                    treeData: treeData
                  });
                }
              }
              return typeof (base1 = _this.opt).onLoadReady === "function" ? base1.onLoadReady({
                data: treeData
              }) : void 0;
            };
          })(this),
          onError: (function(_this) {
            return function(err) {
              return console.log("树数据加载error");
            };
          })(this)
        });
      }
    } else {
      if (this.opt.data) {
        treeData = this.opt.data;
        if (_.isString(treeData)) {
          treeData = eval("(" + treeData + ")");
        }
        if (treeData && treeData.length > 0) {
          if (this.opt.loadFilter) {
            this.makeTree({
              treeData: this.opt.loadFilter({
                data: treeData
              })
            });
          } else {
            this.makeTree({
              treeData: treeData
            });
          }
        }
        return typeof (base1 = this.opt).onLoadReady === "function" ? base1.onLoadReady({
          data: treeData
        }) : void 0;
      }
    }
  };


  /*
    树事件
    opts
   */

  droptree.prototype.eventTree = function() {
    this.$treeList.unbind('loaded.jstree').on("loaded.jstree", (function(_this) {
      return function(event, data) {
        if (_this.opt.openAllNode) {
          _this.$treeList.jstree("open_all");
        }
        if (_this.opt.defValueId && _this.opt.defValueId.length > 0) {
          return _this.selectNode({
            nodeId: _this.opt.defValueId
          });
        }
      };
    })(this));
    this.$treeList.unbind('select_node.jstree').bind("select_node.jstree", (function(_this) {
      return function(node, selected) {
        var base, base1;
        _this.updateValue();
        if (typeof (base = _this.opt).onSelectNode === "function") {
          base.onSelectNode({
            node: selected.node,
            selectArr: _this.selectArr
          });
        }
        if (typeof (base1 = _this.opt).onChangeSelectNode === "function") {
          base1.onChangeSelectNode({
            node: selected.node,
            selectArr: _this.selectArr
          });
        }
        if (_this.opt.selectWay === 'radio') {
          return _this.hideDrop();
        }
      };
    })(this));
    return this.$treeList.unbind('deselect_node.jstree').bind("deselect_node.jstree", (function(_this) {
      return function(node, selected) {
        var base, base1;
        _this.updateValue();
        if (typeof (base = _this.opt).onUnSelectNode === "function") {
          base.onUnSelectNode({
            node: selected.node,
            selectArr: _this.selectArr
          });
        }
        return typeof (base1 = _this.opt).onChangeSelectNode === "function" ? base1.onChangeSelectNode({
          node: selected.node,
          selectArr: _this.selectArr
        }) : void 0;
      };
    })(this));
  };


  /*
    构造tree
    opts
   */

  droptree.prototype.makeTree = function(opts) {
    var treeConfig, treeData;
    treeData = opts.treeData;
    treeConfig = {
      "core": {
        "data": treeData,
        "themes": {
          "icons": false,
          "dots": false
        }
      },
      "search": {
        "case_insensitive": true,
        "show_only_matches": true
      }
    };
    switch (this.opt.selectWay) {
      case 'radio':
        treeConfig.plugins = ["search"];
        break;
      case 'multi':
        treeConfig.plugins = ["checkbox", "search"];
        treeConfig.checkbox = {
          "keep_selected_style": false
        };
    }
    if (this.$treeList) {
      this.$treeList.jstree('destroy');
    }
    this.$treeList.jstree(treeConfig).bind('ready.jstree', (function(_this) {
      return function(event, data) {
        var base;
        return typeof (base = _this.opt).onMakeReady === "function" ? base.onMakeReady() : void 0;
      };
    })(this));
    return this.eventTree();
  };


  /*
    设置url地址
    opts
      url:新的url地址
   */

  droptree.prototype.setUrl = function(opts) {
    var url;
    if (opts) {
      url = opts.url;
    }
    if (url) {
      return this.opt.url = url;
    }
  };


  /*
    设置数据
    opts
      data 静态数据初始化 结构为json
   */

  droptree.prototype.setData = function(opts) {
    var data;
    if (opts) {
      data = opts.data;
    }
    if (data) {
      this.opt.data = data;
    }
    return this.loadTree();
  };


  /*
    获取树data数据
    opts
   */

  droptree.prototype.getDate = function(opts) {
    return this.opt.data;
  };


  /*
    展示下拉树
    opts
   */

  droptree.prototype.showDrop = function(opts) {
    return this.$ele.dropdown('show');
  };


  /*
    隐藏下拉树
    opts
   */

  droptree.prototype.hideDrop = function(opts) {
    return this.$ele.dropdown('hide');
  };


  /*
    根据树节点id 选中节点
    opts
      nodeId  str/array[str] 节点id 选中节点
   */

  droptree.prototype.selectNode = function(opts) {
    var nodeId;
    nodeId = opts.nodeId;
    if (_.isString(nodeId)) {
      if (this.opt.selectWay === 'radio') {
        this.clearSelect();
      }
      this.$treeList.jstree('select_node', nodeId);
    }
    if (_.isArray(nodeId)) {
      if (this.opt.selectWay === 'radio') {
        if (this.opt.selectWay === 'radio') {
          this.clearSelect();
        }
        return this.$treeList.jstree('select_node', nodeId[0]);
      } else {
        return this.$treeList.jstree('select_node', nodeId);
      }
    }
  };


  /*
    根据树节点id 取消选中节点
    opts
      nodeId  str/array[str]  树节点id
   */

  droptree.prototype.unSelectNode = function(opts) {
    var nodeId;
    nodeId = opts.nodeId;
    if (_.isString(nodeId)) {
      this.$treeList.jstree('deselect_node', nodeId);
    }
    if (_.isArray(nodeId)) {
      if (this.opt.selectWay === 'radio') {
        return this.$treeList.jstree('deselect_node', nodeId[0]);
      } else {
        return this.$treeList.jstree('deselect_node', nodeId);
      }
    }
  };


  /*
    更新下拉框值
    opts
   */

  droptree.prototype.updateValue = function(opts) {
    this.selectArr = this.$treeList.jstree('get_selected', true);
    if (this.opt.selectWay === 'radio') {
      this.$treeValue.val(true);
      return this.$ele.dropdown('set text', this.selectArr[0].text);
    } else {
      if (this.selectArr.length > 0) {
        this.$treeValue.val(true);
        return this.$ele.dropdown('set text', "已选 " + this.selectArr.length + " " + this.opt.multiUnitText);
      } else {
        return this.clearSelect();
      }
    }
  };


  /*
    清空选择
    opts
   */

  droptree.prototype.clearSelect = function() {
    var base, base1, nodeId;
    this.selectArr = null;
    this.$treeList.jstree('deselect_all');
    this.$searchTreeInp.val('');
    this.$treeList.jstree('search', '');
    if (this.opt.defValueId) {
      nodeId = this.opt.defValueId;
      if (_.isString(nodeId)) {
        this.$treeList.jstree('select_node', nodeId);
      }
      if (_.isArray(nodeId)) {
        if (this.opt.selectWay === 'radio') {
          this.$treeList.jstree('select_node', nodeId[0]);
        } else {
          this.$treeList.jstree('select_node', nodeId);
        }
      }
    } else {
      this.$treeValue.val('');
      this.$ele.dropdown('set text', null);
      this.$defInfo.addClass("default").text("" + this.opt.promptText);
      if (typeof (base = this.opt).onChangeSelectNode === "function") {
        base.onChangeSelectNode({
          node: null,
          selectArr: this.selectArr
        });
      }
    }
    return typeof (base1 = this.opt).onClearSelect === "function" ? base1.onClearSelect() : void 0;
  };


  /*
    检索树节点
    opts
   */

  droptree.prototype.searchTree = function() {
    var seaVal;
    seaVal = this.$searchTreeInp.val();
    return this.$treeList.jstree('search', seaVal);
  };


  /*
    获取选择节点数据对象集合
    opts
   */

  droptree.prototype.getSelects = function() {
    return this.selectArr;
  };


  /*
    下拉组件初始化完成后 回调
    opts
   */

  droptree.prototype.onDropReady = function(opts) {
    return this.opt.onDropReady = opts;
  };


  /*
    树数据加载完成后 回调
    opts
   */

  droptree.prototype.onLoadReady = function(opts) {
    return this.opt.onLoadReady = opts;
  };


  /*
    单击选中节点后 回调
    opts
   */

  droptree.prototype.onSelectNode = function(opts) {
    return this.opt.onSelectNode = opts;
  };


  /*
    单击取消选中节点后 回调
    opts
   */

  droptree.prototype.onUnSelectNode = function(opts) {
    return this.opt.onUnSelectNode = opts;
  };


  /*
    改变选中节点后 回调 返回tree node对象
    opts
   */

  droptree.prototype.onChangeSelectNode = function(opts) {
    return this.opt.onChangeSelectNode = opts;
  };


  /*
    展示下拉树前回调
    opts
   */

  droptree.prototype.onShowDrop = function(opts) {
    return this.opt.onShowDrop = opts;
  };


  /*
    隐藏下拉树前回调
    opts
   */

  droptree.prototype.onHideDrop = function(opts) {
    return this.opt.onHideDrop = opts;
  };


  /*
    清空选择回调
    opts
   */

  droptree.prototype.onClearSelect = function(opts) {
    return this.opt.onClearSelect = opts;
  };


  /*
    下拉组件最后构建完成后 回调
    opts
   */

  droptree.prototype.onMakeReady = function(opts) {
    return this.opt.onMakeReady = opts;
  };

  return droptree;

})();

(function() {
  $.fn.droptree = function() {
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
      })(droptree, [this, opts].concat(slice.call(others)), function(){});
      this.data("obj", obj);
    }
    return obj;
  };
  return $.fn.droptree.opts = {};
})();

//# sourceMappingURL=droptree.js.map
