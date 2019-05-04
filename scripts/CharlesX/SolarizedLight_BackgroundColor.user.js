// ==UserScript==
// @name         SolarizedLight_BackgroundColor
// @namespace    https://mpcx.me/
// @version      0.2
// @description  Set BackgroundColor of article page to base3 color of SolarizedLight Theme
// @author       CharlesMa
// @match        https://sspai.com/article/*
// @match        https://sspai.com/post/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    var article = "";
    switch (location.host) {
        case "sspai.com":
            var pageType = location.pathname.split('/')[1];
            if (pageType == "article") {
                article = document.getElementsByClassName("series-article-wrapper");
            }
            if (pageType == "post") {
                article = document.getElementsByClassName("article-wrapper");
            }
            break;
    }
    article[0].style.backgroundColor = "#fdf6e3";
}, false);