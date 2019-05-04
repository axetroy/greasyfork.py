// ==UserScript==
// @name         Paradox Plaza 降低对比度
// @namespace    https://gqqnbig.me
// @version      0.1
// @description  去除forum.paradoxplaza.com帖子的黑色背景
// @author       gqqnbig
// @match        https://forum.paradoxplaza.com/forum/index.php?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    for(var i=0;i<document.styleSheets.length;i++)
    {
        if(!document.styleSheets[i].rules)
            continue;
        for(var j=0;j<document.styleSheets[i].rules.length;j++)
        {
            if(document.styleSheets[i].rules[j].selectorText &&
               document.styleSheets[i].rules[j].selectorText.trim()===".paradox_developer_message_test .primaryContent")
            {
                document.styleSheets[i].rules[j].style.removeProperty("background-color");
                return;
            }
        }
    }
})();