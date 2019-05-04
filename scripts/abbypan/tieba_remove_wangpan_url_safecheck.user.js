// --------------------------------------------------------------------
//
// ==UserScript==
// @name          tieba_remove_wangpan_url_safecheck 
// @namespace     http://abbypan.github.io/
// @version       0.1
// @author        Abby Pan (abbypan@gmail.com)
// @description   移除百度贴吧中百度云链接safecheck跳转  
// @copyright     2017, Abby Pan (http://abbypan.github.io/) 
// @include       http://tieba.baidu.com/*
// @include       https://tieba.baidu.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
// @resource      jquery http://code.jquery.com/jquery-latest.js

var path = '//a';

var links = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (!links) return;

for (var i = 0; i < links.snapshotLength; i++) {
    var anode = links.snapshotItem(i);
    var s = anode.textContent || anode.innerText || ""; 
    if(s.match(/http:\/\/pan\.baidu\.com\/share\/link\?/)){
        anode.setAttribute('href', s);
    }
}
