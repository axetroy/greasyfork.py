// ==UserScript==
// @name         Cuyler's Engaging News Project
// @namespace    salembeats
// @version      1
// @description  .
// @author       Cuyler Stuwe
// @include      *
// @grant        none
// ==/UserScript==

(function main() {
    if(window === window.top) {return;}
    let sitePara = document.querySelector("div~p");
    if(!sitePara) {return;}
    let siteParaText = sitePara.innerText.trim();

    let urlMatch = siteParaText.match(/: (.+?\..{2,3})$/)[1];
    if(!urlMatch) {return;}
    var newWindow = window.open(`http://www.${urlMatch}/`,"csName");
})();