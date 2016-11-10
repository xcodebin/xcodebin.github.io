# About: 提示框插件
# Other:
# Created: Xiaolong WU on 16/7/2 上午10:01.
# Editored:
# TODO:
###

Api:
  attr 属性 可以console.log打印下即可知道对象属性和方法
    $ele 弹窗对象jq节点对象


  opt 配置
    title(str) 标题 未声明则没标题
    content(str) 内容  没声明则没内容
    text(str) 按钮文字  没什么则没按钮
    ~type(str) 弹窗类型  def:"error"错误提示  "warn" 警告提示  "success" 成功提示  "info" 信息提示
    show(bool) 是否展示 def:false 初始化不展示  true 展示
    autoClose(num) 自动关闭 def:0 非自动关闭   数值为具体自定义毫秒数后自动关闭
    ~shadow(bool) 是否显示背景阴影 def:true 显示  false 不显示
    outSideClose(bool) 弹窗外围点击是否可关闭  def:true 可关闭   false 不可关闭
    closeIco(bool) 右上角关闭按钮 是否启用 def:true 启用  false 不启用隐藏
    onAgree(fn(ele)) 确认事件回调 ele:当前插件对象
    onClose(fn(ele)) 关闭事件回调 ele:当前插件对象

  fn
    show 展示弹窗
    close 关闭弹窗
    loading 正在处理，按钮为loading状态
    showMsg(type:str,msg:str,close:num) 展示信息 type类型:"success"成功 "fail"失败  msg提示信息 def:0 不会自动关闭  >0为毫秒自动关闭

  event 事件
    onAgree(fn(ele)) 确认事件回调
    onClose(fn(ele)) 关闭事件回调



###

class alert
  constructor:(opts,others...)->
    @defaults= # 默认参数
      type:"error" # 弹窗类型  def:"error"错误提示  "warn" 警告提示  "success" 成功提示  "info" 信息提示
      show:false # 是否展示 def:false 初始化不展示  true 展示
      autoClose:0 # 自动关闭 def:0 非自动关闭   数值为具体自定义毫秒数后自动关闭
      shadow:true # 是否显示背景阴影 def:true 显示  false 不显示
      outSideClose:true # 弹窗外围点击是否可关闭  def:false 不可关闭   true 可关闭
      closeIco:true # 右上角关闭按钮 是否启用 def:true 启用  false 不启用隐藏
      allowMultiple: false # 是否允许多重弹窗 def:false 不允许  true 允许

    @opt = $.extend({}, @defaults, $.alert.opts, opts)
    @creatAlert()
    @eventAlert()


  ###
    创建弹窗结构
    opts
  ###
  creatAlert:->
    #todo 样式
    headHtml=''
    headHtml="""<div class="header">#{@opt.title}</div>""" if @opt.title
    contentHtml=''
    contentHtml="""<div class="content">#{@opt.content}</div>""" if  @opt.content
    switch @opt.type
      when 'error'
        type = 'red basic'
      when 'warn'
        type = 'red'
      when 'success'
        type = 'teal basic'
      when 'info'
        type = 'teal'
    buttonHtml="""<button ids='alertBut' type="button" class="ui button basic">确定</button>"""
    buttonHtml ="""<button ids='alertBut' type="button" class="ui button #{type}">#{@opt.text}</button>""" if @opt.text
    closeHtml = ''
    closeHtml = """<i class="close icon black"></i>""" if @opt.closeIco
    html = """
            <div class="ui small modal the-modal">
              #{closeHtml}
              #{headHtml}
              #{contentHtml}
              <div class="actions">#{buttonHtml}</div>
            </div>'
           """
    @$ele = $(html).appendTo($('body'))
    @show() if @opt.show is true
    @$ele.modal(
      onHide:=>@opt.onClose?(ele:@$ele) # 关闭事件回调
      onHidden:=>@$ele.remove() # 关闭删除节点
    )



  ###
    弹窗事件注册
    opts
  ###
  eventAlert:->
    @$btu = @$ele.find("[ids='alertBut']")
    @$btu.off('click').on 'click',(e)=>
      t = $(e.currentTarget)
      clo = t.attr("close")
      if clo is "close" #仅是关闭
        @close()
      else # 进行确认点击
        # todo 需要添加执行动画特效
        @opt.onAgree?(ele:@$ele) # 确认事件回调 e:当前插件对象



  ###
    关闭弹窗 删除结构
    opts
  ###
  close:(opts)->
    @$ele.modal(
      onHide:=>@opt.onClose?(ele:@$ele) # 关闭事件回调
      onHidden:=>@$ele.remove() # 关闭删除节点
    )
    @$ele.modal('hide')

  ###
    展示弹窗
    opts
  ###
  show:(opts)->
    @$ele.modal({allowMultiple: @opt.allowMultiple}) if @opt.allowMultiple is true
    @$ele.modal({closable: false}) if @opt.outSideClose is false
    @$ele.modal('show')
    if @opt.autoClose >0
      setTimeout(=>
        @close()
      ,@opt.autoClose )

  loading:(opts)->
    @$btu.addClass('loading disabled')

  ###
    展示提示信息
    opts
      type(str)  展示类型 def:"success"成功 "fail"失败
      msg(str)  msg提示信息
      close(num) def:0 不会自动关闭  >0为毫秒自动关闭
  ###
  showMsg:(opts)->
    {type,msg,close}=opts
    type ?="success" # 设置默认值
    close ?=0 # 设置默认值
    @$btu.removeClass('loading disabled')

    switch type
      when "success"
        @$btu.addClass('teal basic').removeClass('red')
        @$btu.text(msg)
        @$btu.attr("close","close")
        #todo 需要判断格式,展示信息,如有按钮如何展示,没按钮如何展示.
        #todo 此时的按钮等同于关闭,已经不再会发起,确定/取消事件了,仅会发起关闭事件 下同
        console.log "一个成功的效果"
      when "fail"
        @$btu.addClass('red basic').removeClass('teal')
        @$btu.text(msg)
        @$btu.attr("close","close")
        #todo 同上完成这块的样式切换
        console.log "一个失败的结果"
    if close >0
      setTimeout(=>
        @close()
      ,close )

  ###
    确认事件回调
    opts
  ###
  onAgree:(opts)->
    @opt.onAgree=opts

  ###
    关闭事件回调
    opts
  ###
  onClose:(opts)->
    @opt.onClose=opts




(->
  $.alert = (opts,others...)->
    new alert(opts,others...)

  # 表格全局参数
  $.alert.opts ={}
)()


