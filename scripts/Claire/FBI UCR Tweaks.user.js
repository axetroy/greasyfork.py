// ==UserScript==
// @name         FBI UCR Tweaks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Tweaks to make the FBI's crime report site easier to use
// @author       Claire
// @include      https://ucr.fbi.gov/*
// @grant        GM_addStyle
// ==/UserScript==

var newCSS = `
    .tblTxt {
        font-size: .8em;
        font-style: italic;
        color: #666;
    }
`;
GM_addStyle(newCSS);

links = document.getElementsByClassName("arrow-left-small");
arr = [];
Array.prototype.forEach.call(links, function(el, i){
    if(el.title.length > 0) {
        t = document.createElement("div");
        t.id = "tbl" + el.text.split(" ")[1];
        t.className = "tblTxt";
        t.innerHTML = el.title;
        el.parentNode.insertBefore(t, el.nextSibling);

        br = document.getElementById(t.id).nextSibling;
        br.style.lineHeight = ".8em";
    }
});