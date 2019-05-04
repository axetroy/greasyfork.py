// ==UserScript==
// @name         CSDN免登录自动阅读更多
// @namespace    http://tampermonkey.net/
// @version      1
// @description	 自动点击阅读更多按钮，CSDN未登录时也避免跳转登录界面。去除了一些无用元素。
// @author       443
// @iconURL		 https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3856144780,3450407977&fm=58
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
		var d = document;
		window.csdn.anonymousUserLimit.judgement = function() {
            return !0;
        };
        if(d.getElementById('btn-readmore')!=null)
		{
			d.getElementById('btn-readmore').click();
		}
		d.getElementsByClassName('pulllog-box')[0].style.display = '';			
		d.getElementsByClassName('meau-list')[0].style.display = 'none'; 	
		d.getElementsByClassName('persion_article')[0].style.display = 'none'; 
		d.getElementsByClassName('edu-promotion')[0].style.display = 'none';
})();