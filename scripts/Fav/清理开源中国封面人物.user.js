// ==UserScript==
// @name         清理开源中国封面人物
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://gitee.com/*
// @match        http://www.oschina.net/*
// @match        https://www.oschina.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function remove(className){
        var items = document.getElementsByClassName(className);
        if(items != null && items.length >0){
            var item = items[0];
            if(item != null )
            {
                item.remove();
            }
        }
    }
    remove('float-left-box');
    remove('float_adbox');

    // Your code here...
})();
