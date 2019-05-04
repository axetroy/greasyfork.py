// ==UserScript==
// @name         自动添加补全磁力链接和百度网盘前缀
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  自动添加补全磁力链接和百度网盘前缀自动跳转
// @author       violet
// @include      *
// @match        *
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
function withjQuery(callback) {
 if(!(window.jQuery)) {
 var js = document.createElement('script');
 js.setAttribute('src', 'http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js');
 js.setAttribute('type', 'text/javascript');
 js.onload = js.onreadystatechange = function() {
  if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
    if(callback && typeof callback === "function") {
     callback();
    }
   js.onload = js.onreadystatechange = null;
  }
 };
 document.getElementsByTagName('head')[0].appendChild(js);
 }
}

(function() {
    document.body.addEventListener('copy', function(e) {
	 var  CopyText = window.getSelection().toString().trim();
	  var reg = /^[0-9a-zA-Z]{40}$/;
	  var regPan = /^[0-9a-zA-Z]{8}$/;
	  if(reg.test(CopyText)){
		  var url = 'magnet:?xt=urn:btih:' + CopyText;
	     e.clipboardData.setData('text/plain', url);
  		 e.preventDefault();
  		return;
	  }
	  else if(regPan.test(CopyText)){
		  var url = 'https://pan.baidu.com/s/' + CopyText;
		     e.clipboardData.setData('text/plain', url);
	  		 e.preventDefault();
	  		 window.open(url,'_blank');
	  		return;
	  }
 });

})();


})();



