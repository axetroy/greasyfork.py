// ==UserScript==
// @name         四川大学课程中心辅助使用插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fix some bugs on cc.scu,edu.cn
// @author       Julydate
// @match        http://cc.scu.edu.cn/G2S/ShowSystem/Index.aspx
// @match        https://cc.scu.edu.cn/G2S/ShowSystem/Index.aspx
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById('ctl00_divOnLogin').style.zIndex='1000';
})();