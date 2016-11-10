/**
 * Created by apple on 16/8/9.
 */
var common;

common = (function() {
    function common() {
        this.autoCloseTime = 2000;//alert 弹窗自动关闭时间
        this.autoClose =2000;
        this.timeOut = 10000; //请求超时
        this.setRoot = ""; //存储权限
        this.userId;
        this.urlFlag = 0;//0: weblogic上下文根包含/dev,否则不包含/dev
    }


    /*
     初始化
     opts
     */

    common.prototype.init = function() {
        $("body").scrollbar({
            autoHideScrollbar: false
        });
        $('[data-content]').popup();
        $('.menu .item').tab();
        $('.ui.dropdown').dropdown();

        //根据不同的页面路径生成不同的路径
        var pageHref = window.location.href;
        this.hrefPath = '';
        if(ld_common.urlFlag == 0){
            for( var i = 0; i < pageHref.split("http://")[1].split("/").length - 3 ; i++) {
                this.hrefPath += "../";
            };
            this.rootHrefPath = "http://" + window.location.host + "/dev/";
        }else{
            for( var i = 0; i < pageHref.split("http://")[1].split("/").length - 2 ; i++) {
                this.hrefPath += "../../";
            };
            this.rootHrefPath = "http://" + window.location.host + "/";
        }
        this.initPageHead();
        this.systemInforms();
        this.loadNoteNum();
        this.queryInfo();
        //下载企业信息模版
        $("#downloadMerTemplate").off('click').on('click', function() {
            window.location.href = ld_common.rootHrefPath+"dev/downloadComInfoFile ";
        });
    };
    common.prototype.queryInfo = function(){
        //每隔十分钟执行一次ld_common.loadNoteNum()方法
        window.setInterval("ld_common.loadNoteNum()",1000*60*10);
    };

    //页面头判断是否登录
    common.prototype.initPageHead = function(){
        var $alLogin=$("#alLogin");
        var $withOutLogin=$("#withOutLogin");
        var $registerBtn=$('[ids="registerBtn"]');
        var $loginStatus = $('[ids="loginStatus"]');
        var url = ld_common.hrefPath + "getSessionUser";
        $.ajax({
            async: true,
            type: "POST",
            url:  url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (obj) {
                if(obj.data!=null){
                    if( obj.data.auKey ){
                        ld_common.setRoot = obj.data.auKey; //存储权限
                    }
                    var usinUserName=obj.data.usinUserName;
                    if(usinUserName!=null) {
                        $alLogin.attr("style","display: inline-block;");
                        $withOutLogin.attr("style","display: none;");
                        $registerBtn.attr("style","display: none;");
                        $('[ids="usinLitHeadIco"]').attr("src", obj.data.usinHeadIcoPath);

                        //初始化用户名称
                        //$loginUserName.text(usinUserName);
                        ld_common.userId = obj.data.userId;
                        $loginStatus.off('click').on('click',function(){
                            window.location.href= ld_common.rootHrefPath + "personal/personalInfo?userId=" + ld_common.userId ;
                        });

                        //存储获取到的权限值,后面的页面需要根据这个值来看页面中的没人是否显示
                        var _common = window.ld_common;
                        _common.userRoot(obj);

                    }else{
                        $alLogin.attr("style","display: none;");
                        $withOutLogin.attr("style","display: inline-block;");
                        $registerBtn.attr("style","display: inline-block;");
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                window.location.href = ld_common.rootHrefPath + "mplogin";
            }
        });
    }

    /*
     *根据权限来限制页面的显示的dom
     *opts
     */
    common.prototype.userRoot = function(opts) {
        //opts.data.auKey= [
        //    //api ok
        //    "api_01",
        //    "api_01_001",
        //    //"api_01_002",
        //
        //    //ser
        //    "ser",
        //    "ser_01_001",
        //    "ser_01_002",
        //    "ser_01_003",
        //    "ser_01_004",
        //    "ser_01_005",
        //    "ser_01_007",
        //    "ser_01_008",
        //    "ser_01_009",
        //    "ser_01_010",
        //    "ser_01_011",
        //    "ser_02_001",
        //    "ser_02_002",
        //    "ser_02_003",
        //    "ser_02_004",
        //    "ser_02_005",
        //    "ser_03_001",
        //];
        //console.info('opts.data.auKey:'+opts.data.auKey);

        // //获取到权限的素组
        var setRoot = opts.data.auKey;
        ld_common.setRoot= opts.data.auKey;
        //带有权限的dom节点
        var rootDom = $('.role-hide');

        rootDom.each(function(index, elem) {
            //获取到权限值
            var rootDomValue =  $(elem).attr('data-root')?$(elem).attr('data-root').split("|"):[-1];
            //判断是否在后台传的数组中
            if( rootDomValue.length > 1 ) {
                //循环判断是否显示
                $( rootDomValue ).each( function(index2,item2){
                    if ($.inArray(item2, setRoot) !== -1) {
                        $(elem).removeClass('role-hide');
                        return false; //跳出 each循环 相当于break
                    }
                })
            }else {
                if ($.inArray(rootDomValue[0], setRoot) !== -1) {
                    //给dom对象删除class 来显示dom对象
                    $(elem).removeClass('role-hide');
                }
            }

        });


    };
    /*
     *判断用户是否有权限调用这个函数
     *opts
     *{str || arr} opts.key 执行当前事件所需要的权限值,可以是字符串或者数组
     */
    common.prototype.userEventRoot = function(opts,callback) {

        //不需要过滤权限，只要把这里打开即可,linfux
        //return true;

        //common.setRoot= [
        //    //api ok
        //    "api_01",
        //    "api_01_001",
        //    //"api_01_002",
        //
        //    //ser
        //    "ser",
        //    "ser_01_001",
        //    "ser_01_002",
        //    "ser_01_003",
        //    "ser_01_004",
        //    "ser_01_005",
        //    //"ser_01_007",
        //    "ser_01_008",
        //    "ser_01_009",
        //    "ser_01_010",
        //    "ser_01_011",
        //    "ser_02_001",
        //    "ser_02_002",
        //    "ser_02_003",
        //    "ser_02_004",
        //    "ser_02_005",
        //    "ser_03_001",
        //];

        var useRoot=function(opts,callback){
            console.info('ld_common.setRoot:'+ld_common.setRoot);

            // 判断有用户是否有传权限值,如果没有则默认没有权限执行
            if( opts && opts.key ) {
                //如果是数组就返回
                //1. 数组数组中的值必须是字符串
                //2. 如果是字符串就根据|分割成数组
                var key = $.isArray( opts.key )?opts.key :opts.key.split("|");
                // console.log("传值的类型是正确的进入下一步，验证是否在权限池中");
            }else {
                console.error('数据有无啊------------')
                return false;
            };
            //目前用户所拥有的权限值
            var setRoot = ld_common.setRoot;
            var state = 0; //多个值的时候
            //要是key的值大于一个的话
            console.log( setRoot )
            if( key.length > 1 ) {
                //循环判断是否执行
                $( key ).each( function(index2,item2){
                    if ($.inArray(item2, setRoot) !== -1) {
                        state = 1; //状态改为1
                        return false //跳出 each循环 相当于break
                    }
                })
                if( state ) {
                    return true
                }
            }else {
                if( $.inArray(key[0],setRoot) !== -1) {
                    // console.log(444);
                    return true;
                };
            };
            //如果用户没有这个权限的话就返回false
            if(callback) callback();
            return false;
        }

        if(!ld_common.setRoot||
            (typeof(ld_common.setRoot)=='array' && ld_common.setRoot.length==0)
        ){
            var url = ld_common.hrefPath + "getSessionUser";
            console.info('ajax request url:',url);
            $.ajax({
                async: true,
                type: "POST",
                url:  url,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (obj) {
                    console.info('ajax request success!url:',url);
                    if(obj.data!=null){
                        if( obj.data.auKey ){
                            ld_common.setRoot = obj.data.auKey; //存储权限
                        }
                        return useRoot(opts,callback);
                    }else{
                        console.info('req data is null');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.info('req error:'+thrownError);
                    window.location.href = ld_common.rootHrefPath + "mplogin";
                }
            });
        }else{
            console.info('ld_common.setRoot not null:'+ld_common.setRoot);
            return useRoot(opts,callback);
        }

    };
    /**
     *  img 加载失败后调用
     * @param obj
     * @param type
     */
    common.prototype.errorImage = function (obj, type) {
        var imgUrl = '';
        /**
         * 1.app:应用默认图片；
         * 2.banner:轮播图片
         * 3.header:头像；
         * 4.emptyContent:加载完成后为空内容；
         */
        switch (type){
            case 'app':
                imgUrl = ld_common.hrefPath + 'static/img/default/app.png';
                break;
            case 'banner':
                imgUrl = ld_common.hrefPath + 'static/img/default/banner1.jpg';
                break;
            case 'header':
                imgUrl = ld_common.hrefPath + 'static/img/default/matthew.png';
                break;
            case 'emptyContent':
                imgUrl = ld_common.hrefPath + 'static/img/default/no.png';
                break;
            case 'appH':
                imgUrl = ld_common.hrefPath + 'static/img/default/app-h.jpg';
                break;
            case 'resource':
                imgUrl = ld_common.hrefPath + 'static/img/default/resource.png';
                break;
            case 'modInfo':
                imgUrl = ld_common.hrefPath + 'static/img/default/modInfo.png';
                break;
        }
        $(obj).attr('src', imgUrl);
    };

    /**
     * 计算文本字数
     * @param opts
     */
    common.prototype.countText = function(opts) {
        var $area = opts.parents('label').siblings('textarea');
        $area.keyup(function(){
            opts.text($(this).val().length);
        });
    };

    // 计算文件大小
    common.prototype.countSize = function(opts) {
        if (typeof opts == 'undefined') return '未知';
        if (opts == 0) return '0 Byte';
        var k = 1024;
        var dm = 2;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        var i = Math.floor(Math.log(opts) / Math.log(k));
        opts = parseFloat((opts / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        return opts;
    };


    /*
     *编译tag的字符串
     *opts
     *例:
     *var _tags = $('[ids="appTag"]').dropdown('get value');
     *_tags = ld_common.tagStrCompile( { str: _tags } );
     */
    common.prototype.tagStrCompile = function(opts) {
        if( opts && opts.str ) {
            var str = opts.str; //获取字符串
            str = str.toString().replace(/\|/g, 'ASCII01111100');
            str = str.replace(/,/g, '|');
            return str;
        }

    };

    /*
     *反编译tag的字符串
     *opts
     *{string} opts.str: 后台传输过来的字符串
     *例:  var _tags = ld_common.tagStrDecompile({str: $app.data.appJson.appTag}) //编译标签代码
     */
    common.prototype.tagStrDecompile = function(opts) {
        if( opts && typeof opts.str == "string" ) {
            var $str =  opts.str.split('|'); //获取字符串
            $($str).each( function(index,item){
                $str[index] = item.toString().replace( /ASCII01111100/g, '|');
            })
            return $str;
        }else {
            var $str = opts.str; //获取字符串
            $($str).each( function(index,item){
                $str[index] = item.toString().replace( /ASCII01111100/g, '|');
            })
            return $str;
        }

    };

    /**
     *  文件上传
     *  @param opts
     *  opts = {
            url: 上传路径,
            $ele: 上传组件jquery对象(input样式一般为.upload-field，dimmer样式一般是.upload-image),
            type: 上传类型，类型为'image', 'excel', 'markdown',
            style: 样式，类型为'input'(输入框样式), 'dimmer'(图片遮罩样式)，默认'input'，
            formData: 入参,
            callback: {
                add: 添加文件的回调,
                fail: 失败的回调,
                done: 完成的回调
            }
        }
     *
     */
    common.prototype.upload = function(opts) {
        var url = opts.url;
        var type = opts.type;
        var formData = opts.formData || '';
        var style = opts.style || 'input';
        var callback = opts.callback;
        var $ele = opts.$ele;
        var $file = $ele.find('[ids="file"]');
        var $input = $ele.find('[ids="input"]');
        var $path = $ele.find('[ids="path"]');
        var $cancel = $ele.find('[ids="cancel"]');
        var $div = $ele.find('[ids="div"]');
        var $bar = $ele.find('[ids="bar"]');
        var $avatar = $ele.find('[ids="avatar"]');

        // 区分上传类型
        var range = [];
        var errorHint = '';
        switch (type) {
            case 'image':
                range = ['jpg', 'jpeg', 'png'];
                errorHint = '请上传jpg,png,jpeg';
                break;
            case 'excel':
                range = ['xls', 'xlsx'];
                errorHint = '请上传excel';
                break;
            case 'markdown':
                range = ['md'];
                errorHint = '请上传markdown';
                break;
        }

        // 还原上传样式
        if (style == 'input') {
            $div.show().removeClass('error');
            $input.val(null);
            $path.val(null);
            $cancel.hide();
            $bar.hide();
        }

        // 点击上传
        $div.off('click').on('click', function() {
            // 还原上传样式
            if (style == 'input') {
                $div.show().removeClass('error');
                $input.val(null);
                $path.val(null);
                $cancel.hide();
                $bar.hide();
            }
            $bar.find('.bar').css({
                'width': '0'
            });
            $bar.find('.percents').text('');

            $ele.find('[ids="file"]').trigger('click').fileupload({
                forceIframeTransport: true,
                url: url,
                formData: formData,
                dataType: 'json',
                add: function(e, data) {
                    if ($.inArray($(data.files[0].name.split('.')).last()[0], range) != -1 || range.length == 0) {
                        // 正确文件类型
                        data.submit();
                        $bar.addClass('active').removeClass('error success').show().css({
                            'width': '0%'
                        });
                        $bar.children('.label').show();
                        if (style == 'dimmer') {
                            // 图片遮罩样式
                            $ele.dimmer({
                                'closable': false,
                                'on': 'click'
                            }).dimmer('show');
                            $div.find('.header').hide();
                        } else {
                            // 输入框样式
                            $input.val(data.files[0].name);
                            $div.hide();
                            $cancel.show();
                            $cancel.off('click').on('click', function() {
                                data.submit().abort();
                                $div.show().removeClass('error');
                                $input.val('请重新选择');
                                $path.val(null);
                                $cancel.hide();
                                $bar.hide();
                            });
                        }
                        if (callback && callback.add) {
                            callback.add(data);
                        }
                    } else {
                        // 错误文件类型
                        if (style == 'dimmer') {
                            $ele.dimmer({
                                'closable': false,
                                'on': 'click'
                            }).dimmer('show');
                            $div.find('.header').hide();
                            $bar.show();
                            $bar.find('.label').text('请上传jpg,png,jpeg');
                            setTimeout(function() {
                                $bar.hide().siblings('.header').show();
                                $bar.find('.label').text('正在上传');
                                $ele.dimmer({
                                    'closable': true,
                                    'on': 'hover'
                                }).dimmer('hide');
                            }, ld_common.autoClose);
                        } else {
                            $div.addClass('error');
                            $input.val(errorHint);
                        }
                    }
                },
                fail: function(e, data) {
                    $bar.removeClass('active').addClass('error').children('.label').hide();
                    if (style == 'dimmer') {
                        // 图片遮罩样式
                        $ele.dimmer({
                            'closable': false,
                            'on': 'click'
                        }).dimmer('show');
                        $div.find('.header').hide();
                        $bar.show();
                        $bar.find('.label').text('上传失败');
                        setTimeout(function() {
                            $bar.hide().siblings('.header').show();
                            $bar.find('.label').text('正在上传');
                            $ele.dimmer({
                                'closable': true,
                                'on': 'hover'
                            }).dimmer('hide');
                        }, ld_common.autoClose);
                    } else {
                        // 输入框样式
                        $cancel.hide();
                        $div.addClass('error').show();
                        $input.val('数据异常，请重新选择');
                    }
                    if (callback && callback.fail) {
                        callback.fail(data);
                    }
                },
                progressall: function(e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $bar.find('.bar').css({
                        'width': progress + '%'
                    });
                    $bar.find('.percents').text(progress + '%');
                },
                done: function(e, data) {
                    if (style == 'dimmer') {
                        // 图片遮罩样式
                        if (data.result.state == 'success') {
                            $bar.removeClass('active').addClass('success');
                            $bar.find('.label').text('上传成功');
                            $avatar.attr('src', data.result.data);
                            if (callback && callback.done) {
                                callback.done(data);
                            }
                        } else {
                            $bar.removeClass('active').addClass('error');
                            $bar.find('.label').text('上传失败');
                        }
                        setTimeout(function() {
                            $bar.removeClass('success error').addClass('active').hide();
                            $bar.find('.label').text('正在上传');
                            $div.find('.header').show();
                            $ele.dimmer({
                                'closable': true,
                                'on': 'hover'
                            }).dimmer('hide');
                        }, ld_common.autoClose);
                        ld_common.resizeImage($avatar);
                    } else {
                        // 输入框样式
                        if (data.result.state == 'success') {
                            $bar.addClass('success').removeClass('active');
                            $bar.find('.percents').text(data.result.msg);
                            // 隐藏文本框传入文件路径
                            if (data.result.data && data.result.data.filePath) {
                                $path.val(data.result.data.filePath);
                            } else {
                                $path.val(data.result.data);
                            }
                            if (callback && callback.done) {
                                callback.done(data);
                            }
                        } else {
                            $bar.addClass('error').removeClass('active');
                            $bar.find('.percents').text(data.result.msg);
                        }
                    }
                }
            });
        });
    };



    /**
     *系统通知  system informs
     * */

    common.prototype.systemInforms = function(opts){
        var urlPath = window.location.pathname;
        var count = urlPath.match(/\//g).length;
        var ajaxUrl;
        if(ld_common.urlFlag == 0){
            if(count == 3){
                ajaxUrl = "../systemnotice/listSysNotice"
            };
            if(count == 2){
                ajaxUrl = "systemnotice/listSysNotice"
            };
        }else{
            if(count == 2){
                ajaxUrl = "../systemnotice/listSysNotice"
            };
            if(count == 1){
                ajaxUrl = "systemnotice/listSysNotice"
            };
        }

        $.ajax({
            type:"POST",
            url:ajaxUrl,
            data:JSON.stringify({}),
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            success:function(obj){
                if(obj.state == "success" && obj.data) {
                    var data=JSON.parse(obj.data);
                    ld_common.createInform(data);
                }else{
                    return;
                }

            },
            error: function () {
            }
        })
    };
    common.prototype.createInform = function(opts){
        var informTitle = opts.ssnNotTitle;
        var informContent = opts.ssnNotBody;
        var $fatherNode =$(".os-top");
        var html ='<div class="ui message system-Informs" id="systemInforms">';
        html = html+'<i class="close icon"></i>';
        html = html+'<p class="text">';
        html = html+'<marquee onmouseover="this.stop()" onmouseout="this.start()">';
        html = html+'<span ids="title">'+informTitle+' ： </span>';
        html = html+'<span ids="body">'+informContent+'</span>';
        html = html+'</marquee>';
        html = html+'</p>';
        html = html+'</div>';
        html = html+'<div class="ui modal small information" id="information">';
        html = html+'<i class="close icon black"></i>';
        html = html+'<div class="header" ids="headline">';
        html = html+'</div>';
        html = html+'<p ids="time"></p>';
        html = html+'<div class="content ui" ids="content">';
        html = html+'</div>';
        html = html+'</div>';
        $fatherNode.prepend(html);
        var $system=$("#systemInforms");
        $system.css("display","block");
        $system.find("p").off("click").on("click",function(){
            var $modal=$("#information");
            $modal.modal({
                onShow:function(){
                    $modal.find("[ids='headline']").text(opts.ssnNotTitle);
                    $modal.find("[ids='content']").text(opts.ssnNotBody);
                },
                closable: false,
                observeChanges: true
            }).modal("show");
        });
        $system.find(".close").off("click").on("click",function(){
            $system.css("display","none");
        });

    };

    //未读消息提示
    common.prototype.loadNoteNum = function(){
        var $modal = $('[ids="info-num"]');
        var urlPath = window.location.pathname;
        var count = urlPath.match(/\//g).length;
        var ajaxUrl;
        if(ld_common.urlFlag == 0) {
            if (count == 3) {
                ajaxUrl = "../systemnotice/countNotices"
            };
            if (count == 2) {
                ajaxUrl = "systemnotice/countNotices"
            };
        }else{
            if (count == 2) {
                ajaxUrl = "../systemnotice/countNotices"
            };
            if (count == 1) {
                ajaxUrl = "systemnotice/countNotices"
            };
        }
        $.ajax({
            type: "POST",
            url: ajaxUrl,
            dataType: "json",
            data: JSON.stringify({}),
            contentType: "application/json; charset=utf-8",
            success: function (obj) {
                if(obj.state == "success"){
                    ld_common.createNoteNum(obj);

                }else{
                    return;
                }
            },
            error:function(){
                return;
            }
        });
    };
    common.prototype.createNoteNum = function(opts){
        var $modal =$("#loginStatus");
        var html ='<span class="ui info-num" ids="info-num">';
        html =html+'<i></i>';
        html =html+'</span>';
        $modal.append(html);
        var $numFather = $modal.find('[ids="info-num"]');
        var $num = $numFather.find('i');
        if(opts.data.notReadUserNotice <= 0){
            $numFather.hide();
        }else{
            $numFather.show();
            if( opts.data.notReadUserNotice > 9){
                $num.text("···");
            }else{
                $num.text(opts.data.notReadUserNotice);
            };

            $modal.off('click').on('click',function(){
                window.location.href= ld_common.rootHrefPath+"systemnotice/userNoticeInfo?userId=" +ld_common.userId ;
            });
        }



    };


    return common;

})();

$(function() {
    window.ld_common = new common();
    return ld_common.init();
});