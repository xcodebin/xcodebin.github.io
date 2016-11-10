
/*
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
 */
var jsonTool,
  slice = [].slice;

jsonTool = (function() {
  function jsonTool() {
    var opts1, others1;
    opts1 = arguments[0], others1 = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    this.opts = opts1;
    this.others = others1;
    switch (this.opts) {
      case 'ajax':
        this.ajax(this.others[0]);
    }
  }

  jsonTool.prototype.ajax = function(opts) {
    var data, onError, onSuccess, type, url;
    type = opts.type, url = opts.url, data = opts.data, onSuccess = opts.onSuccess, onError = opts.onError;
    if (!url) {
      return this;
    }
    if (type == null) {
      type = 'post';
    }
    return this.xhr = $.ajax({
      async: true,
      type: type,
      url: url,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: 'application/json;charset=utf-8',
      success: function(data) {
        return typeof onSuccess === "function" ? onSuccess(data) : void 0;
      },
      error: function(res) {
        return typeof onError === "function" ? onError(res) : void 0;
      }
    });
  };

  return jsonTool;

})();

(function() {
  $.jsonTool = function() {
    var opts, others;
    opts = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(jsonTool, [opts].concat(slice.call(others)), function(){});
  };
  return $.jsonTool.opts = {};
})();

//# sourceMappingURL=jsonTool.js.map
