# jquery-validation 表单验证插件

## API文档
[https://jqueryvalidation.org/documentation/](https://jqueryvalidation.org/documentation/)

## 简单示例(结合semantic-ui)
**引入文件**
```html
<link rel="stylesheet" href="bower_components/semantic/dist/semantic.min.css" />

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="bower_components/semantic/dist/semantic.min.js"></script>
```
 **HTML**
```html
<form class="ui form" method="post">
  <div class="field">
    <div class="ui left icon input">
	  <input type="text" name="name" placeholder="姓名" required minlength="6" />
	  <i class="user icon"></i>
	</div>
  </div>
  <div class="field">
    <div class="ui left icon input">
	  <input type="email" name="email" placeholder="邮箱" required />
	  <i class="mail icon"></i>
	</div>
  </div>
  <div class="field">
    <div class="ui left icon input">
	  <input type="text" name="telephone" placeholder="电话" required />
	  <i class="phone icon"></i>
	</div>
  </div>
  <div class="field">
  	<select required name="select">
  	</select>
  </div>
  <div class="field">
    <textarea name="textarea" placeholder="个人简介" required minlength="10" maxlength="20"></textarea>
  </div>
  <div class="field">
    <div class="ui checkbox">
      <input type="checkbox" tabindex="0" class="hidden" name="agree" required />
      <label>我同意***条约</label>
    </div>
  </div>
  <button class="ui button" type="submit">提交</button>
</form>
```

**javascript**
	$('.ui.checkbox').checkbox();
	$('form').validate({
		// 验证规则
		rules: {
			email: {
				email: true,
				required: true
			}
		},
		// 错误提示信息
		messages: {
			name: {
				required: '请输入姓名',
				minlength: '至少六个字母'
			},
			email: '邮箱格式不正确',
			telephone: '请输入电话',
			agree: '请同意条约',
			textarea: {
				required: '请输入个人简介',
				minlength: '内容不能小于10个字符',
				maxlength: '内容不能大于10个字符'
			},
			select: '请选择'
		},
		// 错误提示元素标签
		errorElement: 'span',
		// 显示错误时执行
		showErrors: function(errorMap, errorList) {
			this.defaultShowErrors();
			$(errorList).each(function(index, err){
				$(err.element).parent('.ui.input').addClass('right labeled').children('span').addClass('ui basic label red error-label');
				if ($(err.element).attr('type') == 'checkbox') {
					$(err.element).siblings('span').css({'float': 'right', 'margin-left': '20px', 'color': '#db2828', 'font-weight': '700'}).siblings('label').css({'float': 'left'});
				}
				if ($(err.element).prop("tagName") == 'TEXTAREA' || $(err.element).prop("tagName") == 'SELECT') {
					$(err.element).siblings('span').addClass('ui error message').css({'display': 'block'}).show();
				}
			});
		},
		// 验证成功后执行
		success: function(obj){
			$(obj).parent().removeClass('right labeled');
			$(obj).remove();
		},
		// 提交时触发
		submitHandler: function(form) {
			alert('提交');
			form.submit();
		}
	});
```