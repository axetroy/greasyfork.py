// ==UserScript==
// @name         リサーチパネル（動画無視ボタン）
// @namespace    research-panel
// @version      0.1
// @description  カスみたいな金で動画を見せられるこちらの身にもなってみろ
// @author       nikukoppun
// @include      http://rsch.jp/*
// @include      https://rsch.jp/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let scriptHtml = '<script>\
        function gotoNextIgnoreVideo() {\
            document.formQ["next_button"].value = "val";\
            document.formQ.submit();\
        }\
        </script>';
    let buttonHtml = "\
        <div style='margin-top: 1rem;'>\
            <span style='cursor: pointer; border: 1px solid gray; padding: 0.5rem; background-color: #ffdfdf; width: 121px; height: 28px;' onclick='gotoNextIgnoreVideo(); return false;'>動画を無視して次に進む</span>\
        </div>";
    $("#progressbar").before(scriptHtml + buttonHtml);
})();
