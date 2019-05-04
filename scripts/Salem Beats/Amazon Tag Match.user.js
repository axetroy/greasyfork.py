// ==UserScript==
// @name         Amazon Tag Match
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  "Compare the image with the tag." OK. Done.
// @author       Cuyler
// @include      https://s3.amazonaws.com/mturk_bulk/hits/*
// @grant        none
// @icon         http://ez-link.us/sb-png
// ==/UserScript==

(function() {
    'use strict';

    var instructionsTd = document.querySelector("#instructions");

    if(!instructionsTd) {return;}
    if(!instructionsTd.innerText.toLowerCase().includes("compare the image with the tag.")) {return;}


    // Your code here...

    var tag = document.querySelector("b");
    tag.style.fontSize = "3.0em";
    tag.style.color = "red";
    var tagName = tag.innerText;

    document.addEventListener('keydown',handleNumbers);
})();

function handleNumbers(e){
    var code = e.keyCode;
    let doSubmit = false;

    if(code == 49 || code == 97 || code == 90){
        doSubmit = true;
        document.querySelector("input[value='Relevant']").click();
    }
    if(code == 50 || code == 98 || code == 88){
        doSubmit = true;
        document.querySelector("input[value='Irrelevant']").click();
    }

    if(doSubmit) {
        document.querySelector("#submitButton").click();
    }
}