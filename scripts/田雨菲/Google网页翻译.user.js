// ==UserScript==
// @name         Google网页翻译
// @namespace    https://greasyfork.org/zh-CN/users/150560
// @version      1.1
// @description  不跳转Google翻译页面的整页翻译
// @author       田雨菲
// @match        http://*/*
// @include      https://*/*
// @include      file://*/*
// @run-at document-end
// ==/UserScript==

(function () {
    'use strict';
    var userLang = document.documentElement.lang;
    
    if (userLang!=="" && userLang.substr(0, 2) != "zh") {
        var script = document.createElement('script');
        script.src = '//translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit';
        document.getElementsByTagName('head')[0].appendChild(script);

        var google_translate_element = document.createElement('div');
        google_translate_element.id = 'google_translate_element';
        google_translate_element.style = 'position:fixed; bottom:10px; right:10px; cursor:pointer;';
        document.documentElement.appendChild(google_translate_element);

        script = document.createElement('script');
        script.innerHTML = "function googleTranslateElementInit() {" +
            "new google.translate.TranslateElement({" +
            "layout: google.translate.TranslateElement.InlineLayout.SIMPLE," +
            "multilanguagePage: true," +
            "pageLanguage: 'auto'," +
            "includedLanguages: 'zh-CN,zh-TW,en'" +
            "}, 'google_translate_element');}";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();