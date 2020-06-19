$(function () {
	/* 登录 | 注册 切换 */
	$('#link_reg').on('click', function () {
		$('.login-box').hide();
		$('.reg-box').show();
	});
	$('#link_login').on('click', function () {
		$('.login-box').show();
		$('.reg-box').hide();
	});

	/* 自定义校验规则 */
	var form = layui.form;
	form.verify({
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
		repwd: function (value) {
			var pwd = $('.reg-box [name=password]').val();
			if (pwd !== value) {
				return '两次密码不一致！';
			};
		}
	});

	/* 发动注册的ajax请求 */
	var layer = layui.layer;
	$('#form_reg').on('submit', function (e) {
		e.preventDefault();
		$.post({
			url: '/api/reguser',
			data: {
				username: $('#form_reg [name=username]').val(),
				password: $('#form_reg [name=password]').val(),
			},
			success: function (res) {
				if (res.status !== 0) {
					return layer.mag(res.message);
				}
				layer.msg(res.message);
				$('#link_login').click();
				$('#form_login [name=username]').val($('#form_reg [name=username]').val());
				console.log($('#form_reg [name=username]').val());
				
			}
		});
	});
	/* 登录的 ajax 请求 */
	$('#form_login').on('submit',function (e) {
		e.preventDefault();
		$.post({
			url: '/api/login',
			data: $(this).serialize(),
			success: function (res) {
				console.log(res);
				
				if (res.status !== 0) {
					return layer.msg(res.message);
				};
				layer.msg(res.message);
				localStorage.setItem('token', res.token);
				location.href = './index.html';
			}
		});
	});
});