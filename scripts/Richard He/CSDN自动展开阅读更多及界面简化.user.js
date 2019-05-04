// ==UserScript==
// @name       CSDN自动展开阅读更多及界面简化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description		如果有阅读更多按钮，将自动点击，去除一些无用元素
// @author       You
// @iconURL			https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3856144780,3450407977&fm=58
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
		var d = document;
		if(d.getElementById('btn-readmore')!=null)
		{
			d.getElementById('btn-readmore').click();								//auto click readmore button if exist
		}
		d.getElementsByClassName('pulllog-box')[0].style.display = '';			//block bottom csdn job oppotunity
		d.getElementsByClassName('meau-list')[0].style.display = 'none'; 		//block share menu
		d.getElementsByClassName('persion_article')[0].style.display = 'none'; //block csdn contack information block
		d.getElementsByClassName('edu-promotion')[0].style.display = 'none';	//block edu ads at the bottom of article
})();