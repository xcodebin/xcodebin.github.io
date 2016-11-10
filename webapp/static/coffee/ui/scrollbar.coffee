# About: 滚动条工具
# Other:
# Created: Xiaolong WU on 16/4/4 上午11:24.
# Editored:
# Dependencies:
#   malihu-custom-scrollbar-plugin: ^3.1.3
###
Api:
  $.scrollbar() 初始化滚动条
  $.fn.scrollbar.opts 全局参数设置

  attr
    $scrollbar 滚动条对象

  opts 配置 可使用 malihu 官网配置进行覆盖
     theme(str) : 主题色 def:dark  eg: $.scrollbar({theme:'dark-3'}) 可选值可查 malihu 插件
     scrollbarPosition(str): 外嵌方式 def:outside  eg:$.scrollbar({scrollbarPosition:'outside'}) 可选值可查 malihu 插件


  fn 方法


  event 事件

###

class scrollbar
  constructor:(@ele,opts,@others...)->
    @defaults= # 默认参数
      axis:"y" # 垂直滚动条
      theme:'dark' #黑色主题
      scrollInertia:400 # 缓慢停止时常
      autoDraggerLength: true # 不固定滚动条长度
      autoHideScrollbar: true # 是否自动隐藏滚动条
      scrollbarPosition:'outside' #外嵌方式
      mouseWheelPixels:100 # 鼠标滚轮默认一次滚动像素
      mouseWheel:{ scrollAmount: 100} #一次滚动的量 一次滚动的数量
      advanced:{autoScrollOnFocus: false} # 关闭光标焦点滚轴自动定位功能

    @opts = $.extend({}, @defaults,$.fn.scrollbar.opts, opts)

    @init() if !opts or _.isObject opts


  ###
    初始化滚动条
    opts 详细配置对象
  ###
  init:->
    @$scrollbar = @ele.mCustomScrollbar(@opts)



(->
  $.fn.scrollbar = (opts,others...)->
    new scrollbar(this,opts,others...)

  # 表格全局参数
  $.fn.scrollbar.opts ={}
)()

