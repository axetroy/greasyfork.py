// ==UserScript==
// @name        MathJax Tieba
// @namespace   http://jixun.org/
// @description 调用 MathJax 在贴吧渲染 :3
// @include     http://tieba.baidu.com/*
// @version     1
// @grant       none
// @run-at      document-start
// ==/UserScript==

addEventListener('DOMContentLoaded', function () {
	console.log ('MathJax START');
	var config  = document.createElement ('script'),
		mathJax = document.createElement ('script');

	config.innerHTML = ';MathJax.Hub.Config({tex2jax:{inlineMath:[["$","$"],["\\(","\\)"]]}});';
	config.setAttribute ('type', 'text/x-mathjax-config');
	mathJax.setAttribute ('src', '//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML');

	document.body.appendChild (config);
	document.body.appendChild (mathJax);
	console.log ('MathJax FINISH');
}, false);