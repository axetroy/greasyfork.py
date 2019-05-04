// ==UserScript==
// @name         太平洋摄影部落及摄影论坛一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.1.0
// @description  一键复制标题
// @author       pana
// @include      http*://*.pconline.com.cn/photo*
// @include      http*://*.pconline.com.cn/dc*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	const urlArray = {
		dp_photo: {
			url: 'dp.pconline.com.cn/photo/',
			iconUrl: {
				mouseleave: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDUxMS4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiPjxwYXRoIGQ9Ik0yNjA4LjUsNDk4OC40Yy0xOTkuNC0zOC40LTM1OC0xODIuNi00MjcuNy0zODQuNGMtMTYuOC00OC4xLTI4LjgtMjIzLjUtMjguOC00MTMuM3YtMzM0aDE5MjkuNGMxNzc1LjcsMCwxOTM0LjItMi40LDE5ODcuMS00MC44YzEyNS04NC4xLDE5MjIuMi0xNjE5LjUsMTk1NS45LTE2NjkuOWMzMy42LTQ4LjEsMzguNC0zNTMuMiwzOC40LTI4MTMuN3YtMjc2MC44bDI5NS41LDcuMmMyNjEuOSw5LjYsMzA3LjUsMTYuOCw0MzAuMSw3Ni45YzE3Ny44LDg2LjUsMzQzLjYsMjY5LjEsMzkxLjcsNDMyLjVjMzEuMiwxMDUuNywzNiw1MjYuMiwzNiwzMjEyLjV2MzA5MGwtOTUzLjksODA5LjdMNzMwNiw1MDEwbC0yMzA2LjctMi40QzM3MzAuNiw1MDA1LjIsMjY1NC4yLDQ5OTgsMjYwOC41LDQ5ODguNHogTTgzNzIuOCwzNzk2LjZjNDgyLjktNDQ0LjUsNDg3LjgtNDA4LjUtNDUuNy0zOTEuNmMtMjcxLjUsNy4yLTM0My42LDE5LjItNDQ0LjUsNjIuNWMtMTYzLjQsNzQuNS0zMzEuNiwyNDUuMS00MTMuMyw0MjIuOWMtNjAuMSwxMzQuNi02Ny4zLDE3NS40LTc0LjUsNDgwLjZsLTkuNiwzMzYuNGwyODUuOS0yNjQuM0M3ODI3LjQsNDI5OC44LDgxNDIuMSw0MDA4LDgzNzIuOCwzNzk2LjZ6IiBzdHlsZT0iZmlsbDojRkZGRkZGIj48L3BhdGg+PHBhdGggZD0iTTEyMDIuOSwzNjE0Yy0xNDEuOC0zMy42LTI2MS45LTEyNy4zLTMzOC44LTI2OS4xbC02OS43LTEyNWwtNy4yLTM3MzYuM2MtNy4yLTQyMjguOS0yMS42LTM5MDYuOSwxODIuNi00MTExLjJjNzQuNS03Mi4xLDE0OS0xMjIuNiwyMTMuOS0xMzkuNGM3Mi4xLTE5LjIsOTQ0LjMtMjYuNCwzMTExLjYtMjEuNmwzMDEwLjcsNy4ybDEzOS40LDcyLjFjMTgyLjYsOTEuMywzNDEuMiwyNjYuNywzODkuMyw0MjcuN2MyNCw4NC4xLDM2LDIzMC43LDM2LDQ5MC4ydjM2Ny42bC0yNjc0LjMsNC44bC0yNjc2LjcsNy4ybC0xMTUuMyw3Mi4xYy04NC4xLDUwLjQtMTM0LjYsMTA4LjEtMTc3LjgsMTkyLjJsLTYyLjUsMTE3LjdsLTcuMiwzMzM1LjFsLTQuOCwzMzM1LjFsLTQyNy43LTIuNEMxNDkxLjIsMzYzNS42LDEyNTUuOCwzNjI2LDEyMDIuOSwzNjE0eiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMzczLjEsMzI5LjRjNy4yLTMxMTYuNCw5LjYtMzMxMy41LDUwLjQtMzM3NS45YzIxLjYtMzYsNjkuNy04NC4xLDEwNS43LTEwNS43YzYwLjEtNDAuOSwyMjguMy00My4zLDI2OTEuMS01MC40bDI2MjYuMi00Ljh2MjYxNi42djI2MTYuNmwtOTUxLjUsODA3LjNsLTk1MS41LDgwNy4zSDQxNTUuOUgyMzY4LjJMMjM3My4xLDMyOS40eiBNNjgzNy40LDI1NjEuNmw1ODguNy01NDNsLTI2NC4zLTcuMmMtNDM3LjMtMTItNjgwLDU3LjctODc5LjQsMjU3LjFjLTE5NC42LDE5NC42LTI0Mi43LDMzNi40LTI1Ny4xLDczNS4zbC05LjYsMzEyLjRsMTE1LjMtMTA4LjFDNjE5NS45LDMxNTAuMiw2NTEzLDI4NTkuNSw2ODM3LjQsMjU2MS42eiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+ICA=)',
				mouseenter: 'none'
			},
			backgroundColor: {
				mouseleave: '#ccc',
				mouseenter: '#47afeb'
			},
			text: {
				mouseleave: '',
				mouseenter: '复制\n标题'
			},
			textColor: {
				beforeCopy: '#fff',
				afterCopy: '#000'
			}
		},
		itbbs_photo: {
			url: 'itbbs.pconline.com.cn/photo',
			textColor: {
				beforeCopy: '#47afeb',
				afterCopy: '#f60'
			}
		},
		itbbs_dc: {
			url: 'itbbs.pconline.com.cn/dc/',
			iconUrl: {
				mouseleave: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnPjxwYXRoIGQ9Ik05MTcuMSwzMzkuNmgtOTAuNVYxNjYuN2MwLTQwLjItMzIuNy03Mi45LTcyLjktNzIuOUg4Mi45Yy00MC4yLDAtNzIuOSwzMi43LTcyLjksNzIuOXY0MjAuOGMwLDQwLjIsMzIuNyw3Mi45LDcyLjksNzIuOWg5MC41djE3Mi45YzAsNDAuMiwzMi43LDcyLjksNzIuOSw3Mi45aDY3MC43YzQwLjIsMCw3Mi45LTMyLjcsNzIuOS03Mi45VjQxMi41Qzk5MCwzNzIuMyw5NTcuMywzMzkuNiw5MTcuMSwzMzkuNnogTTE3My41LDQxMi41djE3Mi45SDg1VjE2OC44aDY2Ni42djE3MC44SDI0Ni40QzIwNi4yLDMzOS42LDE3My41LDM3Mi4zLDE3My41LDQxMi41eiBNOTE1LDgzMS4ySDI0OC40VjY2MC40di03NVY0MTQuNmg1MDMuMWg3NUg5MTVMOTE1LDgzMS4yTDkxNSw4MzEuMnoiIHN0eWxlPSJmaWxsOiNGRkZGRkYiPjwvcGF0aD48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9nPjwvc3ZnPiAg)',
				mouseenter: 'none'
			},
			backgroundColor: {
				mouseleave: '#aaa',
				mouseenter: '#ff9900'
			},
			text: {
				mouseleave: '',
				mouseenter: copyTitle.title
			},
			textColor: {
				beforeCopy: '#fff',
				afterCopy: '#000'
			}
		}
	};
	if (old_url.indexOf(urlArray.dp_photo.url) !== -1) {
		$("div.guide a.praise").before(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).attr('class', 'lnav').css({
			'color': urlArray.dp_photo.textColor.beforeCopy,
			'background-color': urlArray.dp_photo.backgroundColor.mouseleave,
			'background-image': urlArray.dp_photo.iconUrl.mouseleave,
			'background-repeat': 'no-repeat',
			'background-position': 'center',
			'background-size': '24px auto',
			'margin-bottom': '10px',
			'width': '45px',
			'height': '45px',
			'font-size': '15px',
			'line-height': '22px',
			'text-align': 'center',
		}).hover(function() {
			$(this).css({
				'background-image': urlArray.dp_photo.iconUrl.mouseenter,
				'background-color': urlArray.dp_photo.backgroundColor.mouseenter
			});
			$(this).text(urlArray.dp_photo.text.mouseenter)
		}, function() {
			$(this).css({
				'background-image': urlArray.dp_photo.iconUrl.mouseleave,
				'background-color': urlArray.dp_photo.backgroundColor.mouseleave
			});
			$(this).text(urlArray.dp_photo.text.mouseleave)
		}).on('click', function() {
			let copyText = $("#albumInfo").attr("title");
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.dp_photo.textColor.afterCopy)
		})
	}
	if (old_url.indexOf(urlArray.itbbs_photo.url) !== -1) {
		$(".title").after(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).text(copyTitle.title).css({
			'color': urlArray.itbbs_photo.textColor.beforeCopy,
			'font-size': '18px',
			'margin-left': '40px'
		}).on('click', function() {
			let copyText = $("head title").text().replace("_人像摄影_太平洋电脑网", "");
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.itbbs_photo.textColor.afterCopy)
		})
	}
	if (old_url.indexOf(urlArray.itbbs_dc.url) !== -1) {
		$(".guide").after(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).css({
			'color': urlArray.itbbs_dc.textColor.beforeCopy,
			'background-color': urlArray.itbbs_dc.backgroundColor.mouseleave,
			'background-image': urlArray.itbbs_dc.iconUrl.mouseleave,
			'background-repeat': 'no-repeat',
			'background-size': '32px auto',
			'background-position': 'center',
			'width': '60px',
			'height': '50px',
			'margin-left': '570px',
			'position': 'fixed',
			'left': '50%',
			'bottom': '74px',
			'display': 'block',
			'font-size': '15px',
			'border-radius': '2px',
			'text-align': 'center',
			'line-height': '50px',
			'text-decoration': 'none'
		}).hover(function() {
			$(this).css({
				'background-image': urlArray.itbbs_dc.iconUrl.mouseenter,
				'background-color': urlArray.itbbs_dc.backgroundColor.mouseenter
			});
			$(this).text(urlArray.itbbs_dc.text.mouseenter)
		}, function() {
			$(this).css({
				'background-image': urlArray.itbbs_dc.iconUrl.mouseleave,
				'background-color': urlArray.itbbs_dc.backgroundColor.mouseleave
			});
			$(this).text(urlArray.itbbs_dc.text.mouseleave)
		}).on('click', function() {
			let copyText = $(".mainfloor-cont .tit a:first").text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', urlArray.itbbs_dc.textColor.afterCopy)
		})
	}
})();