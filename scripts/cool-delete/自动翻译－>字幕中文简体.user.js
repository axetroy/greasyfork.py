// ==UserScript==
// @name         自动翻译－>字幕中文简体
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  translate to Chinese automatically.
// @author       qwertyuiop6
// @match        https://www.youtube.com/watch*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function translateToChinese(){
        var sub = $('[role="menuitem"]:contains("字幕")');
        if(!sub.length) return;
        sub.click();
        var subc = $('[role="menuitemradio"]:contains("中文（简体）")');
        if (subc.length) {
            subc.click();
        } else {
            var autoTrans = $('[role="menuitemradio"]:contains("自动翻译")');
            if (!autoTrans.length) return;
            autoTrans.click();
            var autoTransC = $('[role="menuitemradio"]:contains("中文（简体）")');
            if (!autoTransC.length) return;
            autoTransC.click();
        }
    }

    function onLoadStart(){
        $('.ytp-subtitles-button[aria-pressed="false"]').click();
        $('.ytp-settings-button').click();
        translateToChinese();
        $('.ytp-settings-button').click();
    }
    $('video').on('loadstart', onLoadStart).trigger('loadstart');
})();