// ==UserScript==
// @name         remove reddit ads
// @namespace    https://www.reddit.com/
// @version      0.5
// @description  remove reddit post ads
// @author       cloudwalkerfree@gmail.com
// @include      https://www.reddit.com/
// @include      https://www.reddit.com/r/*
// @grant        none
// ==/UserScript==

const rere =() => {Array.from(document.getElementsByClassName('promotedlink')).forEach( i => i.remove() & console.log('%c[REMOVED ADS]','color:red',i.getElementsByTagName('h2')[0].textContent))}
document.addEventListener("DOMNodeInserted", rere)