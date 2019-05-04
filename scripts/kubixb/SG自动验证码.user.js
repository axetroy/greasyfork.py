// ==UserScript==
// @name         SG自动验证码
// @namespace   com.sgamer.bbs.farmkit
// @version      0.2
// @description  try to take over the world!
// @author       ?
// @include     http://bbs.sgamer.com/forum-*.html
// @include     http://bbs.sgamer.com/thread-*.html
// @include     http://bbs.sgamer.com/*mod=viewthread*
// @include     http://bbs.sgamer.com/*mod=forumdisplay*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
    var sm=document.getElementById("seccodeqS0_menu").innerHTML;
    var sq=document.getElementById("secqaaverify_qS0").value;
    if(sq==''){
        var s=sm.split("=");
        document.getElementById("secqaaverify_qS0").value=eval(s[0]);
    }
} ,1000);

    setInterval(function(){
    var sm=document.getElementById("seccodeqSA0_menu").innerHTML;
    var sq=document.getElementById("secqaaverify_qSA0").value;
    if(sq==''){
        var s=sm.split("=");
        document.getElementById("secqaaverify_qSA0").value=eval(s[0]);
    }
} ,1000);
})();