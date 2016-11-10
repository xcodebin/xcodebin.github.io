
/*
Api:
  $.fromTool() 初始化table return 当前datagrid 与节点绑定的对象1对1对象
  $.fn.fromTool.opts 全局参数设置
  事件触发优先高->低:

  attr 属性 可以console.log打印下即可知道对象属性和方法
    $ele 表单对象jq节点对象
    dataAll 表单元素节点对象
      dataAll格式:
        {
          name:{
            $ele:$ele   //表单JQ节点对象
            name:name   //表单name值
            value:value //表单数据
            state:state //状态 1启用 2禁用 3隐藏
            vali:vali //验证状态 1未验证 2验证通过 3验证不通过
          }
          ...
        }




  opt 配置
OK    url(str): 表单提交地址
OK    params(data): 表单固定提交参数
      data格式:
        {
          key:value   //key是提交的key值  value为提交的实际值 可以是obj
          key2:value
        }
OK    commitFilter(fn(opts(dataArr))): 提交数据过滤方法,返回false停止提交,返回json,追加到提交内容中
      dataArr格式:
        [{
          $ele:$ele   //表单JQ节点对象
          name:name   //表单name值
          value:value //表单数据
        }]
OK    validateFiles(array[obj]): 表单验证规则,不定义则没验证
      格式:
        [{
          identifier:'dropTree',//验证name 需与表单的name相同
          rules: [
            {type: 'empty', prompt: '必填'} //验证规则  具体可见 semantic Api http://www.semantic-ui.cn/behaviors/form.html
          ]
        }]
NO    disableInputs(array[str]):屏蔽表单填写,根据表单name名称
OK    defaultValues(array[data]):设置表单默认值,不包含下拉框
      data格式:
        [{
          name:'123',       //表单name
          value:'5555'      //表单值
        }]
    onValidate(fn(opts(data,dataAll))): 表单验证前回调 data为提交的全部数据 dataAll 表单元素节点对象
      data格式:
        {
          key1:val1,
          key2:val2,
          key3:val3
          ...
        }
      dataAll格式:
        {
          name:{
            $ele:$ele   //表单JQ节点对象
            name:name   //表单name值
            value:value //表单数据
            state:state //状态 1启用 2禁用 3隐藏
            vali:vali //验证状态 1未验证 2验证通过 3验证不通过
          }
          ...
        }
OK    onInitForm(fn(opts(dataAll))):初始化表单结束
    onValSuccess(fn(opts(data,dataAll))): 表单验证成功 data为提交的全部数据 dataAll 表单元素节点对象 格式见onValidate
    onValFail(fn(opts(data,dataAll,dataFailAll))): 表单验证失败 data为提交的全部数据  dataAll 表单元素节点对象 dataFailAll 为错误数据对象 格式见onValidate
    onCommit(fn(opts(data,dataAll))):表单提交后回调事件 data为提交的全部数据  dataAll 表单元素节点对象 格式见onValidate
    onComSuccess(fn(opts(comData,dataAll,resData))):表单提交返回成功后回调事件 comData 提交数据对象, dataAll 表单元素节点对象 ,resData 返回数据 格式见onValidate
    onComFail(fn(opts(comData,dataAll,resData))):表单提交返回失败后回调事件 comData 提交数据对象, dataAll 表单元素节点对象, resData 返回数据 格式见onValidate
    onComError(fn(opts(comData,dataAll,resData))):表单提交异常后回调事件 comData 提交数据对象, dataAll 表单元素节点对象,resData 返回数据 格式见onValidate
    onComFinally(fn(opts(comdata,dataAll))):表单提交后任何响应完成后都会回调的事件 comdata 提交数据对象, dataAll 表单元素节点对象 格式见onValidate
    onClearForm(fn(opts(data,dataAll))):表单清空时回调事件 data 提交数据对象,dataAll 表单元素节点对象 格式见onValidate


  fn  eg: obj.getRow({index:1}) 或 $**.fromTool("getRow",{index:1})
    setUrl(url): 设置表单提交地址
    setParams(data):设置表单固定提交参数
    setCommitFileter(fn(dataArr)):设置提交数据过滤方法,返回false停止提交,返回json,追加到提交内容中,dataArr为提交数据
    setValidateFiles(dataArr):设置表单验证规则
      dataArr格式:
        [{
          identifier:'dropTree',//验证name 需与表单的name相同
          rules: [
            {type: 'empty', prompt: '必填'} //验证规则  具体可见 semantic Api http://www.semantic-ui.cn/behaviors/form.html
          ]
        }]
    setDisable(ele,name):设置屏蔽表单项目,ele(jquery对象)和name(名称)选填,都不填,则整个表单都屏蔽不可编辑
    setEnable(ele,name):设置启用表单项目,ele(jquery对象)和name(名称)选填,都不填,则整个表单都屏蔽不可编辑
    setDefValue(dataArr):设置表单默认值
      dataArr格式:
        [{
          $ele:$ele   //表单JQ节点对象   $ele和 name可以二选一填写
          name:name   //表单name值
          value:value //表单数据
        }]
    validateForm():验证表单合法性
    commitForm(data):提交表单信息,data是追加上的参数,非必须
    getFormEle():获取表单jq对象
    getFormNodeEle(name):获取表单元素对象 name不传则返回全部表单对象数组
    setNodeData(obj(name,value)/objArr[obj[name,value]]):设置表单元素值
    getFormData():获取表单填写数据集合
      返回类型格式:
        [{
          $ele:$ele   //表单JQ节点对象
          name:name   //表单name值
          value:value //表单数据
        }]
    getCommitData():获取全部提交数据
        返回类型格式:
        [{
          $ele:$ele   //表单JQ节点对象  可能为空
          name:name   //表单name值
          value:value //表单数据
        }]
    setHideData(data):设置隐藏值  隐藏值会连同commit 一并提交到后端
    getHideData():获取隐藏值
    clearHideData():清空隐藏值  节点添加 noClear='true'属性的节点将不会被清除
    clearForm():清空表单信息

  event 事件
    onValidate(fn(opts(data,dataAll))): 表单验证前回调 data为提交的全部数据 dataAll 表单元素节点对象
    onValSuccess(fn(opts(data,dataAll))): 表单验证成功 data为提交的全部数据 dataAll 表单元素节点对象 格式见onValidate
    onValFail(fn(opts(data,dataAll,dataFailAll))): 表单验证失败 data为提交的全部数据  dataAll 表单元素节点对象 dataFailAll 为错误数据对象 格式见onValidate
    onCommit(fn(opts(data,dataAll))):表单提交回调事件 data为提交的全部数据  dataAll 表单元素节点对象 格式见onValidate
    onComSuccess(fn(opts(comData,dataAll,resData))):表单提交返回成功后回调事件 comData 提交数据对象, dataAll 表单元素节点对象 ,resData 返回数据 格式见onValidate
    onComFail(fn(opts(comData,dataAll,resData))):表单提交返回失败后回调事件 comData 提交数据对象, dataAll 表单元素节点对象, resData 返回数据 格式见onValidate
    onComError(fn(opts(comData,dataAll,resData))):表单提交异常后回调事件 comData 提交数据对象, dataAll 表单元素节点对象,resData 返回数据 格式见onValidate
    onComFinally(fn(opts(comdata,dataAll))):表单提交后任何响应完成后都会回调的事件 comdata 提交数据对象, dataAll 表单元素节点对象 格式见onValidate
    onClearForm(fn(opts(data,dataAll))):表单清空时回调时间 data 提交数据对象,dataAll 表单元素节点对象 格式见onValidate
 */
