// ==UserScript==
// @name         Unique Interest Audit (keyword relevance)
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  stuff
// @author       Cuyler
// @include      https://s3.amazonaws.com/mturk_bulk/hits/*
// @include      https://www.mturkcontent.com/dynamic/hit*
// @grant        none
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    var instructions = document.querySelectorAll("strong")[1];

    if( ! instructions ) { console.log("not a keyword relevance audit (no instruction div)"); return;}
    if( ! instructions.textContent.includes("Is the keyword uniquely relevant to the interest?")) { console.log("not a keyword relevance audit"); return; }

    console.log("Is a relevant interest audit");

    instructions.style.display = "none";

    var uniqueRelevanceQuestion = document.querySelector("p[style='text-align:center; font-size:2.0em; margin-top:60px;']");
    var uniqueRelevanceQuestionText = uniqueRelevanceQuestion.textContent.trim();
    console.log(uniqueRelevanceQuestionText);

    var matches = uniqueRelevanceQuestionText.match(/'.*?'/gi);
    var keywordText = matches[0];
    var interestText = matches[1];

    uniqueRelevanceQuestion.innerHTML = "<span style='color:red;'>" + keywordText + "</span>" + " associated ONLY with " + "<span style='color:blue;'>" + interestText + "</span>";
    uniqueRelevanceQuestion.style.fontSize = "3.0em";

    document.querySelector("textarea").style.display = "none";

    document.querySelector('p[style="font-size:1.5em;"]').style.display = "none";
    document.querySelector('p[style="font-size:1.5em; margin-top:30px;"]').style.display = "none";
    document.querySelector('fieldset[style="padding-top:10px;"]').style.display = "none";

    document.querySelector(".panel.panel-primary").style.display = "none";

})();