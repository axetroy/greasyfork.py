// ==UserScript==
// @name            CCNA 7 Enhancer
// @namespace       ccna7enhancerobp
// @author          OpenByte
// @icon            https://image.ibb.co/jvbZ5m/bdc94db26dd41501787438_ccnalogo.png
// @description     Adds various features to ccna7.com.
// @license         MIT License
// @encoding        utf-8
// @include         http*://ccna7.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require         https://greasyfork.org/scripts/27939-checkforbadjavascripts/code/checkForBadJavascripts.js?version=179364
// @require         https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=227108
// @version         0.4.0
// @run-at          document-start
// @grant           GM_addStyle
// @grant           GM.addStyle
// ==/UserScript==


if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        'use strict';
        if (this === null) {
            throw new TypeError('Array.prototype.includes called on null or undefined');
        }

        var O = Object(this);
        var len = parseInt(O.length, 10) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1], 10) || 0;
        var k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {
                k = 0;
            }
        }
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                return true;
            }
            k++;
        }
        return false;
    };
}


this.$ = this.jQuery = jQuery.noConflict(true);


documentStart();
$(document).on("DOMContentLoaded", documentEnd);



function documentStart() {
    checkForBadJavascripts([
        [
            true,
            /frustrate_copy\.js/,
            null
        ]
    ]);
}

function documentEnd() {
    if ($("li span[style*=color]").length !== 0) {
        var questions = [];
        $("h3").each(function() {
            var q = $(this).html();
            if (questions.includes(q))
                $(this).parent().remove();
            else questions.push(q);
        });


        $("<div class='toggleanswers'>Hide Answers</div>").appendTo(".site-content, [role=main], body").click(function() {
            $("body").toggleClass("no-answer-highlighting");
            $(this).html($(".no-answer-highlighting").length === 0 ? "Hide Answers" : "Show Answers");
        });


        GM_addStyle(".toggleanswers { position: fixed; bottom: 10px; right: 10px; padding: 10px; background-color: #445263; border-radius: 5px; color: white; cursor: pointer; border: 1px solid white; } .toggleanswers:hover { background-color: #516174; } .no-answer-highlighting li span { color: inherit !important; }  .no-answer-highlighting img[src*=Answer], .no-answer-highlighting a[href*=Answer] { visibility: hidden; }");
    }
    
    
    $("#heatmapthemead-credits").remove();


    GM_addStyle("body { -moz-user-select: initial !important; -webkit-user-select: initial !important; -moz-user-select: initial !important; -ms-user-select: initial !important; user-select: initial !important }");
}