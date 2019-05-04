// ==UserScript==
// @name        Fuck知乎隐私策略
// @namespace   FuckPrivacyPolicy@Zhihu
// @description 屏蔽知乎隐私策略提示
// @include     http://www.zhihu.com/
// @include     http://www.zhihu.com/*
// @include     https://www.zhihu.com/
// @include     https://www.zhihu.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

//如果你不想点同意……
//swoosh是ios里面的一个铃声。就是“嗖~”的一声。
//看到已经有朋友实现了功能了，但是挺奇怪，我这边onload、ready、setTimeout都不能确保脚本在隐私策略显示之后运行，所以又写了个

function swoosh() {
    if(document.readyState == 'complete')
    document.getElementsByClassName('Modal-wrapper')[0].remove();
    document.getElementsByTagName('html')[0].style.overflow = 'visible';
    //alert('haha');
}

(function() {
    'use strict';
    document.onreadystatechange = swoosh;
})();

