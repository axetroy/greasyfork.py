// ==UserScript==
// @name            CCNA AnswerSites Enhancer
// @namespace       ccnaasenhancerobp
// @author          OpenByte
// @icon            https://image.ibb.co/jvbZ5m/bdc94db26dd41501787438_ccnalogo.png
// @description     Adds various features to sites which contain answers to CiscoAcademy Assignments.
// @license         MIT License
// @encoding        utf-8
// @include         http*://ccna7.com/*
// @include         http*://ccnav6.com/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require         https://greasyfork.org/scripts/27939-checkforbadjavascripts/code/checkForBadJavascripts.js?version=179364
// @require         https://greasyfork.org/scripts/34555-greasemonkey-4-polyfills/code/Greasemonkey%204%20Polyfills.js?version=227108
// @version         0.5.0
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


var site = -1;
var sites = ["ccna7.com", "ccnav6.com"];
for (var i in sites)
    if (location.href.includes(sites[i]))
        site = i;


documentStart();
$(document).on("DOMContentLoaded", documentEnd);

function documentStart() {
    switch (site-0) {
        case 0:
            checkForBadJavascripts([
                [
                    true,
                    /frustrate_copy\.js/,
                    null
                ]
            ]);
            break;
    }
}

function documentEnd() {
    switch (site-0) {
        case 0:
            if ($("li span[style*=color]").length !== 0) {
                removeDupQuestions("h3");

                addToggleAnswersButton();
                GM.addStyle(".no-answer-highlighting li span { color: inherit !important; } .no-answer-highlighting img[src*=Answer], .no-answer-highlighting a[href*=Answer] { visibility: hidden; }");
            }


            $("#heatmapthemead-credits").remove();


            GM.addStyle("body { -moz-user-select: initial !important; -webkit-user-select: initial !important; -moz-user-select: initial !important; -ms-user-select: initial !important; user-select: initial !important }");
            break;
        case 1:
            if ($("article li span[style*=color]").length !== 0) {
                removeDupQuestions("li > strong, p > strong");

                addToggleAnswersButton();
                GM.addStyle(".no-answer-highlighting article li span, .no-answer-highlighting article p span { color: inherit !important; }  .no-answer-highlighting article li span strong, .no-answer-highlighting article p span strong { font-weight: inherit !important }  .no-answer-highlighting img[src*=Answer], .no-answer-highlighting a[href*=Answer] { visibility: hidden; }");

                $("article li span strong, article p span strong").each(function() {
                    $(this).html($(this).text());
                });

                $("article li span, article p span").each(function() {
                    if ($(this).parent().length !== 0)
                        $(this).parent().html($(this).parent().html().trim().replace(/\*+/, ""));
                });
            }
            break;
    }
}


function removeDupQuestions(selector) {
    var questions = [];
    $(selector).each(function() {
        var q = $(this).html();
        if (questions.includes(q))
            $(this).parent().remove();
        else questions.push(q);
    });
}

function addToggleAnswersButton() {
    $("<div class='toggleanswers'>Hide Answers</div>").appendTo(".site-content, .main-container, [role=main], #blog, body").click(function() {
       $("body").toggleClass("no-answer-highlighting");
       $(this).html($(".no-answer-highlighting").length === 0 ? "Hide Answers" : "Show Answers");
    });

   GM.addStyle(".toggleanswers { position: fixed; bottom: 10px; right: 10px; padding: 10px; background-color: #445263; border-radius: 5px; color: white; cursor: pointer; border: 1px solid white; } .toggleanswers:hover { background-color: #516174; }");
}