// ==UserScript==
// @name         WordPress Find Articles By Classifying
// @name:zh-TW   WordPress通過分類查找文章
// @namespace    http://WWW.NTRSN.CN/
// @version      0.1
// @description:en Find Articles By Classifying,I hope to help you
// @description:zh-TW  引用請注明原作者
// @author       WWW.NTRSN.CN
// @match        */wordpress/wp-admin/edit.php*
// @supportURL   873248164@qq.com
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=873248164@qq.com&item_name=Greasy+Fork+donation
// @compatible   chrome
// @compatible   firefox
// @compatible   opera 未測試not test
// @compatible   safari 未測試not test
// @description Find Articles By Classifying,I hope to help you
// ==/UserScript==

(function() {
    'use strict';
    var list=document.getElementById('cat').cloneNode(true);
    document.getElementsByClassName('search-box')[0].appendChild(list);
    list.onchange=function(){
        var SelectValue=list.options[list.selectedIndex].textContent.replace(/^\s*|\s*$/g, "");
        document.getElementById('post-search-input').value=SelectValue;
        document.getElementById('search-submit').click();
    };
})();