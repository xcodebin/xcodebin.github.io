
/*

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
 */
var alert,
  slice = [].slice;

alert = (function() {
  function alert() {
    var opts, others;
    opts = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    this.defaults = {
      type: "error",
      show: false,
      autoClose: 0,
      shadow: true,
      outSideClose: true,
      closeIco: true,
      allowMultiple: false
    };
    this.opt = $.extend({}, this.defaults, $.alert.opts, opts);
    this.creatAlert();
    this.eventAlert();
  }


  /*
    创建弹窗结构
    opts
   */

  alert.prototype.creatAlert = function() {
    var buttonHtml, closeHtml, contentHtml, headHtml, html, type;
    headHtml = '';
    if (this.opt.title) {
      headHtml = "<div class=\"header\">" + this.opt.title + "</div>";
    }
    contentHtml = '';
    if (this.opt.content) {
      contentHtml = "<div class=\"content\">" + this.opt.content + "</div>";
    }
    switch (this.opt.type) {
      case 'error':
        type = 'red basic';
        break;
      case 'warn':
        type = 'red';
        break;
      case 'success':
        type = 'teal basic';
        break;
      case 'info':
        type = 'teal';
    }
    buttonHtml = "<button ids='alertBut' type=\"button\" class=\"ui button basic\">确定</button>";
    if (this.opt.text) {
      buttonHtml = "<button ids='alertBut' type=\"button\" class=\"ui button " + type + "\">" + this.opt.text + "</button>";
    }
    closeHtml = '';
    if (this.opt.closeIco) {
      closeHtml = "<i class=\"close icon black\"></i>";
    }
    html = "<div class=\"ui small modal the-modal\">\n  " + closeHtml + "\n  " + headHtml + "\n  " + contentHtml + "\n  <div class=\"actions\">" + buttonHtml + "</div>\n</div>'";
    this.$ele = $(html).appendTo($('body'));
    if (this.opt.show === true) {
      this.show();
    }
    return this.$ele.modal({
      onHide: (function(_this) {
        return function() {
          var base;
          return typeof (base = _this.opt).onClose === "function" ? base.onClose({
            ele: _this.$ele
          }) : void 0;
        };
      })(this),
      onHidden: (function(_this) {
        return function() {
          return _this.$ele.remove();
        };
      })(this)
    });
  };


  /*
    弹窗事件注册
    opts
   */

  alert.prototype.eventAlert = function() {
    this.$btu = this.$ele.find("[ids='alertBut']");
    return this.$btu.off('click').on('click', (function(_this) {
      return function(e) {
        var base, clo, t;
        t = $(e.currentTarget);
        clo = t.attr("close");
        if (clo === "close") {
          return _this.close();
        } else {
          return typeof (base = _this.opt).onAgree === "function" ? base.onAgree({
            ele: _this.$ele
          }) : void 0;
        }
      };
    })(this));
  };


  /*
    关闭弹窗 删除结构
    opts
   */

  alert.prototype.close = function(opts) {
    this.$ele.modal({
      onHide: (function(_this) {
        return function() {
          var base;
          return typeof (base = _this.opt).onClose === "function" ? base.onClose({
            ele: _this.$ele
          }) : void 0;
        };
      })(this),
      onHidden: (function(_this) {
        return function() {
          return _this.$ele.remove();
        };
      })(this)
    });
    return this.$ele.modal('hide');
  };


  /*
    展示弹窗
    opts
   */

  alert.prototype.show = function(opts) {
    if (this.opt.allowMultiple === true) {
      this.$ele.modal({
        allowMultiple: this.opt.allowMultiple
      });
    }
    if (this.opt.outSideClose === false) {
      this.$ele.modal({
        closable: false
      });
    }
    this.$ele.modal('show');
    if (this.opt.autoClose > 0) {
      return setTimeout((function(_this) {
        return function() {
          return _this.close();
        };
      })(this), this.opt.autoClose);
    }
  };

  alert.prototype.loading = function(opts) {
    return this.$btu.addClass('loading disabled');
  };


  /*
    展示提示信息
    opts
      type(str)  展示类型 def:"success"成功 "fail"失败
      msg(str)  msg提示信息
      close(num) def:0 不会自动关闭  >0为毫秒自动关闭
   */

  alert.prototype.showMsg = function(opts) {
    var close, msg, type;
    type = opts.type, msg = opts.msg, close = opts.close;
    if (type == null) {
      type = "success";
    }
    if (close == null) {
      close = 0;
    }
    this.$btu.removeClass('loading disabled');
    switch (type) {
      case "success":
        this.$btu.addClass('teal basic').removeClass('red');
        this.$btu.text(msg);
        this.$btu.attr("close", "close");
        console.log("一个成功的效果");
        break;
      case "fail":
        this.$btu.addClass('red basic').removeClass('teal');
        this.$btu.text(msg);
        this.$btu.attr("close", "close");
        console.log("一个失败的结果");
    }
    if (close > 0) {
      return setTimeout((function(_this) {
        return function() {
          return _this.close();
        };
      })(this), close);
    }
  };


  /*
    确认事件回调
    opts
   */

  alert.prototype.onAgree = function(opts) {
    return this.opt.onAgree = opts;
  };


  /*
    关闭事件回调
    opts
   */

  alert.prototype.onClose = function(opts) {
    return this.opt.onClose = opts;
  };

  return alert;

})();

(function() {
  $.alert = function() {
    var opts, others;
    opts = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(alert, [opts].concat(slice.call(others)), function(){});
  };
  return $.alert.opts = {};
})();

//# sourceMappingURL=alert.js.map
