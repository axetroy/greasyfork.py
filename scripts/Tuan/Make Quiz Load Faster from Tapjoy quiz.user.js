// ==UserScript==
// @name         Make Quiz Load Faster from Tapjoy quiz
// @namespace    Tuan
// @author       Tuan
// @copyright    Tuan
// @version      1.2
// @change-log   Add support videoquizhero.com
// @description  Script remove waste waiting time click "Next" and remove quiz image for faster loading when you play Tapjoy quiz.
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// @match        https://quizdelivery.com/*
// @match        https://gimmemore.com/*
// @match        https://quiz-facts.com/*
// @match        https://quizberries.com/*
// @match        https://videoquizhero.com/*
// ==/UserScript==

jQuery.noConflict();
(function() {
    // if button next not showing
    $(document).ready(function() {
        //remove question image
        $(".game-question-image").html("");

        if ($("a.btn").length === 0) {
            location.reload();
        }
        else {
            // auto skip ads and forward to next question
            var link = $(".btn").attr('href');
            if (link && (link.indexOf("/question/") > -1 || link.indexOf("/calculating/") > -1 || link.indexOf("/complete/") > -1)) {
                window.location = link;
            }
        }
    });
})();