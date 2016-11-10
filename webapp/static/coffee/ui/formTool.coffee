# About: 表单插件
# Other:
# Created: Xiaolong WU on 16/8/18 上午12:30.
# Editored:
# VersionHistory:
#   V16.08.18  初始化构造
#   jquery  ^2.2.2
#   semantic ^2.1.8
#   underscore  ^1.8.3
# TODO:

###
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


###


class fromTool

  constructor:(@$ele,opts,others...)->
    @defaults= # 默认参数
      hidaData:null # 隐藏数据对象

    @opt = $.extend({}, @defaults,$.fn.fromTool.opts, opts)

    @initForm()



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
    初始化表单结构
    opts
  ###
  initForm:->
    $inputNodes = @$ele.find("[name]")
    #构建表单数据
    @dataAll = new Object()
    for $input in $inputNodes
      name = $input.attr "name"  # 获取name值
      value = $input.val()  # 获取表单控件值
      data =
        $ele:$input
        name:name
        value:value
      @dataAll[name]=data

    # 验证器编写
    valiFiles = @opt.validateFiles
    if valiFiles
      fields = new Object()
      for valifile in valiFiles
        valiName = valifile.identifier
        fields[valiName] = valifile

      @$ele.form(
        fields:fields
        inline : true
        on:'blur'
      )

    # 设置默认值
    defaultValues = @opt.defaultValues
    if defaultValues
      for defVal in defaultValues
        name = defVal.name
        value = defVal.value
        data = @dataAll[name]
        data.value = value
        data.$ele.val(value)
        @dataAll[name] = data

    @opt.onInitForm?(dataAll:@dataAll)


  ###
    提交应用程序
    opts
  ###
  commit:(opts)->
    formParams = @$ele.serializeArray()
    query = $.extend(formParams,@opt.params)
    @loaderQuery = @opt.commitFilter?(query:query)


    jsonTool = $.jsonTool('ajax',{
      url:@opt.url
      data:$.extend(query,@loaderQuery)
      onSuccess:(data)=>
      onError:(err)=>
    })





  ###
    表单验证前回调 data为提交的全部数据 dataAll 表单元素节点对象
    opts
  ###
  onValidate:(opts)->
    @opt.onValidate = opts



  ###
    表单验证成功 data为提交的全部数据 dataAll 表单元素节点对象 格式见onValidate
    opts
  ###
  onValSuccess:(opts)->
    @opt.onValSuccess = opts



  ###
    表单验证失败 data为提交的全部数据  dataAll 表单元素节点对象 dataFailAll 为错误数据对象 格式见onValidate
    opts
  ###
  onValFail:(opts)->
    @opt.onValFail = opts


  ###
    表单提交回调事件 data为提交的全部数据  dataAll 表单元素节点对象 格式见onValidate
    opts
  ###
  onCommit:(opts)->
    @opt.onCommit = opts


  ###
    表单提交返回成功后回调事件 comData 提交数据对象, dataAll 表单元素节点对象 ,resData 返回数据 格式见onValidate
    opts
  ###
  onComSuccess:(opts)->
    @opt.onComSuccess = opts


  ###
    表单提交返回失败后回调事件 comData 提交数据对象, dataAll 表单元素节点对象, resData 返回数据 格式见onValidate
    opts
  ###
  onComFail:(opts)->
    @opt.onComFail = opts


  ###
    表单提交异常后回调事件 comData 提交数据对象, dataAll 表单元素节点对象,resData 返回数据 格式见onValidate
    opts
  ###
  onComError:(opts)->
    @opt.onComError = opts


  ###
    表单提交后任何响应完成后都会回调的事件 comdata 提交数据对象, dataAll 表单元素节点对象 格式见onValidate
    opts
  ###
  onComFinally:(opts)->
    @opt.onComFinally = opts


  ###
    表单清空时回调时间 data 提交数据对象,dataAll 表单元素节点对象 格式见onValidate
    opts
  ###
  onClearForm:(opts)->
    @opt.onClearForm = opts






(->
  $.fn.fromTool = (opts,others...)->
    obj = this.data("obj")
    if obj
      obj.perform(opts,others...)
    else
      obj = new fromTool(this,opts,others...)
      this.data("obj",obj)
    return obj

  # 表格全局参数
  $.fn.fromTool.opts ={}
)()