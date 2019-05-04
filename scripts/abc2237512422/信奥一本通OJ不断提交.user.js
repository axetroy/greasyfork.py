// ==UserScript==
// @name         信奥一本通OJ不断提交
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  信奥一本通OJ有提交40s的限制，这个脚本可以帮你自动重新提交代码。
// @author       abc2237512422
// @match        http://ybt.ssoier.cn:8088/action.php
// @match        https://ybt.ssoier.cn:8088/action.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

function sleep(numberMillis) {
	var now = new Date();
	var exitTime = now.getTime() + numberMillis;
	while (true) {
		now = new Date();
		if (now.getTime() > exitTime)
		return;
	    }
}

    var tmp=document.getElementsByTagName("body")[0];
    var text=tmp.innerText;
    if(text.indexOf("提交频繁")!=-1){
        var warn=document.getElementsByTagName("h1")[0];
        warn.innerText="<title>自动提交中... - 信息学奥赛一本通（C++版）</title>提交频繁，正在自动帮您重新提交中，请等待...."
        sleep(1000);
        warn.innerText="提交频繁，正在自动帮您重新提交中，请等待...."
        location.reload();
    }
    // Your code here...
})();