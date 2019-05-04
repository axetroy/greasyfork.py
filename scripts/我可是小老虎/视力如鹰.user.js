// ==UserScript==
// @name         视力如鹰
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  眼护士(http://eyenurse.net/)游戏页面辅助点击脚本
// @author       dongdong
// @match        http://m.eyenurse.net/wxaward/html5/games/eye/?share=1&from=timeline&isappinstalled=0
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(()=>{
        var thebox = document.getElementById("box");
        var first = thebox.firstElementChild;
        var second = first.nextElementSibling;
        var third = second.nextElementSibling;

        var f_style = first.getAttribute("style");
        var s_style = second.getAttribute("style");
        var t_style = third.getAttribute("style");

        var common_style;
        if ((f_style == s_style) || (f_style == t_style)) {
            common_style = f_style;
        } else {
            common_style = t_style;
        }

        var childs = thebox.childNodes;
        for (let i = 0; i < childs.length; i++) {
            let style = childs[i].getAttribute("style");
            if (style != common_style) {
                childs[i].setAttribute('style', 'background-color: #F56A47;');
                //childs[i].click();
            }
        }
    }, 800);
})();