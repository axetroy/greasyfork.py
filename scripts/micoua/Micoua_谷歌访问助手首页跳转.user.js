// ==UserScript==
// @name         Micoua_谷歌访问助手首页跳转
// @version      1.0.0
// @author       micoua
// @namespace    https://greasyfork.org/zh-CN/users/162781
// @description  将谷歌访问助手强制要求首页设置修改为自定义首页

// @include      *

//               ↓ jQuery核心文件 ↓
// @require      https://greasyfork.org/scripts/39025-micoua-jquery-min-js/code/Micoua_jQuery_min_js.js?version=255336
//               ↓ jQueryUI核心文件 ↓
// @require      https://greasyfork.org/scripts/40306-micoua-jqueryui-min-js/code/Micoua_jQueryUI_min_js.js?version=267377

// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// ==/UserScript==

(function () {
    /**
     * 主入口
     */
    function main() {
        gotoWeb(); // 跳转网页
    }

    /**
     * 全局变量
     */
    var currentURL = window.location.href; // 获取当前网页地址
    var url = "https://www.baidu.com/"; // 预定义跳转网页

    /**
     * 跳转网页
     */
    gotoWeb = function () {
        /** 定义拦截网页 */
        var urls = {
            "googleHelpURLs": [
                "123.hao245.com",
                "360.hao245.com",
                "hao123.com/?tn="
            ]
        };
        /** 拦截网站并跳转 */
        var googleHelpURLs = GM_getValue("googleHelpURLs") === undefined ? urls.googleHelpURLs : $.merge(GM_getValue("googleHelpURLs"), urls.googleHelpURLs);
        for (var i = 0; i < googleHelpURLs.length; i++) { if (currentURL.indexOf(googleHelpURLs[i]) != -1) { window.location.href = url; return; } }
    };

    /**
     * 加载完所有数据后进入主函数
     */
    if (true) main();
})();