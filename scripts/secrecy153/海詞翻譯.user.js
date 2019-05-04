// ==UserScript==
// @name            海詞翻譯
// @description     海詞Dict.cn劃詞翻譯
// @exclude         http://dict.cn/*
// @include         *
// @grant           none
// @version 0.0.1.20160621062538
// @namespace https://greasyfork.org/users/8461
// ==/UserScript==

void((function() {var element=document.createElement('script'); element.setAttribute('src', 'http://dict.cn/hc/init.php'); document.body.appendChild(element);})())