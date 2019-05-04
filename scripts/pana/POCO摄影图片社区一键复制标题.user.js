// ==UserScript==
// @name         POCO摄影图片社区一键复制标题
// @namespace    https://greasyfork.org/zh-CN/users/193133-pana
// @version      1.2.1
// @description  添加一个复制标题按钮
// @author       pana
// @include      http*://www.poco.cn/works/*
// @include      http*://www.poco.cn/activity/*
// @grant        none
// @require      https://greasyfork.org/scripts/376044-copytitle-js/code/copyTitlejs.js?version=657830
// ==/UserScript==

(function() {
	'use strict';
	const old_url = location.href;
	const iconUrl = {
		beforeCopy: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDUxMS4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiPjxwYXRoIGQ9Ik00MDc4LjEsNDk4NC4zYy0yNTQuNi02MC43LTQ5MC42LTI1Ny02MTQuNC01MDkuM2MtNjMuMS0xMjYuMS02NS40LTE0Ny4yLTcyLjQtNTU2bC05LjQtNDI3LjVoMzUyLjhoMzUyLjh2MzM2LjRjMCwzMjQuNywyLjMsMzQxLjEsNTYuMSw0MDQuMmw1Ni4xLDY1LjRoOTU1LjVoOTUzLjJsMTEuNy05MzQuNGwxMS43LTkzNC40bDY3LjctMTM1LjVjMTM3LjgtMjczLjMsMzkwLjEtNDU1LjUsNjkzLjgtNTA0LjZjODEuOC0xNCw1MDctMjUuNyw5NTAuOC0yNS43aDc5OVYtODUuMXYtMTg0Ny45bC02Ny44LTY3LjdsLTY3LjctNjcuOGgtNjkxLjVoLTY5MS41di0zNTIuN3YtMzUwLjRsNzc3LjksN2w3NzUuNiw3bDE1NC4yLDc0LjhjMTg2LjksOTEuMSwzNTAuNCwyNTkuMyw0MzYuOSw0NDYuMmw2My4xLDEzMy4ybDcsMjQ0MS4ybDQuNywyNDQxLjJMODIyOS40LDM4OTMuM0w3MTEyLjgsNTAxMGwtMTQ3MS44LTIuM0M0ODMyLjcsNTAwNS4zLDQxMjkuNSw0OTk2LDQwNzguMSw0OTg0LjN6IE03NzMxLjgsMzM4Ni40bDg5OS40LTg5OS40aC04NDhoLTg0OGwtNTYuMSw1OC40bC01OC40LDU2LjF2ODQzLjNjMCw0NjIuNSwyLjMsODQxLDcsODQxQzY4MzAuMSw0Mjg1LjgsNzIzNi42LDM4ODEuNyw3NzMxLjgsMzM4Ni40eiIgc3R5bGU9ImZpbGw6I0ZGRkZGRiI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjM1LjEsMjkyMS41Yy0yMzUuOS05NS44LTQwMS44LTI1Mi4zLTUwOS4zLTQ3OC45bC02MC43LTEzMC44bC03LTMxNjMuMWMtNC43LTI4NDAuNy0yLjMtMzE3OS40LDMyLjctMzI5My45Yzc0LjctMjYxLjYsMjQ1LjMtNDUzLjIsNTEzLjktNTc5LjRsMTM3LjgtNjUuNGgyMjkxLjdoMjI4OS40bDE3Ny42LDg4LjhjMjAzLjIsMTAwLjQsMzMxLjcsMjI4LjksNDMyLjIsNDM0LjVsNjUuNCwxMzAuOGw3LDI0NDEuMmw0LjcsMjQ0My42TDU0OTYuMiwxODYzLjNMNDM4MS44LDI5NzcuNkgyODcyLjdIMTM2NS45TDEyMzUuMSwyOTIxLjV6IE0zMzkxLjMsMTM0OS4zbDctOTI5LjhsNjAuNy0xMzAuOGMxMTQuNS0yNDAuNiwzMjcuMS00MjIuOCw1NzkuNC00OTcuNmMxMDcuNS0zMC40LDI3MS0zNy40LDk5OS45LTM3LjRoODcxLjR2LTE4NTQuOXYtMTg1Ny4ybC01Ni4xLTY1LjRsLTU2LjEtNjUuNEgzNjMxLjlIMTQ2Ni40bC01Ni4xLDY1LjRsLTU2LjEsNjUuNHYzMDQ4LjZ2MzA1MWw2Ny43LDY3LjdsNjcuNyw2Ny43aDk0OC41aDk0Ni4xTDMzOTEuMywxMzQ5LjN6IE01ODg2LjMsNDczLjNjMC0xMS43LTM3My44LTE4LjctODMxLjctMTguN0g0MjIzbC02Ny43LDY3LjhsLTY3LjcsNjcuN3Y4NTAuNHY4NDhsODk5LjQtODk5LjRDNTQ4Mi4xLDg5My44LDU4ODYuMyw0ODIuNiw1ODg2LjMsNDczLjN6IiBzdHlsZT0iZmlsbDojRkZGRkZGIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA==)',
		afterCopy: 'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMDAgMTAwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwMCAxMDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPG1ldGFkYXRhPiDnn6Lph4/lm77moIfkuIvovb0gOiBodHRwOi8vd3d3LnNmb250LmNuLyA8L21ldGFkYXRhPjxnPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLDUxMS4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiPjxwYXRoIGQ9Ik00MDc4LjEsNDk4NC4zYy0yNTQuNi02MC43LTQ5MC42LTI1Ny02MTQuNC01MDkuM2MtNjMuMS0xMjYuMS02NS40LTE0Ny4yLTcyLjQtNTU2bC05LjQtNDI3LjVoMzUyLjhoMzUyLjh2MzM2LjRjMCwzMjQuNywyLjMsMzQxLjEsNTYuMSw0MDQuMmw1Ni4xLDY1LjRoOTU1LjVoOTUzLjJsMTEuNy05MzQuNGwxMS43LTkzNC40bDY3LjctMTM1LjVjMTM3LjgtMjczLjMsMzkwLjEtNDU1LjUsNjkzLjgtNTA0LjZjODEuOC0xNCw1MDctMjUuNyw5NTAuOC0yNS43aDc5OVYtODUuMXYtMTg0Ny45bC02Ny44LTY3LjdsLTY3LjctNjcuOGgtNjkxLjVoLTY5MS41di0zNTIuN3YtMzUwLjRsNzc3LjksN2w3NzUuNiw3bDE1NC4yLDc0LjhjMTg2LjksOTEuMSwzNTAuNCwyNTkuMyw0MzYuOSw0NDYuMmw2My4xLDEzMy4ybDcsMjQ0MS4ybDQuNywyNDQxLjJMODIyOS40LDM4OTMuM0w3MTEyLjgsNTAxMGwtMTQ3MS44LTIuM0M0ODMyLjcsNTAwNS4zLDQxMjkuNSw0OTk2LDQwNzguMSw0OTg0LjN6IE03NzMxLjgsMzM4Ni40bDg5OS40LTg5OS40aC04NDhoLTg0OGwtNTYuMSw1OC40bC01OC40LDU2LjF2ODQzLjNjMCw0NjIuNSwyLjMsODQxLDcsODQxQzY4MzAuMSw0Mjg1LjgsNzIzNi42LDM4ODEuNyw3NzMxLjgsMzM4Ni40eiIgc3R5bGU9ImZpbGw6I2Y0YzYwMCI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjM1LjEsMjkyMS41Yy0yMzUuOS05NS44LTQwMS44LTI1Mi4zLTUwOS4zLTQ3OC45bC02MC43LTEzMC44bC03LTMxNjMuMWMtNC43LTI4NDAuNy0yLjMtMzE3OS40LDMyLjctMzI5My45Yzc0LjctMjYxLjYsMjQ1LjMtNDUzLjIsNTEzLjktNTc5LjRsMTM3LjgtNjUuNGgyMjkxLjdoMjI4OS40bDE3Ny42LDg4LjhjMjAzLjIsMTAwLjQsMzMxLjcsMjI4LjksNDMyLjIsNDM0LjVsNjUuNCwxMzAuOGw3LDI0NDEuMmw0LjcsMjQ0My42TDU0OTYuMiwxODYzLjNMNDM4MS44LDI5NzcuNkgyODcyLjdIMTM2NS45TDEyMzUuMSwyOTIxLjV6IE0zMzkxLjMsMTM0OS4zbDctOTI5LjhsNjAuNy0xMzAuOGMxMTQuNS0yNDAuNiwzMjcuMS00MjIuOCw1NzkuNC00OTcuNmMxMDcuNS0zMC40LDI3MS0zNy40LDk5OS45LTM3LjRoODcxLjR2LTE4NTQuOXYtMTg1Ny4ybC01Ni4xLTY1LjRsLTU2LjEtNjUuNEgzNjMxLjlIMTQ2Ni40bC01Ni4xLDY1LjRsLTU2LjEsNjUuNHYzMDQ4LjZ2MzA1MWw2Ny43LDY3LjdsNjcuNyw2Ny43aDk0OC41aDk0Ni4xTDMzOTEuMywxMzQ5LjN6IE01ODg2LjMsNDczLjNjMC0xMS43LTM3My44LTE4LjctODMxLjctMTguN0g0MjIzbC02Ny43LDY3LjhsLTY3LjcsNjcuN3Y4NTAuNHY4NDhsODk5LjQtODk5LjRDNTQ4Mi4xLDg5My44LDU4ODYuMyw0ODIuNiw1ODg2LjMsNDczLjN6IiBzdHlsZT0iZmlsbDojZjRjNjAwIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4gIA==)'
	};
	const backgroundColor = {
		mouseleave: 'rgba(0, 0, 0, 0.4)',
		mouseenter: 'rgba(0, 0, 0, 0.6)'
	};
	const textColor = {
		afterCopy: '#f60'
	};
	const urlListener = {
		works: 'poco.cn/works/works_list',
		activity: 'poco.cn/activity/detail'
	};

	function copyMainFunction() {
		if ($(copyTitle.jQuerySelector).length === 0) {
			$("h4.cc_info_title").after(copyTitle.copyBtn);
			$(copyTitle.jQuerySelector).text(copyTitle.title).css({
				'font-size': '14px',
				'text-decoration': 'underline'
			}).on('click', function() {
				let copyText = $("h4.cc_info_title").text();
				copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'color', textColor.afterCopy)
			})
		}
		if ($("div.cc_date").length === 0) {
			let dateBtn = '<div title="日期" class="cc_date"><bdo id="datebtn"></bdo></div>';
			$("div.cc_views").after(dateBtn);
			$("div.cc_date").css({
				'color': '#999',
				'font-size': '14px',
				'height': '24px',
				'line-height': '24px',
				'display': 'inline-block'
			});
			let dateString = $("dl.cc_mod dd").eq(0).text();
			if ((dateString === "") && ($("div.cc_date").length !== 0)) {
				var dateStringTime = setInterval(function() {
					dateString = $("dl.cc_mod dd").eq(0).text();
					if (dateString !== "") {
						$("bdo#datebtn").text(dateString);
						clearInterval(dateStringTime)
					}
				}, 1000)
			} else {
				$("bdo#datebtn").text(dateString)
			}
		}
	}
	function blogCopyMainFunction() {
		$("div.w_btn_go_top").before(copyTitle.copyBtn);
		$(copyTitle.jQuerySelector).css({
			'display': 'block',
			'position': 'fixed',
			'right': '40px',
			'bottom': '160px',
			'width': '44px',
			'height': '44px',
			'background-color': backgroundColor.mouseleave,
			'z-index': '100',
			'background-image': iconUrl.beforeCopy,
			'background-repeat': 'no-repeat',
			'background-size': '32px auto',
			'background-position': 'center'
		}).hover(function() {
			$(this).css({
				'background-color': backgroundColor.mouseenter
			})
		}, function() {
			$(this).css({
				'background-color': backgroundColor.mouseleave
			})
		}).on('click', function() {
			let copyText = $("div.work_wrap h4").eq(0).text();
			copyTitle.copyString(copyText, $(copyTitle.jQuerySelector), 'background-image', iconUrl.afterCopy)
		})
	}
	function init() {
		if ($("div.w_poco_image_preview_v2").length !== 0) {
			copyMainFunction();
			let screenchange = new MutationObserver(function() {
				copyMainFunction()
			});
			let screenchangeContainer = document.querySelector('div.w_poco_image_preview_v2');
			let screenchangeOption = {
				'childList': true
			};
			screenchange.observe(screenchangeContainer, screenchangeOption)
		}
		if ($("div.cc_detail_blog").length !== 0) {
			blogCopyMainFunction()
		}
	}
	init();
	for (let i in urlListener) {
		if (old_url.indexOf(urlListener[i]) !== -1) {
			let observer = new MutationObserver(function() {
				init()
			});
			let listenerContainer = document.querySelector("div.w_poco_works_detail");
			let option = {
				'childList': true
			};
			observer.observe(listenerContainer, option)
		}
	}
})();