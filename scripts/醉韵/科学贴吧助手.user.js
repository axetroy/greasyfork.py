// ==UserScript==
// @name         科学贴吧助手
// @namespace    null
// @version      0.0
// @description  免登录贴吧查看楼中楼.翻页      隐藏登录提示      科学看图  PS.除 【隐藏登录提示灰条】其他功能都为原作者版权！ 本人只是整合一下 ：） 如有其它建议欢迎反馈
// @match        http://tieba.baidu.com/*
// @include      http://tieba.baidu.com/*
// ==/UserScript==

//伪装登录 @作者 未知
var islogin = document.createElement('script');
islogin.innerHTML = "PageData.user.is_login = true;";
document.head.appendChild(islogin);

//隐藏底部提示灰条 @作者 null
var traget=document.getElementById('guide_fc');   
traget.style.display="none";        

//百度贴吧科学看图君 @作者 jiayiming
(function(){

	$(document).on('mousedown', '.BDE_Image', function(e){
		//帖中图片去除click
		unsafeWindow.$('.BDE_Image').unbind('click');
		//$(this).unbind('click');
		
		// 兼容其它腳本
		if (e.ctrlKey || e.altKey || e.shiftKey)
			return ;

		this.onclick = function(e){
			if (e.button != 0)
					return true;

			var match = $(this).attr("src").match(/\/[a-z0-9]{20,}(?=\.[jpg|gif|png])/);
			console.log('pic_id',match);
			if (!match) {
					return;
			}
			var picSrc = "http://imgsrc.baidu.com/forum/pic/item" + match[0] + ".jpg";
			window.open(picSrc);

			e.preventDefault();
			return false;
		};
	});

	// 帖子列表预览中图片，还原“查看大图”按钮链接
	$(document).on('mousedown', '.j_ypic', function(){
		var d = this.href;
		if (d.indexOf('pic_id') > 0) {
			var start = d.indexOf('pic_id') + 7;
			var end = d.indexOf('&', start);
			var pic = 'http://imgsrc.baidu.com/forum/pic/item/' + d.substring(start, end) + '.jpg'
			this.href = pic;
		}
	});

	// i贴吧帖子预览中图片，还原“查看大图”按钮链接
	$(document).on('mousedown', '.j_full', function(){
		var d = this.href;
		if (d.indexOf('pic_id') > 0) {
			var start = d.indexOf('pic_id') + 7;
			var end = d.indexOf('&', start);
			var pic = 'http://imgsrc.baidu.com/forum/pic/item/' + d.substring(start, end) + '.jpg'
			this.href = pic;
		}
	});
})();