var fromTool,
  slice = [].slice;

fromTool = (function() {
  function fromTool() {
    var $ele, opts, others;
    $ele = arguments[0], opts = arguments[1], others = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    this.$ele = $ele;
    this.defaults = {
      hidaData: null
    };
    this.opt = $.extend({}, this.defaults, $.fn.fromTool.opts, opts);
    this.initForm();
  }


  /*
    执行路由
    opts
   */

  fromTool.prototype.perform = function() {
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
    初始化表单结构
    opts
   */

  fromTool.prototype.initForm = function() {
    var $input, $inputNodes, base, data, defVal, defaultValues, fields, i, j, k, len, len1, len2, name, valiFiles, valiName, valifile, value;
    $inputNodes = this.$ele.find("[name]");
    this.dataAll = new Object();
    for (i = 0, len = $inputNodes.length; i < len; i++) {
      $input = $inputNodes[i];
      name = $input.attr("name");
      value = $input.val();
      data = {
        $ele: $input,
        name: name,
        value: value
      };
      this.dataAll[name] = data;
    }
    valiFiles = this.opt.validateFiles;
    if (valiFiles) {
      fields = new Object();
      for (j = 0, len1 = valiFiles.length; j < len1; j++) {
        valifile = valiFiles[j];
        valiName = valifile.identifier;
        fields[valiName] = valifile;
      }
      this.$ele.form({
        fields: fields,
        inline: true,
        on: 'blur'
      });
    }
    defaultValues = this.opt.defaultValues;
    if (defaultValues) {
      for (k = 0, len2 = defaultValues.length; k < len2; k++) {
        defVal = defaultValues[k];
        name = defVal.name;
        value = defVal.value;
        data = this.dataAll[name];
        data.value = value;
        data.$ele.val(value);
        this.dataAll[name] = data;
      }
    }
    return typeof (base = this.opt).onInitForm === "function" ? base.onInitForm({
      dataAll: this.dataAll
    }) : void 0;
  };


  /*
    提交应用程序
    opts
   */

  fromTool.prototype.commit = function(opts) {
    var base, formParams, jsonTool, query;
    formParams = this.$ele.serializeArray();
    query = $.extend(formParams, this.opt.params);
    this.loaderQuery = typeof (base = this.opt).commitFilter === "function" ? base.commitFilter({
      query: query
    }) : void 0;
    return jsonTool = $.jsonTool('ajax', {
      url: this.opt.url,
      data: $.extend(query, this.loaderQuery),
      onSuccess: (function(_this) {
        return function(data) {};
      })(this),
      onError: (function(_this) {
        return function(err) {};
      })(this)
    });
  };


  /*
    表单验证前回调 data为提交的全部数据 dataAll 表单元素节点对象
    opts
   */

  fromTool.prototype.onValidate = function(opts) {
    return this.opt.onValidate = opts;
  };


  /*
    表单验证成功 data为提交的全部数据 dataAll 表单元素节点对象 格式见onValidate
    opts
   */

  fromTool.prototype.onValSuccess = function(opts) {
    return this.opt.onValSuccess = opts;
  };


  /*
    表单验证失败 data为提交的全部数据  dataAll 表单元素节点对象 dataFailAll 为错误数据对象 格式见onValidate
    opts
   */

  fromTool.prototype.onValFail = function(opts) {
    return this.opt.onValFail = opts;
  };


  /*
    表单提交回调事件 data为提交的全部数据  dataAll 表单元素节点对象 格式见onValidate
    opts
   */

  fromTool.prototype.onCommit = function(opts) {
    return this.opt.onCommit = opts;
  };


  /*
    表单提交返回成功后回调事件 comData 提交数据对象, dataAll 表单元素节点对象 ,resData 返回数据 格式见onValidate
    opts
   */

  fromTool.prototype.onComSuccess = function(opts) {
    return this.opt.onComSuccess = opts;
  };


  /*
    表单提交返回失败后回调事件 comData 提交数据对象, dataAll 表单元素节点对象, resData 返回数据 格式见onValidate
    opts
   */

  fromTool.prototype.onComFail = function(opts) {
    return this.opt.onComFail = opts;
  };


  /*
    表单提交异常后回调事件 comData 提交数据对象, dataAll 表单元素节点对象,resData 返回数据 格式见onValidate
    opts
   */

  fromTool.prototype.onComError = function(opts) {
    return this.opt.onComError = opts;
  };


  /*
    表单提交后任何响应完成后都会回调的事件 comdata 提交数据对象, dataAll 表单元素节点对象 格式见onValidate
    opts
   */

  fromTool.prototype.onComFinally = function(opts) {
    return this.opt.onComFinally = opts;
  };


  /*
    表单清空时回调时间 data 提交数据对象,dataAll 表单元素节点对象 格式见onValidate
    opts
   */

  fromTool.prototype.onClearForm = function(opts) {
    return this.opt.onClearForm = opts;
  };

  return fromTool;

})();

(function() {
  $.fn.fromTool = function() {
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
      })(fromTool, [this, opts].concat(slice.call(others)), function(){});
      this.data("obj", obj);
    }
    return obj;
  };
  return $.fn.fromTool.opts = {};
})();

//# sourceMappingURL=formTool.js.map
