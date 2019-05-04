// ==UserScript==
// @locale        us_EN
// @name          Mr Money Mustache
// @author        James Wilson http://twitter.com/jwilson3
// @namespace     mrmoneymustache.com
// @description   A custom CSS file to make MrMoneyMustache.com more readable, now with improved responsive support.
// @include       http://www.mrmoneymustache.com/*
// @include       http://mrmoneymustache.com/*
// @include       https://www.mrmoneymustache.com/*
// @include       https://mrmoneymustache.com/*
// @version 0.2.2
// ==/UserScript==


function addStyle(style) {
var head = document.getElementsByTagName("HEAD")[0];
var ele = head.appendChild(window.document.createElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import "https://cdn.rawgit.com/jameswilson/2a00792310896381e577/raw/7aff0e7e220acddf3e491b3dbced1fc0acbe66d3/MrMoneyMustache.css";');
