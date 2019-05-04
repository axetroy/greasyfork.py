// ==UserScript==
// @name         微信页面自动滚动到最顶部
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  try to take over the world!
// @author       You
// @match        http://mp.weixin.qq.com/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function () {
        //window.scrollTo(0,0);
        setTimeout(function(){window.scrollTo(0,0);},1000);
        
        //两个按钮
        //top button
var a = document.createElement('span');
var c = 'opacity:0.5;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:#0c9;border-radius:0px 0px 0px 0px;cursor:pointer;position:fixed;bottom:50%;width:36px;height:36px;right:10px;z-index:9999';
a.style.cssText = c;
a.addEventListener('mouseover', function(){ a.style.opacity = 1;}, false);
a.addEventListener('mouseout', function(){ a.style.opacity = 0.5; }, false);
a.addEventListener('click', function(){ window.scrollTo(0,0); }, false);
document.body.appendChild(a);



//bottom button
var newHeight = document.body.scrollHeight;
var b = document.createElement('span');
var d = 'opacity:0.5;-moz-transition-duration:0.2s;-webkit-transition-duration:0.2s;background:#0c9;border-radius:0px 0px 0px 0px;cursor:pointer;position:fixed;bottom:42%;width:36px;height:36px;right:10px;z-index:9999';//top:52%;
b.style.cssText = d;
b.addEventListener('mouseover', function(){ b.style.opacity = 1; }, false);
b.addEventListener('mouseout', function(){ b.style.opacity = 0.5; }, false);
b.addEventListener('click', function(){ window.scrollTo(0,newHeight); }, false);
document.body.appendChild(b);

var lastScrollY=0;
(function gotop(){
	var diffY;
        diffY = document.documentElement.scrollTop+document.body.scrollTop;
	percent=.1*(diffY-lastScrollY);
	if(percent>0)percent=Math.ceil(percent);
	else percent=Math.floor(percent);
	lastScrollY=lastScrollY+percent;
	if(lastScrollY>100){
	a.style.display="block";b.style.display="block";
	} else {
        b.style.display="block";a.style.display="none";
	}
        setTimeout(gotop,1);
})();
    });
})();