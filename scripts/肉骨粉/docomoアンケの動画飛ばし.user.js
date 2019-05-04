// ==UserScript==
// @name         docomoアンケの動画飛ばし
// @namespace    docomo_unko
// @version      0.1
// @description  カスみたいな金で動画を見せられるこちらの身にもなってみろ
// @author       nikukoppun
// @include      https://survey-z.com/wix/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let styleHtml = '<style>\
        .utilButton {\
            cursor: pointer;\
            border: 1px solid gray;\
            padding: 0.5rem;\
            background-color: lightgray;\
            height: 21px;\
            display: inline-block;\
        }\
    </style>';

    let scriptHtml = '<script>\
    	function next() {\
			$("#forwardbutton").click();\
		}\
    </script>';

    let buttonHtml = "\
        <div style='margin-top: 1rem;'>\
            <span class='utilButton' onclick='next(); return false;'>次に進む</span>\
        </div>";

    $("table.pagearea").before(styleHtml + scriptHtml + buttonHtml);

})();