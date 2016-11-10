/**
 * About:开发者门户主页
 * Other:
 * Created:
 * Editored: huangjj
 */

var index;

index = (function() {

  function index() {
  }

  /*
   初始化
   opts
   */
  index.prototype.init = function() {

    this.carousel();
    this.loadOsWrapp();
    this.loadInformApi();
    this.loadInformApiTool();
    this.toRegister(); //注册
    return this.event();
  };


  /*
   事件
   opts
   */
  index.prototype.event = function() {
    var $devRegister = $("#dev_register");
    var $spRegister = $("#sp_register");
    var $apiViewMore = $("#apiViewMore");
    var $softViewMore = $("#softViewMore");

    //开发者注册
    $devRegister.off('click').bind('click', function() {
      window.location.href="dev/devRegister";
    });
    //服务商注册
    $spRegister.off('click').bind('click', function() {
      window.location.href="dev/spRegister";
    });
    //开发资料查看更多
    $apiViewMore.off('click').bind('click', function() {
      window.location.href="api";
    });
    //软件工具查看更多
    $softViewMore.off('click').bind('click', function() {
      window.location.href="soft";
    });
  };



  // 轮播
  index.prototype.carousel = function(opts) {
    var $carousel;
    $carousel = $('.carousel');
    $carousel.empty();
    //图片数据初始化
    $.ajax({
      type: "POST",
      url: "basicconfi/selectBasicconfiByBacNO",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data:JSON.stringify({'bacNO':'5001'}),
      success: function (obj) {
        if (obj.state == 'success') {
          var prePath = obj.data.prePath;
          var imgs="";
          var imgObj=eval('(' + obj.data.config.bacSetVar + ')');
          $(imgObj.data).each(function (index, item) {//index指下标,item指代对应元素内容;
            imgs += '<div class="banner"><span><img onerror="window.ld_common.errorImage(this, \'banner\')" src="' + prePath + item.picPath.replace('\\', '/') + '" alt="" /></span></div>';
          });
          $carousel.prepend(imgs);
        }
        $('.carousel').slick({
          dots: true,
          infinite: true,
          speed: 500,
          fade: true,
          cssEase: 'linear',
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
      }
    });
  };

  //主面板四块链接
  index.prototype.loadOsWrapp=function(opts) {
    var $osWraps;
    $osWraps = $("#oswrap");
    $osWraps.empty();
    $.ajax({
      type: "POST",
      url: "basicconfi/selectBasicconfiByBacNO",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data:JSON.stringify({'bacNO':'5003'}),
      success: function (obj) {
        if (obj.state == 'success') {
          var prePath = obj.data.prePath;
          var wraps='';
          var wrapsObj=eval('(' + obj.data.config.bacSetVar + ')');
          ld_index.jsonSortByKey(wrapsObj.data,'seq');
          $(wrapsObj.data).each(function (index, item) {//index指下标,item指代对应元素内容;
            if(index==4){
              return;
            }else {
              wraps += '<li><p>' +
                  '<div class="os-move">' +
                  '<em class="os-listP os-listP1"><img onerror="window.ld_common.errorImage(this, \'emptyContent\')" src="' + prePath + item.picPath.replace('\\', '/') + '"></em>' +
                  '<p class="os-listC">' + item.text + '</p>' +
                  '</div></p></li>';
            }
          });
          $osWraps.prepend(wraps);
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
      }
    });
  };

  //注册
  index.prototype.toRegister = function(opts) {
    var $btn;
    $btn = $('[ids="registerBtn"]');
    var $modal = $('#registerModal');
    $btn.off('click').on('click', function(){
      $modal.modal({observeChanges: true, closable: false}).modal('show');
    });
  };

  //开发资料
  index.prototype.loadInformApi = function(){
    $("#informapiList").empty();
    $.ajax({
      type: "POST",
      url: "informapi/pageInformapi",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data:JSON.stringify({'page':'1','size':'10'}),
      success: function (obj) {
        if (obj.state == 'success') {
          var informLi="";
          $(obj.data).each(function (index, item) {//index指下标,item指代对应元素内容;
            informLi += '<li><a class="os-font l" id="'+item.inaId+'" ids="'+item.incId+'" href="javascript:;">'+item.inaName+'</a><span class="r">'+item.inaDate+'</span></li>';
          });
          $("#informapiList").prepend(informLi);
          //开发资料详情
          $($("#informapiList").find("a")).each(function(){
            var inaId=$(this).attr("id");
            var incId=$(this).attr("ids");
            $(this).off('click').on('click', function() {
              window.location.href="api?"+inaId+"&"+incId;
            });
          });
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
      }
    });
  };

  //软件工具
  index.prototype.loadInformApiTool = function(){
    $("#informapiListTool").empty();
    $.ajax({
      type: "POST",
      url: "informapi/pageInformapiTool",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data:JSON.stringify({'page':'1','size':'10'}),
      success: function (obj) {
        if (obj.state == 'success') {
          var informLi="";
          $(obj.data).each(function (index, item) {//index指下标,item指代对应元素内容;
            informLi += '<li><a class="os-font l" id="'+item.inaId+'" ids="'+item.incId+'" href="javascript:;">'+item.inaName+'</a><span class="r">'+item.inaDate+'</span></li>';
          });
          $("#informapiListTool").prepend(informLi);
          //软件工具详情
          $($("#informapiListTool").find("a")).each(function(){
            var inaId=$(this).attr("id");
            var incId=$(this).attr("ids");
            $(this).off('click').bind('click', function() {
              window.location.href="api?"+inaId+"&"+incId;
            });
          });
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
      }
    });
  };

  //json排序工具
  index.prototype.jsonSortByKey=function sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  };

  return index;

})();

$(function() {
  window.ld_index=new index();
  return ld_index.init();
});

//# sourceMappingURL=index.js.map
