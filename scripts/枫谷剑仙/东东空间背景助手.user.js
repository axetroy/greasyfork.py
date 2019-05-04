// ==UserScript==
// @name        东东空间背景助手
// @author      枫谷剑仙
// @namespace   http://www.mapaler.com/
// @description 让动漫东东空间背景图片路径可自定义
// @icon        http://www.mapaler.com/images/comicdd_logo_64x48.png
// @include     http://*/*space*diy=yes*
// @run-at      document-end
// @version     1.0.1
// @date        30/12/2014
// @modified    30/12/2014
// @grant       none
// ==/UserScript==
(function (){
	var pdiv = document.getElementById("controlnav");
	var navbgc = document.createElement('li'); //顶部列表
	navbgc.id = 'navbgc';
		//输入框
		var bgurlinput = document.createElement('input');
		bgurlinput.className="px vm";
		bgurlinput.style.cssText = [
				 ''
				,'font-size:12px'
				,'padding:2px'
				,''
		].join(';');
		bgurlinput.id = 'bgurlinput';
		//提交按钮
		var bgurlbutton = document.createElement('button');
		bgurlbutton.className="pn";
		bgurlbutton.onclick= function(e){spaceDiy.setBgImage(document.getElementById('bgurlinput').value)}
		bgurlbutton.innerHTML = "设置图片";
		bgurlbutton.id = 'sumbitbg_button';
	navbgc.appendChild(bgurlinput);
	navbgc.appendChild(bgurlbutton);
	pdiv.appendChild(navbgc);
})();