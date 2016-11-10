# About: json插件
# Other:
# Created: Xiaolong WU on 16/4/15 下午10:14.
# Editored:
# VersionHistory:
#   V16.04.15-01  初始化构造 bug难以避免
# Dependencies:
#   jquery  ^2.2.2
#   JSON-js
###
  $.jsonTool() json插件
  $.fn.jsonTool.opts 全局参数设置

  opts 配置
    ajax(obj): ajax请求方法
        type(str): 请求方式 post post方式请求  get get请求
        url(str): 请求url
        data(obj/str):以json格式发送的对象或字符串
        onSuccess(fn(data)):成功回调方法
        onError(fn(err)):失败回调方法

  fn 方法
    ajax(obj): ajax请求
      type(str): 请求方式 post post方式请求  get get请求
      url(str): 请求url
      data(obj/str):以json格式发送的对象或字符串
      onSuccess(fn(data)):成功回调方法
      onError(fn(err)):失败回调方法

  event 事件


###




class jsonTool
  constructor:(@opts,@others...)->
    switch @opts
      when 'ajax' then @ajax(@others[0])


  ajax:(opts)->
    {type,url,data,onSuccess,onError}=opts
    return @ if !url
    type ?= 'post'
    @xhr = $.ajax(
      async:true
      type: type
      url: url
      data: JSON.stringify(data)
      dataType:"json"
      contentType : 'application/json;charset=utf-8'
      success:(data)->onSuccess?(data)
      error: (res)->onError?(res)
    )


    
(->
  $.jsonTool = (opts,others...)->
    new jsonTool(opts,others...)

  # 表格全局参数
  $.jsonTool.opts ={}
)()