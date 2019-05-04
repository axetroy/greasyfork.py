// ==UserScript==
// @name         蜂鸟网一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.0
// @description  添加复制标题按钮
// @author       pana
// @include      http*://bbs.fengniao.com/forum/*
// @include      http*://photo.fengniao.com/pic*
// @include      http*://*.fengniao.com/slide/*
// @include      http*://sai.fengniao.com/album*
// @include      http*://pp.fengniao.com/*
// @grant        none
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	const urlArray = {
		bbs_pic: {
			url: 'bbs.fengniao.com/forum/pic/',
			textColor: {
				afterCopy: '#28b8c5'
			}
		},
		bbs_forum: {
			url: 'bbs.fengniao.com/forum/',
			backgroundColor: {
				mouseleave: '#282c31',
				mouseenter: '#464c54'
			},
			backgroundImage: {
				beforeCopy: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnPjxwYXRoIGQ9Ik03OTYsMTBIMzg0LjJjLTU5LjgsMC0xMDguNSw0OC43LTEwOC41LDEwOC41djEzLjNIMjA0Yy01OS44LDAtMTA4LjUsNDguNy0xMDguNSwxMDguNXY2NDEuM0M5NS42LDk0MS4zLDE0NC4yLDk5MCwyMDQsOTkwaDQxMS43YzU5LjgsMCwxMDguNS00OC43LDEwOC41LTEwOC41di0xMy4zSDc5NmM1OS44LDAsMTA4LjUtNDguNywxMDguNS0xMDguNVYxMTguNUM5MDQuNCw1OC43LDg1NS44LDEwLDc5NiwxMHogTTY1NC4zLDg4MS41YzAsMjEuMi0xNy4zLDM4LjUtMzguNSwzOC41SDIwNGMtMjEuMiwwLTM4LjUtMTcuMy0zOC41LTM4LjVWMjQwLjJjMC0yMS4yLDE3LjMtMzguNSwzOC41LTM4LjVoNDExLjdjMjEuMiwwLDM4LjUsMTcuMywzOC41LDM4LjVMNjU0LjMsODgxLjVMNjU0LjMsODgxLjV6IE04MzQuNSw3NTkuOGMwLDIxLjItMTcuMywzOC41LTM4LjUsMzguNWgtNzEuN3YtNTU4YzAtNTkuOC00OC43LTEwOC41LTEwOC41LTEwOC41aC0yNzB2LTEzLjNjMC0yMS4yLDE3LjMtMzguNSwzOC41LTM4LjVINzk2YzIxLjIsMCwzOC41LDE3LjMsMzguNSwzOC41TDgzNC41LDc1OS44TDgzNC41LDc1OS44eiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L2c+PC9zdmc+ICA=)',
				afterCopy: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnPjxwYXRoIGQ9Ik03OTYsMTBIMzg0LjJjLTU5LjgsMC0xMDguNSw0OC43LTEwOC41LDEwOC41djEzLjNIMjA0Yy01OS44LDAtMTA4LjUsNDguNy0xMDguNSwxMDguNXY2NDEuM0M5NS42LDk0MS4zLDE0NC4yLDk5MCwyMDQsOTkwaDQxMS43YzU5LjgsMCwxMDguNS00OC43LDEwOC41LTEwOC41di0xMy4zSDc5NmM1OS44LDAsMTA4LjUtNDguNywxMDguNS0xMDguNVYxMTguNUM5MDQuNCw1OC43LDg1NS44LDEwLDc5NiwxMHogTTY1NC4zLDg4MS41YzAsMjEuMi0xNy4zLDM4LjUtMzguNSwzOC41SDIwNGMtMjEuMiwwLTM4LjUtMTcuMy0zOC41LTM4LjVWMjQwLjJjMC0yMS4yLDE3LjMtMzguNSwzOC41LTM4LjVoNDExLjdjMjEuMiwwLDM4LjUsMTcuMywzOC41LDM4LjVMNjU0LjMsODgxLjVMNjU0LjMsODgxLjV6IE04MzQuNSw3NTkuOGMwLDIxLjItMTcuMywzOC41LTM4LjUsMzguNWgtNzEuN3YtNTU4YzAtNTkuOC00OC43LTEwOC41LTEwOC41LTEwOC41aC0yNzB2LTEzLjNjMC0yMS4yLDE3LjMtMzguNSwzOC41LTM4LjVINzk2YzIxLjIsMCwzOC41LDE3LjMsMzguNSwzOC41TDgzNC41LDc1OS44TDgzNC41LDc1OS44eiIgc3R5bGU9ImZpbGw6IzU2YWJlNCI+PC9wYXRoPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L2c+PC9zdmc+ICA=)'
			}
		},
		photo_pic: {
			url: 'photo.fengniao.com/pic',
			textColor: {
				afterCopy: '#28b8c5'
			}
		},
		fengniao_slide: {
			url: 'fengniao.com/slide/',
			backgroundColor: {
				mouseleave: '#d13845',
				mouseenter: '#89000b'
			},
			textColor: {
				beforeCopy: '#fff',
				afterCopy: '#000'
			}
		},
		sai_album: {
			url: 'sai.fengniao.com/album',
			background: 'url(https://icon.fengniao.com/newYingSai2017/images/newYsIndexBg.png) no-repeat',
			backgroundPosition: {
				mouseleave: '0 -80px',
				mouseenter: '0 -130px'
			},
			textColor: {
				beforeCopy: '#fff',
				afterCopy: '#000'
			}
		},
		pp_com: {
			reg: /pp\.fengniao\.com\/[0-9]+/i,
			backgroundColor: {
				mouseleave: '#3f87d9',
				mouseenter: '#3079cc',
			},
			textColor: {
				beforeCopy: '#fff',
				afterCopy: '#ff6862'
			}
		}
	};
	if (old_url.indexOf(urlArray.bbs_pic.url) !== -1) {
		$(".crumbsBox").after(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).text(copyTitle.title).css({
			'margin-left': "40px",
			'font-size': '15px',
		}).on('click', function() {
			let copyText = $(".h1 ~ a").text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.bbs_pic.textColor.afterCopy)
		})
	} else if (old_url.indexOf(urlArray.bbs_forum.url) !== -1) {
		$(".collectionBtn").before(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).wrap('<li></li>').css({
			'background-color': urlArray.bbs_forum.backgroundColor.mouseleave,
			'border-radius': '2px',
			'text-align': 'center',
			'background-image': urlArray.bbs_forum.backgroundImage.beforeCopy,
			'background-repeat': 'no-repeat',
			'background-size': '32px auto',
			'background-position': 'center',
			'width': '50px',
			'height': '51px',
			'display': 'block'
		}).hover(function() {
			$(this).css({
				'background-color': urlArray.bbs_forum.backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': urlArray.bbs_forum.backgroundColor.mouseleave
			})
		}).on('click', function() {
			let copyText = $("head title").text().replace("【有图】", "");
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'background-image', urlArray.bbs_forum.backgroundImage.afterCopy)
		})
	}
	if (old_url.indexOf(urlArray.photo_pic.url) !== -1) {
		$('.picHeader .overOneTxt').before(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).text(copyTitle.title).css({
			'text-decoration-line': 'underline'
		}).on('click', function() {
			let copyText = $('.picHeader .overOneTxt').text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.photo_pic.textColor.afterCopy)
		})
	}
	if (old_url.indexOf(urlArray.fengniao_slide.url) !== -1) {
		$(".mark-num").after(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).text(copyTitle.title).css({
			'float': 'left',
			'width': '77px',
			'height': '27px',
			'border': '0 none',
			'outline': '0 none',
			'border-bottom': '2px solid #89000b',
			'border-right': '2px solid #89000b',
			'background-color': urlArray.fengniao_slide.backgroundColor.mouseleave,
			'color': urlArray.fengniao_slide.textColor.beforeCopy,
			'font-size': '12px',
			'line-height': '27px',
			'text-align': 'center',
			'vertical-align': 'middle',
			'margin-top': '15px',
			'margin-left': '40px',
			'text-decoration-line': 'none'
		}).hover(function() {
			$(this).css({
				'background-color': urlArray.fengniao_slide.backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': urlArray.fengniao_slide.backgroundColor.mouseleave
			})
		}).on('click', function() {
			let copyText = $('#galleryHeader .img-title').text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.fengniao_slide.textColor.afterCopy)
		})
	}
	if (old_url.indexOf(urlArray.sai_album.url) !== -1) {
		$("div.showPic").after(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).text('复制').css({
			'display': "block",
			'position': 'fixed',
			'width': '50px',
			'height': '50px',
			'bottom': '210px',
			'right': '1%',
			'z-index': '1000',
			'font-size': '16px',
			'color': urlArray.sai_album.textColor.beforeCopy,
			'text-align': 'center',
			'line-height': '50px',
			'background': urlArray.sai_album.background,
			'background-position': urlArray.sai_album.backgroundPosition.mouseleave
		}).hover(function() {
			$(this).css({
				'background-position': urlArray.sai_album.backgroundPosition.mouseenter
			})
		}, function() {
			$(this).css({
				'background-position': urlArray.sai_album.backgroundPosition.mouseleave
			})
		}).on('click', function() {
			let copyText = $('dt.tit1Box > h3').text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.sai_album.textColor.afterCopy)
		})
	}
	if (urlArray.pp_com.reg.test(old_url)) {
		$("a.toUpPic").before(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).text(copyTitle.title).css({
			'width': "50px",
			'height': '50px',
			'background-image': 'none',
			'background-color': urlArray.pp_com.backgroundColor.mouseleave,
			'font-size': '17px',
			'line-height': '24px',
			'color': urlArray.pp_com.textColor.beforeCopy,
			'text-align': 'center',
			'border-radius': '4px'
		}).hover(function() {
			$(this).css({
				'background-color': urlArray.pp_com.backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': urlArray.pp_com.backgroundColor.mouseleave
			})
		}).on('click', function() {
			let copyText = $('div.titBox .tit').text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.pp_com.textColor.afterCopy)
		})
	}
})();