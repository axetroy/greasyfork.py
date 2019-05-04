// ==UserScript==
// @name         解除getrelax.club防去广告屏蔽
// @namespace    http://cyd.space/
// @version      0.4
// @description  解除getrelax.club防去广告屏蔽。
// @author       CYD
// @match        https://getrelax.club/*
// @run-at      document-body
// @grant       none
// ==/UserScript==


(function() {
    //删除已有节点
    var adDiv = window.document.getElementsByClassName("playno1_ad_test");
    if(adDiv.length !== 0){
    	adDiv[0].parentNode.removeChild(adDiv[0]);
    }
    //嫁接新的div到body防止对于布局的干扰
	var nDiv = window.document.createElement("div");
	nDiv.className = "playno1_ad_test";
	nDiv.style = "height:101px;visibility:hidden;";
	window.document.body.insertBefore(nDiv,window.document.body.firstChild);
})();