 // ==UserScript==
// @name         重定向法移除百家号
// @version      0.5
// @description  添加搜索参数后刷新页面以去除百家号内容
// @author       bonboru93
// @match        http://www.baidu.com/s?*
// @match        https://www.baidu.com/s?*
// @run-at       document-start
// @namespace https://greasyfork.org/users/208121
// ==/UserScript==

(function() {
    if (document.getElementById("kw").value.indexOf("-baijiahao") > 0) return;
    window.location.replace("s?wd=" + document.getElementById("kw").value + "+-baijiahao");
})();