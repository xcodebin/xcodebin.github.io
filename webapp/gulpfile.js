/**
 * About: gulp编译配置脚本
 * Other:
 * Created: Xiaolong WU on 16/3/27 下午9:52.
 * Editored:
 */

var gulp = require('gulp');//gulp
var gutil = require('gulp-util');//gulp工具
var sourcemaps = require('gulp-sourcemaps');//map插件
var addsrc = require('gulp-add-src');//追加js文件插件
var coffee = require('gulp-coffee');//coffeescritp插件
var sass = require('gulp-sass');//sass插件
var htmlmin = require('gulp-htmlmin'); //html压缩
var imagemin = require('gulp-imagemin');//图片压缩
var pngcrush = require('imagemin-pngcrush');
var minifycss = require('gulp-minify-css');//css压缩
var jshint = require('gulp-jshint');//js检测
var uglify = require('gulp-uglify');//js压缩
var concat = require('gulp-concat');//文件合并
var rename = require('gulp-rename');//文件更名
var cssUrlVersion = require('gulp-make-css-url-version');//css文件里引用url加版本号（根据引用文件的md5生产版本号）
var notify = require('gulp-notify');//提示信息
var fs = require('fs-extra');//fs 工具
var async = require('async');// 异步工具
var run = require('run-sequence');//按顺序运行插件
var del = require('del');//删除工具



gulp.task('coffee : emptyDir',function(){
    return del(['static/js_lib/**']);
});

// 重新编译coffee
gulp.task('coffee : build',function(){
    gulp.src(['static/coffee/**/*.coffee'])
        .pipe(sourcemaps.init())
        .pipe(coffee({ bare: true })).on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('static/js_lib'))
    //.pipe(notify({ message: 'build coffee ok' }));
});

//监听coffee
gulp.task('coffee : watch',function(){
    run('coffee : emptyDir','coffee : build');
    gulp.watch('static/coffee/**/*.coffee',function(e){
        var path = e.path.substring(e.path.indexOf("static/coffee"));
        if(path.lastIndexOf('\\')+1 == path.length){
            path = path.substring(0, path.lastIndexOf("\\"));
        }
        var toPath =path.replace('coffee', 'js_lib');
        var index = toPath.lastIndexOf('\\')
        toPath = toPath.substring(0, index);
        gulp.src([path])
            .pipe(sourcemaps.init())
            .pipe(coffee({ bare: true })).on('error', gutil.log)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(toPath))
    });
});

//编译coffee 并压缩
gulp.task('coffee : min',function(){
    async.auto({
        delDest:function(cb){ //清空js_lib文件
            fs.emptyDir('static/js_lib', function (err) {
                cb()
            })
        },
        gulpBuild:['delDest',function(cb){
            gulp.src(['static/coffee/**/*.coffee'])
                .pipe(coffee({ bare: true })).on('error', gutil.log)
                .pipe(gulp.dest('static/js'))
                .pipe(concat('dev.js'))
                .pipe(gulp.dest('static/js'))
                .pipe(rename({ suffix: '.min' }))
                .pipe(uglify())
                .pipe(gulp.dest('static/js'))
                .pipe(notify({ message: 'min Coffee ok' }));
        }]
    })
});





//清空sass目录
gulp.task('sass : emptyDir', function(){
    return del(['static/css/**']);
});
//编译sass
gulp.task('sass : build', function(){
    return gulp.src('static/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('static/css'));
});
//最小化sass
gulp.task('sass : min', function() {
    var theme = 'static/css/theme.css';
    var index = 'static/css/index.css';
    var login = 'static//css/login.css';
    var home = 'static/css/home.css';
    var skin = 'static/css/skin.css';
    gulp.src([theme,index,login,home,skin])
        .pipe(concat('dev.css'))
        .pipe(gulp.dest('static/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssUrlVersion())
        .pipe(minifycss({
            advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: '*',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('static/css'))
        //.pipe(notify({ message: 'build sass ok' }));
});
//监听sass
gulp.task('sass : watch', function (){
    run('sass : emptyDir','sass : build','sass : min')
    gulp.watch('static/sass/**/*.scss',function(e){
        run('sass : emptyDir','sass : build','sass : min')
    });
    //gulp.start('sass : min');
});


//默认任务
gulp.task('default',['sass : watch','coffee : watch']);