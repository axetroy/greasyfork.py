// ==UserScript==
// @name         站酷网一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.0.1
// @description  添加复制标题按钮
// @author       pana
// @include      http*://www.zcool.com.cn/work/*
// @grant        none
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const zcoolValue = {
		backgroundImage: {
			mouseleave: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik04ODYuMywxODVjLTE5LjQsMC0zNS4xLDE1LjctMzUuMSwzNXY2NjVjMCwxOS4zLTE1LjcsMzUtMzUuMSwzNUgyODkuM2MtMTkuNCwwLTM1LjEsMTUuNi0zNS4xLDM1YzAsMTkuNCwxNS43LDM1LDM1LjEsMzVoNTI2LjhjNTguMSwwLDEwNS4zLTQ3LjEsMTA1LjMtMTA1VjIyMEM5MjEuNCwyMDAuNyw5MDUuNywxODUsODg2LjMsMTg1eiIgc3R5bGU9ImZpbGw6IzgxODE4MSI+PC9wYXRoPjxwYXRoIGQ9Ik03ODAuOSw3NDVWMTE1YzAtNTcuOS00Ny4zLTEwNS0xMDUuNC0xMDVIMTg0QzEyNS45LDEwLDc4LjYsNTcuMSw3OC42LDExNXY2MzBjMCw1Ny45LDQ3LjMsMTA1LDEwNS40LDEwNWg0OTEuNkM3MzMuNyw4NTAsNzgwLjksODAyLjksNzgwLjksNzQ1eiBNMjU0LjIsMjIwaDI4MC45YzE5LjQsMCwzNS4xLDE1LjcsMzUuMSwzNWMwLDE5LjMtMTUuNywzNS0zNS4xLDM1SDI1NC4yYy0xOS40LDAtMzUuMS0xNS43LTM1LjEtMzVDMjE5LjEsMjM1LjcsMjM0LjgsMjIwLDI1NC4yLDIyMHogTTYwNS40LDY0MEgyNTQuMmMtMTkuNCwwLTM1LjEtMTUuNi0zNS4xLTM1YzAtMTkuNCwxNS43LTM1LDM1LjEtMzVoMzUxLjJjMTkuNCwwLDM1LjEsMTUuNiwzNS4xLDM1UzYyNC44LDY0MCw2MDUuNCw2NDB6IE02MDUuNCw0NjVIMjU0LjJjLTE5LjQsMC0zNS4xLTE1LjctMzUuMS0zNWMwLTE5LjMsMTUuNy0zNSwzNS4xLTM1aDM1MS4xYzE5LjQsMCwzNS4xLDE1LjcsMzUuMSwzNUM2NDAuNSw0NDkuMyw2MjQuOCw0NjUsNjA1LjQsNDY1eiIgc3R5bGU9ImZpbGw6IzgxODE4MSI+PC9wYXRoPjxwYXRoIGQ9Ik02MDUuNCw2NDAiIHN0eWxlPSJmaWxsOiM4MTgxODEiPjwvcGF0aD48L2c+PC9zdmc+ICA=)',
			mouseenter: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxwYXRoIGQ9Ik04ODYuMywxODVjLTE5LjQsMC0zNS4xLDE1LjctMzUuMSwzNXY2NjVjMCwxOS4zLTE1LjcsMzUtMzUuMSwzNUgyODkuM2MtMTkuNCwwLTM1LjEsMTUuNi0zNS4xLDM1YzAsMTkuNCwxNS43LDM1LDM1LjEsMzVoNTI2LjhjNTguMSwwLDEwNS4zLTQ3LjEsMTA1LjMtMTA1VjIyMEM5MjEuNCwyMDAuNyw5MDUuNywxODUsODg2LjMsMTg1eiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjxwYXRoIGQ9Ik03ODAuOSw3NDVWMTE1YzAtNTcuOS00Ny4zLTEwNS0xMDUuNC0xMDVIMTg0QzEyNS45LDEwLDc4LjYsNTcuMSw3OC42LDExNXY2MzBjMCw1Ny45LDQ3LjMsMTA1LDEwNS40LDEwNWg0OTEuNkM3MzMuNyw4NTAsNzgwLjksODAyLjksNzgwLjksNzQ1eiBNMjU0LjIsMjIwaDI4MC45YzE5LjQsMCwzNS4xLDE1LjcsMzUuMSwzNWMwLDE5LjMtMTUuNywzNS0zNS4xLDM1SDI1NC4yYy0xOS40LDAtMzUuMS0xNS43LTM1LjEtMzVDMjE5LjEsMjM1LjcsMjM0LjgsMjIwLDI1NC4yLDIyMHogTTYwNS40LDY0MEgyNTQuMmMtMTkuNCwwLTM1LjEtMTUuNi0zNS4xLTM1YzAtMTkuNCwxNS43LTM1LDM1LjEtMzVoMzUxLjJjMTkuNCwwLDM1LjEsMTUuNiwzNS4xLDM1UzYyNC44LDY0MCw2MDUuNCw2NDB6IE02MDUuNCw0NjVIMjU0LjJjLTE5LjQsMC0zNS4xLTE1LjctMzUuMS0zNWMwLTE5LjMsMTUuNy0zNSwzNS4xLTM1aDM1MS4xYzE5LjQsMCwzNS4xLDE1LjcsMzUuMSwzNUM2NDAuNSw0NDkuMyw2MjQuOCw0NjUsNjA1LjQsNDY1eiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjxwYXRoIGQ9Ik02MDUuNCw2NDAiIHN0eWxlPSJmaWxsOiNGRkZGRkYiPjwvcGF0aD48L2c+PC9zdmc+ICA=)'
		},
		backgroundColor: {
			mouseleave: '#eee',
			mouseenter: '#ea4335'
		},
		backgroundPosition: {
			mouseleave: '10px center',
			mouseenter: '74px center'
		},
		width: {
			mouseleave: '36px',
			mouseenter: '100px'
		},
		text: {
			mouseleave: '',
			mouseenter: copyTitle.title
		},
		textColor: {
			beforeCopy: '#fff',
			afterCopy: '#000'
		}
	};
	$("div.details-fixed-wrap").after(copyTitle.copyBtn);
	$(copyTitle.jQuerySelector).text(zcoolValue.text.mouseleave).css({
		'position': 'fixed',
		'display': 'block',
		'width': zcoolValue.width.mouseleave,
		'height': '36px',
		'right': '15px',
		'bottom': '152px',
		'background-image': zcoolValue.backgroundImage.mouseleave,
		'background-size': '16px auto',
		'background-repeat': 'no-repeat',
		'background-position': zcoolValue.backgroundPosition.mouseleave,
		'background-color': zcoolValue.backgroundColor.mouseleave,
		'border-radius': '4px',
		'text-indent': '-26px',
		'font-size': '12px',
		'line-height': '36px',
		'text-align': 'center',
		'color': zcoolValue.textColor.beforeCopy,
		'z-index': '9999'
	}).hover(function() {
		$(this).css({
			'width': zcoolValue.width.mouseenter,
			'background-image': zcoolValue.backgroundImage.mouseenter,
			'background-color': zcoolValue.backgroundColor.mouseenter,
			'background-position': zcoolValue.backgroundPosition.mouseenter,
		});
		$(this).text(zcoolValue.text.mouseenter)
	}, function() {
		$(this).css({
			'width': zcoolValue.width.mouseleave,
			'background-image': zcoolValue.backgroundImage.mouseleave,
			'background-color': zcoolValue.backgroundColor.mouseleave,
			'background-position': zcoolValue.backgroundPosition.mouseleave,
		});
		$(this).text(zcoolValue.text.mouseleave)
	}).on('click', function() {
		let copyText = $("div.fixed-details-title span.left").text();
		copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', zcoolValue.textColor.afterCopy)
	})
})();