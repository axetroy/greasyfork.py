// ==UserScript==
// @name         哔哩哔哩相簿一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.4.0
// @description  一键复制标题及进入相簿
// @author       pana
// @include      http*://h.bilibili.com/*
// @exclude      http*://h.bilibili.com/eden/*
// @exclude      http*://h.bilibili.com/d
// @exclude      http*://h.bilibili.com/p
// @grant        none
// @require      https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const iconUrl = {
		beforeCopy: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik04NjEuMSw4MzUuM2gtNzcuNHY3Ny40YzAsNDIuNy0zNC42LDc3LjQtNzcuNCw3Ny40SDEzOC45Yy00Mi43LDAtNzcuNC0zNC42LTc3LjQtNzcuNFYyNDIuMWMwLTQyLjcsMzQuNi03Ny40LDc3LjQtNzcuNGg3Ny40Vjg3LjRjMC00Mi43LDM0LjYtNzcuNCw3Ny40LTc3LjRoNTY3LjRjNDIuNywwLDc3LjQsMzQuNiw3Ny40LDc3LjR2NjcwLjVDOTM4LjQsODAwLjYsOTAzLjgsODM1LjMsODYxLjEsODM1LjN6IE0xNjQuNywyMTYuM2MtMjguNSwwLTUxLjYsMjMuMS01MS42LDUxLjZ2NjE4LjljMCwyOC41LDIzLjEsNTEuNiw1MS42LDUxLjZoNTE1LjhjMjguNSwwLDUxLjYtMjMuMSw1MS42LTUxLjZWMjY3LjljMC0yOC41LTIzLjEtNTEuNi01MS42LTUxLjZIMTY0Ljd6IE04ODYuOCwxMTMuMmMwLTI4LjUtMjMuMS01MS42LTUxLjYtNTEuNkgzMTkuNWMtMjguNSwwLTUxLjYsMjMuMS01MS42LDUxLjZ2NTEuNmg0MzguNGM0Mi43LDAsNzcuNCwzNC42LDc3LjQsNzcuNHY1NDEuNmg1MS42YzI4LjUsMCw1MS42LTIzLjEsNTEuNi01MS42VjExMy4yeiBNNjAzLjIsODM1LjNIMjQyLjFjLTE0LjMsMC0yNS44LTExLjUtMjUuOC0yNS44YzAtMTQuMiwxMS41LTI1LjgsMjUuOC0yNS44aDM2MS4xYzE0LjMsMCwyNS44LDExLjYsMjUuOCwyNS44QzYyOC45LDgyMy43LDYxNy40LDgzNS4zLDYwMy4yLDgzNS4zeiBNNjAzLjIsNjgwLjVIMjQyLjFjLTE0LjMsMC0yNS44LTExLjUtMjUuOC0yNS44YzAtMTQuMiwxMS41LTI1LjgsMjUuOC0yNS44aDM2MS4xYzE0LjMsMCwyNS44LDExLjYsMjUuOCwyNS44QzYyOC45LDY2OSw2MTcuNCw2ODAuNSw2MDMuMiw2ODAuNXogTTYwMy4yLDUyNS44SDI0Mi4xYy0xNC4zLDAtMjUuOC0xMS41LTI1LjgtMjUuOGMwLTE0LjIsMTEuNS0yNS44LDI1LjgtMjUuOGgzNjEuMWMxNC4zLDAsMjUuOCwxMS42LDI1LjgsMjUuOEM2MjguOSw1MTQuMyw2MTcuNCw1MjUuOCw2MDMuMiw1MjUuOHogTTYwMy4yLDM3MS4xSDI0Mi4xYy0xNC4zLDAtMjUuOC0xMS41LTI1LjgtMjUuOGMwLTE0LjMsMTEuNS0yNS44LDI1LjgtMjUuOGgzNjEuMWMxNC4zLDAsMjUuOCwxMS41LDI1LjgsMjUuOEM2MjguOSwzNTkuNSw2MTcuNCwzNzEuMSw2MDMuMiwzNzEuMXoiIHN0eWxlPSJmaWxsOiM1NjU2NTYiPjwvcGF0aD48L2c+PC9zdmc+ICA=)',
		afterCopy: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik04NjEuMSw4MzUuM2gtNzcuNHY3Ny40YzAsNDIuNy0zNC42LDc3LjQtNzcuNCw3Ny40SDEzOC45Yy00Mi43LDAtNzcuNC0zNC42LTc3LjQtNzcuNFYyNDIuMWMwLTQyLjcsMzQuNi03Ny40LDc3LjQtNzcuNGg3Ny40Vjg3LjRjMC00Mi43LDM0LjYtNzcuNCw3Ny40LTc3LjRoNTY3LjRjNDIuNywwLDc3LjQsMzQuNiw3Ny40LDc3LjR2NjcwLjVDOTM4LjQsODAwLjYsOTAzLjgsODM1LjMsODYxLjEsODM1LjN6IE0xNjQuNywyMTYuM2MtMjguNSwwLTUxLjYsMjMuMS01MS42LDUxLjZ2NjE4LjljMCwyOC41LDIzLjEsNTEuNiw1MS42LDUxLjZoNTE1LjhjMjguNSwwLDUxLjYtMjMuMSw1MS42LTUxLjZWMjY3LjljMC0yOC41LTIzLjEtNTEuNi01MS42LTUxLjZIMTY0Ljd6IE04ODYuOCwxMTMuMmMwLTI4LjUtMjMuMS01MS42LTUxLjYtNTEuNkgzMTkuNWMtMjguNSwwLTUxLjYsMjMuMS01MS42LDUxLjZ2NTEuNmg0MzguNGM0Mi43LDAsNzcuNCwzNC42LDc3LjQsNzcuNHY1NDEuNmg1MS42YzI4LjUsMCw1MS42LTIzLjEsNTEuNi01MS42VjExMy4yeiBNNjAzLjIsODM1LjNIMjQyLjFjLTE0LjMsMC0yNS44LTExLjUtMjUuOC0yNS44YzAtMTQuMiwxMS41LTI1LjgsMjUuOC0yNS44aDM2MS4xYzE0LjMsMCwyNS44LDExLjYsMjUuOCwyNS44QzYyOC45LDgyMy43LDYxNy40LDgzNS4zLDYwMy4yLDgzNS4zeiBNNjAzLjIsNjgwLjVIMjQyLjFjLTE0LjMsMC0yNS44LTExLjUtMjUuOC0yNS44YzAtMTQuMiwxMS41LTI1LjgsMjUuOC0yNS44aDM2MS4xYzE0LjMsMCwyNS44LDExLjYsMjUuOCwyNS44QzYyOC45LDY2OSw2MTcuNCw2ODAuNSw2MDMuMiw2ODAuNXogTTYwMy4yLDUyNS44SDI0Mi4xYy0xNC4zLDAtMjUuOC0xMS41LTI1LjgtMjUuOGMwLTE0LjIsMTEuNS0yNS44LDI1LjgtMjUuOGgzNjEuMWMxNC4zLDAsMjUuOCwxMS42LDI1LjgsMjUuOEM2MjguOSw1MTQuMyw2MTcuNCw1MjUuOCw2MDMuMiw1MjUuOHogTTYwMy4yLDM3MS4xSDI0Mi4xYy0xNC4zLDAtMjUuOC0xMS41LTI1LjgtMjUuOGMwLTE0LjMsMTEuNS0yNS44LDI1LjgtMjUuOGgzNjEuMWMxNC4zLDAsMjUuOCwxMS41LDI1LjgsMjUuOEM2MjguOSwzNTkuNSw2MTcuNCwzNzEuMSw2MDMuMiwzNzEuMXoiIHN0eWxlPSJmaWxsOiM1NmFiZTQiPjwvcGF0aD48L2c+PC9zdmc+ICA=)'
	};

	function MainFunction() {
		let copyText = $("h1.article-title").text();
		if (copyText !== '') {
			$("div.sidebar-canvas").after(copyTitle.copyBtn);
			$(copyTitle.jQuerySelector).css({
				'position': 'fixed',
				'right': '20px',
				'bottom': '13%',
				'padding': '5px',
				'background-color': '#fff',
				'border-radius': '5px',
				'box-shadow': '0 6px 12px rgba(80, 80, 80, .12)',
				'width': '45px',
				'height': '45px',
				'background-image': iconUrl.beforeCopy,
				'background-repeat': 'no-repeat',
				'background-size': '32px auto',
				'background-position': 'center'
			}).on('click', function() {
				copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'background-image', iconUrl.afterCopy)
			})
		}
		$("a.link-pink").eq(1).on('mousedown', function() {
			this.href = this.href.replace('#', '')
		});
		$("div.p-fixed div.btn-part a").on('mousedown', function() {
			this.href = this.href.replace('#', '')
		})
	}
	let observer = new MutationObserver(function() {
		MainFunction()
	});
	let listenerContainer = document.querySelector("h1.article-title");
	let option = {
		'childList': true
	};
	observer.observe(listenerContainer, option)
})();