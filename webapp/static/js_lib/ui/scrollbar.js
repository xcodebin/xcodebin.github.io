
/*
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
 */
var scrollbar,
  slice = [].slice;

scrollbar = (function() {
  function scrollbar() {
    var ele, opts, others1;
    ele = arguments[0], opts = arguments[1], others1 = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    this.ele = ele;
    this.others = others1;
    this.defaults = {
      axis: "y",
      theme: 'dark',
      scrollInertia: 400,
      autoDraggerLength: true,
      autoHideScrollbar: true,
      scrollbarPosition: 'outside',
      mouseWheelPixels: 100,
      mouseWheel: {
        scrollAmount: 100
      },
      advanced: {
        autoScrollOnFocus: false
      }
    };
    this.opts = $.extend({}, this.defaults, $.fn.scrollbar.opts, opts);
    if (!opts || _.isObject(opts)) {
      this.init();
    }
  }


  /*
    初始化滚动条
    opts 详细配置对象
   */

  scrollbar.prototype.init = function() {
    return this.$scrollbar = this.ele.mCustomScrollbar(this.opts);
  };

  return scrollbar;

})();

(function() {
  $.fn.scrollbar = function() {
    var opts, others;
    opts = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(scrollbar, [this, opts].concat(slice.call(others)), function(){});
  };
  return $.fn.scrollbar.opts = {};
})();

//# sourceMappingURL=scrollbar.js.map
