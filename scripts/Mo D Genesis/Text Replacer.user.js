// ==UserScript==
// @name         Text Replacer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  text replacer
// @author       You
// @match          *://*.youtube.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$(document).ready(function() {
    //execute the script when a youtube element appears.
    var checkExist = setInterval(function() {
        if ($('.style-scope .ytd-video-primary-info-renderer').length) {
            clearInterval(checkExist);
            ExecuteScript();
        }
    }, 100);
});

var dict = [];

// you can add another replace here. simply copy and paste the first example below. and change the text.
dict.push({
    key: "MGTOW",
    value: "TTI"
});


//end of text to change

function ExecuteScript() {
    for (var i = 0; i < dict.length; i++) {
        ReplaceText(dict[i].key, dict[i].value);
    }
}

function ReplaceText(textFromWebsite, textToReplaceItWith) {
    $('body :not(script)').contents().filter(function() {
        return this.nodeType === 3;
    }).replaceWith(function() {
        var regEx = new RegExp(textFromWebsite, "ig");
        return this.nodeValue.replace(regEx, textToReplaceItWith);
    });
}
