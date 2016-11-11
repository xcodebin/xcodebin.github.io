# alert.js消息提示框

## Api:
  attr 属性 可以console.log打印下即可知道对象属性和方法
    $ele 弹窗对象jq节点对象


 ** opt 配置**
    title(str) 标题 未声明则没标题
    content(str) 内容  没声明则没内容
    text(str) 按钮文字  没什么则没按钮
    type(str) 弹窗类型  def:"error"错误提示  "warn" 警告提示  "success" 成功提示  "info" 信息提示
    show(bool) 是否展示 def:false 初始化不展示  true 展示
    autoClose(num) 自动关闭 def:0 非自动关闭   数值为具体自定义毫秒数后自动关闭
    ~shadow(bool) 是否显示背景阴影 def:true 显示  false 不显示
    outSideClose(bool) 弹窗外围点击是否可关闭  def:true 可关闭   false 不可关闭
    closeIco(bool) 右上角关闭按钮 是否启用 def:true 启用  false 不启用隐藏
    onAgree(fn(ele)) 确认事件回调 ele:当前插件对象
    onClose(fn(ele)) 关闭事件回调 ele:当前插件对象

  **fn**
    show 展示弹窗
    close 关闭弹窗
    loading 正在处理，按钮为loading状态
    showMsg(type:str,msg:str,close:num) 展示信息 type类型:"success"成功 "fail"失败  msg提示信息 def:0 不会自动关闭  >0为毫秒自动关闭

 ** event 事件**
    onAgree(fn(ele)) 确认事件回调
    onClose(fn(ele)) 关闭事件回调
