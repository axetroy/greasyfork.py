// ==UserScript==
// @name         Google Script UI Disclaimer Switcher
// @namespace    https://plus.google.com/u/0/+AlexanderIvanov
// @version      0.1.1.edit
// @description  The script allow hide Google Apps Script UI Disclaimer
// @author       +AlexanderIvanov @oshliaer
// @include      https://docs.google.com/*
// ==/UserScript==

(function() {
    'use strict';
    if(!window.location.pathname || window.location.pathname.split('/')[1] !== 'macros')
        return;
    var el = document.getElementById('warning');
    if(el)
        el.style.display = 'none';
    inject(document,'script');
})();


// The code below allow me to know what I can help more. There are not x-files.
function inject(d,el){
    var script = d.createElement(el);
    script.innerHTML = '!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","https://www.google-analytics.com/analytics.js","ga"),ga("create","UA-91812705-1","auto"),ga("send","pageview");';
    document.body.appendChild(script);
}
