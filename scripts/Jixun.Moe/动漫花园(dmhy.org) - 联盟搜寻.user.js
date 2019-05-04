// ==UserScript==
// @name        动漫花园(dmhy.org) - 联盟搜寻
// @namespace   org.jixun
// @description 利用外部脚本, 可以根据输入搜寻而非一个一个找
// @include     http://share.dmhy.org/topics/*
// @include     https://share.dmhy.org/topics/*
// @version     1.0.3
// @grant       none
// ==/UserScript==

(function () {
	var cdnRoot = '//cdn.bootcss.com/';

	function addBlock (name, attrs) {
		var block  = document.createElement(name);
		for (var attr in attrs) {
			if (attrs.hasOwnProperty(attr)) {
				block[attr] = attrs[attr];
			}
		}

		document.head.appendChild(block);
		return block;
	}

	function loadCSS (src) {
		return addBlock('link', {
			href: cdnRoot + src,
			rel:  'stylesheet'
		});
	}

	function injectScript (fnLoader) {
		return addBlock('script', {
			textContent: '(' + String(fnLoader) + ')();'
		});
	}

	function loadScripts (arrScripts, onloadComplete) {
		var total = arrScripts.length;
		var count = 0;
		var bDone = false;

		function loadNext () {
			if (bDone) return ;

			if (count >= total) {
				onloadComplete ();
				bDone = true;
			} else {
				addBlock('script', {
					src: cdnRoot + arrScripts[count],
					onload: loadNext
				});
				count++;
			}
		}
		loadNext ();
	}


	loadCSS('select2/4.0.0-rc.2/css/select2.min.css');

	loadScripts([
		'jquery/2.1.3/jquery.min.js',
		'select2/4.0.0-rc.2/js/select2.js',
		'select2/4.0.0-rc.2/js/i18n/zh-TW.js'
	], function () {
		injectScript(function () {
			var $ = jQuery.noConflict();
			window.jQuery = window.$;

			function patchFunction (fn, patcher) {
				var _fn = fn.toString();

				var $r = patcher(_fn.match(/\{([\s\S]*)\}/)[1]);
				return new Function (_fn.match(/\(([\s\S]*?)\)/)[1], $r);
			}

			window.showHideAdvSearch = patchFunction(showHideAdvSearch, function (fn) {
				return fn.replace(/(load\(".+?")\)/, '$1, window.notifyAdvSearchOnload)');
			});

			window.notifyAdvSearchOnload = function () {
				$('#AdvSearch select').select2();
			};

			window.notifyAdvSearchOnload();
			setTimeout(window.notifyAdvSearchOnload, 500);
		});
	});
})();